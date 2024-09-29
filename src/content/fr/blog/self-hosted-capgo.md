---
slug: self-hosted-capgo
title: Capgo auto-hébergé
description: >-
  Capgo auto-hébergé vous permet de déployer des mises à jour en direct de
  Capacitor auprès de vos utilisateurs sans avoir à utiliser le service cloud
  Capgo.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: self-hosted capgo
tag: Solution
published: true
next_blog: ''
locale: fr
---

Cet article fournit un guide étape par étape sur la façon d'auto-héberger Capgo, ainsi qu'une discussion sur les avantages et les défis de l'auto-hébergement.

# Introduction

L'auto-hébergement est une forme de gestion de votre propre site Web ou application en configurant vous-même un serveur et un réseau. Au lieu d'utiliser une plateforme en tant que service ou un fournisseur de cloud public, ceux qui choisissent de s'auto-héberger géreront leurs propres réseaux et seront responsables de la maintenance et la disponibilité en plus de la construction de leur site Web ou de leur application

Le moyen le plus simple de démarrer avec Capgo est d'utiliser notre [service géré officiel dans le cloud](https://capgoapp/), mais si vous souhaitez gérer le vôtre, vous pouvez également auto-héberger Capgo sur votre serveur.

## Qu'est-ce que l'auto-hébergement ?

L'auto-hébergement, dans le contexte du domaine numérique, fait référence à la pratique consistant à gérer vos propres serveurs ou infrastructures d'hébergement pour gérer et contrôler votre présence et vos services en ligne. Au lieu de compter sur des fournisseurs d'hébergement tiers, les individus et les organisations choisissent de mettre en place et gérer leurs serveurs, sites Web, applications et stockage de données selon leurs conditions

## Pourquoi choisissez-vous l'auto-hébergement ?

Il existe de nombreuses raisons pour lesquelles les gens choisissent de s'auto-héberger. Certains des avantages les plus courants incluent :

* **Confidentialité et contrôle :** L'auto-hébergement vous donne un contrôle total sur vos données et votre confidentialité. Vous n'avez pas à vous soucier des fournisseurs tiers qui suivent votre activité ou vendent vos données.

* **Économies :** L'auto-hébergement peut être plus rentable à long terme, surtout si vous utilisez beaucoup de ressources ou si vous exécutez plusieurs services.

* **Personnalisation :** L'auto-hébergement vous offre la flexibilité de personnaliser vos applications et services pour répondre à vos besoins spécifiques.

* **Apprentissage et expérimentation :** L'auto-hébergement peut être un excellent moyen d'en apprendre davantage sur Linux, l'administration système et d'autres sujets techniques. Il peut également être un moyen amusant d'expérimenter de nouveaux logiciels et services.

* **Indépendance :** L'auto-hébergement réduit votre dépendance à l'égard des fournisseurs externes. Vous n'êtes pas à la merci de leurs conditions de service, de leurs changements de prix ou de potentielles interruptions de service. Cette indépendance peut être cruciale pour les entreprises et les particuliers qui dépendent de leur service en ligne. présence pour les fonctions critiques

## Quelle est la différence entre Capgo Cloud et Capgo Self-Hosted ?

Il n'existe qu'une seule version de Capgo. Mes produits Cloud et auto-hébergés sont complètement égaux. Il n'existe pas de version commerciale premium et exclusive avec un ensemble de fonctionnalités meilleur ou plus complet.

