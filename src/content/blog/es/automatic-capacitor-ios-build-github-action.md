---
slug: automatic-capacitor-ios-build-github-action
title: Build automatico di Capacitor iOS con GitHub Actions e certificato
description: >-
  Cómo configurar un pipeline de CI/CD para tu aplicación Ionic iOS usando
  fastlane y GitHub Actions en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2025-01-21T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustración de acción de GitHub para testflight Fastlane
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-github-action
---

# Compilaciones automáticas de iOS con GitHub Actions usando certificados

La configuración de CI/CD para aplicaciones Capacitor puede ser compleja y llevar mucho tiempo. Esto es lo que necesitas saber:

## Prerrequisitos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitHub con acceso de administrador
- Membresía del programa de desarrollador de iOS
- Acceso a la API de App Store Connect con los permisos adecuados
- Comprensión de los flujos de trabajo de GitHub Actions
- Conocimiento de la configuración de Fastlane
- Tiempo para mantener y depurar el pipeline
- Certificados y perfiles de aprovisionamiento adecuados

## Configuración profesional de CI/CD por Capgo

Evita la complejidad: [Capgo](https://capgoapp/ci-cd/) configura tu pipeline de CI/CD directamente en tu plataforma preferida:

- **Independencia de plataforma**: Funciona con GitHub Actions, GitLab CI u otros
- **Integración perfecta**: No necesitas cambiar de plataforma, funciona con tu proceso actual
- **Configuración personalizada**: Configuración adaptada a las necesidades de tu proyecto
- **Guía experta**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa única de configuración: $2,600
- Tus costos operativos: ~$300/año
- Comparado con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configura CI/CD ahora](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## Guía de configuración manual

Si aún deseas configurar todo por ti mismo, esto es lo que necesitas hacer:

## Entrega continua para iOS usando Fastlane y GitHub Actions y certificado

## Prerrequisitos

Antes de continuar con el tutorial:

-   Asegúrate de tener Fastlane [instalado](https://docsfastlanetools/) en tu máquina de desarrollo
-   Asegúrate de ser parte del programa de desarrolladores de iOS

## Información importante sobre el precio

![Price GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es '_gratuito_' hasta el límite, dependiendo de la máquina elegida  
Vamos a usar una máquina **_macOS_**, puedes ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

**Una vez advertidos los requisitos y precios, continuemos**

> **Nota: En esta publicación asumo que tienes la aplicación creada en App Store Connect ¡La información importante será copiada por Fastlane!**

## Qué aprenderás en el tutorial

**Pasos a seguir en la publicación**

1. _Usar la API de App Store Connect con Fastlane_
    - _Requisitos:_
      - _Crear una clave de API de App Store Connect_
      - _Usar una clave de API de App Store Connect_
2. _Copiar archivos de Fastlane_
3. _Configurar GitHub Actions_

## 1. Usando la API de App Store Connect con Fastlane

> Desde febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu Apple ID ayuda a asegurar que seas la única persona que pueda acceder a tu cuenta.  
> De [Apple Support](https://developerapplecom/support/authentication/)

### Requisitos

Para que Fastlane pueda utilizar la API de App Store Connect para subir tu aplicación, necesitas proporcionar estas **tres** cosas:

1. ID del emisor
2. ID de la clave
3. Archivo de clave o contenido de la clave

### Obtener una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo

1. Inicia sesión en [App Store Connect](https://appstoreconnectapplecom/)

2. Selecciona [Users and Access](https://appstoreconnectapplecom/access/users/)

![App Store Connect user access](/select_user_accesswebp)

3. Selecciona la pestaña Integration

![App Store Connect API Integration](/user_access_keyswebp)

4. Haz clic en Generate API Key o en el botón Add (+)

![App Store Connect API keys create](/user_accesswebp)

5. Ingresa un nombre para la clave. El nombre es solo para tu referencia y no es parte de la clave en sí

![App Store Connect API keys create name](/gen_keywebp)

6. En Access, selecciona el rol para la claveLos roles que se aplican a las claves son los mismos roles que se aplican a los usuarios en tu equipo. Consulta los [permisos de roles](https://helpapplecom/app-store-connect/#/deve5f9a89d7/). Recomendamos seleccionar **App manager**

7. Click en Generar

> **El acceso de una clave API no puede limitarse a aplicaciones específicas**

El nombre de la nueva clave, ID de clave, enlace de descarga y otra información aparecerán en la página

![App Store Connect download keys](/download_keywebp)

Puedes obtener las tres informaciones necesarias aquí:  
[[HTML_TAG]] ID de Emisor (`APPLE_ISSUER_ID` secreto)  
[[HTML_TAG]] ID de Clave (`APPLE_KEY_ID` secreto)  
[[HTML_TAG]] Click en "Descargar API Key" para descargar tu clave privada API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenarlas en un repositorio de código o incluirlas en código del lado del cliente

### Usando una Clave API de App Store Connect

El archivo de Clave API (archivo p8 que descargas), el ID de clave y el ID de emisor son requeridos para crear el token JWT para autorización. Hay múltiples formas en que esta información puede ser pasada a Fastlane. Elegí usar la nueva acción de Fastlane `app_store_connect_api_key`. Puedes aprender otras formas en la [documentación de Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/). Muestro este método porque creo que es la forma más fácil de trabajar con la mayoría de CI, donde puedes establecer variables de entorno

Por favor convierte el archivo p8 que descargaste a Base64 y guárdalo como un secreto (`APPLE_KEY_CONTENT`)

[[CODE_BLOCK]]

_¡Ahora podemos gestionar App Store Connect con Fastlane usando la clave API, excelente!_

## 2. Certificados

Abre XCode y ve a **Ajustes** > **Cuentas** > **Apple ID** > **Equipos** y selecciona tu equipo

![Code signing identities](/code_signing_identitieswebp)

Click en **Gestionar certificados**

Si aún no has creado un certificado, puedes crear uno nuevo

Click en **+** y selecciona **Apple Distribution**

![Apple Distribution](/apple_distributionwebp)

Luego necesitas ir al llavero para descargar el certificado como un archivo `p12`

Para hacerlo, necesitas ir al llavero, cambiar al llavero **inicio** y luego a la pestaña **Mis Certificados**

![My Certificates](/my_certificateswebp)

Entonces puedes seleccionar el certificado que quieres descargar (Busca por la fecha del certificado)

Y luego click derecho en la clave privada del certificado y selecciona **Exportar**

Elige el formato de archivo **Personal Information Exchange (p12)**

Eso descargará el certificado como un archivo `p12`

Por favor abre el archivo en una terminal y usa el siguiente comando para convertirlo a Base64:

[[CODE_BLOCK]]

Esto se convertirá en tu secreto `BUILD_CERTIFICATE_BASE64`. También, cuando se te solicite, proporciona la contraseña del certificado. Esta contraseña será tu secreto `P12_PASSWORD`

## 3. Perfiles de aprovisionamiento

Abre [Apple Developer](https://developerapplecom/account/resources/profiles/list) y selecciona el equipo correcto

Luego crea un nuevo perfil, haciendo click en **+**

![Create a new profile](/create_new_profilewebp)

Y selecciona **App Store Connect**

![Select App Store Connect](/select_app_store_connectwebp)

Luego necesitas seleccionar la aplicación correcta, ten cuidado de no usar comodín ya que la firma fallará

![Select the right app](/select_appwebp)

Selecciona el certificado correcto que creaste antes (busca por la fecha de vencimiento, debe ser el mismo día y mes que hoy) y click en **Continuar**

![Select the right certificate](/select_certificatewebp)

Finalmente ingresa el nombre del perfil y click en **Generar**

> El nombre será usado para identificar el perfil en Fastlane, bajo el valor de `APPLE_PROFILE_NAME`

![Generate the profile](/generate_profilewebp)

Puedes descargar el perfil como un archivo `mobileprovision`

![Download the profile](/download_profile