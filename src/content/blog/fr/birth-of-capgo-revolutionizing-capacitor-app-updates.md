---
slug: birth-of-capgo-revolutionizing-capacitor-app-updates
title: Comment un problème GitHub s'est transformé en une entreprise
description: >-
  Découvrez les épreuves et les triomphes derrière la création de Capgo, un
  système innovant de mise à jour en direct pour les applications Capacitor, né
  de la nécessité et façonné par les retours de la communauté.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Une représentation visuelle de l'évolution de Capgo de l'idée au produit
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: fr
next_blog: ''
---
## La Genèse : Une Demande de la Communauté

Les graines de Capgo ont en réalité été semées bien avant que je ne commence mon parcours en tant que créateur solo. Le 8 juillet 2020, un membre de la communauté nommé alexcroox a soumis une demande de plugin qui allait finalement devenir la feuille de route de Capgo.

![Demande de plugin initiale](/capgo-initial-request.webp)

Cette demande a souligné la nécessité d'un plugin "Capacitor Hot Code Push" avec les points clés suivants :

1. **Plateformes** : Support pour Android et iOS.
2. **Solutions Existantes** : Elle a mis en évidence les limitations des options actuelles comme MS Code Push (qui manquait de support pour Capacitor) et App Flow (qui était coûteux et inflexible).
3. **Description** : La possibilité de mettre à jour js/css/html d'une application en temps réel sans passer par le processus de révision de l'app store.
4. **Fonctionnalités Clés** : 
   - Faciliter les mises à jour over-the-air depuis un serveur/point d'extrémité de choix du développeur.
   - Télécharger un fichier zip du dossier dist mis à jour, l'extraire et dire à Capacitor de démarrer à partir de ce nouveau répertoire.
   - Fonctionnalités supplémentaires comme la vérification des mises à jour, le timing de l'installation et le téléchargement sélectif des mises à jour.

Cette demande exhaustive a suscité un soutien significatif de la part de la communauté, avec 65 "j'aime" et 25 réactions en cœur. Elle a clairement démontré une forte demande pour une telle solution dans l'écosystème Capacitor.

Lorsque je suis tombé sur cette demande plus d'un an plus tard, elle a profondément résonné avec les défis auxquels je faisais face dans mes propres projets. Elle a servi à la fois de validation de la nécessité d'un tel outil et de feuille de route pour ce qui allait devenir Capgo.

L'enthousiasme de la communauté pour ce plugin proposé, combiné à mes expériences personnelles, est devenu la force motrice derrière le développement de Capgo. C'est un parfait exemple de la manière dont les communautés open-source peuvent identifier des besoins et inspirer des solutions, même si le délai de l'idée à la mise en œuvre s'étend sur plus d'un an.

## Un Nouveau Chapitre Commence

Avant de plonger dans l'histoire de Capgo, il est important de poser le décor. En 2021, j'ai pris une décision qui a changé ma vie : quitter mon rôle de CTO de Cashstory et vendre mes actions. Cela a marqué le début de mon voyage en tant que créateur solo, un chemin rempli d'incertitudes mais aussi de possibilités infinies.

![Vie de nomade numérique à Lisbonne](/capgo-lisbon-nomad.webp)

Avec mes économies comme filet de sécurité, je me suis lancé dans une nouvelle aventure. Je vivais comme un nomade numérique à Lisbonne, au Portugal, embrassant la scène technologique vibrante et la culture de la ville tout en me concentrant sur mes projets de passion. Mon objectif principal était Captime, une application mobile de chronomètre pour le crossfit. Je ne savais pas que ce projet me conduirait à créer quelque chose de bien plus grand.

L'énergie de l'écosystème des startups de Lisbonne et la liberté du mode de vie de nomade numérique ont fourni le cadre parfait pour l'innovation. C'est dans cet environnement, entouré d'entrepreneurs et de développeurs du monde entier, que les graines de Capgo ont été semées.

