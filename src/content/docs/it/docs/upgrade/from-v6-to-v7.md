---
title: "Da V6 a V7"
locale: it
description: "Una guida dettagliata sulla transizione dalla versione 6 alla versione 7 dell'updater Capgo, delineando i passaggi necessari e le considerazioni per un processo di aggiornamento di successo, garantendo la compatibilità con le ultime funzionalità e miglioramenti di Capacitor."
sidebar:
  order: 2
---

## Perché questo aggiornamento

Questa versione maggiore è qui per seguire la versione maggiore di Capacitor

Prima segui la guida alla migrazione di Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Installazione

`npm i @capgo/capacitor-updater@7`

`Poi sincronizza l'aggiornamento del codice nativo:`

`npx cap sync`

Ecco fatto! Abbastanza facile!

## Migrazione della Crittografia

Se stai usando il metodo di crittografia `key-v1`, dovrai migrare al nuovo sistema di crittografia poiché `key-v1` non è più supportato in V7. [[memory:96112]]

Segui la guida alla migrazione della crittografia qui: [Guida alla Migrazione della Crittografia](/docs/cli/migrations/encryption/)

## Modifiche alla Configurazione

Raccomandiamo di aggiungere le seguenti proprietà nel tuo file `capacitor.config`:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Queste impostazioni dovrebbero aiutare a gestire meglio il plugin e i suoi comportamenti.
