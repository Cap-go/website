---
slug: it__live-updates-for-flutter-app
title: Aggiornamenti in tempo reale di Flutter
description: >-
  È possibile inviare aggiornamenti direttamente a un'app Flutter senza passare
  attraverso il processo di revisione dell'App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustrazione di bypass per condensatore
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update è un servizio che consente agli sviluppatori di distribuire aggiornamenti alle loro app mobili senza passare attraverso il tradizionale processo di invio all'App Store. Questo può essere un modo conveniente per correggere rapidamente bug o apportare piccoli aggiornamenti a un'app senza attendere il processo di revisione dell'App Store. Tuttavia, Capgo Live Update non supporta l'aggiornamento delle app Flutter perché le app Flutter sono compilate in codice nativo.

Flutter è un framework di sviluppo di app mobili che utilizza il linguaggio di programmazione Dart. Una delle caratteristiche chiave di Flutter è che permette agli sviluppatori di creare app che possono funzionare sia su iOS che su Android utilizzando un unico codice base. Per ottenere questo, Flutter compila il codice dell'app in codice nativo per ogni piattaforma. Ciò significa che l'app è essenzialmente un'app nativa, piuttosto che un'app basata sul web o un'app ibrida.

Poiché le app Flutter sono compilate in codice nativo, non è possibile utilizzare Capgo Live Update per distribuire aggiornamenti a un'app Flutter. Invece, gli sviluppatori devono inviare gli aggiornamenti agli app store come farebbero con qualsiasi altra app nativa.

Inoltre, apportare modifiche al codice nativo è generalmente contro le regole degli app store. Sia l'Apple App Store che il Google Play Store hanno politiche che vietano agli sviluppatori di introdurre modifiche al codice nativo di un'app dopo che è stata inviata per la revisione. Questo perché l'introduzione di modifiche al codice nativo può potenzialmente introdurre vulnerabilità di sicurezza o altri problemi che potrebbero compromettere le prestazioni dell'app.

In sintesi, mentre Capgo Live Update è uno strumento utile per distribuire rapidamente aggiornamenti a certi tipi di app mobili, non può essere utilizzato per aggiornare le app Flutter.

Ciò è dovuto alla natura del processo di compilazione di Flutter e alle regole degli app store.