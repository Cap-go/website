---
slug: es__how-to-bypass-app-store-review
title: Así es cómo actualizar aplicaciones de Capacitor sin revisión de la App Store.
description: >-
  ¿Cómo puede la función de Capgo permitirle enviar actualizaciones de código
  para aplicaciones Ionic iOS en vivo y cumplir completamente con las
  directrices de Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustración para evitar el condensador
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Me alegra que lo hayas preguntado

Mis abogados me pidieron que te informara que esto no es un consejo legal, pero no necesitas un título en derecho para entender la redacción en las pautas oficiales de Apple. Las pautas de Apple permiten explícitamente enviar código ejecutable directamente a tu aplicación, evitando la App Store, bajo estas tres condiciones:

* El código es ejecutado por el marco WebKit incorporado de Apple
* El código no proporciona, desbloquea o habilita características o funcionalidades adicionales
* El usuario no ve que la actualización está ocurriendo

Con el plugin Capacitor de Capgo, solo puedes actualizar y modificar tu HTML, CSS y JavaScript, así que cumplimos con la primera condición

Como nota aparte, la capacidad de las aplicaciones para actualizarse sin pasar por la App Store existe desde hace bastante tiempo
Solo para aplicaciones creadas con frameworks JavaScript como React Native de Facebook y servicios como Expo

Una prueba de que React Native no es más nativo que Capacitor 😆

Capgo es simplemente la primera solución asequible que proporciona la capacidad de enviar actualizaciones a nivel de código a aplicaciones nativas de Capacitor
La segunda condición, sin nuevas características o funcionalidades, realmente depende de ti

Capgo no está destinado a agregar nuevas características o funcionalidades. Está pensado para ajustar o corregirlas, evitando las versiones menores necesarias para corregir errores, agregar registro o seguimiento, actualizar mensajes, forzar a los usuarios a actualizar, etc.

Para nuevas características o funcionalidades, necesitas lanzar a través de la tienda de aplicaciones. Para tu información, Ionic AppFlow (la alternativa para grandes corporaciones) está instalado en más de 50 millones de dispositivos iOS y nunca se ha rechazado una aplicación por usarlo

Solo lo menciono porque es bueno saber que miles de otros desarrolladores están usando actualizaciones en vivo, así que no estás solo

Apple y Google tienen su propio conjunto de reglas sobre cómo actualizar aplicaciones

Para Apple, [echa un vistazo al párrafo 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/)
[...] La única excepción a lo anterior son los scripts y códigos descargados y ejecutados por el marco WebKit incorporado de Apple o JavascriptCore [...] __TLDR__: deberíamos usar actualizaciones OTA solo para corregir errores o hacer mejoras, sin realizar cambios significativos

__Google__ Play es menos restrictivo – dicen que las aplicaciones instaladas desde Google Play con paquetes JavaScript [no están restringidas](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en) a actualizarse solo por servicios de Google


Consulta mi próximo artículo para obtener más información sobre cómo instalar Capgo para evitar la revisión