---
slug: self-hosted-capgo
title: Capgo auto-hébergé
description: >-
  L'auto-hébergement de Capgo vous permet de déployer des mises à jour en direct
  de Capacitor vers vos utilisateurs sans avoir à utiliser le service cloud
  Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: auto-hébergé capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: fr
next_blog: ''
---

Cet article fournit un guide étape par étape sur l'auto-hébergement de Capgo, ainsi qu'une discussion sur les avantages et les défis de l'auto-hébergement

# Introduction

L'auto-hébergement consiste à faire fonctionner votre propre site web ou application en configurant vous-même un serveur et un réseau. Au lieu d'utiliser une Plateforme en tant que Service ou un Fournisseur de Cloud Public, ceux qui choisissent l'auto-hébergement géreront leurs propres réseaux et seront responsables de la maintenance et du temps de fonctionnement en plus de la construction de leur site web ou application.

La façon la plus simple de démarrer avec Capgo est d'utiliser notre [service géré officiel dans le cloud](https://capgoapp/), mais si vous préférez gérer le vôtre, vous pouvez également auto-héberger Capgo sur votre serveur.

## Qu'est-ce que l'auto-hébergement ?

L'auto-hébergement, dans le contexte du domaine numérique, fait référence à la pratique de faire fonctionner vos propres serveurs ou infrastructure d'hébergement pour gérer et contrôler votre présence en ligne et vos services. Au lieu de s'appuyer sur des fournisseurs d'hébergement tiers, les individus et les organisations choisissent de configurer et de gérer leurs serveurs, sites web, applications et stockage de données selon leurs conditions.

## Pourquoi choisir l'auto-hébergement ?

Il existe de nombreuses raisons pour lesquelles les gens choisissent l'auto-hébergement. Voici les avantages les plus courants :

* **Confidentialité et contrôle :** L'auto-hébergement vous donne un contrôle total sur vos données et votre confidentialité. Vous n'avez pas à vous soucier des fournisseurs tiers qui suivent votre activité ou vendent vos données.

* **Économies :** L'auto-hébergement peut être plus rentable à long terme, particulièrement si vous utilisez beaucoup de ressources ou exécutez plusieurs services.

* **Personnalisation :** L'auto-hébergement vous donne la flexibilité de personnaliser vos applications et services pour répondre à vos besoins spécifiques.

* **Apprentissage et expérimentation :** L'auto-hébergement peut être un excellent moyen d'apprendre Linux, l'administration système et d'autres sujets techniques. Il peut aussi être un moyen amusant d'expérimenter avec de nouveaux logiciels et services.

* **Indépendance :** L'auto-hébergement réduit votre dépendance aux fournisseurs externes. Vous n'êtes pas à la merci de leurs conditions de service, changements de prix ou interruptions potentielles de service. Cette indépendance peut être cruciale pour les entreprises et les individus qui dépendent de leur présence en ligne pour des fonctions critiques.

## Quelle est la différence entre Capgo Cloud et Capgo Auto-hébergé ?

Il n'existe qu'une seule version de Capgo. Mes produits Cloud et Auto-hébergés sont complètement égaux. Il n'y a pas de version commerciale premium et exclusive avec un ensemble de fonctionnalités meilleur ou plus complet.

