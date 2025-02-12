# Using @capgo/walletconnect Package

The `@capgo/walletconnect` package provides functionality for integrating WalletConnect into your Ionic Capacitor app. WalletConnect is an open protocol that allows decentralized applications (dApps) to connect with mobile wallets using encrypted QR codes.

To get started with using the `@capgo/walletconnect` package in your app, follow the steps below:

## Step 1: Install the Package

```bash
npm install @capgo/walletconnect
```

## Step 2: Import the Package

In your TypeScript file where you want to use the `WalletConnect` functionality, import the package:

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## Step 3: Create a WalletConnect Session

To create a WalletConnect session, use the `WalletConnect.createSession()` method. This will open a QR code scanner where the user can scan the QR code provided by the dApp.

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## Step 4: Listen for Session Events

To listen for events related to the WalletConnect session, use the `WalletConnect.addListener()` method. The event names you can listen for are:

- `sessionRequest`: Triggered when a session request is received from the mobile wallet.
- `sessionApproved`: Triggered when the session request is approved by the user.
- `sessionConnected`: Triggered when the session is successfully connected.
- `sessionDisconnected`: Triggered when the session is disconnected.

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

## Step 5: Approve a Session Request

When a session request is received, you can approve it by calling the `WalletConnect.approveSession()` method.

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## Step 6: Get the Session

To get the current session object, use the `WalletConnect.getSession()` method.

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## Step 7: Disconnect the Session

To disconnect the current session, use the `WalletConnect.disconnectSession()` method.

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

That's it! You have now successfully integrated the `@capgo/walletconnect` package into your Ionic Capacitor app and can use WalletConenct functionality.

Note: The above steps provide a basic overview of using the `@capgo/walletconnect` package. For more detailed functionality and options, refer to the package's documentation.Unfortunately, I don't have the necessary information to generate a tutorial for using the `@capgo/ngx-intl-tel-input-app` package.