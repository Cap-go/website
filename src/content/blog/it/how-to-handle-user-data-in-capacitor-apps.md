---
slug: how-to-handle-user-data-in-capacitor-apps
title: Come gestire i dati degli utenti nelle app Capacitor
description: >-
  Apprenez des stratégies efficaces pour gérer les données des utilisateurs dans
  les applications mobiles, en mettant l'accent sur la sécurité, la conformité
  et les meilleures pratiques de gestion des données.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-18T04:43:56.186Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b3d6e4147c4c67492d1b20-1739853969789.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  user data, secure storage, data protection, GDPR, CCPA, data retention,
  permissions management, mobile apps
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**Gestire i dati degli utenti nelle app [Capacitor](https://capacitorjs.com/) richiede una memorizzazione sicura, politiche di conservazione chiare e conformità alle leggi sulla protezione dei dati come il [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) e il [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act).** Questa guida spiega come ridurre al minimo la raccolta di dati, proteggere le informazioni sensibili e gestire efficacemente i permessi. Ecco una rapida panoramica:

1.   **Minimizzazione dei Dati**: Raccogli solo ciò che è necessario per funzionalità specifiche dell'app.
2.   **Memorizzazione Sicura**: Usa strumenti come il plugin `@capacitor/secure-storage` per la crittografia.
3.   **Conservazione dei Dati**: Automatizza la cancellazione in base a limiti di tempo definiti.
4.   **Diritti degli Utenti**: Consenti agli utenti di accedere, eliminare o esportare i propri dati.
5.   **Gestione dei Permessi**: Richiedi i permessi in modo contestuale e fornisci alternative per le richieste negate.
6.   **Aggiornamenti OTA**: Assicurati di aggiornamenti over-the-air sicuri con strumenti come [Capgo](https://capgo.app/).

## Come usare la Memorizzazione Sicura di Ionic [Capacitor](https://capacitorjs.com/)

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-18.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/VsZECyPIOYY" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Riduzione della Raccolta Dati

Adottare un approccio strutturato alla revisione, pianificazione e gestione della raccolta dati è fondamentale per rimanere in conformità con le normative sulla privacy. Sfruttando gli strumenti integrati di Capacitor per minimizzare la raccolta di dati, puoi intraprendere passi pratici per migliorare le pratiche di dati della tua app.

### Revisione della Raccolta Dati

Inizia tracciando come i dati fluiscono attraverso la tua app. Usa strumenti come visualizzatori di origine dei dati per individuare aree in cui potrebbero essere raccolti dati non necessari. I software di Valutazione dell'Impatto sulla Privacy (PIA) possono guidarti nella valutazione se ciascun dato sia realmente necessario. Ecco una panoramica delle aree su cui concentrarsi:

| Tipo di Dato | Focus della Revisione | Azioni da Intrattenere |
| --- | --- | --- |
| Input Utente | Campi di modulo e validazione | Rimuovere campi non necessari |
| Chiamate API | Payload di richiesta/riposta | Filtrare campi di dati extra |
| Memorizzazione | Dati memorizzati in cache e persistenti | Snellire l'uso della memorizzazione |
| Analisi | Monitoraggio dell'uso | Mantenere solo metriche essenziali |

### Obiettivi della Raccolta Dati

Sii chiaro sul perché stai raccogliendo ciascun pezzo di dati. Ogni punto dati dovrebbe servire a uno scopo specifico. Per esempio:

```javascript
// Purpose-driven data collection example
const userPreferences = {
  location: "Used for local weather updates",
  notification: "Needed for sending alerts"
};
```

Se la tua app ha una funzionalità meteo, potrebbe richiedere solo un codice postale anziché un indirizzo completo. Questo approccio garantisce che stai raccogliendo solo le informazioni necessarie per le funzioni principali dell'app[\[1\]](https://capacitorjs.com/docs/guides/storage)[\[5\]](https://usercentrics.com/knowledge-hub/data-minimization/).

### Controlli di Immissione Dati

Utilizza strumenti di validazione per limitare la quantità di dati raccolti attraverso moduli e chiamate API. Combina la validazione lato client con la verifica lato server per applicare questi limiti in modo efficace.

Incorpora le funzioni di sicurezza di Capacitor per migliorare questi controlli:

1.   Usa menu a discesa invece di campi di testo libero dove possibile.
2.   Imposta limiti di caratteri per i campi di input di testo.

Pianifica audit trimestrali con strumenti di discovery automatizzati per garantire che le tue pratiche di raccolta dati rimangano efficienti e allineate alla funzionalità prevista della tua app.

## Sicurezza e Memorizzazione dei Dati

Una volta definiti i tuoi confini di raccolta dati, è cruciale implementare misure per proteggere le informazioni degli utenti rispettando i principi di minimizzazione dei dati.

### Configurazione della Memorizzazione Sicura

Il plugin `@capacitor/secure-storage` utilizza funzioni di sicurezza integrate come iOS Keychain e Android Keystore per proteggere i dati sensibili [\[1\]](https://capacitorjs.com/docs/guides/storage).

```typescript
import { SecureStorage } from '@capacitor/secure-storage';

// Store sensitive data
await SecureStorage.set({
  key: 'authToken',
  value: 'user-specific-token'
});

// Retrieve stored data
const { value } = await SecureStorage.get({ key: 'authToken' });
```

### Metodi di Crittografia dei Dati

Aggiungere crittografia lato client è un ulteriore livello di protezione. Librerie come [CryptoJS](https://cryptojs.gitbook.io/docs) possono aiutare a crittografare informazioni sensibili:

```typescript
// Basic encryption/decryption implementation
const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};
```

Ruotare regolarmente le chiavi di crittografia è un modo intelligente per migliorare la sicurezza. Questo garantisce che anche se una chiave è compromessa, il resto dei dati rimane sicuro [\[2\]](https://app.studyraid.com/en/read/11146/345611/securing-data-in-capacitor-apps).

### Confronto delle Opzioni di Memorizzazione

Selezionare la giusta soluzione di memorizzazione dipende da quanto siano sensibili i dati. Ecco un confronto rapido:

| Caratteristica | Memorizzazione Sicura | Memorizzazione Locale |
| --- | --- | --- |
| Livello di Sicurezza | Alto (crittografato) | Base |
| Migliore per | Token, password | Impostazioni non sensibili |
| Prestazioni | Più lento (a causa della crittografia) | Accesso più veloce |

L'API di Memorizzazione Sicura è una scelta solida per memorizzare informazioni critiche come token di autenticazione e dati personali degli utenti [\[1\]](https://capacitorjs.com/docs/guides/storage)[\[4\]](https://capacitorjs.com/docs/guides/security). Le sue [capacità di crittografia](https://capgo.app/docs/cli/migrations/encryption/) si allineano anche con le politiche di conservazione, consentendo l'accesso controllato ai dati all'interno di intervalli di tempo specificati [\[2\]](https://app.studyraid.com/en/read/11146/345611/securing-data-in-capacitor-apps).

###### sbb-itb-f9944d2

## Limiti di Tempo di Memorizzazione dei Dati

Stabilire politiche di conservazione dei dati chiare aiuta ad allinearsi con i principi di minimizzazione dei dati, assicurando che le informazioni non vengano conservate più a lungo del necessario.

### Regole di Tempo di Memorizzazione

Diversi tipi di dati degli utenti dovrebbero avere periodi di conservazione definiti in base al loro scopo e livello di sensibilità. Di seguito è riportato un framework suggerito per gestire la conservazione dei dati nelle [app Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/):

| Tipo di Dato | Periodo di Conservazione | Giustificazione |
| --- | --- | --- |
| **Dati dell'Account** | Fino alla cancellazione dell'account o 2 anni di inattività | Necessari per operazioni relative all'account |
| **Registri di Transazioni** | 7 anni | Conformità alle normative finanziarie |
| **Dati Analitici** | 90 giorni (anonimizzati), 1 anno (cancellazione) | Supporta miglioramenti delle funzionalità |
| **Preferenze di Marketing** | Fino all'opzione di non partecipare o alla cancellazione dell'account | Rispetta i requisiti di consenso |

Ecco un esempio di come memorizzare dati con una data di scadenza in modo programmatico:

```typescript
async function storeDataWithExpiration(key: string, value: any, retentionDays: number) {
  const item = {
    value: value,
    expiration: Date.now() + (retentionDays * 24 * 60 * 60 * 1000)
  };
  await Preferences.set({ key, value: JSON.stringify(item) });
}
```

### Rimozione Automatica dei Dati

Automatizzare la pulizia dei dati può aiutare a mantenere la conformità e ridurre l'intervento manuale. La funzione di fetch in background di Capacitor è uno strumento utile per questo:

```typescript
import { BackgroundFetch } from '@capacitor/background-fetch';

BackgroundFetch.registerTask({
  taskId: 'data-cleanup',
  delay: 3600000,
  periodic: true,
  requiresNetworkConnectivity: false
}, async () => {
  await cleanExpiredData();
  return BackgroundFetch.Result.NewData;
});
```

Se stai utilizzando [SQLite](https://www.sqlite.org/) per la memorizzazione, puoi impostare trigger per eliminare automaticamente i record scaduti:

```sql
CREATE TRIGGER remove_expired_data
AFTER INSERT ON user_data
BEGIN
  DELETE FROM user_data 
  WHERE expiration_date < CURRENT_TIMESTAMP;
END;
```

### Opzioni di Rimozione dei Dati Utente

Fornire agli utenti strumenti per gestire i propri dati è essenziale. Ecco due funzionalità chiave che puoi implementare:

1.   **Elimina Dati Specifici**: Consenti agli utenti di rimuovere determinati tipi di dati legati al proprio account.

```typescript
async function deleteSpecificData(userId: string, dataType: string) {
  await Preferences.remove({ key: `${userId}_${dataType}` });

  if (db) {
    await db.run(
      'DELETE FROM user_data WHERE user_id = ? AND data_type = ?',
      [userId, dataType]
    );
  }
}
```

2.   **Esporta Dati Utente**: Consenti agli utenti di scaricare i propri dati memorizzati in un formato strutturato.

```typescript
async function exportUserData(userId: string) {
  // Gathers all user data for export
  const userData = await collectUserData(userId);
  return JSON.stringify(userData);
}
```

L'autorità francese per la protezione dei dati [CNIL](https://www.cnil.fr/en) sottolinea che i periodi di conservazione devono allinearsi con la funzionalità principale dell'app [\[3\]](https://www.privado.ai/post/cnil-publishes-mobile-app-privacy-guidance). Questo principio è particolarmente rilevante per gli sviluppatori di app Capacitor e dovrebbe guidare la tua strategia di conservazione dei dati.

## Controllo dei Permessi dell'App

Gestire attentamente i permessi dell'app è fondamentale per proteggere i dati degli utenti mentre si assicura che la tua app funzioni come previsto. Gestendo correttamente i permessi, puoi limitare l'accesso solo alle funzionalità del dispositivo di cui la tua app ha realmente bisogno. L'API dei Permessi di Capacitor offre un approccio unificato alla gestione dei permessi sia su iOS che su Android.

### Passaggi per la Richiesta di Permessi

Assicurati che i permessi che richiedi siano in linea con gli obiettivi di raccolta dati della tua app. Ecco un esempio di implementazione per gestire le richieste di permesso in un'app Capacitor:

```typescript
import { Permissions } from '@capacitor/core';

const permissionHandler = async (permissionType: string) => {
  const status = await Permissions.query({ name: permissionType });

  if (status.state === 'granted') {
    return true;
  }

  const shouldProceed = await showExplanationDialog(
    `We need ${permissionType} access to provide core functionality`
  );

  if (shouldProceed) {
    const result = await Permissions.request({ name: permissionType });
    return result.state === 'granted';
  }

  return false;
};
```

### Gestione dei Permessi Negati

Se un utente nega una richiesta di permesso, fornisci chiare alternative e indicazioni. Ecco un esempio:

```typescript
const handleDeniedPermission = async (permissionType: string) => {
  const status = await Permissions.query({ name: permissionType });

  if (status.state === 'denied') {
    const alternatives = {
      camera: 'manual photo upload',
      location: 'manual address entry',
      notifications: 'in-app message center'
    };

    showAlternativeFeature(alternatives[permissionType]);

    if (status.canOpenSettings) {
      offerSettingsRedirect();
    }
  }
};
```

### Tempistica delle Richieste di Permesso

Quando chiedi i permessi è importante. La tempistica strategica può migliorare significativamente i tassi di accettazione degli utenti. Ecco una rapida panoramica delle strategie temporali:

| Strategia Temporale | Miglior Caso d'Uso |
| --- | --- |
| **Just-in-Time** | Per funzionalità specifiche quando necessario |
| **Contestuale** | Per funzionalità non critiche |
| **Primo Avvio** | Per funzionalità core richieste all'inizio |
| **Ritardata** | Per funzionalità opzionali più avanti nel percorso dell'utente |

Ad esempio, puoi richiedere l'accesso alla fotocamera solo quando l'utente avvia un'azione come scattare una foto:

```typescript
const captureImage = async () => {
  const userStartedCapture = true;

  if (userStartedCapture) {
    const granted = await permissionHandler('camera');

    if (granted) {
      await startCamera();
    } else {
      showUploadOption();
    }
  }
};
```

Richieste contestuali come questa possono aumentare i tassi di accettazione del 50% rispetto alle richieste upfront [\[2\]](https://app.studyraid.com/en/read/11146/345611/securing-data-in-capacitor-apps). Per garantire un'esperienza fluida, mantieni un tracker di stato dei permessi che salva le decisioni degli utenti tra le sessioni.

Una volta gestiti i permessi, puoi spostare l'attenzione sulla sicurezza degli aggiornamenti, in particolare per le distribuzioni over-the-air (OTA).

## Sicurezza degli Aggiornamenti OTA

Per garantire l'integrità dei dati durante gli [aggiornamenti dell'app](https://capgo.app/plugins/capacitor-updater/), è fondamentale utilizzare processi di aggiornamento OTA (Over-The-Air) sicuri. Questi aggiornamenti aiutano a prevenire modifiche non autorizzate al codice dell'app, che potrebbero bypassare i limiti sulla raccolta dei dati.

### Firma dei Pacchetti di Aggiornamento

Firmare i pacchetti di aggiornamento è un passaggio critico per proteggere contro modifiche non autorizzate al codice. Ecco alcune misure chiave per garantire aggiornamenti OTA sicuri:

| Misura di Sicurezza | Come Viene Eseguita |
| --- | --- |
| **Protezione dei Contenuti** | Crittografia AES |
| **Sicurezza della Consegna** | HTTPS con pinning del certificato |
| **Integrità dell'Aggiornamento** | Verifica dell'hash |
| **Sicurezza delle Versioni** | Numeri di versione firmati |
| **Recupero da Errori** | Capacità di rollback istantaneo |

### Sistema di Aggiornamento [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-18.jpg?auto=compress)

Capgo semplifica gli aggiornamenti OTA sicuri per le app Capacitor, offrendo funzionalità di sicurezza automatizzate. Ecco un esempio di come utilizzare il sistema di aggiornamento di Capgo nella tua app:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const secureUpdate = async () => {
  try {
    const update = await CapacitorUpdater.download({
      version: 'latest',
      validateSignature: true
    });
    if (update.status === 'success') {
      await CapacitorUpdater.set(update);
    }
  } catch (error) {
    await CapacitorUpdater.rollback();
  }
};
```

Este enfoque asegura que las actualizaciones sean validadas y seguras, con opciones de reversión en caso de fallo.

### Cumplimiento de Políticas de Almacenamiento

Adherirse a las directrices de la tienda de aplicaciones es necesario para las actualizaciones OTA[\[1\]](https://capacitorjs.com/docs/guides/storage)[\[6\]](https://opentextbc.ca/writingforsuccess/chapter/chapter-7-sources-choosing-the-right-ones/)[\[7\]](https://ionic.io/blog/capacitor-everything-youve-ever-wanted-to-know). Cada plataforma tiene requisitos específicos para asegurar que las actualizaciones se alineen con sus políticas de retención de datos y seguridad:

| Plataforma | Requisitos de Cumplimiento |
| --- | --- |
| **iOS** | Solo actualizaciones de JavaScript o activos |
| **Android** | Se debe obtener el consentimiento del usuario |
| **Ambas** | Comprobaciones de seguridad y documentación adecuada |

A continuación se muestra un ejemplo de implementación de actualizaciones compatibles con la tienda:

```typescript
const compliantUpdate = async () => {
  const userConsent = await requestUpdateConsent();
  if (userConsent) {
    await CapacitorUpdater.setUpdateConfig({
      type: 'assets-only',
      scope: 'ui-updates' // Updates limited to UI components
    });
  }
};

const preventDowngrade = async (newVersion, currentVersion) => {
  const versions = await CapacitorUpdater.getVersions();
  if (versions.current.buildNumber > newVersion.buildNumber) {
    throw new Error('Downgrade attempt detected');
  }
};
```

## Resumen

### Puntos Clave

Gestionar los datos del usuario de manera efectiva implica combinar estas estrategias fundamentales:

-   Recopilar solo los datos necesarios.
-   Utilizar cifrado nativo de la plataforma para protegerlo.
-   Automatizar los plazos de retención de datos.
-   Establecer controles de permisos detallados.

Estos pasos trabajan conjuntamente para asegurar el cumplimiento desde el momento en que se recopilan los datos hasta que se eliminan automáticamente.

### Pasos para Implementar

Para poner en práctica estas estrategias:

-   1. Auditar tus flujos de datos utilizando los métodos discutidos en la sección 2.
-   2. Fortalecer la seguridad del almacenamiento como se detalla en la sección 3.
-   3. Configurar procesos de eliminación automatizados basados en la sección 4.
-   4. Establecer y hacer cumplir los controles de permisos detallados en la sección 5.

### Aprovechando Capgo

Para los equipos que gestionan actualizaciones OTA, Capgo ofrece herramientas de seguridad integradas que se alinean con estos esfuerzos:

-   **Cifrado de extremo a extremo** para asegurar los paquetes de actualización.
-   **Monitoreo en tiempo real** para abordar rápidamente posibles amenazas de seguridad.
