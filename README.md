# Gondra World · Porfolio (versión HTML)

Porfolio de desarrollo web de Ale Bavaro. Una sola página con los **61 proyectos
publicados**, agrupados en 11 rubros, con buscador y ficha de detalle por proyecto.

**En vivo:** https://alejandrobavaro.github.io/gondraworld-dev/

---

## Cómo se levanta

No hay build ni dependencias: es HTML, CSS y JavaScript plano.

```bash
npx http-server -p 5500 -c-1
```

Y abrir http://localhost:5500. Con Live Server de VS Code funciona igual.

El CSS se escribe en `scss/` y se compila a `css/estilo.css`. Si tocás los `.scss`:

```bash
sass scss/estilo.scss css/estilo.css
```

---

## Estructura

```
gondraworld-html/
├── index.html          Todo: markup, estilos de página, buscador y ficha
├── css/estilo.css      Compilado desde scss/
├── scss/               Fuente de los estilos
└── img/
    ├── 00-fondos/      Los 2 fondos del espacio (webp)
    ├── 02-logos/       Un logo por proyecto (webp)
    ├── 05-gif/         Logo animado del header + su poster estático
    └── 08-favicon/     Favicon y la imagen para compartir en redes
```

---

## Cómo agregar un proyecto

1. Poné el logo en `img/02-logos/` como `.webp`. Para convertirlo desde PNG:

   ```bash
   npx sharp-cli -i logo.png -o logo.webp resize 640 --withoutEnlargement -- webp --quality 82
   ```

2. Copiá una tarjeta existente dentro de la `<section>` del rubro que corresponda
   y cambiá los datos. La tarjeta entera es el enlace: no lleva botón aparte.

   ```html
   <div class="project-card">
       <a href="https://elsitio.netlify.app/" target="_blank" rel="noopener" class="project-link"
          data-name="nombre para el buscador"
          data-titulo="Nombre Visible"
          data-emoji="🛒"
          data-description="Qué resuelve el proyecto, en una o dos frases."
          data-project="slug-unico"
          data-github="#"
          data-tech="React, Node.js"
          data-date="2026">
           <span class="project-logo"><img src="./img/02-logos/logo.webp" alt="Nombre Visible" loading="lazy" decoding="async" width="320" height="120" /></span>
           <span class="project-nombre">Nombre Visible</span>
       </a>
   </div>
   ```

   | Atributo | Para qué sirve |
   |---|---|
   | `href` | Adónde va el visitante. Ctrl+clic lo abre directo; el clic normal abre la ficha. |
   | `data-name` | Texto contra el que busca el buscador. En minúsculas. |
   | `data-titulo` | Nombre que se ve bajo el logo y como título de la ficha. |
   | `data-emoji` | Acompaña al título dentro de la ficha. |
   | `data-description` | El texto de venta de la ficha. |
   | `data-project` | Identificador único. No se repite. |
   | `data-github` | URL del repo, o `#` si es privado (la ficha dirá "Repositorio privado"). |
   | `data-tech` / `data-date` | Ficha técnica. |

3. Listo. El buscador, los chips de rubro y la ficha lo toman solos.
   El contador del encabezado (`61 proyectos · 11 rubros`) está escrito a mano en
   el bloque `.hero-datos` del `index.html`: hay que subirlo al agregar uno.

## Cómo agregar un rubro

1. Duplicá una `<section class="category-section">` y cambiale el `id`, el
   `data-category`, el número, el ícono y el nombre. El `id` y el `data-category`
   tienen que ser iguales.
2. Agregá el chip en el `<nav class="rubros-nav">`, apuntando a `#ese-id`.
3. Renumerá las secciones siguientes.

El rubro que muestra la ficha se saca de la sección donde vive la tarjeta, así que
no hay que declararlo por proyecto.

---

## Decisiones que conviene no deshacer

**Los logos van en WebP redimensionados a 640px de ancho.** Los originales eran
PNG de 2300px que se mostraban a 320px: pesaban 17 MB entre todos y ahora pesan 1,7 MB.
Los PNG originales están en `- ARCHIVO/img-originales-reemplazados-por-webp/`.

**Todos los logos llevan `loading="lazy"` y `width`/`height`.** El lazy evita bajar
61 imágenes de una; las dimensiones evitan que la página salte mientras cargan.

**El logo del header carga en dos tiempos.** Primero se muestra
`logogondraworld-poster.webp` (20 KB, estático) y recién cuando la página terminó de
cargar, un script lo reemplaza por la versión animada (2 MB). Así el header aparece
al instante. El intercambio lo hace la función `activarLogosAnimados()` al final del
`index.html`, sobre cualquier `<img>` que tenga `data-animado`.

**Los logos no llevan caja ni fondo en hover.** Son PNG recortados: la profundidad
sale de `drop-shadow()`, que sigue la silueta real de cada logo.

**Las categorías nombran el rubro del cliente, no el tipo de sistema.** Todos los
sistemas tienen parte pública y parte de gestión, así que agrupar por "software de
gestión" no distinguía nada.

**El orden de los rubros no es alfabético ni por tamaño: va por peso comercial.**
Abre con los rubros de los que más clientes hay (tiendas, gastronomía, eventos),
sigue con gestión B2B, después lo audiovisual y musical, y cierra con las
herramientas propias y los juegos. Los números 01–11 reflejan ese orden, así que
si se reordena hay que renumerarlos.

**Sin header ni menú: se entra directo a la grilla.** Los atajos a cada rubro son
los chips de `.rubros-nav`, no una barra fija. El enlace de contacto del encabezado
apunta al `id="contacto"` del pie.

**Dos columnas ya desde los 400 px.** Con 61 proyectos, una sola columna convierte
el celular en un scroll interminable. La grilla va 2 → 3 (1024 px) → 4 (1400 px).

**Cada dato del contador es un `<span class="dato">` con `nowrap`.** Si no, en
pantalla angosta se parte al medio y queda «MAR / DEL PLATA».

**El `<head>` tiene la misma estructura que el del sitio de la empresa**
(`gondraworld-dev-servicios`), pero el contenido diferencia los dos: acá se
muestra el trabajo hecho, allá se contrata. Los datos estructurados de cada uno
apuntan al otro, así Google los entiende como partes del mismo trabajo y no como
dos sitios que compiten por lo mismo.

**El favicon es `logo1.ico`, el mismo de la web de la empresa.** Trae varias
resoluciones, por eso se ve nítido en la pestaña. Si se cambia, cambiarlo en los
dos proyectos.

**El contador del `<title>` y del encabezado se escriben a mano.** Al agregar o
sacar un proyecto hay que actualizar los dos, más el bloque de datos
estructurados.

---

## Rendimiento

| | Antes | Ahora |
|---|---|---|
| Carga inicial | 29 MB | 203 KB |
| Carpeta `img/` | 319 MB | 3,8 MB |
| Enlaces rotos | 5 | 0 |

---

## Documentación

En `- DOCUMENTACION/` (un nivel arriba) está el detalle: el inventario completo de
proyectos, el mapa de cuentas de GitHub, Netlify y Vercel, y lo que queda pendiente.
