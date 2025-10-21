---
slug: setting-up-cicd-for-capacitor-apps
title: Configuration de CI/CD pour les applications Capacitor
description: >-
  Apprenez à rationaliser vos versions d'application pour iOS et Android en
  utilisant des pipelines CI/CD, améliorant ainsi l'efficacité et réduisant les
  erreurs.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-11T06:22:21.536Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67aa9923b771216988320bf2-1739254956493.jpg
head_image_alt: Développement mobile
keywords: >-
  CI/CD, Capacitor apps, mobile development, automation, build process, live
  updates
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**Vous souhaitez des versions d'applications plus rapides et sans erreur pour iOS et Android?** Les pipelines CI/CD pour les applications [Capacitor](https://capacitorjs.com/) automatisent la construction, les tests et le déploiement, réduisant les temps de sortie jusqu'à 70 % et diminuant les erreurs de 60 %. Ce guide couvre tout ce que vous devez savoir, de la configuration de votre environnement à l'automatisation des mises à jour en direct avec [Capgo](https://capgo.app/).

### Points clés :

-   **Pourquoi CI/CD est important pour les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/)** : Accélère les constructions de 78 % et réduit les rejets en magasin de 60 %.
-   **Outils essentiels** : [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio), [CocoaPods](https://cocoapods.org/), et plus encore.
-   **Configuration du pipeline** : Automatisez des tâches comme `npx cap sync`, la mise en cache des dépendances et les constructions spécifiques aux plateformes.
-   **Mises à jour en direct avec Capgo** : Activez les mises à jour post-lancement avec des déploiements échelonnés et des mesures de retour en arrière.

### Étapes de configuration rapide :

1.  **Préparez votre environnement** : Installez les outils requis pour iOS et Android.
2.  **Configurez votre projet** : Mettez à jour `capacitor.config.ts` et gérez les variables d'environnement en toute sécurité.
3.  **Construisez des pipelines** : Automatisez les installations de dépendances, les constructions et les tests pour les deux plateformes.
4.  **Optimisez les performances** : Utilisez la mise en cache, les constructions parallèles et les workflows conditionnels.
5.  **Ajoutez des mises à jour en direct** : Intégrez Capgo pour des mises à jour OTA sécurisées avec des déploiements échelonnés.

Avec CI/CD, les applications Capacitor obtiennent des sorties plus rapides et plus fluides tout en minimisant les erreurs et les interventions manuelles. Prêt à optimiser votre workflow? Plongeons dans le vif du sujet !

## Intégrez vos pipelines CI/CD existants avec des capacités mobiles

<iframe src="https://www.youtube.com/embed/rIPnuVwvbb0" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Préparation de votre environnement CI/CD

Une fois que vous avez compris les bases de CI/CD, l'étape suivante consiste à configurer votre environnement. C'est la colonne vertébrale d'une automatisation fiable.

### Configuration des outils et logiciels

Assurez-vous d'avoir ces outils clés installés :

**Pour le développement iOS :**

-   **Xcode 14 ou plus récent**
-   **Outils en ligne de commande Xcode**
-   **CocoaPods** pour la gestion des dépendances

**Pour le développement Android :**

-   **Android Studio**
-   **SDK Android 33 ou supérieur**
-   **Java Development Kit (JDK)**

Pour vérifier que vos outils en ligne de commande Xcode sont installés, utilisez :

```bash
xcode-select -p
```

### Création d'un projet [Capacitor](https://capacitorjs.com/)

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-11.jpg?auto=compress)

Votre projet Capacitor doit être configuré correctement pour les workflows CI/CD. Le fichier `capacitor.config.ts` est au cœur de cette configuration :

```typescript
const config: CapacitorConfig = {
  appId: 'com.example.app',
  webDir: 'build',
  ios: { 
    scheme: 'MyApp'
  }
}
```

Ce fichier garantit que votre projet est conforme aux exigences CI/CD.

### Configuration des variables d'environnement

Gérer les identifiants en toute sécurité est une partie clé de la mise en lien de votre configuration environnementale avec le pipeline CI/CD.

