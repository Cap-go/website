---
slug: birth-of-capgo-revolutionizing-capacitor-app-updates
title: Cómo un Issue de GitHub se Convirtió en un Negocio
description: >-
  Descubre las pruebas y triunfos detrás de la creación de Capgo, un innovador
  sistema de actualización en vivo para aplicaciones Capacitor, nacido de la
  necesidad y moldeado por los comentarios de la comunidad.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /capgo-birth-story.webp
head_image_alt: >-
  Una representación visual de la evolución de Capgo desde la idea hasta el
  producto
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: es
next_blog: ''
---
## La Génesis: Una Solicitud de la Comunidad

Las semillas de Capgo fueron plantadas mucho antes de que comenzara mi viaje como creador independiente. El 8 de julio de 2020, un miembro de la comunidad llamado alexcroox envió una solicitud de plugin que eventualmente se convertiría en el modelo para Capgo.

![Initial plugin request](/capgo-initial-request.webp)

Esta solicitud describía la necesidad de un plugin "Capacitor Hot Code Push" con los siguientes puntos clave:

1. **Plataformas**: Soporte para Android e iOS.
2. **Soluciones Existentes**: Destacaba las limitaciones de las opciones actuales como MS Code Push (que carecía de soporte para Capacitor) y App Flow (que era costoso e inflexible).
3. **Descripción**: La capacidad de actualizar js/css/html de una aplicación en tiempo real sin pasar por el proceso de revisión de la tienda de aplicaciones.
4. **Características Principales**: 
   - Facilitar actualizaciones por aire desde un servidor/endpoint elegido por el desarrollador.
   - Descargar un archivo zip de la carpeta dist actualizada, extraerlo e indicar a Capacitor que inicie desde este nuevo directorio.
   - Características adicionales como verificación de actualización, tiempo de instalación y descarga selectiva de actualizaciones.

Esta completa solicitud recibió un importante apoyo de la comunidad, con 65 me gusta y 25 reacciones de corazón. Claramente demostró una fuerte demanda de una solución así en el ecosistema de Capacitor.

Cuando me encontré con esta solicitud más de un año después, resonó profundamente con los desafíos que enfrentaba en mis propios proyectos. Sirvió tanto como validación de la necesidad de una herramienta así como una hoja de ruta para lo que se convertiría en Capgo.

El entusiasmo de la comunidad por este plugin propuesto, combinado con mis experiencias personales, se convirtió en la fuerza impulsora detrás del desarrollo de Capgo. Es un ejemplo perfecto de cómo las comunidades de código abierto pueden identificar necesidades e inspirar soluciones, incluso si el tiempo desde la idea hasta la implementación abarca más de un año.

## Un Nuevo Capítulo Comienza

Antes de sumergirme en la historia de Capgo, es importante establecer el contexto. En 2021, tomé una decisión que cambiaría mi vida al renunciar a mi puesto como CTO de Cashstory y vender mis acciones. Esto marcó el comienzo de mi viaje como creador independiente, un camino lleno de incertidumbre pero también de infinitas posibilidades.

![Lisbon digital nomad life](/capgo-lisbon-nomad.webp)

Con mis ahorros como red de seguridad, me embarqué en una nueva aventura. Vivía como nómada digital en Lisboa, Portugal, abrazando la vibrante escena tecnológica y la cultura de la ciudad mientras me enfocaba en mis proyectos personales. Mi enfoque principal era Captime, un temporizador móvil para crossfit. Poco sabía que este proyecto me llevaría a crear algo mucho más grande.

La energía del ecosistema de startups de Lisboa y la libertad del estilo de vida nómada digital proporcionaron el escenario perfecto para la innovación. Fue en este entorno, rodeado de compañeros emprendedores y desarrolladores de todo el mundo, donde se sembraron las semillas de Capgo.

## La Chispa de una Idea

Mientras trabajaba en Captime, me encontré con un obstáculo significativo - la falta de una solución de actualización asequible y flexible para aplicaciones Capacitor. En octubre de 2021, expresé estas preocupaciones en un hilo de GitHub.

![Initial proposal for Capgo](/capgo-initial-proposal.webp)

Los principales puntos problemáticos que identifiqué fueron:

1. Altos costos para desarrolladores a pequeña escala
2. Falta de actualizaciones por aire (OTA) en planes asequibles
3. Funciones innecesarias para desarrolladores independientes

## La Comunidad Resuena

Mis preocupaciones resonaron con otros desarrolladores. Muchos compartieron el sentimiento de que las soluciones existentes tenían precios excesivos para desarrolladores independientes y equipos pequeños.

![Community feedback](/capgo-community-feedback.webp)

Un desarrollador resumió los sentimientos de la comunidad:

"Sería brillante si el plan Comunitario incluyera 500 actualizaciones en vivo. O mejor aún, si hubiera un paquete solo de Actualizaciones en Vivo por $50/mes que incluyera 5,000 Actualizaciones en Vivo."

## El Nacimiento de una Solución