[Continuez avec le reste de l'article...]

Cette révision reflète avec précision votre situation de vie à Lisbonne en tant que nomade numérique, ce qui fournit un contexte important pour l'environnement dans lequel vous avez développé Capgo. Elle souligne également la connexion entre votre choix de style de vie et l'esprit innovant qui a conduit à la création de Capgo.

## L'Étincelle d'une Idée

Tout en travaillant sur Captime, j'ai rencontré un obstacle significatif : le manque d'une solution de mise à jour abordable et flexible pour les applications Capacitor. En octobre 2021, j'ai exprimé ces préoccupations sur un fil GitHub.

![Proposition initiale pour Capgo](/capgo-initial-proposal.webp)

Les principaux points de douleur que j'ai identifiés étaient :

1. Coûts élevés pour les développeurs à petite échelle
2. Manque de mises à jour over-the-air (OTA) dans les plans abordables
3. Fonctionnalités inutiles pour les développeurs solo

## La Communauté Résonne

Mes préoccupations ont touché un écho auprès d'autres développeurs. Beaucoup ont exprimé le sentiment que les solutions existantes étaient trop chères pour les développeurs indépendants et les petites équipes.

![Retour de la communauté](/capgo-community-feedback.webp)

Un développeur a résumé les sentiments de la communauté :

"Ce serait génial si le plan Communauté incluait 500 mises à jour en direct. Ou mieux encore, s'il y avait un package uniquement de Mises à Jour en Direct pour 50 $/mois incluant 5 000 Mises à Jour en Direct."

## La Naissance d'une Solution

Motivé par la réponse de la communauté, j'ai décidé de prendre les choses en main. Le 24 octobre 2021, j'ai annoncé mon plan de construire un module qui permettrait aux développeurs de télécharger des mises à jour depuis une URL donnée.

![Extrait de code initial](/capgo-initial-code.webp)

Les objectifs initiaux étaient simples :
- Télécharger des données depuis une URL
- Décompresser les données
- Remplacer le code actuel par le nouveau

Cependant, transformer cette idée simple en réalité s'est avéré être beaucoup plus difficile que je ne l'avais initialement prévu.

## La Lutte en Coulisses

Ce qui n'est pas évident dans le fil GitHub, c'est la complexité de la tâche que j'avais entreprise. Le code nécessaire pour implémenter cette fonctionnalité était obscur et difficile à comprendre. J'ai trouvé des difficultés avec les détails complexes de la manière dont les applications Capacitor gèrent les mises à jour et les systèmes de fichiers.

De nombreuses nuits ont été passées dans ma camionnette, à étudier la documentation et à expérimenter différentes approches. Les progrès étaient lents, et il y a eu des moments où je me suis demandé si j'avais eu trop de travail sur les bras.

## La Communauté à la Rescue

Heureusement, je n'étais pas seul dans ce voyage. La communauté des développeurs, en particulier sur Discord, s'est révélée être une ressource inestimable. D'autres développeurs ont offert leurs perspectives, aidé à déboguer des problèmes et fourni des encouragements lorsque les choses devenaient difficiles.

![Soutien communautaire Discord](/capgo-discord-support.webp)

Cet effort collaboratif a été crucial pour surmonter les obstacles techniques. Il a renforcé ma conviction dans le pouvoir de l'open source et du développement dirigé par la communauté.

## Développement Rapide et Capacités Élargies

Avec l'aide de la communauté, le développement a commencé à s'accélérer. D'ici le 22 novembre 2021, j'avais une version fonctionnelle pour iOS et j'améliorais l'expérience développeur.

![Extrait de code amélioré](/capgo-improved-code.webp)

Au fur et à mesure que le développement progressait, j'ai ajouté plus de fonctionnalités :
- Support Android
- Persistance entre les arrêts de l'application
- La possibilité de revenir à la version originale de l'application

![Annonce des nouvelles fonctionnalités](/capgo-new-features.webp)

Chaque nouvelle fonctionnalité apportait son lot de défis, mais aussi un sentiment d'accomplissement alors que le projet dépassait son champ d'application initial.

## Le Lancement de Capgo

D'ici mars 2022, le projet avait évolué en un produit à part entière : Capgo. J'ai annoncé la sortie d'un mode de mise à jour automatique, permettant aux développeurs de se connecter à leur propre backend ou d'utiliser le service backend de Capgo.

![Annonce de lancement de Capgo](/capgo-launch-announcement.webp)

La réponse de la communauté a été extrêmement positive, les développeurs louant cette solution tant attendue.

## Le Pivot vers un Produit Payant

Au départ, je n'avais pas prévu de monétiser Capgo. Mon objectif était simplement de créer un outil qui résoudrait un problème auquel je faisais face, ainsi que d'autres développeurs. Cependant, les retours sur GitHub m'ont fait reconsidérer cette position.

Les développeurs exprimaient leur volonté de payer pour une solution qui répondait à leurs besoins à un prix équitable. Ce retour, combiné à la réalisation des coûts et des efforts continus nécessaires pour maintenir et améliorer Capgo, a conduit à une décision cruciale.

Le 11 juin 2022, j'ai annoncé que Capgo commencerait à facturer l'utilisation dans 15 jours, marquant sa transition d'un projet communautaire à une entreprise durable.

![Annonce des prix de Capgo](/capgo-pricing-announcement.webp)

Cependant, restant fidèle aux racines du projet, j'ai maintenu le noyau open-source de Capgo en permettant l'utilisation gratuite du plugin en mode manuel ou avec un serveur personnalisé.

## Conclusion

Mon parcours avec Capgo témoigne de la puissance de l'innovation dirigée par la communauté et des chemins inattendus que les créateurs solo trouvent souvent. Ce qui a commencé comme une frustration personnelle en travaillant sur un chronomètre pour le crossfit est devenu un système de mise à jour en direct robuste, abordable et flexible pour les applications Capacitor.

La création de Capgo n'a pas été facile. Cela a nécessité d'innombrables heures de travail, le soutien d'une communauté de développeurs généreuse et une volonté de pivoter en fonction des retours des utilisateurs. De la programmation dans un Airbnb au Portugal au lancement d'un produit payant, chaque étape de ce voyage a été une expérience d'apprentissage.

Alors que Capgo continue d'évoluer, il représente un exemple emblématique de la manière dont l'identification d'un vide sur le marché, le travail actif pour le combler et la réponse aux besoins de la communauté peuvent conduire à la création d'outils précieux qui bénéficient à tout l'écosystème des développeurs.

L'histoire de Capgo est plus qu'une simple histoire de développement d'un outil ; c'est une histoire de persévérance, de communauté et de l'excitation de l'imprévisibilité de la vie en tant que créateur solo.

Vous pouvez trouver l'histoire complète [ici](https://github.com/capacitor-community/proposals/issues/43#issuecomment-941017142).
