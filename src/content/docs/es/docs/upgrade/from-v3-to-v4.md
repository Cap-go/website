---
title: Von V3 zu V4
description: Cómo actualizar de V3 a V4
sidebar:
  order: 3
locale: es
---

## Por qué esta actualización

Después de muchas conversaciones en la comunidad de Discord con ustedes, descubrí que el modo manual era demasiado manual y no seguro de usar, por ejemplo, la auto-reversión no era posible, por lo que si fallaba la actualización en manual el usuario tenía que eliminar la aplicación y volver a instalarla, lo cual es una terrible experiencia de usuario

Mientras tanto, tomé esto como una oportunidad para darles más libertad y eliminar todo el código malo que hice

## Instalación

`npm i @capgo/capacitor-updater@4`

## Auto-actualización en la nube

Si usas el ejemplo básico en tu aplicación, es seguro migrar a la nueva versión, ¡disfrútalo!

## Auto-actualización auto-alojada

Para ti, sigue siendo simple, los cambios son:

* El nombre de la configuración de `autoUpdateUrl` a `updateUrl`
* El método del endpoint cambió de `GET` a POST

## Usuarios manuales

Para ti, este es el cambio más significativo, ¡pero para mejor! Obtienes toneladas de mejoras, lee cuidadosamente

## Cambios

* `autoUpdateUrl` se convierte en `updateUrl` ya que esta configuración puede usarse en modo manual ahora también
* Eliminación de `cancelDelay` y `delayUpdate` en favor de `setDelay`
* Ya no hay `versionName` en set
* Cambio de la clave `version`, que se devolvía en la mayoría de funciones al objeto `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Renombrado de nombres confusos ahora (incluso para explicar no puede ser claro, pero en el uso es fácil entender el nuevo):
  * lo que se llamaba `version` ahora se refiere a un `bundle`
  * `id` se refiere a la antigua `version` que era una cadena aleatoria de 10 caracteres, este `id` es la única forma confiable y única de acceder a tus bundles, ejemplo `7Dfcd2RedN`
  * `version` se refiere ahora al `versionName` que eliges para un bundle, ejemplo `100`
* `updateUrl` cambia de `get` a `post`, ya que los encabezados personalizados eran un problema para algunos de ustedes y post es más lógico, todos los encabezados anteriores van al cuerpo y el prefijo `cap_` desaparece
* el método `versionName` se elimina, en favor de `getId`
* list ahora devuelve una lista de `BundleInfo`
* Renombrado `getId` a `getDeviceId`
* `autoUpdate` se vuelve verdadero por defecto, si usas el modo Manual, establécelo en falso

## Novedades

* Método `getLatest`, este método te permite obtener de tu servidor configurado con `updateUrl` la última versión disponible
* Método `setDelay` que toma `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` como argumento para establecer el retraso en diferentes modos
* Método `next`, para establecer la versión en el próximo paso a segundo plano, en oposición a `set` que lo hace instantáneamente
* Método `isAutoUpdateEnabled`, para que sepas si estás en un contexto de auto-actualización
* Evento `downloadComplete` cuando la descarga alcanza el 100%
* Campo obligatorio añadido `version` en el método download
* `notifyAppReady` se vuelve obligatorio en modo manual también, si no se llama después de 10 segundos la aplicación vuelve a la versión anterior

## Contribuidores

[@lincolnthree](https://githubcom/lincolnthree/) Muchas gracias por iniciar este trabajo, era imposible hacer que esta actualización funcionara sin ti