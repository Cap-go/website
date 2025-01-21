---
locale: de
---

sing @capgo/standard-version Paket Tutorial

In diesem Tutorial lernen wir, wie man das `@capgo/standard-version` Paket zur Verwaltung von Versionsnummern in deinem Projekt verwendet. Das `@capgo/standard-version` Paket ist ein Werkzeug, das die Versionierung deines Projekts basierend auf der [konventionellen Commit-Spezifikation](https://wwwconventionalcommitsorg/) automatisiert.

Lass uns anfangen!

## Schritt 1: Installation

Um das `@capgo/standard-version` Paket zu installieren, führe den folgenden Befehl in deinem Terminal aus:

```bash
npm install @capgo/standard-version --save-dev
```

Dies fügt das Paket als Entwicklungsabhängigkeit in dein Projekt hinzu.

## Schritt 2: Konfiguration

Um das `@capgo/standard-version` Paket zu konfigurieren, erstelle eine `releaseconfigjs` Datei im Hauptverzeichnis deines Projekts mit folgendem Inhalt:

```javascript
module.exports = {
  preset: 'capgo',
};
```

Diese Konfiguration gibt das Preset an, das für die Versionierung verwendet werden soll. In diesem Fall verwenden wir das `capgo` Preset, das ein angepasstes Preset für das `@capgo/standard-version` Paket ist.

## Schritt 3: Versionierung

Um eine neue Version deines Projekts zu erstellen, führe den folgenden Befehl aus:

```bash
npx standard-version
```

Dies analysiert deine Commit-Historie und generiert automatisch eine neue Versionsnummer für dein Projekt basierend auf den konventionellen Commits. Es wird auch die Datei `CHANGELOGmd` mit den neuesten Änderungen aktualisieren.

## Schritt 4: Veröffentlichung

Um eine Veröffentlichung zu erstellen, führe den folgenden Befehl aus:

```bash
npx standard-version --release-as 1.0.0
```

Ersetze `100` durch die gewünschte Versionsnummer für deine Veröffentlichung. Dieser Befehl aktualisiert die Versionsnummer in deiner packagejson Datei, erstellt ein Git-Tag für die Veröffentlichung und aktualisiert die Datei `CHANGELOGmd`.

## Fazit

Herzlichen Glückwunsch! Du hast erfolgreich gelernt, wie man das `@capgo/standard-version` Paket zur Verwaltung von Versionsnummern in deinem Projekt verwendet. Dieses Paket automatisiert den Versionierungsprozess und erleichtert das Nachverfolgen von Änderungen in deinem Projekt.

Für weitere Informationen kannst du die Dokumentation des `@capgo/standard-version` Pakets konsultieren.

Viel Spaß beim Versionieren!