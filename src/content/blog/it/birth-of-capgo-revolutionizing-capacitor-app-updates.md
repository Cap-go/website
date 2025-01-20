---
slug: it__birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Come un problema di GitHub si è trasformato in un'azienda
description: >-
  Scopri sfide e successi nello sviluppo di Capgo, un sistema innovativo per
  l'aggiornamento diretto delle applicazioni Capacitor, nato da una necessità e
  modellato dal feedback della comunità.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Rappresentazione visiva dell'evoluzione di Capgo da idea a prodotto
tag: development
published: true
locale: it
next_blog: ''
---

## La Genesi: Una Richiesta della Comunità

I semi di Capgo furono in realtà piantati molto prima che iniziassi il mio percorso come creatore indipendente. L'8 luglio 2020, un membro della comunità di nome alexcroox presentò una richiesta di plugin che sarebbe poi diventata il progetto per Capgo.

![Richiesta iniziale del plugin](/capgo-initial-requestwebp)

Questa richiesta delineava la necessità di un plugin "Capacitor Hot Code Push" con i seguenti punti chiave:

1. **Piattaforme**: Supporto sia per Android che per iOS
2. **Soluzioni esistenti**: Evidenziava i limiti delle opzioni attuali come MS Code Push (che mancava di supporto per Capacitor) e App Flow (che era costoso e poco flessibile)
3. **Descrizione**: La capacità di aggiornare js/css/html di un'app in tempo reale senza passare attraverso il processo di revisione dell'app store
4. **Caratteristiche principali**: 
   - Facilitare gli aggiornamenti over-the-air da un server/endpoint a scelta dello sviluppatore
   - Scaricare un file zip della cartella dist aggiornata, estrarlo e dire a Capacitor di avviarsi da questa nuova directory
   - Funzionalità aggiuntive come verifica dell'aggiornamento, tempistica di installazione e download selettivo degli aggiornamenti

Questa richiesta completa ha ottenuto un notevole supporto dalla comunità, con 65 like e 25 reazioni di cuore. Dimostrava chiaramente una forte domanda per una tale soluzione nell'ecosistema Capacitor.

Quando mi sono imbattuto in questa richiesta più di un anno dopo, risuonava profondamente con le sfide che stavo affrontando nei miei progetti. Ha servito sia come convalida della necessità di un tale strumento che come tabella di marcia per quello che sarebbe diventato Capgo.

L'entusiasmo della comunità per questo plugin proposto, combinato con le mie esperienze personali, è diventato la forza trainante dello sviluppo di Capgo. È un perfetto esempio di come le comunità open-source possano identificare le esigenze e ispirare soluzioni, anche se il tempo dall'idea all'implementazione si estende per oltre un anno.

## Inizia un Nuovo Capitolo

Prima di immergerci nella storia di Capgo, è importante preparare il terreno. Nel 2021, ho preso una decisione che mi ha cambiato la vita, lasciando il mio ruolo di CTO di Cashstory e vendendo le mie azioni. Questo ha segnato l'inizio del mio percorso come creatore indipendente, un cammino pieno di incertezze ma anche di infinite possibilità.

![Vita da nomade digitale a Lisbona](/capgo-lisbon-nomadwebp)

Con i miei risparmi come rete di sicurezza, mi sono imbarcato in una nuova avventura. Vivevo come nomade digitale a Lisbona, in Portogallo, abbracciando la vivace scena tech e la cultura della città mentre mi concentravo sui miei progetti di passione. Il mio focus principale era Captime, un'app mobile per timer crossfit. Non sapevo che questo progetto mi avrebbe portato a creare qualcosa di molto più grande.

L'energia dell'ecosistema startup di Lisbona e la libertà dello stile di vita da nomade digitale fornivano lo sfondo perfetto per l'innovazione. È stato in questo ambiente, circondato da imprenditori e sviluppatori di tutto il mondo, che sono stati gettati i semi di Capgo.

## La Scintilla di un'Idea

Mentre lavoravo su Captime, ho incontrato un ostacolo significativo - la mancanza di una soluzione di aggiornamento accessibile e flessibile per le app Capacitor. Nell'ottobre 2021, ho espresso queste preoccupazioni in una discussione su GitHub.

![Proposta iniziale per Capgo](/capgo-initial-proposalwebp)

I principali punti dolenti che ho identificato erano:

1. Costi elevati per gli sviluppatori su piccola scala
2. Mancanza di aggiornamenti over-the-air (OTA) nei piani economici
3. Funzionalità non necessarie per gli sviluppatori indipendenti

## La Comunità Risuona

Le mie preoccupazioni hanno colpito un nervo scoperto tra gli altri sviluppatori. Molti hanno fatto eco al sentimento che le soluzioni esistenti fossero troppo costose per gli sviluppatori indipendenti e i piccoli team.

![Feedback della comunità](/capgo-community-feedbackwebp)

Uno sviluppatore ha riassunto i sentimenti della comunità:

"Sarebbe fantastico se il piano Community includesse 500 aggiornamenti liveO ancora meglio, se ci fosse un pacchetto solo per gli Aggiornamenti in Tempo Reale a $50 al mese che includesse 5.000 Aggiornamenti in Tempo Reale"

## La Nascita di una Soluzione

