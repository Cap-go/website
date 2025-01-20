---
slug: fr__live-updates-for-flutter-app
title: Mise à jour en direct de Flutter
description: >-
  Est-il possible d'envoyer des mises à jour en direct aux applications Flutter
  sans passer par l'examen de l'App Store ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration de contournement pour condensateurs
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update est un service qui permet aux développeurs de déployer des mises à jour de leurs applications mobiles sans passer par le processus de soumission traditionnel de l'App Store. C'est un moyen pratique de corriger rapidement des bugs ou d'apporter de petites mises à jour à une application sans attendre le processus de révision de l'App Store. Cependant, Capgo Live Update ne prend pas en charge la mise à jour des applications Flutter car ces dernières sont compilées en code natif.

Flutter est un framework de développement d'applications mobiles qui utilise le langage de programmation Dart. L'une des principales caractéristiques de Flutter est qu'il permet aux développeurs de créer des applications qui peuvent fonctionner à la fois sur iOS et Android en utilisant une seule base de code. Pour y parvenir, Flutter compile le code de l'application en code natif pour chaque plateforme. Cela signifie que l'application est essentiellement une application native, plutôt qu'une application web ou une application hybride.

Étant donné que les applications Flutter sont compilées en code natif, il n'est pas possible d'utiliser Capgo Live Update pour déployer des mises à jour d'une application Flutter. Les développeurs doivent plutôt soumettre les mises à jour aux magasins d'applications comme ils le feraient pour toute autre application native.

De plus, apporter des modifications au code natif est généralement contraire aux règles des magasins d'applications. L'App Store d'Apple et le Google Play Store ont tous deux des politiques en place qui interdisent aux développeurs d'introduire des changements dans le code natif d'une application après sa soumission pour examen. Cela s'explique par le fait que l'introduction de changements dans le code natif peut potentiellement introduire des vulnérabilités de sécurité ou d'autres problèmes susceptibles de compromettre les performances de l'application.

En résumé, bien que Capgo Live Update soit un outil utile pour déployer rapidement des mises à jour de certains types d'applications mobiles, il ne peut pas être utilisé pour mettre à jour les applications Flutter.

Cela est dû à la nature du processus de compilation de Flutter et aux règles des magasins d'applications.