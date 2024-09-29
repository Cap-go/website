---
slug: how-to-send-specific-version-to-users
title: Comment envoyer une mise à jour spécifique à un utilisateur ou à un groupe
description: >-
  Permettez à votre utilisateur d'essayer la version bêta sans avoir besoin de
  TestFlight ou du processus bêta de Google, ajoutez simplement un bouton dans
  votre application Ionic, et ils y sont !
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight alternative illustration
tag: alternatives
published: true
next_blog: ''
---

## Préface

Lorsque vous commencerez à profiter du système de mise à jour de Capgo, comme moi pour mes applications, vous commencerez à avoir le sentiment « Et si j'en veux plus ?

J'ai eu le sentiment aussi, mais comme je suis le créateur de Capgo, j'ai pu y jeter un œil !

> Puisque tout est open-source, vous avez aussi ce pouvoir :)

La prochaine difficulté que j'ai rencontrée dans le processus de distribution de l'application Capacitor est de demander à d'autres coéquipiers de tester les mises à jour !

Avec TestFlight, la problématique est simple, intégrer des personnes dans votre équipe et leur faire comprendre comment l'obtenir prend du temps !

Et bien sûr, chaque fois que vous envoyez à Apple, vous bénéficiez d'un processus d'examen aléatoire par un robot qui peut prendre 5 minutes ou 5 heures, on ne sait jamais

J'ai eu plusieurs fois ma présentation retardée à cause de cela…

Et pour Google, c'est encore pire, le grand mystère de ma vie, sortir une version de production prend moins de 2 heures, mais sortir une version bêta proche prend 1 à 2 jours


## Solution

Pour résoudre ce problème, j'ai créé le système de chaînes dans Capgo

`npx @capgo/cli@latest bundle upload -c production` sera mis à jour pour tous les utilisateurs (si le canal de production est défini par défaut)

Si vous effectuez `npx @capgo/cli@latest bundle upload -c development`, la version atterrit sur un canal différent, cela peut être automatisé dans [action GitHub](/blog/manage-dev-and-prod-build-with -github-actions/) 

Ensuite, vous avez deux façons de permettre aux utilisateurs de recevoir les mises à jour de la chaîne

### Manière super automatique

Cela peut être utile lorsque vous ne souhaitez pas créer votre propre backend pour un ensemble de canaux, c'est rapide à mettre en œuvre

Avec celui-là, la seule chose que vous devez faire est de permettre à l'une de vos chaînes de se régler automatiquement.

![Autoriser la définition de soi dans Capgo](/self_setwebp)

Et puis ajoutez-le dans le code de votre application Ionic, pour une meilleure expérience, utilisez-le après que l'utilisateur ait cliqué sur un bouton comme "s'inscrire à la version bêta".
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Manière manuelle

Cela peut être utile pour votre équipe interne, c’est rapide à mettre en œuvre
Autorisez les utilisateurs à copier leur identifiant d'appareil depuis votre application et à vous l'envoyer manuellement, ce code vous aidera à l'obtenir :
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Masquez un bouton quelque part dans votre application ou affichez le bouton uniquement aux utilisateurs connectés avec un rôle « administrateur », par exemple

Accédez ensuite à l'application Web ou à l'application native Capgo, connectez-vous en tant qu'administrateur de l'application, sélectionnez votre application, cliquez sur la liste des appareils.

Ensuite, mettez dans la barre de recherche l'ID de l'appareil, cliquez sur celui trouvé puis cliquez sur le lien Chaîne, choisissez le « développement », demandez à votre coéquipier d'ouvrir à nouveau l'application, attendez 30 secondes et ouvrez et fermez

Il devrait avoir ta version


### Méthode automatique

Cela peut être utile pour vos bêta-testeurs, c'est plus long à mettre en œuvre

De la même manière que pour la méthode manuelle, vous devez obtenir l'ID de l'appareil
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Mais cette fois, vous devez l'envoyer automatiquement à votre backend, je vous laisse décider comment procéder.

Je vous proposerai juste de le stocker dans une base de données, cela vous facilitera la vie plus tard

Ensuite, dans votre backend, vous devez également l'envoyer au backend Capgo. Ci-dessous deux exemples de code :
<détails>
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
</détails>


<détails>
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
Et envoyez simplement votre device_id dans le corps de celui-ci à l'URL déployée avec la méthode POST pour ajouter et la méthode DELETE pour supprimer
</détails>

Une fois cette configuration configurée, essayez d'ajouter un bouton dans votre application pour vous inscrire à la chaîne et vérifiez dans l'application Web si cela a été défini.

Vous pouvez également envoyer « null » pour supprimer le remplacement

Si vous devez vérifier par programme quel remplacement est défini sur un appareil, vous pouvez accéder à la même URL

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```