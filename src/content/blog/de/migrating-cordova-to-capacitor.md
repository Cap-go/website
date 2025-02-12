---
slug: de__migrating-cordova-to-capacitor
title: >-
  Migrieren einer Web-App von Cordova zu Capacitor: Ein
  Schritt-für-Schritt-Leitfaden
description: >-
  Dieser schrittweise Leitfaden hilft Ihnen bei der Migration Ihrer Web-App von
  Cordova zu Capacitor, deckt alle Abschnitte ab und ist leicht zu lesen und zu
  befolgen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Cordova zu Capacitor Migrationsillustrierung
tag: Migration
published: true
locale: de
next_blog: ''
---

# Migration einer Web-App von Cordova zu Capacitor: Eine Schritt-für-Schritt-Anleitung

Diese Anleitung hilft Ihnen bei der Migration Ihrer Web-App von Cordova zu Capacitor und macht sie leicht lesbar und verständlich. Wir behandeln alle Abschnitte und bieten einen schrittweisen Ansatz.

## Einführung in Cordova und Capacitor

Cordova und Capacitor sind beides Tools, die es Webentwicklern ermöglichen, native Anwendungen für verschiedene Plattformen mit HTML, CSS und JavaScript zu erstellen. Während sie Ähnlichkeiten aufweisen, gibt es wichtige Unterschiede in ihrem Ansatz zur Verwaltung nativer Projekte, Plugin-Verwaltung und CLI/Versionsverwaltung.

## Migrationsstrategie

Die Migration von Cordova zu Capacitor kann schrittweise oder als vollständiger Ersatz erfolgen, abhängig von der Komplexität Ihrer App. Capacitor ist abwärtskompatibel mit Cordova, sodass Sie Ihre bestehenden Web-Apps jederzeit darauf umstellen können.

Um die Migration zu unterstützen, sollten Sie die Verwendung der [Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) in Betracht ziehen und Ihre vorhandenen Cordova-Plugins überprüfen. Sie können Cordova-Plugins bei Bedarf weiterhin verwenden oder durch Capacitor-Äquivalente ersetzen.

## Schritt-für-Schritt-Migrationsanleitung

Folgen Sie diesen Schritten, um Ihre Web-App von Cordova zu Capacitor zu migrieren:

1. **Arbeiten Sie in einem separaten Code-Zweig**: Es wird empfohlen, in einem separaten Code-Zweig zu arbeiten, wenn Sie diese Änderungen vornehmen.

