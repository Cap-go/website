---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Comment Rapido Cloud gère la libération sémantique avec CapGo CapacitorUpdater
description: >-
  C'est ainsi que j'ai mis en place la libération sémantique pour gérer les
  versions de mes applications qui utilisent CapGo CapacitorUpdater
author: Rupert Barrow
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
tag: Case Study
published: true
locale: fr
next_blog: ''
---

# Comment Rapido Cloud gère la libération sémantique avec CapGo CapacitorUpdater

##1 Introduction

Chez Rapido Cloud (wwwrapidocloud), je développe une application mobile permettant aux clients Salesforce de déployer facilement leur propre application mobile de marque sans avoir à passer par les boucles difficiles de l'utilisation du SDK Salesforce Mobile ou de Salesforce Mobile Publisher.

J'ai développé cette application mobile sur une plateforme moderne et "standard" avec des composants et outils répandus dont Ionic 8, Angular 18, TypeScript, Capacitor et maintenant CapGo CapacitorUpdater. Ceux-ci sont plus simples à gérer pour les clients qui ne souhaitent pas gérer les spécificités de la plateforme Salesforce. tels que les composants Web Lightning ; et c'est plus facile et moins cher pour moi de recruter des développeurs et des mainteneurs d'applications mobiles Ionic + Angular

Cet article explique ma conception, mes choix et ma mise en œuvre qui font de CapGo et de `semantic-release` une solution très efficace pour gérer automatiquement tous les déploiements via Github Actions. Tout cela a été conçu, testé et documenté pendant la belle période d'essai gratuite de 14 jours. de CapGo CapacitorUpdater

## 2 Pourquoi utiliser CapGo ? Pourquoi utiliser la libération sémantique ?
CapGo CapacitorUpdater m'a séduit par sa promesse de rendre les déploiements d'applications mobiles beaucoup plus simples, beaucoup plus rapides et flexibles que de passer par le processus de livraison standard d'Apple AppStore/Google PlayStore.
Il s'agit de ma première application mobile que je propose aux magasins, après m'être concentré dans le passé sur les applications web, généralement développées sur Salesforce Experience Cloud.

J'avais plutôt peur de la courbe d'apprentissage pour réussir, mais j'ai installé mon application sur Apple TestFlight assez facilement. J'étais alors en mesure d'utiliser CapGo CapacitorUpdater pour déployer mes mises à jour beaucoup plus rapidement.

Ma première exigence et mon cas de test étaient de déployer moi-même pour tester mon application comme une véritable application mobile sur mon propre téléphone, au lieu de tester dans un émulateur mobile ou dans un simulateur via le navigateur mobile Nexus suggéré par IIonic. C'est parce que mon application utilise des applications natives. des fonctionnalités telles que la géolocalisation ou l'accès à la galerie photo et à l'appareil photo N'ayant pas l'expérience de tester une application mobile Capacitor, je n'étais pas sûr que tout fonctionnerait correctement : rien de mieux que de tester la vraie application, en conditions réelles !

CapGo CapacitorUpdater m'a donc aidé à mettre à jour mon application sur mon mobile, en direct, 1 minute après avoir enregistré une nouvelle fonctionnalité ou un correctif dans mon code source : tellement soulageant, tellement flexible, et facile à mettre en place !

## 3 Mon modèle de branchement et de release, et comment la release sémantique s'y intègre

Alors maintenant, ma livraison sur les serveurs CapGo fonctionne correctement, je dois l'automatiser et l'intégrer dans mon pipeline CI/CD

### C'est ainsi que j'organise mon modèle de branchement et de release

Pour chaque application, qu'elle soit mobile, web ou Salesforce :
- Le **développement** est effectué sur les branches `feature/` de `main`, et elles sont fusionnées dans `main` qui est la référence pour la plupart des branches de développement, en dehors de la maintenance et des fonctionnalités spécifiques pour les livraisons personnalisées (en savoir plus ci-dessous)
- **les déploiements sont déclenchés __à partir des branches de version__** qui peuvent être : `production`, des branches de préversion (`alpha`, `beta`, `nightly`, etc) et également des branches spécifiques au client ou au contexte pour les livraisons personnalisées
- **les déploiements sont déclenchés par une pull request** fusionnée dans une branche de déploiement. Je n'utilise pas de déploiements déclenchés par des balises car la version sémantique gère les balises et tout le reste pour moi.

En gros, c'est le Gitlab Flow :

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlab Flow - source https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Une remarque sur le fonctionnement de la libération sémantique :

Dans une branche de déploiement, lorsque la publication sémantique est déclenchée, elle calculera automatiquement le nouveau numéro de version sur cette branche, en fonction du numéro de version de la balise précédente sur la branche et des correctifs ou fonctionnalités livrés. Les correctifs créeront une nouvelle version du correctif, alors que les fonctionnalités créeront une nouvelle version mineureIl inclut également automatiquement la version préliminaire « alpha », « bêta », etc. dans le numéro de version

