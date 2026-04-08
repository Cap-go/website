---
slug: automatic-capacitor-ios-build-github-action
title: >-
  Construcción automática de Capacitor IOS con acciones de GitHub con
  certificado
description: >-
  Cómo configurar una pipeline de CI/CD para tu aplicación IOS Ionic utilizando
  fastlane y GitHub Actions en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustración de acción de GitHub de Fastlane testflight
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-android-build-github-action
---
# Construcciones automáticas de iOS con GitHub Actions usando certificados

Configurar CI/CD para aplicaciones de Capacitor puede ser complejo y llevar tiempo. Esto es lo que debes saber:

## Requisitos previos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitHub con acceso de administrador
- Membresía en el programa de desarrolladores de iOS
- Acceso a la API de App Store Connect con los permisos adecuados
- Entendimiento de los flujos de trabajo de GitHub Actions
- Conocimiento sobre la configuración de Fastlane
- Tiempo para mantener y depurar la canalización
- Certificados y perfiles de aprovisionamiento adecuados

## Configuración profesional de CI/CD por Capgo

Salta la complejidad. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura tu canalización de CI/CD directamente en tu plataforma preferida:

- **Independencia de la plataforma**: Funciona con GitHub Actions, GitLab CI, u otros
- **Integración sin problemas**: No es necesario cambiar de plataforma, funciona con tu proceso actual
- **Configuración a medida**: Configuración personalizada que se adapta a las necesidades de tu proyecto
- **Orientación de expertos**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa de configuración única: $2,600
- Costos de operación: ~$300/año
- Comparar con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configura CI/CD ahora](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guía de configuración manual

Si aún deseas configurar todo tú mismo, aquí tienes lo que necesitas hacer:

## Entrega continua para iOS usando Fastlane y GitHub Actions y certificado

## Requisitos previos

Antes de continuar con el tutorial:

- Asegúrate de tener Fastlane [instalado](https://docs.fastlane.tools/) en tu máquina de desarrollo.
- Asegúrate de que seas parte de la membresía del programa de desarrolladores de iOS.

## Información importante sobre el precio

![Precio GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

El servicio es '_gratuito_' hasta el límite, dependiendo de la máquina elegida.  
Vamos a utilizar una máquina **_macOS_**, puedes ver en la captura de pantalla su precio y límites (precios a partir de la creación del tutorial, podrían sufrir cambios en el futuro)

**Una vez advertidos sobre requisitos y precios, continuemos.**

> **Nota: En la publicación asumo que has creado la aplicación en App Store Connect. ¡La información importante será copiada por Fastlane!**

## Qué aprenderás en el tutorial

**Pasos a seguir en la publicación**

1.  _Usando la API de App Store Connect con Fastlane_
    - _Requisitos:_
      - _Crear una clave de API de App Store Connect_
      - _Usar una clave de API de App Store Connect_
2.  _Copiar archivos de Fastlane_
3.  _Configurar GitHub Actions_

## 1. Usando la API de App Store Connect con Fastlane

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu ID de Apple ayuda a garantizar que eres la única persona que puede acceder a tu cuenta.  
> De [Soporte de Apple](https://developer.apple.com/support/authentication/)

### Requisitos

Para que Fastlane pueda usar la API de App Store Connect para cargar tu aplicación, necesitas proporcionar lo siguiente **tres** elementos:

1.  ID del emisor
2.  ID de la clave
3.  Archivo de clave o contenido de clave

### Obtención de una clave de API de App Store Connect

Para generar claves, debes tener permisos de administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona correspondiente a este artículo.

1. Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/).

2. Selecciona [Usuarios y acceso](https://appstoreconnect.apple.com/access/users/).

![Acceso de usuario de App Store Connect](/select_user_access.webp)

3. Selecciona la pestaña de Integración.

![Integración de API de App Store Connect](/user_access_keys.webp)

4. Haz clic en Generar clave de API o en el botón Agregar (+).

![Crear claves de API de App Store Connect](/user_access.webp)

5. Ingresa un nombre para la clave. El nombre es solo para tu referencia y no forma parte de la clave en sí.

![Crear nombre de claves de API de App Store Connect](/gen_key.webp)

6.  Bajo Acceso, selecciona el rol para la clave. Los roles que se aplican a las claves son los mismos roles que se aplican a los usuarios en tu equipo. Consulta [permisos de rol](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Te recomendamos seleccionar **Gerente de aplicaciones**.

7. Haz clic en Generar.

> **El acceso de una clave de API no puede limitarse a aplicaciones específicas.**

El nombre de la nueva clave, ID de la clave, un enlace de descarga y otra información aparecerán en la página.

![Descargar claves de App Store Connect](/download_key.webp)

Puedes obtener toda la información necesaria aquí.  
<1> ID del emisor. (`APPLE_ISSUER_ID` secreto)  
<2> ID de la clave. (`APPLE_KEY_ID` secreto)  
<3> Haz clic en "Descargar clave de API" para descargar tu clave privada de API. El enlace de descarga solo aparece si la clave privada aún no ha sido descargada. Apple no guarda una copia de la clave privada. Por lo tanto, solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, guardar las claves en un repositorio de código o incluir claves en el código del lado del cliente.

### Usando una clave de API de App Store Connect

El archivo de clave API (archivo p8 que descargas), el ID de la clave y el ID del emisor son necesarios para crear el token JWT para la autorización. Hay múltiples formas en las que esta información puede ser pasada a Fastlane. Elegí usar la nueva acción de Fastlane `app_store_connect_api_key`. Puedes aprender otras formas en [documentación de Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Muestra este método porque creo que es la forma más sencilla de trabajar con la mayoría de CI disponibles, donde puedes establecer variables de entorno.

Por favor convierte el archivo p8 que descargas a Base64 y guárdalo como un secreto (`APPLE_KEY_CONTENT`).

_Nosotros podemos administrar App Store Connect con Fastlane usando la clave API, ¡genial!_

## 2. Certificados

Abre XCode y ve a **Configuración** > **Cuentas** > **ID de Apple** > **Equipos** y selecciona tu equipo.

![Identidades de firma de código](/code_signing_identities.webp)

Haz clic en **Gestionar certificados**.

Si aún no has creado un certificado, puedes crear un nuevo certificado.

Haz clic en **+** y selecciona **Distribución de Apple**.

![Distribución de Apple](/apple_distribution.webp)

Luego necesitas ir al llavero para descargar el certificado como un archivo `.p12`.

Para hacerlo, debes ir al llavero, cambiar al llavero de **inicio de sesión** y luego a la pestaña **Mis certificados**.

![Mis certificados](/my_certificates.webp)

Luego puedes seleccionar el certificado que deseas descargar. (Mira la fecha del certificado)

Y haz clic derecho en la clave privada del certificado y selecciona **Exportar**.

Elige el formato de archivo **Intercambio de información personal (.p12)**.

Eso descargará el certificado como un archivo `.p12`.

Por favor abre el archivo en una terminal y usa el siguiente comando para convertirlo a Base64:

Esto se convertirá en tu secreto `BUILD_CERTIFICATE_BASE64`. Además, cuando se te pida, proporciona la contraseña del certificado. Esta contraseña será tu secreto `P12_PASSWORD`.

## 3. Perfiles de aprovisionamiento

Abre [Apple Developer](https://developer.apple.com/account/resources/profiles/list) y selecciona el equipo correcto.

Luego crea un nuevo perfil, haciendo clic en **+** 

![Crear un nuevo perfil](/create_new_profile.webp)

Y selecciona **App Store Connect**. 

![Seleccionar App Store Connect](/select_app_store_connect.webp)

Luego necesitas seleccionar la aplicación adecuada, ten cuidado, no puedes usar un comodín, de lo contrario la firma fallará.

![Seleccionar la aplicación adecuada](/select_app.webp)

Selecciona el certificado adecuado que creaste antes (busca la fecha de caducidad, debería ser el mismo día y mes que hoy) y haz clic en **Continuar**.

![Seleccionar el certificado adecuado](/select_certificate.webp)

Finalmente ingresa el nombre del perfil y haz clic en **Generar**. 

> El nombre se utilizará para identificar el perfil en Fastlane, bajo el valor de `APPLE_PROFILE_NAME`.

![Generar el perfil](/generate_profile.webp)

Puedes descargar el perfil como un archivo `.mobileprovision`.

![Descargar el perfil](/download_profile.webp)

Por favor convierte el perfil a Base64 y guárdalo como un secreto (`BUILD_PROVISION_PROFILE_BASE64`).

## 4. Copiar archivos de Fastlane

Fastlane es una biblioteca de Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías utilizando Android Studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, solo utilizaremos un puñado de acciones clave.

Crea una carpeta de Fastlane en la raíz de tu proyecto y copia los siguientes archivos:
`Fastfile`

## 5. Configurando secretos
Localmente, Fastlane utilizará el archivo `.env` para los secretos.
Aquí hay un ejemplo del archivo `.env`:

### Obteniendo el APP_STORE_CONNECT_TEAM_ID
Ve a [Developer Center](https://developer.apple.com/account) y desplázate hacia abajo a la sección `Detalles de membresía`.
El `ID del equipo` es el valor que necesitas establecer en el secreto `APP_STORE_CONNECT_TEAM_ID`.

### Obteniendo el BUNDLE_IDENTIFIER

1. Abre Xcode
2. Haz doble clic en la `Aplicación` en el navegador del proyecto
3. Luego haz clic en la pestaña `Firma y capacidades`
4. Copia el valor del `Identificador de paquete`. Este es el valor que necesitas establecer en el secreto `BUNDLE_IDENTIFIER`.

## 6. Procesamiento de la construcción

En GitHub Actions, **se te cobra en función de los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Según mi experiencia, se tarda aproximadamente de 10 a 15 minutos antes de que una construcción pueda ser procesada en App Store Connect.

Para proyectos privados, el costo estimado por construcción puede llegar a **$0.08/min x 15 mins = $1.2**, o más, dependiendo de la configuración y las dependencias de tu proyecto.

Si te preocupa el costo de proyectos privados, puedes establecer `skip_waiting_for_build_processing` en `true`. Esto ahorrará minutos de construcción al no esperar a que App Store Connect termine de procesar la construcción.

Sin embargo, hay un compromiso: necesitarás actualizar manualmente la información de cumplimiento de tu aplicación en App Store Connect antes de poder distribuir la compilación a los usuarios.

Esta optimización es principalmente útil para proyectos privados donde los minutos de compilación cuestan dinero. Para proyectos públicos/gratuitos, los minutos de compilación son gratuitos, por lo que no hay necesidad de habilitar esta configuración. Consulta la [página de precios](https://github.com/pricing/) de GitHub para más detalles.


## 7. Configurar GitHub Actions

**Configurar secretos de GitHub**

Por favor, copia los secretos del archivo `.env` y pégalos en los secretos del repositorio de GitHub.

Ve a **Configuración** > **Secretos y variables** > **Acciones** > **Nuevo secreto de repositorio**

<div class="mx-auto" style="width: 100%; margin-top: 20px;">
  <img src="/apple_team_id.webp" alt="app-store-connect-team-id">
</div>

2. `BUILD_CERTIFICATE_BASE64` - Certificado codificado en Base64.

3. `BUILD_PROVISION_PROFILE_BASE64` - Perfil de aprovisionamiento codificado en Base64.

4. `BUNDLE_IDENTIFIER` - el identificador del paquete de tu aplicación.

5. `APPLE_KEY_ID` — Clave de API de App Store Connect 🔺ID de clave.

6. `APPLE_ISSUER_ID` — Clave de API de App Store Connect 🔺ID de emisor.

7. `APPLE_KEY_CONTENT` — Clave de API de App Store Connect 🔺 Contenido de clave de _.p8_, [revísalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## 8. Configurar archivo de flujo de trabajo de GitHub

Crea un directorio de flujo de trabajo de GitHub.

```shell
base64 -i APPLE_KEY_CONTENT.p8 | pbcopy
```

Dentro de la carpeta `workflow`, crea un archivo llamado `build-upload-ios.yml` y agrega lo siguiente.

```shell
base64 -i BUILD_CERTIFICATE.p12 | pbcopy
```

Este flujo de trabajo debe ser activado después de cada _etiqueta_ de GitHub, si necesitas automatizar etiquetas, por favor, consulta [Construcción y lanzamiento automático con acciones de GitHub](/blog/automatic-build-and-release-with-github-actions/) primero.

Luego, este flujo de trabajo descargará tus dependencias de NodeJS, las instalará y construirá tu aplicación JavaScript.

> Cada vez que envíes un nuevo commit, se construirá un lanzamiento en TestFlight.

Tu aplicación no necesita usar Ionic, solo es obligatorio el uso de Capacitor, puede tener un antiguo módulo de Cordova, pero se debe preferir el complemento de Capacitor JS.

## 8. Activar el flujo de trabajo

**Crear un Commit**

Realiza un _commit_, deberías ver el flujo de trabajo activo en el repositorio.

**Activar el flujo de trabajo**

Envía los nuevos commits a la rama `main` o `developement` para activar el flujo de trabajo.

![Comenzado con el commit](/cd_started.webp)

Después de unos minutos, la compilación debería estar disponible en tu panel de App Store Connect.

![Panel de Testflight](/testflight_app.webp)

## 9. ¿Puedo desplegar desde la máquina local?

Sí, puedes, y es muy fácil.

Puedes usar Xcode para construir y firmar tu aplicación, como siempre.

### Gracias

Este blog se basa en los siguientes artículos:
- [Entrega continua para IOS usando Fastlane y GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentación de Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Este mensaje de GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Esta documentación de GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
