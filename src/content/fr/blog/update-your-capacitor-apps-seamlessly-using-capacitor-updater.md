---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: >-
  Mettez à jour vos applications Capacitor en toute transparence à l'aide de
  Capacitor-updater
description: >-
  Salutations à la communauté Capacitor Ionic, aujourd'hui, je vais vous aider à
  configurer le programme de mise à jour de condensateur dans votre application.
  Pour que vous puissiez réaliser des versions transparentes.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Un développeur de condensateurs à la recherche d'une alternative
tag: Tutorial
published: true
locale: fr
next_blog: ''
---

## Qu'est-ce que le programme de mise à jour du condensateur ?

Capacitor-updater, une technologie qui permet de fournir instantanément des mises à jour et des améliorations d'applications aux utilisateurs finaux.

Ceci est particulièrement utile si vous souhaitez corriger des bugs critiques et livrer instantanément sans passer par les critiques de l'App Store.

Vous pouvez y voir une agilité « semblable à celle du Web » consistant à charger latéralement les mises à jour dès qu'elles sont disponibles.

De plus, il propose des restaurations si la nouvelle mise à jour plante l'application.

## Comment ça marche ?

Capgo maintient le bundle JavaScript de votre application synchronisé avec le serveur Capgo, et chaque fois que l'utilisateur ouvre l'application, il vérifie auprès du serveur Capgo si une nouvelle mise à jour est disponible pour le bundle. Et bien sûr, il est livré avec des tonnes de configurations impressionnantes qui peuvent vous aider à affiner l'expérience de votre utilisateur

J'utilise Capgo dans tous mes projets que je construis. Cela me permet de consacrer moins de temps au processus de révision de l'App Store.

Vous pouvez en savoir plus à ce sujet [ici](https://capgoapp/)

## Y a-t-il des limites ?

Aussi bon que cela puisse paraître, il y a quelques points que nous devons garder à l'esprit.
La première chose est que les mises à jour OTA __ne fonctionnent qu'avec les bundles Web__ 
Vous pensez peut-être que ce n’est pas vraiment une grosse limitation car, dans Capacitor JS, nous écrivons presque tout le code en JS CSS et HTML.
Même si cela peut être vrai, il existe toujours des modules natifs que nous installons sur notre application.
Si un module modifie vos répertoires Android ou iOS, vous ne pouvez pas utiliser OTA pour mettre à jour votre application
En effet, le contenu de ces répertoires est utilisé pour compiler des binaires natifs, qu'OTA ne peut pas mettre à jour.
Même l'application native ne peut pas mettre à jour cette partie

Mais vous pouvez configurer votre CI/CD pour gérer cette partie, j'ai fait un tutoriel sur la façon de le faire [ici pour IOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/) , et [ici pour Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Configuration automatique du Capgo

Il est temps de vous inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [créer un compte Capgo](/register/)

Une fois connecté à Capgo, vous aurez une page d'intégration 

![Page d'intégration](/onboarding_1_newwebp)

Suivez les étapes sur la page d'intégration pour ajouter votre première application

### Suivez les instructions de la CLI

Depuis une ligne de commande, directement à la racine de votre application Capacitor, exécutez :

`npx @capgo/cli@latest init`
Pour installer Capgo dans votre application Capacitor, la CLI vous guidera tout au long du processus de configuration de votre application avec Capgo.

Si vous souhaitez le faire manuellement, vous pouvez suivre les étapes ci-dessous

## Configuration manuelle de Capgo

### Installer le plugin

Vous devriez vous retrouver avec ce code ajouté à votre application :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor

Et puis ajoutez à votre application ce code pour informer le plugin natif que le bundle JS est sain (si vous ne le faites pas, le plugin natif reviendra à la version précédente) :

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

Après avoir envoyé votre application à Capgo, vous devez définir votre chaîne par défaut pour permettre aux applications de recevoir des mises à jour de Capgo.`npx @capgo/cli@dernière production de l'ensemble de canaux -s par défaut`

## Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. Le moyen le plus simple de procéder consiste simplement à utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté. à votre ordinateur

    exécution du plafond npx [ios | androïde]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les journaux que l'application a effectué la mise à jour

Bravo! 🎉 Vous avez déployé avec succès votre première Live Update. Ce n'est que le début de ce que vous pouvez faire avec Live Updates. Pour en savoir plus, consultez la [documentation complète Live Updates](/docs/plugin/cloud-mode/getting-started/)


> Si vous devez arrêter la réception en local, la mise à jour exécute cette commande
`npx @capgo/cli@dernier ensemble de canaux`