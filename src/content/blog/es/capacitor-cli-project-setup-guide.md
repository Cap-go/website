---
slug: capacitor-cli-project-setup-guide
title: 'Guía de configuración del proyecto: CLI de Capacitor'
description: >-
  Aprenda cómo configurar Capacitor CLI para crear aplicaciones nativas para iOS
  y Android usando tecnologías web en unos sencillos pasos.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
**¿Quieres crear aplicaciones iOS y Android con una sola base de código?** [Capacitor](https://capacitorjs.com/) CLI simplifica el proceso, permitiéndote crear aplicaciones nativas usando tecnologías web. Esto es lo que aprenderás:

-   **Configuración Rápida**: Instala Capacitor CLI e inicializa tu proyecto en minutos.
-   **Integración de Plataformas**: Agrega soporte para iOS y Android con comandos simples.
-   **Actualizaciones en Vivo**: Usa [Capgo](https://capgo.app/) para actualizaciones instantáneas over-the-air.
-   **Soluciones Comunes**: Resuelve problemas como errores de sincronización o fallos de compilación.

**Pasos Clave para Comenzar:**

1.  Instala [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/), y [Android Studio](https://developer.android.com/studio).
2.  Ejecuta `npm install @capacitor/core @capacitor/cli` e inicializa tu proyecto.
3.  Agrega las plataformas iOS y Android usando `npx cap add ios` y `npx cap add android`.
4.  Opcional: Configura Capgo para [actualizaciones](https://capgo.app/plugins/capacitor-updater/) en vivo de la aplicación.

Esta guía cubre todo lo que necesitas para configurar Capacitor CLI, configurar plataformas y desplegar tu aplicación. ¡Empecemos!

## Introducción a [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Requisitos de Configuración

Para comenzar, asegúrate de tener instaladas las siguientes herramientas:

-   **Node.js** (versión 14 o más reciente) y **npm**
-   **Java JDK** (versión 11 o más reciente)
-   **Xcode** (versión 12 o más reciente para compilaciones iOS)
-   **Android Studio** (para compilaciones Android)
-   **Capacitor CLI** (versión 6 o 7)

_Opcional:_ Si deseas habilitar actualizaciones en vivo, consulta la "[Guía de Configuración de Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" a continuación.

## Pasos de Instalación del CLI

Antes de comenzar, asegúrate de tener configurados **Node.js**, **npm**, **JDK**, **Xcode**, y **Android Studio**. Una vez listo, puedes instalar Capacitor CLI ejecutando:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

Este comando instala Capacitor y configura sus componentes principales.

Después de completar este paso, pasa a **Crear un Nuevo Proyecto** para estructurar tu aplicación.

## Creando un Nuevo Proyecto

Para comenzar con tu proyecto [usando Capacitor CLI](https://capgo.app/docs/cli/commands/), sigue estos pasos:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### Actualizando el Archivo de Configuración

Edita el archivo `capacitor.config.json` para incluir la siguiente configuración:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

Una vez actualizado, usa esta configuración para configurar Capacitor en tu proyecto.

## Configuración de Plataforma

Ahora que la estructura del proyecto está lista, es momento de configurar los objetivos iOS y Android.

### Agregando iOS y Android

Comienza instalando los paquetes necesarios específicos de cada plataforma usando Capacitor CLI:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

Para iOS, asegúrate de tener Xcode 14 o posterior, [CocoaPods](https://cocoapods.org/) 1.11 o más reciente, y macOS 12 o superior. Para Android, necesitarás Android Studio Giraffe (2022.3.1+), JDK 17 o posterior, y [Gradle](https://gradle.org/) 7.5 o superior.

Una vez instalado, necesitarás mantener tus objetivos nativos actualizados con los cambios en tu aplicación web.

### Actualizaciones de Plataforma

Para sincronizar tus plataformas con los últimos cambios web, sigue estos pasos después de actualizar tu aplicación web:

```bash
npm run build
npx cap sync
```

El comando `cap sync` maneja dos tareas:

-   Copia los activos web actualizados a las plataformas nativas
-   Actualiza las configuraciones nativas y plugins para coincidir con los últimos cambios

### Configuración del IDE

Abre los proyectos específicos de plataforma en los IDEs apropiados:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

**En Xcode:**

1.  Elige tu equipo de desarrollo.
2.  Configura los certificados de firma.
3.  Actualiza tu identificador de paquete.

**En Android Studio:**

1.  Modifica el ID de aplicación en `build.gradle`.
2.  Configura el keystore para la firma.
3.  Configura las variantes de compilación debug y release.

Cuando todo esté configurado, compila los proyectos usando `npx cap build ios` o `npx cap build android`. No olvides ejecutar `npx cap sync` nuevamente para asegurar que todos los activos estén actualizados.

## Guía de Configuración de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Configura Capgo para habilitar actualizaciones instantáneas over-the-air para tu aplicación.

### Características Principales de Capgo

Capgo ofrece varias herramientas para agilizar las actualizaciones de aplicaciones:

-   **Encriptación de extremo a extremo** asegura la entrega segura de actualizaciones.
-   Las actualizaciones se ejecutan **en segundo plano** cuando la aplicación se inicia.
-   **Herramientas de análisis** ayudan a rastrear tasas de éxito de actualización y participación del usuario.
-   Una opción de **reversión con un clic** te permite recuperarte rápidamente de actualizaciones problemáticas.
-   Usa el **[sistema de canales](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** para implementaciones graduales y pruebas beta.

### Instalando Capgo

Sigue estos pasos para comenzar con Capgo:

1.  [Instala el CLI de Capgo](https://capgo.app/docs/self-hosted/local-dev/cli/):
    
    ```bash
    npm install --save @capgo/cli
    ```
    
2.  [Inicializa Capgo](https://capgo.app/docs/webapp/) en tu proyecto:
    
    ```bash
    npx capgo init
    ```
    
3.  Compila y libera actualizaciones:
    
    ```bash
    npm run build
    npx capgo release
    ```
    
4.  Abre la aplicación para activar el proceso de actualización en segundo plano.
    

### Mejores Prácticas

-   Usa canales para probar actualizaciones antes de implementarlas a todos los usuarios.
-   Monitorea analíticas para asegurar que las actualizaciones se entreguen exitosamente y los usuarios permanezcan comprometidos.
-   Habilita el seguimiento de errores para detectar y corregir problemas temprano.
-   Mantén la función de reversión lista para abordar rápidamente cualquier problema.

Capgo es compatible con Capacitor 6 y 7, se integra sin problemas con pipelines CI/CD y cumple con los requisitos de las tiendas de Apple y Google.

## Problemas Comunes y Consejos

Una vez que hayas completado la configuración de plataforma y Capgo, podrías enfrentar algunos errores comunes. Aquí te mostramos cómo abordarlos rápidamente.

### Problemas de Configuración del Entorno

-   **CLI No Encontrado**  
    **Error**: El comando `npx cap` falla.  
    **Solución**: Ejecuta `npm install --save @capacitor/cli @capacitor/core` e intenta nuevamente.
    
-   **Incompatibilidad de Versión de Node**  
    **Error**: Los comandos CLI fallan debido a errores de versión de Node.js.  
    **Solución**: Instala Node.js versión 14 o superior como se indica en los requisitos de configuración.
    

### Problemas de Configuración

-   **Desajuste de Configuración**  
    **Error**: Los cambios en `capacitor.config.json` no surten efecto.  
    **Solución**: Asegúrate de que los valores `appId` y `webDir` coincidan con tu `package.json` y la carpeta de salida de compilación web.
    
-   **Errores de Sincronización de Plataforma**  
    **Error**: Ejecutar `npx cap sync` resulta en conflictos de versión de plugins.  
    **Solución**: Actualiza `@capacitor/android` y `@capacitor/ios` a la misma versión mayor, luego vuelve a ejecutar el comando sync.
    

### Compilación y Despliegue

-   **Fallos de Firma de Compilación**  
    **Error**: Las compilaciones iOS o Android fallan debido a certificados faltantes o keystore.  
    **Solución**: Sigue las instrucciones de configuración del IDE. Para iOS, agrega tu equipo de desarrollo en Xcode. Para Android, configura el keystore en `build.gradle`.
    
-   **Directorio Web No Encontrado**  
    **Error**: `npx cap sync` no puede encontrar los activos web.  
    **Solución**: Ejecuta tu comando de compilación web (por ejemplo, `npm run build`) antes de sincronizar las plataformas.
    

### Problemas de Actualización en Vivo

-   **[Fallos de Actualización de Capgo](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Error**: Las actualizaciones no aparecen en la aplicación de producción.  
    **Solución**: Verifica tu [clave API de Capgo](https://capgo.app/docs/webapp/api-keys/) en `capacitor.config.json` y asegúrate de que estás apuntando al canal correcto.

Para más detalles sobre la configuración específica de plataforma, revisa la sección Configuración de Plataforma. Si estás trabajando con actualizaciones en vivo, consulta la Guía de Configuración de Capgo para consejos adicionales de solución de problemas.

## Resumen

### Revisión de Configuración

Inicia tu aplicación web con Capacitor CLI, configura las plataformas iOS y Android, y opcionalmente incluye Capgo para actualizaciones en vivo.

Aquí te mostramos cómo comenzar:

-   Usa Capacitor CLI para inicializar tu proyecto.
-   Configura el ID de paquete de tu aplicación y define el directorio de salida web.
-   Agrega soporte para plataformas iOS y Android.
-   Instala y configura Capgo con el siguiente comando: `npm install --save @capgo/cli && npx capgo init`

Para instrucciones detalladas de configuración o solución de problemas, consulta la documentación oficial de Capacitor y Capgo.
