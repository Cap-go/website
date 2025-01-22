---
locale: fr
---

Traduire le texte suivant en locale fr:

Chanter le paquet @capgo/logsnag

Le paquet `@capgo/logsnag` est un outil puissant pour obtenir des notifications et suivre les événements de projet. Ce tutoriel vous guidera à travers l'installation et l'utilisation du paquet.

## Installation

Pour installer le paquet `@capgo/logsnag`, ouvrez votre terminal et exécutez la commande suivante :

```sh
npm install --save @capgo/logsnag
```

## Utilisation

### Importer la Bibliothèque

Pour utiliser le paquet `@capgo/logsnag` dans votre projet, vous devez l'importer. Ajoutez la déclaration d'importation suivante au début de votre fichier JavaScript :

```js
import { LogSnag } from '@capgo/logsnag';
```

### Initialiser le Client

Avant de pouvoir commencer à utiliser les fonctionnalités de `@capgo/logsnag`, vous devez initialiser un client. Utilisez le code suivant pour initialiser un client :

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
Remplacez `YOUR_API_TOKEN` par votre véritable jeton API et `YOUR_PROJECT_NAME` par le nom de votre projet.

### Publier un Événement

Pour publier un événement en utilisant `@capgo/logsnag`, utilisez la méthode `publish` de l'objet `logsnag`. Voici un exemple de code qui publie un événement :

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
Personnalisez les valeurs des propriétés selon votre événement spécifique. Vous pouvez spécifier le canal, le nom de l'événement, l'icône, les tags, et si vous souhaitez notifier ou non.

### Publier une Insight

En plus des événements, vous pouvez également publier des insights en utilisant `@capgo/logsnag`. Les insights fournissent des informations précieuses et des statistiques sur votre projet. Voici un exemple de code qui publie une insight :

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
Modifiez les valeurs des propriétés pour correspondre à votre insight. Vous pouvez spécifier le titre, la valeur et l'icône.

C'est tout ! Vous avez maintenant appris comment installer et utiliser le paquet `@capgo/logsnag` dans votre projet. Profitez de suivre les événements de votre projet et de recevoir des notifications facilement !