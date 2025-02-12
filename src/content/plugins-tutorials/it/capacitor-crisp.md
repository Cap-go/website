---
locale: it
---

Cantare il pacchetto @capgo/capacitor-crisp

Il pacchetto `@capgo/capacitor-crisp` consente di integrare Crisp, un SDK nativo, nella tua app Capacitor. Fornisce metodi per configurare Crisp, aprire la chat, impostare i dettagli dell'utente, inviare eventi e altro ancora.

Per iniziare con il pacchetto `@capgo/capacitor-crisp`, segui questi passaggi:

## Installazione

1. Apri il terminale e naviga nella directory radice della tua app Capacitor.
2. Esegui il seguente comando per installare il pacchetto:

[[BLOCCO_CODICE]]

## Inizializzare Crisp

Prima di utilizzare uno dei metodi forniti dal pacchetto `@capgo/capacitor-crisp`, devi configurare Crisp con il tuo ID sito web. Aggiungi il seguente codice al tuo progetto:

[[BLOCCO_CODICE]]

Sostituisci `'******-****-****-****-********'` con il tuo effettivo ID sito web Crisp.

### Integrazione iOS

Se stai puntando a iOS, devi aggiungere le seguenti autorizzazioni al file Infoplist della tua app:

- Privacy - Descrizione dell'uso della fotocamera (NSCameraUsageDescription)
- Privacy - Descrizione dell'uso delle aggiunte alla libreria fotografica (NSPhotoLibraryAddUsageDescription)

Assicurati di fornire una descrizione per ogni autorizzazione che spiega perché la tua app ne ha bisogno.

### Integrazione Android

Non sono richiesti ulteriori passaggi per l'integrazione Android.

## Apri la Chat

Per aprire la chat Crisp nella tua app, utilizza il metodo `openMessenger` fornito dal pacchetto `@capgo/capacitor-crisp`. Aggiungi il seguente codice al tuo progetto:

[[BLOCCO_CODICE]]

Questo aprirà la chat Crisp per consentire agli utenti di avviare una conversazione con il tuo team di supporto.

## Funzionalità Aggiuntive

Il pacchetto `@capgo/capacitor-crisp` fornisce diversi altri metodi per personalizzare e interagire con Crisp. Ecco alcuni dei metodi disponibili:

- `setTokenID`: Imposta l'ID token per l'utente.
- `setUser`: Imposta i dettagli dell'utente come soprannome, numero di telefono, email e avatar.
- `pushEvent`: Invia un evento personalizzato a Crisp.
- `setCompany`: Imposta i dettagli dell'azienda, inclusi nome, URL, descrizione, occupazione e geolocalizzazione.
- `setInt`: Imposta un valore intero personalizzato.
- `setString`: Imposta un valore stringa personalizzato.
- `sendMessage`: Invia un messaggio di chat a Crisp.
- `setSegment`: Imposta il segmento per l'utente.
- `reset`: Reimposta la configurazione di Crisp.

Per ulteriori informazioni su questi metodi e i loro parametri, fai riferimento alla documentazione ufficiale del pacchetto `@capgo/capacitor-crisp`.

Ecco fatto! Hai imparato come utilizzare il pacchetto `@capgo/capacitor-crisp` per integrare Crisp nella tua app Capacitor. Goditi una comunicazione fluida con i tuoi utenti attraverso la chat Crisp.