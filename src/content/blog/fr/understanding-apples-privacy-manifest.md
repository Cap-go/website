---
slug: understanding-apples-privacy-manifest
title: Comprendre le manifeste de confidentialité d'Apple
description: >-
  Explorons l'importance de la déclaration de confidentialité requise par Apple
  pour les applications iOS et comment s'y conformer efficacement, avec des
  directives claires.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: Développement Mobile
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: fr
next_blog: ''
---

**Le Privacy Manifest d'Apple est désormais obligatoire pour toutes les applications iOS** À partir de mai 2024, chaque soumission à l'App Store doit inclure ce fichier JSON pour détailler la collecte de données, l'utilisation des API, les SDK tiers et les domaines réseau. Voici ce que vous devez savoir :

-   **De quoi s'agit-il** : Un fichier de configuration JSON qui déclare :
    -   Les données collectées et leur finalité
    -   Les API et SDK tiers utilisés
    -   Les domaines externes accédés
-   **Pourquoi c'est important** : Assure la transparence et la conformité aux normes de confidentialité d'Apple
-   **Comment se conformer** : Ajoutez le manifeste à votre bundle d'application iOS et mettez-le à jour régulièrement, particulièrement si vous utilisez des outils de mise à jour en direct comme [Capgo](https://capgo.app/)

**Conseil rapide** : Des outils comme Capgo simplifient la conformité en automatisant les mises à jour du manifeste, offrant des déploiements instantanés et fournissant des analyses pour suivre le succès

Continuez la lecture pour apprendre comment configurer et vérifier votre Privacy Manifest, éviter les pièges courants et assurer des mises à jour fluides

## WWDC23 : Démarrer avec les manifestes de confidentialité | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Éléments principaux du Privacy Manifest

Le Privacy Manifest d'Apple comprend trois composants principaux :

1.  **Déclaration des données** : Spécifiez les types de données que votre application collecte, pourquoi elles sont collectées, les API sensibles à la confidentialité qu'elle utilise, et tous les SDK tiers intégrés. Vous devez également fournir une raison commerciale claire pour chacun

2.  **Domaines externes** : Listez tous les domaines externes avec lesquels votre application communique, expliquez le but de la communication et détaillez les mesures de sécurité en place

3.  **Format JSON et intégration** : Suivez la structure JSON requise par Apple pour le manifeste et assurez-vous qu'il est intégré dans votre bundle d'application et tous les packages de mise à jour en direct

Ensuite, nous verrons comment créer et vérifier votre manifeste dans un projet Capacitor

## Configuration du Privacy Manifest dans [Capacitor](https://capacitorjs.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1.jpg)

### Création du fichier manifeste

Commencez par ajouter un fichier nommé `ios/App/Resources/PrivacyInfoxcprivacy` pour déclarer l'utilisation des API et la collecte de données de votre application. Voici un exemple de ce à quoi pourrait ressembler le fichier :

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

