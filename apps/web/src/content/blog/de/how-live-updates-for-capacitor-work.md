---
slug: how-live-updates-for-capacitor-work
title: Wie Live-Updates in Capgo funktionieren
description: >-
  Tauchen Sie tief in die technische Umsetzung von Live-Updates in Capgo ein und
  verstehen Sie, wie es im Hintergrund sowohl für iOS als auch für Android
  funktioniert.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Live-Updates-Architektur
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
# Verständnis von Live-Updates in Capgo

Live-Updates sind eine der leistungsstärksten Funktionen in Capacitor-Apps, die Echtzeit-Updates ohne Einreichung im App Store ermöglichen. Lassen Sie uns tief in die Funktionsweise von Capgo eintauchen.

## Grundkonzepte

Eine Capacitor-App besteht aus zwei Hauptschichten:

1. **Web-Schicht**: Beinhaltet HTML-, CSS- und JavaScript-Dateien, die im WebView geladen werden
2. **Native Schicht**: Beinhaltet plattform-spezifischen Code (Java/Kotlin für Android, Swift für iOS)

Das Live-Update-System von Capgo funktioniert, indem es die Web-Schicht zur Laufzeit ersetzt, da diese Dateien nicht in die App-Binärdatei kompiliert werden.

## Technische Umsetzung

### Server-Pfade in Capacitor

Capgo verwaltet zwei kritische Pfade:

- **Aktueller Server-Pfad**: Zeigt auf Dateien, die derzeit im WebView geladen sind
- **Nächster Server-Pfad**: Zeigt auf Dateien, die beim nächsten Neustart der App geladen werden

### Android-Umsetzung

Auf Android verwaltet Capgo die Pfade durch:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### iOS-Umsetzung

Auf iOS werden die Pfade durch:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Sicherheitsmaßnahmen

Capgo implementiert militärische Sicherheitsstandards durch End-to-End-Verschlüsselung, um sicherzustellen, dass Ihre App-Updates während der gesamten Entwicklung bis zur Bereitstellung vollständig sicher bleiben. Unser Verschlüsselungssystem geht über traditionelle Code-Signierungen hinaus, um eine echte Null-Wissen-Sicherheit zu bieten.

### Architektur der End-to-End-Verschlüsselung

1. **End-to-End-Verschlüsselung (E2EE)**: Jedes Update-Paket wird vor dem Verlassen Ihrer Entwicklungsumgebung mit AES-256-GCM-Verschlüsselung verschlüsselt. Diese militärische Verschlüsselung stellt sicher, dass Ihre App-Updates während des gesamten Bereitstellungsprozesses vollständig privat und sicher bleiben.

2. **Null-Wissen-Architektur**: Im Gegensatz zu anderen OTA-Update-Lösungen, die nur Updates signieren, verwendet Capgo eine echte Null-Wissen-Verschlüsselung. Das bedeutet:
   - Update-Inhalte werden vor dem Hochladen verschlüsselt
   - Capgo-Server speichern nur verschlüsselte Daten
   - Die Entschlüsselung erfolgt nur auf den Endgeräten der Benutzer
   - Kein Zwischenhändler kann auf Ihre Update-Inhalte zugreifen

3. **Sichere Schlüsselverwaltung**: 
   - Verschlüsselungsschlüssel werden generiert und sicher in Ihrer CI/CD-Umgebung gespeichert
   - Private Schlüssel berühren niemals die Server von Capgo
   - Jede App-Version kann einzigartige Verschlüsselungsschlüssel verwenden
   - Unterstützung für Schlüsselrotation zur Verbesserung der Sicherheit

