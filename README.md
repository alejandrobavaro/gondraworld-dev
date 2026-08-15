# Gondra World · Porfolio (versión HTML)

Porfolio de desarrollo web de Ale Bavaro. Una sola página con los **57 proyectos
publicados**, agrupados en 11 rubros, con buscador y ficha de detalle por proyecto.

**En vivo:** https://alejandrobavaro.github.io/gondraworld-dev/

---

## Cómo se levanta

No hay build ni dependencias: es HTML, CSS y JavaScript plano.

```bash
npx http-server -p 5500 -c-1
```

Y abrir http://localhost:5500. Con Live Server de VS Code funciona igual.

### El CSS se edita a mano. No hay Sass.

> **Ojo con «Watch Sass» de VS Code.** Este proyecto **tenía** una carpeta `scss/`
> que había quedado congelada en junio de 2026. El 14/08/2026 el Live Sass Compiler
> se despertó, compiló ese SCSS viejo encima de `css/estilo.css` y se llevó puesto
> todo el rediseño. Se recuperó del último commit.
>
> Para que no vuelva a pasar, el `scss/` y los `.map` se movieron a
> `- ARCHIVO/scss-viejo-gondraworld-html/`. **La fuente de verdad es
> `css/estilo.css`.** Si alguna vez volvés a usar Sass, hay que portar primero
> todo el CSS actual al SCSS; si no, se pierde de nuevo.

---

## Estructura

```
gondraworld-html/
├── index.html          Todo: markup, estilos de página, buscador y ficha
├── css/estilo.css      Los estilos. Se edita a mano (ver aviso de Sass arriba)
└── img/
    ├── 00-fondos/      Los fondos del espacio y el del pie (webp)
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

3. Listo. El buscador, la barra de rubros y la ficha lo toman solos.

   > **Falta un paso más:** los datos estructurados llevan la lista de los 57
   > proyectos y se generan leyendo las propias tarjetas. Después de agregar
   > uno hay que volver a correr el script que arma el `ItemList` del
   > `<script type="application/ld+json">`, o el proyecto nuevo no le va a
   > figurar a Google.
   El contador del encabezado (`57 proyectos · 11 rubros`) está escrito a mano en
   el bloque `.hero-datos` del `index.html`: hay que subirlo al agregar uno.

## Cómo agregar un rubro

1. Duplicá una `<section class="category-section">` y cambiale el `id`, el
   `data-category`, el número, el ícono y el nombre. El `id` y el `data-category`
   tienen que ser iguales.
2. Agregá el enlace en el `<nav class="barra-rubros">`, apuntando a `#ese-id`.
3. Renumerá las secciones siguientes.

El rubro que muestra la ficha se saca de la sección donde vive la tarjeta, así que
no hay que declararlo por proyecto.

---

## Decisiones que conviene no deshacer

**Los logos van en WebP redimensionados a 640px de ancho.** Los originales eran
PNG de 2300px que se mostraban a 320px: pesaban 17 MB entre todos y ahora pesan 1,7 MB.
Los PNG originales están en `- ARCHIVO/img-originales-reemplazados-por-webp/`.

**Todos los logos llevan `loading="lazy"` y `width`/`height`.** El lazy evita bajar
57 imágenes de una; las dimensiones evitan que la página salte mientras cargan.

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

**Sin header ni menú: se entra directo a la grilla.** Lo único fijo es la barra de
rubros (`.barra-rubros`), que acompaña el scroll porque la página mide siete
pantallas y no había forma de saltar de un rubro a otro sin volver al principio.
Marca en cuál estás parado con un `IntersectionObserver`.

**Los rubros no llevan caja, ni borde, ni fondo.** La página es espacial y todo
está como suspendido: lo que distingue al rubro activo es el subrayado que se
dibuja, el mismo gesto que usan el contacto y los nombres de proyecto. El velo de
la barra aparece **solo** cuando queda pegada arriba, va en un pseudo-elemento
`position: fixed` de lado a lado (con `left/right: 0`, no `100vw`, para no
provocar scroll horizontal) y se degrada hacia abajo para no cortar la página con
una línea recta.

