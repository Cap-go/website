---
locale: fr
---

Tutoriel sur le package capgo/inappbrowser

Le package `@capgo/inappbrowser` est un plugin Capacitor qui vous permet d'ouvrir une URL dans une fenêtre de navigateur intégrée à l'application. Voici un guide étape par étape sur la façon d'utiliser ce package :

##Installation

Pour installer le package, exécutez la commande suivante dans le répertoire racine de votre projet :

```bash
npm install @capgo/inappbrowser
npx cap sync
```

## Utilisation

1 Importez la classe `InAppBrowser` depuis le package `@capgo/inappbrowser` :

   ```javascript
   import { InAppBrowser } from '@capgo/inappbrowser';
   ```

2 Utilisez la méthode `InAppBrowseropen` pour ouvrir une URL dans une nouvelle fenêtre plein écran :

   ```javascript
   InAppBrowser.open("YOUR_URL");
   ```

   Remplacez `"VOTRE_URL"` par l'URL que vous souhaitez ouvrir

3 Vous pouvez également utiliser d'autres méthodes fournies par la classe `InAppBrowser` :

   - `clearCookies` : Efface tous les cookies
   - `close` : ferme la fenêtre du navigateur intégré à l'application
   - `openWebView` : ouvre une URL dans une nouvelle vue Web avec des barres d'outils
   - `setUrl` : définit l'URL du navigateur intégré à l'application

   Reportez-vous à la section API ci-dessous pour plus de détails sur ces méthodes

##API

Le package `@capgo/inappbrowser` fournit les méthodes API suivantes :

- `open(options: OpenOptions)` : Ouvrir une URL dans une nouvelle fenêtre plein écran Prend un objet `OpenOptions` comme paramètre
- `clearCookies()` : Efface tous les cookies
- `close()` : ferme la fenêtre du navigateur dans l'application
- `openWebView(options : OpenWebViewOptions)` : Ouvrir une URL dans une nouvelle vue Web avec des barres d'outils Prend un objet `OpenWebViewOptions` comme paramètre
- `setUrl(options: { url: string; })` : définit l'URL du navigateur intégré à l'application. Prend un objet avec une propriété `url` comme paramètre
- `addListener('urlChangeEvent', ListenerFunc: UrlChangeListener)` : écoute les événements de changement d'URL Prend une fonction `UrlChangeListener` comme paramètre
- `addListener('closeEvent', listeningFunc: UrlChangeListener)` : écoute les événements de fermeture Prend une fonction `UrlChangeListener` comme paramètre
- `addListener('confirmBtnClicked', ListenerFunc: UrlChangeListener)` : écoute les événements de clic sur le bouton de confirmation Prend une fonction `UrlChangeListener` comme paramètre
- `removeAllListeners()` : Supprime tous les écouteurs d'événements

Pour plus d'informations sur les paramètres et les valeurs de retour de ces méthodes, reportez-vous à la documentation du package

Et c'est tout ! Vous avez appris à utiliser le package `@capgo/inappbrowser` pour ouvrir des URL dans une fenêtre de navigateur intégrée à l'application dans Capacitor Happy coding !