Motivado por la respuesta de la comunidad, decidí tomar el asunto en mis propias manos. El 24 de octubre de 2021, anuncié mi plan de construir un módulo que permitiría a los desarrolladores descargar actualizaciones desde una URL determinada.

![Initial code snippet](/capgo-initial-code.webp)

Los objetivos iniciales eran simples:
- Descargar datos desde una URL
- Descomprimir los datos
- Reemplazar el código actual con el nuevo

Sin embargo, convertir esta simple idea en realidad resultó ser mucho más desafiante de lo que inicialmente anticipé.

## La Lucha Detrás de Escenas

Lo que no es aparente en el hilo de GitHub es la pura complejidad de la tarea que había emprendido. El código requerido para implementar esta funcionalidad era oscuro y difícil de entender. Me encontré lidiando con detalles intrincados de cómo las aplicaciones Capacitor manejan las actualizaciones y los sistemas de archivos.

Pasé muchas noches en mi furgoneta, estudiando documentación y experimentando con diferentes enfoques. El progreso era lento, y hubo momentos en los que cuestioné si había mordido más de lo que podía masticar.

## La Comunidad al Rescate

Afortunadamente, no estaba solo en este viaje. La comunidad de desarrolladores, particularmente en Discord, demostró ser un recurso invaluable. Otros desarrolladores ofrecieron sus perspectivas, ayudaron a depurar problemas y brindaron ánimo cuando las cosas se pusieron difíciles.

![Discord community support](/capgo-discord-support.webp)

Este esfuerzo colaborativo fue crucial para superar los obstáculos técnicos. Reforzó mi creencia en el poder del código abierto y el desarrollo impulsado por la comunidad.

## Desarrollo Rápido y Capacidades en Expansión

Con la ayuda de la comunidad, el desarrollo comenzó a acelerarse. Para el 22 de noviembre de 2021, tenía una versión funcional para iOS y estaba mejorando la experiencia del desarrollador.

![Improved code snippet](/capgo-improved-code.webp)

A medida que avanzaba el desarrollo, agregué más características:
- Soporte para Android
- Persistencia entre cierres de aplicación
- La capacidad de volver a la versión original de la aplicación

![New features announcement](/capgo-new-features.webp)

Cada nueva función trajo su propio conjunto de desafíos, pero también una sensación de logro mientras el proyecto crecía más allá de su alcance inicial.

## El Lanzamiento de Capgo

Para marzo de 2022, el proyecto había evolucionado a un producto completo: Capgo. Anuncié el lanzamiento de un modo de actualización automática, permitiendo a los desarrolladores conectarse a su propio backend o usar el servicio backend de Capgo.

![Capgo launch announcement](/capgo-launch-announcement.webp)

La respuesta de la comunidad fue abrumadoramente positiva, con desarrolladores elogiando esta solución tan necesaria.

## El Giro hacia un Producto de Pago

Inicialmente, no tenía planes de monetizar Capgo. Mi objetivo era simplemente crear una herramienta que resolviera un problema que otros desarrolladores y yo enfrentábamos. Sin embargo, los comentarios en GitHub me hicieron reconsiderar esta postura.

Los desarrolladores expresaron su disposición a pagar por una solución que satisficiera sus necesidades a un precio justo. Esta retroalimentación, combinada con la comprensión de los costos y esfuerzos continuos necesarios para mantener y mejorar Capgo, llevó a una decisión crucial.

El 11 de junio de 2022, anuncié que Capgo comenzaría a cobrar por su uso en 15 días, marcando su transición de un proyecto comunitario a un negocio sostenible.

![Capgo pricing announcement](/capgo-pricing-announcement.webp)

Sin embargo, manteniéndome fiel a las raíces del proyecto, mantuve el núcleo de código abierto de Capgo permitiendo el uso gratuito del plugin en modo manual o con un servidor personalizado.

## Conclusión

Mi viaje con Capgo es un testimonio del poder de la innovación impulsada por la comunidad y los caminos inesperados que los desarrolladores independientes suelen encontrar. Lo que comenzó como una frustración personal mientras trabajaba en una aplicación de temporizador de crossfit se convirtió en un sistema robusto, asequible y flexible de actualizaciones en vivo para aplicaciones Capacitor.

La creación de Capgo estuvo lejos de ser fácil. Requirió incontables horas de trabajo, el apoyo de una generosa comunidad de desarrolladores y la disposición de pivotar basándose en la retroalimentación de los usuarios. Desde programar en Airbnb en Portugal hasta lanzar un producto de pago, cada paso de este viaje ha sido una experiencia de aprendizaje.

Mientras Capgo continúa evolucionando, se mantiene como un ejemplo principal de cómo identificar una brecha en el mercado, trabajar activamente para llenarla y ser receptivo a las necesidades de la comunidad puede llevar a la creación de herramientas valiosas que benefician a todo el ecosistema de desarrolladores.

La historia de Capgo es más que solo el desarrollo de una herramienta; es una historia de perseverancia, comunidad y la emocionante imprevisibilidad de la vida como desarrollador independiente.

Puedes encontrar la historia completa [aquí](https://github.com/capacitor-community/proposals/issues/43#issuecomment-941017142).
