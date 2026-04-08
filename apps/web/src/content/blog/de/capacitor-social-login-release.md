---
slug: capacitor-social-login-release
title: Veröffentlichung eines brandneuen Capacitor Social Login Plugins
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Illustration des Capgo-Organisationssystems
tag: Capacitor
published: true
next_blog: ''
locale: de
---

# Einführung

Hallo, ich bin Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Nach einem Monat harter (und etwas schmerzhafter 🙃) Arbeit freue ich mich, die erste Version des Capacitor Social Login ankündigen zu können. Dieses Plugin wurde entwickelt, um sowohl Google- als auch Apple-Login auf iOS und Android zu handhaben. Außerdem haben Martin und ich an einigen einzigartigen Funktionen gearbeitet, darunter:

 - Die Einführung von Login mit Apple auf Android
 - Die Anwendung der neuen Google Credentials API
 - Die Ergänzung detaillierter Dokumentation

# Login mit Apple auf Android

Zunächst besprechen wir die große Neuerung des 'Login mit Apple' auf Android. Dies war nicht trivial, da Apples SDK diese Funktionalität nicht bietet. Ich verwendete [diesen Artikel](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) als Referenzpunkt, änderte ihn aber etwas, um ihn sicherer zu machen. Der Ablauf, den ich letztendlich entwickelte, sieht so aus:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

Leider erfordert es ein Backend und einige Änderungen am Code Ihrer App, aber es ist das Beste, was ich tun konnte.

# Erneuertes Google-Login auf Android

Als Nächstes versuchte ich, Google-Login auf Android zu implementieren. Wie sich herausstellte, verwendet [CodetrixStudio's CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) eine [bald veraltete GMS-Bibliothek](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Da diese GMS-Bibliothek als veraltet gilt, entschied ich mich für die Verwendung des [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Dies half, den Login-Prozess zu vereinfachen und beseitigte den lästigen [Fehler 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

# Dokumentation

Schließlich habe ich eine großartige ✨ Dokumentation geschrieben. Ich habe viel Zeit damit verbracht sicherzustellen, dass die Dokumente genau und umfassend sind. Die Dokumentation enthält eine detaillierte Anleitung zum Einrichten von Apple und Google. Ich habe auch ein [Beispiel-Backend](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) für Login mit Apple bereitgestellt 🍎

Schauen Sie sich gerne die [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) und [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd) Anleitungen an!

# Fazit

Zusammenfassend führt das Capacitor Social Login Plugin viele neue und aufregende Funktionen ein, mit weiteren, die in Zukunft folgen werden 🚀