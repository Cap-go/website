---
locale: es
---

cantar @capgo/native-purchases Paquete

El paquete @capgo/native-purchases es un complemento para Capacitor que proporciona una fácil funcionalidad de compras dentro de la app. En este tutorial, recorreremos los pasos de instalación y uso del paquete en tu proyecto de Capacitor.

## Instalación

Para instalar el paquete @capgo/native-purchases, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

Esto instalará el paquete y sincronizará los archivos nativos con tu proyecto.

### Configuración en Android

Si estás utilizando Android, necesitas agregar algunas configuraciones a tu archivo AndroidManifest.xml. Abre el archivo ubicado en `android/app/src/main/AndroidManifest.xml` y agrega el siguiente código:

[[BLOQUE_DE_CÓDIGO]]

### Configuración en iOS

Si estás utilizando iOS, no se necesitan más pasos.

## Usando el Paquete

El paquete @capgo/native-purchases proporciona varios métodos para manejar compras dentro de la app. Aquí hay algunos ejemplos de cómo usar estos métodos:

### Restaurar Compras

Para restaurar las compras anteriores de un usuario, utiliza el método `restorePurchases()`:

[[BLOQUE_DE_CÓDIGO]]

### Comprar un Producto

Para iniciar una compra de un producto específico, utiliza el método `purchaseProduct()`:

[[BLOQUE_DE_CÓDIGO]]

### Obtener Información del Producto

Para recuperar información sobre un producto específico, utiliza el método `getProducts()`:

[[BLOQUE_DE_CÓDIGO]]

Estos son solo algunos ejemplos de cómo usar el paquete @capgo/native-purchases. Para obtener información más detallada sobre los métodos disponibles y sus parámetros, consulta la documentación del paquete.

## Conclusión

En este tutorial, cubrimos el proceso de instalación y el uso básico del paquete @capgo/native-purchases. Siguiendo los pasos descritos aquí, deberías poder integrar la funcionalidad de compras dentro de la app en tu proyecto de Capacitor.