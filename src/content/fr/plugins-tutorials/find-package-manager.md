---
locale: fr
---

Chantez @capgo/find-package-manager

Le package `@capgo/find-package-manager` est un outil pratique pour déterminer quel gestionnaire de paquets est utilisé dans un chemin donné. Cela peut être utile lors du travail avec des projets utilisant différents gestionnaires de paquets.

Voici un tutoriel étape par étape sur comment utiliser ce package :

## Installation

Tout d'abord, assurez-vous d'avoir Nodejs et npm installés sur votre machine. Ensuite, ouvrez votre terminal et exécutez la commande suivante pour installer le package `@capgo/find-package-manager` :

[[BLOC_DE_CODE]]

## Importer le package

Une fois le package installé, vous pouvez l'importer dans votre code en utilisant la ligne suivante :

[[BLOC_DE_CODE]]

## Trouver le type de gestionnaire de paquets

Pour trouver le type de gestionnaire de paquets dans un chemin donné, vous pouvez utiliser la fonction `findPackageManagerType`. Voici un exemple :

[[BLOC_DE_CODE]]

La fonction `findPackageManagerType` retourne une valeur de chaîne indiquant le type de gestionnaire de paquets utilisé. Elle peut retourner l'une des valeurs suivantes :

- `npm` : si npm est utilisé
- `yarn` : si yarn est utilisé
- `pnpm` : si pnpm est utilisé
- `unknown` : si le type de gestionnaire de paquets ne peut pas être déterminé

## Mettre le tout ensemble

Voici un exemple complet de comment utiliser le package `@capgo/find-package-manager` :

[[BLOC_DE_CODE]]

C'est tout ! Vous pouvez maintenant utiliser le package `@capgo/find-package-manager` pour déterminer le type de gestionnaire de paquets dans un chemin donné.