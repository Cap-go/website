---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Comment un problème GitHub est devenu une entreprise
description: >-
  Découvrez les défis et les succès dans le développement de Capgo, un système
  innovant de mises à jour en direct pour les applications Capacitor, né d'un
  besoin et façonné par les retours de la communauté.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Une représentation visuelle du développement de Capgo de l'idée au produit
tag: development
published: true
locale: fr
next_blog: ''
---

Voici la traduction en français :

## La Genèse : Une Demande de la Communauté

Les graines de Capgo ont en réalité été plantées bien avant que je ne commence mon parcours en tant que créateur indépendant. Le 8 juillet 2020, un membre de la communauté nommé alexcroox a soumis une demande de plugin qui deviendrait finalement le plan directeur de Capgo.

![Demande initiale de plugin](/capgo-initial-requestwebp)

Cette demande soulignait le besoin d'un plugin "Capacitor Hot Code Push" avec les points clés suivants :

1. **Plateformes** : Prise en charge d'Android et iOS
2. **Solutions existantes** : Elle mettait en évidence les limites des options actuelles comme MS Code Push (qui manquait de support pour Capacitor) et App Flow (qui était coûteux et peu flexible)
3. **Description** : La capacité de mettre à jour le js/css/html d'une application en temps réel sans passer par le processus d'examen de l'app store
4. **Fonctionnalités clés** :
   - Faciliter les mises à jour par voie aérienne depuis un serveur/point de terminaison choisi par le développeur
   - Télécharger un fichier zip du dossier dist mis à jour, l'extraire, et dire à Capacitor de lancer à partir de ce nouveau répertoire
   - Fonctionnalités supplémentaires comme la vérification des mises à jour, le timing d'installation, et le téléchargement sélectif des mises à jour

Cette demande complète a suscité un soutien important de la communauté, avec 65 likes et 25 réactions cœur. Elle démontrait clairement une forte demande pour une telle solution dans l'écosystème Capacitor.

Lorsque je suis tombé sur cette demande plus d'un an plus tard, elle résonnait profondément avec les défis auxquels je faisais face dans mes propres projets. Elle a servi à la fois de validation du besoin d'un tel outil et de feuille de route pour ce qui allait devenir Capgo.

L'enthousiasme de la communauté pour ce plugin proposé, combiné à mes expériences personnelles, est devenu la force motrice derrière le développement de Capgo. C'est un exemple parfait de comment les communautés open-source peuvent identifier des besoins et inspirer des solutions, même si le délai entre l'idée et la mise en œuvre s'étend sur plus d'un an.

## Un Nouveau Chapitre Commence

Avant de plonger dans l'histoire de Capgo, il est important de planter le décor. En 2021, j'ai pris la décision qui a changé ma vie de quitter mon rôle de CTO de Cashstory et de vendre mes parts. Cela a marqué le début de mon parcours en tant que créateur indépendant, un chemin rempli d'incertitude mais aussi de possibilités infinies.

![Vie de nomade numérique à Lisbonne](/capgo-lisbon-nomadwebp)

Avec mes économies comme filet de sécurité, je me suis lancé dans une nouvelle aventure. Je vivais comme un nomade numérique à Lisbonne, au Portugal, embrassant la scène technologique vibrante et la culture de la ville tout en me concentrant sur mes projets passionnels. Mon objectif principal était Captime, une application mobile de minuteur crossfit. Je ne savais pas encore que ce projet me mènerait à créer quelque chose de bien plus grand.

L'énergie de l'écosystème des startups de Lisbonne et la liberté du style de vie nomade numérique ont fourni le cadre parfait pour l'innovation. C'est dans cet environnement, entouré d'entrepreneurs et de développeurs du monde entier, que les graines de Capgo ont été semées.

