---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Comment Rapido Cloud gère Semantic Release avec Capgo CapacitorUpdater
description: >-
  C'est ainsi que j'ai configuré la publication sémantique pour gérer les
  versions de mes applications qui utilisent CapGo CapacitorUpdater.
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Étude de cas rapido cloud
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: fr
next_blog: ''
---
## 1. Introduction

Chez Rapido Cloud (www.rapido.cloud), je développe une application mobile pour les clients Salesforce afin de déployer facilement leur propre application mobile de marque sans avoir à passer par les boucles complexes de l'utilisation du Salesforce Mobile SDK ou du Salesforce Mobile Publisher.

J'ai développé cette application mobile sur une plateforme moderne et "standard" avec des composants et des outils répandus, y compris Ionic 8, Angular 18, TypeScript, Capacitor et maintenant CapGo CapacitorUpdater. Ces solutions sont plus simples à gérer pour les clients qui ne souhaitent pas gérer les spécificités de la plateforme Salesforce telles que les composants web Lightning ; et il est plus facile et moins coûteux pour moi de recruter des développeurs et des mainteneurs d'applications mobiles Ionic + Angular.

Cet article explique ma conception, mes choix et la mise en œuvre qui font de CapGo et de `semantic-release` une solution très efficace pour gérer tous les déploiements automatiquement via Github Actions. Tout cela a été conçu, testé et documenté pendant la belle période d'essai gratuite de 14 jours de CapGo CapacitorUpdater.

## 2. Pourquoi utiliser CapGo ? Pourquoi utiliser semantic-release ?
CapGo CapacitorUpdater m'a séduit par sa promesse de rendre les déploiements d'applications mobiles beaucoup plus simples, plus rapides et flexibles que de passer par le processus de livraison standard de l'Apple AppStore/Google PlayStore. 
C'est ma première application mobile que je pousse dans les magasins, ayant concentré mes efforts par le passé sur des applications web, généralement développées sur la Salesforce Experience Cloud.

J'étais un peu inquiet concernant la courbe d'apprentissage pour réussir cela, mais j'ai réussi à mettre mon application sur Apple TestFlight assez facilement. J'étais alors en position d'utiliser CapGo CapacitorUpdater pour déployer mes mises à jour beaucoup plus rapidement.

Mon premier besoin et cas de test était de déployer pour moi-même afin de tester mon application comme une vraie application mobile sur mon propre téléphone, plutôt que de tester dans un émulateur mobile ou dans un simulateur via le navigateur mobile Nexus suggéré par Ionic. C'est parce que mon application utilise des fonctionnalités natives telles que la géolocalisation ou l'accès à la galerie photo et à la caméra. N'ayant pas d'expérience passée dans le test d'une application mobile Capacitor, je n'étais pas sûr que tout allait fonctionner correctement : rien de tel que de tester l'application réelle, dans des conditions réelles !

Ainsi, CapGo CapacitorUpdater m'a aidé à mettre à jour mon application sur mon mobile, en direct, 1 minute après avoir enregistré une nouvelle fonctionnalité ou un correctif dans mon code source : c'est tellement libérateur, si flexible et facile à configurer !

## 3. Mon modèle de branchement et de publication, et comment semantic-release s'intègre
Maintenant que ma livraison aux serveurs CapGo fonctionne correctement, je dois automatiser cela et l'intégrer dans mon pipeline CI/CD.

### Voici comment j'organise mon modèle de branchement et de publication

