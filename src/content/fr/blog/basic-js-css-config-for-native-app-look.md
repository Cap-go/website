---
slug: basic-js-css-config-for-native-app-look
title: Configurations JS et CSS de base pour un look d'application native
description: >-
  Découvrez comment configurer votre application Web avec les paramètres
  JavaScript et CSS de base pour lui donner l'apparence d'une application
  native, notamment en désactivant les effets de survol.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: Illustration de l'apparence de l'application native
tag: Web Development
published: true
locale: fr
next_blog: ''
---

# Configurations JS et CSS de base pour un look d'application native

Lors de la création d'une application Web, il est essentiel de lui donner l'apparence d'une application native afin d'offrir une expérience utilisateur transparente. Dans cet article, nous aborderons les configurations JavaScript et CSS de base nécessaires pour obtenir une apparence d'application native, y compris la désactivation des effets de survol.

## Désactiver les effets de survol

Sur les appareils tactiles, les effets de survol peuvent être problématiques car ils n'ont pas un véritable état de survol comme les appareils de bureau. Pour désactiver les effets de survol sur les appareils tactiles, vous pouvez utiliser le code CSS suivant :

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

Remplacez « element » par le sélecteur approprié pour les éléments sur lesquels vous souhaitez désactiver les effets de survol

## Désactiver l'aperçu du lien

Pour désactiver l'aperçu des liens sur les appareils tactiles, vous pouvez utiliser le code JavaScript suivant :

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## Désactiver la sélection

Pour désactiver la sélection de texte, ajoutez le code CSS suivant à votre feuille de style :

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

## Désactiver le zoom

Pour désactiver le zoom, ajoutez la balise méta suivante en tête de votre fichier HTML :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Ajouter une zone CSS sécurisée

Pour garantir que votre contenu est affiché dans la zone sécurisée de l'appareil, ajoutez le code CSS suivant à votre feuille de style :

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## Conseils supplémentaires

- Utilisez des techniques de conception réactive pour garantir que votre application s'affiche parfaitement sur tous les appareils
- Optimisez les performances de votre application en minimisant l'utilisation de bibliothèques et de frameworks JavaScript lourds
- Testez votre application sur différents appareils et navigateurs pour garantir la compatibilité et une expérience utilisateur cohérente

En suivant ces configurations JavaScript et CSS de base, vous pouvez créer une application Web qui ressemble à une application native, offrant une expérience utilisateur transparente et agréable.