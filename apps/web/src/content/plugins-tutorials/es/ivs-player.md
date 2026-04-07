---
locale: es
---

cantar @capgo/ivs-player

## Instalación

Para instalar el paquete @capgo/ivs-player, necesitas ejecutar el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

## API

El paquete @capgo/ivs-player proporciona la siguiente API:

### crear(opciones: { url: string; pip?: boolean; título?: string; subtítulo?: string; portada?: string; autoReproducir?: boolean; aAtrás?: boolean; x?: number; y?: number; ancho?: number; altura?: number; }) => Promesa

Este método crea una instancia del reproductor IVS. Toma un objeto de opciones como parámetro, que contiene varias propiedades como la URL del video, si se debe habilitar el modo de imagen en imagen, el título y subtítulo del video, y más. Devuelve una Promesa que se resuelve a la instancia creada.

### iniciar() => Promesa

Este método comienza a reproducir el video en el reproductor IVS. Devuelve una Promesa.

### lanzar() => Promesa

Este método lanza el video a un dispositivo conectado. Devuelve una Promesa.

### obtenerEstadoDeLanzamiento() => Promesa[[ETIQUETA_HTML]]

Este método recupera el estado de la función de lanzamiento. Devuelve una Promesa que se resuelve a un objeto que contiene la propiedad isActive, que indica si el lanzamiento está activo.

### pausar() => Promesa

Este método pausa la reproducción del video. Devuelve una Promesa.

### eliminar() => Promesa

Este método elimina la instancia del reproductor IVS. Devuelve una Promesa.

### obtenerUrl() => Promesa

Este método recupera la URL del video que se está reproduciendo actualmente. Devuelve una Promesa.

### obtenerEstado() => Promesa

Este método recupera el estado actual del reproductor IVS. Devuelve una Promesa.

### establecerPosiciónDelReproductor() => Promesa

Este método establece la posición del reproductor IVS en la pantalla. Toma coordenadas x e y como parámetros y devuelve una Promesa.

### obtenerPosiciónDelReproductor() => Promesa

Este método recupera la posición actual del reproductor IVS en la pantalla. Devuelve una Promesa.

### establecerCalidadAutomática() => Promesa

Este método establece el modo de calidad automática del reproductor IVS. Toma un valor booleano como parámetro y devuelve una Promesa.

### obtenerCalidadAutomática() => Promesa

Este método recupera el modo de calidad automática actual del reproductor IVS. Devuelve una Promesa.

### establecerPip() => Promesa

Este método establece el modo de imagen en imagen del reproductor IVS. Toma un valor booleano como parámetro y devuelve una Promesa.

### obtenerPip() => Promesa

Este método recupera el modo de imagen en imagen actual del reproductor IVS. Devuelve una Promesa.

### establecerMarco() => Promesa

Este método establece el marco del reproductor IVS. Toma un valor numérico como parámetro y devuelve una Promesa.

### obtenerMarco() => Promesa

Este método recupera el marco actual del reproductor IVS. Devuelve una Promesa.

### establecerSilencio() => Promesa

Este método establece el modo de silencio del reproductor IVS. Toma un valor booleano como parámetro y devuelve una Promesa.

### obtenerSilencio() => Promesa

Este método recupera el modo de silencio actual del reproductor IVS. Devuelve una Promesa.

### establecerCalidad() => Promesa

Este método establece la calidad del video en el reproductor IVS. Toma un valor de cadena como parámetro y devuelve una Promesa.

### obtenerCalidad() => Promesa

Este método recupera la calidad actual del video en el reproductor IVS. Devuelve una Promesa.

### obtenerCalidades() => Promesa

Este método recupera las calidades disponibles del video en el reproductor IVS. Devuelve una Promesa.

### agregarListener('expandirPip', ) => void

Este método agrega un listener para el evento expandirPip. Toma una función de callback como parámetro y devuelve void.

### agregarListener('cerrarPip', ) => void

Este método agrega un listener para el evento cerrarPip. Toma una función de callback como parámetro y devuelve void.

### agregarListener('enEstado', ) => void

Este método agrega un listener para el evento enEstado. Toma una función de callback como parámetro y devuelve void.

### agregarListener('enCues', ) => void

Este método agrega un listener para el evento enCues. Toma una función de callback como parámetro y devuelve void.

### agregarListener('enDuración', ) => void

Este método agrega un listener para el evento enDuración.Toma una función de callback como parámetro y devuelve void

### addListener('onError', ) => void

Este método agrega un listener para el evento onError. Toma una función de callback como parámetro y devuelve void.

### addListener('onRebuffering', ) => void

Este método agrega un listener para el evento onRebuffering. Toma una función de callback como parámetro y devuelve void.

### addListener('onSeekCompleted', ) => void

Este método agrega un listener para el evento onSeekCompleted. Toma una función de callback como parámetro y devuelve void.

### addListener('onVideoSize', ) => void

Este método agrega un listener para el evento onVideoSize. Toma una función de callback como parámetro y devuelve void.

### addListener('onQuality', ) => void

Este método agrega un listener para el evento onQuality. Toma una función de callback como parámetro y devuelve void.

### addListener('onCastStatus', ) => void

Este método agrega un listener para el evento onCastStatus. Toma una función de callback como parámetro y devuelve void.

### removeAllListeners() => void

Este método elimina todos los listeners de eventos añadidos. Devuelve void.

## Conclusión

El paquete @capgo/ivs-player proporciona una API completa para integrar un reproductor IVS en tu aplicación Capacitor. Siguiendo los pasos de instalación y consultando la documentación de la API, puedes comenzar a reproducir videos en tu aplicación utilizando el reproductor IVS.