---
slug: release-of-a-brand-new-capacitor-social-login
title: CapacitorのSNSログインプラグインの新リリース
description: >-
  Il plugin Capacitor Social Login è un plugin che ti permette di effettuare
  l'accesso con Google, Facebook e Apple su iOS, Android e Web.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Schema del sistema Capgo
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: it
---

## Introduzione

Ciao, sono Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Dopo un mese di duro lavoro (e un po' doloroso 🙃), sono lieto di annunciare il primo rilascio di Capacitor Social Login. Questo plugin è progettato per assistere nella gestione del Login con Google e Apple sia su iOS che Android. Inoltre, insieme a Martin, abbiamo lavorato su alcune funzionalità uniche che includono:

 - L'introduzione del Login con Apple su Android
 - L'adozione della nuova API Google Credentials
 - L'aggiunta di documentazione dettagliata

## Login con Apple su Android

Innanzitutto, parliamo della principale innovazione del 'Login con Apple' su Android. Questo non è stato banale, poiché l'SDK di Apple non fornisce questa funzionalità. Ho utilizzato [questo articolo](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) come punto di riferimento, ma l'ho modificato leggermente per renderlo più sicuro. Il flusso che ho ottenuto è questo:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

Purtroppo, richiede un backend e alcune modifiche al codice della tua app, ma è il meglio che potevo fare.

## Google Login Rinnovato su Android

Successivamente, ho cercato di implementare il Google Login su Android. Come si è scoperto, [CodetrixStudio's CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) utilizza una [libreria GMS che sarà presto deprecata](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Come risultato di questa libreria GMS considerata obsoleta, ho deciso di utilizzare il [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Questo ha aiutato a semplificare il flusso di login e ha rimosso il fastidioso [errore 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

## Documentazione

Infine, ho scritto una fantastica ✨ documentazione. Ho dedicato molto tempo per assicurarmi che la documentazione fosse accurata ed esaustiva.
La documentazione include una guida dettagliata per la configurazione sia di Apple che di Google. Ho anche fornito un [backend di esempio](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) per il Login con Apple 🍎

Sentiti libero di consultare le guide [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) e [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd)!

## Conclusione

In conclusione, il plugin Capacitor Social Login introduce molte nuove ed entusiasmanti funzionalità con altre in arrivo nel futuro 🚀