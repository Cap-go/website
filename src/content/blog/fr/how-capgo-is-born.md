---
slug: how-capgo-is-born
title: La naissance de Capgo
description: Histoire de comment j'ai commencé ce voyage et construit Capgo
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Illustration de la naissance de Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Story
published: true
locale: fr
next_blog: ''
---
Salut, je suis Martin Donadieu,

En juillet 2021, j'ai quitté [Naas](https://naas.ai/), la startup que j'ai cofondée en 2019 pour construire des projets en solo.

Pendant les 6 premiers mois de mon parcours en solo, je me suis concentré sur la relance de mon projet Captime, une application mobile que j'avais créée 4 ans plus tôt, et qui était devenue une activité secondaire avec le covid.

En décembre 2021, alors que je reconstruisais l'application à partir de zéro, j'ai rencontré des problèmes avec la version en production actuelle,

et les choses sont devenues compliquées, je devais la réparer, mais je voulais éviter de sortir une nouvelle version, alors j'ai cherché une solution pour déployer des mises à jour de code sur mon application.

À l'époque, Captime générait 400$/mois, je cherchais donc une solution abordable, Ionic Appflow était hors de mon budget.

La seule autre alternative était Microsoft App Center, mais ils ont arrêté le support pour les applications fonctionnant sur Cordova / Capacitor.

Si vous êtes un développeur solo comme moi, vous trouverez qu'Ionic AppFlow n'est pas le meilleur prix pour vous.

Comme vous, je m'en plaignais, j'ai contacté Ionic, ils ont compris la plainte, mais ils n'étaient pas ouverts à changer les prix, je n'étais pas la cible.

Alors, j'ai décidé d'essayer de résoudre ma plus grande difficulté dans mon workflow de développement Capacitor JS : les mises à jour en direct.

Après un mois d'essais, j'ai trouvé un moyen de télécharger depuis une URL un zip et remplacer le code source de l'application.

J'en ai parlé et j'ai reçu un énorme intérêt sur GitHub.

C'était trop manuel pour la plupart des équipes, alors elles ont demandé un service payant, c'est là que j'ai commencé à travailler sur Capgo comme alternative à AppFlow.

L'objectif était de fournir une solution simple et facile à utiliser pour déployer des mises à jour de code vers les applications JavaScript Capacitor.

Pas de build natif, pas de grosse boîte à outils comme Ionic, juste des mises à jour en direct, pour le marché qu'ils n'adressent pas, Nous.

Je les ai contactés pour partager avec eux ce que je faisais, et nous avons trouvé un accord d'amitié commerciale.

Je construis pour les créateurs, ils construisent pour les entreprises qui ont besoin de CI/CD et de support dédié :)

Vous êtes les bienvenus pour rejoindre la communauté et construire ensemble, je l'utilise aussi pour mes projets, et je m'attends même à ce que cela devienne mon projet principal à l'avenir.
