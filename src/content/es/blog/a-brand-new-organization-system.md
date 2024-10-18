---
slug: a-brand-new-organization-system
title: Un nuevo sistema de organización
description: >-
  Una historia de fondo sobre cómo el equipo de Capgo añadió un sistema de
  organización
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Ilustración del sistema organizativo de Capgo
tag: Story
published: true
locale: es
next_blog: ''
---

## Introducción

Hola, soy [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny) - ingeniero de software principal de Capgo

Durante los últimos 8 meses, he estado desarrollando el [sistema de organización](/docs/webapp/organization-system/), y a partir del 14 de abril, me complace anunciar que el sistema ha sido completado 🎉 🎊

Finalmente, después de 8 meses, cada parte de Capgo es accesible para los miembros de la organización. Esto incluye:
 - aplicaciones
 - estadísticas
 - facturación
 - soporte completo de CLI
 - ¡y mucho más!

No ha sido fácil llegar hasta aquí; ha habido 3 revisiones importantes de los sistemas

## Organizaciones v1

Los comienzos fueron difíciles. Inicialmente, comencé a trabajar en esto 2 semanas después de unirme al proyecto.
En ese momento, tenía poco o ningún conocimiento sobre la base de código o cualquier idea más amplia sobre cómo implementar esto.

Esto llevó a implementar la solución más improvisada que solo admitía el acceso a las aplicaciones, canales y versiones.
Ni siquiera permitía que el usuario invitado accediera a las estadísticas.

Y luego esperé a que Martin lo revisara. Esperé y esperé, pero realmente no pasó nada. 3 meses después, decidí volver a esto y arreglar todos los conflictos de fusión. También decidí probar, lo que resultó ser una gran idea.
Para nada sorprendente, la solución improvisada falló completamente. En ese momento, decidí corregir todos los errores y escribir una extensa prueba E2E.
Tuve que trabajar con código muy roto y muchas malas decisiones tomadas por mi yo del pasado, pero después de 2 duras semanas, finalmente logré que funcionara.

Sin embargo, eso no significa que fuera perfecto. El propietario de la organización todavía tenía mucho más acceso que incluso el usuario invitado de más alto nivel. La experiencia del usuario también era bastante deficiente. El usuario invitado ni siquiera podía ver las estadísticas de la aplicación, administrar la facturación, y el CLI estaba limitado solo a cargar.

A pesar de todos estos desafíos, Martin había revisado el PR, y una semana después, se implementó en producción.

## Organizaciones v2

El sistema de organización funcionaba bastante bien a pesar de todos los desafíos. Los usuarios lo estaban utilizando, y realmente impulsó todo el proyecto hacia adelante. Sin embargo, todavía tenía que:
 - arreglar el lío hecho en [seguridad a nivel de fila](https://supabasecom/docs/guides/auth/row-level-security)
 - agregar soporte para todo el CLI
 - asegurar que los usuarios administradores tengan el mismo acceso que el propietario

Después de [muchas discusiones](https://githubcom/Cap-go/capgo/issues/564) con Martin, decidimos que la mejor manera de avanzar era reescribir todas las reglas de seguridad y mover toda la propiedad de los recursos a las organizaciones y no a los usuarios.
Esto permitiría una integración más fácil con el nuevo sistema de organización, y también eliminaría mucho código heredado.

Escribir el nuevo código RLS fue muy tedioso, pero después de una semana y media, toda la migración estaba lista.

Esta vez, sin embargo, decidimos no escribir la prueba E2E, lo que significaba que teníamos que probarlo manualmente. Después de 3 llamadas muy extensas juntos, Martin y yo finalmente decidimos implementar en producción y esperar que todo saliera bien 🙏

No fue así. Resulta que rompí el registro de usuarios, y los nuevos usuarios no podían crear una cuenta 😅

Después de una rápida llamada de pánico, rápidamente implementé algunos cambios en producción y me fui a dormir. Desafortunadamente, mis cambios solo crearon más problemas 😰

Después de despertar, descubrí que los usuarios tenían muchas organizaciones vacías. Esto no se supone que suceda ya que solo se debe permitir 1 organización por usuario. Tomó algo de tiempo de lluvia de ideas para eliminar todas las organizaciones duplicadas y vacías, pero aparte de eso, los cambios fueron bastante suaves.

## Organizaciones v3

Incluso esto no fue suficiente. Todavía faltaba un componente enorme - la facturación.

Hasta ahora, solo el propietario podía administrar la facturación. Esto ha creado algunos problemas interesantes donde un usuario compró un plan pensando que lo estaba comprando para la organización.
Rápidamente arreglamos el problema manualmente y fue en este punto que decidimos que este problema era inaceptable.

La migración fue bastante suave.Tomó una semana de trabajo pero en comparación con V1 y V2 realmente no fue tan difícil 🚀

## Organizaciones v4 - el futuro

Después de todo este arduo trabajo creo que es hora de enfocarse en otra cosa por ahora 😎

No fue fácil pero aprendí mucho y capgo recibió una característica muy bonita e importante
Todavía tengo que deprecar las funciones heredadas, mejorar la experiencia de usuario de la aplicación web, monitorear errores,
pero no debería haber cambios importantes en este sistema

<br>

Gracias por leer 🚀