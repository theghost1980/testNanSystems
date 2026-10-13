# Prompt para que otra IA redacte el contenido de NaNSYSTEMS

Documento **vivo**. Contiene el prompt completo que se pega en otra IA (Claude, ChatGPT, Gemini…) para que redacte, en español y en inglés, el contenido que hoy falta o está en relleno en DatoCMS. Nace de la revisión de contenido del 2026-10-13 y del CV de Ana ([cv-ana-echeverria.md](cv-ana-echeverria.md)).

## Cómo usarlo

1. Abrir una conversación nueva en la IA elegida.
2. **Adjuntar** el archivo [cv-ana-echeverria.md](cv-ana-echeverria.md) (es la única fuente de datos reales; el prompt lo da por adjunto).
3. Pegar el bloque de abajo, **desde "ROL" hasta el final**, tal cual.
4. Pedir que la respuesta sea **un solo archivo `contenido-nansystems.md`**. Si la IA corta la respuesta, escribir "continúa" hasta que termine la sección 13.
5. Guardar el resultado **fuera del repositorio** o en `docs/` con otro nombre, y traerlo a Claude Code para revisarlo contra el CV antes de tocar el CMS.

## Qué hacer con la respuesta (no se publica nada directamente)

1. **Revisión contra el CV:** cada cifra, puesto, certificación o alianza que aparezca debe estar en [cv-ana-echeverria.md](cv-ana-echeverria.md). Lo que no esté, se quita o se marca para Ana.
2. **Ana aprueba** el posicionamiento (sección 0) y la lista "Pendiente de confirmar" (sección 11). Sin su visto bueno no se carga nada.
3. **Carga al CMS en borrador y con simulacro** (Fase 5 del [roadmap](roadmap.md), tareas C1 a C5), con el método de [datocms-api.md](datocms-api.md). Los artículos de blog van en borrador y los publica el dueño.
4. **Los textos de la interfaz** (secciones 1.x) van a `src/locales/{es,en}/translations.json` con un commit del dueño.
5. **Los testimonios de ejemplo (sección 7) no se publican como reales.** Sirven para maquetar y revisar el diseño; antes de que el sitio salga a producción se sustituyen por testimonios verdaderos (con permiso por escrito) o se borra la sección.

## El prompt

````markdown
ROL
Eres redactor/a senior de contenidos B2B bilingüe (español neutro para Estados Unidos y Latinoamérica, e inglés de EE. UU.), con experiencia en consultoría de ingeniería, energía y TI. Escribes claro, concreto y humano, sin jerga vacía de marketing. Tu trabajo será revisado por la dueña del negocio antes de publicarse.

CLIENTE Y OBJETIVO
NaNSYSTEMS (nansystems.us) es la consultoría de ingeniería de Ana Echeverría, con sede en Austin, Texas (EE. UU.). El sitio es bilingüe (español e inglés). Público: administradores de instalaciones, distritos escolares y organizaciones públicas, pymes y empresas medianas o grandes que necesitan reducir el consumo de energía y agua, operar mejor sus edificios (sistemas de automatización y HVAC), resolver necesidades de TI o gestionar proyectos. Objetivo de cada página: que el visitante entienda en diez segundos qué hace Ana, confíe porque la experiencia es real y pida una cotización.
El sitio ya está rediseñado. Lo que falta es el contenido real: hoy tiene relleno ("Lorem ipsum"), textos copiados de terceros y testimonios de ejemplo. Tu texto los va a reemplazar.

ARCHIVO ADJUNTO
`cv-ana-echeverria.md` es la ÚNICA fuente de verdad sobre Ana: formación, certificaciones, experiencia, cifras, tecnologías y las preguntas que aún no están confirmadas. Léelo completo antes de escribir una sola línea. Presta especial atención a la sección 4 ("lo que el CV deja claro sobre lo que Ana sabe hacer") y a la sección 8 (preguntas abiertas).

