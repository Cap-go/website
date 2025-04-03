---
title: Manuale
description: Come utilizzare manualmente gli aggiornamenti di Capgo
sidebar:
  order: 3
locale: it
---

## Prima di iniziare

:::tip
Se utilizzi questo strumento gratuitamente, dedica del tempo a supportare il mio lavoro con [GitHub sponsor](https://github.com/sponsors/riderx/)

Ho scommesso di rendere open source tutto il codice che ho costruito qui

Avrei potuto tenerlo per me e metterci un prezzo alto

Invece, voglio renderlo un business aperto e trasparente

Penso che renderebbe il nostro mondo un posto migliore aprendo invece di combattere e nascondere

Per renderlo possibile, è necessario che tutti noi facciamo la nostra parte, incluso te 🥹

Se l'offerta Capgo cloud non fa per te, sostieni un Maker indipendente [QUI](https://github.com/sponsors/riderx/) alle tue condizioni
:::

## Installazione rapida

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Configurazione

Aggiungi questo alla tua configurazione per disabilitare l'aggiornamento automatico:

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

Quindi aggiungi questo codice alla tua app per utilizzare il download manuale

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Esegui il download mentre l'app è attiva per prevenire download falliti
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://github.com/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Esegui lo switch quando l'utente lascia l'app
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // in caso il set fallisca, altrimenti la nuova app dovrà nasconderlo
       }
     }
 })
```

⚠️ Se invii un aggiornamento difettoso, l'app tornerà all'ultima versione funzionante o a quella inclusa nella build nativa, se nessuna funziona

## App demo&#x20;

Controlla l'app demo per maggiori informazioni

[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://github.com/Cap-go/demo-app/)

## Pacchetto

Qualunque sia il nome che scegli per il file che scarichi dal tuo server di rilascio/aggiornamento URL, il file zip dovrebbe contenere il contenuto completo della cartella di output della build Capacitor di produzione, solitamente `{project directory}/dist/` o `{project directory}/www/`

Qui si troverà `indexhtml`, e dovrebbe contenere anche tutto il JavaScript in bundle, CSS e risorse web necessarie per il funzionamento della tua app

Non proteggere questo file con password, altrimenti non riuscirà a decomprimersi
