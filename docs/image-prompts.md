# Prompts para generar las imágenes del rediseño (Gemini)

Documento **vivo**. Las imágenes viven en DatoCMS (no en el repo); este archivo solo guarda los prompts, las medidas de cada hueco y los textos alternativos. Medidas y huecos salen de la SPEC del rediseño (sección d) y de [redesign.md](redesign.md).

## Reglas (leer antes de generar)

1. **Solo imágenes de concepto** (portadas, ambientes, objetos). **No** generar a la clienta ni a clientes reales, ni testimonios, ni retratos: serían personas falsas en un sitio de marca personal. Las fotos de personas reales se suben tal cual.
2. **No presentar una imagen generada como una obra real.** El rótulo de ejemplo del hero ("FIG. 01 — INTEGRACIÓN EN SITIO") afirma una integración real: con una imagen generada se cambia por uno neutro (por ejemplo "FIG. 01 — AUTOMATIZACIÓN"). Lo mismo en el portafolio.
3. **Sin texto, logotipos ni marcas** en las imágenes (los generadores los deforman y los logos de Niagara, Red Hat o AutoCAD no se pueden inventar). Las pantallas salen como formas abstractas y borrosas.
4. **Sin caras reconocibles**: si aparece una persona, de espaldas, recortada a los hombros o solo las manos. Revisar siempre manos y dedos.
5. Google marca las imágenes de Gemini con **SynthID** (invisible) y la app puede añadir una marca visible según el plan: si la hay, recortarla o regenerar desde AI Studio. Confirmar en los términos del plan que permite uso comercial.

## Cómo trabajar con Gemini

1. Abrir una conversación nueva (Gemini o AI Studio) y pegar primero el **prompt maestro de estilo**. Así todas las imágenes comparten luz, color y cámara.
2. Pedir **una imagen por mensaje** con el prompt de cada hueco. Si sale en otra proporción: "Regenerate at exactly 3:2".
3. Para ajustar sin perder el estilo: "Same image, but …" o "Keep the same lighting, colour grade and camera style as the previous images".
4. Pedir siempre la mayor resolución disponible. Si la imagen sale con menos de 1800 px en el lado largo, escalarla ("Upscale this image to the highest resolution without changing any detail") o usar un escalador aparte.
5. Descartar imágenes con texto, manos o dedos raros, caras, logos o más de un acento coral.
6. Exportar a **JPG calidad 80–85**, sin pasarse de ~300 KB (el hero, ≤ 200 KB), con nombre descriptivo. Subir a DatoCMS, **fijar el punto focal** y rellenar el **texto alternativo** (hoy está vacío en el 100 % de las imágenes).

## Prompt maestro de estilo (pegar primero)

```
You are my art director and photographer. For every image I ask for in this conversation, follow this STYLE BIBLE strictly.

LOOK: editorial documentary photography for the website of an engineering consultancy (building automation, IT infrastructure, technical design). Photorealistic, shot on a full-frame camera with a 35mm lens, natural window light mixed with soft cool overhead light, shallow-to-medium depth of field, matte finish, very fine film grain, gentle contrast. Calm, tidy, uncluttered, with generous negative space.

COLOUR GRADE: deep navy blue shadows (#1C2541), warm cream highlights (#FBFAF7), a restrained cobalt blue (#2B50C8) in screens, cables or clothing, and exactly ONE small coral-orange accent (#FF7A45) per image (a cable tie, a label tape, a jacket cuff, a small lamp). Never more than one coral element.

HARD RULES: no text, letters, numbers, logos, brand marks, signage or watermarks anywhere. Screens and displays show only abstract, softly blurred, unreadable interface shapes. No identifiable faces: if a person appears, show them from behind, cropped at the shoulders, or only their hands (correct anatomy, five fingers). No handshakes, no glowing holograms, no floating icons, no robots, no neon, no sci-fi. Not an illustration, not a 3D render.

OUTPUT: always respect the aspect ratio I give and deliver the highest resolution available.

Reply only "Ready" and wait for my first image request.
```

## Hero de la home (`InfoSite.carouselHome[0]`)

Se ve a 896×540 en escritorio y recortado a 4:5 en móvil. Insignia arriba a la derecha y chip abajo a la izquierda: esas dos esquinas deben quedar tranquilas. En DatoCMS, fijar el punto focal en el centro del sujeto.

| | |
|---|---|
| Proporción / tamaño | 3:2 horizontal · 1800×1200 mínimo |
| Archivo | `hero-sala-tecnica.jpg` |
| Alt ES | Técnico, de espaldas, revisando un tablero de control ordenado en la sala técnica de un edificio |
| Alt EN | Technician, seen from behind, reviewing a tidy control cabinet in a building's technical room |

**H1 · Sala técnica (recomendada)**

