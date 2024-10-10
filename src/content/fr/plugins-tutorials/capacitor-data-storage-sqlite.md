---
locale: fr
---

Tutoriel capgo/capacitor-data-storage-sqlite

Ce didacticiel vous guidera tout au long du processus d'utilisation du package `@capgo/capacitor-data-storage-sqlite` pour implémenter un magasin permanent de valeurs-clés pour les données de chaîne simples dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés :

- Nodejs
- npm
- Projet de condensateur ionique

##Installation

1 Ouvrez votre terminal ou votre invite de commande et accédez au répertoire de votre projet

2 Exécutez la commande suivante pour installer le package :

```bash
npm install --save @capgo/capacitor-data-storage-sqlite
```

3 Après l'installation, synchronisez votre projet Capacitor :

```bash
npx cap sync
```

4 Pour la plateforme Web, installez localforage :

```bash
npm install --save localforage
```

5 Pour la plateforme Electron, suivez ces étapes supplémentaires :

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

Maintenant que nous avons installé le package, voyons comment l'utiliser dans votre application

### Importation du plugin

Tout d’abord, importez le plugin dans votre fichier TypeScript :

```typescript
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, capDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';
```

### Ouvrir un magasin

Pour commencer à utiliser le stockage, vous devez ouvrir un magasin :

```typescript
async function openStore() {
  const store = new CapacitorDataStorageSqlite(Capacitor.getPlatform());
  await store.openStore({ database: "my_db", table: "my_table" });
  return store;
}
```

### Définition d'une valeur

Pour définir une valeur dans le magasin :

```typescript
async function setValue(store, key: string, value: string) {
  await store.set(key, value);
}
```

### Obtenir une valeur

Pour récupérer une valeur du magasin :

```typescript
async function getValue(store, key: string) {
  const result = await store.get(key);
  return result.value;
}
```

### Vérifier si une clé existe

Pour vérifier si une clé existe dans le magasin :

```typescript
async function isKeyExists(store, key: string) {
  const result = await store.iskey(key);
  return result.result;
}
```

### Supprimer une clé

Pour supprimer une clé du magasin :

```typescript
async function removeKey(store, key: string) {
  await store.remove(key);
}
```

### Vider le magasin

Pour effacer toutes les données du magasin :

```typescript
async function clearStore(store) {
  await store.clear();
}
```

### Fermeture du magasin

Lorsque vous avez fini d'utiliser la boutique, il est conseillé de la fermer :

```typescript
async function closeStore(store) {
  await store.closeStore();
}
```

## Exemple d'utilisation

Voici un exemple complet d'utilisation du plugin :

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

Vous avez maintenant appris à utiliser le package `@capgo/capacitor-data-storage-sqlite` pour implémenter un système de stockage clé-valeur dans votre application Ionic Capacitor. Ce plugin fournit un moyen simple de stocker et de récupérer des données de chaîne sur différentes plates-formes. , y compris iOS, Android, Electron et Web

N'oubliez pas de gérer les erreurs de manière appropriée et de fermer le magasin lorsque vous avez fini de l'utiliser. Pour une utilisation plus avancée, notamment l'utilisation de bases de données chiffrées, de tables multiples et l'importation/exportation JSON, reportez-vous à la documentation complète de l'API du plugin.

Pour des informations plus détaillées sur l'API et les options disponibles, reportez-vous au README ou à la documentation du package.