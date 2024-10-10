---
locale: fr
---

sing @capgo/standard-version Tutoriel du package

Dans ce didacticiel, nous apprendrons comment utiliser le package `@capgo/standard-version` pour gérer les numéros de version dans votre projet. Le package `@capgo/standard-version` est un outil qui automatise le versionnement de votre projet sur la base du [conventionnel spécification de validation](https://wwwconventionalcommitsorg/)

Commençons !

## Étape 1 : Installation

Pour installer le package `@capgo/standard-version`, exécutez la commande suivante dans votre terminal :

```bash
npm install @capgo/standard-version --save-dev
```

Cela ajoutera le package en tant que dépendance de développement dans votre projet

## Étape 2 : Configuration

Pour configurer le package `@capgo/standard-version`, créez un fichier `releaseconfigjs` dans le répertoire racine de votre projet avec le contenu suivant :

```javascript
module.exports = {
  preset: 'capgo',
};
```

Cette configuration spécifie le préréglage à utiliser pour le versioning. Dans ce cas, nous utilisons le préréglage `capgo` qui est un préréglage personnalisé pour le package `@capgo/standard-version`

## Étape 3 : Gestion des versions

Pour créer une nouvelle version de votre projet, exécutez la commande suivante :

```bash
npx standard-version
```

Cela analysera votre historique de validation et générera automatiquement un nouveau numéro de version pour votre projet basé sur les validations conventionnelles. Cela mettra également à jour le fichier `CHANGELOGmd` avec les dernières modifications.

## Étape 4 : Libérer

Pour créer une version, exécutez la commande suivante :

```bash
npx standard-version --release-as 1.0.0
```

Remplacez « 100 » par le numéro de version souhaité pour votre version. Cette commande mettra à jour le numéro de version dans votre fichier packagejson, créera une balise git pour la version et mettra à jour le fichier « CHANGELOGmd »

## Conclusion

Félicitations! Vous avez appris avec succès comment utiliser le package `@capgo/standard-version` pour gérer les numéros de version dans votre projet. Ce package automatise le processus de gestion des versions et facilite le suivi des modifications dans votre projet.

Pour plus d'informations, vous pouvez vous référer à la documentation du package `@capgo/standard-version`

Bon versionnage !