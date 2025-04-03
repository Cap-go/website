---
slug: it__creating-mobile-apps-with-sveltekit-and-capacitor
title: Sviluppare Applicazioni Mobili con SvelteKit e Capacitor
description: >-
  Scopri come creare un'applicazione mobile con SvelteKit e Capacitor e
  migliorare l'interfaccia utente nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Illustrazione di SvelteKit e Capgo
tag: Tutorial
published: true
locale: it
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

In questo tutorial, inizieremo con una nuova app SvelteKit e passeremo allo sviluppo mobile nativo utilizzando Capacitor. Facoltativamente, puoi anche integrare Konsta UI per un'interfaccia utente mobile Tailwind CSS migliorata.

Capacitor ti permette di convertire facilmente la tua applicazione web SvelteKit in un'app mobile nativa senza la necessità di modifiche significative o di imparare una nuova competenza come React Native.

Segui questa guida passo-passo per trasformare la tua app SvelteKit in un'app mobile utilizzando Capacitor e, se lo desideri, migliorare la tua interfaccia utente mobile con Konsta UI.

## Informazioni su Capacitor

CapacitorJS è un punto di svolta! Può essere integrato senza sforzo in qualsiasi progetto web, avvolgendo la tua applicazione in una webview nativa e generando progetti nativi Xcode e Android Studio per te. I suoi plugin forniscono accesso alle funzionalità native del dispositivo come la fotocamera tramite un ponte JavaScript.

Capacitor ti permette di creare una fantastica app mobile nativa senza alcuna configurazione complicata o curva di apprendimento ripida. La sua API snella e la funzionalità semplificata lo rendono facile da integrare nel tuo progetto. Sarai sorpreso di quanto sia semplice ottenere un'app nativa completamente funzionale con Capacitor!

## Preparazione della tua app SvelteKit

Per creare una nuova app SvelteKit, esegui il seguente comando:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Dopo aver eseguito il comando `build`, dovresti vedere una nuova cartella `dist` alla radice del tuo progetto.

Questa cartella sarà utilizzata da Capacitor in seguito, ma per ora dobbiamo configurarla correttamente.

## Aggiunta di Capacitor alla tua app SvelteKit

Per impacchettare qualsiasi app web in un contenitore mobile nativo, dobbiamo seguire alcuni passaggi iniziali. Successivamente, è semplice come eseguire un singolo comando `sync`.

Per prima cosa, installa la CLI di Capacitor come dipendenza di sviluppo e configurala all'interno del tuo progetto. Durante la configurazione, puoi premere "invio" per accettare i valori predefiniti per nome e ID del bundle.

Successivamente, installa il pacchetto core e i pacchetti pertinenti per le piattaforme iOS e Android.

Infine, aggiungi le piattaforme, e Capacitor creerà cartelle per ciascuna piattaforma alla radice del tuo progetto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

A questo punto, dovresti vedere nuove cartelle **ios** e **android** nel tuo progetto SvelteKit.

**Questi sono progetti nativi reali!**

Per accedere al progetto Android in seguito, devi installare Android Studio. Per iOS, hai bisogno di un Mac e dovresti installare Xcode.

Inoltre, dovresti trovare un file **capacitor.config.ts** nel tuo progetto, che contiene alcune impostazioni di base di Capacitor utilizzate durante la sincronizzazione. L'unica cosa a cui devi prestare attenzione è il **webDir**, che deve puntare al risultato del tuo comando di build. Attualmente, è errato.

Per correggere questo, apri il file **capacitor.config.ts** e aggiorna il **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Ora che abbiamo aggiornato le nostre impostazioni Capacitor, cambiamo il nostro progetto SvelteKit in un'applicazione statica scaricando il pacchetto adattatore statico appropriato:

```shell
npm i -D @sveltejs/adapter-static
```

Dopo che il pacchetto è stato installato, dovremo modificare il file _svelte.config.js_ dall'adattatore automatico a quello statico:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

