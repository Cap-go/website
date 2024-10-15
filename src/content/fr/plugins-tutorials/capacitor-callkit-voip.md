---
locale: fr
---

chanter @capgo/capacitor-callkit-voip

Le package `@capgo/capacitor-callkit-voip` fournit la fonctionnalité PushKit à Ionic Capacitor. Il est conçu pour être utilisé avec l'application BetterCall, mais peut également être utilisé dans d'autres projets.

##Installation

Pour installer le package, vous pouvez exécuter la commande suivante :

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

Veuillez vous assurer que Xcode est installé sur votre ordinateur avant de procéder à l'installation.

## Configuration du projet iOS

Pour configurer votre projet iOS pour utiliser le package, procédez comme suit :

1 Ouvrez votre projet Xcode et accédez au volet Capacités
2 Activez la fonctionnalité « Voix sur IP » en cochant la case
3 Enregistrez votre certificat sur le site Web des développeurs Apple. Vous pouvez trouver des instructions détaillées dans le lien fourni.
4 Téléchargez le certificat et ouvrez-le pour l'importer dans l'application Keychain Access
5 Exportez les certificats comme indiqué dans l'image fournie
6 Accédez au dossier dans lequel vous avez exporté le fichier et exécutez la commande suivante dans le terminal :

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

Cela générera un fichier de certificat « apppem » qui pourra être utilisé pour envoyer des notifications VOIP

## Utilisation

Une fois le package installé et le projet iOS configuré, vous pouvez commencer à l'utiliser dans votre code

Tout d'abord, importez le module `CallKitVoip` :

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

Ensuite, vous devez appeler la méthode `register()` pour démarrer l'enregistrement des notifications VOIP :

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

Pour envoyer une notification VOIP, vous pouvez utiliser le script « sendVoipsh » fourni :

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

Le package `@capgo/capacitor-callkit-voip` vous permet d'ajouter la fonctionnalité PushKit à votre projet Ionic Capacitor. En suivant les instructions d'installation et d'utilisation, vous pourrez envoyer et recevoir des notifications VOIP dans votre application.