---
title: Sistema dei Canali
description: Come utilizzare capacitor-updater con il sistema dei canali
sidebar:
  order: 6
locale: it
---

Capgo e capacitor-updater sono dotati di un potente sistema di canali

## Cosa puoi fare con i canali:

* Associare i dispositivi al canale per lo sviluppo, beta test
* Utilizzare un canale per branch di sviluppo e lasciare che il team si auto-assegni dal telefono per testare

## Assegnare dispositivi a un canale:

* Rendere il canale predefinito, ogni volta che un nuovo dispositivo chiede un aggiornamento a Capgo questo canale risponderà
* Inviare il **deviceId** (con il metodo [**getDeviceId**](/docs/plugin/api#getdeviceid)) al tuo backend e assegnarlo con l'API pubblica di Capgo
* Rendere il canale auto-assegnabile (con il metodo [**setChannel**](/docs/plugin/api#setchannel)), e lasciare che il dispositivo si iscriva al canale (con o senza interazione dell'utente) con il metodo `setChannel` del plugin
* Utilizzare l'opzione `defaultChannel` nella [configurazione](/docs/plugin/settings#defaultchannel) per impostare il canale predefinito per tutti i dispositivi con questa configurazione del plugin

:::note
Puoi anche assegnare un dispositivo direttamente a un bundle
:::

## Opzioni del canale

<figure><img src="/channel_setting_1.webp" alt="Capgo channel settings configuration panel"><figcaption></figcaption></figure>

Dettagli di ogni opzione:

| Opzione | Descrizione |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Disabilita downgrade automatico sotto native** | Non invia un aggiornamento se la versione nativa dell'app è maggiore di quella del canale |
| **Disabilita upgrade automatico sopra major** | Non invia un aggiornamento se la versione nativa dell'app è inferiore a una Major (**1**23) rispetto a quella del canale |
| **Disabilita upgrade automatico sopra minor** | Non invia un aggiornamento se la versione nativa dell'app è inferiore a una minor (1**2**3) rispetto a quella del canale |
| **Permetti al dispositivo di auto-assegnarsi** | Permette a un dispositivo di utilizzare il metodo `setChannel` per questo canale |
| **IOS** | Permette ai dispositivi iOS di scaricare aggiornamenti da questo canale |
| **Android** | Permette ai dispositivi Android di scaricare aggiornamenti da questo canale |
| **Permetti Emulatore** | Permette agli emulatori di ricevere aggiornamenti da questo canale |
| **Permetti build di sviluppo** | Permette alle build di sviluppo di ricevere aggiornamenti da questo canale |

:::note
Capgo esegue alcuni filtraggi automatici per te. Se hai una CI/CD configurata per inviare la tua versione a Google Play, Google Play eseguirà la tua app ogni volta su più di 20 dispositivi reali. Durante le prime 4 ore di un nuovo bundle, bloccheremo gli IP del data center di Google per evitare che vengano conteggiati nelle tue statistiche
:::

:::note
Capgo **non** conta gli emulatori e le build di sviluppo nel tuo utilizzo, ma tieni presente che non puoi averne più del 3%, altrimenti il tuo account verrà bloccato finché non lo sistemi
:::