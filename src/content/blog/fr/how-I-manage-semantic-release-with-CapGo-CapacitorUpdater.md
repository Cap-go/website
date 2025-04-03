---
slug: fr__how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: >-
  Comment Rapido Cloud gère la publication sémantique avec CapGo
  CapacitorUpdater
description: >-
  Voici comment j'ai configuré Semantic Release pour gérer les publications de
  mes applications utilisant CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Study case rapido cloud
keywords: semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Case Study
published: true
locale: fr
next_blog: ''
---

# Comment Rapido Cloud gère la livraison sémantique avec CapGo CapacitorUpdater

## 1 Introduction

Chez Rapido Cloud (wwwrapidocloud), je développe une application mobile pour les clients Salesforce afin qu'ils puissent facilement déployer leur propre application mobile personnalisée sans avoir à passer par les difficiles boucles d'utilisation du SDK mobile Salesforce ou du Mobile Publisher Salesforce.

J'ai développé cette application mobile sur une plateforme moderne et "standard" avec des composants et outils largement répandus, notamment Ionic 8, Angular 18, TypeScript, Capacitor et maintenant CapGo CapacitorUpdater. Ceux-ci sont plus simples à gérer pour les clients qui ne veulent pas gérer les spécificités de la plateforme Salesforce telles que les composants Web Lightning ; et il est plus facile et moins coûteux pour moi de recruter des développeurs et des mainteneurs d'applications mobiles Ionic + Angular.

Cet article explique ma conception, mes choix et mon implémentation qui font de CapGo et `semantic-release` une solution très efficace et évidente pour gérer tous les déploiements automatiquement via Github Actions. Tout cela a été conçu, testé et documenté pendant la période d'essai gratuite de 14 jours de CapGo CapacitorUpdater.

## 2 Pourquoi utiliser CapGo ? Pourquoi utiliser semantic-release ?

CapGo CapacitorUpdater m'a attiré avec sa promesse de rendre les déploiements d'applications mobiles beaucoup plus simples, beaucoup plus rapides et flexibles que le processus de livraison standard via l'Apple AppStore/Google PlayStore.
C'est ma première application mobile que je pousse vers les stores, m'étant concentré par le passé sur les applications web, généralement développées sur Salesforce Experience Cloud.

J'étais plutôt effrayé par la courbe d'apprentissage pour réussir cela, mais j'ai réussi à mettre mon application sur Apple TestFlight assez facilement. J'étais alors en mesure d'utiliser CapGo CapacitorUpdater pour déployer mes mises à jour beaucoup plus rapidement.

Ma première exigence et cas de test était de déployer pour moi-même afin de tester mon application comme une véritable application mobile sur mon propre téléphone, au lieu de tester dans un émulateur mobile ou dans un simulateur via le navigateur mobile Nexus suggéré par Ionic. C'est parce que mon application utilise des fonctionnalités natives telles que la géolocalisation ou l'accès à la galerie photo et à la caméra. N'ayant pas l'expérience passée de tester une application mobile Capacitor, je n'étais pas sûr que tout allait fonctionner correctement : rien de mieux que de tester l'application réelle, dans des conditions réelles !

Ainsi, CapGo CapacitorUpdater m'a aidé à mettre à jour mon application sur mon mobile, en direct, 1 minute après avoir sauvegardé une nouvelle fonctionnalité ou correction dans mon code source : tellement soulageant, et tellement flexible, et facile à mettre en place !

## 3 Mon modèle de branchement et de livraison, et comment semantic-release s'y intègre

Maintenant que ma livraison vers les serveurs CapGo fonctionne correctement, je dois automatiser cela et l'intégrer dans mon pipeline CI/CD.

### Voici comment j'organise mon modèle de branchement et de livraison

Pour chaque application, qu'elle soit mobile, web ou Salesforce :
- Le **développement** est effectué sur des branches `feature/` à partir de `main`, et elles sont fusionnées dans `main` qui est la référence pour la plupart des branches de développement, en dehors de la maintenance et des fonctionnalités spécifiques pour les livraisons personnalisées (plus à ce sujet ci-dessous)
- Les **déploiements sont déclenchés __à partir des branches de livraison__** qui peuvent être : `production`, des branches de prélancement (`alpha`, `beta`, `nightly`, etc.) et également des branches spécifiques au client ou au contexte pour des livraisons personnalisées
- Les **déploiements sont déclenchés par une pull request** fusionnée dans une branche de déploiement. Je n'utilise pas les déploiements déclenchés par des tags car semantic release gère les tags et tout le reste pour moi

Fondamentalement, c'est le flux Gitlab :

![Flux Gitlab](/RBW_Gitlab_Flowwebp)

*Flux Gitlab - source https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Une note sur le fonctionnement de semantic-release :