Vous obtenez le même tableau de bord, les mêmes métriques exploitables et le même engagement à [respecter la confidentialité de vos visiteurs](https://capgoapp/privacy/) avec les deux.

J'ai commencé à développer Capgo en décembre 2018, et j'ai lancé l'activité d'abonnement SaaS en mai 2019. Le projet est très vivant, activement développé et en croissance rapide. Il est également robuste et éprouvé.

Voici les différences entre Capgo Cloud et Capgo Auto-hébergé :

|   | Cloud | Auto-hébergé |
| --- | --- | --- |
| **Hébergement** | Facile et pratique. Il faut 2 minutes pour commencer à envoyer votre première mise à jour, haute disponibilité, sauvegardes, sécurité et maintenance, tout est fait pour vous par moi. Je gère tout pour vous afin que vous n'ayez à vous soucier de rien. | Vous faites tout vous-même. Vous devez obtenir un serveur et gérer votre infrastructure. Vous êtes responsable de l'installation, la maintenance, les mises à niveau, la capacité du serveur, le temps de fonctionnement, la sauvegarde, la sécurité, la stabilité, la cohérence, le temps de chargement, etc. |
| **Stockage** | Toutes les données des visiteurs sont exclusivement traitées sur une infrastructure cloud appartenant à l'UE. Je conserve les données de votre site sur un serveur sécurisé et crypté en Allemagne. Cela garantit que les données de votre site sont protégées par les strictes lois européennes sur la protection des données et assure la conformité au RGPD. Les données de votre site web ne quittent jamais l'UE. | Vous avez le contrôle total et pouvez héberger votre Capgo sur n'importe quel serveur dans n'importe quel pays de votre choix. Hébergez-le sur un serveur dans votre sous-sol ou hébergez-le avec n'importe quel fournisseur de cloud où vous voulez, même ceux qui ne sont pas conformes au RGPD. ||
| **Données brutes** | Vous voyez toutes les statistiques et métriques de votre site sur mon tableau de bord moderne, simple à utiliser et rapide à charger. Vous ne pouvez voir que les statistiques agrégées dans le tableau de bord | Vous êtes analyste et souhaitez accéder aux données brutes ? L'auto-hébergement de Capgo vous donne cette option. Prenez les données directement depuis la base de données et importez-les dans l'outil d'analyse de votre choix |
| **Coûts** | Il y a un coût associé à la fourniture d'un service de mise à jour, donc je facture un abonnement | Vous ne payez que pour votre serveur et les coûts associés à son fonctionnement. Vous n'avez jamais à me payer de frais, uniquement à votre fournisseur cloud |
| **Support Premium** | Un véritable support fourni par de vraies personnes qui construisent et maintiennent Capgo | Le support premium n'est pas inclus. La version auto-hébergée n'est supportée que par la communauté |
| **Versions** | Développement et améliorations continus avec de nouvelles fonctionnalités et mises à jour plusieurs fois par semaine | C'est une version à long terme publiée deux fois par an, donc les dernières fonctionnalités ne seront pas immédiatement disponibles car elles sont d'abord testées dans le cloud |

# Comment auto-héberger Capgo

Nous utilisons principalement Supabase dans Capgo, pour l'auto-hébergement il vous suffit de suivre la [documentation d'auto-hébergement Supabase](https://supabasecom/docs/guides/self-hosting/docker)

# Utilisation de la CLI avec capgo auto-hébergé
Pour utiliser la CLI avec capgo auto-hébergé, modifiez le capacitorconfigts depuis le répertoire de votre application et configurez-le comme ceci :

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

Note : Pour obtenir localSupaAnon, veuillez suivre ce [tutoriel](https://capgoapp/docs/self-hosted/local-dev/getting-started/) et copiez la clé anon dans localSupaAnon

# Utilisation du capacitor updater avec capgo auto-hébergé

**Prérequis**

[capgo](https://githubcom/Cap-go/capgo/) cloné

Pour utiliser le capacitor updater avec capgo auto-hébergé, modifiez le `capacitorconfigts` depuis le répertoire de votre application et configurez-le comme ceci :

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

Cela vous permettra d'utiliser capgo local en développement. Cependant, par défaut, ce n'est pas suffisant

# Conclusion

En conclusion, l'auto-hébergement de Capgo peut être une bonne option pour les organisations qui disposent des ressources et de l'expertise nécessaires. Il offre plusieurs avantages, notamment le contrôle du processus de mise à jour, la sécurité et la conformité. Cependant, il est important de bien évaluer les avantages et les défis avant de décider d'auto-héberger.

Si vous envisagez d'auto-héberger Capgo, je vous recommande de commencer par lire la [documentation d'auto-hébergement](https://capgoapp/docs/self-hosted/getting-started/) de Capgo. Cela vous donnera une bonne compréhension des exigences et des risques de l'auto-hébergement.