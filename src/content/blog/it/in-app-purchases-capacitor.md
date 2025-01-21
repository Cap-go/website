---
slug: it__in-app-purchases-capacitor
title: Acquisti in-app per Capacitor
description: >-
  Come implementare gli acquisti in-app per un'applicazione Capacitor
  utilizzando il plugin Capacitor Purchases e RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Acquisti in-app con Revenue Cat
tag: Tutorial
published: true
locale: it
next_blog: ''
---

Capacitor Purchases è un plugin per il framework Capacitor che consente gli acquisti in-app su iOS e Android. Fornisce un'API semplice e coerente su più piattaforme, facilitando agli sviluppatori l'implementazione di abbonamenti e acquisti in-app nelle loro app mobili.

Una delle caratteristiche principali del plugin Capacitor Purchases è l'integrazione con RevenueCat, una piattaforma che fornisce strumenti per abbonamenti e acquisti in-app. RevenueCat semplifica il processo di implementazione di abbonamenti e acquisti in-app fornendo un'API semplice e coerente su più piattaforme, e automatizzando attività come la convalida delle ricevute e la gestione degli utenti.

Con RevenueCat, gli sviluppatori possono facilmente gestire gli abbonamenti, tracciare le entrate e svolgere altri compiti correlati. Alcune funzionalità offerte da RevenueCat includono:

- Convalida automatica delle ricevute
- Gestione degli utenti
- Supporto per modelli di prezzo personalizzati
- Analisi dettagliate
- Scalabilità

Utilizzando il plugin Capacitor Purchases con RevenueCat, gli sviluppatori possono risparmiare tempo e fatica nell'implementare abbonamenti e acquisti in-app nelle loro app mobili, e fornire funzionalità aggiuntive che possono aiutare a migliorare l'esperienza utente e aumentare le entrate.

Utilizzando il plugin Capacitor Purchases e RevenueCat, gli sviluppatori possono facilmente gestire e tracciare abbonamenti e acquisti in-app, convalidare le ricevute e gestire gli utenti su più piattaforme. Consente inoltre di creare modelli di prezzo personalizzati e ottenere analisi dettagliate per migliorare le prestazioni e le entrate.

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

## 1. Crea un account RevenueCat
Questa guida ti mostrerà come iniziare con gli abbonamenti e l'SDK di RevenueCat con solo poche righe di codice.

