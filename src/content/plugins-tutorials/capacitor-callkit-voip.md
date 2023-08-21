# Using @capgo/capacitor-callkit-voip Package

The `@capgo/capacitor-callkit-voip` package provides PushKit functionality to Ionic Capacitor. It is designed to be used with the BetterCall app, but can also be used in other projects.

## Installation

To install the package, you can run the following command:

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

Please make sure to have Xcode installed on your computer before proceeding with the installation.

## Configuring iOS Project

To configure your iOS project to use the package, follow these steps:

1. Open your Xcode project and go to the Capabilities pane.
2. Enable the "Voice over IP" capability by selecting the checkbox.
3. Register your certificate on the Apple Developer website. You can find detailed instructions in the provided link.
4. Download the certificate and open it to import it into the Keychain Access app.
5. Export the certificates as shown in the provided image.
6. Navigate to the folder where you exported the file and execute the following command in the terminal:

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

This will generate an `app.pem` certificate file that can be used to send VOIP notifications.

## Usage

Once the package is installed and the iOS project is configured, you can start using it in your code.

First, import the `CallKitVoip` module:

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

Next, you need to call the `.register()` method to start the registration of VOIP notifications:

```typescript
async function registerVoipNotification() {
  // Register token
  CallKitVoip.addListener("registration", ({ token }) => {
    console.log(`VOIP token has been received ${token}`);
  });

  // Handle incoming call
  CallKitVoip.addListener("callAnswered", ({ username, connectionId }) => {
    console.log(`Call has been received from ${username} (connectionId: ${connectionId})`);
  });

  // Init plugin, start registration of VOIP notifications
  await CallKitVoip.register();
  console.log("Push notification has been registered");
}
```

To send a VOIP notification, you can use the provided `sendVoip.sh` script:

```shell
#!/bin/bash

function main {
    connectionId=${1:?"connectionId should be specified"}
    token=${2:?"Enter device token that you received on register listener"}
    username=${3:-Anonymus"}

    curl -v \
    -d "{\"aps\":{\"alert\":\"Incoming call\", \"content-available\":\"1\"}, \"Username\": \"${username}\", \"ConnectionId\": \"${connectionId}\"}" \
    -H "apns-topic: .voip" \
    -H "apns-push-type: voip" \
    -H "apns-priority: 10" \
    --http2 \
    --cert app.pem \
    "https://api.development.push.apple.com/3/device/${token}"
}

main $@
```

## Conclusion

The `@capgo/capacitor-callkit-voip` package allows you to add PushKit functionality to your Ionic Capacitor project. By following the installation and usage instructions, you will be able to send and receive VOIP notifications in your app.