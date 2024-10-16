---
slug: Release-of-a-brand-new-capacitor-social-login
title: Lancio di un nuovo plugin di connessione sociale per Capacitor
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Illustrazione del sistema organizzativo di Capgo
tag: Capacitor
published: true
next_blog: ''
locale: it
---

# Introduzione

Ciao, sono Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Dopo un mese di duro (e un po' doloroso 🙃) lavoro, sono lieto di annunciare la prima release del Capacitor Social Login. Questo plugin è progettato per assistere nella gestione del Login con Google e Apple su iOS e Android. Inoltre, insieme a Martin, abbiamo lavorato su alcune caratteristiche uniche che includono:

 - L'introduzione del Login con Apple su Android 
 - L'adozione della nuova API Google Credentials
 - L'aggiunta di documentazione dettagliata

# Login con Apple su Android

Innanzitutto, parliamo della principale innovazione del 'Login con Apple' su Android. Questo non è stato banale, poiché l'SDK di Apple non fornisce questa funzionalità. Ho usato [questo articolo](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) come punto di riferimento, ma l'ho modificato un po' per renderlo più sicuro. Il flusso che ho finito per utilizzare è questo:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Purtroppo, richiede un backend e alcune modifiche al codice della tua app, ma è il meglio che ho potuto fare.

# Login Google rinnovato su Android

Successivamente, ho cercato di implementare il Login Google su Android. Come si è scoperto, [CapacitorGoogleAuth di CodetrixStudio](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) usa una [libreria GMS che sarà presto deprecata](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Di conseguenza, ho deciso di utilizzare il [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Questo ha aiutato a semplificare il flusso di login e ha rimosso il fastidioso [errore 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

# Documentazione

Infine, ho scritto una fantastica ✨ documentazione. Ho speso molto tempo per assicurarmi che i documenti fossero accurati ed esaustivi.
La documentazione include una guida dettagliata per configurare sia Apple che Google. Ho anche fornito un [backend di esempio](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) per il Login con Apple 🍎

Sentiti libero di dare un'occhiata alle guide [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) e [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd)!

# Conclusione

In conclusione, il plugin Capacitor Social Login introduce molte nuove ed entusiasmanti funzionalità con altre in arrivo in futuro 🚀