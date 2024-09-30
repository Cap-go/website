---
slug: integrate-universal-links-capacitor-nextjs
title: Cómo integrar los derechos universales en Next.js con Capacitor
description: >-
  Apprenez étape par étape comment configurador de gravámenes universales para
  su aplicación Next.js con Capacitor en las plataformas iOS y Android.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor Universal Links
tag: DeepLinking
published: true
next_blog: ''
locale: es
---

Los enlaces universales en iOS y los enlaces de aplicaciones en Android permiten que los usuarios accedan directamente a su aplicación desde un enlace, sin pasar por el navegador. Esto es particularmente útil para mejorar la experiencia del usuario y mantener el contexto desde una página web a una aplicación. En esta guía, Revisaremos el proceso de configuración de estos enlaces profundos para una aplicación Nextjs usando Capacitor.

Configurar enlaces profundos no requiere mucho código, pero sí implica cierta configuración. Al final de esta guía, podrá hacer clic en un enlace como `https://wwwcapgoapp/details/22` y tener su aplicación abierta en la página correcta si está instalada

## Configuración del enlace profundo de Nextjs

Primero, crearemos una nueva aplicación Nextjs y una página de detalles para realizar pruebas:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Asegúrese de que su **ID de paquete** esté configurado correctamente en el archivo **capacitorconfigjson**, ya que es crucial para la configuración:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Para el enrutamiento, Nextjs usa enrutamiento basado en archivos, por lo que al crear un archivo en `pages/details/[id]js`, ya hemos configurado nuestra ruta comodín.

En `pages/details/[id]js`, podemos recuperar el ID de la URL usando el enrutador integrado de Nextjs:

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

Ahora, manejemos el evento `appUrlOpen` con Capacitor. Este evento se activa cuando la aplicación se abre a través de un esquema de URL personalizado. Agregue un oyente en el archivo `pages/_appjs`:

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

Este código escucha el evento "appUrlOpen" y navega a la ruta apropiada dentro de su aplicación Nextjs.

## Configuración de iOS

Para iOS, necesitarás un ID de aplicación con Dominios asociados habilitados. Crea un archivo **apple-app-site-association** con el siguiente contenido, reemplazando `YOURTAMID` y `comyourbundleid` con tu ID de equipo y tu ID de paquete reales:

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

Cargue este archivo en el directorio `well-known` de su dominio, haciéndolo accesible en `https://wwwcapgoapp/well-known/apple-app-site-association`

En Xcode, agregue el dominio a los derechos de su aplicación usando el formato `applinks:capgoapp`

## Configuración de Android

Para enlaces de aplicaciones de Android, siga estos pasos:

1 Genere un archivo de almacén de claves si no tiene uno
2 Obtenga la huella digital SHA256 del almacén de claves
3 Cree un archivo **assetlinksjson** con el nombre de su paquete y la huella digital SHA256.
4 Cargue este archivo en el directorio "conocido" de su dominio.

En su `AndroidManifestxml`, agregue un `intent-filter` al elemento `activity` que maneja enlaces profundos:

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

Después de cargar el archivo `assetlinksjson`, puede verificarlo utilizando la herramienta Enlaces de activos digitales de Google. Si todo está configurado correctamente, verá una marca de verificación verde.

Para crear y firmar su aplicación, utilice los siguientes comandos:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Esto instalará la aplicación firmada en su dispositivo Android conectado.

## Configuración del condensador para la configuración del proyecto nativo

Para automatizar la configuración nativa del proyecto, considere usar el [paquete de configuración de condensadores](https://githubcom/ionic-team/capacitor-configure/). Instálelo en su proyecto:

```sh
npm install @capacitor/configure
```

Cree un archivo `capacitorconfigyaml` en la raíz de su proyecto:

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

Ejecute la herramienta de configuración con esta configuración:

```sh
npx cap-config run capacitor.config.yaml
```

Esto aplicará la configuración especificada en el archivo YAML a sus proyectos nativos.

## Conclusión

Configurar enlaces profundos con Capacitor para una aplicación Nextjs implica configurar su dominio y los ajustes del proyecto tanto para iOS como para Android. Si bien el proceso requiere atención al detalle, está simplificado en comparación con métodos anteriores y no requiere complementos adicionales. Asegúrese de que los archivos de verificación de su dominio sean correctos. servidas y verificarlas con las respectivas herramientas de la plataforma. Una vez configurada, su aplicación se abrirá sin problemas desde los enlaces web, proporcionando una transición fluida para sus usuarios de la web a la aplicación.