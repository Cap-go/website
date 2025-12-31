---
slug: live-updates-for-flutter-app
title: Actualización en vivo de Flutter
description: >-
  ¿Es posible enviar actualizaciones en vivo a aplicaciones Flutter sin revisión
  de la App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustración de Bypass de Capacitor
keywords: >-
  Flutter, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Capgo Live Update es un servicio que permite a los desarrolladores implementar actualizaciones en sus aplicaciones móviles sin pasar por el proceso tradicional de envío a la App Store. Esta puede ser una forma conveniente de corregir errores rápidamente o realizar pequeñas actualizaciones en una aplicación sin esperar el proceso de revisión de la App Store. Sin embargo, Capgo Live Update no admite la actualización de aplicaciones Flutter porque estas se compilan a código nativo.

Flutter es un marco de desarrollo de aplicaciones móviles que utiliza el lenguaje de programación Dart. Una de las características principales de Flutter es que permite a los desarrolladores crear aplicaciones que pueden ejecutarse tanto en iOS como en Android utilizando una única base de código. Para lograr esto, Flutter compila el código de la aplicación en código nativo para cada plataforma. Esto significa que la aplicación es esencialmente una aplicación nativa, en lugar de una aplicación web o una aplicación híbrida.

Debido a que las aplicaciones Flutter se compilan a código nativo, no es posible utilizar Capgo Live Update para implementar actualizaciones en una aplicación Flutter. En su lugar, los desarrolladores deben enviar las actualizaciones a las tiendas de aplicaciones como lo harían con cualquier otra aplicación nativa.

Además, realizar actualizaciones en el código nativo generalmente va en contra de las reglas de las tiendas de aplicaciones. Tanto la App Store de Apple como la Google Play Store tienen políticas que prohíben a los desarrolladores introducir cambios en el código nativo de una aplicación después de que haya sido enviada para revisión. Esto se debe a que introducir cambios en el código nativo puede potencialmente introducir vulnerabilidades de seguridad u otros problemas que podrían comprometer el rendimiento de la aplicación.

En resumen, si bien Capgo Live Update es una herramienta útil para implementar actualizaciones rápidamente en ciertos tipos de aplicaciones móviles, no se puede utilizar para actualizar aplicaciones Flutter.

Esto se debe a la naturaleza del proceso de compilación de Flutter y las reglas de las tiendas de aplicaciones.
