---
slug: live-updates-for-flutter-app
title: Actualización en vivo de Flutter
description: >-
  ¿Es posible enviar actualizaciones en vivo a Flutter Apps sin la revisión de
  la App Store?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

Capgo Live Update es un servicio que permite a los desarrolladores implementar actualizaciones en sus aplicaciones móviles sin pasar por el proceso de envío tradicional de la App Store. Esta puede ser una forma conveniente de corregir errores rápidamente o realizar pequeñas actualizaciones en una aplicación sin esperar el proceso de revisión de la App Store. Sin embargo, Capgo Live Update no admite la actualización de aplicaciones Flutter porque las aplicaciones Flutter están compiladas en código nativo.

Flutter es un marco de desarrollo de aplicaciones móviles que utiliza el lenguaje de programación Dart. Una de las características clave de Flutter es que permite a los desarrolladores crear aplicaciones que pueden ejecutarse tanto en iOS como en Android usando una única base de código. Para lograr esto, Flutter compila el código de la aplicación en Código nativo para cada plataforma. Esto significa que la aplicación es esencialmente una aplicación nativa, en lugar de una aplicación basada en web o una aplicación híbrida.

Debido a que las aplicaciones Flutter están compiladas en código nativo, no es posible usar Capgo Live Update para implementar actualizaciones en una aplicación Flutter. En lugar de eso, los desarrolladores deben enviar actualizaciones a las tiendas de aplicaciones como lo harían con cualquier otra aplicación nativa.

Además, realizar actualizaciones del código nativo generalmente va en contra de las reglas de las tiendas de aplicaciones. Tanto Apple App Store como Google Play Store cuentan con políticas que prohíben a los desarrolladores introducir cambios en el código nativo de una aplicación después de que se haya enviado para su revisión. Esto se debe a que La introducción de cambios en el código nativo puede introducir vulnerabilidades de seguridad u otros problemas que podrían comprometer el rendimiento de la aplicación.

En resumen, si bien Capgo Live Update es una herramienta útil para implementar rápidamente actualizaciones en ciertos tipos de aplicaciones móviles, no se puede usar para actualizar aplicaciones Flutter.

Se debe a la naturaleza del proceso de compilación de Flutter y a las reglas de las tiendas de aplicaciones.