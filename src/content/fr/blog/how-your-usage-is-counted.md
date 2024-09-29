---
slug: how-your-usage-is-counted
title: Comment votre utilisation est comptabilisée dans Capgo
description: >-
  Comprenez comment Capgo compte votre utilisation et utilisez-la au mieux.
  Apprenez à mieux gérer votre forfait
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Capgo usage system explained
tag: Solution
published: true
next_blog: ''
locale: fr
---

Dans Capgo, 3 valeurs sont comptées et importantes à comprendre
- De l'utilisateur
- Stockage
- Bande passante

Chacun comme une manière légèrement différente d'être compté


## Utilisateurs

Chaque fois qu'un utilisateur télécharge votre application Capacitor JS et l'ouvre, il enverra une demande au backend Capgo pour savoir si la mise à jour est disponible.
Lorsque l'application fait cela, elle envoie peu d'informations, y compris la plus importante "DeviceID"

`DeviceID` : est un identifiant unique (UUID) défini par le système d'exploitation de l'appareil, cet identifiant est unique par installation de l'application

Chaque fois que votre compte reçoit un nouvel identifiant d'appareil, celui-ci est enregistré dans la base de données
Chaque fois qu'un ancien `DeviceID` demande une mise à jour (application ouverte), son enregistrement est mis à jour (updated_at dans la base de données)

Ces données sont enregistrées à 2 endroits :
- table des périphériques avec la valeur `update_at`
- app_stats avec compteur quotidien qui représente le nombre d'appareils devenus actifs aujourd'hui et qui ne l'ont pas été ce mois-ci

Pour la limite du plan, la première méthode est utilisée car elle est fiable à 100 %, pour l'affichage du graphique, la seconde est utilisée
Vous pouvez voir les deux dans votre compte sur la page d'accueil :
- dans le tableau se trouve la deuxième méthode
- dans le tableau des applications se trouve la première méthode

> Capgo ne compte pas l'émulateur et le développement dans votre utilisation. Gardez à l'esprit qu'après l'essai, vous ne pouvez pas en avoir plus de 3 %, sinon cela verrouillera votre compte jusqu'à ce que vous le répariez.

> Capgo effectue également un filtrage pour vous. Si vous avez configuré CI/CD pour envoyer votre version à Google PLAY, Google exécute à chaque fois votre application Capacitor sur plus de 20 appareils réels. Pendant les 4 premières heures d'un nouveau bundle, nous bloquons Google. IP du centre de données pour éviter qu'elles soient comptées

Chaque mois, ces données repartent de zéro


- Créer ou mettre à jour un appareil dans ma base de données à chaque demande d'appareil
- Ajouter à un compteur quotidien le nombre d'appareils actifs qui n'ont pas été actifs ce mois-ci

La première méthode renvoie : 900+ utilisateurs
tandis que le second compte plus de 200 utilisateurs sur votre compte
Pour la limite du plan j'utilise la première méthode, qui est fiable à 100%, et pour afficher le graphique j'utilise la seconde
Vous pouvez voir les deux sur la page d'accueil de votre compte

## Stockage

Chaque fois que vous téléchargez un bundle, ce nombre est augmenté de la taille du téléchargement.

Ces données sont uniquement liées à la taille de votre téléchargement, plus la taille de votre application est élevée, mieux vous restez dans votre forfait.

Si vous atteignez la limite ou si vous en êtes proche, vous pouvez lister vos offres groupées avec la CLI :
`npx @capgo/cli@dernière liste de bundles`
Pour voir ce que vous pourriez nettoyer, en supprimant un bundle, libérez le stockage mais ne supprimez pas les statistiques

Lorsque vous êtes prêt pour le nettoyage, utilisez cette commande pour supprimer de nombreux bundles :
`npx @capgo/cli@dernier nettoyage du bundle`

PS : c'est bon pour la planète, mais aussi pour votre portefeuille 💪

> Vous pouvez également utiliser le `--external` de téléchargement pour utiliser votre stockage, et ne pas compter dans votre forfait

## Bande passante

Le calcul de cette valeur est un peu plus complexe, mais l'idée est la même que celle du stockage.

Chaque fois qu'un utilisateur télécharge un bundle, ce nombre augmente de la taille du téléchargement.

Ces données sont uniquement liées à la taille de votre téléchargement, plus la taille de votre application Capacitor JS est grande, mieux vous restez dans votre forfait.

> Une chose importante à noter, Capgo ne peut pas voir quelle taille est téléchargée, il ne voit que la taille du bundle. Donc si vous avez un gros bundle et que de nombreux utilisateurs ne parviennent pas à le télécharger, vous atteindrez rapidement la limite.

La meilleure façon de rester dans votre forfait est d'avoir un petit forfait, et si vous ne pouvez pas, d'afficher une barre de téléchargement à votre utilisateur et de lui faire savoir combien il lui reste à télécharger.

À l'avenir, Capgo améliorera le système de téléchargement pour avoir plus de chances de télécharger le pack en même temps.