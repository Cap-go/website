---
locale: es
---

tutorial del paquete @capgo/capacitor-purchases

Este tutorial te guiará a través del proceso de uso del paquete @capgo/capacitor-purchases para compras dentro de la aplicación en Capacitor.

## Paso 1: Instalar el paquete

Para instalar el paquete @capgo/capacitor-purchases, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_DE_CODIGO]]

## Paso 2: Configurar la plataforma Android

Si estás dirigido a la plataforma Android, necesitas agregar alguna configuración al archivo android/app/src/main/AndroidManifestxml. Abre el archivo y añade el siguiente fragmento de código:

[[BLOQUE_DE_CODIGO]]

## Paso 3: Configurar el paquete

Para configurar el paquete @capgo/capacitor-purchases, utiliza el método `setup` con tu clave API y un ID de usuario de aplicación opcional. Aquí tienes un ejemplo:

[[BLOQUE_DE_CODIGO]]

## Paso 4: Manejar el evento de actualización de compras

Puedes escuchar el evento "purchasesUpdate" para ser notificado cuando haya un cambio en las compras del usuario. Aquí tienes un ejemplo de cómo añadir un oyente para el evento:

[[BLOQUE_DE_CODIGO]]

## Paso 5: Obtener ofertas disponibles

Puedes utilizar el método `getOfferings` para obtener las ofertas disponibles para el usuario. Aquí tienes un ejemplo:

[[BLOQUE_DE_CODIGO]]

## Paso 6: Comprar un paquete

Para realizar una compra, utiliza el método `purchasePackage` con el ID del paquete. Aquí tienes un ejemplo:

[[BLOQUE_DE_CODIGO]]

## Paso 7: Restaurar compras

Si deseas restaurar las compras del usuario, utiliza el método `restorePurchases`. Aquí tienes un ejemplo:

[[BLOQUE_DE_CODIGO]]

## ¡Eso es todo!

¡Has aprendido exitosamente cómo usar el paquete @capgo/capacitor-purchases para compras dentro de la aplicación en Capacitor! ¡Feliz codificación!