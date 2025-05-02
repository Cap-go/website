---
slug: guida-alla-configurazione-del-pipeline-ci-cd-di-capacitor
title: Capacitor CI/CD パイプライン設定ガイド
description: アプリケーションのビルド、テスト、デプロイメントのプロセスを、CIパイプラインを使用して自動化し、より素早いアップデートと効率性を実現しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-23T00:48:58.202Z
updated_at: 2025-04-23T00:49:09.370Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c-1745369349370.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, CI/CD, pipeline setup, app updates, Capgo, deployment automation,
  mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
original_slug: capacitor-cicd-pipeline-setup-guide
---
**Vuoi [aggiornamenti delle app](https://capgo.app/plugins/capacitor-updater/) più veloci con il minimo sforzo?** Configurare una pipeline CI/CD per la tua app [Capacitor](https://capacitorjs.com/) automatizza la build, il testing e il deployment, risparmiando tempo e riducendo gli errori. Ecco cosa otterrai:

-   **Aggiornamenti Live**: Distribuisci aggiornamenti istantaneamente senza i ritardi degli app store. Il 95% degli utenti riceve gli aggiornamenti entro 24 ore.
-   **Pipeline Essenziali**: Automatizza le build attivate dall'attività dei branch (`main`, `staging`, `feature/*`) e definisci ambienti separati per staging e produzione.
-   **Integrazione [Capgo](https://capgo.app/)**: Usa Capgo per distribuire aggiornamenti sicuri e criptati, gestire i [canali di aggiornamento](https://capgo.app/docs/webapp/channels/) e monitorare le prestazioni.
-   **Piani Convenienti**: I piani partono da $12/mese per aggiornamenti live e analytics.

Le pipeline CI/CD di Capacitor semplificano i flussi di lavoro, migliorano l'efficienza e assicurano che la tua app rimanga aggiornata senza problemi. Entriamo nei dettagli.

## Requisiti di Setup

### Prerequisiti

Assicurati di avere installato e configurato:

-   **[Node.js](https://nodejs.org/en) LTS**, **Capacitor CLI** e **Git**
-   Un account sulla piattaforma CI preferita (come [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) o [Jenkins](https://www.jenkins.io/))
-   Un **account Capgo** per gestire gli aggiornamenti live

Una volta pronti questi elementi, procedi a definire i trigger e gli step di build nella tua piattaforma CI.

## Integra Appflow con la tua Pipeline CICD

<iframe src="https://www.youtube.com/embed/CakTj3A3wbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Passaggi per il Setup della Pipeline

Ora che hai gestito i prerequisiti, è il momento di configurare i trigger della pipeline e le impostazioni dell'ambiente.

### Trigger e Step di Build

Configura la tua pipeline CI/CD per attivare automaticamente le build in base a specifiche attività dei branch. Ecco come configurarla:

-   **Trigger dei branch**:
    
    -   Usa `main` per le build di produzione.
    -   Usa `staging` per i test.
    -   Usa `feature/*` per lo sviluppo.
-   **Step di build**:
    
    -   Installa tutte le dipendenze necessarie.
    -   Esegui i test unitari per garantire la qualità del codice.
    -   Compila gli asset web per l'applicazione.
    -   Genera i binari nativi per piattaforme mobile o desktop.
    -   Distribuisci la build nel tuo ambiente di test per ulteriori validazioni.

### Impostazioni dell'Ambiente

Definisci file di configurazione separati per staging e produzione per mantenere l'organizzazione e la sicurezza. Ecco un esempio di setup:

```yaml
# staging.env
ENVIRONMENT=staging
API_ENDPOINT=https://api-staging.example.com
LIVE_UPDATES_ENABLED=true

# production.env
ENVIRONMENT=production
API_ENDPOINT=https://api.example.com
LIVE_UPDATES_ENABLED=true
```

Per i dati sensibili come chiavi API e certificati, assicurati di memorizzarli in modo sicuro nel sistema di gestione dei segreti della tua piattaforma CI. Questo garantisce che la tua pipeline rimanga sia funzionale che sicura.

## Guida all'Integrazione di [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c/95506b8280be0626e7b237b754ba8f1b.jpg)

Una volta configurate le fasi di build e deploy, è il momento di integrare Capgo. Questo ti permette di distribuire aggiornamenti live direttamente alla tua app, evitando i ritardi di approvazione degli app store.

### Passaggi per il Setup di Capgo

Dopo aver preparato la tua pipeline CI/CD, segui questi passaggi per aggiungere Capgo al tuo progetto:

Prima, installa la [Capgo CLI](https://capgo.app/docs/cli/commands):

```bash
npx @capgo/cli init
```

Quindi, procedi con questi comandi:

-   **Compila la tua app**: `npm install && npm run build`
-   **Distribuisci gli aggiornamenti**: `npx @capgo/cli deploy`
-   **Ripristina gli aggiornamenti**: `npx @capgo/cli rollback`

Ecco un esempio di un job GitHub Actions per la distribuzione degli aggiornamenti:

```yaml
- name: Deploy to Capgo
  run: |
    npm install @capgo/cli
    npx @capgo/cli deploy
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Caratteristiche Principali di Capgo

Capgo porta diversi benefici alle app Capacitor, tra cui:

-   **Aggiornamenti sicuri ed efficienti**: Aggiornamenti differenziali criptati riducono le dimensioni del payload garantendo una distribuzione sicura.
-   **Gestione dei canali**: Crea canali di staging e produzione per controllare come vengono distribuiti gli aggiornamenti.
-   **Dashboard analytics**: Traccia i tassi di successo degli aggiornamenti e monitora l'adozione degli utenti con insight dettagliati.

### Piani e Prezzi di Capgo

Capgo offre piani flessibili per diverse esigenze:

-   **SOLO**: $12/mese (1.000 MAU, 2 GB storage, 50 GB bandwidth)
-   **MAKER**: $33/mese (10.000 MAU, 5 GB storage, 500 GB bandwidth)
-   **TEAM**: $83/mese (100.000 MAU, 10 GB storage, 2.000 GB bandwidth)
-   **PAYG**: A partire da $249/mese, con opzioni per scaling personalizzato, accesso API e domini personalizzati.

Attualmente, Capgo supporta oltre 1.900 app in produzione, rendendolo una scelta affidabile per il continuous deployment [\[1\]](https://capgo.app/).

## Gestione della Pipeline

### Monitoraggio dello Stato

Tenere sotto controllo la tua pipeline è fondamentale per mantenere la qualità dell'app e la soddisfazione degli utenti. Usa la tua piattaforma CI/CD per configurare avvisi automatici per:

-   **Stato della build e progresso del deployment**
-   **Tassi di successo degli aggiornamenti**
-   **Metriche di adozione degli utenti**
-   **Report di errori e log di crash**

Abbina questi avvisi a una documentazione chiara per garantire un monitoraggio fluido e una rapida risoluzione dei problemi.

### Guida alla Documentazione

Una buona documentazione mantiene il tuo team allineato e le tue operazioni fluide. Assicurati che la tua documentazione copra:

-   **Configurazione Pipeline**: Dettagli come trigger di build, variabili d'ambiente e impostazioni di sicurezza.
-   **Procedure di Aggiornamento**: Passaggi per i deployment, istruzioni di rollback e [gestione dei canali di aggiornamento](https://capgo.app/docs/webapp/channels/).
-   **Setup del Monitoraggio**: Come configurare gli avvisi, tracciare le metriche e rispondere ai problemi.
-   **Linee Guida di Conformità**: Regole specifiche della piattaforma, restrizioni sugli aggiornamenti e altri requisiti.

Conserva tutta la documentazione nel controllo versione e aggiornala ogni volta che la tua pipeline cambia. Includi passaggi di troubleshooting per errori comuni per risparmiare tempo quando sorgono problemi.

### Linee Guida della Piattaforma

Segui le politiche di aggiornamento di Apple e Android utilizzando il sistema di canali di Capgo per garantire rollout fluidi e conformi:

-   **Beta Testing**: [Rilascia aggiornamenti a piccoli gruppi di utenti](https://capgo.app/blog/how-to-send-specific-version-to-users/) per validare le modifiche.
-   **Rollout Graduali**: Distribuisci gli aggiornamenti gradualmente per individuare i problemi in anticipo.
-   **Fix di Emergenza**: Ripristina rapidamente gli aggiornamenti con un solo clic se qualcosa va storto.

## Riepilogo

### Panoramica dei Passaggi di Setup

Per iniziare, dovrai installare la CLI, configurare build e variabili d'ambiente, proteggere i tuoi segreti, abilitare il monitoraggio e distribuire gli aggiornamenti. Questo processo si integra perfettamente con gli strumenti di monitoraggio e rollback, garantendo che la tua app rimanga online con tempi di inattività minimi.

### Benefici CI/CD

La connessione tra setup e risultati mostra come Capgo aumenti l'efficienza: gli aggiornamenti raggiungono il **95% degli utenti in sole 24 ore**. Inoltre, i prezzi di Capgo - da **$12/mese a $83/mese** - offrono un enorme vantaggio di costo rispetto ai servizi legacy che possono costare oltre **$500/mese**. Attualmente, Capgo supporta più di **1.900 app in produzione** [\[1\]](https://capgo.app/).
