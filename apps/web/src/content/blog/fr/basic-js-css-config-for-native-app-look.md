---
slug: basic-js-css-config-for-native-app-look
title: Configurations de base JS et CSS pour l'apparence d'une application native
description: >-
  Découvrez comment configurer votre application web avec des paramètres
  JavaScript et CSS de base pour lui donner l'apparence et la sensation d'une
  application native, y compris la désactivation des effets de survol.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: Illustration de l'apparence des applications natives
keywords: 'tailwind css, css, mobile design, mobile app development'
tag: Web Development
published: true
locale: fr
next_blog: ''
---
# Configurations JS et CSS de base pour un aspect d'application Native

Lors de la création d'une application web, il est essentiel de lui donner l'apparence et la sensation d'une application native pour offrir une expérience utilisateur fluide. Dans cet article, nous aborderons les configurations JavaScript et CSS de base nécessaires pour obtenir un aspect d'application native, y compris la désactivation des effets de survol.

## Désactiver les Effets de Survol

Sur les appareils tactiles, les effets de survol peuvent poser problème car ils n'ont pas d'état de survol réel comme les appareils de bureau. Pour désactiver les effets de survol sur les appareils tactiles, vous pouvez utiliser le code CSS suivant :

```css
@media (hover: none) {
  .element:hover {
    /* Reset the hover styles */
    background-color: initial;
    color: initial;
    /* Add any other style resets needed */
  }
}
```

Remplacez `.element` par le sélecteur approprié pour les éléments sur lesquels vous souhaitez désactiver les effets de survol.

## Désactiver l'Aperçu des Liens

Pour désactiver l'aperçu des liens sur les appareils tactiles, vous pouvez utiliser le code JavaScript suivant :

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## Désactiver la Sélection

Pour désactiver la sélection de texte, ajoutez le code CSS suivant à votre feuille de style :

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## Désactiver le Zoom

Pour désactiver le zoom, ajoutez la balise meta suivante dans l'en-tête de votre fichier HTML :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Ajouter une Zone CSS Sûre

Pour garantir que votre contenu est affiché dans la zone sécurisée de l'appareil, ajoutez le code CSS suivant à votre feuille de style :

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## Conseils Supplémentaires

- Utilisez des techniques de design réactif pour garantir que votre application a fière allure sur tous les appareils.
- Optimisez les performances de votre application en minimisant l'utilisation de bibliothèques et de frameworks JavaScript lourds.
- Testez votre application sur divers appareils et navigateurs pour garantir la compatibilité et une expérience utilisateur cohérente.

En suivant ces configurations JavaScript et CSS de base, vous pouvez créer une application web qui a l'apparence et la sensation d'une application native, offrant une expérience utilisateur fluide et agréable.
