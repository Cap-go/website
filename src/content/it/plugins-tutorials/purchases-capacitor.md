---
locale: it
---

Tutorial de revenuecat/purchases-capacitor

Este tutorial te guiará a través del proceso de implementar compras dentro de la aplicación y suscripciones en tu aplicación Ionic Capacitor utilizando el paquete `@revenuecat/purchases-capacitor`.

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente:

- Un proyecto de Ionic Capacitor configurado
- Una cuenta de RevenueCat (regístrate en https://apprevenuecatcom/signup)
- Productos o suscripciones en la aplicación configurados en tus cuentas de la tienda de aplicaciones (Apple App Store y/o Google Play Store)

## Instalación

1 Abre tu terminal o símbolo del sistema y navega a tu directorio de proyecto.

2 Ejecuta el siguiente comando para instalar el paquete:

[[BLOQUE_DE_CODIGO]]

3 Después de la instalación, sincroniza tu proyecto de Capacitor:

[[BLOQUE_DE_CODIGO]]

## Configuración

1 Importa el módulo Purchases en el archivo TypeScript principal de tu aplicación (por ejemplo, `appcomponentts`):

[[BLOQUE_DE_CODIGO]]

2 Configura el SDK con tu clave API de RevenueCat:

[[BLOQUE_DE_CODIGO]]

Llama a esta función cuando tu aplicación se inicie, por ejemplo, en el método `ngOnInit()` de tu componente principal.

## Uso básico

### Obtener productos disponibles

Para obtener la lista de productos disponibles:

[[BLOQUE_DE_CODIGO]]

### Realizar una compra

Para iniciar una compra:

[[BLOQUE_DE_CODIGO]]

### Verificar el estado de la suscripción

Para verificar el estado actual de la suscripción del usuario:

[[BLOQUE_DE_CODIGO]]

### Restaurar compras

Para restaurar las compras anteriores de un usuario:

[[BLOQUE_DE_CODIGO]]

## Funciones avanzadas

### Identificación de usuarios

Si tienes tu propio sistema de ID de usuario, puedes identificar a los usuarios ante RevenueCat:

[[BLOQUE_DE_CODIGO]]

### Verificar elegibilidad para precios introductorios

Para verificar si un usuario es elegible para un precio introductorio:

[[BLOQUE_DE_CODIGO]]

### Establecer atributos

Puedes establecer atributos personalizados para los usuarios:

[[BLOQUE_DE_CODIGO]]

## Conclusión

Este tutorial abarcó lo básico de implementar compras dentro de la aplicación y suscripciones utilizando el paquete `@revenuecat/purchases-capacitor`. Recuerda manejar los errores de manera adecuada y probar tu implementación a fondo.

Para un uso más avanzado y documentación detallada de la API, consulta la documentación de RevenueCat en https://docsrevenuecatcom/.

No olvides configurar tus productos en el panel de RevenueCat y vincularlos a tus productos de la tienda de aplicaciones. Además, asegúrate de probar tu implementación en un entorno de sandbox antes de lanzar a producción.