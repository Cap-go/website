---
slug: how-capgo-is-born
title: Comment est né Capgo
description: Histoire de la façon dont j'ai commencé ce voyage et construit Capgo
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Illustration de naissance Capgo
tag: Story
published: true
locale: fr
next_blog: ''
---

Hé, je m'appelle Martin Donadieu,

En juillet 2021, j'ai quitté [Naas](https://naasai/) la startup que j'ai cofondée en 2019 pour monter des projets en solo

Durant les 6 premiers mois de mon parcours solo je me suis concentré sur le redémarrage de mon projet Captime, une application mobile que j'ai réalisée 4 ans plus tôt, devenue une activité parallèle avec le covid.


En décembre 2021, alors que je reconstruisais l'application à partir de zéro, j'ai rencontré un problème avec la version de production actuelle, 

et les choses sont devenues compliquées, j'ai dû le réparer, mais je voulais éviter de publier une nouvelle version, j'ai donc cherché une solution pour envoyer des mises à jour de code à mon application

A l'époque, Captime gagnait 400$/mois, donc je cherchais une solution abordable, Ionic Appflow était hors de mon budget

La seule autre alternative était Microsoft App Center, mais ils ont supprimé la prise en charge des applications exécutées sur Cordova/Capacitor.

Si vous êtes un développeur solo comme moi, vous constaterez que Ionic AppFlow n'est pas le meilleur prix pour vous.

Comme vous, je m'en plaignais, j'ai contacté Ionic, ils ont compris la plainte, mais ils n'étaient pas disposés à modifier le prix, je n'étais pas la cible

J'ai donc décidé d'essayer de résoudre mon plus gros problème dans mon flux de travail de développement Capacitor JS : les mises à jour en direct.

Après un mois d'essais, j'ai trouvé un moyen de télécharger à partir d'une URL un zip et de remplacer la source de l'application.

J'en ai parlé et j'ai suscité un énorme intérêt sur GitHub

C'était trop manuel pour la plupart des équipes, alors elles ont demandé un service payant, c'est là que j'ai commencé à travailler sur Capgo comme alternative à AppFlow

L'objectif était de fournir une solution simple et facile à utiliser pour transmettre les mises à jour du code aux applications JavaScript Capacitor.

Pas de build natif, pas de grosse boîte à outils comme Ionic, juste des mises à jour en direct, pour le marché auquel ils ne s'adressent pas, nous

Je les ai contactés pour partager avec eux ce que je faisais, et nous avons trouvé un accord d'amitié commerciale

Je construis pour le créateur, ils construisent pour les entreprises qui ont besoin de CI/CD et d'un support dédié :)

Vous êtes invités à rejoindre la communauté pour construire ensemble, je l'utilise aussi pour mes projets, et même j'espère que cela deviendra mon projet principal à l'avenir.