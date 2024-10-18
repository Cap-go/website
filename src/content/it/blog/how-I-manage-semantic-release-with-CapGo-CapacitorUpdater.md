---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Come Rapido Cloud gestisce il rilascio semantico con CapGo CapacitorUpdater
description: >-
  Ecco come ho configurato Semantic Release per gestire la pubblicazione della
  mia applicazione utilizzando CapGo CapacitorUpdater
author: Rupert Barrow
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
tag: Case Study
published: true
locale: it
next_blog: ''
---

# Come Rapido Cloud gestisce il Semantic Release con CapGo CapacitorUpdater

## 1 Introduzione

In Rapido Cloud (wwwrapidocloud), sto sviluppando un'applicazione mobile per clienti Salesforce per distribuire facilmente la propria applicazione mobile personalizzata senza dover passare attraverso i difficili passaggi dell'utilizzo di Salesforce Mobile SDK o Salesforce Mobile Publisher.

Ho sviluppato questa app mobile su una piattaforma moderna e "standard" con componenti e strumenti diffusi tra cui Ionic 8, Angular 18, TypeScript, Capacitor e ora CapGo CapacitorUpdater. Questi sono più semplici da gestire per i clienti che non vogliono gestire le specifiche della piattaforma Salesforce come i Lightning Web Components; ed è più facile ed economico per me reclutare sviluppatori e manutentori di applicazioni mobili Ionic + Angular.

Questo articolo spiega il mio design, le mie scelte e l'implementazione che rendono CapGo e `semantic-release` una soluzione di successo ovvia per gestire automaticamente tutti i deployment tramite Github Actions. Tutto questo è stato progettato, testato e documentato durante il piacevole periodo di prova gratuito di 14 giorni di CapGo CapacitorUpdater.

## 2 Perché usare CapGo? Perché usare semantic-release?

CapGo CapacitorUpdater mi ha attratto con la sua promessa di rendere i deployment delle app mobili molto più semplici, rapidi e flessibili rispetto al processo di distribuzione standard tramite Apple AppStore/Google PlayStore.
Questa è la mia prima applicazione mobile che sto pubblicando sugli store, essendomi concentrato in passato su app web, solitamente sviluppate su Salesforce Experience Cloud.

Ero piuttosto preoccupato della curva di apprendimento per avere successo, ma sono riuscito a pubblicare la mia app su Apple TestFlight abbastanza facilmente. Ero quindi in grado di utilizzare CapGo CapacitorUpdater per distribuire i miei aggiornamenti molto più velocemente.

Il mio primo requisito e caso di test era di distribuire per me stesso per testare la mia app come una vera app mobile sul mio telefono, invece di testare in un emulatore mobile o in un simulatore tramite il browser mobile Nexus suggerito da Ionic. Questo perché la mia app utilizza funzionalità native come la Geolocalizzazione o l'accesso alla Galleria Foto e alla Fotocamera. Non avendo esperienza passata nel testare un'app mobile Capacitor, non ero sicuro che tutto avrebbe funzionato correttamente: niente di meglio che testare l'app reale, in condizioni reali!

Quindi CapGo CapacitorUpdater mi ha aiutato ad aggiornare la mia applicazione sul mio cellulare, in tempo reale, 1 minuto dopo aver salvato una nuova funzionalità o correzione nel mio codice sorgente: così rassicurante, flessibile e facile da configurare!

## 3 Il mio modello di branching e rilascio, e come semantic-release si adatta

Ora che ho il mio processo di consegna ai server CapGo funzionante correttamente, devo automatizzarlo e integrarlo nella mia pipeline CI/CD.

### Ecco come organizzo il mio modello di branching e rilascio

Per ogni applicazione, sia mobile, web o Salesforce:
- Lo **sviluppo** viene effettuato su branch `feature/` derivati da `main`, e vengono uniti in `main` che è il riferimento per la maggior parte dei branch di sviluppo, al di fuori della manutenzione e delle funzionalità specifiche per consegne personalizzate (più dettagli su questo in seguito)
- **I deployment vengono attivati __dai branch di rilascio__** che possono essere: `production`, branch di pre-rilascio (`alpha`, `beta`, `nightly`, ecc.) e anche branch specifici per cliente o contesto per consegne personalizzate
- **I deployment vengono attivati da una pull request** che viene unita in un branch di deployment. Non uso deployment attivati da tag perché semantic release gestisce i tag e tutto il resto per me

Fondamentalmente, questo è il Gitlab Flow:

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlab Flow - fonte https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Una nota a margine su come funziona semantic-release:

