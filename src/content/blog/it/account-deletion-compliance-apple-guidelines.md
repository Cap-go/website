---
slug: account-deletion-compliance-apple-guidelines
title: 'Conformità per l''eliminazione dell''account: Linee guida Apple'
description: >-
  Scopri le linee guida di Apple per l'eliminazione degli account, i requisiti
  chiave per gli sviluppatori e le migliori pratiche per garantire la privacy
  dei dati degli utenti.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T03:15:15.208Z
updated_at: 2025-05-14T03:16:02.945Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/6823e678f8b9f5df39f52ef5-1747192562945.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Apple guidelines, account deletion, user privacy, app compliance, mobile
  development
tag: 'Development, Mobile, Security'
published: true
locale: it
next_blog: ''
---
**Apple richiede che tutte le app sull'[App Store](https://www.apple.com/app-store/) forniscano un'opzione all'interno dell'app per eliminare gli account utente.** Questa politica, in vigore dal 30 giugno 2022, garantisce agli utenti la possibilità di cancellare completamente i propri dati, dando loro maggior controllo sulla privacy. Ecco cosa devi sapere:

-   **Requisiti Principali**:
    
    -   L'**opzione di eliminazione account** deve essere facilmente trovabile nelle impostazioni dell'app.
    -   I dati dell'utente devono essere **completamente rimossi**, eccetto dove la conservazione è legalmente richiesta.
    -   Le app che utilizzano **"Sign in with Apple"** devono revocare i token tramite l'API REST di Apple.
