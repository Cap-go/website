---
slug: automatic-capacitor-ios-build-github-action
title: Costruzione automatica di Capacitor per IOS con azioni GitHub con certificato
description: >-
  Cómo configurar un pipeline de CI/CD para tu aplicación IOS Ionic utilizando
  fastlane y GitHub Actions en 5 minutos (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2025-01-21T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustration de l'action GitHub TestFlight Fastlane
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-github-action
---
# Compilaciones automáticas de iOS con GitHub Actions usando certificados

Configurar CI/CD para aplicaciones de Capacitor puede ser complejo y consumir tiempo. Aquí tienes lo que necesitas saber:

## Prerrequisitos

Antes de comenzar, necesitarás configurar:

- Una cuenta de GitHub con acceso de administrador
- Membresía en el programa de desarrollador de iOS
- Acceso a la API de App Store Connect con los permisos adecuados
- Comprensión de los flujos de trabajo de GitHub Actions
- Conocimientos sobre la configuración de Fastlane
- Tiempo para mantener y depurar la canalización
- Certificados y perfiles de aprovisionamiento adecuados

## Configuración profesional de CI/CD por Capgo

Salta la complejidad. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura tu canalización de CI/CD directamente en tu plataforma preferida:

- **Independencia de plataforma**: Funciona con GitHub Actions, GitLab CI u otros
- **Integración fluida**: No es necesario cambiar de plataforma, funciona con tu proceso actual
- **Configuración personalizada**: Configuración adaptada a las necesidades de tu proyecto
- **Asesoramiento experto**: Ya hemos configurado CI/CD para más de 50 aplicaciones

### Precios
- Tarifa de configuración única: $2,600
- Costos de funcionamiento: ~$300/año
- Comparar con otras soluciones propietarias: $6,000/año
- **Ahorra $26,100 en 5 años**

[Configurar CI/CD ahora](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guía de configuración manual

Si aún deseas configurar todo tú mismo, aquí tienes lo que necesitas hacer:

## Entrega continua para iOS usando Fastlane y GitHub Actions y certificado

## Prerrequisitos

Antes de continuar con el tutorial:

- Asegúrate de tener Fastlane [instalado](https://docs.fastlane.tools/) en tu máquina de desarrollo.
- Asegúrate de que eres parte de la membresía del programa de desarrollador de iOS.

## Información importante sobre el precio

![Precio GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

El servicio es '_gratis'_ hasta el límite, dependiendo de la máquina elegida.  
Vamos a usar una **_máquina macOS_**, puedes ver en la captura de pantalla su precio y límites (precios al momento de la creación del tutorial, pueden sufrir cambios en el futuro)

**Una vez advertidos sobre los requisitos y precios, continuemos.**

> **Nota: En la publicación asumo que tienes la aplicación creada en App Store Connect. ¡La información importante será copiada por Fastlane!**

## Qué aprenderás en el tutorial

**Pasos a seguir en la publicación**

1.  _Uso de la API de App Store Connect con Fastlane_
    - _Requisitos:_
      - _Crear una clave de API de App Store Connect_
      - _Usar una clave de API de App Store Connect_
2.  _Copiar archivos de Fastlane_
3.  _Configurar GitHub Actions_

## 1. Uso de la API de App Store Connect con Fastlane

> A partir de febrero de 2021, se requiere autenticación de dos factores o verificación en dos pasos para que todos los usuarios inicien sesión en App Store Connect. Esta capa adicional de seguridad para tu ID de Apple ayuda a garantizar que eres la única persona que puede acceder a tu cuenta.  
> De [Soporte de Apple](https://developer.apple.com/support/authentication/)

### Requisitos

Para que Fastlane pueda utilizar la API de App Store Connect para cargar tu aplicación, necesitas proporcionar las siguientes **tres** cosas:

1.  ID de emisor
2.  ID de clave
3.  Archivo de clave o contenido de clave

### Obtención de una clave de API de App Store Connect

Para generar claves, debes tener permiso de Administrador en App Store Connect. Si no tienes ese permiso, puedes dirigir a la persona relevante a este artículo.

1. Inicia sesión en [App Store Connect](https://appstoreconnect.apple.com/).

2. Selecciona [Usuarios y acceso](https://appstoreconnect.apple.com/access/users/).

![Acceso de usuario a App Store Connect](/select_user_access.webp)

3 — Selecciona la pestaña de Integración.

![Integración de API de App Store Connect](/user_access_keys.webp)

4. Haz clic en Generar clave de API o en el botón Agregar (+).

![Crear claves de API de App Store Connect](/user_access.webp)

5. Ingresa un nombre para la clave. El nombre es solo para tu referencia y no es parte de la clave en sí.

![Crear nombre de claves de API de App Store Connect](/gen_key.webp)

6 — En Acceso, selecciona el rol para la clave. Los roles que se aplican a las claves son los mismos que se aplican a los usuarios de tu equipo. Consulta [permisos de roles](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Recomendamos seleccionar **Administrador de aplicaciones**.

7. Haz clic en Generar.

> **El acceso de una clave de API no puede limitarse a aplicaciones específicas.**

El nombre de la nueva clave, el ID de la clave, un enlace de descarga y otra información aparecen en la página.

![Descargar claves de App Store Connect](/download_key.webp)

Puedes obtener aquí toda la información necesaria.  
<1> ID de emisor. (`APPLE_ISSUER_ID` secreto)  
<2> ID de clave. (`APPLE_KEY_ID` secreto)  
<3> Haz clic en "Descargar clave de API" para descargar tu clave privada de API. El enlace de descarga solo aparece si la clave privada no se ha descargado aún. Apple no guarda una copia de la clave privada. Así que, solo puedes descargarla una vez.

> _🔴_ Guarda tu clave privada en un lugar seguro. Nunca debes compartir tus claves, guardar claves en un repositorio de código o incluir claves en código del lado del cliente.

### Uso de una clave de API de App Store Connect

El archivo de clave API (archivo p8 que descargas), el ID de clave y el ID de emisor son necesarios para crear el token JWT para la autorización. Hay múltiples formas en que esta información se puede transmitir a Fastlane. Elegí usar la nueva acción de Fastlane `app_store_connect_api_key`. Puedes aprender otras formas en [documentación de Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Muestra este método porque creo que es la forma más fácil de trabajar con la mayoría de CI disponibles, donde puedes establecer variables de entorno.

Por favor, convierte el archivo p8 que descargas a Base64 y guárdalo como un secreto (`APPLE_KEY_CONTENT`).

## 2. Certificados

Abre XCode y ve a **Configuración** > **Cuentas** > **ID de Apple** > **Equipos** y selecciona tu equipo.

![Identidades de firma de código](/code_signing_identities.webp)

Haz clic en **Administrar certificados**.

Si aún no has creado un certificado, puedes crear uno nuevo.

Haz clic en **+** y selecciona **Distribución de Apple**.

![Distribución de Apple](/apple_distribution.webp)

Luego necesitas ir a llaveros para descargar el certificado como un archivo `.p12`.

Para hacerlo, debes ir a llaveros, cambiar al llavero **inicio de sesión** y luego a la pestaña **Mis certificados**.

![Mis certificados](/my_certificates.webp)

Luego puedes seleccionar el certificado que deseas descargar. (Busca por la fecha del certificado)

Y luego haz clic derecho en la clave privada del certificado y selecciona **Exportar**.

Elige el formato de archivo **Intercambio de información personal (.p12)**.

Eso descargará el certificado como un archivo `.p12`.

Por favor, abre el archivo en un terminal y usa el siguiente comando para convertirlo a Base64:

## 3. Perfiles de aprovisionamiento

Abre [Apple Developer](https://developer.apple.com/account/resources/profiles/list) y selecciona el equipo adecuado.

Luego crea un nuevo perfil, haciendo clic en **+** 

![Crear un nuevo perfil](/create_new_profile.webp)

Y selecciona **App Store Connect**. 

![Seleccionar App Store Connect](/select_app_store_connect.webp)

Luego necesitas seleccionar la aplicación correcta, ten cuidado, no puedes usar un comodín, de lo contrario la firma fallará.

![Seleccionar la aplicación correcta](/select_app.webp)

Selecciona el certificado correcto que creaste antes (busca la fecha de vencimiento, debe ser el mismo día y mes que hoy) y haz clic en **Continuar**.

![Seleccionar el certificado correcto](/select_certificate.webp)

Finalmente, ingresa el nombre del perfil y haz clic en **Generar**. 

> El nombre se utilizará para identificar el perfil en Fastlane, bajo el valor de `APPLE_PROFILE_NAME`.

![Generar el perfil](/generate_profile.webp)

Puedes descargar el perfil como un archivo `.mobileprovision`.

![Descargar el perfil](/download_profile.webp)

Por favor, convierte el perfil a Base64 y guárdalo como un secreto (`BUILD_PROVISION_PROFILE_BASE64`).

## 4. Copiar archivos de Fastlane

Fastlane es una biblioteca Ruby creada para automatizar tareas comunes de desarrollo móvil. Usando Fastlane, puedes configurar "carriles" personalizados que agrupan una serie de "acciones" que realizan tareas que normalmente realizarías usando Android Studio. Puedes hacer mucho con Fastlane, pero para los propósitos de este tutorial, solo usaremos un puñado de acciones básicas.

Crea una carpeta de Fastlane en la raíz de tu proyecto y copia los siguientes archivos:
`Fastfile`

## 5. Configuración de secretos
Localmente, Fastlane usará el archivo `.env` para los secretos.
Aquí tienes un ejemplo del archivo `.env`:

### Obtener el APP_STORE_CONNECT_TEAM_ID
Ve al [Centro de desarrolladores](https://developer.apple.com/account) y desplázate hacia abajo hasta la sección `Detalles de membresía`.
El `ID de equipo` es el valor que necesitas establecer en el secreto `APP_STORE_CONNECT_TEAM_ID`.

### Obtener el BUNDLE_IDENTIFIER

1. Abre Xcode
2. Haz doble clic en la `Aplicación` en el navegador del proyecto
3. Luego haz clic en la pestaña `Firma y capacidades`
4. Copia el valor del `Identificador de paquete`. Este es el valor que necesitas establecer en el secreto `BUNDLE_IDENTIFIER`.

## 6. Procesamiento de compilaciones

En GitHub Actions, **se te cobra según los minutos** que has utilizado para ejecutar tu flujo de trabajo de CI/CD. Desde mi experiencia, toma alrededor de 10 a 15 minutos antes de que una compilación pueda ser procesada en App Store Connect.

Para proyectos privados, el costo estimado por compilación puede llegar a **$0.08/min x 15 mins = $1.2**, o más, dependiendo de la configuración y dependencias de tu proyecto.

Si te preocupa el costo para proyectos privados, puedes establecer `skip_waiting_for_build_processing` en `true`. Esto ahorrará minutos de compilación al no esperar a que App Store Connect termine de procesar la compilación.

Cependant, il y a un compromis - vous devrez mettre à jour manuellement les informations de conformité de votre application dans App Store Connect avant de pouvoir distribuer la version aux utilisateurs.

Cette optimisation est principalement utile pour les projets privés où les minutes de construction coûtent de l'argent. Pour les projets publics/gratuits, les minutes de construction sont gratuites, donc il n'est pas nécessaire d'activer ce paramètre. Consultez la [page de tarification de GitHub](https://github.com/pricing/) pour plus de détails.


## 7. Configurer GitHub Actions

**Configurer les secrets GitHub**

Veuillez copier les secrets depuis le fichier `.env` et les coller dans les secrets du dépôt GitHub.

Allez dans **Paramètres** > **Secrets et variables** > **Actions** > **Nouveau secret de dépôt**

<div class="mx-auto" style="width: 100%; margin-top: 20px;">
  <img src="/apple_team_id.webp" alt="app-store-connect-team-id">
</div>

2. `BUILD_CERTIFICATE_BASE64` - Certificat encodé en Base64.

3. `BUILD_PROVISION_PROFILE_BASE64` - Profil de provisionnement encodé en Base64.

4. `BUNDLE_IDENTIFIER` - identifiant du bundle de votre application.

5. `APPLE_KEY_ID` — ID de clé API App Store Connect 🔺ID de clé.

6. `APPLE_ISSUER_ID` — ID d'émetteur de clé API App Store Connect 🔺ID d'émetteur.

7. `APPLE_KEY_CONTENT` — Contenu de la clé API App Store Connect 🔺 Contenu de la clé de _.p8_, [vérifiez-le](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## 8. Configurer le fichier de workflow GitHub

Créez un répertoire de workflow GitHub.

```shell
base64 -i APPLE_KEY_CONTENT.p8 | pbcopy
```

Dans le dossier `workflow`, créez un fichier nommé `build-upload-ios.yml` et ajoutez ce qui suit.

```shell
base64 -i BUILD_CERTIFICATE.p12 | pbcopy
```

Ce workflow doit être déclenché après chaque _tag_ GitHub, si vous devez automatiser le tag, veuillez consulter [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/) d'abord.

Ensuite, ce workflow tirera vos dépendances NodeJS, les installera et construira votre application JavaScript.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight.

Votre application n'a pas besoin d'utiliser Ionic, seul le base Capacitor est obligatoire, elle peut avoir un ancien module Cordova, mais le plugin Capacitor JS doit être privilégié.

## 8. Déclencher le workflow

**Créer un commit**

Faites un _commit_, vous devriez voir le workflow actif dans le dépôt.

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le workflow.

![Commencé avec le commit](/cd_started.webp)

Après quelques minutes, la construction devrait être disponible dans votre tableau de bord App Store Connect.

![Tableau de bord Testflight](/testflight_app.webp)

## 9. Puis-je déployer depuis la machine locale ?

Oui, vous pouvez, et c'est très facile.

Vous pouvez utiliser Xcode pour construire et signer votre application, comme toujours.

### Merci

Ce blog est basé sur les articles suivants :
- [Livraison continue pour IOS utilisant Fastlane et GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Cette documentation GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
