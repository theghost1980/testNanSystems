# Arquitectura

## Stack (versiones observadas el 2026-10-10)

| Pieza | Versión / detalle |
|---|---|
| Gatsby | 2.32.13 (la misma que sirve producción) |
| React / ReactDOM | 17.0.2 |
| CMS | DatoCMS vía `gatsby-source-datocms` 2.6.18 |
| Imágenes | `gatsby-image` (fluid) + `gatsby-plugin-sharp` + `sharp` 0.27.2 |
| i18n | i18next 19.9.2 + react-i18next 11.18.6 + language detector |
| Estilos | un único `src/styles/styles.css` global; Bootstrap 4 solo para el carrusel |
| Formularios | EmailJS (contacto y cotización) y Netlify Forms (boletín) |
| Analítica / cookies | `gatsby-plugin-google-gtag`, `react-cookie-consent`, `gatsby-plugin-gdpr-cookies` |
| Hosting | Netlify, build desde GitHub (`master`) |

## Carpetas

```
gatsby-config.js     plugins; lee la variable api_key (DatoCMS)
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
| Contacto | `pages/contact.js` | EmailJS |
| Cotización (modal) | `components/quickQuote.js`, abierto desde `components/button.js` (acción `quote`) | EmailJS |
| Boletín | `components/mailChimpForm.js` (exporta `NetlifyForm`; el nombre es histórico) | POST a `/` con `form-name=newsletter` → Netlify Forms |
| Comentarios | `components/commentsForm.js` | **Sin uso** |

El formulario `newsletter` solo existe en el DOM cuando se abre el modal, por eso `static/forms.html` lo declara en HTML estático para que Netlify lo registre en el build. **Los dos deben mantenerse sincronizados** (nombre `newsletter`, campo `email`).

## Analítica, cookies y accesibilidad

- `gatsby-plugin-google-gtag` inyecta Google Analytics en producción.
- `react-cookie-consent` (en `Layout`) muestra el banner, pero **no controla la carga de GA** (hallazgo A4).
- `gatsby-plugin-gdpr-cookies` está configurado sin ningún `trackingId`, por lo que hoy no hace nada.
- `gatsby-browser.js` carga el widget de accesibilidad de un tercero, con SRI, al terminar de cargar la página.

## SEO

Cada página llama a `<HelmetDatoCms seo={...}/>` con los metadatos que entrega DatoCMS. El proyecto **no tiene `gatsby-plugin-react-helmet`**, así que esos metadatos no llegan al HTML estático (hallazgo A3). Sin SEO propio: `aboutNew`, `404`, `credits`, `privacy`, `tos`.

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