Pour chaque application, qu'elle soit mobile, web ou Salesforce :
- **le développement** se fait sur des branches `feature/...` à partir de `main`, et elles sont fusionnées dans `main`, qui est la référence pour la plupart des branches de développement, en dehors de la maintenance et des fonctionnalités spécifiques pour des livraisons personnalisées (plus d'informations à ce sujet ci-dessous)
- **les déploiements sont déclenchés __à partir des branches de publication__** qui peuvent être : `production`, des branches de prépublication (`alpha`, `beta`, `nightly`, etc.) et également des branches spécifiques aux clients ou spécifiques au contexte pour des livraisons personnalisées
- **les déploiements sont déclenchés par une pull request** étant fusionnée dans une branche de déploiement. Je n'utilise pas de déploiements déclenchés par des tags car semantic-release gère les tags et tout le reste pour moi.

Globalement, voici le Gitlab Flow :

![Gitlab Flow](/RBW_Gitlab_Flow.webp)

*Gitlab Flow - source https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Une petite note sur le fonctionnement de semantic-release :
Dans une branche de déploiement, lorsque semantic-release est déclenché, il calculera automatiquement le nouveau numéro de version sur cette branche, en fonction du numéro de version du tag précédent sur la branche et des correctifs ou fonctionnalités livrés. Les correctifs créeront une nouvelle version de patch, tandis que les fonctionnalités créeront une nouvelle version mineure. Il inclut également automatiquement les préversions `alpha`, `beta`, etc. dans le numéro de version.

Semantic release génère le changelog à partir de vos commits, groupant les correctifs et les fonctionnalités comme défini dans les commits conventionnels (voir https://www.conventionalcommits.org/en/about) et configurés dans semantic release.

Il met également à jour toutes vos demandes de pull (Github, dans mon cas) fusionnées et les problèmes associés avec des commentaires les reliant au tag et à la publication. Enfin, dans cette publication Github, il joindra des actifs tels que le code source, des binaires si nécessaire, `CHANGELOG.md`, etc.

## 4. Branches, publications/prépublications, canaux dans semantic release et dans CapGo

Alors, ce que je veux que semantic release fasse pour les déploiements CapGo, c'est ce qui suit.

### Je veux que semantic release génère le numéro de version

CapGo a développé et documenté sa propre version de l'outil "Conventional Commits" `standard-version`, avec leur dépôt forké `standard-version` (https://github.com/Cap-go/standard-version), et leur propre `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) ainsi que `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Ils ont documenté sur leur blog le schéma de version utilisé par CapGo dans leurs déploiements (https://capgo.app/blog/how-version-work-in-capgo/). Les paquets JavaScript suivent le "standard" semver "Semantic Versioning" (https://semver.org) que suit également `semantic-release` (évidemment !)

C'est donc formidable et c'est un soulagement pour moi car j'utilise `semantic-release` de manière intensive.

### Je veux également que semantic release génère des déploiements d'applications sur différents canaux

Comme mentionné ci-dessus, j'ai besoin de déployer des versions de prépublication à partir de branches telles que `alpha`, `beta`, `nightly`, etc., mais aussi des versions spécifiques aux clients sur des branches telles que `production-customer-jones`, `production-customer-doe`, etc.

CapGo fournit la fonction "canaux" qui est exactement ce que prend également en charge semantic release, donc je suis impatient de les faire fonctionner ensemble. Ceux-ci s'inscrivent également dans les différentes constructions de branches gérées par XCode Cloud (voir plus à ce sujet ci-dessous).

Les numéros de version Semver générés par semantic release sur les prépublications ressemblent à `1.0.0-alpha.1`. Les constructions successives sur cette branche incrémenteront le numéro de construction à `1.0.0-alpha.2`, etc. Bien que cela ne soit pas documenté explicitement, ces numéros de version sont pris en charge par CapGo, ce qui est une excellente nouvelle pour moi : je vais utiliser les canaux de semantic release et de prépublication pour générer des versions de mon application avec les canaux CapGo.

## 5. Comment puis-je utiliser CapGo pour publier mon application ?

Pour automatiser le déploiement de vos paquets d'application sur CapGo, vous devez utiliser la commande CLI CapGo `bundle upload`. Tapez `npx @capgo/cli@latest bundle upload --help` pour obtenir les nombreuses options d'upload. Parmi celles-ci, nous utiliserons les suivantes :
- CHANNEL est le canal CapGo vers lequel nous voulons déployer (ex. `alpha`)
- VERSION est généré par semantic release (ex. `1.0.0-alpha.1`)
- CAPGO_APIKEY est fourni par CapGo pour identifier de manière unique votre connexion au pipeline CI/CD
- CAPGO_APPID est fourni par CapGo pour identifier de manière unique votre application (ex. `com.mystartup.mysuperapp`)

## 6. Ma configuration semantic release + CapGo CapacitorUpdate

Finalement, comment tout cela s'imbrique-t-il ?

![App bundle versions built with semantic release and Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versions des paquets d'application construites avec semantic release et Github Actions*


### Automatisation de semantic release avec Github Actions

La beauté de semantic release est que l'automatisation du déploiement, sous forme de flux de travail Github Action, est très simple. Cela ressemblera beaucoup à d'autres plateformes CI/CD.

Cela installe simplement l'environnement NodeJS, puis appelle semantic release.

Pour chaque fusion sur une branche répertoriée dans `branches`, semantic release déclenchera un déploiement. 
Définissez `CAPGO_APIKEY` dans les secrets de votre dépôt. 
Mettez à jour votre `CAPGO_APPID` ici.

Le comportement de semantic release est défini dans son fichier de configuration `.releaserc.json`. 
Voici mes paramètres, expliqués ci-dessous :

- `branches` : 
  - `branches` définit la configuration des branches (`name`), mappées au canal CapGo (`channel`) et comment le numéro de version de prépublication sera appelé (`prerelease`). Par exemple, si `branch.prerelease = "development"`, le numéro de version généré par semantic release sera `x.y.z-development.n`
  - les déploiements vers les branches `alpha` et `alpha-nocapgo` déploieront tous les deux l'application sur le canal `alpha`, mais avec des noms de prépublication différents dans le numéro de version
  - les déploiements vers les branches de développeur `dev-rupert` ou `dev-paul` déploieront tous deux vers le canal `development` sur CapGo, tous avec le même mot-clé de prépublication `development` dans le numéro de version
- `verifyConditions` : dans la première étape de semantic release, il vérifie qu'il a le bon accès à Github. J'espère ajouter une vérification d'authentification pour la CLI CapGo ici plus tard
- `@semantic-release/commit-analyzer` : élément standard de semantic release - voir leur documentation (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator` : génère le fichier changelog en tant que `CHANGELOG.md`
- `@semantic-release/git` : engage les fichiers suivants qui ont été mis à jour par la construction Ionic de l'application et par le travail de semantic release (`package.json`, `CHANGELOG.md` et `ios/App/App.xcodeproj/project.pbxproj` - je ne construis pas encore pour Android)
- `@semantic-release/github` : attache le fichier `CHANGELOG.md` à la publication Github en tant qu'actif
- `@semantic-release/exec`: utilise ces 2 commandes pour préparer la construction de l'application (`prepareCmd`) et ensuite pour réellement construire et déployer le paquet d'application sur les serveurs CapGo (`publishCmd`)

Vous remarquerez qu'il n'y a pas de manipulation autour de l'explication de la façon dont nous voulons que le numéro de version soit calculé et incrémenté, comment nous devons générer un changelog, un tag Github ou une publication, etc. : tout est géré par défaut par semantic release, avec une configuration minimale.

### Construction de nouveaux binaires avec XCode Cloud

L'intégration de tout cela avec XCode Cloud pour construire de nouvelles versions du binaire de l'application est simple (je ne déploie pas encore sur Google Play, mais cette construction devrait être similaire) :
- J'ai mis en place un processus XCode Cloud pour construire lorsqu'il y a un changement sur la branche que je souhaite utiliser pour cela (par exemple `production`)
- sur cette branche, j'ai configuré XCode Cloud pour construire uniquement lorsque le fichier `CHANGELOG.md` est mis à jour. Ce dernier est mis à jour après chaque version générée par la publication sémantique
- Je peux déclencher des constructions sur différentes branches pour simuler le déploiement sur différents canaux. Dans chaque configuration de construction XCode Cloud sur une branche différente, j'ai défini une variable d'environnement manuellement avec la valeur de `branch.channel` définie dans `releaserc.json` (oui, c'est une duplication manuelle) et ensuite, si je le souhaitais, je pourrais déployer une application AppStore différente pour chaque application client personnalisée déployée à partir d'une branche de publication personnalisée, comme mentionné précédemment.


![Construction de binaires d'application sur XCode Cloud avec les canaux CapGo](/RBW_XCode_Cloud_building.webp)

*Construction de binaires d'application sur XCode Cloud avec les canaux CapGo*


## 7. Conclusion

En conclusion, je suis très heureux d'avoir pu intégrer CapGo CapacitorUpdater dans mon pipeline de publication sémantique standard, rapidement dans le délai de la période d'essai de 14 jours, et le résultat est le suivant :
- les numéros de version du bundle sont générés automatiquement par la publication sémantique et compatibles avec les serveurs CapGo
- la publication sémantique déploie automatiquement les bundles d'application CapGo, en utilisant également les canaux CapGo
- cela s'intègre bien avec les constructions XCode Cloud des binaires d'application

### Prochaines étapes

Je suis actuellement dans la phase de développement de cette application. Je vais rapidement la rendre disponible aux testeurs via TestFlight (pour iOS). Compte tenu de la puissance de CapGo, je vais très certainement déployer une version gratuite de l'application sur l'AppStore pour des tests, qui sera mise à jour régulièrement avec CapGo pendant les tests. Je vais ensuite déployer une autre version (payante) de l'application sur l'AppStore, sous un autre enregistrement, et également la mettre à jour régulièrement avec CapGo.

J'espère ajouter une meilleure vérification préalable de l'upload des bundles CapGo dans ma configuration de publication sémantique.

J'ai maintenant un pipeline de publication sémantique propre, simple et reproductible pour de futures applications mobiles développées avec Ionic + Angular + Capacitor.


## Auteur - Rupert Barrow

J'ai plus de 22 ans d'expérience sur Salesforce, en tant que client et utilisateur, partenaire et intégrateur, architecte, développeur, analyste d'affaires et consultant. J'ai cofondé et co-géré Altius Services en tant que COO et CTO pendant 13 ans, un partenaire SI Salesforce réussi en France, avant de me lancer dans une nouvelle aventure en tant qu'entrepreneur soliste Salesforce avec mon produit **Rapido Cloud**.

Vous pouvez me trouver sur LinkedIn à l'adresse https://linkedin.com/in/rbarrow. 

Vous pouvez jeter un œil à nos offres Salesforce à https://www.rapido-companion.app et https://www.rapido.cloud (en développement).
