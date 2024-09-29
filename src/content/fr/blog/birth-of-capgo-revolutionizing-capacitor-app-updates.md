---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Comment un problème GitHub est devenu une entreprise
description: >-
  Découvrez les essais et les triomphes derrière la création de Capgo, un
  système innovant de mise à jour en direct pour les applications Capacitor, né
  de la nécessité et façonné par les commentaires de la communauté.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: A visual representation of Capgo's evolution from idea to product
tag: development
published: true
next_blog: ''
locale: fr
---

## The Genesis : une demande de la communauté

Les graines de Capgo ont été plantées bien avant que je commence mon parcours en tant que créateur solo. Le 8 juillet 2020, un membre de la communauté nommé alexcroox a soumis une demande de plugin qui allait éventuellement devenir le modèle de Capgo.

![Demande initiale de plugin](/capgo-initial-requestwebp)

Cette demande soulignait la nécessité d'un plugin « Capacitor Hot Code Push » avec les points clés suivants :

1 **Plateformes** : prise en charge d'Android et d'iOS
2 **Solutions existantes** : elle a mis en évidence les limites des options actuelles telles que MS Code Push (qui ne prenait pas en charge les condensateurs) et App Flow (qui était coûteux et peu flexible)
3 **Description** : La possibilité de mettre à jour le js/css/html d'une application en temps réel sans passer par le processus de révision de l'App Store.
4 **Principales caractéristiques** : 
   - Faciliter les mises à jour en direct à partir d'un serveur/point de terminaison choisi par le développeur
   - Téléchargez un fichier zip du dossier dist mis à jour, extrayez-le et dites à Capacitor de se lancer à partir de ce nouveau répertoire
   - Fonctionnalités supplémentaires telles que la vérification des mises à jour, le calendrier d'installation et le téléchargement sélectif des mises à jour

Cette demande complète a recueilli un soutien important de la communauté, avec 65 likes et 25 réactions cardiaques. Elle démontre clairement une forte demande pour une telle solution dans l'écosystème des condensateurs.

Lorsque je suis tombé sur cette demande plus d'un an plus tard, elle a profondément résonné avec les défis auxquels je faisais face dans mes propres projets. Elle a servi à la fois de validation de la nécessité d'un tel outil et de feuille de route pour ce qui allait devenir Capgo.

L'enthousiasme de la communauté pour ce plugin proposé, combiné à mes expériences personnelles, est devenu la force motrice derrière le développement de Capgo. C'est un exemple parfait de la façon dont les communautés open source peuvent identifier les besoins et inspirer des solutions, même si le délai entre l'idée et la mise en œuvre s'étend sur plus d'un an.


## Un nouveau chapitre commence

Avant de plonger dans l'histoire de Capgo, il est important de préparer le terrain. En 2021, j'ai pris la décision qui a changé ma vie de quitter mon rôle de CTO de Cashstory et de vendre mes actions. Cela a marqué le début de mon parcours en tant que créateur solo, un chemin rempli avec de l'incertitude mais aussi des possibilités infinies

![La vie des nomades numériques à Lisbonne](/capgo-lisbon-nomadwebp)

Avec mes économies comme filet de sécurité, je me suis lancé dans une nouvelle aventure. Je vivais en tant que nomade numérique à Lisbonne, au Portugal, embrassant la scène technologique dynamique et la culture de la ville tout en me concentrant sur mes projets passionnés. Mon objectif principal était Captime, une entreprise mobile. app crossfit timer Je ne savais pas que ce projet m'amènerait à créer quelque chose de beaucoup plus grand

L'énergie de l'écosystème des startups de Lisbonne et la liberté du mode de vie nomade numérique ont fourni le cadre idéal pour l'innovation. C'est dans cet environnement, entouré d'entrepreneurs et de développeurs du monde entier, que les graines de Capgo ont été semées.

