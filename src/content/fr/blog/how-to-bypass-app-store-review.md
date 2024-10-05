---
slug: how-to-bypass-app-store-review
title: >-
  Comment mettre à jour les applications Capacitor JS sans l'examen de l'App
  Store.
description: "Comment Capgo Feature peut-il vous permettre de diffuser des mises à jour de code vers des applications iOS Ionic en direct et d'être entièrement conforme aux directives d'Apple\_?"
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration du contournement du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

_Heureux que vous ayez demandé_

Mes avocats m'ont demandé de vous faire savoir qu'il ne s'agit pas d'un avis juridique, mais que vous n'avez pas besoin d'un diplôme en droit pour comprendre le libellé des directives officielles d'Apple. Les directives d'Apple vous permettent explicitement d'envoyer du code exécutable directement dans votre application, en contournant l'application. Conserver, dans ces trois conditions :

* Le code est exécuté par le framework WebKit intégré d'Apple
* Le code ne fournit, ne déverrouille ni n'active des fonctionnalités ou fonctionnalités supplémentaires
* L'utilisateur ne voit pas que la mise à jour est en cours

Avec le plugin Capgo condensateur, vous pouvez uniquement mettre à jour et modifier votre HTML CSS et JavaScript, nous sommes donc bons sur la première condition

Par ailleurs, la possibilité pour les applications de se mettre à jour elles-mêmes sans l'App Store existe depuis un certain temps.
Uniquement pour les applications créées à l'aide de frameworks JavaScript tels que React Native de Facebook et de services tels que Expo

Une preuve que React Native n'est pas plus Native que Capacitor 😆

Capgo est tout simplement la première solution abordable qui offre la possibilité d'envoyer des mises à jour au niveau du code vers les applications Capacitor natives.
La deuxième condition, aucune nouvelle fonctionnalité ou fonctionnalité, dépend vraiment de vous

Capgo n'est pas destiné à proposer de nouvelles fonctionnalités. Il est destiné à les modifier ou à les corriger, en évitant les versions mineures nécessaires pour corriger les bogues, ajouter la journalisation ou le suivi, mettre à jour les messages, forcer les utilisateurs à effectuer une mise à niveau, etc.

Pour de nouvelles fonctionnalités ou fonctionnalités, vous devez les publier via l'App Store. Pour votre information, Ionic AppFlow (l'alternative pour les grandes entreprises) est installé sur plus de 50 millions d'appareils iOS et aucune application n'a jamais été rejetée car elle l'utilise.

Je dis simplement cela parce qu'il est bon de savoir que des milliers d'autres développeurs utilisent des mises à jour en direct, vous n'êtes donc pas seul.

Apple et Google ont leurs propres règles sur la façon de mettre à jour les applications

Pour Apple, [jetez un œil au paragraphe 332](https://developerapplecom/programs/information/Apple_Developer_Program_Information_8_12_15pdf/)
\[…\] La seule exception à ce qui précède concerne les scripts et le code téléchargés et exécutés par le framework WebKit intégré d'Apple ou JavascriptCore \[…\] __TLDR__ : nous devons utiliser les mises à jour OTA uniquement pour corriger des bugs ou apporter des améliorations, sans apporter de modifications significatives. changements

__Google__ Play est moins restrictif : ils disent que les applications installées à partir de Google Play avec des packages JavaScript [ne sont pas restreintes](https://supportgooglecom/googleplay/android-developer/answer/9888379/?hl=en) à mettre à jour par les services Google seulement


Consultez mon prochain article pour plus d'informations sur la façon d'installer Capgo pour contourner l'examen.