```
Generate a wide, calm editorial photograph inside the technical room of a modern commercial building. A technician seen from behind and slightly from the side (no face visible), wearing a plain dark navy work jacket, holds a tablet whose screen shows only abstract, blurred blue dashboard shapes. In front of them an open, immaculately organised electrical control cabinet with neatly routed navy and cobalt-blue cables and a single small coral-orange cable-tie bundle (the one coral accent). Behind them, softly out-of-focus insulated pipes and ductwork in cream and grey, and a large window with soft daylight from the left. Camera at eye level, slightly low, 35mm, shallow depth of field. Composition: the main subject (technician plus cabinet) occupies one vertical band no wider than 45% of the frame, left of centre; keep the top-right corner and the bottom-left corner empty, low-detail and low-contrast, because interface labels will sit there; keep the important content within the central 85% of the height. Aspect ratio 3:2, landscape, highest resolution.
```

**H2 · Mesa de diseño (alternativa más cálida)**

```
Generate a warm editorial top-down-at-an-angle photograph of an engineer's desk by a window: printed technical floor-plan drawings made only of abstract thin lines (no text or numbers), an architect's scale ruler, a pencil, a closed laptop, a ceramic cup, and two hands (no face) pointing at the drawing. One small coral-orange element only (the pencil or a sticky tab). Soft morning light from the left, cream and navy palette, cobalt-blue accent on the laptop sleeve. Main subject in the left-centre band (no wider than 45% of the frame); keep the top-right and bottom-left corners calm and low-detail. Aspect ratio 3:2, landscape, highest resolution.
```

## Servicios (`Technology.coverImage`)

3:2 · 1800×1200 mínimo · se ve hasta 1256 px de ancho. Los títulos del mock no coinciden con los del CMS (CAD, Red Hat, IoT inalámbrico): ajustar el sujeto al servicio real cuando se defina.

**S1 · Automatización de edificios (BMS / HVAC)**

```
Generate a close editorial photograph of a modern building-automation controller module mounted on a DIN rail inside an open panel, with neatly routed navy and cobalt-blue wiring and one small coral-orange label tape strip (the only coral element). A gloved technician's hand enters the frame from the right edge holding a small screwdriver (hands only, no face). Shallow depth of field, soft cool overhead light, a blurred plant room with pipes behind. Calm negative space on the left third. Aspect ratio 3:2, landscape, highest resolution.
```
Alt ES: Mano de técnico trabajando en un módulo de control de automatización de edificios · Alt EN: Technician's hand working on a building-automation control module

**S2 · Infraestructura IT y Linux**

```
Generate an editorial photograph looking down a tidy server aisle in a small data room: two rows of dark server racks with perfectly organised navy and cobalt-blue patch cables and small cobalt-blue status lights, soft cool light from above, polished concrete floor with gentle reflections. A single coral-orange cable tie on one cable is the only coral element. No logos, no labels, no readable text on any device. One-point perspective, shallow depth of field, calm negative space on the right third. Aspect ratio 3:2, landscape, highest resolution.
```
Alt ES: Pasillo ordenado de servidores con cableado organizado · Alt EN: Tidy server aisle with organised cabling

**S3 · Diseño técnico (CAD)**

```
Generate an editorial photograph of technical design work on a wooden desk by a window: a large printed technical drawing made only of abstract fine lines and symbols (no text, no numbers), an architect's scale ruler, a mechanical pencil, and a laptop whose screen shows only blurred abstract line geometry. One hand (no face) rests on the paper. A single coral-orange element (the pencil). Warm daylight from the left, cream and navy palette. Shallow depth of field, calm negative space on the right third. Aspect ratio 3:2, landscape, highest resolution.
```
Alt ES: Mesa de trabajo con un plano técnico, escalímetro y portátil · Alt EN: Work desk with a technical drawing, scale ruler and laptop

**S4 · IoT inalámbrico**

```
Generate a close editorial photograph of a small white wireless sensor device with a short antenna mounted on a painted wall next to a pipe in a clean industrial-office corridor, softly out-of-focus corridor behind it with cool light. A technician's hand (no face) adjusts it from the right edge. One small coral-orange element (a thin label tape under the sensor, with no text). Cream wall, navy shadows, a hint of cobalt blue. Calm negative space on the left half. Aspect ratio 3:2, landscape, highest resolution.
```
Alt ES: Sensor inalámbrico instalado junto a una tubería · Alt EN: Wireless sensor installed next to a pipe

## Biografía: tarjetas (`Aboutnew.aboutarea[].image`)

1:1 · 800×800 mínimo · se ve a unos 400 px. Títulos actuales del CMS: Conservación de Energía, Diseño Electromecánico, Desarrollo Web.

**A1 · Conservación de energía**

```
Generate an editorial photograph of a bright, efficient building atrium with a large skylight, clean LED strip lighting along the ceiling and a calm, empty polished floor, soft natural light, cream and navy palette, one small coral-orange element only (a lamp shade or a bench cushion). No people, no text. Centred composition with generous negative space. Aspect ratio 1:1 square, highest resolution.
```
Alt: Atrio luminoso y eficiente con claraboya e iluminación LED / Bright, efficient atrium with a skylight and LED lighting

