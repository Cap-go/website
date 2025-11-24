---
slug: automatic-capacitor-android-build-github-action
title: Compilación automática de Android en Capacitor con acciones de GitHub
description: >-
  Cómo configurar un pipeline CI/CD para tu aplicación Capacitor Android usando
  fastlane y GitHub Actions en 5 minutos
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Ilustración de acción de GitHub de Fastlane Google Play
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-ios-build-github-action
---
# Compilaciones automáticas de Android con GitHub Actions

Configurar CI/CD para aplicaciones Capacitor puede ser complejo y llevar mucho tiempo. Esto es lo que necesitas saber:

## Requisitos previos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitHub con acceso de administrador
- Tu aplicación ya publicada en Google Play Store con la firma adecuada
- Archivos de clave de firma y keystore de Android
- Proyecto en Google Cloud Console con API de Play Store habilitada
- Cuenta de servicio con los permisos adecuados
- Comprensión de los flujos de trabajo de GitHub Actions
- Conocimiento de la configuración de Fastlane
- Tiempo para mantener y depurar el pipeline

## Configuración profesional de CI/CD por Capgo

Salta la complejidad. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura tu pipeline de CI/CD directamente en tu plataforma preferida:

- **Independencia de plataforma**: Funciona con GitHub Actions, GitLab CI u otros
- **Integración perfecta**: No necesitas cambiar de plataforma, funciona con tu proceso actual
- **Configuración personalizada**: Configuración adaptada a las necesidades de tu proyecto
- **Guía experta**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa única de configuración: $2,600
- Tus costos operativos: ~$300/año
- Comparado con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configura CI/CD ahora](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guía de configuración manual

Si aún deseas configurar todo por tu cuenta, esto es lo que necesitas hacer:

## Precios de GitHub Actions

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions ofrece minutos gratuitos según el tipo de repositorio:
- Repositorios públicos: 2,000 minutos/mes
- Repositorios privados: 2,000 minutos/mes (ejecutores Linux)

Para proyectos privados, los costos son aproximadamente $0.008/minuto. Una compilación típica toma 3-5 minutos.

## Pasos de configuración manual

1. Configurar Fastlane
2. Configurar secretos de GitHub
3. Crear flujo de trabajo de GitHub Actions

## 1. Configurar Fastlane

Crea una carpeta `fastlane` en la raíz de tu proyecto y agrega un `Fastfile` con este contenido:

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. Configurar secretos de GitHub

Necesitas almacenar información sensible de forma segura en GitHub. Ve a tu repositorio → Settings → Secrets and variables → Actions → New repository secret.

### Secretos requeridos:

1. **Clave de cuenta de servicio de Google Play**
   - Crea una cuenta de servicio en Google Cloud Console
   - Habilita la API de Google Play Developer
   - Otorga acceso a la cuenta de servicio a tu app en Play Console
   - Descarga el archivo de clave JSON
   - Convierte a base64: `base64 service_account_key.json | pbcopy`
   - Agrega como `PLAY_CONFIG_JSON`

2. **Clave de firma de Android**
   - Convierte tu keystore a base64: `base64 your_keystore.jks | pbcopy`
   - Agrega como `ANDROID_KEYSTORE_FILE`
   - Agrega detalles del keystore:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (ej., com.example.app)

## 3. Crear flujo de trabajo de GitHub Actions

Crea `.github/workflows/build-upload-android.yml`:

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      
      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-node@v5
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## Cómo funciona

1. Crea una etiqueta Git para activar el flujo de trabajo
2. GitHub Actions compila tu aplicación
3. Fastlane la sube al canal beta de Google Play
4. Tu aplicación se actualiza automáticamente

## Tiempo de compilación y costos

- Tiempo de compilación: 3-5 minutos
- Costo para repositorios privados: ~$0.04 por compilación
- Gratis para proyectos de código abierto

## Recursos

- [Documentación de GitHub Actions](https://docs.github.com/en/actions/)
- [Documentación de Fastlane](https://docs.fastlane.tools/)
