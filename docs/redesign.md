# Rediseño

Documento **vivo**. Estado de cada fase en [roadmap.md](roadmap.md) (IDs `R0`–`R5`).

## Decisión (R0)

Se comparan las cuatro propuestas enviadas a la clienta (archivos PNG `@1x` de 1440 px, solo la home; **están fuera del repo**):

| Propuesta | Carácter | Fondo |
|---|---|---|
| A · Ingeniería Nocturna | técnico, monoespaciada, acento verde azulado | oscuro |
| B · Azul Corporativo | el más conservador, cercano a la marca actual | claro |
| C · Energía Teal | misma estructura que D con tipografía ancha | claro |
| **D · Coral Editorial** | editorial, cercano, acento coral + azul cobalto | claro |

**Base elegida: D**, con tres detalles tomados de A. Motivos:

- Es un sitio **biográfico y de servicios** de una persona (marca personal) para decisores de empresas de energía e instalaciones; el tono cálido y editorial de D encaja mejor que el de laboratorio de A.
- Mucho texto largo (blog, biografía, portafolio con listas): el fondo claro es más cómodo y es lo que ya asume el contenido de DatoCMS.
- Los logos de Niagara, Red Hat y AutoCAD están pensados para fondo claro; en el mock A se ven apagados.
- D conserva el azul del logo actual (`#285790` en el manifest) en forma de cobalto.
- C empeora la legibilidad del titular (tipografía ancha); B es el más seguro, pero no es la preferida.

**Se elegiría A** si el público principal fueran equipos de TI/DevOps en lugar de instalaciones y energía.

### Detalles de A que se incorporan
1. Microetiquetas en monoespaciada y mayúsculas (`01`, `BMS · 6 MIN DE LECTURA`, `FIG. 01 — …`).
2. Servicios numerados.
3. Tema **oscuro** opcional (paleta propia, ver tokens), apoyado en variables CSS y `prefers-color-scheme`. No se copia la paleta verde azulada de A.

### Riesgos de D a vigilar
- **Blanco sobre coral no pasa** el contraste (2,59:1): los botones coral llevan texto navy (5,84:1).
- El coral **como color de texto sobre fondo claro** tampoco pasa (2,48:1): en claro, solo como fondo o forma.
- El titular enorme puede desbordar en móvil (`inteligentes` a 375 px, en ES y EN): usar `clamp()` y probar.
- La franja que se desplaza debe respetar `prefers-reduced-motion`.

## Tokens

Los valores del modo claro se **midieron de los PNG** de la propuesta D. El modo oscuro es **propuesto** (derivado), con contrastes calculados.

### Modo claro

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FBFAF7` | fondo de página |
| `--surface` | `#FFFFFF` | tarjetas |
| `--text` | `#1C2541` | texto (navy) |
| `--muted` | `#5A6275` | texto secundario |
| `--line` | navy al 25 % | líneas finas |
| `--brand-blue` | `#2B50C8` | tarjeta cobalto, énfasis |
| `--coral` | `#FF7A45` | pastilla activa, botones, tarjeta de testimonio |
| `--band` | `#1C2541` | franja y bloque CTA |

### Modo oscuro (propuesto)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0F1326` | fondo |
| `--surface` | `#181E3A` | tarjetas |
| `--text` | `#F3EFE8` | texto |
| `--muted` | `#A9B0C3` | texto secundario |
| `--line` | `#F3EFE8` al 14 % | líneas |
| `--coral` | `#FF8A5B` | acento (aquí sí puede ser texto) |
| `--brand-blue-text` | `#8EA2FF` | texto y enlaces azules |
| `--brand-blue` | `#2B50C8` | fondo de tarjeta (texto blanco) |
| `--band` | `#1A2142` | franja y CTA |

### Contrastes calculados (WCAG)

