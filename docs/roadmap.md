# Roadmap

Documento **vivo**. Cada mejora tiene un ID de la [auditoría](audit-2026-10.md) (o `R*` si es del [rediseño](redesign.md)).
Al terminar algo: cambiar su estado aquí y anotarlo en [CHANGELOG.md](CHANGELOG.md).

**Estados:** `pendiente` · `en curso` · `hecho` · `descartado` · `bloqueado` (con el motivo).
**Riesgo para producción:** bajo / medio / alto, según la auditoría.

## Reglas

- Sin subir versiones mayores de Gatsby, React ni plugins (línea Gatsby 2.x).
- Nada llega a `master` sin build local y revisión del preview (ver [workflow.md](workflow.md)).
- Lo que depende de la clienta se marca `bloqueado` hasta que responda.

---

## Fase 1 · Bugs sin tocar dependencias

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| A6 | Las consultas de `portfolio.js` piden campos que la página no muestra y que Gatsby publica en el JSON de la página (`/page-data/…`). Pedir **solo lo que se muestra** y revisar ese contenido en DatoCMS. Detalle comunicado al dueño fuera del repo (el repo es público) | bajo | **hecho en la rama** (falta publicar: PR → merge → deploy) | `fix/portfolio-total-refactor-design-2026` |
| A1 | Formulario de cotización: `setOptionState`, título `undefined`, valores falsos, typo | bajo | **hecho en la rama** | `fix/portfolio-total-refactor-design-2026` |
| A2 | Idioma regional (`en-US`, `es-VE`): `supportedLngs` o normalización | bajo-medio | **hecho en la rama** (falta comprobar el HTML del build) | `fix/portfolio-total-refactor-design-2026` |
| A7 | **Nuevo.** El icono del selector de idioma muestra "ES" aunque el sitio esté en inglés (visible solo en el build de producción y **ya ocurre en la web publicada**): `Selector` guarda el idioma en un estado local que se inicializa antes de que i18next termine de arrancar. Derivarlo de `i18n.language` | bajo | pendiente | — |
| A5 | Errores visibles en contacto/cotización/boletín; `response.ok`; helper de Netlify alineado | bajo | **hecho en la rama** (falta probar el boletín real en el deploy preview) | `fix/portfolio-total-refactor-design-2026` |
| M1 | "Últimos posts" en orden `DESC` y enlace absoluto | bajo | **hecho en la rama** | `fix/portfolio-total-refactor-design-2026` |
| M3 | `gatsby-node.js`: manejo de errores y deduplicar por slug | bajo-medio | pendiente | — |
| M5 | i18n: retirar backend sobrante y `wait`; `state` por defecto de `Button` (**esto último ya hecho con A1**) | bajo | parcial | — |

> A1, A2 y M1 tocan archivos que el rediseño reescribe (`index.js`, `testimonyFixed`, `quickQuote`, `button`). Decisión por defecto: resolverlos **dentro de la rama del rediseño** solo en los archivos que se reescriben de todos modos; el resto, en ramas `fix/` aparte.

## Fase 2 · SEO y consentimiento

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| A3 | `gatsby-plugin-react-helmet@3`, `lang`, SEO en páginas sin él, `robots.txt`, sitemap. **R1 depende de esto o de `gatsby-ssr.js`**: `<body class="nx-root">`, `lang` y las fuentes deben estar en el HTML estático (ver SPEC del rediseño, k.5) | bajo | pendiente | — |
| A4 | Banner de cookies que realmente controle Google Analytics. El banner del rediseño ya guarda la cookie `gatsby-gdpr-google-analytics`; falta decidir el modelo y configurar `gatsby-plugin-gdpr-cookies` (y retirar el plugin gtag) | medio | bloqueado: decisión con la clienta | — |

