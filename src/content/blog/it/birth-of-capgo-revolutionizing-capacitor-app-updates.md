---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Cómo un Issue de GitHub se Convirtió en un Negocio
description: >-
  Scopri le sfide e i successi dietro la creazione di Capgo, un innovativo
  sistema di aggiornamento in tempo reale per le app Capacitor, nato dalla
  necessità e modellato dal feedback della community.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: The Evolution from Capgo's Idea to Product Visually Represented
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: it
next_blog: ''
---

## La Genesi: Una Richiesta della Community

I semi di Capgo furono piantati molto prima che iniziassi il mio percorso come maker indipendente. L'8 luglio 2020, un membro della community di nome alexcroox presentò una richiesta di plugin che sarebbe poi diventata il progetto di Capgo.

![Initial plugin request](/capgo-initial-requestwebp)

Questa richiesta delineava la necessità di un plugin "Capacitor Hot Code Push" con i seguenti punti chiave:

1. **Piattaforme**: Supporto sia per Android che iOS
2. **Soluzioni Esistenti**: Evidenziava i limiti delle opzioni attuali come MS Code Push (che mancava del supporto Capacitor) e App Flow (costoso e poco flessibile)
3. **Descrizione**: La capacità di aggiornare js/css/html di un'app in tempo reale senza passare attraverso il processo di revisione dell'app store
4. **Funzionalità Chiave**:
   - Facilitare gli aggiornamenti over-the-air da un server/endpoint a scelta dello sviluppatore
   - Scaricare un file zip della cartella dist aggiornata, estrarlo e dire a Capacitor di avviarsi da questa nuova directory
   - Funzionalità aggiuntive come verifica degli aggiornamenti, tempistica di installazione e download selettivo degli aggiornamenti

Questa richiesta completa ha ottenuto un significativo supporto dalla community, con 65 like e 25 reazioni cuore. Ha chiaramente dimostrato una forte domanda per una tale soluzione nell'ecosistema Capacitor.

## Un Nuovo Capitolo Inizia

Prima di immergerci nella storia di Capgo, è importante preparare il terreno. Nel 2021, ho preso una decisione che mi ha cambiato la vita: lasciare il mio ruolo di CTO di Cashstory e vendere le mie azioni. Questo ha segnato l'inizio del mio viaggio come maker indipendente, un percorso pieno di incertezze ma anche di infinite possibilità.

![Lisbon digital nomad life](/capgo-lisbon-nomadwebp)

Con i miei risparmi come rete di sicurezza, mi sono imbarcato in una nuova avventura. Vivevo come nomade digitale a Lisbona, Portogallo, abbracciando la vivace scena tech e la cultura della città mentre mi concentravo sui miei progetti personali. Il mio focus principale era Captime, un timer mobile per crossfit. Non sapevo che questo progetto mi avrebbe portato a creare qualcosa di molto più grande.

## La Scintilla di un'Idea

Mentre lavoravo su Captime, ho incontrato un ostacolo significativo - la mancanza di una soluzione di aggiornamento accessibile e flessibile per le app Capacitor. Nell'ottobre 2021, ho espresso queste preoccupazioni in una discussione su GitHub.

![Initial proposal for Capgo](/capgo-initial-proposalwebp)

I principali punti dolenti che ho identificato erano:

1. Costi elevati per gli sviluppatori su piccola scala
2. Mancanza di aggiornamenti over-the-air (OTA) nei piani economici
3. Funzionalità non necessarie per sviluppatori indipendenti

## La Community Risponde

Le mie preoccupazioni hanno toccato un nervo scoperto con altri sviluppatori. Molti hanno fatto eco al sentimento che le soluzioni esistenti erano troppo costose per sviluppatori indipendenti e piccoli team.

![Community feedback](/capgo-community-feedbackwebp)

Uno sviluppatore ha riassunto i sentimenti della community:

"Sarebbe fantastico se il piano Community includesse 500 aggiornamenti live