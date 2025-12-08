---
title: "De V6 à V7"
locale: fr
description: "Un guide détaillé sur la transition de la version 6 à la version 7 du système de mise à jour Capgo, décrivant les étapes nécessaires et les considérations pour un processus de mise à niveau réussi, garantissant la compatibilité avec les dernières fonctionnalités et améliorations de Capacitor."
sidebar:
  order: 1
---

## Pourquoi cette mise à niveau

Cette version majeure est là pour suivre la version majeure de Capacitor

Suivez d'abord le guide de migration de Capacitor :

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Installation

`npm i @capgo/capacitor-updater@7`

`Ensuite synchronisez la mise à jour du code natif :`

`npx cap sync`

C'est tout ! Assez facile !

## Migration du chiffrement

Si vous utilisez la méthode de chiffrement `key-v1`, vous devrez migrer vers le nouveau système de chiffrement car `key-v1` n'est plus pris en charge dans la V7. [[memory:96112]]

Suivez le guide de migration du chiffrement ici : [Guide de migration du chiffrement](/docs/cli/migrations/encryption/)

## Modifications de configuration

Nous recommandons d'ajouter les propriétés suivantes dans votre fichier `capacitor.config` :
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Ces paramètres devraient aider à mieux gérer le plugin et ses comportements.


