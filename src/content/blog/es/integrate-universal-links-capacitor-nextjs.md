---
slug: es__integrate-universal-links-capacitor-nextjs
title: Cómo integrar enlaces universales en Next.js con Capacitor
description: >-
  Aprenda paso a paso cómo configurar enlaces universales para su aplicación
  Next.js con Capacitor tanto en plataformas iOS como Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Enlaces Universales de Capacitor
tag: DeepLinking
published: true
locale: es
next_blog: ''
---

Los enlaces universales en iOS y los App Links en Android permiten a los usuarios ser llevados directamente a tu aplicación desde un enlace, evitando el navegador. Esto es particularmente útil para mejorar la experiencia del usuario y mantener el contexto desde una página web a una aplicación. En esta guía, recorreremos el proceso de configurar estos enlaces profundos para una aplicación Nextjs usando Capacitor.

Configurar enlaces profundos no requiere mucho código, pero implica algo de configuración. Al final de esta guía, podrás hacer clic en un enlace como `https://www.capgo.app/details/22` y hacer que tu aplicación se abra en la página correcta si está instalada.

## Configuración de Enlaces Profundos en Nextjs

Primero, crearemos una nueva aplicación Nextjs y una página de detalles para pruebas:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Asegúrate de que tu **ID de paquete** esté correctamente configurado en el archivo **capacitor.config.json**, ya que es crucial para la configuración:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Para el enrutamiento, Nextjs utiliza enrutamiento basado en archivos, así que al crear un archivo en `pages/details/[id].js`, ya hemos configurado nuestra ruta comodín.

En `pages/details/[id].js`, podemos recuperar el ID de la URL usando el enrutador incorporado de Nextjs:

```jsx
import { useRouter } from 'next/router'

function DetailsPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <p>My ID: {id}</p>
    </div>
  )
}

export default DetailsPage
```

Ahora, manejemos el evento `appUrlOpen` con Capacitor. Este evento se activa cuando la aplicación se abre a través de un esquema de URL personalizado. Agrega un oyente en el archivo `pages/_app.js`:

```jsx
import { useEffect } from 'react'
import { App } from '@capacitor/app'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    App.addListener('appUrlOpen', (event) => {
      const slug = event.url.split('.app').pop()
      if (slug)
        window.location.href = slug

    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

Este código escucha el evento `appUrlOpen` y navega a la ruta apropiada dentro de tu aplicación Nextjs.

## Configuración de iOS

Para iOS, necesitarás un ID de aplicación con Dominios Asociados habilitados. Crea un archivo **apple-app-site-association** con el siguiente contenido, reemplazando `YOURTEAMID` y `com.yourbundle.id` con tu ID de equipo y ID de paquete reales:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOURTEAMID.com.your.bundleid",
        "paths": ["*"]
      }
    ]
  }
}
```

Sube este archivo al directorio `.well-known` en tu dominio, haciéndolo accesible en `https://www.capgo.app/.well-known/apple-app-site-association`.

En Xcode, agrega el dominio a los derechos de tu aplicación usando el formato `applinks:capgo.app`.

## Configuración de Android

Para los App Links de Android, sigue estos pasos:

1. Genera un archivo keystore si no tienes uno.
2. Obtén la huella digital SHA256 del keystore.
3. Crea un archivo **assetlinks.json** con el nombre de tu paquete y la huella digital SHA256.
4. Sube este archivo al directorio `.well-known` en tu dominio.

En tu `AndroidManifest.xml`, agrega un `intent-filter` al elemento `activity` que maneja los enlaces profundos:

```xml
<activity ...>
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="capgo.app" />
  </intent-filter>
</activity>
```

Después de subir el archivo `assetlinks.json`, puedes verificarlo usando la herramienta Digital Asset Links de Google. Si todo está configurado correctamente, verás una marca de verificación verde.

Para construir y firmar tu aplicación, usa los siguientes comandos:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Esto instalará la aplicación firmada en tu dispositivo Android conectado.

## Configuración de Capacitor para Ajustes de Proyectos Nativos

Para automatizar los ajustes de proyectos nativos, considera usar el [paquete Capacitor configure](https://github.com/ionic-team/capacitor-configure/). Instálalo en tu proyecto:

```sh
npm install @capacitor/configure
```

Crea un archivo `capacitor.config.yaml` en la raíz de tu proyecto:

```yaml
vars:
  BUNDLE_ID: com.capgo.deeplinks
  PACKAGE_NAME: com.capgo.deeplinks
platforms:
  ios:
    targets:
      App:
        bundleId: $BUNDLE_ID
    entitlements:
      - com.apple.developer.associated-domains: ['applinks:capgo.app']
  android:
    packageName: $PACKAGE_NAME
```

Ejecuta la herramienta de configuración con esta configuración:

```sh
npx cap-config run capacitor.config.yaml
```

Esto aplicará los ajustes especificados en el archivo YAML a tus proyectos nativos.

## Conclusión

Configurar enlaces profundos con Capacitor para una aplicación Nextjs implica configurar los ajustes de tu dominio y proyecto tanto para iOS como para Android. Aunque el proceso requiere atención a los detalles, está simplificado en comparación con métodos más antiguos y no requiere plugins adicionales. Asegúrate de que los archivos de verificación de dominio se sirvan correctamente y compruébalos con las herramientas de las respectivas plataformas. Una vez configurado, tu aplicación se abrirá sin problemas desde enlaces web, proporcionando una transición fluida para tus usuarios desde la web a la aplicación.