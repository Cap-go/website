---
locale: de
---

sing @capgo/logsnag Paket

Das `@capgo/logsnag` Paket ist ein leistungsstarkes Tool zur Benachrichtigung und Nachverfolgung von Projektereignissen. Dieses Tutorial führt Sie durch die Installation und Nutzung des Pakets.

## Installation

Um das `@capgo/logsnag` Paket zu installieren, öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus:

```sh
npm install --save @capgo/logsnag
```

## Nutzung

### Bibliothek importieren

Um das `@capgo/logsnag` Paket in Ihrem Projekt zu verwenden, müssen Sie es importieren. Fügen Sie die folgende Import-Anweisung zu Beginn Ihrer JavaScript-Datei hinzu:

```js
import { LogSnag } from '@capgo/logsnag';
```

### Client initialisieren

Bevor Sie die Funktionen von `@capgo/logsnag` nutzen können, müssen Sie einen Client initialisieren. Verwenden Sie den folgenden Code, um einen Client zu initialisieren:

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
Ersetzen Sie `YOUR_API_TOKEN` durch Ihren tatsächlichen API-Token und `YOUR_PROJECT_NAME` durch den Namen Ihres Projekts.

### Ereignis veröffentlichen

Um ein Ereignis mit `@capgo/logsnag` zu veröffentlichen, verwenden Sie die `publish`-Methode des `logsnag`-Objekts. Hier ist ein Beispielcode-Snippet, das ein Ereignis veröffentlicht:

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
Passen Sie die Werte der Eigenschaften an Ihr spezifisches Ereignis an. Sie können den Kanal, den Ereignisnamen, das Symbol, Tags und die Benachrichtigungsoption festlegen.

### Erkenntnisse veröffentlichen

Neben Ereignissen können Sie auch Erkenntnisse mit `@capgo/logsnag` veröffentlichen. Erkenntnisse bieten wertvolle Informationen und Statistiken über Ihr Projekt. Hier ist ein Beispielcode-Snippet, das eine Erkenntnis veröffentlicht:

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
Ändern Sie die Werte der Eigenschaften, um Ihre Erkenntnis anzupassen. Sie können den Titel, den Wert und das Symbol angeben.

Das war's! Sie haben nun gelernt, wie Sie das `@capgo/logsnag` Paket in Ihrem Projekt installieren und verwenden. Viel Spaß beim Nachverfolgen Ihrer Projekte und beim Erhalten von Benachrichtigungen!