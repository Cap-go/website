---
title: De V4 à V5
description: Comment passer de la V4 à la V5
sidebar:
  order: 2
locale: fr
---

## Pourquoi cette mise à niveau

Cette version majeure est là pour suivre la version majeure de Capacitor

Suivez d'abord le guide de migration de Capacitor:

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## Installation

`npm i @capgo/capacitor-updater@5`

`Puis synchronisez la mise à jour du code natif :`

`npx cap sync`

C'est tout ! Plutôt facile !

## Mode manuel

Si vous obteniez vous-même la mise à jour avec getLatest, il y a un petit changement
Maintenant, si vous êtes déjà à jour, cela ira dans le catch
Toute réponse différente de la mise à jour disponible fera cela