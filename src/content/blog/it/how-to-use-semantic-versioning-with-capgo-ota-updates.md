---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: Come Utilizzare il Versionamento Semantico con gli Aggiornamenti OTA di Capgo
description: >-
  Scopri come semplificare gli aggiornamenti delle app e il controllo delle
  versioni utilizzando il Semantic Versioning con gli aggiornamenti OTA di Capgo
  per le app Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**Vuoi semplificare gli [aggiornamenti delle app](https://capgo.app/plugins/capacitor-updater/) e il controllo delle versioni?** Il Semantic Versioning (SemVer) combinato con gli aggiornamenti Over-The-Air (OTA) di [Capgo](https://capgo.app/) rende la gestione delle app [Capacitor](https://capacitorjs.com/) più facile e veloce. Ecco come:

-   **Nozioni base del Semantic Versioning:** Le versioni utilizzano il formato `MAJOR.MINOR.PATCH`:
    
    -   **MAJOR:** Per modifiche incompatibili.
    -   **MINOR:** Per nuove funzionalità retrocompatibili.
    -   **PATCH:** Per correzioni di bug.
-   **Perché usare SemVer con Capgo?**
    
    -   Comunicazione chiara sugli aggiornamenti.
    -   Gestione più intelligente delle versioni.
    -   Evita conflitti di dipendenze.
    -   Pianificazione organizzata dei rilasci.
-   **Passaggi per la [configurazione di Capgo](https://capgo.app/docs/cli/commands/):**
    
    1.  Installa il plugin updater di Capgo.
    2.  Configura la versione della tua app in `capacitor.config.json` e altri file.
    3.  Inizializza con la tua chiave API.
    4.  Usa la [CLI di Capgo](https://capgo.app/docs/cli/commands) per creare bundle e caricare aggiornamenti.
-   **[Gestione di versioni e canali](https://capgo.app/docs/webapp/channels/):**
    
    -   Usa canali separati (es. "beta" per i test, "production" per i rilasci stabili).
    -   Controlla le policy di aggiornamento (aggiornamenti automatici delle patch, approvazione manuale per modifiche maggiori).
    -   Opzioni di rollback per aggiornamenti falliti.
-   **Processo di distribuzione:**
    
    -   Aggiorna i numeri di versione seguendo le regole SemVer.
    -   Testa accuratamente prima della distribuzione.
    -   Usa i comandi CLI per caricare e distribuire gli aggiornamenti.

Capgo assicura che gli aggiornamenti raggiungano gli utenti rapidamente e in modo affidabile, con strumenti per gestire interruzioni e mantenere la stabilità. Perfetto per team che utilizzano flussi di lavoro CI/CD per automatizzare gli aggiornamenti.

**Suggerimento rapido:** Testa sempre gli aggiornamenti e usa i canali per gestire efficacemente i rilasci graduali.

## Semantic Versioning | Livello avanzato

<Steps>

</Steps>

## Guida all'installazione di [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Ecco come configurare Capgo per gestire facilmente gli aggiornamenti OTA e il controllo delle versioni.

### Passaggi iniziali di configurazione

Inizia installando il [plugin updater di Capgo](https://capgo.app/docs/plugin/self-hosted/manual-update/):

Assicurati che il tuo file `capacitor.config.json` utilizzi un formato di versione semantica:

Per progetti più vecchi, aggiorna i dettagli della versione in queste posizioni:

-   `package.json` (cerca il campo `version`)
-   `android/app/build.gradle` (aggiorna `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (aggiorna `CURRENT_PROJECT_VERSION`)

Una volta configurato, inizializza Capgo con la tua chiave API:

**Tabella di riferimento rapido:**

| Fase di setup | Azione chiave | Passo di verifica |
| --- | --- | --- |
| Installazione | Installa plugin e sincronizza | Controlla `package.json` |
| Configurazione | Imposta numeri di versione | Verifica in tutti i file |
| Inizializzazione | Connetti con chiave API | Testa stato connessione |
| Build | Crea bundle iniziale | Conferma successo upload |

### Integrazione controllo versione

Capgo funziona bene con piattaforme CI/CD, rendendo gli [aggiornamenti automatizzati](https://capgo.app/docs/live-updates/update-behavior/) semplici. Le piattaforme supportate includono:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

Se stai lavorando sullo sviluppo locale, puoi disabilitare gli auto-aggiornamenti aggiungendo questo alla tua configurazione:

Questo assicura che Capgo non sovrascriva le tue modifiche locali. Una volta che la configurazione è pronta, carica la tua prima versione:

Infine, notifica al plugin nativo lo stato del bundle nel file principale della tua app:

Questa configurazione assicura che la tua app sia pronta per distribuzioni OTA e gestione delle versioni senza problemi.

## Utilizzo del Semantic Versioning con Capgo

### Gestione dei numeri di versione

Capgo usa il Semantic Versioning (SemVer) per gestire le versioni delle app, formattato come **MAJOR.MINOR.PATCH**. Ecco come funziona:

-   **Versione Major (X.0.0)**: Aumenta il numero MAJOR per modifiche che rompono la compatibilità.
-   **Versione Minor (1.X.0)**: Aumenta il numero MINOR per nuove funzionalità che rimangono compatibili.
-   **Versione Patch (1.0.X)**: Aumenta il numero PATCH per correzioni di bug che non influenzano la compatibilità.

| Tipo di versione | Quando incrementare | [Comportamento auto-aggiornamento](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Major (X.0.0) | Per modifiche API incompatibili | Richiede approvazione manuale |
| Minor (1.X.0) | Per nuove funzionalità | Configurabile in Capgo |
| Patch (1.0.X) | Per correzioni bug | Solitamente automatico |

Seguendo le regole SemVer, puoi semplificare la gestione delle versioni e assicurare aggiornamenti più fluidi attraverso i tuoi canali di distribuzione.

### Linee guida per il controllo versione

Capgo ti permette di gestire efficacemente le distribuzioni impostando canali distinti per diverse fasi del tuo flusso di lavoro.

-   **[Gestione versioni basata su canali](https://capgo.app/docs/webapp/channels/)**: Organizza il tuo processo di distribuzione creando canali separati per test e produzione. Per esempio:
    
    -   Usa un canale "beta" (es. 1.2.0-beta) per testare nuove funzionalità.
    -   Mantieni un canale "production" (es. 1.2.0) per rilasci stabili.
    -   Aggiungi canali specifici per piattaforma (es. "ios-hotfix" con versione 1.2.1) quando affronti problemi specifici della piattaforma.
-   **Configurazione policy di aggiornamento**: Controlla come vengono applicati gli aggiornamenti usando le opzioni di configurazione di Capgo. Per esempio:
    
    Questa configurazione assicura che gli utenti ricevano automaticamente gli aggiornamenti patch, mentre gli aggiornamenti minor e major richiedono approvazione manuale.
    
-   **Strategia di rollback versione**: Usa identificatori pre-release per mantenere chiare opzioni di rollback. Questo approccio ti permette di tornare a una versione precedente se si verificano problemi, mantenendo la versione coerente su tutti i canali.
    

Queste best practice rendono più facile gestire gli aggiornamenti, testare nuove funzionalità e mantenere la stabilità nel processo di distribuzione della tua app.

## Distribuzione aggiornamenti OTA

Una volta che la configurazione della gestione versioni è pronta, segui questi passaggi per distribuire efficacemente gli aggiornamenti OTA.

### Preparazione aggiornamento

Inizia aggiornando la versione in **package.json** e **capacitor.config.json**. Assicurati che la versione segua il formato SemVer (MAJOR.MINOR.PATCH):

-   **Correzione bug**: Aumenta il numero PATCH (es. 1.0.1 → 1.0.2)
-   **Nuova funzionalità**: Aumenta il numero MINOR (es. 1.0.0 → 1.1.0)
-   **Modifica incompatibile**: Aumenta il numero MAJOR (es. 1.0.0 → 2.0.0)

Testa accuratamente la build e conferma che l'app comunichi con il server usando `notifyAppReady`.

Successivamente, decidi la tua [strategia di aggiornamento](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Puoi scegliere tra:

-   **Auto-aggiornamento**: Imponi automaticamente requisiti di versione minima.
-   **Controllo manuale**: Specifica requisiti di versione esatti per gli aggiornamenti.
-   **Basato su canali**: Usa canali per test e rilasci graduali.

### Comandi di aggiornamento CLI Capgo

Usa la CLI di Capgo per distribuire facilmente il tuo aggiornamento. Ecco come:

Capgo assicura una distribuzione sicura con crittografia end-to-end e gestione sicura delle chiavi.

> "@Capgo è un modo intelligente per fare hot code push (e non per tutti i soldi del mondo come con @AppFlow) 🙂"

Una volta distribuito, puoi monitorare gli aggiornamenti attraverso la dashboard di Capgo. Gli aggiornamenti tipicamente raggiungono gli utenti entro minuti dopo l'apertura dell'app. Il processo funziona così:

-   L'app controlla gli aggiornamenti.
-   Scarica l'aggiornamento in background.
-   Marca la nuova versione come attiva quando l'utente esce dall'app.
-   Applica l'aggiornamento al prossimo avvio.

Per distribuzioni a livello enterprise, potresti voler integrare l'automazione CI/CD.

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per distribuire continuamente ai nostri utenti!"

## Risoluzione problemi e suggerimenti

### Problemi di gestione versioni

La gestione del semantic versioning in Capgo può talvolta complicare le distribuzioni degli aggiornamenti. Per evitare di sovrascrivere il tuo lavoro di sviluppo, configura quanto segue nel tuo file `capacitor.config.json`:

Se un aggiornamento fallisce, ecco cosa puoi fare:

-   Imposta `autoUpdate` a `false` durante lo sviluppo.
-   Disinstalla l'app.
-   Reinstallala con la versione corretta.
-   Riabilita gli auto-aggiornamenti una volta che tutto è stabile.

Per aggiornamenti di versioni major, usa il flag `disableAutoUpdateBreaking` e ascolta l'evento `majorAvailable` per gestire correttamente gli aggiornamenti:

Combinando queste configurazioni con buone pratiche di team, puoi mantenere la coerenza delle versioni e ridurre gli errori.

### Controllo versione di team

Una volta gestiti gli aggiornamenti individuali, è cruciale per i team stabilire solide pratiche di controllo versione.

> "Testare ogni modifica prima di unirla al repository principale rafforzerà la stabilità ed eviterà errori costosi" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Ecco alcuni metodi per assicurare la coerenza:

-   Definisci un branch come **repository principale** per agire come fonte di verità.
-   Usa canali Capgo separati per ambienti di sviluppo e produzione.
-   Automatizza gli upload delle versioni tramite pipeline CI/CD.
-   Documenta tutte le modifiche al codice con messaggi di commit chiari e dettagliati.

Per team più grandi, la seguente matrice di gestione versioni può aiutare a organizzare gli aggiornamenti:

| Ambiente | Canale | Auto-aggiornamento | Pattern versione |
| --- | --- | --- | --- |
| Sviluppo | dev | Disabilitato | 0.x.x |
| Staging | beta | Abilitato | x.x.x-beta |
| Produzione | stable | Abilitato | x.x.x |

### Passaggi di ripristino aggiornamenti

Anche con precauzioni, gli aggiornamenti possono fallire. Se ciò accade, segui questi passaggi di ripristino:

1. Tornare a un bundle stabile precedente.
2. Incrementare i numeri di versione per eventuali nuove correzioni (nota: i numeri di versione non possono essere riutilizzati dopo l'eliminazione) [\[2\]](https://github.com/Cap-go/CLI).
3. Verificare gli aggiornamenti durante l'avvio dell'app per assicurarsi che funzionino come previsto.

L'updater di Capgo è progettato per gestire le interruzioni. Per esempio, se il server non è raggiungibile o un aggiornamento viene eliminato, l'app continua a funzionare normalmente [\[3\]](https://capgo.app/docs/faq/). Inoltre, le richieste di rete fallite vengono automaticamente ritentate durante il successivo avvio dell'app [\[3\]](https://capgo.app/docs/faq/). Questa resilienza incorporata minimizza i tempi di inattività e garantisce operazioni più fluide.

## Riepilogo

Il Semantic Versioning, combinato con Capgo, ha reso gli aggiornamenti OTA per le app Capacitor più efficienti. Con 947,6 milioni di aggiornamenti consegnati e 1.400 app in produzione che utilizzano questo sistema [\[1\]](https://capgo.app/), i processi di distribuzione sono diventati l'81% più efficienti [\[1\]](https://capgo.app/). Questa configurazione permette agli sviluppatori di pubblicare aggiornamenti rapidamente e in modo controllato, evitando i ritardi degli app store.

Ecco cosa dicono gli sviluppatori:

> "Abbiamo implementato [gli aggiornamenti OTA di Capgo](https://web.capgo.app/resend_email) in produzione per la nostra base utenti di +5000. Stiamo osservando un funzionamento molto fluido, quasi tutti i nostri utenti sono aggiornati entro pochi minuti dalla distribuzione dell'OTA su @Capgo." - colenso [\[1\]](https://capgo.app/)

Il sistema di versioning MAJOR.MINOR.PATCH rende facile comunicare cambiamenti importanti, nuove funzionalità e correzioni di bug [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). Questo è particolarmente utile per i team che gestiscono diverse release ogni settimana attraverso la piattaforma di Capgo.

La [soluzione crittografata](https://capgo.app/docs/cli/migrations/encryption/) di Capgo, integrata con gli strumenti CI/CD, è anche economica - riducendo i costi fino a $26.100 in cinque anni [\[1\]](https://capgo.app/). I suoi canali personalizzabili assicurano che gli aggiornamenti raggiungano gli utenti giusti al momento giusto.

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente ai nostri utenti!" - Rodrigo Mantica [\[1\]](https://capgo.app/)
