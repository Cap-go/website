---
slug: capacitor-cli-commands-for-version-updates
title: Comandos de la CLI de Capacitor para Actualizaciones de Versión
description: Capacitor CLIを使用してアプリを更新するための基本的なコマンドとベストプラクティスを学び、最適なパフォーマンスと互換性を確保しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-05-11T21:29:40.056Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI simplifie [la mise à jour de votre application](https://capgo.app/plugins/capacitor-updater/) pour iOS et Android. Voici ce que vous devez savoir :

1. **Pourquoi mettre à jour ?** Restez en sécurité, améliorez les performances et assurez-vous de la compatibilité avec les dernières versions des systèmes d'exploitation mobiles.
2. **Commandes clés :** Utilisez `npm install @capacitor/cli@latest` pour mettre à jour Capacitor CLI, `npx cap migrate` pour appliquer les modifications et `npx cap sync` pour [finaliser les mises à jour](https://capgo.app/docs/plugin/cloud-mode/hybrid-update).
3. **Étapes spécifiques à la plateforme :** Mettez à jour iOS avec [CocoaPods](https://cocoapods.org/) (`pod install`) et les paramètres de [Xcode](https://developer.apple.com/xcode/). Pour Android, ajustez les configurations [Gradle](https://gradle.org/) et vérifiez les versions de Java.
4. **Utilisez [Capgo](https://capgo.app/) pour des mises à jour en direct :** Déployez des modifications instantanément sans délais d'approbation par l'app store, avec des fonctionnalités telles que le rollback et l'analyse en temps réel.

La mise à jour garantit que votre application reste efficace et conviviale. Suivez les étapes ci-dessus pour un processus fluide.

## Comment migrer votre application Ionic vers [Capacitor](https://capacitorjs.com/) 3

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Avant de mettre à jour

Prendre le temps de se préparer avant de mettre à jour peut vous éviter des maux de tête par la suite. Un peu de préparation aide à éviter les erreurs courantes et assure que tout fonctionne correctement. Voici ce sur quoi vous devez vous concentrer pour minimiser les risques lors du [processus de mise à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/).

### Vérifiez les exigences système

Premièrement - assurez-vous que votre environnement de développement répond aux exigences pour Capacitor. Les versions 6 et 7 ont des besoins logiciels spécifiques [\[1\]](https://capgo.app).

Voici ce que vous devez vérifier :

1. **Node.js** : Vérifiez que votre version de Node.js est compatible.
2. **Outils spécifiques à la plateforme** :
    - Pour le développement iOS, assurez-vous d'avoir la dernière version de Xcode installée.
    - Pour Android, confirmez que [Android Studio](https://developer.android.com/studio) est à jour.

### Lisez les notes de mise à jour

Les notes de mise à jour sont votre feuille de route pour comprendre comment les changements pourraient affecter votre projet. Prenez le temps de passer en revue les éléments suivants :

1. **Documentation officielle** : Consultez le changelog et les guides de migration de Capacitor.
2. **Changements majeurs** : Portez une attention particulière à toute section étiquetée "Changements majeurs". Celles-ci mettent souvent en avant des mises à jour cruciales qui pourraient perturber votre flux de travail.
3. **Compatibilité des plugins** : Vérifiez que tous les plugins Capacitor de votre projet sont pris en charge par la nouvelle version.

## Commandes de mise à jour CLI

Ces commandes vous aident à mettre à jour votre application tout en assurant que tout continue à fonctionner sans accroc.

### Mettre à jour Capacitor CLI

Pour accéder aux dernières fonctionnalités, mettez à jour votre CLI Capacitor. Ouvrez votre terminal et exécutez :

```bash
npm install -g @capacitor/cli@latest
```

Une fois installé, confirmez la mise à jour en vérifiant votre version CLI :

```bash
npx cap --version
```

### Exécutez les commandes de migration

Dans votre répertoire de projet, exécutez les commandes suivantes pour mettre à jour les packages Capacitor de base et spécifiques à la plateforme :

```bash
# Update core Capacitor packages
npm install @capacitor/core@latest
npm install @capacitor/cli@latest

# Update platform-specific packages
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Run the migration command
npx cap migrate
```

La commande `npx cap migrate` va :

1. Mettre à jour les configurations de votre application
2. Synchroniser les dépendances
3. Appliquer les modifications nécessaires au projet
4. Valider les plugins pour la compatibilité

Si certaines mises à jour ne sont pas traitées automatiquement, vous devrez peut-être les compléter manuellement.

### Compléter les étapes manuelles

Pour synchroniser votre projet avec les plateformes mises à jour, exécutez :

```bash
npx cap sync
```

Pour une automatisation supplémentaire, vous pouvez intégrer l'outil CLI de Capgo en exécutant :

```bash
npx @capgo/cli init
```

Enfin, vérifiez la mise à jour en construisant votre application pour chaque plateforme :

```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

Si vous rencontrez des problèmes pendant la mise à jour, la CLI fournira des messages d'erreur détaillés pour aider au dépannage. Assurez-vous de vérifier la sortie de la construction pour tout avertissement ou erreur qui pourrait nécessiter votre attention.

## Mises à jour de la plateforme

Une fois les mises à jour de base terminées, l'étape suivante consiste à peaufiner les configurations de la plateforme pour les projets iOS et Android.

### Étapes de mise à jour iOS

Pour commencer avec votre projet iOS, ouvrez-le dans Xcode et suivez ces étapes :

1. **Mettez à jour les dépendances CocoaPods**  
    Commencez par actualiser vos dépendances avec CocoaPods. Rendez-vous dans votre répertoire de projet iOS et exécutez la commande suivante :
    
    ```bash
    cd ios/App
    pod install
    ```
    
2. **Configurer les paramètres Xcode**  
    Assurez-vous que ces paramètres Xcode sont mis à jour pour garantir un fonctionnement fluide et la conformité :
    
    | **Paramètre** | **Action requise** | **Objectif** |
    | --- | --- | --- |
    | Cible de déploiement | Définir une version minimale d'iOS | Assurer la compatibilité |
    | Paramètres de construction | Mettre à jour l'identité de signature | Répondre aux exigences de l'App Store |
    | Catalogue de ressources | Vérifier les icônes et les ressources de splash | Maintenir la cohérence visuelle |
    
3. **Construire proprement**  
    Effacez les fichiers mis en cache et effectuez une construction propre pour éviter les problèmes résiduels :
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

Une fois les mises à jour iOS terminées, vous pouvez vous concentrer sur le projet Android.

### Étapes de mise à jour Android

Pour Android, ouvrez le projet dans Android Studio et suivez ces étapes :

1. **Mettez à jour la configuration Gradle**  
    Ouvrez votre fichier `build.gradle` et confirmez que ces paramètres sont correctement configurés :
    
    ```kotlin
    android {
        compileSdkVersion 33
        defaultConfig {
            minSdkVersion 22
            targetSdkVersion 33
        }
    }
    ```
    
2. **Synchronisez les fichiers du projet**  
    Synchronisez le projet avec les fichiers Gradle pour vous assurer que toutes les dépendances sont à jour. Cette étape peut également impliquer la mise à jour des outils SDK et la résolution de tout conflit.
    
3. **Vérifiez la version de Java**  
    Vérifiez que vous utilisez la version correcte de Java, car cela est crucial pour la compatibilité avec Gradle et les fonctionnalités Android :
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Assurez-vous de porter une attention particulière à votre configuration Gradle. Certaines mises à jour peuvent nécessiter une version plus récente de Gradle pour soutenir efficacement les dernières fonctionnalités Android.

## Mises à jour en direct avec [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

Une fois votre plateforme configurée, vous pouvez utiliser Capgo pour déployer des modifications instantanément sans attendre les approbations de l'app store. Cette étape améliore vos mises à jour de plateforme en permettant des capacités de déploiement en temps réel.

### Configuration de Capgo

Commencer avec Capgo est simple. Vous pouvez l'initialiser avec une commande simple :

```bash
npx @capgo/cli init
```

Cette fonctionnalité rationalise le processus de mise à jour, gardant votre application à jour sans les délais des cycles de révision traditionnels. Capgo est compatible avec Capacitor 6 et 7, ce qui en fait un choix flexible pour votre configuration existante.

| **Fonctionnalité** | **Description** | **Avantage** |
| --- | --- | --- |
| Chiffrement de bout en bout | Sécurité intégrée pour les mises à jour | Assure que seuls les utilisateurs autorisés peuvent accéder aux mises à jour |
| [Système de canal](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | Distribution avancée de mises à jour | Cible des segments d'utilisateurs spécifiques |
| Analyse en temps réel | Surveiller la performance des mises à jour | Suivre les taux de réussite et l'engagement des utilisateurs |

### Fonctionnalités de sécurité des mises à jour

Capgo priorise des mises à jour sûres et fiables, atteignant un taux d'adoption de 95 % en 24 heures et un taux de réussite de 82 % dans le monde entier [\[1\]](https://capgo.app). Il comprend plusieurs fonctionnalités de sécurité clés :

1. **Capacité de rollback** : Revenez rapidement à une version précédente si des problèmes se produisent.
2. **Suivi des erreurs** : Identifiez et résolvez les problèmes avant qu'ils n'affectent les utilisateurs.
3. **Distribution par canal** : [Tester les mises à jour avec des groupes bêta](https://capgo.app/blog/how-to-send-specific-version-to-users/) avant de les déployer largement.

### Intégration CI/CD

Une fois les mesures de sécurité en place, vous pouvez intégrer Capgo dans votre pipeline CI/CD pour des déploiements fluides et efficaces. Capgo a déjà configuré CI/CD pour plus de 50 applications, offrant des solutions économiques par rapport à d'autres options [\[1\]](https://capgo.app).

Voici un exemple de commande de déploiement :

```bash
npx @capgo/cli deploy --channel production
```

Capgo prend en charge diverses plateformes CI/CD, y compris :

1. [GitHub Actions](https://docs.github.com/actions)
2. [GitLab CI](https://docs.gitlab.com/ee/ci/)
3. [Jenkins](https://www.jenkins.io/)
4. Configurations de pipeline personnalisées

> "Nous configurons votre pipeline CI/CD directement sur votre plateforme préférée, que ce soit GitHub Actions, GitLab CI ou d'autres. Nous n'hébergeons pas CI/CD et ne vous facturons pas pour le maintenir." - Capgo [\[1\]](https://capgo.app)

Pour les équipes recherchant une assistance experte, Capgo propose un service de configuration CI/CD professionnel pour 2 600 $. Cette configuration unique inclut la configuration de pipeline personnalisée et des conseils d'experts sur les meilleures pratiques de déploiement d'applications mobiles [\[1\]](https://capgo.app).

## Résoudre les problèmes courants

[Les mises à jour de Capacitor](https://capgo.app/plugins/capacitor-updater/) peuvent parfois entraîner des problèmes qui perturbent la stabilité de votre application. Voici comment vous pouvez aborder ces problèmes courants efficacement.

### Résoudre les conflits de packages

Commencez par vérifier les incompatibilités de version dans vos packages Capacitor. Utilisez la commande suivante :

```bash
npm ls @capacitor/core
```

Passez en revue la sortie et assurez-vous que les versions de **@capacitor/core**, **@capacitor/ios** et **@capacitor/android** sont cohérentes dans votre fichier `package.json`. Si vous repérez des conflits, mettez à jour ou retirez les packages problématiques pour stabiliser votre environnement.

Après les avoir résolus, vérifiez à nouveau que tous les plugins installés sont compatibles avec la version mise à jour de Capacitor.

### Vérifiez le support des plugins

Avant de mettre à jour, assurez-vous que vos plugins sont prêts à travailler avec la dernière version de Capacitor. Utilisez ces commandes pour gérer et vérifier la compatibilité des plugins :

| **Action** | **Commande** | **Objectif** |
| --- | --- | --- |
| Lister les plugins | `npx cap ls` | Affiche tous les plugins installés |
| Vérifier les versions | `npm outdated` | Identifie les plugins obsolètes |
| Mettre à jour les plugins | `npm update` | Met à jour les plugins vers des versions compatibles |

Si vous utilisez des outils de mise à jour en direct comme **Capgo**, confirmez que vos plugins prennent en charge les mises à jour dynamiques. Cela aide à éviter les conflits d'exécution et à garantir des performances plus fluides.

### Résoudre les erreurs de construction

Les erreurs de construction peuvent varier en fonction de la plateforme, mais voici des solutions spécifiques à chaque plateforme :

**Pour iOS :**

Nettoyez vos dossiers de construction en utilisant cette commande :

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**Pour Android :**

Videz le cache Gradle en exécutant :

```bash
cd android && ./gradlew clean
```

Si des erreurs persistent après le nettoyage, vous devrez peut-être réajouter les plateformes concernées. Voici comment :

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

Enfin, si vous utilisez Capgo pour des mises à jour en direct, vérifiez que vos configurations de construction répondent aux exigences de la plateforme pour éviter d'autres problèmes.

## Résumé

Cette section met en évidence les étapes et outils essentiels pour [gérer les mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) dans Capacitor, en soulignant comment une utilisation efficace des [commandes CLI de Capacitor](https://capgo.app/docs/cli/commands/) garantit des flux de travail fluides dans le développement d'applications. Les outils et stratégies discutés visent à simplifier les mises à jour tout en réduisant les risques potentiels.

Précédemment, nous avons noté que Capgo prend en charge **1.7K applications en production**, atteignant un impressionnant **82 % de taux de réussite des mises à jour** [\[1\]](https://capgo.app). Sa fonction de mise à jour instantanée permet à **95 % des utilisateurs de mettre à jour dans les 24 heures** [\[1\]](https://capgo.app), mettant en avant son efficacité.

Voici un aperçu des métriques de performance de Capgo :

| Métrique | Performance |
| --- | --- |
| Temps de réponse API global | 434 ms |
| Vitesse de téléchargement de bundle 5 Mo | 114 ms |
| Taux de réussite des mises à jour | 82 % |

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer continuellement à nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgo.app)

Les outils de mise à jour modernes offrent plusieurs avantages notables :

- **Chiffrement de bout en bout** pour une livraison sécurisée des mises à jour
- **Mises à jour partielles**, qui économisent la bande passante en ne téléchargeant que les composants modifiés
- **Récupération en un clic** pour un rétablissement rapide en cas de problèmes
- **Analyse en temps réel** pour surveiller la performance des mises à jour et l'engagement des utilisateurs

Ces fonctionnalités sous-tendent une structure robuste pour gérer [les mises à jour de version](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/) de manière efficace.

Que vous travailliez sur une petite application ou que vous développiez un déploiement plus important, combiner Capacitor CLI avec des outils de mise à jour avancés garantit un contrôle de version fiable et efficace dans le paysage de développement en rapide évolution d'aujourd'hui.

## FAQs

::: faq
### Quels défis puis-je rencontrer lors de la mise à jour de mon application avec Capacitor CLI, et comment puis-je les résoudre ?

Lorsque vous mettez à jour votre application avec Capacitor CLI, vous pourriez rencontrer quelques difficultés en cours de route. Les défis courants incluent **conflits de dépendance**, **changements destructeurs dans les plugins** ou **problèmes de configuration spécifiques à la plateforme**. Ces problèmes surviennent souvent en raison de différences entre les versions de Capacitor ou des mises à jour de plugins tiers.

Voici comment vous pouvez relever ces défis :

- **Vérifiez les notes de version** pour la nouvelle version à laquelle vous passez. Faites attention aux changements destructeurs ou à tout ajustement que vous devrez apporter.
- **Testez les mises à jour dans un environnement de staging** avant de les déployer en production. Cela vous aide à détecter et corriger les problèmes avant qu'ils n'impactent les utilisateurs.
- Mettez régulièrement à jour vos dépendances et plugins pour réduire le risque de problèmes de compatibilité.

Pour une expérience de mise à jour encore plus fluide, vous voudrez peut-être essayer des outils comme _Capgo_. Cet outil vous permet d'envoyer des correctifs et de nouvelles fonctionnalités directement à vos utilisateurs sans avoir besoin d'approbations de l'App Store. C'est un excellent moyen de garder votre application à jour avec un temps d'arrêt minimal.
:::

::: faq
### Comment Capgo simplifie-t-il les mises à jour des applications, et quelles sont ses caractéristiques remarquables ?

Capgo simplifie la manière dont les développeurs livrent [des mises à jour d'applications](https://capgo.app/plugins/capacitor-updater/) en leur permettant de pousser les changements, correctifs et nouvelles fonctionnalités directement aux utilisateurs - contournant ainsi le besoin d'approbations de l'App Store. Grâce à cela, vos utilisateurs peuvent profiter des dernières mises à jour en quelques minutes, créant une expérience plus fluide et plus efficace.

Voici ce qui distingue Capgo :

- **Chiffrement de bout en bout** garantit que vos mises à jour restent sécurisées.
- **Intégration CI/CD** aide à maintenir des flux de travail rationalisés.
- **Mises à jour spécifiques aux utilisateurs** permettent des déploiements précis et ciblés.
- **Gestion flexible des organisations** prend en charge des équipes de toutes tailles.

Capgo est entièrement open-source et respecte les normes d'Apple et d'Android, offrant une solution fiable pour [des mises à jour d'applications en temps réel](https://capgo.app/blog/live-updates-for-flutter-app/).
:::

::: faq
### Comment puis-je vérifier si mes plugins sont compatibles avec la dernière version de Capacitor avant de mettre à jour ?

Avant de passer à la dernière version de Capacitor, il est crucial de vérifier que vos plugins sont prêts à gérer la mise à jour. Commencez par explorer la documentation ou le référentiel du plugin pour voir s'il existe des exigences ou mises à jour spécifiques à la version. La plupart des plugins indiquent clairement les versions de Capacitor qu'ils prennent en charge, donc cette étape peut vous éviter des maux de tête inutiles.

Vous pouvez également tester votre application dans un environnement contrôlé avec la version mise à jour de Capacitor. Cela vous permet d'identifier et de corriger tout problème de compatibilité avant que la mise à jour ne soit mise en ligne en production. Des outils comme **Capgo** peuvent être d'une grande aide ici, vous permettant de pousser des mises à jour directement sans avoir besoin d'approbations de l'App Store. Cela signifie que vous pouvez rapidement résoudre les problèmes liés aux plugins tout en respectant les directives de la plateforme.
:::
