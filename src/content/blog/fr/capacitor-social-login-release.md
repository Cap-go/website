---
slug: fr__Release-of-a-brand-new-capacitor-social-login
title: Lancement d'un nouveau plugin de connexion sociale pour Capacitor
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Illustration du système d'organisation de Capgo
tag: Capacitor
published: true
next_blog: ''
locale: fr
---

# Introduction

Salut, je suis Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Après un mois de travail acharné (et un peu douloureux 🙃), je suis heureux d'annoncer la première version du Capacitor Social Login. Ce plugin est conçu pour aider à gérer la connexion Google et Apple sur iOS et Android. De plus, avec Martin, nous avons travaillé sur des fonctionnalités uniques qui incluent :

 - L'introduction de la connexion avec Apple sur Android 
 - L'adoption de la nouvelle API Google Credentials
 - L'ajout d'une documentation détaillée

# Connexion avec Apple sur Android

Tout d'abord, parlons de l'innovation majeure de la 'Connexion avec Apple' sur Android. Ce n'était pas simple, car le SDK d'Apple ne fournit pas cette fonctionnalité. J'ai utilisé [cet article](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) comme point de référence, mais je l'ai un peu modifié pour le rendre plus sécurisé. Le flux que j'ai fini par obtenir ressemble à ceci :

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Malheureusement, cela nécessite un backend et quelques modifications du code de votre application, mais c'est le mieux que je puisse faire.

# Connexion Google rafraîchie sur Android

Ensuite, j'ai tenté d'implémenter la connexion Google sur Android. Il s'avère que [CapacitorGoogleAuth de CodetrixStudio](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) utilise une [bibliothèque GMS bientôt obsolète](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). En conséquence, j'ai décidé d'utiliser le [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Cela a aidé à simplifier le flux de connexion et a supprimé l'agaçante [erreur 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

# Documentation

Enfin, j'ai rédigé une documentation incroyable ✨. J'ai passé beaucoup de temps à m'assurer que les docs étaient précises et complètes.
Les docs incluent un guide détaillé sur la configuration d'Apple et Google. J'ai également fourni un [exemple de backend](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) pour la connexion avec Apple 🍎

N'hésitez pas à consulter les guides [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) et [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd) !

# Conclusion

En conclusion, le plugin Capacitor Social Login introduit de nombreuses fonctionnalités nouvelles et passionnantes, avec d'autres à venir dans le futur 🚀