---
locale: fr
---

## Tutoriel sur le paquet @capgo/standard-version

Dans ce tutoriel, nous allons apprendre à utiliser le paquet `@capgo/standard-version` pour gérer les numéros de version dans votre projet. Le paquet `@capgo/standard-version` est un outil qui automatise la gestion des versions de votre projet en fonction de la [spécification des engagements conventionnels](https://wwwconventionalcommitsorg/).

Commençons !

## Étape 1 : Installation

Pour installer le paquet `@capgo/standard-version`, exécutez la commande suivante dans votre terminal :

[[BLOC_DE_CODE]]

Cela ajoutera le paquet comme dépendance de développement dans votre projet.

## Étape 2 : Configuration

Pour configurer le paquet `@capgo/standard-version`, créez un fichier `releaseconfigjs` dans le répertoire racine de votre projet avec le contenu suivant :

[[BLOC_DE_CODE]]

Cette configuration spécifie le préréglage à utiliser pour la gestion des versions. Dans ce cas, nous utilisons le préréglage `capgo`, qui est un préréglage personnalisé pour le paquet `@capgo/standard-version`.

## Étape 3 : Gestion des versions

Pour créer une nouvelle version de votre projet, exécutez la commande suivante :

[[BLOC_DE_CODE]]

Cela analysera votre historique de commits et générera automatiquement un nouveau numéro de version pour votre projet en fonction des commits conventionnels. Cela mettra également à jour le fichier `CHANGELOGmd` avec les dernières modifications.

## Étape 4 : Publication

Pour créer une publication, exécutez la commande suivante :

[[BLOC_DE_CODE]]

Remplacez `100` par le numéro de version souhaité pour votre publication. Cette commande mettra à jour le numéro de version dans votre fichier packagejson, créera un tag git pour la publication et mettra à jour le fichier `CHANGELOGmd`.

## Conclusion

Félicitations ! Vous avez appris avec succès à utiliser le paquet `@capgo/standard-version` pour gérer les numéros de version dans votre projet. Ce paquet automatise le processus de gestion des versions et facilite le suivi des modifications dans votre projet.

Pour plus d'informations, vous pouvez consulter la documentation du paquet `@capgo/standard-version`.

Bonne gestion des versions !