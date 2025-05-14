---
slug: self-hosted-live-updates
title: Selbst gehostete Live-Updates
description: >-
  Ich freue mich, die selbstgehosteten Live-Updates anzukündigen, die nächste
  Iteration der Live-Updates von Capgo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Selbstgehostete Updates
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: de
next_blog: ''
---
Ich freue mich, die Veröffentlichung von Selbstgehosteten Live-Updates bekannt zu geben, die die neueste Evolution von Capgos Live-Updates darstellt.

Während viele Unternehmen derzeit das Live Updates SDK nutzen, um die neuesten JavaScript-, HTML- und CSS-Updates für ihre Anwendungen zu erhalten, können einige aufgrund von Unternehmensrichtlinien, Branchenvorschriften oder geografischen Beschränkungen auf Hindernisse stoßen. Mit Selbstgehosteten Live-Updates können Sie jetzt Web-Build-Artefakte über Ihre Infrastruktur verteilen.

Das bedeutet, Sie können Verzögerungen durch Apple Store-Bewertungen vermeiden, Fehler schneller beheben und Inhalte rascher ändern sowie sicherstellen, dass Ihre Benutzer immer mit der neuesten Version Ihrer App arbeiten. Darüber hinaus habe ich von zahlreichen großen Unternehmen gehört, die Live Updates nutzen möchten, aber aufgrund strenger Compliance-Vorgaben vor Herausforderungen stehen. Dieses Problem gehört dank Selbstgehosteten Live-Updates nun der Vergangenheit an.

## Wie funktionieren selbstgehostete Live-Updates?

Die Bereitstellung von Capgo-gehosteten Live-Updates ist ein Kinderspiel mit dem [Capgo SDK](https://github.com/Cap-go/capacitor-updater/). Für Selbstgehostete Live-Updates habe ich die Capgo CLI um die erforderlichen Funktionen erweitert, um eine Konfiguration auf Ihrer Infrastruktur zu ermöglichen.

Um eine sichere und koordinierte Bereitstellung der neuesten Web-Build-Artefakte an Endbenutzer zu gewährleisten, erlaubt Capgo nun dem Capacitor Live Updates-Plugin, ein öffentliches/privates Schlüsselpaar zu verwenden. Bei der Verwendung von Selbstgehosteten Live-Updates wird ein zusätzlicher Handshake durchgeführt, um die Gewährleistung zu bieten, dass die über das Plugin von der Infrastruktur des Unternehmens heruntergeladenen Artefakte unverändert sind.

![Capgo-Verschlüsselungsschema](/encryption_flow.webp)

Im Folgenden sind die Schritte aufgeführt, um das Schlüsselpaar einzurichten und den anschließenden Prozess zur Bereitstellung der aktualisierten Erfahrung an Endbenutzer darzustellen.

### Einmalige Einrichtung des Schlüsselpaares

Um ein öffentliches/privates Schlüsselpaar zu generieren, können Unternehmen den folgenden Befehl der Capgo Cloud CLI verwenden:

```shell
npx @capgo/cli@latest key create
```

Dieser Befehl setzt die Eigenschaften `CapacitorUpdater.privateKey` in Ihrer Konfigurationsdatei.
Und generiert 2 Schlüsseldateien, `capgo_key.pub` und `capgo_key` im Stammverzeichnis Ihres Projekts.

Dieses Schlüsselpaar wird verwendet, um das Update zu signieren und das Update auf der App-Seite zu überprüfen.

### Workflow für selbstgehostete Live-Updates

Um mit der Implementierung von Selbstgehosteten Live-Updates zu beginnen, muss ein Unternehmen zunächst einen Web-Build seiner Fehlerbehebungen, Inhaltsaktualisierungen oder anderer webbasierter Codeänderungen durchführen, die es vornehmen möchte. Anschließend muss es das Build-Artefakt mit dem während des einmaligen Einrichtungsprozesses erhaltenen privaten Schlüssel signieren und schließlich das Bundle an den gewünschten Speicherort hochladen.

Bauen Sie zunächst Ihren Code:
```shell
npm run build
```

Zippen Sie dann Ihr Build:
```shell
npx @capgo/cli@latest bundle zip
```

Verschlüsseln Sie dann Ihr Zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Dieser Befehl wird Ihnen einen ivSessionKey ausgeben, den Sie für den nächsten Schritt speichern müssen.

Laden Sie nun Ihr verschlüsseltes Zip in den Unternehmensspeicher hoch und holen Sie die URL der Zip-Datei.

Capgo muss dann über ein neues Live Update informiert werden, das zur Nutzung bereit ist. Dies geschieht über einen weiteren CLI-Befehl:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Sobald der Befehl ausgeführt wird, ist Capgo über ein neues Update informiert, das an die Nutzer der App verteilt werden kann. Wenn die App nun gestartet wird, überprüft das Live Updates-Plugin bei Capgo, ob Änderungen heruntergeladen werden müssen.

Capgo antwortet dem Plugin mit „Ja, ein Update ist verfügbar“ und das Live Updates-Plugin lädt das neue Live Update über die von dem `register` CLI-Befehl bereitgestellte URL herunter:

```shell
https://abc.com/app/updates/abc123.zip
```

Die API der Organisation gibt das Live Update-Bundle von dem Standort zurück, und die App entschlüsselt das Zip und wendet das Live Update an. Voilà!

## Erste Schritte

Ich bin begeistert, die Reichweite von Live-Updates auf noch mehr Unternehmen als zuvor auszudehnen. Sowohl Organisationen als auch Ionic-App-Nutzer werden schnell die Vorteile von Capgos sicherer Verteilung von Over-the-Air-App-Updates erkennen.

Für weitere Informationen zu Selbstgehosteten Live-Updates von Capgo können Sie [die Dokumentation einsehen](/docs/cli/commands/#upload-version). Bereit, sofortige App-Updates direkt an Ihre Benutzer zu verteilen? [Registrieren Sie sich noch heute hier!](/register/)
