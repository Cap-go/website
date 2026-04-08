---
slug: how-your-usage-is-counted
title: Comment votre utilisation est comptée dans Capgo
description: >-
  Comprendre comment Capgo calcule votre utilisation et en tirer le meilleur
  parti. Apprenez à mieux gérer vos forfaits
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /usage_explained.webp
head_image_alt: Système d'utilisation de Capgo expliqué
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: fr
next_blog: ''
---

Dans Capgo, 3 valeurs sont comptabilisées et importantes à comprendre
- Utilisateurs
- Stockage
- Bande passante

Chacune a une manière légèrement différente d'être comptabilisée

## Utilisateurs

Chaque fois qu'un utilisateur télécharge votre application Capacitor JS et l'ouvre, elle envoie une requête au backend de Capgo pour savoir si une mise à jour est disponible
Lorsque l'application fait cela, elle envoie peu d'informations, dont la plus importante est le `DeviceID`

`DeviceID` : est un ID unique (UUID) généré sur l'appareil. **Depuis la version du plugin v6.25.0 et v7.25.0**, cet ID persiste maintenant entre les réinstallations de l'application (stocké de manière sécurisée dans le stockage de l'appareil). Avant ces versions, l'ID était réinitialisé à chaque installation de l'application

Chaque fois que votre compte reçoit un nouveau Device ID, il est enregistré dans la base de données
Chaque fois qu'un ancien `DeviceID` demande une mise à jour (ouverture d'application), son enregistrement est mis à jour (updated_at dans la base de données)

Ces données sont sauvegardées à 2 endroits :
- table device avec la valeur `update_at`
- app_stats avec un compteur journalier qui représente le nombre d'appareils devenus actifs aujourd'hui et qui n'ont pas été actifs ce mois-ci

Pour la limite du forfait, la première méthode est utilisée car elle est fiable à 100%, pour l'affichage du graphique la seconde est utilisée
Vous pouvez voir les deux dans votre compte sur la page d'accueil :
- dans le graphique c'est la seconde méthode
- dans le tableau des applications c'est la première méthode

> Capgo ne compte pas les émulateurs et les builds de développement dans votre utilisation. Gardez à l'esprit qu'après l'essai, vous ne pouvez pas en avoir plus de 3%, sinon cela verrouillera votre compte, jusqu'à ce que vous le corrigiez

> Capgo effectue également un filtrage pour vous. Si vous avez configuré CI/CD pour envoyer votre version sur Google PLAY, Google exécute votre application Capacitor sur plus de 20 appareils réels à chaque fois. Pendant les 4 premières heures d'un nouveau bundle, nous bloquons les IP des centres de données Google pour éviter qu'elles soient comptées

Chaque mois, ces données repartent de zéro

- Créer ou mettre à jour un appareil dans ma base de données à chaque requête d'appareil
- Ajouter au compteur journalier le nombre d'appareils actifs qui n'ont pas été actifs ce mois-ci

La première méthode renvoie : 900+ utilisateurs
tandis que la seconde est à 200+ utilisateurs sur votre compte
Pour la limite du forfait j'utilise la première méthode, qui est fiable à 100%, et pour afficher le graphique j'utilise la seconde
Vous pouvez voir les deux sur la page d'accueil de votre compte

## Stockage

Chaque fois que vous téléchargez un bundle, ce nombre est augmenté de la taille du téléchargement

Ces données sont uniquement liées à la taille de votre téléchargement, plus la taille de votre application est optimisée, plus vous restez dans votre forfait

Si vous atteignez la limite ou en êtes proche, vous pouvez lister vos bundles avec le CLI :
`npx @capgo/cli@latest bundle list`
Pour voir ce que vous pourriez nettoyer, supprimer un bundle libère le stockage mais ne supprime pas les statistiques

Quand vous êtes prêt pour le nettoyage, utilisez cette commande pour supprimer plusieurs bundles :
`npx @capgo/cli@latest bundle cleanup`

PS : c'est bon pour la planète, mais aussi pour votre portefeuille 💪

> Vous pouvez également utiliser le `--external` lors du téléchargement pour utiliser votre stockage, et ne pas compter dans votre forfait

## Bande passante

Le calcul de cette valeur est un peu plus complexe, mais l'idée est la même que pour le stockage

Chaque fois qu'un utilisateur télécharge un bundle, ce nombre est augmenté de la taille du téléchargement

Ces données sont uniquement liées à la taille de votre téléchargement, plus la taille de votre application Capacitor JS est optimisée, plus vous restez dans votre forfait

> Une chose importante à noter, Capgo ne peut pas voir quelle taille est téléchargée, il voit uniquement la taille du bundle. Donc si vous avez un gros bundle, et que vous avez beaucoup d'utilisateurs qui échouent à le télécharger, vous atteindrez rapidement la limite

La meilleure façon de rester dans votre forfait est d'avoir un petit bundle, et si vous ne pouvez pas, montrez une barre de téléchargement à votre utilisateur, et informez-le du temps restant pour le téléchargement

À l'avenir, Capgo améliorera le système de téléchargement pour avoir plus de chances de télécharger le bundle en une seule fois