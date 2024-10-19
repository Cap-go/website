---
slug: do-apple-allow-live-updates
title: >-
  Apple autorise-t-elle l'envoi de mises à jour en direct aux applications sans
  examen de l'App Store ?
description: >-
  Comment pouvez-vous déployer des mises à jour de code pour les applications
  iOS en production tout en respectant pleinement les directives d'Apple ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustration du découplage du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Voici la traduction en français :

La mise à jour des applications Capacitor JS sans passer par le processus de révision de l'App Store est possible sous certaines conditions décrites dans les directives officielles d'Apple. Cependant, il est important de noter que ceci ne constitue pas un avis juridique. Pour que les mises à jour de code puissent être envoyées directement à une application et rester conformes aux directives d'Apple, les conditions suivantes doivent être respectées :

- Le code doit être exécuté par le framework WebKit intégré d'Apple
- Le code ne doit pas fournir, débloquer ou activer des fonctionnalités supplémentaires
- L'utilisateur ne doit pas être conscient qu'une mise à jour est en cours

Le plugin Capgo Capacitor permet d'effectuer des mises à jour et des modifications du HTML, CSS et JavaScript, satisfaisant ainsi la première condition.
La possibilité pour les applications de se mettre à jour sans passer par le processus de révision de l'App Store est disponible depuis un certain temps pour les applications créées à l'aide de frameworks JavaScript tels que React Native de Facebook et de services comme Expo.

La deuxième condition, ne pas fournir de fonctionnalités supplémentaires, est déterminée par le développeur. Capgo est destiné à apporter de petits ajustements ou correctifs, plutôt que d'introduire de nouvelles fonctionnalités. Pour des changements importants, il est nécessaire de publier des mises à jour via l'App Store. Il convient de noter que de nombreux autres développeurs utilisent des mises à jour en direct sans aucun problème ni rejet de la part d'Apple.

Google Play est moins restrictif qu'Apple en ce qui concerne la mise à jour des applications. Google Play permet aux applications installées depuis leur store avec des bundles JavaScript d'être mises à jour par des services autres que Google.

Pour plus d'informations sur l'installation de Capgo pour contourner la révision, veuillez consulter mon prochain article.