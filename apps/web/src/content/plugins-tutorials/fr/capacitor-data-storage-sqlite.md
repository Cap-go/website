---
locale: fr
---

capgo/capacitor-data-storage-sqlite Tutoriel

Ce tutoriel vous guidera à travers le processus d'utilisation du package `@capgo/capacitor-data-storage-sqlite` pour implémenter un stockage permanent clé-valeur pour des données simples de chaînes dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Nodejs
- npm
- Projet Ionic Capacitor

## Installation

1 Ouvrez votre terminal ou invite de commandes et accédez à votre répertoire de projet.

2 Exécutez la commande suivante pour installer le package :

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 Après l'installation, synchronisez votre projet Capacitor :

```bash
npx cap sync
```

4 Pour la plateforme Web, installez localforage :

```bash
npm install --save localforage
```

5 Pour la plateforme Electron, suivez ces étapes supplémentaires :

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

## Utilisation

Maintenant que nous avons installé le package, voyons comment l'utiliser dans votre application.

### Importer le Plugin

Tout d'abord, importez le plugin dans votre fichier TypeScript :

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### Ouvrir un Magasin

Pour commencer à utiliser le stockage, vous devez ouvrir un magasin :

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### Définir une Valeur

Pour définir une valeur dans le magasin :

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### Obtenir une Valeur

Pour récupérer une valeur du magasin :

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### Vérifier si une Clé Existe

Pour vérifier si une clé existe dans le magasin :

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### Supprimer une Clé

Pour supprimer une clé du magasin :

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### Effacer le Magasin

Pour effacer toutes les données du magasin :

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### Fermer le Magasin

Lorsque vous avez terminé d'utiliser le magasin, il est bon de le fermer :

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## Exemple d'Utilisation

Voici un exemple complet de la façon d'utiliser le plugin :

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

Vous avez maintenant appris à utiliser le package `@capgo/capacitor-data-storage-sqlite` pour implémenter un système de stockage clé-valeur dans votre application Ionic Capacitor. Ce plugin offre un moyen simple de stocker et de récupérer des données de chaînes sur différentes plateformes, y compris iOS, Android, Electron et Web.

N'oubliez pas de gérer les erreurs de manière appropriée et de fermer le magasin lorsque vous avez terminé de l'utiliser. Pour une utilisation plus avancée, y compris le travail avec des bases de données cryptées, plusieurs tables et l'import/export JSON, consultez la documentation complète de l'API du plugin.

Pour des informations plus détaillées sur l'API et les options disponibles, consultez le README ou la documentation du package.