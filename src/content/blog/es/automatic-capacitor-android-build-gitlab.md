---
slug: automatic-capacitor-android-build-gitlab
title: Compilación automática de Android con Capacitor usando GitLab
description: >-
  Configura una pipeline CI/CD para tu aplicación Android Ionic con fastlane y
  GitLab en 5 minutos
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Ilustración GitLab Google Play Fastlane
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: es
next_blog: null
---

# Compilaciones automáticas de Android con GitLab CI

Configurar CI/CD para aplicaciones Capacitor puede ser complejo y llevar mucho tiempo. Esto es lo que necesitas saber:

## Requisitos previos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitLab con acceso de administrador
- Tu aplicación ya publicada en Google Play Store con la firma adecuada
- Archivos de clave de firma y keystore de Android
- Proyecto en Google Cloud Console con API de Play Store habilitada
- Cuenta de servicio con los permisos adecuados
- Comprensión de los flujos de trabajo de GitLab CI/CD
- Conocimiento de configuración de Fastlane
- Tiempo para mantener y depurar el pipeline

## Configuración profesional de CI/CD por Capgo

Evita la complejidad: [Capgo](https://capgoapp/ci-cd/) configura tu pipeline CI/CD directamente en tu plataforma preferida:

- **Independencia de plataforma**: Funciona con GitHub Actions, GitLab CI u otros
- **Integración perfecta**: No necesitas cambiar de plataforma, funciona con tu proceso actual
- **Configuración personalizada**: Configuración adaptada a las necesidades de tu proyecto
- **Guía experta**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa única de configuración: $2,600
- Tus costos operativos: ~$300/año
- Comparado con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configura CI/CD ahora](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## Guía de configuración manual

Si aún deseas configurar todo por tu cuenta, esto es lo que necesitas hacer:

**Pasos a seguir en la publicación**

1. _Copiar archivos de Fastlane_
2. _Almacenar tus secretos en secretos encriptados de GitLab_
3. _Crear y almacenar tu clave de cuenta de servicio de Google Play_
4. _Almacenar tu clave de firma de Android_
5. _Configurar tu archivo yml de flujo de trabajo de GitLab_

## 1. Copiar archivos de Fastlane

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "lanes" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente harías usando Android Studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, usaremos solo un puñado de acciones principales.

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

### Almacenar tus secretos en variables CI/CD de GitLab

GitLab proporciona una forma de almacenar variables CI/CD encriptadas, similar a los secretos de repositorio de GitHub. Para almacenar tu información sensible de forma segura:

1. Ve a la configuración de tu proyecto de GitLab
2. Navega a CI/CD > Variables
3. Añade las siguientes variables:

- ANDROID_KEYSTORE_FILE: el archivo `jks` o `keystore` codificado en base64 usado para firmar tus compilaciones de Android. Será el archivo keystore asociado con tu clave de carga (si usas Play App Signing), o tu clave de firma de aplicación
- KEYSTORE_KEY_PASSWORD: la contraseña asociada con el archivo keystore
- KEYSTORE_KEY_ALIAS: el alias del keystore
- KEYSTORE_STORE_PASSWORD: la contraseña de la clave privada
- DEVELOPER_PACKAGE_NAME: tu ID de aplicación Android como com.example.app
- PLAY_CONFIG_JSON: La clave JSON de cuenta de servicio codificada en base64

### Crear una clave de cuenta de servicio de Google Play

Para generar el secreto `PLAY_CONFIG_JSON`, sigue estos pasos:

1. Ve a la [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Play Android Developer
4. Crea una cuenta de servicio:
   - Ve a "IAM & Admin" > "Service Accounts"
   - Haz clic en "Create Service Account"
   - Dale un nombre y descripción
   - Haz clic en "Create and Continue"
   - Omite la asignación de rol y haz clic en "Done"
5. Genera una clave JSON:
   - Encuentra tu cuenta de servicio en la lista
   - Haz clic en el menú de tres puntos > "Manage keys"
   - Haz clic en "Add Key" > "Create new key"
   - Elige formato JSON
   - Haz clic en "Create"
6. Otorga acceso a la cuenta de servicio a tu aplicación en Play Console:
   - Ve a [Play Console](https://play.google.com/console)
   - Navega a "Users and permissions"
   - Haz clic en "Invite new users"
   - Ingresa el email de la cuenta de servicio (termina con @*.iam.gserviceaccount.com)
   - Otorga permiso "Release to production"
   - Haz clic en "Invite user"
7.Convierte la clave JSON a base64:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Añade la cadena codificada en base64 como variable `PLAY_CONFIG_JSON` en GitLab

## Configura tu Pipeline de GitLab CI/CD

Crea un archivo gitlab-ci.yml en la raíz de tu proyecto para definir tu pipeline CI/CD. A continuación se muestra un ejemplo de cómo puedes estructurar tu pipeline:

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
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
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

## Activar el Pipeline

Cada vez que envíes una nueva etiqueta a tu repositorio de GitLab, GitLab CI/CD activará automáticamente el pipeline definido, que compilará y desplegará tu aplicación Android usando Fastlane.

Asegúrate de ajustar las rutas y dependencias de acuerdo a la estructura y requisitos de tu proyecto. Esta configuración te ayudará a automatizar el despliegue de tu aplicación Android en GitLab CI/CD.

## Conclusión

Al configurar GitLab CI/CD con la imagen Docker mingc/android-build-box, puedes automatizar el proceso de compilación de aplicaciones Android, haciendo que tu flujo de trabajo de desarrollo sea más eficiente y confiable. Esta automatización libera tu tiempo para enfocarte en los aspectos principales del desarrollo de aplicaciones, ayudándote en última instancia a entregar aplicaciones Android de alta calidad de manera más eficiente.