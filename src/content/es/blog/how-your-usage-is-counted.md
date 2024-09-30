---
slug: how-your-usage-is-counted
title: Cómo se cuenta su uso en Capgo
description: >-
  Comprenda cómo Capgo cuenta su uso y utilícelo de la mejor manera. Aprende a
  gestionar mejor tu plan
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Capgo usage system explained
tag: Solution
published: true
next_blog: ''
locale: es
---

En Capgo, se cuentan 3 valores y es importante entenderlos
- Usuario
- Almacenamiento
- Ancho de banda

Cada uno como una forma ligeramente diferente de ser contado.


## Usuarios

Cada vez que un usuario descarga su aplicación Capacitor JS y la abre, enviará una solicitud al backend de Capgo para saber si hay una actualización disponible.
Cuando la aplicación hace eso, envía poca información, incluida la más importante, "DeviceID".

`DeviceID`: es una ID única (UUID) definida por el sistema operativo del dispositivo, esta ID es única según la instalación de la aplicación

Cada vez que su cuenta recibe una nueva ID de dispositivo, se guarda en la base de datos
Cada vez que un `DeviceID` antiguo solicita una actualización (aplicación abierta), se actualiza el registro (updated_at en la base de datos)

Estos datos se guardan en 2 lugares:
- tabla de dispositivos con valor `update_at`
- app_stats con contador diario que representa la cantidad de dispositivos que se activaron hoy y no han estado activos este mes

Para el límite del plan se utiliza el primer método porque es 100% confiable, para mostrar el gráfico se usa el segundo
Puedes ver ambos en tu cuenta en la página de inicio:
- en el cuadro está el segundo método
- en la tabla de aplicaciones está el primer método

> Capgo no cuenta el emulador ni la compilación de desarrollo en tu uso. Ten en cuenta que después de la prueba no puedes tener más del 3 % de ellos, o eso bloqueará tu cuenta hasta que lo arregles.

> Capgo también está haciendo algunos filtrados por usted. Si tiene CI/CD configurado para enviar su versión a Google PLAY, Google ejecuta su aplicación Capacitor cada vez en más de 20 dispositivos reales. Durante las 4 primeras horas de un nuevo paquete, bloqueamos a Google. IP del centro de datos para evitar que se cuenten

Cada mes, estos datos empiezan desde cero.


- Crear o actualizar un dispositivo en mi base de datos en cada solicitud de dispositivo
- Agregue a un contador diario la cantidad de dispositivos activos que no han estado activos este mes

El primer método devuelve: más de 900 usuarios
mientras que el segundo es para más de 200 usuarios en su cuenta
Para el límite del plan uso el primer método, que es 100% confiable, y para mostrar el gráfico uso el segundo.
Puedes ver ambos en la página de inicio de tu cuenta.

## Almacenamiento

Cada vez que subes un paquete, este número aumenta según el tamaño de la carga.

Estos datos solo están relacionados con el tamaño de carga, cuanto mejor sea el tamaño de tu aplicación, mejor permanecerás en tu plan

Si alcanza el límite o está cerca, puede enumerar sus paquetes con la CLI:
`npx @capgo/cli@última lista de paquetes`
Para ver qué puedes limpiar, eliminando un paquete, libera el almacenamiento pero no elimines las estadísticas.

Cuando esté listo para la limpieza, utilice este comando para eliminar muchos paquetes:
`npx @capgo/cli@última limpieza del paquete`

PD: esto es bueno para el planeta, pero también para tu bolsillo 💪

> También puedes usar el `--external` de upload para usar tu almacenamiento, y no contar en tu plan

## Ancho de banda

El cálculo de este valor es un poco más complejo, pero la idea es la misma que el almacenamiento.

Cada vez que un usuario descarga un paquete, este número aumenta según el tamaño de la descarga.

Estos datos solo están relacionados con el tamaño de su descarga, cuanto mejor sea el tamaño de su aplicación Capacitor JS, mejor permanecerá en su plan

> Una cosa importante a tener en cuenta: Capgo no puede ver qué tamaño se descarga, solo ve el tamaño del paquete. Entonces, si tienes un paquete grande y muchos usuarios no logran descargarlo, alcanzarás el límite rápidamente.

La mejor manera de permanecer en su plan es tener un paquete pequeño y, si no puede, mostrarle una barra de descarga a su usuario e informarle cuánto le queda por descargar.

En el futuro, Capgo mejorará el sistema de descarga para tener más posibilidades de descargar el paquete al mismo tiempo.