| Combinación | Ratio | ¿Pasa AA? |
|---|---|---|
| Navy sobre crema (claro) | 14,47:1 | sí |
| Navy sobre coral | 5,84:1 | sí |
| **Blanco sobre coral** | **2,59:1** | **no** |
| Blanco sobre cobalto | 6,81:1 | sí |
| Cobalto sobre crema | 6,52:1 | sí |
| **Coral como texto sobre crema** | **2,48:1** | **no** (solo decorativo) |
| Gris `#5A6275` sobre crema | 5,85:1 | sí |
| Texto sobre `#0F1326` (oscuro) | 16,05:1 | sí |
| Gris `#A9B0C3` sobre `#0F1326` | 8,48:1 | sí |
| Coral `#FF8A5B` sobre `#0F1326` | 7,92:1 | sí |
| Cobalto claro `#8EA2FF` sobre `#0F1326` | 7,68:1 | sí |

### Tipografía (sugerencia, no medida)
Geométrica sans para títulos y texto (por ejemplo Plus Jakarta Sans) y una monoespaciada para microetiquetas (por ejemplo JetBrains Mono). Las capturas no permiten identificar las fuentes con certeza: confirmar con el archivo fuente si existe. Cargarlas **sin `@import` en el CSS** (ver B3).

## Alcance del mock vs. el sitio

Las propuestas solo muestran la **home**. Para el resto hay que derivar el diseño de D.

| Mock (home) | Componente actual | Notas |
|---|---|---|
| Header con pastilla activa, ES/EN, "Cotizar" | `components/header.js` | Misma navegación (Inicio, Biografía, Portafolio, Blog, Proyectos, Contacto) |
| Hero (titular + bento) | `pages/index.js` + `newCarouselHome.js` | **El carrusel desaparece**; los datos del carrusel en DatoCMS quedarían sin uso |
| Franja de tecnologías | logos en `index.js` | El mock usa texto en lugar de logos |
| "Lo que hacemos" | `dataVenture` (modelo Technology) en `index.js` | Los títulos del mock no coinciden con el CMS (ver decisiones abiertas) |
| Testimonio | `testimonyFixed.js` | Hoy muestra 0 testimonios con códigos de idioma regionales (A2) |
| Artículos recientes | `dataBlogList` en `index.js` | Hoy en orden inverso (M1); los posts del CMS son de prueba |
| Bloque CTA "Cotizar por email" | `button.js` (acción `quote`) → `quickQuote.js` | Reutiliza el modal; arreglar A1 a la vez |
| Footer | `components/footer.js` | El boletín pasaría al pie o a un modal (decisión abierta) |

Sin mock: Biografía (`aboutNew`), Portafolio, Blog y post, Proyectos y detalle, Contacto, modal de cotización, 404, Términos, Privacidad y Créditos.

## Contenido provisional en los mocks

- "[Nombre del cliente]", los dos artículos de ejemplo, "+6 años" y "Respuesta en 24 h" son relleno. Las dos últimas son **afirmaciones comerciales**: confirmar con la clienta antes de publicarlas.
- "Nuestros robots están felices de trabajar para ti" ya existe en las traducciones actuales.

## Plan de implementación

| Fase | Contenido |
|---|---|
| **R0** | Decisión y tokens (este documento). |
| **R0b** | Muestra HTML autocontenida de la home en claro y oscuro, generada con IA a partir de un prompt, **revisada contra los tokens y los contrastes** antes de portarla. |
| **R1** | Base: variables CSS en un solo punto, fuentes (sin `@import`), header y footer nuevos en `Layout`. Como salen en todas las páginas, el resto del sitio hereda el aspecto aunque sin pulir. |
| **R2** | Home. |
| **R3** | Páginas con contenido del CMS: blog y post, proyectos y servicios, biografía, portafolio, contacto y modal de cotización. |
| **R4** | Legales, 404, QA en 375/768/1440 px, accesibilidad, `prefers-reduced-motion`, prueba en `es`, `es-VE` y `en-US`. |
| **R5** | Revisión del preview con la clienta; merge a `master` solo tras su aprobación. |

Realista para el primer día de trabajo: **R0 a R2** (tokens, header/footer y home).

