---
locale: en
---
# @capgo/capacitor-data-storage-sqlite Tutorial

This tutorial will guide you through the process of using the `@capgo/capacitor-data-storage-sqlite` package to implement a key-value permanent store for simple string data in your Ionic Capacitor app.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js
- npm
- Ionic Capacitor project

## Installation

1. Open your terminal or command prompt and navigate to your project directory.

2. Run the following command to install the package:

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3. After installation, sync your Capacitor project:

```bash
npx cap sync
```

4. For Web platform, install localforage:

```bash
npm install --save localforage
```

5. For Electron platform, follow these additional steps:

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

## Usage

Now that we have installed the package, let's look at how to use it in your app.

### Importing the Plugin

First, import the plugin in your TypeScript file:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### Opening a Store

To start using the storage, you need to open a store:

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### Setting a Value

To set a value in the store:

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### Getting a Value

To retrieve a value from the store:

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### Checking if a Key Exists

To check if a key exists in the store:

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### Removing a Key

To remove a key from the store:

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### Clearing the Store

To clear all data from the store:

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### Closing the Store

When you're done using the store, it's good practice to close it:

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## Example Usage

Here's a complete example of how to use the plugin:

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

## Conclusion

You've now learned how to use the `@capgo/capacitor-data-storage-sqlite` package to implement a key-value storage system in your Ionic Capacitor app. This plugin provides a simple way to store and retrieve string data across different platforms, including iOS, Android, Electron, and Web.

Remember to handle errors appropriately and close the store when you're done using it. For more advanced usage, including working with encrypted databases, multiple tables, and JSON import/export, refer to the plugin's full API documentation.

For more detailed information about the API and available options, refer to the package's README or documentation.
