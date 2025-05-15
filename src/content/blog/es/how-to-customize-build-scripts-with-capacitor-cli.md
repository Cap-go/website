---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Cómo personalizar scripts de construcción con Capacitor CLI
description: >-
  Aprende a personalizar tus scripts de construcción usando Capacitor CLI para
  despliegues eficientes y actualizaciones de aplicaciones a medida en todas las
  plataformas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2025-04-02T01:58:48.944Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI te permite personalizar el proceso de construcción de tu aplicación para plataformas iOS, Android y web. Al ajustar los scripts de construcción, puedes:

-   **Acelerar actualizaciones**: Envía cambios al instante sin demoras en la tienda de aplicaciones.
-   **Controlar despliegues**: Revertir actualizaciones o dirigir grupos específicos de usuarios.
-   **Asegurar tu app**: Utiliza cifrado para proteger las actualizaciones.
-   **Optimizar construcciones**: Ajusta la configuración para necesidades específicas de la plataforma.

### Resumen Rápido de Características Clave:

-   **Archivos de Configuración**: Utiliza `capacitor.config.json` y `package.json` para gestionar la configuración de construcción.
-   **Scripts Personalizados**: Agrega tareas de preconstrucción y postconstrucción para automatización.
-   **Hooks de Construcción**: Ejecuta código durante etapas específicas del proceso de construcción.
-   **Variables de Entorno**: Simplifica construcciones específicas de entorno con archivos `.env`.