REGLAS DE ORO (no negociables)
1. No inventes hechos: ni cifras, ni clientes, ni premios, ni certificaciones, ni alianzas con fabricantes (Red Hat, Tridium, Avnet, Autodesk, etc.), ni años de experiencia distintos de los del CV. Usa solo cifras que estén en el CV y atribúyelas con exactitud (por ejemplo, "132 instalaciones" en Austin ISD).
2. Si algo es necesario pero el CV no lo respalda, escríbelo de forma conservadora, márcalo con [CONFIRMAR] al final de la frase y repítelo en la lista final "Pendiente de confirmar por Ana".
3. Contenido original. No copies ni parafrasees de cerca textos de Wikipedia, de sitios de fabricantes o de anuncios de empleo. Escribe con palabras propias y desde la experiencia real del CV.
4. Voz. En textos de marca y de servicios, la empresa habla en primera persona del plural ("nosotros"). La biografía de Ana va en primera persona del singular. Las entradas del portafolio van sin pronombre, con verbos de acción. No sugieras que hay un gran equipo ("nuestro equipo de especialistas") salvo que el CV lo respalde; si hace falta, usa "Ana y colaboradores especializados cuando el proyecto lo requiere" [CONFIRMAR].
5. Trato en español: "tú" (cercano y profesional) en todo el sitio. No mezcles "tú" con "usted". Ana es mujer: usa el femenino ("ingeniera", "directora").
6. Español e inglés no son traducción literal: adapta cada uno a su idioma (transcreación) conservando la misma información. Evita calcos del inglés ("Adepta", "soluciones específicas" sin tilde, "Empleo" por "Cargo").
7. Estilo: frases cortas, verbos concretos, beneficios medibles solo cuando existan en el CV. Prohibidos los vacíos de marketing ("líderes", "los mejores", "soluciones integrales", "de vanguardia", "llevamos tu negocio al siguiente nivel"). Sin emojis. Exclamaciones solo cuando sean imprescindibles y, en español, siempre con apertura (¡…!). La marca tiene un guiño amistoso con "robots" ("Nuestros robots están felices de trabajar para ti"): puedes conservarlo con moderación, en uno o dos sitios.
8. Formato de los campos de contenido: Markdown básico (negritas, listas, `##` y `###`). Sin H1 dentro del contenido, sin HTML, sin imágenes, sin tablas, sin enlaces tipo "haz clic aquí".
9. Respeta los límites de longitud de cada pieza (se cuentan en caracteres con espacios). Si el límite obliga a recortar, recorta.
10. No incluyas correos, teléfonos ni precios.
11. Si te falta información, NO preguntes: avanza con supuestos y decláralos en la sección 12.

CONTEXTO DEL SITIO (para que encajes el texto)
- Inicio: hero (titular, bajada, chip, rótulo de la foto, tarjeta con los años de experiencia, botón de cotizar), franja de tecnologías, "Lo que hacemos" (3 servicios), testimonios, últimos artículos, banda "¿Hablamos de tu próximo proyecto?" y pie.
- Servicios: hoy se llama "Proyectos" en español y "Ventures" en inglés; son 4 tarjetas con "Leer más" (ventana con el detalle). Además hay 3 páginas de servicio propias (CAD, Linux/Red Hat, IoT/Niagara-Tridium).
- Biografía / Sobre nosotros: texto de bienvenida, 3 tarjetas de áreas y 3 ítems (misión, visión, valores).
- Portafolio: la experiencia de Ana, con detalle desplegable por puesto.
- Blog, Contacto y formulario de cotización.

