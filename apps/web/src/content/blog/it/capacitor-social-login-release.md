---
slug: capacitor-social-login-release
title: Rilascio di un nuovissimo plugin per il login sociale di Capacitor
description: >-
  El complemento de inicio de sesión social de Capacitor es un complemento que
  te permite iniciar sesión con Google, Facebook y Apple en iOS, Android y Web.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Sistema de organização Capgo ilustração
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: it
---
## Wprowadzenie

Cześć, jestem Michael ([WcaleNieWolny](https://github.com/WcaleNieWolny)) 👋,

Po miesiącu ciężkiej (i trochę bolesnej 🙃) pracy, z przyjemnością ogłaszam pierwsze wydanie Capacitor Social Login. Ten plugin został zaprojektowany, aby pomóc w obsłudze zarówno logowania Google, jak i Apple na iOS i Android. Ponadto, razem z Martinem, pracowaliśmy nad kilkoma unikalnymi funkcjami, które obejmują:

 - wprowadzenie logowania z Apple na Androidzie 
 - przyjęcie nowego Google Credentials API
 - dodanie szczegółowej dokumentacji

## Logowanie z Apple na Androidzie

Na początek omówmy główną innowację 'Logowania z Apple' na Androidzie. To nie było trywialne, ponieważ SDK Apple nie zapewnia tej funkcjonalności. Użyłem [tego artykułu](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) jako punktu odniesienia, ale trochę go zmieniłem, aby uczynić go bardziej bezpiecznym. Końcowy przebieg wygląda tak:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Niestety, wymaga to backendu i pewnych modyfikacji w kodzie twojej aplikacji, ale to najlepsze, co mogłem zrobić.

## Odświeżone logowanie Google na Androidzie

Następnie próbowałem zaimplementować logowanie Google na Androidzie. Jak się okazało, [CapacitorGoogleAuth CodetrixStudio](https://github.com/CodetrixStudio/CapacitorGoogleAuth) wykorzystuje [wkrótce zastępowaną bibliotekę GMS](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization). W wyniku uznania tej biblioteki GMS za przestarzałą, postanowiłem użyć [CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg). To uprościło proces logowania i usunęło irytujący [błąd 10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

## Dokumentacja

Na koniec napisałem niesamowitą ✨ dokumentację. Spędziłem wiele czasu, aby upewnić się, że dokumenty są dokładne i obszerne. Dokumenty zawierają szczegółowy przewodnik dotyczący zarówno Apple, jak i Google. Dodałem również [przykładowy backend](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo) do logowania z Apple 🍎

Nie wahaj się sprawdzić przewodników dotyczących [Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md) i [Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md)!

## Podsumowanie

Podsumowując, plugin Capacitor Social Login wprowadza wiele nowych i ekscytujących funkcji, a więcej ma się jeszcze pojawić w przyszłości 🚀
