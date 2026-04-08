---
title: De la V4 à la V5
description: >-
  Comment passer de la V4 à la V5, du programme de mise à jour Capgo, quels sont
  les changements majeurs dont vous devez vous occuper, c'est assez simple
sidebar:
  order: 2
locale: fr
---
## Pourquoi cette mise à jour

Cette version majeure est là pour suivre la version majeure de Capacitor

Suivez d’abord le guide de migration de Capacitor :

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## Installer

`npm i @capgo/capacitor-updater@5`

`Then sync the native code update:`

`npx cap sync`

C'est ça ! Assez facile !

## Mode manuel

Si vous obteniez vous-même la mise à jour avec getLatest, il y a un petit changement.
Maintenant, si vous êtes déjà à jour, cela ira dans Catch.
Toute réponse différente de la mise à jour disponible le fera.
