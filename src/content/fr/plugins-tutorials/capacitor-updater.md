---
locale: fr
---

Tutoriel du package capgo/capacitor-updater

Ce didacticiel vous guidera tout au long du processus d'utilisation du package `@capgo/capacitor-updater` pour activer les mises à jour automatiques dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés :

- Nodejs
- npm

##Installation

Pour installer le package `@capgo/capacitor-updater`, ouvrez votre terminal ou votre invite de commande et exécutez la commande suivante :

```
npm install @capgo/capacitor-updater
```

Cela téléchargera et installera le package dans votre projet

### Installer le plugin

Vous devriez vous retrouver avec ce code ajouté à votre application :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor

Et puis ajoutez à votre application ce code pour informer le plugin natif que le bundle JS est sain, le plugin natif reviendra à la version précédente, si vous ne parvenez pas à le faire :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi

Ensuite, effectuez une « npm run build && npx cap copy » pour mettre à jour votre application

### Connectez-vous à Capgo CLOUD

Tout d'abord, utilisez le `all` [apikey](https://webcapgoapp/dashboard/apikeys/) présent dans votre compte pour vous connecter avec la CLI :

`npx @capgo/cli@dernière connexion YOU_KEY`

### Ajoutez votre première application

Commençons par créer une application dans Capgo Cloud avec la CLI

`npx @capgo/cli@dernier ajout d'application`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application

### Téléchargez votre première version

Exécutez la commande pour construire votre code et envoyez-le à Capgo avec :
`npx @capgo/cli@dernier téléchargement du bundle`

Par défaut, le nom de la version sera celui de votre fichier `packagejson`

Enregistrez dans [Capgo](https://webcapgoapp/) si la build est présente

Vous pouvez même le tester avec mon [application sandbox mobile](https://capgoapp/app_mobile/)

### Définir la chaîne par défaut

Après avoir envoyé votre application à Capgo, vous devez définir votre chaîne par défaut pour permettre aux applications de recevoir des mises à jour de Capgo.

`npx @capgo/cli@dernière production de l'ensemble de canaux -s par défaut`

## Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. Le moyen le plus simple de procéder consiste simplement à utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté. à votre ordinateur

    exécution du plafond npx [ios | androïde]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les journaux que l'application a effectué la mise à jour

Bravo! 🎉 Vous avez déployé avec succès votre première Live Update. Ce n'est que le début de ce que vous pouvez faire avec Live Updates. Pour en savoir plus, consultez la [documentation complète Live Updates](/docs/plugin/cloud-mode/getting-started/)


> Si vous devez arrêter la réception en local, la mise à jour exécute cette commande
`npx @capgo/cli@dernier ensemble de canaux`


## Conclusion

Félicitations! Vous avez appris avec succès comment utiliser le package `@capgo/capacitor-updater` pour activer les mises à jour automatiques dans votre application Ionic Capacitor. Que vous choisissiez la mise à jour automatique ou la configuration manuelle, vous disposez désormais des outils nécessaires pour maintenir votre application à jour. -rendez-vous en toute simplicité