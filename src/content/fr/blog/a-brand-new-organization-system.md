---
slug: a-brand-new-organization-system
title: Un tout nouveau système d'organisation
description: >-
  Une histoire sur la façon dont l'équipe capgo a ajouté un système
  d'organisation
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Illustration du système d'organisation Capgo
tag: Story
published: true
locale: fr
next_blog: ''
---

## Introduction

Hé, je suis [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny) - ingénieur logiciel principal de Capgo

Au cours des 8 derniers mois, j'ai développé le [système d'organisation](/docs/webapp/organization-system/), et depuis le 14 avril, je suis heureux d'annoncer que le système est terminé 🎉 🎊

Enfin, après 8 mois, chaque partie de Capgo est accessible aux membres de l'organisation. Cela inclut :
 - applications
 - statistiques
 - facturation
 - prise en charge complète de la CLI
 - et bien plus encore !

Cela n'a pas été facile d'arriver ici ; il y a eu 3 révisions majeures des systèmes

## Organisations v1

Les débuts ont été difficiles. Au départ, j'ai commencé à travailler là-dessus 2 semaines après avoir rejoint le projet. 
À l'époque, j'avais peu ou pas de connaissances sur la base de code ni sur la façon de l'implémenter.

Cela a conduit à la mise en œuvre de la solution la plus hackée qui ne prenait en charge que l'accès aux applications, aux chaînes et aux versions.
Cela ne permettait même pas à l'utilisateur invité d'accéder aux statistiques

Et puis j'ai attendu que Martin examine cela, j'ai attendu et attendu, mais rien ne s'est vraiment passé 3 mois plus tard, j'ai décidé d'y revenir et de résoudre tous les conflits de fusion que j'ai également décidé de tester, ce qui s'est avéré être une excellente idée.
Sans surprise, la solution hacky a complètement échoué. À ce moment-là, j'ai décidé de corriger tous les bugs et d'écrire un test E2E approfondi.
J'ai dû travailler avec un code très défectueux et beaucoup de mauvaises décisions prises par mon passé, mais après 2 semaines difficiles, je l'ai finalement fait fonctionner.

Cela ne signifie cependant pas qu'il était parfait. Le propriétaire de l'organisation disposait toujours d'un accès beaucoup plus large que même l'utilisateur invité le plus élevé. L'expérience utilisateur était également assez insuffisante. L'utilisateur invité ne pouvait même pas voir les statistiques de l'application, gérer la facturation et le La CLI était limitée au téléchargement uniquement 

Malgré tous ces défis, Martin avait revu le PR, et une semaine plus tard, il a été mis en production. 

## Organisations v2

Le système d'organisation fonctionnait plutôt bien malgré tous les défis que les utilisateurs l'utilisaient, et cela a vraiment fait avancer l'ensemble du projet. Cependant, il me restait à :
 - réparer le désordre créé dans [sécurité au niveau des lignes](https://supabasecom/docs/guides/auth/row-level-security)
 - ajouter la prise en charge de l'ensemble de la CLI
 - s'assurer que les utilisateurs administrateurs ont le même accès que le propriétaire

Après [de nombreuses discussions](https://githubcom/Cap-go/capgo/issues/564) avec Martin, nous avons décidé que la meilleure façon d'avancer était de réécrire l'intégralité des règles de sécurité et de déplacer toute la propriété des ressources aux organisations et non aux utilisateurs
Cela permettrait une intégration plus facile avec le nouveau système d'organisation et supprimerait également une grande partie du code existant.

L'écriture du nouveau code RLS était très fastidieuse, mais après une semaine et demie, toute la migration était prête

Cette fois, cependant, nous avons décidé de ne pas écrire le test E2E, ce qui signifiait que nous devions le tester manuellement. Après 3 appels très approfondis ensemble, Martin et moi avons finalement décidé de passer à la production et espérons que tout se passerait bien 🙏

Ce n'est pas le cas. Il s'avère que j'ai rompu l'enregistrement des utilisateurs et que les nouveaux utilisateurs n'ont pas pu créer de compte 😅

Après un rapide appel de panique, j'ai rapidement poussé quelques modifications en production et je me suis couché. Malheureusement, mes modifications n'ont fait que créer davantage de problèmes 😰

Après m'être réveillé, j'ai découvert que les utilisateurs avaient beaucoup d'organisations vides. Cela n'est pas censé se produire car une seule organisation devrait être autorisée par utilisateur. Il a fallu un certain temps de réflexion pour supprimer toutes les organisations vides et dupliquées, mais à part ça , les changements se sont plutôt bien déroulés

## Organisations v3

Même cela n'était pas suffisant. Il manquait encore un élément énorme : la facturation.

Jusqu'à présent, seul le propriétaire pouvait gérer la facturation. Cela a créé des problèmes intéressants lorsqu'un utilisateur achetait un forfait pensant qu'il l'achetait pour l'organisation. 
Nous avons rapidement résolu le problème manuellement et c'est à ce stade que nous avons décidé que ce problème était inacceptable.

La migration s'est plutôt bien dérouléeCela a demandé une semaine de travail mais comparé à la V1 et à la V2 ce n'était vraiment pas si dur 🚀

## Organisations v4 – l'avenir

Après tout ce travail acharné, je pense qu'il est temps de se concentrer sur autre chose pour le moment 😎

Ce n'était pas facile mais j'ai beaucoup appris et capgo a reçu une fonctionnalité très intéressante et importante
Je dois encore supprimer les fonctions héritées, améliorer l'expérience utilisateur de l'application Web, surveiller les bugs, 
mais il ne devrait pas y avoir de changements majeurs à ce système


<br>

Merci d'avoir lu 🚀