---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics para aplicaciones de Capacitor
description: >-
  Aprende a integrar informes de fallos en tiempo real en tus aplicaciones
  móviles con una guía paso a paso sobre cómo configurar Crashlytics para iOS y
  Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** te ayuda a rastrear los bloqueos de la aplicación en tiempo real, proporcionando informes detallados para solucionar problemas rápidamente. Se integra sin problemas con [Capacitor](https://capacitorjs.com/) para aplicaciones de iOS y Android. Aquí está lo que necesitas saber:

-   **¿Por qué usar Crashlytics?**
    
    -   Obtén **alertas de bloqueo en tiempo real**.
    -   Analiza informes de bloqueo detallados con **agrupación automática de problemas**.
    -   Monitorea errores críticos para mantener las aplicaciones estables.
-   **Requisitos de configuración:**
    
    -   Instala **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)**, y herramientas como **[Xcode](https://developer.apple.com/xcode/) 14+** y **[Android Studio](https://developer.android.com/studio) Electric Eel**.
    -   Descarga archivos de configuración de [Firebase](https://firebase.google.com/) (`GoogleService-Info.plist` para iOS, `google-services.json` para Android).
    -   Actualiza archivos específicos de la plataforma como `Podfile` (iOS) y `build.gradle` (Android).
-   **Pasos clave:**
    
    -   Instala Crashlytics:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    -   Inicializa Crashlytics en tu aplicación:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
-   **Prueba tu configuración:**
    
    -   Provoca un bloqueo de prueba:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
-   **Consejo adicional:** Combina Crashlytics con **[Capgo](https://capgo.app/)** para obtener actualizaciones en vivo instantáneas sin demoras en la tienda de aplicaciones.
    

Esta guía asegura que tu aplicación esté libre de bloqueos y sea fácil de usar. ¡Comienza configurando Firebase Crashlytics hoy!

## Guía de Android 2021: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - error personalizado ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Requisitos de configuración

Antes de comenzar, asegúrate de haber completado los siguientes pasos:

### Software y cuentas requeridas

Necesitarás instalar lo siguiente:

-   **Node.js** (v16 o superior) y **Capacitor** (v4 o superior)
-   Una **cuenta de Firebase** con un proyecto activo
-   **Xcode 14+** para desarrollo de iOS
-   **Android Studio Electric Eel** o una versión más reciente para desarrollo de Android
-   La última versión de **[CocoaPods](https://cocoapods.org/)** (requerido para iOS)

### Archivos de configuración de la plataforma

**Para iOS:**

-   Descarga el archivo `GoogleService-Info.plist` desde la Consola de Firebase.
-   Actualiza tu `Podfile` para incluir las dependencias de Crashlytics.
-   Agrega las claves de privacidad necesarias a tu archivo `Info.plist`.

**Para Android:**

-   Obtén el archivo `google-services.json` desde la Consola de Firebase.
-   Realiza cambios tanto en los archivos `build.gradle` a nivel de proyecto como a nivel de aplicación.
-   Actualiza el `AndroidManifest.xml` para incluir los permisos requeridos.

### Configuración de la Consola de [Firebase](https://firebase.google.com/)

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

Configura Firebase y habilita Crashlytics a través de estos pasos:

1.  **Crea un proyecto de Firebase** y habilita Crashlytics.
    
2.  **Registra tus aplicaciones** en la Consola de Firebase:
    
    -   Usa el **ID del paquete** para iOS y el **nombre del paquete** para Android.
    -   Descarga los archivos de configuración: `GoogleService-Info.plist` (iOS) y `google-services.json` (Android).
3.  **Integra los SDKs de Firebase** en tu aplicación agregando estas dependencias:
    
    **Para Android (archivo `build.gradle` a nivel de aplicación):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **Para iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```
    

Una vez que estos pasos estén completos, estarás listo para pasar a la sección de Instalación del Plugin.

## Pasos de instalación

### Instalación del plugin

Primero, instala el plugin y [sincronízalo con Capacitor](https://capgo.app/plugins/capacitor-updater/):

```bash
npm install @capacitor-firebase/crashlytics && npx cap sync
```

Luego, inicializa Crashlytics en tu aplicación. Agrega el siguiente código a `app.component.ts` o `main.ts`:

```typescript
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
await FirebaseCrashlytics.initialize();
```

### Configuración de la plataforma

Configura las configuraciones requeridas para las plataformas Android e iOS.

**Configuración de Android**

1.  Agrega el plugin Gradle de Crashlytics a tu archivo `build.gradle` a nivel de aplicación:
    
    ```kotlin
    buildscript { 
        dependencies { 
            classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5' 
        } 
    }
    apply plugin: 'com.google.firebase.crashlytics'
    ```
    
2.  Habilita la recopilación de bloqueos en `AndroidManifest.xml`:
    
    ```xml
    <meta-data
        android:name="firebase_crashlytics_collection_enabled"
        android:value="true" />
    ```
    

**Configuración de iOS**

1.  Configura Firebase en `AppDelegate.swift`:
    
    ```swift
    import Firebase
    FirebaseApp.configure()
    ```
    

### Prueba tu configuración

Confirma que Crashlytics está funcionando ejecutando un bloqueo de prueba y revisando la Consola de Firebase:

-   Provoca un bloqueo de prueba con una clave personalizada:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({key: 'test_scenario', value: 'manual_crash'});
    await FirebaseCrashlytics.crash();
    ```
    
-   Opcionalmente, identifica a un usuario:
    
    ```typescript
    await FirebaseCrashlytics.setUserId({userId: 'user123'});
    ```
    
-   Registra eventos personalizados:
    
    ```typescript
    await FirebaseCrashlytics.log({message: 'Test crash triggered'});
    ```
    

Los informes, incluyendo trazas de pila, detalles del dispositivo y claves personalizadas, deberían aparecer en la Consola de Firebase en unos 5 minutos.

**Importante:** Elimina las llamadas de bloqueo antes de lanzar tu aplicación. Para deshabilitar la recopilación de bloqueos durante el desarrollo, usa:

```typescript
await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
```

## Guía de monitoreo

Una vez que hayas confirmado tu configuración con un bloqueo de prueba, usa la Consola de Firebase para rastrear bloqueos y errores reales en tu aplicación en vivo.

### Lectura de informes de bloqueo

Puedes encontrar informes de bloqueo en la Consola de Firebase en la sección de Crashlytics. Aquí está lo que verás:

-   **Usuarios sin bloqueos**: El porcentaje de usuarios que no han experimentado bloqueos.
-   **Estabilidad del problema**: Con qué frecuencia ocurren los bloqueos.
-   **Análisis de impacto**: El número de usuarios afectados.

Haz clic en cualquier problema para profundizar en detalles como trazas de pila, información del dispositivo (por ejemplo, versión del SO, memoria), claves personalizadas, registros y el camino del usuario que llevó al bloqueo.

**Consejo profesional**: Habilita la función de "alertas de velocidad" para recibir notificaciones cuando las tasas de bloqueos aumenten repentinamente. Esto puede ayudarte a abordar problemas antes de que afecten a demasiados usuarios.

### Consejos de gestión de errores

-   **Prioriza por impacto**: Concédele prioridad a los bloqueos que afectan a más usuarios o que ocurren en partes críticas de tu aplicación. El seguimiento de tendencias puede ayudarte a identificar problemas urgentes.
    
-   **Usa claves personalizadas**: Agrega contexto a tus informes de bloqueos con claves personalizadas. Por ejemplo:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({
      key: 'current_view',
      value: 'payment_processing'
    });
    ```
    
-   **Agrupa problemas similares**: Aprovecha la agrupación automática de problemas de Firebase. También puedes etiquetar bloqueos relacionados con claves personalizadas consistentes y usar títulos claros y descriptivos para un seguimiento más fácil.
    

### Protección de la privacidad del usuario

Para garantizar el cumplimiento y salvaguardar los datos de los usuarios, sigue estas pautas:

-   **Permisos**:
    
    -   Menciona la recopilación de bloqueos en tu política de privacidad.
    -   Obtén el consentimiento del usuario para la recopilación de datos en regiones con regulaciones GDPR.
    -   Proporciona a los usuarios una opción para optar por no participar en la recopilación de bloqueos.
-   **Controles de recopilación de datos**:
    
    ```typescript
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: true});
    ```
    
-   **Retención de datos**:
    
    -   Configura la eliminación automática de datos después de 90 días.
    -   Elimina información sensible de tus informes.
    -   Usa claves personalizadas no identificables para mantener la privacidad del usuario mientras depuras.

## Integración de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Agiliza el proceso desde la detección de bloqueos hasta la implementación de soluciones combinando el sistema de actualización en vivo de Capgo con Crashlytics.

### Acerca de Capgo

Capgo es una herramienta de actualización en vivo diseñada específicamente para [aplicaciones de Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Con más de 1,900 aplicaciones en producción y una tasa de actualización del 95% en 24 horas, asegura soluciones rápidas sin las demoras de las aprobaciones de la tienda de aplicaciones [\[1\]](https://capgo.app/).

Las características clave incluyen:

-   **Cifrado de extremo a extremo** para actualizaciones seguras
-   **Retroceso con un clic** a versiones anteriores
-   **Distribución basada en canales** para lanzamientos dirigidos
-   **Integración CI/CD sin problemas**
-   Una **plataforma 100% de código abierto**

### Crashlytics y Capgo juntos

Usar Crashlytics con Capgo crea un flujo de trabajo eficiente para identificar y resolver problemas rápidamente.

Aquí está cómo funciona:

1.  **Detección y respuesta a bloqueos**  
    Crashlytics identifica un bloqueo, y Capgo te permite desplegar soluciones instantáneamente sin esperar la aprobación de la tienda de aplicaciones.
    
2.  **Actualizaciones específicas**
    
    -   _Pruebas Beta_: Prueba soluciones con un grupo específico para asegurarte de que sean efectivas.
    -   _Implementación escalonada_: Despliega actualizaciones gradualmente para reducir riesgos.
    -   _Solución de emergencia_: Empuja rápidamente parches críticos para resolver problemas urgentes.
3.  **Monitoreo y verificación**  
    Después de desplegar actualizaciones con Capgo, usa Crashlytics para rastrear tasas de bloqueos y confirmar que el problema esté resuelto.
    

### Seguridad y reglas de la tienda de aplicaciones

Capgo se adhiere a las políticas de Apple y Google mientras proporciona funciones de seguridad sólidas:

-   82% de tasa de éxito global para la entrega de actualizaciones [\[1\]](https://capgo.app/)
-   Control automático de versiones para mejor organización
-   Cumplimiento con las pautas de actualizaciones en vivo de la tienda de aplicaciones

Para una integración segura con Crashlytics:

-   Habilita el seguimiento de errores en ambos sistemas.
-   Usa las herramientas de monitoreo de Capgo junto con los informes de Crashlytics.
-   Mantén el control de versiones para todas las actualizaciones.
-   Guarda registros detallados de actualizaciones para fines de auditoría.

Continúa a la sección de Opciones de Plugins para explorar otras herramientas de actualización en vivo.

## Opciones de Plugins

Elegir el plugin adecuado para la recopilación de bloqueos puede impactar significativamente la forma en que identificas y solucionas errores en tu aplicación.

Aquí hay una rápida comparación de Crashlytics con otras herramientas populares de informes de errores para Capacitor:

-   **[Sentry](https://sentry.io/)**: Ofrece un nivel gratuito con planes de pago a partir de $26/mes. Soporta más de 30 plataformas y provee monitoreo de errores en tiempo real con contexto detallado.
-   **[Bugsnag](https://www.bugsnag.com/)**: Comienza en $47/mes. Cubre tanto plataformas móviles como web, presentando agrupación automática de errores y seguimiento de lanzamientos.
-   **[Rollbar](https://rollbar.com/)**: Tiene un precio a partir de $31/mes. Funciona en múltiples plataformas, con características como seguimiento de implementaciones y seguimiento de personas.

Crashlytics es especialmente atractivo para equipos que ya utilizan Firebase, gracias a su integración fluida y su nivel gratuito.

## Resumen

Aquí hay una rápida mirada a lo que has logrado y lo que viene a continuación:

### Recapitulación de Pasos de Configuración

Has completado tres pasos clave para comenzar:

-   Creaste un proyecto de Firebase y registraste tus aplicaciones iOS/Android.
-   Instalaste y configuraste el plugin de Crashlytics.
-   Actualizaste los archivos necesarios de las plataformas iOS y Android.

### ¿Por Qué Integrar Estas Herramientas?

Combinar Firebase Crashlytics con Capgo te brinda un sistema poderoso para el seguimiento de errores y [gestión de actualizaciones](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Esto es lo que ofrece esta combinación:

-   **Correcciones rápidas**: Envía actualizaciones instantáneas y retrocede cambios con solo un clic.
-   **Implementaciones confiables**: Asegúrate de que las actualizaciones sean ampliamente adoptadas y entregadas sin problemas a los usuarios.

### ¿Qué Sigue?

1.  Activa la analítica de fallos detallada en la Consola de Firebase.
2.  Agrega Capgo a tu pipeline de CI/CD para actualizaciones simplificadas.
3.  Utiliza [canales de Capgo](https://capgo.app/docs/webapp/channels/) para probar y liberar correcciones paso a paso.

Con Crashlytics y Capgo en su lugar, estás listo para mantener tu aplicación funcionando sin problemas y mejorando con el tiempo.
