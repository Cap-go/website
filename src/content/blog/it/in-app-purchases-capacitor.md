---
slug: in-app-purchases-capacitor
title: Acquisti in-app per Capacitor
description: >-
  How to implement in-app purchases for Capacitor applications using the
  Capacitor Purchases plugin and RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Revenue Cat アプリ内課金
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: ''
---

>> Questo plugin è stato trasferito al repository ufficiale RevenueCat. Per maggiori informazioni consulta la [documentazione ufficiale](https://www.revenuecat.com/docs/getting-started/installation/capacitor)

Capacitor Purchases è un plugin per il framework Capacitor che permette gli acquisti in-app su iOS e Android. Fornisce un'API semplice e coerente su più piattaforme, rendendo facile per gli sviluppatori implementare abbonamenti e acquisti in-app nelle loro app mobili.

Una delle caratteristiche principali del plugin Capacitor Purchases è l'integrazione con RevenueCat, una piattaforma che fornisce strumenti per abbonamenti e acquisti in-app. RevenueCat semplifica il processo di implementazione di abbonamenti e acquisti in-app fornendo un'API semplice e coerente su più piattaforme e automatizzando attività come la convalida delle ricevute e la gestione degli utenti.

Con RevenueCat, gli sviluppatori possono gestire facilmente gli abbonamenti, tracciare i ricavi e svolgere altre attività correlate. Alcune funzionalità offerte da RevenueCat includono:

- Convalida automatica delle ricevute
- Gestione degli utenti
- Supporto per modelli di prezzo personalizzati
- Analisi dettagliate
- Scalabilità

Utilizzando il plugin Capacitor Purchases con RevenueCat, gli sviluppatori possono risparmiare tempo e fatica nell'implementazione di abbonamenti e acquisti in-app nelle loro app mobili e fornire funzionalità aggiuntive che possono aiutare a migliorare l'esperienza utente e aumentare i ricavi.

Utilizzando il plugin Capacitor Purchases e RevenueCat, gli sviluppatori possono gestire e tracciare facilmente abbonamenti e acquisti in-app, convalidare le ricevute e gestire gli utenti su più piattaforme. Permette anche di creare modelli di prezzo personalizzati e ottenere analisi dettagliate per migliorare le prestazioni e i ricavi.

## Installazione

Assicurati di utilizzare l'ultima versione di Capacitor e del plugin Capacitor Purchases. Puoi verificare l'ultima versione di Capacitor e del plugin Capacitor Purchases sul sito web di Capacitor.

Per installare il plugin Capacitor Purchases, esegui il seguente comando:
`npm i @capgo/capacitor-purchases`
aggiungi il plugin al codice nativo della tua app
`npx cap sync`

aggiungi la capacità di acquisti in-app in Xcode:

![Xcode step 1](/iap_step1.webp)
poi
![xcode step 2](/iap_step2.webp)

## 1. Crea un Account RevenueCat
Questa guida ti mostrerà come iniziare con gli abbonamenti e l'SDK di RevenueCat con solo poche righe di codice.

Registrati per un nuovo account RevenueCat [qui](https://app.revenuecat.com/)

> ### 📘
> 
> 💡 Ecco un consiglio!
> 
> RevenueCat consiglia di creare un account RevenueCat separato per ogni app/progetto che hai, specialmente se hai intenzione di vendere l'app. Questo velocizzerà il processo di trasferimento, poiché potrai trasferire l'intero account invece di attendere che il Supporto RevenueCat trasferisca i singoli progetti.

### Organizzazioni / Enterprise

Raccomandiamo di utilizzare un account aziendale quando ti registri a RevenueCat e configuri la tua app all'interno di un progetto. Potrai invitare il resto del tuo team come [collaboratori](https://www.revenuecat.com/docs/collaborators/) al tuo progetto, ma **solo il proprietario del progetto può gestire la fatturazione**. I collaboratori del progetto non possono gestire i dettagli di fatturazione.

## 2. Configurazione del Progetto e dell'App

### ▶️ Crea un Progetto

Naviga nella dashboard di RevenueCat e [aggiungi un nuovo progetto](https://app.revenuecat.com/overview/) dal menu a tendina nella barra di navigazione superiore chiamato _Projects_.

![RevenueCat step 1](/revenuecat_step1.webp)

Il modal popup per la creazione di un nuovo Progetto

### ▶️ Aggiungi un'App / Piattaforma

Da **Project Settings > Apps** nel menu a sinistra della dashboard del progetto, seleziona la piattaforma per l'app che aggiungerai.

![RevenueCat step 2](/revenuecat_step2.webp)

Dashboard del progetto per selezionare la piattaforma dell'app

Il campo **Nome app** è richiesto per aggiungere la tua app a RevenueCat. Gli altri campi di configurazione possono essere aggiunti successivamente. Per effettuare acquisti di test e di produzione, devono essere configurati l'ID Bundle (iOS) / Nome Pacchetto (Android) e il Segreto Condiviso (iOS) / Credenziali di Servizio (Android).![RevenueCat step 3](/revenuecat_step3webp)

Pagina di configurazione dell'app per un'app dell'App Store Apple

> ### 📘
> 
> 💡 Ecco un suggerimento!
> 
> Dopo aver registrato la tua app, RevenueCat consiglia di configurare le [Notifiche Server della Piattaforma](https://wwwrevenuecatcom/docs/server-notifications/) Queste notifiche non sono obbligatorie, ma velocizzeranno i [webhook](https://wwwrevenuecatcom/docs/webhooks/) e i tempi di consegna dell'integrazione e ridurranno i tempi di latenza nell'aggiornamento dei tuoi abbonati

> ### 📘
> 
> App e utenti di Staging vs Produzione
> 
> RevenueCat stesso non ha ambienti separati per staging e produzione Piuttosto, le transazioni sottostanti per gli utenti sono differenziate tra sandbox e produzione
> 
> Qualsiasi app RevenueCat può effettuare acquisti sia sandbox che di produzione dai negozi Se hai app separate per staging e produzione, puoi creare più progetti in RevenueCat per rispecchiare la tua configurazione
> 
> Inoltre, gli utenti non sono separati per ambiente Lo stesso utente può avere acquisti sandbox attivi e acquisti di produzione attivi contemporaneamente

### ▶️ Credenziali di Servizio

Le credenziali di servizio devono essere configurate affinché RevenueCat possa comunicare con gli app store per tuo conto Consulta le guide RevenueCat [Segreto Condiviso App Store Connect](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Credenziali Servizio Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) e [Segreto Condiviso Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) per maggiori informazioni

Nota che le credenziali del servizio Play possono richiedere fino a 36 ore per propagarsi attraverso i server di Google

## 3. Configurazione Prodotti

### ▶️ Configurazione Store

Prima di poter iniziare a utilizzare RevenueCat per recuperare i prodotti, devi configurare i tuoi prodotti nei rispettivi store Consulta le seguenti guide per [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) e [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) per aiutarti a navigare in questo processo

Se stai vendendo prodotti iOS, assicurati di firmare il tuo 'Accordo Applicazioni a Pagamento' e compilare le informazioni bancarie e fiscali in **App Store Connect > Accordi, Fisco e Bancario** **Questo deve essere completato prima di poter testare qualsiasi acquisto**

> ### 📘
> 
> Vuoi saltare la configurazione dello store durante i test?
> 
> Su iOS, puoi ritardare la configurazione dei prodotti in App Store Connect testando invece con i file di Configurazione StoreKit Questi file di configurazione richiedono una configurazione minima e sono configurabili direttamente tramite Xcode
> 
> Leggi di più sulla configurazione dei file StoreKit Configuration nella guida [Test Sandbox](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) di RevenueCat

### ▶️ Configura Prodotti e Diritti in RevenueCat

Una volta che i tuoi prodotti in-app sono stati configurati in [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) o [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), dovrai copiare quella configurazione nella dashboard RevenueCat RevenueCat utilizza un sistema di Diritti per controllare l'accesso alle funzionalità premium e Offerte per gestire l'insieme di prodotti che offri ai clienti

I Diritti sono il livello di accesso a cui un cliente ha "diritto" dopo aver acquistato un prodotto specifico
Le Offerte sono un modo semplice per organizzare i prodotti in-app che desideri "offrire" nel tuo paywall e configurarli da remoto RevenueCat **raccomanda** di utilizzare queste funzionalità per semplificare il tuo codice e permetterti di cambiare i prodotti senza rilasciare un aggiornamento dell'app

Consulta [Configurazione Prodotti](https://wwwrevenuecatcom/docs/entitlements/) per configurare i tuoi prodotti e organizzarli in Offerte o Diritti