---
slug: automatic-capacitor-ios-build-codemagic
title: Compilación automática de Capacitor iOS con Codemagic
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación Ionic iOS usando
  Codemagic en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Ilustración de Testflight de Codemagic
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-codemagic
---
## Entrega continua para iOS usando Codemagic


## Prerrequisitos

Antes de continuar con el tutorial…

-   Membresía del programa de desarrollador de iOS.
-   Deseo de leer 😆…

## Importante sobre el precio

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

El servicio es '_gratuito_' hasta 500 minutos de macOS M1 / mes, dependiendo de la máquina elegida.  
Vamos a usar una máquina **_macOS M1_**, puedes ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de requisitos y precios, si te parece, continuamos…_**

> **_📣_ ¡En el post asumimos que tenemos la app creada en iTunes connect, tenemos los certificados del ecosistema de Apple, todo será configurado por Codemagic!**

## Empecemos 🤿

**Pasos a seguir en el post**

1.  _Usando la API de App Store Connect con Codemagic_
2.  _Requisitos_
3.  _Creando una clave de API de App Store Connect_
4.  _Usando una clave de API de App Store Connect_
5.  _Copiar archivos de Fastline_
6.  _Configurar Codemagic_

## 1. Usando la API de App Store Connect con Codemagic

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación de dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu Apple ID ayuda a asegurar que seas la única persona que pueda acceder a tu cuenta.  
> De [Apple Support](https://developer.apple.com/support/authentication/)

> Comenzar con match requiere que revoques tus certificados existentes. Pero no te preocupes, tendrás el nuevo directamente.

### Requisitos

Para poder usar la API de App Store Connect, Codemagic necesita **tres** cosas.

1.  ID del Emisor.
2.  ID de la Clave.
3.  Archivo de clave o contenido de la clave.

### Creando una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo y seguir las siguientes instrucciones.

1. — Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/).

