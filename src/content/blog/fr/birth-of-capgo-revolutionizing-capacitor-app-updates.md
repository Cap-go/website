---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Cómo un Issue de GitHub se Convirtió en un Negocio
description: >-
  Capacitorアプリのための革新的なライブアップデートシステムであるCapgoの開発背景にある試練と成功の物語を、その必要性とコミュニティのフィードバックによって形作られた過程とともに紹介します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: 'Une représentation visuelle de l''évolution de Capgo, de l''idée au produit'
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: fr
next_blog: ''
---

## La Genèse : Une Demande de la Communauté

Les graines de Capgo ont été plantées bien avant que je commence mon parcours en tant que créateur indépendant. Le 8 juillet 2020, un membre de la communauté nommé alexcroox a soumis une demande de plugin qui deviendrait plus tard le plan directeur de Capgo.

![Initial plugin request](/capgo-initial-requestwebp)

Cette demande soulignait le besoin d'un plugin "Capacitor Hot Code Push" avec les points clés suivants :

1. **Plateformes** : Support pour Android et iOS
2. **Solutions Existantes** : Elle mettait en évidence les limitations des options actuelles comme MS Code Push (qui manquait de support Capacitor) et App Flow (qui était coûteux et peu flexible)
3. **Description** : La capacité de mettre à jour js/css/html d'une application en temps réel sans passer par le processus de révision de l'app store
4. **Fonctionnalités Clés** :
   - Faciliter les mises à jour over-the-air depuis un serveur/point d'accès choisi par le développeur
   - Télécharger un fichier zip du dossier dist mis à jour, l'extraire et dire à Capacitor de démarrer depuis ce nouveau répertoire
   - Fonctionnalités supplémentaires comme la vérification des mises à jour, le timing d'installation et le téléchargement sélectif des mises à jour

Cette demande complète a suscité un soutien communautaire important, avec 65 likes et 25 réactions cœur. Elle démontrait clairement une forte demande pour une telle solution dans l'écosystème Capacitor.

Quand j'ai découvert cette demande plus d'un an plus tard, elle faisait écho aux défis auxquels je faisais face dans mes propres projets. Elle a servi à la fois de validation du besoin d'un tel outil et de feuille de route pour ce qui deviendrait Capgo.

L'enthousiasme de la communauté pour ce plugin proposé, combiné à mes expériences personnelles, est devenu la force motrice derrière le développement de Capgo. C'est un exemple parfait de comment les communautés open-source peuvent identifier des besoins et inspirer des solutions, même si le délai entre l'idée et la mise en œuvre s'étend sur plus d'un an.

## Un Nouveau Chapitre Commence

Avant de plonger dans l'histoire de Capgo, il est important de planter le décor. En 2021, j'ai pris une décision qui a changé ma vie en quittant mon rôle de CTO de Cashstory et en vendant mes parts. Cela marquait le début de mon parcours en tant que créateur indépendant, un chemin rempli d'incertitudes mais aussi de possibilités infinies.

![Lisbon digital nomad life](/capgo-lisbon-nomadwebp)

Avec mes économies comme filet de sécurité, je me suis lancé dans une nouvelle aventure. Je vivais comme nomade digital à Lisbonne, au Portugal, embrassant la scène tech vibrante et la culture de la ville tout en me concentrant sur mes projets passionnels. Mon objectif principal était Captime, un minuteur mobile pour crossfit. Je ne savais pas encore que ce projet me conduirait à créer quelque chose de beaucoup plus grand.

L'énergie de l'écosystème startup de Lisbonne et la liberté du style de vie nomade digital ont fourni le cadre parfait pour l'innovation. C'est dans cet environnement, entouré d'entrepreneurs et de développeurs du monde entier, que les graines de Capgo ont été semées.

## L'Étincelle d'une Idée

En travaillant sur Captime, j'ai rencontré un obstacle important - l'absence d'une solution de mise à jour abordable et flexible pour les applications Capacitor. En octobre 2021, j'ai exprimé ces préoccupations sur un fil GitHub.

![Initial proposal for Capgo](/capgo-initial-proposalwebp)

Les principaux points problématiques que j'ai identifiés étaient :

1. Coûts élevés pour les développeurs à petite échelle
2. Absence de mises à jour over-the-air (OTA) dans les plans abordables
3. Fonctionnalités superflues pour les développeurs indépendants

## La Communauté Résonne

Mes préoccupations ont trouvé un écho chez d'autres développeurs. Beaucoup ont fait écho au sentiment que les solutions existantes étaient trop chères pour les développeurs indépendants et les petites équipes.

![Community feedback](/capgo-community-feedbackwebp)

Un développeur a résumé les sentiments de la communauté :

"Ce serait génial si le plan Community incluait 500 mises à jour en direct