Dans une branche de déploiement, lorsque semantic-release est déclenché, il calculera automatiquement le nouveau numéro de version sur cette branche, en fonction du numéro de version du tag précédent sur la branche et des corrections ou fonctionnalités livrées. Les corrections créeront une nouvelle version de patch, tandis que les fonctionnalités créeront une nouvelle version mineure.Il inclut également automatiquement la version préliminaire `alpha`, `beta`, etc. dans le numéro de version

Semantic release génère le journal des modifications à partir de vos commits, regroupant les correctifs et les fonctionnalités tels que définis dans les commits conventionnels (voir https://wwwconventionalcommitsorg/en/about) et configurés dans semantic release

Il mettra également à jour toutes vos pull requests fusionnées git (GitHub, dans mon cas) et les problèmes associés avec des commentaires les liant à l'étiquette et à la version. Enfin, dans cette version GitHub, il joindra des ressources telles que le code source, les binaires si nécessaire, `CHANGELOGmd`, etc.

## 4 Branches, versions/préversions, canaux dans semantic release et dans CapGo

Voici donc ce que je veux que semantic release fasse pour les déploiements CapGo

### Je veux que semantic release génère le numéro de version

CapGo a développé et documenté sa propre version de l'outil "Conventional Commits" `standard-version`, avec leur fork `standard-version` (https://githubcom/Cap-go/standard-version), ainsi que leurs propres dépôts `capacitor-standard-version` (https://githubcom/Cap-go/capacitor-standard-version) et `capacitor-plugin-standard-version` (https://githubcom/Cap-go/capacitor-plugin-standard-version). Ils ont documenté sur leur blog le schéma de version utilisé par CapGo dans leurs déploiements (https://capgoapp/blog/how-version-work-in-capgo/). Les bundles JavaScript suivent la version sémantique "standard" semver (https://semverorg) que `semantic-release` suit également (évidemment !)

C'est donc excellent, et c'est un soulagement pour moi car j'utilise beaucoup `semantic-release`

### Je veux aussi que semantic release génère des déploiements d'applications sur différents canaux

Comme mentionné ci-dessus, j'ai besoin de déployer des versions préliminaires à partir de branches telles que `alpha`, `beta`, `nightly` etc., mais aussi des versions spécifiques aux clients sur des branches telles que `production-customer-jones`, `production-customer-doe`, etc.

CapGo fournit la fonctionnalité "canaux" qui est exactement ce que semantic release supporte également, je suis donc ravi de les faire fonctionner ensemble. Ceux-ci s'intègrent également aux différentes constructions de branches gérées par XCode Cloud (voir plus à ce sujet ci-dessous)

Les numéros de version semver générés par semantic release sur les préversions ressemblent à `100-alpha1`. Les versions successives sur cette branche incrémenteront le numéro de build à `100-alpha2`, etc. Bien que non documenté explicitement, ces numéros de version sont pris en charge par CapGo, ce qui est une excellente nouvelle pour moi : j'utiliserai les canaux et les préversions de semantic release pour générer des versions de mon application avec les canaux Capgo

## 5 Comment puis-je utiliser CapGo pour publier mon application ?

Pour automatiser le déploiement de vos bundles d'applications vers CapGo, vous devez utiliser la commande CLI CapGo `bundle upload`. Tapez `npx @capgo/cli@latest bundle upload --help` pour obtenir les nombreuses options de téléchargement. Parmi celles-ci, nous utiliserons les suivantes :

- CHANNEL est le canal CapGo sur lequel nous voulons déployer (par exemple `alpha`)
- VERSION est générée par semantic release (par exemple `100-alpha1`)
- CAPGO_APIKEY est fourni par CapGo pour identifier de manière unique votre connexion au pipeline CI/CD
- CAPGO_APPID est fourni par CapGo pour identifier de manière unique votre application (par exemple `commystartupmysuperapp`)

## 6 Ma configuration semantic release + CapGo CapacitorUpdate

Enfin, comment tout cela s'assemble-t-il ?

![Versions de bundles d'applications construites avec semantic release et Github Actions](/RBW_CapGo_channels_and_versionswebp)

*Versions de bundles d'applications construites avec semantic release et Github Actions*

### Automatisation de semantic release avec Github Actions

La beauté de semantic release est que l'automatisation du déploiement, sous forme de workflow Github Action, est très simple. Cela ressemblera beaucoup à d'autres plateformes CI/CD

Cela installe simplement l'environnement NodeJS, puis appelle semantic release

Pour chaque fusion sur une branche listée dans `branches`, semantic release déclenchera un déploiement
Définissez `CAPGO_APIKEY` dans les secrets de votre dépôt
Mettez à jour votre `CAPGO_APPID` ici

Le comportement de semantic release est défini dans son fichier de configuration `releasercjson`Voici mes paramètres, expliqués ci-dessous :
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```

- `branches` : 
  - `branches` définit la configuration des branches (`name`), mappées au canal CapGo (`channel`) et comment le numéro de version préliminaire sera appelé (`prerelease`). Par exemple, si `branchprerelease = "development"`, le numéro de version généré par semantic release sera `xyz-developmentn`
  - les déploiements sur les branches `alpha` et `alpha-nocapgo` déploieront tous deux l'application sur le canal `alpha`, mais avec des noms de préversion différents dans le numéro de version
  - les déploiements sur les branches de développeur `dev-rupert` ou `dev-paul` déploieront tous sur le canal `development` sur CapGo, tous avec le même mot-clé `development` de préversion dans le numéro de version
- `verifyConditions` : dans la première étape de semantic release, il vérifie qu'il a l'accès correct à Github. J'espère ajouter une vérification d'authentification pour le CLI CapGo ici plus tard
- `@semantic-release/commit-analyzer` : éléments standard de semantic release - voir leur documentation (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator` : génère le fichier de journal des modifications comme `CHANGELOG.md`
- `@semantic-release/git` : commit les fichiers suivants qui ont été mis à jour par la compilation Ionic de l'application et par le travail de semantic release (`package.json`, `CHANGELOG.md` et `ios/App/App.xcodeproj/project.pbxproj` - je ne compile pas pour Android, pour l'instant)
- `@semantic-release/github` : attache le fichier `CHANGELOG.md` à la release Github en tant qu'actif
- `@semantic-release/exec` : utilise ces 2 commandes pour préparer la compilation de l'application (`prepareCmd`) puis pour effectivement compiler et déployer le bundle de l'application sur les serveurs CapGo (`publishCmd`)

Vous remarquerez qu'il n'y a pas de manipulation pour expliquer comment nous voulons que le numéro de version soit calculé et incrémenté, comment nous devons générer un changelog, un tag ou une release Github, etc : tout est géré par défaut par semantic release, avec une configuration minimale

### Construction de nouveaux binaires avec XCode Cloud

L'intégration de tout cela avec XCode Cloud pour construire de nouvelles versions du binaire de l'application est simple (je ne déploie pas encore sur Google Play, mais cette construction devrait être similaire) :
- Je configure un processus XCode Cloud pour construire lorsqu'il y a un changement sur la branche que je souhaite utiliser pour cela (par exemple `production`)
- sur cette branche, je configure XCode Cloud pour construire uniquement lorsque le fichier `CHANGELOG.md` est mis à jour. Celui-ci est mis à jour après chaque version générée par semantic release
- Je peux déclencher des constructions sur différentes branches pour simuler le déploiement pour différents canaux. Dans chaque configuration de construction XCode Cloud sur une branche différente, je définis manuellement une variable d'environnement avec la valeur de `branch.channel` définie dans `releaser.json` (oui, c'est une duplication manuelle) et ensuite, si je le voulais, je pourrais déployer une application AppStore différente pour chaque application client personnalisée déployée à partir d'une branche de release personnalisée, comme mentionné précédemment