Registrati per un nuovo account RevenueCat [qui](https://app.revenuecat.com/).

> ### 📘
> 
> 💡 Ecco un consiglio!
> 
> RevenueCat consiglia di creare un account RevenueCat separato per ogni app / progetto che hai, specialmente se hai intenzione di vendere l'app in futuro. Questo velocizzerà il processo di trasferimento, poiché potrai trasferire l'intero account anziché attendere che il supporto RevenueCat trasferisca i singoli progetti.

### Organizzazioni / Imprese

Consigliamo di utilizzare un account aziendale quando ti registri a RevenueCat e configuri la tua app all'interno di un progetto. Potrai invitare il resto del tuo team come [collaboratori](https://www.revenuecat.com/docs/collaborators/) al tuo progetto, ma **solo il proprietario del progetto può gestire la fatturazione**. I collaboratori del progetto non possono gestire i dettagli di fatturazione.

## 2. Configurazione del progetto e dell'app

### ▶️ Crea un progetto

Naviga nella dashboard di RevenueCat e [aggiungi un nuovo progetto](https://app.revenuecat.com/overview/) dal menu a tendina nella barra di navigazione superiore chiamato _Progetti_.

![RevenueCat step 1](/revenuecat_step1.webp)

La finestra modale per creare un nuovo progetto

### ▶️ Aggiungi un'app / piattaforma

Da **Impostazioni progetto > App** nel menu a sinistra della dashboard del progetto, seleziona la piattaforma per l'app che aggiungerai.

![RevenueCat step 2](/revenuecat_step2.webp)

Dashboard del progetto per selezionare la piattaforma dell'app

Il campo **Nome app** è richiesto per aggiungere la tua app a RevenueCat. Il resto dei campi di configurazione può essere aggiunto successivamente. Per effettuare acquisti di test e di produzione, devono essere configurati l'ID Bundle (iOS) / Nome pacchetto (Android) e il Segreto condiviso (iOS) / Credenziali di servizio (Android).

![RevenueCat step 3](/revenuecat_step3webp)

Pagina di configurazione dell'app per un'app dell'App Store Apple

> ### 📘
> 
> 💡 Ecco un consiglio!
> 
> Dopo aver registrato la tua app, RevenueCat consiglia di configurare le [Notifiche del server della piattaforma](https://wwwrevenuecatcom/docs/server-notifications/) Queste notifiche non sono obbligatorie, ma accelereranno i tempi di consegna dei [webhook](https://wwwrevenuecatcom/docs/webhooks/) e dell'integrazione e ridurranno il tempo di latenza nell'aggiornamento dei tuoi abbonati

> ### 📘
> 
> App e utenti di staging vs produzione
> 
> RevenueCat stesso non ha ambienti separati per staging e produzione Piuttosto, le transazioni sottostanti per gli utenti sono differenziate per sandbox e produzione
> 
> Qualsiasi app RevenueCat può effettuare acquisti sia sandbox che di produzione dagli store Se hai app separate per staging e produzione, puoi creare più progetti in RevenueCat per rispecchiare la tua configurazione
> 
> Inoltre, gli utenti non sono separati per ambiente Lo stesso utente può avere acquisti sandbox attivi e acquisti di produzione attivi allo stesso tempo


### ▶️ Credenziali di servizio

Le credenziali di servizio devono essere configurate affinché RevenueCat possa comunicare con gli app store per tuo conto Consulta le guide RevenueCat [Segreto condiviso di App Store Connect](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Credenziali di servizio Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) e [Segreto condiviso di Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) per maggiori informazioni

Nota che le credenziali di servizio play possono richiedere fino a 36 ore per propagarsi attraverso i server di Google

## 3 Configurazione del prodotto

### ▶️ Configurazione dello store

Prima di poter iniziare a utilizzare RevenueCat per recuperare i prodotti, devi configurare i tuoi prodotti nei rispettivi store Consulta le seguenti guide per [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) e [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) per aiutarti a navigare attraverso questo processo

Se stai vendendo prodotti iOS, assicurati di firmare il tuo 'Accordo per le applicazioni a pagamento' e compilare le tue informazioni bancarie e fiscali in **App Store Connect > Accordi, imposte e bancarie** **Questo deve essere completato prima di poter testare qualsiasi acquisto**

> ### 📘
> 
> Vuoi saltare la configurazione dello store durante i test?
> 
> Su iOS, puoi ritardare la configurazione dei prodotti in App Store Connect testando invece con i file di configurazione StoreKit Questi file di configurazione richiedono una configurazione minima e sono configurabili direttamente tramite Xcode
> 
> Leggi di più sulla configurazione dei file di configurazione StoreKit nella guida [Test sandbox](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) di RevenueCat

### ▶️ Configurare prodotti e diritti in RevenueCat

Una volta che i tuoi prodotti in-app sono stati configurati in [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) o [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), dovrai copiare quella configurazione nella dashboard di RevenueCat RevenueCat utilizza un sistema di 'Diritti' per controllare l'accesso alle funzionalità premium e Offerte per gestire l'insieme di prodotti che offri ai clienti

I Diritti sono il livello di accesso a cui un cliente ha "diritto" dopo aver acquistato un prodotto specifico
Le Offerte sono un modo semplice per organizzare i prodotti in-app che desideri "offrire" sul tuo paywall e configurarli da remoto RevenueCat **raccomanda** di utilizzare queste funzionalità per semplificare il tuo codice e consentirti di cambiare i prodotti senza rilasciare un aggiornamento dell'app

Consulta [Configurazione dei prodotti](https://wwwrevenuecatcom/docs/entitlements/) per configurare i tuoi prodotti e quindi organizzarli in Offerte o Diritti

![RevenueCat passo 4](/revenuecat_step4webp)

## 4Utilizzo dell'SDK Purchases di RevenueCat

L'SDK di RevenueCat implementa in modo trasparente acquisti e abbonamenti su diverse piattaforme, sincronizzando i token con il server di RevenueCat.

In caso di problemi con l'SDK, consulta la [Risoluzione dei problemi degli SDK](https://www.revenuecat.com/docs/troubleshooting-the-sdks/) per assistenza.

> ### 📘
> 
> Usa solo la tua chiave SDK pubblica per configurare Purchases
> 
> Puoi ottenere la tua chiave SDK pubblica dalla scheda **Chiavi API** in **Impostazioni progetto** nella dashboard.

Dovresti configurare l'istanza condivisa di _Purchases_ solo una volta, di solito all'avvio dell'app. Successivamente, la stessa istanza viene condivisa in tutta l'app accedendo all'istanza `shared` nell'SDK.

Consulta la guida di RevenueCat sulla [Configurazione dell'SDK](https://docs.revenuecat.com/docs/configuring-sdk/) per ulteriori informazioni e best practice.

Assicurati di configurare _Purchases_ solo con la tua chiave SDK pubblica. Puoi leggere di più sulle diverse chiavi API disponibili in RevenueCat nella [guida all'autenticazione](https://www.revenuecat.com/docs/authentication/).

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

Durante lo sviluppo, RevenueCat consiglia di abilitare log di debug più dettagliati. Per ulteriori informazioni su questi log, consulta la loro guida al [Debugging](https://www.revenuecat.com/docs/debugging/).

Se prevedi di utilizzare RevenueCat insieme al tuo codice di acquisto esistente, fai riferimento alla loro guida sulla [Modalità Osservatore](https://www.revenuecat.com/docs/observer-mode/).

> ### 📘
> 
> Configurazione di Purchases con ID utente
> 
> Se disponi di un sistema di autenticazione utente nella tua app, puoi fornire un identificatore utente al momento della configurazione o in un secondo momento con una chiamata a `logIn()`. Per saperne di più, consulta la guida di RevenueCat sull'[Identificazione degli utenti](https://www.revenuecat.com/docs/user-ids/).

L'SDK recupererà automaticamente le [Offerte configurate](https://www.revenuecat.com/docs/entitlements/#offerings) e recupererà le informazioni sul prodotto da Apple, Google o Amazon. Pertanto, i prodotti disponibili saranno già caricati quando i clienti avvieranno la tua schermata di acquisto.

Di seguito è riportato un esempio di recupero delle Offerte. Puoi utilizzare le Offerte per organizzare la tua schermata di paywall. Consulta la guida di RevenueCat sulla [Visualizzazione dei prodotti](https://www.revenuecat.com/docs/displaying-products/) per ulteriori informazioni e best practice.

### ▶️ Recupera e visualizza i prodotti disponibili

> ### 📘
> 
> Configurazione di Purchases con ID utente
> 
> Se disponi di un sistema di autenticazione utente nella tua app, puoi fornire un identificatore utente al momento della configurazione o in un secondo momento con una chiamata a `logIn()`. Per saperne di più, consulta la guida di RevenueCat sull'[Identificazione degli utenti](https://www.revenuecat.com/docs/user-ids/).

L'SDK recupererà automaticamente le [Offerte configurate](https://www.revenuecat.com/docs/entitlements/#offerings) e recupererà le informazioni sul prodotto da Apple, Google o Amazon. Pertanto, i prodotti disponibili saranno già caricati quando i clienti avvieranno la tua schermata di acquisto.

Di seguito è riportato un esempio di recupero delle Offerte. Puoi utilizzare le Offerte per organizzare la tua schermata di paywall. Consulta la guida di RevenueCat sulla [Visualizzazione dei prodotti](https://www.revenuecat.com/docs/displaying-products/) per ulteriori informazioni e best practice.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Se il recupero delle tue [Offerte](https://www.revenuecat.com/docs/entitlements/#offerings), [prodotti](https://www.revenuecat.com/docs/entitlements/#products) o [pacchetti](https://www.revenuecat.com/docs/entitlements/#adding-packages) disponibili è vuoto, è dovuto a qualche problema di configurazione nel rispettivo store.

Le ragioni più comuni per questo nell'App Store Connect sono un "Accordo per le applicazioni a pagamento" non aggiornato o prodotti non almeno nello stato "Pronto per l'invio". In GooglePlay questo di solito si verifica quando l'app non è pubblicata su una traccia chiusa e non è stato aggiunto un utente di test valido.

Puoi trovare ulteriori informazioni sulla risoluzione di questo problema nel [Centro assistenza](https://support.revenuecat.com/hc/en-us/articles/360041793174/) di RevenueCat.

### ▶️ Effettua un acquisto

L'SDK include un metodo semplice per facilitare gli acquisti.Il metodo `purchase:package` prende un pacchetto dall'Offerta recuperata ed elabora la transazione con il rispettivo app store.

L'esempio di codice sottostante mostra il processo di acquisto di un pacchetto e la conferma che sblocca il contenuto "your_entitlement_id". Maggiori dettagli sul metodo `purchase:package` si possono trovare nella guida RevenueCat su [Effettuare Acquisti](https://wwwrevenuecatcom/docs/making-purchases/)

### ▶️ Controllare lo Stato dell'Abbonamento

Puoi usare questo metodo ogni volta che hai bisogno di ottenere lo stato più recente, ed è sicuro chiamarlo ripetutamente durante il ciclo di vita della tua app. _Purchases_ memorizza automaticamente nella cache le ultime informazioni del `CustomerInfo` ogni volta che si aggiorna - quindi nella maggior parte dei casi, questo metodo attinge dalla cache ed è molto veloce.

È tipico chiamare questo metodo quando si decide quale UI mostrare all'utente, e ogni volta che l'utente esegue un'azione che richiede un certo livello di diritti.

> ### 📘
> 
> 💡 Ecco un suggerimento!
> 
> Puoi accedere a molte più informazioni su un abbonamento oltre a sapere semplicemente se è attivo o meno. Consulta la guida RevenueCat su [Stato dell'Abbonamento](https://wwwrevenuecatcom/docs/customer-info/) per sapere se l'abbonamento è impostato per il rinnovo, se c'è un problema rilevato con la carta di credito dell'utente, e altro.

RevenueCat permette ai tuoi utenti di ripristinare i loro acquisti in-app, riattivando qualsiasi contenuto che hanno precedentemente acquistato dallo **stesso account del negozio** (account Apple, Google o Amazon). Raccomandiamo che tutte le app abbiano un modo per gli utenti di attivare il metodo di ripristino. Nota che Apple richiede un meccanismo di ripristino nel caso in cui un utente perda l'accesso ai suoi acquisti (es: disinstallazione/reinstallazione dell'app, perdita delle informazioni dell'account, ecc.)

Se due diversi [App User ID](https://wwwrevenuecatcom/docs/user-ids/) ripristinano transazioni dallo stesso account del negozio sottostante (account Apple, Google o Amazon), RevenueCat potrebbe tentare di creare un alias tra i due App User ID e considerarli come lo stesso utente in futuro. Consulta la guida RevenueCat su [Ripristinare gli Acquisti](https://wwwrevenuecatcom/docs/restoring-purchases/) per maggiori informazioni sui diversi comportamenti di ripristino configurabili.

Poiché l'SDK funziona perfettamente su qualsiasi piattaforma, le modifiche alle informazioni di acquisto di un utente possono provenire da varie fonti. Puoi rispondere a qualsiasi cambiamento nelle `CustomerInfo` di un cliente conformandoti a un metodo delegato opzionale, `purchases:receivedUpdated:`.

Questo metodo si attiverà ogni volta che l'SDK riceve un oggetto `CustomerInfo` aggiornato dalle chiamate a `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, o `restorePurchases()`.

Gli aggiornamenti di CustomerInfo non vengono inviati alla tua app dal backend di RevenueCat, gli aggiornamenti possono avvenire solo da una richiesta di rete in uscita verso RevenueCat, come menzionato sopra.

A seconda della tua app, potrebbe essere sufficiente ignorare il delegato e semplicemente gestire i cambiamenti alle informazioni del cliente la prossima volta che la tua app viene lanciata o nei blocchi di completamento dei metodi SDK.

> ### 👍
> 
> Ce l'hai fatta!
> 
> Hai ora implementato un sistema di acquisto di abbonamenti completo senza passare un mese a scrivere codice server. Congratulazioni!

### App di Esempio

Per scaricare esempi più completi di integrazione dell'SDK, vai alle risorse delle app di esempio di RevenueCat.

**[Visualizza Esempi](https://wwwrevenuecatcom/docs/sample-apps/)**

Pubblicherò presto un'app di esempio usando Capacitor e Vuejs.

Se hai bisogno di un uso più approfondito dell'SDK Capacitor, controlla la documentazione [qui](https://githubcom/Cap-go/capacitor-purchases/)

### Prossimi Passi

- Se non l'hai già fatto, assicurati che i tuoi prodotti siano configurati correttamente controllando la [guida sui diritti](https://wwwrevenuecatcom/docs/entitlements/) di RevenueCat.
- Se vuoi usare i tuoi identificatori utente, leggi come [impostare gli ID utente dell'app](https://wwwrevenuecatcom/docs/user-ids/).
- Se stai passando a RevenueCat da un altro sistema, consulta la guida di RevenueCat sulla [migrazione dei tuoi abbonamenti esistenti](https://wwwrevenuecatcom/docs/migrating-existing-subscriptions/)
-   Una volta che sei pronto a testare la tua integrazione, puoi seguire le guide di RevenueCat su [test e debug](https://wwwrevenuecatcom/docs/debugging/)
-   Se sei idoneo per il Programma per le Piccole Imprese dell'App Store, dai un'occhiata alla guida di RevenueCat su [come fare domanda e informare RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Se hai bisogno di aggiornamenti in tempo reale nella tua app 

Unisciti a noi qui 👇

## Registrati qui per ottenere il tuo account

[Capgo](/register/)