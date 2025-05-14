---
slug: self-hosted-capgo
title: Capgo autoalojado
description: >-
  L'auto-hébergement de Capgo vous permet de déployer des mises à jour en direct
  de Capacitor à vos utilisateurs sans avoir à utiliser le service cloud de
  Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: autoalojado capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: it
next_blog: ''
---
Cet article fournit un guide étape par étape sur la façon d'auto-héberger Capgo, ainsi qu'une discussion sur les avantages et les défis de l'auto-hébergement.

# Introduction

L'auto-hébergement est une forme de gestion de votre propre site web ou application en configurant un serveur et un réseau vous-même. Au lieu d'utiliser une plateforme en tant que service ou un fournisseur de cloud public, ceux qui choisissent l'auto-hébergement gèreront leurs propres réseaux et seront responsables de la maintenance et de la disponibilité, en plus de construire leur site web ou leur application.

La manière la plus simple de commencer avec Capgo est avec notre [service géré officiel dans le cloud](https://capgo.app/), mais si vous êtes heureux de gérer le vôtre, vous pouvez également auto-héberger Capgo sur votre serveur.

## Qu'est-ce que l'auto-hébergement?

L'auto-hébergement, dans le contexte du domaine numérique, fait référence à la pratique de gérer vos propres serveurs ou infrastructure d'hébergement pour gérer et contrôler votre présence et vos services en ligne. Au lieu de dépendre de fournisseurs d'hébergement tiers, des individus et des organisations choisissent de configurer et de gérer leurs serveurs, sites web, applications et stockage de données selon leurs propres conditions.

## Pourquoi choisissez-vous l'auto-hébergement?

Il existe de nombreuses raisons pour lesquelles les gens choisissent l'auto-hébergement. Certains des avantages les plus courants incluent :

* **Confidentialité et contrôle :** L'auto-hébergement vous donne un contrôle total sur vos données et votre vie privée. Vous n'avez pas à vous soucier des fournisseurs tiers traçant votre activité ou vendant vos données.

* **Économies :** L'auto-hébergement peut être plus rentable à long terme, surtout si vous utilisez beaucoup de ressources ou gérez plusieurs services.

* **Personnalisation :** L'auto-hébergement vous offre la flexibilité de personnaliser vos applications et services selon vos besoins spécifiques.

* **Apprentissage et expérimentation :** L'auto-hébergement peut être un excellent moyen d'apprendre sur Linux, l'administration système et d'autres sujets techniques. Cela peut également être une manière amusante d'expérimenter avec de nouveaux logiciels et services.

* **Indépendance :** L'auto-hébergement réduit votre dépendance à des fournisseurs externes. Vous n'êtes pas à la merci de leurs conditions de service, de changements de prix ou de potentielles interruptions de service. Cette indépendance peut être cruciale pour les entreprises et les individus qui comptent sur leur présence en ligne pour des fonctions critiques.

## Quelle est la différence entre Capgo Cloud et Capgo Auto-Hébergé?

Il n'y a qu'une seule version de Capgo. Mes produits Cloud et Autohébergés sont complètement égaux. Il n'y a pas de version commerciale premium et exclusive avec un ensemble de fonctionnalités meilleur ou plus complet.

Vous obtenez le même tableau de bord, les mêmes indicateurs exploitables et le même engagement à [respecter la vie privée de vos visiteurs](https://capgo.app/privacy/) avec les deux.

J'ai commencé à développer Capgo en décembre 2018 et j'ai lancé l'entreprise d'abonnement SaaS en mai 2019. Le projet est très vivant, activement développé et en pleine croissance. Il est également robuste et testé en conditions réelles.

Voici les différences entre Capgo Cloud et Capgo Auto-Hébergé :

|   | Cloud | Auto-hébergé |
| --- | --- | --- |
| **Hébergement** | Facile et pratique. Il faut 2 minutes pour commencer à envoyer votre première mise à jour, haute disponibilité, sauvegardes, sécurité et maintenance tout fait par moi. Je gère tout pour vous, afin que vous n'ayez à vous soucier de rien. | Vous faites tout vous-même. Vous devez obtenir un serveur et gérer votre infrastructure. Vous êtes responsable de l'installation, de la maintenance, des mises à jour, de la capacité du serveur, de la disponibilité, des sauvegardes, de la sécurité, de la stabilité, de la cohérence, du temps de chargement, etc. |
| **Stockage** | Toutes les données des visiteurs sont exclusivement traitées sur une infrastructure cloud détenue par l'UE. Je garde vos données de site sur un serveur sécurisé, crypté et situé en Allemagne. Cela garantit que vos données de site sont protégées par les strictes lois européennes sur la confidentialité des données et assure la conformité au RGPD. Les données de votre site web ne quittent jamais l'UE. | Vous avez un contrôle total et pouvez héberger votre Capgo sur n'importe quel serveur dans n'importe quel pays que vous souhaitez. Hébergez-le sur un serveur dans votre sous-sol ou hébergez-le avec n'importe quel fournisseur cloud où vous le souhaitez, même ceux qui ne sont pas conformes au RGPD. |
| **Données brutes** | Vous voyez toutes vos statistiques de site et vos métriques sur mon tableau de bord moderne, simple à utiliser et à chargement rapide. Vous ne pouvez voir que les statistiques agrégées dans le tableau de bord. | Êtes-vous un analyste et souhaitez-vous accéder aux données brutes ? L'auto-hébergement de Capgo vous donne cette option. Prenez les données directement de la base de données et importez-les dans un outil d'analyse de données de votre choix. |
| **Coûts** | Il y a un coût associé à la fourniture d’un service de mise à jour, donc je facture des frais d'abonnement. | Vous devez seulement payer pour votre serveur et pour tout coût associé à l'exécution d'un serveur. Vous n'avez jamais à me payer de frais, seulement à votre fournisseur cloud. |
| **Support Premium** | Un véritable support fourni par de vraies personnes qui construisent et maintiennent Capgo. | Le support premium n'est pas inclus. La version auto-hébergée est uniquement supportée par la communauté. |
| **Versions** | Développé et amélioré en continu avec de nouvelles fonctionnalités et mises à jour plusieurs fois par semaine. | C'est une version à long terme publiée deux fois par an, donc les dernières fonctionnalités ne seront pas immédiatement disponibles car elles sont d'abord testées en conditions réelles dans le cloud. |

# Comment auto-héberger Capgo

Nous utilisons principalement Supabase dans Capgo, pour l'auto-hébergement, vous devez simplement suivre la [documentation d'auto-hébergement de Supabase](https://supabase.com/docs/guides/self-hosting/docker).

# Utilisation de la CLI avec capgo auto-hébergé
Pour utiliser la CLI avec capgo auto-hébergé, modifiez le capacitor.config.ts depuis votre répertoire d'application et réglez-le comme ceci :

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

Remarque : Pour obtenir localSupaAnon, veuillez suivre ce [tutoriel](https://capgo.app/docs/self-hosted/local-dev/getting-started/) et copiez la clé anon dans localSupaAnon

# Utilisation du mise à jourur capacitor avec capgo auto-hébergé

**Exigence**

Cloné [capgo](https://github.com/Cap-go/capgo/)

Pour utiliser le mise à jourur capacitor avec capgo auto-hébergé, modifiez le `capacitor.config.ts` depuis votre répertoire d'application et réglez-le comme ceci :

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

Cela vous permettra d'utiliser capgo localement en développement. Cependant, par défaut, ceci n'est pas suffisant.

# Conclusion

En conclusion, l'auto-hébergement de Capgo peut être une bonne option pour les organisations qui ont les ressources et l'expertise nécessaires. Cela offre plusieurs avantages, notamment le contrôle sur le processus de mise à jour, la sécurité et la conformité. Cependant, il est important de bien peser les avantages et les défis avant de décider d'auto-héberger.

Si vous envisagez d'auto-héberger Capgo, je vous recommande de commencer par lire la [documentation d'auto-hébergement de Capgo](https://capgo.app/docs/self-hosted/getting-started/). Cela vous donnera une bonne compréhension des exigences et des risques liés à l'auto-hébergement.