[Continuer avec le reste de l'article]

## L'Étincelle d'une Idée

En travaillant sur Captime, j'ai rencontré un obstacle majeur - le manque d'une solution de mise à jour abordable et flexible pour les applications Capacitor. En octobre 2021, j'ai exprimé ces préoccupations sur un fil GitHub.

![Proposition initiale pour Capgo](/capgo-initial-proposalwebp)

Les principaux points de douleur que j'ai identifiés étaient :

1. Coûts élevés pour les développeurs à petite échelle
2. Manque de mises à jour over-the-air (OTA) dans les plans abordables
3. Fonctionnalités inutiles pour les développeurs indépendants

## La Communauté Résonne

Mes préoccupations ont trouvé un écho chez d'autres développeurs. Beaucoup ont fait écho au sentiment que les solutions existantes étaient trop chères pour les développeurs indépendants et les petites équipes.

![Retour de la communauté](/capgo-community-feedbackwebp)

Un développeur a résumé les sentiments de la communauté :

"Ce serait brillant si le plan Community incluait 500 mises à jour en directOu mieux encore, s'il y avait un forfait uniquement Live Update pour 50 $/mois qui incluait 5 000 mises à jour en direct"

## La naissance d'une solution

Motivé par la réponse de la communauté, j'ai décidé de prendre les choses en main. Le 24 octobre 2021, j'ai annoncé mon plan de construire un module qui permettrait aux développeurs de télécharger des mises à jour à partir d'une URL donnée.

![Extrait de code initial](/capgo-initial-codewebp)

Les objectifs initiaux étaient simples :
- Télécharger des données depuis une URL
- Décompresser les données
- Remplacer le code actuel par le nouveau

Cependant, transformer cette idée simple en réalité s'est avéré bien plus difficile que je ne l'avais initialement prévu.

## La lutte en coulisses

Ce qui n'apparaît pas dans le fil GitHub, c'est la complexité pure de la tâche que j'avais entreprise. Le code nécessaire pour implémenter cette fonctionnalité était obscur et difficile à comprendre. Je me suis retrouvé aux prises avec les détails complexes de la façon dont les applications Capacitor gèrent les mises à jour et les systèmes de fichiers.

J'ai passé de nombreuses nuits dans mon van, à éplucher la documentation et à expérimenter différentes approches. Les progrès étaient lents, et il y a eu des moments où je me suis demandé si je n'avais pas vu trop grand.

## La communauté à la rescousse

Heureusement, je n'étais pas seul dans ce voyage. La communauté des développeurs, en particulier sur Discord, s'est avérée être une ressource inestimable. D'autres développeurs ont offert leurs idées, aidé à déboguer les problèmes et apporté des encouragements quand ça devenait difficile.

![Soutien de la communauté Discord](/capgo-discord-supportwebp)

Cet effort collaboratif a été crucial pour surmonter les obstacles techniques. Cela a renforcé ma croyance en la puissance de l'open source et du développement communautaire.

## Développement rapide et expansion des capacités

Avec l'aide de la communauté, le développement a commencé à s'accélérer. Le 22 novembre 2021, j'avais une version fonctionnelle pour iOS et j'améliorais l'expérience des développeurs.

![Extrait de code amélioré](/capgo-improved-codewebp)

Au fur et à mesure que le développement progressait, j'ai ajouté plus de fonctionnalités :
- Support Android
- Persistance entre les fermetures de l'application
- La capacité de revenir à la version originale de l'application

![Annonce de nouvelles fonctionnalités](/capgo-new-featureswebp)

Chaque nouvelle fonctionnalité apportait son lot de défis, mais aussi un sentiment d'accomplissement à mesure que le projet dépassait sa portée initiale.

## Le lancement de Capgo

En mars 2022, le projet avait évolué en un produit à part entière : Capgo. J'ai annoncé la sortie d'un mode de mise à jour automatique, permettant aux développeurs de se connecter à leur propre backend ou d'utiliser le service backend de Capgo.

![Annonce du lancement de Capgo](/capgo-launch-announcementwebp)

La réponse de la communauté a été extrêmement positive, les développeurs saluant cette solution tant attendue.

## Le pivot vers un produit payant

Au départ, je n'avais pas l'intention de monétiser Capgo. Mon but était simplement de créer un outil qui résoudrait un problème auquel moi et d'autres développeurs étions confrontés. Cependant, les retours sur GitHub m'ont fait reconsidérer cette position.

Les développeurs exprimaient une volonté de payer pour une solution qui répondait à leurs besoins à un prix équitable. Ces retours, combinés à la prise de conscience des coûts et des efforts continus nécessaires pour maintenir et améliorer Capgo, ont conduit à une décision cruciale.

Le 11 juin 2022, j'ai annoncé que Capgo commencerait à facturer l'utilisation dans 15 jours, marquant sa transition d'un projet communautaire à une entreprise durable.

![Annonce de la tarification de Capgo](/capgo-pricing-announcementwebp)

Cependant, restant fidèle aux racines du projet, j'ai maintenu le cœur open-source de Capgo en permettant l'utilisation gratuite du plugin en mode manuel ou avec un serveur personnalisé.

## Conclusion

Mon parcours avec Capgo est un témoignage de la puissance de l'innovation communautaire et des chemins inattendus que les créateurs solitaires empruntent souvent. Ce qui a commencé comme une frustration personnelle en travaillant sur une application de minuterie crossfit s'est transformé en un système de mise à jour en direct robuste, abordable et flexible pour les applications Capacitor.

La création de Capgo était loin d'être facile.Il a fallu d'innombrables heures de travail, le soutien d'une généreuse communauté de développeurs, et une volonté de s'adapter en fonction des retours des utilisateurs. De la programmation dans un Airbnb au Portugal jusqu'au lancement d'un produit payant, chaque étape de ce parcours a été une expérience d'apprentissage.

Alors que Capgo continue d'évoluer, il représente un excellent exemple de la façon dont l'identification d'un besoin sur le marché, le travail actif pour le combler, et la réactivité aux besoins de la communauté peuvent mener à la création d'outils précieux qui profitent à tout l'écosystème des développeurs.

L'histoire de Capgo est plus que le simple développement d'un outil ; c'est une histoire de persévérance, de communauté, et de l'imprévisibilité passionnante de la vie en tant que créateur indépendant.

Vous pouvez trouver l'histoire complète [ici](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)