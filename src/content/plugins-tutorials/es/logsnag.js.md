---
locale: es
---

Paquete `@capgo/logsnag`

El paquete `@capgo/logsnag` es una herramienta poderosa para recibir notificaciones y rastrear eventos del proyecto. Este tutorial te guiará a través de la instalación y el uso del paquete.

## Instalación

Para instalar el paquete `@capgo/logsnag`, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

## Uso

### Importar Biblioteca

Para usar el paquete `@capgo/logsnag` en tu proyecto, debes importarlo. Añade la siguiente declaración de importación al comienzo de tu archivo JavaScript:

[[BLOQUE_DE_CÓDIGO]]

### Inicializar Cliente

Antes de que puedas comenzar a usar las funciones de `@capgo/logsnag`, necesitas inicializar un cliente. Usa el siguiente código para inicializar un cliente:

[[BLOQUE_DE_CÓDIGO]]
Sustituye `YOUR_API_TOKEN` con tu token de API real y `YOUR_PROJECT_NAME` con el nombre de tu proyecto.

### Publicar Evento

Para publicar un evento utilizando `@capgo/logsnag`, usa el método `publish` del objeto `logsnag`. Aquí tienes un ejemplo de código que publica un evento:

[[BLOQUE_DE_CÓDIGO]]
Personaliza los valores de las propiedades de acuerdo a tu evento específico. Puedes especificar el canal, nombre del evento, icono, etiquetas, y si deseas notificar o no.

### Publicar Insight

Además de los eventos, también puedes publicar insights utilizando `@capgo/logsnag`. Los insights proporcionan información valiosa y estadísticas sobre tu proyecto. Aquí tienes un ejemplo de código que publica un insight:

[[BLOQUE_DE_CÓDIGO]]
Modifica los valores de las propiedades para que coincidan con tu insight. Puedes especificar el título, valor e icono.

¡Eso es todo! Ahora has aprendido a instalar y usar el paquete `@capgo/logsnag` en tu proyecto. ¡Disfruta rastreando los eventos de tu proyecto y recibiendo notificaciones con facilidad!