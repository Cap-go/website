---
locale: fr
---

capgo/home-indicator

Le package `@capgo/home-indicator` vous permet de masquer et d'afficher l'indicateur de bouton d'accueil dans votre application Capacitor.

## Installation

Pour installer le package, exécutez la commande suivante dans votre terminal :

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

Le package fournit les méthodes suivantes :

### `hide()`

```typescript
hide() => Promise
```

Masquer l'indicateur d'accueil

**Depuis :** 001

### `show()`

```typescript
show() => Promise
```

Afficher l'indicateur d'accueil

**Depuis :** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

Obtenir le statut de l'indicateur d'accueil

**Renvoie :** Promesse<{ hidden: boolean; }>

**Depuis :** 001

## Variables CSS

Vous pouvez utiliser `--safe-area-inset-bottom` pour vous assurer que votre contenu n'est pas masqué par l'indicateur d'accueil. Cette variable est injectée par le plugin pour Android. Elle est utile si vous définissez le mode plein écran réel sur Android.

Exemple d'utilisation :

```java
getWindow().setDecorFitsSystemWindows(false);
```

## Crédits

Ce plugin a été créé à l'origine pour [Kickcom](https://kickcom/) par [Capgo](https://capgo.app/).

Pour plus d'informations et de mises à jour, consultez [Capgo](https://capgo.app/).