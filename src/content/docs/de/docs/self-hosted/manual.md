---
title: Handbuch
description: So verwenden Sie den Capgo-Updater im manuellen Modus
sidebar:
  order: 3
locale: de
---

## Vor dem Start

:::tip
Wenn Sie dieses Tool kostenlos nutzen, nehmen Sie sich Zeit, meine Arbeit mit [GitHub sponsor](https://githubcom/sponsors/riderx/) zu unterstützen

Ich habe darauf gesetzt, den gesamten hier entwickelten Code open source zu machen

Ich hätte es für mich behalten und einen hohen Preis verlangen können

Stattdessen möchte ich daraus ein offenes und transparentes Geschäft machen

Ich denke, es würde unsere Welt zu einem besseren Ort machen, wenn wir öffnen statt kämpfen und verstecken

Um dies zu ermöglichen, ist es notwendig, dass wir alle unseren Teil dazu beitragen, auch Sie 🥹

Wenn das Capgo Cloud-Angebot nicht zu Ihnen passt, unterstützen Sie einen bootstrapped Maker [HIER](https://githubcom/sponsors/riderx/) zu Ihren Bedingungen
:::

## Schnellinstallation

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfiguration

Fügen Sie dies zu Ihrer Konfiguration hinzu, um Auto-Update zu deaktivieren:

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

Fügen Sie dann diesen Code zu Ihrer App hinzu, um manuelles Herunterladen zu verwenden

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Do the download during user active app time to prevent failed download
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Do the switch when user leave app
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // in case the set fail, otherwise the new app will have to hide it
       }
     }
 })
```

⚠️ Wenn Sie ein fehlerhaftes Update senden, wird die App auf die letzte funktionierende Version oder die im nativen Build enthaltene Version zurückgesetzt, wenn keine funktioniert

## Demo-App&#x20;

Weitere Informationen finden Sie in der Demo-App

[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://githubcom/Cap-go/demo-app/)

## Paket

Unabhängig davon, wie Sie die Datei benennen, die Sie von Ihrer Release/Update-Server-URL herunterladen, sollte die ZIP-Datei den vollständigen Inhalt Ihres Produktions-Capacitor-Build-Ausgabeordners enthalten, normalerweise `{project directory}/dist/` oder `{project directory}/www/`

Hier befindet sich `indexhtml`, und es sollte auch alle gebündelten JavaScript-, CSS- und Web-Ressourcen enthalten, die für den Betrieb Ihrer App erforderlich sind

Verschlüsseln Sie diese Datei nicht mit einem Passwort, da sie sonst nicht entpackt werden kann