---
slug: how-live-updates-for-capacitor-work
title: Comment fonctionne la mise à jour en direct dans Capgo
description: >-
  Tauchen Sie tief in die technische Implementierung von Live-Updates in Capgo
  ein und verstehen Sie, wie es unter der Haube sowohl für iOS als auch für
  Android funktioniert.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Direkte Update-Architektur
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---

# Live Updates in Capgo verstehen

Live Updates sind eine der leistungsstärksten Funktionen in Capacitor-Apps und ermöglichen Echtzeit-Updates ohne App-Store-Einreichungen. Lassen Sie uns tiefer in die Implementierung dieser Funktionalität durch Capgo eintauchen.

## Kernkonzepte

Eine Capacitor-App besteht aus zwei Hauptebenen:

1. **Web-Ebene**: Enthält HTML-, CSS- und JavaScript-Dateien, die im WebView geladen werden
2. **Native Ebene**: Enthält plattformspezifischen Code (Java/Kotlin für Android, Swift für iOS)

Capgos Live-Update-System funktioniert durch das Ersetzen der Web-Ebene zur Laufzeit, da diese Dateien nicht in die App-Binärdatei kompiliert werden.

## Technische Implementierung

### Server-Pfade in Capacitor

Capgo verwaltet zwei kritische Pfade:

- **Aktueller Server-Pfad**: Verweist auf Dateien, die derzeit im WebView geladen sind
- **Nächster Server-Pfad**: Verweist auf Dateien, die beim nächsten App-Neustart geladen werden

### Android-Implementierung

Auf Android verwaltet Capgo Pfade durch:

[[CODE_BLOCK]]

### iOS-Implementierung

Auf iOS werden Pfade verwaltet durch:

[[CODE_BLOCK]]

## Sicherheitsmaßnahmen

Capgo implementiert militärische Sicherheitsstandards durch Ende-zu-Ende-Verschlüsselung und gewährleistet damit die vollständige Sicherheit Ihrer App-Updates von der Entwicklung bis zur Bereitstellung. Unser Verschlüsselungssystem geht über traditionelle Code-Signierung hinaus und bietet echte Zero-Knowledge-Sicherheit.

### Ende-zu-Ende-Verschlüsselungsarchitektur

1. **Ende-zu-Ende-Verschlüsselung (E2EE)**: Jedes Update-Paket wird mit AES-256-GCM-Verschlüsselung verschlüsselt, bevor es Ihre Entwicklungsumgebung verlässt. Diese militärische Verschlüsselung gewährleistet, dass Ihre App-Updates während des gesamten Bereitstellungsprozesses vollständig privat und sicher bleiben.

2. **Zero-Knowledge-Architektur**: Im Gegensatz zu anderen OTA-Update-Lösungen, die Updates nur signieren, verwendet Capgo echte Zero-Knowledge-Verschlüsselung. Das bedeutet:
   - Update-Inhalte werden vor dem Upload verschlüsselt
   - Capgo-Server speichern nur verschlüsselte Daten
   - Entschlüsselung findet nur auf Endgeräten statt
   - Kein Zwischenhändler kann auf Ihre Update-Inhalte zugreifen

3. **Sicheres Schlüsselmanagement**: 
   - Verschlüsselungsschlüssel werden in Ihrer CI/CD-Umgebung sicher generiert und gespeichert
   - Private Schlüssel berühren nie Capgo's Server
   - Jede App-Version kann einzigartige Verschlüsselungsschlüssel verwenden
   - Unterstützung für Schlüsselrotation für erhöhte Sicherheit

Erfahren Sie mehr über unser Verschlüsselungssystem in unserem detaillierten Leitfaden: [End-to-End Encryption in Capgo Live Updates](https://capgoapp/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Update-Sicherheitsprozess

1. **Vor-Upload-Verschlüsselung**:
   - Updates werden in Ihrer CI/CD-Pipeline verschlüsselt
   - Jede Datei wird einzeln verschlüsselt
   - Metadaten werden ebenfalls für vollständige Privatsphäre verschlüsselt

2. **Sichere Speicherung**:
   - Verschlüsselte Pakete werden auf Capgos globalem CDN gespeichert
   - Keine Klartextdaten berühren jemals unsere Server
   - Selbst bei einem Servereinbruch bleiben die Daten sicher

3. **Sichere Auslieferung**:
   - Updates werden über verschlüsselte Kanäle ausgeliefert
   - Jede App-Instanz validiert die Verschlüsselungsintegrität
   - Automatische Wiederholungsmechanismen bei fehlgeschlagener Entschlüsselung

4. **Client-seitige Sicherheit**:
   - Updates werden vor der Installation verifiziert
   - Fehlgeschlagene Entschlüsselung löst automatisches Rollback aus
   - Sichere Schlüsselspeicherung im geschützten Speicher der App

Dieser umfassende Sicherheitsansatz schützt Ihre App-Updates vor:
- Man-in-the-Middle-Angriffen
- Server-seitigen Einbrüchen
- Unbefugten Änderungen
- Replay-Angriffen
- Inhaltlichen Manipulationen

## Update-Lebenszyklus

Capgos Update-Prozess ist standardmäßig automatisch. Hier ist, wie der automatische Prozess funktioniert:

### 1. Automatische Update-Prüfung

Das Plugin prüft automatisch auf Updates in diesen Situationen:
- Beim App-Start

Dieses Verhalten wird durch die `autoUpdate`-Einstellung gesteuert:

[[CODE_BLOCK]]
Sie können auch manuell mit `getLatest()` prüfen.

### 2. Automatischer Download

Wenn eine neue Version erkannt wird und `autoUpdate` aktiviert ist:
1. Download startet automatisch
2. Fortschritt wird intern verfolgt
3. Fehlgeschlagene Downloads werden bei jedem App-Start automatisch wiederholt
4.