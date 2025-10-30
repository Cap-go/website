---
locale: fr
---

Tutoriel du package capgo/capacitor-updater

Ce tutoriel vous guidera à travers le processus d'utilisation du package `@capgo/capacitor-updater` pour activer les mises à jour automatiques dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Nodejs
- npm

## Installation

Pour installer le package `@capgo/capacitor-updater`, ouvrez votre terminal ou votre invite de commande et exécutez la commande suivante :

```
npm install @capgo/capacitor-updater
```

Cela téléchargera et installera le package dans votre projet.

### Installer le plugin

Vous devriez terminer avec ce code ajouté à votre application :

`npm i @capgo/capacitor-updater && npx cap sync`

Pour installer le plugin dans votre application Capacitor.

Puis ajoutez à votre application ce code pour notifier le plugin natif que le bundle JS est sain ; le plugin natif reviendra à la version précédente si vous ne le faites pas :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela informera le plugin natif que l'installation a réussi.

Ensuite, exécutez `npm run build && npx cap copy` pour mettre à jour votre application.

### Connexion à Capgo CLOUD

Tout d'abord, utilisez la `clé API` [apikey](https://console.capgo.app/dashboard/apikeys/) présente dans votre compte pour vous connecter avec la CLI :

`npx @capgo/cli@latest login VOTRE_CLÉ`

### Ajoutez votre première application

Commençons par créer une application dans Capgo Cloud avec la CLI.

`npx @capgo/cli@latest app add`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application.

### Téléchargez votre première version

Exécutez la commande pour construire votre code et l'envoyer à Capgo avec :
`npx @capgo/cli@latest bundle upload`

Par défaut, le nom de la version sera celui figurant dans votre fichier `packagejson`.

Vérifiez dans [Capgo](https://console.capgo.app/) si la construction est présente.

Vous pouvez même le tester avec mon [application mobile sandbox](https://capgo.app/app_mobile/).

### Rendre le canal par défaut

Après avoir envoyé votre application à Capgo, vous devez rendre votre canal `default` pour permettre aux applications de recevoir des mises à jour de Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct depuis Deploy, vous devez exécuter l'application sur un appareil ou un émulateur. Le moyen le plus simple de le faire est d'utiliser la commande suivante pour lancer votre application locale sur un émulateur ou un appareil connecté à votre ordinateur.

    npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan et rouvrez-la, vous devriez voir dans les journaux que l'application a effectué la mise à jour.

Félicitations ! 🎉 Vous avez déployé avec succès votre première mise à jour en direct. Ce n'est que le début de ce que vous pouvez faire avec les mises à jour en direct. Pour en savoir plus, consultez la [documentation complète sur les mises à jour en direct](/docs/plugin/cloud-mode/getting-started/).

> Si vous devez arrêter de recevoir la mise à jour en local, exécutez cette commande :
`npx @capgo/cli@latest channel set`

## Conclusion

Félicitations ! Vous avez appris avec succès à utiliser le package `@capgo/capacitor-updater` pour activer les mises à jour automatiques dans votre application Ionic Capacitor. Que vous choisissiez la mise à jour automatique ou la configuration manuelle, vous disposez désormais des outils nécessaires pour maintenir votre application à jour facilement.