## Restricciones técnicas

- Gatsby 2, React 17 y `gatsby-image` se quedan como están. Solo **CSS plano con variables** (sin Tailwind ni librerías nuevas).
- Las consultas a DatoCMS no cambian salvo que sea imprescindible.
- Rama de código aparte (`feat/redesign-…`), creada **desde `master` una vez fusionados los docs**, para que el rediseño no llegue a producción sin aprobación.
- Netlify: el preview del PR permite revisarlo sin tocar producción. Con 1 de 300 minutos usados hay margen (ver [deploy-netlify.md](deploy-netlify.md)).
- Cuando haya una muestra HTML aceptada, se enlazará aquí y se decidirá si se guarda en `docs/assets/`.

## Estado (2026-10-10, segunda sesión)

**R0 y R0b están hechos.** La IA entregó un paquete (`nansystems-nx`, fuera del repo, ~860 KB) con:

| Pieza | Contenido |
|---|---|
| `nx.css` | Todo el CSS: tokens claro/oscuro, reset acotado a `.nx-root` (`:where`, especificidad cero), componentes `nx-`, `.nx-prose` |
| `nx.js` | Lógica de ejemplo con nombres de futuros hooks (`useTheme`, `useLang`, `useDialog`, `useFormState`, `useMarquee`…) |
| 12 pantallas + `componentes.html` | Datos de ejemplo con la forma exacta del contrato del CMS; cada dato marcado `<!-- CMS: Modelo.campo -->` |
| `SPEC.md` | Tokens, componentes, mapa pantalla→datos, imágenes por slot, claves i18n nuevas, mapa de portado, accesibilidad, presupuesto y supuestos |
| `i18n/nx-new-keys.{es,en}.json` | 103 claves nuevas, mismas en ES y EN, sin pisar ninguna clave existente |

### Revisión independiente
Se revisó contra los datos reales (esquema de DatoCMS, consultas del repo) y en un navegador real, con las fuentes reales. **Se confirmó:** CSS bien acotado (4 `!important`, sin selectores globales), 189 claves `data-i18n` definidas en ES/EN, 38 de 39 referencias al CMS coinciden con campos reales, sin JavaScript y con el sistema en oscuro la página sale en oscuro, diálogos accesibles (foco atrapado, Esc, `inert`, foco devuelto).

**Se corrigió** (en la carpeta del paquete; detalle en su `SPEC.md`, secciones k y l):
- Errores de validación que reaparecían al reabrir un diálogo.
- Cabecera que se salía a 320 px (WCAG 1.4.10), y rejillas de una columna que se ensanchaban con su contenido (post, catálogo, banner de cookies): resultado **208 de 208** combinaciones sin scroll horizontal (13 pantallas × 320/375/768/1440 × claro/oscuro × ES/EN).
- Contratos de formularios: boletín conforme a Netlify Forms; campos de cotización y contacto con los nombres de las variables de EmailJS.
- Consentimiento de cookies guardado en la cookie que lee `gatsby-plugin-gdpr-cookies`.

**No verificado todavía:** `gatsby-image` con `.nx-media`, `data-sal` dentro de Gatsby, lectores de pantalla reales, Safari anterior a 15.4, envío real de EmailJS y Netlify, y la franja animada (el entorno de pruebas fuerza `prefers-reduced-motion`; la lógica se revisó por lectura).

## Requisitos para portar (resumen; el detalle está en la SPEC del paquete, sección k)

