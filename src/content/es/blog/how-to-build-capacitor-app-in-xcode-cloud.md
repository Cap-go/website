---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cómo construir una aplicación de Ionic Capacitor en Xcode Cloud
description: >-
  Utiliza Xcode Cloud para crear tu aplicación de Capacitor JS y evita la
  necesidad de MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Compilación en Xcode Cloud de Capacitor
tag: Tutorial
published: true
locale: es
---

## Requisitos previos

Antes de continuar con el tutorial...

- Asegúrate de usar GitHub
- Utiliza Capacitor
- Tu aplicación ya está implementada en la App Store
- Deseo de leer 😆...

El uso de Ionic es opcional, para Cordova podría funcionar, pero no lo he probado

## Importante sobre el precio

![Precio Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

El servicio es 'gratuito' hasta el límite
Puedes ver en la captura de pantalla el precio y los límites (precios al momento de la creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez advertidos de los requisitos y precios, si te parece, continuamos_**

> **_📣_ En la publicación, asumimos que tenemos la aplicación creada en la App Store**

## Introducción

Para que Xcode compile tu aplicación Capacitor, necesitas configurar algunas cosas

## Preparación del paquete

Asegúrate de tener tu comando de compilación en el script de tu `packagejson`
Luego agrega el comando `sync:ios` como se muestra a continuación

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Este paso hará que el script posterior funcione simplemente

## Script post-clonación
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

Luego haz que este archivo sea ejecutable con este comando `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Crear un flujo de trabajo en Xcode

Abre Xcode (sí, para eliminar Xcode necesitas Xcode)

Y ve a esta pestaña:
![Xcode paso 1](/xcode_step_1webp)

Haz clic en crear flujo de trabajo, selecciona tu aplicación, haz clic en siguiente como se muestra a continuación

![Xcode paso 2](/xcode_step_2webp)

Haz clic en Editar flujo de trabajo a la izquierda
![Xcode paso 2](/xcode_step_3webp)

Ve a la pestaña de entornos y elige como se muestra a continuación Mac 124 y marca la opción adecuada
![Xcode paso 3](/xcode_step_3webp)

Elige tu condición de inicio
Si usas la misma compilación que nosotros, sugiero usar Tag en lugar de rama, para evitar la compilación doble

Establece tu variable de entorno
![Xcode paso 4](/xcode_step_4webp)

Conecta tu cuenta de GitHub
![Xcode paso 5](/xcode_step_5webp)

![Xcode paso 6](/xcode_step_6webp)

Luego habilita el flujo de trabajo y realiza tu primer cambio, deberías ver tu compilación ejecutándose en Xcode

## **Procesamiento de la compilación**

En Xcode Cloud, **se te factura en base a los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Por experiencia, toma alrededor de 10-15 minutos antes de que una compilación pueda ser procesada en la App Store

Para proyectos privados, el costo estimado por compilación puede llegar hasta **$0.008/min x 5 mins = $0.4**, o más, dependiendo de la configuración o dependencias de tu proyecto

Para proyectos de código abierto, esto no debería ser un problema en absoluto. Ver [precios](https://githubcom/pricing/)