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
- Rama de código aparte (`feat/redesign-…`), creada desde `docs/project-documentation`, para que los docs puedan fusionarse antes y el rediseño no llegue a producción sin aprobación.
- Netlify: el preview del PR permite revisarlo sin tocar producción. Con 1 de 300 minutos usados hay margen (ver [deploy-netlify.md](deploy-netlify.md)).
- Cuando haya una muestra HTML aceptada, se enlazará aquí y se decidirá si se guarda en `docs/assets/`.
