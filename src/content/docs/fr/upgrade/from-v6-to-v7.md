---
title: Du V6 au V7
description: >-
  Un guide détaillé sur la transition de la version 6 à la version 7 du
  programme de mise à jour Capgo, décrivant les étapes et considérations
  nécessaires pour un processus de mise à niveau réussi, garantissant la
  compatibilité avec les dernières fonctionnalités et améliorations de
  Capacitor.
sidebar:
  order: 2
locale: fr
---
## Pourquoi cette mise à jour

Cette version majeure est là pour suivre la version majeure de Capacitor

Suivez d’abord le guide de migration de Capacitor :

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Installer

`npm i @capgo/capacitor-updater@7`

`Then sync the native code update:`

`npx cap sync`

C'est ça ! Assez facile !

## Migration du chiffrement

Si vous utilisez la méthode de chiffrement `key-v1`, vous devrez migrer vers le nouveau système de chiffrement car `key-v1` n'est plus pris en charge dans la V7. [[mémoire :96112]]

Suivez le guide de migration du chiffrement ici : [Guide de migration du chiffrement](/docs/cli/migrations/encryption/)

## Modifications de configuration

Nous vous recommandons d'ajouter les propriétés suivantes dans votre fichier `capacitor.config` :
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Ces paramètres devraient aider à mieux gérer le plugin et ses comportements.
