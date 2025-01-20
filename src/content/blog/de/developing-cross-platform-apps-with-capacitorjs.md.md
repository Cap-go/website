---
slug: de__developing-cross-platform-apps-with-capacitorjs
title: >-
  Entwicklung plattformübergreifender Apps mit CapacitorJS: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Erfahren Sie, wie Sie plattformübergreifende Anwendungen mit CapacitorJS und
  einer einzigen JavaScript-Codebasis für Android, iOS und Web (PWA) erstellen
  können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Plattformübergreifende App-Entwicklung
tag: Tuto
published: true
locale: de
next_blog: ''
---

In der sich weiterentwickelnden Welt der mobilen Anwendungsentwicklung hat der Aufstieg von Progressive Web Applications (PWAs) den Weg für neue plattformübergreifende Laufzeitumgebungen geebnet. Diese Laufzeitumgebungen ermöglichen es webbasierten Anwendungen, in App Stores präsent zu sein, ohne sich ausschließlich auf nativen Code zu verlassen. Eine solche Technologie, die dies erleichtert, ist Capacitor, das es Entwicklern ermöglicht, eine einfache Website als Anwendung für Android, iOS und das Web mit einer einzigen JavaScript-Codebasis bereitzustellen. Dieser Ansatz reduziert die Entwicklungskosten erheblich und erhöht die Codierungseffizienz.

Dieser Leitfaden konzentriert sich auf die Erstellung einer Anwendung mit reinem JavaScript ohne zusätzliche Frameworks. Trotz der Herausforderungen, Ressourcen für die reine JavaScript-App-Entwicklung im Jahr 2021 zu finden, bieten wir Ihnen hier ein umfassendes Tutorial zum Erstellen Ihrer Anwendung und zur Nutzung nativer Plugins mit Capacitor.

## ‣ Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie die folgenden Tools installiert haben:

- Nodejs (v14.16.1) oder höher
- NPM (v7.6.2) oder höher
- Android Studio für die Android-App-Entwicklung
- Xcode für die iOS-App-Entwicklung (nur macOS)

> Hinweis: Die iOS-App-Entwicklung ist nur auf einem macOS-Gerät möglich

## ‣ Einrichten Ihres Capacitor-Projekts

Um eine Capacitor-Anwendung zu erstellen, navigieren Sie zu Ihrem gewünschten Ordner und führen Sie den folgenden Befehl in Ihrem Terminal aus:

Mit Capacitor v3 sollte Ihr Projektverzeichnis so aussehen:

Nachdem die anfängliche Einrichtung abgeschlossen ist, können Sie fortfahren.

## ‣ Projekt-Umstrukturierung

Wir werden Vite verwenden, um unsere JavaScript-Dateien zu bündeln. Lassen Sie uns also unser Projekt entsprechend umstrukturieren:

- Erstellen Sie einen neuen Ordner `src` im Hauptverzeichnis
- Erstellen Sie eine neue Skriptdatei `index.js` in `src/`
- Erstellen Sie die Vite-Konfigurationsdatei `vite.config.js` im Hauptverzeichnis
- Entfernen Sie die Datei `capacitor-welcome.js` aus `www/js/`

Ihre neue Ordnerstruktur sollte wie folgt aussehen:

## ‣ Anpassung an reines JavaScript

Lassen Sie uns einige Dateien ändern, um mit reinem JavaScript zu arbeiten:

## www/index.html

1. Entfernen Sie die Skript-Importe für Ionic PWA Elements, wenn Sie die App nicht als PWA veröffentlichen:

2. Löschen Sie das `<ion-app>`-HTML-Element aus dem Body.

3. Aktualisieren Sie den Skript-Import von `capacitor.js` zu `js/main.js`. Dies wird unsere gebündelte JavaScript-Datei sein.

4. Entfernen Sie den `js/capacitor-welcome.js`-Import. Ihre `index.html` ist jetzt bereit.

## vite.config.js

Um unsere Node.js-Module mit Vite zu bündeln, benötigen wir eine Konfigurationsdatei, die das Ausgabeziel für unser gebündeltes Skript angibt. Die folgende Konfiguration wird die Datei `src/index.js` nehmen und sie für die Produktion als `www/js/main.js` bündeln:

## capacitor.config.json

Suchen Sie in der Datei `capacitor.config.json` die Eigenschaft `"bundledWebRuntime": true` und ändern Sie sie zu `false`. Diese Anpassung stellt sicher, dass Capacitor die Dateien nicht bündelt und wir stattdessen Vite dafür verwenden können.

Mit diesen Änderungen ist die grundlegende Einrichtung Ihrer Capacitor-Anwendung abgeschlossen, und Sie können mit der Entwicklung Ihrer App mit reinem JavaScript beginnen.

## ‣ Entwicklung Ihrer App

Jetzt, da die Grundlagen gelegt sind, können Sie beginnen, Ihre Anwendungslogik in der Datei `src/index.js` zu schreiben. Hier können Sie alle erforderlichen Node.js-Module importieren, die Funktionalität Ihrer App definieren und mit Capacitors nativen Plugins interagieren.

Denken Sie daran, den Build-Befehl von Vite auszuführen, um Ihre JavaScript-Dateien zu bündeln, wenn Sie Änderungen vornehmen:

Dieser Befehl generiert die Datei `main.js` in Ihrem `www/js`-Verzeichnis, auf die Ihre `index.html`-Datei verweisen wird.

## ‣ Testen und Debugging

Capacitor bietet eine bequeme Möglichkeit, Ihre Anwendung auf verschiedenen Plattformen zu testen.Verwenden Sie die folgenden Befehle, um Ihre App in der jeweiligen Entwicklungsumgebung der Plattform zu öffnen:

Für Android:
```
npm init @capacitor/app
```

Für iOS (nur macOS):
```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

Für Web/PWA:
```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

Diese Befehle ermöglichen es Ihnen, Ihre Anwendung in Android Studio, Xcode oder Ihrem Webbrowser auszuführen, wo Sie nach Bedarf testen und debuggen können.

## ‣ Fazit

Die Entwicklung plattformübergreifender Anwendungen mit Capacitor unter Verwendung von reinem JavaScript ist eine kostengünstige und effiziente Methode, um Apps für mehrere Plattformen mit einer einzigen Codebasis zu erstellen. Indem Sie dieser Anleitung gefolgt sind, haben Sie Ihr Projekt eingerichtet, es für Vite umstrukturiert und Ihre App für die Entwicklung vorbereitet. Mit dieser Grundlage sind Sie auf dem besten Weg, eine robuste und vielseitige Anwendung zu erstellen.

Denken Sie daran, gründlich auf allen Plattformen zu testen und die nativen Plugins von Capacitor zu nutzen, um die Funktionalität Ihrer App zu erweitern. Viel Spaß beim Programmieren!