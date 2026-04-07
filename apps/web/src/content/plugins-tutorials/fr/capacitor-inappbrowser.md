---
locale: fr
---

Tutoriel du package `capgo/inappbrowser`

Le package `@capgo/inappbrowser` est un plugin Capacitor qui vous permet d'ouvrir une URL dans une fenêtre de navigateur intégrée. Voici un guide étape par étape sur la façon d'utiliser ce package :

## Installation

Pour installer le package, exécutez la commande suivante dans le répertoire racine de votre projet :

[[BLOC_DE_CODE]]

## Utilisation

1. Importez la classe `InAppBrowser` depuis le package `@capgo/inappbrowser` :

   [[BLOC_DE_CODE]]

2. Utilisez la méthode `InAppBrowser.open` pour ouvrir une URL dans une nouvelle fenêtre en plein écran :

   [[BLOC_DE_CODE]]

   Remplacez `"YOUR_URL"` par l'URL que vous souhaitez ouvrir.

3. Vous pouvez également utiliser d'autres méthodes fournies par la classe `InAppBrowser` :

   - `clearCookies`: Effacer tous les cookies
   - `close`: Fermer la fenêtre du navigateur intégré
   - `openWebView`: Ouvrir une URL dans une nouvelle vue web avec barres d'outils
   - `setUrl`: Définir l'URL du navigateur intégré

   Référez-vous à la section API ci-dessous pour plus de détails sur ces méthodes.

## API

Le package `@capgo/inappbrowser` fournit les méthodes API suivantes :

- `open(options: OpenOptions)`: Ouvrir une URL dans une nouvelle fenêtre en plein écran. Prend un objet `OpenOptions` comme paramètre.
- `clearCookies()`: Effacer tous les cookies.
- `close()`: Fermer la fenêtre du navigateur intégré.
- `openWebView(options: OpenWebViewOptions)`: Ouvrir une URL dans une nouvelle vue web avec barres d'outils. Prend un objet `OpenWebViewOptions` comme paramètre.
- `setUrl(options: { url: string; })`: Définir l'URL du navigateur intégré. Prend un objet avec une propriété `url` comme paramètre.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Écouter les événements de changement d'URL. Prend une fonction `UrlChangeListener` comme paramètre.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Écouter les événements de fermeture. Prend une fonction `UrlChangeListener` comme paramètre.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Écouter les événements de clic du bouton de confirmation. Prend une fonction `UrlChangeListener` comme paramètre.
- `removeAllListeners()`: Supprimer tous les écouteurs d'événements.

Pour plus d'informations sur les paramètres et les valeurs de retour de ces méthodes, référez-vous à la documentation du package.

Et voilà ! Vous avez appris à utiliser le package `@capgo/inappbrowser` pour ouvrir des URLs dans une fenêtre de navigateur intégrée dans Capacitor. Bon codage !