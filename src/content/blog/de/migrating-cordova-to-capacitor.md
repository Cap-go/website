---
slug: migrating-cordova-zu-capacitor
title: >-
  Migration einer Web-App von Cordova zu Capacitor: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Diese schrittweise Anleitung hilft dir bei der Migration deiner Web-App von
  Cordova zu Capacitor und deckt alle Bereiche ab, sodass sie einfach zu lesen
  und zu befolgen ist.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Cordova zu Capacitor Migrations-Illustration
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: de
next_blog: ''
original_slug: migrating-cordova-to-capacitor
---
# Migration einer Web-App von Cordova zu Capacitor: Eine Schritt-für-Schritt-Anleitung

Diese Anleitung hilft Ihnen bei der Migration Ihrer Web-App von Cordova zu Capacitor und macht sie leicht lesbar und nachvollziehbar. Wir behandeln alle Abschnitte und bieten einen schrittweisen Ansatz.

## Einführung in Cordova und Capacitor

Cordova und Capacitor sind beide Werkzeuge, die es Webentwicklern ermöglichen, native Anwendungen für verschiedene Plattformen mit HTML, CSS und JavaScript zu erstellen. Während sie Ähnlichkeiten aufweisen, gibt es wichtige Unterschiede in ihrem Ansatz zum nativen Projektmanagement, Plugin-Management und CLI/Versions-Management.

## Migrationsstrategie

Die Migration von Cordova zu Capacitor kann schrittweise oder als kompletter Ersatz erfolgen, abhängig von der Komplexität Ihrer App. Capacitor ist abwärtskompatibel mit Cordova, sodass Sie Ihre bestehenden Web-Apps jederzeit darauf umstellen können.

Zur Unterstützung der Migration können Sie die [Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) verwenden und Ihre bestehenden Cordova-Plugins überprüfen. Sie können Cordova-Plugins bei Bedarf weiterhin nutzen oder durch Capacitor-Äquivalente ersetzen.

## Schritt-für-Schritt Migrationsanleitung

Befolgen Sie diese Schritte, um Ihre Web-App von Cordova zu Capacitor zu migrieren:

1. **In einem separaten Code-Branch arbeiten**: Es wird empfohlen, diese Änderungen in einem separaten Code-Branch vorzunehmen.

