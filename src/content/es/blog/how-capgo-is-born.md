---
slug: how-capgo-is-born
title: Cómo surgió Capgo
description: Historia de fondo sobre cómo comencé este viaje y construí Capgo
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Gráfico de nacimiento de Capgo
tag: Story
published: true
locale: es
next_blog: ''
---

Hola, soy Martin Donadieu,

En julio de 2021, dejé [Naas](https://naasai/) la startup que cofundé en 2019 para construir proyectos en solitario

Durante los primeros 6 meses de mi viaje en solitario me enfoqué en reiniciar mi proyecto Captime, una aplicación móvil que hice 4 años antes, que se convirtió en un negocio secundario con el covid

En diciembre de 2021, mientras reconstruía la aplicación desde cero, tuve algunos problemas con la versión de producción actual,

y las cosas se complicaron, tenía que arreglarlo, pero quería evitar lanzar una nueva versión, así que busqué una solución para enviar actualizaciones de código a mi aplicación

En ese momento, Captime estaba generando $400 al mes, así que estaba buscando una solución asequible, Ionic Appflow estaba fuera de mi presupuesto

La única otra alternativa era Microsoft App Center, pero cerraron el soporte para aplicaciones que se ejecutan en Cordova / Capacitor

Si eres un desarrollador en solitario como yo, encontrarás que Ionic AppFlow no es el mejor precio para ti

Como tú, me quejaba de eso, contacté a Ionic, entendieron la queja, pero no estaban abiertos a cambiar el precio, yo no era el objetivo

Entonces, decidí intentar solucionar mi mayor dolor en mi flujo de trabajo de desarrollo de Capacitor JS: Actualizaciones en vivo

Después de un mes de intentos, encontré una forma de descargar desde una URL un zip y reemplazar el código fuente de la aplicación

Lo compartí y obtuve un gran interés en GitHub

Eso era demasiado manual para la mayoría de los equipos, así que pidieron un servicio de pago, ahí fue donde comencé a trabajar en Capgo como alternativa a AppFlow

El objetivo era proporcionar una solución simple y fácil de usar para enviar actualizaciones de código a aplicaciones JavaScript de Capacitor

Sin compilación nativa, sin gran caja de herramientas como Ionic, solo actualizaciones en vivo, para el mercado que no abordan, Nosotros

Los contacté para compartir con ellos lo que estaba haciendo, y encontramos un acuerdo de amistad comercial

Yo construyo para el creador, ellos construyen para las empresas que necesitan CI/CD y soporte dedicado :)

Te invito a unirte a la comunidad para construir juntos, yo lo uso para mis proyectos también, e incluso espero que esto se convierta en mi proyecto principal en el futuro