**El buscador vive adentro de la barra y es chico.** Antes era lo más grande de la
página (1368 × 65 px) siendo lo menos útil para quien llega por primera vez: nadie
puede buscar lo que todavía no conoce. Los rubros son la puerta de entrada; el
buscador sirve después. Con el cambio, el primer proyecto pasó de aparecer al 68%
de la primera pantalla a aparecer al 50%.

**El pie es el mismo del sitio de la empresa, replicado en HTML plano.** Mismo
fondo, misma grilla y mismos enlaces, para que los dos sitios se lean como partes
de lo mismo. Vive **fuera** de `.container` para ocupar todo el ancho, igual que
allá. Si se toca el footer de React, conviene tocar este.

**El encabezado enlaza a Servicios y a Tienda del sitio de la empresa.** Acá se
muestra el trabajo hecho; lo que se vende vive allá.

**Dos columnas ya desde los 400 px.** Con 57 proyectos, una sola columna convierte
el celular en un scroll interminable. La grilla va 2 → 3 (1024 px) → 4 (1400 px).

**Cada dato del contador es un `<span class="dato">` con `nowrap`.** Si no, en
pantalla angosta se parte al medio y queda «MAR / DEL PLATA».

**El `<head>` tiene la misma estructura que el del sitio de la empresa**
(`gondraworld-dev-servicios`), pero el contenido diferencia los dos: acá se
muestra el trabajo hecho, allá se contrata. Los datos estructurados de cada uno
apuntan al otro, así Google los entiende como partes del mismo trabajo y no como
dos sitios que compiten por lo mismo.

**El buscador compara sin tildes y mira más de un campo.** Antes solo miraba
`data-name` y comparaba tal cual: escribir «menu» encontraba el proyecto y
escribir «menú» no encontraba nada, o sea que quien escribe bien el castellano se
quedaba sin resultados. Y buscar «gastronomía» o «react» daba cero aunque la
ficha lo dijera. Ahora busca en nombre, título, descripción, tecnologías y rubro,
y con varias palabras pide que estén todas.

**Ninguna tarjeta enlaza al repositorio.** Los 57 repos son privados: un
«Ver repositorio» le da 404 a cualquier visitante. Con `data-github="#"` la
ficha dice «Repositorio privado», que es la verdad. Si algún día un repo se hace
público, ahí sí se le pone la URL.

**Los datos estructurados declaran los 57 proyectos.** No solo que existe una
colección: cada proyecto con su nombre, URL, descripción y rubro. Cuesta 4,1 KB
comprimido y es lo que le dice a Google qué hay adentro.

**El SEO habla con la misma voz que el sitio de la empresa** pero no dice lo
mismo: allá se contrata, acá se muestra el trabajo hecho. Los dos declaran los
mismos datos del negocio y se enlazan mutuamente.

**En el SEO no van números.** La descripción decía «los 57 proyectos» y «11
rubros»: números escritos a mano en un lugar que nadie mira y que envejecen en
silencio. En el texto visible sí van, que es donde suman.

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
| Carpeta `img/` | 319 MB | 3,7 MB |
| Enlaces rotos | 5 | 0 |
| Primer proyecto visible | al 68% de la pantalla | al 50% |

También se quitó el slider de marcas del pie: de sus 28 logos, **26 ya estaban más
arriba** en su propia tarjeta. Repetirlos sumaba peso y hacía dudar de si eran
otros proyectos.

---

## Documentación

En `- DOCUMENTACION/` (un nivel arriba) está el detalle: el inventario completo de
proyectos, el mapa de cuentas de GitHub, Netlify y Vercel, y lo que queda pendiente.
