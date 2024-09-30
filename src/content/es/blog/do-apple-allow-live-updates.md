---
slug: do-apple-allow-live-updates
title: >-
  ¿Apple permite enviar actualizaciones en vivo a las aplicaciones sin la
  revisión de la App Store?
description: >-
  ¿Cómo se pueden enviar actualizaciones de código a aplicaciones iOS de
  producción y cumplir plenamente con las directrices de Apple?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

Actualizar las aplicaciones Capacitor JS sin pasar por el proceso de revisión de la App Store es posible bajo ciertas condiciones descritas en las pautas oficiales de Apple. Sin embargo, es importante tener en cuenta que esto no es un consejo legal para que las actualizaciones del código se envíen directamente a una aplicación y sigan cumpliendo. Con las directrices de Apple, se deben cumplir las siguientes condiciones:

- El código debe ejecutarse mediante el marco WebKit integrado de Apple.
- El código no debe proporcionar, desbloquear ni habilitar características o funcionalidades adicionales.
- El usuario no debe ser consciente de que se está produciendo una actualización.

El complemento Capgo Capacitor permite realizar actualizaciones y modificaciones en HTML, CSS y JavaScript, cumpliendo la primera condición. 
La capacidad de que las aplicaciones se actualicen solas sin pasar por el proceso de revisión de la App Store ha estado disponible desde hace algún tiempo para aplicaciones creadas utilizando marcos de JavaScript como React Native de Facebook y servicios como Expo.

La segunda condición, no proporcionar características o funcionalidades adicionales, la determina el desarrollador. Capgo está destinado a realizar pequeños ajustes o correcciones, en lugar de introducir nuevas características o funcionalidades. Para cambios significativos, es necesario publicar actualizaciones a través de la App Store. Vale la pena. teniendo en cuenta que muchos otros desarrolladores utilizan actualizaciones en vivo sin ningún problema o rechazo por parte de Apple

Google Play es menos restrictivo que Apple cuando se trata de actualizar aplicaciones. Google Play permite que las aplicaciones instaladas desde su tienda con paquetes de JavaScript se actualicen mediante servicios que no sean de Google. 

Para obtener más información sobre cómo instalar Capgo para evitar la revisión, consulte mi próximo artículo.