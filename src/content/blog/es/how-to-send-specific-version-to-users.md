---
slug: how-to-send-specific-version-to-users
title: Cómo enviar una actualización específica a un usuario o grupo
description: >-
  Permita que sus usuarios prueben la versión beta sin necesidad de TestFlight o
  el proceso beta de Google, ¡simplemente agregue un botón en su aplicación
  Ionic y listo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Alternativa a TestFlight ilustración
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: es
next_blog: ''
---
## Prefacio

Cuando empiezas a disfrutar del sistema de actualización de Capgo, como yo para mis aplicaciones, comenzarás a sentir "¿Y si quiero más?"

Yo también tuve ese sentimiento, pero como soy el creador de Capgo, ¡pude investigarlo!

> Como todo es código abierto, tú también tienes este poder :)

El siguiente dolor que tuve en el proceso de distribución de aplicaciones Capacitor fue hacer que otros miembros del equipo prueben las actualizaciones.

Con TestFlight, el problema es simple, ¡traer personas a tu equipo y hacer que entiendan cómo obtenerlo lleva mucho tiempo!

Y por supuesto, cada vez que envías a Apple tienes un proceso de revisión aleatorio por un bot que puede tomar 5 minutos o 5 horas, nunca se sabe.

Muchas veces tuve mi presentación retrasada por esto...

Y para Google es aún peor, el gran misterio de mi vida, lanzar una versión de producción toma menos de 2 horas, pero lanzar una beta cerrada toma 1-2 días.

## Solución

Para solucionar esto, creé el sistema de Canales en Capgo.

`npx @capgo/cli@latest bundle upload -c production` actualizará a todos los usuarios (si el canal de producción está configurado como predeterminado)

Si haces `npx @capgo/cli@latest bundle upload -c development` entonces la versión va a un canal diferente, esto se puede automatizar en [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/).

Luego tienes 2 formas de permitir que los usuarios obtengan las actualizaciones del canal

### Forma Super automática

Esto puede ser útil cuando no quieres crear tu propio backend para la configuración de canales, es rápido de implementar.

Con esta opción, lo único que necesitas hacer es permitir que uno de tus canales sea auto-configurable.

![Permitir auto-configuración en Capgo](/self_set.webp)

Y luego agregar esto en el código de tu aplicación Ionic, para una mejor experiencia, úsalo después de que el usuario haga clic en un botón como "registrarse para beta"
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Forma Manual

Esto puede ser útil para tu equipo interno, es rápido de implementar.
Permite que los usuarios copien su deviceID desde tu aplicación y te lo envíen manualmente, este código te ayudará a obtenerlo:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Oculta un botón en algún lugar de tu aplicación, o muestra el botón solo a usuarios conectados con rol `admin`, por ejemplo.

Luego ve a la aplicación Web o nativa de Capgo, conéctate como administrador de la aplicación, selecciona tu aplicación, haz clic en la lista de dispositivos.

Luego pon en la barra de búsqueda el deviceID, haz clic en el encontrado y luego en el enlace de Canal, elige `development`, pide a tu compañero que abra la aplicación nuevamente, espera 30 segundos y abre cierra.

Debería obtener tu versión.

### Forma Automática

Esto puede ser útil para tus probadores beta, lleva más tiempo implementarlo.

Igual que en la forma manual, tienes que obtener el deviceID
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Pero esta vez tienes que enviarlo automáticamente a tu backend, te dejo decidir cómo hacerlo.

Solo te sugiero almacenarlo en una base de datos, eso facilitará tu vida más adelante.

Luego en tu backend tienes que enviarlo al backend de Capgo también. A continuación dos ejemplos de código:
<details>
  <summary>NodeJS</summary>

```js
import axios from 'axios'

await axios.post('https://api.capgo.app/device', {
  app_id: 'YOUR_APP_ID',
  device_id: 'DEVICE_ID',
  channel: 'CHANNEL_NAME', // The name of the channel, or undefined if version_id provided
  version_id: 'VERSION_NAME' // this is optionnal, if provide it will override the channel, that usefull when you want to debug only one user.
}, {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})
```
</details>

<details>
  <summary>Cloudflare</summary>
  
```js
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 })
    )
  )
})

async function handleRequest(request) {
  const { pathname, method } = new URL(request.url)
  const body = await request.json()
  const newBody = JSON.stringify({
    app_id: 'YOUR_APP_ID',
    device_id: body.device_id,
    channel: 'alpha'
  })
  const newUrl = new URL('https://api.capgo.app/device')
  const options = {
    headers: {
      authorization: 'YOUR_API_KEY',
    },
    method: 'POST',
    body: newBody
  }

  if (request.method === 'DELETE') {
    // DELETE the channel link
    options.method = 'DELETE'
    return fetch(newUrl.toString(), options)
  }

  return fetch(newUrl.toString(), options)
}
```
Y simplemente envía tu device_id en el cuerpo de la URL desplegada con POST para agregar y método DELETE para eliminar.
</details>

Después de configurar esto, intenta agregar un botón en tu aplicación para optar por el canal y verifica en la aplicación web si se ha configurado.

También puedes enviar `null` para eliminar la anulación

Si necesitas verificar programáticamente qué anulación está configurada en un dispositivo, puedes obtenerla en la misma URL

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