**Variables clés à définir :**

-   **`BUILD_ENV`** : Spécifie l'étape de déploiement (par exemple, `production`)
-   **`IOS_SIGNING_IDENTITY`** : Votre certificat de signature de code
-   **`ANDROID_KEYSTORE_PATH`** : Chemin vers votre keystore Android

Pour les constructions Android, générez dynamiquement un fichier `local.properties` pendant le processus CI :

```bash
echo "sdk.dir=$ANDROID_SDK_ROOT" > android/local.properties
```

Lors de la gestion des constructions iOS, assurez-vous que votre plateforme CI prend en charge les agents macOS.

Pour vérifier si votre environnement est prêt :

```bash
node --version | grep "v16" && xcodebuild -version | grep "Xcode 14" || exit 1
```

Gérer correctement les clés et les identifiants peut réduire considérablement les chances de rejets en magasin d'applications, comme noté dans les statistiques précédentes [\[1\]](https://opstree.com/blog/2023/06/27/cicd-for-mobile-app-development-using-capacitor-js-on-azure-devops/).

## Création de votre pipeline CI/CD

Une fois votre environnement prêt, l'étape suivante consiste à configurer un pipeline CI/CD pour votre [application Capacitor](https://capgo.app/plugins/ivs-player/). Ce pipeline doit gérer efficacement à la fois les actifs web et les constructions de plateformes natives.

### Installation et mise à jour des dépendances

Dans les environnements CI/CD, gérer les dépendances nécessite un contrôle strict des versions. Commencez par un processus d'installation propre :

```bash
npm install --ignore-scripts
npm install @capacitor/cli
```

Pour accélérer les constructions, utilisez la mise en cache des dépendances. Par exemple, les utilisateurs d'[Azure DevOps](https://azure.microsoft.com/en-us/products/devops) ont constaté que les temps de construction s'améliorent de 40-60 % avec cette configuration :

```yaml
- task: Cache@2
  inputs:
    key: 'npm | "$(Agent.OS)" | package-lock.json'
    path: |
      node_modules
      android/.gradle
      ios/Pods
```

### Configuration des constructions iOS et Android

Voici comment configurer les constructions pour les deux plateformes :

**Configuration de la construction iOS :**

```yaml
steps:
  - task: InstallAppleCertificate@2
    inputs:
      certSecureFile: 'certificate.p12'
      certPwd: $(P12_PASSWORD)
  - script: |
      xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release -archivePath ios/App/App.xcarchive archive
```

**Configuration de la construction Android :**

```bash
cd android
./gradlew bundleRelease
```

### Étapes de test et de déploiement

Exécutez des tests de plateforme en parallèle en utilisant une stratégie matricielle :

```yaml
test:
  steps:
    - run: npm run test:unit
    - run: npm run test:e2e
    - name: Run Platform Tests
      matrix:
        platform: [ios, android]
      run: npm run test:${{ matrix.platform }}
```

Pour le déploiement, configurez la gestion des artefacts spécifique à la plateforme :

