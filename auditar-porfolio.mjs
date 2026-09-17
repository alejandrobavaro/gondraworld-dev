/* Auditoria del porfolio HTML: lo mismo que se le hizo al sitio React.
   SEO, accesibilidad, contenido y peso — medido en el navegador.

   node --experimental-websocket auditar-porfolio.mjs                       */

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { tmpdir } from "node:os";
import { setTimeout as esperar } from "node:timers/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const RAIZ = "J:/000000000 - PROYECTOS WEB - REACT PROYECTS/01-SISTEMA-WEB-GONDRA-WORLD-DEV-CV-ALE-BAVARO/00-gondraworld-html/gondraworld-html";
const PUERTO = 5320;
const CDP = 9383;

const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".txt": "text/plain",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon", ".xml": "application/xml" };

const server = createServer((req, res) => {
  const limpia = decodeURIComponent(req.url.split("?")[0]);
  let f = join(RAIZ, limpia === "/" ? "/index.html" : limpia);
  if (!existsSync(f) || statSync(f).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/html" });
    return res.end(existsSync(join(RAIZ, "404.html")) ? readFileSync(join(RAIZ, "404.html")) : "no");
  }
  res.writeHead(200, { "Content-Type": TIPOS[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(PUERTO, r));

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${CDP}`, "--headless=new", "--disable-gpu", "--no-first-run",
  `--user-data-dir=${join(tmpdir(), "gw-porf-" + Date.now())}`, "about:blank",
], { stdio: "ignore" });

let version = null;
for (let i = 0; i < 40 && !version; i++) {
  await esperar(500);
  try { version = await (await fetch(`http://127.0.0.1:${CDP}/json/version`)).json(); } catch {}
}
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0; const pend = new Map();
const consola = [], red = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); }
  if (m.method === "Runtime.exceptionThrown")
    consola.push((m.params.exceptionDetails.exception?.description || "").split("\n")[0].slice(0, 110));
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
    consola.push(m.params.args.map((a) => a.value ?? a.description ?? "?").join(" ").slice(0, 110));
  if (m.method === "Network.responseReceived" && m.params.response.status >= 400)
    red.push(`${m.params.response.status}  ${m.params.response.url.replace(`http://127.0.0.1:${PUERTO}`, "")}`);
};
const cmd = (method, params = {}, sessionId) =>
  new Promise((r) => { const id = ++n; pend.set(id, r); ws.send(JSON.stringify({ id, method, params, sessionId })); });

const { targetId } = await cmd("Target.createTarget", { url: "about:blank" });
const { sessionId } = await cmd("Target.attachToTarget", { targetId, flatten: true });
await cmd("Page.enable", {}, sessionId);
await cmd("Runtime.enable", {}, sessionId);
await cmd("Network.enable", {}, sessionId);
await cmd("Emulation.setDeviceMetricsOverride",
  { width: 1280, height: 900, mobile: false, deviceScaleFactor: 1, screenWidth: 1280, screenHeight: 900 }, sessionId);

const ev = async (expr) => {
  const r = await cmd("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId);
  if (r.exceptionDetails) return { error: (r.exceptionDetails.exception?.description || "").slice(0, 120) };
  return r.result.value;
};

await cmd("Page.navigate", { url: `http://127.0.0.1:${PUERTO}/` }, sessionId);
await esperar(8000);

// ---------------- SEO ----------------
const cabeza = await ev(`(() => {
  const m = (s) => document.head.querySelector(s)?.getAttribute('content') || null;
  return {
    titulo: document.title,
    largoTitulo: document.title.length,
    descripcion: m('meta[name="description"]'),
    largoDesc: (m('meta[name="description"]') || '').length,
    robots: m('meta[name="robots"]'),
    canonical: document.head.querySelector('link[rel="canonical"]')?.href || null,
    ogImg: m('meta[property="og:image"]'),
    idioma: document.documentElement.lang || null,
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map(s => { try { const j = JSON.parse(s.textContent); return j['@type'] || '?'; } catch { return 'ROTO'; } }),
  };
})()`);

console.log("═══ SEO ═══\n");
console.log("  título      :", cabeza.titulo, `(${cabeza.largoTitulo} car.)`);
console.log("  descripción :", cabeza.descripcion ? `${cabeza.largoDesc} car.` : "🔴 NO TIENE");
console.log("  robots      :", cabeza.robots || "(sin meta)");
console.log("  canonical   :", cabeza.canonical || "🔴 no tiene");
console.log("  idioma      :", cabeza.idioma || "🔴 sin lang");
console.log("  og:image    :", cabeza.ogImg ? "sí" : "🔴 no");
console.log("  datos estr. :", cabeza.jsonLd.join(", ") || "🔴 ninguno");

// ---------------- Velocidad y peso ----------------
const perf = await ev(`(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const t = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
  const recursos = performance.getEntriesByType('resource');
  const porTipo = {};
  recursos.forEach(r => {
    const t2 = r.initiatorType === 'img' ? 'imágenes' : r.initiatorType === 'css' || r.name.endsWith('.css') ? 'css' : r.initiatorType === 'script' ? 'js' : 'otros';
    porTipo[t2] = (porTipo[t2] || 0) + (r.transferSize || 0);
  });
  return {
    primerPintado: t ? Math.round(t.startTime) : null,
    domListo: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
    recursos: recursos.length,
    porTipo: Object.fromEntries(Object.entries(porTipo).map(([k, v]) => [k, Math.round(v / 1024) + ' KB'])),
    totalKB: Math.round(recursos.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
  };
})()`);

console.log("\n═══ VELOCIDAD ═══\n");
console.log("  primer pintado:", perf.primerPintado, "ms · DOM listo:", perf.domListo, "ms");
console.log("  recursos      :", perf.recursos, "·", perf.totalKB, "KB en total");
console.log("  por tipo      :", JSON.stringify(perf.porTipo));

// ---------------- Accesibilidad ----------------
const a11y = await ev(`(() => {
  const visible = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const texto = (e) => (e.textContent || '').replace(/\\s+/g, ' ').trim();
  const nombreDe = (e) => texto(e) || e.getAttribute('aria-label') || e.getAttribute('title') ||
    [...e.querySelectorAll('img[alt]')].map(i => i.alt).join(' ').trim();

  const clic = [...document.querySelectorAll('button, a[href], [role="button"]')].filter(visible);
  const imgs = [...document.querySelectorAll('img')].filter(visible);
  const campos = [...document.querySelectorAll('input:not([type=hidden]), textarea, select')].filter(visible);
  const niveles = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map(h => Number(h.tagName[1]));
  const saltos = [];
  niveles.forEach((nv, i) => { if (i && nv > niveles[i-1] + 1) saltos.push(niveles[i-1] + ' → ' + nv); });

  return {
    clic: clic.length,
    sinNombre: clic.filter(e => !nombreDe(e)).map(e => (e.className||'').toString().slice(0,44) + ' ' + ((e.querySelector('i')||{}).className||'')).slice(0, 8),
    imgs: imgs.length,
    sinAlt: imgs.filter(i => !i.hasAttribute('alt')).map(i => (i.getAttribute('src')||'').slice(-44)).slice(0, 8),
    campos: campos.length,
    sinEtiqueta: campos.filter(c => {
      if (c.getAttribute('aria-label') || c.getAttribute('aria-labelledby')) return false;
      if (c.id && document.querySelector('label[for="' + CSS.escape(c.id) + '"]')) return false;
      return !c.closest('label');
    }).map(c => c.name || c.id || c.placeholder || c.type).slice(0, 6),
    h1: [...document.querySelectorAll('h1')].filter(visible).length,
    saltos,
    saltarAlContenido: [...document.querySelectorAll('a[href^="#"]')].some(a => /saltar|contenido principal/i.test(texto(a) + a.className)),
  };
})()`);

console.log("\n═══ ACCESIBILIDAD ═══\n");
console.log(`  ${a11y.clic} clickeables · ${a11y.imgs} imágenes · ${a11y.campos} campos`);
console.log("  h1 en la página :", a11y.h1 === 1 ? "1 ✓" : `🔴 ${a11y.h1}`);
console.log("  sin nombre      :", a11y.sinNombre.length || "0 ✓");
a11y.sinNombre.forEach((x) => console.log("      " + x));
console.log("  imágenes sin alt:", a11y.sinAlt.length || "0 ✓");
a11y.sinAlt.forEach((x) => console.log("      …" + x));
console.log("  campos sin etiq.:", a11y.sinEtiqueta.length || "0 ✓", a11y.sinEtiqueta.join(", "));
console.log("  saltos encabez. :", a11y.saltos.length ? a11y.saltos.join(", ") : "0 ✓");
console.log("  saltar al conten.:", a11y.saltarAlContenido ? "sí" : "no");

// ---------------- Contenido ----------------
const cont = await ev(`(() => ({
  texto: document.body.textContent.replace(/\\s+/g, ' ').trim().length,
  tarjetas: document.querySelectorAll('[class*="proyecto"], [class*="card"], article').length,
  conDescripcion: [...document.querySelectorAll('[class*="desc"]')].filter(e => e.textContent.trim().length > 30).length,
}))()`);
console.log("\n═══ CONTENIDO ═══\n");
console.log("  texto en el documento:", cont.texto, "caracteres");
console.log("  tarjetas             :", cont.tarjetas, "· con descripción visible:", cont.conDescripcion);

// ---------------- Celular ----------------
await cmd("Emulation.setDeviceMetricsOverride",
  { width: 390, height: 844, mobile: true, deviceScaleFactor: 2, screenWidth: 390, screenHeight: 844 }, sessionId);
await esperar(2500);
const movil = await ev(`({
  scrollHorizontal: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  anchoDoc: document.documentElement.scrollWidth,
  chicos: [...document.querySelectorAll('a,button')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 30 || r.height < 30); }).length,
})`);
console.log("\n═══ EN CELULAR ═══\n");
console.log("  scroll horizontal:", movil.scrollHorizontal ? `🔴 sí (${movil.anchoDoc}px en 390)` : "no ✓");
console.log("  toques chicos (<30px):", movil.chicos);

console.log("\n═══ ERRORES ═══\n");
console.log("  consola:", consola.length ? "" : "(ninguno)");
[...new Set(consola)].slice(0, 6).forEach((c) => console.log("    " + c));
console.log("  4xx/5xx:", red.length ? "" : "(ninguno)");
[...new Set(red)].slice(0, 10).forEach((r) => console.log("    " + r));

ws.close(); chrome.kill(); server.close();
