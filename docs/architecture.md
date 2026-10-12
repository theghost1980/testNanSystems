# Arquitectura

## Stack (versiones observadas el 2026-10-10)

| Pieza | Versión / detalle |
|---|---|
| Gatsby | 2.32.13 (la misma que sirve producción) |
| React / ReactDOM | 17.0.2 |
| CMS | DatoCMS vía `gatsby-source-datocms` 2.6.18 |
| Imágenes | `gatsby-image` (fluid) + `gatsby-plugin-sharp` + `sharp` 0.27.2 |
| i18n | i18next 19.9.2 + react-i18next 11.18.6 + language detector |
| Estilos | `src/styles/styles.css` global (el actual; Bootstrap 4 solo para el carrusel). En la rama del rediseño se suman `src/styles/nx.css` y `fonts.css` (inertes hasta el cambio de `Layout`); fuentes autoalojadas en `static/fonts/` |
| Formularios | Netlify Forms (boletín, contacto y cotización) |
| Analítica / cookies | `gatsby-plugin-google-gtag`, `react-cookie-consent`, `gatsby-plugin-gdpr-cookies` |
| Hosting | Netlify, build desde GitHub (`master`) |

## Carpetas

```
gatsby-config.js     plugins; lee la variable api_key (DatoCMS); siteUrl para el sitemap
gatsby-ssr.js        pone lang="es" en el HTML estático (el idioma real lo ajusta Layout)
gatsby-node.js       crea páginas: blog/<slug> y /<slug> (tecnologías)
gatsby-browser.js    carga el widget de accesibilidad (equalweb) en window.onload
src/
  pages/             páginas con ruta propia
  templates/         blogpost.js y technology.js (usadas por gatsby-node)
  components/        header, footer, layout, formularios, carruseles…
  i18n/              config.js (i18next) y withTrans.js (HOC con provider)
  locales/{es,en}/   translations.json (158 líneas cada uno, mismas claves)
  media-imgs/        imágenes locales (logos, fondos, iconos)
  styles/styles.css  CSS global (~2.800 líneas)
static/forms.html    formulario "helper" para que Netlify detecte el boletín
```

## Flujo de datos

1. DatoCMS guarda el contenido; **cada idioma es un nodo distinto** (`locale: "en"` / `"es"`).
2. `gatsby-source-datocms` lo expone en GraphQL (`datoCms*` y `allDatoCms*`).
3. `gatsby-node.js` consulta `allDatoCmsBlogPost` y `allDatoCmsTechnology` y crea una página por *slug*. El slug es igual en ambos idiomas, así que cada ruta se crea dos veces (ver M3).
4. Cada página/plantilla pide **los dos idiomas** (`..._en` y `..._es`) y elige en el render con `i18n.language`.
5. Los textos fijos de interfaz salen de `src/locales/*/translations.json` con `t("clave")`.

Modelos de DatoCMS usados: InfoSite, BlogPost, Technology, Aboutnew, About, Venture, SeoVenture, SeoContact, SeoBlog, SeoPortfolio, WorkExperience, Certification, Team, Testimony, SocialProfile, Credit.

## Rutas

| Ruta | Origen | Estado |
|---|---|---|
| `/` | `pages/index.js` | En uso |
| `/aboutNew` | `pages/aboutNew.js` | En uso (menú "Biografía") |
| `/portfolio`, `/blog`, `/ventures`, `/contact` | `pages/*.js` | En uso |
| `/blog/<slug>` | `templates/blogpost.js` | En uso |
| `/<slug>` | `templates/technology.js` | En uso (servicios) |
| `/tos`, `/privacy`, `/credits`, `/404` | `pages/*.js` | En uso |
| `/singleventure` | `pages/singleventure.js` | En uso desde "Leer más" en Proyectos, pero depende de `location.state` |
| `/about` | `pages/about.js` | Página vieja, sin enlaces; sigue respondiendo en producción |

## Internacionalización

- Se inicializa en `src/i18n/config.js`; los recursos ES/EN van empaquetados en el bundle.
- `Layout` envuelve cada página con `withTrans` (provider de i18next).
- El idioma elegido se guarda en `localStorage.i18nextLng`. **Puede ser un código regional** (`en-US`, `es-VE`), pero el código compara con `"es"`/`"en"` exactos (hallazgo A2).
- `components/selector.js` alterna entre `es` y `en`.

## Formularios

| Formulario | Dónde | Envío |
|---|---|---|
| Contacto | `pages/contact.js` | POST a `/` con `form-name=contact` (vía `utils/netlifyForm.js`) → Netlify Forms |
| Cotización (modal) | `components/quickQuote.js`, abierto desde `components/button.js` (acción `quote`) | POST a `/` con `form-name=quote` (vía `utils/netlifyForm.js`) → Netlify Forms |
| Boletín | `components/mailChimpForm.js` (exporta `NetlifyForm`; el nombre es histórico) | POST a `/` con `form-name=newsletter` → Netlify Forms |
| Comentarios | `components/commentsForm.js` | **Sin uso** |

Los tres formularios activos se declaran en `static/forms.html` (nombre, campos y honeypot `bot-field`): Netlify solo los reconoce si coinciden con lo que envía el código. Si falla el envío, el mensaje de error muestra el correo de `GATSBY_CONTACT_EMAIL` (`components/contactErrorText.js`); sin la variable, sale sin dirección.

