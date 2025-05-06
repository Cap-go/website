---
slug: >-
  Les mises à jour en direct avec Capacitor: Rester conforme aux exigences
  d'Apple
title: 'Live Updates pada Capacitor: Tetap Mengikuti Persyaratan Apple'
description: >-
  Pelajari cara mengimplementasikan pembaruan langsung dalam aplikasi seluler
  secara efektif sambil memastikan kepatuhan terhadap pedoman ketat untuk
  menghindari penolakan.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-12T03:03:33.472Z
updated_at: 2025-03-18T13:14:16.420Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d0d3f9cf9d4dc0b2c0bff2-1741748627082.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, live updates, app compliance, Apple guidelines, encryption, bug
  fixes, mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
Les mises à jour en direct de [Capacitor](https://capacitorjs.com/) permettent aux développeurs de pousser des correctifs de bugs et des modifications mineures directement dans les applications sans que les utilisateurs n'aient besoin de télécharger des mises à jour depuis l'[App Store](https://www.apple.com/app-store/). Cela accélère le déploiement jusqu'à **81%**, réduit les coûts et améliore l'expérience utilisateur. Cependant, il est essentiel de respecter les directives strictes d'Apple pour éviter les rejets d'applications.

### Points Clés :

-   **Mises à jour autorisées** : Corrections de bugs, ajustements d'UI et mises à jour de contenu dans le cadre de l'objectif initial de l'application.
-   **Mises à jour interdites** : Changements majeurs de fonctionnalités ou mises à jour des fonctionnalités principales (nécessitent une révision App Store).
-   **Sécurité** : Le chiffrement de bout en bout est obligatoire pour protéger les données utilisateur.
-   **Outils** : [Capgo](https://capgo.app/) simplifie la gestion des mises à jour en direct, assurant la conformité aux règles d'Apple.

| **Type de mise à jour** | **Autorisé** | **Approbation nécessaire** |
| --- | --- | --- |
| Corrections de bugs | Oui | Non |
| Améliorations UI | Oui | Parfois |
| Mises à jour de contenu | Oui | Non |
| Changements de fonctionnalités | Non | Oui |
| Correctifs de sécurité | Oui | Non |

Pour rester conforme, concentrez-vous sur les corrections de bugs, sécurisez les mises à jour avec le chiffrement et documentez tous les changements. Des outils comme Capgo aident à gérer les mises à jour pour plus de **20 millions d'utilisateurs**, garantissant que les applications restent conformes tout en livrant rapidement les mises à jour.

## Mises à jour en direct [Appflow](https://ionic.io/appflow/live-updates) : Déployez des mises à jour instantanées directement à vos utilisateurs

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionic.io-f18932d1af08bf70cb14b84540039486-2025-03-12.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Twj-Bx6ZRw8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Règles de mise à jour en direct d'Apple

Apple réglemente les mises à jour d'applications pour protéger les utilisateurs, rendant essentiel la compréhension de ces règles lors de l'implémentation des mises à jour en direct dans les applications Capacitor.

### Directives de l'[App Store](https://www.apple.com/app-store/) pour les mises à jour

![App Store](https://mars-images.imgix.net/seobot/screenshots/www.apple.com-9d9fbf06f7f9dd70143af6386e59a5d2-2025-03-12.jpg?auto=compress)

Les règles d'Apple définissent clairement ce qui est autorisé ou non avec les mises à jour over-the-air (OTA). Voici un aperçu rapide :

| Type de mise à jour | Autorisé | Exigences |
| --- | --- | --- |
| Corrections de bugs | Oui | Ne doit pas modifier les fonctionnalités principales |
| Améliorations UI | Oui | Limitées aux ajustements visuels mineurs |
| Mises à jour de contenu | Oui | Doivent rester dans le cadre de l'objectif initial de l'application |
| Changements de fonctionnalités | Non | Nécessite une révision App Store |  
| Correctifs de sécurité | Oui | Doit inclure un chiffrement approprié |

Lors de l'utilisation des mises à jour en direct, les développeurs doivent prioriser la sécurité des données utilisateur et utiliser le chiffrement de bout en bout. Des outils comme Capgo sont conçus pour se conformer aux exigences d'Apple, simplifiant le processus.

La compréhension de ces règles peut vous aider à éviter les erreurs courantes qui mènent aux rejets d'applications.

### Principales raisons de rejet des applications

De nombreuses applications sont rejetées pour violation des directives de mise à jour d'Apple. Voici quelques problèmes fréquents :

-   **Contournement du processus de révision** : Ajout de nouvelles fonctionnalités majeures via des mises à jour en direct au lieu de les soumettre pour révision.
-   **Problèmes de confidentialité** : Non-sécurisation des données utilisateur pendant les mises à jour.
-   **Changements de fonctionnalités principales** : Utilisation des mises à jour en direct pour modifier significativement le fonctionnement de l'application.

> "Éviter la révision pour les corrections de bugs est précieux." - Bessie Cooper, @bessiecooper [\[1\]](https://capgo.app/)

Cela souligne que les mises à jour en direct devraient se concentrer sur les corrections de bugs, pas sur l'introduction de nouvelles fonctionnalités.

Pour rester conforme aux standards d'Apple :

-   Utilisez un chiffrement fort pour toutes les mises à jour.
-   Limitez les mises à jour aux corrections de bugs et ajustements mineurs.
-   Gardez des enregistrements détaillés des changements effectués.
-   Testez minutieusement les mises à jour avant la publication.
-   Surveillez régulièrement les changements de politique d'Apple.

Suivre ces étapes aidera à garantir que vos mises à jour d'application restent dans le cadre des directives strictes d'Apple.

## Configuration des mises à jour en direct conformes

Pour implémenter des mises à jour en direct dans votre [application Capacitor](https://capgo.app/plugins/ivs-player/) tout en respectant les règles de conformité d'Apple, vous aurez besoin d'une configuration structurée. Voici comment commencer.

### Étapes de configuration du projet

Commencez par configurer votre environnement et installer le plugin de mise à jour en direct de Capgo :

-   **Installer les dépendances requises**
    
    -   Utilisez le CLI de Capgo pour installer le plugin de mise à jour en direct et configurer les outils nécessaires. Par exemple :
        
        ```bash
        npx @capgo/cli init
        ```
        
    -   Assurez-vous que votre application inclut le chiffrement de bout en bout et le stockage sécurisé pour les fichiers de mise à jour.
        
-   **Configurer les paramètres de mise à jour**
    
    -   Définissez la fréquence des mises à jour.
    -   Planifiez les procédures de retour en arrière en cas de problème.
    -   Gardez un journal détaillé des changements de version.
-   **Implémenter les protocoles de sécurité**
    
    -   Activez le chiffrement de bout en bout.
    -   Utilisez des méthodes de transmission sécurisées.
    -   Exigez l'authentification utilisateur pour une protection supplémentaire.

### Directives de contrôle de version

Une bonne gestion des versions d'application est essentielle pour rester conforme aux directives d'Apple. Voici un aperçu rapide :

| Type de version | Portée de la mise à jour | Nécessite approbation |
| --- | --- | --- |
| Patch (x.x.1) | Corrections de bugs | Non |
| Mineure (x.1.x) | Ajustements UI | Parfois |
| Majeure (1.x.x) | Mises à jour de fonctionnalités | Oui |

Gardez une documentation détaillée de tous les changements pour faciliter le processus de révision App Store.

### [Capgo](https://capgo.app/) : Gestion des mises à jour en direct

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-12.jpg?auto=compress)

Capgo simplifie la gestion des mises à jour en direct et assure la conformité aux exigences d'Apple. Il a déjà supporté plus de **947,6 millions de mises à jour** à travers **1 400+ applications en production** [\[1\]](https://capgo.app/).

Parmi ses fonctionnalités remarquables :

-   **Chiffrement de bout en bout** pour des mises à jour sécurisées.
-   **Intégration CI/CD** avec des plateformes comme [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), et [Azure DevOps](https://azure.microsoft.com/en-us/products/devops).
-   **Attribution utilisateur** pour des déploiements contrôlés.
-   Outils pour s'assurer que les mises à jour respectent les politiques d'Apple.

Une fois votre application prête, utilisez le CLI Capgo pour pousser les mises à jour. Le système gérera automatiquement le contrôle de version, le chiffrement et la distribution, vous gardant conforme aux règles d'Apple.

## Sécurité des données pendant les mises à jour

La sécurisation des données pendant les mises à jour en direct est cruciale pour rester conforme aux réglementations et protéger les informations des utilisateurs. Cela joue également un rôle clé dans le maintien de la confiance des utilisateurs.

### Exigences de chiffrement

Le chiffrement de bout en bout est indispensable pour sécuriser les mises à jour en direct dans les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Il garantit que les données de mise à jour restent protégées lors de leur transfert du serveur à l'appareil. La solution de mise à jour en direct de Capgo applique ces standards de chiffrement. Selon Capgo : "Chiffrement de bout en bout. Seuls vos utilisateurs peuvent déchiffrer vos mises à jour, personne d'autre" [\[1\]](https://capgo.app/). Cette approche de chiffrement est essentielle pour protéger efficacement les données utilisateur.

### Protection des données utilisateur

Le cadre de sécurité de Capgo garantit que seuls les utilisateurs autorisés peuvent déchiffrer les mises à jour. En limitant l'accès, il aide à protéger les données utilisateur tout au long du processus de mise à jour et minimise le risque d'accès non autorisé.

## Tests et soumission à l'App Store

Des tests approfondis avant la publication sont essentiels pour une soumission fluide à l'App Store et le respect des standards de conformité.

### Tests pré-publication

La fonctionnalité d'attribution utilisateur de Capgo vous permet de tester les mises à jour avec des groupes d'utilisateurs spécifiques avant de les déployer à tous. Cette approche contrôlée garantit que vos stratégies de [chiffrement et de protection des données](https://capgo.app/docs/cli/migrations/encryption/) fonctionnent efficacement.

Voici un exemple de la façon dont Capgo a géré un déploiement pour plus de 5 000 utilisateurs :

> "Nous avons déployé les mises à jour OTA Capgo en production pour notre base utilisateur de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour en quelques minutes après le déploiement de l'OTA sur @Capgo." [\[1\]](https://capgo.app/)

Pour assurer un déploiement réussi, suivez ces étapes :

-   Commencez par des tests internes.
-   Étendez à un petit groupe d'utilisateurs externes.
-   Augmentez progressivement la base d'utilisateurs.
-   Surveillez les temps de livraison et les taux de réussite des mises à jour.

Une fois les tests terminés, vous devrez documenter ces étapes pour le processus de révision App Store.

### Directives de révision d'application

Lors de la soumission de votre application, il est important de démontrer la conformité aux directives d'Apple.

> "@Capgo est un outil indispensable pour les développeurs qui veulent être plus productifs. Éviter la révision pour les corrections de bugs est précieux." - Bessie Cooper [\[1\]](https://capgo.app/)

Apple exige une documentation spécifique, notamment :

-   **Documentation claire** : Une explication détaillée de la livraison des mises à jour.
-   **Protocoles de sécurité** : Preuve des mesures de chiffrement et de protection des données.
-   **Portée des mises à jour** : Une analyse des types de contenu mis à jour.
-   **Preuves de test** : Données montrant des tests approfondis et des métriques de performance.

| Domaine de révision | Documentation requise |
| --- | --- |
| Mesures de sécurité | Protocoles de chiffrement, sécurité des données |
| Mécanisme de mise à jour | Détails techniques de l'implémentation |
| Changements de contenu | Portée définie des mises à jour |
| Résultats des tests | Métriques de stabilité et performance |

Fournir une documentation claire et détaillée sur les processus de sécurité et de mise à jour peut simplifier le processus de soumission et aider à éviter les retards.

## Conformité post-lancement

Après le lancement de votre application, rester conforme aux directives de l'App Store nécessite une surveillance constante et des ajustements rapides. Les développeurs doivent suivre les mises à jour et s'adapter à tout changement dans les directives pour assurer une conformité continue.

### Suivi des mises à jour

Pour maintenir votre application en conformité avec les politiques de l'App Store, concentrez-vous sur ces domaines clés :

| Zone de surveillance | Métriques clés | Actions à entreprendre |
| --- | --- | --- |
| Vitesse de distribution | Temps de livraison des mises à jour | Mesurer la rapidité avec laquelle les mises à jour atteignent les utilisateurs. |
| Taux de réussite | % de completion des mises à jour | Enquêter sur les mises à jour échouées et leurs causes. |
| Couverture utilisateur | Mises à jour des utilisateurs actifs | S'assurer que les mises à jour atteignent tous les segments d'utilisateurs. |
| État de la sécurité | Validation du chiffrement | Vérifier l'intégrité du chiffrement de bout en bout. |

Ces métriques fournissent la base pour s'adapter rapidement lorsque les directives changent.

### Réponse aux mises à jour des politiques

Le suivi de ces métriques ne concerne pas uniquement la performance - il vous aide également à identifier les domaines qui pourraient nécessiter une attention immédiate lorsqu'Apple met à jour ses politiques. Voici comment réagir :

1.  **Examiner les changements :** Examinez les nouvelles directives et déterminez leur impact sur votre processus de mise à jour actuel.
2.  **Audit technique :** Confirmez que vos mécanismes de mise à jour sont conformes aux exigences révisées.
3.  **Vérification de la sécurité :** Revérifiez que vos protocoles de chiffrement répondent aux normes mises à jour.
4.  **Mise à jour de la documentation :** Actualisez votre documentation de conformité pour refléter les dernières directives.

L'utilisation d'outils conçus en tenant compte des exigences d'Apple peut simplifier ce processus. Par exemple, Capgo offre des fonctionnalités comme le chiffrement de bout en bout et l'attribution des utilisateurs, facilitant le maintien de la conformité tout en livrant efficacement les mises à jour [\[1\]](https://capgo.app/).

Surveillez régulièrement la conformité de votre application via votre [plateforme de gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Rester proactif peut vous aider à détecter et résoudre les problèmes potentiels avant qu'ils n'affectent votre position sur l'App Store, maintenant votre stratégie de mise à jour en direct à la fois efficace et conforme aux règles.

## Conclusion

Équilibrer la vitesse et la conformité est essentiel lors de l'implémentation des mises à jour en direct dans les applications Capacitor. Avec les bons outils, l'efficacité des versions peut s'améliorer jusqu'à 81% [\[1\]](https://capgo.app/), facilitant le respect des directives d'Apple.

Les plateformes comme Capgo montrent qu'il est possible de répondre aux exigences de l'App Store tout en livrant des mises à jour rapides [\[1\]](https://capgo.app/). Les règles strictes d'Apple concernant les mises à jour en direct soulignent l'importance de rester conforme.

Pour assurer la conformité à long terme, concentrez-vous sur ces pratiques :

-   Utilisez le chiffrement de bout en bout pour toutes les mises à jour.
-   Intégrez harmonieusement les mises à jour dans vos flux de travail CI/CD.
-   Surveillez régulièrement les métriques de mise à jour.
-   Restez préparé aux changements de politique.
