---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cómo crear una aplicación Ionic Capacitor en Xcode Cloud
description: >-
  Utilice la nube Xcode para crear su aplicación Capacitor JS y contornear el
  beso de MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Capacitor Xcode cloud build
tag: Tutorial
published: true
locale: es
---

## Requisitos previos

Antes de continuar con el tutorial…

- Asegúrate de usar GitHub
- Usar condensador
- Tu aplicación ya está implementada en Apple Store
- Ganas de leer 😆…

Usar Ionic es opcional, para Cordova podría funcionar, pero no lo intenté

## Importante sobre el precio

![Precio Xcode Nube](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

El servicio es '_gratuito'_ hasta el límite  
Puedes ver en la captura de pantalla precio y límites (precios a partir de la creación del tutorial, podrían sufrir cambios en el futuro)

🔴 **_Una vez avisados ​​de requisitos y precios, si gustas continuamos_**

> **_📣_ En el post asumimos que tenemos la app creada en Apple Store**

## Introducción

Para que Xcode cree su aplicación Capacitor, necesita configurar algunas cosas

## Preparación del paquete

Asegúrese de tener su comando de compilación en su script `packagejson`
Luego agregue el comando `sync:ios` como se muestra a continuación

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Este paso hará que el post script funcione de forma sencilla.

## Script posterior a la clonación
Este script será ejecutado por la nube Xcode después del paso de clonación.

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

Guarde este archivo en la raíz de su proyecto y asígnele el nombre `ios/App/ci_scripts/ci_post_clonesh`

Luego haga que este archivo sea ejecutable con este comando `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Crear un flujo de trabajo Xcode

Abra Xcode (sí, para eliminar Xcode necesita Xcode)

Y ve a esta pestaña:
![Xcode paso 1](/xcode_step_1webp)

Haga clic en crear flujo de trabajo, seleccione su aplicación, haga clic en Siguiente como se muestra a continuación

![Xcode paso 2](/xcode_step_2webp)

Haga clic en Editar flujo de trabajo a la izquierda
![Xcode paso 2](/xcode_step_3webp)

Vaya a la pestaña de entornos y elija como debajo Mac 124 y marque la opción adecuada
![Xcode paso 3](/xcode_step_3webp)

Elija su condición de inicio
Si usa la misma compilación que nosotros, le sugiero usar Etiqueta en lugar de rama, para evitar la doble compilación.

Establece tu variable env
![Xcode paso 4](/xcode_step_4webp)

Conecte su cuenta de GitHub
![Xcode paso 5](/xcode_step_5webp)

![Xcode paso 6](/xcode_step_6webp)


Luego habilite el flujo de trabajo y confirme su primer cambio, debería ver su compilación ejecutándose en Xcode.

## **Procesamiento de compilación**

En Xcode Cloud, **se le factura en función de los minutos** que ha utilizado para ejecutar su flujo de trabajo de CI/CD. Según la experiencia, se necesitan entre 10 y 15 minutos antes de que se pueda procesar una compilación en Apple Store.

Para proyectos privados, el costo estimado por construcción puede llegar hasta **$0008/min x 5 mins = $04**, o más, dependiendo de la configuración o las dependencias de su proyecto.

Para proyectos de código abierto, esto no debería ser un problema en absoluto. Consulte [precios](https://githubcom/pricing/)