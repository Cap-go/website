---
slug: alternative-to-capawesome
title: Alternative à Capawesome
description: >-
  Capawesome a été créé en s'inspirant du système Capgo, son système n'est pas
  aussi complet que Capgo, mais il reste une bonne alternative.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-11T00:00:00.000Z
updated_at: 2024-07-11T00:00:00.000Z
head_image: /appflow_alt.webp
head_image_alt: Illustration alternative de Capawesome Cloud
keywords: >-
  Capawesome Cloud, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Alternatives
published: false
locale: fr
next_blog: ''
---

Capawesome Cloud est une solution alternative à Capgo, disons que c'est son petit frère fait par

Ionic Appflow est une plateforme de développement d'applications mobiles basée sur le cloud qui fournit aux développeurs une gamme d'outils et de services pour créer, tester et déployer rapidement des applications mobiles. Elle offre des fonctionnalités telles que l'intégration et le déploiement continus, les rapports de crash, permettant aux développeurs de suivre les performances de leur application et de s'assurer qu'elle fonctionne correctement pour leurs utilisateurs.

L'une des caractéristiques remarquables d'Ionic Appflow est son support des mises à jour en direct. Cela permet aux développeurs de mettre à jour le contenu et les fonctionnalités de leur application en temps réel, sans que les utilisateurs n'aient à télécharger une nouvelle version de l'application. Cela signifie que les utilisateurs peuvent accéder aux dernières fonctionnalités et améliorations dès qu'elles sont disponibles, sans avoir à passer par le processus de téléchargement et d'installation d'une mise à jour.

Si vous disposez déjà de votre propre solution d'intégration continue mais que vous souhaitez utiliser la fonction de mise à jour en direct d'Ionic Appflow, le coût d'utilisation d'Ionic Appflow peut s'avérer prohibitif. Dans ce cas, vous voudrez peut-être envisager d'utiliser une autre plateforme qui offre des mises à jour en direct à un prix plus abordable.

Une option est Capgo, un plugin Capacitor open-source créé par la société Digital shift OU. [Capgo](/register/) fournit des mises à jour en direct comme Ionic Appflow, et peut être intégré à divers outils d'intégration continue. Cela vous permet de continuer à utiliser votre configuration d'intégration continue existante tout en profitant de la commodité et de la flexibilité des mises à jour en direct.

Bien sûr, il est important pour vous d'évaluer soigneusement les fonctionnalités et les coûts de toute plateforme que vous envisagez d'utiliser, et de choisir la solution qui répond le mieux à vos besoins et à votre budget.

C'est pourquoi nous vous avons fait un tableau clair et simple pour vous aider à comparer.

## Comparaison des fonctionnalités

| Fonctionnalités | Capgo | Capawesome |
| --- | --- | --- |
| Mises à jour en direct | ✅ | ✅ |
| Temps de mise à jour | < 1min | < 10 min |
| Canaux de mise à jour | ✅ | ✅ |
| Essai gratuit | ✅ | ❌ |
| Retour/changement de version de canal | ✅ | ❌ |
| Statistiques d'installation | ✅ | ❌ |
| Application sandbox pour test | ✅ | ❌ |
| Plugin Capacitor | ✅ | ❌ Compatible Cordova |
| Plugin Cordova | ❌ Pourrait être rétro-porté | ✅ |
| Prix abordable | ✅ À partir de 14$/mois | ❌ À partir de 499$/mois |
| Build natif | ❌ | ✅ |
| Chiffrement de bout en bout | ✅ | ❌ uniquement pour le Portail |
| 100% Open source | ✅ | ❌ |
| Portail | ❌ bientôt disponible | ✅ |
| CI/CD | ❌ Tutoriel disponible pour les plus populaires | ✅ |

## Alternatives d'intégration continue

Si vous souhaitez utiliser [Capgo](https://capgo.app/pricing/) pour profiter des mises à jour en direct mais que vous n'avez pas de solution d'intégration continue en place, vous pouvez facilement configurer un workflow d'intégration continue à faible coût en utilisant GitHub Actions. GitHub Actions est un service d'intégration et de déploiement continus gratuit et intégré pour les dépôts GitHub qui permet aux développeurs d'automatiser leurs workflows de développement logiciel.

Pour configurer l'intégration continue avec GitHub Actions et Capgo, vous devrez d'abord créer un dépôt GitHub pour le code de votre application. Ensuite, vous pouvez créer un fichier de workflow dans votre dépôt qui définit les étapes à exécuter chaque fois que du code est poussé vers le dépôt. Par exemple, un fichier de workflow simple pourrait inclure des étapes pour construire et tester l'application, puis utiliser [Capgo](/register/) pour créer une mise à jour en direct et la déployer auprès des utilisateurs de l'application.

Une fois cette configuration en place, chaque fois que vous introduisez des modifications dans le code de votre application et que vous les poussez vers le dépôt GitHub, le fichier de workflow sera déclenché et les étapes spécifiées seront exécutées. Cela vous permet de construire, tester et déployer automatiquement votre application JS avec un minimum d'effort, tout en profitant de la commodité et de la flexibilité des mises à jour en direct.

Globalement, l'utilisation de GitHub Actions et [Capgo](/register/) peut être une solution rentable pour ceux qui veulent utiliser les mises à jour en direct mais n'ont pas leur propre configuration d'intégration continue en place.En utilisant ces outils, les clients peuvent automatiser leur processus de développement d'applications et déployer rapidement et facilement des mises à jour à leurs utilisateurs

Si vous êtes prêt à configurer votre CI/CD avec Capgo, vous pouvez suivre ce [tutoriel pour IOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)

## Allons plus loin

Pour être honnête, j'ai longtemps recommandé Appflow pour les grandes équipes qui ont besoin d'une personne dédiée au support
Mais maintenant, je pense qu'il est temps de changer

Capgo est suffisamment mature pour être utilisé par des équipes de toutes tailles, et c'est beaucoup plus abordable

Si vous êtes une grande équipe qui nécessite une personne dédiée au support, contactez-moi, et nous pourrons trouver une solution ensemble

Même si Capgo est supposé être en libre-service, je suis vraiment présent pour les utilisateurs

Je peux vous aider à configurer votre build pour le code natif également, vous n'avez pas besoin de payer pour Appflow pour le faire

Si vous aimez les outils open-source en libre-service pilotés par la communauté,

Rejoignez-nous ici 👇

## Inscrivez-vous ici pour obtenir votre compte

[Capgo](/register/)