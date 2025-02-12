---
locale: it
---

Tutorial de paquete @capgo/standard-version

En este tutorial, aprenderemos a usar el paquete `@capgo/standard-version` para gestionar números de versión en tu proyecto. El paquete `@capgo/standard-version` es una herramienta que automatiza la versionado de tu proyecto basado en la [especificación de commit convencional](https://wwwconventionalcommitsorg/).

¡Empecemos!

## Paso 1: Instalación

Para instalar el paquete `@capgo/standard-version`, ejecuta el siguiente comando en tu terminal:

```bash
npm install @capgo/standard-version --save-dev
```

Esto añadirá el paquete como una dependencia de desarrollo en tu proyecto.

## Paso 2: Configuración

Para configurar el paquete `@capgo/standard-version`, crea un archivo `releaseconfigjs` en el directorio raíz de tu proyecto con el siguiente contenido:

```javascript
module.exports = {
  preset: 'capgo',
};
```

Esta configuración especifica el preset que se utilizará para la versionado. En este caso, usamos el preset `capgo`, que es un preset personalizado para el paquete `@capgo/standard-version`.

## Paso 3: Versionado

Para crear una nueva versión de tu proyecto, ejecuta el siguiente comando:

```bash
npx standard-version
```

Esto analizará tu historial de commits y generará automáticamente un nuevo número de versión para tu proyecto basado en los commits convencionales. También actualizará el archivo `CHANGELOGmd` con los últimos cambios.

## Paso 4: Lanzamiento

Para crear un lanzamiento, ejecuta el siguiente comando:

```bash
npx standard-version --release-as 1.0.0
```

Reemplaza `100` con el número de versión deseado para tu lanzamiento. Este comando actualizará el número de versión en tu archivo packagejson, creará una etiqueta git para el lanzamiento y actualizará el archivo `CHANGELOGmd`.

## Conclusión

¡Felicidades! Has aprendido exitosamente a usar el paquete `@capgo/standard-version` para gestionar números de versión en tu proyecto. Este paquete automatiza el proceso de versionado y facilita el seguimiento de cambios en tu proyecto.

Para más información, puedes consultar la documentación del paquete `@capgo/standard-version`.

¡Feliz versionado!