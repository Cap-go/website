---
slug: automatic-capacitor-ios-build-github-action
title: Compilación automática de Capacitor iOS con GitHub Actions y certificado
description: >-
  Cómo configurar una pipeline de CI/CD para su aplicación iOS Ionic con
  fastlane y GitHub Actions en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustración de la Acción de GitHub para Fastlane TestFlight
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-github-action
---

## Entrega Continua para iOS usando Fastlane y GitHub Actions y certificado

## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrate de tener Fastlane [instalado](https://docsfastlanetools/) en tu máquina de desarrollo
- Membresía del programa de desarrollador de iOS  
- Ganas de leer 😆…

## Importante sobre el precio

![Precio GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es 'gratuito' hasta cierto límite, dependiendo de la máquina elegida
Vamos a usar una máquina **_macOS_**, puedes ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de requisitos y precios, si te parece, continuamos…_**

> **_📣_ En la publicación asumimos que tenemos la app creada en iTunes Connect, tenemos los certificados del ecosistema de Apple, ¡todo será copiado por Fastlane!**

## Vamos al lío 🧑🏽💻

**Pasos a seguir en la publicación**

1. _Usar la API de App Store Connect con Fastlane_
2. _Requisitos_ 
3. _Crear una clave de API de App Store Connect_
4. _Usar una clave de API de App Store Connect_
5. _Copiar archivos de Fastlane_
6. _Configurar GitHub Actions_

## 1. Usar la API de App Store Connect con Fastlane

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu Apple ID ayuda a garantizar que solo tú puedas acceder a tu cuenta.
> De [Soporte de Apple](https://developerapplecom/support/authentication/)

## Requisitos

Para poder usar la API de App Store Connect, Fastlane necesita **tres** cosas:

1. ID del emisor
2. ID de la clave
3. Archivo de clave o contenido de la clave  

## Crear una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo y seguir las siguientes instrucciones.

1 — Inicia sesión en [App Store Connect](https://appstoreconnectapplecom/)

2 — Selecciona [Usuarios y Acceso](https://appstoreconnectapplecom/access/users/)

![App Store Connect acceso de usuarios](/select_user_accesswebp)

3 — Selecciona la pestaña Claves API

![App Store Connect Claves API](/user_access_keyswebp)

4 — Haz clic en Generar clave API o en el botón Agregar (+)

![App Store Connect crear claves API](/user_accesswebp)

5 — Ingresa un nombre para la clave. El nombre es solo para tu referencia y no es parte de la clave en sí

![App Store Connect crear nombre de clave API](/gen_keywebp)

6 — En Acceso, selecciona el rol para la clave. Los roles que se aplican a las claves son los mismos roles que se aplican a los usuarios de tu equipo. Consulta los [permisos de roles](https://helpapplecom/app-store-connect/#/deve5f9a89d7/). Recomendamos seleccionar **Gestión de aplicaciones**

7 — Haz clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página

![App Store Connect descargar claves](/download_keywebp)

Puedes obtener las tres informaciones necesarias aquí:
<1> ID del emisor
<2> ID de la clave
<3> Haz clic en "Descargar clave API" para descargar tu clave privada de API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenarlas en un repositorio de código o incluirlas en el código del lado del cliente.

## Usar una clave de API de App Store Connect

El archivo de clave API (archivo p8 que descargas), el ID de la clave y el ID del emisor son necesarios para crear el token JWT para la autorización. Hay varias formas de ingresar esta información en Fastlane usando la nueva acción de Fastlane, `app_store_connect_api_key`. Puedes aprender otras formas en la [documentación de Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/).Muestro este método porque creo que es la forma más fácil de trabajar con la mayoría de los CI existentes, donde se pueden establecer variables de entorno

_Ahora podemos gestionar Fastlane con la clave API de App Store Connect, ¡genial!_

### Crear certificados y perfiles de aprovisionamiento

#### Certificados

Abre XCode y ve a **Ajustes** > **Cuentas** > **Apple ID** > **Equipos** y selecciona tu equipo

![Identidades de firma de código](/code_signing_identitieswebp)

Haz clic en **Gestionar certificados** > **+** y selecciona **Distribución de Apple**

![Distribución de Apple](/apple_distributionwebp)

Luego puedes crear un nuevo certificado

Después necesitas ir al llavero para descargar el certificado como un archivo `p12`

Para hacerlo, debes ir al llavero, cambiar al llavero **login** y luego a la pestaña **Mis Certificados**

![Mis Certificados](/my_certificateswebp)

Luego puedes seleccionar el certificado que quieres descargar (Busca por la fecha del certificado)

Y luego haz clic derecho en el certificado y selecciona **Exportar**

Elige el formato de archivo **Personal Information Exchange (p12)**

Eso descargará el certificado como un archivo `p12`

#### Perfiles de aprovisionamiento

Abre [Apple Developer](https://developerapplecom/account/resources/profiles/list) y selecciona el equipo correcto

Luego crea un nuevo perfil, haciendo clic en **+** 

![Crear un nuevo perfil](/create_new_profilewebp)

Y selecciona **App Store Connect** 

![Seleccionar App Store Connect](/select_app_store_connectwebp)

Luego necesitas seleccionar la aplicación correcta, ten cuidado de no usar comodín ya que la firma fallará

![Seleccionar la aplicación correcta](/select_appwebp)

Selecciona el certificado correcto que creaste antes (busca la fecha de caducidad, debería ser el mismo día y mes que hoy) y haz clic en **Continuar**

![Seleccionar el certificado correcto](/select_certificatewebp)

Finalmente ingresa el nombre del perfil y haz clic en **Generar** 

> El nombre se usará para identificar el perfil en Fastlane, bajo el valor de `APPLE_PROFILE_NAME`

![Generar el perfil](/generate_profilewebp)

Puedes descargar el perfil como un archivo `mobileprovision`

![Descargar el perfil](/download_profilewebp)

### Crear secretos de GitHub para tu certificado y perfil de aprovisionamiento

El proceso de firma implica almacenar certificados y perfiles de aprovisionamiento, transferirlos al runner, importarlos al llavero del runner y usarlos en tu compilación

Crea secretos en tu repositorio u organización para los siguientes elementos:

-   Tu certificado de firma de Apple
    
    -   Este es tu archivo de certificado `p12` Para más información sobre cómo exportar tu certificado de firma desde Xcode, consulta la [documentación de Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)
        
    -   Debes convertir tu certificado a Base64 cuando lo guardes como secreto En este ejemplo, el secreto se llama `BUILD_CERTIFICATE_BASE64`
        
    -   Usa el siguiente comando para convertir tu certificado a Base64 y copiarlo a tu portapapeles:
        
        ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```
        
-   La contraseña de tu certificado de firma de Apple
    
    -   En este ejemplo, el secreto se llama `P12_PASSWORD`
-   Tu perfil de aprovisionamiento de Apple
    
    -   Para más información sobre cómo exportar tu perfil de aprovisionamiento desde Xcode, consulta la [documentación de Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)
        
    -   Debes convertir tu perfil de aprovisionamiento a Base64 cuando lo guardes como secreto En este ejemplo, el secreto se llama `BUILD_PROVISION_PROFILE_BASE64`
        
    -   Usa el siguiente comando para convertir tu perfil de aprovisionamiento a Base64 y copiarlo a tu portapapeles:
        
        ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```

## 2\ Copiar archivos de Fastlane

Fastlane es una biblioteca de Ruby creada para automatizar tareas comunes de desarrollo móvil Usando Fastlane, puedes configurar "lanes" personalizadas que agrupan una serie de "acciones" que realizan tareas que normalmente harías usando Android Studio Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principalesCrea una carpeta Fastlane en la raíz de tu proyecto y copia los siguientes archivos:
Fastfile

## **Procesamiento de compilación**

En GitHub Actions, **se te cobra según los minutos** que hayas utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 10-15 minutos antes de que una compilación pueda ser procesada en App Store Connect.

Para proyectos privados, el costo estimado por compilación puede llegar hasta **$0.08/min x 15 mins = $1.2**, o más, dependiendo de la configuración o dependencias de tu proyecto.

Si compartes las mismas preocupaciones sobre el precio que yo para proyectos privados, puedes mantener el `skip_waiting_for_build_processing` en `true`.

¿Cuál es el inconveniente? Tienes que actualizar manualmente el cumplimiento de tu aplicación en App Store Connect después de que la compilación haya sido procesada, para poder distribuir la compilación a tus usuarios.

Este es solo un parámetro opcional para actualizar si quieres ahorrar en los minutos de compilación para proyectos privados. Para proyectos gratuitos, esto no debería ser un problema en absoluto. Ver [precios](https://github.com/pricing/)

## 3. Configurar GitHub Actions

**Configurar secretos de GitHub**

¿Alguna vez te has preguntado de dónde vienen los valores de `ENV`? Bueno, ya no es un secreto – es de los secretos de tu proyecto 🤦

![Establecer secretos de GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - el ID de tu equipo de App Store Connect si estás en múltiples equipos

2. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, ej. `match AppStore com.domain.blabla.demo`

3. `BUILD_CERTIFICATE_BASE64` - Certificado codificado en Base64

4. `BUILD_PROVISION_PROFILE_BASE64` - Perfil de aprovisionamiento codificado en Base64

5. `BUNDLE_IDENTIFIER` - el identificador de paquete de tu aplicación

6. `APPLE_KEY_ID` — ID de clave de API de App Store Connect 🔺

7. `APPLE_ISSUER_ID` — ID de emisor de API de App Store Connect 🔺

8. `APPLE_KEY_CONTENT` — Contenido de la clave 🔺 de _p8_ de API de App Store Connect, [compruébalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4. Configurar archivo de flujo de trabajo de GitHub**

Crea un directorio de flujo de trabajo de GitHub

Dentro de la carpeta `workflow`, crea un archivo llamado `build-upload-ios.yml` y añade lo siguiente

Este flujo de trabajo debería activarse después de cada _etiqueta_ de GitHub, si necesitas automatizar la etiqueta, consulta primero [Compilación y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/)

Luego, este flujo de trabajo extraerá tus dependencias de NodeJS, las instalará y compilará tu aplicación JavaScript.

> Cada vez que envíes un nuevo commit, se construirá una versión en TestFlight

Tu aplicación no necesita usar Ionic, solo es obligatorio Capacitor base, puede tener módulos antiguos de Cordova, pero se deberían preferir los plugins JS de Capacitor.

## 5. Activar flujo de trabajo

**Crear un Commit**

Haz un _commit_, deberías ver el flujo de trabajo activo en el repositorio

**Activar el flujo de trabajo**

Empuja los nuevos commits a la rama `main` o `development` para activar el flujo de trabajo

![Iniciado con commit](/cd_started.webp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect

![Panel de Testflight](/testflight_app.webp)

## ¿Se puede desplegar desde la máquina local?

Sí, puedes, y es muy sencillo

Puedes usar Xcode para compilar y firmar tu aplicación, como siempre

### Gracias

Este blog está basado en los siguientes artículos:
- [Entrega continua para iOS usando Fastlane y acciones de GitHub](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentación de Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Esta documentación de GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)