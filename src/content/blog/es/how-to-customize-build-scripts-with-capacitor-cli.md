---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Come Personalizzare gli Script di Build con Capacitor CLI
description: >-
  Aprende a personalizar tus scripts de compilación utilizando Capacitor CLI
  para implementaciones eficientes y actualizaciones de aplicaciones
  personalizadas en todas las plataformas.
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

[Capacitor](https://capacitorjscom/) CLI te permite personalizar el proceso de compilación de tu aplicación para plataformas iOS, Android y web. Al ajustar los scripts de compilación, puedes:

- **Acelerar actualizaciones**: Implementar cambios al instante sin retrasos de la tienda de aplicaciones
- **Controlar despliegues**: Revertir actualizaciones o dirigirte a grupos específicos de usuarios  
- **Asegurar tu aplicación**: Usar encriptación para proteger las actualizaciones
- **Optimizar compilaciones**: Ajustar configuraciones para necesidades específicas de plataforma

### Resumen rápido de características clave:

- **Archivos de configuración**: Usa `capacitorconfigjson` y `packagejson` para gestionar ajustes de compilación
- **Scripts personalizados**: Agrega tareas pre-compilación y post-compilación para automatización
- **Hooks de compilación**: Ejecuta código durante etapas específicas del proceso de compilación
- **Variables de entorno**: Simplifica compilaciones específicas de entorno con archivos `env`

[Capgo](https://capgoapp/), una herramienta de despliegue, mejora este proceso con [actualizaciones automatizadas](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/), seguimiento de versiones y optimización de rendimiento global. Sigue leyendo para aprender cómo configurar y personalizar tus scripts de compilación para máxima eficiencia.

## Introducción a [Capacitor](https://capacitorjscom/) Configure

![Capacitor](https://assetsseobotaicom/capgoapp/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1jpg)

<Steps>
1. Paso uno
2. Paso dos 
</Steps>

## Proceso de compilación predeterminado en Capacitor

Entender cómo Capacitor maneja su proceso de compilación predeterminado es crucial si quieres personalizarlo efectivamente. A continuación, desglosaremos el proceso de compilación del CLI de Capacitor y sus archivos de configuración clave.

### Pasos de compilación estándar

Capacitor usa un proceso paso a paso para transformar tu aplicación web en compilaciones específicas de plataforma. Esto es lo que sucede durante el proceso de compilación predeterminado:

| Fase | Descripción | Salida |
| --- | --- | --- |
| **Compilación Web** | Compila activos web usando herramientas de tu framework | Bundle web optimizado |
| **Copiar Activos** | Mueve activos web a carpetas de plataforma nativa | Directorios de activos específicos de plataforma |
| **Compilación Nativa** | Ejecuta comandos de compilación específicos de plataforma | Binarios listos para desplegar |
| **Verificación** | Comprueba integridad de compilación y dependencias | Estado de compilación y advertencias |

### Archivos de configuración principales

Dos archivos de configuración clave determinan cómo Capacitor maneja tus compilaciones:

**capacitorconfigjson**
Este es el archivo de configuración central para tu proyecto Capacitor. Establece parámetros importantes para tus compilaciones:

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

- **`appId`**: Un identificador único para tu aplicación
- **`appName`**: El nombre de tu aplicación
- **`webDir`**: Especifica dónde Capacitor debe buscar los activos web (ej., `dist`)
- **`plugins`**: Permite configurar ajustes específicos de plugins, como opciones de SplashScreen

**packagejson**
Este archivo incluye scripts de compilación y dependencias que influyen en el proceso de compilación:

```json
{
  "scripts": {
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "cap:build": "cap build"
  }
}
```

- El ajuste `webDir` en `capacitorconfigjson` le dice a Capacitor dónde localizar tus activos web compilados para incluirlos en las compilaciones nativas
- Después de hacer cambios en `capacitorconfigjson`, necesitas ejecutar `cap sync` para asegurar que tus proyectos nativos estén actualizados

A continuación, exploraremos cómo puedes modificar estos ajustes para personalizar aún más tus compilaciones.

## Modificando Scripts de Compilación

Puedes ajustar el proceso de compilación predeterminado de Capacitor para adaptarlo mejor a las necesidades de tu proyecto. Aquí te explicamos cómo:

### Ajustes del archivo de configuración

Puedes ajustar el proceso de compilación editando el archivo `capacitorconfigjson`. A continuación un ejemplo de configuración:

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

Aquí hay algunos ajustes clave que puedes modificar:

- **`webDir`**: Especifica dónde se encuentran tus activos web compilados
- **`server`**: Configura el servidor de desarrollo, incluyendo nombre de host y permisos de navegación
- **`android/ios`**: Permite ajustes de compilación específicos de plataforma, como detalles del keystore para Android u opciones de aprovisionamiento para iOS

### Creando Scripts NPM

Para optimizar tu flujo de trabajo, agrega scripts NPM personalizados a tu archivo `packagejson`Aquí está el texto traducido al español:

He aquí un ejemplo:

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

-   **`prebuild` y `postbuild`**: Úsalos para tareas como configurar el entorno o enviar notificaciones cuando finaliza la compilación
-   **`build:platform`**: Comandos específicos de plataforma para construir aplicaciones Android o iOS

Puedes llevar la automatización aún más lejos agregando hooks de compilación

### Configuración de Hooks de Compilación

Para un control más avanzado, usa hooks de compilación para ejecutar código personalizado en puntos específicos durante el proceso de compilación. Aquí hay un ejemplo de configuración en `capacitor.config.ts`:

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

Con los hooks de compilación, puedes:

-   Validar requisitos antes de que comience la compilación
-   Transformar recursos durante el proceso
-   Activar notificaciones en puntos clave
-   Actualizar números de versión automáticamente
-   Ejecutar pruebas automatizadas sin problemas

Este enfoque te da mayor flexibilidad y control sobre todo el ciclo de vida de la compilación

## Personalización Avanzada de Compilación

Cuando trabajas en proyectos más grandes, ajustar tu proceso de compilación puede marcar una gran diferencia. Aquí te mostramos cómo manejar compilaciones específicas para cada entorno y personalizaciones de plataforma de manera efectiva

### Variables de Entorno

Configura variables de entorno creando archivos `env` separados para cada entorno:

-   `env.development`
-   `env.staging`
-   `env.production`

Luego, configura tu script de compilación para cargar el archivo apropiado según el entorno:

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

Puedes ajustar aún más estas configuraciones para que coincidan con los requisitos específicos de la plataforma

### Compilaciones Específicas por Plataforma

Para personalizar compilaciones para Android e iOS, usa la siguiente estructura:

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

Estas configuraciones te permiten adaptar las compilaciones para cada plataforma, asegurando implementaciones más fluidas

| Característica | Android | iOS |
| --- | --- | --- |
| Símbolos de Depuración | Archivos de mapeo [ProGuard](https://www.guardsquare.com/proguard) | Archivos dSYM |
| Variantes de Compilación | debug, release, staging | debug, release |
| Firma de Código | Gestión de Keystore | Perfiles de aprovisionamiento |
| Gestión de Recursos | Optimización res/drawable | Catálogos de recursos |

Consejos adicionales para optimizar tus compilaciones incluyen:

-   Usar actualizaciones parciales para ahorrar tiempo durante las implementaciones
-   Configurar seguimiento de errores para identificar problemas rápidamente
-   Crear sistemas de canales para probar versiones beta
-   Habilitar el cifrado de extremo a extremo para distribución segura

Cuando se combina con herramientas como Capgo para análisis y actualizaciones seguras, estas técnicas te dan más control sobre tu proceso de implementación [\[1\]](https://capgo.app/)

## Problemas y Soluciones de Scripts de Compilación

Cuando trabajas con configuraciones de compilación personalizadas, abordar errores rápidamente es crucial para mantener el proceso de compilación funcionando sin problemas

### Solucionar Errores Comunes

Muchos problemas de scripts de compilación provienen de la configuración del entorno o problemas de dependencias. Aquí te mostramos cómo abordar algunos comunes:

**Variables de Entorno Faltantes**

Si encuentras un error como este:

```bash
error: Cannot find environment configuration for BUILD_ENV
```

Puedes solucionarlo creando un archivo `env.local` en el directorio raíz de tu proyecto. Aquí hay un ejemplo:

```bash
BUILD_ENV=development
CAPACITOR_PLATFORM=ios
BUILD_TYPE=debug
```

**Fallos de Compilación Específicos de Plataforma**

Para errores de firma en Android, usa este comando:

```bash
npx cap build android --keystorePassword=$KEYSTORE_PASSWORD --keystoreAlias=$KEYSTORE_ALIAS
```

Para problemas con perfiles de aprovisionamiento en iOS, prueba esto:

```bash
npx cap build ios --configuration=release --type=development
```

| Tipo de Error | Causa Común | Solución |
| --- | --- | --- |
| Configuración de Firma | Detalles de keystore faltantes | Establecer `KEYSTORE_PATH` y credenciales |
| Entorno de Compilación | Variables no definidas | Crear archivos `env` específicos por plataforma |
| Dependencias | Desajustes de versiones | Actualizar `package.json` y sincronizar |

Después de aplicar las correcciones, asegúrate de que tus cambios sean sólidos ejecutando pruebas de compilación exhaustivas

### Probar Scripts de Compilación

Una vez que los errores están resueltos, valida tus scripts de compilación con estos pasos:

-   **Verificación Automatizada**: Ejecuta comandos clave para confirmar que el proceso de compilación funciona como se espera

```bash
npm run build
npx cap sync
npx cap copy
```

-   **Validación de Entorno**: Verifica si faltan variables de entorno antes de comenzar la compilación

```typescript
const requiredVars = ['BUILD_ENV', 'KEYSTORE_PATH'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

-   **Depuración de Scripts de Compilación**: Agrega scripts detallados para detectar posibles problemas durante la compilación

```json
{
  "scripts": {
    "build:debug": "NODE_ENV=development npx cap build --verbose",
    "build:release": "NODE_ENV=production npx cap build --verbose"
  }
}
```

Consejos adicionales para pruebas:

-   Usar [Docker](https://www.dockercontenedores com/) para aislar compilaciones
-   Validar archivos de configuración antes de iniciar el proceso
-   Probar con múltiples versiones de [Nodejs](https://nodejsorg/en)
-   Confirmar que se cumplen los requisitos específicos de la plataforma
-   Supervisar el rendimiento de la compilación para posibles mejoras

## Características de Compilación de [Capgo](https://capgoapp/)

![Capgo](https://assetsseobotaicom/capgoapp/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177jpg)

Capgo lleva los scripts de compilación al siguiente nivel con implementación automatizada, mejorando la eficiencia y simplificando el proceso

### Actualizaciones Rápidas de Apps

El rendimiento de actualización de Capgo es impresionante:

-   **95% de usuarios activos** reciben actualizaciones dentro de 24 horas
-   **82% de tasa de éxito** en la entrega de actualizaciones a nivel mundial
-   Un tiempo de respuesta promedio de API de **434ms globalmente**

La plataforma utiliza actualizaciones parciales, lo que significa que solo se descargan los cambios Este enfoque reduce el uso de ancho de banda y acelera el proceso de actualización Además, todo el proceso de compilación está completamente automatizado, ahorrando tiempo y esfuerzo

### Automatización de Compilación

Capgo funciona perfectamente con las principales plataformas de CI/CD, ofreciendo diversas integraciones:

| Plataforma CI/CD | Características de Integración | Beneficios |
| --- | --- | --- |
| [GitHub Actions](https://docsgithubcom/actions) | Compilaciones automatizadas, Disparadores de implementación | Despliegue continuo |
| [GitLab CI](https://docsgitlabcom/ee/ci/) | Automatización de pipeline, Control de versiones | Flujo de trabajo optimizado |
| [Jenkins](https://wwwjenkinsio/) | Flujos de trabajo personalizados, Hooks de compilación | Escalable para empresas |

Configurar una compilación automatizada típicamente cuesta alrededor de **$300 por mes**, lo cual es mucho más económico comparado con soluciones tradicionales que pueden llegar a **$6,000 anuales**

### Estándares de Seguridad

Capgo prioriza la seguridad con un marco robusto que incluye:

-   Cifrado de extremo a extremo para paquetes de actualización
-   Gestión segura de claves
-   Cumplimiento con las directrices de Apple y Google

**Características de Control de Versiones**

-   Opciones de reversión instantánea
-   Seguimiento de versiones de implementación
-   Gestión de canales de actualización para lanzamientos por etapas

Este marco de seguridad ha sido rigurosamente probado en cientos de aplicaciones empresariales Para equipos que necesitan seguridad adicional, Capgo también ofrece soluciones autohospedadas con configuraciones personalizables

El sistema de canales de Capgo hace flexible la distribución de actualizaciones Los desarrolladores pueden dirigirse a grupos específicos de usuarios con diferentes versiones, perfecto para pruebas beta o lanzamientos graduales

## Resumen

### Descripción General de los Pasos de Compilación

Los scripts de compilación personalizados permiten implementaciones automatizadas y consistentes aprovechando los hooks de compilación, variables de entorno y comandos específicos de plataforma Estos procesos crean una base sólida para las mejoras de implementación posibles con Capgo

### Beneficios de Capgo

Capgo simplifica la implementación, habiendo entregado exitosamente más de 235 millones de actualizaciones en 750 aplicaciones de producción [\[1\]](https://capgoapp/) Su sistema de actualización parcial reduce tanto el uso de ancho de banda como el tiempo de implementación

La plataforma proporciona actualizaciones rápidas, optimización del rendimiento global, cifrado de extremo a extremo para seguridad y un sistema flexible de distribución basado en canales Esta configuración admite actualizaciones dirigidas, pruebas beta y cumplimiento con las directrices de las tiendas de aplicaciones mientras mantiene un marco de seguridad sólido