## Fase 3 · Despliegue

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| M2 | Confirmar Node de Netlify y alinear `.nvmrc`; `netlify.toml`; versionar lockfile | medio | pendiente (primero `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md)) | — |
| M7 | Cabeceras de seguridad (`_headers` o `netlify.toml`); CSP al final | medio | pendiente | — |
| M6 | EmailJS: claves a variables de entorno, restringir dominios, antispam | bajo | pendiente | — |

## Fase 4 · Limpieza

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| M4 | Retirar código muerto y páginas viejas (`/about`, `/singleventure`) con redirects | medio | pendiente | — |
| B1 | Accesibilidad (teclado, `alt`, estructura de listas, un `<h1>`) | bajo | pendiente | — |
| B2 | Navegación en un solo array; consultas sin uso del footer; variables sin uso | bajo | pendiente | — |
| B3 | Fuentes fuera de `@import`, peso de imágenes, CSS de Bootstrap | bajo | pendiente | — |
| B4 | Renombrar `mailChimpForm.js` / `NetlifyForm` / `.inputMailChimp` | bajo | pendiente | — |
| B5 | `gatsby-browser.js`: evitar `window.onload =`, quitar comentarios | bajo | pendiente | — |

## Rediseño (ver [redesign.md](redesign.md))

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| R0 | Decisión (D Coral Editorial + detalles de A) y tokens | — | **hecho** | docs |
| R0b | Muestras HTML de las 12 pantallas + catálogo de componentes + SPEC (generadas con IA, **revisadas y corregidas**: 208/208 combinaciones sin desborde horizontal; ver [redesign.md](redesign.md)) | — | **hecho** | fuera del repo (carpeta local) |
| R1a | **Pieza vertical**: `layout` nuevo + hero de la home alimentado por el CMS con `.nx-media` + `gatsby-image`. Valida SSR (`gatsby-ssr.js`), tema, idioma, build y el comportamiento real de las imágenes antes de portar el resto | medio | pendiente | `feat/redesign-…` (por crear, desde `master` tras fusionar los docs) |
| R1 | Base completa: variables CSS, fuentes, header/footer nuevos en `Layout`; **retirar `styles.css` y los imports de Bootstrap en el mismo cambio** (el reset de `.nx-root` es global y la regla vieja de `html, body` pisa el fondo) | medio | pendiente | idem |
| R2 | Home | medio | pendiente | idem |
| R3 | Páginas con contenido del CMS: blog, post, proyectos, biografía, portafolio, contacto y modal de cotización | medio | pendiente | idem |
| R4 | Legales, 404, QA responsive/accesibilidad, `prefers-reduced-motion` | bajo | pendiente | idem |
| R5 | Revisión del preview con la clienta y merge | alto (publica) | bloqueado: aprobación de la clienta | — |

## Decisiones abiertas

| Tema | Pregunta | Quién |
|---|---|---|
| Boletín en el rediseño | ¿Pasa al pie o sigue como sección en la home? (los mocks D y A no lo muestran como sección) | dueño + clienta |
| Textos del mock | "+6 años" y "Respuesta en 24 h" son afirmaciones comerciales: confirmar | clienta |
| Servicios | Los títulos del mock no coinciden con los servicios del CMS (los slugs sugieren CAD, Red Hat e IoT inalámbrico); definir el contenido final | clienta |
| Blog | Los posts del CMS son de prueba; sin posts reales, la sección "Artículos recientes" queda pobre | clienta |
| Consentimiento de GA (A4) | Qué modelo de cookies quiere la clienta | clienta |
| Propuestas en el repo | ¿Guardar las PNG de D y A en `docs/assets/` (~1,9 MB y el repo es público)? | dueño |
| Panel de Netlify | Completar los `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md) | dueño |
| Logo | El rediseño usa el wordmark de texto y deja de usar el logo gráfico (los engranajes) en cabecera y pie. ¿Se aprueba? | clienta |
| Correo de contacto | El de las muestras (`contacto@…`) es de ejemplo; ¿cuál es el real y se guarda como campo de DatoCMS? | dueño + clienta |
| Foto del hero | Sale de `InfoSite.carouselHome[0]`; hay que subir al CMS una imagen de al menos 1800×1200 con punto focal y texto alternativo | dueño + clienta |
| Texto alternativo | Hoy el `alt` está vacío en todas las imágenes del CMS; el diseño usa el título como respaldo, pero conviene rellenarlo | clienta |
| Cifra "+6 años" | La copia actual (2020) ya dice "más de 6 años": confirmar el número vigente | clienta |
| Copia del banner de cookies | `cookies.title` trae "almacenamos/recuperamos/comercializamos" (42 caracteres seguidos): reescribir con espacios | dueño |

## Futuro (no antes de cerrar lo anterior)

- Migrar Gatsby 2 → versión soportada: implica `gatsby-image` → `gatsby-plugin-image`, `gatsby-source-datocms` mayor, React/Node modernos y revisar i18n. Proyecto aparte, con su propia rama larga y previews.
- Tema oscuro opcional como `prefers-color-scheme` apoyado en las variables CSS del rediseño.
- Migrar `emailjs-com` v2 a `@emailjs/browser`.
