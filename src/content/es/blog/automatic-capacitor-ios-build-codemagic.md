---
slug: automatic-capacitor-ios-build-codemagic
title: Creación automática de un condensador IOS con Codemagic
description: >-
  Comente configurar un pipeline CI/CD para su aplicación IOS Ionic con la ayuda
  de Codemagic y Codemagic en 5 minutos (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic testflight illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-codemagic
locale: es
---

## Entrega continua para iOS usando Codemagic


## Requisitos previos

Antes de continuar con el tutorial…

- Membresía del programa de desarrolladores de iOS
- Ganas de leer 😆…

## Importante sobre el precio

![Acción de Codemagic de precio](/price_codemagicwebp)

[https://codemagicio/precios/](https://codemagicio/precios/)

El servicio es ‘_gratuito’_ hasta 500 minutos macOS M1/mes, dependiendo de la máquina elegida  
Vamos a utilizar una máquina **_macOS M1_**, podéis ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez avisados ​​de requisitos y precios, si gustas seguimos…_**

> **_📣_ En el post asumimos que tenemos la aplicación creada en iTunes connect, sí tenemos los certificados del ecosistema Apple, ¡todo será configurado por Codemagic!**

##Vamos al lío 🧑🏽💻

**Pasos a seguir en el post**

1 _Uso de la API App Store Connect con Codemagic_
2 _Requisitos_
3 _Creación de una clave API de App Store Connect_
4 _Uso de una clave API de App Store Connect_
5 _Copiar archivos Fastline_
6 _Configurar Codemagic_

## 1\ Uso de la API App Store Connect con Codemagic

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación de dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para su ID de Apple ayuda a garantizar que usted sea la única persona que pueda acceder a su cuenta.  
> Desde [Soporte de Apple](https://developerapplecom/support/authentication/)

> Para comenzar con Match es necesario revocar sus certificados existentes. Pero no se preocupe, tendrá el nuevo directamente.


### Requisitos

Para poder utilizar la API App Store Connect, Codemagic necesita **tres** cosas

1 ID del emisor
2 claves de identificación
3 Archivo clave o contenido clave

### Creación de una clave API de App Store Connect

Para generar claves, debe tener permiso de administrador en App Store Connect. Si no tiene ese permiso, puede dirigir a la persona correspondiente a este artículo y seguir las siguientes instrucciones.

1 — Inicie sesión en [App Store Connect](https://appstoreconnectapplecom/)

2 — Seleccione [Usuarios y acceso](https://appstoreconnectapplecom/access/users/)

![Acceso de usuario de App Store Connect](/select_user_accesswebp)

3: seleccione la pestaña Claves API

![Claves API de App Store Connect](/user_access_keyswebp)

4: haga clic en Generar clave API o en el botón Agregar (+)

![Creación de claves API de App Store Connect](/user_accesswebp)

5 — Ingrese el nombre de la clave y seleccione un nivel de acceso. Recomendamos elegir los derechos de acceso "Administrador de aplicaciones", lea más sobre los permisos de rol del Programa de desarrolladores de Apple [aquí](https://helpapplecom/app-store-connect/#/deve5f9a89d7 )

![Nombre de creación de claves API de App Store Connect](/gen_keywebp)

6 - Haga clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página

![Claves de descarga de App Store Connect](/download_keywebp)

Obtenga las tres informaciones necesarias aquí:
<1> ID del problema  
<2> ID de clave  
<3> Haga clic en "Descargar clave API" para descargar su clave privada API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, puede descargarla solo una vez.

> _🔴_ Guarde su clave privada en un lugar seguro. Nunca debe compartir sus claves, almacenarlas en un repositorio de códigos ni incluir claves en el código del lado del cliente.

### Agregar la clave API de App Store Connect a Codemagic

1 Abre la configuración de tu equipo de Codemagic,
![Seleccionar integraciones de equipo](/select_teamwebp)
![Equipo abierto](/open_teamwebp)
Seleccionar identidades de firma de código
![Seleccione identidades de firma de código](/select_code_signing_identitieswebp)
Y subir el certificado.
![Subir el certificado](/upload_certificatewebp)

2 Haga clic en el botón **Agregar clave**
3 Ingrese el `Nombre de la clave API de App Store Connect`. Este es un nombre legible por humanos para la clave que se usará para hacer referencia a la clave más adelante en la configuración de la aplicación.
4 Ingrese los valores "Issuer ID" y "Key ID".
5 Haga clic en **Elija unp8** o arrastre el archivo para cargar la clave API de App Store Connect descargada anteriormente
6 Haga clic en **Guardar**

_Ahora podemos administrar Codemagic con la clave API de App Store Connect, ¡genial!_


## 2\ Crear certificados y perfiles de aprovisionamiento


#### Certificados

Abra XCode y vaya a **Configuración** > **Cuentas** > **ID de Apple** > **Equipos** y seleccione su equipo.

![Identidades de firma de código](/code_signing_identitieswebp)

Haga clic en **Administrar certificados** > **+** y seleccione **Distribución de Apple**

![Distribución Apple](/apple_distributionwebp)

Entonces puedes crear un nuevo certificado.

Luego debes ir al llavero para descargar el certificado como un archivo `p12`

Para hacerlo, debe ir al llavero, cambiar al llavero **iniciar sesión** y luego a la pestaña **Mis certificados**

![Mis certificados](/my_certificateswebp)

Luego podrás seleccionar el certificado que deseas descargar (Buscar por la fecha del certificado)

Y luego haga clic derecho en el certificado y seleccione **Exportar**

Elija el formato de archivo **Intercambio de información personal (p12)**

Eso descargará el certificado como un archivo `p12`

#### Perfiles de aprovisionamiento

Abra [Apple Developer](https://developerapplecom/account/resources/profiles/list) y seleccione el equipo adecuado

Luego crea un nuevo perfil, haciendo clic en **+** 

![Crear un nuevo perfil](/create_new_profilewebp)

Y selecciona **App Store Connect** 

![Seleccione App Store Connect](/select_app_store_connectwebp)

Luego debe seleccionar la aplicación correcta; tenga cuidado de no utilizar comodines; de lo contrario, la firma fallará.

![Seleccione la aplicación correcta](/select_appwebp)

Seleccione el certificado correcto que creó antes (busque la fecha de vencimiento, debe ser el mismo día y mes que hoy) y haga clic en **Continuar**

![Seleccione el certificado correcto](/select_certificatewebp)

Finalmente ingresa el nombre del perfil y haz clic en **Generar** 

> El nombre se utilizará para identificar el perfil en Codemagic

![Generar el perfil](/generate_profilewebp)

Puede descargar el perfil como un archivo `mobileprovision`

![Descargar el perfil](/download_profilewebp)


### Agregar el certificado de firma de código

Codemagic le permite cargar certificados de firma de código como archivos PKCS#12 que contienen tanto el certificado como la clave privada necesaria para usarlo. Al cargar, Codemagic le pedirá que proporcione la contraseña del certificado (si el certificado está protegido con contraseña) junto con una **Nombre de referencia** único, que luego se puede usar en la configuración `codemagicyaml` para recuperar el archivo específico

- Subir certificado
- Generar nuevo certificado
- Obtener desde el portal del desarrollador

1 Abre la configuración de tu equipo de Codemagic, ve a **configuración de codemagicyaml** > **Identidades de firma de código**
2 Abra la pestaña **Certificados de iOS**
3 Cargue el archivo del certificado haciendo clic en **Elija un archivo p12 o pem** o arrastrándolo al marco indicado.
4 Ingrese la **Contraseña del certificado** y elija un **Nombre de referencia**
5 Haga clic en **Agregar certificado**

### Agregar el perfil de aprovisionamiento

Codemagic le permite cargar un perfil de aprovisionamiento para usarlo en la aplicación o recuperar un perfil del Portal de desarrolladores de Apple.

El tipo de perfil, el equipo, la identificación del paquete y la fecha de vencimiento se muestran para cada perfil agregado a Identidades de firma de código. Además, Codemagic le permitirá saber si hay un certificado de firma de código coincidente disponible en Identidades de firma de código (una marca de verificación verde en **Certificado ** campo) o no

## 3\ Configurar Codemagic

**Configurar secretos de Codemagic**

¿Alguna vez te has preguntado de dónde vienen los valores de "ENV"? Bueno, ya no es un secreto, es el secreto de tu proyecto 🤦


## **4\ Configurar el archivo de flujo de trabajo de Codemagic**

Cree un archivo llamado `codemagicyml` en la raíz de su proyecto y agregue lo siguiente

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

Este flujo de trabajo debe activarse manualmente o después de cada _etiqueta_ de GitHub. Si necesita automatizar la etiqueta, consulte [Compilación y lanzamiento automáticos con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/) primeroLuego, este flujo de trabajo extraerá sus departamentos de NodeJS, los instalará y creará su aplicación JavaScript.

> Cada vez que envíe una nueva etiqueta, se creará una versión en TestFlight

Su aplicación no necesita usar Ionic, solo la base Capacitor es obligatoria, puede tener un módulo Cordova antiguo, pero se debe preferir el complemento Capacitor JS.

## 5\ Activar flujo de trabajo


**Activar el flujo de trabajo**

Empuje las nuevas confirmaciones a la rama "principal" o "desarrollo" para activar el flujo de trabajo

![Comenzó con confirmación](/build_resultwebp)

Después de unos minutos, la compilación debería estar disponible en el panel de App Store Connect.

![Panel de control de Testflight](/testflight_appwebp)

## Iniciar manualmente

Puede iniciar el flujo de trabajo manualmente 

Primero seleccione la aplicación que desea crear y luego haga clic en **Iniciar nueva compilación**

![Seleccionar aplicación](/select_app_codemagicwebp)

Luego seleccione la sucursal que desea construir.

![Seleccionar rama](/select_branchwebp)

Y haga clic en **Iniciar nueva compilación**

Luego ve a la lista de compilación.

![Lista de compilación](/build_listwebp)

Y haz clic en la compilación para ver el resultado.

![Resultado de la compilación](/build_resultwebp)

## Se puede implementar desde la máquina local

Sí, puedes y no requiere esfuerzo.

Puedes usar Xcode para crear y firmar tu aplicación, como siempre.

### Gracias

Este blog está basado en los siguientes artículos:
- [Entrega continua para IOS usando acciones de Codemagic y GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentación de Codemagic](https://docsCodemagictools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)