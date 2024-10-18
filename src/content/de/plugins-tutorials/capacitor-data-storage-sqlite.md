---
locale: de
---

capgo/capacitor-data-storage-sqlite Tutorial

Dieses Tutorial führt Sie durch den Prozess der Verwendung des Pakets `@capgo/capacitor-data-storage-sqlite`, um einen permanenten Schlüssel-Werte-Speicher für einfache Zeichenfolgendaten in Ihrer Ionic Capacitor-App zu implementieren.

## Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- Nodejs
- npm
- Ionic Capacitor-Projekt

## Installation

1 Öffnen Sie Ihr Terminal oder Eingabeaufforderung und navigieren Sie zu Ihrem Projektverzeichnis.

2 Führen Sie den folgenden Befehl aus, um das Paket zu installieren:

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 Nach der Installation synchronisieren Sie Ihr Capacitor-Projekt:

```bash
npx cap sync
```

4 Für die Web-Plattform installieren Sie localforage:

```bash
npm install --save localforage
```

5 Für die Electron-Plattform folgen Sie diesen zusätzlichen Schritten:

```bash
npm install --save @capacitor-community/electron
npx cap add @capacitor-community/electron
cd electron
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm run build
cd ..
npx cap sync @capacitor-community/electron
```

## Verwendung

Jetzt, da wir das Paket installiert haben, schauen wir uns an, wie es in Ihrer App verwendet wird.

### Importieren des Plugins

Zuerst importieren Sie das Plugin in Ihre TypeScript-Datei:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### Eröffnung eines Speichers

Um den Speicher zu verwenden, müssen Sie einen Speicher öffnen:

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### Festlegen eines Wertes

Um einen Wert im Speicher festzulegen:

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### Abrufen eines Wertes

Um einen Wert aus dem Speicher abzurufen:

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### Überprüfen, ob ein Schlüssel existiert

Um zu überprüfen, ob ein Schlüssel im Speicher vorhanden ist:

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### Entfernen eines Schlüssels

Um einen Schlüssel aus dem Speicher zu entfernen:

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### Leeren des Speichers

Um alle Daten aus dem Speicher zu löschen:

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### Schließen des Speichers

Wenn Sie mit dem Speicher fertig sind, ist es eine gute Praxis, ihn zu schließen:

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## Beispielanwendung

Hier ist ein vollständiges Beispiel dafür, wie man das Plugin verwendet:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

async function dataStorageExample() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  
  try {
    // Open the store
    await store.openStore({ database: "my_db", table: "my_table" });

    // Set a value
    await store.set("myKey", "Hello, Capacitor!");

    // Get the value
    const result = await store.get("myKey");
    console.log("Value:", result.value);

    // Check if key exists
    const keyExists = await store.iskey("myKey");
    console.log("Key exists:", keyExists.result);

    // Remove the key
    await store.remove("myKey");

    // Clear the store
    await store.clear();

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the store
    await store.closeStore();
  }
}

dataStorageExample();
```

## Fazit

Sie haben jetzt gelernt, wie man das Paket `@capgo/capacitor-data-storage-sqlite` verwendet, um ein Schlüssel-Werte-Speichersystem in Ihrer Ionic Capacitor-App zu implementieren. Dieses Plugin bietet eine einfache Möglichkeit, Zeichenfolgendaten über verschiedene Plattformen hinweg zu speichern und abzurufen, einschließlich iOS, Android, Electron und Web.

Denken Sie daran, Fehler angemessen zu behandeln und den Speicher zu schließen, wenn Sie fertig sind. Für eine fortgeschrittene Verwendung, einschließlich der Arbeit mit verschlüsselten Datenbanken, mehreren Tabellen und JSON-Import/Export, beziehen Sie sich auf die vollständige API-Dokumentation des Plugins.

Für detailliertere Informationen über die API und verfügbare Optionen konsultieren Sie die README oder Dokumentation des Pakets.