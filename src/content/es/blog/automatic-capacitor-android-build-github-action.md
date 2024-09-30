---
slug: automatic-capacitor-android-build-github-action
title: Construcción de condensador automático de Android con acciones GitHub
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación Android Ionic como ayuda
  de Fastlane y acciones GitHub en 5 minutos (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google play GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-ios-build-github-action
locale: es
---

## Entrega continua para Android usando Fastlane y GitHub Actions

## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrate de usar GitHub
- Tu aplicación ya está implementada en la tienda Google Play.
- Ganas de leer 😆…

## Importante sobre el precio

![Precio Acción GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es '_gratuito'_ hasta el límite, dependiendo de la máquina elegida  
Vamos a utilizar una máquina **_Linux_**, podéis ver en la captura de pantalla su precio y límites (precios a la fecha de creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez avisado de requisitos y precios, si quieres seguimos_**

> **_📣_ En el post asumimos que tenemos la app creada en Google Play, sí tenemos la clave de firma del ecosistema de Google**

##Vamos al lío 🧑🏽💻

**Pasos a seguir en el post**

1 _Copiar archivos Fastline_
2 _Almacenar tus secretos en secretos cifrados de GitHub_
3 _Creación y almacenamiento de la clave de cuenta del servicio Google Play_
4 _Almacenamiento de su clave de firma de Android_
5 _Configura tu archivo yml de flujo de trabajo de GitHub Actions_

## 1\ Copiar archivos Fastline

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías usando Android Studio. Puedes hacer mucho con Fastlane. pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.


Cree una carpeta Fastlane en la raíz de su proyecto y copie los siguientes archivos:
carril rápido
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

## Almacenar tus secretos en secretos cifrados de GitHub

Para autenticarnos con la API de desarrollador de Google Play, necesitaremos una clave de cuenta de servicio. El archivo de clave de cuenta de servicio se considera confidencial, lo que significa que necesitaremos almacenarlo de forma segura, pero en un lugar donde nuestras acciones de GitHub puedan acceder a él. flujos de trabajo y nuestro Fastfile cuando sea necesario Ingrese los secretos cifrados de GitHub: almacenaremos todas nuestras claves confidenciales en secretos del repositorio, manteniéndolas de forma segura y al mismo tiempo haciéndolas accesibles automáticamente para los flujos de trabajo de GitHub Actions en el repositorio.

### Creación y almacenamiento de la clave de cuenta del servicio Google Play

Si necesita crear una nueva clave de cuenta de servicio, [siga los pasos descritos aquí](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup) Si tiene el archivo JSON de la clave de su cuenta de servicio, agreguémoslo a los secretos cifrados de su repositorio de GitHub.

Para agregar un nuevo secreto a los secretos cifrados de GitHub, primero navegue hasta el repositorio de Android al que agregará el flujo de trabajo de GitHub Actions. En el extremo derecho, haga clic en "Configuración".

![Configuración en el repositorio de GitHub](/github_project_settingswebp)

Luego, haga clic en "Secretos", 

![Secretos en el repositorio de GitHub, desde Configuración](/github_project_settings_secretswebp)

luego "Acciones" de la lista en el menú de la izquierda

![Acciones bajo Secretos en el repositorio de GitHub](/github_project_settings_secrets_actionswebp)

Estas son las variables de entorno secretas cifradas para el repositorio. Cualquier flujo de trabajo configurado en el repositorio tendrá acceso a estos secretos del repositorio.

Desde aquí, haga clic en "Nuevo secreto del repositorio" para agregar un nuevo secreto:

![Nueva acción secreta del repositorio en GitHub](/github_project_settings_secrets_actions_newwebp)

Al hacer clic en "Nuevo secreto de repositorio", verá un formulario que le pedirá que ingrese un nombre para su nuevo secreto y su valor.

![Agregando nombre y valor para nuevo secreto en GitHub](/github_project_settings_secrets_actions_new_addwebp)

Los secretos de GitHub solo aceptan valores de cadena, por lo que para ciertas credenciales (cualquier archivo jks o json, por ejemplo), primero deberá convertir el archivo a una cadena codificada en base64 antes de agregarlo a los secretos de GitHub. Puede hacerlo desde la línea de comando :

```
base64 in_file_path | pbcopy
```

Esto copia la cadena resultante en su portapapeles, para que pueda pegarla directamente en un nuevo secreto del repositorio en GitHub.Por ejemplo:

```
base64 service_account_key.json | pbcopy
```

Creemos un nuevo secreto de repositorio de la siguiente manera:

- PLAY_CONFIG_JSON: la clave JSON de la cuenta de servicio codificada en base64

_Tenga en cuenta que debe almacenar una copia de seguridad de sus secretos de forma segura en otra ubicación (en algún lugar que no sea secretos cifrados de GitHub), ya que no podrá exportar ni acceder a las credenciales nuevamente desde GitHub después de haberlas agregado_

Con nuestra clave de cuenta de servicio agregada a los secretos del repositorio de GitHub, ahora podemos autenticarnos con la API de desarrollador de Google Play desde cualquier flujo de trabajo de GitHub Actions agregado al repositorio.

![Nuevo secreto agregado exitosamente en GitHub](/github_project_settings_secrets_addedwebp)

### Almacenamiento de su clave de firma de Android

Para [firmar correctamente las versiones de Android](https://developerandroidcom/studio/publish/app-signing/) en CI, el flujo de trabajo necesitará acceso a una clave de carga de Android o a una clave de firma de aplicaciones. Las aplicaciones creadas después de agosto de 2021 usarán El nuevo sistema [Play App Signing](https://developerandroidcom/studio/publish/app-signing/#app-signing-google-play/) de Google de forma predeterminada, en el que se utiliza una clave de carga administrada por el usuario para firmar AAB antes. cargar, pero Google administra la clave de firma de la aplicación. Si su equipo utiliza la firma de aplicaciones Play de Google, entonces todo lo que necesitará para la canalización de CI es la _clave de carga_ de su aplicación, ya que la firma se difiere hasta después de que se haya completado la AAB. subido a Play Console. Si aún necesita crear una clave de carga y un almacén de claves, siga las [instrucciones](https://developerandroidcom/studio/publish/app-signing/#generate-key/) que se encuentran en la documentación para desarrolladores de Android.

Si su equipo aún no ha migrado al sistema de firma de aplicaciones Play de Google, deberá poner la clave de _firma_ de su aplicación a disposición del flujo de trabajo de CI para firmar correctamente su aplicación antes de cargarla.

Agregue lo siguiente como secretos del repositorio:


- ANDROID_KEYSTORE_FILE: el archivo `jks` o `keystore` codificado en base64 que se utiliza para firmar tus compilaciones de Android. Este será el archivo de almacén de claves asociado con tu clave de carga (si usas Play App Signing) o tu clave de firma de aplicaciones.
- KEYSTORE_KEY_PASSWORD: la contraseña asociada con el archivo del almacén de claves
- KEYSTORE_KEY_ALIAS: el alias del almacén de claves
- KEYSTORE_STORE_PASSWORD: la contraseña de la clave privada
- DEVELOPER_PACKAGE_NAME: tu ID de aplicación de Android como comexampleapp
Con estos secretos agregados a los secretos del repositorio de GitHub, estamos listos para configurar nuestro flujo de trabajo de GitHub Actions para ejecutar nuestras compilaciones.

![Múltiples secretos agregados exitosamente en GitHub](/github_project_settings_multi_secrets_addedwebp)

## Configure su archivo yml de flujo de trabajo de GitHub Actions

Ahora, configuremos nuestro archivo yml de flujo de trabajo de GitHub Actions de Android: definirá los pasos que ejecutaremos como parte de nuestro flujo de trabajo. Dentro de estos pasos, llamaremos a nuestros carriles Fastlane.

Primero, creemos las carpetas necesarias. Desde el directorio raíz de su proyecto, llame a:

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Luego, pegue el siguiente código en su archivo `build-upload-androidyml` recién creado:

```yaml
name: Build source code on android

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
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
      - uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
      - name: Build
        id: build_code
        run: npm run build
      - name: Sync
        id: sync_code
        run: npx cap sync
      - name: Setup java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

Este flujo de trabajo debe activarse después de cada _etiqueta_ de GitHub. Si necesita automatizar la etiqueta, consulte [Compilación y lanzamiento automáticos con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/)

Luego, este flujo de trabajo extraerá sus departamentos de Nodejs, los instalará y creará su aplicación JavaScript.

Su aplicación no necesita usar Ionic, solo la base Capacitor es obligatoria, puede tener un módulo Cordova antiguo, pero se debe preferir el complemento Capacitor JS.

> Cada vez que envíe una nueva confirmación, se creará una versión en la consola Google Play, canal beta

Mejoraré este blog con tus comentarios, si tienes alguna pregunta o sugerencia, házmelo saber al correo electrónico martin@capgoapp.

## **Procesamiento de compilación**

En GitHub Actions, **se te factura en función de los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Según la experiencia, se necesitan entre 3 y 5 minutos antes de que se pueda procesar una compilación en Google Play Store.

Para proyectos privados, el costo estimado por construcción puede llegar hasta **$0008/min x 5 minutos = $04**, o más, dependiendo de la configuración o dependencias de su proyecto

Para proyectos de código abierto, esto no debería ser un problema en absoluto. Consulte [precios](https://githubcom/pricing/)

### Gracias

Este blog está basado en los siguientes artículos:
- [Automatizar la publicación de la aplicación en Google Play Store con GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane -ac9104712486/)
- [Introducción al proyecto CI/CD para Android (Parte 3: Acciones de GitHub)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/ )
- [Integración continua de Android usando Fastlane y CircleCI 20 - Parte III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5 /)
- [Cómo configurar una canalización de CI/CD para su aplicación de Android usando Fastlane y GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Documentación de Fastlane](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)