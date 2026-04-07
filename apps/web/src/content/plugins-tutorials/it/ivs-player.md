---
locale: it
---

cant @capgo/ivs-player

## Instalación

Para instalar el paquete @capgo/ivs-player, necesitas ejecutar el siguiente comando:

[[BLOQUE_CODIGO]]

## API

El paquete @capgo/ivs-player proporciona la siguiente API:

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

Este método crea una instancia del reproductor IVS. Toma un objeto de opciones como parámetro, que contiene diversas propiedades como la URL del video, si se debe habilitar el modo de imagen en imagen, el título y el subtítulo del video, y más. Retorna una Promesa que se resuelve a la instancia creada.

### start() => Promise

Este método inicia la reproducción del video en el reproductor IVS. Retorna una Promesa.

### cast() => Promise

Este método envía el video a un dispositivo conectado. Retorna una Promesa.

### getCastStatus() => Promise[[ETIQUETA_HTML]]

Este método recupera el estado de la función de transmisión. Retorna una Promesa que se resuelve a un objeto que contiene la propiedad isActive, que indica si la transmisión está activa.

### pause() => Promise

Este método pausa la reproducción del video. Retorna una Promesa.

### delete() => Promise

Este método elimina la instancia del reproductor IVS. Retorna una Promesa.

### getUrl() => Promise

Este método recupera la URL del video que se está reproduciendo actualmente. Retorna una Promesa.

### getState() => Promise

Este método recupera el estado actual del reproductor IVS. Retorna una Promesa.

### setPlayerPosition() => Promise

Este método establece la posición del reproductor IVS en la pantalla. Toma coordenadas x e y como parámetros y retorna una Promesa.

### getPlayerPosition() => Promise

Este método recupera la posición actual del reproductor IVS en la pantalla. Retorna una Promesa.

### setAutoQuality() => Promise

Este método establece el modo de calidad automática del reproductor IVS. Toma un valor booleano como parámetro y retorna una Promesa.

### getAutoQuality() => Promise

Este método recupera el modo de calidad automática actual del reproductor IVS. Retorna una Promesa.

### setPip() => Promise

Este método establece el modo de imagen en imagen del reproductor IVS. Toma un valor booleano como parámetro y retorna una Promesa.

### getPip() => Promise

Este método recupera el modo de imagen en imagen actual del reproductor IVS. Retorna una Promesa.

### setFrame() => Promise

Este método establece el marco del reproductor IVS. Toma un valor numérico como parámetro y retorna una Promesa.

### getFrame() => Promise

Este método recupera el marco actual del reproductor IVS. Retorna una Promesa.

### setMute() => Promise

Este método establece el modo silencio del reproductor IVS. Toma un valor booleano como parámetro y retorna una Promesa.

### getMute() => Promise

Este método recupera el modo silencio actual del reproductor IVS. Retorna una Promesa.

### setQuality() => Promise

Este método establece la calidad del video en el reproductor IVS. Toma un valor de tipo cadena como parámetro y retorna una Promesa.

### getQuality() => Promise

Este método recupera la calidad actual del video en el reproductor IVS. Retorna una Promesa.

### getQualities() => Promise

Este método recupera las calidades disponibles del video en el reproductor IVS. Retorna una Promesa.

### addListener('expandPip', ) => void

Este método agrega un oyente para el evento expandPip. Toma una función de callback como parámetro y retorna void.

### addListener('closePip', ) => void

Este método agrega un oyente para el evento closePip. Toma una función de callback como parámetro y retorna void.

### addListener('onState', ) => void

Este método agrega un oyente para el evento onState. Toma una función de callback como parámetro y retorna void.

### addListener('onCues', ) => void

Este método agrega un oyente para el evento onCues. Toma una función de callback como parámetro y retorna void.

### addListener('onDuration', ) => void

Este método agrega un oyente para el evento onDuration.Prende una funzione di callback come parametro e restituisce void

### addListener('onError', ) => void

Questo metodo aggiunge un listener per l'evento onError. Prende una funzione di callback come parametro e restituisce void.

### addListener('onRebuffering', ) => void

Questo metodo aggiunge un listener per l'evento onRebuffering. Prende una funzione di callback come parametro e restituisce void.

### addListener('onSeekCompleted', ) => void

Questo metodo aggiunge un listener per l'evento onSeekCompleted. Prende una funzione di callback come parametro e restituisce void.

### addListener('onVideoSize', ) => void

Questo metodo aggiunge un listener per l'evento onVideoSize. Prende una funzione di callback come parametro e restituisce void.

### addListener('onQuality', ) => void

Questo metodo aggiunge un listener per l'evento onQuality. Prende una funzione di callback come parametro e restituisce void.

### addListener('onCastStatus', ) => void

Questo metodo aggiunge un listener per l'evento onCastStatus. Prende una funzione di callback come parametro e restituisce void.

### removeAllListeners() => void

Questo metodo rimuove tutti i listener di eventi aggiunti. Restituisce void.

## Conclusione

Il pacchetto @capgo/ivs-player fornisce un'API completa per integrare un lettore IVS nella tua app Capacitor. Seguendo i passi di installazione e consultando la documentazione API, puoi facilmente iniziare a riprodurre video nella tua app utilizzando il lettore IVS.