---
title: V2에서 V3로
description: Cómo actualizar de V2 a V3
sidebar:
  order: 4
locale: es
---

Esta documentación explicará cómo actualizar a la versión 3 de auto-Actualizar

## Primero migrar a las últimas herramientas:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Eliminar toda tu configuración anterior:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

para dejar solo esto:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Si estabas usando tu servidor con `autoUpdateURL`, actualizaré esta guía pronto. Mientras tanto, echa un vistazo a la nueva opción de carga `external` que te permite enviar solo el enlace de tu zip, no el código en Capgo cloud. Esto se ha hecho para empresas con políticas de privacidad estrictas. En modo externo, el código nunca llegará al servidor de Capgo, solo almacenamos la URL y la enviamos al dispositivo, que la descargará directamente. En la forma estándar, el código se comprime y se almacena en nuestro servidor, pero nunca lo abriremos ni lo usaremos tampoco.

## Qué cambia

Todas las configuraciones se vuelven del lado del servidor para auto-Actualizar, para darte más control sobre cómo envías una actualización a los usuarios

Esto nos permite revertir, incluso desplegar solo a un usuario con canales. Estas configuraciones se agregan de nuevo a la interfaz web:

* deshabilitar revertir bajo nativo
* deshabilitar actualización por encima de major

> ⚠️ Se volverán verdaderos por defecto para todos los canales

Esto también eliminará la necesidad de actualizar frecuentemente el Plugin, la mayoría de las actualizaciones se realizarán del lado del servidor, y las obtendrás sin ningún cambio de tu parte

> ⚠️ Reinicio cuando una actualización se convierte en predeterminada, así que si prefieres no eliminar todas las versiones descargadas al actualizar desde la tienda, haz esto:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Actualiza tu código

Por último, actualiza todas tus importaciones en JS de:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

a

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Luego compila tu código nuevamente `npm run build` y copia los assets una vez más `npx cap copy`

Ahora deberías poder probar el último sistema de auto-Actualizar

Envía tu versión con:

```
npx @capgo/cli@latest bundle upload
```

en lugar de

```
npx capgo upload
```

## Evolución futura

Por ahora solo se usa el primer canal público, en el futuro, público cambiará para múltiples canales públicos, si se configura más de uno

## Problemas comunes:

* Problema de compilación después de actualizar: si ya has abierto el código fuente del Plugin en Android Studio o Xcode, a veces la sincronización no los elimina, esa es la causa del problema. Abre el IDE nativo y elimina `capacitor-updater` manualmente y haz `npx cap sync`, esto debería resolverlo