Erfahren Sie mehr über unser Verschlüsselungssystem in unserem detaillierten Leitfaden: [End-to-End-Verschlüsselung in Capgo Live-Updates](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Prozess zur Updatesicherheit

1. **Vor-Hochlade-Verschlüsselung**:
   - Updates werden in Ihrer CI/CD-Pipeline verschlüsselt
   - Jede Datei wird einzeln verschlüsselt
   - Metadaten werden ebenfalls für vollständige Privatsphäre verschlüsselt

2. **Sichere Speicherung**:
   - Verschlüsselte Pakete werden auf Capgos globalem CDN gespeichert
   - Keine Klartextdaten berühren jemals unsere Server
   - Selbst im Falle eines Servervorfalls bleibt die Daten sicher

3. **Sichere Lieferung**:
   - Updates werden über verschlüsselte Kanäle geliefert
   - Jede App-Instanz überprüft die Integrität der Verschlüsselung
   - Automatische Wiederholungsmechanismen für fehlgeschlagene Entschlüsselungen

4. **Client-seitige Sicherheit**:
   - Updates werden vor der Installation verifiziert
   - Fehlgeschlagene Entschlüsselungen lösen eine automatische Rückkehr aus
   - Sichere Schlüssel Speicherung im geschützten Speicher der App

Dieser umfassende Sicherheitsansatz stellt sicher, dass Ihre App-Updates gegen Folgendes geschützt bleiben:
- Man-in-the-middle-Angriffe
- Server-seitige Angriffe
- Unbefugte Änderungen
- Replay-Angriffe
- Inhaltsmanipulation

## Update-Lebenszyklus

Der Update-Prozess von Capgo ist standardmäßig auf automatisch ausgelegt. So funktioniert der automatische Prozess:

### 1. Automatische Update-Prüfung

Das Plugin überprüft automatisch auf Updates in diesen Situationen:
- Wenn die App startet

Dieses Verhalten wird durch die Einstellung `autoUpdate` gesteuert:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
Sie können auch manuell mit `getLatest()` überprüfen

### 2. Automatischer Download

Wenn eine neue Version erkannt wird, und `autoUpdate` aktiviert ist:
1. Der Download beginnt automatisch
2. Der Fortschritt wird intern verfolgt
3. Fehlgeschlagene Downloads werden bei jedem Öffnen der App automatisch erneut versucht
4. Erfolgreiche Downloads werden im App-Speicher gespeichert

Sie können diesen Prozess über Ereignisse überwachen:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Automatische Installation

Der Zeitpunkt der Installation hängt von Ihrer Konfiguration ab:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

Die Installation erfolgt:
- Sofort, wenn `directUpdate` wahr ist
- Bei nächster Hintergrundaktivität der App, wenn `directUpdate` falsch ist
- Automatische Rückkehr, wenn die Installation fehlschlägt

Das Plugin verwaltet auch automatisch den Speicher:
- Entfernt fehlgeschlagene Updates, wenn `autoDeleteFailed` wahr ist
- Bereinigt alte Versionen, wenn `autoDeletePrevious` wahr ist

### Verzögerung von Updates

Sie können steuern, wann Updates installiert werden, indem Sie Verzögerungsbedingungen verwenden:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Verfügbare Verzögerungsbedingungen:
- **background**: Installieren, wenn die App in den Hintergrund geht
- **date**: Installieren nach einem bestimmten Datum/Zeit
- **nativeVersion**: Installieren nach dem nächsten nativen Update
- **kill**: Installieren, nachdem die App beendet wurde

Dies ist nützlich für:
- Planung von Updates während der Nebensaison
- Koordination von Updates mit der Benutzeraktivität
- Sicherstellung eines reibungslosen Update-Erlebnisses
- Vermeidung von Störungen während kritischer Aufgaben

### Update-Zustände

Während des automatischen Prozesses wechseln Pakete durch diese Zustände:
1. **downloading**: Download im Gange
2. **pending**: Download abgeschlossen, wartet auf Installation
3. **success**: Update installiert und aktiv
4. **error**: Update fehlgeschlagen (löst automatische Rückkehr aus)

## Store-Konformität

### Apple App Store ✅

Live-Updates sind vollständig konform mit den Richtlinien des Apple App Store. Wie im Lizenzvertrag des Apple Developer Programms angegeben:

> "Interpretierter Code darf in eine Anwendung heruntergeladen werden, jedoch nur solange, solange dieser Code: (a) nicht den Hauptzweck der Anwendung ändert, indem er Funktionen oder Funktionalitäten bereitstellt, die nicht mit dem beabsichtigten und beworbenen Zweck der Anwendung übereinstimmen, wie sie im App Store eingereicht wurde, (b) keinen Store oder Marktplatz für anderen Code oder Anwendungen erstellt, und (c) keine Signierungs-, Sandbox- oder andere Sicherheitsmerkmale des Betriebssystems umgeht."

Capgo-Updates ändern nur die Web-Schicht und respektieren alle plattform-spezifischen Sicherheitsgrenzen.

### Google Play Store ✅

Live-Updates stehen im Einklang mit den Richtlinien von Google Play. Die Richtlinie für Geräte- und Netzwerkmissbrauch besagt ausdrücklich:

> "Diese Einschränkung gilt nicht für Code, der in einer virtuellen Maschine oder einem Interpreter ausgeführt wird, wo entweder einen indirekten Zugriff auf Android-APIs bereitstellt (z. B. JavaScript in einem WebView oder Browser)."

Da Capgo nur den Inhalt des WebView aktualisiert, fällt es innerhalb dieser erlaubten Richtlinien.

## Best Practices

1. **Phasierte Bereitstellungen**: Updates schrittweise bereitstellen
2. **Versionskontrolle**: Alle bereitgestellten Versionen verfolgen
3. **Rückfallunterstützung**: Schnelle Wiederherstellung von Problemen
4. **Delta-Updates**: Nur geänderte Dateien herunterladen

## Wann Live-Updates verwenden

Ideal für:
- Fehlerbehebungen
- UI-Verbesserungen
- Inhaltsaktualisierungen
- Funktionsumschaltungen

Nicht geeignet für:
- Änderungen am nativen Code
- Größere Versionsupdates
- Sicherheitspatches, die nativen Änderungen erfordern
