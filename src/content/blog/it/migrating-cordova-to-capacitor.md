---
slug: migrating-cordova-to-capacitor
title: 'Migrazione di un''App Web da Cordova a Capacitor: Una Guida Passo-Passo'
description: >-
  Questa guida passo-passo ti aiuterà a migrare la tua app web da Cordova a
  Capacitor, coprendo tutte le sezioni e rendendola facile da leggere e seguire.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2025-10-30T15:06:44.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Illustrazione della migrazione da Cordova a Capacitor
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: it
next_blog: ''
---
# Migrazione di un'App Web da Cordova a Capacitor: Una Guida Passo dopo Passo

Questa guida ti aiuterà a migrare la tua app web da Cordova a Capacitor, rendendola facile da leggere e seguire. Copriremo tutte le sezioni e forniremo un approccio passo dopo passo.

## Introduzione a Cordova e Capacitor

Cordova e Capacitor sono entrambi strumenti che permettono agli sviluppatori web di creare applicazioni native per varie piattaforme utilizzando HTML, CSS e JavaScript. Mentre condividono delle similitudini, ci sono differenze chiave nel loro approccio alla gestione dei progetti nativi, alla gestione dei plugin e alla gestione CLI/versioni.

## Strategia di Migrazione

La migrazione da Cordova a Capacitor può essere fatta gradualmente o come sostituzione completa, a seconda della complessità della tua app. Capacitor è retrocompatibile con Cordova, permettendoti di passare le tue app web esistenti quando sei pronto.

Per assistere nella migrazione, considera l'utilizzo della [Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) e l'audit dei tuoi plugin Cordova esistenti. Puoi continuare a utilizzare i plugin Cordova se necessario, o sostituirli con equivalenti Capacitor.

## Guida alla Migrazione Passo dopo Passo

Segui questi passaggi per migrare la tua app web da Cordova a Capacitor:

1. **Lavora in un ramo di codice separato**: Si raccomanda di lavorare in un ramo di codice separato quando si applicano queste modifiche.

2. **Inizializza la tua app con Capacitor**: Apri il tuo progetto nel terminale e segui le guide per [aggiungere Capacitor a un'app web](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) o [aggiungere Capacitor a un'app Ionic](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Usa le informazioni dal tuo file `config.xml` di Cordova per il nome dell'app e l'ID Bundle.

3. **Compila la tua app web**: Compila il tuo progetto web almeno una volta prima di aggiungere piattaforme native. Questo assicura che la cartella `www` sia configurata correttamente nel file di configurazione Capacitor.

4. **Aggiungi piattaforme**: Esegui `npx cap add ios` e `npx cap add android` per aggiungere le piattaforme iOS e Android. Questo creerà cartelle di progetto native separate alla radice del tuo progetto.

5. **Genera icone e schermate di avvio**: Se hai immagini esistenti per icone e schermate di avvio, usa lo strumento `cordova-res` per generarle e copiarle nei progetti nativi.

6. **Audit e migrazione dei plugin Cordova esistenti**: Rivedi i tuoi plugin Cordova esistenti e sostituiscili con equivalenti Capacitor se possibile. Rimuovi i plugin non necessari.

7. **Rimuovi plugin Cordova**: Dopo aver sostituito o rimosso un plugin Cordova, disinstalla il plugin ed esegui `npx cap sync` per rimuovere il codice del plugin dal progetto nativo.

8. **Applica permessi aggiuntivi**: Mappa tra `plugin.xml` e le impostazioni richieste su iOS e Android per applicare i permessi necessari.

9. **Configura preferenze**: Aggiungi manualmente le preferenze da `config.xml` al file di configurazione Capacitor.

10. **Gestisci configurazioni specifiche per piattaforma**: Configura gli elementi da `config.xml` per ogni piattaforma (iOS e Android) secondo necessità.

11. **Cambia lo schema per servire i contenuti**: Se necessario, cambia lo schema utilizzato per servire i contenuti nella tua app per evitare perdite di dati.

12. **Testa e rimuovi Cordova**: Testa la tua app migrata per assicurarti che tutte le modifiche siano state applicate correttamente. Una volta soddisfatto, puoi rimuovere Cordova dal tuo progetto o lasciarlo se prevedi di continuare a utilizzare i plugin Cordova.

Congratulazioni! Hai migrato con successo la tua app web da Cordova a Capacitor. Per saperne di più sull'utilizzo dei plugin Cordova in un progetto Capacitor o sul flusso di lavoro di sviluppo Capacitor, visita la [documentazione ufficiale di Capacitor](https://capacitorjs.com/docs/).

## Aggiornamenti Live con il Nostro Servizio Capgo

Siamo orgogliosi di offrire Capgo, la nostra soluzione che permette aggiornamenti live per le tue app Capacitor, consentendoti di distribuire aggiornamenti Over-The-Air (OTA) a un prezzo equo. Questa funzionalità è particolarmente utile per fare correzioni rapide, distribuire nuove funzionalità e assicurare che i tuoi utenti abbiano sempre l'ultima versione della tua app senza attendere l'approvazione dell'app store.

### Come Funziona il Nostro Servizio Capgo

Capgo è un servizio basato su cloud che ti permette di distribuire aggiornamenti live alle tue app Capacitor. Consiste in una dashboard web e un SDK nativo che puoi integrare nella tua app. L'SDK controlla gli aggiornamenti all'avvio o a intervalli specifici e li scarica in background. Quando un aggiornamento è disponibile, l'SDK chiederà all'utente di installarlo. Se l'utente accetta, l'aggiornamento verrà installato e applicato immediatamente.

### Vantaggi degli Aggiornamenti Live Capgo

- **Aggiornamenti più veloci:** Distribuisci aggiornamenti istantaneamente senza attendere l'approvazione dell'app store.
- **Ridotta dipendenza dall'Apple Store:** Bypassa restrizioni e limitazioni dell'app store.
- **Esperienza utente migliorata:** Mantieni gli utenti coinvolti con le ultime funzionalità e correzioni di bug senza richiedere loro di aggiornare manualmente l'app.

### Come Implementare gli Aggiornamenti Live Capgo

Per implementare gli aggiornamenti live Capgo nel tuo progetto Capacitor, segui questi passaggi:
- Registrati per un [account Capgo](https://console.capgo.app/).
- Installa l'SDK Capgo nel tuo progetto.
- Configura la tua app per controllare gli aggiornamenti all'avvio o a intervalli specifici.
- Distribuisci aggiornamenti alla tua app utilizzando la dashboard Capgo.

## Conclusione

Speriamo che questa guida ti abbia aiutato a migrare la tua app web da Cordova a Capacitor. Se hai domande o hai bisogno di assistenza con il processo di migrazione, non esitare a contattarci sul nostro server [discord](https://discord.capgo.app).
