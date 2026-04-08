---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: Cómo usar el versionado semántico con Capgo OTA Updates
description: >-
  Aprende cómo optimizar las actualizaciones de aplicaciones y el control de
  versiones utilizando Semantic Versioning con actualizaciones OTA de Capgo para
  aplicaciones Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Desarrollo móvil
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
**¿Quieres simplificar las [actualizaciones de aplicaciones](https://capgo.app/plugins/capacitor-updater/) y el control de versiones?** El Versionado Semántico (SemVer) combinado con las actualizaciones Over-The-Air (OTA) de [Capgo](https://capgo.app/) hace que la gestión de aplicaciones [Capacitor](https://capacitorjs.com/) sea más fácil y rápida. Aquí te explicamos cómo:

-   **Fundamentos del Versionado Semántico:** Las versiones usan el formato `MAJOR.MINOR.PATCH`:
    
    -   **MAJOR:** Para cambios incompatibles.
    -   **MINOR:** Para nuevas funcionalidades compatibles con versiones anteriores.
    -   **PATCH:** Para correcciones de errores.
-   **¿Por qué usar SemVer con Capgo?**
    
    -   Comunicación clara sobre actualizaciones.
    -   Gestión más inteligente de versiones.
    -   Evita conflictos de dependencias.
    -   Planificación organizada de lanzamientos.
-   **Pasos de [Configuración de Capgo](https://capgo.app/docs/cli/commands/):**
    
    1.  Instalar el plugin de actualización de Capgo.
    2.  Configurar la versión de tu app en `capacitor.config.json` y otros archivos.
    3.  Inicializar con tu clave API.
    4.  Usar [Capgo CLI](https://capgo.app/docs/cli/commands) para empaquetar y subir actualizaciones.
-   **[Gestión de Versiones y Canales](https://capgo.app/docs/webapp/channels/):**
    
    -   Usar canales separados (ej., "beta" para pruebas, "producción" para lanzamientos estables).
    -   Controlar políticas de actualización (actualizaciones automáticas de parches, aprobación manual para cambios mayores).
    -   Opciones de reversión para actualizaciones fallidas.
-   **Proceso de Implementación:**
    
    -   Actualizar números de versión siguiendo las reglas SemVer.
    -   Probar exhaustivamente antes de implementar.
    -   Usar comandos CLI para subir y distribuir actualizaciones.

Capgo asegura que las actualizaciones lleguen a los usuarios de forma rápida y confiable, con herramientas para manejar interrupciones y mantener la estabilidad. Perfecto para equipos que usan flujos de trabajo CI/CD para automatizar actualizaciones.

**Consejo Rápido:** Siempre prueba las actualizaciones y usa canales para gestionar implementaciones graduales de manera efectiva.

## Versionado Semántico | Subir de Nivel

## Guía de Configuración de [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Aquí te explicamos cómo configurar Capgo para gestionar actualizaciones OTA y control de versiones fácilmente.

### Pasos de Configuración Inicial

Comienza instalando el [plugin de actualización de Capgo](https://capgo.app/docs/plugin/self-hosted/manual-update/):

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

Asegúrate de que tu archivo `capacitor.config.json` use un formato de versión semántica:

```json
{
  "appId": "com.example.app",
  "appName": "Mi App",
  "version": "1.0.0"
}
```

Para proyectos más antiguos, actualiza los detalles de versión en estas ubicaciones:

-   `package.json` (busca el campo `version`)
-   `android/app/build.gradle` (actualiza `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (actualiza `CURRENT_PROJECT_VERSION`)

Una vez configurado, inicializa Capgo con tu clave API:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.initialize({
  apiKey: 'TU_CLAVE_API'
})
```

**Tabla de Referencia Rápida:**

| Fase de Configuración | Acción Clave | Paso de Verificación |
| --- | --- | --- |
| Instalación | Instalar plugin y sincronizar | Comprobar `package.json` |
| Configuración | Establecer números de versión | Verificar en todos los archivos |
| Inicialización | Conectar con clave API | Probar estado de conexión |
| Compilación | Crear paquete inicial | Confirmar éxito de carga |

### Integración de Control de Versiones

Capgo funciona bien con plataformas CI/CD, haciendo que las [actualizaciones automatizadas](https://capgo.app/docs/live-updates/update-behavior/) sean simples. Las plataformas soportadas incluyen:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

Si estás trabajando en desarrollo local, puedes deshabilitar las actualizaciones automáticas añadiendo esto a tu configuración:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

Esto asegura que Capgo no sobrescribirá tus cambios locales. Una vez que tu configuración esté lista, sube tu primera versión:

```bash
capgo upload
```

Finalmente, notifica al plugin nativo sobre la salud del paquete en el archivo principal de tu app:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

await CapacitorUpdater.notifyAppReady()
```

Esta configuración asegura que tu app esté lista para implementaciones OTA fluidas y gestión de versiones.

## Usando Versionado Semántico con Capgo

### Gestión de Números de Versión

Capgo usa Versionado Semántico (SemVer) para gestionar versiones de apps, formateado como **MAJOR.MINOR.PATCH**. Así es como funciona:

-   **Versión Mayor (X.0.0)**: Aumenta el número MAJOR para cambios que rompen la compatibilidad.
-   **Versión Menor (1.X.0)**: Aumenta el número MINOR para nuevas características que mantienen compatibilidad.
-   **Versión Parche (1.0.X)**: Aumenta el número PATCH para correcciones de errores que no afectan la compatibilidad.

| Tipo de Versión | Cuándo Incrementar | [Comportamiento de Auto-Actualización](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Mayor (X.0.0) | Para cambios de API incompatibles | Requiere aprobación manual |
| Menor (1.X.0) | Para nuevas características | Configurable en Capgo |
| Parche (1.0.X) | Para correcciones de errores | Usualmente automático |

Al seguir las reglas SemVer, puedes simplificar la gestión de versiones y asegurar actualizaciones más suaves a través de tus canales de implementación.

### Directrices de Control de Versiones

Capgo te permite gestionar implementaciones efectivamente configurando canales distintos para diferentes etapas de tu flujo de trabajo.

-   **[Gestión de Versiones Basada en Canales](https://capgo.app/docs/webapp/channels/)**: Organiza tu proceso de implementación creando canales separados para pruebas y producción. Por ejemplo:
    
    -   Usa un canal "beta" (ej., 1.2.0-beta) para probar nuevas características.
    -   Mantén un canal "producción" (ej., 1.2.0) para lanzamientos estables.
    -   Añade canales específicos de plataforma (ej., "ios-hotfix" con versión 1.2.1) cuando abordes problemas específicos de plataforma.
-   **Configuración de Política de Actualización**: Controla cómo se aplican las actualizaciones usando las opciones de configuración de Capgo. Por ejemplo:
    
    ```json
    {
      "plugins": {
        "CapacitorUpdater": {
          "autoUpdate": true,
          "updateInterval": 30,
          "disableAutoUpdateBreaking": true
        }
      }
    }
    ```
    
    Esta configuración asegura que los usuarios reciban actualizaciones de parches automáticamente, mientras que las actualizaciones menores y mayores requieren aprobación manual.
    
-   **Estrategia de Reversión de Versiones**: Usa identificadores de pre-lanzamiento para mantener opciones claras de reversión. Este enfoque te permite revertir a una versión anterior si ocurren problemas, mientras mantienes el versionado consistente a través de todos los canales.
    

Estas mejores prácticas facilitan la gestión de actualizaciones, prueba de nuevas características y mantenimiento de la estabilidad en tu proceso de implementación.

## Implementación de Actualizaciones OTA

Una vez que tu configuración de gestión de versiones esté lista, sigue estos pasos para implementar actualizaciones OTA efectivamente.

### Preparación de Actualización

Comienza actualizando la versión en **package.json** y **capacitor.config.json**. Asegúrate de que la versión siga el formato SemVer (MAJOR.MINOR.PATCH):

-   **Corrección de Error**: Aumenta el número PATCH (ej., 1.0.1 → 1.0.2)
-   **Nueva Característica**: Aumenta el número MINOR (ej., 1.0.0 → 1.1.0)
-   **Cambio Incompatible**: Aumenta el número MAJOR (ej., 1.0.0 → 2.0.0)

Prueba exhaustivamente tu compilación y confirma que la app se comunica con el servidor usando `notifyAppReady`.

Luego, decide tu [estrategia de actualización](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Puedes elegir entre:

-   **Auto-Actualización**: Forzar automáticamente requisitos de versión mínima.
-   **Control Manual**: Especificar requisitos exactos de versión para actualizaciones.
-   **Basado en Canales**: Usar canales para pruebas e implementaciones graduales.

### Comandos de Actualización de Capgo CLI

Usa el CLI de Capgo para implementar tu actualización fácilmente. Así es cómo:

```bash
# Construye y sube tu actualización
npm run build
capgo upload

# Opcional: especifica un canal
capgo upload --channel beta
```

Capgo asegura una implementación segura con encriptación de extremo a extremo y gestión segura de claves.

> "@Capgo es una forma inteligente de hacer actualizaciones de código en caliente (y no por todo el dinero del mundo como con @AppFlow) 🙂"

Una vez implementada, puedes monitorear actualizaciones a través del panel de control de Capgo. Las actualizaciones típicamente llegan a los usuarios en minutos después de que abren la app. El proceso funciona así:

-   La app busca actualizaciones.
-   Descarga la actualización en segundo plano.
-   Marca la nueva versión como activa cuando el usuario sale de la app.
-   Aplica la actualización en el siguiente inicio.

Para implementaciones a nivel empresarial, podrías querer integrar automatización CI/CD.

> "¡Practicamos desarrollo ágil y @Capgo es crítico para entregar continuamente a nuestros usuarios!"

## Solución de Problemas y Consejos

### Problemas de Gestión de Versiones

Gestionar el versionado semántico en Capgo puede a veces complicar las implementaciones de actualizaciones. Para evitar sobrescribir tu trabajo de desarrollo, configura lo siguiente en tu archivo `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false,
      "disableAutoUpdateBreaking": true
    }
  }
}
```

Si una actualización falla, esto es lo que puedes hacer:

-   Establece `autoUpdate` en `false` durante el desarrollo.
-   Desinstala la app.
-   Reinstálala con la versión corregida.
-   Reactiva las auto-actualizaciones una vez que todo esté estable.

Para actualizaciones de versión mayor, usa la bandera `disableAutoUpdateBreaking` y escucha el evento `majorAvailable` para manejar actualizaciones apropiadamente:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.addListener('majorAvailable', async () => {
  // Maneja la actualización mayor aquí
})
```

Combinando estas configuraciones con buenas prácticas de equipo, puedes mantener consistencia de versiones y reducir errores.

### Control de Versiones en Equipo

Una vez que las actualizaciones individuales están gestionadas, es crucial para los equipos establecer prácticas sólidas de control de versiones.

> "Probar cada cambio antes de fusionarlo con el repositorio principal reforzará la estabilidad y evitará errores costosos" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Aquí hay algunos métodos para asegurar consistencia:

-   Define una rama como el **repositorio principal** para actuar como fuente de verdad.
-   Usa canales separados de Capgo para entornos de desarrollo y producción.
-   Automatiza cargas de versiones vía pipelines CI/CD.
-   Documenta todos los cambios de código con mensajes de commit claros y detallados.

Para equipos más grandes, la siguiente matriz de gestión de versiones puede ayudar a organizar actualizaciones:

| Entorno | Canal | Auto-Actualización | Patrón de Versión |
| --- | --- | --- | --- |
| Desarrollo | dev | Deshabilitado | 0.x.x |
| Pruebas | beta | Habilitado | x.x.x-beta |
| Producción | stable | Habilitado | x.x.x |

### Pasos de Recuperación de Actualizaciones

Incluso con precauciones, las actualizaciones pueden fallar. Si eso ocurre, sigue estos pasos de recuperación:

1. Volver a una versión estable anterior.
2. Incrementar los números de versión para las nuevas correcciones (nota: los números de versión no se pueden reutilizar después de la eliminación) [\[2\]](https://github.com/Cap-go/CLI).
3. Verificar las actualizaciones durante el inicio de la aplicación para asegurar que funcionan como se espera.

El actualizador de Capgo está diseñado para manejar interrupciones. Por ejemplo, si el servidor no está accesible o se elimina una actualización, la aplicación continúa funcionando normalmente [\[3\]](https://capgo.app/docs/faq/). Además, las solicitudes de red fallidas se reintentarán automáticamente durante el próximo inicio de la aplicación [\[3\]](https://capgo.app/docs/faq/). Esta resiliencia incorporada minimiza el tiempo de inactividad y asegura operaciones más fluidas.

## Resumen

El Versionado Semántico, combinado con Capgo, ha hecho que las actualizaciones OTA para aplicaciones Capacitor sean más eficientes. Con 947.6 millones de actualizaciones entregadas y 1,400 aplicaciones en producción usando este sistema [\[1\]](https://capgo.app/), los procesos de implementación se han vuelto 81% más eficientes [\[1\]](https://capgo.app/). Esta configuración permite a los desarrolladores enviar actualizaciones rápidamente y de manera controlada, evitando los retrasos de las tiendas de aplicaciones.

Esto es lo que dicen los desarrolladores:

> "Implementamos [actualizaciones OTA de Capgo](https://console.capgo.app/resend_email) en producción para nuestra base de usuarios de +5000. Estamos viendo una operación muy fluida, casi todos nuestros usuarios están actualizados en minutos después de que el OTA se implementa en @Capgo." - colenso [\[1\]](https://capgo.app/)

El sistema de versionado MAJOR.MINOR.PATCH facilita la comunicación de cambios importantes, nuevas características y correcciones de errores [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). Esto es especialmente útil para equipos que gestionan varias versiones cada semana a través de la plataforma de Capgo.

La [solución encriptada](https://capgo.app/docs/cli/migrations/encryption/) de Capgo, integrada con herramientas de CI/CD, también es económica - reduciendo costos hasta $26,100 en cinco años [\[1\]](https://capgo.app/). Sus canales personalizables aseguran que las actualizaciones lleguen a los usuarios correctos en el momento adecuado.

> "¡Practicamos el desarrollo ágil y @Capgo es crítico para entregar continuamente a nuestros usuarios!" - Rodrigo Mantica [\[1\]](https://capgo.app/)
