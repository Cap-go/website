---
title: Handbuch
description: Verwendung des manuellen Capgo-Updates
sidebar:
  order: 3
locale: de
---

## Vor dem Start

:::tip
Wenn Sie dieses Tool kostenlos nutzen, nehmen Sie sich Zeit, meine Arbeit über [GitHub Sponsor](https://githubcom/sponsors/riderx/) zu unterstützen

Ich habe mich entschieden, den gesamten Code, den ich hier entwickelt habe, als Open Source zur Verfügung zu stellen

Ich hätte es für mich behalten und einen hohen Preis verlangen können

Stattdessen möchte ich daraus ein offenes und transparentes Geschäft machen

Ich denke, es würde unsere Welt zu einem besseren Ort machen, wenn wir öffnen statt kämpfen und verstecken

Um dies zu ermöglichen, ist es notwendig, dass wir alle unseren Teil dazu beitragen, auch Sie 🥹

Wenn das Capgo-Cloud-Angebot nicht zu Ihnen passt, unterstützen Sie einen bootstrapped Maker [HIER](https://githubcom/sponsors/riderx/) zu Ihren Bedingungen
:::

## Schnellinstallation

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfiguration

Fügen Sie dies zu Ihrer Konfiguration hinzu, um automatische Updates zu deaktivieren:

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
       // Führen Sie den Download durch, während die App aktiv ist, um fehlgeschlagene Downloads zu vermeiden
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Führen Sie den Wechsel durch, wenn der Benutzer die App verlässt
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // falls das Setzen fehlschlägt, andernfalls muss die neue App es ausblenden
       }
     }
 })
```

⚠️ Wenn Sie ein fehlerhaftes Update senden, wird die App zur letzten funktionierenden Version zurückkehren oder zu der Version, die im nativen Build enthalten ist, wenn keine funktioniert

## Demo-App&#x20;

Überprüfen Sie die Demo-App für weitere Informationen

[GitHub - Cap-go/demo-app: Demo-App mit manuellem und automatischem Modus](https://githubcom/Cap-go/demo-app/)

## Paket

Unabhängig davon, wie Sie die Datei benennen, die Sie von Ihrer Release/Update-Server-URL herunterladen, sollte die ZIP-Datei den gesamten Inhalt Ihres Capacitor-Produktions-Build-Ausgabeordners enthalten, üblicherweise `{Projektverzeichnis}/dist/` oder `{Projektverzeichnis}/www/`

Hier befindet sich `indexhtml`, und es sollte auch alle gebündelten JavaScript-, CSS- und Web-Ressourcen enthalten, die für den Betrieb Ihrer App erforderlich sind

Verschlüsseln Sie diese Datei nicht mit einem Passwort, da sie sonst nicht entpackt werden kann