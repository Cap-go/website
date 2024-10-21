---
slug: how-to-bypass-app-store-review
title: >-
  Voici comment mettre à jour les applications Capacitor sans examen de l'App
  Store.
description: >-
  Comment la fonctionnalité de Capgo peut-elle vous permettre d'envoyer des
  mises à jour de code en direct pour les applications Ionic iOS tout en
  respectant pleinement les directives d'Apple ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration pour éviter le condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Voici la traduction en français :

_Heureux que vous ayez posé la question_

Mes avocats m'ont demandé de vous informer que ceci n'est pas un avis juridique, mais vous n'avez pas besoin d'un diplôme en droit pour comprendre la formulation des directives officielles d'Apple. Les directives d'Apple vous autorisent explicitement à envoyer du code exécutable directement à votre application, en contournant l'App Store, sous ces trois conditions :

* Le code est exécuté par le framework WebKit intégré d'Apple
* Le code ne fournit pas, ne débloque pas ou n'active pas de fonctionnalités supplémentaires
* L'utilisateur ne voit pas que la mise à jour se produit

Avec le plugin Capacitor de Capgo, vous ne pouvez mettre à jour et modifier que votre HTML, CSS et JavaScript, donc nous sommes bons sur la première condition.

Par ailleurs, la capacité des applications à se mettre à jour sans passer par l'App Store existe depuis un certain temps.
Uniquement pour les applications créées à l'aide de frameworks JavaScript tels que React Native de Facebook et des services comme Expo.

Une preuve que React Native n'est pas plus natif que Capacitor 😆

Capgo est simplement la première solution abordable qui offre la possibilité de pousser des mises à jour au niveau du code pour les applications natives Capacitor.
La deuxième condition, pas de nouvelles fonctionnalités, dépend vraiment de vous.

Capgo n'est pas destiné à ajouter de nouvelles fonctionnalités. Il est conçu pour les ajuster ou les corriger, évitant les versions mineures nécessaires pour corriger des bugs, ajouter des journaux ou du suivi, mettre à jour des messages, forcer les utilisateurs à mettre à niveau, etc.

Pour les nouvelles fonctionnalités, vous devez publier via l'app store. Pour votre information, Ionic AppFlow (l'alternative pour les grandes entreprises) est installé sur plus de 50 millions d'appareils iOS et aucune application n'a jamais été rejetée parce qu'elle l'utilise.

Je dis cela parce qu'il est bon de savoir que des milliers d'autres développeurs utilisent les mises à jour en direct, donc vous n'êtes pas seul.

Apple et Google ont leurs propres règles sur la façon de mettre à jour les applications.

Pour Apple, [jetez un œil au paragraphe 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/)
[...] La seule exception à ce qui précède concerne les scripts et le code téléchargés et exécutés par le framework WebKit intégré d'Apple ou JavascriptCore [...] __TLDR__ : nous ne devrions utiliser les mises à jour OTA que pour corriger des bugs ou apporter des améliorations, sans faire de changements significatifs.

__Google__ Play est moins restrictif - ils disent que les applications installées depuis Google Play avec des bundles JavaScript [ne sont pas limitées](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en) à être mises à jour uniquement par les services Google.


Consultez mon prochain article pour plus d'informations sur l'installation de Capgo pour contourner l'examen.