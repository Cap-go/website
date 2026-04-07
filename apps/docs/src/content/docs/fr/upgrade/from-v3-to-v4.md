---
title: De la V3 à la V4
description: >-
  Comment passer de la V3 à la V4 du programme de mise à jour Capgo, comprendre
  quelles sont les modifications majeures et comment les gérer
sidebar:
  order: 3
locale: fr
---
## Pourquoi cette mise à jour

Après de nombreuses discussions dans la communauté Discord avec vous. J'ai découvert que le mode manuel était très trop manuel et dangereux à utiliser, par exemple, le retour automatique n'était pas possible, donc si vous échouez à la mise à jour manuelle, l'utilisateur doit supprimer l'application et la réinstaller, ce qui est terrible UX.

En attendant, j'en ai profité pour vous donner plus de liberté et supprimer tous les mauvais codes que j'ai créés.

## Installer

`npm i @capgo/capacitor-updater@4`

## Cloud de mise à jour automatique

Si vous utilisez l'exemple de base dans votre application, vous pouvez migrer en toute sécurité vers la nouvelle version, profitez-en !

## Mise à jour automatique auto-hébergée

Pour vous, toujours simple, les changements sont :

* Le nom du paramètre de `autoUpdateUrl` dans `updateUrl`
* La méthode Endpoint est passée de `GET` à POST

## Utilisateurs manuels

Pour vous, c’est le changement le plus important, mais pour le meilleur ! Vous obtenez des tonnes d’améliorations, lisez attentivement.

## Modifications

* `autoUpdateUrl` devient `updateUrl` puisque ce paramètre peut désormais également être utilisé en mode manuel
* Suppression de `cancelDelay` et `delayUpdate` au profit de `setDelay`
* Plus de `versionName` dans l'ensemble
* Changez la clé `version`, qui a été renvoyée dans la plupart des fonctions, en objet `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Renommé de noms trompeurs maintenant (même l'explication ne peut pas être claire, mais à l'usage il est facile de comprendre le nouveau) :
  * ce qui s'appelait un `version` fait désormais référence à un `bundle`
  * `id` fait référence à l'ancien `version` qui était une chaîne aléatoire de 10 caractères, ce `id` est le seul moyen fiable et unique d'accéder à vos bundles, exemple `7Dfcd2RedN`.
  * `version` référez-vous maintenant au `versionName` que vous choisissez pour un bundle, exemple `1.0.0`
* `updateUrl` passe de `get` à `post`, puisque les en-têtes personnalisés étaient un problème pour certains d'entre vous et que la publication est plus logique, tous les en-têtes précédents vont dans le corps et le préfixe `cap_` disparaît.
* La méthode `versionName` est supprimée, au profit de `getId`
* list renvoie maintenant une liste de `BundleInfo`
* Renommez `getId` en `getDeviceId`
* `autoUpdate` devient vrai par défaut, si vous utilisez le mode Manuel, définissez-le sur faux.

## Actualités

* Méthode `getLatest`, cette méthode vous permet d'obtenir depuis votre serveur paramétré avec `updateUrl` la dernière version disponible.
* Méthode `setDelay` qui prend `{`kind`:` "fond" | "tuer" | "Version native" | "date", valeur ? : string`}` comme argument pour définir le délai sur différents modes.
* Méthode `next`, pour mettre la version en backgrounding suivant, contrairement à `set` qui le fait instantanément.
* Méthode `isAutoUpdateEnabled`, pour vous indiquer si vous êtes dans un contexte de mise à jour automatique
* Événement `downloadComplete` lorsque le téléchargement atteint 100 %
* Ajout du champ obligatoire `version` dans la méthode de téléchargement
* `notifyAppReady` devient également obligatoire en mode manuel, si vous n'appelez pas après 10 secondes, l'application revient à la version précédente.

## Contributeurs

[@lincolntrois](https://github.com/lincolnthree/) Merci beaucoup d'avoir commencé ce travail, il était impossible de faire fonctionner cette mise à jour sans vous.
