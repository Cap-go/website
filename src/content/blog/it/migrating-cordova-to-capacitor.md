---
slug: it__migrating-cordova-to-capacitor
title: 'Migrazione dell''applicazione web Cordova a Capacitor: Una guida passo passo'
description: >-
  Questa guida passo-passo ti aiuta a migrare la tua applicazione web Cordova a
  Capacitor, coprendo tutte le parti ed essendo facile da leggere e seguire.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Illustrazione della migrazione da Cordova a Capacitor
tag: Migration
published: true
locale: it
next_blog: ''
---

# Migrazione di un'App Web che Utilizza Cordova a Capacitor: Una Guida Passo-Passo

Questa guida ti aiuterà a migrare la tua app web da Cordova a Capacitor, rendendola facile da leggere e seguire. Copriremo tutte le sezioni e forniremo un approccio passo-passo.

## Introduzione a Cordova e Capacitor

Cordova e Capacitor sono entrambi strumenti che permettono agli sviluppatori web di creare applicazioni native per varie piattaforme utilizzando HTML, CSS e JavaScript. Mentre condividono somiglianze, ci sono differenze chiave nel loro approccio alla gestione dei progetti nativi, alla gestione dei plugin e alla gestione CLI/versione.

## Strategia di Migrazione

La migrazione da Cordova a Capacitor può essere fatta gradualmente o come sostituzione completa, a seconda della complessità della tua app. Capacitor è retrocompatibile con Cordova, permettendoti di passare le tue app web esistenti ad esso quando sei pronto.

Per assistere con la migrazione, considera di utilizzare l'Estensione Ionic VS Code e di effettuare un audit dei tuoi plugin Cordova esistenti. Puoi continuare ad utilizzare i plugin Cordova se necessario, o sostituirli con equivalenti Capacitor.

## Guida Passo-Passo alla Migrazione

Segui questi passaggi per migrare la tua app web da Cordova a Capacitor:

1. **Lavora in un ramo di codice separato**: Si consiglia di lavorare in un ramo di codice separato quando si applicano queste modifiche.

2. **Inizializza la tua app con Capacitor**: Apri il tuo progetto nel terminale e segui le guide per aggiungere Capacitor a un'app web o aggiungere Capacitor a un'app Ionic. Utilizza le informazioni dal tuo file `config.xml` di Cordova per il nome dell'app e l'ID del Bundle.

3. **Costruisci la tua app web**: Costruisci il tuo progetto web almeno una volta prima di aggiungere qualsiasi piattaforma nativa. Questo assicura che la cartella `www` sia configurata correttamente nel file di configurazione di Capacitor.

4. **Aggiungi piattaforme**: Esegui `npx cap add ios` e `npx cap add android` per aggiungere le piattaforme iOS e Android. Queste creeranno cartelle di progetto native separate alla radice del tuo progetto.

5. **Genera icone e schermate di avvio**: Se hai immagini di icone e schermate di avvio esistenti, usa lo strumento `cordova-res` per generarle e copiarle nei progetti nativi.

6. **Audit e migrazione dei plugin Cordova esistenti**: Rivedi i tuoi plugin Cordova esistenti e sostituiscili con equivalenti Capacitor se possibile. Rimuovi eventuali plugin non necessari.

7. **Rimuovi plugin Cordova**: Dopo aver sostituito o rimosso un plugin Cordova, disinstalla il plugin ed esegui `npx cap sync` per rimuovere il codice del plugin dal progetto nativo.

8. **Applica autorizzazioni aggiuntive**: Mappa tra `plugin.xml` e le impostazioni richieste su iOS e Android per applicare eventuali autorizzazioni necessarie.

9. **Configura le preferenze**: Aggiungi manualmente le preferenze da `config.xml` al file di configurazione di Capacitor.

10. **Gestisci configurazioni specifiche per piattaforma**: Configura gli elementi da `config.xml` per ciascuna piattaforma (iOS e Android) secondo necessità.

11. **Cambia lo schema per servire i contenuti**: Se necessario, cambia lo schema utilizzato per servire i contenuti nella tua app per evitare la perdita di dati.

12. **Testa e rimuovi Cordova**: Testa la tua app migrata per assicurarti che tutte le modifiche siano state applicate correttamente. Una volta soddisfatto, puoi rimuovere Cordova dal tuo progetto o lasciarlo se prevedi di continuare a utilizzare plugin Cordova.

Congratulazioni! Hai migrato con successo la tua app web da Cordova a Capacitor. Per saperne di più sull'utilizzo dei plugin Cordova in un progetto Capacitor o sul flusso di lavoro di sviluppo di Capacitor, visita la documentazione ufficiale di Capacitor.

## Aggiornamenti in Tempo Reale con il Nostro Servizio Capgo

Siamo orgogliosi di offrire Capgo, la nostra soluzione che consente aggiornamenti in tempo reale per le tue app Capacitor, permettendoti di fornire aggiornamenti Over-The-Air (OTA) a un prezzo equo.Questa funzionalità è particolarmente utile per apportare correzioni rapide, implementare nuove funzionalità e garantire che gli utenti abbiano sempre l'ultima versione della tua app senza dover attendere l'approvazione dell'app store.

### Come funziona il nostro servizio Capgo

Capgo è un servizio basato su cloud che consente di implementare aggiornamenti in tempo reale alle tue app Capacitor. È composto da una dashboard web e un SDK nativo che puoi integrare nella tua app. L'SDK controlla gli aggiornamenti all'avvio o a intervalli specifici e li scarica in background. Quando è disponibile un aggiornamento, l'SDK chiederà all'utente di installarlo. Se l'utente accetta, l'aggiornamento verrà installato e applicato immediatamente.

### Vantaggi degli aggiornamenti in tempo reale di Capgo

- **Aggiornamenti più rapidi:** Implementa aggiornamenti istantaneamente senza attendere l'approvazione dell'app store
- **Ridotta dipendenza dall'Apple Store:** Aggira le restrizioni e le limitazioni dell'app store
- **Migliore esperienza utente:** Mantieni gli utenti coinvolti con le ultime funzionalità e correzioni di bug senza richiedere loro di aggiornare manualmente l'app

### Come implementare gli aggiornamenti in tempo reale di Capgo

Per implementare gli aggiornamenti in tempo reale di Capgo nel tuo progetto Capacitor, segui questi passaggi:
- Registrati per un account Capgo su https://web.capgo.app/
- Installa l'SDK Capgo nel tuo progetto
- Configura la tua app per controllare gli aggiornamenti all'avvio o a intervalli specifici
- Implementa gli aggiornamenti alla tua app utilizzando la dashboard di Capgo

## Conclusione

Speriamo che questa guida ti abbia aiutato a migrare la tua app web da Cordova a Capacitor. Se hai domande o hai bisogno di assistenza con il processo di migrazione, non esitare a contattarci sul nostro server discord https://discord.gg/VnYRvBfgA6