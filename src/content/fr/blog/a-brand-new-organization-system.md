---
slug: a-brand-new-organization-system
title: Un nouveau système d'organisation
description: >-
  Une histoire de fond sur la façon dont l'équipe de Capgo a ajouté un système
  d'organisation
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Illustration du système organisationnel de Capgo
tag: Story
published: true
locale: fr
next_blog: ''
---

## Introduction

Bonjour, je suis [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny) - ingénieur logiciel principal de Capgo

Au cours des 8 derniers mois, j'ai développé le [système d'organisation](/docs/webapp/organization-system/), et depuis le 14 avril, je suis heureux d'annoncer que le système est terminé 🎉 🎊

Enfin, après 8 mois, chaque partie de Capgo est accessible aux membres de l'organisation. Cela comprend :
 - les applications
 - les statistiques
 - la facturation
 - le support complet de la CLI
 - et bien plus encore !

Ce n'a pas été facile d'en arriver là ; il y a eu 3 révisions majeures des systèmes

## Organisations v1

Les débuts ont été difficiles. J'ai commencé à travailler sur ce projet 2 semaines après avoir rejoint le projet.
À l'époque, je n'avais que peu ou pas de connaissances sur la base de code ou une idée plus large sur la façon de mettre cela en œuvre.

Cela a conduit à la mise en place de la solution la plus bancale qui ne permettait que d'accéder aux applications, aux canaux et aux versions.
Elle ne permettait même pas à l'utilisateur invité d'accéder aux statistiques.

Et puis j'ai attendu que Martin examine cela. J'ai attendu et attendu, mais rien ne s'est vraiment passé. 3 mois plus tard, j'ai décidé de revenir sur ce projet et de résoudre tous les conflits de fusion. J'ai également décidé de tester, ce qui s'est avéré être une excellente idée.
Sans surprise, la solution bancale a complètement échoué. À ce moment-là, j'ai décidé de corriger tous les bugs et d'écrire un test E2E approfondi.
J'ai dû travailler avec un code très cassé et de nombreuses mauvaises décisions prises par mon moi du passé, mais après 2 semaines difficiles, j'ai finalement réussi à le faire fonctionner.

Cela ne signifie pas, cependant, que c'était parfait. Le propriétaire de l'organisation avait encore beaucoup plus d'accès que même l'utilisateur invité le plus élevé. L'expérience utilisateur était également assez limitée. L'utilisateur invité ne pouvait même pas voir les statistiques de l'application, gérer la facturation, et la CLI était limitée au téléchargement uniquement.

Malgré tous ces défis, Martin a examiné la PR, et une semaine plus tard, elle a été mise en production.

## Organisations v2

Le système d'organisation fonctionnait plutôt bien malgré tous les défis. Les utilisateurs l'utilisaient et cela a vraiment fait avancer l'ensemble du projet. Cependant, je devais encore :
 - corriger le désordre créé dans la [sécurité au niveau des lignes](https://supabasecom/docs/guides/auth/row-level-security)
 - ajouter le support pour l'ensemble de la CLI
 - garantir que les utilisateurs administrateurs aient le même accès que le propriétaire

Après [de nombreuses discussions](https://githubcom/Cap-go/capgo/issues/564) avec Martin, nous avons décidé que la meilleure façon d'avancer était de réécrire l'ensemble des règles de sécurité et de déplacer toute la propriété des ressources vers les organisations et non les utilisateurs.
Cela permettrait une intégration plus facile avec le nouveau système d'organisation et supprimerait également beaucoup de code hérité.

L'écriture du nouveau code RLS a été très fastidieuse, mais après une semaine et demie, toute la migration était prête.

Cette fois-ci, cependant, nous avons décidé de ne pas écrire le test E2E, ce qui signifiait que nous devions le tester manuellement. Après 3 appels très approfondis ensemble, Martin et moi avons finalement décidé de pousser en production et d'espérer que tout se passerait bien 🙏

Ce ne fut pas le cas. Il s'avère que j'ai cassé l'inscription des utilisateurs et que les nouveaux utilisateurs ne pouvaient pas créer de compte 😅

Après un appel de panique rapide, j'ai rapidement poussé quelques modifications en production et je suis allé me coucher. Malheureusement, mes modifications n'ont fait que créer plus de problèmes 😰

Après mon réveil, j'ai découvert que les utilisateurs avaient beaucoup d'organisations vides. Ce n'est pas censé arriver car une seule organisation devrait être autorisée par utilisateur. Il a fallu un certain temps de réflexion pour supprimer toutes les organisations vides en double, mais à part cela, les changements se sont déroulés plutôt en douceur.

## Organisations v3

Même cela n'était pas suffisant. Il manquait encore un composant important - la facturation.

Jusqu'à présent, seul le propriétaire pouvait gérer la facturation. Cela a créé des problèmes intéressants où un utilisateur achetait un plan en pensant l'acheter pour l'organisation.
Nous avons rapidement résolu le problème manuellement et c'est à ce moment-là que nous avons décidé que ce problème était inacceptable.

La migration s'est déroulée plutôt en douceur.Il a fallu une semaine de travail mais comparé à V1 et V2, ce n'était vraiment pas si difficile 🚀

## Organisations v4 - l'avenir

Après tout ce dur travail, je pense qu'il est temps de se concentrer sur autre chose pour l'instant 😎

Ce n'était pas facile mais j'ai beaucoup appris et capgo a reçu une fonctionnalité très intéressante et importante
Je dois encore déprécier les fonctions héritées, améliorer l'expérience utilisateur de l'application web, surveiller les bugs,
mais il ne devrait pas y avoir de changements majeurs à ce système

<br>

Merci d'avoir lu 🚀