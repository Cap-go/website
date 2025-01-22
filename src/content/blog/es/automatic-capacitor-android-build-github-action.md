---
slug: es__automatic-capacitor-android-build-github-action
title: Compilación automática de Capacitor Android con GitHub Actions
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación Android Ionic con
  fastlane y GitHub Actions en 5 minutos (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Ilustración de la Acción de GitHub de Fastlane Google Play
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-ios-build-github-action
---

## Entrega Continua para Android usando Fastlane y GitHub Actions

## Prerrequisitos

Antes de continuar con el tutorial...

- Asegúrate de usar GitHub
- Tu aplicación ya está publicada en la Google Play Store
- Ganas de leer 😆...

## Importante sobre el precio

![Precio GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

El servicio es 'gratuito' hasta cierto límite, dependiendo de la máquina elegida
Vamos a usar una máquina **_Linux_**, puedes ver en la captura su precio y límites (precios al momento de crear el tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de los requisitos y precios, si quieres, continuamos_**

> **_📣_ En la publicación asumimos que tenemos la aplicación creada en Google Play, y que tenemos la clave de firma del ecosistema de Google**

## Vamos al lío 🧑🏽💻

**Pasos a seguir en la publicación**

1. _Copiar archivos de Fastlane_
2. _Almacenar tus secretos en los secretos cifrados de GitHub_
3. _Crear y almacenar tu clave de cuenta de servicio de Google Play_
4. _Almacenar tu clave de firma de Android_
5. _Configurar tu archivo yml de flujo de trabajo de GitHub Actions_

## 1. Copiar archivos de Fastlane

Fastlane es una biblioteca de Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente harías usando Android Studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.

Crea una carpeta Fastlane en la raíz de tu proyecto y copia los siguientes archivos:
Fastlane
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

## Almacenar tus secretos en los secretos cifrados de GitHub

Para autenticarse con la API de Google Play Developer, necesitaremos una clave de cuenta de servicio. El archivo de clave de cuenta de servicio se considera sensible, lo que significa que necesitaremos almacenarlo de forma segura, pero en un lugar donde pueda ser accedido por nuestros flujos de trabajo de GitHub Actions y nuestro Fastfile cuando sea necesario. Aquí entran los secretos cifrados de GitHub: almacenaremos todas nuestras claves sensibles en secretos del repositorio, manteniéndolas seguras mientras las hacemos automáticamente accesibles para los flujos de trabajo de GitHub Actions en el repositorio.

### Crear y almacenar tu clave de cuenta de servicio de Google Play

Si necesitas crear una nueva clave de cuenta de servicio, [sigue los pasos descritos aquí](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). Una vez que tengas tu archivo JSON de clave de cuenta de servicio, vamos a agregarlo a los secretos cifrados de tu repositorio de GitHub.

Para agregar un nuevo secreto a los secretos cifrados de GitHub, primero navega al repositorio de Android al que agregarás el flujo de trabajo de GitHub Actions. En el extremo derecho, haz clic en "Settings"

![Configuración en el repositorio de GitHub](/github_project_settingswebp)

Luego, haz clic en "Secrets",

![Secretos en el repositorio de GitHub, desde Configuración](/github_project_settings_secretswebp)

luego "Actions" de la lista en el menú izquierdo

![Acciones bajo Secretos en el repositorio de GitHub](/github_project_settings_secrets_actionswebp)

Estas son las variables de entorno secretas cifradas para el repositorio. Cualquier flujo de trabajo configurado en el repositorio tendrá acceso a estos secretos del repositorio.

Desde aquí, haz clic en "New repository secret" para agregar un nuevo secreto:

![Nueva acción de secreto de repositorio en GitHub](/github_project_settings_secrets_actions_newwebp)

Cuando hagas clic en "New repository secret", verás un formulario que te pedirá que ingreses un nombre para tu nuevo secreto y su valor.

![Agregar nombre y valor para el nuevo secreto en GitHub](/github_project_settings_secrets_actions_new_addwebp)

Los secretos de GitHub solo aceptan valores de cadena, por lo que para ciertas credenciales (cualquier archivo jks o json, por ejemplo), primero necesitarás convertir el archivo a una cadena codificada en base64 antes de agregarlo a los secretos de GitHub. Puedes hacer esto desde la línea de comandos:

```
base64 in_file_path | pbcopy
```

Esto copia la cadena resultante a tu portapapeles, para que puedas pegarla directamente en un nuevo secreto de repositorio en GitHub.Por ejemplo:

Creemos un nuevo secreto de repositorio de la siguiente manera:

- PLAY_CONFIG_JSON: la clave de cuenta de servicio codificada en base64 en formato JSON

_Ten en cuenta que debes almacenar una copia de seguridad de tus secretos de forma segura en otro lugar (que no sean los secretos encriptados de GitHub), ya que no podrás exportar ni acceder nuevamente a las credenciales desde GitHub después de haberlas agregado_

Con nuestra clave de cuenta de servicio agregada a los secretos del repositorio de GitHub, ahora podemos autenticarnos con la API de Google Play Developer desde cualquier flujo de trabajo de GitHub Actions agregado al repositorio

![Nuevo secreto agregado exitosamente en GitHub](/github_project_settings_secrets_addedwebp)

### Almacenamiento de tu clave de firma de Android

Para firmar correctamente las compilaciones de lanzamiento de Android en CI, el flujo de trabajo necesitará acceso a una clave de carga de Android o una clave de firma de aplicación. Las aplicaciones creadas después de agosto de 2021 usarán el nuevo sistema de Google Play App Signing de forma predeterminada, en el que se usa una clave de carga administrada por el usuario para firmar AAB antes de la carga, pero la clave de firma de la aplicación es administrada por Google. Si tu equipo está utilizando Google Play App Signing, entonces todo lo que necesitarás para el pipeline de CI es la _clave de carga_ de tu aplicación, ya que la firma se difiere hasta después de que el AAB se haya cargado en la Play Console. Si aún necesitas crear una clave de carga y un almacén de claves, sigue las [instrucciones](https://developerandroidcom/studio/publish/app-signing/#generate-key/) que se encuentran en la documentación para desarrolladores de Android.

Si tu equipo aún no ha migrado al sistema Google Play App Signing, entonces necesitarás hacer que tu clave de _firma_ de aplicación esté disponible para el flujo de trabajo de CI para firmar correctamente tu aplicación antes de la carga.

Agrega lo siguiente como secretos del repositorio:

- ANDROID_KEYSTORE_FILE: el archivo `jks` o `keystore` codificado en base64 utilizado para firmar tus compilaciones de Android. Este será el archivo de almacén de claves asociado con tu clave de carga (si usas Play App Signing), o tu clave de firma de aplicación.
- KEYSTORE_KEY_PASSWORD: la contraseña asociada con el archivo de almacén de claves
- KEYSTORE_KEY_ALIAS: el alias del almacén de claves
- KEYSTORE_STORE_PASSWORD: la contraseña de la clave privada
- DEVELOPER_PACKAGE_NAME: el ID de tu aplicación de Android, como comexampleapp

Con estos secretos agregados a los secretos del repositorio de GitHub, estamos listos para configurar nuestro flujo de trabajo de GitHub Actions para ejecutar nuestras compilaciones.

![Múltiples secretos agregados exitosamente en GitHub](/github_project_settings_multi_secrets_addedwebp)

## Configura tu archivo yml de flujo de trabajo de GitHub Actions

Ahora, configuremos nuestro archivo yml de flujo de trabajo de GitHub Actions para Android – definirá los pasos que ejecutaremos como parte de nuestro flujo de trabajo. Dentro de estos pasos, llamaremos a nuestros carriles de Fastlane.

Primero, creemos las carpetas necesarias. Desde el directorio raíz de tu proyecto, ejecuta:

```
base64 service_account_key.json | pbcopy
```

Luego, pega el siguiente código en tu archivo recién creado `build-upload-androidyml`:

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Este flujo de trabajo debe activarse después de cada _etiqueta_ de GitHub, si necesitas automatizar la etiqueta, consulta [Compilación y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/)

Luego, este flujo de trabajo extraerá tus dependencias de Nodejs, las instalará y compilará tu aplicación JavaScript.

Tu aplicación no necesita usar Ionic, solo es obligatoria la base de Capacitor, puede tener módulos antiguos de Cordova, pero se deben preferir los plugins JS de Capacitor.

> Cada vez que envíes un nuevo commit, se compilará una versión en la consola de Google Play, en el canal beta.

Mejoraré este blog con tus comentarios, si tienes alguna pregunta o sugerencia, házmelo saber por correo electrónico a martin@capgoapp

## **Procesamiento de compilación**

En GitHub Actions, **se te factura según los minutos** que hayas utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 3-5 minutos antes de que una compilación pueda ser procesada en la Google Play Store.

Para proyectos privados, el costo estimado por compilación puede llegar hasta **$0.008/min x 5 mins = $0.4**, o más, dependiendo de la configuración o dependencias de tu proyecto

Para proyectos de código abierto, esto no debería ser un problema en absoluto. Ver [precios](https://githubcom/pricing/)

### Gracias

Este blog se basa en los siguientes artículos:
- [Automatiza la publicación de la aplicación en la Google Play Store con GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane-ac9104712486/)
- [Comenzando con CI/CD para proyecto Android (Parte 3 - GitHub Actions)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/)
- [Integración continua de Android usando Fastlane y CircleCI 2.0 — Parte III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5/)
- [Cómo configurar un pipeline de CI/CD para tu aplicación Android usando Fastlane y GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Documentación de Fastlane](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [Este mensaje de GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)