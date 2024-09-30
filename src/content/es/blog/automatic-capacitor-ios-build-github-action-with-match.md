---
slug: automatic-capacitor-ios-build-github-action-with-match
title: Compilación automática de Capacitor IOS con acciones de GitHub usando Match
description: >-
  Cómo configurar una canalización de CI/CD para su aplicación IOS Ionic usando
  fastlane y GitHub Actions en 5 minutos (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-github-action
locale: es
---

## Entrega continua para iOS usando Fastlane y GitHub Actions usando match


## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrese de tener Fastlane [instalado](https://docsfastlanetools/) en su máquina de desarrollo
- Membresía del programa de desarrolladores de iOS
- Ganas de leer 😆…
- Un equipo de muchos desarrolladores; de lo contrario, recomendamos usar [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) para flujos de trabajo más simples

## Importante sobre el precio

![Precio Acción GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es '_gratuito'_ hasta el límite, dependiendo de la máquina elegida  
Vamos a utilizar una máquina **_macOS_**, podéis ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez avisados ​​de requisitos y precios, si gustas seguimos…_**

> **_📣_ En el post asumimos que tenemos la app creada en iTunes connect, sí tenemos los certificados del ecosistema Apple, ¡todo será copiado por Fastlane!**

##Vamos al lío 🧑🏽💻

**Pasos a seguir en el post**

1 _Uso de la API App Store Connect con Fastlane Match_
2 _Requisitos_
3 _Creación de una clave API de App Store Connect_
4 _Uso de una clave API de App Store Connect_
5 _Copiar archivos Fastline_
6 _Configurar coincidencias de Fastlane_
6 _Configurar coincidencias de Fastlane_

## 1\ Uso de la API App Store Connect con Fastlane Match

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación de dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para su ID de Apple ayuda a garantizar que usted sea la única persona que pueda acceder a su cuenta.  
> Desde [Soporte de Apple](https://developerapplecom/support/authentication/)

> Para comenzar con Match es necesario revocar sus certificados existentes. Pero no se preocupe, tendrá el nuevo directamente.


## Requisitos

Para poder utilizar la API App Store Connect, Fastlane necesita **tres** cosas

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

6: En Acceso, seleccione la función para la clave. Las funciones que se aplican a las claves son las mismas que se aplican a los usuarios de su equipo. Consulte [permisos de funciones](https://helpapplecom/app-store-connect/#/deve5f9a89d7/ )

7 - Haga clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página

![Claves de descarga de App Store Connect](/download_keywebp)

Puede obtener las tres informaciones necesarias aquí.  
<1> ID del problema  
<2> ID de clave  
<3> Haga clic en "Descargar clave API" para descargar su clave privada API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, puede descargarla solo una vez.

> _🔴_ Guarde su clave privada en un lugar seguro. Nunca debe compartir sus claves, almacenarlas en un repositorio de códigos ni incluir claves en el código del lado del cliente.

## Uso de una clave API de App Store Connect

El archivo de clave API (archivo p8 que descarga), el ID de clave y el ID del emisor son necesarios para crear el token JWT para la autorización.Hay varias formas en que se pueden ingresar estos datos en Fastlane usando la nueva acción de Fastlane, `app_store_connect_api_key`. Puede aprender otras formas en [Documentación de Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/). Muestro este método porque Creo que es la forma más sencilla de trabajar con la mayoría de los CI que existen, donde se pueden establecer variables de entorno.

_Ahora podemos administrar Fastlane con la clave API de App Store Connect, ¡genial!_

## 2\ Copiar archivos Fastline

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías usando Android Studio. Puedes hacer mucho con Fastlane. pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.


Cree una carpeta Fastlane en la raíz de su proyecto y copie los siguientes archivos:
archivo rápido
```ruby
default_platform(:ios)

DEVELOPER_APP_IDENTIFIER = ENV["DEVELOPER_APP_IDENTIFIER"]
DEVELOPER_APP_ID = ENV["DEVELOPER_APP_ID"]
PROVISIONING_PROFILE_SPECIFIER = ENV["PROVISIONING_PROFILE_SPECIFIER"]
TEMP_KEYCHAIN_USER = ENV["TEMP_KEYCHAIN_USER"]
TEMP_KEYCHAIN_PASSWORD = ENV["TEMP_KEYCHAIN_PASSWORD"]
APPLE_ISSUER_ID = ENV["APPLE_ISSUER_ID"]
APPLE_KEY_ID = ENV["APPLE_KEY_ID"]
APPLE_KEY_CONTENT = ENV["APPLE_KEY_CONTENT"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]

def delete_temp_keychain(name)
  delete_keychain(
    name: name
  ) if File.exist? File.expand_path("~/Library/Keychains/#{name}-db")
end

def create_temp_keychain(name, password)
  create_keychain(
    name: name,
    password: password,
    unlock: false,
    timeout: 0
  )
end

def ensure_temp_keychain(name, password)
  delete_temp_keychain(name)
  create_temp_keychain(name, password)
end

platform :ios do
  lane :build do
    build_app(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )
  end
  lane :refresh_profiles do
    match(
      type: "development",
      force: true)
    match(
      type: "adhoc",
      force: true)
  end
  desc "Register new device"
  lane :register_new_device do  |options|
      device_name = prompt(text: "Enter the device name: ")
      device_udid = prompt(text: "Enter the device UDID: ")
      device_hash = {}
      device_hash[device_name] = device_udid
      register_devices(
                       devices: device_hash
                       )
    refresh_profiles
  end
  lane :closed_beta do
    keychain_name = TEMP_KEYCHAIN_USER
    keychain_password = TEMP_KEYCHAIN_PASSWORD
    ensure_temp_keychain(keychain_name, keychain_password)

    api_key = app_store_connect_api_key(
      key_id: APPLE_KEY_ID,
      issuer_id: APPLE_ISSUER_ID,
      key_content: APPLE_KEY_CONTENT,            
      duration: 1200,            
      in_house: false
    )

    match(
      type: 'appstore',
      git_basic_authorization: Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"),
      readonly: true,
      keychain_name: keychain_name,
      keychain_password: keychain_password,
      api_key: api_key
    )

    gym(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )

    pilot(
      apple_id: "#{DEVELOPER_APP_ID}",
      app_identifier: "#{DEVELOPER_APP_IDENTIFIER}",
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )

    delete_temp_keychain(keychain_name)
  end
  lane :submit_review do
    version = ''
    Dir.chdir("..") do
      file = File.read("package.json")
      data = JSON.parse(file)
      version = data["version"]
    end
    deliver(
      app_version: version,
      submit_for_review: true,
      automatic_release: true,
      force: true, # Skip HTMl report verification
      skip_metadata: false,
      skip_screenshots: false,
      skip_binary_upload: true
    )
  end
end
```

Archivo de aplicación
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## **Configurar coincidencia Fastlane**

Fastlane [match](https://docsfastlanetools/actions/match/) es un nuevo enfoque para la firma de código de iOS. Fastlane Match facilita a los equipos la gestión de los certificados necesarios y los perfiles de aprovisionamiento para sus aplicaciones de iOS.

Cree un nuevo repositorio privado llamado "certificados", por ejemplo en su cuenta personal u organización de GitHub.

Inicialice la coincidencia Fastlane para su aplicación iOS

```shell
fastlane match init
```

Luego seleccione la opción n.° 1 (Almacenamiento Git)

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Asigne la URL del repositorio recién creado

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Ahora tiene dentro de la carpeta Fastlane un archivo llamado **_Matchfile_** y `_git_url_` debe configurarse en la URL HTTPS del repositorio de certificados. Opcionalmente, también puede usar SSH, pero requiere un paso diferente para ejecutarlo.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

A continuación, vamos a generar los certificados e ingresar tus credenciales cuando te lo soliciten con Fastlane Match.

Se le pedirá que ingrese una frase de contraseña. Recuérdela correctamente porque GitHub Actions la usará más adelante para descifrar su repositorio de certificados.

```
fastlane match appstore
```

Si todo ha ido bien deberías ver algo como esto:

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Si tuvo algún problema con GitHub y los permisos necesarios, tal vez esta [publicación](https://mediumcom/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) le ayude a generar tokens de autenticación para git

Los certificados generados y los perfiles de aprovisionamiento se cargan en los recursos del repositorio de certificados.

![Certificados de App Store Connect](/certificateswebp)


Por último, abra su "proyecto" en Xcode y actualice el perfil de aprovisionamiento para la configuración de lanzamiento de su aplicación.

![Certificados XCode](/xcode_certwebp)

## Algunas cosas a tener en cuenta 💡

## FÓSFORO

Para que CI/CD importe los certificados y los perfiles de aprovisionamiento, debe tener acceso al repositorio de certificados. Puede hacerlo generando un token de acceso personal (debe usarse antes) que tenga el alcance para acceder o leer repositorios privados.

En GitHub, vaya a **Configuración** → **Configuración de desarrollador** → **Tokens de acceso personal** → haga clic en `Generar nuevo token` → marque el alcance del `repo` → luego haga clic en `Generar token`

![Crear token de acceso personal](/personal_access_tokenwebp)

Tener una copia del token de acceso personal generado. Lo usará más adelante para la variable de entorno `GIT_TOKEN`

Luego reemplace su archivo de coincidencia generado en la carpeta Fastlane por 
Archivo de coincidencia
```ruby
CERTIFICATE_STORE_URL = ENV["CERTIFICATE_STORE_URL"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]
FASTLANE_APPLE_ID = ENV["FASTLANE_APPLE_ID"]

git_url(CERTIFICATE_STORE_URL)
storage_mode("git")
type("appstore")
git_basic_authorization(Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"))
username(FASTLANE_APPLE_ID)
```
GitHub Actions lo utilizará para importar los certificados y los perfiles de aprovisionamiento.
Y var se configurará en GitHub Secrets, en lugar de codificarlos en el archivo.


## **Procesamiento de compilación**

En GitHub Actions, **se te factura en función de los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, se necesitan entre 10 y 15 minutos antes de que se pueda procesar una compilación en App Store Connect.

Para proyectos privados, el costo estimado por construcción puede llegar hasta **$008/min x 15 minutos = $12**, o más, dependiendo de la configuración o las dependencias de su proyecto.Si comparte las mismas preocupaciones sobre los precios que yo tengo para los proyectos privados, puede mantener `skip_waiting_for_build_processing` en `true`.

¿Cuál es el truco? Debe actualizar manualmente el cumplimiento de su aplicación en App Store Connect después de que se haya procesado la compilación, para poder distribuirla a sus usuarios.

Este es solo un parámetro opcional para actualizar si desea ahorrar minutos de compilación para proyectos privados. Para proyectos gratuitos, esto no debería ser un problema en absoluto. Consulte [precios](https://githubcom/pricing/)


## 3\ Configurar acciones de GitHub

**Configurar secretos de GitHub**

¿Alguna vez te has preguntado de dónde vienen los valores de "ENV"? Bueno, ya no es un secreto, es el secreto de tu proyecto 🤦

![Establecer secretos de GitHub](/github_secetswebp)

1\ `APP_STORE_CONNECT_TEAM_ID`: el ID de tu equipo de App Store Connect si estás en varios equipos

2\ `DEVELOPER_APP_ID` ​​- en App Store Connect, vaya a la aplicación → **Información de la aplicación** → Desplácese hacia abajo hasta la sección `Información general` de su aplicación y busque `ID de Apple`

3\ `DEVELOPER_APP_IDENTIFIER`: el identificador del paquete de tu aplicación

4\ `DEVELOPER_PORTAL_TEAM_ID`: el ID de su equipo del Portal de desarrollador si está en varios equipos

5\ `FASTLANE_APPLE_ID`: el ID de Apple o el correo electrónico del desarrollador que utilizas para administrar la aplicación

6\ `GIT_USERNAME` & `GIT_TOKEN` - Su nombre de usuario de git y su token de acceso personal

7\ `MATCH_PASSWORD`: la frase de contraseña que asignó al inicializar la coincidencia se utilizará para descifrar los certificados y los perfiles de aprovisionamiento.

8\ `PROVISIONING_PROFILE_SPECIFIER` - `coincide con AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, por ejemplo, `coincide con AppStore comdomainblablademo`

9\ `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - asigne un usuario de llavero temporal y una contraseña para su flujo de trabajo

10\ `APPLE_KEY_ID` — Clave API de App Store Connect 🔺ID de clave

11\ `APPLE_ISSUER_ID` — Clave API de App Store Connect 🔺ID del emisor

12\ `APPLE_KEY_CONTENT` — Clave API de App Store Connect 🔺 Archivo de clave o contenido de clave de _p8_, [verifíquelo](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<!-- markdown-link-check-disable-siguiente-línea -->
13\ `CERTIFICATE_STORE_URL` — La URL del repositorio de tus claves de Match (por ejemplo: https://githubcom/***/fastlane_matchgit)

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
      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: 16
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
          ruby-version: 2.7.2
      - uses: maierj/fastlane-action@v2.3.0
        env:
          DEVELOPER_APP_IDENTIFIER: ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          DEVELOPER_APP_ID: ${{ secrets.DEVELOPER_APP_ID }}
          PROVISIONING_PROFILE_SPECIFIER: match AppStore ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          TEMP_KEYCHAIN_USER: ${{ secrets.TEMP_KEYCHAIN_USER }}
          TEMP_KEYCHAIN_PASSWORD: ${{ secrets.TEMP_KEYCHAIN_PASSWORD }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          CERTIFICATE_STORE_URL: https://github.com/${{ secrets.CERTIFICATE_STORE_REPO }}.git
          GIT_USERNAME: ${{ secrets.GIT_USERNAME }}
          GIT_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          FASTLANE_APPLE_ID: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_USERNAME: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          DEVELOPER_PORTAL_TEAM_ID: ${{ secrets.DEVELOPER_PORTAL_TEAM_ID }}
        with:
          lane: closed_beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 60
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

Imagina que tienes un repositorio privado, y has agotado los minutos del plan gratuito y no quieres pagar por nuevos lanzamientos, o tal vez prefieres enviar la solicitud manualmente

**_Vamos a por ello_**

Ok, primero necesitamos crear en la ruta **_my\_project\_path/fastlane_** un archivo llamado **_env,_** justo en la misma ruta que _Fastfile,_ para poder crear las mismas propiedades _secret_ que se encuentran en nuestro _GitHub, como se muestra a continuación:

archivo env para implementar desde la máquina local

Ahora, puede ir a la _terminal_ e iniciar _Fastlane_ desde su máquina:

```
fastlane closed_beta
```

> **❌ Esencial sobre el** _env_ **archivo, como preferimos no exponer estos datos, debemos agregarlos en nuestro** _gitignore_**, algo así: ❌**

```
fastlane/*.env
```

Debería funcionar igual que ocurre desde GitHub Actions en la máquina remota pero en nuestra máquina local 🍻

![Ejecución local de Fastlane](/local_fastlanewebp)

Ejecución de terminal: $ Fastlane cerrado\_beta

**_Si has llegado hasta aquí, enhorabuena, ahora tienes un proceso totalmente automatizado para tus aplicaciones de iOS con Fastlane y GitHub Actions_**

> Cada vez que envíe una nueva confirmación, se creará una versión en la consola Google Play, canal beta
Mejoraré este blog con tus comentarios, si tienes alguna pregunta o sugerencia, házmelo saber al correo electrónico martin@capgoapp.

### Construye en tu dispositivo

Si aún necesita compilar en su dispositivo, debe agregarlos manualmente al aprovisionamiento
Conecte su dispositivo a su mac y abra el menú del dispositivo
![buscar menú ios del dispositivo](/find_ios_devicewebp)
Luego copia tu identificador 
![buscar identificador ios](/find_ios_identifierwebp)
Y luego inicie el comando:
`fastlane registro_nuevo_dispositivo`
Le pedirá que establezca un nombre de dispositivo y el identificador:
![establecer identificador ios](/set_identifierwebp)

### si tienes problemas

Si tiene problemas con el dispositivo de desarrollo que no puede realizar pruebas, etc., eso generalmente lo soluciona

Hay un comando mágico que puede salvarte:
```shell
fastlane match nuke development
fastlane match development
```

Entonces :
Limpie el proyecto manteniendo presionada la tecla Mayús(⇧)+Comando(⌘)+K o seleccionando Producto > Limpiar (puede estar etiquetado como "Limpiar carpeta de compilación")

Luego intenta ejecutar nuevamente la aplicación en tu dispositivo.

### Gracias

Este blog está basado en los siguientes artículos:
- [Entrega continua para IOS usando acciones Fastlane y GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentación de Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)