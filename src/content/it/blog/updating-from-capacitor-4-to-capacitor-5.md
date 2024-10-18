---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Aggiornamento da Capacitor 4 a Capacitor 5: Guida Passo dopo Passo'
description: >-
  Scopri come aggiornare il tuo progetto Capacitor 4 a Capacitor 5 con modifiche
  minime, inclusi l'aggiornamento dei plugin ufficiali e degli strumenti
  necessari.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Illustrazione dell'aggiornamento da Capacitor 4 a 5
tag: Capacitor
published: true
locale: it
next_blog: ''
---

Rispetto agli aggiornamenti precedenti, il passaggio da Capacitor 4 a Capacitor 5 comporta cambiamenti critici minimi. Questa guida fornisce istruzioni passo passo per aggiornare il tuo progetto a Capacitor 5, oltre a un elenco dei cambiamenti critici per i plugin ufficiali.

**Nota**: Capacitor 5 richiede NodeJS 16 o superiore, poiché Node 12 ha raggiunto la fine del supporto e Node 14 raggiungerà la fine del supporto il 30 aprile 2023. Si consiglia di utilizzare l'ultima versione LTS di NodeJS.

1. Installa la versione `latest` della CLI di Capacitor nel tuo progetto:

2. Esegui il seguente comando per lasciare che la CLI gestisca la migrazione:

   Se alcuni passaggi della migrazione non possono essere completati, verranno fornite ulteriori informazioni nell'output del terminale. I passaggi di migrazione manuale sono elencati di seguito.

3. Se hai installato l'estensione VS Code, controlla la sezione delle raccomandazioni dell'estensione per trovare l'opzione per migrare il tuo progetto a Capacitor 5.

### Aggiornamento del progetto iOS Capacitor 4 a Capacitor 5

1. **Aggiorna Xcode**: Capacitor 5 richiede Xcode 14.1+.

2. **Aggiorna gitignore**: Apporta le seguenti modifiche al tuo file `gitignore`:

3. **Aggiorna Assets per utilizzare una singola icona dell'app**: Xcode 14 supporta una singola icona dell'app di 1024x1024. Pulisci il tuo AppIcon.appiconset rimuovendo tutte le dimensioni non necessarie.

### Aggiornamento del progetto Android Capacitor 4 a Capacitor 5

1. **Aggiorna Android Studio**: Capacitor 5 richiede Android Studio Flamingo | 2022.2.1 o più recente a causa dell'utilizzo di Gradle 8, che richiede Java JDK 17. Java 17 è incluso in Android Studio Flamingo, quindi non sono necessari download aggiuntivi.

2. **Esegui l'Assistente di Aggiornamento AGP**: Android Studio può aiutare con alcuni aggiornamenti relativi a Gradle e allo spostamento dei pacchetti nei file di build. Per iniziare, esegui `Tools -> AGP Upgrade Assistant`.

3. **Aggiorna le Variabili del Progetto Android**: Nel tuo file `variables.gradle`, aggiorna i tuoi valori ai seguenti nuovi minimi:

4. **Aggiorna Google Services**:

5. **Aggiorna il plugin Gradle a 8.0.0**:

6. **Aggiorna il wrapper Gradle a 8.0.2**:

7. **Disabilita Jetifier**:

8. **Sposta il pacchetto in `build.gradle`**:

9. **Aggiorna androidScheme**: In Capacitor 6, `https` sarà l'impostazione predefinita per `androidScheme` per le app esistenti per consentire meglio alle applicazioni Capacitor di utilizzare la funzione di Autofill del sistema. Per evitare la perdita di dati a seguito di questa modifica, imposta lo schema su `http` ora, anche se è l'impostazione predefinita attuale.

10. **Aggiorna la versione di Kotlin**: Se il tuo progetto utilizza Kotlin, aggiorna la variabile `kotlin_version` a `'1.8.20'`.

### Modifiche alla Funzionalità dei Plugin

Le seguenti funzionalità dei plugin sono state modificate o rimosse. Aggiorna il tuo codice di conseguenza:

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- Aggiorna la variabile `androidxMaterialVersion` a `1.8.0`.

### Browser

- Aggiorna la variabile `androidxBrowserVersion` a `1.5.0`.

### Camera

- Per Android 13, aggiungi il permesso di lettura delle immagini multimediali (``) in `AndroidManifest.xml`.
- Aggiorna la variabile `androidxMaterialVersion` a `1.8.0`.
- Aggiorna la variabile `androidxExifInterfaceVersion` a `1.3.6`.

### Device

- Cambia `DeviceId.uuid` in `DeviceId.identifier`.
- Su iOS 16+, `DeviceInfo.name` restituirà un nome generico del dispositivo a meno che non aggiungi le appropriate [autorizzazioni](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/).

### Geolocation

- Aggiorna `playServicesLocationVersion` a `21.0.1`.

### Google Maps

- Aggiorna le seguenti variabili:
  - `googleMapsPlayServicesVersion` a `18.1.0`
  - `googleMapsUtilsVersion` a `3.4.0`
  - `googleMapsKtxVersion` a `3.4.0`
  - `googleMapsUtilsKtxVersion` a `3.4.0`
  - `kotlinxCoroutinesVersion` a `1.6.4`
  - `androidxCoreKTXVersion` a `1.10.0`
  - `kotlin_version` a `1.8.20`### Notifiche Locali

- Per Android 13, è richiesto un nuovo controllo delle autorizzazioni runtime per programmare notifiche locali quando si ha come obiettivo SDK 33. Chiamare `checkPermissions()` e `requestPermissions()` di conseguenza.

### Notifiche Push

- Per Android 13, è richiesto un nuovo controllo delle autorizzazioni runtime per ricevere notifiche push quando si ha come obiettivo SDK 33. Chiamare `checkPermissions()` e `requestPermissions()` di conseguenza.
- Aggiornare la variabile `firebaseMessagingVersion` a `23.1.2`.

### Barra di Stato

- Su iOS, l'animazione predefinita della barra di stato è stata cambiata in `FADE`.

Seguendo questi passaggi e aggiornando il codice di conseguenza, dovresti aver aggiornato con successo il tuo progetto da Capacitor 4 a Capacitor 5. Assicurati di testare accuratamente la tua applicazione per garantire che tutte le funzionalità e i plugin funzionino come previsto.