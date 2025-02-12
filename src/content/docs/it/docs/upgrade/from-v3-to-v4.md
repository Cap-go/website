---
title: Da V3 a V4
description: How to upgrade from V3 to V4
sidebar:
  order: 3
locale: it
---

## Perché questo aggiornamento

Dopo molte discussioni nella community Discord con voi ho scoperto che la modalità manuale era troppo manuale e non sicura da usare, per esempio, il ripristino automatico non era possibile, quindi se l'aggiornamento falliva in modalità manuale l'utente doveva rimuovere l'app e reinstallarla, il che è una terribile esperienza utente

Nel frattempo, ho colto questa opportunità per darvi più libertà e rimuovere tutto il codice mal fatto

## Installazione

`npm i @capgo/capacitor-updater@4`

## Auto-aggiornamento cloud

Se usi l'esempio base nella tua app, puoi migrare in sicurezza alla nuova versione, buon divertimento!

## Auto-aggiornamento self-hosted

Per te, ancora semplice, i cambiamenti sono:

* Il nome dell'impostazione da `autoUpdateUrl` a `updateUrl`
* Il metodo dell'endpoint è cambiato da `GET` a `POST`

## Utenti manuali

Per voi, questo è il cambiamento più significativo, ma per il meglio! Ottenete tonnellate di miglioramenti, leggete attentamente

## Cambiamenti

* `autoUpdateUrl` diventa `updateUrl` dato che questa impostazione può essere usata anche in modalità manuale ora
* Eliminazione di `cancelDelay` e `delayUpdate` in favore di `setDelay`
* Non più `versionName` in set
* Cambio della chiave `version`, che veniva restituita nella maggior parte delle funzioni all'oggetto `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Rinominati i nomi fuorvianti (anche se la spiegazione non può essere chiara, ma nell'uso è facile capire il nuovo):
  * quello che era chiamato `version` ora si riferisce a un `bundle`
  * `id` si riferisce alla vecchia `version` che era una stringa casuale di 10 caratteri, questo `id` è l'unico modo affidabile e univoco per accedere ai tuoi bundle, esempio `7Dfcd2RedN`
  * `version` si riferisce ora al `versionName` che scegli per un bundle, esempio `100`
* `updateUrl` passa da `get` a `post`, poiché gli header personalizzati erano un problema per alcuni di voi e post è più logico, tutti i precedenti header vanno nel body e il prefisso `cap_` scompare
* Il metodo `versionName` è eliminato, in favore di `getId`
* list restituisce ora una lista di `BundleInfo`
* Rinomina `getId` in `getDeviceId`
* `autoUpdate` diventa true di default, se usi la modalità Manual, impostalo su false

## Novità

* Metodo `getLatest`, questo metodo ti permette di ottenere dal tuo server impostato con `updateUrl` l'ultima versione disponibile
* Metodo `setDelay` che prende `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` come argomento per impostare il ritardo per diverse modalità
* Metodo `next`, per impostare la versione al prossimo backgrounding, in opposizione a `set` che lo fa istantaneamente
* Metodo `isAutoUpdateEnabled`, per farti sapere se sei in un contesto di auto-aggiornamento
* Evento `downloadComplete` quando il download raggiunge il 100%
* Aggiunto campo obbligatorio `version` nel metodo download
* `notifyAppReady` diventa obbligatorio anche in modalità manuale, se non viene chiamato dopo 10 secondi l'app torna alla versione precedente

## Collaboratori

[@lincolnthree](https://githubcom/lincolnthree/) Grazie mille per aver iniziato questo lavoro, era impossibile far funzionare questo aggiornamento senza di te