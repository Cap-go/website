---
slug: how-capgo-is-born
title: Cómo nació Capgo
description: Historia sobre cómo comencé este viaje y construí Capgo
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Ilustración del nacimiento de Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Story
published: true
locale: es
next_blog: ''
---
Hola, soy Martin Donadieu,

En julio de 2021, dejé [Naas](https://naas.ai/), la startup que cofundé en 2019 para construir proyectos en solitario.

Durante los primeros 6 meses de mi viaje en solitario, me enfoqué en reiniciar mi proyecto Captime, una aplicación móvil que hice 4 años antes, que se convirtió en un negocio secundario con el covid.

En diciembre de 2021, mientras estaba reconstruyendo la aplicación desde cero, tuve algunos problemas con la versión de producción actual,

y las cosas se complicaron, tenía que arreglarlo, pero quería evitar lanzar una nueva versión, así que busqué una solución para enviar actualizaciones de código a mi aplicación.

En ese momento, Captime generaba $400/mes, así que estaba buscando una solución asequible, Ionic Appflow estaba fuera de mi presupuesto.

La única otra alternativa era Microsoft App Center, pero dejaron de dar soporte para aplicaciones que funcionan con Cordova / Capacitor.

Si eres un desarrollador solitario como yo, encontrarás que Ionic AppFlow no tiene el mejor precio para ti.

Como tú, me estaba quejando de esto, contacté a Ionic, entendieron la queja, pero no estaban dispuestos a cambiar los precios, yo no era el objetivo.

Entonces, decidí intentar arreglar mi mayor dolor en mi flujo de trabajo de desarrollo en Capacitor JS: las actualizaciones en vivo.

Después de un mes de intentos, encontré una manera de descargar desde una URL un zip y reemplazar el código fuente de la aplicación.

Lo compartí y obtuve un gran interés en GitHub.

Era demasiado manual para la mayoría de los equipos, así que pidieron un servicio de pago, ahí fue donde comencé a trabajar en Capgo como alternativa a AppFlow.

El objetivo era proporcionar una solución simple y fácil de usar para enviar actualizaciones de código a aplicaciones JavaScript de Capacitor.

Sin compilación nativa, sin gran caja de herramientas como Ionic, solo actualizaciones en vivo, para el mercado que ellos no atienden, nosotros.

Los contacté para compartir con ellos lo que estaba haciendo, y encontramos un acuerdo de amistad comercial.

Yo construyo para los creadores, ellos construyen para las empresas que necesitan CI/CD y soporte dedicado :)

Estás invitado a unirte a la comunidad para construir juntos, yo también lo uso para mis proyectos, e incluso espero que esto se convierta en mi proyecto principal en el futuro.