**A2 · Diseño electromecánico**

```
Generate a close editorial photograph of a clean electric motor and pump assembly with neat pipework and a tidy motor-control panel in a mechanical room, navy and cobalt-blue painted pipes, one small coral-orange valve handle (the only coral element), soft cool light, shallow depth of field. No people, no text. Subject centred, calm negative space around it. Aspect ratio 1:1 square, highest resolution.
```
Alt: Motor y bomba con tuberías ordenadas en una sala de máquinas / Motor and pump with tidy pipework in a mechanical room

**A3 · Desarrollo web**

```
Generate an editorial photograph of a clean developer's desk: an open laptop whose screen shows only abstract, blurred coloured line shapes (unreadable, no text), a notebook, a ceramic cup and two hands (no face) resting on the keyboard. One small coral-orange element only (a sticky tab). Soft daylight from a window on the left, cream and navy palette with a hint of cobalt blue. Subject centred, calm negative space. Aspect ratio 1:1 square, highest resolution.
```
Alt: Escritorio de desarrollo con portátil y cuaderno / Developer's desk with a laptop and notebook

## Proyectos (`Venture.sidePicture`)

```
Generate an editorial photograph of a modern low-rise commercial building at blue hour: a clean facade with warmly lit windows, a few neat architectural lines, a calm sky in deep navy fading to cream near the horizon, one small coral-orange element only (a lit entrance canopy). No people, no text, no signage. The building fills the lower two-thirds; calm empty sky above. Aspect ratio 4:5 vertical, highest resolution (at least 1000×1250).
```
Alt: Edificio comercial moderno al anochecer con ventanas iluminadas / Modern commercial building at dusk with lit windows

## Portadas de blog (`BlogPost.coverImage`)

16:10 · 1280×800 mínimo. La portada del post se ve a 2:1: componer con el sujeto en la franja central para que el recorte funcione. **Los posts actuales son de prueba**: estas tres sirven de plantilla para los reales.

**B1 · Integrar sistemas heredados**

```
Generate an editorial close-up photograph of a bundle of old, tangled grey cables on the left transitioning into neat, parallel, labelled-by-colour navy and cobalt-blue cables on the right, entering a clean equipment cabinet; one small coral-orange cable tie at the transition point (the only coral element). Shallow depth of field, soft cool light. No text, no labels with writing. Subject centred horizontally with calm margins left and right. Aspect ratio 16:10, landscape, highest resolution.
```

**B2 · Seguridad en servidores**

```
Generate an editorial close-up photograph of a brushed-steel padlock hanging on the handle of a dark server-rack door, with out-of-focus rows of racks and cobalt-blue status lights behind it; a single small coral-orange tag with no writing on the padlock shackle (the only coral element). Shallow depth of field, cool light. No text, no logos. Subject in the central band, calm margins left and right. Aspect ratio 16:10, landscape, highest resolution.
```

**B3 · Eficiencia energética**

```
Generate an editorial photograph of a wall-mounted tablet in a building's plant room showing only an abstract, blurred set of smooth line charts in cobalt blue and cream (no numbers, no text), with pipes and an electrical panel softly out of focus behind; one small coral-orange cable tie nearby (the only coral element). Soft daylight from the side, navy shadows. Subject in the central band, calm margins left and right. Aspect ratio 16:10, landscape, highest resolution.
```

**Plantilla para nuevas portadas** (sustituir lo que va entre corchetes):

```
Generate an editorial photograph that illustrates "[TOPIC]" without any text: [SCENE OR OBJECT, e.g. "a close-up of a technician's hand on a thermostat panel"], with exactly one small coral-orange accent, shallow depth of field, cream and navy palette with a hint of cobalt blue, subject in the central band with calm margins left and right. No faces, no text, no logos. Aspect ratio 16:10, landscape, highest resolution.
```

## Página 404 (`InfoSite.notFoundImg`)

1:1 · 800×800 mínimo.

```
Generate a minimal, slightly playful editorial top-down photograph of a single unplugged Ethernet cable with its connector lying on a smooth cream surface, its other end curling out of frame, with one small coral-orange cable tie around it (the only coral element). Soft shadows, navy shadow tones, a lot of calm negative space. No text, no labels. Aspect ratio 1:1 square, highest resolution.
```
Alt: Cable de red desconectado sobre una superficie clara / Unplugged network cable on a light surface

## Lo que no se genera

- **Retrato de Ana ni de ningún cliente**, ni los avatares de testimonios: usar fotos reales, o ocultar la sección (la SPEC oculta los testimonios si no hay ninguno).
- **Logos** de Niagara/Tridium, Red Hat o AutoCAD y los de créditos: se usan los oficiales o texto.
- **Imágenes dentro de los posts** (`.nx-prose`): las de cada artículo, según su tema, con la plantilla de portada.