La version sémantique génère le journal des modifications à partir de vos commits, regroupant les correctifs et les fonctionnalités tels que définis dans les commits conventionnels (voir https://wwwconventionalcommitsorg/en/about) et configurés dans la version sémantique

Il mettra également à jour toutes vos demandes d'extraction fusionnées git (Github, dans mon cas) et les problèmes associés avec des commentaires les liant à la balise et à la version. Enfin, dans cette version de Github, il joindra des actifs tels que le code source, les binaires si nécessaire, ` CHANGELOGmd`, etc.

## 4 Branches, releases/prereleases, canaux en release sémantique et en CapGo

Donc, ce que je veux que la version sémantique fasse pour les déploiements CapGo est le suivant

### Je souhaite que la version sémantique génère le numéro de version

CapGo a développé et documenté sa propre version de l'outil "Conventional Commits" `standard-version`, avec son dépôt forké `standard-version` (https://githubcom/Cap-go/standard-version), et son propre ` condensateur-standard-version` (https://githubcom/Cap-go/capacitor-standard-version) ainsi que `capacitor-plugin-standard-version` (https://githubcom/Cap-go/capacitor-plugin- standard-version) dépôts Ils ont documenté sur leur blog le schéma de version utilisé par CapGo dans leurs déploiements (https://capgoapp/blog/how-version-work-in-capgo/) Les bundles JavaScript suivent le semver "standard" Sémantique Versioning" (https://semverorg) que `semantic-release` suit également (évidemment !)

C'est donc génial, et c'est un soulagement pour moi car j'utilise beaucoup la « libération sémantique »

### Je souhaite également que la version sémantique génère des déploiements d'applications sur différents canaux

Comme mentionné ci-dessus, je dois déployer des versions préliminaires à partir de branches telles que "alpha", "beta", "nightly", etc., mais également des versions spécifiques au client sur des branches telles que "production-customer-jones", "production-customer- biche, etc.

CapGo fournit la fonctionnalité "canaux" qui est exactement ce que la version sémantique prend également en charge, je suis donc ravi de les faire fonctionner ensemble. Celles-ci s'intègrent également dans les différentes versions de branche gérées par XCode Cloud (en savoir plus à ce sujet ci-dessous)

Les numéros de version Semver générés par la version sémantique sur les versions préliminaires ressemblent à « 100-alpha1 ». Les builds successifs sur cette branche incrémenteront le numéro de build à « 100-alpha2 », etc. Bien que cela ne soit pas documenté explicitement, ces numéros de version sont pris en charge par CapGo, ce qui est génial news pour moi : j'utiliserai les canaux de publication sémantiques et les avant-premières pour générer des versions de mon application avec les canaux Capgo 

## 5 Comment puis-je utiliser CapGo pour publier mon application ?

Pour automatiser le déploiement de vos bundles d'applications sur CapGo, vous devez utiliser la commande CapGo CLI `bundle upload` Tapez `npx @capgo/cli@latest bundle upload --help` pour obtenir les nombreuses options de téléchargement. Parmi celles-ci, nous utiliserons le suivant :
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL est le canal CapGo sur lequel nous souhaitons déployer (par exemple `alpha`)
- VERSION est générée par libération sémantique (par exemple `100-alpha1`)
- CAPGO_APIKEY est fourni par CapGo pour identifier de manière unique votre connexion au pipeline CI/CD
- CAPGO_APPID est fourni par CapGo pour identifier de manière unique votre application (par exemple `commystartupmysuperapp`)

## 6 Ma version sémantique + configuration CapGo CapacitorUpdate

Finalement, comment tout cela s’articule-t-il ?

![Versions du bundle d'applications créées avec la version sémantique et les actions Github](/RBW_CapGo_channels_and_versionswebp)

*Versions de l'App Bundle créées avec une version sémantique et des actions Github*


### Automatisation des versions sémantiques avec Github Actions

La beauté de la version sémantique est que l'automatisation du déploiement, sous la forme d'un workflow Github Action, est très simple. Cela ressemblera beaucoup à d'autres plateformes CI/CD. 
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

Cela installe simplement l'environnement NodeJS, puis appelle la version sémantique

Pour chaque mzerge sur une branche répertoriée dans `branches`, la libération sémantique déclenchera un déploiement
Définissez `CAPGO_APIKEY` dans les secrets de votre référentiel
Mettez à jour votre `CAPGO_APPID` ici

Le comportement de la version sémantique est défini dans son fichier de configuration `releasercjson`Voici mes paramètres, expliqués ci-dessous :
```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches` : 
  - `branches` définit la configuration des branches (`name`), mappées au canal CapGo (`channel`) et comment le numéro de version préliminaire sera appelé (`prerelease`). Par exemple, si `branchprerelease = "development"` , le numéro de version généré par la version sémantique sera `xyz-developmentn`
  - les déploiements vers les branches `alpha` et `alpha-nocapgo` déploieront tous deux l'application sur le canal `alpha`, mais avec des noms de pré-version différents dans le numéro de version
  - les déploiements vers les branches de développement `dev-rupert` ou `dev-paul` seront tous deux déployés sur le canal `development` sur CapGo, tous avec le même mot-clé `development`prerelease dans le numéro de version
- `verifyConditions` : dans la première étape de la publication sémantique, il vérifie qu'il dispose du bon accès à Github. J'espère ajouter un contrôle d'authentification pour la CLI CapGo ici plus tard
- `@semantic-release/commit-analyzer` : éléments de version sémantique standard - voir leur documentation (https://githubcom/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator` : génère le fichier changelog sous la forme `CHANGELOGmd`
- `@semantic-release/git` : commit les fichiers suivants qui ont été mis à jour par le build Ionic de l'application et par le travail de release sémantique (`packagejson`, `CHANGELOGmd` et `ios/App/Appxcodeproj/projectpbxproj` - Je ne construis pas encore pour Android)
- `@semantic-release/github` : joignez le fichier `CHANGELOGmd` à la version Github en tant qu'actif
- `@semantic-release/exec` : utilisez ces 2 commandes pour préparer le build de l'application (`prepareCmd`) puis pour construire efficacement, déployer l'app bundle sur les serveurs CapGo (`publishCmd`)

Vous remarquerez qu'il n'est pas compliqué d'expliquer comment on veut que le numéro de version soit calculé et incrémenté, comment il faut générer un changelog, une balise ou une release Github, etc : tout est géré par défaut par release sémantique, avec un minimum de configuration

### Créer de nouveaux binaires avec XCode Cloud

Intégrer tout cela avec XCode Cloud pour créer de nouvelles versions du binaire de l'application est simple (je ne déploie pas encore sur Google Play, mais cette version devrait être similaire) :
- J'ai mis en place un processus XCode Cloud à construire lorsqu'il y a un changement sur la branche que je souhaite utiliser pour cela (par exemple `production`)
- sur cette branche, j'ai configuré XCode Cloud pour qu'il soit construit uniquement lorsque le fichier `CHANGELOGmd` est mis à jour. Celui-ci est mis à jour après chaque version générée par la version sémantique
- Je peux déclencher des builds sur différentes branches pour simuler le déploiement pour différents canaux. Dans chaque configuration de XCode Cloud build sur une branche différente, je définis manuellement une variable d'environnement avec la valeur de `branchchannel` définie dans `releasercjson` (oui, c'est une duplication manuelle) et ensuite, si je le voulais, je pourrais déployer une application AppStore différente pour chaque application client personnalisée déployée à partir d'une branche de version personnalisée, comme mentionné précédemment


![Création de binaires d'applications sur XCode Cloud avec les canaux CapGo](/RBW_XCode_Cloud_buildingwebp)

*Création de binaires d'applications sur XCode Cloud avec les canaux CapGo*


##7Conclusion

En conclusion, je suis très heureux d'avoir pu intégrer CapGo CapacitorUpdater dans mon pipeline de release sémantique standard, rapidement dans le délai de la période d'essai de 14 jours, et le résultat est le suivant :
- les numéros de version du bundle sont générés automatiquement par libération sémantique et compatibles avec les serveurs CapGo
- La version sémantique déploie automatiquement les bundles d'applications CapGo, en utilisant également les canaux CapGo
- cela s'intègre parfaitement aux versions XCode Cloud de binaires d'application

### Étapes suivantes

Je suis actuellement en phase de développement de cette application je la mettrai rapidement à disposition des testeurs via TestFlight (pour iOS) Compte tenu de la puissance de CapGo, je déploierai très certainement une version gratuite de l'application sur l'AppStore pour les tests, qui sera mis à jour régulièrement avec CapGo lors des testsJe déploierai ensuite une autre version (payante) de l'application sur l'AppStore, sous un autre enregistrement, et la mettrai également à jour régulièrement avec CapGo.

J'espère ajouter une meilleure vérification préalable à la construction des prérequis de « téléchargement de bundle » de CapGo dans la configuration de ma version sémantique

J'ai maintenant un pipeline de publication sémantique propre, simple et reproductible pour les futures applications mobiles développées avec Ionic + Angular + Capacitor


## Auteur - Rupert Barrow

J'ai plus de 22 ans d'expérience dans Salesforce, en tant que client et utilisateur, en tant que partenaire et intégrateur, architecte, développeur, analyste commercial et consultant. J'ai co-fondé et co-dirigé Altius Services en tant que COO et CTO pendant 13 ans, une société à succès Partenaire Salesforce SI en France, avant de me lancer dans une nouvelle aventure en tant que solopreneur Salesforce avec mon offre de produits **Rapido Cloud**

Vous pouvez me trouver sur LinkedIn à https://linkedincom/in/rbarrow 

Vous pouvez consulter nos offres Salesforce sur https://wwwrapido-companionapp et https://wwwrapidocloud (en cours de développement)