Con il _svelte.config.js_ aggiornato, dovremo aggiungere un'opzione _prerender_ creando una pagina _+layout.js_ in _src/routes_ e aggiungendo semplicemente la seguente esportazione a _+layout.js_:

```ts
export const prerender = true
```

Dopo aver aggiunto e aggiornato la pagina _+layout.js_, dovremo aggiungere le nostre piattaforme mobili, ricostruire il nostro progetto per creare la cartella _build_.

Puoi farlo eseguendo i seguenti comandi:

```shell
npm run build
npx cap sync
```

Il primo comando `npm run build` costruirà il tuo progetto SvelteKit e copierà la build statica, mentre il secondo comando `npx cap sync` sincronizzerà tutto il codice web nei posti giusti delle piattaforme native in modo che possano essere visualizzati in un'app.

Inoltre, il comando sync potrebbe aggiornare le piattaforme native e installare plugin, quindi quando installi nuovi plugin Capacitor, è il momento di eseguire nuovamente `npx cap sync`.Senza accorgersene, hai completato il processo, quindi vediamo l'app su un dispositivo!

## Compila e distribuisci app native

Per sviluppare app iOS, devi avere installato **Xcode**, e per le app Android, devi avere installato **Android Studio**. Inoltre, se prevedi di distribuire la tua app sullo store, devi iscriverti all'Apple Developer Program per iOS e alla Google Play Console per Android.

Se sei nuovo allo sviluppo mobile nativo, puoi usare la CLI di Capacitor per aprire facilmente entrambi i progetti nativi:

```shell
npx cap open ios
npx cap open android
```

Una volta configurati i tuoi progetti nativi, distribuire la tua app su un dispositivo connesso è facile. In Android Studio, devi solo attendere che tutto sia pronto, e puoi distribuire la tua app su un dispositivo connesso senza modificare alcuna impostazione. Ecco un esempio:

![android-studio-run](/android-studio-run.webp)

In Xcode, devi configurare il tuo account di firma per distribuire la tua app su un dispositivo reale invece che solo sul simulatore. Se non l'hai mai fatto prima, Xcode ti guida attraverso il processo (ma di nuovo, devi essere iscritto al Developer Program). Dopodiché, puoi semplicemente premere play per eseguire l'app sul tuo dispositivo connesso, che puoi selezionare in alto. Ecco un esempio:

![xcode-run](/xcode-run.webp)

Congratulazioni! Hai distribuito con successo la tua app web SvelteKit su un dispositivo mobile. Ecco un esempio:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

Ma aspetta, c'è anche un modo più veloce per farlo durante lo sviluppo.

## Ricaricamento live di Capacitor

A questo punto, probabilmente sei abituato ad avere il ricaricamento a caldo con tutti i framework moderni, e la buona notizia è che puoi avere la stessa funzionalità **su un dispositivo mobile** con uno sforzo minimo!

Abilita l'accesso alla tua applicazione ospitata localmente con ricaricamento live **sulla tua rete** facendo caricare all'app Capacitor il contenuto dall'URL specifico.

Il primo passo è scoprire il tuo indirizzo IP locale. Se stai usando un Mac, puoi scoprirlo eseguendo il seguente comando nel terminale:

```shell
ipconfig getifaddr en0
```

Su Windows, esegui:

```shell
ipconfig
```

Poi cerca l'indirizzo IPv4.

Possiamo istruire Capacitor a caricare l'app direttamente dal server aggiungendo un'altra voce al nostro file `capacitor.config.ts`:

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

Assicurati di usare **l'IP e la porta corretti**, come mostrato nell'esempio sopra.

Ora, possiamo applicare queste modifiche copiandole nel nostro progetto nativo:

```shell
npx cap copy
```

Il comando `copy` è simile a `sync`, ma copierà solo **le modifiche apportate alla cartella web** e alla configurazione, senza aggiornare il progetto nativo.

