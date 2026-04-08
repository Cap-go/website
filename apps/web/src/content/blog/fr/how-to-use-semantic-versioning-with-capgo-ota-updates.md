---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: >-
  Comment utiliser le versionnement sémantique avec les mises à jour OTA de
  Capgo
description: >-
  Apprenez à rationaliser les mises à jour d'applications et le contrôle de
  version en utilisant le versionnage sémantique avec les mises à jour OTA de
  Capgo pour les applications Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Développement Mobile
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---

**Vous souhaitez simplifier [les mises à jour d'applications](https://capgo.app/plugins/capacitor-updater/) et le contrôle de version ?** La gestion sémantique des versions (SemVer) combinée aux mises à jour Over-The-Air (OTA) de [Capgo](https://capgo.app/) rend la gestion des applications [Capacitor](https://capacitorjs.com/) plus simple et plus rapide. Voici comment :

-   **Principes de base du versionnement sémantique :** Les versions utilisent le format `MAJOR.MINOR.PATCH` :
    
    -   **MAJOR :** Pour les changements incompatibles
    -   **MINOR :** Pour les nouvelles fonctionnalités rétrocompatibles
    -   **PATCH :** Pour les corrections de bugs
-   **Pourquoi utiliser SemVer avec Capgo ?**
    
    -   Communication claire sur les mises à jour
    -   Gestion plus intelligente des versions
    -   Évitement des conflits de dépendances
    -   Planification organisée des versions
-   **Étapes de [configuration de Capgo](https://capgo.app/docs/cli/commands/) :**
    
    1.  Installer le plugin updater de Capgo
    2.  Configurer la version de votre application dans `capacitor.config.json` et autres fichiers
    3.  Initialiser avec votre clé API
    4.  Utiliser [Capgo CLI](https://capgo.app/docs/cli/commands) pour regrouper et télécharger les mises à jour
-   **[Gestion des versions et des canaux](https://capgo.app/docs/webapp/channels/) :**
    
    -   Utiliser des canaux séparés (ex. "beta" pour les tests, "production" pour les versions stables)
    -   Contrôler les politiques de mise à jour (mise à jour automatique des correctifs, approbation manuelle pour les changements majeurs)
    -   Options de retour en arrière pour les mises à jour échouées
-   **Processus de déploiement :**
    
    -   Mettre à jour les numéros de version selon les règles SemVer
    -   Tester minutieusement avant le déploiement
    -   Utiliser les commandes CLI pour télécharger et distribuer les mises à jour

Capgo garantit que les mises à jour atteignent les utilisateurs rapidement et de manière fiable, avec des outils pour gérer les perturbations et maintenir la stabilité. Parfait pour les équipes utilisant des workflows CI/CD pour automatiser les mises à jour.

**Conseil rapide :** Testez toujours les mises à jour et utilisez les canaux pour gérer efficacement les déploiements progressifs.

## Versionnement Sémantique | Niveau Supérieur

<Steps>

</Steps>

## Guide de configuration de [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Voici comment configurer Capgo pour gérer facilement les mises à jour OTA et le contrôle de version.

### Étapes de configuration initiale

Commencez par installer le [plugin updater Capgo](https://capgo.app/docs/plugin/self-hosted/manual-update/) :

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

Assurez-vous que votre fichier `capacitor.config.json` utilise un format de version sémantique :

```json
{
  "appId": "com.example.app",
  "appName": "Example",
  "version": "1.0.0"
}
```

Pour les projets plus anciens, mettez à jour les détails de version dans ces emplacements :

-   `package.json` (cherchez le champ `version`)
-   `android/app/build.gradle` (mettez à jour `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (mettez à jour `CURRENT_PROJECT_VERSION`)

Une fois configuré, initialisez Capgo avec votre clé API :

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

await CapacitorUpdater.initialize({ key: 'YOUR_API_KEY' })
```

**Tableau de référence rapide :**

| Phase de configuration | Action clé | Étape de vérification |
| --- | --- | --- |
| Installation | Installer le plugin et synchroniser | Vérifier `package.json` |
| Configuration | Définir les numéros de version | Vérifier dans tous les fichiers |
| Initialisation | Connecter avec la clé API | Tester l'état de la connexion |
| Build | Créer le bundle initial | Confirmer le succès du téléchargement |

### Intégration du contrôle de version

Capgo fonctionne bien avec les plateformes CI/CD, rendant les [mises à jour automatisées](https://capgo.app/docs/live-updates/update-behavior/) simples. Les plateformes prises en charge incluent :

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

Si vous travaillez en développement local, vous pouvez désactiver les mises à jour automatiques en ajoutant ceci à votre configuration :

```typescript
await CapacitorUpdater.setDevMode({ devMode: true })
```

Cela garantit que Capgo ne remplacera pas vos modifications locales. Une fois votre configuration prête, téléchargez votre première version :

```bash
npx @capgo/cli upload
```

Enfin, notifiez le plugin natif de l'état du bundle dans le fichier principal de votre application :

```typescript
await CapacitorUpdater.notifyAppReady()
```

Cette configuration garantit que votre application est prête pour des déploiements OTA fluides et une gestion des versions.## Utilisation du versionnage sémantique avec Capgo

### Gestion des numéros de version

Capgo utilise le versionnage sémantique (SemVer) pour gérer les versions d'applications, formaté comme **MAJORMINORPATCH**. Voici comment cela fonctionne :

-   **Version Majeure (X00)** : Augmentez le numéro MAJOR pour les changements qui cassent la compatibilité
-   **Version Mineure (1X0)** : Augmentez le numéro MINOR pour les nouvelles fonctionnalités qui restent compatibles
-   **Version Corrective (10X)** : Augmentez le numéro PATCH pour les corrections de bugs qui n'affectent pas la compatibilité

| Type de Version | Quand Incrémenter | [Comportement de mise à jour automatique](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Majeure (X00) | Pour les changements d'API incompatibles | Nécessite une approbation manuelle |
| Mineure (1X0) | Pour les nouvelles fonctionnalités | Configurable dans Capgo |
| Corrective (10X) | Pour les corrections de bugs | Généralement automatique |

En respectant les règles SemVer, vous pouvez simplifier la gestion des versions et assurer des mises à jour plus fluides à travers vos canaux de déploiement.

### Directives de contrôle de version

Capgo vous permet de gérer efficacement les déploiements en configurant des canaux distincts pour différentes étapes de votre flux de travail.

-   **[Gestion des versions basée sur les canaux](https://capgo.app/docs/webapp/channels/)** : Organisez votre processus de déploiement en créant des canaux séparés pour les tests et la production. Par exemple :
    
    -   Utilisez un canal "beta" (ex. 120-beta) pour tester les nouvelles fonctionnalités
    -   Gardez un canal "production" (ex. 120) pour les versions stables
    -   Ajoutez des canaux spécifiques aux plateformes (ex. "ios-hotfix" avec version 121) lors du traitement des problèmes spécifiques à une plateforme
-   **Configuration de la politique de mise à jour** : Contrôlez l'application des mises à jour en utilisant les options de configuration de Capgo. Par exemple :
    
    [[CODE_BLOCK]]
    
    Cette configuration garantit que les utilisateurs reçoivent automatiquement les mises à jour correctives, tandis que les mises à jour mineures et majeures nécessitent une approbation manuelle.
    
-   **Stratégie de retour en arrière** : Utilisez des identifiants de pré-version pour maintenir des options claires de retour en arrière. Cette approche vous permet de revenir à une version précédente en cas de problèmes, tout en maintenant un versionnage cohérent sur tous les canaux.
    

Ces bonnes pratiques facilitent la gestion des mises à jour, le test des nouvelles fonctionnalités et le maintien de la stabilité dans votre processus de déploiement.

###### sbb-itb-f9944d2

## Déploiement des mises à jour OTA

Une fois votre configuration de gestion des versions prête, suivez ces étapes pour déployer efficacement les mises à jour OTA.

### Préparation de la mise à jour

Commencez par mettre à jour la version dans **package.json** et **capacitor.config.json**. Assurez-vous que la version suit le format SemVer (MAJOR.MINOR.PATCH) :

-   **Correction de bug** : Augmentez le numéro PATCH (ex. 1.0.1 → 1.0.2)
-   **Nouvelle fonctionnalité** : Augmentez le numéro MINOR (ex. 1.0.0 → 1.1.0)
-   **Changement incompatible** : Augmentez le numéro MAJOR (ex. 1.0.0 → 2.0.0)

Testez minutieusement votre build et confirmez que l'application communique avec le serveur en utilisant `notifyAppReady`.

Ensuite, décidez de votre [stratégie de mise à jour](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Vous pouvez choisir entre :

-   **Mise à jour automatique** : Appliquer automatiquement les exigences de version minimale
-   **Contrôle manuel** : Spécifier des exigences de version exactes pour les mises à jour
-   **Basé sur les canaux** : Utiliser des canaux pour les tests et les déploiements progressifs

### Commandes de mise à jour CLI Capgo

Utilisez le CLI de Capgo pour déployer votre mise à jour facilement. Voici comment :

[[CODE_BLOCK]]

Capgo assure un déploiement sécurisé avec un chiffrement de bout en bout et une gestion sécurisée des clés.

> "@Capgo est une façon intelligente de faire des hot code pushes (et pas pour tout l'argent du monde comme avec @AppFlow) 🙂"

Une fois déployées, vous pouvez surveiller les mises à jour via le tableau de bord Capgo. Les mises à jour atteignent généralement les utilisateurs dans les minutes qui suivent l'ouverture de l'application. Le processus fonctionne comme suit :

-   L'application vérifie les mises à jour
-   Télécharge la mise à jour en arrière-plan
-   Marque la nouvelle version comme active lorsque l'utilisateur quitte l'application
-   Applique la mise à jour au prochain lancement

Pour les déploiements de niveau entreprise, vous voudrez peut-être intégrer l'automatisation CI/CD.> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !"

## Résolution des problèmes et conseils

### Problèmes de gestion des versions

La gestion du versionnement sémantique dans Capgo peut parfois compliquer les déploiements de mises à jour. Pour éviter d'écraser votre travail de développement, configurez ce qui suit dans votre fichier `capacitor.config.json` :

[[CODE_BLOCK]]

Si une mise à jour échoue, voici ce que vous pouvez faire :

-   Définir `autoUpdate` sur `false` pendant le développement
-   Désinstaller l'application
-   La réinstaller avec la version corrigée
-   Réactiver les mises à jour automatiques une fois que tout est stable

Pour les mises à jour majeures, utilisez le flag `disableAutoUpdateBreaking` et écoutez l'événement `majorAvailable` pour gérer correctement les mises à jour :

[[CODE_BLOCK]]

En combinant ces configurations avec de bonnes pratiques d'équipe, vous pouvez maintenir la cohérence des versions et réduire les erreurs.

### Contrôle de version en équipe

Une fois les mises à jour individuelles gérées, il est crucial pour les équipes d'établir de solides pratiques de contrôle de version.

> "Tester chaque modification avant de la fusionner avec le dépôt principal renforcera la stabilité et évitera des erreurs coûteuses" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Voici quelques méthodes pour assurer la cohérence :

-   Définir une branche comme **dépôt principal** pour agir comme source de vérité
-   Utiliser des canaux Capgo séparés pour les environnements de développement et de production
-   Automatiser les téléversements de versions via les pipelines CI/CD
-   Documenter tous les changements de code avec des messages de commit clairs et détaillés

Pour les grandes équipes, la matrice de gestion des versions suivante peut aider à organiser les mises à jour :

| Environnement | Canal | Mise à jour auto | Modèle de version |
| --- | --- | --- | --- |
| Développement | dev | Désactivé | 0.x.x |
| Pré-production | beta | Activé | x.x.x-beta |
| Production | stable | Activé | x.x.x |

### Étapes de récupération des mises à jour

Même avec des précautions, les mises à jour peuvent échouer. Si cela arrive, suivez ces étapes de récupération :

1.  Revenir à un bundle stable précédent
2.  Incrémenter les numéros de version pour les nouvelles corrections (note : les numéros de version ne peuvent pas être réutilisés après suppression) [\[2\]](https://github.com/Cap-go/CLI)
3.  Vérifier les mises à jour au démarrage de l'application pour s'assurer qu'elles fonctionnent comme prévu

Le système de mise à jour de Capgo est conçu pour gérer les perturbations. Par exemple, si le serveur est inaccessible ou qu'une mise à jour est supprimée, l'application continue de fonctionner normalement [\[3\]](https://capgo.app/docs/faq/). De plus, les requêtes réseau échouées sont automatiquement réessayées lors du prochain lancement de l'application [\[3\]](https://capgo.app/docs/faq/). Cette résilience intégrée minimise les temps d'arrêt et assure des opérations plus fluides.

## Résumé

Le versionnement sémantique, combiné à Capgo, a rendu les mises à jour OTA pour les applications Capacitor plus efficaces. Avec 9 476 millions de mises à jour livrées et 1 400 applications en production utilisant ce système [\[1\]](https://capgo.app/), les processus de déploiement sont devenus 81% plus efficaces [\[1\]](https://capgo.app/). Cette configuration permet aux développeurs de pousser des mises à jour rapidement et de manière contrôlée, en contournant les délais des app stores.

Voici ce que disent les développeurs :

> "Nous avons déployé les [mises à jour OTA Capgo](https://console.capgo.app/resend_email) en production pour notre base d'utilisateurs de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour en quelques minutes après le déploiement OTA sur @Capgo" - colenso [\[1\]](https://capgo.app/)

Le système de versionnement MAJOR.MINOR.PATCH facilite la communication des changements majeurs, des nouvelles fonctionnalités et des corrections de bugs [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). C'est particulièrement utile pour les équipes gérant plusieurs versions chaque semaine via la plateforme Capgo.

La [solution chiffrée](https://capgo.app/docs/cli/migrations/encryption/) de Capgo, intégrée aux outils CI/CD, est également économique - réduisant les coûts jusqu'à 26 100 $ sur cinq ans [\[1\]](https://capgo.app/). Ses canaux personnalisables garantissent que les mises à jour atteignent les bons utilisateurs au bon moment.
