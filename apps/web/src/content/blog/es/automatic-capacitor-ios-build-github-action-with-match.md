---
slug: automatic-capacitor-ios-build-github-action-with-match
title: Construcción automática de Capacitor IOS con GitHub actions usando match
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación IOS Ionic usando fastlane
  y GitHub Actions en 5 minutos (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustración de la acción de GitHub para testflight en fastlane
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-github-action
---
# Compilaciones automáticas de iOS con GitHub Actions usando Match

La configuración de CI/CD para aplicaciones Capacitor puede ser compleja y llevar tiempo. Esto es lo que necesitas saber:

## Prerrequisitos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitHub con acceso de administrador
- Membresía del programa de desarrollador de iOS
- Acceso a la API de App Store Connect con los permisos adecuados
- Comprensión de los flujos de trabajo de GitHub Actions
- Conocimiento de la configuración de Fastlane y Match
- Tiempo para mantener y depurar el pipeline
- Un equipo de varios desarrolladores, de lo contrario recomendamos usar [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) para flujos de trabajo más simples

## Configuración Profesional de CI/CD por Capgo

Salta la complejidad. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura tu pipeline CI/CD directamente en tu plataforma preferida:

- **Independencia de Plataforma**: Funciona con GitHub Actions, GitLab CI u otros
- **Integración Perfecta**: No necesitas cambiar de plataforma, funciona con tu proceso actual
- **Configuración Personalizada**: Configuración adaptada a las necesidades de tu proyecto
- **Guía Experta**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa única de configuración: $2,600
- Tus costos operativos: ~$300/año
- Comparado con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configura CI/CD Ahora](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guía de Configuración Manual

Si aún deseas configurar todo por tu cuenta, esto es lo que necesitas hacer:

## Entrega Continua para iOS usando Fastlane y GitHub Actions con match

## Prerrequisitos

Antes de continuar con el tutorial...

-   Asegúrate de tener Fastlane [instalado](https://docs.fastlane.tools/) en tu máquina de desarrollo.
-   Membresía del programa de desarrollador de iOS.
-   Ganas de leer 😆...
-   Un equipo de varios desarrolladores, de lo contrario recomendamos usar [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) para flujos de trabajo más simples.

## Importante sobre el precio

![Price GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

El servicio es 'gratuito' hasta el límite, dependiendo de la máquina elegida.  
Vamos a usar una máquina **_macOS_**, puedes ver en la captura su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de los requisitos y precios, si te parece, continuamos..._**

> **_📣_ En la publicación asumimos que tenemos la app creada en iTunes connect, tenemos los certificados del ecosistema Apple, ¡todo será copiado por Fastlane!**

## ¡Empecemos! 🤿 

**Pasos a seguir en la publicación**

1.  _Usando la API de App Store Connect con Fastlane Match_
2.  _Requisitos_
3.  _Creando una Clave API de App Store Connect_
4.  _Usando una Clave API de App Store Connect_
5.  _Copiar archivos de Fastlane_
6.  _Configurar Fastlane match_

## 1. Usando la API de App Store Connect con Fastlane Match

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu Apple ID ayuda a asegurar que seas la única persona que pueda acceder a tu cuenta.  
> De [Apple Support](https://developer.apple.com/support/authentication/)

> Comenzar con match requiere que revoques tus certificados existentes. Pero no te preocupes, tendrás el nuevo directamente.

## Requisitos

Para poder usar la API de App Store Connect, Fastlane necesita **tres** cosas.

1. ID del emisor.
2. ID de la clave.
3. Archivo de clave o contenido de la clave.

## Creando una Clave API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo y seguir las siguientes instrucciones.

1. Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/).

2. Selecciona [Usuarios y Acceso](https://appstoreconnect.apple.com/access/users/).

![App Store Connect acceso de usuario](/select_user_access.webp)

3. Selecciona la pestaña Integración.

![App Store Connect API Integración](/user_access_keys.webp)

4. Haz clic en Generar Clave API o el botón Agregar (+).

![App Store Connect API crear claves](/user_access.webp)

5. Ingresa un nombre para la clave. El nombre es solo para tu referencia y no es parte de la clave en sí.

![App Store Connect API crear nombre de claves](/gen_key.webp)

6. En Acceso, selecciona el rol para la clave. Los roles que se aplican a las claves son los mismos roles que se aplican a los usuarios en tu equipo. Ver [permisos de roles](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Recomendamos seleccionar **App manager**.

7. Haz clic en Generar.

> **El acceso de una clave API no puede limitarse a aplicaciones específicas.**

El nombre de la nueva clave, ID de clave, un enlace de descarga y otra información aparecen en la página.

![App Store Connect descargar claves](/download_key.webp)

Puedes obtener las tres informaciones necesarias aquí.  
<1> ID del emisor.  
<2> ID de la clave.  
<3> Haz clic en "Descargar Clave API" para descargar tu clave privada. El enlace de descarga aparece solo si la clave privada aún no se ha descargado. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, almacenarlas en un repositorio de código o incluirlas en código del lado del cliente.

## Usando una Clave API de App Store Connect

El archivo de Clave API (archivo p8 que descargas), el ID de clave y el ID del emisor son necesarios para crear el token JWT para la autorización. Hay múltiples formas en que esta información puede ingresarse en Fastlane usando la nueva acción de Fastlane, `app_store_connect_api_key`. Puedes aprender otras formas en la [documentación de Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Muestro este método porque creo que es la forma más fácil de trabajar con la mayoría de los CI disponibles, donde puedes establecer variables de entorno.

_¡Ahora podemos gestionar Fastlane con la clave API de App Store Connect, genial!_

## 2. Copiar archivos de Fastlane

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "lanes" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías usando Android studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.

Crea una carpeta Fastlane en la raíz de tu proyecto y copia los siguientes archivos:
Fastfile
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

Appfile
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## **Configurar Fastlane match**

Fastlane [match](https://docs.fastlane.tools/actions/match/) es un nuevo enfoque para la firma de código de iOS. Fastlane match facilita a los equipos la gestión de los certificados y perfiles de aprovisionamiento requeridos para tus aplicaciones iOS.

Crea un nuevo repositorio privado llamado `certificates`, por ejemplo en tu cuenta personal de GitHub o organización.

Inicializa Fastlane match para tu aplicación iOS.

```shell
fastlane match init
```

Luego selecciona la opción #1 (Almacenamiento Git).

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Asigna la URL del repositorio recién creado.

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Ahora tienes dentro de la carpeta Fastlane un archivo llamado **_Matchfile_** y `_git_url_` debe establecerse en la URL HTTPS del repositorio de certificados. Opcionalmente, también puedes usar SSH, pero requiere un paso diferente para ejecutar.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

A continuación, procedemos a generar los certificados e ingresar tus credenciales cuando se te solicite con Fastlane Match.

Se te pedirá que ingreses una frase de contraseña. Recuérdala correctamente porque será utilizada más tarde por GitHub Actions para descifrar tu repositorio de certificados.

```
fastlane match appstore
```

Si todo salió bien, deberías ver algo como esto:

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Si experimentaste algún problema con GitHub y los permisos necesarios, tal vez esta [publicación](https://medium.com/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) te ayude a generar tokens de autenticación para git.

Los certificados y perfiles de aprovisionamiento generados se suben a los recursos del repositorio de certificados

![Certificados de App Store Connect](/certificates.webp)

Por último, abre tu `proyecto` en Xcode y actualiza el perfil de aprovisionamiento para la configuración de lanzamiento de tu aplicación.

![Certificados de XCode](/xcode_cert.webp)

## Algunas cosas a tener en cuenta 💡

## MATCH

Para que el CI/CD importe los certificados y perfiles de aprovisionamiento, necesita tener acceso al repositorio de certificados. Puedes hacer esto generando un token de acceso personal (debe usarse antes) que tenga el alcance para acceder o leer repositorios privados.

En GitHub, ve a **Settings** → **Developer Settings** → **Personal access tokens** → haz clic en `Generate New Token` → marca el alcance `repo` → luego haz clic en `Generate token`.

![Crear token de acceso personal](/personal_access_token.webp)

Ten una copia del token de acceso personal generado. Lo usarás más tarde para la variable de entorno `GIT_TOKEN`.

Luego reemplaza tu archivo match generado en la carpeta Fastlane por 
Matchfile
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
Esto será utilizado por GitHub Actions para importar los certificados y perfiles de aprovisionamiento.
Y las variables se establecerán en GitHub Secrets, en lugar de codificarlas directamente en el archivo.

## **Procesamiento de Build**

En GitHub Actions, **se te cobra según los minutos** que hayas usado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 10-15 minutos antes de que una build pueda ser procesada en App Store Connect.

Para proyectos privados, el costo estimado por build puede llegar hasta **$0.08/min x 15 mins = $1.2**, o más, dependiendo de la configuración o dependencias de tu proyecto.

Si compartes las mismas preocupaciones sobre el precio como yo para proyectos privados, puedes mantener `skip_waiting_for_build_processing` en `true`.

¿Cuál es el inconveniente? Tendrás que actualizar manualmente el cumplimiento de tu aplicación en App Store Connect después de que la build haya sido procesada, para poder distribuir la build a tus usuarios.

Este es solo un parámetro opcional para actualizar si deseas ahorrar en los minutos de build para proyectos privados. Para proyectos gratuitos, esto no debería ser un problema en absoluto. Ver [precios](https://github.com/pricing/).

## 3\. Configurar GitHub Actions

**Configurar secretos de GitHub**

¿Te has preguntado de dónde vienen los valores de `ENV`? Bueno, ya no es un secreto - provienen de los secretos de tu proyecto. 🤦

![Establecer secretos de GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - el ID de tu equipo de App Store Connect si estás en múltiples equipos.

2. `DEVELOPER_APP_ID` - en App Store Connect, ve a la app → **App Information** → Desplázate hacia abajo hasta la sección `General Information` de tu app y busca `Apple ID`.

3. `DEVELOPER_APP_IDENTIFIER` - el identificador del paquete de tu app.

4. `DEVELOPER_PORTAL_TEAM_ID` - el ID de tu equipo del Portal de Desarrollador si estás en múltiples equipos.

5. `FASTLANE_APPLE_ID` - el Apple ID o email de desarrollador que usas para gestionar la app.

6. `GIT_USERNAME` & `GIT_TOKEN` - Tu nombre de usuario de git y tu token de acceso personal.

7. `MATCH_PASSWORD` - la frase de contraseña que asignaste al inicializar match, se usará para descifrar los certificados y perfiles de aprovisionamiento.

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_CERTIFICATES_REPO_URL>`, ej. `match AppStore com.domain.blabla.demo`.

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - asigna un usuario y contraseña temporal de keychain para tu workflow.

10. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID.

11. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID.

12. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 Archivo de clave o contenido de clave de _.p8_, [revísalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<YOUR_APP_BUNDLE_IDENTIFIER>
13. `CERTIFICATE_STORE_URL` — La url del repositorio de tus claves Match (ej: https://github.com/***/fastlane_match.git)

## **4. Configurar archivo de workflow de GitHub**

Crea un directorio de workflow de GitHub.

```
cd .github/workflows
```

Dentro de la carpeta `workflow`, crea un archivo llamado `build-upload-ios.yml` y agrega lo siguiente.

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
      - uses: actions/checkout@v6
      - name: Use Node.js 16
        uses: actions/setup-node@v6
        with:
          node-version: '24'
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

Este workflow debe activarse después de cada _tag_ de GitHub, si necesitas automatizar el tag por favor, consulta primero [Compilación y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/).

Luego este workflow extraerá tus dependencias de NodeJS, las instalará y compilará tu aplicación JavaScript.

> Cada vez que envíes un nuevo commit, se construirá un release en TestFlight.

Tu App no necesita usar Ionic, solo la base de Capacitor es obligatoria, puede tener módulos antiguos de Cordova, pero se deben preferir los plugins de Capacitor JS.

## 5. Activar workflow

**Crear un Commit**

Haz un _commit_, deberías ver el workflow activo en el repositorio.

**Activar el workflow**

Empuja los nuevos commits a la rama `main` o `developement` para activar el workflow.

![Iniciado con commit](/cd_started.webp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect.

![Panel de Testflight](/testflight_app.webp)

## ¿Puedo desplegar desde la máquina local?

Sí, puedes, y es muy sencillo.

Imagina que tienes un repositorio privado, y has agotado los minutos del plan gratuito y no quieres pagar por nuevos lanzamientos, o tal vez prefieres enviar la aplicación manualmente.

**_Vamos a ello_**

Ok, primero necesitamos crear en la ruta _my_project_path/fastlane_ un archivo llamado **_.env,_** justo en la misma ruta que _Fastfile,_ para poder crear las mismas propiedades _secret_ encontradas en nuestro _GitHub,_ como se muestra a continuación:

archivo .env para desplegar desde máquina local

Ahora, puedes ir a la _terminal_ y lanzar _Fastlane_ desde tu máquina:

```
fastlane closed_beta
```

> **❌ Esencial sobre el archivo** _.env_ **, como preferimos no exponer estos datos, debemos agregarlo en nuestro** _.gitignore_**, algo así: ❌**

```
fastlane/*.env
```

Debería funcionar igual que cuando se ejecuta desde GitHub Actions en la máquina remota pero en nuestra máquina local. 🍻

![Ejecución local de Fastlane](/local_fastlane.webp)

Ejecución en terminal: $ Fastlane closed_beta

**_Si has llegado hasta aquí, mis felicitaciones, ahora tienes un proceso completamente automatizado para tus aplicaciones iOS con Fastlane y GitHub Actions._**

> Cada vez que envíes un nuevo commit, se construirá una versión en la consola de Google Play, canal beta.
Mejoraré este blog con tus comentarios, si tienes alguna pregunta o sugerencia, házmelo saber por correo electrónico martin@capgo.app

### Construir en tu dispositivo

Si aún necesitas construir en tu dispositivo, necesitas agregarlos manualmente al aprovisionamiento.
Conecta tu dispositivo a tu mac y abre el menú de dispositivos
![find devic ios menu](/find_ios_device.webp)
Luego copia tu identificador
![find identifier ios](/find_ios_identifier.webp)
Y luego inicia el comando:
`fastlane register_new_device`
te pedirá que establezcas un nombre de dispositivo y el identificador:
![set identifier ios](/set_identifier.webp)

### si tienes problemas

Si tienes problemas con el dispositivo de desarrollo que no puede probar, etc., esto generalmente lo soluciona.

Hay un comando mágico que puede salvarte:
```shell
fastlane match nuke development
fastlane match development
```

Luego:
Limpia el proyecto manteniendo presionado Shift(⇧)+Command(⌘)+K o seleccionando Producto > Limpiar (puede estar etiquetado como "Limpiar carpeta de construcción")

Luego intenta ejecutar nuevamente la aplicación en tu dispositivo.

### Gracias

Este blog está basado en los siguientes artículos:
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docs.fastlane.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
