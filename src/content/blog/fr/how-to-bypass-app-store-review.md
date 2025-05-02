---
slug: comment-eviter-la-verification-de-l-app-store
title: >-
  Comment mettre à jour les applications Capacitor JS sans passer par la
  révision de l'App Store.
description: >-
  Comment la fonction Capgo peut-elle vous permettre d'envoyer des mises à jour
  de code aux applications iOS Ionic en production tout en respectant pleinement
  les directives d'Apple ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration du bypass de Capacitor
keywords: >-
  Apple, App Store, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: como-evitar-la-revision-de-la-app-store
---
_Je suis ravi(e) que vous posiez la question._

Mes avocats m'ont demandé de vous informer qu'il ne s'agit pas d'un avis juridique, mais vous n'avez pas besoin d'un diplôme en droit pour comprendre la formulation des directives officielles d'Apple. Les directives d'Apple permettent explicitement de transmettre du code exécutable directement à votre application, en contournant l'App Store, sous ces trois conditions :

* Le code est exécuté par le framework WebKit intégré d'Apple
* Le code ne fournit pas, ne déverrouille pas ou n'active pas de fonctionnalités supplémentaires
* L'utilisateur ne voit pas que la mise à jour est en cours

Avec le plugin Capacitor de Capgo, vous ne pouvez que mettre à jour et modifier votre HTML, CSS et JavaScript, donc nous respectons la première condition.

À noter que la capacité des applications à se mettre à jour sans passer par l'App Store existe depuis un certain temps.
Uniquement pour les applications créées avec des frameworks JavaScript comme React Native de Facebook et des services comme Expo.

Une preuve que React Native n'est pas plus natif que Capacitor 😆

Capgo est simplement la première solution abordable qui permet de pousser des mises à jour au niveau du code vers les applications Capacitor natives.
La deuxième condition, pas de nouvelles fonctionnalités, dépend vraiment de vous.

Capgo n'est pas destiné à ajouter de nouvelles fonctionnalités. Il est conçu pour les ajuster ou les corriger, évitant les versions mineures nécessaires pour corriger les bugs, ajouter des logs ou du tracking, mettre à jour les messages, forcer les utilisateurs à mettre à niveau, etc.

Pour les nouvelles fonctionnalités, vous devez passer par l'app store. Pour information, Ionic AppFlow (l'alternative pour les grandes entreprises) est installé sur plus de 50 millions d'appareils iOS et aucune application n'a jamais été rejetée parce qu'elle l'utilise.

Je dis cela car il est bon de savoir que des milliers d'autres développeurs utilisent les mises à jour en direct, vous n'êtes donc pas seul.

Apple et Google ont leurs propres règles concernant la mise à jour des applications.

Pour Apple, [consultez le paragraphe 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/).
\[…\] La seule exception à ce qui précède concerne les scripts et le code téléchargés et exécutés par le framework WebKit intégré d'Apple ou JavascriptCore \[…\] __TLDR__ : nous devons utiliser les mises à jour OTA uniquement pour corriger des bugs ou apporter des améliorations, sans faire de changements significatifs.

__Google__ Play est moins restrictif – ils indiquent que les applications installées depuis Google Play avec des bundles JavaScript [ne sont pas limitées](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en) aux mises à jour via les services Google uniquement.

Consultez mon prochain article pour plus d'informations sur l'installation de Capgo pour contourner la révision.