Motivato dalla risposta della comunità, ho deciso di prendere in mano la situazione. Il 24 ottobre 2021, ho annunciato il mio piano di costruire un modulo che avrebbe permesso agli sviluppatori di scaricare aggiornamenti da un URL specifico.

![Snippet di codice iniziale](/capgo-initial-codewebp)

Gli obiettivi iniziali erano semplici:
- Scaricare dati da un URL
- Decomprimere i dati
- Sostituire il codice corrente con quello nuovo

Tuttavia, trasformare questa semplice idea in realtà si è rivelato molto più impegnativo di quanto avessi inizialmente previsto.

## La Lotta Dietro le Quinte

Ciò che non è evidente dal thread di GitHub è l'enorme complessità del compito che avevo intrapreso. Il codice necessario per implementare questa funzionalità era oscuro e difficile da comprendere. Mi sono ritrovato alle prese con dettagli intricati su come le app Capacitor gestiscono gli aggiornamenti e i file system.

Ho trascorso molte notti nel mio furgone, studiando documentazione e sperimentando diversi approcci. I progressi erano lenti, e ci sono stati momenti in cui mi sono chiesto se non avessi azzardato troppo.

## La Comunità in Soccorso

Fortunatamente, non ero solo in questo viaggio. La comunità degli sviluppatori, in particolare su Discord, si è rivelata una risorsa inestimabile. Altri sviluppatori hanno offerto le loro intuizioni, aiutato a debuggare problemi e fornito incoraggiamento quando le cose si facevano difficili.

![Supporto della comunità Discord](/capgo-discord-supportwebp)

Questo sforzo collaborativo è stato cruciale per superare gli ostacoli tecnici. Ha rafforzato la mia convinzione nel potere dell'open source e dello sviluppo guidato dalla comunità.

## Sviluppo Rapido e Capacità in Espansione

Con l'aiuto della comunità, lo sviluppo ha iniziato ad accelerare. Entro il 22 novembre 2021, avevo una versione funzionante per iOS e stavo migliorando l'esperienza degli sviluppatori.

![Snippet di codice migliorato](/capgo-improved-codewebp)

Man mano che lo sviluppo progrediva, ho aggiunto più funzionalità:
- Supporto per Android
- Persistenza tra le chiusure dell'app
- La capacità di tornare alla versione originale dell'app

![Annuncio nuove funzionalità](/capgo-new-featureswebp)

Ogni nuova funzionalità portava con sé una serie di sfide, ma anche un senso di realizzazione mentre il progetto cresceva oltre il suo ambito iniziale.

## Il Lancio di Capgo

Entro marzo 2022, il progetto si era evoluto in un prodotto completo: Capgo. Ho annunciato il rilascio di una modalità di aggiornamento automatico, permettendo agli sviluppatori di connettersi al proprio backend o utilizzare il servizio backend di Capgo.

![Annuncio del lancio di Capgo](/capgo-launch-announcementwebp)

La risposta della comunità è stata estremamente positiva, con gli sviluppatori che elogiavano questa soluzione tanto necessaria.

## La Svolta verso un Prodotto a Pagamento

Inizialmente, non avevo piani per monetizzare Capgo. Il mio obiettivo era semplicemente creare uno strumento che risolvesse un problema che io e altri sviluppatori stavamo affrontando. Tuttavia, il feedback su GitHub mi ha fatto riconsiderare questa posizione.

Gli sviluppatori stavano esprimendo la volontà di pagare per una soluzione che soddisfacesse le loro esigenze a un prezzo equo. Questo feedback, combinato con la consapevolezza dei costi continui e dello sforzo necessario per mantenere e migliorare Capgo, ha portato a una decisione cruciale.

L'11 giugno 2022, ho annunciato che Capgo avrebbe iniziato a addebitare per l'utilizzo in 15 giorni, segnando la sua transizione da progetto comunitario a business sostenibile.

![Annuncio dei prezzi di Capgo](/capgo-pricing-announcementwebp)

Tuttavia, rimanendo fedele alle radici del progetto, ho mantenuto il core open-source di Capgo permettendo l'uso gratuito del plugin in modalità manuale o con un server personalizzato.

## Conclusione

Il mio viaggio con Capgo è una testimonianza del potere dell'innovazione guidata dalla comunità e dei percorsi inaspettati che i creatori solitari spesso si trovano ad affrontare. Ciò che è iniziato come una frustrazione personale mentre lavoravo su un'app per il timer del crossfit è cresciuto fino a diventare un sistema di aggiornamento in tempo reale robusto, economico e flessibile per le app Capacitor.

La creazione di Capgo non è stata affatto facile.Ci sono volute innumerevoli ore di lavoro, il supporto di una generosa community di sviluppatori e la disponibilità a cambiare direzione in base al feedback degli utenti. Dal coding in Airbnb in Portogallo al lancio di un prodotto a pagamento, ogni passo di questo percorso è stato un'esperienza di apprendimento.

Mentre Capgo continua a evolversi, si pone come un esempio eccellente di come identificare una lacuna nel mercato, lavorare attivamente per colmarla ed essere reattivi alle esigenze della community possa portare alla creazione di strumenti preziosi che vanno a beneficio dell'intero ecosistema degli sviluppatori.

La storia di Capgo è più di un semplice sviluppo di uno strumento; è una storia di perseveranza, community e l'eccitante imprevedibilità della vita come creatore indipendente.

Puoi trovare la storia completa [qui](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)