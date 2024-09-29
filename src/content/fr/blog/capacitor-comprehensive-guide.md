---
slug: capacitor-comprehensive-guide
title: "Condensateur\_: un guide complet"
description: >-
  CapacitorJS est un outil puissant qui permet aux développeurs Web de créer des
  applications natives iOS, Android, de bureau et Web progressives avec une base
  de code Web standard unique. Apprenez tout ce que vous devez savoir sur les
  condensateurs dans ce guide complet.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-10T00:00:00.000Z
updated_at: 2023-06-10T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: Capacitor guide illustration
tag: Guides
published: true
next_blog: ''
---

[Capacitor](https://capacitorjscom/) est un outil polyvalent qui permet aux développeurs Web de créer des applications natives iOS, Android, de bureau et Web progressives à l'aide d'une base de code Web standard unique. Développé par l'équipe derrière Ionic, Capacitor a attiré une attention considérable. ces dernières années, alors que les développeurs reconnaissent le potentiel des technologies Web sur les plates-formes mobiles. Dans ce guide complet, nous répondrons à certaines des questions les plus courantes sur Capacitor et explorerons ses capacités, ses cas d'utilisation et ses avantages.

## Qu'est-ce qu'un condensateur ?

Capacitor est une plate-forme gratuite et open source (sous licence MIT) qui permet aux développeurs Web de créer des applications multiplateformes à l'aide de technologies Web standard exécutées dans les navigateurs modernes. Elle se compose de SDK de plate-forme natifs (iOS et Android), d'un outil en ligne de commande. , une API de plugin et des plugins prédéfinis. Capacitor permet à votre application Web existante de s'exécuter en tant qu'application native sur chaque plate-forme, fournissant des hooks à la plate-forme native via JavaScript. Ces hooks peuvent être intégrés directement dans l'application ou en tant que plugins autonomes pour être réutilisés et distribution

## Que pouvez-vous construire avec Capacitor ?

Avec Capacitor, vous pouvez créer pratiquement tout ce que vous créeriez de manière native ou avec d'autres boîtes à outils multiplateformes. Les applications Capacitor ont un accès complet à la plate-forme native, de sorte que la plupart des fonctionnalités natives peuvent être implémentées. Cependant, l'intégration de contrôles d'interface utilisateur natifs directement dans la hiérarchie des vues de l'application Web peut être un défi et n'est pas encore disponible en tant que technique abstraite que d'autres peuvent utiliser

## À qui s'adresse le condensateur ?

Capacitor cible les développeurs Web avec des arrière-plans HTML, CSS et JavaScript. Si vous créez des applications Web ou de bureau (à l'aide d'Electron ou d'outils similaires), Capacitor est votre solution pour créer des applications multiplateformes axées sur le mobile.

## Quand une équipe doit-elle choisir Capacitor ?

Les équipes devraient envisager Capacitor lorsqu'elles souhaitent tirer parti de leurs compétences en développement Web et de leurs investissements Web existants pour déployer des applications de plateforme natives. Capacitor est idéal pour les applications basées sur les données, les applications grand public, les applications B2B/E et les applications d'entreprise. Il est particulièrement adapté aux applications d'entreprise, car Ionic, la société derrière Capacitor, propose un support et des fonctionnalités dédiés aux entreprises

## Puis-je réutiliser du code Web existant et partager du nouveau code avec une application Web ?

Oui! Capacitor exécute les applications Web standard de manière native, permettant aux équipes de disposer d'une base de code unique pour le Web et les appareils mobiles ou de réutiliser des parties de leur application Web, telles que des composants, une logique ou des expériences spécifiques.

## En quoi le condensateur est-il bon ? Quelles sont ses limites ?

Capacitor excelle dans l'exécution d'applications Web standard en tant qu'applications mobiles natives et dans l'extension d'applications Web avec des fonctionnalités natives. Il est idéal pour les équipes compétentes en développement Web ou ayant des investissements Web importants. Capacitor n'est peut-être pas le meilleur choix pour les applications 3D/2D ou à forte intensité graphique, bien qu'il prend en charge les applications WebGL qui nécessitent une communication étendue entre l'application Web et la couche native. Le pont de communication Capacitor peut ajouter une surcharge en raison de la sérialisation. Cependant, les applications Capacitor peuvent toujours exécuter du code natif personnalisé en cas de besoin.

## Puis-je mélanger les commandes natives de l'interface utilisateur avec Capacitor ?

Oui, vous pouvez afficher les contrôles natifs de l'interface utilisateur en dehors de la vue Web du condensateur, tels que les modaux ou les conteneurs de navigation au niveau parent. L'intégration des contrôles natifs dans l'expérience de la vue Web est possible mais n'est pas encore disponible en tant que technique que d'autres peuvent utiliser.

## En quoi le condensateur et l'électron sont-ils différents ?

Capacitor est souvent décrit comme « Electron pour mobile » car il sert d'équivalent d'Electron axé sur les mobiles. Cependant, Capacitor peut cibler Electron en tant que plate-forme de déploiement, car il s'agit d'une abstraction de niveau supérieur. Si vous avez uniquement besoin de cibler des plates-formes de bureau, Electron est suffisant Mais si vous souhaitez créer des applications multiplateformes pour mobile, Web et ordinateur de bureau, Capacitor prend en charge Electron et d'autres plates-formes.

## En quoi les condensateurs et les ioniques sont-ils différents ?

Ionic est la société qui crée Capacitor, Ionic Framework, Stencil, Appflow et d'autres produits axés sur le développement d'applications.Capacitor est la boîte à outils qui gère le côté natif de l'application et la communication entre l'application native et la vue Web. Il est indépendant des frameworks et des technologies utilisés dans l'application Web View, notamment Ionic Framework. Ionic Framework est une boîte à outils d'interface utilisateur mobile qui fournit de puissants Composants d'interface utilisateur pour que les applications Web aient une apparence native

## Dois-je utiliser Ionic Framework avec Capacitor ?

Non, vous pouvez utiliser Capacitor avec d'autres frameworks UI et CSS comme Tailwind, Material UI, Chakra, Quasar, Framework7 ou vos propres composants personnalisés. Cependant, Ionic Framework reste une excellente option pour créer des expériences de type natif avec votre application Web.

## Quelle est la stratégie d'Ionic avec Capacitor ?

Ionic vise à favoriser l'adoption de Capacitor, car cela conduit à une utilisation accrue d'Appflow (leur service mobile CI/CD), d'Ionic Framework et de leurs solutions d'entreprise. La croissance de Capacitor est intentionnelle, car elle a été créée pour offrir une pile plus indépendante du front-end pour développeurs Web pour créer des applications mobiles

## Puis-je utiliser Capacitor avec React, Nextjs ou Remix ?

Oui, Capacitor fonctionne bien avec React, Nextjs et Remix. Il maintient les développeurs plus proches du développement Web React standard que de React Native, car la plupart des bibliothèques et modules complémentaires React fonctionnent de manière transparente avec Capacitor.

## En quoi Capacitor et React Native sont-ils différents ?

Capacitor et React Native partagent des similitudes en fournissant une infrastructure d'outils et de plugins pour le développement multiplateforme. Cependant, React Native utilise un système de type Web avec JS et React pour extraire les contrôles d'interface utilisateur natifs de la plate-forme, tandis que Capacitor fournit une vue Web pour les applications Web standard. est également moins complexe que React Native, car il ne nécessite pas de gérer les contrôles natifs de l'interface utilisateur et de les synchroniser avec la couche JS

## Capacitor est-il plus rapide que React Native ?

Cela dépend de la charge de travail. Capacitor peut exécuter JavaScript plus rapidement que React Native en raison de son accès au moteur JIT sur iOS et Android. Cependant, React Native peut être considéré comme « plus rapide » ou « plus performant » pour le rendu de l'interface utilisateur car il utilise des contrôles d'interface utilisateur natifs. tandis que les applications Capacitor s'exécutent principalement dans une vue Web

## En quoi le condensateur et le flottement sont-ils différents ?

Capacitor et Flutter fournissent tous deux une infrastructure d'outils et de plugins pour le développement multiplateforme, mais Capacitor utilise JavaScript et la technologie Web standard, tandis que Flutter utilise Dart et un environnement d'interface utilisateur et d'API personnalisé. Du côté de l'interface utilisateur, Capacitor et Flutter utilisent tous deux des moteurs de rendu personnalisés, avec Flutter dessinant ses composants et Capacitor rendant la plupart des interfaces utilisateur dans une vue Web

## Puis-je intégrer Capacitor dans React Native ou dans des applications natives traditionnelles pour créer des micro-interfaces mobiles ?

Oui, vous pouvez utiliser [Ionic Portals](https://ionicio/portals/) pour intégrer Capacitor dans React Native ou des applications natives traditionnelles construites avec Swift/Kotlin pour une approche micro-frontend mobile

## Quelles sont mes options pour des animations hautes performances dans Capacitor ?

Vous pouvez utiliser des composants prédéfinis et optimisés d'Ionic Framework, Quasar, Framework7 ou Konsta UI, ou créer des animations personnalisées à l'aide d'animations Framer Motion, Lottie ou CSS. Assurez-vous simplement de suivre les meilleures pratiques en matière de performances lorsque vous utilisez des animations CSS.

## Combien de plugins Capacitor possède-t-il ?

Capacitor dispose de 26 plugins principaux et de nombreux plugins créés par la communauté. Découvrez [awesome-capacitor](https://githubcom/riderx/awesome-capacitor/), la [capacitor-community](https://githubcom/capacitor-community/ ) organisation et [Capawesome](https://githubcom/capawesome-team/) pour les ressources du plugin communautaire

## Existe-t-il une extension de code VS pour Capacitor ?

Oui, l'[Extension Ionic VS Code](https://marketplacevisualstudiocom/items/?itemName=ionicionic) sert également d'extension de condensateur, offrant des fonctionnalités telles que l'aperçu intégré, l'exécution de l'appareil, le débogage externe, le peluchage de la qualité du projet, l'analyse de sécurité et plus

## Existe-t-il une assistance spécifique à l'entreprise ?

Oui, Capgo propose [Support et fonctionnalités Enterprise](https://capgoapp/) pour Capacitor, y compris un support dédié, des plugins natifs pour la mise à jour et l'authentification en direct, et bien plus encore.## Comment démarrer avec Capacitor ?

Visitez la [documentation Capacitor](https://capacitorjscom/docs/) et suivez les instructions pour installer Capacitor dans votre application. Si vous souhaitez démarrer avec une application Capacitor avisée utilisant Ionic Framework et Angular/React/Vue, suivez le guide de démarrage. flux sur le [site Ionic Framework](https://ionicframeworkcom/)