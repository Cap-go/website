---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Instalando Capacitor CLI: Guía Paso a Paso'
description: >-
  Aprende a instalar y configurar Capacitor CLI para transformar aplicaciones
  web en aplicaciones móviles nativas de manera eficiente.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Desarrollo Móvil
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/) CLI te ayuda a transformar aplicaciones web en aplicaciones nativas para iOS y Android con una única base de código.** Aquí te mostramos cómo configurarlo rápidamente:

-   **Requisitos previos**: Instala [Node.js](https://nodejs.org/en) (v16+), npm y un framework web (React, Vue, Angular, etc.).
-   **[Instalar Capacitor CLI](https://capgo.app/docs/cli/commands)**: Ejecuta `npm install @capacitor/cli @capacitor/core` e inicializa tu proyecto con `npx cap init`.
-   **Preparar Plataformas**: Agrega soporte para iOS (`npx cap add ios`) y Android (`npx cap add android`).
-   **Construir y Sincronizar**: Usa `npm run build` y `npx cap sync` para transferir activos web a proyectos nativos.
-   **Actualizaciones Opcionales en Vivo**: Usa herramientas como [Capgo](https://capgo.app/) para enviar actualizaciones al instante sin retrasos en la tienda de aplicaciones.

Capacitor CLI simplifica el desarrollo y mantenimiento de aplicaciones. Sigue la guía para una instalación y resolución de problemas sin problemas.

## ¡Construye una Aplicación Móvil Rápido! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Antes de Empezar

Prepara tu entorno siguiendo estos pasos:

### Configura [Node.js](https://nodejs.org/en) y npm

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Necesitarás la versión 16 o superior de Node.js. Se recomienda la última versión LTS. Para verificar tu configuración, ejecuta:

```bash
node --version
npm --version
```

Si necesitas actualizar, descarga Node.js (que incluye npm) desde el sitio web oficial.

Después de confirmar que Node.js está listo, asegúrate de que tu proyecto web cumpla con los requisitos necesarios de Capacitor.

### Verifica Tu Proyecto Web

Tu proyecto web debe tener lo siguiente:

-   **Un package.json válido**: Asegúrate de que esté configurado correctamente.
-   **Un directorio de construcción**: Aquí es donde residen tus activos web (comúnmente `dist` o `www`).
-   **Un punto de entrada**: Tu directorio de construcción debe incluir un archivo `index.html`.

Aquí tienes un vistazo rápido a los campos clave de `package.json`:

| Campo Requerido | Valor Ejemplo | Propósito |
| --- | --- | --- |
| name | "my-app" | Identifica el proyecto |
| version | "1.0.0" | Especifica la versión de la aplicación |
| build directory | "dist" o "www" | Apunta a activos web |

Una vez que tu Node.js y proyecto web estén listos, pasa a instalar herramientas específicas de plataforma.

### Instalar el Software Requerido

**Para Desarrollo en Android:**

-   Descarga e instala la última versión de **[Android Studio](https://developer.android.com/studio)**.
-   Configura el SDK de Android con al menos el nivel de API 22.
-   Configura la variable de entorno `ANDROID_HOME`.

**Para Desarrollo en iOS (solo Mac):**

-   Instala **[Xcode](https://developer.apple.com/xcode/) 14** o una versión más reciente.
    
-   Instala las Herramientas de Línea de Comando.
    
-   Usa [Homebrew](https://brew.sh/) para instalar [CocoaPods](https://cocoapods.org/):
    
    ```bash
    brew install cocoapods
    ```
    
-   Acepta la licencia de Xcode:
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

Al integrar Capgo más adelante, asegúrate de tener una conexión a Internet estable y certificados SSL válidos.

Con estos pasos completos, estás listo para un proceso de desarrollo de Capacitor sin problemas. A continuación, instalarás el Capacitor CLI.

## Instalar Capacitor CLI

Con tu entorno listo, es hora de instalar y configurar Capacitor CLI.

### Agregar Paquetes de Capacitor

Comienza por instalar los paquetes de Capacitor CLI y Core usando npm:

```bash
npm install @capacitor/cli @capacitor/core
```

Una vez instalado, confirma la configuración verificando la [versión de Capacitor](https://capgo.app/plugins/ivs-player/):

```bash
npx cap --version
```

### Configura Tu Proyecto

Inicializa Capacitor en tu proyecto con el siguiente comando:

```bash
npx cap init
```

Durante la inicialización, se te pedirá que proporciones estos detalles:

| Configuración | Descripción | Ejemplo |
| --- | --- | --- |
| App Name | El nombre que se muestra en las tiendas de aplicaciones | "Mi Aplicación Asombrosa" |
| App ID | Un identificador único para tu aplicación | "com.mycompany.myapp" |
| Web Directory | Ruta a tus activos web | "dist" o "www" |

A continuación, actualiza tu archivo de configuración (`capacitor.config.ts` o `capacitor.config.json`) con los ajustes relevantes:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.myapp',
  appName: 'My Awesome App',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

### Configura iOS y Android

Agrega soporte para las plataformas iOS y Android con estos comandos:

```bash
npx cap add ios
npx cap add android
```

Esto generará proyectos nativos:

-   **iOS**: Crea una carpeta `ios` que contiene el proyecto de Xcode.
-   **Android**: Crea una carpeta `android` para el proyecto de Android Studio.

Después de realizar cambios en tus activos web, ejecuta los siguientes comandos para construir y sincronizar:

```bash
npm run build
npx cap sync
```

Este proceso compila tus activos web y los transfiere a los proyectos nativos, incluyendo cualquier [plugin de Capacitor](https://capgo.app/plugins/) instalado.

Para abrir los proyectos nativos y realizar más personalizaciones:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

Ahora estás listo para probar tu configuración y resolver cualquier problema que pueda surgir.

## Solucionar Problemas Comunes

Al configurar Capacitor CLI, podrías encontrarte con algunos inconvenientes comunes. Aquí hay cómo abordarlos:

### Problemas con Android Gradle

Si enfrentas problemas relacionados con Gradle, prueba estos pasos:

1.  Navega al directorio de Android y limpia la caché de construcción:
    
    ```bash
    cd android
    ./gradlew cleanBuildCache
    ```
    
2.  Actualiza la versión de Gradle en `android/build.gradle`:
    
    ```kotlin
    buildscript {
        ext {
            gradleVersion = '8.1.0'
        }
    }
    ```
    
3.  Agrega las siguientes líneas a `android/gradle.properties` para un mejor rendimiento:
    
    ```properties
    org.gradle.jvmargs=-Xmx4608m
    org.gradle.parallel=true
    ```
    

Si los problemas persisten, revisa tu configuración o consulta recursos adicionales de solución de problemas.

### La Aplicación Muestra Pantalla en Blanco

Una pantalla en blanco generalmente indica un problema de configuración. Aquí hay cómo abordarlo:

-   **Verifica la Ruta del Directorio Web**: Asegúrate de que `webDir` coincida con tu salida de construcción.
    
    ```typescript
    const config: CapacitorConfig = {
        webDir: 'dist', // Adjust if necessary
    };
    ```
    
-   **Verifica la Configuración del Servidor**: Confirma que los ajustes del servidor sean correctos.
    
    ```typescript
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
    ```
    
-   **Actualiza la Política de Seguridad de Contenido**: Agrega esta etiqueta meta a tu HTML para una carga correcta de recursos.
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *">
    ```
    

### El Plugin No Funciona

Si un plugin no se comporta como se esperaba, sigue estos pasos:

1.  Realiza una instalación limpia de las dependencias:
    
    ```bash
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```
    
2.  Verifica la configuración de los plugins en `capacitor.config.ts` para asegurarte de que estén configurados correctamente:
    
    ```typescript
    plugins: {
        PluginName: {
            option: 'value'
        }
    }
    ```
    

Para aquellos que utilizan el [plugin nativo de Capgo](https://capgo.app/plugins/), se sincroniza automáticamente con los plugins y mantiene la compatibilidad durante las actualizaciones.

Después de aplicar estas soluciones, reconstruye tu proyecto para verificar los cambios:

```bash
npm run build && npx cap copy && npx cap sync
```

Una vez que todo esté funcionando sin problemas, puedes avanzar con la exploración de opciones de actualización en vivo con Capgo.

## Actualizaciones en Vivo con [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Simplifica [las actualizaciones de aplicaciones](https://capgo.app/plugins/capacitor-updater/) utilizando Capgo. Te permite enviar actualizaciones directamente a los usuarios, saltándote la necesidad de revisiones en la tienda de aplicaciones.

**Comenzar es simple.** Primero, instala los paquetes necesarios:

```bash
npm install @capgo/cli @capgo/capacitor-updater
npx cap sync
```

Luego, inicializa Capgo en tu proyecto:

```bash
npx @capgo/cli init
```

### Planes de Precios

Capgo ofrece varios niveles de precios para satisfacer diferentes necesidades:

| Plan | Usuarios Activos Mensuales | Ancho de Banda | Almacenamiento | Precio (Anual) |
| --- | --- | --- | --- | --- |
| SOLO | 1,000 | 50 GB | 2 GB | $12/mes |
| MAKER | 10,000 | 500 GB | 5 GB | $33/mes |
| TEAM | 100,000 | 2,000 GB | 10 GB | $83/mes |

Para usuarios empresariales, el plan PAYG comienza en $249/mes e incluye beneficios como acceso a la API, dominios personalizados y soporte dedicado.

### Configuración para Actualizaciones en Vivo

Para habilitar actualizaciones en vivo, añade lo siguiente a tu archivo `capacitor.config.ts`:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
}
```

### Características Clave

Capgo proporciona varias características destacadas:

-   **[Actualizaciones seguras](https://capgo.app/docs/live-updates/update-behavior/)** con encriptación de extremo a extremo
-   **Despliegues automatizados** a través de CI/CD integrado
-   **Actualizaciones dirigidas** a través de la asignación de usuarios
-   **Rollback instantáneo** con control de versiones
-   **Analítica en tiempo real** para rastrear actualizaciones

### Comandos de Despliegue

Prueba las actualizaciones en desarrollo antes de desplegarlas en vivo. Usa los siguientes comandos:

-   Desplegar a staging:
    
    ```bash
    npx @capgo/cli deploy --channel staging
    ```
    
-   Desplegar a producción:
    
    ```bash
    npx @capgo/cli deploy --channel production
    ```
    

Capgo garantiza el cumplimiento con las directrices de Apple y Android, por lo que tus actualizaciones en vivo no correrán el riesgo de violaciones en la tienda de aplicaciones. Es una forma eficiente de gestionar aplicaciones de Capacitor después de la instalación.

## Conclusión

Configurar Capacitor CLI es simple cuando tienes los requisitos previos correctos. Esta configuración asegura actualizaciones de aplicaciones más suaves y flujos de trabajo de desarrollo eficientes.

Las herramientas modernas hacen que el mantenimiento de aplicaciones sea más fácil que nunca. Por ejemplo, Capgo ahora ofrece actualizaciones en vivo, reemplazando métodos más antiguos. Su integración con la instalación CLI lo convierte en una excelente opción para los desarrolladores que trabajan con aplicaciones de Capacitor.

El [ecosistema de Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) está mejorando constantemente con nuevas herramientas y características. Instalar el CLI es solo el punto de partida para [construir aplicaciones móviles](https://capgo.app/blog/angular-mobile-app-capacitor/), y te beneficiarás de documentación detallada y una comunidad activa de desarrolladores.

Asegúrate de mantener actualizado el Capacitor CLI y sus paquetes para evitar problemas de compatibilidad.
