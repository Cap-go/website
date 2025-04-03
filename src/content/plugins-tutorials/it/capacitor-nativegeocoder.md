---
locale: it
---

Uso de @capgo/nativegeocoder para geocodificación

El paquete `@capgo/nativegeocoder` es un plugin de Capacitor que proporciona funcionalidad nativa de geocodificación hacia adelante y hacia atrás. La geocodificación es el proceso de convertir direcciones en coordenadas geográficas (latitud y longitud) y viceversa.

Para usar el paquete `@capgo/nativegeocoder`, sigue los pasos a continuación:

### Paso 1: Instala el paquete

Instala el paquete usando npm:

[[BLOQUE_CÓDIGO]]

### Paso 2: Sincroniza tu proyecto

Ejecuta el siguiente comando para sincronizar tu proyecto:

[[BLOQUE_CÓDIGO]]

### Paso 3: Importa el plugin

En tu código, importa `NativeGeocoder` de `@capgo/nativegeocoder`:

[[BLOQUE_CÓDIGO]]

### Paso 4: Implementa la funcionalidad de geocodificación

El plugin `@capgo/nativegeocoder` proporciona dos métodos principales para geocodificación:

#### Geocodificación inversa

La geocodificación inversa es el proceso de convertir coordenadas geográficas (latitud y longitud) en una dirección.

[[BLOQUE_CÓDIGO]]

El método `reverseGeocode` toma un objeto con las propiedades de latitud y longitud. Devuelve la dirección como resultado.

#### Geocodificación hacia adelante

La geocodificación hacia adelante es el proceso de convertir una dirección en coordenadas geográficas (latitud y longitud).

[[BLOQUE_CÓDIGO]]

El método `forwardGeocode` toma un objeto con la propiedad de dirección. Devuelve las coordenadas como resultado.

### Conclusión

El paquete `@capgo/nativegeocoder` proporciona una forma simple y eficiente de realizar geocodificación en tu proyecto de Capacitor. Siguiendo los pasos delineados en este tutorial, puedes integrar fácilmente la funcionalidad de geocodificación en tu aplicación.