![Construction de binaires d'application sur XCode Cloud avec les canaux CapGo](/RBW_XCode_Cloud_building.webp)

*Construction de binaires d'application sur XCode Cloud avec les canaux CapGo*


## 7 Conclusion

En conclusion, je suis très heureux d'avoir pu intégrer CapGo CapacitorUpdater dans mon pipeline standard de semantic release, rapidement dans le délai de la période d'essai de 14 jours, et le résultat est le suivant :
- les numéros de version des bundles sont générés automatiquement par semantic release et compatibles avec les serveurs CapGo
- semantic release déploie automatiquement les bundles d'application CapGo, en utilisant également les canaux CapGo
- cela s'intègre bien avec les constructions de binaires d'application XCode Cloud

### Prochaines étapes

Je suis actuellement dans la phase de développement de cette application. Je la rendrai rapidement disponible aux testeurs via TestFlight (pour iOS). Compte tenu de la puissance de CapGo, je vais très certainement déployer une version gratuite de l'application sur l'AppStore pour des tests, qui sera mise à jour régulièrement avec CapGo pendant les tests.Je déploierai ensuite une autre version (payante) de l'application sur l'AppStore, sous un autre enregistrement, et je la mettrai également à jour régulièrement avec CapGo

J'espère ajouter une meilleure vérification préalable des prérequis de CapGo `bundle upload` dans ma configuration de version sémantique

J'ai maintenant un pipeline de version sémantique propre, simple et reproductible pour les futures applications mobiles développées avec Ionic + Angular + Capacitor


## Auteur - Rupert Barrow

J'ai plus de 22 ans d'expérience avec Salesforce, en tant que client et utilisateur, partenaire et intégrateur, architecte, développeur, analyste commercial et consultant. J'ai cofondé et cogéré Altius Services en tant que COO et CTO pendant 13 ans, un partenaire SI Salesforce prospère en France, avant de me lancer dans une nouvelle aventure en tant que solopreneur Salesforce avec mon offre de produit **Rapido Cloud**

Vous pouvez me trouver sur LinkedIn à https://linkedincom/in/rbarrow 

Vous pouvez consulter nos offres Salesforce sur https://wwwrapido-companionapp et https://wwwrapidocloud (en cours de développement)
