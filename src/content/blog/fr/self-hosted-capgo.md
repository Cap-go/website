---
slug: fr__self-hosted-capgo
title: Capgo auto-hébergé
description: >-
  L'auto-hébergement de Capgo vous permet de distribuer des mises à jour en
  direct de Capacitor à vos utilisateurs sans avoir à utiliser le service cloud
  de Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: Capgo auto-hébergé
tag: Solution
published: true
locale: fr
next_blog: ''
---

Cet article fournit un guide étape par étape sur la façon d'auto-héberger Capgo, ainsi qu'une discussion sur les avantages et les défis de l'auto-hébergement

# Introduction

L'auto-hébergement est une forme d'exploitation de votre propre site web ou application en configurant vous-même un serveur et un réseau. Au lieu d'utiliser une plateforme en tant que service ou un fournisseur de cloud public, ceux qui choisissent l'auto-hébergement géreront leurs propres réseaux et seront responsables de la maintenance et du temps de fonctionnement en plus de construire leur site web ou application.

La façon la plus simple de commencer avec Capgo est avec notre [service géré officiel dans le cloud](https://capgo.app/), mais si vous êtes prêt à gérer le vôtre, vous pouvez également auto-héberger Capgo sur votre serveur.

## Qu'est-ce que l'auto-hébergement ?

L'auto-hébergement, dans le contexte du domaine numérique, fait référence à la pratique de gérer ses propres serveurs ou infrastructure d'hébergement pour gérer et contrôler sa présence en ligne et ses services. Au lieu de s'appuyer sur des fournisseurs d'hébergement tiers, les individus et les organisations choisissent de configurer et de gérer leurs serveurs, sites web, applications et stockage de données selon leurs propres conditions.

## Pourquoi choisir l'auto-hébergement ?

Il y a de nombreuses raisons pour lesquelles les gens choisissent l'auto-hébergement. Voici quelques-uns des avantages les plus courants :

* **Confidentialité et contrôle :** L'auto-hébergement vous donne un contrôle total sur vos données et votre vie privée. Vous n'avez pas à vous soucier des fournisseurs tiers qui suivent votre activité ou vendent vos données.

* **Économies de coûts :** L'auto-hébergement peut être plus rentable à long terme, surtout si vous utilisez beaucoup de ressources ou exécutez plusieurs services.

* **Personnalisation :** L'auto-hébergement vous donne la flexibilité de personnaliser vos applications et services pour répondre à vos besoins spécifiques.

* **Apprentissage et expérimentation :** L'auto-hébergement peut être un excellent moyen d'apprendre Linux, l'administration système et d'autres sujets techniques. Cela peut aussi être une façon amusante d'expérimenter avec de nouveaux logiciels et services.

* **Indépendance :** L'auto-hébergement réduit votre dépendance aux fournisseurs externes. Vous n'êtes pas à la merci de leurs conditions de service, changements de tarification ou interruptions potentielles de service. Cette indépendance peut être cruciale pour les entreprises et les individus qui dépendent de leur présence en ligne pour des fonctions critiques.

## Quelle est la différence entre Capgo Cloud et Capgo Auto-hébergé ?

Il n'y a qu'une seule version de Capgo. Mes produits Cloud et Auto-hébergé sont complètement égaux. Il n'y a pas de version commerciale premium et exclusive avec un ensemble de fonctionnalités meilleur ou plus complet.

Vous obtenez le même tableau de bord, les mêmes métriques exploitables et le même engagement à [respecter la confidentialité de vos visiteurs](https://capgo.app/privacy/) avec les deux.

J'ai commencé à développer Capgo en décembre 2018, et j'ai lancé l'activité d'abonnement SaaS en mai 2019. Le projet est très vivant, activement développé et en croissance rapide. Il est également robuste et éprouvé au combat.

Voici les différences entre Capgo Cloud et Capgo Auto-hébergé :

|   | Cloud | Auto-hébergé |
| --- | --- | --- |
| **Hébergement** | Facile et pratique. Il faut 2 minutes pour commencer à envoyer votre première mise à jour, haute disponibilité, sauvegardes, sécurité et maintenance, tout est fait pour vous par moi. Je gère tout pour vous afin que vous n'ayez à vous soucier de rien. | Vous faites tout vous-même. Vous devez obtenir un serveur et gérer votre infrastructure. Vous êtes responsable de l'installation, de la maintenance, des mises à niveau, de la capacité du serveur, du temps de fonctionnement, des sauvegardes, de la sécurité, de la stabilité, de la cohérence, du temps de chargement, etc. |
| **Stockage** | Toutes les données des visiteurs sont exclusivement traitées sur une infrastructure cloud appartenant à l'UE. Je conserve les données de votre site sur un serveur sécurisé et crypté en Allemagne. Cela garantit que les données de votre site sont protégées par les strictes lois européennes sur la protection des données et assure la conformité au RGPD. Les données de votre site web ne quittent jamais l'UE. | Vous avez un contrôle total et pouvez héberger votre Capgo sur n'importe quel serveur dans n'importe quel pays que vous souhaitez. Hébergez-le sur un serveur dans votre sous-sol ou hébergez-le avec n'importe quel fournisseur de cloud où vous voulez, même ceux qui ne sont pas conformes au RGPD.Voici la traduction en français :

 |
| **Données brutes** | Vous voyez toutes les statistiques et métriques de votre site sur mon tableau de bord moderne, simple à utiliser et rapide à charger. Vous ne pouvez voir que les statistiques agrégées dans le tableau de bord | Vous êtes un analyste et voulez accéder aux données brutes ? L'auto-hébergement de Capgo vous donne cette option. Prenez les données directement de la base de données et importez-les dans un outil d'analyse de données de votre choix |
| **Coûts** | Il y a un coût associé à la fourniture d'un service de mise à jour, donc je facture des frais d'abonnement | Vous n'avez qu'à payer pour votre serveur et les coûts associés à l'exploitation d'un serveur. Vous n'avez jamais à me payer de frais, uniquement à votre fournisseur cloud |
| **Support Premium** | Un vrai support fourni par de vraies personnes qui construisent et maintiennent Capgo | Le support premium n'est pas inclus. La version auto-hébergée n'est supportée que par la communauté |
| **Versions** | Développé et amélioré en continu avec de nouvelles fonctionnalités et des mises à jour plusieurs fois par semaine | C'est une version à long terme publiée deux fois par an, donc les dernières fonctionnalités ne seront pas immédiatement disponibles car elles sont d'abord testées dans le cloud |

# Utilisation de la CLI avec Capgo auto-hébergé
Pour utiliser la CLI avec Capgo auto-hébergé, modifiez le capacitorconfig.ts depuis le répertoire de votre application et configurez-le comme ceci :

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

Note : Pour obtenir localSupaAnon, veuillez suivre ce [tutoriel](https://capgo.app/docs/self-hosted/local-dev/getting-started/) et copiez la clé anon dans localSupaAnon

# Utilisation du capacitor updater avec Capgo auto-hébergé

**Prérequis**

Avoir cloné [capgo](https://github.com/Cap-go/capgo/)

Pour utiliser le capacitor updater avec Capgo auto-hébergé, modifiez le `capacitorconfig.ts` depuis le répertoire de votre application et configurez-le comme ceci :

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

Cela vous permettra d'utiliser Capgo local en développement. Cependant, par défaut, cela n'est pas suffisant.

# Conclusion

En conclusion, l'auto-hébergement de Capgo peut être une bonne option pour les organisations qui disposent des ressources et de l'expertise nécessaires. Il offre un certain nombre d'avantages, notamment le contrôle du processus de mise à jour, la sécurité et la conformité. Cependant, il est important de bien peser les avantages et les défis avant de décider de l'auto-héberger.

Si vous envisagez d'auto-héberger Capgo, je vous recommande de commencer par lire la [documentation d'auto-hébergement](https://capgo.app/docs/self-hosted/getting-started/) de Capgo. Cela vous donnera une bonne compréhension des exigences et des risques de l'auto-hébergement.