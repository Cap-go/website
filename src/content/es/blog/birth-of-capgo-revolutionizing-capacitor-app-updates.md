---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Cómo un problema de GitHub se convirtió en una empresa
description: >-
  Descubre los desafíos y éxitos en el desarrollo de Capgo, un innovador sistema
  de actualizaciones en vivo para aplicaciones Capacitor, nacido de la necesidad
  y moldeado por los comentarios de la comunidad.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: >-
  Una representación visual del desarrollo de Capgo desde la idea hasta el
  producto
tag: development
published: true
locale: es
next_blog: ''
---

## La Génesis: Una Petición de la Comunidad

Las semillas de Capgo en realidad se plantaron mucho antes de que comenzara mi viaje como creador independiente. El 8 de julio de 2020, un miembro de la comunidad llamado alexcroox envió una solicitud de plugin que eventualmente se convertiría en el anteproyecto de Capgo.

![Solicitud inicial del plugin](/capgo-initial-requestwebp)

Esta solicitud describía la necesidad de un plugin "Capacitor Hot Code Push" con los siguientes puntos clave:

1. **Plataformas**: Soporte tanto para Android como para iOS.
2. **Soluciones existentes**: Destacaba las limitaciones de las opciones actuales como MS Code Push (que carecía de soporte para Capacitor) y App Flow (que era caro e inflexible).
3. **Descripción**: La capacidad de actualizar js/css/html de una aplicación en tiempo real sin pasar por el proceso de revisión de la tienda de aplicaciones.
4. **Características principales**:
   - Facilitar actualizaciones por aire desde un servidor/endpoint elegido por el desarrollador
   - Descargar un archivo zip de la carpeta dist actualizada, extraerlo e indicar a Capacitor que se inicie desde este nuevo directorio
   - Características adicionales como verificación de actualizaciones, programación de instalación y descarga selectiva de actualizaciones

Esta solicitud integral obtuvo un apoyo significativo de la comunidad, con 65 "me gusta" y 25 reacciones de corazón. Claramente demostraba una fuerte demanda de tal solución en el ecosistema de Capacitor.

Cuando me encontré con esta solicitud más de un año después, resonó profundamente con los desafíos que enfrentaba en mis propios proyectos. Sirvió tanto como validación de la necesidad de una herramienta así como una hoja de ruta para lo que se convertiría en Capgo.

El entusiasmo de la comunidad por este plugin propuesto, combinado con mis experiencias personales, se convirtió en la fuerza impulsora detrás del desarrollo de Capgo. Es un ejemplo perfecto de cómo las comunidades de código abierto pueden identificar necesidades e inspirar soluciones, incluso si el tiempo desde la idea hasta la implementación abarca más de un año.

## Comienza un Nuevo Capítulo

Antes de sumergirme en la historia de Capgo, es importante establecer el contexto. En 2021, tomé una decisión que cambiaría mi vida al renunciar a mi puesto como CTO de Cashstory y vender mis acciones. Esto marcó el comienzo de mi viaje como creador independiente, un camino lleno de incertidumbre pero también de posibilidades infinitas.

![Vida de nómada digital en Lisboa](/capgo-lisbon-nomadwebp)

Con mis ahorros como red de seguridad, me embarqué en una nueva aventura. Estaba viviendo como nómada digital en Lisboa, Portugal, abrazando la vibrante escena tecnológica y la cultura de la ciudad mientras me enfocaba en mis proyectos personales. Mi enfoque principal era Captime, una aplicación móvil de temporizador para crossfit. Poco sabía que este proyecto me llevaría a crear algo mucho más grande.

La energía del ecosistema de startups de Lisboa y la libertad del estilo de vida nómada digital proporcionaron el telón de fondo perfecto para la innovación. Fue en este entorno, rodeado de compañeros emprendedores y desarrolladores de todo el mundo, que se sembraron las semillas de Capgo.

## La Chispa de una Idea

Mientras trabajaba en Captime, me encontré con un obstáculo significativo: la falta de una solución de actualización asequible y flexible para aplicaciones Capacitor. En octubre de 2021, expresé estas preocupaciones en un hilo de GitHub.

![Propuesta inicial para Capgo](/capgo-initial-proposalwebp)

Los principales puntos de dolor que identifiqué fueron:

1. Altos costos para desarrolladores a pequeña escala
2. Falta de actualizaciones por aire (OTA) en planes asequibles
3. Características innecesarias para desarrolladores independientes

## La Comunidad Resuena

Mis preocupaciones tocaron una fibra sensible en otros desarrolladores. Muchos hicieron eco del sentimiento de que las soluciones existentes eran demasiado caras para desarrolladores independientes y equipos pequeños.

![Comentarios de la comunidad](/capgo-community-feedbackwebp)

Un desarrollador resumió los sentimientos de la comunidad:

"Sería brillante si el plan Community incluyera 500 actualizaciones en vivoO mejor aún, si hubiera un paquete de Live Update por solo $50 al mes que incluyera 5.000 Live Updates"

## El Nacimiento de una Solución

