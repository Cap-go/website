---
locale: de
---

sing @capgo/walletconnect Paket

Das `@capgo/walletconnect` Paket bietet Funktionen zur Integration von WalletConnect in Ihre Ionic Capacitor App. WalletConnect ist ein offenes Protokoll, das es dezentralen Anwendungen (dApps) ermöglicht, sich mit mobilen Wallets über verschlüsselte QR-Codes zu verbinden.

Um mit der Verwendung des `@capgo/walletconnect` Pakets in Ihrer App zu beginnen, befolgen Sie die folgenden Schritte:

## Schritt 1: Paket installieren

```bash
npm install @capgo/walletconnect
```

## Schritt 2: Paket importieren

In Ihrer TypeScript-Datei, in der Sie die `WalletConnect`-Funktionalität verwenden möchten, importieren Sie das Paket:

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## Schritt 3: Eine WalletConnect-Sitzung erstellen

Um eine WalletConnect-Sitzung zu erstellen, verwenden Sie die Methode `WalletConnectcreateSession()`. Dies öffnet einen QR-Code-Scanner, in dem der Benutzer den QR-Code scannen kann, der von der dApp bereitgestellt wird.

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## Schritt 4: Auf Sitzungsereignisse hören

Um auf Ereignisse zu hören, die mit der WalletConnect-Sitzung zusammenhängen, verwenden Sie die Methode `WalletConnectaddListener()`. Die Ereignisnamen, auf die Sie hören können, sind:

- `sessionRequest`: Wird ausgelöst, wenn eine Sitzungsanfrage von der mobilen Wallet empfangen wird.
- `sessionApproved`: Wird ausgelöst, wenn die Sitzungsanfrage vom Benutzer genehmigt wird.
- `sessionConnected`: Wird ausgelöst, wenn die Sitzung erfolgreich verbunden ist.
- `sessionDisconnected`: Wird ausgelöst, wenn die Sitzung getrennt wird.

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

## Schritt 5: Eine Sitzungsanfrage genehmigen

Wenn eine Sitzungsanfrage empfangen wird, können Sie sie genehmigen, indem Sie die Methode `WalletConnectapproveSession()` aufrufen.

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## Schritt 6: Die Sitzung abrufen

Um das aktuelle Sitzungsobjekt zu erhalten, verwenden Sie die Methode `WalletConnectgetSession()`.

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## Schritt 7: Die Sitzung trennen

Um die aktuelle Sitzung zu trennen, verwenden Sie die Methode `WalletConnectdisconnectSession()`.

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

Das ist es! Sie haben nun erfolgreich das `@capgo/walletconnect` Paket in Ihre Ionic Capacitor App integriert und können die Funktionalität von WalletConnect nutzen.

Hinweis: Die obigen Schritte geben einen grundlegenden Überblick über die Verwendung des `@capgo/walletconnect` Pakets. Für detailliertere Funktionen und Optionen konsultieren Sie die Dokumentation des Pakets. Leider habe ich nicht die erforderlichen Informationen, um ein Tutorial zur Verwendung des `@capgo/ngx-intl-tel-input-app` Pakets zu erstellen.