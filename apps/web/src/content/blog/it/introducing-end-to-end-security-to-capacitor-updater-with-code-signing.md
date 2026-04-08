---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introduzione alla crittografia end-to-end per capacitor-updater con firma del
  codice
description: >-
  Using RSA + AES encryption for updates, designed for enterprise and high
  security applications
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Download Capgo Securely
keywords: >-
  E2E, code signing, RSA, AES, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Solution
published: true
locale: it
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) ora supporta la crittografia del codice end-to-end. La firma del codice garantisce che gli aggiornamenti eseguiti dai dispositivi degli utenti finali non siano stati manomessi e fornisce un livello di protezione aggiuntivo rispetto alla sicurezza standard di Capacitor-updater.

## La sicurezza predefinita di Capacitor-updater

Di default, il modello di sicurezza di Capgo è simile a quello dei provider di web hosting. Capgo memorizza gli aggiornamenti [crittografati a riposo](https://cloudgooglecom/docs/security/encryption/default-encryption/) e li serve tramite HTTPS utilizzando cifrari moderni. Allo stesso modo, la pubblicazione di un aggiornamento dal computer di uno sviluppatore utilizza sempre HTTPS.

![Capgo ottiene un A+ nel test HTTPS di SSL Labs](/ssllabs_report.webp)

La sicurezza predefinita di Capgo ottiene un A+ nel test HTTPS di SSL Labs (https://wwwssllabscom, novembre 2022)

Come i migliori web host, Capgo utilizza HTTPS per proteggere la privacy e l'integrità delle connessioni di rete tra il server e i dispositivi degli utenti finali. Questo è un eccellente livello di sicurezza che funziona bene sia per il web che per le app Ionic che utilizzano Capgo.

## La supply chain dell'infrastruttura cloud

Un'altra cosa che Capgo e la maggior parte dei web host hanno in comune è che funzionano su infrastrutture cloud di livello inferiore, spesso da AWS, GCP o un altro provider cloud popolare. L'hardware e il software gestiti da questi provider cloud e Capgo o altri web host fanno parte della supply chain cloud.

Il modello di sicurezza e la supply chain cloud funzionano per un vasto numero di siti web e app. Ogni sviluppatore web che utilizza un provider cloud ripone fiducia in quel provider e si aspetta che i file caricati siano quelli eseguiti o serviti senza essere manomessi. E i provider cloud lavorano duramente per mantenere sicura la loro infrastruttura.

Ma ovviamente, vengono scoperte vulnerabilità hardware e software. I provider cloud correggono le vulnerabilità con tempistiche programmate, prevengono proattivamente il software dannoso (es. [Google's SLSA](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/)), e costruiscono livelli di difesa in profondità, e nella pratica, l'infrastruttura cloud ha dimostrato di soddisfare le esigenze di sicurezza della maggior parte dei siti web e delle app. Tuttavia, alcune app Ionic includono l'infrastruttura cloud compromessa nei loro modelli di minaccia. Per queste app Capacitor JS con i più alti requisiti di sicurezza superiori al web, abbiamo integrato la firma del codice end-to-end in Capgo e nel [protocollo standard degli aggiornamenti Capgo](/docs/self-hosted/auto-update/update-endpoint/)

## Firma del codice end-to-end con Capgo

La firma del codice end-to-end di Capgo utilizza la crittografia a chiave pubblica per garantire che i dispositivi degli utenti finali eseguano solo aggiornamenti originali non modificati dallo sviluppatore dell'app Capacitor.

"End-to-end" significa che questa sicurezza copre il flusso dal momento in cui uno sviluppatore pubblica un aggiornamento al momento in cui il dispositivo di un utente finale riceve ed esegue l'aggiornamento. "Firma del codice" significa utilizzare la crittografia e una chiave privata segreta per "firmare" il codice, e successivamente utilizzare una chiave pubblica attendibile per verificare la firma.

Ecco uno schema semplice* per spiegare come funziona:

![Schema di crittografia Capgo](/encryption_flow.webp)

* Complesso nella pratica, la crittografia è difficile

*Definizione*:
- AES: Advanced Encryption Standard, un algoritmo di crittografia simmetrica, una chiave per la crittografia e la decrittografia
- RSA: Rivest–Shamir–Adleman, un algoritmo di crittografia asimmetrica, vengono utilizzate due chiavi: una chiave pubblica e una chiave privata
- Cypher: I dati crittografati
- Session key: Una chiave AES utilizzata per crittografare e decrittografare i dati
- Checksum: Un hash calcolato per un file
- Signature: Un checksum crittografato con una chiave RSA privata. Può essere verificato con una chiave RSA pubblica

Utilizziamo l'algoritmo AES per crittografare l'aggiornamento. Una chiave AES casuale viene generata per ogni caricamento, quindi la chiave AES e il checksum (di seguito "firma") vengono crittografati con la chiave RSA privata dello sviluppatore. La chiave RSA pubblica dello sviluppatore viene utilizzata nell'app per decrittografare la chiave AES e la firma (riconvertendola in un checksum).