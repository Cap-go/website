---
locale: es
---

cantar @capgo/capacitor-shake

El paquete `@capgo/capacitor-shake` te permite detectar gestos de sacudida en un dispositivo. Aquí tienes un tutorial sobre cómo usar este paquete en tu aplicación de Capacitor.

## Instalación

Para instalar el paquete, ejecuta el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

## Agregar el Listener

Para detectar gestos de sacudida, necesitas agregar un listener para el evento `shake`. Aquí hay un ejemplo de cómo hacerlo:

[[BLOQUE_DE_CÓDIGO]]

En este ejemplo, importamos el plugin `CapacitorShake` de `@capacitor/core` y usamos el método `addListener` para agregar un listener para el evento `shake`. Cuando se detecta el gesto de sacudida, se ejecutará la función de callback.

## Eliminar el Listener

Si quieres eliminar el listener del evento `shake`, puedes usar el método `removeAllListeners`:

[[BLOQUE_DE_CÓDIGO]]

En este ejemplo, usamos el método `removeAllListeners` para eliminar todos los listeners del evento `shake`.

¡Eso es todo! Has integrado exitosamente el paquete `@capgo/capacitor-shake` en tu aplicación de Capacitor. Ahora puedes detectar gestos de sacudida en el dispositivo.