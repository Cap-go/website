---
locale: es
---

Tutorial del paquete `@capgo/inappbrowser`

El paquete `@capgo/inappbrowser` es un complemento de Capacitor que te permite abrir una URL en una ventana de navegador dentro de la aplicación. Aquí hay una guía paso a paso sobre cómo usar este paquete:

## Instalación

Para instalar el paquete, ejecuta el siguiente comando en el directorio raíz de tu proyecto:

[[BLOQUE_CODIGO]]

## Uso

1 Importa la clase `InAppBrowser` del paquete `@capgo/inappbrowser`:

   [[BLOQUE_CODIGO]]

2 Utiliza el método `InAppBrowser.open` para abrir una URL en una nueva ventana de pantalla completa:

   [[BLOQUE_CODIGO]]

   Reemplaza `"YOUR_URL"` con la URL que deseas abrir.

3 También puedes usar otros métodos proporcionados por la clase `InAppBrowser`:

   - `clearCookies`: Eliminar todas las cookies
   - `close`: Cerrar la ventana del navegador dentro de la aplicación
   - `openWebView`: Abrir una URL en una nueva vista web con barras de herramientas
   - `setUrl`: Configurar la URL del navegador dentro de la aplicación

   Consulta la sección de API a continuación para más detalles sobre estos métodos.

## API

El paquete `@capgo/inappbrowser` proporciona los siguientes métodos de API:

- `open(options: OpenOptions)`: Abre una URL en una nueva ventana de pantalla completa. Toma un objeto `OpenOptions` como parámetro.
- `clearCookies()`: Elimina todas las cookies.
- `close()`: Cierra la ventana del navegador dentro de la aplicación.
- `openWebView(options: OpenWebViewOptions)`: Abre una URL en una nueva vista web con barras de herramientas. Toma un objeto `OpenWebViewOptions` como parámetro.
- `setUrl(options: { url: string; })`: Configura la URL del navegador dentro de la aplicación. Toma un objeto con una propiedad `url` como parámetro.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Escucha eventos de cambio de URL. Toma una función `UrlChangeListener` como parámetro.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Escucha eventos de cierre. Toma una función `UrlChangeListener` como parámetro.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Escucha eventos de clic en el botón de confirmar. Toma una función `UrlChangeListener` como parámetro.
- `removeAllListeners()`: Elimina todos los oyentes de eventos.

Para más información sobre los parámetros y valores de retorno de estos métodos, consulta la documentación del paquete.

¡Y eso es todo! Has aprendido cómo usar el paquete `@capgo/inappbrowser` para abrir URL en una ventana de navegador dentro de la aplicación en Capacitor. ¡Feliz codificación!