---
locale: fr
---

chantez @capgo/walletconnect

Le package `@capgo/walletconnect` fournit des fonctionnalités pour intégrer WalletConnect dans votre application Ionic Capacitor. WalletConnect est un protocole ouvert qui permet aux applications décentralisées (dApps) de se connecter aux portefeuilles mobiles à l'aide de codes QR cryptés.

Pour commencer à utiliser le package `@capgo/walletconnect` dans votre application, suivez les étapes ci-dessous :

## Étape 1 : Installer le package

```bash
npm install @capgo/walletconnect
```

## Étape 2 : Importer le package

Dans votre fichier TypeScript où vous souhaitez utiliser la fonctionnalité « WalletConnect », importez le package :

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## Étape 3 : Créer une session WalletConnect

Pour créer une session WalletConnect, utilisez la méthode `WalletConnectcreateSession()`. Cela ouvrira un scanner de code QR où l'utilisateur pourra scanner le code QR fourni par la dApp.

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## Étape 4 : Écoutez les événements de session

Pour écouter les événements liés à la session WalletConnect, utilisez la méthode `WalletConnectaddListener()`. Les noms d'événements que vous pouvez écouter sont :

- `sessionRequest` : Déclenché lorsqu'une demande de session est reçue du portefeuille mobile
- `sessionApproved` : Déclenché lorsque la demande de session est approuvée par l'utilisateur
- `sessionConnected` : Déclenché lorsque la session est connectée avec succès
- `sessionDisconnected` : Déclenché lorsque la session est déconnectée

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

## Étape 5 : Approuver une demande de session

Lorsqu'une demande de session est reçue, vous pouvez l'approuver en appelant la méthode `WalletConnectapproveSession()`

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## Étape 6 : Obtenez la session

Pour obtenir l'objet de session en cours, utilisez la méthode `WalletConnectgetSession()`

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## Étape 7 : Déconnecter la session

Pour déconnecter la session en cours, utilisez la méthode `WalletConnectdisconnectSession()`

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

C'est ça! Vous avez maintenant intégré avec succès le package `@capgo/walletconnect` dans votre application Ionic Capacitor et pouvez utiliser la fonctionnalité WalletConenct

Remarque : Les étapes ci-dessus fournissent un aperçu de base de l'utilisation du package `@capgo/walletconnect`. Pour des fonctionnalités et des options plus détaillées, reportez-vous à la documentation du package. Malheureusement, je n'ai pas les informations nécessaires pour générer un didacticiel d'utilisation du package `@capgo. Paquet /ngx-intl-tel-input-app`