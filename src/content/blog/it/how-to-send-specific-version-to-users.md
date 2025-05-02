---
slug: come-inviare-una-versione-specifica-agli-utenti
title: Come inviare un aggiornamento specifico a un utente o a un gruppo
description: >-
  Permetti ai tuoi utenti di provare la versione beta senza la necessità di
  TestFlight o del processo beta di Google, aggiungi semplicemente un pulsante
  nella tua app Ionic, e il gioco è fatto!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight alternative illustrazione
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: it
next_blog: ''
original_slug: how-to-send-specific-version-to-users
---
## Prefazione

Quando inizi ad apprezzare il sistema di aggiornamento di Capgo, come me per le mie app, inizierai a chiederti "E se volessi di più?"

Ho avuto anch'io questa sensazione, ma essendo il creatore di Capgo, ho potuto dare un'occhiata!

> Dato che tutto è open-source, anche tu hai questo potere :)

Il prossimo problema che ho riscontrato nel processo di distribuzione delle app Capacitor è far testare gli aggiornamenti ad altri membri del team!

Con TestFlight, il problema è semplice: far entrare le persone nel tuo team e far capire loro come ottenerlo richiede molto tempo!

E naturalmente, ogni volta che invii ad Apple hai un processo di revisione casuale da parte di un bot che può richiedere 5 minuti o 5 ore, non si sa mai.

Mi è capitato molte volte di dover ritardare la mia presentazione per questo...

E per Google è ancora peggio, il grande mistero della mia vita: rilasciare una versione di produzione richiede meno di 2 ore, ma rilasciare una beta chiusa richiede 1-2 giorni.

## Soluzione

Per risolvere questo, ho creato il sistema dei Canali in Capgo.

`npx @capgo/cli@latest bundle upload -c production` aggiornerà tutti gli utenti (se il canale production è impostato come predefinito)

Se esegui `npx @capgo/cli@latest bundle upload -c development` la versione andrà in un canale diverso, questo può essere automatizzato in [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/).

Poi hai 2 modi per permettere agli utenti di ricevere gli aggiornamenti dal canale

### Modo Super automatico

Questo può essere utile quando non vuoi creare il tuo backend per l'impostazione dei canali, è veloce da implementare.

Con questo, l'unica cosa che devi fare è permettere a uno dei tuoi canali di essere impostato autonomamente.

![Consenti l'impostazione autonoma in Capgo](/self_set.webp)

E poi aggiungi questo nel codice della tua app Ionic, per una migliore esperienza, usalo dopo che l'utente clicca su un pulsante come "registrati per la beta"
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Modo manuale

Questo può essere utile per il tuo team interno, è veloce da implementare.
Permetti agli utenti di copiare il loro deviceID dalla tua app e inviartelo manualmente, questo codice ti aiuterà a ottenerlo:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Nascondi un pulsante da qualche parte nella tua app, o mostra il pulsante solo agli utenti connessi con ruolo `admin`, per esempio.

Poi vai nell'app Web o nell'app nativa Capgo, connettiti come admin dell'app, seleziona la tua app, clicca sulla lista dei dispositivi.

Quindi inserisci nella barra di ricerca il deviceID, clicca su quello trovato e poi clicca sul link del Canale scegli `development`, chiedi al tuo compagno di squadra di aprire di nuovo l'app, attendere 30 secondi e aprire chiudere.

Dovrebbe ottenere la tua versione.

### Modo automatico

Questo può essere utile per i tuoi beta tester, richiede più tempo per l'implementazione.

Come per il modo manuale, devi ottenere il deviceID
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Ma questa volta devi inviarlo automaticamente al tuo backend, lascio a te decidere come farlo.

Ti suggerisco solo di memorizzarlo in un database, questo ti faciliterà la vita più tardi.

Poi nel tuo backend devi inviarlo anche al backend di Capgo. Di seguito due esempi di codice:
<Tabs>
  <TabItem value="nodejs">NodeJS</TabItem>

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
</Tabs>

<Tabs>
  <TabItem value="cloudflare">Cloudflare</TabItem>
  
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
E basta inviare il tuo device_id nel corpo della richiesta all'URL distribuito con POST per aggiungere e il metodo DELETE per eliminare.
</Tabs>

Dopo aver configurato questo, prova ad aggiungere un pulsante nella tua app per optare per il canale e verifica nell'app web se è stato impostato.

Puoi anche inviare `null` per rimuovere l'override

Se hai bisogno di controllare programmaticamente quale override è impostato su un dispositivo, puoi ottenerlo sullo stesso URL

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