2. **Initialisieren Sie Ihre App mit Capacitor**: Öffnen Sie Ihr Projekt im Terminal und folgen Sie den Anleitungen zum [Hinzufügen von Capacitor zu einer Web-App](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) oder [Hinzufügen von Capacitor zu einer Ionic-App](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Verwenden Sie die Informationen aus Ihrer Cordova `config.xml` Datei für den App-Namen und die Bundle-ID.

3. **Bauen Sie Ihre Web-App**: Bauen Sie Ihr Web-Projekt mindestens einmal, bevor Sie native Plattformen hinzufügen. Dies stellt sicher, dass der `www`-Ordner in der Capacitor-Konfigurationsdatei korrekt konfiguriert ist.

4. **Plattformen hinzufügen**: Führen Sie `npx cap add ios` und `npx cap add android` aus, um die iOS- und Android-Plattformen hinzuzufügen. Dies erstellt separate native Projektordner im Stammverzeichnis Ihres Projekts.

5. **Icons und Splash-Screens generieren**: Wenn Sie vorhandene Icon- und Splash-Screen-Bilder haben, verwenden Sie das `cordova-res`-Tool, um sie zu generieren und in die nativen Projekte zu kopieren.

6. **Überprüfen und migrieren Sie vorhandene Cordova-Plugins**: Überprüfen Sie Ihre vorhandenen Cordova-Plugins und ersetzen Sie sie wenn möglich durch Capacitor-Äquivalente. Entfernen Sie alle unnötigen Plugins.

7. **Cordova-Plugin entfernen**: Nach dem Ersetzen oder Entfernen eines Cordova-Plugins deinstallieren Sie das Plugin und führen Sie `npx cap sync` aus, um den Plugin-Code aus dem nativen Projekt zu entfernen.

8. **Zusätzliche Berechtigungen anwenden**: Ordnen Sie zwischen `plugin.xml` und erforderlichen Einstellungen auf iOS und Android zu, um alle notwendigen Berechtigungen anzuwenden.

9. **Präferenzen konfigurieren**: Fügen Sie Präferenzen aus `config.xml` manuell zur Capacitor-Konfigurationsdatei hinzu.

10. **Plattformspezifische Konfigurationen behandeln**: Konfigurieren Sie bei Bedarf Elemente aus `config.xml` für jede Plattform (iOS und Android).

11. **Schema für die Bereitstellung von Inhalten ändern**: Ändern Sie bei Bedarf das Schema für die Bereitstellung von Inhalten in Ihrer App, um Datenverlust zu vermeiden.

12. **Testen und Cordova entfernen**: Testen Sie Ihre migrierte App, um sicherzustellen, dass alle Änderungen korrekt angewendet wurden. Sobald Sie zufrieden sind, können Sie Cordova aus Ihrem Projekt entfernen oder es belassen, wenn Sie planen, weiterhin Cordova-Plugins zu verwenden.

Herzlichen Glückwunsch! Sie haben Ihre Web-App erfolgreich von Cordova zu Capacitor migriert. Um mehr über die Verwendung von Cordova-Plugins in einem Capacitor-Projekt oder den Capacitor-Entwicklungsworkflow zu erfahren, besuchen Sie die [offizielle Capacitor-Dokumentation](https://capacitorjs.com/docs/).

## Live-Updates mit unserem Capgo-Service

Wir sind stolz darauf, Capgo anzubieten, unsere Lösung, die Live-Updates für Ihre Capacitor-Apps ermöglicht und es Ihnen erlaubt, Over-The-Air (OTA) Updates zu einem fairen Preis bereitzustellen.Diese Funktion ist besonders nützlich für schnelle Fehlerbehebungen, die Bereitstellung neuer Funktionen und um sicherzustellen, dass Ihre Nutzer immer die neueste Version Ihrer App haben, ohne auf die Genehmigung des App Stores warten zu müssen.

### Wie unser Capgo-Dienst funktioniert

Capgo ist ein cloudbasierter Dienst, der es Ihnen ermöglicht, Live-Updates für Ihre Capacitor-Apps bereitzustellen. Er besteht aus einem Web-Dashboard und einem nativen SDK, das Sie in Ihre App integrieren können. Das SDK prüft beim Start oder in bestimmten Intervallen auf Updates und lädt diese im Hintergrund herunter. Wenn ein Update verfügbar ist, wird der Benutzer vom SDK aufgefordert, es zu installieren. Wenn der Benutzer zustimmt, wird das Update sofort installiert und angewendet.

### Vorteile von Capgo Live-Updates

- **Schnellere Updates:** Stellen Sie Updates sofort bereit, ohne auf die Genehmigung des App Stores zu warten
- **Reduzierte Abhängigkeit vom Apple Store:** Umgehen Sie Einschränkungen und Limitierungen des App Stores
- **Verbesserte Benutzererfahrung:** Halten Sie Benutzer mit den neuesten Funktionen und Fehlerbehebungen engagiert, ohne dass sie die App manuell aktualisieren müssen

### Wie man Capgo Live-Updates implementiert

Um Capgo Live-Updates in Ihrem Capacitor-Projekt zu implementieren, folgen Sie diesen Schritten:
- Melden Sie sich für ein [Capgo-Konto](https://webcapgoapp/) an
- Installieren Sie das Capgo SDK in Ihrem Projekt
- Konfigurieren Sie Ihre App, um beim Start oder in bestimmten Intervallen nach Updates zu suchen
- Stellen Sie Updates für Ihre App über das Capgo-Dashboard bereit

## Fazit

Wir hoffen, dieser Leitfaden hat Ihnen bei der Migration Ihrer Web-App von Cordova zu Capacitor geholfen. Wenn Sie Fragen haben oder Hilfe beim Migrationsprozess benötigen, können Sie uns gerne auf unserem [Discord](https://discordgg/VnYRvBfgA6)-Server kontaktieren.