In un branch di deployment, quando semantic-release viene attivato, calcolerà automaticamente il nuovo numero di versione su questo branch, a seconda del numero di versione del tag precedente sul branch e delle correzioni o funzionalità consegnate. Le correzioni creeranno una nuova versione patch, mentre le funzionalità creeranno una nuova versione minor.Ecco la traduzione in italiano:

Include anche automaticamente la versione di prerelease "alpha", "beta", ecc. nel numero di versione

Semantic release genera il changelog dai tuoi commit, raggruppando correzioni e funzionalità come definito nei commit convenzionali (vedi https://www.conventionalcommits.org/en/about) e configurato in semantic release

Aggiornerà anche tutte le tue pull request unite su git (GitHub, nel mio caso) e i problemi correlati con commenti che li collegano al tag e alla release. Infine, in questa release GitHub, allegherà risorse come codice sorgente, binari se necessario, `CHANGELOG.md`, ecc.

## 4. Rami, release/prerelease, canali in semantic release e in CapGo

Quindi ciò che voglio che semantic release faccia per i deployment di CapGo è quanto segue

### Voglio che semantic release generi il numero di versione

CapGo ha sviluppato e documentato la propria versione dello strumento "Conventional Commits" `standard-version`, con il loro repository forkato `standard-version` (https://github.com/Cap-go/standard-version), e i loro repository `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) e `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Hanno documentato sul loro blog lo schema di versione utilizzato da CapGo nei loro deployment (https://capgo.app/blog/how-version-work-in-capgo/). I bundle JavaScript seguono il "standard" semver "Semantic Versioning" (https://semver.org) che `semantic-release` segue anche (ovviamente!)

Quindi è fantastico, ed è un sollievo per me perché uso ampiamente `semantic-release`

### Voglio anche che semantic release generi deployment dell'app su diversi canali

Come menzionato sopra, ho bisogno di distribuire versioni prerelease da rami come `alpha`, `beta`, `nightly` ecc., ma anche versioni specifiche per cliente su rami come `production-customer-jones`, `production-customer-doe`, ecc.

CapGo fornisce la funzionalità "canali" che è esattamente ciò che supporta anche semantic release, quindi sono entusiasta di farli funzionare insieme. Questi si adattano anche alle diverse build dei rami gestite da XCode Cloud (vedi più avanti per maggiori dettagli).

I numeri di versione semver generati da semantic release sulle prerelease sembrano `1.0.0-alpha.1`. Le build successive su questo ramo incrementeranno il numero di build a `1.0.0-alpha.2`, ecc. Anche se non documentato esplicitamente, questi numeri di versione sono supportati da CapGo, il che è una grande notizia per me: userò i canali e le prerelease di semantic release per generare versioni della mia app con i canali di CapGo.

## 5. Come posso usare CapGo per rilasciare la mia applicazione?

Per automatizzare il deployment dei bundle della tua app su CapGo, devi usare il comando CLI di CapGo `bundle upload`. Digita `npx @capgo/cli@latest bundle upload --help` per ottenere le numerose opzioni di caricamento. Tra queste, useremo le seguenti:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL è il canale CapGo su cui vogliamo distribuire (es. `alpha`)
- VERSION è generata da semantic release (es. `1.0.0-alpha.1`)
- CAPGO_APIKEY è fornita da CapGo per identificare univocamente il login della tua pipeline CI/CD
- CAPGO_APPID è fornito da CapGo per identificare univocamente la tua applicazione (es. `com.mystartup.mysuperapp`)

## 6. Il mio setup semantic release + CapGo CapacitorUpdate

Infine, come si incastra tutto questo?

![Versioni dei bundle dell'app costruite con semantic release e Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versioni dei bundle dell'app costruite con semantic release e Github Actions*

### Automazione di semantic release con Github Actions

La bellezza di semantic release è che l'automazione del deployment, sotto forma di un workflow di Github Action, è molto semplice. Questo sarà molto simile su altre piattaforme CI/CD.
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

Questo installa semplicemente l'ambiente NodeJS, quindi chiama semantic release

Per ogni merge su un ramo elencato in `branches`, semantic release attiverà un deployment
Imposta `CAPGO_APIKEY` nei segreti del tuo repository
Aggiorna il tuo `CAPGO_APPID` qui

Il comportamento di semantic release è impostato nel suo file di configurazione `releaser.json`Ecco le mie impostazioni, spiegate di seguito:

```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches`:
  - `branches` imposta la configurazione dei rami (`name`), mappati al canale CapGo (`channel`) e come verrà chiamato il numero di versione prerelease (`prerelease`). Ad esempio, se `branchprerelease = "development"`, il numero di versione generato da semantic release sarà `xyz-developmentn`
  - i deploy sui rami `alpha` e `alpha-nocapgo` distribuiranno entrambi l'app sul canale `alpha`, ma con nomi prerelease diversi nel numero di versione
  - i deploy sui rami degli sviluppatori `dev-rupert` o `dev-paul` distribuiranno entrambi sul canale `development` di CapGo, tutti con la stessa parola chiave `development` prerelease nel numero di versione
- `verifyConditions`: nella prima fase di semantic release, verifica di avere l'accesso corretto a Github. Spero di aggiungere qui in seguito un controllo di autenticazione per la CLI di CapGo
- `@semantic-release/commit-analyzer`: cose standard di semantic release - vedi la loro documentazione (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: genera il file changelog come `CHANGELOG.md`
- `@semantic-release/git`: commit dei seguenti file che sono stati aggiornati dalla build Ionic dell'applicazione e dal lavoro di semantic release (`package.json`, `CHANGELOG.md` e `ios/App/App.xcodeproj/project.pbxproj` - non faccio ancora build per Android)
- `@semantic-release/github`: allega il file `CHANGELOG.md` al rilascio Github come asset
- `@semantic-release/exec`: usa questi 2 comandi per preparare la build dell'app (`prepareCmd`) e poi per costruire e distribuire effettivamente il bundle dell'app ai server CapGo (`publishCmd`)

Noterai che non c'è bisogno di spiegare come vogliamo che il numero di versione venga calcolato e incrementato, come dobbiamo generare un changelog, un tag o un rilascio Github, ecc.: tutto è gestito di default da semantic release, con una configurazione minima

### Costruire nuovi binari con XCode Cloud

Integrare tutto questo con XCode Cloud per costruire nuove versioni del binario dell'applicazione è semplice (non sto ancora distribuendo su Google Play, ma quella build dovrebbe essere simile):
- Imposto un processo XCode Cloud per costruire quando c'è un cambiamento sul ramo che desidero usare per questo (es. `production`)
- su questo ramo, imposto XCode Cloud per costruire solo quando il file `CHANGELOG.md` viene aggiornato. Questo viene aggiornato dopo ogni versione generata da semantic release
- Posso attivare build su diversi rami per simulare il deploy per diversi canali. In ogni configurazione di build XCode Cloud su un ramo diverso, imposto manualmente una variabile d'ambiente con il valore di `branch.channel` impostato in `releaser.json` (sì, questa è una duplicazione manuale) e quindi, se volessi, potrei distribuire una diversa applicazione AppStore per ogni applicazione cliente personalizzata distribuita da un ramo di rilascio personalizzato, come menzionato in precedenza

![Costruire binari dell'app su XCode Cloud con canali CapGo](/RBW_XCode_Cloud_building.webp)

*Costruire binari dell'app su XCode Cloud con canali CapGo*

## 7 Conclusione

In conclusione, sono molto felice di essere riuscito a integrare CapGo CapacitorUpdater nella mia pipeline standard di semantic release, rapidamente entro il periodo di prova di 14 giorni, e il risultato è il seguente:
- i numeri di versione dei bundle sono generati automaticamente da semantic release e compatibili con i server CapGo
- semantic release distribuisce automaticamente i bundle dell'applicazione CapGo, utilizzando anche i canali CapGo
- questo si adatta bene alle build di binari dell'applicazione di XCode Cloud

### Prossimi passi

Sono attualmente nella fase di sviluppo di questa app. La renderò rapidamente disponibile ai tester attraverso TestFlight (per iOS). Considerando la potenza di CapGo, molto probabilmente distribuirò una versione gratuita dell'app sull'AppStore per i test, che verrà aggiornata regolarmente con CapGo durante i testTradurrò quindi un'altra versione (a pagamento) dell'app sull'AppStore, con un altro record, e la aggiornerò regolarmente con CapGo

Spero di aggiungere una migliore verifica pre-build dei prerequisiti di CapGo `bundle upload` nella mia configurazione di rilascio semantico

Ora ho una pipeline di rilascio semantico pulita, semplice e riproducibile per future app mobili sviluppate con Ionic + Angular + Capacitor


## Autore - Rupert Barrow

Ho oltre 22 anni di esperienza con Salesforce, come cliente e utente, come partner e integratore, architetto, sviluppatore, analista di business e consulente. Ho co-fondato e co-gestito Altius Services come COO e CTO per 13 anni, un partner SI Salesforce di successo in Francia, prima di intraprendere una nuova avventura come solopreneur Salesforce con la mia offerta di prodotti **Rapido Cloud**

Puoi trovarmi su LinkedIn all'indirizzo https://linkedincom/in/rbarrow

Puoi dare un'occhiata alle nostre offerte Salesforce su https://wwwrapido-companionapp e https://wwwrapidocloud (in fase di sviluppo)