---
slug: how-capgo-is-born
title: Come è nato Capgo
description: Storia di come ho iniziato questo viaggio e costruito Capgo
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Illustrazione della nascita di Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Story
published: true
locale: it
next_blog: ''
---

Ehi, sono Martin Donadieu,

Nel luglio 2021, ho lasciato [Naas](https://naasai/) la startup che ho cofondato nel 2019 per sviluppare progetti in solitaria

Durante i primi 6 mesi del mio percorso in solitaria mi sono concentrato sul riavvio del mio progetto Captime, un'app mobile che avevo creato 4 anni prima, diventata un'attività secondaria con il covid

Nel dicembre 2021, mentre stavo ricostruendo l'app da zero, ho avuto alcuni problemi con la versione di produzione corrente,

e le cose si sono complicate, dovevo sistemarlo, ma volevo evitare di rilasciare una nuova versione, quindi ho cercato una soluzione per inviare aggiornamenti del codice alla mia app

All'epoca, Captime generava $400/mese, quindi cercavo una soluzione economica, Ionic Appflow era fuori dal mio budget

L'unica altra alternativa era Microsoft App Center, ma hanno interrotto il supporto per le app che utilizzano Cordova / Capacitor

Se sei uno sviluppatore indipendente come me, scoprirai che Ionic AppFlow non ha il prezzo migliore per te

Come te, mi lamentavo di questo, ho contattato Ionic, hanno capito il reclamo, ma non erano disposti a modificare i prezzi, non ero il target

Così, ho deciso di provare a risolvere il mio più grande problema nel flusso di sviluppo di Capacitor JS: gli aggiornamenti in tempo reale

Dopo un mese di tentativi, ho trovato un modo per scaricare da un URL uno zip e sostituire il codice sorgente dell'app

L'ho condiviso e ho ricevuto un enorme interesse su GitHub

Era troppo manuale per la maggior parte dei team, quindi hanno chiesto un servizio a pagamento, ed è lì che ho iniziato a lavorare su Capgo come alternativa ad AppFlow

L'obiettivo era fornire una soluzione semplice e facile da usare per inviare aggiornamenti del codice alle app JavaScript Capacitor

Niente build nativo, niente grande toolkit come Ionic, solo aggiornamenti in tempo reale, per il mercato che loro non indirizzano, Noi

Li ho contattati per condividere con loro quello che stavo facendo, e abbiamo trovato un accordo di amicizia commerciale

Io costruisco per i maker, loro costruiscono per le aziende che necessitano di CI/CD e supporto dedicato :)

Sei il benvenuto a unirti alla community per costruire insieme, lo uso anche io per i miei progetti, e mi aspetto che questo diventi il mio progetto principale in futuro