**Antiabuso** (todo en `utils/netlifyForm.js`; los límites son constantes al principio del archivo): espera de 60 s entre envíos y 5 al día por formulario y navegador (marcas en `localStorage`, `nx-form-sends-<formulario>`), y honeypot `bot-field` (`components/honeypotField.js`) que viaja siempre en el POST; si viene relleno no se envía nada. `components/formErrorText.js` elige el texto de error según el motivo. Es un freno del lado del cliente: quien haga POST directo a `/` lo salta; lo detiene Akismet de Netlify (automático) y, si hiciera falta, un reCAPTCHA. Hasta A8 contacto y cotización usaban EmailJS.

El formulario `newsletter` solo existe en el DOM cuando se abre el modal, por eso `static/forms.html` lo declara en HTML estático para que Netlify lo registre en el build. **Los dos deben mantenerse sincronizados** (nombre `newsletter`, campo `email`).

## Analítica, cookies y accesibilidad

- `gatsby-plugin-google-gtag` inyecta Google Analytics en producción.
- `react-cookie-consent` (en `Layout`) muestra el banner, pero **no controla la carga de GA** (hallazgo A4).
- `gatsby-plugin-gdpr-cookies` está configurado sin ningún `trackingId`, por lo que hoy no hace nada.
- `gatsby-browser.js` carga el widget de accesibilidad de un tercero, con SRI, al terminar de cargar la página.

## SEO

Cada página llama a `<HelmetDatoCms seo={...}/>` con los metadatos que entrega DatoCMS (`aboutNew` incluida desde A3). `gatsby-plugin-react-helmet` los lleva al HTML estático, que siempre sale con `<html lang="es">` (`gatsby-ssr.js`); `Layout` ajusta `lang` al idioma real al montar. `tos`, `privacy`, `credits` y `404` solo tienen título (`Helmet`). `singleventure` queda sin `<title>` (lee su SEO del estado de navegación; página vieja, M4).

`gatsby-plugin-sitemap` genera `/sitemap.xml` al construir (`siteUrl` en `siteMetadata`; excluye `/404`, `/about` y `/singleventure`) y `static/robots.txt` lo declara.

La detección de idioma **no** usa el detector `htmlTag` (`src/i18n/config.js`): el `lang` del HTML es salida del sitio y, si se leyera, ese `es` exacto ganaría a un `en-US` del visitante.

## Código en uso y código muerto

| Estado | Archivos |
|---|---|
| En uso | `layout`, `header`, `footer`, `selector`, `button`, `quickQuote`, `mailChimpForm`, `newCarouselHome`, `testimonyFixed`, `shareButton` |
| Sin ningún `import` | `blogList`, `carouselHome`, `commentsForm`, `confettiAnimation`, `teamlist`, `testimony` |
| Página huérfana | `pages/about.js` |

Comprobado con búsqueda de imports el 2026-10-10. Antes de borrar algo, mirar M4 (rutas que siguen publicadas necesitan redirect).

## Contratos que no hay que romper

- Variable de entorno **`api_key`** (nombre exacto) en Netlify y en `.env`.
- Formulario Netlify **`newsletter`** y su helper `static/forms.html`.
- Rutas públicas existentes (`/aboutNew`, `/blog/<slug>`, `/<slug>`…): si cambian, añadir redirects.
- Versiones mayores de Gatsby, React y plugins (línea 2.x de Gatsby).

## Rediseño en curso (rama `feat/redesign-coral-editorial`, aún no en `master`)

Estructura nueva, que sustituye a la de arriba cuando se fusione:

- **`gatsby-ssr.js`**: `lang="es"`, `<body class="nx-root">`, `color-scheme`, script de tema antes de pintar y precarga de fuentes.
- **`src/styles/`**: `nx.css` (tokens en `:root`/`[data-theme]`, reset acotado a `.nx-root`) y `fonts.css`; fuentes en `static/fonts/`. `styles.css` queda sin importar, como referencia hasta terminar R3.
- **`src/hooks/`**: `useNx` (traducción e idioma estables en el primer render), `useTheme`, `useDialog` (contexto de diálogos).
- **`src/components/`**: `layout` (estructura de toda página; `showCta={false}` en 404 y legales), `header`, `footer`, `ctaBand`, `button`, `dialog`, `formField`, `quoteDialog`, `newsletterDialog`, `media` (único componente de imágenes del CMS), `icons`, `hero`, `marquee`, `testimonials`, `pills`, `postMeta`, `share` (enlaces para compartir), `readMore` (acordeón "Leer más"), `contactAside`; de A8: `honeypotField`, `formErrorText`, `contactErrorText`.
- **`src/utils/`**: `netlifyForm` (envío y antiabuso) y `content` (categorías, punto focal, texto alternativo, fechas, minutos de lectura, `prepareCmsHtml`, que prepara el HTML del CMS: h1→h2, `scope` en `th`, `tabindex` en `pre` y tablas, e `isPlaceholder`/`usefulBlocks`, que ocultan el relleno del CMS). `Layout` acepta `dialogs`: los diálogos propios de una página van fuera de `<main>` porque esa zona queda inerte con un diálogo abierto. Gatsby 2 no admite una consulta de página y otra estática en el mismo archivo. **`src/config/site.js`**: datos del negocio escritos a mano.
- **`src/media-imgs/redesign/`**: imágenes locales del diseño (hero y 404).

Regla para la futura migración de Gatsby: toda imagen del CMS pasa por `Media`, y no se añaden plugins de Gatsby nuevos (ver [dependency-audit.md](dependency-audit.md)).