Vous obtenez le même tableau de bord, les mêmes mesures exploitables et le même engagement à [respecter la vie privée de vos visiteurs](https://capgoapp/privacy/) avec les deux

J'ai commencé à développer Capgo en décembre 2018 et j'ai lancé l'activité d'abonnement SaaS en mai 2019. Le projet est bien vivant, activement développé et en croissance rapide. Il est également robuste et testé au combat.

Voici les différences entre Capgo Cloud et Capgo Self-Hosted :

|   | Nuage | Auto-hébergé |
| --- | --- | --- |
| **Hébergement** | Facile et pratique Il faut 2 minutes pour commencer à envoyer votre première mise à jour, haute disponibilité, sauvegardes, sécurité et maintenance, tout est fait pour vous par moi. Je gère tout pour vous afin que vous n'ayez à vous soucier de rien | Vous faites tout vous-même Vous avez besoin d'un serveur et vous devez gérer votre infrastructure Vous êtes responsable de l'installation, de la maintenance, des mises à niveau, de la capacité du serveur, de la disponibilité, de la sauvegarde, de la sécurité, de la stabilité, de la cohérence, du temps de chargement, etc. |
| **Stockage** | Toutes les données des visiteurs sont exclusivement traitées sur une infrastructure cloud appartenant à l'UE. Je conserve les données de votre site sur un serveur sécurisé et crypté en Allemagne. Cela garantit que les données de votre site sont protégées par les lois strictes de l'Union européenne sur la confidentialité des données et garantit la conformité au RGPD. Les données de votre site Web ne quitte jamais l'UE | Vous avez le contrôle total et pouvez héberger votre Capgo sur n'importe quel serveur dans n'importe quel pays de votre choix. Hébergez-le sur un serveur dans votre sous-sol ou hébergez-le chez n'importe quel fournisseur de cloud où vous le souhaitez, même ceux qui ne sont pas conformes au RGPD.|
| **Données brutes** | Vous voyez toutes les statistiques et mesures de votre site sur mon tableau de bord moderne, simple à utiliser et à chargement rapide. Vous ne pouvez voir que les statistiques agrégées dans le tableau de bord | Vous êtes analyste et souhaitez accéder aux données brutes ? Héberger Capgo vous-même vous offre cette option. Récupérez les données directement de la base de données et importez-les dans un outil d'analyse de données de votre choix |
| **Coûts** | Il y a un coût associé à la fourniture d'un service de mise à jour, je facture donc des frais d'abonnement | Vous n'avez qu'à payer pour votre serveur et quel que soit le coût associé à l'exploitation d'un serveur. Vous n'avez jamais à me payer de frais, uniquement à votre fournisseur de cloud |
| **Assistance Premium** | Un véritable support fourni par de vrais êtres humains qui construisent et entretiennent Capgo | Le support Premium n'est pas inclus. La version auto-hébergée est uniquement prise en charge par la communauté |
| **Communiqués** | Développé et amélioré en permanence avec de nouvelles fonctionnalités et mises à jour plusieurs fois par semaine | Il s’agit d’une version à long terme publiée deux fois par an, donc les dernières fonctionnalités ne seront pas immédiatement disponibles car elles sont d’abord testées dans le cloud |

# Utilisation de la CLI avec capgo auto-hébergé
Pour utiliser la CLI avec capgo auto-hébergé, modifiez les configurations de condensateur à partir du répertoire de votre application et définissez-le comme ceci :

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Remarque : Pour obtenir localSupaAnon, veuillez suivre ce [tutoriel](https://capgoapp/docs/self-hosted/local-dev/getting-started/) et copiez la clé anon dans localSupaAnon.

# Utilisation du programme de mise à jour du condensateur avec capgo auto-hébergé

**Exigence**

Cloné [capgo](https://githubcom/Cap-go/capgo/)

Pour utiliser le programme de mise à jour des condensateurs avec capgo auto-hébergé, modifiez les « capacitorconfigts » dans le répertoire de votre application et définissez-le comme ceci :

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

Cela vous permettra d'utiliser capgo local en développement. Cependant, par défaut, cela ne suffit pas

# Conclusion

En conclusion, l'auto-hébergement Capgo peut être une bonne option pour les organisations qui disposent des ressources et de l'expertise nécessaires. Il offre un certain nombre d'avantages, notamment le contrôle du processus de mise à jour, la sécurité et la conformité. Cependant, il est important de peser soigneusement les avantages et défis avant de décider d’auto-héberger

Si vous envisagez d'auto-héberger Capgo, je vous recommande de commencer par lire la [documentation d'auto-hébergement](https://capgoapp/docs/self-hosted/getting-started/) de Capgo. Cela vous donnera une bonne compréhension de les exigences et les risques de l’auto-hébergement