[Continuer avec le reste de l'article]

Cette révision reflète fidèlement votre situation de vie à Lisbonne en tant que nomade numérique, ce qui fournit un contexte important pour l'environnement dans lequel vous avez développé Capgo. Elle met également en évidence le lien entre votre choix de style de vie et l'esprit d'innovation qui a conduit à la création de Capgo.
## L'étincelle d'une idée

En travaillant sur Captime, j'ai rencontré un obstacle important : l'absence d'une solution de mise à jour abordable et flexible pour les applications Capacitor. En octobre 2021, j'ai exprimé ces préoccupations sur un fil de discussion GitHub.

![Proposition initiale pour Capgo](/capgo-initial-proposalwebp)

Les principaux points douloureux que j’ai identifiés étaient :

1 Coûts élevés pour les petits développeurs
2 Manque de mises à jour en direct (OTA) dans les forfaits abordables
3 Fonctionnalités inutiles pour les développeurs solo

## La communauté résonne

Mes préoccupations ont touché une corde sensible chez d'autres développeurs. Beaucoup ont fait écho au sentiment selon lequel les solutions existantes étaient trop chères pour les développeurs indépendants et les petites équipes.

![Commentaires de la communauté](/capgo-community-feedbackwebp)

Un développeur a résumé les sentiments de la communauté :

"Ce serait génial si le plan communautaire incluait 500 mises à jour en directOu mieux encore, s'il existait un package Live Update uniquement pour 50 $/mois comprenant 5 000 mises à jour Live »

## La naissance d'une solution

Motivé par la réponse de la communauté, j'ai décidé de prendre les choses en main. Le 24 octobre 2021, j'ai annoncé mon projet de créer un module qui permettrait aux développeurs de télécharger des mises à jour à partir d'une URL donnée.

![Extrait de code initial](/capgo-initial-codewebp)

Les objectifs initiaux étaient simples :
- Télécharger des données à partir d'une URL
- Décompressez les données
- Remplacez le code actuel par le nouveau

Cependant, transformer cette idée simple en réalité s’est avéré bien plus difficile que ce à quoi je m’attendais initialement.

## La lutte dans les coulisses

Ce qui ne ressort pas du fil de discussion GitHub, c'est la complexité de la tâche que j'avais entreprise. Le code requis pour implémenter cette fonctionnalité était obscur et difficile à comprendre. Je me suis retrouvé aux prises avec des détails complexes sur la façon dont les applications Capacitor gèrent les mises à jour et les systèmes de fichiers.

De nombreuses nuits ont été passées dans ma camionnette, à étudier la documentation et à expérimenter différentes approches. Les progrès étaient lents et il y avait des moments où je me demandais si j'avais les yeux plus gros que le ventre.

## La communauté à la rescousse

Heureusement, je n'étais pas seul dans ce voyage. La communauté des développeurs, en particulier sur Discord, s'est avérée être une ressource inestimable. Les autres développeurs ont offert leurs idées, aidé à déboguer les problèmes et fourni des encouragements lorsque les choses se sont compliquées.

![Support de la communauté Discord](/capgo-discord-supportwebp)

Cet effort de collaboration a été crucial pour surmonter les obstacles techniques. Il a renforcé ma croyance dans la puissance de l'open source et du développement communautaire.

## Développement rapide et capacités d'expansion

Avec l'aide de la communauté, le développement a commencé à s'accélérer. Le 22 novembre 2021, j'avais une version fonctionnelle pour iOS et j'améliorais l'expérience du développeur.

![Extrait de code amélioré](/capgo-improved-codewebp)

Au fur et à mesure du développement, j'ai ajouté plus de fonctionnalités :
- Prise en charge d'Android
- Persistance entre les suppressions d'applications
- La possibilité de revenir à la version originale de l'application

![Annonce des nouvelles fonctionnalités](/capgo-new-featureswebp)

Chaque nouvelle fonctionnalité apportait son propre ensemble de défis, mais aussi un sentiment d'accomplissement à mesure que le projet dépassait sa portée initiale.

## Le lancement de Capgo

En mars 2022, le projet était devenu un produit à part entière : Capgo I a annoncé la sortie d'un mode de mise à jour automatique, permettant aux développeurs de se connecter à leur propre backend ou d'utiliser le service backend de Capgo.

![Annonce de lancement de Capgo](/capgo-launch-announcementwebp)

La réponse de la communauté a été extrêmement positive, les développeurs faisant l'éloge de cette solution indispensable.

## Le pivot vers un produit payant

Au départ, je n'avais pas l'intention de monétiser Capgo. Mon objectif était simplement de créer un outil qui résoudrait un problème auquel moi et d'autres développeurs étions confrontés. Cependant, les retours sur GitHub m'ont fait reconsidérer cette position.

Les développeurs exprimaient leur volonté de payer pour une solution répondant à leurs besoins à un prix équitable. Ces commentaires, combinés à la prise de conscience des coûts permanents et des efforts nécessaires pour maintenir et améliorer Capgo, ont conduit à une décision cruciale.

Le 11 juin 2022, j'ai annoncé que Capgo commencerait à facturer l'utilisation dans 15 jours, marquant ainsi sa transition d'un projet communautaire à une entreprise durable.

![Annonce des prix Capgo](/capgo-pricing-announcementwebp)

Cependant, restant fidèle aux racines du projet, j'ai conservé le noyau open source de Capgo en autorisant l'utilisation gratuite du plugin en mode manuel ou avec un serveur personnalisé.

## Conclusion

Mon parcours avec Capgo témoigne de la puissance de l'innovation communautaire et des chemins inattendus sur lesquels se retrouvent souvent les créateurs solo. Ce qui a commencé comme une frustration personnelle alors qu'il travaillait sur une application de minuterie crossfit s'est transformé en une mise à jour en direct robuste, abordable et flexible. système pour les applications de condensateur

La création de Capgo a été loin d'être facileCela a nécessité d'innombrables heures de travail, le soutien d'une généreuse communauté de développeurs et une volonté de s'adapter en fonction des commentaires des utilisateurs. Du codage sur Airbnb au Portugal jusqu'au lancement d'un produit payant, chaque étape de ce voyage a été une expérience d'apprentissage.

À mesure que Capgo continue d'évoluer, il constitue un excellent exemple de la manière dont l'identification d'une lacune sur le marché, le travail actif pour la combler et la réactivité aux besoins de la communauté peuvent conduire à la création d'outils précieux qui profitent à l'ensemble de l'écosystème des développeurs.

L'histoire de Capgo est bien plus que le simple développement d'un outil ; c'est une histoire de persévérance, de communauté et de l'imprévisibilité passionnante de la vie de créateur solo.

Vous pouvez trouver l'histoire complète sur [ici](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)