PROBLEMAS DETECTADOS HOY (no los repitas)
- "Sobre nosotros" muestra un tutorial genérico sobre "cómo redactar la misión, visión y valores de una empresa", no la misión real.
- Hay tres catálogos de servicios que no coinciden (inicio: CAD, Linux, IoT; Proyectos: automatización, gestión de proyectos, diseño web, conservación de energía; áreas: energía, desarrollo web, diseño electromecánico) y tres posicionamientos distintos (automatización de edificios, sistemas de energía, TI genérica).
- Textos de servicios copiados de terceros (Wikipedia, Tridium, Avnet) y presentados como propios; mención de CentOS 7 (fuera de soporte desde 2024); título en español del servicio de IoT: "Niágara y Tridium (Se buscan)".
- Mezcla de "yo" y "nosotros", y de "tú" y "usted".
- Erratas: "Subscribirme", "telêfono", "Energia", "especificas".
- Testimonios de ejemplo atribuidos a empresas reales.
- SEO repetido en todas las páginas, con errores ("Su sistema,nos importa", "PIDA presupuesto gratuito") y la cifra "más de 6 años".

PASO 0: POSICIONAMIENTO Y CATÁLOGO (hazlo primero y úsalo en todo lo demás)
Con base SOLO en el CV, propón UN posicionamiento y UN catálogo único de 4 a 6 servicios. Para cada servicio indica la evidencia del CV (puesto y sección) y el nivel de respaldo (fuerte, parcial o sin respaldo). Lo más fuerte del CV es: conservación de energía y agua y sostenibilidad, automatización de edificios (BAS/HVAC/EMS), consultoría de TI, y gestión de proyectos (MBA y máster). Los servicios heredados sin respaldo en el CV (Niagara/Tridium, IoT como programa propio, Linux como servicio, diseño web, CAD) déjalos fuera del catálogo principal o inclúyelos marcados [CONFIRMAR], y explica por qué. Ana lo aprobará, pero tú sigues escribiendo con tu propuesta para no bloquearte.

ENTREGABLES (cada pieza en español Y en inglés)

Pieza 1 · Marca y microtextos (van a translations.json)
 1.1 Posicionamiento en una frase (≤140) y 3 alternativas de lema (≤60).
 1.2 Hero. Titular en 3 opciones; cada una en 3 partes: línea 1, palabra(s) destacada(s) y palabra(s) en caja (≤45 caracteres entre las tres). Bajada (≤130). Chip (≤30). Rótulo de la foto en MAYÚSCULAS, tipo "FIG. 01 — …" (≤34; no debe afirmar que la imagen sea una obra real: la imagen es un concepto generado). Texto de la tarjeta de años ("años …", ≤55; la cifra se calcula aparte, no la escribas). Texto del botón (≤32).
 1.3 Pie: descripción (≤90) y texto del boletín (≤90; NO prometas frecuencia como "una vez al mes").
 1.4 Banda de cotización: título en 3 fragmentos (el original es "¿Hablamos de tu / próximo / proyecto?") y texto (≤120).
 1.5 Introducciones: Blog (≤90), Contacto (≤90), Servicios (≤120), Portafolio (≤260; usa {{years}} como marcador de los años de experiencia; primera persona de Ana).
 1.6 Meta descripción global del sitio (≤155).
 1.7 Corrección de microtextos. Para cada clave de la tabla de abajo da la versión corregida ES/EN, coherente con la voz y el trato definidos arriba. Añade tú cualquier otro que detectes.
 1.8 Epígrafe del blog: hoy es una cita de Churchill sin autor ni relación con el tema. Propón una frase propia (≤140) o recomienda quitarla.

Pieza 2 · Sobre nosotros
 2.1 Texto de bienvenida (≤420; máximo 2 párrafos). No afirmes que es "una empresa conformada por profesionales de alto perfil" si el CV no lo respalda.
 2.2 Tres tarjetas de áreas (título ≤28), alineadas con el catálogo de la Pieza 0.
 2.3 Misión, Visión y Valores, cada uno como un ítem con: title (≤40), shot_title (la etiqueta corta, ≤24), short_description (240–420 caracteres; la declaración real, NO un tutorial), content (120–220 palabras con `##` y listas; se ve en la ventana "Leer más"). Los valores: 4 o 5, cada uno con una frase concreta de cómo se ve en el trabajo de Ana según el CV (documentación, capacitación bilingüe, medir antes de recomendar, etc.) [CONFIRMAR].

