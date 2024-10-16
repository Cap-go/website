---
locale: it
---

Utilizando @capgo/cli para subir y descargar archivos a Capgo Cloud

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/) es una herramienta de interfaz de línea de comandos (CLI) que te permite subir y descargar archivos hacia y desde Capgo Cloud. En este tutorial, recorreremos los pasos para usar @capgo/cli para gestionar archivos en Capgo Cloud.

### Paso 1: Registro

Antes de usar @capgo/cli, necesitas registrar una cuenta en [capgoapp](https://capgoapp/) y obtener tu clave API.

### Paso 2: Instalación

Para instalar @capgo/cli, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_CODIGO]]

### Paso 3: Iniciar sesión en Capgo Cloud

Para iniciar sesión en Capgo Cloud usando @capgo/cli, ejecuta el siguiente comando:

[[BLOQUE_CODIGO]]

Reemplaza `[apikey]` con tu clave API obtenida durante el registro. Opcionalmente, puedes usar la bandera `--local` para guardar la clave API en la carpeta local.

### Paso 4: Agregar una nueva aplicación a Capgo Cloud

Para agregar una nueva aplicación a Capgo Cloud, utiliza el siguiente comando:

[[BLOQUE_CODIGO]]

Reemplaza `[appId]` con tu ID de aplicación en el formato `comtestapp`. También puedes usar las banderas `--icon`, `--name` y `--apikey` para personalizar el ícono, el nombre y la clave API de la aplicación.

### Paso 5: Subir una versión a Capgo Cloud

Para subir una versión de tu aplicación a Capgo Cloud, ejecuta el siguiente comando:

[[BLOQUE_CODIGO]]

Reemplaza `[appId]` con tu ID de aplicación. Puedes usar las banderas `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data`, `--no-key`, `--bundle` y `--iv-session-key` para personalizar las opciones de subida.

### Paso 6: Gestionar canales

Puedes crear y eliminar canales en Capgo Cloud utilizando @capgo/cli.

Para agregar un nuevo canal, utiliza el comando:

[[BLOQUE_CODIGO]]

Reemplaza `[channelId]` con el nombre del nuevo canal y `[appId]` con tu ID de aplicación.

Para eliminar un canal, utiliza el comando:

[[BLOQUE_CODIGO]]

Reemplaza `[channelId]` con el nombre del canal a eliminar y `[appId]` con tu ID de aplicación.

### Paso 7: Cifrado de extremo a extremo

@capgo/cli soporta cifrado de extremo a extremo para tu código. Puedes generar un par de claves RSA utilizando el siguiente comando:

[[BLOQUE_CODIGO]]

Puedes guardar la clave privada en la configuración de tu aplicación ejecutando:

[[BLOQUE_CODIGO]]

Para cifrar un archivo zip con tu clave, utiliza el comando:

[[BLOQUE_CODIGO]]

Para descifrar un archivo zip con tu clave, utiliza el comando:

[[BLOQUE_CODIGO]]

Reemplaza `[path/to/zip]` y `[ivSessionKey]` con los valores apropiados.

### Conclusión

En este tutorial, hemos aprendido cómo usar @capgo/cli para subir y descargar archivos hacia y desde Capgo Cloud. @capgo/cli proporciona una interfaz de línea de comandos conveniente para gestionar las versiones de tu aplicación y los canales. Para más información, consulta la [documentación](https://capgoapp/docs/) oficial.