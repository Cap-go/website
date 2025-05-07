---
slug: como-enviar-una-version-especifica-a-usuarios
title: Comment envoyer une mise à jour spécifique à un utilisateur ou un groupe
description: >-
  Permettez à vos utilisateurs de tester la version bêta sans passer par
  TestFlight ou le processus bêta de Google, ajoutez simplement un bouton dans
  votre application Ionic et c'est parti !
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Alternative à TestFlight illustration
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: fr
next_blog: ''
---
## Préface

Quand vous commencez à apprécier le système de mise à jour de Capgo, comme moi pour mes applications, vous commencez à vous demander "Et si je voulais plus ?"

J'ai eu ce sentiment aussi, mais comme je suis le créateur de Capgo, j'ai pu y regarder de plus près !

> Comme tout est open-source, vous avez aussi ce pouvoir :)

La prochaine difficulté que j'ai rencontrée dans le processus de distribution d'applications Capacitor est de faire tester les mises à jour par d'autres membres de l'équipe !

Avec TestFlight, le problème est simple, intégrer des personnes dans votre équipe et leur faire comprendre comment l'obtenir prend du temps !

Et bien sûr, chaque fois que vous envoyez à Apple, vous avez un processus de révision aléatoire par un bot qui peut prendre 5 minutes ou 5 heures, on ne sait jamais.

J'ai eu plusieurs fois ma présentation retardée à cause de cela...

Et pour Google c'est encore pire, le grand mystère de ma vie, publier une version de production prend moins de 2 heures, mais publier une version bêta fermée prend 1 à 2 jours.

## Solution

Pour résoudre cela, j'ai créé le système de Canaux dans Capgo.

`npx @capgo/cli@latest bundle upload -c production` mettra à jour tous les utilisateurs (si le canal production est défini par défaut)

Si vous faites `npx @capgo/cli@latest bundle upload -c development` alors la version atterrit dans un canal différent, cela peut être automatisé dans [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/).

Ensuite, vous avez 2 façons de permettre aux utilisateurs d'obtenir les mises à jour du canal

### Méthode Super automatique

Cela peut être utile quand vous ne voulez pas créer votre propre backend pour la configuration des canaux, c'est rapide à mettre en œuvre.

Avec celle-ci, la seule chose que vous devez faire est d'autoriser l'un de vos canaux à être auto-configurable.

![Autoriser l'auto-configuration dans Capgo](/self_set.webp)

Et ensuite ajoutez ceci dans le code de votre application Ionic, pour une meilleure expérience, utilisez ceci après que l'utilisateur clique sur un bouton comme "s'inscrire à la bêta"
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Méthode manuelle

Cela peut être utile pour votre équipe interne, c'est rapide à mettre en œuvre.
Permettez aux utilisateurs de copier leur deviceID depuis votre application et de vous l'envoyer manuellement, ce code vous aidera à l'obtenir :
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Cachez un bouton quelque part dans votre application, ou montrez le bouton uniquement aux utilisateurs connectés avec un rôle `admin`, par exemple.

Ensuite, allez sur l'application Web ou native Capgo, connectez-vous en tant qu'administrateur d'application, sélectionnez votre application, cliquez sur la liste des appareils.

Puis mettez dans la barre de recherche le deviceID, cliquez sur celui trouvé puis cliquez sur le lien Canal, choisissez `development`, demandez à votre coéquipier d'ouvrir à nouveau l'application, attendez 30 secondes et ouvrez fermez.

Il devrait obtenir votre version.

### Méthode automatique

Cela peut être utile pour vos testeurs bêta, c'est plus long à mettre en œuvre.

Comme pour la méthode manuelle, vous devez obtenir le deviceID
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Mais cette fois, vous devez l'envoyer automatiquement à votre backend, je vous laisse décider comment faire.

Je vous suggère simplement de le stocker dans une base de données, cela vous facilitera la vie plus tard.

Ensuite, dans votre backend, vous devez l'envoyer au backend de Capgo aussi. Ci-dessous deux exemples de code :
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
Et envoyez simplement votre device_id dans le corps de la requête à l'URL déployée avec POST pour ajouter et DELETE pour supprimer.
</Tabs>

Après cette configuration, essayez d'ajouter un bouton dans votre application pour opter pour le canal, et vérifiez dans l'application web si cela a été défini.

Vous pouvez également envoyer `null` pour supprimer la surcharge

Si vous devez vérifier programmatiquement quelle surcharge est définie sur un appareil, vous pouvez obtenir sur la même URL

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
