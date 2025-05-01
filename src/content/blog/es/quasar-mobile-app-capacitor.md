---
slug: live-update-with-quasar-and-capacitor
title: 'Creazione di app mobile con aggiornamenti in tempo reale, Quasar e Capacitor.'
description: >-
  Cómo crear una aplicación móvil con Quasar, Capacitor e implementar
  actualizaciones en vivo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Ilustraciones de Quasar y Capgo
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In this tutorial, comenzaremos creando una nueva aplicación web usando [Quasar](https://quasardev/) Más adelante, aprenderemos cómo convertirla en una aplicación móvil usando Capacitor si quieres hacer que tu aplicación se vea mejor en móviles

Con Capacitor, puedes convertir tu aplicación web Quasar en una aplicación móvil sin necesidad de hacer muchas cosas complicadas o aprender una forma completamente nueva de hacer aplicaciones como tendrías que hacer con algo llamado React Native

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación Quasar y luego incorporando Capacitor para adentrarse en el ámbito de las aplicaciones móviles nativas Además, usarás [Capgo](https://capgoapp/) para enviar actualizaciones en vivo a tu aplicación en segundos

## Acerca de Capacitor

¡CapacitorJS es verdaderamente revolucionario! Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una webview nativa, generando el proyecto nativo de Xcode y Android Studio por ti Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada Su API ligera y funcionalidad simplificada hacen que sea muy fácil integrarlo en tu proyecto ¡Confía en mí, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando Tu Aplicación Quasar

Para crear una nueva aplicación Quasar, ejecuta el siguiente comando:

[[CODE_BLOCK]]

![Quasar Project Setup](/quasar-setupwebp)

Selecciona la opción "App with Quasar CLI" y luego "Quasar v2"

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto Por lo tanto, vamos a incluir un script sencillo en nuestro **packagejson** que puede ser utilizado para construir y copiar el proyecto Quasar:

[[CODE_BLOCK]]

Después de ejecutar el comando `generate`, deberías poder ver una nueva carpeta `dist` en la raíz de tu proyecto

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente

## Añadiendo Capacitor a Tu Aplicación Quasar

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un único comando `sync`

Primero, podemos instalar el [Capacitor CLI](https://capacitorjscom/docs/cli/) como dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete

Luego, necesitamos instalar el paquete core y los paquetes relevantes para las plataformas iOS y Android

Finalmente, podemos añadir las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

[[CODE_BLOCK]]

![Initialize Capacitor](/capacitor-initwebp)

En este punto, deberías poder ver nuevas carpetas **ios** y **android** en tu proyecto Quasar

**¡Estos son proyectos nativos reales!**

Para acceder al proyecto Android más tarde, debes instalar [Android Studio](https://developerandroidcom/studio/) Para iOS, necesitas una Mac y debes instalar [Xcode](https://developerapplecom/xcode/)

Además, deberías encontrar un archivo **capacitorconfigts** en tu proyecto, que contiene algunos ajustes fundamentales de Capacitor utilizados durante la sincronización Lo único a lo que debes prestar atención es al **webDir**, que debe apuntar al resultado de tu comando de construcción Actualmente, es incorrecto

Para corregir esto, abre el archivo **capacitorconfigjson** y actualiza el **webDir**:

[[CODE_BLOCK]]

Puedes probarlo ejecutando los siguientes comandos:

[[CODE_BLOCK]]

El primer comando `npm run generate` simplemente construirá tu proyecto Quasar y copiará la construcción estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación

Además, el comando sync puede actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [Capacitor plugins](https://capacitorjscom/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamenteSin darte cuenta, ¡ya has terminado! Así que veamos la aplicación en un dispositivo.

## Compilar y Desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrollador de Apple para iOS y en la Google Play Console para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar el CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

[[CODE_BLOCK]]

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación a un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación a un dispositivo conectado sin cambiar ninguna configuración. Aquí hay un ejemplo:

![android-studio-run](/android-studio-runwebp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guía a través del proceso (pero de nuevo, necesitas estar inscrito en el Programa de Desarrollador). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-run](/xcode-runwebp)

¡Felicitaciones! Has desplegado exitosamente tu aplicación web Quasar a un dispositivo móvil. Aquí hay un ejemplo:

[[HTML_TAG]]
  [[HTML_TAG]]
[[HTML_TAG]]

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo.

## Capgo Live Update

Capgo Live Update es un servicio que permite a los desarrolladores desplegar actualizaciones a sus aplicaciones móviles sin pasar por el proceso tradicional de envío a la App Store. Esta puede ser una forma conveniente de corregir errores rápidamente o hacer pequeñas actualizaciones a una aplicación sin esperar por el proceso de revisión de la App Store.

Integrar Capgo en tu aplicación Quasar es un proceso sencillo que te permite aprovechar el poder de las actualizaciones en vivo en tiempo real. Esta guía paso a paso te guiará a través de la integración e implementación de Capgo Live Update, permitiéndote entregar actualizaciones sin problemas.

**Regístrate y Accede al Panel de Control de Capgo**:

¡Es hora de registrarte y obtener tu clave API para subir tu primera versión! Comienza [registrándote para una cuenta Capgo](https://web.capgo.app/register/)

**Instala el SDK de Capgo**:

Desde la línea de comandos, directamente en la raíz de tu aplicación Capacitor, ejecuta:

`npm i @capgo/capacitor-updater && npx cap sync` Para instalar el plugin en tu aplicación Capacitor.

Y luego agrega a tu aplicación este código como reemplazo del de CodePush:

[[CODE_BLOCK]]

Esto le dirá al plugin nativo que la instalación se realizó con éxito.

**Inicia sesión en Capgo CLOUD**:

Primero, usa la [apikey](https://web.capgo.app/dashboard/apikeys/) `all` presente en tu cuenta para iniciar sesión con el CLI:

    `npx @capgo/cli@latest login YOU_KEY`

**Agrega tu primera Aplicación**:

Comencemos creando primero una aplicación en Capgo Cloud con el CLI:

[[CODE_BLOCK]]
Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

**Sube tu primera versión**:

Ejecuta el comando para compilar tu código y enviarlo a Capgo con:

[[CODE_BLOCK]]

Por defecto, el nombre de la versión será el que está en tu archivo package.json.

Verifica en [Capgo](https://web.capgo.app/login/) si la compilación está presente.

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgo.app/app_mobile/)

**Hacer el canal predeterminado**:

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea predeterminado para permitir que las aplicaciones reciban actualizaciones de Capgo:

`npx @capgo/cli@latest channel set production -s default`

**Configurar la aplicación para validar actualizaciones**:

Agrega esta configuración a tu archivo JavaScript principal:

[[CODE_BLOCK]]

Luego haz un `npm run build && npx cap copy` para actualizar tu aplicación.

**Recibir una Actualización en Vivo**:

Para que tu aplicación reciba una actualización en vivo desde Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora.