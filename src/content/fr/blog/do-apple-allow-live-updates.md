---
slug: do-apple-allow-live-updates
title: >-
  Apple autorise-t-il l'envoi de mises à jour en direct aux applications sans
  l'examen de l'App Store.
description: "Comment pouvez-vous envoyer des mises à jour de code aux applications iOS de production et être pleinement conforme aux directives d'Apple\_?"
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustration du contournement du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

La mise à jour des applications Capacitor JS sans passer par le processus d'examen de l'App Store est possible sous certaines conditions décrites dans les directives officielles d'Apple. Cependant, il est important de noter qu'il ne s'agit pas d'un avis juridique. Afin que les mises à jour du code soient transmises directement à une application et restent conformes. avec les directives d'Apple, les conditions suivantes doivent être remplies :

- Le code doit être exécuté par le framework WebKit intégré d'Apple
- Le code ne doit pas fournir, déverrouiller ou activer des fonctionnalités ou fonctionnalités supplémentaires
- L'utilisateur ne doit pas être conscient qu'une mise à jour est en cours

Le plugin Capgo Capacitor permet d'effectuer des mises à jour et des modifications au HTML, CSS et JavaScript, satisfaisant la première condition 
La possibilité pour les applications de se mettre à jour elles-mêmes sans passer par le processus d'examen de l'App Store est disponible depuis un certain temps pour les applications créées à l'aide de frameworks JavaScript tels que React Native de Facebook et de services comme Expo.

La deuxième condition, ne fournissant pas de fonctionnalités ou de fonctionnalités supplémentaires, est déterminée par le développeur. Capgo est destiné à apporter de petits ajustements ou correctifs, plutôt que d'introduire de nouvelles fonctionnalités ou fonctionnalités. Pour des changements importants, il est nécessaire de publier des mises à jour via l'App Store. Cela vaut la peine notant que de nombreux autres développeurs utilisent les mises à jour en direct sans aucun problème ni rejet de la part d'Apple

Google Play est moins restrictif qu'Apple en matière de mise à jour des applications. Google Play permet aux applications installées depuis leur boutique avec des bundles JavaScript d'être mises à jour par des services non Google. 

Pour plus d'informations sur la façon d'installer Capgo pour contourner la révision, veuillez vous référer à mon prochain article