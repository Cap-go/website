---
slug: de__how-to-send-specific-version-to-users
title: Wie man spezifische Updates an einen Benutzer oder eine Gruppe sendet
description: >-
  Ermöglichen Sie Ihren Nutzern, eine Beta-Version zu testen, ohne TestFlight
  oder den Google-Beta-Prozess zu benötigen. Fügen Sie einfach einen Button in
  Ihrer Ionic-App hinzu, und schon sind sie dabei!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight-Alternative-Illustration
tag: alternatives
published: true
locale: de
next_blog: ''
---

## Vorwort

Wenn Sie beginnen, das Update-System von Capgo zu genießen, wie ich es für meine Apps tue, werden Sie anfangen zu denken: "Was wäre, wenn ich mehr möchte?"

Ich hatte auch dieses Gefühl, aber da ich der Entwickler von Capgo bin, konnte ich einen Blick darauf werfen!

> Da alles Open-Source ist, haben Sie diese Möglichkeit auch :)

Der nächste Schmerzpunkt, den ich im Verteilungsprozess von Capacitor-Apps hatte, ist es, andere Teammitglieder die Updates testen zu lassen!

Mit TestFlight ist das Problem einfach: Leute in Ihr Team zu bringen und ihnen beizubringen, wie sie es bekommen, ist zeitaufwendig!

Und natürlich haben Sie jedes Mal, wenn Sie etwas an Apple senden, einen zufälligen Überprüfungsprozess durch einen Bot, der 5 Minuten oder 5 Stunden dauern kann, Sie wissen es nie.

Meine Präsentationen wurden oft dadurch verzögert...

Und bei Google ist es noch schlimmer, das große Rätsel meines Lebens: Eine Produktionsversion freizugeben, dauert weniger als 2 Stunden, aber eine geschlossene Beta freizugeben, dauert 1-2 Tage.

## Lösung

Um dies zu beheben, habe ich das Channel-System in Capgo erstellt.

`npx @capgo/cli@latest bundle upload -c production` wird alle Benutzer aktualisieren (wenn der Produktionskanal als Standard festgelegt ist)

Wenn Sie `npx @capgo/cli@latest bundle upload -c development` ausführen, landet die Version in einem anderen Kanal. Dies kann in [GitHub-Aktionen](/blog/manage-dev-and-prod-build-with-github-actions/) automatisiert werden.

Dann haben Sie zwei Möglichkeiten, Benutzer Updates aus dem Kanal erhalten zu lassen:

### Super automatische Methode

Dies kann nützlich sein, wenn Sie kein eigenes Backend für die Kanaleinstellung erstellen möchten. Es ist schnell zu implementieren.

Bei dieser Methode müssen Sie nur einen Ihrer Kanäle zur Selbsteinstellung freigeben.

![Selbsteinstellung in Capgo erlauben](/self_setwebp)

Fügen Sie dann Folgendes in den Code Ihrer Ionic-App ein. Für die beste Erfahrung verwenden Sie dies, nachdem der Benutzer auf eine Schaltfläche wie "Für Beta registrieren" geklickt hat:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Manuelle Methode

Dies kann für Ihr internes Team nützlich sein und ist schnell zu implementieren.
Erlauben Sie Benutzern, ihre Geräte-ID aus Ihrer App zu kopieren und manuell an Sie zu senden. Dieser Code hilft Ihnen, sie zu erhalten:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Verstecken Sie irgendwo in Ihrer App eine Schaltfläche oder zeigen Sie die Schaltfläche nur angemeldeten Benutzern mit einer `admin`-Rolle an.

Gehen Sie dann zur Web-App oder nativen App von Capgo, melden Sie sich als App-Admin an, wählen Sie Ihre App aus und klicken Sie auf die Geräteliste.

Geben Sie dann in der Suchleiste die Geräte-ID ein, klicken Sie auf das gefundene Gerät und dann auf den Kanal-Link. Wählen Sie `development`, bitten Sie Ihr Teammitglied, die App erneut zu öffnen, 30 Sekunden zu warten und zu schließen.

Er sollte Ihre Version erhalten.

### Automatische Methode

Dies kann für Ihre Beta-Tester nützlich sein, erfordert aber eine längere Implementierung.

Wie bei der manuellen Methode müssen Sie die Geräte-ID erhalten:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Diesmal müssen Sie sie jedoch automatisch an Ihr Backend senden. Ich überlasse es Ihnen, wie Sie das machen.

Ich schlage nur vor, sie in einer Datenbank zu speichern, das wird Ihnen später das Leben erleichtern.

Dann müssen Sie sie in Ihrem Backend auch an das Capgo-Backend senden. Hier zwei Codebeispiele:
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
Senden Sie einfach Ihre device_id im Body an die bereitgestellte URL mit POST zum Hinzufügen und DELETE-Methode zum Löschen.
</details>

Nachdem dies konfiguriert ist, versuchen Sie, eine Schaltfläche in Ihrer App hinzuzufügen, um sich für den Kanal anzumelden, und überprüfen Sie in der Web-App, ob dies eingestellt wurde.

Sie können auch `null` senden, um die Übersteuerung zu entfernen.

Wenn Sie programmatisch überprüfen müssen, welche Übersteuerung auf einem Gerät eingestellt ist, können Sie dies über dieselbe URL abrufen:

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```