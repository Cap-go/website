---
slug: aggiornamenti-in-diretta-autohospitati
title: Aggiornamenti Live Self-hosted
description: >-
  Sono entusiasta di annunciare i Self-hosted Live Updates, la prossima
  iterazione dei Live Updates di Capgo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Update auto-ospitati
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: it
next_blog: ''
original_slug: self-hosted-live-updates
---
Sono lieto di annunciare il rilascio degli Aggiornamenti Live Self-hosted, che rappresenta l'ultima evoluzione degli Aggiornamenti Live di Capgo.

Mentre molte aziende attualmente utilizzano l'SDK Live Updates per accedere agli aggiornamenti più recenti di JavaScript, HTML e CSS per le loro applicazioni, alcune potrebbero incontrare ostacoli a causa di politiche aziendali, normative di settore o restrizioni geografiche. Con gli Aggiornamenti Live Self-hosted, ora puoi distribuire gli artefatti delle build web attraverso la tua infrastruttura.

Questo significa che puoi evitare i ritardi causati dalle revisioni dell'Apple Store, risolvere bug e modificare contenuti più rapidamente, e assicurarti che i tuoi utenti stiano sempre utilizzando l'ultima versione della tua app. Inoltre, ho sentito da numerose grandi aziende che vorrebbero sfruttare gli Aggiornamenti Live ma affrontano sfide a causa di rigidi standard di conformità. Questo problema ora è un ricordo del passato grazie agli Aggiornamenti Live Self-hosted.

## Come funzionano gli aggiornamenti live self-hosted?

Implementare gli Aggiornamenti Live ospitati su Capgo è un gioco da ragazzi utilizzando l'[SDK Capgo](https://github.com/Cap-go/capacitor-updater/). Per quanto riguarda gli Aggiornamenti Live Self-hosted, ho migliorato la CLI di Capgo con le funzionalità necessarie per abilitare la configurazione sulla tua infrastruttura.

Per garantire una consegna sicura e coordinata degli ultimi artefatti delle build web agli utenti finali, Capgo ora permette al plugin Capacitor Live Updates di utilizzare una coppia di chiavi pubblica/privata. Quando si utilizzano gli Aggiornamenti Live Self-hosted, viene eseguita una stretta di mano aggiuntiva per garantire che gli artefatti scaricati tramite il plugin dall'infrastruttura aziendale non siano stati modificati.

![Schema di crittografia Capgo](/encryption_flow.webp)

Di seguito sono riportati i passaggi per stabilire la coppia di chiavi e il processo successivo per fornire l'esperienza aggiornata agli utenti finali.

### Configurazione una tantum della coppia di chiavi

Per generare una coppia di chiavi pubblica/privata, le aziende possono utilizzare il seguente comando della CLI di Capgo Cloud:

```shell
npx @capgo/cli@latest key create
```

Questo comando imposterà le proprietà `CapacitorUpdater.privateKey` nel tuo file di configurazione.
E genererà 2 file chiave, `capgo_key.pub` e `capgo_key` nella directory principale del tuo progetto.

Questa coppia di chiavi viene utilizzata per firmare l'aggiornamento e verificarlo sul lato app.

### Flusso di lavoro degli aggiornamenti live self-hosted

Per iniziare a implementare gli Aggiornamenti Live Self-hosted, un'azienda deve prima eseguire una build web delle correzioni di bug, aggiornamenti dei contenuti o qualsiasi altra modifica del codice basata sul web che desidera apportare. Successivamente, deve firmare l'artefatto della build utilizzando la chiave privata ottenuta durante il processo di configurazione una tantum e infine caricare il bundle nella posizione di archiviazione preferita.

Prima compila il tuo codice:
```shell
npm run build
```

Poi comprimi la tua build:
```shell
npx @capgo/cli@latest bundle zip
```

Quindi cripta il tuo zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Questo comando ti mostrerà un ivSessionKey, dovrai salvarlo per il passaggio successivo.

Ora carica il tuo zip crittografato nel tuo storage aziendale e ottieni l'URL del file zip.

Capgo deve quindi essere informato di un nuovo Aggiornamento Live pronto per il consumo. Questo viene fatto tramite un altro comando CLI:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Una volta eseguito il comando, Capgo è consapevole di un nuovo aggiornamento pronto per essere distribuito agli utenti dell'app. Ora, quando l'app viene avviata, il plugin Live Updates verifica con Capgo se è necessario scaricare delle modifiche.

Capgo risponde al plugin con "Sì, è disponibile un aggiornamento" e il plugin Live Updates scarica il nuovo aggiornamento live utilizzando la posizione URL fornita dal comando CLI \`register\`:

```shell
https://abc.com/app/updates/abc123.zip
```

L'API dell'organizzazione restituisce il bundle dell'Aggiornamento Live dalla posizione, e l'app decrittografa lo zip e applica l'aggiornamento live. Voilà!

## Inizia ora

Sono entusiasta di estendere la portata degli Aggiornamenti Live a ancora più aziende di prima. Sia le organizzazioni che gli utenti delle app Ionic riconosceranno rapidamente i vantaggi della distribuzione sicura di aggiornamenti over-the-air delle app di Capgo.

Per maggiori informazioni sugli Aggiornamenti Live Self-hosted di Capgo, puoi [consultare la documentazione](/docs/cli/commands/#upload-version). Pronto a distribuire aggiornamenti istantanei dell'app direttamente ai tuoi utenti? [Registrati qui oggi!](/register/)
