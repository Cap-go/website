---
slug: npm-scripts-for-capacitor-ota-updates-explained
title: Script npm per gli Aggiornamenti OTA di Capacitor Spiegati
description: >-
  Scopri come automatizzare gli aggiornamenti OTA per la tua app Capacitor
  utilizzando gli script npm, migliorando l'efficienza di distribuzione e
  l'esperienza utente.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-13T01:07:05.331Z
updated_at: 2025-11-24T15:08:57.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67fb02ab2e221594daf3f266-1744506438251.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, npm scripts, OTA updates, CI/CD, mobile app deployment, automation,
  app version management, security
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**L'aggiornamento della tua app [Capacitor](https://capacitorjs.com/) non è mai stato così facile.** Combinando gli aggiornamenti Over-The-Air (OTA) con gli script npm, puoi automatizzare le distribuzioni, risparmiare tempo e assicurarti che i tuoi utenti abbiano sempre l'ultima versione - senza attendere le approvazioni degli app store.

**Ecco cosa imparerai:**

- Come configurare gli script npm per gli aggiornamenti OTA.
- Integrare gli aggiornamenti nelle pipeline CI/CD per l'automazione.
- Gestire le versioni delle app, la sicurezza e testare gli aggiornamenti.
- Perché [Capgo](https://capgo.app/) è una piattaforma affidabile per gestire gli aggiornamenti OTA.

**Vantaggi principali:**

- Automatizza gli aggiornamenti con un solo comando.
- Distribuisci gli aggiornamenti in modo sicuro con la crittografia.
- Integra gli aggiornamenti nei flussi di lavoro come [GitHub Actions](https://docs.github.com/actions).
- Risparmia tempo con strumenti come Capgo, che distribuisce aggiornamenti in meno di 500ms.

**Esempio di configurazione rapida:**

1. Installa gli strumenti: `npm install @capgo/cli --save-dev`
2. Configura gli aggiornamenti in `capacitor.config.json`
3. Aggiungi script npm come `deploy:production` per semplificare la distribuzione.

Con piattaforme come Capgo che offrono aggiornamenti rapidi (95% di adozione degli utenti in 24 ore) e prezzi accessibili, la gestione degli aggiornamenti OTA non è mai stata più efficiente.

## Configurazione degli script npm per gli aggiornamenti OTA

Ecco come configurare gli script npm per gestire efficacemente gli [aggiornamenti OTA di Capacitor](https://capgo.app/ja/). Questo prevede l'installazione dei pacchetti necessari, la configurazione e la creazione di script di distribuzione.

### Installazione dei pacchetti richiesti

Prima, installa i pacchetti richiesti. Lo [strumento CLI di Capgo](https://capgo.app/docs/cli/commands) semplifica questo processo con comandi integrati:

```bash
npm install @capgo/cli --save-dev
```

Quindi, inizializza la configurazione OTA usando il seguente comando:

```bash
npx @capgo/cli init
```

### Configurazione degli aggiornamenti OTA

Aggiorna il tuo file `capacitor.config.json` con le seguenti impostazioni per preparare la tua app agli aggiornamenti OTA:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "statsUrl": "https://your-stats-url.com"
    }
  }
}
```

Questa configurazione assicura che la tua app possa recuperare gli aggiornamenti automaticamente e riportare le statistiche.

### Creazione degli script di distribuzione

Aggiungi questi script npm al tuo file `package.json` per semplificare il processo di build e distribuzione:

```json
{
  "scripts": {
    "build:web": "ionic build",
    "build:update": "npx @capgo/cli build",
    "deploy:update": "npx @capgo/cli upload",
    "deploy:production": "npm run build:web && npm run build:update && npm run deploy:update"
  }
}
```

- **`build:web`**: Compila gli asset web, tipicamente usato durante lo sviluppo e la distribuzione.
- **`build:update`**: Prepara il pacchetto di aggiornamento per gli aggiornamenti OTA.
- **`deploy:update`**: Carica il pacchetto di aggiornamento su Capgo.
- **`deploy:production`**: Gestisce il flusso di lavoro completo di build e distribuzione, ideale per i rilasci in produzione.

> "Configuriamo la tua pipeline CI/CD direttamente nella tua piattaforma preferita, che sia GitHub Actions, GitLab CI o altre. Non ospitiamo CI/CD né ti addebitiamo per mantenerla." - Capgo [\[1\]](https://capgo.app/)

### Impostazione delle variabili d'ambiente

Per finalizzare la configurazione, definisci queste variabili d'ambiente:

```bash
CAPGO_TOKEN=your_token_here
APP_ID=your_app_id
CHANNEL=production
```

### Compatibilità e affidabilità

La CLI di Capgo supporta Capacitor 6 e 7, assicurando che funzioni con le ultime versioni mantenendo una funzionalità di aggiornamento affidabile.

| Comando Script | Scopo | Quando usarlo |
| --- | --- | --- |
| **build:web** | Compila gli asset web | Durante lo sviluppo e la distribuzione |
| **build:update** | Prepara il pacchetto di aggiornamento | Prima di ogni aggiornamento OTA |
| **deploy:update** | Carica gli aggiornamenti su Capgo | Quando gli aggiornamenti sono pronti per essere distribuiti |
| **deploy:production** | Gestisce il flusso di lavoro completo | Per i rilasci in produzione |

## Aggiunta di script npm a CI/CD

L'integrazione degli script npm nella tua pipeline CI/CD può semplificare il processo di aggiornamento Over-The-Air (OTA) per le app Capacitor. Ecco una guida per configurare le distribuzioni automatizzate in modo efficiente.

### Configurazione del build CI/CD

Configura il tuo ambiente CI/CD con le variabili e i passaggi necessari:

```yaml
steps:
  - name: Setup Node.js
    uses: actions/setup-node@v6
    with:
      node-version: '24'
```

Per prestazioni ottimali, includi il caching nel tuo processo di build:

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
```

### Guida alla configurazione di [GitHub Actions](https://docs.github.com/actions)

![GitHub Actions](https://assets.seobotai.com/capgo.app/67fb02ab2e221594daf3f266/14ecce2811e9ac36444c59b954e81473.jpg)

Per automatizzare il tuo flusso di lavoro di distribuzione, crea un file `.github/workflows/ota-deploy.yml` con questa configurazione:

```yaml
name: Deploy OTA Update
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Deploy Update
        run: npm run deploy:production
```

Questa configurazione assicura che la tua app venga distribuita automaticamente ogni volta che vengono apportate modifiche al branch `main`.

### Recupero e correzioni degli aggiornamenti

Per gestire potenziali fallimenti degli aggiornamenti, includi meccanismi di recupero nella tua pipeline CI/CD. Queste funzionalità possono aiutare a mantenere la stabilità dell'app:

| Funzione di recupero | Implementazione | Scopo |
| --- | --- | --- |
| **Rollback versione** | `npm run revert:update` | Ritorna all'ultima versione stabile |
| **Controlli di salute** | `npm run verify:update` | Assicura che l'aggiornamento funzioni correttamente |
| **Auto-retry** | `maxRetries: 3` nella configurazione | Tenta l'aggiornamento più volte |

Puoi migliorare il tuo script di distribuzione per gestire gli errori automaticamente. Per esempio:

```javascript
try {
  await deploy();
} catch (error) {
  await revertToLastStable();
  notifyTeam(error);
}
```

Questo script assicura che se una distribuzione fallisce, il sistema tornerà alla versione stabile precedente. Inoltre, la tua pipeline CI/CD può inviare report di stato e attivare notifiche attraverso la tua piattaforma preferita.

## Suggerimenti per la gestione degli aggiornamenti OTA

La gestione efficace degli aggiornamenti OTA implica tenere sotto controllo il controllo delle versioni, test rigorosi e protocolli di sicurezza solidi. Ecco come puoi semplificare gli aggiornamenti usando gli script npm.

### Gestione delle versioni

Il versionamento semantico è un modo semplice per gestire gli aggiornamenti delle app. Ecco un esempio di configurazione:

```json
{
  "version": "1.2.3",
  "build": {
    "development": "dev-${version}",
    "production": "prod-${version}"
  }
}
```

L'utilizzo di canali separati come Production, Beta, Alpha e Hotfix permette distribuzioni mirate. Queste strategie rendono più facile testare gli aggiornamenti e assicurare distribuzioni senza problemi.

### Passaggi per il test degli aggiornamenti

Il testing automatizzato è essenziale per individuare i problemi in anticipo. Usa gli script npm per semplificare il processo:

```json
{
  "scripts": {
    "test:update": "npx @capgo/cli test",
    "test:integration": "cypress run",
    "test:all": "npm run test:update && npm run test:integration"
  }
}
```

Testare gli aggiornamenti in fasi attraverso diversi canali aiuta a identificare i problemi prima che raggiungano tutti gli utenti. Le procedure automatizzate di rollback sono un'altra rete di sicurezza per mantenere la stabilità dell'app.

### Misure di sicurezza per gli aggiornamenti

La sicurezza è critica negli aggiornamenti OTA. Ecco alcune misure chiave da implementare:

| Funzione di sicurezza | Implementazione | Scopo |
| --- | --- | --- |
| Crittografia end-to-end | Fornita da Capgo | Protegge contro le violazioni dei dati |
| Firma degli aggiornamenti | Verifica dei pacchetti | Conferma che gli aggiornamenti sono autentici |
| Controllo degli accessi | Permessi basati sui ruoli | Limita l'accesso del team |

> "L'unica soluzione con vera crittografia end-to-end, gli altri si limitano a firmare gli aggiornamenti" - Capgo [\[1\]](https://capgo.app/)

Per assicurare che gli aggiornamenti siano sicuri, configura gli script npm per validare tutto prima della distribuzione:

```javascript
async function validateAndDeploy() {
  await validateSignature();
  await checkSecurityHeaders();
  await deployUpdate();
}
```

Inoltre, applica politiche di sicurezza specifiche per canale e usa permessi basati sui ruoli per controllare chi può distribuire gli aggiornamenti. Questo aggiunge un ulteriore livello di protezione al tuo processo di distribuzione.

## Opzioni per le piattaforme di aggiornamento OTA

La scelta della giusta piattaforma di aggiornamento OTA è cruciale per integrare efficacemente gli script npm nel tuo flusso di lavoro. Dai priorità a fattori come prestazioni, sicurezza e compatibilità con i tuoi strumenti esistenti. Ecco un'analisi di Capgo e altre opzioni di mercato per aiutarti a prendere una decisione informata.

### Funzionalità di [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67fb02ab2e221594daf3f266/04cc402ef2e8f7dc781d2b86cd364db3.jpg)

Capgo è progettato specificamente per gli aggiornamenti OTA di Capacitor, offrendo una velocità media di aggiornamento di 434 millisecondi e raggiungendo un tasso di aggiornamento utente del 95% [\[1\]](https://capgo.app/). Fornisce un'integrazione perfetta con gli script npm, come mostrato nell'esempio seguente:

```javascript
module.exports = {
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      resetWhenUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
};
```

Capgo assicura aggiornamenti sicuri con crittografia end-to-end e permette distribuzioni strategiche attraverso il suo sistema di canali. Con 23,5 milioni di aggiornamenti distribuiti su 750 app in produzione, ha dimostrato la sua scalabilità e affidabilità [\[1\]](https://capgo.app/).

### Confronto delle piattaforme

Quando si usano gli script npm, è essenziale valutare le piattaforme in base a crittografia, velocità e integrazioni CI/CD. Ecco un rapido confronto delle funzionalità:

| Funzionalità | Dettagli implementazione | Tasso di successo aggiornamenti |
| --- | --- | --- |
| Crittografia end-to-end | Supporto completo crittografia | 82% mondiale [\[1\]](https://capgo.app/) |
| Velocità aggiornamento | 114 ms per un bundle di 5 MB | Distribuzione CDN globale |
| Integrazione CI/CD | GitHub Actions, GitLab CI | Flussi di lavoro personalizzati |

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per distribuire continuamente ai nostri utenti!"
> – Rodrigo Mantica [\[1\]](https://capgo.app/)

Il mercato degli aggiornamenti OTA ha subito cambiamenti significativi, specialmente dopo che [Microsoft Code Push](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/) ha chiuso nel 2024, con [Appflow](https://ionic.io/appflow/) che seguirà nel 2026. Simon Flack ha condiviso la sua prospettiva su questi cambiamenti:

> "Attualmente stiamo provando @Capgo dato che Appcenter ha interrotto il supporto agli aggiornamenti live sulle app ibride e @AppFlow è decisamente troppo costoso." [\[1\]](https://capgo.app/)

Il costo è un'altra considerazione importante per i team. Capgo offre capacità CI/CD a circa 300$ al mese, un costo molto inferiore rispetto ai 6.000$ annuali delle alternative a livello enterprise [\[1\]](https://capgo.app/).

Quando implementi gli script npm nel tuo flusso di lavoro di distribuzione, considera questi fattori:

- **

L'utilizzo degli script npm semplifica il processo di gestione degli aggiornamenti OTA di Capacitor. Quando integrati nelle pipeline CI/CD, questi script aiutano ad automatizzare i deployment garantendo sicurezza e mantenendo i livelli di performance.

Ecco le aree chiave di focus:

-   **Deployment Automatizzato**: Gestisce il versioning e il deployment senza intervento manuale.
-   **Misure di Sicurezza**: Garantisce che gli aggiornamenti siano distribuiti in modo sicuro con crittografia end-to-end.
-   **Monitoraggio delle Performance**: Tiene traccia delle velocità di consegna degli aggiornamenti e dei tassi di successo.

Queste caratteristiche evidenziano perché Capgo si distingue come strumento affidabile per la gestione degli aggiornamenti OTA.

### Benefici di Capgo

Con la chiusura di Microsoft CodePush nel 2024, il panorama degli aggiornamenti OTA è cambiato. Capgo è emerso come una soluzione affidabile, avendo consegnato con successo 23,5 milioni di aggiornamenti su 750 app in produzione [\[1\]](https://capgo.app/).

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente ai nostri utenti!" – Rodrigo Mantica [\[1\]](https://capgo.app/)

Le metriche di performance di Capgo parlano da sole:

| **Indicatore di Performance** | **Risultato** |
| --- | --- |
| Risposta API Media | 434 ms mondiale |
| Velocità Download Bundle | 114 ms per 5 MB |
| Tasso di Successo Aggiornamenti | 82% globalmente |

A 300$ al mese per l'integrazione CI/CD - rispetto ai 6.000$ annuali per soluzioni enterprise - Capgo offre un'opzione sicura, affidabile ed economicamente efficiente per gestire gli aggiornamenti OTA [\[1\]](https://capgo.app/).
