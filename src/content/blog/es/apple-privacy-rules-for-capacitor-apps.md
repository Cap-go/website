---
slug: apple-privacy-rules-for-capacitor-apps
title: Reglas de Privacidad de Apple para Aplicaciones de Capacitor
description: >-
  Aprende a cumplir con las reglas de privacidad de Apple para el desarrollo de
  aplicaciones implementando el consentimiento del usuario, la transparencia de
  datos y actualizaciones seguras.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-31T01:48:03.832Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf-1743385695606.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Apple privacy rules, Capacitor apps, data transparency, user consent, App
  Store compliance, privacy policy
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
**Las reglas de privacidad de Apple ahora requieren que los desarrolladores de aplicaciones de [Capacitor](https://capacitorjs.com/) se centren en la transparencia de los datos del usuario y el cumplimiento para garantizar la aprobación de la App Store y mantener la confianza del usuario.**

Los pasos clave incluyen:

-   **Manifiesto de Privacidad**: Documentar la recopilación de datos, las API y los detalles del seguimiento.
-   **Consentimiento del Usuario**: Usar la Transparencia de Seguimiento de Aplicaciones (ATT) para permisos de seguimiento.
-   **Acceso a Datos**: Definir claramente los permisos para funciones como cámara, ubicación y contactos.
-   **[Política de Privacidad](https://capgo.app/dp/)**: Proveer una política accesible y clara que describa el uso de los datos.
-   **Pruebas y Actualizaciones**: Probar rigurosamente el cumplimiento y usar sistemas de actualización seguros como [Capgo](https://capgo.app/).

Estas reglas enfatizan el control del usuario, la transparencia y las actualizaciones seguras de la aplicación. Los desarrolladores pueden seguir la guía para mantenerse en cumplimiento y ofrecer aplicaciones que respeten la privacidad.

## Evitar el Rechazo de la App Store: Agrega el Manifiesto de Privacidad de Apple ...

<iframe src="https://www.youtube.com/embed/D7R87wm9IJE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Reglas de Privacidad de Apple Explicadas

Apple requiere que los desarrolladores prioricen la claridad y den a los usuarios control sobre sus datos. Si eres un desarrollador de Capacitor, esto significa ser transparente sobre cómo tu aplicación recopila y usa datos, tanto para los usuarios como para los revisores de Apple.

### Documentación de Prácticas de Datos

Mantén registros internos detallados sobre el manejo de datos de tu aplicación. Asegúrate de incluir:

-   Tipos de datos de usuario recopilados
-   Razones para recopilar estos datos
-   Detalles de cualquier servicio o SDK de terceros utilizado
-   Cómo se transfieren o comparten los datos

Tener esta información organizada no solo ayuda con el cumplimiento, sino que también facilita responder preguntas durante el proceso de revisión. Asegúrate de reflejar estas prácticas de manera transparente en las etiquetas de privacidad de tu App Store y dentro de la configuración de tu aplicación.

### Elementos Clave de la Revelación de Privacidad

La información de privacidad de tu aplicación debe describir claramente:

-   Funciones del sistema y permisos de API requeridos para que la aplicación funcione
-   Categorías de datos que se están recopilando
-   Cualquier actividad de seguimiento o comunicación con servicios externos
-   Cómo se utilizan los datos y por qué

Ser claro en tus revelaciones ayuda a construir confianza con los usuarios y reduce la probabilidad de problemas durante la revisión de la App Store.

### Cronograma de Cumplimiento

Apple actualiza sus requisitos de privacidad en fases. Mantente informado revisando regularmente las actualizaciones para desarrolladores de Apple para asegurarte de que tu aplicación se alinee con las reglas más recientes.

## Agregar Reglas de Privacidad a Tu Aplicación

Aprende cómo implementar las reglas de privacidad de Apple en tu aplicación de Capacitor con esta guía paso a paso.

### Requisitos de Configuración

Antes de comenzar, asegúrate de lo siguiente:

-   Tienes **Xcode 15 o posterior** para soporte del manifiesto de privacidad.
-   Capacitor 6 o 7 está instalado.
-   El objetivo de despliegue de iOS está configurado en **iOS 14.5 o posterior**.
-   Tu aplicación incluye un archivo `Info.plist` correctamente configurado.
-   Tienes una **cuenta de desarrollador de Apple** con certificados válidos.

Si estás usando Capgo, configura la encriptación de extremo a extremo para salvaguardar la privacidad de los datos. Las aplicaciones configuradas correctamente con Capgo han logrado una tasa de éxito global del 82% en actualizaciones [\[1\]](https://capgo.app/).

Una vez que tu entorno esté listo, procede a crear y configurar tu manifiesto de privacidad.

### Guía de Configuración del Manifiesto de Privacidad

1.  **Crea el Archivo de Manifiesto de Privacidad**

Agrega un nuevo archivo llamado `PrivacyInfo.xcprivacy` al directorio raíz de tu proyecto de iOS:

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyAccessedAPITypes": []
}
```

2.  **Define la Recopilación de Datos**

Especifica los tipos de datos que tu aplicación recopila, como:

-   Análisis de usuarios
-   Información del dispositivo
-   Patrones de uso
-   Acceso a la red

3.  **Configura el Acceso a la API**

Enumera las API del sistema que tu aplicación requiere, incluyendo:

-   Cámara
-   Ubicación
-   Contactos
-   Biblioteca de fotos

### Directrices de Cumplimiento

Después de configurar el manifiesto de privacidad, asegúrate de que tus prácticas de recopilación de datos cumplan con los estándares de Apple.

**Minimización de Datos**  
Solo recopila los datos necesarios para las funciones principales de tu aplicación. Los usuarios de Capgo han informado una tasa de actualización de usuarios activos del 95% dentro de las 24 horas [\[1\]](https://capgo.app/), mostrando que los enfoques que respetan la privacidad mantienen a los usuarios comprometidos.

**Transparencia del Usuario**  
Explica claramente:

-   Por qué se están recopilando datos
-   Cuánto tiempo se almacenarán
-   Opciones de control del usuario disponibles
-   Cualquier política de intercambio de datos

### Requisitos de Pruebas

Antes de enviar, prueba tu aplicación para garantizar el cumplimiento de la privacidad. Enfócate en estas áreas:

| Área de Prueba | Puntos de Verificación |
| --- | --- |
| Acceso a Datos | Verifica si hay mensajes de permiso adecuados. |
| Etiquetas de Privacidad | Confirma que las declaraciones son precisas. |
| Controles del Usuario | Prueba las características de exclusión. |
| [Almacenamiento de Datos](https://capgo.app/plugins/capacitor-data-storage-sqlite/) | Verifica que la encriptación sea segura. |

Capgo ha entregado con éxito 23.5 millones de actualizaciones mientras mantenía el cumplimiento de privacidad [\[1\]](https://capgo.app/), demostrando que es posible equilibrar actualizaciones y privacidad de manera efectiva.

Sigue estas directrices para asegurar que tu aplicación esté lista para pruebas y envío a la App Store.

## Controles de Privacidad del Usuario

Esta sección se centra en cómo dar a los usuarios control sobre el seguimiento y el acceso a datos, basándose en las directrices de privacidad establecidas.

### Configuración de Permisos de Seguimiento

Para configurar la Transparencia de Seguimiento de Aplicaciones (ATT) en tu aplicación de Capacitor, incluye la siguiente clave en tu archivo `Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use tracking to provide personalized features and improve app performance</string>
```

A continuación, maneja la solicitud de seguimiento durante la inicialización de tu aplicación:

```typescript
import { App } from '@capacitor/app';

async function requestTrackingPermission() {
  const status = await App.requestTrackingAuthorization();
  return status.authorized;
}
```

**Consejos para la Implementación de ATT**:

-   Muestra el cuadro de diálogo de permisos en un momento significativo de la experiencia del usuario.
-   Explica claramente los beneficios del seguimiento antes de que aparezca el aviso del sistema.
-   Respeta las decisiones del usuario y ofrece alternativas para aquellos que opten por no participar.

### Permisos de Acceso a Datos

Para iOS, necesitarás definir permisos en el `Info.plist` de tu aplicación. Aquí hay algunos permisos comunes y sus descripciones:

| Tipo de Permiso | Clave en Info.plist | Descripción de Uso |
| --- | --- | --- |
| Cámara | NSCameraUsageDescription | Requerido para la captura de fotos |
| Ubicación | NSLocationWhenInUseUsageDescription | Para funciones basadas en ubicación |
| Fotos | NSPhotoLibraryUsageDescription | Acceso para guardar/cargar imágenes |
| Contactos | NSContactsUsageDescription | Para integración de contactos |

**Cuándo Solicitar Permisos**:

-   Solo pide permisos cuando sean necesarios y proporciona un contexto claro.
-   Explica brevemente por qué cada permiso es necesario antes de solicitarlo.
-   Si un usuario niega una solicitud, ofrece características o opciones alternativas.

Después de configurar los permisos, asegúrate de que los usuarios estén informados sobre estas prácticas a través de una política de privacidad transparente.

### Visualización de la Política de Privacidad

Haz que la política de privacidad de tu aplicación sea fácil de encontrar y entender.

**Qué Incluir**:

-   Detalles sobre la recopilación de datos
-   Cómo se utilizarán los datos
-   Períodos de retención para los datos almacenados
-   Derechos del usuario respecto a sus datos
-   Detalles de contacto para preocupaciones de privacidad

Puedes agregar un centro de privacidad a tu aplicación de esta manera:

```typescript
import { Browser } from '@capacitor/browser';

async function showPrivacyPolicy() {
  await Browser.open({
    url: 'https://your-app.com/privacy-policy'
  });
}
```

**Cómo Mostrar la Política de Privacidad**:

-   Coloca el enlace de la política de privacidad en la configuración de la aplicación para fácil acceso.
-   Usa un lenguaje simple y claro para explicar conceptos técnicos.
-   Añade elementos visuales para mejorar la comprensión.
-   Proporciona un historial de versiones y notifica a los usuarios de las actualizaciones.
-   Permite a los usuarios exportar sus datos si lo solicitan.

Asegúrate de que las actualizaciones de tu aplicación (por ejemplo, a través de Capgo) cumplan con estas configuraciones de privacidad y mantengan la confianza del usuario.

## Pruebas y Envío a la App Store

Una vez que hayas configurado tu manifiesto de privacidad y controles de usuario, el siguiente paso es realizar pruebas minuciosas para asegurarte de que todo funcione como se espera. Este proceso ayuda a confirmar el cumplimiento antes de enviar tu aplicación a la App Store.

### Pruebas de Privacidad en [Xcode](https://en.wikipedia.org/wiki/Xcode)

Para comenzar, activa el Informe de Privacidad en Xcode:

```swift
// Enable Privacy Report in Xcode scheme
Edit Scheme > Run > Diagnostics > Enable Privacy Report
```

Ejecuta tu aplicación en modo depuración y revisa el Informe de Privacidad en la consola. Aquí está en qué concentrarte durante las pruebas:

| Área de Prueba | Qué Verificar |
| --- | --- |
| Seguimiento de Aplicaciones | Tiempo y visualización del diálogo de ATT |
| Acceso a Datos | Implementación adecuada de permisos |
| Uso de API | Integridad del manifiesto de privacidad |
| Llamadas de Red | Seguridad de la transmisión de datos |

Esta prueba asegura que tu aplicación esté lista para el envío y cumpla con los estándares de cumplimiento.

### Errores Comunes de Privacidad

Después de las pruebas, resuelve estos problemas frecuentes para evitar retrasos durante el envío:

-   **`privacy-manifest.json` Incompleto**: Asegúrate de que todas las API requeridas y los dominios de seguimiento estén listados.
-   **Cadenas de Propósito Faltantes**: Explica claramente la razón de cada solicitud de permiso.
-   **Solicitudes de Seguimiento Inadecuadas**: Solo activa los permisos de seguimiento después de una acción del usuario.

### Detalles de Privacidad de la App Store

Al enviar tu aplicación, proporciona información precisa sobre tus prácticas de privacidad. Aquí está lo que debes incluir:

| Categoría de Privacidad | Información Necesaria | Ejemplos |
| --- | --- | --- |
| Recopilación de Datos | Tipos de datos recopilados | ID del dispositivo, Ubicación |
| Uso de Datos | Por qué se recopilan los datos | Funcionalidad de la aplicación, Análisis |
| Vinculación de Datos | Cómo los datos se conectan a los usuarios | Información de cuenta, Datos de uso |
| Seguimiento de Datos | Detalles del seguimiento entre aplicaciones | Publicidad, Análisis |

**Requisitos Clave de la App Store**:

-   Actualiza la URL de tu política de privacidad antes del envío.
-   Asegúrate de que los permisos declarados se alineen con la funcionalidad de tu aplicación.
-   Documenta las prácticas de privacidad de cualquier SDK de terceros utilizado.
-   Confirma que todas las transmisiones de red están encriptadas por razones de seguridad.

## Usando [Capgo](https://capgo.app/) para Actualizaciones

![Capgo](https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf/f3ac818a2fec22e90998e19561d68a19.jpg)

Capgo ofrece un sistema seguro para actualizaciones en vivo mientras se adhiere a las reglas de privacidad de Apple.

### Características de Privacidad de Capgo

El sistema de actualizaciones de Capgo está construido con la seguridad y la privacidad en mente:

| Característica | Beneficio de Privacidad |
| --- | --- |
| Encriptación de Extremo a Extremo | Asegura que solo los usuarios autorizados puedan desencriptar actualizaciones |
| Cumplimiento con la App Store | Se alinea con los estrictos requisitos de privacidad de Apple |
| Despliegue Seguro | Protege la distribución de actualizaciones |
| Control de Acceso | Permite gestión detallada de permisos |

Estas características protegen las actualizaciones y mantienen la privacidad del usuario.

> "La única solución con verdadera encriptación de extremo a extremo, otros solo firman actualizaciones" - Capgo [\[1\]](https://capgo.app/)

### Implementación de Actualizaciones con Capgo

Aquí te explicamos cómo implementar actualizaciones compatibles con la privacidad utilizando Capgo:

1.  **Instala el complemento de Capgo**:
    
    Ejecuta el siguiente comando para comenzar:
    
    ```bash
    npx @capgo/cli init
    ```
    
2.  **Configura tus ajustes de privacidad**:
    
    Actualiza tu manifiesto de privacidad para incluir los dominios y APIs de Capgo.
    
3.  **Configura canales de actualización encriptados**:
    
    Crea canales separados para diferentes etapas de implementación para asegurar actualizaciones seguras.
    

Capgo asegura que el 95% de los usuarios activos reciban actualizaciones dentro de 24 horas, con una tasa de éxito global del 82% [\[1\]](https://capgo.app/). El sistema de canales también facilita el manejo de la segmentación de actualizaciones.

### Actualizaciones de Grupos de Usuarios en Capgo

Capgo te permite dirigirte de manera segura a grupos de usuarios específicos durante las actualizaciones:

| Tipo de Actualización | Consideraciones de Privacidad | Implementación |
| --- | --- | --- |
| Pruebas Beta | Limita la exposición a usuarios seleccionados | Usa un canal separado con acceso restringido |
| Despliegues Escalonados | Lanzamiento gradual a los usuarios | Distribuye actualizaciones basadas en porcentajes |

> "Practicamos desarrollo ágil y @Capgo es crítico para entregar de manera continua a nuestros usuarios!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Los permisos detallados de Capgo aseguran que solo los miembros del equipo autorizados puedan acceder y gestionar actualizaciones de manera segura.

## Resumen

### Requisitos Clave de Privacidad

Las reglas de privacidad de Apple para [aplicaciones Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) describen las siguientes necesidades:

| Requisito | Detalles |
| --- | --- |
| **Manifiesto de Privacidad** | Incluir los dominios, APIs y declaraciones de seguimiento necesarias. |
| **Consentimiento del Usuario** | Utilizar el marco ATT para solicitar permisos de seguimiento a los usuarios. |
| **Acceso a Datos** | Configurar permisos para acceder a fotos, ubicación y contactos. |
| **Política de Privacidad** | Proporcionar una política clara y accesible tanto en la aplicación como en la lista de la App Store. |
| **Seguridad de Actualizaciones** | Asegurar que las actualizaciones en vivo utilicen canales de implementación encriptados. |

### Lista de Verificación de Implementación

Sigue esta lista de verificación para cumplir con los requisitos de Apple:

-   **Configurar Manifiesto de Privacidad**  
    Agrega declaraciones de API, lista de dominios de seguimiento y documenta los propósitos del uso de datos.
    
-   **Configurar Permisos de Usuario**  
    Implementa el diálogo ATT, configura el acceso a fotos y medios, y habilita los servicios de ubicación.
    
-   **Sistema de Actualización Segura**  
    Utiliza una solución de actualización compatible con la privacidad, establece canales encriptados y configura controles de segmentación de usuarios.
    

La plataforma de Capgo proporciona una forma confiable de cumplir con estos estándares de privacidad mientras mantienes tu aplicación funcional y centrada en el usuario [\[1\]](https://capgo.app/).
