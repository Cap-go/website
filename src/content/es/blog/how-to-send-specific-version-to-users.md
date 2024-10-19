---
slug: how-to-send-specific-version-to-users
title: Cómo enviar actualizaciones específicas a un usuario o grupo
description: >-
  Permita a sus usuarios probar una versión beta sin necesidad de TestFlight o
  el proceso beta de Google. Simplemente agregue un botón en su aplicación
  Ionic, ¡y listo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Ilustración-de-Alternativa-a-TestFlight
tag: alternatives
published: true
locale: es
next_blog: ''
---

## Prefacio

Cuando empiezas a disfrutar del sistema de actualización de Capgo, como yo para mis aplicaciones, empezarás a tener la sensación de "¿Y si quiero más?"

Yo también tuve esa sensación, pero como soy el creador de Capgo, ¡pude echar un vistazo!

> Como todo es de código abierto, tú también tienes este poder :)

El siguiente dolor que tuve en el proceso de distribución de aplicaciones de Capacitor es hacer que otros miembros del equipo prueben las actualizaciones.

Con TestFlight, el problema es simple: traer gente a tu equipo y hacer que entiendan cómo obtenerlo lleva mucho tiempo.

Y, por supuesto, cada vez que envías a Apple tienes un proceso de revisión aleatorio por parte de un bot que puede tardar 5 minutos o 5 horas, nunca se sabe.

Muchas veces he tenido mi presentación retrasada por esto...

Y para Google es aún peor, el gran misterio de mi vida: lanzar una versión de producción toma menos de 2 horas, pero lanzar una beta cerrada toma 1-2 días.

## Solución

Para solucionar esto, creé el sistema de Canales en Capgo

`npx @capgo/cli@latest bundle upload -c production` actualizará a todos los usuarios (si el canal de producción está configurado como predeterminado)

Si haces `npx @capgo/cli@latest bundle upload -c development`, entonces la versión llega a un canal diferente, esto se puede automatizar en [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)

Luego tienes 2 formas de permitir que los usuarios obtengan las actualizaciones del canal

### Forma súper automática

Esto puede ser útil cuando no quieres crear tu propio backend para la configuración de canales, es rápido de implementar

Con esta, lo único que necesitas hacer es permitir que uno de tus canales sea autoconfigurado

![Permitir autoconfiguración en Capgo](/self_setwebp)

Y luego agregar esto en el código de tu aplicación Ionic, para una mejor experiencia, úsalo después de que el usuario haga clic en un botón como "registrarse para beta"

### Forma manual

Esto puede ser útil para tu equipo interno, es rápido de implementar
Permite a los usuarios copiar su deviceID desde tu aplicación y enviártelo manualmente, este código te ayudará a obtenerlo:

Oculta un botón en algún lugar de tu aplicación, o muestra el botón solo a usuarios conectados con un rol de `admin`, por ejemplo

Luego ve a la aplicación web o nativa de Capgo, conéctate como administrador de la aplicación, selecciona tu aplicación, haz clic en la lista de dispositivos

Luego pon en la barra de búsqueda el deviceID, haz clic en el encontrado y luego haz clic en el enlace del Canal, elige `development`, pide a tu compañero de equipo que abra la aplicación de nuevo, espera 30 segundos y abre cierra

Debería obtener tu versión

### Forma automática

Esto puede ser útil para tus probadores beta, es más largo de implementar

Igual que en la forma manual, tienes que obtener el deviceID

Pero esta vez tienes que enviarlo automáticamente a tu backend, te dejo decidir cómo lo haces

Solo te sugeriré que lo almacenes en una base de datos, eso facilitará tu vida más adelante

Luego en tu backend tienes que enviarlo al backend de Capgo también. A continuación, dos ejemplos de código:

Después de configurar esto, intenta agregar un botón en tu aplicación para optar por el canal, y verifica en la aplicación web si se ha establecido

También puedes enviar `null` para eliminar la anulación

Si necesitas verificar programáticamente qué anulación está establecida en un dispositivo, puedes obtenerla en la misma URL