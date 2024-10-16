---
slug: a-brand-new-organization-system
title: Nuovo sistema organizzativo
description: >-
  Una storia di background su come il team Capgo ha aggiunto il sistema di
  organizzazione
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Illustrazione del sistema organizzativo di Capgo
tag: Story
published: true
locale: it
next_blog: ''
---

## Introduzione

Ciao, sono [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny) - ingegnere software capo di Capgo

Negli ultimi 8 mesi ho sviluppato il [sistema di organizzazione](/docs/webapp/organization-system/), e dal 14 aprile sono felice di annunciare che il sistema è stato completato 🎉 🎊

Finalmente, dopo 8 mesi, ogni singola parte di Capgo è accessibile ai membri dell'organizzazione. Questo include:
 - app
 - statistiche
 - fatturazione
 - supporto completo CLI
 - e molto altro ancora!

Non è stato facile arrivare qui; ci sono state 3 importanti revisioni dei sistemi

## Organizzazioni v1

Gli inizi sono stati difficili. Inizialmente, ho iniziato a lavorare su questo 2 settimane dopo essermi unito al progetto.
All'epoca, avevo poca o nessuna conoscenza del codice base o di qualsiasi idea più ampia su come implementarlo.

Questo ha portato all'implementazione della soluzione più improvvisata che supportava solo l'accesso alle app, ai canali e alle versioni.
Non permetteva nemmeno all'utente invitato di accedere alle statistiche.

E poi ho aspettato che Martin lo esaminasse. Ho aspettato e aspettato, ma non è successo nulla. 3 mesi dopo, ho deciso di tornare su questo e risolvere tutti i conflitti di merge. Ho anche deciso di testare, il che si è rivelata un'ottima idea.
Non sorprende che la soluzione improvvisata sia completamente fallita. In quel momento, ho deciso di risolvere tutti i bug e scrivere un test E2E completo.
Ho dovuto lavorare con codice molto difettoso e molte decisioni sbagliate prese dal me del passato, ma dopo 2 settimane difficili, finalmente l'ho fatto funzionare.

Questo non significa, tuttavia, che fosse perfetto. Il proprietario dell'organizzazione aveva ancora molto più accesso rispetto all'utente invitato con i privilegi più alti. Anche l'esperienza utente era abbastanza carente. L'utente invitato non poteva nemmeno vedere le statistiche dell'applicazione, gestire la fatturazione, e la CLI era limitata solo al caricamento.

Nonostante tutte queste sfide, Martin aveva esaminato la PR, e una settimana dopo, è stata inserita in produzione.

## Organizzazioni v2

Il sistema di organizzazione funzionava piuttosto bene nonostante tutte le sfide. Gli utenti lo stavano utilizzando, e ha davvero spinto avanti l'intero progetto. Tuttavia, dovevo ancora:
 - sistemare il disordine fatto nella [sicurezza a livello di riga](https://supabasecom/docs/guides/auth/row-level-security)
 - aggiungere supporto per l'intera CLI
 - assicurare che gli utenti amministratori abbiano lo stesso accesso del proprietario

Dopo [molte discussioni](https://githubcom/Cap-go/capgo/issues/564) con Martin, abbiamo deciso che il modo migliore per andare avanti era riscrivere tutte le regole di sicurezza e spostare tutta la proprietà delle risorse alle organizzazioni e non agli utenti.
Questo avrebbe permesso una più facile integrazione con il nuovo sistema di organizzazione, e avrebbe anche rimosso molto codice legacy.

Scrivere il nuovo codice RLS è stato molto tedioso, ma dopo una settimana e mezza, l'intera migrazione era pronta.

Questa volta, tuttavia, abbiamo deciso di non scrivere il test E2E, il che significava che dovevamo testarlo manualmente. Dopo 3 chiamate molto approfondite insieme, Martin e io abbiamo finalmente deciso di spingere in produzione e sperare che andasse bene 🙏

Non è andata bene. Si è scoperto che ho rotto la registrazione degli utenti, e i nuovi utenti non potevano creare un account 😅

Dopo una rapida chiamata di panico, ho rapidamente inserito alcune modifiche in produzione e sono andato a letto. Purtroppo, le mie modifiche hanno solo creato più problemi 😰

Dopo essermi svegliato, ho scoperto che gli utenti avevano molte organizzazioni vuote. Questo non dovrebbe succedere poiché dovrebbe essere consentita solo 1 organizzazione per utente. Ci è voluto del tempo di brainstorming per rimuovere tutte le organizzazioni vuote duplicate, ma a parte questo, le modifiche sono andate piuttosto bene.

## Organizzazioni v3

Anche questo non era sufficiente. C'era ancora un componente enorme mancante - la fatturazione.

Finora solo il proprietario poteva gestire la fatturazione. Questo ha creato alcuni problemi interessanti in cui un utente ha acquistato un piano pensando di comprarlo per l'organizzazione.
Abbiamo rapidamente risolto il problema manualmente ed è stato a questo punto che abbiamo deciso che questo problema era inaccettabile.

La migrazione è stata piuttosto agevole.Ci è voluta una settimana di lavoro ma rispetto a V1 e V2 non è stato davvero così difficile 🚀

## Organizzazioni v4 - il futuro

Dopo tutto questo duro lavoro penso sia il momento di concentrarsi su qualcos'altro per ora 😎

Non è stato facile ma ho imparato molto e Capgo ha ricevuto una funzionalità molto bella e importante
Devo ancora deprecare le funzioni legacy, migliorare l'esperienza utente della webapp, monitorare eventuali bug,
ma non dovrebbero esserci cambiamenti importanti a questo sistema

<br>

Grazie per aver letto 🚀