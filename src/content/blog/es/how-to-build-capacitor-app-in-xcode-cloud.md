---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cómo compilar una aplicación Ionic Capacitor en Xcode Cloud
description: >-
  Construye tu aplicación Capacitor JS usando Xcode Cloud sin necesidad de
  MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Compilación en la nube de Xcode con Capacitor
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
---

## Requisitos previos

Antes de continuar con el tutorial...

-   Asegúrate de usar GitHub
-   Usar Capacitor
-   Tu aplicación ya está publicada en la App Store
-   Ganas de leer 😆...

Usar Ionic es opcional, para Cordova podría funcionar, pero no lo he probado

## Importante sobre el precio

![Price Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

El servicio es '_gratuito_' hasta cierto límite  
Puedes ver en la captura de pantalla los precios y límites (precios al momento de la creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos los requisitos y precios, si te parece, continuamos_**

> **_📣_ En esta publicación, asumimos que tenemos la aplicación creada en la App Store**

## Introducción

Para que Xcode compile tu aplicación Capacitor, necesitas configurar algunas cosas

## Preparación del Package

Asegúrate de tener tu comando de compilación en tu script de `packagejson`
Luego agrega el comando `sync:ios` como se muestra a continuación

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Este paso hará que el script posterior funcione de manera simple

## Script post clone
Este script será ejecutado por Xcode cloud después del paso de clonación

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Guarda este archivo en la raíz de tu proyecto y nómbralo `ios/App/ci_scripts/ci_post_clonesh`

Luego haz este archivo ejecutable con este comando `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Crear un flujo de trabajo en Xcode

Abre Xcode (sí, para quitar Xcode necesitas Xcode)

Y ve a esta pestaña:
![Xcode step 1](/xcode_step_1webp)

Haz clic en crear flujo de trabajo, selecciona tu aplicación, haz clic en siguiente como se muestra a continuación

![Xcode step 2](/xcode_step_2webp)

Haz clic en Editar flujo de trabajo en la izquierda
![Xcode step 2](/xcode_step_3webp)

Ve a la pestaña de entornos y elige como se muestra a continuación Mac 124 y marca la opción adecuada
![Xcode step 3](/xcode_step_3webp)

Elige tu condición de inicio
Si usas la misma compilación que nosotros, sugiero usar Tag en lugar de rama, para evitar compilaciones dobles

Configura tu variable de entorno
![Xcode step 4](/xcode_step_4webp)

Conecta tu cuenta de GitHub
![Xcode step 5](/xcode_step_5webp)

![Xcode step 6](/xcode_step_6webp)

Luego habilita el flujo de trabajo y realiza tu primer cambio, deberías ver tu compilación ejecutándose en Xcode

## **Procesamiento de la Compilación**

En Xcode Cloud, **se te factura según los minutos** que hayas utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 10-15 minutos antes de que una compilación pueda ser procesada en la App Store

Para proyectos privados, el costo estimado por compilación puede llegar hasta **$0.008/min x 5 mins = $0.4**, o más, dependiendo de la configuración o dependencias de tu proyecto

Para proyectos de código abierto, esto no debería ser un problema en absoluto. Ver [precios](https://githubcom/pricing/)