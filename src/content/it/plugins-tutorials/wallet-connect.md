---
locale: it
---

cantare il pacchetto @capgo/walletconnect

Il pacchetto `@capgo/walletconnect` fornisce funzionalità per integrare WalletConnect nella tua app Ionic Capacitor. WalletConnect è un protocollo aperto che consente alle applicazioni decentralizzate (dApps) di connettersi con portafogli mobili utilizzando codici QR crittografati.

Per iniziare a utilizzare il pacchetto `@capgo/walletconnect` nella tua app, segui i passaggi qui sotto:

## Passo 1: Installa il Pacchetto

```bash
npm install @capgo/walletconnect
```

## Passo 2: Importa il Pacchetto

Nel tuo file TypeScript dove desideri utilizzare la funzionalità `WalletConnect`, importa il pacchetto:

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## Passo 3: Crea una Sessione WalletConnect

Per creare una sessione WalletConnect, utilizza il metodo `WalletConnectcreateSession()`. Questo aprirà uno scanner QR code dove l'utente può scansionare il codice QR fornito dalla dApp.

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## Passo 4: Ascolta per Eventi di Sessione

Per ascoltare eventi legati alla sessione WalletConnect, utilizza il metodo `WalletConnectaddListener()`. I nomi degli eventi ai quali puoi ascoltare sono:

- `sessionRequest`: Attivato quando viene ricevuta una richiesta di sessione dal portafoglio mobile.
- `sessionApproved`: Attivato quando la richiesta di sessione viene approvata dall'utente.
- `sessionConnected`: Attivato quando la sessione è connessa con successo.
- `sessionDisconnected`: Attivato quando la sessione è disconnessa.

```typescript
WalletConnect.addListener("sessionRequest", (sessionRequestData) => {
  // Handle the session request data
  console.log("Session request received:", sessionRequestData);
});

WalletConnect.addListener("sessionApproved", () => {
  console.log("Session request approved by user");
});

WalletConnect.addListener("sessionConnected", () => {
  console.log("Session connected");
});

WalletConnect.addListener("sessionDisconnected", () => {
  console.log("Session disconnected");
});
```

## Passo 5: Approva una Richiesta di Sessione

Quando viene ricevuta una richiesta di sessione, puoi approvarla chiamando il metodo `WalletConnectapproveSession()`.

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## Passo 6: Ottieni la Sessione

Per ottenere l'oggetto sessione attuale, utilizza il metodo `WalletConnectgetSession()`.

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## Passo 7: Disconnetti la Sessione

Per disconnettere la sessione attuale, utilizza il metodo `WalletConnectdisconnectSession()`.

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

Ecco fatto! Hai ora integrato con successo il pacchetto `@capgo/walletconnect` nella tua app Ionic Capacitor e puoi utilizzare le funzionalità di WalletConnect.

Nota: I passaggi sopra forniscono una panoramica di base sull'uso del pacchetto `@capgo/walletconnect`. Per funzionalità e opzioni più dettagliate, fai riferimento alla documentazione del pacchetto. Purtroppo, non ho le informazioni necessarie per generare un tutorial sull'uso del pacchetto `@capgo/ngx-intl-tel-input-app`.