2. **Initialisieren Sie Ihre App mit Capacitor**: Öffnen Sie Ihr Projekt im Terminal und folgen Sie den Anleitungen zum [Hinzufügen von Capacitor zu einer Web-App](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) oder [Hinzufügen von Capacitor zu einer Ionic-App](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Verwenden Sie die Informationen aus Ihrer Cordova `config.xml` Datei für den App-Namen und die Bundle-ID.

3. **Bauen Sie Ihre Web-App**: Bauen Sie Ihr Web-Projekt mindestens einmal, bevor Sie native Plattformen hinzufügen. Dies stellt sicher, dass der `www`-Ordner in der Capacitor-Konfigurationsdatei richtig konfiguriert ist.

4. **Plattformen hinzufügen**: Führen Sie `npx cap add ios` und `npx cap add android` aus, um die iOS- und Android-Plattformen hinzuzufügen. Diese erstellen separate native Projektordner im Wurzelverzeichnis Ihres Projekts.

5. **Icons und Splash Screens generieren**: Wenn Sie bestehende Icon- und Splash-Screen-Bilder haben, verwenden Sie das `cordova-res` Tool, um sie zu generieren und in die nativen Projekte zu kopieren.

6. **Bestehende Cordova-Plugins prüfen und migrieren**: Überprüfen Sie Ihre bestehenden Cordova-Plugins und ersetzen Sie sie wenn möglich durch Capacitor-Äquivalente. Entfernen Sie unnötige Plugins.

7. **Cordova-Plugin entfernen**: Nach dem Ersetzen oder Entfernen eines Cordova-Plugins, deinstallieren Sie das Plugin und führen Sie `npx cap sync` aus, um den Plugin-Code aus dem nativen Projekt zu entfernen.

8. **Zusätzliche Berechtigungen anwenden**: Mappen Sie zwischen `plugin.xml` und erforderlichen Einstellungen auf iOS und Android, um notwendige Berechtigungen anzuwenden.

9. **Einstellungen konfigurieren**: Fügen Sie Einstellungen aus `config.xml` manuell zur Capacitor-Konfigurationsdatei hinzu.

10. **Plattformspezifische Konfigurationen behandeln**: Konfigurieren Sie Elemente aus `config.xml` für jede Plattform (iOS und Android) nach Bedarf.

11. **Schema für die Inhaltsbereitstellung ändern**: Ändern Sie bei Bedarf das Schema für die Bereitstellung von Inhalten in Ihrer App, um Datenverlust zu vermeiden.

12. **Testen und Cordova entfernen**: Testen Sie Ihre migrierte App, um sicherzustellen, dass alle Änderungen korrekt angewendet wurden. Sobald Sie zufrieden sind, können Sie Cordova aus Ihrem Projekt entfernen oder es beibehalten, wenn Sie weiterhin Cordova-Plugins verwenden möchten.

Herzlichen Glückwunsch! Sie haben Ihre Web-App erfolgreich von Cordova zu Capacitor migriert. Um mehr über die Verwendung von Cordova-Plugins in einem Capacitor-Projekt oder den Capacitor-Entwicklungsworkflow zu erfahren, besuchen Sie die [offizielle Capacitor-Dokumentation](https://capacitorjs.com/docs/).

## Live-Updates mit unserem Capgo-Service

Wir freuen uns, Capgo anzubieten, unsere Lösung, die Live-Updates für Ihre Capacitor-Apps ermöglicht und Over-The-Air (OTA) Updates zu einem fairen Preis bereitstellt. Diese Funktion ist besonders nützlich für schnelle Fehlerbehebungen, die Bereitstellung neuer Funktionen und die Sicherstellung, dass Ihre Benutzer immer die neueste Version Ihrer App haben, ohne auf die App-Store-Genehmigung warten zu müssen.

### Wie unser Capgo-Service funktioniert

Capgo ist ein Cloud-basierter Service, der es Ihnen ermöglicht, Live-Updates für Ihre Capacitor-Apps bereitzustellen. Er besteht aus einem Web-Dashboard und einem nativen SDK, das Sie in Ihre App integrieren können. Das SDK prüft beim Start oder in bestimmten Intervallen auf Updates und lädt diese im Hintergrund herunter. Wenn ein Update verfügbar ist, wird der Benutzer aufgefordert, es zu installieren. Wenn der Benutzer zustimmt, wird das Update sofort installiert und angewendet.

### Vorteile von Capgo Live-Updates

- **Schnellere Updates:** Stellen Sie Updates sofort bereit, ohne auf die App-Store-Genehmigung zu warten.
- **Reduzierte Apple Store-Abhängigkeit:** Umgehen Sie App-Store-Beschränkungen und -Limitierungen.
- **Verbesserte Benutzererfahrung:** Halten Sie Benutzer mit den neuesten Funktionen und Fehlerbehebungen bei der Stange, ohne dass sie die App manuell aktualisieren müssen.

### Wie man Capgo Live-Updates implementiert

Um Capgo Live-Updates in Ihrem Capacitor-Projekt zu implementieren, folgen Sie diesen Schritten:
- Registrieren Sie sich für ein [Capgo-Konto](https://web.capgo.app/).
- Installieren Sie das Capgo SDK in Ihrem Projekt.
- Konfigurieren Sie Ihre App, um beim Start oder in bestimmten Intervallen nach Updates zu suchen.
- Stellen Sie Updates für Ihre App über das Capgo-Dashboard bereit.

## Fazit

Wir hoffen, dass diese Anleitung Ihnen bei der Migration Ihrer Web-App von Cordova zu Capacitor geholfen hat. Wenn Sie Fragen haben oder Hilfe beim Migrationsprozess benötigen, kontaktieren Sie uns gerne auf unserem [Discord](https://discord.gg/VnYRvBfgA6) Server.