1. **Contratos que no se pueden romper:** formulario Netlify `newsletter` (campo `email`, honeypot `bot-field`, `static/forms.html` idéntico, comprobar `response.ok`); variables de las plantillas de EmailJS (cotización y contacto); cookie de consentimiento `gatsby-gdpr-google-analytics`.
2. **SSR sin instalar nada:** `<body class="nx-root">`, `<html lang>`, fuentes y script de tema en el HTML estático con `gatsby-ssr.js` (o con `gatsby-plugin-react-helmet`, hallazgo A3). En React 17, `inert` se pasa como `inert=""`; los hooks que tocan `window` o `localStorage` van en `useEffect`.
3. **CSS en un solo cambio:** `nx.css` entra y `styles.css` (con su regla `html, body { background … !important }`) y los imports de Bootstrap salen juntos; se migran todas las pantallas en la misma rama. No se publican migraciones a medias.
4. **h1 del CMS:** convertir `h1` a `h2` en el contenido de las plantillas de post **y** de servicio.
5. **Consultas:** pedir solo lo que se muestra (ver A6 del roadmap) y quitar las del carrusel viejo, iconos de red del CMS y logos que el diseño ya no usa.
6. **Imágenes:** envolver `<Img fluid>` en `.nx-media` (ratio fijo, recorte por punto focal, texto alternativo del CMS o título como respaldo).

## Siguiente paso: pieza vertical (R1a)
Antes de portar las 11 pantallas restantes se construye una rebanada completa en una rama `feat/redesign-…` (desde `master`, tras fusionar los docs): `layout` nuevo (`gatsby-ssr.js`, tema, idioma, cabecera, pie) + hero de la home alimentado por el CMS con `.nx-media`. Se valida con `npm run build` y `gatsby serve` en local (Node 14) y con el deploy preview. Si algo no encaja (imágenes, SSR, hidratación), se descubre con una pantalla, no con doce.

## Decisiones y avance (2026-10-12)

La clienta dio **carta abierta** para el rediseño. Se trabaja en la rama `feat/redesign-coral-editorial` (desde `master`), se prueba en local y se abre un **PR en borrador** contra `master` solo para obtener deploy previews (los branch deploys están apagados); **no se fusiona hasta que ella apruebe**.

### Decisiones
1. **Gatsby 2, React 17 y `gatsby-image` se quedan** durante el rediseño. Migrar (React 18 exige Gatsby ≥ 4.13; Gatsby 5 exige React ≥ 18 y Node ≥ 18) mezclaría dos riesgos y el plugin de DatoCMS para Gatsby está en mantenimiento y archivado. Se decide después, con un spike de un día; análisis en [dependency-audit.md](dependency-audit.md).
2. **Reglas para que el rediseño no encarezca esa migración:** un solo componente `Media` para todas las imágenes del CMS (hoy 17 archivos importan `gatsby-image`, hay 50 fragmentos `fluid` y 26 `<Img>`); ningún plugin de Gatsby nuevo; retirar `bootstrap`, `react-bootstrap` y `react-cookie-consent` (y, según A4, `gatsby-plugin-gdpr-cookies`).
3. **Fuentes autoalojadas** (en vez de Google Fonts): 5 archivos `woff2` latinos en `static/fonts/` (70 KB; Plus Jakarta Sans 400/500/600/800 y JetBrains Mono 500), licencia OFL-1.1 con sus textos junto a los archivos, `@font-face` en `src/styles/fonts.css`. Sin petición a terceros y sin `@import`. Los preloads de las fuentes críticas se añaden en `gatsby-ssr.js` cuando el nuevo `Layout` las use.
4. **Textos realistas** en ES y EN al portar cada pantalla, sin cifras ni promesas no verificables (ver "Decisiones abiertas" del roadmap).
5. **Imágenes con IA (Gemini)** solo para portadas de concepto; no se generan personas reales, retratos de la clienta ni testimonios. Si una imagen generada ocupa el hero, el rótulo "FIG. 01 — INTEGRACIÓN EN SITIO" no puede sugerir que es una obra real.
6. **Google Analytics (A4):** se evaluará si compensa mantenerlo antes de diseñar el banner de cookies definitivo.

