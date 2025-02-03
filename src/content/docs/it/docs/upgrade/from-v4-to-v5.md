---
title: Da V4 a V5
description: Come passare dalla V4 alla V5
sidebar:
  order: 2
locale: it
---

## Perché questo aggiornamento

Questa versione principale è qui per seguire la versione principale di Capacitor

Prima segui la guida di migrazione di Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Installazione

`npm i @capgo/capacitor-updater@5`

`Poi sincronizza l'aggiornamento del codice nativo:`

`npx cap sync`

È tutto! Molto facile!

## Modalità manuale

Se stavi ottenendo l'aggiornamento da solo con getLatest, c'è un piccolo cambiamento
Ora se sei già aggiornato andrà nel catch
Qualsiasi risposta diversa da aggiornamento disponibile farà questo