-   **Per gli Sviluppatori**:
    
    -   Testare il processo di eliminazione per facilità d'uso e rimozione completa dei dati.
    -   Assicurarsi che anche i servizi di terze parti eliminino i dati utente.
    -   Utilizzare strumenti come **[Capgo](https://capgo.app/)** per aggiornamenti in tempo reale e monitoraggio della conformità.
-   **Problemi Comuni**:
    
    -   Sincronizzazione delle eliminazioni tra piattaforme.
    -   Gestione di token orfani e pulizia incompleta dei dati.

Il mancato rispetto può comportare il rifiuto o la rimozione dell'app dall'App Store. Gli sviluppatori dovrebbero dare priorità alla privacy degli utenti e seguire le linee guida di Apple per evitare problemi.

## Requisiti Tecnici

### Passaggi Richiesti per l'Eliminazione

Il processo di eliminazione di un account deve essere semplice e facile da trovare. Posizionarlo in modo evidente nelle impostazioni dell'account dell'app - non nascosto in sottomenu o link esterni.

Ecco i passaggi chiave da includere:

-   **Verifica Account**: Assicurarsi che l'identità dell'utente sia confermata tramite un codice email o SMS.
-   **Comunicazione Chiara**: Spiegare chiaramente quali dati verranno eliminati e evidenziare eventuali requisiti legali per la conservazione di determinate informazioni.
-   **Finestra di Conferma**: Fornire una schermata di conferma finale che delinei le conseguenze dell'eliminazione dell'account.

Inoltre, utilizzare l'API REST Sign in with Apple per revocare i token durante il processo di eliminazione dell'account [\[2\]](https://developer.apple.com/news/?id=12m75xbj)[\[3\]](https://www.ketch.com/blog/posts/apple-delete-account-requirement).

Una volta implementati questi passaggi, concentrarsi sulla rimozione dei dati in linea con questi requisiti.

### Standard di Rimozione Dati

| **Tipo di Dati** | **Requisiti di Rimozione** | **Considerazioni Legali** |
| --- | --- | --- |
| Contenuto Utente | Eliminazione completa | Potrebbe essere necessaria una conservazione temporanea |
| Dati di Autenticazione | Rimozione immediata | Richiesta revoca dei token |
| Dati di Terze Parti | Eliminazione coordinata | Conformità varia per servizio |
| Cronologia Utilizzo | Pulizia completa | Soggetto a regole di conservazione legali |

Se i dati utente sono memorizzati con servizi di terze parti, assicurarsi che anche questi servizi eliminino i dati. I settori con regolamenti rigorosi potrebbero richiedere ulteriore supporto al cliente per garantire la conformità [\[2\]](https://developer.apple.com/news/?id=12m75xbj).

È fondamentale verificare l'aderenza a questi standard attraverso test completi.

### Requisiti di Test

Il test del processo di eliminazione dell'account è essenziale per garantire conformità e funzionalità. Utilizzare strumenti come [Xcode](https://developer.apple.com/xcode/) e gli strumenti di revisione dell'App Store per concentrarsi su:

-   **Flusso di Eliminazione**: Confermare che il processo sia user-friendly e facilmente accessibile.
-   **Verifica Dati**: Assicurarsi che tutti i dati utente siano completamente rimossi da tutti i sistemi.
-   **Casi Limite**: Testare scenari che coinvolgono acquisti in-app e integrazioni di terze parti.

Per gli sviluppatori che utilizzano [Capacitor](https://capacitorjs.com/) con Capgo, gli aggiornamenti in tempo reale possono aiutare ad affrontare rapidamente i problemi di conformità, evitando di attendere l'approvazione dell'App Store. Durante i test, assicurarsi di verificare:

-   La revoca dei token per gli utenti che hanno effettuato l'accesso con Apple.
-   La rimozione completa dei dati da tutti i servizi connessi.
-   La corretta gestione degli abbonamenti attivi.

## Problemi Comuni e Soluzioni

### Sincronizzazione Dati tra Piattaforme

A volte, l'eliminazione dei dati su iOS e Android non si sincronizza correttamente. Questo di solito accade a causa delle differenze nel modo in cui ogni piattaforma gestisce l'archiviazione e i dati in cache.

Ecco come affrontare i problemi di sincronizzazione:

-   **Gestore di Eliminazione Centralizzato**: Sviluppare un servizio unificato per gestire attività chiave come:
    
    -   Pulizia del [local storage](https://capgo.app/plugins/capacitor-data-storage-sqlite/)
    -   Eliminazione dell'archiviazione sicura
    -   Terminazione dei processi di sincronizzazione cloud
    -   Gestione dei token
-   **Trasmissione Eventi Cross-Platform**: Utilizzare logica lato server per inviare eventi di eliminazione a tutte le sessioni e dispositivi attivi, garantendo la coerenza.

### Aggiornamenti Plugin

Dopo aver gestito l'eliminazione a livello di piattaforma, dovrai affrontare le sfide specifiche dei plugin. Garantire che i plugin siano compatibili e allineati con il processo di eliminazione è fondamentale per evitare incongruenze.

| **Problema** | **Impatto** | **Soluzione** |
| --- | --- | --- |
| Persistenza Token | I token orfani rimangono attivi | Configurare la revoca automatica dei token |
| Archiviazione Locale | La pulizia dei dati potrebbe essere incompleta | Eseguire controlli di eliminazione ricorsivi |
| Sincronizzazione Cloud | Gli stati di eliminazione potrebbero non corrispondere | Utilizzare gestori sincroni per garantire la coerenza |

### Gestione Aggiornamenti [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6823e678f8b9f5df39f52ef5/21f0f35e63cf5752e2e56f9c4dd03eab.jpg)

La gestione degli aggiornamenti in tempo reale gioca un ruolo fondamentale nel mantenere la conformità tra piattaforme e plugin. È qui che **Capgo** può semplificare il processo di gestione degli aggiornamenti per l'eliminazione degli account.

Ecco come Capgo aiuta:

-   **Rollout Graduali**: Testare gli aggiornamenti del flusso di eliminazione con un piccolo gruppo prima di distribuirli ampiamente.
-   **Rollback Istantaneo**: Se qualcosa va storto, tornare immediatamente a una versione stabile precedente.
-   **Analisi degli Aggiornamenti**: Monitorare i tassi di successo dei flussi di eliminazione e identificare problemi di conformità.

Secondo Capgo, gli aggiornamenti di conformità raggiungono il 95% degli utenti entro 24 ore[\[1\]](https://capgo.app). Inoltre, tutte le distribuzioni sono protette con crittografia end-to-end, garantendo la sicurezza dei dati.

Per sfruttare al meglio Capgo per gli aggiornamenti di conformità:

-   **Controllo Versioni**: Utilizzare canali di aggiornamento separati per testare i flussi di eliminazione prima di distribuirli a tutti gli utenti.
-   **Monitoraggio Errori**: Configurare avvisi per eliminazioni fallite o conflitti tra plugin.
-   **Verifica Conformità**: Sfruttare le analisi di Capgo per confermare che gli utenti ricevano gli ultimi aggiornamenti per la conformità dell'eliminazione.

## Guida all'Implementazione

### Standard dell'Interfaccia Utente

Durante la progettazione dell'interfaccia utente per l'eliminazione dell'account, tenere presenti questi punti:

-   **Posizione Principale**: Rendere l'opzione di eliminazione facile da trovare. Posizionarla in modo evidente nelle impostazioni dell'account (es. _Impostazioni > Account > Elimina Account_).
    
-   **Comunicazione Chiara**: Fornire una spiegazione dettagliata di cosa succede quando un account viene eliminato. Includere informazioni su:
    
    -   Quali dati verranno rimossi
    -   Eventuali requisiti legali di conservazione dei dati
    -   Tempi stimati per l'eliminazione
    -   Potenziali impatti sugli abbonamenti attivi
-   **Flusso di Verifica**: Garantire che il processo sia sicuro:
    
    -   Chiedendo agli utenti di reinserire la password
    -   Inviando un codice di verifica via email o SMS
    -   Mostrando finestre di dialogo di conferma che delineino chiaramente l'azione

Questi standard garantiscono un'esperienza user-friendly allineata con i protocolli di conformità più ampi.

### Controlli Automatici di Conformità

Per mantenere un'aderenza costante a questi standard, utilizzare strumenti automatizzati per validare l'interfaccia utente e i processi. Concentrarsi su queste aree critiche:

| Categoria Test | Punti di Verifica | Metodo di Implementazione |
| --- | --- | --- |
| **Test UI** | Garantire che l'opzione di eliminazione sia facile da trovare | Utilizzare test automatizzati di navigazione UI |
| **Rimozione Dati** | Confermare l'eliminazione completa dei dati utente | Validare le risposte API |
| **Gestione Token** | Revocare token come "Sign in with Apple" | Condurre test di integrazione API REST |
| **Cross-Platform** | Garantire coerenza su tutti i dispositivi | Testare su dispositivi multipli |

I test automatizzati regolari aiutano a identificare e affrontare potenziali problemi prima che influenzino gli utenti.

### Prevenzione Rischi

Per minimizzare i rischi e garantire operazioni fluide, seguire questi passaggi:

-   **Gestione Inventario Dati**: Mantenere un registro dettagliato di dove sono archiviati i dati utente. Questo include archiviazione locale, database cloud, servizi di terze parti, sistemi di autenticazione e backup. Verificare che i dati vengano eliminati da tutte queste posizioni.
    
-   **Gestione Errori**: Prepararsi per potenziali problemi come:
    
    -   Interruzioni di rete
    -   Chiamate API fallite
    -   Rimozione incompleta dei dati
    -   Errori di revoca token  
        Implementare meccanismi di fallback per gestire questi scenari con eleganza.
-   **Monitoraggio e Conformità Legale**: Tracciare metriche chiave come tassi di successo delle eliminazioni, tempi medi di completamento e eventuali dati residui. Questo aiuta a identificare e risolvere rapidamente i problemi. Inoltre, garantire la conformità ai requisiti legali, specialmente per i settori con regolamenti rigorosi. Per le app in questi settori, aggiungere passaggi di verifica extra, documentare tutte le procedure accuratamente e condurre audit regolari.
    

## Riepilogo

### Requisiti Principali

Dal 30 giugno 2022, Apple richiede che tutte le app includano una funzionalità nativa che permetta agli utenti di eliminare completamente i loro account. Di seguito una panoramica dei requisiti chiave:

| **Categoria Requisito** | **Dettagli Implementazione** | **Note di Conformità** |
| --- | --- | --- |
| **Accessibilità** | L'opzione di eliminazione account deve essere facile da trovare nelle impostazioni dell'app. | Questa funzionalità deve essere integrata direttamente nell'app. |
| **Gestione Dati** | I dati utente e le informazioni dell'account devono essere completamente eliminati. | Le eliminazioni parziali non soddisfano gli standard di conformità. |
| **Autenticazione** | Revocare correttamente i token per gli account "Sign in with Apple". | Utilizzare l'API REST "Sign in with Apple" per l'implementazione. |
| **Comunicazione** | Informare chiaramente gli utenti sul processo di eliminazione e le tempistiche. | Includere informazioni sulle politiche di conservazione dati e obblighi legali. |

Queste linee guida formano la base per garantire la conformità alle politiche di Apple.

### Prossimi Passi

Per soddisfare questi requisiti, esegui le seguenti azioni:

-   **Revisione dell'Archiviazione Dati**  
    Controlla tutte le fonti in cui vengono archiviati i dati degli utenti e valuta le politiche di conservazione. Assicurati che le connessioni con terze parti siano documentate in modo completo.
    
-   **Implementa Flussi di Eliminazione Sicura**  
    Configura processi per verificare le richieste degli utenti, revocare i token e automatizzare la rimozione dei dati utente.
    
-   **Protocolli di Test**  
    Conduci test completi su tutte le piattaforme, simula vari scenari e mantieni la documentazione per dimostrare la conformità.
    

Strumenti come Capgo possono semplificare gli aggiornamenti consentendo modifiche in tempo reale alla tua app. Test regolari e monitoraggio automatizzato aiuteranno a garantire l'integrità dei dati e mantenere la tua app conforme nel tempo. Inoltre, mantieniti informato sui requisiti legali in evoluzione per evitare lacune di conformità.

## Come Implementare l'Eliminazione dell'Account nella Tua App

<iframe src="https://www.youtube.com/embed/TC6d4pub1jU" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Domande Frequenti

::: faq
### Come possono gli sviluppatori assicurarsi che la loro app soddisfi i requisiti di eliminazione account di Apple?

Per soddisfare le linee guida di Apple sull'eliminazione degli account, gli sviluppatori devono offrire agli utenti un modo semplice e chiaro per eliminare i loro account direttamente all'interno dell'app. Il processo deve essere facile da trovare, semplice da seguire e non dovrebbe richiedere agli utenti di visitare siti web esterni o contattare i team di supporto.

Per chi utilizza Capacitor, strumenti come **Capgo** possono rendere più facile rimanere conformi. Capgo permette aggiornamenti in tempo reale della tua app, il che significa che puoi implementare rapidamente modifiche - come aggiustamenti alla funzionalità di eliminazione account - senza attendere le approvazioni dell'app store. Garantendo la conformità, non solo riduci il rischio di rifiuti delle app ma rafforzi anche la fiducia degli utenti.
:::

::: faq
### Come possono gli sviluppatori garantire una corretta eliminazione dei dati su tutte le piattaforme evitando problemi di sincronizzazione?

Gestire l'eliminazione dei dati su varie piattaforme non è sempre semplice, specialmente quando si deve rispettare linee guida specifiche come quelle stabilite da Apple. Per affrontare questo, gli sviluppatori devono stabilire sistemi backend affidabili che elaborino le richieste di eliminazione dati in modo uniforme su tutte le piattaforme integrate. Questo spesso comporta l'utilizzo di API o servizi che eseguono le eliminazioni simultaneamente, garantendo coerenza e prevenendo disallineamenti.

Per le app create con Capacitor, strumenti come **Capgo** possono semplificare questo compito. Capgo supporta aggiornamenti in tempo reale e si allinea con i requisiti di Apple, aiutando gli sviluppatori a gestire gli aggiornamenti delle app e le funzionalità rispettando gli standard di eliminazione dei dati. Utilizzando strumenti che garantiscono una sincronizzazione fluida, gli sviluppatori possono minimizzare gli errori e costruire una maggiore fiducia degli utenti.
:::

::: faq
### Come possono gli sviluppatori di app garantire che le loro app siano conformi ai requisiti di eliminazione account di Apple?

## Garantire la Conformità con i Requisiti di Eliminazione Account di Apple

Per soddisfare i requisiti di eliminazione account di Apple, è cruciale rimanere aggiornati sulle loro linee guida e creare un processo semplice e intuitivo per l'eliminazione dell'account all'interno della tua app. Rivedere regolarmente le Linee Guida per la Revisione dell'App Store di Apple, in particolare le sezioni sulla gestione degli account e dei dati utente, è un passo essenziale per gli sviluppatori.

Se la tua app è costruita utilizzando Capacitor, strumenti come **Capgo** possono semplificare il processo. Capgo offre funzionalità come aggiornamenti in tempo reale e garantisce che la tua app soddisfi i requisiti della piattaforma Apple, mantenendo allo stesso tempo un'esperienza utente fluida. Inoltre, test e monitoraggio regolari sono vitali per confermare la conformità e risolvere rapidamente eventuali problemi potenziali.
:::
