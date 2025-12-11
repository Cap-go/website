---
title: De V3 à V4
description: Comment mettre à niveau de V3 vers V4
sidebar:
  order: 3
locale: fr
---

## Pourquoi cette mise à niveau

Après de nombreuses discussions avec vous dans la communauté Discord, j'ai découvert que le mode manuel était trop manuel et pas sûr à utiliser. Par exemple, la restauration automatique n'était pas possible, donc si la mise à jour échouait en manuel, l'utilisateur devait supprimer l'application et la réinstaller, ce qui est une terrible expérience utilisateur.

Entre-temps, j'ai pris cela comme une opportunité pour vous donner plus de liberté et supprimer tout le mauvais code que j'ai fait.

## Installation

`npm i @capgo/capacitor-updater@4`

## Mise à jour automatique cloud

Si vous utilisez l'exemple de base dans votre application, vous pouvez migrer en toute sécurité vers la nouvelle version, profitez-en !

## Mise à jour automatique auto-hébergée

Pour vous, c'est toujours simple, les changements sont :

* Le nom du paramètre de `autoUpdateUrl` devient `updateUrl`
* La méthode de l'endpoint est passée de `GET` à `POST`

## Utilisateurs manuels

Pour vous, c'est le changement le plus important, mais pour le meilleur ! Vous obtenez des tonnes d'améliorations, lisez attentivement.

## Changements

* `autoUpdateUrl` devient `updateUrl` puisque ce paramètre peut être utilisé en mode manuel maintenant aussi
* Suppression de `cancelDelay` et `delayUpdate` en faveur de `setDelay`
* Plus de `versionName` dans set
* Changement de la clé `version`, qui était retournée dans la plupart des fonctions vers l'objet `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Renommage des noms trompeurs maintenant (même à expliquer ça ne peut pas être clair, mais à l'usage il est facile de comprendre le nouveau) :
  * ce qui était appelé `version` fait maintenant référence à un `bundle`
  * `id` fait référence à l'ancienne `version` qui était une chaîne aléatoire de 10 caractères, cet `id` est la seule façon fiable et unique d'accéder à vos bundles, exemple `7Dfcd2RedN`
  * `version` fait maintenant référence au `versionName` que vous choisissez pour un bundle, exemple `100`
* `updateUrl` passe de `get` à `post`, puisque les en-têtes personnalisés étaient un problème pour certains d'entre vous et post est plus logique, tous les en-têtes précédents vont dans le corps et le préfixe `cap_` disparaît
* La méthode `versionName` est supprimée, en faveur de `getId`
* list retourne maintenant une liste de `BundleInfo`
* Renommage de `getId` en `getDeviceId`
* `autoUpdate` devient true par défaut, si vous utilisez le mode Manuel, mettez-le à false

## Nouveautés

* Méthode `getLatest`, cette méthode vous permet d'obtenir de votre serveur défini avec `updateUrl` la dernière version disponible
* Méthode `setDelay` qui prend `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` comme argument pour définir le délai pour différents modes
* Méthode `next`, pour définir la version au prochain passage en arrière-plan, à l'opposé de `set` qui le fait instantanément
* Méthode `isAutoUpdateEnabled`, pour vous permettre de savoir si vous êtes dans un contexte de mise à jour automatique
* Événement `downloadComplete` lorsque le téléchargement atteint 100%
* Ajout du champ obligatoire `version` dans la méthode download
* `notifyAppReady` devient obligatoire en mode manuel aussi, si non appelé après 10 secondes l'application revient à la version précédente

## Contributeurs

[@lincolnthree](https://github.com/lincolnthree/) Merci beaucoup d'avoir commencé ce travail, il était impossible de faire fonctionner cette mise à jour sans vous
