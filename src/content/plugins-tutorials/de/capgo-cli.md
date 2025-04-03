---
locale: de
---

Verwendung von @capgo/cli zum Hochladen und Herunterladen von Dateien in/aus der Capgo Cloud

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/) ist ein Kommandozeilen-Interface (CLI), das es Ihnen ermöglicht, Dateien in die Capgo Cloud hochzuladen und von dort herunterzuladen. In diesem Tutorial werden wir die Schritte durchgehen, um @capgo/cli zur Verwaltung von Dateien in der Capgo Cloud zu verwenden.

### Schritt 1: Registrierung

Bevor Sie @capgo/cli verwenden, müssen Sie ein Konto auf [capgoapp](https://capgoapp/) registrieren und Ihren API-Schlüssel erhalten.

### Schritt 2: Installation

Um @capgo/cli zu installieren, öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus:

```bash
npm install -g @capgo/cli
```

### Schritt 3: Anmeldung in der Capgo Cloud

Um sich in der Capgo Cloud mit @capgo/cli anzumelden, führen Sie den folgenden Befehl aus:

```bash
npx @capgo/cli login [apikey]
```

Ersetzen Sie `[apikey]` durch Ihren während der Registrierung erhaltenen API-Schlüssel. Optional können Sie das Flag `--local` verwenden, um den API-Schlüssel im lokalen Ordner zu speichern.

### Schritt 4: Hinzufügen einer neuen App zur Capgo Cloud

Um eine neue App zur Capgo Cloud hinzuzufügen, verwenden Sie den folgenden Befehl:

```bash
npx @capgo/cli add [appId]
```

Ersetzen Sie `[appId]` durch Ihre App-ID im Format `comtestapp`. Sie können auch die Flags `--icon`, `--name` und `--apikey` verwenden, um das Icon, den Namen und den API-Schlüssel für die App anzupassen.

### Schritt 5: Hochladen einer Version in die Capgo Cloud

Um eine Version Ihrer App in die Capgo Cloud hochzuladen, führen Sie den folgenden Befehl aus:

```bash
npx @capgo/cli upload [appId]
```

Ersetzen Sie `[appId]` durch Ihre App-ID. Sie können die Flags `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data`, `--no-key`, `--bundle` und `--iv-session-key` verwenden, um die Upload-Optionen anzupassen.

### Schritt 6: Verwalten von Kanälen

Sie können Kanäle in der Capgo Cloud mit @capgo/cli erstellen und löschen.

Um einen neuen Kanal hinzuzufügen, verwenden Sie den Befehl:

```bash
npx @capgo/cli channel add [channelId] [appId]
```

Ersetzen Sie `[channelId]` durch den Namen des neuen Kanals und `[appId]` durch Ihre App-ID.

Um einen Kanal zu löschen, verwenden Sie den Befehl:

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

Ersetzen Sie `[channelId]` durch den Namen des zu löschenden Kanals und `[appId]` durch Ihre App-ID.

### Schritt 7: End-to-End-Verschlüsselung

@capgo/cli unterstützt die End-to-End-Verschlüsselung für Ihren Code. Sie können ein RSA-Schlüsselpaar mit dem folgenden Befehl generieren:

```bash
npx @capgo/cli key create
```

Sie können den privaten Schlüssel in Ihrer App-Konfiguration speichern, indem Sie Folgendes ausführen:

```bash
npx @capgo/cli key save
```

Um eine Zip-Datei mit Ihrem Schlüssel zu verschlüsseln, verwenden Sie den Befehl:

```bash
npx @capgo/cli encrypt [path/to/zip]
```

Um eine Zip-Datei mit Ihrem Schlüssel zu entschlüsseln, verwenden Sie den Befehl:

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

Ersetzen Sie `[path/to/zip]` und `[ivSessionKey]` durch die entsprechenden Werte.

### Fazit

In diesem Tutorial haben wir gelernt, wie man @capgo/cli zum Hochladen und Herunterladen von Dateien in/aus der Capgo Cloud verwendet. @capgo/cli bietet eine praktische Kommandozeilen-Oberfläche zur Verwaltung Ihrer App-Versionen und Kanäle. Für weitere Informationen lesen Sie die offizielle [Dokumentation](https://capgoapp/docs/).