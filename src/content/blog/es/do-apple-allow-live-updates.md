---
slug: do-apple-allow-live-updates
title: >-
  Apple no permite enviar actualizaciones en vivo a aplicaciones sin la revisión
  de la App Store.
description: >-
  ¿Cómo puedes enviar actualizaciones de código a aplicaciones iOS en producción
  y cumplir totalmente con las pautas de Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Ilustración de derivación de Capacitor
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
La actualización de aplicaciones Capacitor JS sin pasar por el proceso de revisión de la App Store es posible bajo ciertas condiciones establecidas en las pautas oficiales de Apple. Sin embargo, es importante tener en cuenta que esto no constituye asesoramiento legal. Para que las actualizaciones de código se puedan enviar directamente a una aplicación y cumplir con las pautas de Apple, se deben cumplir las siguientes condiciones:

- El código debe ser ejecutado por el framework WebKit integrado de Apple
- El código no debe proporcionar, desbloquear o habilitar características o funcionalidades adicionales
- El usuario no debe ser consciente de que se está realizando una actualización

El plugin Capacitor de Capgo permite realizar actualizaciones y modificaciones en HTML, CSS y JavaScript, cumpliendo con la primera condición.
La capacidad de las aplicaciones para actualizarse sin pasar por el proceso de revisión de la App Store ha estado disponible durante algún tiempo para aplicaciones creadas usando frameworks de JavaScript como React Native de Facebook y servicios como Expo.

La segunda condición, no proporcionar características o funcionalidades adicionales, está determinada por el desarrollador. Capgo está destinado a realizar pequeños ajustes o correcciones, en lugar de introducir nuevas características o funcionalidades. Para cambios significativos, es necesario lanzar actualizaciones a través de la App Store. Vale la pena mencionar que muchos otros desarrolladores utilizan actualizaciones en vivo sin problemas ni rechazos por parte de Apple.

Google Play es menos restrictivo que Apple en lo que respecta a la actualización de aplicaciones. Google Play permite que las aplicaciones instaladas desde su tienda con paquetes JavaScript sean actualizadas por servicios que no son de Google.

Para más información sobre cómo instalar Capgo para evitar la revisión, consulta mi próximo artículo.
