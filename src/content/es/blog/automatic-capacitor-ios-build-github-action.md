---
slug: automatic-capacitor-ios-build-github-action
title: >-
  Construcción automática del condensador IOS con acciones GitHub con
  certificado
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación IOS Ionic como ayuda de
  Fastlane y acciones GitHub en 5 minutos (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-github-action
locale: es
---

## Entrega continua para iOS usando Fastlane y GitHub Actions y certificado


## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrese de tener Fastlane [instalado](https://docsfastlanetools/) en su máquina de desarrollo
- Membresía del programa de desarrolladores de iOS
- Ganas de leer 😆…

## Importante sobre el precio

![Precio Acción GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es '_gratuito'_ hasta el límite, dependiendo de la máquina elegida  
Vamos a utilizar una máquina **_macOS_**, podéis ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez avisados ​​de requisitos y precios, si gustas seguimos…_**

> **_📣_ En el post asumimos que tenemos la app creada en iTunes connect, sí tenemos los certificados del ecosistema Apple, ¡todo será copiado por Fastlane!**

##Vamos al lío 🧑🏽💻

**Pasos a seguir en el post**

1 _Uso de la API App Store Connect con Fastlane_
2 _Requisitos_
3 _Creación de una clave API de App Store Connect_
4 _Uso de una clave API de App Store Connect_
5 _Copiar archivos Fastline_
6 _Configurar acciones de GitHub_


## 1 Uso de la API App Store Connect con Fastlane

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación de dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para su ID de Apple ayuda a garantizar que usted sea la única persona que pueda acceder a su cuenta.  
> Desde [Soporte de Apple](https://developerapplecom/support/authentication/)

## Requisitos

Para poder utilizar la API App Store Connect, Fastlane necesita **tres** cosas:

1 ID del emisor
2 claves de identificación
3 Archivo clave o contenido clave

## Creación de una clave API de App Store Connect

Para generar claves, debe tener permiso de administrador en App Store Connect. Si no tiene ese permiso, puede dirigir a la persona correspondiente a este artículo y seguir las siguientes instrucciones.

1 — Inicie sesión en [App Store Connect](https://appstoreconnectapplecom/)

2 — Seleccione [Usuarios y acceso](https://appstoreconnectapplecom/access/users/)

![Acceso de usuario de App Store Connect](/select_user_accesswebp)

3: seleccione la pestaña Claves API

![Claves API de App Store Connect](/user_access_keyswebp)

4: haga clic en Generar clave API o en el botón Agregar (+)

![Creación de claves API de App Store Connect](/user_accesswebp)

5 — Ingrese un nombre para la clave. El nombre es solo para su referencia y no forma parte de la clave en sí.

![Nombre de creación de claves API de App Store Connect](/gen_keywebp)

6: En Acceso, seleccione la función para la clave. Las funciones que se aplican a las claves son las mismas que se aplican a los usuarios de su equipo. Consulte [permisos de funciones](https://helpapplecom/app-store-connect/#/deve5f9a89d7/ ) Recomendamos seleccionar **Administración de aplicaciones**


7 - Haga clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página.

![Claves de descarga de App Store Connect](/download_keywebp)

Puede obtener las tres informaciones necesarias aquí.  
<1> ID del problema  
<2> ID de clave  
<3> Haga clic en "Descargar clave API" para descargar su clave privada API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, puede descargarla solo una vez.

> _🔴_ Guarde su clave privada en un lugar seguro. Nunca debe compartir sus claves, almacenarlas en un repositorio de códigos ni incluir claves en el código del lado del cliente.

## Uso de una clave API de App Store Connect

El archivo de clave API (archivo p8 que descarga), el ID de la clave y el ID del emisor son necesarios para crear el token JWT para la autorización. Hay varias formas en que estos datos se pueden ingresar en Fastlane usando la nueva acción de Fastlane, `app_store_connect_api_key ` Puede conocer otras formas en la [documentación de Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/)Muestro este método porque creo que es la forma más fácil de trabajar con la mayoría de los CI que existen, donde puedes configurar variables de entorno.

_Ahora podemos administrar Fastlane con la clave API de App Store Connect, ¡genial!_

### Crear certificados y perfiles de aprovisionamiento

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

> El nombre se utilizará para identificar el perfil en Fastlane, bajo el valor de `APPLE_PROFILE_NAME`

![Generar el perfil](/generate_profilewebp)

Puede descargar el perfil como un archivo `mobileprovision`

![Descargar el perfil](/download_profilewebp)


### Creando secretos de GitHub para su certificado y perfil de aprovisionamiento

El proceso de firma implica almacenar certificados y aprovisionar perfiles, transferirlos al ejecutor, importarlos al llavero del ejecutor y usarlos en su compilación.

Cree secretos en su repositorio u organización para los siguientes elementos:

- Tu certificado de firma de Apple
    
    - Este es su archivo de certificado `p12`. Para obtener más información sobre cómo exportar su certificado de firma desde Xcode, consulte la [documentación de Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)
        
    - Debes convertir tu certificado a Base64 al guardarlo como secreto. En este ejemplo, el secreto se llama `BUILD_CERTIFICATE_BASE64`
        
    - Utilice el siguiente comando para convertir su certificado a Base64 y copiarlo a su portapapeles:
        
        ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```
        
- La contraseña de tu certificado de firma de Apple
    
    - En este ejemplo, el secreto se llama `P12_PASSWORD`
- Tu perfil de aprovisionamiento de Apple
    
    - Para obtener más información sobre cómo exportar su perfil de aprovisionamiento desde Xcode, consulte la [documentación de Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)
        
    - Debes convertir tu perfil de aprovisionamiento a Base64 al guardarlo como secreto. En este ejemplo, el secreto se llama `BUILD_PROVISION_PROFILE_BASE64`
        
    - Utilice el siguiente comando para convertir su perfil de aprovisionamiento a Base64 y copiarlo a su portapapeles:
        
        ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```


## 2\ Copiar archivos Fastline

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías usando Android Studio. Puedes hacer mucho con Fastlane. pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.Cree una carpeta Fastlane en la raíz de su proyecto y copie los siguientes archivos:
archivo rápido
```ruby
platform :ios do
  desc 'Export ipa and submit to TestFlight'
  lane :beta do
    keychain_info = { keychain_name: "ios-build-#{Time.now.to_i}.keychain", keychain_password: SecureRandom.uuid }
    
    begin
      setup_signing(keychain_info)
      bump_build_number
      build_app_with_signing(keychain_info)
      submit_to_testflight
    ensure
      cleanup_keychain(keychain_info)
    end
  end

  private_lane :setup_signing do |options|
    create_keychain(
      name: options[:keychain_name],
      password: options[:keychain_password],
      unlock: true,
      timeout: 0,
      lock_when_sleeps: false, 
      add_to_search_list: true
    )
    import_cert(options)
    install_profile
    update_project_settings
  end

  lane :bump_build_number do
		file = File.read('../package.json')
		data_hash = JSON.parse(file)
		api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
		build_num = app_store_build_number(
      api_key: api_key,
			app_identifier: ENV['BUNDLE_IDENTIFIER'],
			live: false
    )
		build_num = build_num + 1
		UI.message("Bumped build number to #{build_num}")
		increment_build_number(
			build_number: build_num,
			xcodeproj: "./ios/App/App.xcodeproj",
			skip_info_plist: true
		)
	end

  private_lane :import_cert do |options|
    cert_path = "#{Dir.tmpdir}/build_certificate.p12"
    File.write(cert_path, Base64.decode64(ENV['BUILD_CERTIFICATE_BASE64']))
    import_certificate(
      certificate_path: cert_path,
      certificate_password: ENV['P12_PASSWORD'] || "",
      keychain_name: options[:keychain_name],
      keychain_password: options[:keychain_password],
      log_output: true
    )
    File.delete(cert_path)
  end  
  
  private_lane :cleanup_keychain do |options|
    delete_keychain(
      name: options[:keychain_name]
    )
  end  

  private_lane :install_profile do
    profile_path = "#{Dir.tmpdir}/build_pp.mobileprovision"
    File.write(profile_path, Base64.decode64(ENV['BUILD_PROVISION_PROFILE_BASE64']))
    UI.user_error!("Failed to create provisioning profile at #{profile_path}") unless File.exist?(profile_path)
    ENV['PROVISIONING_PROFILE_PATH'] = profile_path
    install_provisioning_profile(path: profile_path)
    File.delete(profile_path)
  end

  private_lane :update_project_settings do
    update_code_signing_settings(
      use_automatic_signing: false,
      path: "./ios/App/App.xcodeproj",
      code_sign_identity: "iPhone Distribution",
      profile_name: ENV['APPLE_PROFILE_NAME'],
      bundle_identifier: ENV['BUNDLE_IDENTIFIER'],
      team_id: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
    update_project_team(
      path: "./ios/App/App.xcodeproj",
      teamid: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
  end

  private_lane :build_app_with_signing do |options|
    unlock_keychain(
      path: options[:keychain_name],
      password: options[:keychain_password],
      set_default: false
    )
    build_app(
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      configuration: "Release",
      export_method: "app-store",
      output_name: "App.ipa",
      export_options: {
        provisioningProfiles: {
          ENV['BUNDLE_IDENTIFIER'] => ENV['APPLE_PROFILE_NAME']
        }
      },
      xcargs: "-verbose",
      buildlog_path: "./build_logs",
      export_xcargs: "-allowProvisioningUpdates",
    )
  end   

  private_lane :submit_to_testflight do
    api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
    pilot(
      api_key: api_key,
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )
  end
end
```

## **Procesamiento de compilación**

En GitHub Actions, **se te factura en función de los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, se necesitan entre 10 y 15 minutos antes de que se pueda procesar una compilación en App Store Connect.

Para proyectos privados, el costo estimado por construcción puede llegar hasta **$008/min x 15 minutos = $12**, o más, dependiendo de la configuración o las dependencias de su proyecto.

Si comparte las mismas preocupaciones sobre los precios que yo tengo para los proyectos privados, puede mantener `skip_waiting_for_build_processing` en `true`.

¿Cuál es el truco? Debe actualizar manualmente el cumplimiento de su aplicación en App Store Connect después de que se haya procesado la compilación, para poder distribuirla a sus usuarios.

Este es solo un parámetro opcional para actualizar si desea ahorrar minutos de compilación para proyectos privados. Para proyectos gratuitos, esto no debería ser un problema en absoluto. Consulte [precios](https://githubcom/pricing/)


## 3\ Configurar acciones de GitHub

**Configurar secretos de GitHub**

¿Alguna vez te has preguntado de dónde vienen los valores de "ENV"? Bueno, ya no es un secreto, es el secreto de tu proyecto 🤦

![Establecer secretos de GitHub](/github_secetswebp)

1\ `APP_STORE_CONNECT_TEAM_ID`: el ID de tu equipo de App Store Connect si estás en varios equipos

2\ `PROVISIONING_PROFILE_SPECIFIER` - `coincide con AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, por ejemplo, `coincide con AppStore comdomainblablademo`

3\ `BUILD_CERTIFICATE_BASE64` - Certificado codificado en Base64

4\ `BUILD_PROVISION_PROFILE_BASE64` - Perfil de aprovisionamiento codificado en Base64

5\ `BUNDLE_IDENTIFIER`: el identificador del paquete de tu aplicación

6\ `APPLE_KEY_ID` — Clave API de App Store Connect 🔺ID de clave

7\ `APPLE_ISSUER_ID` — Clave API de App Store Connect 🔺ID del emisor

8\ `APPLE_KEY_CONTENT` — Clave API de App Store Connect 🔺 Contenido clave de _p8_, [compruébalo](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4\ Configurar el archivo de flujo de trabajo de GitHub**

Crear un directorio de flujo de trabajo de GitHub

```
cd .github/workflows
```

Dentro de la carpeta `workflow`, cree un archivo llamado `build-upload-iosyml` y agregue lo siguiente

```yaml
name: Build source code on ios

on:
  push:
    tags:
      - '*'

jobs:
  build_ios:
    runs-on: macOS-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - name: Build
        id: build_code
        run: npm run build
      - name: Build
        id: build_code
        run: npm run mobile
      - uses: actions/cache@v3
        with:
          path: ios/App/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-
      - name: Sync
        id: sync_code
        run: npx cap sync
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          BUNDLE_IDENTIFIER: ${{ secrets.BUNDLE_IDENTIFIER }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          BUILD_PROVISION_PROFILE_BASE64: ${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          APPLE_PROFILE_NAME: ${{ secrets.APPLE_PROFILE_NAME }}
        with:
          lane: ios beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v4
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 10
```

Este flujo de trabajo debe activarse después de cada _etiqueta_ de GitHub. Si necesita automatizar la etiqueta, consulte [Construcción y lanzamiento automáticos con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/) primero

Luego, este flujo de trabajo extraerá sus departamentos de NodeJS, los instalará y creará su aplicación JavaScript.

> Cada vez que envíe una nueva confirmación, se creará una versión en TestFlight

Su aplicación no necesita usar Ionic, solo la base Capacitor es obligatoria, puede tener un módulo Cordova antiguo, pero se debe preferir el complemento Capacitor JS.

## 5\ Activar flujo de trabajo

**Crear un compromiso**

Haga un _commit_, debería ver el flujo de trabajo activo en el repositorio

**Activar el flujo de trabajo**

Empuje las nuevas confirmaciones a la rama "principal" o "desarrollo" para activar el flujo de trabajo

![Comenzó con confirmación](/cd_startedwebp)

Después de unos minutos, la compilación debería estar disponible en el panel de App Store Connect.

![Panel de control de Testflight](/testflight_appwebp)

## ¿Se puede implementar desde la máquina local?

Sí, puedes y no requiere esfuerzo.

Puedes usar Xcode para crear y firmar tu aplicación, como siempre.

### Gracias

Este blog está basado en los siguientes artículos:
- [Entrega continua para IOS usando acciones Fastlane y GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentación de Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Esta documentación de GitHub](https://docsgithubcom/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)