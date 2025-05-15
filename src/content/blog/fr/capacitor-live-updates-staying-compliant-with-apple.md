---
slug: capacitor-live-updates-staying-compliant-with-apple
title: 'Mises à jour en direct de Capacitor : Rester conforme avec Apple'
description: >-
  Apprenez à mettre en œuvre efficacement des mises à jour en direct dans les
  applications mobiles tout en assurant le respect des directives strictes pour
  éviter les rejets.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-12T03:03:33.472Z
updated_at: 2025-03-18T13:14:16.420Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d0d3f9cf9d4dc0b2c0bff2-1741748627082.jpg
head_image_alt: Développement mobile
keywords: >-
  Capacitor, live updates, app compliance, Apple guidelines, encryption, bug
  fixes, mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) les mises à jour en direct permettent aux développeurs de déployer des corrections de bogues et des modifications mineures directement dans les applications sans que les utilisateurs aient besoin de télécharger des mises à jour depuis l'[App Store](https://www.apple.com/app-store/). Cela accélère le déploiement jusqu'à **81%**, réduit les coûts et améliore l'expérience utilisateur. Cependant, il est essentiel de rester conforme aux directives strictes d'Apple pour éviter les rejets d'applications.

### Points clés :

-   **Mises à jour autorisées** : Corrige des bogues, ajustements de l'interface utilisateur et mises à jour de contenu dans le cadre de l'objectif original de l'application.
-   **Mises à jour interdites** : Changements majeurs de fonctionnalités ou mises à jour de la fonctionnalité principale (exigent un examen de l'App Store).
-   **Sécurité** : Le chiffrement de bout en bout est obligatoire pour protéger les données utilisateur.
-   **Outils** : [Capgo](https://capgo.app/) simplifie la gestion des mises à jour en direct, garantissant la conformité avec les règles d'Apple.

| **Type de mise à jour** | **Autorisé** | **Approbation nécessaire** |
| --- | --- | --- |
| Corrections de bogues | Oui | Non |
| Améliorations de l'interface utilisateur | Oui | Parfois |
| Mises à jour de contenu | Oui | Non |
| Changements de fonctionnalités | Non | Oui |
| Correctifs de sécurité | Oui | Non |

Pour rester conforme, concentrez-vous sur les corrections de bogues, sécurisez les mises à jour avec le cryptage et documentez toutes les modifications. Des outils comme Capgo aident à gérer les mises à jour pour plus de **20 millions d'utilisateurs**, garantissant que les applications restent conformes tout en livrant les mises à jour rapidement.

## [Appflow](https://ionic.io/appflow/live-updates) Mises à jour en direct : déployez des mises à jour instantanées directement à vos utilisateurs

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionic.io-f18932d1af08bf70cb14b84540039486-2025-03-12.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Twj-Bx6ZRw8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Règles de mise à jour en direct d'Apple

Apple régule les mises à jour d'applications pour protéger les utilisateurs, il est donc essentiel de comprendre ces règles lors de la mise en œuvre de mises à jour en direct dans les applications Capacitor.

### [App Store](https://www.apple.com/app-store/) Lignes directrices pour les mises à jour

![App Store](https://mars-images.imgix.net/seobot/screenshots/www.apple.com-9d9fbf06f7f9dd70143af6386e59a5d2-2025-03-12.jpg?auto=compress)

Les règles d'Apple définissent clairement ce qui est et n'est pas autorisé avec les mises à jour sans fil (OTA). Voici un aperçu rapide :

| Type de mise à jour | Autorisé | Exigences |
| --- | --- | --- |
| Corrections de bogues | Oui | Ne doit pas changer la fonctionnalité principale |
| Améliorations de l'interface utilisateur | Oui | Limité aux ajustements visuels mineurs |
| Mises à jour de contenu | Oui | Doit rester dans le cadre de l'objectif original de l'application |
| Changements de fonctionnalités | Non | Nécessite un examen de l'App Store |
| Correctifs de sécurité | Oui | Doit inclure un cryptage approprié |

Lors de l'utilisation de mises à jour en direct, les développeurs doivent prioriser la sécurité des données des utilisateurs et utiliser un chiffrement de bout en bout. Des outils comme Capgo sont conçus pour se conformer aux exigences d'Apple, simplifiant le processus.

Comprendre ces règles peut vous aider à éviter les erreurs courantes qui mènent aux rejets d'applications.

### Principales raisons pour lesquelles les applications sont rejetées

De nombreuses applications sont rejetées pour violation des directives de mise à jour d'Apple. Voici quelques problèmes fréquents :

-   **Contourner le processus d'examen** : Ajouter de nouvelles fonctionnalités majeures via des mises à jour en direct plutôt que de les soumettre à l'examen.
-   **Problèmes de confidentialité** : Ne pas sécuriser les données des utilisateurs pendant les mises à jour.
-   **Changements de fonctionnalités principales** : Utiliser des mises à jour en direct pour modifier considérablement le fonctionnement de l'application.

> "Éviter l'examen pour la correction de bogues est précieux." - Bessie Cooper, @bessiecooper [\[1\]](https://capgo.app/)

Cela souligne que les mises à jour en direct doivent se concentrer sur les corrections de bogues, sans introduire de nouvelles fonctionnalités.

Pour rester conforme aux normes d'Apple :

-   Utilisez un cryptage fort pour toutes les mises à jour.
-   Limitez les mises à jour aux corrections de bogues et ajustements mineurs.
-   Tenez des registres détaillés des modifications effectuées.
-   Testez soigneusement les mises à jour avant leur publication.
-   Surveillez régulièrement les changements de politique d'Apple.

Suivre ces étapes contribuera à garantir que vos mises à jour d'applications restent conformes aux directives strictes d'Apple.

## Configuration des mises à jour en direct conformes

Pour mettre en œuvre des mises à jour en direct dans votre [application Capacitor](https://capgo.app/plugins/ivs-player/) tout en respectant les règles de conformité d'Apple, vous aurez besoin d'une configuration structurée. Voici comment vous pouvez commencer.

### Étapes de configuration du projet

Commencez par configurer votre environnement et installer le plugin de mise à jour en direct de Capgo :

-   **Installez les dépendances nécessaires**
    
    -   Utilisez la CLI de Capgo pour installer le plugin de mise à jour en direct et configurer les outils nécessaires. Par exemple :
        
        ```bash
        npx @capgo/cli init
        ```
        
    -   Assurez-vous que votre application inclut un cryptage de bout en bout et un stockage sécurisé pour les fichiers de mise à jour.
        
-   **Configurez les paramètres de mise à jour**
    
    -   Définissez la fréquence des mises à jour.
    -   Planifiez des procédures de rollback en cas de problème.
    -   Conservez un journal détaillé des changements de version.
-   **Implémentez des protocoles de sécurité**
    
    -   Activez le cryptage de bout en bout.
    -   Utilisez des méthodes de transmission sécurisées.
    -   Exigez l'authentification des utilisateurs pour une protection supplémentaire.

### Lignes directrices de contrôle des versions

Gérer correctement les versions des applications est crucial pour rester conforme aux directives d'Apple. Voici un aperçu rapide :

| Type de version | Portée de la mise à jour | Nécessite une approbation |
| --- | --- | --- |
| Patch (x.x.1) | Corrections de bogues | Non |
| Mineur (x.1.x) | Ajustements de l'interface utilisateur | Parfois |
| Majeur (1.x.x) | Mises à jour de fonctionnalités | Oui |

Conservez une documentation détaillée de toutes les modifications pour faciliter le processus d'examen de l'App Store.

### [Capgo](https://capgo.app/) : Gestion des mises à jour en direct

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-12.jpg?auto=compress)

Capgo simplifie la gestion des mises à jour en direct et garantit la conformité avec les exigences d'Apple. Il a déjà soutenu plus de **947,6 millions de mises à jour** à travers **1 400+ applications en production** [\[1\]](https://capgo.app/).

Certaines de ses caractéristiques remarquables incluent :

-   **Chiffrement de bout en bout** pour des mises à jour sécurisées.
-   **Intégration CI/CD** avec des plateformes comme [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/) et [Azure DevOps](https://azure.microsoft.com/en-us/products/devops).
-   **Attribution d'utilisateurs** pour des déploiements contrôlés.
-   Outils pour garantir que les mises à jour sont conformes aux politiques d'Apple.

Une fois votre application prête, utilisez la CLI de Capgo pour pousser les mises à jour. Le système gérera automatiquement le contrôle des versions, le chiffrement et la distribution, vous maintenant conforme aux règles d'Apple.

###### sbb-itb-f9944d2

## Sécurité des données pendant les mises à jour

Sécuriser les données pendant les mises à jour en direct est crucial pour rester conforme aux réglementations et protéger les informations des utilisateurs. Cela joue également un rôle clé dans le maintien de la confiance des utilisateurs.

### Exigences de chiffrement

Le chiffrement de bout en bout est indispensable pour maintenir la sécurité des mises à jour en direct dans les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Il garantit que les données de mise à jour restent protégées lorsqu'elles transitent du serveur à l'appareil. La solution de mise à jour en direct de Capgo impose ces normes de chiffrement. Selon Capgo : "Le chiffrement de bout en bout. Seuls vos utilisateurs peuvent déchiffrer vos mises à jour, personne d'autre" [\[1\]](https://capgo.app/). Cette approche de chiffrement est essentielle pour protéger les données des utilisateurs de manière efficace.

### Protection des données utilisateur

Le cadre de sécurité de Capgo garantit que seuls les utilisateurs autorisés peuvent déchiffrer les mises à jour. En limitant l'accès, il contribue à protéger les données des utilisateurs tout au long du processus de mise à jour et réduit le risque d'accès non autorisé.

## Tests et soumission à l'App Store

Des tests approfondis avant la sortie sont essentiels pour une soumission fluide à l'App Store et le respect des normes de conformité.

### Tests pré-lancement

La fonctionnalité d'attribution d'utilisateurs de Capgo vous permet de tester les mises à jour avec des groupes d'utilisateurs spécifiques avant de les déployer à tous. Cette approche contrôlée garantit que vos [stratégies de chiffrement et de protection des données](https://capgo.app/docs/cli/migrations/encryption/) fonctionnent efficacement.

Voici un exemple de la façon dont Capgo a géré un déploiement pour plus de 5 000 utilisateurs :

> "Nous avons déployé des mises à jour OTA Capgo en production pour notre base d'utilisateurs de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour quelques minutes après le déploiement de l'OTA à @Capgo." [\[1\]](https://capgo.app/)

Pour garantir un déploiement réussi, suivez ces étapes :

-   Commencez par un test interne.
-   Étendez à un petit groupe d'utilisateurs externes.
-   Élargissez progressivement la base d'utilisateurs.
-   Surveillez les délais de livraison des mises à jour et les taux de succès.

Une fois les tests terminés, vous devrez documenter ces étapes pour le processus d'examen de l'App Store.

### Lignes directrices concernant l'examen des applications

Lors de la soumission de votre application, il est important de montrer la conformité avec les directives d'Apple.

> "@Capgo est un outil indispensable pour les développeurs qui souhaitent être plus productifs. Éviter l'examen pour la correction de bogues est précieux." - Bessie Cooper [\[1\]](https://capgo.app/)

Apple exige une documentation spécifique, notamment :

-   **Documentation claire** : Une explication détaillée de la manière dont les mises à jour sont livrées.
-   **Protocoles de sécurité** : Preuve du chiffrement et des mesures de protection des données.
-   **Portée de la mise à jour** : Un aperçu des types de contenu pouvant être mis à jour.
-   **Preuves de test** : Données montrant des tests approfondis et des indicateurs de performance.

| Domaine de concentration d'examen | Documentation requise |
| --- | --- |
| Mesures de sécurité | Protocoles de chiffrement, sécurité des données |
| Mécanisme de mise à jour | Détails techniques de mise en œuvre |
| Changements de contenu | Portée définie des mises à jour |
| Résultats de test | Indicateurs de stabilité et de performance |

Fournir une documentation claire et détaillée sur les processus de sécurité et de mise à jour peut simplifier le processus de soumission et aider à éviter des retards.

## Conformité après lancement

Après le lancement de votre application, rester conforme aux directives de l'App Store nécessite une surveillance constante et des ajustements rapides. Les développeurs doivent suivre les mises à jour et s'adapter à tout changement dans les directives pour garantir une conformité continue.

### Suivi des mises à jour

Pour garder votre application en conformité avec les politiques de l'App Store, concentrez-vous sur ces domaines clés :

| Zone de Surveillance | Indicateurs Clés | Actions à Entreprendre |
| --- | --- | --- |
| Vitesse de Distribution | Mettre à jour le temps de livraison | Mesurer la rapidité avec laquelle les mises à jour atteignent les utilisateurs. |
| Taux de Réussite | % de Complétions de Mises à Jour | Enquêter sur les mises à jour échouées et leurs causes. |
| Couverture Utilisateur | Mises à jour des utilisateurs actifs | S'assurer que les mises à jour atteignent tous les segments d'utilisateurs. |
| État de Sécurité | Validation de l'encryption | Vérifier l'intégrité de l'encryption de bout en bout. |

Ces indicateurs fournissent la base pour s'adapter rapidement lorsque les directives changent.

### Réponse à la Mise à Jour de la Politique

Le suivi de ces indicateurs ne concerne pas seulement la performance - cela vous aide également à identifier les domaines qui pourraient nécessiter une attention immédiate lorsque Apple met à jour ses politiques. Voici comment répondre :

1.  **Réviser les Changements :** Examiner les nouvelles directives et déterminer leur impact sur votre processus de mise à jour actuel.
2.  **Audit Technique :** Confirmer que vos mécanismes de mise à jour sont conformes aux exigences révisées.
3.  **Vérification de Sécurité :** Vérifier que vos protocoles d'encryption répondent aux normes mises à jour.
4.  **Mise à Jour de la Documentation :** Mettre à jour votre documentation de conformité pour refléter les dernières directives.

Utiliser des outils conçus en tenant compte des exigences d'Apple peut simplifier ce processus. Par exemple, Capgo offre des fonctionnalités telles que l'encryption de bout en bout et l'attribution d'utilisateurs, ce qui facilite le respect des règles tout en fournissant des mises à jour efficacement [\[1\]](https://capgo.app/).

Surveillez régulièrement la conformité de votre application via votre [plateforme de gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Rester proactif peut vous aider à détecter et résoudre des problèmes potentiels avant qu'ils n'affectent votre position dans l'App Store, maintenant ainsi une stratégie de mises à jour en direct à la fois efficace et conforme.

## Conclusion

Équilibrer vitesse et conformité est essentiel lors de l'implémentation de mises à jour en direct dans les applications Capacitor. Avec les bons outils, l'efficacité des sorties peut s'améliorer jusqu'à 81% [\[1\]](https://capgo.app/), facilitant ainsi le respect des directives d'Apple.

Des plateformes comme Capgo montrent qu'il est possible de répondre aux exigences de l'App Store tout en fournissant des mises à jour rapides [\[1\]](https://capgo.app/). Les règles strictes d'Apple concernant les mises à jour en direct soulignent l'importance de rester conforme.

Pour garantir une conformité à long terme, concentrez-vous sur ces pratiques :

-   Utilisez l'encryption de bout en bout pour toutes les mises à jour.
-   Intégrez sans faille les mises à jour dans vos workflows CI/CD.
-   Surveillez régulièrement les indicateurs de mise à jour.
-   Restez préparé aux changements de politique.
