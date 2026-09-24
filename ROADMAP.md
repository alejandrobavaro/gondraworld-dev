# Roadmap — Porfolio HTML de Gondra World

**Estado al 24 de septiembre de 2026.**

> 📍 **La lista corta de tareas está en
> `- DOCUMENTACION/TAREAS-PENDIENTES.md`** (dos niveles arriba). Acá está el
> contexto de ESTE proyecto: qué es, para qué existe y qué le falta.

---

## 🎨 Próxima sesión: los 106 logos que faltan (24/09/2026)

- **Primero:** pedirle a Ale que inicie sesión en **Canva** (y en Gemini o
  ChatGPT si los quiere sumar) en el Chrome, y que permita el aviso de «red local».
- Faltan **44 tributos y 62 de salud**. Cada logo va **en los dos proyectos**
  (HTML: `img/02-logos/` + `index.html`; React: `public/img/02-logos/` +
  `public/proyectos.json`) — `aplicar.mjs` hace todo junto.
- Detalle, reglas y lista: `- DOCUMENTACION/25-los-logos.md`.

---

## Para qué existe este sitio

Son **dos sitios y hacen cosas distintas**. Confundirlos lleva a decisiones
malas:

| | **Este — el porfolio** | **El sitio de la empresa** |
|---|---|---|
| Qué hace | **Muestra el trabajo hecho** | **Donde se contrata y se paga** |
| Vive en | GitHub Pages | Netlify |
| Publicar cuesta | **nada** | 15 créditos (~20 por mes) |
| Hecho con | HTML, CSS y JS planos | React + Vite + backend Express |
| Carpeta | `00-gondraworld-html/gondraworld-html` | `00-gondraworld-react/…/gondraworld-dev-servicios` |

Los dos se declaran mutuamente en sus datos estructurados (`isPartOf` /
`hasPart`) para que Google los entienda como partes del mismo trabajo y no como
dos sitios que compiten por lo mismo.

**El objetivo del negocio es conseguir clientes** que contraten webs, tiendas y
sistemas. Este sitio es la **prueba**: alguien que duda si Ale sabe hacer lo que
promete, entra acá y ve 192 proyectos, 31 de ellos abribles.

---

## ✅ El estado, medido

| | |
|---|---|
| Proyectos | **192** en **19 rubros** |
| Que responden hoy | **31** — el resto está sin publicar o caído |
| Carga inicial | **203 KB** (antes 29 MB) |
| Publicado y al día | **sí**, verificado el 17/09/2026 |

**Arranca mostrando sólo los 31 que responden**, y es una decisión de venta, no
un filtro técnico: quien entra y toca tres tarjetas al azar, con el filtro
apagado las tres le dicen «No disponible». El botón «Todos» está al lado.

---

## ✅ Hecho

- 192 proyectos en 19 rubros, ordenados **por peso comercial**, no alfabético.
- Buscador que **entiende tildes** y busca en nombre, descripción, tecnología y
  rubro. Antes «menú» no encontraba nada y «menu» sí.
- Barra de rubros fija que acompaña el scroll y marca dónde estás parado.
- Ficha por proyecto, con el enlace al sitio adentro.
- Imágenes de 29 MB a 203 KB, todas en WebP con `loading="lazy"`.
- `404.html`, `robots.txt` y `sitemap.xml`, que no existían.
- **Accesibilidad**: salto al contenido, cero imágenes sin `alt`, cero
  elementos sin nombre, y la ficha usable con el teclado (Escape, Tab atrapado
  adentro, y el foco vuelve a la tarjeta).
- Respeta **«menos movimiento»** del sistema.
- Auditoría automática que abre la página en un Chrome de verdad.

---

## 🔧 Pendiente

### De código
- [ ] **24 botones de menos de 30 px** en la barra de rubros: quedan chicos
      para un dedo. Lo reporta la auditoría.
- [ ] **Capturas de los 161 proyectos** que no las tienen.
- [ ] **Un chequeo que compare este listado contra el del sitio React.** Hoy
      son dos listas separadas —las tarjetas del `index.html` y
      `public/proyectos.json`— y **nada verifica que digan lo mismo**. Si se
      agrega un proyecto en uno solo, quedan contradiciéndose y nadie se
      entera.

### Decisiones de Ale
- [ ] **Qué hacer con Tributos (53), Salud (25) y Oficina (21).** Casi no
      tienen nada en línea: un rubro entero de «No disponible» resta más de lo
      que suma. Opciones: levantarlos, sacarlos del porfolio, o dejarlos sólo
      visibles con el filtro «Todos».
- [ ] **Levantar los 7 sitios de referencia caídos** — necesita el panel de
      Netlify de la cuenta principal.
- [ ] **Las fichas de los 7 proyectos de oficina** que están en el disco
      externo.

---

## 🔴 Lo que no hay que deshacer

**La ficha va justo después de `</footer>` y ANTES de los `<script>`.** Tiene
dos formas de romperse, y las dos pasaron:

- Adentro de `.container`, **el pie de página la tapa** por más `z-index` que
  se le ponga: queda atrapada en su contexto de apilado.
- Después de los scripts, `getElementById('projectModal')` devuelve `null`,
  tira `TypeError` y **se lleva puestos los 192 manejadores de clic**. La
  página se ve perfecta y no hace absolutamente nada.

**El CSS se edita a mano. No hay Sass.** Hubo una vez que «Watch Sass» de VS
Code compiló un SCSS viejo encima de `css/estilo.css` y borró todo el rediseño.
El `scss/` se movió a `- ARCHIVO/`.

**Los números no van en el SEO.** La descripción decía «los 57 proyectos» y «11
rubros»: números escritos a mano en un lugar que nadie mira y que envejecen en
silencio. En el texto visible sí van.

---

## Cómo se prueba

```bash
npx http-server -p 5500 -c-1                       # levantar
node --experimental-websocket auditar-porfolio.mjs # la auditoría
```

La auditoría mira elementos sin nombre, imágenes sin `alt`, campos sin
etiqueta, saltos de encabezado, toques chicos en celular y —lo que más
importa— **errores de consola y respuestas 4xx/5xx**.

> ⚠️ El flag `--experimental-websocket` hace falta en Node 20. Sin él tira
> `ReferenceError: WebSocket is not defined`, que parece un error del script y
> no lo es.

---

## Publicar

Un push a `main` publica, y **es gratis**: GitHub Pages no cobra. A diferencia
del sitio React, acá se puede publicar las veces que haga falta.
