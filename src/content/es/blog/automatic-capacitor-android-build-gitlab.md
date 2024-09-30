---
slug: automatic-capacitor-android-build-gitlab
title: Compilación automática de condensadores para Android con GitLab
description: >-
  Cómo configurar una canalización de CI/CD para su aplicación Android Ionic
  usando fastlane y GitLab en 5 minutos
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Fastlane Google play GitLab illustration
tag: CI/CD
published: true
next_blog: null
locale: es
---

## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrate de usar GitLab
- Tu aplicación ya está implementada en la tienda Google Play.
- Ganas de leer 😆…

**Pasos a seguir en el post**

1 _Copiar archivos Fastline_
2 _Almacenar sus secretos en secretos cifrados de GitLab_
3 _Creación y almacenamiento de la clave de cuenta del servicio Google Play_
4 _Almacenamiento de su clave de firma de Android_
5 _Configure su archivo yml de flujo de trabajo de GitLab_


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

### Almacenamiento de sus secretos en variables GitLab CI/CD

GitLab proporciona una forma de almacenar variables CI/CD cifradas, similar a los secretos del repositorio de GitHub. Para almacenar su información confidencial de forma segura.

1 Vaya a la configuración de su proyecto GitLab
2 Navegue a CI/CD > Variables
3 Agregue las siguientes variables:

- ANDROID_KEYSTORE_FILE: el archivo `jks` o `keystore` codificado en base64 que se utiliza para firmar tus compilaciones de Android. Este será el archivo de almacén de claves asociado con tu clave de carga (si usas Play App Signing) o tu clave de firma de aplicaciones.
- KEYSTORE_KEY_PASSWORD: la contraseña asociada con el archivo del almacén de claves
- KEYSTORE_KEY_ALIAS: el alias del almacén de claves
- KEYSTORE_STORE_PASSWORD: la contraseña de la clave privada
- DEVELOPER_PACKAGE_NAME: tu ID de aplicación de Android como comexampleapp
- PLAY_CONFIG_JSON: la clave JSON de la cuenta de servicio codificada en base64.

## Configure su canalización CI/CD de GitLab

Cree un archivo gitlab-ciyml en la raíz de su proyecto para definir su canalización de CI/CD. A continuación se muestra un ejemplo de cómo puede estructurar su canalización:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## Activar la canalización

Cada vez que inserte una nueva etiqueta en su repositorio de GitLab, GitLab CI/CD activará automáticamente la canalización definida, que creará e implementará su aplicación de Android usando Fastlane.

Asegúrese de ajustar las rutas y dependencias de acuerdo con la estructura y los requisitos de su proyecto. Esta configuración lo ayudará a automatizar la implementación de su aplicación de Android en GitLab CI/CD.

## Conclusión

Al configurar GitLab CI/CD con la imagen de Docker mingc/android-build-box, puede automatizar el proceso de creación de aplicaciones de Android, haciendo que su flujo de trabajo de desarrollo sea más eficiente y confiable. Esta automatización le libera tiempo para concentrarse en los aspectos centrales del desarrollo de aplicaciones. , ayudándole en última instancia a ofrecer aplicaciones de Android de alta calidad de manera más eficiente