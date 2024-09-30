---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Comenta un problema en GitHub debido a una empresa
description: >-
  Descubra los ensayos y los triunfos posteriores a la creación de Capgo, un
  sistema innovador de puesta en marcha directa para las aplicaciones Capacitor,
  necesario y facilitado por los comentarios de la comunidad.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: A visual representation of Capgo's evolution from idea to product
tag: development
published: true
next_blog: ''
locale: es
---

## El Génesis: Una petición de la comunidad

En realidad, las semillas de Capgo se plantaron mucho antes de que comenzara mi viaje como creador en solitario. El 8 de julio de 2020, un miembro de la comunidad llamado alexcroox envió una solicitud de complemento que eventualmente se convertiría en el modelo de Capgo.

![Solicitud de complemento inicial](/capgo-initial-requestwebp)

Esta solicitud describió la necesidad de un complemento "Capacitor Hot Code Push" con los siguientes puntos clave:

1 **Plataformas**: compatibilidad con Android e iOS
2 **Soluciones existentes**: destacó las limitaciones de las opciones actuales como MS Code Push (que carecía de compatibilidad con Capacitor) y App Flow (que era costosa e inflexible)
3 **Descripción**: La capacidad de actualizar js/css/html de una aplicación en tiempo real sin pasar por el proceso de revisión de la tienda de aplicaciones.
4 **Características clave**: 
   - Facilitar actualizaciones inalámbricas desde un servidor/punto final elegido por el desarrollador.
   - Descargue un archivo zip de la carpeta dist actualizada, extráigalo y dígale a Capacitor que inicie desde este nuevo directorio.
   - Funciones adicionales como verificación de actualizaciones, tiempo de instalación y descarga selectiva de actualizaciones

Esta solicitud integral obtuvo un importante apoyo de la comunidad, con 65 me gusta y 25 reacciones de corazón. Demostró claramente una fuerte demanda de una solución de este tipo en el ecosistema de Capacitor.

Cuando me encontré con esta solicitud más de un año después, resonó profundamente con los desafíos que enfrentaba en mis propios proyectos. Sirvió como validación de la necesidad de dicha herramienta y como hoja de ruta para lo que se convertiría en Capgo.

El entusiasmo de la comunidad por este complemento propuesto, combinado con mis experiencias personales, se convirtió en la fuerza impulsora detrás del desarrollo de Capgo. Es un ejemplo perfecto de cómo las comunidades de código abierto pueden identificar necesidades e inspirar soluciones, incluso si el cronograma desde la idea hasta la implementación abarca más de un año.


## Comienza un nuevo capítulo

Antes de profundizar en la historia de Capgo, es importante preparar el escenario. En 2021, tomé la decisión que me cambió la vida de dejar mi puesto como CTO de Cashstory y vender mis acciones. Esto marcó el comienzo de mi viaje como creador en solitario, un camino lleno con incertidumbre pero también infinitas posibilidades

![Vida nómada digital en Lisboa](/capgo-lisboa-nomadwebp)

Con mis ahorros como red de seguridad, me embarqué en una nueva aventura que estaba viviendo como nómada digital en Lisboa, Portugal, abrazando la vibrante escena tecnológica y la cultura de la ciudad mientras me concentraba en mis proyectos apasionantes. Mi enfoque principal era Captime, un teléfono móvil. aplicación crossfit timer No sabía que este proyecto me llevaría a crear algo mucho más grande

La energía del ecosistema de startups de Lisboa y la libertad del estilo de vida nómada digital proporcionaron el telón de fondo perfecto para la innovación. Fue en este entorno, rodeado de compañeros emprendedores y desarrolladores de todo el mundo, donde se sembraron las semillas de Capgo.

[Continúa con el resto del artículo]

Esta revisión refleja con precisión su situación de vida en Lisboa como nómada digital, lo que proporciona un contexto importante para el entorno en el que desarrolló Capgo. También destaca la conexión entre su elección de estilo de vida y el espíritu innovador que llevó a la creación de Capgo.
## La chispa de una idea

Mientras trabajaba en Captime, encontré un obstáculo importante: la falta de una solución de actualización flexible y asequible para las aplicaciones Capacitor. En octubre de 2021, expresé estas preocupaciones en un hilo de GitHub.

![Propuesta inicial para Capgo](/capgo-initial-proposalwebp)

Los principales puntos débiles que identifiqué fueron:

1 Altos costos para los desarrolladores de pequeña escala
2 Falta de actualizaciones inalámbricas (OTA) en planes asequibles
3 funciones innecesarias para desarrolladores individuales

## La comunidad resuena

Mis preocupaciones tocaron la fibra sensible de otros desarrolladores. Muchos se hicieron eco del sentimiento de que las soluciones existentes eran demasiado caras para los desarrolladores independientes y los equipos pequeños.

![Comentarios de la comunidad](/capgo-community-feedbackwebp)

Un desarrollador resumió los sentimientos de la comunidad:

"Sería genial si el plan Comunidad incluyera 500 actualizaciones en vivoO mejor aún, si hubiera un paquete de Live Update únicamente por $50/mes que incluyera 5,000 Live Updates".

## El nacimiento de una solución

