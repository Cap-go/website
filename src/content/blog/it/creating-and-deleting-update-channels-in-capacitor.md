---
slug: creating-and-deleting-update-channels-in-capacitor
title: Creazione ed eliminazione dei canali di aggiornamento in Capacitor
description: >-
  Impara a creare, gestire ed eliminare i canali di aggiornamento in Capacitor
  per aggiornamenti delle app semplificati e un'esperienza utente migliorata.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-21T03:02:38.679Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67dcb1f883b63ee70fa08665-1742526177947.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, update channels, app updates, development, mobile, CI/CD, user
  management, version control
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) [canali di aggiornamento](https://capgo.app/docs/webapp/channels/) ti permettono di inviare aggiornamenti over-the-air (OTA) a gruppi specifici di utenti. Questo aiuta a gestire versioni multiple dell'app, testare nuove funzionalità e distribuire gli aggiornamenti gradualmente. Ecco cosa devi sapere:

-   **Benefici**:
    
    -   Testa gli aggiornamenti con gruppi più piccoli (es. utenti beta).
    -   Invia correzioni critiche senza attendere l'approvazione dell'app store.
    -   Ripristina istantaneamente gli aggiornamenti problematici.
-   **Configurazione**:
    
    -   Usa strumenti come Capacitor CLI, [Node.js](https://nodejs.org/en) e [Capgo](https://capgo.app/) CLI.
    -   Assegna ruoli (Admin, Developer, Viewer) per gestire i permessi.
    -   Integra con strumenti CI/CD per flussi di lavoro automatizzati.
-   **Gestione dei Canali**:
    
    -   Crea canali per gli ambienti (es. produzione, beta, staging).
    -   Nomina i canali in modo chiaro (es. `prod`, `beta-internal`, `v2-hotfix`).
    -   Testa gli aggiornamenti in fasi prima di promuoverli in produzione.
-   **Rimozione dei Canali**:
    
    -   Identifica i canali inutilizzati tramite analytics.
    -   Migra in sicurezza gli utenti, archivia i dati e controlla le dipendenze prima dell'eliminazione.

Capgo semplifica questo processo con strumenti come analytics in tempo reale, gestione utenti e opzioni di rollback. Con una corretta configurazione e manutenzione dei canali, puoi distribuire gli aggiornamenti più velocemente e in modo più affidabile.

## Distribuzione Continua e Aggiornamenti Live con Ionic Deploy

<iframe src="https://www.youtube.com/embed/I7PC3O4q1ug" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Requisiti di Configurazione

Per gestire efficacemente i canali di aggiornamento, dovrai installare strumenti specifici e configurare i permessi. Ecco cosa ti serve per iniziare.

### Strumenti Necessari

Assicurati di avere quanto segue:

-   **Capacitor CLI**: Questo è lo strumento principale per gestire gli aggiornamenti dell'app.
-   **Node.js**: È richiesta la versione 14.0 o superiore.
-   **[Capgo CLI](https://capgo.app/docs/cli/commands)**: Usato per configurare e gestire i canali di aggiornamento.
-   **Ambiente di Sviluppo**: Scegli un IDE che supporti Capacitor.

Per inizializzare Capgo CLI, esegui questo comando:

```bash
npx @capgo/cli init
```

Questo configura il tuo progetto con i file di configurazione necessari e lo connette al [servizio di aggiornamento](https://capgo.app/docs/plugin/cloud-mode/manual-update/) di Capgo.

### Configurazione degli Accessi e Permessi

Configura i permessi per una gestione sicura ed efficiente dei canali:

| **Livello di Permesso** | **Diritti di Accesso** | **Scopo** |
| --- | --- | --- |
| Admin | Accesso completo | Creare, eliminare e gestire i canali |
| Developer | Accesso limitato | Distribuire e testare gli aggiornamenti |
| Viewer | Sola lettura | Monitorare lo stato degli aggiornamenti |

Assegna i ruoli al tuo team in base alle loro responsabilità. Capgo funziona perfettamente con Capacitor 8, assicurando di adattarsi a varie esigenze di progetto.

Per maggiore comodità, Capgo si integra con popolari strumenti CI/CD come [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) e [Jenkins](https://www.jenkins.io/). Assicurati solo che il tuo sistema di build sia pronto per gestire i canali di aggiornamento.

## Configurazione dei Canali di Aggiornamento

Ecco come puoi creare e gestire efficacemente i canali di aggiornamento. Questa guida copre la creazione dei canali, la configurazione e le pratiche utili per la denominazione.

### Creazione di un Nuovo Canale

Per configurare un canale usando Capgo CLI, segui questi passaggi:

1.  **Inizializza il Canale**: Apri il terminale ed esegui il seguente comando:
    
    ```bash
    npx @capgo/cli channel create
    ```
    
2.  **Imposta i Parametri Base**: Configura il canale con dettagli come nome e versione:
    
    ```bash
    npx @capgo/cli channel config --name="beta-testing" --version="1.0.0"
    ```
    
3.  **Conferma il Canale**: Verifica che il tuo canale sia stato creato con successo:
    
    ```bash
    npx @capgo/cli channel list
    ```
    

### Impostazioni del Canale

Quando configuri il tuo canale, assicurati di concentrarti su queste impostazioni chiave:

| Impostazione | Scopo | Valore di Esempio |
| --- | --- | --- |
| **Nome Canale** | Identifica il flusso di aggiornamento | prod, beta, staging |
| **Pattern Versione** | Specifica il formato versione consentito | 1.0.\* |
| **Accesso Utenti** | Determina chi riceve gli aggiornamenti | specific-group-id |
| **Frequenza Aggiornamenti** | Imposta quando vengono distribuiti gli aggiornamenti | immediate, scheduled |

Queste impostazioni ti aiutano a controllare come vengono distribuiti gli aggiornamenti e chi li riceve.

### Suggerimenti per Nomi e Struttura

Una convenzione di denominazione chiara assicura che i tuoi canali rimangano organizzati e facili da gestire. Ecco alcuni suggerimenti:

-   **Nomi Basati sull'Ambiente**
    
    -   `prod` - Per i rilasci in produzione
    -   `beta-internal` - Per test interni
    -   `staging-qa` - Per test di qualità
-   **Canali Specifici per Versione**
    
    -   `v2-rollout` - Per rilasci versione 2.0
    -   `v2-hotfix` - Per correzioni urgenti
    -   `v2-beta` - Per test beta
-   **Canali Focalizzati sulle Funzionalità**
    
    -   `feature-payment` - Aggiornamenti per il sistema di pagamento
    -   `feature-auth` - Aggiornamenti per l'autenticazione
    -   `feature-ui` - Aggiornamenti relativi all'interfaccia

Usare questi pattern di denominazione rende più facile identificare e gestire i tuoi flussi di aggiornamento.

## Gestione degli Aggiornamenti dei Canali

La gestione efficace degli aggiornamenti dei canali assicura distribuzioni fluide e affidabili. Questo passaggio si basa sui precedenti processi di creazione dei canali, concentrandosi sul perfezionamento della distribuzione degli aggiornamenti. Capgo offre strumenti come assegnazioni utenti mirate e promozione basata su analytics per semplificare questo processo.

### Assegnazione degli Aggiornamenti

Assegna gli aggiornamenti a gruppi specifici di utenti usando un flusso di lavoro chiaro:

-   **Canale di Sviluppo**: Usa questo canale per test isolati e correzioni di bug. Monitora gli impatti sulle prestazioni e assicurati che i problemi siano risolti.
-   **Canale Beta**: Distribuisci qui gli aggiornamenti per test controllati e raccolta feedback utenti. Valida come gli aggiornamenti si comportano in condizioni reali.
-   **Canale di Produzione**: Una volta che gli aggiornamenti sono stabili, promuovili al canale di produzione per tutti gli utenti.

Dopo aver assegnato gli aggiornamenti, conduci test approfonditi per confermare la loro prontezza.

### Test degli Aggiornamenti

Capgo fornisce strumenti per eseguire test dettagliati:

| **Fase di Test** | **Scopo** | **Funzionalità Chiave** |
| --- | --- | --- |
| Verifica Iniziale | Controlla funzionalità base | Test PR attraverso selettore canale |
| Test Beta | Valida uso nel mondo reale | Gestione utenti con permessi granulari |
| Monitoraggio Prestazioni | Valuta stabilità aggiornamento | Usa analytics dettagliati e tracciamento errori |

### Spostamento degli Aggiornamenti tra Canali

Sposta gli aggiornamenti tra i canali con attenzione per mantenere la stabilità. Capgo semplifica questo processo con misure di sicurezza integrate.

Punti chiave da considerare:

-   **Controllo Versione**: Mantieni traccia di una versioning chiara tra i canali.
-   **Opzioni di Rollback**: Capgo offre una funzione di rollback con un click per risolvere rapidamente i problemi.
-   **Revisione Analytics**: Rivedi sempre i dati di performance prima di promuovere un aggiornamento al canale successivo.

> "Rollback istantaneo se qualcosa va storto" - Capgo [\[1\]](https://capgo.app/)

## Rimozione dei Canali di Aggiornamento

È importante sapere come e quando rimuovere i canali di aggiornamento inutilizzati. Mantenere pulita la struttura dei canali assicura che la tua app rimanga stabile e rende più facile gestire gli aggiornamenti.

### Trovare i Canali Inutilizzati

Per individuare i canali inattivi, usa la [dashboard analytics di Capgo](https://capgo.app/docs/webapp/) per analizzare i pattern di utilizzo. Concentrati sui canali che soddisfano questi criteri:

-   Nessun utente attivo negli ultimi 30 giorni
-   Nessun aggiornamento recente distribuito
-   Fasi di beta testing completamente terminate
-   Canali temporanei usati per test o vecchie funzionalità segnalate come non necessarie

Gli analytics in tempo reale di Capgo rendono semplice identificare i canali non più necessari.

### Passaggi per la Rimozione del Canale

Per rimuovere in sicurezza un canale di aggiornamento, segui questi passaggi:

| Passaggio | Azione | Verifica |
| --- | --- | --- |
| **Migrazione Utenti** | Sposta tutti gli utenti attivi su altri canali | Conferma che non rimangano utenti |
| **Archivio Aggiornamenti** | Archivia la cronologia del canale | Verifica che l'archivio sia completo |
| **Controllo Dipendenze** | Assicurati che nessuno script o workflow dipenda dal canale | Conferma che non ci siano riferimenti attivi |
| **Esecuzione Rimozione** | Esegui il comando di eliminazione canale | Verifica che il canale sia eliminato |

Una volta completati questi passaggi, ricontrolla il sistema per confermare che tutto funzioni correttamente.

### Controllo Impatto Rimozione

Prima di finalizzare la rimozione, considera questi punti:

1.  **Valutazione Cronologia Aggiornamenti**  
    Rivedi la cronologia degli aggiornamenti del canale per assicurarti che tutti i dati importanti, come statistiche di performance o feedback utenti, siano stati salvati.
    
2.  **Dipendenze**  
    Ricontrolla che nessuna pipeline CI/CD o script faccia ancora riferimento al canale.
    

Dopo la rimozione, monitora le performance del sistema. Se sorgono problemi, la funzione di rollback di Capgo può aiutarti a risolverli rapidamente.

## Funzionalità di [Capgo](https://capgo.app/) per gli Aggiornamenti

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-21.jpg?auto=compress)

### Funzioni Core di Capgo

Capgo semplifica la gestione dei canali di aggiornamento con funzionalità su misura per progetti Capacitor. Il suo sistema di canali ti permette di indirizzare specifici gruppi di utenti con aggiornamenti adatti alle loro necessità. Inoltre, Capgo fornisce agli sviluppatori strumenti per velocizzare la distribuzione e migliorare i flussi di lavoro.

### Strumenti per Sviluppatori

Capgo offre una gamma di strumenti per rendere gli aggiornamenti più facili e assicurare che tutto rimanga conforme. Con il suo strumento CLI, puoi distribuire aggiornamenti usando un solo comando, risparmiando tempo e fatica.

Ecco alcune funzionalità di spicco per gli sviluppatori:

| Funzionalità | Cosa Fa | Come Aiuta |
| --- | --- | --- |
| Selettore Canale | Testa le pull request direttamente nell'app | Velocizza il feedback |
| Gestione Utenti | Gestisce i permessi a livello dettagliato | Migliore controllo sui tester |
| Dashboard Analytics | Monitora gli aggiornamenti in tempo reale | Traccia facilmente le performance |
| Capacità di Rollback | Risolve rapidamente i problemi | Mantiene l'app stabile |

Questi strumenti si integrano perfettamente con il processo di configurazione semplice di Capgo, descritto di seguito.

### Guida alla Configurazione di Capgo

Iniziare con Capgo è semplice e veloce. Segui solo questi tre passaggi:

1.  **Configura l'autenticazione:** Abilita la crittografia end-to-end per mantenere gli aggiornamenti sicuri.
2.  **Definisci la struttura dei canali:** Configura i canali in base alle tue esigenze di distribuzione.
3.  **Imposta i permessi utente:** Assegna diritti di accesso specifici ai membri del team.

> "Capgo è uno strumento indispensabile per gli sviluppatori che vogliono essere più produttivi. Evitare la revisione per la correzione dei bug è prezioso." - Bessie Cooper [\[1\]](https://capgo.app/)

Capgo supporta oltre 30 plugin e funziona perfettamente con le pipeline CI/CD, rendendo facile l'integrazione nel tuo processo di sviluppo esistente. Migliora la [gestione degli aggiornamenti](https://capgo.app/docs/plugin/cloud-mode/manual-update/) mantenendo tutto efficiente e semplice.

## Riepilogo

### Punti Principali

La gestione efficace dei canali garantisce che le distribuzioni delle app procedano senza intoppi. Il sistema di canali di Capgo mostra risultati impressionanti: **il 95% degli aggiornamenti viene adottato entro 24 ore**, supportato da una CDN globale che consegna un bundle di 5MB in soli 114ms, insieme a un tempo di risposta API di 57ms in tutto il mondo [\[1\]](https://capgo.app/).

| Metrica | Prestazione |
| --- | --- |
| Aggiornamenti Totali Consegnati | 23.5M |
| App in Produzione Attive | 750 |
| Tasso di Successo Globale | 82% |
| Adozione Aggiornamenti (24h) | 95% |

Il raggiungimento di questi risultati si basa su convenzioni di denominazione chiare e assegnazioni utente precise, come discusso in precedenza. Costruire una strategia di canale strutturata intorno a queste metriche può migliorare ulteriormente le prestazioni.

### Per Iniziare

Per sfruttare questi risultati comprovati, inizia perfezionando la configurazione dei tuoi canali:

-   **Definisci una Struttura Chiara dei Canali**: Canali separati per ambienti di sviluppo, staging e produzione.
-   **Configura i Permessi Utente**: Assegna controlli di accesso granulari per i canali di aggiornamento.
-   **Monitora le Prestazioni**: Controlla regolarmente i tassi di successo degli aggiornamenti e il coinvolgimento degli utenti.

Non dimenticare di rivedere e rimuovere periodicamente i canali inattivi per mantenere un flusso di lavoro efficiente. Con canali ben gestiti, gli sviluppatori possono distribuire gli aggiornamenti più rapidamente mantenendo il controllo e la stabilità.
