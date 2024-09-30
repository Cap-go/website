---
slug: how-to-send-specific-version-to-users
title: Comment envoyer une mise à jour spécifique à un utilisateur ou à un groupe
description: >-
  Permita que su usuario ensaye la versión beta sin necesidad de TestFlight o el
  proceso beta de Google, presione simplemente un botón en su aplicación Ionic,
  ¡y eso es todo!
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight alternative illustration
tag: alternatives
published: true
next_blog: ''
locale: es
---

## Prefacio

Cuando empieces a disfrutar del sistema de actualización de Capgo, como yo para mis aplicaciones, empezarás a tener la sensación de "¿Qué pasa si quiero más?"

Yo también tuve la sensación, pero como soy el creador de Capgo, ¡pude echarle un vistazo!

> Como todo es de código abierto, tú también tienes este poder :)

¡El siguiente problema que tuve en el proceso de distribución de la aplicación Capacitor fue hacer que otros compañeros de equipo probaran las actualizaciones!

Con TestFlight, el problema es simple: incorporar personas a su equipo y hacerles entender cómo obtenerlo lleva mucho tiempo.

Y por supuesto, cada vez que envías a Apple tienes un proceso de revisión aleatorio por parte de un bot que puede tardar 5 minutos o 5 horas, nunca se sabe.

Muchas veces mi presentación se retrasó por esto...

Y para Google esto es aún peor, el gran misterio de mi vida: lanzar una versión de producción lleva menos de 2 horas, pero lanzar una versión beta cercana tarda entre 1 y 2 días.


## Solución

Para solucionar este problema, creé el sistema de canales en Capgo.

`npx @capgo/cli@latest carga de paquete -c producción` se actualizará para todos los usuarios (si el canal de producción está configurado como predeterminado)

Si haces `npx @capgo/cli@latest bundle upload -c development` entonces la versión llega a un canal diferente, esto se puede automatizar en [GitHub action](/blog/manage-dev-and-prod-build-with -github-acciones/) 

Entonces tienes 2 formas de permitir que los usuarios obtengan las actualizaciones del canal.

### Manera súper automática

Esto puede ser útil cuando no desea crear su propio backend para el conjunto de canales, esto es rápido de implementar.

Con ese, lo único que necesitas hacer es permitir que uno de tus canales sea autoconfigurado.

![Permitir configurar self en Capgo](/self_setwebp)

Y luego agregue esto en el código de su aplicación Ionic; para una mejor experiencia, utilícelo después de que el usuario haga clic en un botón como "registrarse para la versión beta".
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Manera manual

Esto puede ser útil para su equipo interno, es rápido de implementar
Permita que los usuarios copien su ID de dispositivo desde su aplicación y se lo envíen manualmente. Este código le ayudará a obtenerlo:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Oculte un botón en algún lugar de su aplicación o muéstrelo solo a los usuarios conectados con una función de "administrador", por ejemplo.

Luego vaya a la aplicación web o aplicación nativa Capgo, conéctese como administrador de la aplicación, seleccione su aplicación, haga clic en la lista de dispositivos

Luego coloque en la barra de búsqueda el ID del dispositivo, haga clic en el encontrado y luego haga clic en el enlace del Canal, elija "desarrollo", pídale a su compañero de equipo que abra la aplicación nuevamente, espere 30 segundos y abra y cierre.

Él debería obtener tu versión.


### Manera automática

Esto puede ser útil para sus probadores beta, su implementación lleva más tiempo

Igual que en la forma manual, debes obtener el ID del dispositivo.
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Pero esta vez tienes que enviarlo automáticamente a tu backend, te dejo decidir cómo lo haces.

Sólo te sugeriré que lo guardes en una base de datos, eso te facilitará la vida más adelante.

Luego, en su backend, también debe enviarlo al backend de Capgo. A continuación se muestran dos ejemplos de código:
<detalles>
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
</detalles>


<detalles>
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
Y simplemente envíe su ID de dispositivo en el cuerpo del mismo a la URL implementada con POST para agregar y el método DELETE para eliminar.
</detalles>

Después de configurar esto, intente agregar un botón en su aplicación para optar por el canal y verifique en la aplicación web si eso se ha configurado.

También puedes enviar "null" para eliminar la anulación.

Si necesita verificar mediante programación qué anulación está configurada en un dispositivo, puede obtenerla en la misma URL

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```