Motivado por la respuesta de la comunidad, decidí tomar el asunto en mis propias manos. El 24 de octubre de 2021, anuncié mi plan de construir un módulo que permitiría a los desarrolladores descargar actualizaciones desde una URL determinada.

![Fragmento de código inicial](/capgo-initial-codewebp)

Los objetivos iniciales eran simples:
- Descargar datos de una URL
- Descomprimir los datos
- Reemplazar el código actual con el nuevo

Sin embargo, convertir esta simple idea en realidad resultó ser mucho más desafiante de lo que inicialmente anticipé.

## La Lucha Tras Bastidores

Lo que no es evidente en el hilo de GitHub es la enorme complejidad de la tarea que había emprendido. El código necesario para implementar esta funcionalidad era oscuro y difícil de entender. Me encontré lidiando con detalles intrincados de cómo las aplicaciones de Capacitor manejan las actualizaciones y los sistemas de archivos.

Pasé muchas noches en mi furgoneta, estudiando documentación y experimentando con diferentes enfoques. El progreso era lento, y hubo momentos en los que me cuestioné si había mordido más de lo que podía masticar.

## La Comunidad al Rescate

Afortunadamente, no estaba solo en este viaje. La comunidad de desarrolladores, particularmente en Discord, demostró ser un recurso invaluable. Otros desarrolladores ofrecieron sus ideas, ayudaron a depurar problemas y brindaron aliento cuando las cosas se pusieron difíciles.

![Apoyo de la comunidad en Discord](/capgo-discord-supportwebp)

Este esfuerzo colaborativo fue crucial para superar los obstáculos técnicos. Reforzó mi creencia en el poder del código abierto y el desarrollo impulsado por la comunidad.

## Desarrollo Rápido y Capacidades en Expansión

Con la ayuda de la comunidad, el desarrollo comenzó a acelerarse. Para el 22 de noviembre de 2021, tenía una versión funcional para iOS y estaba mejorando la experiencia del desarrollador.

![Fragmento de código mejorado](/capgo-improved-codewebp)

A medida que avanzaba el desarrollo, agregué más características:
- Soporte para Android
- Persistencia entre cierres de la aplicación
- La capacidad de volver a la versión original de la aplicación

![Anuncio de nuevas características](/capgo-new-featureswebp)

Cada nueva característica trajo su propio conjunto de desafíos, pero también una sensación de logro a medida que el proyecto crecía más allá de su alcance inicial.

## El Lanzamiento de Capgo

Para marzo de 2022, el proyecto había evolucionado a un producto completo: Capgo. Anuncié el lanzamiento de un modo de actualización automática, permitiendo a los desarrolladores conectarse a su propio backend o usar el servicio de backend de Capgo.

![Anuncio del lanzamiento de Capgo](/capgo-launch-announcementwebp)

La respuesta de la comunidad fue abrumadoramente positiva, con desarrolladores elogiando esta solución tan necesaria.

## El Giro hacia un Producto de Pago

Inicialmente, no tenía planes de monetizar Capgo. Mi objetivo era simplemente crear una herramienta que resolviera un problema al que yo y otros desarrolladores nos enfrentábamos. Sin embargo, los comentarios en GitHub me hicieron reconsiderar esta postura.

Los desarrolladores estaban expresando su disposición a pagar por una solución que satisficiera sus necesidades a un precio justo. Esta retroalimentación, combinada con la comprensión de los costos y esfuerzos continuos requeridos para mantener y mejorar Capgo, llevó a una decisión crucial.

El 11 de junio de 2022, anuncié que Capgo comenzaría a cobrar por su uso en 15 días, marcando su transición de un proyecto comunitario a un negocio sostenible.

![Anuncio de precios de Capgo](/capgo-pricing-announcementwebp)

Sin embargo, manteniéndome fiel a las raíces del proyecto, mantuve el núcleo de código abierto de Capgo permitiendo el uso gratuito del plugin en modo manual o con un servidor personalizado.

## Conclusión

Mi viaje con Capgo es un testimonio del poder de la innovación impulsada por la comunidad y los caminos inesperados que los creadores solitarios a menudo encuentran. Lo que comenzó como una frustración personal mientras trabajaba en una aplicación de temporizador de crossfit creció hasta convertirse en un sistema robusto, asequible y flexible de actualización en vivo para aplicaciones de Capacitor.

La creación de Capgo estuvo lejos de ser fácil.Requirió innumerables horas de trabajo, el apoyo de una generosa comunidad de desarrolladores y la disposición de cambiar de rumbo basándose en los comentarios de los usuarios. Desde programar en Airbnb en Portugal hasta lanzar un producto de pago, cada paso de este viaje ha sido una experiencia de aprendizaje.

A medida que Capgo continúa evolucionando, se erige como un excelente ejemplo de cómo identificar una brecha en el mercado, trabajar activamente para llenarla y responder a las necesidades de la comunidad puede conducir a la creación de herramientas valiosas que benefician a todo el ecosistema de desarrolladores.

La historia de Capgo es más que simplemente el desarrollo de una herramienta; es una historia de perseverancia, comunidad y la emocionante imprevisibilidad de la vida como creador independiente.

Puedes encontrar la historia completa en [here](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)