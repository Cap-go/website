---
slug: self-hosted-live-updates
title: Selbstgehostete Live-Updates
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
tag: Solution
published: true
locale: de
next_blog: ''
---

Ich freue mich, die Veröffentlichung von Self-hosted Live Updates bekannt zu geben, die die neueste Entwicklung von Capgos Live Updates darstellt.

Während viele Unternehmen derzeit das Live Updates SDK nutzen, um auf die neuesten JavaScript-, HTML- und CSS-Updates für ihre Anwendungen zuzugreifen, können einige aufgrund von Unternehmensrichtlinien, Branchenvorschriften oder geografischen Einschränkungen auf Hindernisse stoßen. Mit Self-hosted Live Updates können Sie nun Web-Build-Artefakte über Ihre eigene Infrastruktur verteilen.

Das bedeutet, Sie können Verzögerungen durch Apple Store-Überprüfungen vermeiden, Fehler schneller beheben und Inhalte ändern sowie sicherstellen, dass Ihre Benutzer immer mit der neuesten Version Ihrer App arbeiten. Außerdem habe ich von zahlreichen großen Unternehmen gehört, die gerne Live Updates nutzen würden, aber aufgrund strenger Compliance-Standards vor Herausforderungen stehen. Dieses Problem gehört dank Self-hosted Live Updates nun der Vergangenheit an.

## Wie funktionieren Self-hosted Live Updates?

Die Bereitstellung von Capgo-gehosteten Live Updates ist mit dem [Capgo SDK](https://github.com/Cap-go/capacitor-updater/) ein Kinderspiel. Für Self-hosted Live Updates habe ich die Capgo CLI um die notwendigen Funktionen erweitert, um die Konfiguration in Ihrer Infrastruktur zu ermöglichen.

Um eine sichere und koordinierte Bereitstellung der neuesten Web-Build-Artefakte an Endbenutzer zu gewährleisten, ermöglicht Capgo dem Capacitor Live Updates Plugin nun die Verwendung eines öffentlichen/privaten Schlüsselpaars. Bei der Verwendung von Self-hosted Live Updates wird ein zusätzlicher Handshake durchgeführt, um sicherzustellen, dass die über das Plugin von der Unternehmensinfrastruktur heruntergeladenen Artefakte unverändert sind.

![Capgo Verschlüsselungsschema](/encryption_flow.webp)

Im Folgenden werden die Schritte zur Erstellung des Schlüsselpaars und der anschließende Prozess zur Bereitstellung der aktualisierten Erfahrung für Endbenutzer beschrieben.

### Einmalige Schlüsselpaar-Einrichtung

Um ein öffentliches/privates Schlüsselpaar zu generieren, können Unternehmen den folgenden Capgo Cloud CLI-Befehl verwenden:

```shell
npx @capgo/cli@latest key create
```

Dieser Befehl setzt die `CapacitorUpdater.privateKey`-Eigenschaften in Ihrer Konfigurationsdatei.
Und generiert 2 Schlüsseldateien, `capgo_key.pub` und `capgo_key` im Wurzelverzeichnis Ihres Projekts.

Dieses Schlüsselpaar wird verwendet, um das Update zu signieren und auf der App-Seite zu verifizieren.

### Self-hosted Live Updates Workflow

Um Self-hosted Live Updates zu implementieren, muss ein Unternehmen zunächst einen Web-Build ihrer Fehlerbehebungen, Inhaltsaktualisierungen oder anderer webbasierter Codeänderungen durchführen. Anschließend müssen sie das Build-Artefakt mit dem während des einmaligen Einrichtungsprozesses erhaltenen privaten Schlüssel signieren und schließlich das Paket an ihren bevorzugten Speicherort hochladen.

Zuerst bauen Sie Ihren Code:
```shell
npm run build
```

Dann zippen Sie Ihren Build:
```shell
npx @capgo/cli/latest bundle zip
```

Dann verschlüsseln Sie Ihre ZIP-Datei:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Dieser Befehl gibt Ihnen einen ivSessionKey aus, den Sie für den nächsten Schritt speichern müssen.

Laden Sie nun Ihre verschlüsselte ZIP-Datei in Ihren Unternehmensspeicher hoch und erhalten Sie die URL der ZIP-Datei.

Capgo muss dann über ein neues Live Update informiert werden, das zur Verwendung bereit ist. Dies geschieht über einen weiteren CLI-Befehl:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Sobald der Befehl ausgeführt wurde, weiß Capgo von einem neuen Update, das zur Verteilung an die App-Benutzer bereit ist. Wenn die App gestartet wird, prüft das Live Updates Plugin bei Capgo, ob Änderungen heruntergeladen werden müssen.

Capgo antwortet dem Plugin mit "Ja, ein Update ist verfügbar" und das Live Updates Plugin lädt das neue Live Update unter Verwendung der im `register` CLI-Befehl angegebenen URL-Adresse herunter:

```shell
https://abc.com/app/updates/abc123.zip
```

Die API der Organisation gibt das Live Update-Paket von dem angegebenen Speicherort zurück, und die App entschlüsselt die ZIP-Datei und wendet das Live Update an. Voilà!

## Legen Sie los

Ich freue mich, die Reichweite von Live Updates auf noch mehr Unternehmen als zuvor auszudehnen. Sowohl Organisationen als auch Ionic App-Benutzer werden schnell die Vorteile von Capgos sicherer Verteilung von Over-the-Air App-Updates erkennen.

Weitere Informationen zu Self-hosted Live Updates von Capgo finden Sie in der [Dokumentation](/docs/tooling/cli/#upload-version).Bereit, sofortige App-Updates direkt an Ihre Nutzer auszuliefern? [Registrieren Sie sich noch heute hier!](/register/)