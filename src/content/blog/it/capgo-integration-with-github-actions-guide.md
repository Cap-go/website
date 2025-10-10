---
slug: capgo-integration-with-github-actions-guide
title: 'Integrazione di Capgo con GitHub Actions: Guida'
description: >-
  Integra Capgo con GitHub Actions per aggiornamenti delle app efficienti,
  sicuri ed economici, migliorando il tuo flusso di lavoro di sviluppo.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-10-10T02:17:19.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
[Capgo](https://capgo.app/) e [GitHub Actions](https://docs.github.com/actions) insieme semplificano il deploy degli aggiornamenti per le app [Capacitor](https://capacitorjs.com/). Ecco perché questa integrazione merita la tua attenzione:

-   **Risparmio**: Riduci i costi CI/CD fino a $26.100 in 5 anni rispetto a [AppFlow](https://ionic.io/appflow/).
-   **Aggiornamenti Veloci**: Invia aggiornamenti istantanei con il 95% degli utenti che li ricevono entro 24 ore.
-   **Deployment Sicuri**: La crittografia end-to-end garantisce aggiornamenti sicuri.
-   **Flusso di Lavoro Ottimizzato**: Automatizza build e deployment direttamente nel tuo repository GitHub.

### Panoramica Rapida

1.  **Requisiti**: Account GitHub, [account Capgo](https://capgo.app/disclaimer/) (da $12/mese), progetto Capacitor, [Node.js](https://nodejs.org/en).
2.  **Configurazione**: Installa [Capgo CLI](https://capgo.app/docs/cli/commands) con `npx @capgo/cli init`, configura GitHub Actions con un workflow YAML.
3.  **Deployment**: Usa comandi come `npx @capgo/cli deploy` per [automatizzare gli aggiornamenti](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/).
4.  **Testing**: Fai il deploy su canali di test (es. beta, staging) prima della produzione.

**Esempio di Workflow (YAML)**:

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v3  
      - uses: actions/setup-node@v4  
        with:  
          node-version: '18.x'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Questa integrazione garantisce aggiornamenti rapidi, sicuri ed economici delle app, rendendola ideale per i team di sviluppo agile.

## Tutorial su [GitHub Actions](https://docs.github.com/actions) - Concetti Base e Pipeline CI/CD

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Requisiti di Setup

[L'integrazione di Capgo](https://capgo.app/docs/webapp/) con GitHub Actions richiede la configurazione degli strumenti e delle configurazioni necessarie.

### Strumenti e Account Necessari 

Assicurati di avere pronti i seguenti account e strumenti:

| Requisito | Scopo | Dettagli |
| --- | --- | --- |
| **Account GitHub** | Controllo Versione & CI/CD | Account attivo con accesso ai repository |
| **Account Capgo** | Gestione Aggiornamenti Live | I piani partono da $12/mese per il piano SOLO |
| **Progetto Capacitor** | Sviluppo App | Un progetto funzionante pronto per l'integrazione |
| **Node.js** | Ambiente Runtime | Raccomandata l'ultima versione LTS |

Una volta pronti questi elementi, puoi procedere ad aggiungere Capgo al tuo progetto per gli aggiornamenti automatici live.

### Aggiungere [Capgo](https://capgo.app/) al Tuo Progetto

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Per integrare Capgo, installalo nel tuo progetto Capacitor usando il suo strumento CLI. Secondo Martin Donadieu, fondatore di Capgo:

> "Esegui npx @capgo/cli init ed è fatto!" [\[1\]](https://capgo.app/)

Questo comando configurerà il plugin e le sue dipendenze richieste.

### Configurazione Repository GitHub

Prepara il tuo repository GitHub per soddisfare i requisiti per l'integrazione CI/CD con Capgo. Come menzionato nella loro documentazione:

> "Configuriamo la tua pipeline CI/CD direttamente nella tua piattaforma preferita, che sia GitHub Actions, GitLab CI o altre. Non ospitiamo CI/CD né ti addebitiamo per mantenerla." [\[1\]](https://capgo.app/)

Capgo offre questa configurazione per una tariffa una tantum di $2.600 e ~$300/mese, che è più conveniente rispetto alla tariffa annuale di $6.000 di AppFlow [\[1\]](https://capgo.app/).

Ecco come configurare il tuo repository:

-   **Struttura Repository**: Organizza il tuo repository con directory separate per codice sorgente, asset e file di configurazione per mantenere tutto pulito e gestibile.
-   **Configurazione Ambiente**: Crea ambienti distinti per sviluppo, staging e produzione, assicurando controlli di accesso e misure di sicurezza appropriati.
-   **Gestione Accessi**: Imposta attentamente i permessi del repository per consentire [l'integrazione Capgo](https://capgo.app/consulting/) mantenendo la sicurezza.

Questi passaggi assicureranno che il tuo progetto sia pronto per il workflow GitHub Actions, che verrà descritto nella prossima sezione.

## Configurazione Workflow GitHub Actions

Automatizza i tuoi [deployment Capgo](https://capgo.app/docs/cli/commands/) usando GitHub Actions per ottimizzare il tuo processo CI/CD.

### Creazione del File Workflow

Inizia creando un file YAML nella directory `.github/workflows` del tuo repository. Ecco un esempio:

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '18.x'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Questa configurazione garantisce deployment sicuri e automatizzati. Una volta configurato il file, scegli i trigger giusti per il tuo workflow.

### Opzioni Trigger Workflow

GitHub Actions ti permette di personalizzare quando i workflow vengono eseguiti. Ecco alcune opzioni di trigger:

| **Tipo Trigger** | **Caso d'Uso** | **Configurazione** |
| --- | --- | --- |
| Eventi Push | Deploy su modifiche del codice | Si attiva quando il codice viene pushato su branch specifici |
| Dispatch Manuale | Aggiornamenti on-demand | Permette di avviare manualmente il workflow |
| Pianificazione | Release programmate | Esegue deployment a intervalli prestabiliti |
| Pull Request | Test aggiornamenti | Testa le modifiche prima del merge nei branch principali |

### Gestione Chiavi Segrete 

Per garantire deployment sicuri, devi gestire correttamente le tue chiavi segrete. GitHub Actions offre un sistema crittografato di gestione dei segreti per questo scopo.

**Passaggi per Configurare l'Autenticazione Sicura:**

1.  **Accedi alle Impostazioni Repository**  
    Vai alle impostazioni del tuo repository e trova la sezione "Secrets and variables" sotto la scheda "Security".
    
2.  **Aggiungi [Credenziali Capgo](https://capgo.app/trust/)**  
    Salva il tuo token di autenticazione Capgo come segreto del repository. Chiamalo `CAPGO_TOKEN`.
    
3.  **Riferisci ai Segreti nei Workflow**  
    Usa i tuoi segreti memorizzati nel workflow riferendoti ad essi così: `${{ secrets.CAPGO_TOKEN }}`.
    

## Comandi Capgo nei Workflow

Una volta configurato l'ambiente GitHub Actions, puoi automatizzare i deployment integrando i comandi Capgo CLI.

### Installazione Capgo CLI

Aggiungi il seguente step al tuo workflow per installare Capgo CLI:

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### Autenticazione CLI

Autentica in modo sicuro la CLI usando il `CAPGO_TOKEN`:

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Comandi di Deployment

Ecco i comandi chiave per gestire build, versioning e deployment dei tuoi aggiornamenti:

| Comando | Scopo | Esempio di Utilizzo |
| --- | --- | --- |
| `build` | Genera un [bundle pronto per la produzione](https://capgo.app/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Invia aggiornamenti a Capgo | `npx @capgo/cli deploy` |
| `version` | Imposta la versione per l'aggiornamento | `npx @capgo/cli version 1.2.0` |

Per automatizzare l'intero processo di deployment, usa i comandi insieme così:

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Questa configurazione assicura che i tuoi aggiornamenti vengano automaticamente buildati, versionati e deployati quando il workflow viene eseguito. Il sistema di gestione dei segreti di GitHub mantiene al sicuro le tue credenziali durante tutto il processo.

## Testing e Correzioni

### Esecuzione Workflow di Test

Puoi testare il tuo workflow GitHub Actions usando un [canale di test Capgo](https://capgo.app/docs/plugin/cloud-mode/channel-system/) dedicato. Questo ti permette di validare gli aggiornamenti prima che vadano in produzione.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Il sistema di canali di Capgo ti aiuta a creare percorsi di deployment separati per diverse fasi:

| Canale | Scopo | Pubblico Target |
| --- | --- | --- |
| beta | Test pre-release | Team interno |
| staging | Validazione QA | Utenti test |
| production | Deployment live | Tutti gli utenti |

### Soluzioni Errori

Ecco alcuni problemi comuni di integrazione e come risolverli:

1\. **Errori di Autenticazione**

Controlla il CAPGO_TOKEN nei Segreti GitHub. Se è scaduto, rigeneralo per garantire un'autenticazione fluida.

2\. **Errori di Build**

Assicurati che la tua configurazione di build corrisponda ai requisiti del tuo ambiente di deployment.

> "Abbiamo implementato gli aggiornamenti OTA di Capgo in produzione per la nostra base utenti di +5000. Stiamo vedendo un'operazione molto fluida con quasi tutti i nostri utenti aggiornati entro minuti dal deployment OTA su @Capgo." [\[1\]](https://capgo.app/)

3\. **Conflitti di Versione**

Attieniti al versionamento semantico e incrementa correttamente le versioni per prevenire conflitti durante i deployment.

### Suggerimenti per la Manutenzione

-   Usa [analytics Capgo](https://capgo.app/dp/) per monitorare i tassi di successo degli aggiornamenti.
-   Abilita i rollback automatici per aggiornamenti che potrebbero causare problemi.
-   Testa le pull request (PR) usando i selettori di canale per un migliore controllo.
-   Mantieni aggiornato il tuo workflow con gli ultimi comandi Capgo CLI.

Per deployment ad alta priorità, sfrutta il tracking degli errori di Capgo per individuare potenziali problemi in anticipo. Se qualcosa va storto, la funzione di rollback ti permette di tornare rapidamente a una versione stabile, minimizzando le interruzioni. Queste pratiche aiuteranno a mantenere fluidi i tuoi deployment mentre ti avvicini alla produzione.

## Conclusione

### Punti Chiave

L'integrazione di Capgo con GitHub Actions semplifica il processo di deployment per le [app Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), portando importanti benefici ai team di sviluppo. Con un tasso di successo globale dell'82% per gli aggiornamenti e il 95% degli utenti attivi che ricevono aggiornamenti entro 24 ore [\[1\]](https://capgo.app/), questa soluzione si distingue per la sua efficienza.

Ecco alcune caratteristiche di spicco:

-   **Workflow Automatizzati**: Configurando i workflow direttamente in GitHub Actions, non c'è bisogno di hosting CI/CD esterno. Questo approccio riduce i costi operativi, risparmiando circa $26.100 in cinque anni rispetto ad alternative come AppFlow [\[1\]](https://capgo.app/).
-   **Deployment Veloce**: Gli aggiornamenti possono essere inviati istantaneamente, bypassando i ritardi degli app store.
-   **Sicurezza Forte**: La crittografia end-to-end garantisce che gli aggiornamenti vengano consegnati in modo sicuro, mentre il sistema di canali di Capgo permette rollout controllati e graduali.

Queste caratteristiche aprono la strada a soluzioni più personalizzate e prestazioni migliorate, esplorate ulteriormente di seguito.

### Strategie Avanzate

Per ottenere il massimo dalla tua integrazione tra Capgo e GitHub Actions, esplora queste tattiche avanzate:

-   **Flussi di lavoro API personalizzati**: Utilizza l'API pubblica di Capgo per progettare flussi di lavoro di distribuzione che si adattano alle esigenze specifiche del tuo team. Questo può abilitare esperienze white-label e un'integrazione perfetta con i tuoi strumenti attuali [\[1\]](https://capgo.app/).
-   **[Rilasci basati su canali](https://capgo.app/docs/webapp/channels/)**: Ottimizza il tuo processo di distribuzione utilizzando le funzionalità dei canali di Capgo per aggiornamenti controllati e graduali.
-   **Prestazioni ottimizzate**: Utilizza gli aggiornamenti parziali di Capgo per ridurre l'utilizzo della larghezza di banda e velocizzare gli aggiornamenti. Con 23,5 milioni di aggiornamenti distribuiti su 750 app in produzione [\[1\]](https://capgo.app/), il sistema ha dimostrato la sua capacità di gestire richieste su larga scala.

Per risultati ancora migliori, considera l'utilizzo delle opzioni di self-hosting di Capgo o le configurazioni API personalizzate. Controlla le sezioni precedenti per istruzioni dettagliate su configurazione e test per implementare completamente queste strategie.
