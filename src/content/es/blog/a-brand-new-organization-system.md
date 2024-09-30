---
slug: a-brand-new-organization-system
title: Un nuevo sistema de organización
description: >-
  Una historia de fondo sobre cómo el equipo de capgo agregó un sistema de
  organización
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Capgo organization system illusatration
tag: Story
published: true
next_blog: ''
locale: es
---

## Introducción

Hola, soy [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny): ingeniero de software principal de Capgo

Durante los últimos 8 meses, he estado desarrollando el [sistema de organización](/docs/webapp/organization-system/) y, a partir del 14 de abril, me complace anunciar que el sistema se completó 🎉 🎊

Finalmente, después de 8 meses, los miembros de la organización pueden acceder a todas las partes de Capgo. Esto incluye:
 - aplicaciones
 - estadísticas
 - facturación
 - soporte CLI completo
 - ¡y mucho más!

No ha sido fácil llegar hasta aquí; Ha habido 3 revisiones importantes de los sistemas.

## Organizaciones v1

Los comienzos fueron difíciles. Inicialmente, comencé a trabajar en esto 2 semanas después de unirme al proyecto. 
En ese momento, tenía poco o ningún conocimiento sobre el código base o alguna idea más amplia sobre cómo implementar esto.

Esto llevó a implementar la solución más pirateada que solo permitía acceder a las aplicaciones, canales y versiones.
Ni siquiera permitía que el usuario invitado accediera a las estadísticas.

Y luego esperé a que Martin revisara esto. Esperé y esperé, pero en realidad no pasó nada 3 meses después, decidí volver a esto y solucionar todos los conflictos de fusión que también decidí probar, lo que resultó ser una gran idea.
Como era de esperar, la solución hacky falló por completo. En ese momento, decidí corregir todos los errores y escribir una prueba E2E extensa.
Tuve que trabajar con un código muy roto y muchas malas decisiones tomadas por mí en el pasado, pero después de 2 semanas difíciles, finalmente logré que funcionara.

Sin embargo, eso no significa que fuera perfecto. El propietario de la organización todavía tenía mucho más acceso que incluso el usuario invitado más alto. La experiencia del usuario también era bastante deficiente. El usuario invitado ni siquiera podía ver las estadísticas de la aplicación, administrar la facturación y el CLI se limitó a cargar únicamente 

A pesar de todos esos desafíos, Martin revisó el PR y, una semana después, lo impulsaron a producirlo. 

## Organizaciones v2

El sistema de organización estaba funcionando bastante bien a pesar de todos los desafíos que los usuarios estaban usando, y realmente impulsó todo el proyecto. Sin embargo, todavía tenía que:
 - arreglar el desorden causado en [seguridad de nivel de fila] (https://supabasecom/docs/guides/auth/row-level-security)
 - agregar soporte para toda la CLI
 - asegúrese de que los usuarios administradores tengan el mismo acceso que el propietario

Después de [muchas discusiones](https://githubcom/Cap-go/capgo/issues/564) con Martin, decidimos que la mejor manera de avanzar era reescribir todas las reglas de seguridad y trasladar toda la propiedad de los recursos. a organizaciones y no a usuarios
Esto permitiría una integración más sencilla con el nuevo sistema organizativo y también eliminaría una gran cantidad de código heredado.

Escribir el nuevo código RLS fue muy tedioso, pero después de una semana y media, toda la migración estaba lista.

Esta vez, sin embargo, decidimos no escribir la prueba E2E, lo que significó que tuvimos que probarla manualmente. Después de 3 llamadas muy extensas juntos, Martin y yo finalmente decidimos pasar a producción y esperamos que todo saliera bien 🙏

No fue así. Resulta que rompí el registro de usuario y los nuevos usuarios no pudieron crear una cuenta 😅

Después de una rápida llamada de pánico, rápidamente puse algunos cambios en el producto y me fui a la cama. Desafortunadamente, mis cambios solo crearon más problemas 😰

Después de despertarme, descubrí que los usuarios tenían muchas organizaciones vacías. Se supone que esto no debe suceder ya que solo se debe permitir una organización por usuario. Me llevó algo de tiempo de reflexión eliminar todas las organizaciones vacías duplicadas, pero aparte de eso. , los cambios se realizaron sin problemas

## Organizaciones v3

Incluso esto no fue suficiente. Todavía faltaba un componente enorme: la facturación.

Hasta ahora solo el propietario podía gestionar la facturación. Esto ha creado algunos problemas interesantes en los que un usuario compró un plan pensando que lo estaba comprando para la organización. 
Rápidamente solucionamos el problema manualmente y fue en este punto que decidimos que este problema era inaceptable.

La migración fue bastante fluida.Tomó una semana de trabajo pero en comparación con V1 y V2 realmente no fue tan difícil 🚀

## Organizaciones v4 - el futuro

Después de todo este arduo trabajo, creo que es hora de centrarnos en otra cosa por ahora 😎

No fue fácil pero aprendí mucho y capgo recibió una característica muy interesante e importante.
Todavía tengo que eliminar las funciones heredadas, mejorar la experiencia del usuario de la aplicación web, monitorear errores, 
pero no debería haber ningún cambio importante en este sistema


<br>

Gracias por leer 🚀