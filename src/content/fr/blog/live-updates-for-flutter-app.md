---
slug: live-updates-for-flutter-app
title: Mise à jour en direct de Flutter
description: >-
  Est-il possible d'envoyer une mise à jour en direct des applications Flutter
  sans l'examen de l'App Store ?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration du contournement du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update est un service qui permet aux développeurs de déployer des mises à jour sur leurs applications mobiles sans passer par le processus de soumission traditionnel de l'App Store. Cela peut être un moyen pratique de corriger rapidement des bugs ou d'effectuer de petites mises à jour d'une application sans attendre le processus de révision de l'App Store. Cependant, Capgo Live Update ne prend pas en charge la mise à jour des applications Flutter car les applications Flutter sont compilées en code natif.

Flutter est un framework de développement d'applications mobiles qui utilise le langage de programmation Dart. L'une des principales caractéristiques de Flutter est qu'il permet aux développeurs de créer des applications pouvant s'exécuter à la fois sur iOS et Android à l'aide d'une seule base de code. Pour y parvenir, Flutter compile le code de l'application dans code natif pour chaque plateforme. Cela signifie que l'application est essentiellement une application native, plutôt qu'une application Web ou une application hybride.

Étant donné que les applications Flutter sont compilées en code natif, il n'est pas possible d'utiliser Capgo Live Update pour déployer des mises à jour sur une application Flutter. Au lieu de cela, les développeurs doivent soumettre des mises à jour aux magasins d'applications comme ils le feraient avec n'importe quelle autre application native.

De plus, effectuer des mises à jour du code natif est généralement contraire aux règles des magasins d'applications. L'Apple App Store et le Google Play Store ont mis en place des politiques qui interdisent aux développeurs d'introduire des modifications dans le code natif d'une application après qu'elle a été soumise pour examen. l'introduction de modifications dans le code natif peut potentiellement introduire des vulnérabilités de sécurité ou d'autres problèmes susceptibles de compromettre les performances de l'application

En résumé, bien que Capgo Live Update soit un outil utile pour déployer rapidement des mises à jour sur certains types d'applications mobiles, il ne peut pas être utilisé pour mettre à jour les applications Flutter.

Cela est dû à la nature du processus de compilation de Flutter et aux règles des magasins d'applications.