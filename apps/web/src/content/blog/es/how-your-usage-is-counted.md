---
slug: how-your-usage-is-counted
title: Cómo se cuenta tu uso en Capgo
description: >-
  Comprende cómo Capgo cuenta tu uso y utilízalo de la mejor manera. Aprende a
  gestionar mejor tu plan
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /usage_explained.webp
head_image_alt: Sistema de uso de Capgo explicado
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: es
next_blog: ''
---
En Capgo, 3 valores son contados e importantes de entender
- Usuario's
- Almacenamiento
- Ancho de banda

Cada uno tiene una forma ligeramente diferente de ser contado

## Usuarios

Cada vez que un usuario descarga tu aplicación Capacitor JS y la abre, enviará una solicitud al backend de Capgo para saber si hay actualizaciones disponibles.
Cuando la aplicación hace esto, envía poca información, incluyendo la más importante `DeviceID`

`DeviceID`: es un ID único (UUID) generado en el dispositivo. **Desde la versión del plugin v6.25.0 y v7.25.0**, este ID ahora persiste entre reinstalaciones de la aplicación (almacenado de forma segura en el almacenamiento del dispositivo). Antes de estas versiones, el ID se restablecía con cada instalación de la aplicación.

Cada vez que tu cuenta recibe un nuevo Device ID, se guarda en la base de datos.
Cada vez que un `DeviceID` antiguo solicita una actualización (apertura de aplicación), su registro se actualiza (updated_at en la base de datos).

Estos datos se guardan en 2 lugares:
- tabla de dispositivos con valor `update_at`
- app_stats con contador diario que representa el número de dispositivos que se activaron hoy y no han estado activos este mes.

Para el límite del plan se utiliza el primer método porque es 100% confiable, para mostrar el gráfico se utiliza el segundo.
Puedes ver ambos en tu cuenta en la página de inicio:
- en el gráfico está el segundo método
- en la tabla de aplicaciones está el primer método.

> Capgo no cuenta los emuladores y compilaciones de desarrollo en tu uso. Ten en cuenta que después del período de prueba no puedes tener más del 3% de ellos, o se bloqueará tu cuenta hasta que lo soluciones.

> Capgo también realiza algunos filtrados por ti. Si tienes CI/CD configurado para enviar tu versión a Google PLAY, Google ejecuta tu aplicación Capacitor cada vez en más de 20 dispositivos reales. Durante las primeras 4 horas de un nuevo bundle, bloqueamos las IP del centro de datos de Google para evitar que sean contadas.

Cada mes, estos datos comienzan desde cero.

- Crear o actualizar un dispositivo en mi base de datos en cada solicitud de dispositivo
- Agregar a un contador diario el número de dispositivos activos que no han estado activos este mes.

El primer método devuelve: 900+ usuarios
mientras que el segundo está en 200+ usuarios en tu cuenta
Para el límite del plan uso el primer método, que es 100% confiable, y para mostrar el gráfico uso el segundo.
Puedes ver ambos en la página de inicio de tu cuenta.

## Almacenamiento

Cada vez que subes un bundle, este número aumenta según el tamaño de la carga.

Estos datos solo están relacionados con el tamaño de tu carga, cuanto mejor sea el tamaño de tu aplicación, mejor te mantendrás en tu plan.

Si alcanzas el límite o estás cerca, puedes listar tus bundles con el CLI:
`npx @capgo/cli@latest bundle list`
Para ver qué podrías limpiar, eliminar un bundle libera el almacenamiento pero no elimina las estadísticas.

Cuando estés listo para la limpieza, usa este comando para eliminar varios bundles:
`npx @capgo/cli@latest bundle cleanup`

PD: esto es bueno para el planeta, pero también para tu billetera 💪.

> También puedes usar el `--external` de upload para usar tu almacenamiento y no contar en tu plan.

## Ancho de banda

El cálculo de este valor es un poco más complejo, pero la idea es la misma que el almacenamiento.

Cada vez que un usuario descarga un bundle, este número aumenta según el tamaño de la descarga.

Estos datos solo están relacionados con el tamaño de tu descarga, cuanto mejor sea el tamaño de tu aplicación Capacitor JS, mejor te mantendrás en tu plan.

> Una cosa importante a tener en cuenta es que Capgo no puede ver qué tamaño se descarga, solo ve el tamaño del bundle. Así que si tienes un bundle grande y tienes muchos usuarios que fallan al descargarlo, alcanzarás el límite rápidamente.

La mejor manera de mantenerte en tu plan es tener un bundle pequeño, y si no puedes, mostrar una barra de descarga a tu usuario y hacerles saber cuánto les queda por descargar.

En el futuro, Capgo mejorará el sistema de descarga para tener más posibilidades de descargar el bundle de una sola vez.