Après avoir créé ce fichier, ouvrez [Xcode](https://developer.apple.com/xcode/) pour vous assurer qu'il est correctement inclus dans votre projet

### Tests et vérification

Dans Xcode, naviguez vers **Product > Analyze** pour générer un rapport de confidentialité. Examinez attentivement le rapport pour détecter les avertissements ou les API non déclarées, et effectuez les ajustements nécessaires pour éviter les problèmes. Une fois tout vérifié, procédez au déploiement de vos mises à jour

### Mises à jour avec [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Après avoir passé l'analyse Xcode, utilisez Capgo pour les mises à jour en direct afin de maintenir à jour le manifeste de confidentialité de votre application. Capgo fournit :

-   **Déploiements instantanés** : 95% des utilisateurs reçoivent les mises à jour dans les 24 heures [\[1\]](https://capgo.app/)
-   **Retour en arrière en un clic** pour des corrections rapides
-   **Outils d'analyse** pour suivre le succès des mises à jour et assurer la conformité

Le plan Team de Capgo est proposé à 83$ par mois (facturation annuelle), prenant en charge jusqu'à 100 000 utilisateurs actifs mensuels (MAU) et 2 000 Go de bande passante

## Directives de conformité en matière de confidentialité

Après avoir vérifié votre manifeste dans Xcode, il est important de s'assurer que la conformité en matière de confidentialité reste intacte. Voici comment maintenir les choses sur la bonne voie

### Pratiques recommandées

Envisagez d'utiliser Capgo pour pousser les mises à jour du manifeste instantanément, évitant les retards causés par les examens de l'App Store. Cet outil prend également en charge les déploiements progressifs, vous permettant de tester les changements avec des analyses en temps réel avant de les déployer à tous les utilisateurs [\[1\]](https://capgo.app/)

### Pièges courants

S'appuyer sur les [mises à jour manuelles](https://capgo.app/docs/plugin/cloud-mode/manual-update/) peut être lent, car elles dépendent des temps d'examen de l'App Store, qui peuvent prendre des jours voire des semaines. Cela laisse souvent la documentation obsolèteD'autre part, les outils automatisés permettent des mises à jour instantanées, fournissent des analyses pour surveiller les déploiements et facilitent le retour en arrière si quelque chose ne va pas [\[1\]](https://capgo.app/)

### Mises à jour manuelles vs automatisées

Voici une comparaison rapide des méthodes de mise à jour manuelles et automatisées :

-   **Vitesse de livraison** : Les mises à jour manuelles peuvent prendre des jours ou des semaines, tandis que les [mises à jour automatisées](https://capgo.app/docs/live-updates/update-behavior/) atteignent 95% des utilisateurs en 24 heures [\[1\]](https://capgo.app/)
-   **Suivi du succès** : Les méthodes manuelles varient, mais les mises à jour automatisées atteignent un taux de réussite de 82% dans le monde [\[1\]](https://capgo.app/)
-   **Options de retour en arrière** : Les mises à jour manuelles offrent une récupération limitée, tandis que les mises à jour automatisées permettent des retours immédiats
-   **Surveillance** : Les vérifications manuelles prennent du temps, tandis que les outils automatisés fournissent des analyses en temps réel [\[1\]](https://capgo.app/)
-   **Distribution** : Les systèmes manuels sont basiques, tandis que les outils automatisés prennent en charge des canaux de distribution avancés [\[1\]](https://capgo.app/)
-   **Sécurité** : Les mises à jour manuelles manquent de chiffrement intégré, tandis que les systèmes automatisés utilisent le chiffrement de bout en bout [\[1\]](https://capgo.app/)

## Comparaison des outils de mise à jour en direct

Plongeons dans une comparaison de deux plateformes de mise à jour en direct populaires et voyons comment elles se comparent

### Fonctionnalités et tarifs des plateformes

| Fonctionnalité | Capgo | [Appflow](https://ionicio/appflow/) |
| --- | --- | --- |
| Chiffrement de bout en bout | **Oui** | \-  |
| Taux de réussite des mises à jour | **82% mondial** [\[1\]](https://capgo.app/) | \-  |
| Temps de livraison des mises à jour | **95% en 24h** [\[1\]](https://capgo.app/) | \-  |
| Vitesse de téléchargement | **114 ms (5 MB)** [\[1\]](https://capgo.app/) | \-  |
| Coût annuel (Plan équipe) | **996 €** | **6 000 €** [\[1\]](https://capgo.app/) |

**En bref** : Capgo offre un coût de première année beaucoup plus bas - 996 € contre 6 000 € pour Appflow

Maintenant, voyons comment Capgo se démarque spécifiquement pour les mises à jour du Privacy Manifest

### Privacy Manifest : Avantages de Capgo

Le code source ouvert de Capgo en fait un choix solide pour la gestion des mises à jour du Privacy Manifest. Il permet des ajustements rapides pour répondre aux normes de confidentialité en évolution, garantissant une conformité gérable [\[1\]](https://capgo.app/)

## Résumé

Depuis mai 2024, toutes les applications iOS doivent se conformer aux exigences obligatoires du manifest. L'automatisation peut grandement faciliter la gestion de ces manifests. Pour les projets Capacitor, incluez votre manifest dans le bundle iOS et utilisez des outils comme Capgo pour automatiser les mises à jour en toute sécurité, grâce à son chiffrement de bout en bout.

Une fois votre manifest configuré et les mises à jour automatisées, voici quelques pratiques clés pour assurer des mises à jour fluides du Privacy Manifest :

-   Utilisez des outils CLI pour simplifier le déploiement
-   Mettez en place des systèmes de canaux pour des déploiements contrôlés
-   Maintenez une documentation détaillée de vos processus de collecte de données
-   Testez et vérifiez régulièrement la conformité en matière de confidentialité
