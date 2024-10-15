---
slug: do-google-allow-live-updates
title: >-
  Google autorise-t-il l'envoi de mises à jour en direct aux applications sans
  l'examen de l'App Store.
description: "Comment pouvez-vous envoyer des mises à jour de code aux applications Android de production et être pleinement conforme aux directives de Google\_?"
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Illustration du contournement du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play est moins restrictif qu'Apple en matière de mise à jour des applications

La mise à jour de vos applications distribuées via Google Play peut être une tâche délicate, mais il est important de suivre les directives de Google pour rester conforme. Selon les directives de Google Play, les applications ne doivent pas se modifier, remplacer ou se mettre à jour en utilisant une méthode autre que le propre mécanisme de mise à jour de Google Play. signifie que le téléchargement de code exécutable, tel que des fichiers dex, JAR ou autres, à partir d'une source autre que Google Play n'est pas autorisé

Toutefois, cette restriction ne s'applique pas au code qui s'exécute dans une machine virtuelle ou à un interpréteur qui fournit un accès indirect aux API Android, comme JavaScript dans une vue Web ou un navigateur. Cela signifie que vous pouvez utiliser des langages interprétés, tels que JavaScript, Python, Lua. , etc., pour mettre à jour votre application sans passer par le processus de révision de Google Play. Un outil qui peut vous aider dans ce processus est le plugin Capgo Capacitor. Ce plugin permet aux développeurs de mettre à jour leur code HTML, CSS et JavaScript et d'envoyer des mises à jour à leurs applications sans avoir besoin de mettre à jour leur application. pour examen

De plus, les applications ou le code tiers qui utilisent des langages interprétés, tels que JavaScript, Python, Lua, etc., chargés au moment de l'exécution, ne doivent pas autoriser de violations potentielles des politiques de Google Play. Il est important de noter que ce code interprété ne doit pas être empaqueté. avec l'application

En suivant ces directives et en utilisant des outils tels que le plugin Capgo Capacitor, vous pouvez vous assurer que les mises à jour de votre application sont conformes aux politiques de Google Play et que votre application reste disponible pour les utilisateurs de la plateforme. Gardez à l'esprit que c'est toujours une bonne idée de doubler- vérifiez la dernière version des politiques de Google pour vous assurer que vous les suivez correctement

Pour plus d'informations sur la façon d'installer Capgo pour contourner l'examen, veuillez vous référer à mon prochain article