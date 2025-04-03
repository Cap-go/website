---
slug: it__introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introduzione alla crittografia end-to-end per capacitor-updater con firma del
  codice
description: >-
  L'uso della crittografia RSA + AES per criptare gli aggiornamenti, progettato
  per aziende e applicazioni con elevati requisiti di sicurezza
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Caricamento sicuro di Capgo
tag: Solution
published: true
locale: it
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) ora supporta la crittografia del codice end-to-end. La firma del codice garantisce che gli aggiornamenti eseguiti sui dispositivi degli utenti finali non siano stati manomessi e fornisce un ulteriore livello di protezione oltre alla sicurezza standard di livello web di Capacitor-updater.

## La sicurezza predefinita di Capacitor-updater

Per impostazione predefinita, il modello di sicurezza di Capgo è simile a quello dei provider di hosting web. Capgo memorizza gli aggiornamenti [crittografati a riposo](https://cloudgooglecom/docs/security/encryption/default-encryption/) e li serve tramite HTTPS utilizzando cifrari moderni. Allo stesso modo, la pubblicazione di un aggiornamento dal computer di uno sviluppatore utilizza sempre HTTPS.

![Capgo ottiene un A+ nel test HTTPS di SSL Labs](/ssllabs_reportwebp)

La sicurezza predefinita di Capgo ottiene un punteggio A+ nel test HTTPS di SSL Labs (https://wwwssllabscom, novembre 2022).

Come i migliori host web, Capgo utilizza HTTPS per proteggere la privacy e l'integrità delle connessioni di rete tra il server e i dispositivi degli utenti finali. Questo è un eccellente livello di sicurezza che funziona bene sia per il web che per le app Ionic che utilizzano Capgo.

## La catena di approvvigionamento dell'infrastruttura cloud

Un'altra cosa che Capgo e la maggior parte degli host web hanno in comune è che funzionano su un'infrastruttura cloud di livello inferiore, spesso da AWS, GCP o un altro popolare fornitore cloud. L'hardware e il software gestiti da questi fornitori cloud e da Capgo o altri host web fanno parte della catena di approvvigionamento cloud.

La catena di approvvigionamento cloud e il suo modello di sicurezza funzionano per un vasto numero di siti web e app. Ogni sviluppatore web che utilizza un fornitore cloud ripone fiducia in quel fornitore e si aspetta che i file che carica siano i file che vengono eseguiti o serviti senza essere manomessi. E i fornitori cloud lavorano duramente per mantenere sicura la loro infrastruttura.

Ma ovviamente, vengono scoperte vulnerabilità hardware e software. I fornitori cloud correggono le vulnerabilità con tempistiche programmate, prevengono proattivamente il software dannoso (ad esempio [Google's SLSA](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/)), e costruiscono strati di difesa in profondità, e in pratica, l'infrastruttura cloud ha dimostrato di soddisfare le esigenze di sicurezza della maggior parte dei siti web e delle app. Tuttavia, alcune app Ionic includono l'infrastruttura cloud compromessa nei loro modelli di minaccia. Per queste app Capacitor JS con i più elevati requisiti di sicurezza al di sopra del web, abbiamo integrato la firma del codice end-to-end in Capgo e nel [protocollo standard Capgo Updates](/docs/self-hosted/auto-update/update-endpoint/).

## Firma del codice end-to-end con Capgo

La firma del codice end-to-end di Capgo utilizza la crittografia a chiave pubblica per garantire che i dispositivi degli utenti finali eseguano solo aggiornamenti non modificati e originali dallo sviluppatore dell'app Capacitor.

"End-to-end" significa che questa sicurezza copre il flusso dal momento in cui uno sviluppatore pubblica un aggiornamento al momento in cui il dispositivo di un utente finale riceve ed esegue l'aggiornamento. "Firma del codice" significa utilizzare la crittografia e una chiave privata segreta per "firmare" il codice, e successivamente utilizzare una chiave pubblica affidabile per verificare la firma.

Ecco uno schema semplice* per spiegare come funziona:

![Schema di crittografia Capgo](/encryption_flowwebp)

* Complesso nella pratica, la crittografia è difficile

*Definizione*:
- AES: Advanced Encryption Standard, un algoritmo di crittografia simmetrica, una chiave per la crittografia e la decrittografia
- RSA: Rivest-Shamir-Adleman, un algoritmo di crittografia asimmetrica, vengono utilizzate due chiavi: una chiave pubblica e una chiave privata
- Cypher: I dati crittografati
- Chiave di sessione: Una chiave AES utilizzata per crittografare e decrittografare i dati
- Checksum: Un hash calcolato per un file
- Firma: Un checksum crittografato con una chiave RSA privata. Può essere verificato con una chiave RSA pubblica

Utilizziamo l'algoritmo AES per crittografare l'aggiornamento. Una chiave AES casuale viene generata per ogni caricamento, quindi la chiave AES e il checksum (di seguito "firma") vengono crittografati con la chiave RSA privata dello sviluppatore. La chiave RSA pubblica dello sviluppatore viene utilizzata nell'app per decrittografare la chiave AES e la firma (riconvertendola in un checksum).Successivamente, la chiave AES decifrata viene utilizzata per decifrare l'aggiornamento; viene calcolato un checksum dell'aggiornamento decifrato e confrontato con la firma decifrata.

Utilizziamo due diversi algoritmi di crittografia perché RSA non può essere utilizzato per crittografare grandi quantità di dati. AES viene utilizzato per crittografare l'aggiornamento e RSA viene utilizzato per crittografare la chiave AES e il checksum.

Con questo, nemmeno Capgo può leggere il contenuto del tuo bundle. Questo è un modello di sicurezza robusto utilizzato da molti clienti aziendali.

**Aggiornamento crittografia V2 2024-08-27:**
- Abbiamo cambiato il tipo di chiave memorizzata nell'app. Questo è stato fatto per evitare di dedurre la chiave pubblica (precedentemente utilizzata per la crittografia) dalla chiave privata (precedentemente utilizzata per la decrittografia). Ora, l'app memorizza la chiave pubblica (ora utilizzata per la decrittografia).
- Abbiamo cambiato il checksum dall'algoritmo CRC32 all'algoritmo SHA256. Abbiamo anche iniziato a [firmare il bundle](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages). Quando la crittografia V2 è configurata, un aggiornamento deve avere una firma valida. Questo è rigorosamente applicato dal plugin.
- Ora applichiamo una firma valida quando la crittografia V2 è configurata.
Queste 3 modifiche sono state apportate dopo un'analisi di sicurezza da parte di un membro della comunità. Sono qui per prevenire attacchi crittografici durante l'aggiornamento.

Se hai utilizzato la crittografia V1, migra alla V2 per beneficiare delle nuove funzionalità di sicurezza. Segui le [istruzioni di migrazione](/docs/cli/migrations/encryption/).

Con la firma del codice end-to-end, Capgo diventa un'infrastruttura cloud "senza fiducia". Se uno dei fornitori cloud di Capgo o addirittura Capgo stesso dovesse modificare un aggiornamento firmato, i dispositivi degli utenti finali rifiuterebbero quell'aggiornamento ed eseguirebbero l'aggiornamento precedente e affidabile già presente sul dispositivo.

Mentre HTTPS a livello web è sufficiente per molte app, alcune grandi aziende trovano attraente il livello extra di sicurezza della firma del codice end-to-end. Alcune di queste aziende realizzano app finanziarie che emettono transazioni di alto valore e permanenti. Altre aziende hanno CISO che includono l'infrastruttura cloud compromessa nei loro modelli di minaccia. Abbiamo implementato la firma del codice end-to-end in Capgo per questi casi d'uso e siamo interessati a saperne di più dalle aziende con esigenze di sicurezza di livello superiore.

## Iniziare per i clienti aziendali

Per le grandi aziende o progetti che tengono molto alla sicurezza, vogliamo rendere la firma del codice facile da configurare e mantenere. A tal fine, ora forniamo le seguenti funzionalità:

- Configurazione rapida del certificato
- Supporto per server di sviluppo con firma del codice sia per Capgo che per build di sviluppo
- Firma del codice in produzione su ogni aggiornamento

La firma del codice Capgo è disponibile per tutti i clienti. Per iniziare, segui le [istruzioni di configurazione](/docs/cli/commands/#end-to-end-encryption-trustless).

## Crediti

Grazie mille a [Ionic](https://ioniccom/), questo articolo è basato su [questo articolo](https://ionicio/blog/introducing-the-ionic-end-to-end-testing-reference-example/) riscritto con chat-gpt-3 e adattato.