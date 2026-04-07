---
locale: de
---

capgo/inappbrowser Paket Tutorial

Das `@capgo/inappbrowser` Paket ist ein Capacitor-Plugin, mit dem Sie eine URL in einem In-App-Browserfenster öffnen können. Hier ist eine schrittweise Anleitung, wie Sie dieses Paket verwenden:

## Installation

Um das Paket zu installieren, führen Sie den folgenden Befehl im Stammverzeichnis Ihres Projekts aus:

```bash
npm install @capgo/inappbrowser
npx cap sync
```

## Verwendung

1. Importieren Sie die `InAppBrowser`-Klasse aus dem `@capgo/inappbrowser`-Paket:

   ```javascript
   import { InAppBrowser } from '@capgo/inappbrowser';
   ```

2. Verwenden Sie die Methode `InAppBrowser.open`, um eine URL in einem neuen Vollbildfenster zu öffnen:

   ```javascript
   InAppBrowser.open("YOUR_URL");
   ```

   Ersetzen Sie `"YOUR_URL"` durch die URL, die Sie öffnen möchten.

3. Sie können auch andere Methoden der `InAppBrowser`-Klasse verwenden:

   - `clearCookies`: Alle Cookies löschen
   - `close`: Das In-App-Browserfenster schließen
   - `openWebView`: Eine URL in einem neuen Webview mit Werkzeugleisten öffnen
   - `setUrl`: Die URL des In-App-Browsers festlegen

   Weitere Einzelheiten zu diesen Methoden finden Sie im API-Bereich unten.

## API

Das `@capgo/inappbrowser`-Paket bietet die folgenden API-Methoden:

- `open(options: OpenOptions)`: Öffnet eine URL in einem neuen Vollbildfenster. Nimmt ein `OpenOptions`-Objekt als Parameter.
- `clearCookies()`: Alle Cookies löschen.
- `close()`: Das In-App-Browserfenster schließen.
- `openWebView(options: OpenWebViewOptions)`: Öffnet eine URL in einem neuen Webview mit Werkzeugleisten. Nimmt ein `OpenWebViewOptions`-Objekt als Parameter.
- `setUrl(options: { url: string; })`: Legt die URL des In-App-Browsers fest. Nimmt ein Objekt mit einer `url`-Eigenschaft als Parameter.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Hört auf URL-Änderungsereignisse. Nimmt eine `UrlChangeListener`-Funktion als Parameter.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Hört auf Schließereignisse. Nimmt eine `UrlChangeListener`-Funktion als Parameter.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Hört auf Ereignisse, bei denen die Bestätigungstaste geklickt wird. Nimmt eine `UrlChangeListener`-Funktion als Parameter.
- `removeAllListeners()`: Entfernt alle Ereignis-Listener.

Für weitere Informationen zu den Parametern und Rückgabewerten dieser Methoden siehe die Dokumentation des Pakets.

Und das ist es! Sie haben gelernt, wie Sie das `@capgo/inappbrowser`-Paket verwenden, um URLs in einem In-App-Browserfenster in Capacitor zu öffnen. Viel Spaß beim Programmieren!