Ora puoi distribuire la tua app ancora una volta tramite Android Studio o Xcode. Dopo di che, se cambi qualcosa nella tua app Svelte, **l'app si ricaricherà automaticamente** e mostrerà i cambiamenti!

**Tieni presente** che se installi nuovi plugin come la fotocamera, è comunque necessaria una ricostruzione del tuo progetto nativo. Questo perché i file nativi vengono modificati, e non può essere fatto al volo.

Nota che dovresti usare l'IP e la porta corretti nella tua configurazione. Il blocco di codice sopra mostra la porta predefinita di SvelteKit a scopo dimostrativo.

## Uso dei plugin di Capacitor

Diamo un'occhiata a come usare un plugin di Capacitor in azione, che abbiamo menzionato alcune volte prima. Per fare questo, possiamo installare un semplice plugin eseguendo:

```shell
npm i @capacitor/share
```

Non c'è niente di particolare nel [plugin Share](https://capacitorjs.com/docs/apis/share/), ma fa apparire la finestra di dialogo nativa per la condivisione! Per questo, ora dobbiamo solo importare il pacchetto e chiamare la funzione `share()` dalla nostra app, quindi modifichiamo il file **src/routes/index.svelte** in questo modo:

```html
<script>
  import { Share } from '@capacitor/share';

  async function share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
</script>

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

Come menzionato in precedenza, quando installiamo nuovi plugin, dobbiamo eseguire un'operazione di sincronizzazione e poi ridistribuire l'app sul nostro dispositivo. Per farlo, esegui il seguente comando:

```
npx cap sync
```

Dopo aver premuto il pulsante, puoi vedere in azione la bellissima finestra di dialogo nativa per la condivisione!

## Aggiunta di Konsta UI

Per utilizzare Konsta UI nella tua app Nuxt 3, devi avere [tailwind già installato](https://tailwindcsscom/docs/guides/sveltekit/) e per installare il pacchetto:

```shell
npm i konsta
```

Inoltre, devi modificare il tuo file `tailwindconfigjs`:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` estenderà la configurazione Tailwind CSS predefinita (o la tua personalizzata) con alcune varianti extra e utilità di supporto richieste per Konsta UI

Ora dobbiamo configurare il componente principale [App](https://konstauicom/vue/app/) in modo da poter impostare alcuni parametri globali (come `theme`)

Dobbiamo avvolgere l'intera app con `App` nel file `src/routes/+layoutsvelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Pagina di esempio

Ora che tutto è configurato, possiamo utilizzare i componenti Konsta UI Svelte nelle nostre pagine SvelteKit

Ad esempio, apriamo `src/routes/indexsvelte` e modifichiamolo come segue:

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
    </p>
  </Block>
  <BlockTitle>Navigation</BlockTitle>
  <List>
    <ListItem href="/about/" title="About" />
    <ListItem href="/form/" title="Form" />
  </List>

  <Block strong class="flex space-x-4">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </Block>
</Page>
```

Se il live reload non è sincronizzato dopo aver installato tutti i componenti necessari, prova a riavviare tutto. Una volta fatto ciò, dovresti vedere un'app mobile con un aspetto quasi nativo, costruita con SvelteKit e Capacitor!

Dovresti vedere la seguente pagina come risultato:

<script>
  </script>
<h1>

## Conclusione

Capacitor è un'ottima opzione per costruire applicazioni native basate su un progetto web esistente, offrendo un modo semplice per condividere il codice e mantenere un'interfaccia utente coerente

E con l'aggiunta di [Capgo](https://capgoapp/), è ancora più facile aggiungere aggiornamenti in tempo reale alla tua app, assicurando che i tuoi utenti abbiano sempre accesso alle ultime funzionalità e correzioni di bug

Se vuoi imparare come aggiungere Capgo alla tua app SvelteKit, dai un'occhiata al prossimo articolo:

Scopri come Capgo può aiutarti a costruire app migliori più velocemente, [registrati per un account gratuito](/register/) oggi stesso