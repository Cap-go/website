---
title: チャネルシステム
description: Cómo utilizar el sistema de canales con capacitor-updater
sidebar:
  order: 6
locale: es
---

Capgo y capacitor-updater vienen con un poderoso sistema de canales

## Qué puedes hacer con los canales:

* Asociar dispositivos a canales para desarrollo, pruebas beta
* Usar un canal por rama de desarrollo y permitir que tu equipo se auto-asigne desde el teléfono para pruebas

## Asignando dispositivos a un canal:

* Hacer el canal predeterminado, cada vez que un nuevo dispositivo solicite una actualización a Capgo este canal responderá
* Enviar el **deviceId** (con el método [**getDeviceId**](/docs/plugin/api#getdeviceid)) a tu backend y asignarlo con la API pública de Capgo
* Hacer el canal auto-asignable (con el método [**setChannel**](/docs/plugin/api#setchannel)), y dejar que el dispositivo se suscriba al canal (con o sin interacción del usuario) con el método `setChannel` del plugin
* Usar la opción `defaultChannel` en la [configuración](/docs/plugin/settings#defaultchannel) para establecer el canal predeterminado para todos los dispositivos con esta configuración del plugin

:::note
También puedes asignar un dispositivo directamente a un paquete
:::

## Opciones de canal

<figure><img src="/channel_setting_1.webp" alt="Capgo channel settings configuration panel"><figcaption></figcaption></figure>

Detalles de cada opción:

| Opción                                           | Descripción                                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Deshabilitar auto degradación bajo nativo**     | No enviar una actualización si la versión nativa de la app es mayor que la del canal                 |
| **Deshabilitar auto actualización sobre major**   | No enviar una actualización si la versión nativa de la app es menor que un Major (**1**23) del canal |
| **Deshabilitar auto actualización sobre minor**   | No enviar una actualización si la versión nativa de la app es menor que un minor (1**2**3) del canal |
| **Permitir auto-asignación del dispositivo**      | Permitir que un dispositivo use el método `setChannel` para este canal                               |
| **IOS**                                          | Permitir que dispositivos iOS descarguen actualizaciones de este canal                               |
| **Android**                                      | Permitir que dispositivos Android descarguen actualizaciones de este canal                           |
| **Permitir Emulador**                            | Permitir que los emuladores reciban actualizaciones de este canal                                    |
| **Permitir compilación de desarrollo**            | Permitir que las compilaciones de desarrollo reciban actualizaciones de este canal                   |

:::note
Capgo realiza algunos filtrados automáticos por ti. Si tienes un CI/CD configurado para enviar tu versión a Google Play, Google Play ejecutará tu app cada vez en más de 20 dispositivos reales. Durante las primeras 4 horas de un nuevo paquete, bloquearemos las IPs del centro de datos de Google para evitar que se contabilicen en tus estadísticas
:::

:::note
Capgo **no** cuenta los emuladores y compilaciones de desarrollo en tu uso, pero ten en cuenta que no puedes tener más del 3% de ellos, o tu cuenta será bloqueada hasta que lo soluciones
:::