---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Mettez à jour vos applications Capacitor sans problème avec Capacitor-updater
description: >-
  Salutations à la communauté Capacitor Ionic, aujourd'hui je vais vous aider à
  configurer Capacitor-updater dans votre application. Pour que vous puissiez
  faire des déploiements sans problème.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /update_flow.webp
head_image_alt: Développement de Capacitor rechercher des alternatives
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: ''
---
## Qu'est-ce que Capacitor-updater ?

Capacitor-updater, une technologie qui permet de livrer instantanément des mises à jour et des améliorations d'applications aux utilisateurs finaux.

C'est particulièrement intéressant si vous souhaitez effectuer des corrections de bugs critiques et les livrer instantanément sans passer par les examens de l'App Store.

Vous pouvez le considérer comme une agilité "de type web" permettant de charger des mises à jour dès qu'elles sont disponibles.

De plus, il permet des retours en arrière si la nouvelle mise à jour fait planter l'application.

## Comment ça marche ?

Capgo maintient le bundle JavaScript de votre application synchronisé avec le serveur Capgo, et chaque fois que l'utilisateur ouvre l'application, elle vérifie auprès du serveur Capgo si une nouvelle mise à jour est disponible. Et bien sûr, il est livré avec de nombreuses configurations impressionnantes qui peuvent vous aider à affiner l'expérience de vos utilisateurs.

J'utilise Capgo dans tous les projets que je développe. Cela me permet de passer moins de temps dans le processus d'examen de l'App Store.

Vous pouvez en savoir plus à ce sujet [ici](https://capgo.app/).

## Y a-t-il des limitations ?

Aussi bon que cela puisse paraître, il y a quelques points à garder à l'esprit.
La première chose est que les mises à jour OTA __fonctionnent uniquement avec les bundles web__.
Vous pourriez penser que ce n'est pas vraiment une grande limitation car, dans Capacitor JS, nous écrivons presque tout le code en JS CSS et HTML.
Bien que cela puisse être vrai, il existe toujours des modules natifs que nous installons dans notre application.
Si un module modifie vos répertoires android ou iOS, vous ne pouvez pas utiliser OTA pour mettre à jour votre application.
C'est parce que le contenu de ces répertoires est utilisé pour compiler des binaires natifs, que OTA ne peut pas mettre à jour.
Même l'application native ne peut pas mettre à jour cette partie.

Mais vous pouvez configurer votre CI/CD pour gérer cette partie, j'ai fait un tutoriel sur la façon de le faire [ici pour IOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Configuration automatique de Capgo

Il est temps de s'inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [vous inscrire pour un compte Capgo](/register/).

Une fois connecté à Capgo, vous aurez une page d'intégration

![Page d'intégration](/onboarding_1_new.webp)

Suivez les étapes sur la page d'intégration pour ajouter votre première application.

### Suivez les instructions du CLI

Depuis une ligne de commande, directement à la racine de votre application Capacitor, exécutez :

`npx @capgo/cli@latest init`
Pour installer Capgo dans votre application Capacitor, le CLI vous guidera tout au long du processus de configuration de votre application avec Capgo.

Si vous voulez le faire manuellement, vous pouvez suivre les étapes ci-dessous.

## Configuration manuelle de Capgo

### Installer le plugin

Vous devriez obtenir ce code ajouté à votre application :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor.

Puis ajoutez à votre application ce code pour notifier au plugin natif que le bundle JS est sain (si vous ne le faites pas, le plugin natif reviendra à la version précédente) :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi.

Ensuite, faites un `npm run build && npx cap copy` pour mettre à jour votre application.

### Se connecter à Capgo CLOUD

Tout d'abord, utilisez la [clé API](https://console.capgo.app/dashboard/apikeys/) `all` présente dans votre compte pour vous connecter avec le CLI :

`npx @capgo/cli@latest login YOU_KEY`

### Ajouter votre première application

Commençons par créer une application dans Capgo Cloud avec le CLI.

`npx @capgo/cli@latest app add`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application.

### Télécharger votre première version

Exécutez la commande pour compiler votre code et l'envoyer à Capgo avec :
`npx @capgo/cli@latest bundle upload`

Par défaut, le nom de la version sera celui de votre fichier `package.json`.

Vérifiez dans [Capgo](https://console.capgo.app/) si la build est présente.

Vous pouvez même la tester avec mon [application mobile sandbox](https://capgo.app/app_mobile/).

### Rendre le canal par défaut

Après avoir envoyé votre application à Capgo, vous devez rendre votre canal `default` pour permettre aux applications de recevoir des mises à jour de Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. La façon la plus simple de le faire est simplement d'utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur.

    npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les logs que l'application a effectué la mise à jour.

Félicitations ! 🎉 Vous avez réussi à déployer votre première mise à jour en direct. Ce n'est que le début de ce que vous pouvez faire avec les mises à jour en direct. Pour en savoir plus, consultez la [documentation complète des mises à jour en direct](/docs/plugin/cloud-mode/getting-started/).

> Si vous devez arrêter de recevoir les mises à jour en local, exécutez cette commande
`npx @capgo/cli@latest channel set`
