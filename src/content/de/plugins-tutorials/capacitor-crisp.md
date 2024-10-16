---
locale: de
---

sing @capgo/capacitor-crisp Paket

Das `@capgo/capacitor-crisp` Paket ermöglicht es Ihnen, Crisp, ein natives SDK, in Ihre Capacitor-App zu integrieren. Es bietet Methoden zur Konfiguration von Crisp, zum Öffnen des Chatfensters, zum Festlegen von Benutzerdetails, zum Senden von Ereignissen und mehr.

Um mit dem `@capgo/capacitor-crisp` Paket zu beginnen, folgen Sie diesen Schritten:

## Installation

1 Öffnen Sie Ihr Terminal und navigieren Sie zum Stammverzeichnis Ihrer Capacitor-App.
2 Führen Sie den folgenden Befehl aus, um das Paket zu installieren:

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Crisp initialisieren

Bevor Sie eine der Methoden des `@capgo/capacitor-crisp` Pakets verwenden, müssen Sie Crisp mit Ihrer Website-ID konfigurieren. Fügen Sie den folgenden Code in Ihr Projekt ein:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Ersetzen Sie `'******-****-****-****-********'` durch Ihre tatsächliche Crisp-Website-ID.

### iOS-Integration

Wenn Sie iOS anvisieren, müssen Sie die folgenden Berechtigungen in die Infoplist-Datei Ihrer App hinzufügen:

- Datenschutz - Kamera-Benutzungsbeschreibung (NSCameraUsageDescription)
- Datenschutz - Foto-Bibliothek-Hinzufügungen-Benutzungsbeschreibung (NSPhotoLibraryAddUsageDescription)

Stellen Sie sicher, dass Sie für jede Berechtigung eine Beschreibung angeben, die erklärt, warum Ihre App diese benötigt.

### Android-Integration

Für die Android-Integration sind keine zusätzlichen Schritte erforderlich.

## Chatfenster öffnen

Um das Crisp-Chatfenster in Ihrer App zu öffnen, verwenden Sie die vom `@capgo/capacitor-crisp` Paket bereitgestellte Methode `openMessenger`. Fügen Sie den folgenden Code in Ihr Projekt ein:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

Dies öffnet das Crisp-Chatfenster, damit Benutzer ein Gespräch mit Ihrem Support-Team beginnen können.

## Zusätzliche Funktionalität

Das `@capgo/capacitor-crisp` Paket bietet mehrere weitere Methoden zur Anpassung und Interaktion mit Crisp. Hier sind einige der verfügbaren Methoden:

- `setTokenID`: Setzen Sie die Token-ID für den Benutzer.
- `setUser`: Setzen Sie die Benutzerdetails wie Spitzname, Telefonnummer, E-Mail und Avatar.
- `pushEvent`: Senden Sie ein benutzerdefiniertes Ereignis an Crisp.
- `setCompany`: Setzen Sie die Unternehmensdetails einschließlich Name, URL, Beschreibung, Beschäftigung und Geolokalisierung.
- `setInt`: Setzen Sie einen benutzerdefinierten Ganzzahlwert.
- `setString`: Setzen Sie einen benutzerdefinierten Stringwert.
- `sendMessage`: Senden Sie eine Chat-Nachricht an Crisp.
- `setSegment`: Setzen Sie das Segment für den Benutzer.
- `reset`: Setzen Sie die Crisp-Konfiguration zurück.

Für weitere Informationen zu diesen Methoden und ihren Parametern verweisen Sie auf die offizielle Dokumentation des `@capgo/capacitor-crisp` Pakets.

Das war's! Sie haben gelernt, wie Sie das `@capgo/capacitor-crisp` Paket verwenden, um Crisp in Ihre Capacitor-App zu integrieren. Genießen Sie nahtlose Kommunikation mit Ihren Benutzern über das Crisp-Chatfenster.