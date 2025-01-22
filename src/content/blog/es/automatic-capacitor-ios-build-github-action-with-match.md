---
slug: es__automatic-capacitor-ios-build-github-action-with-match
title: Compilación automática de Capacitor iOS con GitHub Actions utilizando match
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación iOS Ionic con fastlane y
  GitHub Actions en 5 minutos (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustración de la Acción de GitHub para Fastlane TestFlight
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-github-action
---

## Entrega Continua para iOS usando Fastlane y GitHub Actions con match

## Prerrequisitos

Antes de continuar con el tutorial...

- Asegúrate de tener Fastlane [instalado](https://docs.fastlane.tools/) en tu máquina de desarrollo
- Membresía del programa de desarrolladores de iOS
- Ganas de leer 😆...
- Un equipo de varios desarrolladores, de lo contrario recomendamos usar [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) para flujos de trabajo más simples

## Importante sobre el precio

![Precio GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

El servicio es 'gratuito' hasta cierto límite, dependiendo de la máquina elegida.
Vamos a usar una máquina **_macOS_**, puedes ver en la captura su precio y límites (precios al momento de crear el tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos los requisitos y precios, si te parece, continuamos..._**

> **_📣_ En la publicación asumimos que tenemos la app creada en iTunes Connect, que tenemos los certificados del ecosistema de Apple, ¡todo será copiado por Fastlane!**

## Vamos al lío 🧑🏽‍💻

**Pasos a seguir en la publicación**

1. _Uso de la API de App Store Connect con Fastlane Match_
2. _Requisitos_
3. _Creación de una clave de API de App Store Connect_
4. _Uso de una clave de API de App Store Connect_
5. _Copiar archivos de Fastlane_
6. _Configurar Fastlane match_

## 1. Uso de la API de App Store Connect con Fastlane Match

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu Apple ID ayuda a garantizar que solo tú puedas acceder a tu cuenta.
> De [Soporte de Apple](https://developer.apple.com/support/authentication/)

> Comenzar con match requiere que revoques tus certificados existentes. Pero no te preocupes, tendrás el nuevo directamente.

## Requisitos

Para poder usar la API de App Store Connect, Fastlane necesita **tres** cosas:

1. ID del emisor
2. ID de la clave
3. Archivo de clave o contenido de la clave

## Creación de una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo y seguir las siguientes instrucciones:

1 — Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/)

2 — Selecciona [Usuarios y Acceso](https://appstoreconnect.apple.com/access/users/)

![Acceso de usuario de App Store Connect](/select_user_access.webp)

3 — Selecciona la pestaña Claves API

![Claves API de App Store Connect](/user_access_keys.webp)

4 — Haz clic en Generar clave API o en el botón Agregar (+)

![Crear claves API de App Store Connect](/user_access.webp)

5 — Ingresa un nombre para la clave. El nombre es solo para tu referencia y no es parte de la clave en sí.

![Crear nombre de claves API de App Store Connect](/gen_key.webp)

6 — En Acceso, selecciona el rol para la clave. Los roles que se aplican a las claves son los mismos roles que se aplican a los usuarios de tu equipo. Consulta [permisos de roles](https://help.apple.com/app-store-connect/#/deve5f9a89d7/)

7 — Haz clic en Generar

> **El acceso de una clave API no se puede limitar a aplicaciones específicas**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página.

![Descargar claves de App Store Connect](/download_key.webp)

Puedes obtener las tres informaciones necesarias aquí:
- ID del emisor
- ID de la clave
- Haz clic en "Descargar clave API" para descargar tu clave privada API. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenarlas en un repositorio de código o incluirlas en código del lado del cliente.

## Uso de una clave de API de App Store Connect

El archivo de clave API (archivo p8 que descargas), el ID de la clave y el ID del emisor son necesarios para crear el token JWT para la autorización.Hay varias formas en las que estas piezas de información pueden ingresarse en Fastlane usando la nueva acción de Fastlane, `app_store_connect_api_key`. Puedes aprender otras formas en la documentación de Fastlane. Muestro este método porque creo que es la forma más fácil de trabajar con la mayoría de los CI existentes, donde puedes establecer variables de entorno.

_Ahora podemos gestionar Fastlane con la clave API de App Store Connect, ¡genial!_

## 2. Copiar archivos de Fastlane

Fastlane es una biblioteca de Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "lanes" personalizadas que agrupan una serie de "acciones" que realizan tareas que normalmente harías usando Android Studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.

Crea una carpeta Fastlane en la raíz de tu proyecto y copia los siguientes archivos:

## Configurar Fastlane match

Fastlane match es un nuevo enfoque para la firma de código de iOS. Fastlane match facilita a los equipos la gestión de los certificados y perfiles de aprovisionamiento necesarios para tus aplicaciones iOS.

Crea un nuevo repositorio privado llamado `certificates`, por ejemplo en tu cuenta personal de GitHub o en tu organización.

Inicializa Fastlane match para tu aplicación iOS

Luego selecciona la opción #1 (Almacenamiento Git)

Asigna la URL del repositorio recién creado

> Ahora tienes dentro de la carpeta Fastlane un archivo llamado **_Matchfile_** y `_git_url_` debe estar configurado con la URL HTTPS del repositorio de certificados. Opcionalmente, también puedes usar SSH, pero requiere un paso diferente para ejecutar.

A continuación, generamos los certificados e ingresamos tus credenciales cuando se te solicite con Fastlane Match.

Se te pedirá que ingreses una frase de contraseña. Recuérdala correctamente porque será utilizada más tarde por GitHub Actions para descifrar tu repositorio de certificados.

Si todo salió bien, deberías ver algo como esto:

> Si experimentaste algún problema con GitHub y los permisos necesarios, tal vez esta publicación te ayude a generar tokens de autenticación para git.

Los certificados y perfiles de aprovisionamiento generados se suben a los recursos del repositorio de certificados.

Por último, abre tu `proyecto` en Xcode y actualiza el perfil de aprovisionamiento para la configuración de lanzamiento de tu aplicación.

## Algunas cosas a tener en cuenta 💡

## MATCH

Para que el CI/CD importe los certificados y perfiles de aprovisionamiento, necesita tener acceso al repositorio de certificados. Puedes hacer esto generando un token de acceso personal (debe usarse antes) que tenga el alcance para acceder o leer repositorios privados.

En GitHub, ve a **Configuración** → **Configuración de desarrollador** → **Tokens de acceso personal** → haz clic en `Generar nuevo token` → marca el alcance `repo` → luego haz clic en `Generar token`.

Ten una copia del token de acceso personal generado. Lo usarás más tarde para la variable de entorno `GIT_TOKEN`.

Luego reemplaza tu archivo match generado en la carpeta Fastlane por 
Matchfile

Esto será utilizado por GitHub Actions para importar los certificados y perfiles de aprovisionamiento.
Y las variables se establecerán en los Secretos de GitHub, en lugar de codificarlas directamente en el archivo.

## Procesamiento de construcción

En GitHub Actions, **se te factura en base a los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 10-15 minutos antes de que una construcción pueda ser procesada en App Store Connect.

Para proyectos privados, el costo estimado por construcción puede llegar hasta **$0.08/min x 15 mins = $1.2**, o más, dependiendo de la configuración o dependencias de tu proyecto.Si compartes las mismas preocupaciones sobre el precio que yo para proyectos privados, puedes mantener el `skip_waiting_for_build_processing` en `true`

¿Cuál es el inconveniente? Tienes que actualizar manualmente el cumplimiento de tu aplicación en App Store Connect después de que se haya procesado la compilación, para poder distribuirla a tus usuarios

Este es solo un parámetro opcional para actualizar si quieres ahorrar en los minutos de compilación para proyectos privados. Para proyectos gratuitos, esto no debería ser un problema en absoluto. Consulta [precios](https://githubcom/pricing/)

## 3. Configurar GitHub Actions

**Configurar secretos de GitHub**

¿Alguna vez te has preguntado de dónde vienen los valores de `ENV`? Bueno, ya no es un secreto - provienen de los secretos de tu proyecto 🤦

![Establecer secretos de GitHub](/github_secetswebp)

1. `APP_STORE_CONNECT_TEAM_ID` - el ID de tu equipo de App Store Connect si estás en varios equipos

2. `DEVELOPER_APP_ID` - en App Store Connect, ve a la aplicación → **Información de la aplicación** → Desplázate hacia abajo hasta la sección `Información general` de tu aplicación y busca `Apple ID`

3. `DEVELOPER_APP_IDENTIFIER` - el identificador de paquete de tu aplicación

4. `DEVELOPER_PORTAL_TEAM_ID` - el ID de tu equipo del Portal de Desarrolladores si estás en varios equipos

5. `FASTLANE_APPLE_ID` - el Apple ID o correo electrónico de desarrollador que utilizas para gestionar la aplicación

6. `GIT_USERNAME` y `GIT_TOKEN` - Tu nombre de usuario de git y tu token de acceso personal

7. `MATCH_PASSWORD` - la frase de contraseña que asignaste al inicializar match, se utilizará para descifrar los certificados y perfiles de aprovisionamiento

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, por ejemplo `match AppStore comdomainblablademo`

9. `TEMP_KEYCHAIN_USER` y `TEMP_KEYCHAIN_PASSWORD` - asigna un usuario y contraseña de llavero temporal para tu flujo de trabajo

10. `APPLE_KEY_ID` — ID de clave de API de App Store Connect 🔺

11. `APPLE_ISSUER_ID` — ID de emisor de API de App Store Connect 🔺

12. `APPLE_KEY_CONTENT` — Contenido de la clave de API de App Store Connect 🔺 Archivo de clave o contenido de clave de _p8_, [revísalo](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — La URL del repositorio de tus claves de Match (ej: https://githubcom/***/fastlane_matchgit)

## **4. Configurar archivo de flujo de trabajo de GitHub**

Crea un directorio de flujo de trabajo de GitHub

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

Dentro de la carpeta `workflow`, crea un archivo llamado `build-upload-iosyml` y añade lo siguiente

```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

Este flujo de trabajo debería activarse después de cada _etiqueta_ de GitHub, si necesitas automatizar la etiqueta, consulta primero [Compilación y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/)

Luego, este flujo de trabajo extraerá tus dependencias de NodeJS, las instalará y compilará tu aplicación JavaScript

> Cada vez que envíes un nuevo commit, se construirá una versión en TestFlight

Tu aplicación no necesita usar Ionic, solo es obligatoria la base de Capacitor, puede tener módulos antiguos de Cordova, pero se deben preferir los plugins JS de Capacitor

## 5. Activar flujo de trabajo

**Crear un Commit**

Haz un _commit_, deberías ver el flujo de trabajo activo en el repositorio

**Activar el flujo de trabajo**

Empuja los nuevos commits a la rama `main` o `developement` para activar el flujo de trabajo

![Iniciado con commit](/cd_startedwebp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect

![Panel de Testflight](/testflight_appwebp)

## ¿Se puede desplegar desde una máquina local?

Sí, puedes hacerlo, y es muy sencillo

Imagina que tienes un repositorio privado, y has agotado los minutos del plan gratuito y no quieres pagar por nuevas versiones, o tal vez prefieres enviar la aplicación manualmente

**_Vamos a por ello_**

Bien, primero necesitamos crear en la ruta **_mi\_ruta\_del\_proyecto/fastlane_** un archivo llamado **_env,_** justo en la misma ruta que _Fastfile,_ para poder crear las mismas propiedades _secretas_ que se encuentran en nuestro _GitHub,_ como se muestra a continuación:

archivo env para despliegue desde máquina local

Ahora, puedes ir a la _terminal_ y lanzar _Fastlane_ desde tu máquina:

```shell
fastlane match init
```

> **❌ Esencial sobre el**archivo env_, **ya que preferimos no exponer estos datos, debemos agregarlo a nuestro** _gitignore_**, algo así: ❌**

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Debería funcionar igual que sucede desde GitHub Actions en la máquina remota pero en nuestra máquina local 🍻

![Ejecución local de Fastlane](/local_fastlanewebp)

Ejecución en terminal: $ Fastlane closed\_beta

**_Si has llegado hasta aquí, mis felicitaciones, ahora tienes un proceso completamente automatizado para tus aplicaciones iOS con Fastlane y GitHub Actions_**

> Cada vez que envíes un nuevo commit, se construirá una versión en la consola de Google Play, canal beta
Mejoraré este blog con tus comentarios, si tienes alguna pregunta o sugerencia, házmelo saber por correo electrónico martin@capgoapp

### Construir en tu dispositivo

Si aún necesitas construir en tu dispositivo, debes agregarlos manualmente al aprovisionamiento
Conecta tu dispositivo a tu mac y abre el menú de dispositivos
![encontrar menú de dispositivos ios](/find_ios_devicewebp)
Luego copia tu identificador 
![encontrar identificador ios](/find_ios_identifierwebp)
Y luego inicia el comando:
`fastlane register_new_device`
te pedirá que establezcas un nombre de dispositivo y el identificador:
![establecer identificador ios](/set_identifierwebp)

### si tienes problemas

Si tienes problemas con el dispositivo de desarrollo que no puede probar, etc., esto generalmente lo soluciona

Hay un comando mágico que puede salvarte:
```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

Luego:
Limpia el proyecto manteniendo presionado Shift(⇧)+Comando(⌘)+K o seleccionando Producto > Limpiar (puede estar etiquetado como "Limpiar carpeta de compilación")

Luego intenta ejecutar nuevamente la aplicación en tu dispositivo

### Gracias

Este blog se basa en los siguientes artículos:
- [Entrega continua para iOS usando Fastlane y GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentación de Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)