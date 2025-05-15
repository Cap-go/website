---
slug: capacitor-plugin-contribution-guide
title: Guia de Contribuição de Plugins do Capacitor
description: >-
  Aprenda a contribuir efetivamente para plugins do Capacitor com um guia
  abrangente sobre configuração, padrões de codificação, testes e documentação.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-17T05:00:51.296Z
updated_at: 2025-03-18T13:13:57.261Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b290a70d4a761ccc9919b5-1739768465938.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Capacitor, plugins, development, mobile, coding standards, testing,
  documentation, contribution, open source
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) plugins conectan tecnologías web con funciones nativas del dispositivo, permitiendo el [desarrollo de aplicaciones multiplataforma](https://capgo.app/blog/cross-platform-mobile-app-development-guide-2024/). Esta guía te ayuda a:

-   **Configura tu entorno**: Herramientas como [Node.js](https://nodejs.org/en), [Xcode](https://developer.apple.com/xcode/), y [Android Studio](https://developer.android.com/studio) son esenciales.
-   **Sigue estándares de código**: Utiliza [TypeScript](https://www.typescriptlang.org/), [Swift](https://developer.apple.com/swift/), y [Kotlin](https://kotlinlang.org/) con convenciones de nombres consistentes y manejo de errores.
-   **Prueba a fondo**: Escribe pruebas unitarias para JavaScript, iOS y Android para asegurar fiabilidad.
-   **Documenta claramente**: Usa JSDoc y archivos README para una fácil adopción.
-   **Envía una Solicitud de Extracción**: Asegúrate de que el código, las pruebas y la documentación sean de alta calidad antes de contribuir.

## Guía Completa de Código Abierto - Cómo Contribuir

<iframe src="https://www.youtube.com/embed/yzeVMecydCE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Configuración del Entorno de Desarrollo

Crear un entorno de desarrollo adecuado es clave para el desarrollo eficiente de plugins. Una configuración bien preparada permite una codificación, prueba y despliegue de tus plugins sin problemas.

### Herramientas y habilidades que necesitarás

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:

| Categoría | Requerimientos |
| --- | --- |
| **Herramientas básicas** | Node.js (LTS), npm 6+, Git |
| **IDE/Editores** | [Visual Studio Code](https://code.visualstudio.com/) o tu editor preferido |
| **Desarrollo para iOS** | Xcode, [SwiftLint](https://github.com/realm/SwiftLint), [CocoaPods](https://cocoapods.org/) |
| **Desarrollo para Android** | Android Studio, Android SDK, JDK |

También deberías estar cómodo usando TypeScript para el desarrollo web y ya sea Swift (para iOS) o Java/Kotlin (para Android) para tareas de desarrollo nativo [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md)[\[2\]](https://github.com/ionic-team/capacitor-plugins/blob/main/CONTRIBUTING.md).

### Configuración del Monorepo

El ecosistema de [plugins de Capacitor](https://capgo.app/plugins/) se basa en una estructura de monorepo. Este enfoque asegura que tu trabajo se alinee con los estándares de la comunidad desde el principio.

1.  **Haz un fork y clona el repositorio**  
    Comienza haciendo un fork del repositorio de plugins de Capacitor en GitHub. Luego, clona tu repositorio forked:
    
    ```bash
    git clone https://github.com/your-username/capacitor-plugins.git
    cd capacitor-plugins
    npm install
    ```
    
2.  **Instala dependencias y construye**  
    Ejecuta el siguiente comando para instalar todo lo que necesitas y construir los plugins:
    
    ```bash
    npm run build
    ```
    
3.  **Configura el control de versiones**  
    Usa ramas de características para tus cambios y mantiene tu fork sincronizado con el repositorio original.
    

### Preparando Plataformas Nativas

Para el desarrollo multiplataforma, necesitarás configurar los entornos de iOS y Android.

**Para iOS:**

-   Descarga Xcode desde la Mac App Store.
    
-   Instala herramientas de línea de comandos usando:
    
    ```bash
    xcode-select --install
    ```
    
-   Instala CocoaPods con:
    
    ```bash
    sudo gem install cocoapods
    ```
    
-   Configura una cuenta de desarrollador de Apple y certificados necesarios.
    
-   Usa SwiftLint (opcional) para mantener la calidad del código.
    

**Para Android:**

-   Instala Android Studio junto con el SDK más reciente y un dispositivo virtual.
-   Asegúrate de tener un JDK instalado.
-   Configura correctamente el SDK de Android dentro de Android Studio.

Una vez que estas plataformas estén configuradas, estarás listo para seguir prácticas de codificación establecidas y sumergirte en el desarrollo de plugins.

## Guía de Estándares de Código

Ahora que tu entorno de desarrollo está configurado, sigue estas pautas para construir plugins que sean fáciles de mantener y usar.

### Cumplimiento de la Guía de Estilo

El ecosistema de [plugins de Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) hace cumplir estrictos estándares de codificación usando herramientas como [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), y SwiftLint. Aquí tienes un resumen rápido del formato requerido:

| Componente | Formato |
| --- | --- |
| Variables | `deviceInfo` (camelCase) |
| Clases | `BatteryManager` (PascalCase) |
| Métodos | `getLanguageCode()` (camelCase) |
| Constantes | `MAX_RETRY_COUNT` (SNAKE_CASE) |

Los plugins deben utilizar TypeScript para una mejor seguridad de tipos y características ES6+ como `async/await`. Además, sigue las convenciones de codificación específicas de la plataforma para Swift (iOS) y Kotlin (Android).

### Manejo de Errores y Tipos

El manejo de errores consistente es crucial para la compatibilidad multiplataforma. Aquí tienes un ejemplo:

```typescript
async checkPermissions(): Promise<PermissionStatus> {
  try {
    const result = await this.implementation.checkPermissions();
    return result;
  } catch (error) {
    throw new Error(`Permission check failed: ${error.message}`);
  }
}
```

Para la seguridad de tipos:

-   Usa interfaces focalizadas adaptadas a casos de uso específicos.
-   Aplica tipos de unión para variaciones específicas de la plataforma.
-   Implementa guardianes de tipos para validar tipos en tiempo de ejecución [\[1\]](https://github.com/capawesome-team/capacitor-plugins/blob/main/CONTRIBUTING.md).

### Documentación del Código

Una buena documentación es clave para hacer que tu plugin sea accesible y fácil de usar. Sigue estas prácticas:

1.  **Documentación de API**: Escribe comentarios JSDoc que funcionen con `@capacitor/docgen`. Por ejemplo:

```typescript
/**
 * @description Get the device's current battery level
 * @returns Promise with the battery level percentage
 */
async getBatteryLevel(): Promise<{ level: number }>;
```

2.  **Estructura del README**: Incluye información esencial como pasos de instalación, instrucciones de configuración, requisitos específicos de la plataforma, ejemplos de uso y una referencia API detallada.

Una documentación bien escrita asegura que tu plugin sea fácil de adoptar y contribuye a la comunidad más amplia de Capacitor.

###### sbb-itb-f9944d2

## Guía de Pruebas de Plugins

Probar plugins de Capacitor implica enfocarse en algunas áreas críticas para garantizar un funcionamiento fluido y fiable.

### Pruebas del Puente Nativo

Las pruebas del puente nativo aseguran una comunicación adecuada entre JavaScript y el código nativo. Para comenzar, configura tu entorno de pruebas con frameworks adaptados a cada plataforma.

Aquí tienes un ejemplo de una prueba unitaria de [Jest](https://jestjs.io/) para el lado de JavaScript:

```typescript
// Example of a Jest unit test for the JavaScript bridge
describe('DeviceInfo Plugin', () => {
  test('getBatteryLevel returns valid percentage', async () => {
    const result = await DeviceInfo.getBatteryLevel();
    expect(result.level).toBeGreaterThanOrEqual(0);
    expect(result.level).toBeLessThanOrEqual(100);
  });
});
```

Para probar en el lado nativo, utiliza XCTest para iOS y JUnit para Android. A continuación hay un ejemplo para Android:

```kotlin
@Test
fun testBatteryLevel() {
    val plugin = DeviceInfo()
    val result = plugin.getBatteryLevel()
    assertTrue(result.level in 0..100)
}
```

Una vez que hayas confirmado que la funcionalidad del puente central funciona como se esperaba, pasa a probar flujos de usuario completos.

### Pruebas Completas del Plugin

Para asegurarte de que tu plugin funcione bien en diferentes escenarios, prueba varias categorías:

| Categoría de Prueba | Áreas Clave de Enfoque |
| --- | --- |
| Pruebas de Integración | Funcionalidad multiplataforma |
| Pruebas de Rendimiento | Uso de recursos y tiempos de respuesta |
| Pruebas de Seguridad | Manejo de datos y verificación de permisos |

Para plugins con características complejas, simula escenarios de usuario en el mundo real. Por ejemplo, si estás probando un plugin de DeviceInfo, verifica:

-   Subidas exitosas bajo diferentes condiciones de red
-   Informes de progreso precisos
-   Uso de memoria durante transferencias de archivos grandes

### Pruebas OTA con [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-17.jpg?auto=compress)

Las herramientas de código abierto de Capgo facilitan el despliegue y prueba de actualizaciones rápidamente. Aquí se explica cómo usarlo:

1.  Configura [canales de actualización](https://capgo.app/docs/webapp/channels/) como desarrollo, staging y producción.
2.  Automatiza despliegues con herramientas de CI/CD.
3.  Empuja actualizaciones al instante.
4.  Monitorea el rendimiento y los problemas a través del [tablero de Capgo](https://capgo.app/docs/webapp/).

Para implementaciones por fases, Capgo te permite limitar las actualizaciones a un pequeño porcentaje de usuarios. Por ejemplo, puedes lanzar una nueva versión al 25% de los usuarios cada 24 horas:

```typescript
// Example configuration for staged rollout
{
  "plugin": "camera-plugin",
  "version": "1.2.0",
  "rollout": {
    "percentage": 25,
    "interval": "24h"
  }
}
```

Este enfoque gradual ayuda a identificar problemas temprano aprovechando los comentarios de la comunidad antes de un lanzamiento total.

## Proceso de Solicitud de Extracción

Una vez que hayas probado exhaustivamente tus cambios, sigue estos pasos para enviar tu solicitud de extracción:

### Lista de Verificación de Envío de PR

Antes de enviar, asegúrate de que has cubierto estas áreas clave:

| **Categoría** | **Qué Revisar** |
| --- | --- |
| **Calidad del Código** | \- Asegúrate de que las implementaciones de Swift/Kotlin se alineen con la API web. |
| **Pruebas** | \- Agrega pruebas unitarias para cualquier nueva funcionalidad.  <PermissionStatus>\- Confirma que las verificaciones de la pipeline CI/CD sean exitosas. |
| **Documentación** | \- Actualiza el README, la documentación en línea y el CHANGELOG según sea necesario. |

### Directrices de la Comunidad

Al colaborar, adhiérete a estas mejores prácticas:

-   Responde rápidamente a los comentarios de los revisores.
-   Mantén las discusiones centradas en detalles técnicos.
-   Usa la función de sugerencia de GitHub para proponer cambios de código.
-   Envía solicitudes de extracción pequeñas y enfocadas que aborden una característica o problema a la vez.

Para cambios más grandes, es una buena idea crear un problema primero y discutir tu enfoque. El equipo de Capacitor confía en las Acciones de GitHub para verificaciones automáticas, y todas las verificaciones deben pasar antes de que tu solicitud de extracción pueda ser revisada.

### Guía de Integración con Capgo

Si tu plugin implica actualizaciones en vivo, asegúrate de que funcione sin problemas con Capgo antes de enviarlo:

1.  **Control de Versiones**  
    Usa un versionado semántico claro para tu plugin y documenta todos los cambios en el changelog. El sistema de Capgo ayuda a rastrear la adopción de versiones entre los dispositivos de los usuarios.
    
2.  **Integración de CI/CD**  
    Integra Capgo en tu pipeline de CI/CD para automatizar despliegues de actualizaciones.
    
3.  **Monitoreo de Actualizaciones**  
    Monitorea las tasas de éxito de despliegue y asegúrate de cumplir con las pautas de la tienda de aplicaciones.
    

## Resumen

Para hacer una contribución significativa con tu plugin, es importante seguir el proceso establecido y cumplir con los estándares de la comunidad. Esto incluye seguir las pautas de codificación de Capacitor y probar exhaustivamente tu trabajo.

La lista de verificación de PR destaca la necesidad de envíos de alta calidad. Si tu plugin admite actualizaciones en vivo, integrarse con Capgo (como se mencionó anteriormente) puede ayudarte a lanzar actualizaciones rápidamente sin esperar la aprobación de la tienda de aplicaciones.

Una vez que tu PR esté fusionada, mantente involucrado siguiendo los problemas y lanzando actualizaciones de versiones. La interacción regular con la comunidad, el mantenimiento constante y [mantenerse al día con las actualizaciones de Capacitor](https://capgo.app/plugins/capacitor-updater/) asegurará que tu plugin siga siendo útil y relevante.

Preste atenção ao feedback dos usuários e faça atualizações conforme necessário. Esse esforço contínuo ajuda a manter a qualidade geral do ecossistema e mantém seu plugin valioso para os desenvolvedores.
