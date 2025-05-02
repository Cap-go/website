---
slug: mises-à-jour-en-direct-sur-apple
title: >-
  Apple n'autorise pas la diffusion de mises à jour en direct des applications
  sans examen préalable de l'App Store.
description: >-
  Comment pouvez-vous envoyer des mises à jour de code aux applications iOS en
  production tout en respectant pleinement les directives d'Apple ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustration de dérivation de Capacitor
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: actualizaciones-en-vivo-en-apple
---
La mise à jour des applications Capacitor JS sans passer par le processus de révision de l'App Store est possible sous certaines conditions définies dans les directives officielles d'Apple. Cependant, il est important de noter que ceci ne constitue pas un avis juridique. Pour que les mises à jour de code puissent être envoyées directement à une application tout en restant conformes aux directives d'Apple, les conditions suivantes doivent être respectées :

- Le code doit être exécuté par le framework WebKit intégré d'Apple
- Le code ne doit pas fournir, débloquer ou activer des fonctionnalités supplémentaires
- L'utilisateur ne doit pas être conscient qu'une mise à jour est en cours

Le plugin Capacitor Capgo permet d'effectuer des mises à jour et des modifications du HTML, CSS et JavaScript, satisfaisant ainsi la première condition.
La possibilité pour les applications de se mettre à jour sans passer par le processus de révision de l'App Store est disponible depuis un certain temps pour les applications créées avec des frameworks JavaScript comme React Native de Facebook et des services comme Expo.

La deuxième condition, ne pas fournir de fonctionnalités supplémentaires, est déterminée par le développeur. Capgo est destiné à effectuer de petits ajustements ou corrections, plutôt que d'introduire de nouvelles fonctionnalités. Pour les changements importants, il est nécessaire de publier les mises à jour via l'App Store. Il est à noter que de nombreux autres développeurs utilisent les mises à jour en direct sans problèmes ni rejet de la part d'Apple.

Google Play est moins restrictif qu'Apple en ce qui concerne la mise à jour des applications. Google Play permet aux applications installées depuis leur boutique avec des bundles JavaScript d'être mises à jour par des services autres que Google.

Pour plus d'informations sur l'installation de Capgo pour contourner la révision, veuillez consulter mon prochain article.
