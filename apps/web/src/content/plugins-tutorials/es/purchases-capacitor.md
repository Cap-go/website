---
locale: es
---

Tutorial de revenuecat/purchases-capacitor

Este tutorial te guiará a través del proceso de implementar compras dentro de la app y suscripciones en tu aplicación Ionic Capacitor usando el paquete `@revenuecat/purchases-capacitor`.

## Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente:

- Un proyecto de Ionic Capacitor configurado
- Una cuenta de RevenueCat (regístrate en https://apprevenuecatcom/signup)
- Productos o suscripciones dentro de la app configurados en tus cuentas de tienda de aplicaciones (Apple App Store y/o Google Play Store)

## Instalación

1 Abre tu terminal o símbolo del sistema y navega a tu directorio del proyecto.

2 Ejecuta el siguiente comando para instalar el paquete:

[[BLOQUE_DE_CÓDIGO]]

3 Después de la instalación, sincroniza tu proyecto de Capacitor:

[[BLOQUE_DE_CÓDIGO]]

## Configuración

1 Importa el módulo Purchases en el archivo principal de TypeScript de tu app (por ejemplo, `appcomponentts`):

[[BLOQUE_DE_CÓDIGO]]

2 Configura el SDK con tu clave de API de RevenueCat:

[[BLOQUE_DE_CÓDIGO]]

Llama a esta función cuando tu app inicie, por ejemplo, en el método `ngOnInit()` de tu componente principal.

## Uso Básico

### Obteniendo Productos Disponibles

Para obtener la lista de productos disponibles:

[[BLOQUE_DE_CÓDIGO]]

### Realizando una Compra

Para iniciar una compra:

[[BLOQUE_DE_CÓDIGO]]

### Verificando el Estado de Suscripción

Para verificar el estado de suscripción actual del usuario:

[[BLOQUE_DE_CÓDIGO]]

### Restaurando Compras

Para restaurar las compras anteriores de un usuario:

[[BLOQUE_DE_CÓDIGO]]

## Características Avanzadas

### Identificando Usuarios

Si tienes tu propio sistema de ID de usuario, puedes identificar a los usuarios ante RevenueCat:

[[BLOQUE_DE_CÓDIGO]]

### Verificando Elegibilidad para Precios Introductorios

Para verificar si un usuario es elegible para un precio introductorio:

[[BLOQUE_DE_CÓDIGO]]

### Estableciendo Atributos

Puedes establecer atributos personalizados para los usuarios:

[[BLOQUE_DE_CÓDIGO]]

## Conclusión

Este tutorial cubrió los aspectos básicos de implementar compras dentro de la app y suscripciones utilizando el paquete `@revenuecat/purchases-capacitor`. Recuerda manejar los errores de manera apropiada y probar tu implementación a fondo.

Para un uso más avanzado y documentación detallada de la API, consulta la documentación de RevenueCat en https://docsrevenuecatcom/.

No olvides configurar tus productos en el panel de RevenueCat y enlazarlos a tus productos de la tienda de aplicaciones. Además, asegúrate de probar tu implementación en un entorno de sandbox antes de lanzarla a producción.