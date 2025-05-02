---
slug: panduan-kontribusi-plugin-capacitor
title: Panduan Kontribusi Plugin Capacitor
description: >-
  Pelajari cara berkontribusi secara efektif untuk plugin Capacitor dengan
  panduan lengkap tentang konfigurasi, standar penulisan kode, pengujian, dan
  dokumentasi.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-17T05:00:51.296Z
updated_at: 2025-03-18T13:13:57.261Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b290a70d4a761ccc9919b5-1739768465938.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Capacitor, plugins, development, mobile, coding standards, testing,
  documentation, contribution, open source
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
original_slug: guide-de-contribution-plugin-capacitor
---
[Capacitor](https://capacitorjs.com/) plugins connectent les technologies web aux fonctionnalités natives des appareils, permettant le [développement d'applications multi-plateformes](https://capgo.app/blog/cross-platform-mobile-app-development-guide-2024/). Ce guide vous aide à :

-   **Configurer votre environnement** : Des outils comme [Node.js](https://nodejs.org/en), [Xcode](https://developer.apple.com/xcode/) et [Android Studio](https://developer.android.com/studio) sont essentiels.
-   **Suivre les normes de code** : Utilisez [TypeScript](https://www.typescriptlang.org/), [Swift](https://developer.apple.com/swift/) et [Kotlin](https://kotlinlang.org/) avec des conventions de nommage et une gestion des erreurs cohérentes.
-   **Tester minutieusement** : Écrivez des tests unitaires pour JavaScript, iOS et Android pour garantir la fiabilité.
-   **Documenter clairement** : Utilisez JSDoc et les fichiers README pour une adoption facile.
-   **Soumettre une Pull Request** : Assurez-vous de la qualité du code, des tests et de la documentation avant de contribuer.

## Guide complet de l'Open Source - Comment contribuer

<Steps>

## Configuration de l'environnement de développement

La création d'un environnement de développement approprié est essentielle pour un développement efficace de plugins. Une configuration bien préparée permet une programmation, des tests et un déploiement fluides de vos plugins.

### Outils et compétences nécessaires

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

| Catégorie | Prérequis |
| --- | --- |
| **Outils principaux** | Node.js (LTS), npm 6+, Git |
| **IDE/Éditeurs** | [Visual Studio Code](https://code.visualstudio.com/) ou votre éditeur préféré |
| **Développement iOS** | Xcode, [SwiftLint](https://github.com/realm/SwiftLint), [CocoaPods](https://cocoapods.org/) |
| **Développement Android** | Android Studio, SDK Android, JDK |

Vous devez également être à l'aise avec TypeScript pour le développement web et soit Swift (pour iOS) soit Java/Kotlin (pour Android) pour les tâches de développement natif [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md)[\[2\]](https://github.com/ionic-team/capacitor-plugins/blob/main/CONTRIBUTING.md).

### Configuration du monorepo

L'écosystème des [plugins Capacitor](https://capgo.app/plugins/) repose sur une structure monorepo. Cette approche garantit que votre travail s'aligne sur les standards de la communauté dès le départ.

1.  **Forker et cloner le dépôt**  
    Commencez par forker le dépôt des plugins Capacitor sur GitHub. Ensuite, clonez votre dépôt forké :
    
    ```bash
    git clone https://github.com/your-username/capacitor-plugins.git
    cd capacitor-plugins
    npm install
    ```
    
2.  **Installer les dépendances et construire**  
    Exécutez la commande suivante pour installer tout ce dont vous avez besoin et construire les plugins :
    
    ```bash
    npm run build
    ```
    
3.  **Configurer le contrôle de version**  
    Utilisez des branches de fonctionnalités pour vos modifications et gardez votre fork synchronisé avec le dépôt upstream.
    

### Préparation des plateformes natives

Pour le développement multi-plateformes, vous devrez configurer les environnements iOS et Android.

**Pour iOS :**

-   Téléchargez Xcode depuis le Mac App Store.
    
-   Installez les outils en ligne de commande en utilisant :
    
    ```bash
    xcode-select --install
    ```
    
-   Installez CocoaPods avec :
    
    ```bash
    sudo gem install cocoapods
    ```
    
-   Configurez un compte Apple Developer et les certificats nécessaires.
    
-   Utilisez SwiftLint (optionnel) pour maintenir la qualité du code.
    

**Pour Android :**

-   Installez Android Studio avec le dernier SDK et un appareil virtuel.
-   Assurez-vous d'avoir un JDK installé.
-   Configurez correctement le SDK Android dans Android Studio.

Une fois ces plateformes configurées, vous serez prêt à suivre les pratiques de codage établies et à vous lancer dans le développement de plugins.

## Guide des normes de code

Maintenant que votre environnement de développement est configuré, suivez ces directives pour créer des plugins faciles à maintenir et à utiliser.

### Conformité aux guides de style

L'[écosystème des plugins Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) applique des normes de codage strictes en utilisant des outils comme [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) et SwiftLint. Voici un aperçu rapide du formatage requis :

| Composant | Format |
| --- | --- |
| Variables | `deviceInfo` (camelCase) |
| Classes | `BatteryManager` (PascalCase) |
| Méthodes | `getLanguageCode()` (camelCase) |
| Constantes | `MAX_RETRY_COUNT` (SNAKE_CASE) |

Les plugins doivent utiliser TypeScript pour une meilleure sécurité des types et les fonctionnalités ES6+ comme `async/await`. De plus, suivez les conventions de codage spécifiques à la plateforme pour Swift (iOS) et Kotlin (Android).

### Gestion des erreurs et des types

Une gestion cohérente des erreurs est cruciale pour la compatibilité multi-plateformes. Voici un exemple :

```typescript
async checkPermissions(): Promise<PermissionStatus> {
  try {
    const result = await this.implementation.checkPermissions();
    return result;
  } catch (error) {
    throw new Error(`Permission check failed: ${error.message}`);
  }
}
```

Pour la sécurité des types :

-   Utilisez des interfaces ciblées adaptées aux cas d'utilisation spécifiques.
-   Appliquez des types d'union pour les variations spécifiques à la plateforme.
-   Implémentez des gardes de type pour valider les types à l'exécution [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md).

### Documentation du code

Une bonne documentation est essentielle pour rendre votre plugin accessible et facile à utiliser. Suivez ces pratiques :

1.  **Documentation API** : Écrivez des commentaires JSDoc qui fonctionnent avec `@capacitor/docgen`. Par exemple :

```typescript
/**
 * @description Get the device's current battery level
 * @returns Promise with the battery level percentage
 */
async getBatteryLevel(): Promise<{ level: number }>;
```

2.  **Structure README** : Incluez les informations essentielles comme les étapes d'installation, les instructions de configuration, les exigences spécifiques à la plateforme, des exemples d'utilisation et une référence API détaillée.

Une documentation bien rédigée garantit que votre plugin est facile à adopter et contribue à la communauté Capacitor élargie.

## Guide de test des plugins

Le test des plugins Capacitor implique de se concentrer sur quelques domaines critiques pour assurer un fonctionnement fluide et fiable.

### Tests du pont natif

Les tests du pont natif assurent une communication appropriée entre JavaScript et le code natif. Pour commencer, configurez votre environnement de test avec des frameworks adaptés à chaque plateforme.

Voici un exemple de test unitaire [Jest](https://jestjs.io/) pour le côté JavaScript :

```typescript
// Example of a Jest unit test for the JavaScript bridge
describe('DeviceInfo Plugin', () => {
  test('getBatteryLevel returns valid percentage', async () => {
    const result = await DeviceInfo.getBatteryLevel();
    expect(result.level).toBeGreaterThanOrEqual(0);
    expect(result.level).toBeLessThanOrEqual(100);
  });
});
```

Pour tester du côté natif, utilisez XCTest pour iOS et JUnit pour Android. Voici un exemple pour Android :

```kotlin
@Test
fun testBatteryLevel() {
    val plugin = DeviceInfo()
    val result = plugin.getBatteryLevel()
    assertTrue(result.level in 0..100)
}
```

Une fois que vous avez confirmé que la fonctionnalité de base du pont fonctionne comme prévu, passez aux tests des flux de travail complets.

### Tests complets des plugins

Pour vous assurer que votre plugin fonctionne bien dans différents scénarios, testez diverses catégories :

| Catégorie de test | Domaines clés |
| --- | --- |
| Tests d'intégration | Fonctionnalité multi-plateformes |
| Tests de performance | Utilisation des ressources et temps de réponse |
| Tests de sécurité | Gestion des données et vérification des permissions |

Pour les plugins avec des fonctionnalités complexes, simulez des scénarios utilisateur réels. Par exemple, si vous testez un plugin DeviceInfo, vérifiez :

-   Les téléchargements réussis dans différentes conditions réseau
-   La précision des rapports de progression
-   L'utilisation de la mémoire pendant les transferts de gros fichiers

### Tests OTA avec [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-17.jpg?auto=compress)

Les outils open-source de Capgo facilitent le déploiement et le test rapide des mises à jour. Voici comment l'utiliser :

1.  Configurez des [canaux de mise à jour](https://capgo.app/docs/webapp/channels/) comme dev, staging et production.
2.  Automatisez les déploiements avec des outils CI/CD.
3.  Poussez les mises à jour instantanément.
4.  Surveillez les performances et les problèmes via le [tableau de bord Capgo](https://capgo.app/docs/webapp/).

Pour les déploiements progressifs, Capgo permet de limiter les mises à jour à un petit pourcentage d'utilisateurs. Par exemple, vous pouvez déployer une nouvelle version à 25% des utilisateurs toutes les 24 heures :

```typescript
// Example configuration for staged rollout
{
  "plugin": "camera-plugin",
  "version": "1.2.0",
  "rollout": {
    "percentage": 25,
    "interval": "24h"
  }
}
```

Cette approche progressive aide à identifier les problèmes tôt en tirant parti des retours de la communauté avant une version complète.

## Processus de Pull Request

Une fois que vous avez testé minutieusement vos modifications, suivez ces étapes pour soumettre votre pull request :

### Liste de vérification PR

Avant de soumettre, assurez-vous d'avoir couvert ces domaines clés :

| **Catégorie** | **Quoi vérifier** |
| --- | --- |
| **Qualité du code** | \- Assurez-vous que les implémentations Swift/Kotlin s'alignent avec l'API web. |
| **Tests** | \- Ajoutez des tests unitaires pour toute nouvelle fonctionnalité.  <br>\- Confirmez que les vérifications du pipeline CI/CD sont réussies. |
| **Documentation** | \- Mettez à jour le README, la documentation inline et le CHANGELOG si nécessaire. |

### Directives de la communauté

Lors de la collaboration, suivez ces meilleures pratiques :

-   Répondez rapidement aux commentaires des relecteurs.
-   Gardez les discussions concentrées sur les détails techniques.
-   Utilisez la fonctionnalité de suggestion de GitHub pour proposer des modifications de code.
-   Soumettez des pull requests petites et ciblées qui traitent d'une fonctionnalité ou d'un problème à la fois.

Pour les changements plus importants, il est conseillé de créer d'abord une issue et de discuter de votre approche. L'équipe Capacitor s'appuie sur GitHub Actions pour les vérifications automatisées, et toutes les vérifications doivent passer avant que votre pull request puisse être examinée.

### Guide d'intégration Capgo

Si votre plugin implique des mises à jour en direct, assurez-vous qu'il fonctionne parfaitement avec Capgo avant de le soumettre :

1.  **Contrôle de version**  
    Utilisez un versionnement sémantique clair pour votre plugin et documentez tous les changements dans le changelog. Le système de Capgo aide à suivre l'adoption des versions sur les appareils des utilisateurs.
    
2.  **Intégration CI/CD**  
    Intégrez Capgo dans votre pipeline CI/CD pour automatiser les déploiements de mises à jour.
    
3.  **Surveillance des mises à jour**  
    Surveillez les taux de réussite des déploiements et assurez la conformité avec les directives des app stores.
    

## Résumé

Pour apporter une contribution significative avec votre plugin, il est important de suivre le processus établi et de respecter les standards de la communauté. Cela inclut le respect des directives de codage de Capacitor et le test approfondi de votre travail.

La liste de vérification PR souligne la nécessité de soumissions de haute qualité. Si votre plugin prend en charge les mises à jour en direct, l'intégration avec Capgo (comme mentionné précédemment) peut vous aider à publier des mises à jour rapidement sans attendre les approbations des app stores.

Une fois votre PR fusionnée, restez impliqué en suivant les problèmes et en publiant des mises à jour de version. Une interaction régulière avec la communauté, une maintenance constante et [le suivi des mises à jour de Capacitor](https://capgo.app/plugins/capacitor-updater/) garantiront que votre plugin reste utile et pertinent.

Prêtez attention aux retours des utilisateurs et effectuez des mises à jour si nécessaire. Cet effort continu aide à maintenir la qualité globale de l'écosystème et garde votre plugin précieux pour les développeurs.
