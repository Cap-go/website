---
locale: fr
---

chanter @capgo/logsnag

Le package `@capgo/logsnag` est un outil puissant pour recevoir des notifications et suivre les événements du projet. Ce tutoriel vous guidera tout au long de l'installation et de l'utilisation du package.

##Installation

Pour installer le package `@capgo/logsnag`, ouvrez votre terminal et exécutez la commande suivante :

```sh
npm install --save @capgo/logsnag
```

## Utilisation

### Importer la bibliothèque

Pour utiliser le package `@capgo/logsnag` dans votre projet, vous devez l'importer. Ajoutez l'instruction d'importation suivante au début de votre fichier JavaScript :

```js
import { LogSnag } from '@capgo/logsnag';
```

### Initialiser le client

Avant de pouvoir commencer à utiliser les fonctionnalités de `@capgo/logsnag`, vous devez initialiser un client. Utilisez le code suivant pour initialiser un client :

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
Remplacez `YOUR_API_TOKEN` par votre jeton API actuel et `YOUR_PROJECT_NAME` par le nom de votre projet

### Publier l'événement

Pour publier un événement à l'aide de `@capgo/logsnag`, utilisez la méthode `publish` de l'objet `logsnag`. Voici un exemple d'extrait de code qui publie un événement :

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
Personnalisez les valeurs des propriétés en fonction de votre événement spécifique. Vous pouvez spécifier le canal, le nom de l'événement, l'icône, les balises et s'il faut notifier ou non.

### Publier un aperçu

En plus des événements, vous pouvez également publier des insights à l'aide de `@capgo/logsnag`. Les insights fournissent des informations et des statistiques précieuses sur votre projet. Voici un exemple d'extrait de code qui publie un insight :

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
Modifiez les valeurs des propriétés en fonction de vos informations. Vous pouvez spécifier le titre, la valeur et l'icône.

C'est ça! Vous avez maintenant appris à installer et à utiliser le package `@capgo/logsnag` dans votre projet. Profitez du suivi des événements de votre projet et de la réception de notifications en toute simplicité !