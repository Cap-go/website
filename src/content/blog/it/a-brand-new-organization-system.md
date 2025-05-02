---
slug: un-nuovo-sistema-organizzativo
title: Un nuovo sistema di organizzazione
description: Una storia su come il team di capgo ha aggiunto un sistema di organizzazione
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Sistema di organizzazione Capgo illustrato
keywords: >-
  organization system, capgo, mobile app development, software engineering,
  backend development
tag: Story
published: true
locale: it
next_blog: ''
original_slug: a-brand-new-organization-system
---
## Introduzione

Ciao, sono [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny) - ingegnere software principale di Capgo.

Negli ultimi 8 mesi ho sviluppato il [sistema di organizzazione](/docs/webapp/organization-system/), e dal 14 aprile sono felice di annunciare che il sistema è stato completato 🎉 🎊

Finalmente, dopo 8 mesi, ogni singola parte di Capgo è accessibile ai membri dell'organizzazione. Questo include:
 - app
 - statistiche
 - fatturazione
 - supporto CLI completo
 - e molto altro ancora!

Non è stato facile arrivare qui; ci sono state 3 revisioni principali dei sistemi.

## Organizzazioni v1

Gli inizi sono stati difficili... Inizialmente, ho iniziato a lavorare su questo 2 settimane dopo essermi unito al progetto.
All'epoca, avevo poca o nessuna conoscenza del codice base o qualsiasi idea più ampia su come implementarlo.

Questo ha portato all'implementazione della soluzione più approssimativa che supportava solo l'accesso alle app, ai canali e alle versioni.
Non permetteva nemmeno all'utente invitato di accedere alle statistiche.

E poi ho aspettato che Martin lo revisionasse. Ho aspettato e aspettato, ma non è successo nulla. 3 mesi dopo, ho deciso di tornare su questo e risolvere tutti i conflitti di merge. Ho anche deciso di testare, che si è rivelata un'ottima idea.
Non sorprendentemente, la soluzione approssimativa è completamente fallita. In quel momento, ho deciso di correggere tutti i bug e scrivere un test E2E completo.
Ho dovuto lavorare con codice molto difettoso e molte decisioni sbagliate prese dal me del passato, ma dopo 2 settimane difficili, sono finalmente riuscito a farlo funzionare.

Questo non significa, tuttavia, che fosse perfetto. Il proprietario dell'organizzazione aveva ancora molto più accesso rispetto all'utente invitato di livello più alto. Anche l'esperienza utente era piuttosto carente. L'utente invitato non poteva nemmeno vedere le statistiche dell'applicazione, gestire la fatturazione, e la CLI era limitata solo al caricamento.

Nonostante tutte queste sfide, Martin ha revisionato la PR e una settimana dopo è stata pubblicata in produzione.

## Organizzazioni v2

Il sistema di organizzazione funzionava piuttosto bene nonostante tutte le sfide. Gli utenti lo stavano utilizzando e ha davvero spinto avanti l'intero progetto. Tuttavia, dovevo ancora:
 - sistemare il disordine fatto nella [sicurezza a livello di riga](https://supabase.com/docs/guides/auth/row-level-security)
 - aggiungere il supporto per l'intera CLI
 - assicurarmi che gli utenti admin avessero lo stesso accesso del proprietario

Dopo [molte discussioni](https://github.com/Cap-go/capgo/issues/564) con Martin, abbiamo deciso che il modo migliore per procedere era riscrivere tutte le regole di sicurezza e spostare tutta la proprietà delle risorse alle organizzazioni e non agli utenti.
Questo avrebbe permesso una più facile integrazione con il nuovo sistema di organizzazione e avrebbe anche rimosso molto codice legacy.

Scrivere il nuovo codice RLS è stato molto tedioso, ma dopo una settimana e mezza, l'intera migrazione era pronta.

Questa volta, tuttavia, abbiamo deciso di non scrivere il test E2E, il che significava che dovevamo testarlo manualmente. Dopo 3 chiamate molto approfondite insieme, Martin ed io abbiamo finalmente deciso di pubblicare in produzione e sperare che andasse bene 🙏

Non è andata così... Si è scoperto che ho rotto la registrazione degli utenti e i nuovi utenti non potevano creare un account 😅

Dopo una rapida chiamata di panico, ho rapidamente pubblicato alcune modifiche in produzione e sono andato a dormire. Purtroppo, le mie modifiche hanno solo creato più problemi 😰

Dopo essermi svegliato, ho scoperto che gli utenti avevano molte organizzazioni vuote. Questo non dovrebbe accadere poiché dovrebbe essere consentita solo 1 organizzazione per utente. Ci è voluto del tempo per rimuovere tutte le organizzazioni duplicate e vuote, ma a parte questo, le modifiche sono andate piuttosto bene.

## Organizzazioni v3

Anche questo non era abbastanza. C'era ancora un componente enorme mancante - la fatturazione.

Finora solo il proprietario poteva gestire la fatturazione. Questo ha creato alcuni problemi interessanti dove un utente ha acquistato un piano pensando di comprarlo per l'organizzazione.
Abbiamo rapidamente risolto il problema manualmente ed è stato a questo punto che abbiamo deciso che questo problema era inaccettabile

La migrazione è stata piuttosto fluida. Ci è voluta una settimana di lavoro ma rispetto alla V1 e V2 non è stato davvero così difficile 🚀

## Organizzazioni v4 - il futuro

Dopo tutto questo duro lavoro penso che sia il momento di concentrarsi su qualcos'altro per ora 😎

Non è stato facile ma ho imparato molto e Capgo ha ricevuto una funzionalità molto bella e importante
Devo ancora deprecare le funzioni legacy, migliorare l'esperienza utente della webapp, monitorare i bug,
ma non dovrebbero esserci modifiche importanti a questo sistema.

<br>

Grazie per la lettura 🚀