Pieza 3 · Biografía de Ana
 3.1 Titular profesional (≤90) basado en el CV (ingeniera, MBA, máster en Dirección Internacional de Proyectos, LEED Green Associate).
 3.2 Texto de presentación (≤180) y biografía (110 a 150 palabras, primera persona), sin las frases rotas del texto actual.
 3.3 Versión corta (≤300 caracteres) para tarjetas.

Pieza 4 · Servicios
 4.1 Texto de bienvenida de la página (≤380; reemplaza "Yo a esa fuerza la llamo determinación…").
 4.2 Nombre de la sección en el menú: propón uno (por ejemplo "Servicios / Services") y di cómo reconciliar "Proyectos / Ventures".
 4.3 Para cada servicio del catálogo: title (≤60), short_title (≤28; sale en el pie), shot_title (≤24), short_description (≤220), content (200–350 palabras: qué problema resuelve, qué hacemos, cómo trabajamos en 3 o 4 pasos, qué entregamos y para quién; con `##`), categories (3 etiquetas separadas por coma) y slug sugerido (inglés, minúsculas, guiones, ≤50).
 4.4 Para las 3 páginas de servicio que ya existen (CAD, Linux/Red Hat, IoT/Niagara-Tridium): di si se conservan, se fusionan o se retiran, con la razón. Si se conservan, escribe su contenido nuevo (no copiado) y corrige el título en español del servicio de IoT.

Pieza 5 · Portafolio
 Para cada puesto que recomiendes mostrar (sección 5.4 del CV; puedes agrupar la consultoría de TI de 2018–2019 en una sola entrada): job_title, company (sin traducir), place, periodo (el de LinkedIn), job_description (≤200 caracteres), responsibilities (3 a 5 viñetas), summary_tasks (3 a 5 viñetas de tareas habituales), accomplishments (2 a 4 viñetas, solo logros que estén en el CV; si no hay, escribe "—"). Verbos de acción, sin pronombres, sin repetir la misma viñeta en campos distintos. Para puestos sin descripción en el CV: una sola línea conservadora más [CONFIRMAR]. No marques ningún puesto como "actual": Ana lo confirmará.

Pieza 6 · Certificaciones
 Descripción mejorada (ES/EN) de cada certificación de la tabla de la sección 3 del CV, con el formato "Emisor: …" y sin identificadores de credencial. Indica el orden en que mostrarlas (las más relevantes para energía, automatización y gestión de proyectos primero) y cuáles omitirías en la web.

Pieza 7 · Testimonios (tres, DE EJEMPLO; ver reglas más abajo)

Pieza 8 · SEO
 Por página (Inicio, Sobre nosotros, Servicios, Portafolio, Blog, Contacto) y por cada servicio: title (≤60) y description (140 a 155 caracteres), ES y EN, únicos entre sí. Sin "gratis" ni "gratuito" salvo que Ana confirme que la primera consulta lo es [CONFIRMAR]. Sin repetir la misma frase en todas las páginas.

Pieza 9 · Blog
 9.1 Dos artículos completos de arranque (600 a 800 palabras cada uno, ES y EN), útiles y basados en la experiencia del CV (por ejemplo, cómo medir y reducir el consumo de energía y agua en instalaciones grandes; primeros pasos para sacar partido a un sistema de automatización de edificios). Sin prometer resultados numéricos. Para cada uno: title (≤70), slug, categories (3), extracto (≤160), contenido con `##` y `###`, y una frase final que invite a cotizar.
 9.2 Calendario editorial: 8 ideas más (título y una línea cada una).
 Si dudas de un dato técnico, no lo afirmes: márcalo [CONFIRMAR].

Pieza 10 · Ayudas para Ana
 10.1 Plantilla de correo (ES y EN) para pedir testimonios reales a clientes y colegas: breve, cálida, con una casilla de consentimiento para publicar su nombre, cargo y organización.
 10.2 Lista de preguntas para Ana, empezando por las de la sección 8 del CV y añadiendo las que surjan de tu trabajo.

