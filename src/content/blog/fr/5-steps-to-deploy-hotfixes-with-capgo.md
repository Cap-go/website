---
slug: 5-steps-to-deploy-hotfixes-with-capgo
title: 5 étapes pour déployer des correctifs avec Capgo
description: >-
  Découvrez comment déployer des correctifs rapidement et en toute sécurité
  grâce à un processus simplifié qui évite les délais de l'app store et garantit
  la conformité.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-13T03:37:11.567Z
updated_at: 2025-03-18T13:14:18.244Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d22ca8233d3a01105fd278-1741837059847.jpg
head_image_alt: Développement Mobile
keywords: 'hotfix deployment, Capgo, app updates, CI/CD tools, mobile development'
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capgo](https://capgo.app/) permet de déployer des correctifs rapidement et facilement, en évitant les délais des app stores tout en gardant les mises à jour sécurisées et conformes aux directives d'Apple et Google. Voici un aperçu rapide du processus :

1. **Créez et testez votre correctif** : Écrivez des modifications de code précises, testez minutieusement sur les appareils et assurez la compatibilité.
2. **[Configurez Capgo](https://capgo.app/docs/webapp/)** : Installez le [CLI Capgo](https://capgo.app/docs/cli/commands) avec `npx @capgo/cli init`, configurez le chiffrement et intégrez-le aux outils CI/CD.
3. **Téléchargez votre correctif** : Utilisez le CLI pour télécharger votre mise à jour de manière sécurisée, étiquetez-la clairement et préparez-la pour le déploiement.
4. **Choisissez les paramètres de mise à jour** : Ciblez des utilisateurs ou des groupes spécifiques, planifiez les déploiements et définissez les exigences de version.
5. **Suivez votre mise à jour** : Surveillez les taux de livraison, la vitesse de mise à jour et la couverture utilisateur. Revenez instantanément en arrière si nécessaire.

Capgo a livré plus de 947,6 millions de mises à jour dans le monde et amélioré l'efficacité des versions de 81% pour ses utilisateurs. C'est l'outil incontournable pour les équipes agiles ayant besoin de déploiements de correctifs rapides et sécurisés.

## Étape 1 : Créer et tester votre correctif

### Écrire le code du correctif

Concentrez-vous sur des modifications précises qui corrigent le bug sans compromettre la stabilité de l'application.

Voici un guide rapide pour structurer votre correctif :

| Bonne pratique | Comment l'appliquer |
| --- | --- |
| **Modifications isolées** | Limitez les changements aux composants affectés. |
| **Contrôle de version** | Utilisez une branche dédiée pour le développement du correctif. |
| **Documentation** | Incluez des commentaires clairs sur la correction et son impact. |
| **Dépendances** | Assurez la compatibilité avec les dépendances existantes de l'application. |

Avec la capacité de mise à jour instantanée de Capgo, vous pouvez vous concentrer sur la correction du bug sans vous soucier d'inclure des modifications non liées. Cette méthode s'est révélée efficace, comme le souligne colenso :

> "Nous avons déployé les [mises à jour OTA de Capgo](https://web.capgo.app/resend_email) en production pour notre base d'utilisateurs de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour quelques minutes après le déploiement de l'OTA sur @Capgo" [\[1\]](https://capgo.app/).

### Tester sur votre appareil

Des tests approfondis sont essentiels pour garantir que le correctif fonctionne parfaitement. Suivez ces étapes :

- **Tests de développement :** Exécutez la correction dans votre environnement de développement local.
- **Tests sur appareil :** Vérifiez la correction sur différents appareils et versions de système d'exploitation.
- **Tests d'intégration :** Confirmez que la correction n'interfère pas avec d'autres fonctionnalités.

Automatisez autant que possible le processus de test en utilisant des outils CI/CD.

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Une fois que votre correctif a passé tous les tests, vous êtes prêt à configurer Capgo pour le déploiement.

## Étape 2 : Configurer [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-13.jpg?auto=compress)

### Installer les packages requis

Pour commencer avec Capgo dans votre projet Capacitor, utilisez son outil CLI. Exécutez simplement la commande suivante :

```bash
npx @capgo/cli init
```

Cette commande fait le gros du travail pour vous :

- Installe le [plugin Capgo](https://capgo.app/plugins/)
- Configure votre projet automatiquement
- Prépare votre projet pour les services Capgo

Une fois l'installation terminée, vous pouvez passer à la configuration de votre projet avec les fonctionnalités de chiffrement et de conformité de Capgo.

### Configurer votre projet

Capgo s'assure que votre projet est prêt avec les normes de chiffrement et de conformité pour Apple et Google. Il fonctionne parfaitement avec les outils CI/CD, chiffre les mises à jour pour la sécurité et respecte les directives des app stores.

| Étape d'intégration | Objectif | Avantage |
| --- | --- | --- |
| **Configuration CI/CD** | Se connecte aux outils CI/CD | Simplifie les déploiements |
| **Chiffrement E2E** | Sécurise la livraison des mises à jour | Maintient l'intégrité du code |
| **Conformité aux plateformes** | Respecte les standards des app stores | Permet une distribution fluide |

Cette configuration a été validée par les développeurs. Comme l'explique Bessie Cooper :

> "@Capgo est un outil indispensable pour les développeurs qui veulent être plus productifs. Éviter la révision pour les corrections de bugs est précieux." [\[1\]](https://capgo.app/)

Pour les équipes plus importantes, Capgo propose des fonctionnalités comme la configuration multi-organisations et la gestion détaillée des permissions. Il s'intègre avec des plateformes comme [GitHub](https://github.com/about), [GitLab](https://about.gitlab.com/), [Azure DevOps](https://azure.microsoft.com/en-us/products/devops), et [Jenkins](https://www.jenkins.io/), rendant les flux de travail de déploiement automatisé simples. Rodrigo Mantica souligne son importance pour les équipes agiles :

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !" [\[1\]](https://capgo.app/)

Une fois votre projet entièrement configuré, vous êtes prêt à télécharger votre correctif et à le déployer instantanément.

## Étape 3 : Télécharger votre correctif

### Envoyer les fichiers à Capgo

Après avoir configuré votre projet, il est temps de télécharger votre correctif en utilisant l'[outil CLI Capgo](https://capgo.app/docs/cli/commands/). Cela garantit un transfert sécurisé et efficace de votre mise à jour. Commencez par construire votre application comme vous le feriez normalement pendant le développement.

Voici comment ça fonctionne :

- Construisez votre application en utilisant votre processus standard.
- Vérifiez que tous les fichiers se compilent sans erreurs.
- Utilisez l'outil CLI Capgo pour télécharger votre mise à jour.

### Étiqueter vos mises à jour

Un étiquetage clair est essentiel pour gérer et suivre vos correctifs. Lors du téléchargement de votre mise à jour sur Capgo, incluez des détails de version spécifiques et des étiquettes descriptives. Cela aide à organiser vos mises à jour et maintient tout le monde sur la même page.

| **Élément d'étiquetage** | **Objectif** | **Bonne pratique** |
| --- | --- | --- |
| Numéro de version | Suit la séquence des mises à jour | Utiliser le versionnage sémantique |
| Description de la mise à jour | Met en évidence les changements clés | Se concentrer sur les corrections et mises à jour principales |
| Notes de version | Communique les changements | Détailler les améliorations spécifiques |

Martin Donadieu, le fondateur de Capgo, a conçu un système de versionnage qui s'intègre parfaitement aux flux de travail CI/CD. Ce système facilite le suivi des mises à jour et le retour en arrière si nécessaire.

La [gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) de Capgo inclut également des fonctionnalités comme le chiffrement de bout en bout et le déploiement instantané, garantissant que vos correctifs sont sécurisés tout en atteignant rapidement les utilisateurs.

Une fois votre correctif téléchargé et étiqueté, passez à l'Étape 4 pour configurer vos paramètres de mise à jour.

###### sbb-itb-f9944d2

## Système de mise à jour en direct Capgo pour les applications [Capacitor](https://capacitorjs.com/)

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-13.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/NzXXKoyhTIo" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Étape 4 : Choisir les paramètres de mise à jour

Une fois que vous avez téléchargé votre correctif, il est temps de configurer les paramètres pour cibler les utilisateurs et définir les critères de déploiement. Cela garantit un déploiement contrôlé et efficace.

### Sélectionner les utilisateurs et les appareils

Les outils d'attribution d'utilisateurs de Capgo vous permettent de cibler précisément qui doit recevoir le correctif. Deux stratégies principales sont disponibles :

| Type de déploiement | Idéal pour | Avantages |
| --- | --- | --- |
| **Tests privés** | Testeurs bêta, équipes QA | Permet des tests contrôlés avec retours rapides |
| **Version publique** | Tous les utilisateurs, déploiements progressifs | Permet une distribution large avec déploiement graduel |

Par exemple, si un bug affecte les utilisateurs d'une région spécifique, vous pouvez prioriser ce groupe pour une validation plus rapide. Après avoir sélectionné votre public cible, vous pouvez procéder à la définition des règles de publication détaillées.

### Définir les règles de publication

Via l'interface web de Capgo, vous pouvez affiner le processus de publication en définissant des paramètres comme le planning, la compatibilité des versions d'application et la progressivité du déploiement de la mise à jour.

Voici les paramètres clés à configurer :

- **Planning de déploiement** : Choisissez des moments spécifiques pour la mise en ligne de la mise à jour.
- **Exigences de version** : Définissez quelles versions de l'application doivent recevoir la mise à jour.
- **Pourcentage de déploiement** : Contrôlez le rythme de la publication, en commençant par un petit groupe et en élargissant progressivement.

Pour les corrections urgentes, vous pouvez opter pour un déploiement immédiat pour résoudre les problèmes rapidement. Pour les mises à jour moins critiques, les déploiements progressifs vous permettent de surveiller les performances et de résoudre les problèmes potentiels au fur et à mesure qu'ils surviennent. De plus, Capgo offre des options pour créer des groupes de test dédiés, rendant la coordination plus fluide et plus efficace.

## Étape 5 : Suivre votre mise à jour

Surveillez la progression de votre correctif et traitez les problèmes dès qu'ils surviennent.

### Vérifier l'état de la mise à jour

Les analyses de Capgo fournissent des informations sur les métriques clés de mise à jour :

| Métrique | Quoi surveiller | Pourquoi c'est important |
| --- | --- | --- |
| **Taux de livraison** | Pourcentage de mises à jour réussies | Montre l'efficacité de votre déploiement |
| **Vitesse de mise à jour** | Temps pour atteindre les utilisateurs cibles | Met en évidence les ralentissements ou goulots d'étranglement |
| **Couverture utilisateur** | Nombre d'appareils mis à jour | Indique combien d'utilisateurs ont reçu la correction |

### Gérer les problèmes

Après avoir examiné ces métriques, soyez prêt à traiter rapidement les défis.

- **Retour en arrière instantané**  
  Si quelque chose ne va pas, la fonction de rollback de Capgo vous permet de revenir instantanément à la version précédente.

- **Analyser les attributions utilisateurs**  
  Vérifiez comment les mises à jour sont distribuées pour repérer si des groupes ou appareils spécifiques rencontrent des problèmes.

- **Surveiller les performances**  
  Utilisez des métriques en temps réel pour identifier et résoudre les problèmes. Les outils de Capgo peuvent aider à déterminer si le problème se situe au niveau de la livraison, de l'installation ou de la compatibilité.

Rodrigo Mantica, développeur business, souligne l'importance de Capgo :

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !" [\[1\]](https://capgo.app/)

L'interface web de Capgo facilite le suivi de la progression de votre mise à jour avec des logs détaillés et des métriques de performance. Ses fonctionnalités de suivi ont aidé les organisations à améliorer l'efficacité des versions jusqu'à 81% [\[1\]](https://capgo.app/), assurant des performances d'application stables tout en traitant rapidement les problèmes.

## Résumé

### Points Principaux

Capgo simplifie le processus de déploiement des correctifs rapidement et efficacement, avec un bilan prouvé de **947,6 millions de mises à jour** sur **1 400 applications en production** [\[1\]](https://capgo.app/).

| Étape | Action | Objectif |
| --- | --- | --- |
| Créer & Tester | Développer et vérifier le correctif localement | Assurer la qualité du code |
| Configurer Capgo | Installer le plugin avec `npx @capgo/cli init` | Simplifier la configuration |
| Télécharger | Transférer les fichiers via la CLI | Permettre une distribution rapide |
| Configurer | Attribuer des utilisateurs et définir des règles | Déployer les mises à jour avec précision |
| Surveiller | Suivre les performances et résoudre les problèmes | Améliorer l'efficacité |

Suivez ces étapes pour intégrer Capgo dans votre flux de travail et optimiser votre processus de mise à jour.

### Premiers Pas

Avant de commencer, prenez un moment pour examiner les étapes ci-dessus. Elles décomposent le processus de déploiement en actions gérables, facilitant sa mise en œuvre.

Démarrez votre intégration Capgo en ajoutant la CLI Capgo à votre projet. Avec le **chiffrement de bout en bout**, la plateforme garantit des mises à jour sécurisées et fiables à chaque fois.

> "Capgo est une solution intelligente pour effectuer des déploiements de code à chaud."

Pour encore plus d'efficacité, intégrez Capgo à vos outils CI/CD comme Azure DevOps, GitLab ou GitHub. Cette configuration permet des déploiements automatisés tout en vous donnant le contrôle sur la distribution des mises à jour grâce aux fonctionnalités d'attribution des utilisateurs.
