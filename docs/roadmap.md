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

> **Progreso (2026-10-12):** la Fase 1 de código está **fusionada en `master`** (PR #2, con **squash**: commit `2de51ed`). Los commits individuales, y los hashes que citan estos docs, viven en la rama `fix/portfolio-total-refactor-design-2026`: **no borrarla**. Hechos: A6, A1, A2, M1, A5, A7, M3, M5, A3, M9, A8 (con el antiabuso de los formularios) y el `key` de `aboutNew` (B1 parcial).
>
> **Rediseño en curso** en la rama `feat/redesign-coral-editorial` (desde `master`; **no se fusiona hasta que la clienta apruebe**). **R1a, R1 y R2 hechos en la rama:** `Layout` nuevo (cabecera, pie, banda de cotización, diálogos de cotización y boletín) y home completa con datos del CMS. **R3 hecho en la rama:** blog, post, servicios, biografía, portafolio, proyectos y contacto (y el logo con engranajes); solo las legales y la 404 siguen con el marcado viejo hasta R4 (ver [dev-log](dev-log.md)).
>
> **Siguiente (en este orden):**
> 1. **Comprobar producción tras el merge** (`nansystems.us`): home en ES y EN, `/sitemap.xml` y `/robots.txt` con 200, un envío real de contacto, de cotización y de boletín (llegan a Netlify → Forms y las notificaciones por correo funcionan), ninguna llamada a `emailjs.com`, y confirmar el dominio canónico (con o sin `www`).
> 2. **Revisión del dueño en local** del inicio (escritorio, tableta, tema oscuro) y confirmación con la clienta de la cifra "+11" y los textos. Luego **R4** (legales, 404 y QA), el PR en borrador y la limpieza.
> 3. A4: evaluar si compensa seguir con Google Analytics (decisión del dueño; hasta entonces no se toca).
> 4. Avisar a la clienta de que contacto y cotización estuvieron caídos en producción (EmailJS), y revisar el contenido de DatoCMS y los deploys antiguos de Netlify (A6).
>
> Detalle y método de prueba en el [dev-log](dev-log.md) (sección "Próximos pasos").

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| A6 | Las consultas de `portfolio.js` piden campos que la página no muestra y que Gatsby publica en el JSON de la página (`/page-data/…`). Pedir **solo lo que se muestra** y revisar ese contenido en DatoCMS. Detalle comunicado al dueño fuera del repo (el repo es público) | bajo | **hecho en la rama** `0816500` (falta publicar: PR → merge → deploy) | `fix/portfolio-total-refactor-design-2026` |
| A1 | Formulario de cotización: `setOptionState`, título `undefined`, valores falsos, typo | bajo | **hecho en la rama** `f0b4b4a` | `fix/portfolio-total-refactor-design-2026` |
| A2 | Idioma regional (`en-US`, `es-VE`): `supportedLngs` o normalización | bajo-medio | **hecho en la rama** `d04ff32` (HTML del build comprobado) | `fix/portfolio-total-refactor-design-2026` |
| A7 | El icono del selector de idioma mostraba "ES" aunque el sitio estuviera en inglés (solo en el build de producción; **ya ocurría en la web publicada**). Causa: el HTML estático sale en español y la hidratación de React corrige el texto pero no atributos (`class`, `src`, `title`). `Selector` ahora renderiza "es" en el primer render y aplica `i18n.language` justo después de montar | bajo | **hecho en la rama** `c59773b` (probado con build de producción) | `fix/portfolio-total-refactor-design-2026` |
| A5 | Errores visibles en contacto/cotización/boletín; `response.ok`; helper de Netlify alineado | bajo | **hecho en la rama** `092d9a4` (este commit se llama "M3" por error) y `db8158e` (docs); falta probar el boletín real en el deploy preview | `fix/portfolio-total-refactor-design-2026` |
| M1 | "Últimos posts" en orden `DESC` y enlace absoluto | bajo | **hecho en la rama** `72cf6b0` | `fix/portfolio-total-refactor-design-2026` |
| M3 | `gatsby-node.js`: manejo de errores y deduplicar por slug | bajo-medio | **hecho en la rama** `3c0f244` (build comparado con la línea base: mismas 20 rutas) | `fix/portfolio-total-refactor-design-2026` |
| M5 | i18n: retirar backend sobrante, `wait` y el parche `i18next.languages`; `state` por defecto de `Button` (**ya hecho con A1**) | bajo | **hecho en la rama** `6ef3025` (código, probado con build) y desinstalado `i18next-http-backend` de `package.json` (`34630bb`; build idéntico) | `fix/portfolio-total-refactor-design-2026` |
| A8 | **EmailJS está caído** (`404 Account not found`: la clave pública del código no corresponde a ninguna cuenta; los identificadores son idénticos a los de `master`, así que **contacto y cotización fallaban también en producción**, solo que antes la pantalla se quedaba en "Enviando…" sin avisar). Contacto y cotización pasan a **Netlify Forms** (como el boletín): `static/forms.html` declara `contact` y `quote`, helper `src/utils/netlifyForm.js`, y el correo de los mensajes de error sale de `GATSBY_CONTACT_EMAIL`. Se retira EmailJS del código (la dependencia `emailjs-com` la desinstala el dueño) | medio-alto | **hecho en la rama** (`dbc253d`; envíos reales probados por el dueño en el deploy preview) **+ antiabuso nivel 1** (espera de 60 s y 5/día por navegador, honeypot efectivo; commit pendiente del dueño; re-probar el boletín en el preview). Nivel 2 (reCAPTCHA personalizado) solo si aparece abuso real | `fix/portfolio-total-refactor-design-2026` |

> A1, A2 y M1 tocan archivos que el rediseño reescribe (`index.js`, `testimonyFixed`, `quickQuote`, `button`). Decisión por defecto: resolverlos **dentro de la rama del rediseño** solo en los archivos que se reescriben de todos modos; el resto, en ramas `fix/` aparte.

## Fase 2 · SEO y consentimiento

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| A3 | `gatsby-plugin-react-helmet@3`, `lang`, SEO en páginas sin él, `robots.txt`, sitemap. **R1 depende de esto o de `gatsby-ssr.js`**: `<body class="nx-root">`, `lang` y las fuentes deben estar en el HTML estático (ver SPEC del rediseño, k.5) | bajo | **hecho en la rama** `441bc68` (react-helmet, `lang`, títulos) y sitemap + `robots.txt` (commit pendiente del dueño). Probado con build + `gatsby serve`. Queda sin `<title>` la página vieja `/singleventure` (M4). Por confirmar: dominio canónico (`siteUrl` = `https://nansystems.us`, sin `www`) | `fix/portfolio-total-refactor-design-2026` |
| A4 | Banner de cookies que realmente controle Google Analytics. El banner del rediseño ya guarda la cookie `gatsby-gdpr-google-analytics`; falta decidir el modelo y configurar `gatsby-plugin-gdpr-cookies` (y retirar el plugin gtag). **2026-10-12:** el dueño quiere evaluar primero si compensa seguir usando Google Analytics; si se descarta, el banner solo informaría y se retirarían `gatsby-plugin-google-gtag`, `gatsby-plugin-gdpr-cookies` y `react-cookie-consent` | medio | **a evaluar** (decisión del dueño) | — |

## Fase 3 · Despliegue

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| M2 | Confirmar Node de Netlify y alinear `.nvmrc`; `netlify.toml`; versionar lockfile | medio | pendiente (primero `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md)) | — |
| M7 | Cabeceras de seguridad (`_headers` o `netlify.toml`); CSP al final | medio | pendiente | — |
| M6 | EmailJS: claves a variables de entorno, restringir dominios, antispam | bajo | **descartado** (sustituido por A8: ya no hay EmailJS ni claves en el código; el antispam lo da el honeypot de Netlify Forms) | — |
| M9 | `gatsby-config.js` falla al instante con un mensaje claro si falta `api_key` (antes el plugin de DatoCMS recibía el texto `"undefined"` y el build fallaba a los ~14 s con un `401 INVALID_AUTHORIZATION_HEADER`) | bajo | **hecho en la rama** (commit pendiente del dueño). Atención: si en Netlify `api_key` no aplica a Deploy Previews, esos builds ya fallaban; ahora lo dicen claro | `fix/portfolio-total-refactor-design-2026` |
| M8 | `npm install` informa de **337 vulnerabilidades** (14 low, 157 moderate, 155 high, 11 critical) = 140 avisos únicos. **Analizado el 2026-10-12, sin cambios de código** (detalle y método en [dependency-audit.md](dependency-audit.md)): todo viene de 7 dependencias directas, casi todo es herramienta de build de Gatsby 2 que no llega al navegador; los 2 hallazgos que sí llegan (`js-cookie` vía `react-cookie-consent`, `cookie` vía `gatsby-plugin-gdpr-cookies`) no son alcanzables con el uso actual. **No hay arreglo compatible** con la línea Gatsby 2.x (todo son versiones mayores) y `npm audit fix` solo toca 2 utilidades en local. Se cierra con: retirar `react-cookie-consent` con el rediseño (A4/R1) y la migración de Gatsby (Futuro). **No usar `npm audit fix --force`** | medio | **analizado**; el arreglo real queda en A4/R1 y en la migración de Gatsby | — |

## Fase 4 · Limpieza

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| M4 | Retirar código muerto y páginas viejas (`/about`, `/singleventure`) con redirects (al hacerlo, quitarlas también de `exclude` del sitemap en `gatsby-config.js`) | medio | **parcial:** `singleventure.js` y `shareButton.js` borrados en la rama del rediseño; falta `/about` y el resto (`confettiAnimation`, `teamlist`, `blogList`, `commentsForm`) | feat/redesign-coral-editorial |
| B1 | Accesibilidad (teclado, `alt`, estructura de listas, un `<h1>`) | bajo | **parcial**: el `key` que faltaba en la lista de `aboutNew.js` está hecho en la rama (commit pendiente del dueño). Falta el grueso: el dev server muestra avisos `jsx-a11y` de ESLint (elementos no nativos con `onClick` sin soporte de teclado, `onMouseOver` sin `onFocus`) en `button`, `footer`, `header`, `mailChimpForm`, `selector`, `quickQuote`, `about`, `index` y `portfolio`, más `alt` vacíos y estructura de encabezados | `fix/portfolio-total-refactor-design-2026` |
| B2 | Navegación en un solo array; consultas sin uso del footer; variables sin uso | bajo | pendiente | — |
| B3 | Fuentes fuera de `@import`, peso de imágenes, CSS de Bootstrap | bajo | pendiente | — |
| B4 | Renombrar `mailChimpForm.js` / `NetlifyForm` / `.inputMailChimp` | bajo | pendiente | — |
| B5 | `gatsby-browser.js`: evitar `window.onload =`, quitar comentarios | bajo | pendiente | — |

## Rediseño (ver [redesign.md](redesign.md))

| ID | Qué | Riesgo | Estado | Rama / PR |
|---|---|---|---|---|
| R0 | Decisión (D Coral Editorial + detalles de A) y tokens | — | **hecho** | docs |
| R0b | Muestras HTML de las 12 pantallas + catálogo de componentes + SPEC (generadas con IA, **revisadas y corregidas**: 208/208 combinaciones sin desborde horizontal; ver [redesign.md](redesign.md)) | — | **hecho** | fuera del repo (carpeta local) |
| R1a | **Pieza vertical**: `layout` nuevo + hero de la home alimentado por el CMS con `.nx-media` + `gatsby-image`. Valida SSR (`gatsby-ssr.js`), tema, idioma, build y el comportamiento real de las imágenes antes de portar el resto. **Hecha en local (2026-10-12):** fuentes autoalojadas, `Layout`/cabecera/pie/banda/diálogos, `Media` y home; el hero es un archivo local y no del CMS (ver dev-log). Falta la revisión visual del dueño | medio | **hecha en la rama** (pendiente de revisión y preview) | `feat/redesign-coral-editorial` (desde `master`) |
| R1 | Base completa: variables CSS, fuentes, header/footer nuevos en `Layout`; **retirar `styles.css` y los imports de Bootstrap en el mismo cambio** (el reset de `.nx-root` es global y la regla vieja de `html, body` pisa el fondo) | medio | **hecha en la rama**, salvo borrar `styles.css` (referencia hasta terminar R3) y desinstalar `bootstrap`/`react-bootstrap` (lo hace el dueño) | idem |
| R2 | Home | medio | **hecha en la rama** (hero, franja, servicios, testimonios y artículos con datos del CMS); la cifra "+11" y los textos esperan confirmación de la clienta | idem |
| R3 | Páginas con contenido del CMS: blog, post, proyectos, biografía, portafolio, contacto y modal de cotización | medio | **hecha en la rama:** blog, post, servicios, biografía, portafolio, proyectos y contacto (y el modal de cotización, en R1a); el contenido de relleno del CMS se oculta en código y hay que completarlo (ver [dev-log](dev-log.md)) | idem |
| R4 | Legales, 404, QA responsive/accesibilidad, `prefers-reduced-motion` | bajo | pendiente | idem |
| R5 | Revisión del preview con la clienta y merge | alto (publica) | bloqueado: aprobación de la clienta | — |

## Decisiones abiertas

| Tema | Pregunta | Quién |
|---|---|---|
| Boletín en el rediseño | ¿Pasa al pie o sigue como sección en la home? (los mocks D y A no lo muestran como sección) | dueño + clienta |
| Textos del mock | "+6 años" y "Respuesta en 24 h" son afirmaciones comerciales. **Decidido (2026-10-12):** textos realistas en ES y EN al portar cada pantalla, **sin cifras ni promesas que no se puedan comprobar**; lo que dependa de un dato del negocio (años de experiencia, plazo de respuesta) irá como clave o campo configurable y se confirma antes de publicar | dueño |
| Servicios | Los títulos del mock no coinciden con los servicios del CMS (los slugs sugieren CAD, Red Hat e IoT inalámbrico); definir el contenido final | clienta |
| Blog | Los posts del CMS son de prueba; sin posts reales, la sección "Artículos recientes" queda pobre | clienta |
| Consentimiento de GA (A4) | Qué modelo de cookies quiere la clienta | clienta |
| Propuestas en el repo | ¿Guardar las PNG de D y A en `docs/assets/` (~1,9 MB y el repo es público)? | dueño |
| Panel de Netlify | Completar los `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md) | dueño |
| Logo | El rediseño usa el wordmark de texto y deja de usar el logo gráfico (los engranajes) en cabecera y pie. ¿Se aprueba? | clienta |
| Correo de contacto | El de las muestras (`contacto@…`) es de ejemplo; ¿cuál es el real y se guarda como campo de DatoCMS? | dueño + clienta |
| Foto del hero | Sale de `InfoSite.carouselHome[0]`; hay que subir al CMS una imagen de al menos 1800×1200 con punto focal y texto alternativo. **2026-10-12:** se generarán imágenes con IA (Gemini) a partir de los prompts de [image-prompts.md](image-prompts.md); solo imágenes de concepto: no personas reales, testimonios ni fotos que se presenten como proyectos reales | dueño |
| Texto alternativo | Hoy el `alt` está vacío en todas las imágenes del CMS; el diseño usa el título como respaldo, pero conviene rellenarlo | clienta |
| Cifra "+6 años" | La copia actual (2020) ya dice "más de 6 años": confirmar el número vigente | clienta |
| Copia del banner de cookies | `cookies.title` trae "almacenamos/recuperamos/comercializamos" (42 caracteres seguidos): reescribir con espacios | dueño |

## Futuro (no antes de cerrar lo anterior)

- Migrar Gatsby 2 → versión soportada (**es lo que realmente baja las 337 vulnerabilidades**, ver M8; **decisión del 2026-10-12: después del rediseño**, no antes; matriz de compatibilidad verificada en [dependency-audit.md](dependency-audit.md); el plugin de DatoCMS para Gatsby está en mantenimiento y archivado, así que la alternativa es otro framework): implica `gatsby-image` → `gatsby-plugin-image`, `gatsby-source-datocms` mayor, React/Node modernos y revisar i18n. Proyecto aparte, con su propia rama larga y previews.
- Tema oscuro opcional como `prefers-color-scheme` apoyado en las variables CSS del rediseño.
- ~~Migrar `emailjs-com` v2 a `@emailjs/browser`~~: obsoleto, contacto y cotización dejaron EmailJS por Netlify Forms (A8).
