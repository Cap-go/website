---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifiche push Ionic Capacitor con Firebase: Guida passo passo'
description: >-
  Scopri come integrare le notifiche push nella tua applicazione Ionic Capacitor
  utilizzando Firebase, con istruzioni dettagliate per le piattaforme Android e
  iOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifiche push Ionic Capacitor con Firebase
tag: tutorial
published: true
locale: it
next_blog: ''
---

In questo tutorial, integreremo le notifiche push in un'app Ionic Capacitor utilizzando Firebase. Non è necessario un servizio specifico, ma è necessario configurare diverse cose in anticipo. Firebase è un'ottima scelta poiché è richiesto per Android e puoi utilizzarlo facilmente per inviare notifiche senza usare il database.

Per prima cosa, creeremo un'app Ionic con Capacitor abilitato e specificheremo il nostro **package id**, che è l'identificatore univoco per la tua app. Quindi, compileremo l'app e aggiungeremo le piattaforme native.

Se hai già un'app, puoi modificare il **capacitor.config.json** per includere il tuo **appId**. Tuttavia, se le tue cartelle native esistono già, dovrai sostituire l'id in tutti i file in cui appare, poiché Capacitor crea la cartella una sola volta e **non aggiornerà l'id automaticamente**. Nel **capacitor.config.json**, puoi anche specificare opzioni come l'aggiornamento del conteggio dei badge, la riproduzione del suono alla ricezione di una notifica e la visualizzazione di un avviso quando arriva una notifica.

Ora, configuriamo le notifiche push al di fuori dell'app.

## Configurazione Firebase

Inizia [creando un nuovo progetto Firebase](https://firebase.google.com/) o utilizzandone uno esistente. Fornisci un nome e le opzioni predefinite per un nuovo progetto.

Se hai una nuova app, dovresti vedere "Inizia aggiungendo Firebase alla tua app" nella dashboard della tua app. Altrimenti, fai clic sull'icona dell'ingranaggio e vai alle **impostazioni del progetto** per aggiungere un'app.

La finestra di dialogo per iOS e Android è simile, e la cosa importante è utilizzare il tuo **package id** per le app.

Dopo il passaggio iniziale, scarica i seguenti file:

- File **google-services.json** per Android
- File **GoogleService-Info.plist** per iOS

Successivamente, configura le piattaforme.

### Preparazione Push per Android

Per Android, sposta il file **google-services.json** che hai scaricato nella cartella **android/app/**

È tutto per Android. Ora configuriamo iOS.

### Preparazione Push per iOS

Questa parte è più complicata. Innanzitutto, [crea un ID App per la tua app all'interno dell'elenco degli identificatori](https://developer.apple.com/account/resources/identifiers/list/) del tuo account Apple Developer. Assicurati di **selezionare la capacità Push Notifications** dall'elenco.

Il **Bundle ID** dovrebbe essere lo stesso del tuo App ID all'interno di Capacitor e Firebase.

Ora, [crea una Chiave](https://developer.apple.com/account/resources/authkeys/list/) e abilita il **servizio Apple Push Notifications (APNs)**. Se hai raggiunto il numero massimo di chiavi, puoi utilizzare una chiave esistente o un certificato, ma il processo è più complicato.

Dopo aver scaricato il file **p8**, caricalo su Firebase. Apri la scheda **Cloud Messaging** nelle impostazioni del tuo progetto Firebase, carica il file e inserisci i dettagli per l'ID della Chiave e il tuo Team ID da iOS.

Ora, apporta modifiche al tuo progetto Xcode eseguendo:

Copia il file **GoogleService-Info.plist** che hai scaricato da Firebase nel tuo progetto iOS. Trascina il file nel progetto Xcode all'interno della cartella app/app e seleziona **Copia elementi se necessario**.

Successivamente, aggiungi un nuovo Pod per la dipendenza Firebase nel file **ios/App/Podfile**:

Aggiorna la piattaforma nativa con questo comando:

Modifica il codice Swift nativo in **ios/App/App/AppDelegate.swift** per registrarsi con Firebase e restituire il token corretto alla tua app.

Infine, aggiungi la Capability per le Notifiche Push all'interno del tuo progetto Xcode.

Ora, compila la tua app e integra le notifiche push.

## Integrazione delle Notifiche Push in Ionic

Crea un servizio e una nuova pagina nel tuo progetto Ionic:

Aggiorna il routing in **app/app-routing.modulets** per includere la nuova pagina con un id dinamico:

Creare un servizio per gestire le notifiche push in **services/fcmservice.ts**:

Chiamare la funzione `initPush()` in **app/app.component.ts**:

Gestire le informazioni nella pagina dei dettagli in **pages/details/details.page.ts**:

Visualizzare i dettagli in **pages/details/details.page.html**:

Compila l'app, sincronizza le modifiche e distribuiscila sul tuo dispositivo

Ora puoi inviare notifiche push con Firebase

## Invio di notifiche push con Firebase

Ci sono diversi modi per inviare notifiche push con Firebase

### Test su dispositivo specifico

Dopo aver distribuito la tua app su un dispositivo, puoi controllare i log della console per vedere il token dopo la registrazione. Usa questo token per inviare un test mirato di push per confermare che la tua integrazione funziona. In Firebase, vai su **Cloud Messaging** e seleziona **Invia messaggio di prova**. Aggiungi il token del dispositivo dai log.

![firebase-test-push](/firebase-test-push.webp)

Se tutto è configurato correttamente, dovresti vedere una notifica push sul tuo dispositivo.

### Messaggio push con payload

Per testare una notifica push con informazioni aggiuntive, segui la procedura guidata sulla stessa pagina per specificare le informazioni generali e selezionare la piattaforma che desideri targetizzare. Aggiungi **opzioni aggiuntive** per inviare un payload con la tua notifica push.

![firebase-push-payload](/firebase-push-payload.webp)

Nella sezione **Opzioni avanzate**, aggiungi una coppia chiave-valore **Dati personalizzati**. Ad esempio, puoi usare la chiave `detailsId` e un valore a tua scelta. Questi dati verranno utilizzati nell'app per navigare alla pagina dei dettagli con l'id specificato.

Dopo aver inviato la notifica push, la tua app dovrebbe riceverla e visualizzare la pagina dei dettagli con l'id specificato quando la notifica viene toccata.

### Utilizzo dell'API di Firebase

Puoi anche inviare notifiche push programmaticamente utilizzando l'API di Firebase. Per farlo, devi ottenere la **Chiave server** dalle impostazioni del tuo progetto Firebase sotto la scheda **Cloud Messaging**.

Con la chiave server, puoi inviare una richiesta POST all'API di Firebase con il payload richiesto. Ecco un esempio utilizzando Node.js e la libreria `request`:

Sostituisci `YOUR_SERVER_KEY` e `YOUR_DEVICE_TOKEN` con la tua chiave server e token del dispositivo effettivi. Esegui lo script e il tuo dispositivo dovrebbe ricevere la notifica push con il payload personalizzato.

Ecco fatto! Hai integrato con successo le notifiche push nella tua app Ionic Capacitor utilizzando Firebase. Ora puoi inviare notifiche push ai tuoi utenti sia su piattaforme Android che iOS.