TESTIMONIOS: REGLAS ESPECIALES
El dueño del sitio necesita tres testimonios de ejemplo para maquetar y revisar el diseño. Escríbelos así:
- Cada uno lleva en su encabezado la etiqueta EJEMPLO FICTICIO — NO PUBLICAR COMO REAL.
- Nombres, cargos y organizaciones completamente ficticios y genéricos (por ejemplo, "directora de operaciones de una red de colegios privados"). Sin empresas reales (nada de Apple, Google, etc.), sin personas reales y sin ninguna organización del CV (ni Austin ISD ni otras).
- Tres voces y sectores distintos (por ejemplo, una administradora escolar, un gerente de una cadena de tiendas y un director de una pyme manufacturera).
- Cada uno con: frase corta destacada (≤90), cuerpo (≤220 caracteres), nombre, cargo y tipo de organización; ES y EN. Específicos pero conservadores: sin cifras, sin superlativos y sin resultados no demostrables. Puedes aludir en términos generales a cosas que el CV respalda (capacitación bilingüe, documentación clara, informes de consumo).
- Cierra la sección con esta nota: "Reemplazar por testimonios reales, con permiso por escrito de cada persona y organización, antes de publicar. En EE. UU., publicar testimonios inventados como si fueran reales está prohibido por la FTC."

FORMATO DE LA ENTREGA
Un único archivo Markdown llamado `contenido-nansystems.md`, sin comentarios fuera del archivo. Estructura fija:

# Contenido NaNSYSTEMS (borrador para aprobación de Ana)
## 0. Posicionamiento propuesto y catálogo
## 1. Marca y microtextos
## 2. Sobre nosotros
## 3. Biografía de Ana
## 4. Servicios
## 5. Portafolio
## 6. Certificaciones
## 7. Testimonios (ejemplo, no publicar como reales)
## 8. SEO
## 9. Blog
## 10. Ayudas para Ana
## 11. Pendiente de confirmar por Ana
## 12. Supuestos
## 13. Autoverificación

Dentro de cada pieza, usa este patrón para cada campo, para que luego se pueda cargar con un script al CMS:

### [modelo.campo] identificador
**ES**
(texto)

**EN**
(texto)

`caracteres: ES n / EN n (límite L)`

Los nombres de modelo y campo son los de DatoCMS: `aboutnew.welcome`, `itemsabout.title`, `item.title`, `item.shot_title`, `item.short_description`, `item.content`, `technology.title`, `technology.short_title`, `technology.short_description`, `technology.content`, `technology.categories`, `technology.slug`, `work_experience.job_title`, `work_experience.company`, `work_experience.place`, `work_experience.job_description`, `work_experience.responsibilities`, `work_experience.summary_tasks`, `work_experience.accomplishments`, `about.welcome`, `about.engineer`, `certification.title`, `certification.description`, `testimony.title`, `testimony.content`, `testimony.name`, `blog_post.title`, `blog_post.content`, `blog_post.categories`, `blog_post.slug`, y `translations.<clave>` para los textos de la interfaz.

Si la respuesta no cabe, divídela en partes ("Parte 1/3", "Parte 2/3"…) conservando la estructura, y termina cada parte con "continúa".

SECCIÓN 11 (Pendiente de confirmar por Ana): lista numerada de todo lo marcado [CONFIRMAR], con la pieza donde aparece.
SECCIÓN 12 (Supuestos): lo que diste por hecho para poder avanzar.
SECCIÓN 13 (Autoverificación): una tabla que confirme, regla por regla (1 a 11), que se cumplió, y los límites de longitud que se hayan tenido que recortar.

