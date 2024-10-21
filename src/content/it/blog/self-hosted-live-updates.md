---
slug: self-hosted-live-updates
title: Aggiornamenti live self-hosted
description: >-
  Sono lieto di annunciare Self-hosted Live Updates, la prossima iterazione di
  Capacitor Live Updates!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Aggiornamenti autogestiti
tag: Solution
published: true
locale: it
next_blog: ''
---

Sono lieto di annunciare il rilascio degli Aggiornamenti in tempo reale auto-ospitati, che rappresenta l'ultima evoluzione degli Aggiornamenti in tempo reale di Capgo.

Mentre molte aziende attualmente utilizzano l'SDK degli Aggiornamenti in tempo reale per accedere agli aggiornamenti più recenti di JavaScript, HTML e CSS per le loro applicazioni, alcune potrebbero incontrare ostacoli a causa di politiche aziendali, regolamenti di settore o restrizioni geografiche. Con gli Aggiornamenti in tempo reale auto-ospitati, ora puoi distribuire gli artefatti di build web tramite la tua infrastruttura.

Ciò significa che puoi evitare ritardi causati dalle revisioni dell'Apple Store, risolvere bug e modificare contenuti più rapidamente, e assicurarti che i tuoi utenti stiano sempre utilizzando l'ultima versione della tua app. Inoltre, ho sentito da numerose grandi aziende che vorrebbero sfruttare gli Aggiornamenti in tempo reale ma affrontano sfide a causa di rigidi standard di conformità. Questo problema è ora un ricordo del passato grazie agli Aggiornamenti in tempo reale auto-ospitati.

## Come funzionano gli aggiornamenti in tempo reale auto-ospitati?

Implementare gli Aggiornamenti in tempo reale ospitati da Capgo è un gioco da ragazzi utilizzando l'SDK di Capgo. Per quanto riguarda gli Aggiornamenti in tempo reale auto-ospitati, ho migliorato la CLI di Capgo con le funzionalità necessarie per consentire la configurazione sulla tua infrastruttura.

Per garantire una consegna sicura e coordinata degli ultimi artefatti di build web agli utenti finali, Capgo ora consente al plugin Capacitor Live Updates di utilizzare una coppia di chiavi pubblica/privata. Quando si utilizzano gli Aggiornamenti in tempo reale auto-ospitati, viene eseguita una stretta di mano aggiuntiva per fornire la rassicurazione che gli artefatti scaricati tramite il plugin dall'infrastruttura dell'azienda non siano stati modificati.

![Schema di crittografia Capgo](/encryption_flow.webp)

Di seguito sono illustrati i passaggi per stabilire la coppia di chiavi e il successivo processo per fornire l'esperienza aggiornata agli utenti finali.

### Configurazione una tantum della coppia di chiavi

Per generare una coppia di chiavi pubblica/privata, le aziende possono utilizzare il seguente comando della CLI di Capgo Cloud:

```shell
npx @capgo/cli@latest key create
```

Questo comando imposterà le proprietà `CapacitorUpdater.privateKey` nel tuo file di configurazione
E genererà 2 file di chiave, `capgo_key.pub` e `capgo_key` nella directory principale del tuo progetto.

Questa coppia di chiavi viene utilizzata per firmare l'aggiornamento e verificarlo sul lato dell'app.

### Flusso di lavoro degli aggiornamenti in tempo reale auto-ospitati

Per iniziare a implementare gli Aggiornamenti in tempo reale auto-ospitati, un'azienda deve prima eseguire una build web delle correzioni di bug, aggiornamenti di contenuto o qualsiasi altra modifica del codice basata sul web che desidera apportare. Successivamente, deve firmare l'artefatto di build utilizzando la chiave privata ottenuta durante il processo di configurazione una tantum e infine caricare il pacchetto nella posizione di archiviazione preferita.

Prima costruisci il tuo codice:
```shell
npm run build
```

Quindi comprime la tua build:
```shell
npx @capgo/cli/latest bundle zip
```

Poi crittografa il tuo zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Questo comando stamperà un ivSessionKey, che devi salvare per il passaggio successivo.

Ora carica il tuo zip crittografato nell'archivio aziendale e ottieni l'URL del file zip.

Capgo deve quindi essere informato di un nuovo Aggiornamento in tempo reale pronto per il consumo. Questo viene fatto tramite un altro comando CLI:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Una volta eseguito il comando, Capgo è consapevole di un nuovo aggiornamento pronto per essere distribuito agli utenti dell'app. Ora, quando l'app viene avviata, il plugin degli Aggiornamenti in tempo reale verifica con Capgo se ci sono modifiche da scaricare.

Capgo risponde al plugin con "Sì, è disponibile un aggiornamento" e il plugin degli Aggiornamenti in tempo reale scarica il nuovo aggiornamento in tempo reale utilizzando la posizione URL fornita dal comando CLI `register`:

```shell
https://abc.com/app/updates/abc123.zip
```

L'API dell'organizzazione restituisce il pacchetto di Aggiornamento in tempo reale dalla posizione, e l'app decrittografa lo zip e applica l'aggiornamento in tempo reale. Voilà!

## Inizia

Sono entusiasta di estendere la portata degli Aggiornamenti in tempo reale a un numero ancora maggiore di aziende rispetto a prima. Sia le organizzazioni che gli utenti delle app Ionic riconosceranno rapidamente i vantaggi della distribuzione sicura degli aggiornamenti delle app over-the-air di Capgo.

Per ulteriori informazioni sugli Aggiornamenti in tempo reale auto-ospitati di Capgo, puoi [consultare la documentazione](/docs/tooling/cli/#upload-version).Pronto a distribuire aggiornamenti istantanei dell'app direttamente ai tuoi utenti? [Registrati qui oggi!](/register/)