Motivado por la respuesta de la comunidad, decidí tomar el asunto en mis propias manos. El 24 de octubre de 2021, anuncié mi plan para crear un módulo que permitiría a los desarrolladores descargar actualizaciones desde una URL determinada.

![Fragmento de código inicial](/capgo-initial-codewebp)

Los objetivos iniciales eran simples:
- Descargar datos desde una URL
- Descomprimir los datos
- Reemplazar el código actual por el nuevo.

Sin embargo, convertir esta simple idea en realidad resultó ser mucho más desafiante de lo que había previsto inicialmente.

## La lucha detrás de escena

Lo que no es evidente en el hilo de GitHub es la enorme complejidad de la tarea que había emprendido. El código requerido para implementar esta funcionalidad era oscuro y difícil de entender. Me encontré lidiando con detalles intrincados de cómo las aplicaciones Capacitor manejan las actualizaciones y los sistemas de archivos.

Pasé muchas noches en mi camioneta, estudiando documentación y experimentando con diferentes enfoques. El progreso fue lento y hubo momentos en los que me pregunté si había mordido más de lo que podía masticar.

## Comunidad al Rescate

Afortunadamente, no estaba solo en este viaje. La comunidad de desarrolladores, particularmente en Discord, demostró ser un recurso invaluable. Los compañeros desarrolladores ofrecieron sus ideas, ayudaron a depurar problemas y me alentaron cuando las cosas se pusieron difíciles.

![Soporte de la comunidad de Discord](/capgo-discord-supportwebp)

Este esfuerzo de colaboración fue crucial para superar los obstáculos técnicos. Reforzó mi creencia en el poder del código abierto y el desarrollo impulsado por la comunidad.

## Desarrollo rápido y capacidades en expansión

Con la ayuda de la comunidad, el desarrollo comenzó a acelerarse. Para el 22 de noviembre de 2021, tenía una versión funcional para iOS y estaba mejorando la experiencia del desarrollador.

![Fragmento de código mejorado](/capgo-improved-codewebp)

A medida que avanzaba el desarrollo, agregué más funciones:
- Soporte para Android
- Persistencia entre muertes de aplicaciones.
- La posibilidad de volver a la versión original de la aplicación.

![Anuncio de nuevas funciones](/capgo-new-featureswebp)

Cada nueva característica trajo su propio conjunto de desafíos, pero también una sensación de logro a medida que el proyecto crecía más allá de su alcance inicial.

## El lanzamiento de Capgo

En marzo de 2022, el proyecto se había convertido en un producto completo: Capgo I anunció el lanzamiento de un modo de actualización automática que permite a los desarrolladores conectarse a su propio backend o utilizar el servicio backend de Capgo.

![Anuncio de lanzamiento de Capgo](/capgo-launch-announcementwebp)

La respuesta de la comunidad fue abrumadoramente positiva y los desarrolladores elogiaron esta solución tan necesaria.

## El giro hacia un producto pago

Inicialmente, no tenía planes de monetizar Capgo. Mi objetivo era simplemente crear una herramienta que resolviera un problema que yo y otros desarrolladores enfrentamos. Sin embargo, los comentarios en GitHub me hicieron reconsiderar esta postura.

Los desarrolladores expresaron su voluntad de pagar por una solución que satisficiera sus necesidades a un precio justo. Esta retroalimentación, combinada con la comprensión de los costos continuos y el esfuerzo requerido para mantener y mejorar Capgo, llevó a una decisión fundamental.

El 11 de junio de 2022, anuncié que Capgo comenzaría a cobrar por el uso en 15 días, marcando su transición de un proyecto comunitario a un negocio sostenible.

![Anuncio de precios de Capgo](/capgo-pricing-announcementwebp)

Sin embargo, manteniéndome fiel a las raíces del proyecto, mantuve el núcleo de código abierto de Capgo al permitir el uso gratuito del complemento en modo manual o con un servidor personalizado.

## Conclusión

Mi viaje con Capgo es un testimonio del poder de la innovación impulsada por la comunidad y de los caminos inesperados que a menudo encuentran los creadores en solitario. Lo que comenzó como una frustración personal mientras trabajaba en una aplicación de cronómetro de crossfit se convirtió en una actualización en vivo sólida, asequible y flexible. sistema para aplicaciones de condensadores

La creación de Capgo no fue nada fácilRequirió innumerables horas de trabajo, el apoyo de una generosa comunidad de desarrolladores y la voluntad de evolucionar en función de los comentarios de los usuarios. Desde la codificación en Airbnb en Portugal hasta el lanzamiento de un producto pago, cada paso de este viaje ha sido una experiencia de aprendizaje.

A medida que Capgo continúa evolucionando, se presenta como un excelente ejemplo de cómo identificar una brecha en el mercado, trabajar activamente para llenarla y responder a las necesidades de la comunidad puede conducir a la creación de herramientas valiosas que beneficien a todo el ecosistema de desarrolladores.

La historia de Capgo es más que simplemente el desarrollo de una herramienta; es una historia de perseverancia, comunidad y la emocionante imprevisibilidad de la vida como creador en solitario.

Puede encontrar la historia completa en [aquí](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)