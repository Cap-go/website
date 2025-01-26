---
title: Handbuch
description: Wie man den Capgo-Updater im manuellen Modus verwendet
sidebar:
  order: 3
locale: de
---

## Vor dem Start

:::tip
Wenn du dieses Tool kostenlos nutzt, nimm dir Zeit, meine Arbeit mit [GitHub Sponsor](https://githubcom/sponsors/riderx/) zu unterstützen.

Ich habe gewettet, den gesamten Code, den ich hier gebaut habe, Open Source zu machen.

Ich hätte ihn für mich behalten und einen hohen Ticketpreis verlangen können.

Stattdessen möchte ich daraus ein offenes und transparentes Unternehmen machen.

Ich denke, es würde unsere Welt zu einem besseren Ort machen, indem wir öffnen statt kämpfen und uns verstecken.

Um dies möglich zu machen, ist es notwendig, dass wir alle unseren Teil dazu beitragen, einschließlich dir 🥹.

Wenn das Angebot von Capgo Cloud dir nicht zusagt, unterstütze einen bootstrapped Maker [HIER](https://githubcom/sponsors/riderx/) zu deinen Bedingungen.
:::

## Schnelle Installation

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfiguration

Füge dies zu deiner Konfiguration hinzu, um die automatische Aktualisierung zu deaktivieren:

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

Füge dann diesen Code zu deiner App hinzu, um den manuellen Download zu verwenden:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Führe den Download während der aktiven App-Zeit des Benutzers durch, um fehlgeschlagene Downloads zu verhindern
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Führe den Wechsel durch, wenn der Benutzer die App verlässt
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // für den Fall, dass das Setzen fehlschlägt, andernfalls muss die neue App es verstecken
       }
     }
 })
 
```

⚠️ Wenn du ein beschädigtes Update sendest, wird die App auf die zuletzt funktionierende Version zurückgesetzt oder auf die, die mit dem nativen Build enthalten ist, wenn keine funktioniert.

## Demo-App&#x20;

Überprüfe die Demo-App für weitere Informationen.

[GitHub - Cap-go/demo-app: Demo-App mit manueller und automatischer Methode](https://githubcom/Cap-go/demo-app/)

## Paket

Egal, wie du die Datei nennst, die du von deiner Release-/Update-Server-URL herunterlädst, die ZIP-Datei sollte den gesamten Inhalt deines Produktionsordners für den Capacitor-Build enthalten, normalerweise `{project directory}/dist/` oder `{project directory}/www/`.

Dies ist der Ort, an dem `indexhtml` zu finden sein wird, und es sollte auch alle gebündelten JavaScript-, CSS- und Webressourcen enthalten, die notwendig sind, damit deine App ausgeführt werden kann.

Verschlüssele diese Datei nicht mit einem Passwort, da sie sonst nicht entpackt werden kann.