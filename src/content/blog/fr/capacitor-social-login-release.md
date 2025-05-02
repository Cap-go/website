---
slug: lancement-dune-nouvelle-connexion-sociale-capacitor
title: Publication d'un nouveau plugin Capacitor Social Login
description: >-
  Le plugin Capacitor Social Login est un plugin qui permet de se connecter avec
  Google, Facebook et Apple sur iOS, Android et Web.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Illustration du système d'organisation Capgo
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: fr
original_slug: release-of-a-brand-new-capacitor-social-login
---
## Introduction

Hey, je suis Michael ([WcaleNieWolny](https://github.com/WcaleNieWolny)) 👋,

Après un mois de travail acharné (et un peu douloureux 🙃), je suis heureux d'annoncer la première version du Capacitor Social Login. Ce plugin est conçu pour faciliter la gestion de la connexion Google et Apple sur iOS et Android. De plus, avec Martin, nous avons travaillé sur des fonctionnalités uniques qui incluent :

 - L'introduction de la connexion avec Apple sur Android
 - L'adoption de la nouvelle API Google Credentials
 - L'ajout d'une documentation détaillée

## Login with Apple sur Android

Tout d'abord, parlons de l'innovation majeure de 'Login with Apple' sur Android. Ce n'était pas simple, car le SDK d'Apple ne fournit pas cette fonctionnalité. J'ai utilisé [cet article](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) comme point de référence, mais je l'ai légèrement modifié pour le rendre plus sécurisé. Le flux que j'ai finalement obtenu ressemble à ceci :

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

Malheureusement, cela nécessite un backend et quelques modifications dans le code de votre application, mais c'est le mieux que je puisse faire.

## Connexion Google actualisée sur Android

Ensuite, j'ai tenté d'implémenter la connexion Google sur Android. Il s'avère que le [CapacitorGoogleAuth de CodetrixStudio](https://github.com/CodetrixStudio/CapacitorGoogleAuth) utilise une [bibliothèque GMS bientôt obsolète](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization). Cette bibliothèque GMS étant considérée comme obsolète, j'ai décidé d'utiliser le [CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg). Cela a permis de simplifier le flux de connexion et a supprimé l'agaçante [erreur 10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

## Documentation

Enfin, j'ai rédigé une documentation incroyable ✨. J'ai passé beaucoup de temps à m'assurer que la documentation soit précise et complète.
La documentation inclut un guide détaillé pour configurer Apple et Google. J'ai également fourni un [exemple de backend](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo) pour Login with Apple 🍎

N'hésitez pas à consulter les guides [Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md) et [Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md) !

## Conclusion

En conclusion, le plugin Capacitor Social Login introduit de nombreuses fonctionnalités nouvelles et passionnantes, avec d'autres à venir dans le futur 🚀
