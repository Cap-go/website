---
slug: self-hosted-live-updates
title: Self-hosted Live Updates
description: >-
  Ich freue mich, Self-hosted Live Updates anzukündigen, die nächste Iteration
  von Capgos Live Updates!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Selbst gehostete Updates
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: de
next_blog: ''
---
Ich freue mich, die Veröffentlichung von Self-hosted Live Updates anzukündigen, die die neueste Evolution von Capgos Live Updates darstellt.

Während viele Unternehmen derzeit das Live Updates SDK nutzen, um auf die neuesten JavaScript-, HTML- und CSS-Updates für ihre Anwendungen zuzugreifen, können einige aufgrund von Unternehmensrichtlinien, Branchenvorschriften oder geografischen Einschränkungen auf Hindernisse stoßen. Mit Self-hosted Live Updates können Sie nun Web-Build-Artefakte über Ihre eigene Infrastruktur verteilen.

Dies bedeutet, dass Sie Verzögerungen durch Apple Store-Überprüfungen vermeiden, Bugs schneller beheben und Inhalte modifizieren können und sicherstellen, dass Ihre Nutzer immer mit der neuesten Version Ihrer App arbeiten. Zusätzlich habe ich von zahlreichen großen Unternehmen gehört, die gerne Live Updates nutzen würden, aber aufgrund strenger Compliance-Standards vor Herausforderungen stehen. Dieses Problem gehört dank Self-hosted Live Updates nun der Vergangenheit an.

## Wie funktionieren Self-hosted Live Updates?

Die Bereitstellung von Capgo-hosted Live Updates ist mit dem [Capgo SDK](https://github.com/Cap-go/capacitor-updater/) ein Kinderspiel. Für Self-hosted Live Updates habe ich die Capgo CLI um die notwendigen Funktionen erweitert, um die Konfiguration auf Ihrer Infrastruktur zu ermöglichen.

Um eine sichere und koordinierte Bereitstellung der neuesten Web-Build-Artefakte an Endbenutzer zu gewährleisten, ermöglicht Capgo dem Capacitor Live Updates Plugin nun die Verwendung einer Public/Private-Key-Paarung. Bei der Verwendung von Self-hosted Live Updates wird ein zusätzlicher Handshake durchgeführt, um sicherzustellen, dass die über das Plugin von der Unternehmensinfrastruktur heruntergeladenen Artefakte unverändert sind.

![Capgo encryption schema](/encryption_flow.webp)

Im Folgenden werden die Schritte zur Einrichtung der Schlüsselpaarung und der anschließende Prozess zur Bereitstellung der aktualisierten Erfahrung für Endbenutzer beschrieben.

### Einmalige Schlüsselpaar-Einrichtung

Um ein Public/Private-Schlüsselpaar zu generieren, können Unternehmen den folgenden Capgo Cloud CLI-Befehl verwenden:

```shell
npx @capgo/cli@latest key create
```

Dieser Befehl setzt die `CapacitorUpdater.privateKey` Eigenschaften in Ihrer Konfigurationsdatei.
Und generiert 2 Schlüsseldateien, `capgo_key.pub` und `capgo_key` in Ihrem Projekt-Stammverzeichnis.

Dieses Schlüsselpaar wird verwendet, um das Update zu signieren und auf der App-Seite zu verifizieren.

### Self-hosted Live Updates Workflow

Um Self-hosted Live Updates zu implementieren, muss ein Unternehmen zunächst einen Web-Build ihrer Fehlerbehebungen, Inhaltsaktualisierungen oder anderer webbasierter Code-Änderungen durchführen. Anschließend müssen sie das Build-Artefakt mit dem während des einmaligen Setup-Prozesses erhaltenen privaten Schlüssel signieren und schließlich das Bundle an ihren bevorzugten Speicherort hochladen.

Zuerst bauen Sie Ihren Code:
```shell
npm run build
```

Dann zippen Sie Ihren Build:
```shell
npx @capgo/cli@latest bundle zip
```

Dann verschlüsseln Sie Ihre Zip-Datei:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Dieser Befehl wird Ihnen einen ivSessionKey ausgeben, den Sie für den nächsten Schritt speichern müssen.

Laden Sie nun Ihre verschlüsselte Zip-Datei in Ihren Unternehmensspeicher hoch und erhalten Sie die URL der Zip-Datei.

Capgo muss dann über ein neues Live Update informiert werden, das zur Nutzung bereit ist. Dies geschieht über einen weiteren CLI-Befehl:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Sobald der Befehl ausgeführt wurde, ist Capgo sich eines neuen Updates bewusst, das zur Verteilung an die App-Nutzer bereit ist. Wenn die App nun gestartet wird, prüft das Live Updates Plugin bei Capgo, ob Änderungen heruntergeladen werden müssen.

Capgo antwortet dem Plugin mit "Ja, ein Update ist verfügbar" und das Live Updates Plugin lädt das neue Live Update über den URL-Standort herunter, der vom \`register\` CLI-Befehl bereitgestellt wurde:

```shell
https://abc.com/app/updates/abc123.zip
```

Die API der Organisation gibt das Live Update Bundle vom Standort zurück, und die App entschlüsselt die Zip-Datei und wendet das Live Update an. Voilà!

## Erste Schritte

Ich freue mich, die Reichweite von Live Updates auf noch mehr Unternehmen als zuvor auszudehnen. Sowohl Organisationen als auch Ionic App-Nutzer werden schnell die Vorteile von Capgos sicherer Verteilung von Over-the-Air App-Updates erkennen.

Weitere Informationen zu Self-hosted Live Updates von Capgo finden Sie in der [Dokumentation](/docs/cli/commands/#upload-version). Bereit, sofortige App-Updates direkt an Ihre Nutzer zu verteilen? [Registrieren Sie sich noch heute!](/register/)
