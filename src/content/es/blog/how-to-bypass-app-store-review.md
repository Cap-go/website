---
slug: how-to-bypass-app-store-review
title: Comente las aplicaciones del día Capacitor JS sin el examen de la App Store.
description: >-
  Comment Capgo Feature ¿Podría permitirle difundir actualizaciones de código
  hacia las aplicaciones iOS Ionic en directo y en todo momento conforme a las
  directivas de Apple?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

_Me alegro de que hayas preguntado_

Mis abogados me pidieron que le hiciera saber que esto no es asesoramiento legal, pero no necesita un título en derecho para comprender el texto de las pautas oficiales de Apple. Las pautas de Apple le permiten explícitamente enviar código ejecutable directamente a su aplicación, sin pasar por la aplicación. Conservar, bajo estas tres condiciones:

* El código se ejecuta mediante el marco WebKit integrado de Apple.
* El código no proporciona, desbloquea ni habilita características o funcionalidades adicionales
* El usuario no ve que se está realizando la actualización.

Con el complemento de condensador Capgo, solo puedes actualizar y modificar tu HTML, CSS y JavaScript, por lo que estamos bien con la primera condición.

Por cierto, la posibilidad de que las aplicaciones se actualicen solas sin la App Store existe desde hace bastante tiempo.
Solo para aplicaciones creadas utilizando marcos de JavaScript como React Native de Facebook y servicios como Expo

Una prueba de que React Native no es más Native que Capacitor 😆

Capgo es simplemente la primera solución asequible que brinda la capacidad de enviar actualizaciones a nivel de código a aplicaciones nativas de Capacitor.
La segunda condición, que no haya nuevas características o funcionalidades, realmente depende de usted.

Capgo no está destinado a impulsar nuevas características o funcionalidades. Su objetivo es modificarlas o corregirlas, evitando las versiones menores necesarias para corregir errores, agregar registros o seguimiento, actualizar mensajes, obligar a los usuarios a actualizar, etc.

Para obtener nuevas características o funcionalidades, debe lanzarlas a través de la tienda de aplicaciones. Para su información, Ionic AppFlow (la alternativa para las grandes empresas) está instalado en más de 50 millones de dispositivos iOS y nunca se ha rechazado una aplicación porque la usa.

Solo lo digo porque es bueno saber que miles de otros desarrolladores están usando actualizaciones en vivo, así que no estás solo.

Apple y Google tienen sus propias reglas sobre cómo actualizar aplicaciones

Para Apple, [eche un vistazo al párrafo 332](https://developerapplecom/programs/information/Apple_Developer_Program_Information_8_12_15pdf/)
\[…\] La única excepción a lo anterior son los scripts y el código descargados y ejecutados mediante el marco WebKit integrado de Apple o JavascriptCore \[…\] __TLDR__: debemos usar actualizaciones OTA solo para corregir errores o realizar mejoras, sin realizar cambios significativos. cambios

__Google__ Play es menos restrictivo: dicen que las aplicaciones instaladas desde Google Play con paquetes de JavaScript [no están restringidas](https://supportgooglecom/googleplay/android-developer/answer/9888379/?hl=en) para actualizar mediante los servicios de Google. solo


Consulte mi próximo artículo para obtener más información sobre cómo instalar Capgo para evitar la revisión.