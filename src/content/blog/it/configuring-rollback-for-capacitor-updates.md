---
slug: configuring-rollback-for-capacitor-updates
title: Capacitor 업데이트를 위한 롤백 구성
description: >-
  Scopri come configurare le opzioni di ripristino per gli aggiornamenti di
  Capacitor per mantenere la stabilità dell'app, garantendo un'esperienza utente
  fluida durante gli aggiornamenti over-the-air.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-19T01:14:33.030Z
updated_at: 2025-04-19T01:15:15.132Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6802ea903c6b972ab5077c74-1745025315132.jpg
head_image_alt: Sviluppo Mobile
keywords: 'Capacitor, rollback, updates, mobile development, app stability'
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---

Il rollback in [Capacitor](https://capacitorjscom/) garantisce che la tua app rimanga stabile durante gli aggiornamenti over-the-air (OTA). Ecco cosa devi sapere:

-   **Rollback Automatico**: Ripristina automaticamente l'ultima versione stabile se un aggiornamento fallisce
-   **Rollback Manuale**: Permette agli sviluppatori di tornare manualmente a una versione precedente per correzioni rapide
-   **Backup Bundle Predefinito**: Se tutti gli aggiornamenti falliscono, l'app viene ripristinata al pacchetto originale

### Come Configurarlo:

1.  **Rollback Automatico**: Usa configurazioni come soglie del tasso di successo (es. 95%) e periodi di monitoraggio (es. 5 minuti)
2.  **Rollback Manuale**: Mantieni più versioni per flessibilità (es. ultime 5 versioni)

### Suggerimenti di Gestione:

-   Testa gli aggiornamenti in un ambiente di staging prima del rilascio
-   Monitora i tassi di successo degli aggiornamenti e gli errori per attivare i rollback tempestivamente
-   Usa rilasci graduali (es. 10%, 50%, 100%) per minimizzare l'impatto

### Confronto Piattaforme:

**[Capgo](https://capgoapp/)** offre rollback con un click, crittografia, analytics in tempo reale e hosting flessibile. Alternative come **[Capawesome](https://cloudcapawesomeio/)** e **[Appflow](https://ionicio/appflow/)** mancano di funzionalità o hanno costi più elevati

**Tabella di Confronto Rapido:**

| Piattaforma | Tipo di Rollback | Analytics | Crittografia | Opzioni Hosting | Costo |
| --- | --- | --- | --- | --- | --- |
| **Capgo** | Auto/Manuale | Sì | Sì | Flessibile | Conveniente |
| Capawesome | Solo Manuale | No | No | Limitato | Basso |
| Appflow | Auto/Manuale | Parziale | No | Limitato | Alto |

Con una configurazione appropriata e strumenti come Capgo, puoi garantire aggiornamenti fluidi e risolvere rapidamente i problemi per mantenere la tua app funzionante senza interruzioni

## MAD24 304 Sfruttare gli Aggiornamenti Atomici con [OSTree](https://enwikipediaorg/wiki/OSTree) per

<iframe src="https://www.youtube.com/embed/XLLtgE0Klwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Come Funziona il Rollback in [Capacitor](https://capacitorjscom/)

![Capacitor](https://assetsseobotaicom/capgoapp/6802ea903c6b972ab5077c74/7e137b9b90adb3934b29b03381f213c1jpg)

Capacitor include una funzionalità di rollback che garantisce la stabilità dell'app durante gli aggiornamenti over-the-air, fungendo da salvaguardia contro potenziali problemi

### Tipi di Rollback

-   **Rollback Automatico**: Se un aggiornamento fallisce, Capacitor ripristina automaticamente l'app all'ultima versione stabile
-   **Rollback Manuale**: Gli sviluppatori possono tornare manualmente a una versione precedente, permettendo correzioni rapide durante i rilasci graduali o problemi in produzione [\[1\]](https://capgoapp/)

Come ulteriore rete di sicurezza, Capacitor si affida anche al pacchetto originale dell'app

### Utilizzo del Bundle Predefinito come Backup

Se tutti i tentativi di aggiornamento falliscono, Capacitor ripristina l'app utilizzando il bundle originale, assicurando che l'app rimanga funzionante

## Configurazione del Rollback: Passo dopo Passo

Ecco come configurare efficacemente entrambe le opzioni di rollback automatico e manuale

### Configurazione Rollback Automatico

Per abilitare il rollback automatico, imposta i criteri di rilevamento e successo:

```typescript
const config = {
  autoRollback: true,
  timeout: 15000, // Timeout: 15 seconds
  checkInterval: 5000 // Check interval: 5 seconds
};
```

```typescript
const updateConfig = {
  minSuccessRate: 95, // Rollback if success rate drops below 95%
  monitorDuration: 300000 // Monitoring duration: 5 minutes
};
```

### Configurazione Rollback Manuale

Per il rollback manuale, personalizza le opzioni secondo necessità:

```typescript
const rollbackOptions = {
  versionControl: true,
  keepVersions: 5,    // Retain the last 5 versions
};
```

Se usi Capgo, puoi avviare un rollback con un solo click a qualsiasi versione salvata

Per riferimento:

| Tipo Rollback | Timeout | Soglia di Successo | Periodo di Monitoraggio |
| --- | --- | --- | --- |
| Auto | 15 secondi | 95% | 5 minuti |
| Manuale | N/D | Definito dall'utente | Continuo |

Passa alla sezione successiva per i suggerimenti sulla gestione del rollback

## Suggerimenti per la Gestione del Rollback

Mantieni basso l'impatto sugli utenti testando, monitorando e distribuendo attentamente gli aggiornamenti

### Test in Staging

Simula scenari di rollback in un setup di staging che rispecchia la produzione

Per verificare la prontezza del rollback:

-   Distribuisci aggiornamenti beta a piccoli gruppi usando i canali Capgo [\[1\]](https://capgoapp/)
-   Se emergono problemi, attiva un rollback alla versione stabile più recente

Dopo i test, concentrati sul monitoraggio delle prestazioni dell'aggiornamento nell'ambiente live

### Monitoraggio Prestazioni Aggiornamenti

Tieni sotto controllo le prestazioni degli aggiornamenti per garantire rollback fluidi:

-   Monitora i tassi di successo degli aggiornamenti live e il coinvolgimento degli utenti [\[1\]](https://capgoapp/)-   Tenere d'occhio gli errori per avviare i rollback tempestivamente, evitando interruzioni importanti
-   Utilizzare l'analisi per individuare e risolvere eventuali colli di bottiglia

> "Abbiamo implementato gli aggiornamenti OTA di Capgo in produzione per la nostra base utenti di +5000. Stiamo riscontrando un funzionamento molto fluido e quasi tutti i nostri utenti sono aggiornati entro pochi minuti dal rilascio dell'OTA su @Capgo"
>
> -   colenso [\[1\]](https://capgoapp/)

Una volta implementato il monitoraggio, rilasciare gli aggiornamenti in modo incrementale

### Rilascio Graduale degli Aggiornamenti

Distribuire gli aggiornamenti gradualmente: iniziare con il 10%, poi 50% e infine 100% degli utenti [\[1\]](https://capgoapp/)

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente aggiornamenti ai nostri utenti!"
>
> -   Rodrigo Mantica [\[1\]](https://capgoapp/)

## Funzionalità di Rollback delle Piattaforme

Ora che abbiamo discusso della configurazione del rollback e delle migliori pratiche, vediamo come le principali piattaforme gestiscono i rollback. Gli strumenti che offrono possono fare una grande differenza nella velocità e affidabilità del recupero da aggiornamenti problematici

**Capgo** si distingue con il suo **rollback con un clic** a qualsiasi versione. Offre anche **crittografia end-to-end**, **analisi in tempo reale**, canali di distribuzione avanzati e la flessibilità di opzioni sia cloud che self-hosted [\[1\]](https://capgoapp/)

D'altra parte, **Capawesome** è carente, mancando di crittografia, analisi e flessibilità di hosting. Nel frattempo, **Appflow** ha una tariffa annuale elevata e una roadmap poco chiara, che può renderlo meno attraente [\[1\]](https://capgoapp/)

Nella scelta di una piattaforma, i fattori chiave da considerare includono **sicurezza**, profondità delle analisi, flessibilità di distribuzione e costo complessivo. Capgo combina affidabilità del rollback, forte crittografia e convenienza, rendendolo un'opzione solida per team di tutte le dimensioni [\[1\]](https://capgoapp/)

## Riepilogo

Garantire aggiornamenti fluidi per la tua app Capacitor richiede metodi di rollback affidabili dalla configurazione iniziale ai rilasci graduali. Configurando correttamente le impostazioni e scegliendo le piattaforme giuste, i team possono affrontare rapidamente i problemi degli aggiornamenti difettosi mantenendo gli utenti soddisfatti

Un solido piano di rollback include un mix di opzioni automatiche e manuali, monitoraggio in tempo reale, rilasci graduali e pipeline di aggiornamento sicure. Strumenti come Capgo semplificano questo processo con funzionalità come rollback con un clic, aggiornamenti crittografati e analisi integrate. Con queste strategie, la tua app può fornire aggiornamenti costanti e affidabili senza interruzioni