---
slug: actualizaciones-en-vivo-permitidas-por-google
title: >-
  Google autorise-t-il l'envoi de mises à jour en direct aux applications sans
  examen du Play Store ?
description: >-
  Comment pouvez-vous envoyer des mises à jour de code aux applications Android
  en production tout en respectant pleinement les directives de Google ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Illustration du bypass de Capacitor
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Google Play est moins restrictif qu'Apple en ce qui concerne la mise à jour des applications.

La mise à jour de vos applications distribuées via Google Play peut être une tâche délicate, mais il est important de suivre les directives de Google pour rester conforme. Selon les directives de Google Play, les applications ne doivent pas se modifier, se remplacer ou se mettre à jour en utilisant une méthode autre que le mécanisme de mise à jour propre à Google Play. Cela signifie que le téléchargement de code exécutable, comme les fichiers dex, JAR ou .so, depuis une source autre que Google Play n'est pas autorisé.

Cependant, cette restriction ne s'applique pas au code qui s'exécute dans une machine virtuelle ou un interpréteur qui fournit un accès indirect aux API Android, comme JavaScript dans une webview ou un navigateur. Cela signifie que vous pouvez utiliser des langages interprétés, comme JavaScript, Python, Lua, etc., pour mettre à jour votre application sans passer par le processus de révision de Google Play. Un outil qui peut aider dans ce processus est le plugin Capacitor Capgo. Ce plugin permet aux développeurs de mettre à jour leur code HTML, CSS et JavaScript et d'envoyer des mises à jour à leurs applications sans nécessiter de révision.

De plus, les applications ou le code tiers qui utilisent des langages interprétés, comme JavaScript, Python, Lua, etc., qui sont chargés lors de l'exécution, ne doivent pas permettre de violations potentielles des politiques de Google Play. Il est important de noter que ce code interprété ne doit pas être empaqueté avec l'application.

En suivant ces directives et en utilisant des outils comme le plugin Capacitor Capgo, vous pouvez vous assurer que les mises à jour de votre application sont conformes aux politiques de Google Play et que votre application reste disponible pour les utilisateurs sur la plateforme. N'oubliez pas qu'il est toujours conseillé de vérifier la dernière version des politiques de Google pour vous assurer de les suivre correctement.

Pour plus d'informations sur l'installation de Capgo pour contourner la révision, veuillez consulter mon prochain article.
