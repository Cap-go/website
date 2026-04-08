---
slug: in-app-purchases-capacitor
title: compras dentro de la aplicación para Capacitor
description: >-
  Cómo implementar compras dentro de la aplicación para aplicaciones Capacitor
  usando el plugin Capacitor Purchases y RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Compras in-app de Revenue Cat
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: ''
---
>> Este plugin ha sido transferido al repositorio oficial de RevenueCat. Por favor, consulta la [documentación oficial](https://www.revenuecat.com/docs/getting-started/installation/capacitor) para más información.

Capacitor Purchases es un plugin para el framework Capacitor que permite compras dentro de la aplicación en iOS y Android. Proporciona una API simple y consistente en múltiples plataformas, facilitando a los desarrolladores la implementación de suscripciones y compras dentro de sus aplicaciones móviles.

Una de las características principales del plugin Capacitor Purchases es que se integra con RevenueCat, una plataforma que proporciona herramientas para suscripciones y compras dentro de la aplicación. RevenueCat simplifica el proceso de implementación de suscripciones y compras proporcionando una API simple y consistente en múltiples plataformas, y automatizando tareas como la validación de recibos y la gestión de usuarios.

Con RevenueCat, los desarrolladores pueden gestionar fácilmente las suscripciones, hacer seguimiento de ingresos y realizar otras tareas relacionadas. Algunas características ofrecidas por RevenueCat incluyen:

- Validación automática de recibos
- Gestión de usuarios
- Soporte para modelos de precios personalizados
- Análisis detallados
- Escalabilidad

Al usar el plugin Capacitor Purchases con RevenueCat, los desarrolladores pueden ahorrar tiempo y esfuerzo al implementar suscripciones y compras en sus aplicaciones móviles, y proporcionar características adicionales que pueden ayudar a mejorar la experiencia del usuario y aumentar los ingresos.

Usando el plugin Capacitor Purchases y RevenueCat, los desarrolladores pueden gestionar y hacer seguimiento fácilmente de las suscripciones y compras, validar recibos y gestionar usuarios en múltiples plataformas. También permite crear modelos de precios personalizados y obtener análisis detallados para mejorar el rendimiento y los ingresos.

## Instalación

Asegúrate de usar la última versión de Capacitor y el plugin Capacitor Purchases. Puedes verificar la última versión de Capacitor y el plugin Capacitor Purchases en el sitio web de Capacitor.

Para instalar el plugin Capacitor Purchases, ejecuta el siguiente comando:
`npm i @capgo/capacitor-purchases`
añade el plugin al código nativo de tu aplicación
`npx cap sync`

añade la capacidad de compras dentro de la aplicación en Xcode:

![Xcode step 1](/iap_step1.webp)
luego
![xcode step 2](/iap_step2.webp)

## 1. Crear una Cuenta RevenueCat
Esta guía te mostrará cómo empezar con suscripciones y el SDK de RevenueCat con solo unas pocas líneas de código.

Regístrate para una nueva cuenta RevenueCat [aquí](https://app.revenuecat.com/).

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> RevenueCat recomienda crear una cuenta RevenueCat separada para cada aplicación/proyecto que tengas, especialmente si alguna vez piensas vender la aplicación. Esto acelerará el proceso de transferencia, ya que puedes transferir la cuenta completa en lugar de esperar a que el Soporte de RevenueCat transfiera proyectos individuales.

### Organizaciones / Empresa

Recomendamos usar una cuenta de empresa al registrarse en RevenueCat y configurar tu aplicación dentro de un proyecto. Podrás invitar al resto de tu equipo como [colaboradores](https://www.revenuecat.com/docs/collaborators/) a tu proyecto, pero **solo el propietario del proyecto puede gestionar la facturación**. Los colaboradores del proyecto no pueden gestionar los detalles de facturación.

## 2. Configuración del Proyecto y la Aplicación

### ▶️ Crear un Proyecto

Navega al panel de RevenueCat y [añade un nuevo proyecto](https://app.revenuecat.com/overview/) desde el menú desplegable en la navegación superior llamado _Projects_.

![RevenueCat step 1](/revenuecat_step1.webp)

El modal emergente para crear un nuevo Proyecto

### ▶️ Añadir una Aplicación / Plataforma

Desde **Project Settings > Apps** en el menú izquierdo del panel del proyecto, selecciona la plataforma para la aplicación que vas a añadir.

![RevenueCat step 2](/revenuecat_step2.webp)

Panel del proyecto para seleccionar la plataforma de la aplicación

El campo **App name** es requerido para añadir tu aplicación a RevenueCat. El resto de los campos de configuración pueden añadirse más tarde. Para realizar compras de prueba y producción, el Bundle ID (iOS) / Package Name (Android) así como el Shared Secret (iOS) / Service Credentials (Android) deben estar configurados.

![RevenueCat step 3](/revenuecat_step3.webp)

Página de configuración de la aplicación para una aplicación de App Store

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> Después de registrar tu aplicación, RevenueCat recomienda configurar las [Notificaciones del Servidor de Plataforma](https://www.revenuecat.com/docs/server-notifications/). Estas notificaciones no son requeridas, pero acelerarán los tiempos de entrega de [webhooks](https://www.revenuecat.com/docs/webhooks/) e integraciones y reducirán el tiempo de retraso al actualizar tus suscriptores.

> ### 📘
> 
> Aplicaciones y usuarios de Staging vs. Producción
> 
> RevenueCat en sí no tiene entornos separados para staging y producción. Más bien, las transacciones subyacentes para los usuarios se diferencian por sandbox y producción.
> 
> Cualquier aplicación de RevenueCat puede realizar compras tanto de sandbox como de producción desde las tiendas. Si tienes aplicaciones separadas para staging y producción, puedes crear múltiples proyectos en RevenueCat para reflejar tu configuración.
> 
> Además, los usuarios tampoco están separados por entorno. El mismo usuario puede tener compras activas de sandbox y compras activas de producción al mismo tiempo.

### ▶️ Credenciales de Servicio

Las credenciales de servicio deben configurarse para que RevenueCat se comunique con las tiendas de aplicaciones en tu nombre. Consulta las guías de RevenueCat [App Store Connect Shared Secret](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret/), [Play Service Credentials](https://www.revenuecat.com/docs/creating-play-service-credentials/), y [Amazon Appstore Shared Secret](https://www.revenuecat.com/docs/service-credentials/amazon-appstore-credentials/) para más información.

Ten en cuenta que las credenciales de servicio de Play pueden tardar hasta 36 horas en propagarse por los servidores de Google.

## 3. Configuración de Productos

### ▶️ Configuración de la Tienda

Antes de poder comenzar a usar RevenueCat para obtener productos, debes configurar tus productos en las respectivas tiendas. Consulta las siguientes guías para [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), y [Stripe](https://www.revenuecat.com/docs/stripe-products/) para ayudarte a navegar por este proceso.

Si estás vendiendo productos iOS, asegúrate de firmar tu 'Acuerdo de Aplicaciones de Pago' y completar tu información bancaria y fiscal en **App Store Connect > Agreements, Tax, and Banking**. **Esto debe completarse antes de que puedas probar cualquier compra**.

> ### 📘
> 
> ¿Quieres omitir la configuración de la tienda mientras pruebas?
> 
> En iOS, puedes retrasar la configuración de productos en App Store Connect probando con archivos de configuración StoreKit en su lugar. Estos archivos de configuración requieren una configuración mínima y son configurables directamente a través de Xcode.
> 
> Lee más sobre la configuración de archivos StoreKit Configuration en la guía de [Pruebas en Sandbox](https://www.revenuecat.com/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) de RevenueCat.

### ▶️ Configurar Productos y Derechos en RevenueCat

Una vez que tus productos dentro de la aplicación han sido configurados en [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), o [Stripe](https://www.revenuecat.com/docs/stripe-products/), necesitarás copiar esa configuración en el panel de RevenueCat. RevenueCat utiliza un sistema de Derechos para controlar el acceso a características premium, y Ofertas para gestionar el conjunto de productos que ofreces a los clientes.

Los Derechos son el nivel de acceso al que un cliente tiene "derecho" después de comprar un producto específico.
Las Ofertas son una forma simple para que organices los productos dentro de la aplicación que deseas "ofrecer" en tu muro de pago y configurarlos de forma remota. RevenueCat **recomienda** utilizar estas características para simplificar tu código y permitirte cambiar productos sin lanzar una actualización de la aplicación.

Consulta [Configurando Productos](https://www.revenuecat.com/docs/entitlements/) para configurar tus productos y luego organizarlos en Ofertas o Derechos.

![RevenueCat step 4](/revenuecat_step4.webp)

## 4. Usando el SDK Purchases de RevenueCat

El SDK de RevenueCat implementa sin problemas compras y suscripciones a través de plataformas mientras sincroniza tokens con el servidor de RevenueCat.

Si tienes problemas con el SDK, consulta [Solución de problemas de los SDKs](https://www.revenuecat.com/docs/troubleshooting-the-sdks/) para obtener orientación.

> ### 📘
> 
> Usa solo tu clave SDK pública para configurar Purchases
> 
> Puedes obtener tu clave SDK pública desde la pestaña **API keys** bajo **Project settings** en el panel.

Solo debes configurar la instancia compartida de _Purchases_ una vez, generalmente al iniciar la aplicación. Posteriormente, la misma instancia se comparte en toda tu aplicación accediendo a la instancia `.shared` en el SDK.

Consulta la guía de RevenueCat sobre [Configurando SDK](https://docs.revenuecat.com/docs/configuring-sdk/) para más información y mejores prácticas.

Asegúrate de configurar _Purchases_ solo con tu clave SDK pública. Puedes leer más sobre las diferentes claves API disponibles en la guía de [Autenticación](https://www.revenuecat.com/docs/authentication/) de RevenueCat.

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

Durante el desarrollo, RevenueCat recomienda habilitar registros de depuración más detallados. Para más información sobre estos registros, consulta su guía de [Depuración](https://www.revenuecat.com/docs/debugging/).

Si planeas usar RevenueCat junto con tu código de compras existente, consulta su guía sobre [Modo Observador](https://www.revenuecat.com/docs/observer-mode/).

> ### 📘
> 
> Configurando Purchases con IDs de Usuario
> 
> Si tienes un sistema de autenticación de usuarios en tu aplicación, puedes proporcionar un identificador de usuario al momento de la configuración o en una fecha posterior con una llamada a `.logIn()`. Para aprender más, consulta la guía de RevenueCat sobre [Identificando Usuarios](https://www.revenuecat.com/docs/user-ids/).

El SDK obtendrá automáticamente las [Offerings configuradas](https://www.revenuecat.com/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya estarán cargados cuando los clientes abran su pantalla de compra.

A continuación se muestra un ejemplo de cómo obtener las Offerings. Puede utilizar las Offerings para organizar su pantalla de paywall. Consulte la guía de RevenueCat sobre [Mostrar Productos](https://www.revenuecat.com/docs/displaying-products/) para obtener más información y mejores prácticas.

### ▶️ Obtener y Mostrar Productos Disponibles

> ### 📘
> 
> Configurar Purchases con IDs de Usuario
> 
> Si tiene un sistema de autenticación de usuarios en su aplicación, puede proporcionar un identificador de usuario al momento de la configuración o en una fecha posterior con una llamada a `.logIn()`. Para obtener más información, consulte la guía de RevenueCat sobre [Identificación de Usuarios](https://www.revenuecat.com/docs/user-ids/).

El SDK obtendrá automáticamente las [Offerings configuradas](https://www.revenuecat.com/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya estarán cargados cuando los clientes abran su pantalla de compra.

A continuación se muestra un ejemplo de cómo obtener las Offerings. Puede utilizar las Offerings para organizar su pantalla de paywall. Consulte la guía de RevenueCat sobre [Mostrar Productos](https://www.revenuecat.com/docs/displaying-products/) para obtener más información y mejores prácticas.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si al obtener sus [Offerings](https://www.revenuecat.com/docs/entitlements/#offerings), [productos](https://www.revenuecat.com/docs/entitlements/#products) o [paquetes](https://www.revenuecat.com/docs/entitlements/#adding-packages) disponibles están vacíos, se debe a algún problema de configuración en la tienda respectiva.

Las razones más comunes para esto en App Store Connect son un 'Acuerdo de Aplicaciones de Pago' desactualizado o productos que no están al menos en estado 'Listo para Enviar'. En GooglePlay, esto generalmente ocurre cuando la aplicación no está publicada en una pista cerrada y no se ha agregado un usuario de prueba válido.

Puede encontrar más información sobre la solución de este problema en el [Centro de Ayuda](https://support.revenuecat.com/hc/en-us/articles/360041793174/) de RevenueCat.

### ▶️ Realizar una Compra

El SDK incluye un método simple para facilitar las compras. El método `purchase:package` toma un paquete de la Offering obtenida y procesa la transacción con la tienda de aplicaciones respectiva.

El ejemplo de código a continuación muestra el proceso de compra de un paquete y la confirmación de que desbloquea el contenido "your_entitlement_id". Puede encontrar más detalles sobre el método `purchase:package` en la guía de RevenueCat sobre [Realizar Compras](https://www.revenuecat.com/docs/making-purchases/).

```typescript
const purchase = async (p: Package): Promise<PurchaserInfo | null> => {
  try {
    // console.log('purchase', p)
    const data = await CapacitorPurchases.purchasePackage({
      identifier: p.identifier,
      offeringIdentifier: p.offeringIdentifier,
    })
    const purchaserInfo = data.purchaserInfo
    // console.log('listenBuy', purchaserInfo)
    if (purchaserInfo.activeSubscriptions.includes(p.identifier)) {
      // set the user as paid
    }
    return purchaserInfo
  }
  catch (e) {
    console.error('listenBuy error', e)
  }
  return null
}
```

### ▶️ Verificar el Estado de la Suscripción

Puede usar este método cuando necesite obtener el estado más reciente, y es seguro llamarlo repetidamente durante el ciclo de vida de su aplicación. _Purchases_ almacena automáticamente en caché la última `CustomerInfo` cada vez que se actualiza, por lo que en la mayoría de los casos, este método obtiene datos del caché y se ejecuta muy rápido.

Es típico llamar a este método cuando se decide qué UI mostrar al usuario, y siempre que el usuario realiza una acción que requiere un cierto nivel de derecho.

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> Puede acceder a mucha más información sobre una suscripción que simplemente si está activa o no. Consulte la guía de RevenueCat sobre [Estado de Suscripción](https://www.revenuecat.com/docs/customer-info/) para saber si la suscripción está configurada para renovarse, si se detecta algún problema con la tarjeta de crédito del usuario, y más.

RevenueCat permite a sus usuarios restaurar sus compras in-app, reactivando cualquier contenido que hayan comprado previamente desde la **misma cuenta de tienda** (cuenta de Apple, Google o Amazon). Recomendamos que todas las aplicaciones tengan alguna forma para que los usuarios activen el método de restauración. Tenga en cuenta que Apple requiere un mecanismo de restauración en caso de que un usuario pierda acceso a sus compras (por ejemplo: desinstalar/reinstalar la aplicación, perder su información de cuenta, etc.).

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

Si dos [IDs de Usuario de App](https://www.revenuecat.com/docs/user-ids/) diferentes restauran transacciones desde la misma cuenta de tienda subyacente (cuenta de Apple, Google o Amazon).
RevenueCat puede intentar crear un alias entre los dos IDs de Usuario de App y contarlos como el mismo usuario en adelante. Consulte la guía de RevenueCat sobre [Restaurar Compras](https://www.revenuecat.com/docs/restoring-purchases/) para obtener más información sobre los diferentes comportamientos de restauración configurables.

Dado que el SDK funciona perfectamente en cualquier plataforma, los cambios en la información de compra de un usuario pueden provenir de diversas fuentes. Puede responder a cualquier cambio en la `CustomerInfo` de un cliente implementando un método delegado opcional, `purchases:receivedUpdated:`.

Este método se activará cada vez que el SDK reciba un objeto `CustomerInfo` actualizado de las llamadas a `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)` o `restorePurchases()`.

Las actualizaciones de CustomerInfo _no_ se envían a su aplicación desde el backend de RevenueCat, las actualizaciones solo pueden ocurrir desde una solicitud de red saliente a RevenueCat, como se mencionó anteriormente.

Dependiendo de su aplicación, puede ser suficiente ignorar el delegado y simplemente manejar los cambios en la información del cliente la próxima vez que se inicie su aplicación o en los bloques de finalización de los métodos del SDK.

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> ¡Lo lograste!
> 
> Has implementado un sistema completo de compras por suscripción sin pasar un mes escribiendo código de servidor. ¡Felicitaciones!

### Aplicaciones de Ejemplo

Para descargar ejemplos más completos de integración del SDK, dirígete a los recursos de aplicaciones de ejemplo de RevenueCat.

**[Ver Ejemplos](https://www.revenuecat.com/docs/sample-apps/)**

Pronto publicaré una aplicación de ejemplo usando Capacitor y Vue.js.

Si necesitas hacer un uso más profundo del SDK de Capacitor, consulta la documentación [aquí](https://github.com/Cap-go/capacitor-purchases/).

### Próximos Pasos
\
-   Si aún no lo has hecho, asegúrate de que tus productos estén configurados correctamente consultando la [guía de derechos](https://www.revenuecat.com/docs/entitlements/) de RevenueCat.
-   Si deseas usar tus propios identificadores de usuario, lee sobre [configurar IDs de usuario de app](https://www.revenuecat.com/docs/user-ids/).
-   Si te estás mudando a RevenueCat desde otro sistema, consulta la guía de RevenueCat sobre [migrar tus suscripciones existentes](https://www.revenuecat.com/docs/migrating-existing-subscriptions/).
-   Una vez que estés listo para probar tu integración, puedes seguir las guías de RevenueCat sobre [pruebas y depuración](https://www.revenuecat.com/docs/debugging/).
-   Si calificas para el Programa para Pequeñas Empresas de App Store, consulta la guía de RevenueCat sobre [cómo aplicar e informar a RevenueCat](https://www.revenuecat.com/docs/app-store-small-business-program/)

Si necesitas actualizaciones en vivo en tu aplicación 

Únete aquí 👇

## Regístrate aquí para obtener tu cuenta

[Capgo](/register/)