[Capgo](https://capgo.app/), una herramienta de despliegue, mejora este proceso con [actualizaciones automatizadas](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/), seguimiento de versiones y optimización del rendimiento global. Sigue leyendo para aprender cómo configurar y personalizar tus scripts de construcción para una máxima eficiencia.

## Presentando [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Proceso de Construcción Predeterminado en Capacitor

Entender cómo Capacitor maneja su proceso de construcción predeterminado es crucial si deseas personalizarlo de manera efectiva. A continuación, desglosaremos el proceso de construcción del CLI de Capacitor y sus archivos de configuración clave.

### Pasos Estándar de Construcción

Capacitor utiliza un proceso paso a paso para transformar tu aplicación web en construcciones específicas de la plataforma. Esto es lo que sucede durante el proceso de construcción predeterminado:

| Fase | Descripción | Salida |
| --- | --- | --- |
| **Construcción Web** | Compila activos web utilizando tus herramientas de marco | Paquete web optimizado |
| **Copiar Activos** | Mueve activos web a carpetas de plataformas nativas | Directorios de activos específicos de la plataforma |
| **Construcción Nativa** | Ejecuta comandos de construcción específicos de la plataforma | Binarios listos para desplegar |
| **Verificación** | Comprueba la integridad y dependencias de la construcción | Estado de la construcción y advertencias |

### Archivos de Configuración Principales

Dos archivos de configuración clave moldean cómo Capacitor maneja tus construcciones:

**capacitor.config.json**  
Este es el archivo de configuración central para tu proyecto de Capacitor. Establece parámetros importantes para tus construcciones:

```json
{
  "appId": "com.example.app",
  "appName": "MyApp",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000
    }
  }
}
```

-   **`appId`**: Un identificador único para tu aplicación.
-   **`appName`**: El nombre de tu aplicación.
-   **`webDir`**: Especifica dónde Capacitor debería buscar los activos web (por ejemplo, `dist`).
-   **`plugins`**: Permite configurar opciones específicas de plugins, como las opciones de SplashScreen.

**package.json**  
Este archivo incluye scripts de construcción y dependencias que influyen en el proceso de construcción:

```json
{
  "scripts": {
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "cap:build": "cap build"
  }
}
```

-   La configuración `webDir` en `capacitor.config.json` le dice a Capacitor dónde localizar tus activos web compilados para incluir en las construcciones nativas.
-   Después de hacer cambios en `capacitor.config.json`, necesitas ejecutar `cap sync` para asegurarte de que tus proyectos nativos estén actualizados.

A continuación, exploraremos cómo puedes modificar esta configuración para personalizar aún más tus construcciones.

## Modificar Scripts de Construcción

Puedes ajustar el proceso de construcción predeterminado de Capacitor para adaptarlo mejor a las necesidades de tu proyecto. Aquí te explicamos cómo:

### Configuración de Archivos

Puedes ajustar el proceso de construcción editando el archivo `capacitor.config.json`. A continuación, se muestra un ejemplo de configuración:

```json
{
  "appId": "com.example.app",
  "webDir": "www",
  "server": {
    "hostname": "localhost",
    "androidScheme": "https",
    "iosScheme": "https",
    "allowNavigation": ["*.example.com"]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore",
      "keystorePassword": "mypassword",
      "keystoreAlias": "release",
      "keystoreAliasPassword": "mypassword"
    }
  },
  "ios": {
    "scheme": "App",
    "automaticProvisioning": true
  }
}
```

Aquí hay algunas configuraciones clave que puedes modificar:

-   **`webDir`**: Especifica dónde se encuentran tus activos web compilados.
-   **`server`**: Configura el servidor de desarrollo, incluyendo nombre de host y permisos de navegación.
-   **`android/ios`**: Permite configuraciones de construcción específicas de la plataforma, como detalles de keystore para Android o opciones de aprovisionamiento para iOS.

### Crear Scripts NPM

Para agilizar tu flujo de trabajo, agrega scripts personalizados de NPM a tu archivo `package.json`. Aquí tienes un ejemplo:

```json
{
  "scripts": {
    "prebuild": "node ./scripts/prepare-env.js",
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "build:ios": "cap build ios --release",
    "build:android": "cap build android --release",
    "postbuild": "node ./scripts/notify-completion.js"
  }
}
```

-   **`prebuild` y `postbuild`**: Utiliza estos para tareas como configurar el entorno o enviar notificaciones cuando finalice la construcción.
-   **`build:platform`**: Comandos específicos de la plataforma para construir aplicaciones de Android o iOS.

Puedes llevar la automatización aún más lejos al agregar hooks de construcción.

### Configuración de Hooks de Construcción

Para un control más avanzado, utiliza hooks de construcción para ejecutar código personalizado en puntos específicos durante el proceso de construcción. Aquí tienes un ejemplo de configuración en `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  plugins: {
    CapacitorHooks: {
      beforeBuild: async () => {
        console.log('Running pre-build tasks...');
        // Add your pre-build tasks here
      },
      afterBuild: async () => {
        console.log('Running post-build tasks...');
        // Add your post-build tasks here
      }
    }
  }
};

export default config;
```

Con los hooks de construcción, puedes:

-   Validar requisitos antes de que comience la construcción
-   Transformar activos durante el proceso
-   Activar notificaciones en puntos clave
-   Actualizar números de versión automáticamente
-   Ejecutar pruebas automatizadas sin problemas

Este enfoque te brinda mayor flexibilidad y control sobre todo el ciclo de vida de construcción.

## Personalización Avanzada de Construcción

Al trabajar en proyectos más grandes, afinar tu proceso de construcción puede marcar una gran diferencia. Aquí se explica cómo manejar construcciones específicas de entorno y personalizaciones de plataforma de manera efectiva.

### Variables de Entorno

Configura variables de entorno creando archivos `.env` separados para cada entorno:

-   `.env.development`
-   `.env.staging`
-   `.env.production`

Luego, configura tu script de construcción para cargar el archivo apropiado según el entorno:

```typescript
import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  ios: {
    buildConfig: {
      environment: process.env.BUILD_ENV || 'development',
      configurations: {
        development: {
          signing: {
            debug: true,
            automaticProvisioning: true
          }
        },
        production: {
          signing: {
            release: true,
            provisioningProfile: 'dist/profile.mobileprovision'
          }
        }
      }
    }
  }
});
```

Puedes ajustar aún más estas configuraciones para que coincidan con los requisitos específicos de la plataforma.

### Construcciones Específicas de la Plataforma

Para personalizar construcciones para Android e iOS, utiliza la siguiente estructura:

```typescript
const platformConfig = {
  android: {
    buildType: process.env.BUILD_TYPE || 'debug',
    keystoreConfig: {
      path: process.env.KEYSTORE_PATH,
      password: process.env.KEYSTORE_PASSWORD,
      alias: process.env.KEYSTORE_ALIAS
    }
  },
  ios: {
    scheme: process.env.APP_SCHEME || 'App',
    xcodePreferences: {
      automaticSigning: false,
      developmentTeam: process.env.DEVELOPMENT_TEAM
    }
  }
};
```

Estas configuraciones te permiten personalizar las construcciones para cada plataforma, asegurando despliegues más fluidos.

| Característica | Android | iOS |
| --- | --- | --- |
| Símbolos de Depuración | Archivos de mapeo [ProGuard](https://www.guardsquare.com/proguard) | Archivos dSYM |
| Variantes de Construcción | debug, release, staging | debug, release |
| Firma de Código | Gestión de keystore | Perfiles de aprovisionamiento |
| Gestión de Activos | Optimización de res/drawable | Catálogos de activos |

Consejos adicionales para optimizar tus construcciones incluyen:

-   Usar actualizaciones parciales para ahorrar tiempo durante los despliegues
-   Configurar seguimiento de errores para identificar problemas rápidamente
-   Crear sistemas de canal para versiones de pruebas beta
-   Habilitar cifrado de extremo a extremo para una distribución segura

Cuando se combina con herramientas como Capgo para análisis y actualizaciones seguras, estas técnicas te brindan más control sobre tu proceso de despliegue [\[1\]](https://capgo.app/).

## Problemas y Soluciones de Scripts de Construcción

Al trabajar con configuraciones de construcción personalizadas, abordar errores rápidamente es crucial para mantener el proceso de construcción en funcionamiento sin problemas.

### Solucionar Errores Comunes

Muchos problemas de scripts de construcción provienen de la configuración del entorno o problemas de dependencia. Aquí se explica cómo abordar algunos comunes:

**Variables de entorno faltantes**

Si encuentras un error como este:

```bash
error: Cannot find environment configuration for BUILD_ENV
```

Puedes solucionarlo creando un archivo `.env.local` en el directorio raíz de tu proyecto. Aquí hay un ejemplo:

```bash
BUILD_ENV=development
CAPACITOR_PLATFORM=ios
BUILD_TYPE=debug
```

**Fallos de construcción específicos de la plataforma**

Para errores de firma en Android, usa este comando:

```bash
npx cap build android --keystorePassword=$KEYSTORE_PASSWORD --keystoreAlias=$KEYSTORE_ALIAS
```

Para problemas de perfil de aprovisionamiento en iOS, prueba esto:

```bash
npx cap build ios --configuration=release --type=development
```

| Tipo de Error | Causa Común | Solución |
| --- | --- | --- |
| Configuración de Firma | Faltan detalles de keystore | Establece `KEYSTORE_PATH` y credenciales |
| Entorno de Construcción | Variables indefinidas | Crea archivos `.env` específicos de la plataforma |
| Dependencias | Desajustes de versión | Actualiza `package.json` y sincroniza |

Después de aplicar soluciones, asegúrate de que tus cambios sean sólidos realizando pruebas de construcción exhaustivas.

### Probar Scripts de Construcción

Una vez que se resuelvan los errores, valida tus scripts de construcción con estos pasos:

-   **Verificación Automatizada**: Ejecuta comandos clave para confirmar que el proceso de construcción funcione como se espera.

```bash
npm run build
npx cap sync
npx cap copy
```

-   **Validación del Entorno**: Verifica la falta de variables de entorno antes de comenzar la construcción.

```typescript
const requiredVars = ['BUILD_ENV', 'KEYSTORE_PATH'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

-   **Depuración de Scripts de Construcción**: Agrega scripts detallados para capturar problemas potenciales durante la construcción.

```json
{
  "scripts": {
    "build:debug": "NODE_ENV=development npx cap build --verbose",
    "build:release": "NODE_ENV=production npx cap build --verbose"
  }
}
```

Consejos adicionales para las pruebas:

-   Usa contenedores de [Docker](https://www.docker.com/) para aislar construcciones.
-   Valida archivos de configuración antes de comenzar el proceso.
-   Prueba con múltiples versiones de [Node.js](https://nodejs.org/en).
-   Confirma que se cumplen los requisitos específicos de la plataforma.
-   Mantén un ojo en el rendimiento de la construcción para posibles mejoras.

## Características de Construcción de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177.jpg)

Capgo lleva los scripts de construcción al siguiente nivel con despliegue automatizado, mejorando la eficiencia y simplificando el proceso.

### Actualizaciones Rápidas de Aplicaciones

El rendimiento de actualización de Capgo es impresionante:

-   **El 95% de los usuarios activos** recibe actualizaciones dentro de 24 horas.
-   **Tasa de éxito del 82%** para la entrega de actualizaciones en todo el mundo.
-   Un tiempo de respuesta promedio de API de **434 ms a nivel global**.

La plataforma utiliza actualizaciones parciales, lo que significa que solo se descargan los cambios. Este enfoque reduce el uso de ancho de banda y acelera el proceso de actualización. Además, todo el proceso de construcción está completamente automatizado, ahorrando tiempo y esfuerzo.

### Automatización de Construcciones

Capgo trabaja sin problemas con las principales plataformas CI/CD, ofreciendo una variedad de integraciones:

| Plataforma CI/CD | Características de Integración | Beneficios |
| --- | --- | --- |
| [GitHub Actions](https://docs.github.com/actions) | Construcciones automatizadas, Activadores de despliegue | Despliegue continuo |
| [GitLab CI](https://docs.gitlab.com/ee/ci/) | Automatización de pipeline, Control de versiones | Flujo de trabajo optimizado |
| [Jenkins](https://www.jenkins.io/) | Flujos de trabajo personalizados, Hooks de construcción | Escalable para empresas |

Configurar una construcción automatizada cuesta típicamente alrededor de **$300 al mes**, lo que es mucho más económico en comparación con soluciones tradicionales que pueden llegar hasta **$6,000 anuales**.

### Estándares de Seguridad

Capgo prioriza la seguridad con un marco robusto que incluye:

-   Cifrado de extremo a extremo para paquetes de actualización.
-   Gestión segura de claves.
-   Cumplimiento con las directrices de Apple y Google.

**Características de Control de Versiones**

-   Opciones de reversión instantánea.
-   Seguimiento de versiones de despliegue.
-   Gestión de canales de actualización para lanzamientos escalonados.

Este marco de seguridad ha sido rigurosamente probado en cientos de aplicaciones empresariales. Para equipos que necesitan seguridad adicional, Capgo también ofrece soluciones autoalojadas con configuraciones personalizables.

El sistema de canales de Capgo hace que la distribución de actualizaciones sea flexible. Los desarrolladores pueden dirigirse a grupos de usuarios específicos con diferentes versiones, perfecto para pruebas beta o implementaciones graduales.

## Resumen

### Descripción general de los pasos de construcción

Los scripts de construcción personalizados permiten implementaciones automatizadas y consistentes al aprovechar los hooks de construcción, las variables de entorno y los comandos específicos de la plataforma. Estos procesos crean una base sólida para las mejoras en la implementación posibles con Capgo.

### Beneficios de Capgo

Capgo simplifica la implementación, habiendo entregado con éxito más de 23.5 millones de actualizaciones en 750 aplicaciones de producción [\[1\]](https://capgo.app/). Su sistema de actualizaciones parciales reduce tanto el uso de ancho de banda como el tiempo de implementación.

La plataforma proporciona actualizaciones rápidas, optimización del rendimiento global, cifrado de extremo a extremo para mayor seguridad y un sistema de distribución basado en canales flexible. Esta configuración soporta actualizaciones específicas, pruebas beta y cumplimiento con las pautas de la tienda de aplicaciones mientras mantiene un marco de seguridad sólido.
