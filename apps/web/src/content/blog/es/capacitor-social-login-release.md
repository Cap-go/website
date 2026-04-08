---
slug: capacitor-social-login-release
title: Lanzamiento de un nuevo complemento de inicio de sesión social para Capacitor
description: >-
  El plugin Capacitor Social Login es un plugin que te permite iniciar sesión
  con Google, Facebook y Apple en iOS, Android y Web.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Ilustración del sistema de organización de Capgo
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: es
---

## Introducción

Hola, soy Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Después de un mes de trabajo duro (y un poco doloroso 🙃), me complace anunciar el primer lanzamiento del Capacitor Social Login. Este plugin está diseñado para ayudar en el manejo del inicio de sesión tanto de Google como de Apple en iOS y Android. Además, junto con Martin, hemos estado trabajando en algunas características únicas que incluyen:

- La introducción de Login con Apple en Android
- La adopción de la nueva API de Credenciales de Google
- La adición de documentación detallada

## Login con Apple en Android

Primero, hablemos de la gran innovación del 'Login con Apple' en Android. Esto no fue trivial, ya que el SDK de Apple no proporciona esta funcionalidad. Usé [este artículo](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) como punto de referencia, pero lo modifiqué un poco para hacerlo más seguro. El flujo con el que terminé se ve así:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

Desafortunadamente, requiere un backend y algunas modificaciones en el código de tu aplicación, pero es lo mejor que pude hacer.

## Google Login renovado en Android

Después, intenté implementar Google Login en Android. Resulta que [CodetrixStudio's CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) usa una [biblioteca GMS que pronto quedará obsoleta](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Como resultado de que esta biblioteca GMS se considera heredada, decidí usar el [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Esto ayudó a simplificar el flujo de inicio de sesión y eliminó el molesto [error 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

## Documentación

Por último, escribí una increíble ✨ documentación. Dediqué mucho tiempo a asegurarme de que la documentación fuera precisa y extensa.
La documentación incluye una guía detallada sobre la configuración tanto de Apple como de Google. También proporcioné un [ejemplo de backend](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) para Login con Apple 🍎

¡No dudes en consultar las guías de [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) y [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd)!

## Conclusión

En conclusión, el plugin Capacitor Social Login introduce muchas características nuevas y emocionantes con más por venir en el futuro 🚀