### La SPEC del paquete quedó desactualizada en estos puntos (adaptar al portar)
- **Formularios (k.1–k.3, g):** asume EmailJS. Desde A8 contacto, cotización y boletín usan `submitNetlifyForm` (`src/utils/netlifyForm.js`), `FormErrorText`, `HoneypotField` y el límite por navegador; los campos de contacto son `name`, `email`, `message` y los de cotización los de `static/forms.html`. La validación en cliente del diseño debe sumarse a eso, no sustituirlo.
- **SSR y cabecera (k.5, g):** `gatsby-plugin-react-helmet` ya está instalado (A3) y `gatsby-ssr.js` ya fija `<html lang="es">`; `Layout` ajusta `lang` al montar y `i18n/config.js` ya no usa el detector `htmlTag`. Añadir `nx-root` en `<body>`, el script de tema y los preloads de fuentes ahí, sin duplicar el mecanismo de `lang`.
- **Correo de contacto:** ya existe `GATSBY_CONTACT_EMAIL` (variable de entorno, fuera del repo); el `contacto@nansystems.us` del paquete es solo un ejemplo.
- **Cookies (k.4):** el banner nuevo sustituye a `react-cookie-consent`; qué hace con Google Analytics depende de A4.

### Avance de R1a
- **Paso 1 (hecho):** `static/fonts/` + `src/styles/fonts.css` + `src/styles/nx.css` (copia sin cambios del paquete), importados desde `Layout`. Son **inertes**: los tokens van en `:root` y el reset está acotado a `.nx-root`, que aún no se aplica. Comprobado: mismas rutas y `page-data`, y la huella de estilos calculados de 5 páginas (`/tos/`, `/privacy/`, `/contact/`, `/blog/`, `/aboutNew/`) es idéntica a la de antes; las fuentes cargan de `/fonts/` con acentos y ñ. Las peticiones a Google Fonts que siguen apareciendo son las del CSS viejo (`@import` de Tenor Sans, Fira Sans y Signika) y se van con `styles.css`.
- **Paso 2 (hecho):** `Layout` nuevo (`nx-root` en `<body>` desde `gatsby-ssr.js`, script de tema y precarga de fuentes; cabecera con menú móvil, selector ES/EN y botón de tema; pie con servicios y redes del CMS; banda de cotización; diálogos de cotización y boletín accesibles y conectados al helper de A8). Se retiran los imports de `styles.css` y Bootstrap (SPEC k.6); el archivo `styles.css` queda como referencia hasta terminar R3.
- **Paso 3 (hecho):** home completa: hero (imagen local, cifra "+11", tarjeta de cotización), franja de tecnologías, servicios, testimonios y artículos recientes con datos del CMS, todo a través del componente `Media`.
- **Paso 4 (parcial):** verificado con el build de producción por mediciones del DOM (sin desborde de 320 a 1920 px, comportamiento de menú, idioma, tema y diálogos, 15 rutas sin errores); la revisión visual completa la hace el dueño en su navegador porque las capturas del entorno no son fiables al desplazarse. **Pendiente:** PR en borrador para el primer preview cuando haya bastantes pantallas.

### Decisiones tomadas al portar la home (2026-10-12)
- **El hero es un archivo local**, no `carouselHome[0]` del CMS: el carrusel antiguo trae fotos de 2020 y siempre ganaría. Cambiar a la fuente del CMS es una línea en `src/components/hero.js`.
- **La cifra "+11 años"** sale de `TECH_CAREER_START_YEAR = 2015` en `src/config/site.js`, no del primer empleo (2008 es coordinación de recursos humanos). Pendiente de confirmar con la clienta.
- **El rótulo del hero** pasa de "FIG. 01 — INTEGRACIÓN EN SITIO" (afirma una obra real) a "FIG. 01 — AUTOMATIZACIÓN DE EDIFICIOS", porque la imagen es de concepto.
- **`react-cookie-consent` y el banner antiguo se mantienen** hasta decidir A4.
- **Primer render estable** (`useNx`): hasta montar se usa español, para que ningún atributo dependiente del idioma quede obsoleto tras hidratar (A7).
- **Diálogos que se montan solo al abrirse:** su formulario se reinicia al cerrar y no hay contenido oculto en el HTML.
