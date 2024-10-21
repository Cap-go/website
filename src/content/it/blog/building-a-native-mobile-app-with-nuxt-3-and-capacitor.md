---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Creare un'Applicazione Mobile con Nuxt 3 e Capacitor
description: >-
  Come creare un'applicazione mobile con Nuxt 3, Capacitor e implementare
  un'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Illustrazione di Nuxt 3 e Capgo
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In questo tutorial, partiremo da una nuova app Nuxt 3 e passeremo al mondo nativo utilizzando Capacitor e infine aggiungeremo anche Konsta UI per una migliore interfaccia utente mobile con Tailwind CSS, sebbene quest'ultimo passaggio sia completamente opzionale.

Utilizzando Capacitor, puoi facilmente convertire la tua applicazione web Nuxt 3 in un'app mobile nativa senza richiedere modifiche significative o imparare una nuova competenza come React Native.

Con pochi semplici passaggi, la maggior parte delle applicazioni Nuxt 3 può essere trasformata in app mobili.

Questo tutorial ti guiderà attraverso il processo, partendo da una nuova app Nuxt 3 e incorporando Capacitor per passare al regno delle app mobili native. Inoltre, puoi opzionalmente utilizzare Konsta UI per migliorare la tua interfaccia utente mobile con Tailwind CSS.

## Riguardo a Capacitor

Capacitor è davvero rivoluzionario! Puoi incorporarlo facilmente in qualsiasi progetto web, e avvolgerà la tua applicazione in una webview nativa, generando per te il progetto nativo Xcode e Android Studio. Inoltre, i suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un ponte JS.

Con Capacitor, ottieni un'app mobile nativa fantastica senza alcuna configurazione complicata o curva di apprendimento ripida. La sua API snella e la funzionalità semplificata lo rendono facile da integrare nel tuo progetto. Fidati, sarai stupito da quanto sia semplice ottenere un'app nativa completamente funzionante con Capacitor!

## Preparazione della tua app Nuxt 3

Per creare una nuova app Nuxt 3, esegui il seguente comando:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Scegli "Nuxt 3" quando ti viene chiesto la versione di Nuxt.

Per creare un'app mobile nativa, abbiamo bisogno di un **export** del nostro progetto. Quindi, includiamo uno script semplice nel nostro **package.json** che può essere utilizzato per costruire e copiare il progetto Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Dopo aver eseguito il comando `generate`, dovresti essere in grado di vedere una nuova cartella `dist` alla radice del tuo progetto.

Questa cartella sarà utilizzata da Capacitor in seguito, ma per ora dobbiamo configurarla correttamente.

## Aggiungere Capacitor alla tua app Nuxt 3

Per impacchettare qualsiasi app web in un contenitore mobile nativo, dobbiamo seguire alcuni passaggi iniziali, ma successivamente è semplice come eseguire un singolo comando `sync`.

Innanzitutto, possiamo installare il Capacitor CLI come dipendenza di sviluppo, e poi configurarlo all'interno del nostro progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del bundle.

Successivamente, dobbiamo installare il pacchetto core e i pacchetti rilevanti per le piattaforme iOS e Android.

Infine, possiamo aggiungere le piattaforme, e Capacitor creerà cartelle per ciascuna piattaforma alla radice del nostro progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

A questo punto, dovresti essere in grado di osservare nuove cartelle **ios** e **android** nel tuo progetto Nuxt 3.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android in seguito, devi installare Android Studio. Per iOS, hai bisogno di un Mac e dovresti installare Xcode.

Inoltre, dovresti trovare un file **capacitor.config.ts** nel tuo progetto, che contiene alcune impostazioni fondamentali di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, è impreciso.

Per correggere questo, apri il file **capacitor.config.json** e aggiorna il **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Puoi provarlo eseguendo i seguenti comandi:

```shell
npm run generate
npx cap sync
```

Il primo comando `npm run generate` costruirà semplicemente il tuo progetto Nuxt 3 e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi plugin Capacitor è il momento di eseguire nuovamente `npx cap sync`.Senza accorgertene, ora hai effettivamente finito, quindi vediamo l'app su un dispositivo!

## Compilare e distribuire app native

Per sviluppare app iOS, devi avere installato **Xcode**, e per le app Android, devi avere installato **Android Studio**. Inoltre, se prevedi di distribuire la tua app sugli store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo nello sviluppo mobile nativo, puoi usare la CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è semplice. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Programma Developer). Dopo di che, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

Congratulazioni! Hai distribuito con successo la tua web app Nuxt 3 su un dispositivo mobile. Ecco un esempio:

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo.

## Live Reload di Capacitor

A questo punto, probabilmente sei abituato ad avere il reload a caldo con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con live reload **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è scoprire il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

Su Windows, esegui:

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor a caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

Assicurati di usare **l'IP e la porta corretti**, ho usato la porta predefinita di Nuxt 3 in questo esempio.

Ora, possiamo applicare queste modifiche copiandole sul nostro progetto nativo:

Il comando `copy` è simile a `sync`, ma **copierà solo le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta attraverso Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app Nuxt, **l'app si ricaricherà automaticamente** e mostrerà i cambiamenti!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è comunque necessaria una ricompilazione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di Nuxt 3 a scopo dimostrativo.

## Utilizzo dei Plugin di Capacitor

Diamo un'occhiata a come utilizzare un plugin di Capacitor in azione, che abbiamo menzionato alcune volte prima. Per farlo, possiamo installare un plugin abbastanza semplice eseguendo:

Non c'è nulla di speciale nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma comunque fa apparire il dialogo di condivisione nativo! Per questo ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` corrispondente dalla nostra app, quindi modifichiamo **pages/index.vue** in questo:

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo.Per eseguire questa operazione, esegui il seguente comando:

```shell
npx cap open ios
npx cap open android
```

Dopo aver premuto il pulsante, potrai vedere in azione la bellissima finestra di dialogo per la condivisione nativa!

## Aggiunta di Konsta UI

Per utilizzare Konsta UI nella tua app Nuxt 3, devi avere [tailwind già installato](https://tailwindcss.com/docs/guides/nuxtjs/) e installare il pacchetto:

```shell
ipconfig getifaddr en0
```

Inoltre, devi modificare il tuo file `tailwind.config.js`:

```shell
ipconfig
```

`konstaConfig` estenderà la configurazione predefinita (o la tua personalizzata) di Tailwind CSS con alcune varianti extra e utility helper richieste per Konsta UI.

Ora dobbiamo configurare il componente principale [App](https://konsta-ui.com/vue/app/) in modo da poter impostare alcuni parametri globali (come `theme`).

Dobbiamo avvolgere l'intera app con `App` nel file `pages/_app.vue`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

### Pagina di esempio

Ora che tutto è configurato, possiamo utilizzare i componenti Vue di Konsta UI nelle nostre pagine Nuxt 3.

Ad esempio, apriamo `pages/index.vue` e modifichiamolo come segue:

```shell
npx cap copy
```

Se il live reload non è sincronizzato dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto ciò, dovresti vedere un'app mobile con un aspetto quasi nativo, costruita con Nuxt 3 e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'interfaccia utente coerente.

E con l'aggiunta di [Capgo](https://capgo.app/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug.

Se desideri imparare come aggiungere Capgo alla tua app Nextjs, dai un'occhiata al prossimo articolo:

## Crediti

Grazie mille a Simon, questo articolo è basato su [questo articolo](https://devdactic.com/nextjs-and-capacitor/) riscritto per nuxt3 con chat-gpt-4 e adattato.