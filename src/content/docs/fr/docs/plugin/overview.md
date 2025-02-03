---
title: Vue d'ensemble
description: Explication des deux approches différentes
sidebar:
  order: 1
locale: fr
---

### Mode Cloud (Recommandé)
Le mode Cloud est notre choix recommandé pour une gestion des mises à jour sans tracas. Le backend de Capgo gère toute la logique de mise à jour, prenant les décisions côté serveur pour une meilleure sécurité et un meilleur contrôle. Ce mode privilégie la facilité d'utilisation : une fois configuré, il fonctionne de manière autonome, offrant des fonctionnalités avancées comme les statistiques et les canaux. Il peut également être configuré en mode manuel pour vous donner plus de contrôle, vous permettant de décider quand effectuer la mise à jour avec votre code JavaScript. Le backend gère toujours ce qui est mis à jour. Ce mode partage de nombreux avantages avec le mode Auto, particulièrement en termes de sécurité et de fonctionnalités avancées, mais ajoute la flexibilité de programmer vous-même les mises à jour.

### Mode Auto-hébergé

Le mode Auto Auto-hébergé est destiné à ceux qui souhaitent gérer toute la logique de mise à jour sur leur propre serveur. Il offre une autonomie complète mais nécessite un serveur distinct et plus de travail pour gérer les mises à jour et les exigences serveur.

Le mode Manuel Auto-hébergé combine contrôle et autonomie. Vous décidez quand mettre à jour via JavaScript, mais votre serveur gère ce qui est mis à jour. C'est un peu complexe car vous incluez le code de mise à jour dans les mises à jour.

:::note
Si vous choisissez l'auto-hébergement, vous passez à côté de toutes les excellentes fonctionnalités que le cloud capgo offre comme : les retours en arrière automatiques, les alertes par email, les canaux, les statistiques, le chiffrement et plus encore
:::

:::danger
Si vous envoyez une mauvaise mise à jour à vos utilisateurs, vous pouvez et allez casser leur application
:::