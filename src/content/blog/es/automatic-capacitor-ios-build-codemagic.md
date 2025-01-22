---
slug: es__automatic-capacitor-ios-build-codemagic
title: Compilación automática de Capacitor iOS con Codemagic
description: >-
  Cómo configurar una pipeline de CI/CD para tu aplicación IOS Ionic con
  Codemagic en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Ilustración de Testflight de Codemagic
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-codemagic
---

## Entrega Continua para iOS usando Codemagic

## Prerrequisitos

Antes de continuar con el tutorial...

- Membresía del programa de desarrollador de iOS
- Ganas de leer 😆...

## Importante sobre el precio

![Precio Acción Codemagic](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

El servicio es 'gratuito' hasta 500 minutos de macOS M1 / mes, dependiendo de la máquina elegida
Vamos a usar una máquina **_macOS M1_**, puedes ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de requisitos y precios, si te parece, continuamos..._**

> **_📣_ En el post asumimos que tenemos la app creada en iTunes Connect, tenemos los certificados del ecosistema Apple, ¡todo será configurado por Codemagic!**

## Vamos al lío 🧑🏽💻

**Pasos a seguir en el post**

1. _Usando la API de App Store Connect con Codemagic_
2. _Requisitos_
3. _Creando una clave de API de App Store Connect_ 
4. _Usando una clave de API de App Store Connect_
5. _Copiar archivos de Fastlane_
6. _Configurar Codemagic_

## 1. Usando la API de App Store Connect con Codemagic

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa extra de seguridad para tu Apple ID ayuda a garantizar que solo tú puedas acceder a tu cuenta.
> De [Soporte de Apple](https://developer.apple.com/support/authentication/)

> Comenzar con match requiere que revoques tus certificados existentes. Pero no te preocupes, tendrás el nuevo directamente.

### Requisitos

Para poder usar la API de App Store Connect, Codemagic necesita **tres** cosas:

1. ID del emisor
2. ID de la clave
3. Archivo de clave o contenido de la clave

### Creando una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo y seguir las siguientes instrucciones:

1 — Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/)

2 — Selecciona [Usuarios y Acceso](https://appstoreconnect.apple.com/access/users/)

![Acceso de usuario de App Store Connect](/select_user_access.webp)

3 — Selecciona la pestaña Claves API

![Claves API de App Store Connect](/user_access_keys.webp)

4 — Haz clic en Generar clave API o en el botón Agregar (+)

![Crear claves API de App Store Connect](/user_access.webp)

5 — Ingresa el nombre de la clave y selecciona un nivel de acceso. Recomendamos elegir derechos de acceso de `Gestor de App`, lee más sobre los permisos de roles del Programa de Desarrollador de Apple [aquí](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Crear nombre de clave API de App Store Connect](/gen_key.webp)

6 — Haz clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página

![Descargar claves de App Store Connect](/download_key.webp)

Obtén las tres informaciones necesarias aquí:
- ID del emisor
- ID de la clave  
- Haz clic en "Descargar clave API" para descargar tu clave privada de API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Así que solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenarlas en un repositorio de código o incluirlas en código del lado del cliente.

### Agregando la clave API de App Store Connect a Codemagic

1. Abre la configuración de tu equipo de Codemagic,
![Seleccionar integraciones del equipo](/select_team.webp)
![Abrir equipo](/open_team.webp)
Selecciona identidades de firma de código
![Seleccionar identidades de firma de código](/select_code_signing_identities.webp)
Y sube el certificado
![Subir el certificado](/upload_certificate.webp)

2. Haz clic en el botón **Agregar clave**
3. Ingresa el `Nombre de la clave API de App Store Connect`. Este es un nombre legible para humanos que se usará para referirse a la clave más adelante en la configuración de la aplicación
4. Ingresa los valores de `ID del emisor` y `ID de la clave`
5. Haz clic en **Elegir unAquí está la traducción al español:

archivo p8** o arrastre el archivo para subir la clave API de App Store Connect descargada anteriormente
6. Haga clic en **Guardar**

_Ahora podemos gestionar Codemagic con la clave API de App Store Connect, ¡genial!_

## 2. Crear certificados y perfiles de aprovisionamiento

#### Certificados

Abra XCode y vaya a **Configuración** > **Cuentas** > **Apple ID** > **Equipos** y seleccione su equipo

![Identidades de firma de código](/code_signing_identities.webp)

Haga clic en **Gestionar certificados** > **+** y seleccione **Distribución de Apple**

![Distribución de Apple](/apple_distribution.webp)

Luego puede crear un nuevo certificado

Después debe ir al llavero para descargar el certificado como un archivo `p12`

Para hacerlo, debe ir al llavero, cambiar al llavero **inicio** y luego a la pestaña **Mis Certificados**

![Mis Certificados](/my_certificates.webp)

Luego puede seleccionar el certificado que desea descargar (Busque por la fecha del certificado)

Y luego haga clic derecho en el certificado y seleccione **Exportar**

Elija el formato de archivo **Intercambio de Información Personal (.p12)**

Eso descargará el certificado como un archivo `p12`

#### Perfiles de aprovisionamiento

Abra [Apple Developer](https://developer.apple.com/account/resources/profiles/list) y seleccione el equipo correcto

Luego cree un nuevo perfil, haciendo clic en **+**

![Crear un nuevo perfil](/create_new_profile.webp)

Y seleccione **App Store Connect**

![Seleccionar App Store Connect](/select_app_store_connect.webp)

Luego debe seleccionar la aplicación correcta, tenga cuidado de no usar comodín ya que la firma fallará

![Seleccionar la aplicación correcta](/select_app.webp)

Seleccione el certificado correcto que creó antes (busque la fecha de vencimiento, debería ser el mismo día y mes que hoy) y haga clic en **Continuar**

![Seleccionar el certificado correcto](/select_certificate.webp)

Finalmente, ingrese el nombre del perfil y haga clic en **Generar**

> El nombre se usará para identificar el perfil en Codemagic

![Generar el perfil](/generate_profile.webp)

Puede descargar el perfil como un archivo `mobileprovision`

![Descargar el perfil](/download_profile.webp)

### Agregar el certificado de firma de código

Codemagic le permite subir certificados de firma de código como archivos PKCS#12 que contienen tanto el certificado como la clave privada necesaria para usarlo. Al subir, Codemagic le pedirá que proporcione la contraseña del certificado (si el certificado está protegido con contraseña) junto con un **Nombre de referencia** único, que luego se puede usar en la configuración `codemagic.yml` para obtener el archivo específico.

- Subir certificado
- Generar nuevo certificado
- Obtener del Portal de Desarrolladores

1. Abra la configuración de su Equipo de Codemagic, vaya a **configuración de codemagic.yml** > **Identidades de firma de código**
2. Abra la pestaña **Certificados iOS**
3. Suba el archivo del certificado haciendo clic en **Elegir un archivo p12 o pem** o arrastrándolo al marco indicado
4. Ingrese la **Contraseña del certificado** y elija un **Nombre de referencia**
5. Haga clic en **Agregar certificado**

### Agregar el perfil de aprovisionamiento

Codemagic le permite subir un perfil de aprovisionamiento para ser usado en la aplicación o obtener un perfil del Portal de Desarrolladores de Apple

El tipo de perfil, equipo, ID del paquete y fecha de vencimiento se muestran para cada perfil agregado a Identidades de firma de código. Además, Codemagic le informará si hay un certificado de firma de código coincidente disponible en Identidades de firma de código (una marca de verificación verde en el campo **Certificado**) o no.

## 3. Configurar Codemagic

**Configurar secretos de Codemagic**

¿Alguna vez se preguntó de dónde vienen los valores de `ENV`? Bueno, ya no es un secreto - ¡es de los secretos de su proyecto! 🤦

## **4. Configurar archivo de flujo de trabajo de Codemagic**

Cree un archivo llamado `codemagic.yml` en la raíz de su proyecto y agregue lo siguiente

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

Este flujo de trabajo debería activarse manualmente o después de cada _etiqueta_ de GitHub, si necesita automatizar la etiqueta, consulte primero [Compilación y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/)Entonces este flujo de trabajo extraerá tus dependencias de NodeJS, las instalará y compilará tu aplicación JavaScript

> Cada vez que envíes una nueva etiqueta, se creará una versión en TestFlight

Tu aplicación no necesita usar Ionic, solo la base de Capacitor es obligatoria, puede tener módulos antiguos de Cordova, pero se prefieren los plugins JS de Capacitor

## 5. Activar el flujo de trabajo

**Activar el flujo de trabajo**

Envía los nuevos commits a la rama `main` o `development` para activar el flujo de trabajo

![Iniciado con commit](/build_resultwebp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect

![Panel de Testflight](/testflight_appwebp)

## Iniciar manualmente

Puedes iniciar el flujo de trabajo manualmente

Primero selecciona la aplicación que deseas compilar, luego haz clic en **Iniciar nueva compilación**

![Seleccionar aplicación](/select_app_codemagicwebp)

Luego selecciona la rama que deseas compilar

![Seleccionar rama](/select_branchwebp)

Y haz clic en **Iniciar nueva compilación**

Luego ve a la lista de compilaciones

![Lista de compilaciones](/build_listwebp)

Y haz clic en la compilación para ver el resultado

![Resultado de la compilación](/build_resultwebp)

## Se puede implementar desde la máquina local

Sí, puedes hacerlo, y es muy sencillo

Puedes usar Xcode para compilar y firmar tu aplicación, como siempre

### Agradecimientos

Este blog se basa en los siguientes artículos:
- [Entrega continua para iOS usando Codemagic y acciones de GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentación de Codemagic](https://docsCodemagictools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)