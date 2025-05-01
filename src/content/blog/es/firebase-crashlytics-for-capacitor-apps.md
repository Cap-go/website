---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics für Capacitor Apps
description: >-
  실시간 충돌 보고를 모바일 앱에 통합하는 방법을 iOS와 Android 모두를 위한 Crashlytics 설정 단계별 가이드를 통해
  알아보세요.
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

**[Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics)** te ayuda a rastrear fallos de la aplicación en tiempo real, proporcionando informes detallados para solucionar problemas rápidamente. Se integra perfectamente con [Capacitor](https://capacitorjscom/) tanto para aplicaciones iOS como Android. Esto es lo que necesitas saber:

-   **¿Por qué usar Crashlytics?**
    
    -   Obtén **alertas de fallos en tiempo real**
    -   Analiza informes detallados de fallos con **agrupación automática de problemas**
    -   Monitorea errores críticos para mantener las aplicaciones estables
-   **Requisitos de configuración:**
    
    -   Instala **[Nodejs](https://nodejsorg/en) (v16+)**, **Capacitor (v4+)**, y herramientas como **[Xcode](https://developerapplecom/xcode/) 14+** y **[Android Studio](https://developerandroidcom/studio) Electric Eel**
    -   Descarga los archivos de configuración de [Firebase](https://firebasegooglecom/) (`GoogleService-Infoplist` para iOS, `google-servicesjson` para Android)
    -   Actualiza los archivos específicos de plataforma como `Podfile` (iOS) y `buildgradle` (Android)
-   **Pasos Clave:**
    
    -   Instala Crashlytics:
        
        [[CODE_BLOCK]]
        
    -   Inicializa Crashlytics en tu aplicación:
        
        [[CODE_BLOCK]]
        
-   **Prueba tu Configuración:**
    
    -   Desencadena un fallo de prueba:
        
        [[CODE_BLOCK]]
        
-   **Consejo Adicional:** Combina Crashlytics con **[Capgo](https://capgoapp/)** para actualizaciones instantáneas sin retrasos de la tienda de aplicaciones
    

¡Esta guía asegura que tu aplicación esté libre de fallos y sea fácil de usar! ¡Comienza configurando Firebase Crashlytics hoy!

## Guía Android 2021: [Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics) - fallo personalizado

![Firebase Crashlytics](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607fjpg)

[[HTML_TAG]][[HTML_TAG]]

## Requisitos de Configuración

Antes de empezar, asegúrate de haber completado los siguientes pasos:

### Software y Cuentas Requeridas

Necesitarás instalar lo siguiente:

-   **Nodejs** (v16 o superior) y **Capacitor** (v4 o superior)
-   Una **cuenta de Firebase** con un proyecto activo
-   **Xcode 14+** para desarrollo iOS
-   **Android Studio Electric Eel** o una versión más nueva para desarrollo Android
-   La última versión de **[CocoaPods](https://cocoapodsorg/)** (requerido para iOS)

### Archivos de Configuración de Plataforma

**Para iOS:**

-   Descarga el archivo `GoogleService-Infoplist` desde la Consola de Firebase
-   Actualiza tu `Podfile` para incluir las dependencias de Crashlytics
-   Añade las claves de privacidad necesarias a tu archivo `Infoplist`

**Para Android:**

-   Obtén el archivo `google-servicesjson` de la Consola de Firebase
-   Realiza cambios en los archivos `buildgradle` a nivel de proyecto y aplicación
-   Actualiza el `AndroidManifestxml` para incluir los permisos requeridos

### Configuración de la Consola [Firebase](https://firebasegooglecom/)

![Firebase](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83jpg)

Configura Firebase y habilita Crashlytics siguiendo estos pasos:

1.  **Crea un proyecto de Firebase** y habilita Crashlytics
    
2.  **Registra tus aplicaciones** en la Consola de Firebase:
    
    -   Usa el **ID del paquete** para iOS y el **nombre del paquete** para Android
    -   Descarga los archivos de configuración: `GoogleService-Infoplist` (iOS) y `google-servicesjson` (Android)
3.  **Integra los SDKs de Firebase** en tu aplicación añadiendo estas dependencias:
    
    **Para Android (app-level `buildgradle`):**
    
    [[CODE_BLOCK]]
    
    **Para iOS (`Podfile`):**
    
    [[CODE_BLOCK]]
    

Una vez completados estos pasos, estás listo para pasar a la sección de Instalación del Plugin.

## Pasos de Instalación

### Instalación del Plugin

Primero, instala el plugin y [sincronízalo con Capacitor](https://capgoapp/plugins/capacitor-updater/):

[[CODE_BLOCK]]

Luego, inicializa Crashlytics en tu aplicación. Añade el siguiente código a `appcomponentts` o `maints`:

[[CODE_BLOCK]]

### Configuración de Plataforma

Configura los ajustes requeridos para las plataformas Android e iOS.

**Configuración de Android**

1.Agrega el plugin de Crashlytics Gradle a tu archivo `build.gradle` a nivel de app:

[[CODE_BLOCK]]

2. Habilita la recopilación de fallos en `AndroidManifest.xml`:

[[CODE_BLOCK]]

**Configuración iOS**

1. Configura Firebase en `AppDelegate.swift`:

[[CODE_BLOCK]]

### Probando tu Configuración

Confirma que Crashlytics está funcionando ejecutando un fallo de prueba y verificando la Consola de Firebase:

- Provoca un fallo de prueba con una clave personalizada:

[[CODE_BLOCK]]

- Opcionalmente, identifica un usuario:

[[CODE_BLOCK]]

- Registra eventos personalizados:

[[CODE_BLOCK]]

Los informes, incluyendo trazas de pila, detalles del dispositivo y claves personalizadas, deberían aparecer en la Consola de Firebase en aproximadamente 5 minutos.

**Importante:** Elimina las llamadas de fallo antes de publicar tu app. Para deshabilitar la recopilación de fallos durante el desarrollo, usa:

[[CODE_BLOCK]]

## Guía de Monitoreo

Una vez que hayas confirmado tu configuración con un fallo de prueba, usa la Consola de Firebase para rastrear fallos y errores reales en tu app en producción.

### Leyendo Informes de Fallos

Puedes encontrar informes de fallos en la Consola de Firebase bajo la sección Crashlytics. Esto es lo que verás:

- **Usuarios sin fallos**: El porcentaje de usuarios que no han experimentado fallos
- **Estabilidad del problema**: Con qué frecuencia están ocurriendo los fallos
- **Análisis de impacto**: El número de usuarios afectados

Haz clic en cualquier problema para profundizar en detalles como trazas de pila, información del dispositivo (ej. versión del SO, memoria), claves personalizadas, registros y el recorrido del usuario antes del fallo.

**Consejo profesional**: Habilita la función de "alertas de velocidad" para recibir notificaciones cuando las tasas de fallo aumenten repentinamente. Esto puede ayudarte a abordar problemas antes de que afecten a demasiados usuarios.

### Consejos para la Gestión de Errores

- **Priorizar por Impacto**: Concéntrate en los fallos que afectan a la mayoría de los usuarios o que ocurren en partes críticas de tu app. El seguimiento de tendencias puede ayudarte a identificar problemas urgentes.

- **Usar Claves Personalizadas**: Añade contexto a tus informes de fallo con claves personalizadas. Por ejemplo:

[[CODE_BLOCK]]

- **Agrupar Problemas Similares**: Aprovecha la agrupación automática de problemas de Firebase. También puedes etiquetar fallos relacionados con claves personalizadas consistentes y usar títulos claros y descriptivos para un seguimiento más fácil.

### Protegiendo la Privacidad del Usuario

Para garantizar el cumplimiento y salvaguardar los datos del usuario, sigue estas pautas:

- **Permisos**:
  - Menciona el informe de fallos en tu política de privacidad
  - Obtén el consentimiento del usuario para la recolección de datos en regiones con regulaciones GDPR
  - Proporciona a los usuarios una opción para excluirse del informe de fallos

- **Controles de Recopilación de Datos**:

[[CODE_BLOCK]]

- **Retención de Datos**:
  - Configura la eliminación automática de datos después de 90 días
  - Elimina información sensible de tus informes
  - Usa claves personalizadas no identificables para mantener la privacidad del usuario durante la depuración

## Integración con [Capgo](https://capgoapp/)

![Capgo](https://assets.seobot.ai/capgoapp/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Optimiza el proceso desde la detección de fallos hasta el despliegue de correcciones combinando el sistema de actualización en vivo de Capgo con Crashlytics.

### Acerca de Capgo

Capgo es una herramienta de actualización en vivo diseñada específicamente para [apps de Capacitor](https://capgoapp/blog/capacitor-comprehensive-guide/). Con más de 1,900 apps en producción y una tasa de actualización del 95% en 24 horas, asegura correcciones rápidas sin los retrasos de las aprobaciones de la tienda de apps [\[1\]](https://capgoapp/)

Las características principales incluyen:

- **Cifrado de extremo a extremo** para actualizaciones seguras
- **Reversión con un clic** a versiones anteriores
- **Distribución basada en canales** para lanzamientos dirigidos
- **Integración perfecta con CI/CD**
- Una **plataforma 100% de código abierto**

### Crashlytics y Capgo Juntos

Usar Crashlytics con Capgo crea un flujo de trabajo eficiente para identificar y resolver problemas rápidamente.

Así es como funciona:

1. **Detección y Respuesta a Fallos**
   Crashlytics identifica un fallo, y Capgo te permite implementar correcciones instantáneamente sin esperar la aprobación de la tienda de apps

2.