2. — Selecciona [Usuarios y Acceso](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3. — Selecciona la pestaña Claves API.

![App Store Connect API Keys](/user_access_keys.webp)

4. — Haz clic en Generar Clave API o el botón Agregar (+).

![App Store Connect API keys create](/user_access.webp)

5. — Ingresa el nombre para la clave y selecciona un nivel de acceso. Recomendamos elegir derechos de acceso `App Manager`, lee más sobre los permisos de roles del Programa de Desarrollador de Apple [aquí](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API keys create name](/gen_key.webp)

6. — Haz clic en Generar.

> **El acceso de una clave API no puede limitarse a aplicaciones específicas.**

El nombre de la nueva clave, ID de clave, un enlace de descarga y otra información aparecen en la página.

![App Store Connect download keys](/download_key.webp)

Obtén las tres informaciones necesarias aquí:
<1> ID del Emisor.  
<2> ID de la Clave.  
<3> Haz clic en "Descargar Clave API" para descargar tu clave privada de API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez.

> _🔴_ Almacena tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenar claves en un repositorio de código o incluir claves en código del lado del cliente.

### Agregando la clave API de App Store Connect a Codemagic

1. Abre la configuración de tu equipo en Codemagic,
![Select Team integrations](/select_team.webp)
![Open team](/open_team.webp)
Selecciona las identidades de firma de código
![Select code signing identities](/select_code_signing_identities.webp)
Y sube el certificado
![Upload the certificate](/upload_certificate.webp)

2. Haz clic en el botón **Agregar clave**.
3. Ingresa el `Nombre de la clave de App Store Connect`. Este es un nombre legible para humanos que se utilizará para referirse a la clave más adelante en la configuración de la aplicación.
4. Ingresa los valores de `ID del emisor` y `ID de la clave`.
5. Haz clic en **Elegir un archivo .p8** o arrastra el archivo para cargar la clave API de App Store Connect descargada anteriormente.
6. Haz clic en **Guardar**.

*¡Ahora podemos gestionar Codemagic con la clave API de App Store Connect!*

## 2. Crear certificados y perfiles de aprovisionamiento

#### Certificados

Abre XCode y ve a **Preferencias** > **Cuentas** > **Apple ID** > **Equipos** y selecciona tu equipo.

![Code signing identities](/code_signing_identities.webp)

Haz clic en **Gestionar certificados** > **+** y selecciona **Apple Distribution**.

![Apple Distribution](/apple_distribution.webp)

Entonces podrás crear un nuevo certificado.

Luego necesitas ir al llavero para descargar el certificado como archivo `.p12`.

Para hacerlo, debes ir al llavero, cambiar al llavero **inicio** y luego a la pestaña **Mis Certificados**.

![My Certificates](/my_certificates.webp)

Entonces puedes seleccionar el certificado que quieres descargar. (Busca por la fecha del certificado)

Y luego haz clic derecho en el certificado y selecciona **Exportar**.

Elige el formato de archivo **Intercambio de Información Personal (.p12)**.

Eso descargará el certificado como un archivo `.p12`.

#### Perfiles de aprovisionamiento

Abre [Apple Developer](https://developer.apple.com/account/resources/profiles/list) y selecciona el equipo correcto.

Luego crea un nuevo perfil haciendo clic en **+**

![Create a new profile](/create_new_profile.webp)

Y selecciona **App Store Connect**.

![Select App Store Connect](/select_app_store_connect.webp)

Luego necesitas seleccionar la aplicación correcta, ten cuidado de no usar comodín ya que la firma fallará.

![Select the right app](/select_app.webp)

Selecciona el certificado correcto que creaste antes (busca por la fecha de vencimiento, debe ser el mismo día y mes que hoy) y haz clic en **Continuar**.

![Select the right certificate](/select_certificate.webp)

Finalmente ingresa el nombre del perfil y haz clic en **Generar**.

> El nombre se utilizará para identificar el perfil en Codemagic.

![Generate the profile](/generate_profile.webp)

Puedes descargar el perfil como un archivo `.mobileprovision`.

![Download the profile](/download_profile.webp)

### Agregando el certificado de firma de código

Codemagic te permite cargar certificados de firma de código como archivos PKCS#12 que contienen tanto el certificado como la clave privada necesaria para usarlo. Al cargar, Codemagic te pedirá que proporciones la contraseña del certificado (si el certificado está protegido por contraseña) junto con un **Nombre de referencia** único, que luego se puede usar en la configuración de `codemagic.yaml` para obtener el archivo específico.

- Cargar certificado
- Generar nuevo certificado 
- Obtener del Portal de Desarrollador

1. Abra la configuración de su equipo de Codemagic, vaya a **codemagic.yaml settings** > **Code signing identities**.
2. Abra la pestaña **iOS certificates**.
3. Suba el archivo del certificado haciendo clic en **Choose a .p12 or .pem file** o arrastrándolo al marco indicado.
4. Ingrese la **Certificate password** y elija un **Reference name**.
5. Haga clic en **Add certificate**

### Agregando el perfil de aprovisionamiento

Codemagic le permite cargar un perfil de aprovisionamiento para usar en la aplicación o obtener un perfil desde el Portal de Desarrolladores de Apple.

El tipo de perfil, equipo, ID del paquete y fecha de vencimiento se muestran para cada perfil agregado a Code signing identities. Además, Codemagic le informará si hay un certificado de firma de código coincidente disponible en Code signing identities (una marca de verificación verde en el campo **Certificate**) o no.

## 3. Configurar Codemagic

**Configurar secretos de Codemagic**

¿Alguna vez te has preguntado de dónde vienen los valores de `ENV`? Bueno, ya no es un secreto - viene del secreto de tu proyecto. 🤦

## **4. Configurar archivo de flujo de trabajo de Codemagic**

Crea un archivo llamado `codemagic.yml` en la raíz de tu proyecto y agrega lo siguiente.

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Este flujo de trabajo debe activarse manualmente o después de cada _tag_ de GitHub, si necesitas automatizar el tag, consulta primero [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/).

Luego este flujo de trabajo extraerá tus dependencias NodeJS, las instalará y construirá tu aplicación JavaScript.

> Cada vez que envíes un nuevo tag, se construirá un release en TestFlight.

Tu App no necesita usar Ionic, solo la base de Capacitor es obligatoria, puede tener módulos antiguos de Cordova, pero se deberían preferir los plugins de Capacitor JS.

## 5. Activar flujo de trabajo

**Activar el flujo de trabajo**

Envía los nuevos commits a la rama `main` o `developement` para activar el flujo de trabajo.

![Started with commit](/build_result.webp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect.

![Testflight Dashboard](/testflight_app.webp)

## Iniciar manualmente

Puedes iniciar el flujo de trabajo manualmente.

Primero selecciona la aplicación que deseas compilar, luego haz clic en **Start new build**.

![Select app](/select_app_codemagic.webp)

Luego selecciona la rama que deseas compilar.

![Select branch](/select_branch.webp)

Y haz clic en **Start new build**.

Luego ve a la lista de compilaciones

![Build list](/build_list.webp)

Y haz clic en la compilación para ver el resultado.

![Build result](/build_result.webp)

## Se puede desplegar desde máquina local

Sí, puedes, y es muy sencillo.

Puedes usar Xcode para compilar y firmar tu aplicación, como siempre.

### Gracias

Este blog está basado en los siguientes artículos:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docs.Codemagic.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