| Plateforme | Type d'artefact | Canal de distribution |
| --- | --- | --- |
| iOS | .ipa | [App Store Connect](https://developer.apple.com/app-store-connect/) |
| Android | .aab | [Google Play Console](https://play.google.com/console/signup) |

Utiliser des constructions parallèles peut réduire considérablement le temps d'exécution du pipeline lorsqu'elles sont configurées correctement.

Une fois vos constructions validées et empaquetées, vous êtes prêt à passer aux mises à jour en direct avec Capgo (discuté dans la section suivante).

###### sbb-itb-f9944d2

## Ajout de [Capgo](https://capgo.app/) pour les mises à jour en direct

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-11.jpg?auto=compress)

L'intégration de Capgo dans votre workflow améliore votre processus CI/CD en permettant des mises à jour post-lancement. Voici comment le configurer :

### Configuration du pipeline Capgo

Tout d'abord, installez le [Capgo CLI](https://capgo.app/docs/cli/commands) dans votre environnement de pipeline :

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Configure Authentication
    env:
      CAPGO_KEY: ${{ secrets.CAPGO_API_KEY }}
```

Cet ajout prolonge votre cycle de vie CI/CD en incorporant la [gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) dans votre processus automatisé de construction et de déploiement.

Ensuite, incluez la commande de téléchargement après vos étapes de construction :

```yaml
- name: Upload Update
  run: |
    capgo upload --api-key $CAPGO_KEY --bundle ./build/app-release.apk
    capgo deploy v${VERSION} --channel production
```

Pour des [mises à jour sécurisées](https://capgo.app/docs/live-updates/update-behavior/), configurez les paramètres de validation comme suit :

```json
{
  "verification": {
    "checksum": "strict",
    "certificatePinning": true,
    "updateTimeout": 500
  }
}
```

### Vue d'ensemble des fonctionnalités de Capgo

| Fonctionnalité | Description |
| --- | --- |
| Cryptage de bout en bout | Réduit considérablement les erreurs de déploiement. |
| Déploiement basé sur des canaux | Adapte les mises à jour à des environnements spécifiques. |
| Déploiements échelonnés | Garantit que les mises à jour sont distribuées progressivement. |

### Directives sur les mises à jour OTA

Améliorez vos processus de test en suivant ces indicateurs clés après le déploiement :

**Stratégie de déploiement échelonné**

Utilisez un déploiement échelonné pour contrôler la façon dont les mises à jour sont distribuées :

```yaml
- name: Staged Rollout
  run: |
    capgo deploy v1.2.3 --group "beta-users" --rollout 10%
    capgo deploy v1.2.3 --rollout 50%
```

**Suivi des mises à jour**

Surveillez ces indicateurs :

-   **Taux d'adoption** : Visez 40-60 % dans les 24 premières heures.
-   **Sessions sans plantage** : Maintenez au-dessus de 99,5 %.
-   **Temps de vérification** : Assurez-vous qu'il est inférieur à 500 ms.

Si les plantages dépassent des niveaux acceptables, automatisez un retour en arrière :

```yaml
- name: Rollback Check
  run: |
    if [ $(capgo stats --version v1.2.3 --metric crashes) -gt 2 ]; then
      capgo rollback --channel production
    fi
```

## Amélioration des performances du pipeline

Se concentrer sur trois domaines clés peut mener à des améliorations notables de votre pipeline :

### Optimisation de la vitesse de construction

Pour les modifications uniquement web, l'utilisation de `npx cap sync` peut faire gagner du temps en sautant les reconstructions natives complètes, réduisant le temps de reconstruction d'environ 40 %. Voici comment vous pouvez mettre en œuvre des constructions conditionnelles :

```yaml
- name: Build Strategy
  run: |
    [ "$WEB_ONLY" = true ] && npx cap sync || (./gradlew assembleRelease && xcodebuild ...)
```

Cette approche garantit que seuls les composants nécessaires sont reconstruits, rationalisant ainsi le processus.

### Automatisation du contrôle de version

Automatiser le contrôle de version peut simplifier votre workflow. Utilisez le script suivant pour définir dynamiquement le numéro de version et de build :

```yaml
- name: Set Version
  run: |
    VERSION=$(node -p "require('./package.json').version")
    BUILD_NUMBER=$GITHUB_RUN_NUMBER
    echo "APP_VERSION=${VERSION}" >> $GITHUB_ENV
    echo "BUILD_ID=${BUILD_NUMBER}" >> $GITHUB_ENV
```

De plus, un versionnement sémantique automatisé peut être configuré avec cette configuration :

```json
{
  "scripts": {
    "version": "standard-version",
    "build:prod": "npm version patch && ionic build --prod"
  }
}
```

Ces pratiques fournissent un cadre solide pour suivre et améliorer les performances du pipeline à travers des métriques telles que :

-   Temps de construction par étape
-   Efficacité du cache (ratios hit/miss)
-   Utilisation des ressources de pointe

### Configuration multi-environnement

Gérer plusieurs environnements peut être simplifié en utilisant des configurations spécifiques à chaque environnement. Voici un exemple de configuration :

| Environnement | Fichier de configuration |
| --- | --- |
| Développement | `.env.dev` |
| Staging | `.env.staging` |
| Production | Coffres sécurisés |

Vous pouvez configurer dynamiquement les environnements avec ce script :

```yaml
- name: Configure Environment
  env:
    API_KEY: ${{ secrets.ENV_SPECIFIC_API_KEY }}
    BUNDLE_ID: ${{ parameters.bundleId }}
  run: |
    echo "ENVIRONMENT=${{ parameters.environment }}" >> $GITHUB_ENV
    echo "API_ENDPOINT=${{ parameters.apiUrl }}" >> $GITHUB_ENV
```

Associer ces configurations avec le déploiement basé sur des canaux de Capgo permet des mises à jour précises et spécifiques à chaque environnement. Cela garantit des déploiements plus fluides et un meilleur contrôle du comportement de l'application dans différents environnements.

## Résumé

### Le rôle de CI/CD dans le développement

Utiliser des pipelines CI/CD pour les applications Capacitor améliore considérablement l'efficacité des workflows. Selon les données du secteur, les équipes peuvent réaliser des **cycles de sortie 50-70 % plus rapides** grâce à des constructions simultanées iOS et Android [\[3\]](https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/). L'automatisation de tâches comme l'installation des dépendances et la synchronisation des plateformes réduit les erreurs de déploiement de **40 à 60 %** [\[1\]](https://opstree.com/blog/2023/06/27/cicd-for-mobile-app-development-using-capacitor-js-on-azure-devops/)[\[2\]](https://capacitorjs.com/docs/guides/ci-cd).

Par exemple, les équipes utilisant les pipelines Azure DevOps ont automatisé des processus tels que les étapes de construction séquentielles et l'emballage Xcode. Elles utilisent également des environnements paramétrés pour le développement et la production. Cette approche élimine le besoin d'opérations manuelles Gradle et CLI Xcode, garantissant la création d'artefacts fiables à chaque fois.

Ces améliorations préparent le terrain pour une gestion des mises à jour rationalisée lorsqu'elles sont associées à Capgo.

### Capgo pour la gestion des mises à jour

Capgo fonctionne parfaitement avec les pipelines CI/CD pour délivrer des mises à jour instantanées tout en restant conforme aux politiques des magasins d'applications. Les mises à jour ne sont déployées qu'après avoir passé des portes de test automatisées intégrées au pipeline.

En combinant des constructions automatisées avec des déploiements échelonnés, les équipes obtiennent des résultats impressionnants : **80 % de couverture utilisateur en 7 jours** et des capacités de retour en arrière en moins d'une heure.

Une stratégie courante implique de faire fonctionner des pistes de déploiement parallèles. Des constructions automatisées sont utilisées pour les tests internes, tandis que des déploiements échelonnés ciblent des segments d'utilisateurs. Cela garantit que les mises à jour sont à la fois rapides et sûres, soutenues par des portes de test automatisées rigoureuses [\[1\]](https://opstree.com/blog/2023/06/27/cicd-for-mobile-app-development-using-capacitor-js-on-azure-devops/).

## FAQs

### Comment créer une application Capacitor ?

La création d'une application Capacitor implique quelques étapes simples :

1.  **Configurez votre environnement** : Installez Node.js et npm sur votre système. Ensuite, utilisez l'Ionic CLI pour démarrer un nouveau projet avec le support de Capacitor :
    
    ```bash
    ionic start myApp tabs --capacitor
    ```
    
2.  **Ajoutez le support des plateformes** : Ajoutez les plateformes que vous souhaitez cibler, comme iOS ou Android :
    
    ```bash
    npx cap add ios
    npx cap add android
    ```
    
3.  **Synchronisez votre code web** : Assurez-vous que votre code web est aligné avec les plateformes natives en exécutant :
    
    ```bash
    npx cap sync
    ```
    

L'étape de synchronisation est cruciale pour maintenir la cohérence de votre application sur les différentes plateformes et garantir un fonctionnement fluide dans les pipelines CI/CD. Pour plus de détails sur la configuration de votre environnement, consultez la section Outils.
