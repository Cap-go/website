---
locale: es
---

Usando @capgo/nativegeocoder para Geocodificación

El paquete `@capgo/nativegeocoder` es un complemento de Capacitor que proporciona funcionalidad nativa de geocodificación directa e inversa. La geocodificación es el proceso de convertir direcciones en coordenadas geográficas (latitud y longitud) y viceversa.

Para usar el paquete `@capgo/nativegeocoder`, sigue los pasos a continuación:

### Paso 1: Instalar el paquete

Instala el paquete usando npm:

[[BLOQUE_DE_CÓDIGO]]

### Paso 2: Sincroniza tu proyecto

Ejecuta el siguiente comando para sincronizar tu proyecto:

[[BLOQUE_DE_CÓDIGO]]

### Paso 3: Importa el complemento

En tu código, importa `NativeGeocoder` de `@capgo/nativegeocoder`:

[[BLOQUE_DE_CÓDIGO]]

### Paso 4: Implementa la funcionalidad de geocodificación

El complemento `@capgo/nativegeocoder` proporciona dos métodos principales para la geocodificación:

#### Geocodificación Inversa

La geocodificación inversa es el proceso de convertir coordenadas geográficas (latitud y longitud) en una dirección.

[[BLOQUE_DE_CÓDIGO]]

El método `reverseGeocode` toma un objeto con las propiedades de latitud y longitud. Devuelve la dirección como resultado.

#### Geocodificación Directa

La geocodificación directa es el proceso de convertir una dirección en coordenadas geográficas (latitud y longitud).

[[BLOQUE_DE_CÓDIGO]]

El método `forwardGeocode` toma un objeto con la propiedad de dirección. Devuelve las coordenadas como resultado.

### Conclusión

El paquete `@capgo/nativegeocoder` proporciona una manera simple y eficiente de realizar geocodificación en tu proyecto de Capacitor. Siguiendo los pasos descritos en este tutorial, puedes integrar fácilmente la funcionalidad de geocodificación en tu aplicación.