TABLA DE MICROTEXTOS A CORREGIR (Pieza 1.7)
Clave | Español actual | Inglés actual
menu.about | Biografía | About
menu.ventures | Proyectos | Ventures
menu.ariaHome / ariaAbout / ariaPortfolio / ariaBlog / ariaVentures / ariaContact | "Ir página inicio", "Ir página acerca de"… | "Navigate to home page", "Navigate to venture page"…
footer.contactme | Contáctame en las Redes Sociales | Contact me over Social Media
footer.desc | Automatización e IT por Ana Echeverría. Español · English. | Automation and IT by Ana Echeverría. Español · English.
home.latest | Artículos Recientes | Latest articles
button.getquote | Cotizar por Email | Get quote by Email
subscribe.getgood | Únete a la Familia | Get good News
subscribe.getme | Subscribirme! | I'm in!
subscribe.thanks | Grazie, Gracias, Shukran, 감사합니다! | (igual)
subscribe.text / footer.newsletterText | Artículos técnicos y novedades de proyectos, una vez al mes y sin spam. | Technical articles and project news, once a month and no spam.
contact.intro | Escríbenos y te respondemos lo antes posible. | Write to us and we will reply as soon as possible.
contact.sending | Enviando Correo. Por favor Espere! | Sending Email. Please Wait!
contact.sentOne | Correo Enviado! | Email Sent!
contact.sentTwo | Gracias. Responderé a la brevedad posible. | Thank you. I will reply as soon as possible.
contact.inputName / inputEmail / inputFeedback | nombre acá por favor / correo acá por favor / comentarios/sugerencias acá por favor | name here please / email here please / feedback/comments here please
quickquote.companyUser | Trabajador/Empleado | Company User
quickquote.callme | Llamar sólo durante | Call me during
quickquote.callB / callA | Horario Laboral 9 a.m. - 5 p.m. / Después del Trabajo 5 p.m. - 9 p.m. (sin zona horaria) | Business Hours 9 a.m. - 5 p.m. / After Hours 5 p.m. - 9 p.m.
quickquote.iwill | me pondré en contacto con usted, así que por favor no me llame. | I will contact you, so please do not call me.
quickquote.job | Empleo | Job Title
quickquote.phone / phoneh | Teléfono(opcional) / telêfono acá | Phone(optional) / phone here
quickquote.ourobots / sent | Nuestros robots están haciendo del mundo un lugar mejor :D / Mensaje enviado. Nuestros robots están felices de trabajar para usted! | Our Robots are making the world a better place :D / Message Sent. Our Robots are happy to work for you!
quickquote.wewill | Le responderemos lo antes posible. Por favor, añada nuestro correo electrónico a sus contactos seguros (no se muestra ninguna dirección) | We will answer you as soon as possible. Please add our email to your safe contacts
cta.text | Cuéntanos qué necesitas y recibe una cotización por email. Nuestros robots están felices de trabajar para ti. | Tell us what you need and get a quote by email. Our robots are happy to work for you.
notfound.text | La dirección puede haber cambiado o nunca existió. Nuestros robots ya lo están revisando. | The address may have changed or never existed. Our robots are already looking into it.
portfolio.text | Durante más de {{years}} años de experiencia, he podido trabajar en proyectos medianos y grandes. Cada experiencia ha sido de gran ayuda para completar mis habilidades como ingeniero. | During more than {{years}} years of experience, I have been able to work on medium and large projects. Each experience has been of great help in completing my skills as an engineer.
blog.quote | Escribir un libro es una aventura para empezar… (Churchill, sin autor) | Writing a book is an adventure to begin with… (Churchill, no author)
````

## Notas

- El prompt pide expresamente que **no se invente nada**; aun así, todo lo que devuelva la IA se contrasta con [cv-ana-echeverria.md](cv-ana-echeverria.md). Es el filtro, no la confianza en la IA.
- Los límites de longitud responden al diseño actual (tarjetas, pie, chip del hero y banda de cotización); si cambia el diseño, actualizar aquí.
- Los nombres de modelo y campo son los de [datocms-api.md](datocms-api.md) y del volcado del 2026-10-13; si se cambia el esquema del CMS, actualizarlos.
- Las instrucciones sobre testimonios existen porque el sitio es de un negocio con sede en EE. UU. y los testimonios falsos publicados como reales pueden ser sancionables (FTC, reglas de 2024) y dañan la confianza si se descubren. Para el preview y la maquetación basta con los de ejemplo.
