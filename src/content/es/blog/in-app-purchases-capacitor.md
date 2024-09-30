---
slug: in-app-purchases-capacitor
title: compras en la aplicación para condensador
description: >-
  Cómo implementar compras dentro de la aplicación para aplicaciones de
  condensadores utilizando el complemento Capacitor Purchases y RevenueCat
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Revenue cat in app purchases
tag: Tutorial
published: true
next_blog: ''
locale: es
---

Capacitor Purchases es un complemento para el marco Capacitor que permite compras dentro de la aplicación en iOS y Android. Proporciona una API simple y consistente en múltiples plataformas, lo que facilita a los desarrolladores implementar suscripciones y compras dentro de la aplicación en sus aplicaciones móviles.

Una de las características clave del complemento Capacitor Purchases es que se integra con RevenueCat, una plataforma que proporciona herramientas para suscripciones y compras dentro de la aplicación. RevenueCat simplifica el proceso de implementación de suscripciones y compras dentro de la aplicación al proporcionar un sistema simple y consistente. API en múltiples plataformas y automatización de tareas como la validación de recibos y la gestión de usuarios.

Con RevenueCat, los desarrolladores pueden administrar fácilmente suscripciones, realizar un seguimiento de los ingresos y realizar otras tareas relacionadas. Algunas características que ofrece RevenueCat incluyen:

- Validación de recibos automatizada
- Gestión de usuarios
- Soporte para modelos de precios personalizados.
- Análisis detallados
-Escalabilidad

Al utilizar el complemento Capacitor Purchases con RevenueCat, los desarrolladores pueden ahorrar tiempo y esfuerzo al implementar suscripciones y compras dentro de la aplicación en sus aplicaciones móviles, y proporcionar funciones adicionales que pueden ayudar a mejorar la experiencia del usuario y aumentar los ingresos.

Al utilizar el complemento Capacitor Purchases y RevenueCat, los desarrolladores pueden administrar y rastrear fácilmente las suscripciones y compras dentro de la aplicación, validar recibos y administrar usuarios en múltiples plataformas. También permite crear modelos de precios personalizados y obtener análisis detallados para mejorar el rendimiento y los ingresos.


## Instalación

Asegúrese de utilizar la última versión de Capacitor y el complemento Capacitor Purchases. Puede consultar la última versión de Capacitor y el complemento Capacitor Purchases en el sitio web de Capacitor.

Para instalar el complemento Capacitor Purchases, ejecute el siguiente comando:
`npm i @capgo/capacitor-purchases`
agregue el complemento al código nativo de su aplicación
`sincronización de límite npx`


agregue la capacidad de compras dentro de la aplicación en Xcode:

![Xcode paso 1](/iap_step1webp)
entonces
![xcode paso 2](/iap_step2webp)

## 1 Crear una cuenta de RevenueCat
Esta guía le explicará cómo empezar a utilizar las suscripciones y el SDK de RevenueCat con solo unas pocas líneas de código.

Regístrese para obtener una nueva cuenta de RevenueCat [aquí](https://apprevenuecatcom/)

> ### 📘
> 
> 💡 ¡Aquí te dejamos un consejo!
> 
> RevenueCat recomienda crear una cuenta de RevenueCat separada para cada aplicación/proyecto que tenga, especialmente si alguna vez tiene la intención de vender la aplicación. Esto acelerará el proceso de transferencia, ya que puede transferir la cuenta completa en lugar de esperar a que el soporte de RevenueCat transfiera proyectos individuales.


### Organizaciones / Empresa

Recomendamos utilizar una cuenta de empresa al registrarse en RevenueCat y configurar su aplicación dentro de un proyecto. Podrá invitar al resto de su equipo como [colaboradores](https://wwwrevenuecatcom/docs/collaborators/) a su proyecto. pero **solo el propietario del proyecto puede administrar la facturación** Los colaboradores del proyecto no pueden administrar los detalles de facturación

## 2 Configuración de proyectos y aplicaciones


### ▶️ Crear un proyecto

Navegue al panel de RevenueCat y [agregue un nuevo proyecto](https://apprevenuecatcom/overview/) desde el menú desplegable en el menú de navegación superior llamado _Proyectos_

![RevenueCat paso 1](/revenuecat_step1webp)

El modo emergente para crear un nuevo proyecto.

### ▶️ Agregar una aplicación/plataforma

Desde **Configuración del proyecto > Aplicaciones** en el menú izquierdo del panel del proyecto, seleccione la plataforma para la aplicación que agregará

![RevenueCat paso 2](/revenuecat_step2webp)

Panel de proyecto para seleccionar la plataforma de la aplicación

El campo **Nombre de la aplicación** es obligatorio para agregar su aplicación a RevenueCat. El resto de los campos de configuración se pueden agregar más tarde. Para realizar compras de prueba y producción, el ID del paquete (iOS) / Nombre del paquete (Android) así como el Compartido Se deben configurar las credenciales secretas (iOS)/servicio (Android)

![RevenueCat paso 3](/revenuecat_step3web)

Página de configuración de la aplicación para una aplicación Apple App Store

> ### 📘
> 
> 💡 ¡Aquí te dejamos un consejo!
> 
> Después de registrar su aplicación, RevenueCat recomienda configurar [Notificaciones del servidor de plataforma](https://wwwrevenuecatcom/docs/server-notifications/) Estas notificaciones no son obligatorias, pero acelerarán los [webhooks](https://wwwrevenuecatcom/ docs/webhooks/) y tiempos de entrega de integración y reducir el tiempo de demora en la actualización de sus suscriptores

> ### 📘
> 
> Aplicaciones y usuarios de puesta en escena versus producción
> 
> RevenueCat en sí no tiene entornos separados para la puesta en escena y la producción. Más bien, las transacciones subyacentes para los usuarios se diferencian por sandbox y producción.
> 
> Cualquier aplicación de RevenueCat puede realizar compras tanto de sandbox como de producción en las tiendas. Si tiene aplicaciones separadas para la puesta en escena y la producción, puede crear múltiples proyectos en RevenueCat para reflejar su configuración.
> 
> Además, los usuarios tampoco están separados por entorno. El mismo usuario puede tener compras activas en el sandbox y compras activas en producción al mismo tiempo.


### ▶️ Credenciales de servicio

Es necesario configurar las credenciales de servicio para que RevenueCat se comunique con las tiendas de aplicaciones en su nombre. Consulte las guías de RevenueCat [App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [ Credenciales de servicio de Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) y [Secreto compartido de Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) para más información

Tenga en cuenta que las credenciales del servicio de reproducción pueden tardar hasta 36 horas en propagarse por los servidores de Google.

## 3 Configuración del producto

### ▶️ Configuración de la tienda

Antes de poder comenzar a usar RevenueCat para buscar productos, debe configurar sus productos en las tiendas respectivas. Consulte las siguientes guías para [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console]( https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) y [Stripe](https://wwwrevenuecatcom/docs/stripe- productos/) para obtener ayuda para navegar a través de este proceso

Si vende productos iOS, asegúrese de firmar su "Acuerdo de aplicaciones pagas" y completar su información bancaria y fiscal en **App Store Connect > Acuerdos, impuestos y banca** **Esto debe completarse antes de poder prueba cualquier compra**

> ### 📘
> 
> ¿Quiere omitir la configuración de la tienda mientras realiza la prueba?
> 
> En iOS, puede retrasar la configuración de productos en App Store Connect probando con los archivos de configuración StoreKit. Estos archivos de configuración requieren una configuración mínima y se pueden configurar directamente a través de Xcode.
> 
> Lea más sobre cómo configurar los archivos de configuración de StoreKit en la guía RevenueCat [Pruebas de Sandbox] (https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator)

### ▶️ Configurar productos y derechos en RevenueCat

Una vez que sus productos integrados en la aplicación se hayan configurado en [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/), o [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), deberá copiar esa configuración en el Panel de control de RevenueCat RevenueCat utiliza un sistema de derechos para controlar el acceso a funciones premium y ofertas para administrar el conjunto de productos que ofrece a los clientes.

Los derechos son el nivel de acceso al que un cliente tiene "derecho" después de comprar un producto específico.
Las ofertas son una forma sencilla de organizar los productos dentro de la aplicación que desea "ofrecer" en su muro de pago y configurarlos de forma remota. RevenueCat **recomienda** utilizar estas funciones para simplificar su código y permitirle cambiar productos sin lanzar una aplicación. actualizar

Consulte [Configuración de productos](https://wwwrevenuecatcom/docs/entitlements/) para configurar sus productos y luego organizarlos en Ofertas o Derechos

![RevenueCat paso 4](/revenuecat_step4webp)

## 4Uso del SDK de compras de RevenueCat

El SDK de RevenueCat implementa sin problemas compras y suscripciones en todas las plataformas mientras sincroniza tokens con el servidor de RevenueCat.

Si tiene problemas con el SDK, consulte [Solución de problemas de los SDK](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) para obtener orientación.

> ### 📘
> 
> Utilice únicamente su clave SDK pública para configurar Compras
> 
> Puede obtener su clave SDK pública en la pestaña **Claves API** en **Configuración del proyecto** en el panel

Solo debe configurar la instancia compartida de _Compras_ una vez, generalmente al iniciar la aplicación. Posteriormente, la misma instancia se comparte en toda su aplicación accediendo a la instancia "compartida" en el SDK.

Consulte la guía de RevenueCat sobre [Configuración de SDK](https://docsrevenuecatcom/docs/configuring-sdk/) para obtener más información y mejores prácticas.

Asegúrese de configurar _Compras_ solo con su clave SDK pública. Puede leer más sobre las diferentes claves API disponibles en RevenueCat [Guía de autenticación](https://wwwrevenuecatcom/docs/authentication/)


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

Durante el desarrollo, RevenueCat recomienda habilitar registros de depuración más detallados. Para obtener más información sobre estos registros, consulte su guía [Depuración](https://wwwrevenuecatcom/docs/debugging/)

Si planea utilizar RevenueCat junto con su código de compra existente, consulte su guía en [Modo observador](https://wwwrevenuecatcom/docs/observer-mode/)


> ### 📘
> 
> Configurar compras con ID de usuario
> 
> Si tiene un sistema de autenticación de usuario en su aplicación, puede proporcionar un identificador de usuario en el momento de la configuración o en una fecha posterior con una llamada a `logIn()`. Para obtener más información, consulte la guía de RevenueCat en [Identificación de usuarios] (https://wwwrevenuecatcom/docs/user-ids/)

El SDK buscará automáticamente las [Ofertas configuradas](https://wwwrevenuecatcom/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya se cargarán cuando los clientes inicien la pantalla de compra.

A continuación se muestra un ejemplo de cómo obtener ofertas. Puede utilizar ofertas para organizar la pantalla de su muro de pago. Consulte la guía de RevenueCat sobre [Visualización de productos](https://wwwrevenuecatcom/docs/displaying-products/) para obtener más información y mejores prácticas.

### ▶️ Buscar y mostrar productos disponibles

> ### 📘
> 
> Configurar compras con ID de usuario
> 
> Si tiene un sistema de autenticación de usuario en su aplicación, puede proporcionar un identificador de usuario en el momento de la configuración o en una fecha posterior con una llamada a `logIn()`. Para obtener más información, consulte la guía de RevenueCat en [Identificación de usuarios] (https://wwwrevenuecatcom/docs/user-ids/)

El SDK buscará automáticamente las [Ofertas configuradas](https://wwwrevenuecatcom/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya se cargarán cuando los clientes inicien la pantalla de compra.

A continuación se muestra un ejemplo de cómo obtener ofertas. Puede utilizar ofertas para organizar la pantalla de su muro de pago. Consulte la guía de RevenueCat sobre [Visualización de productos](https://wwwrevenuecatcom/docs/displaying-products/) para obtener más información y mejores prácticas.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si busca sus [Ofertas](https://wwwrevenuecatcom/docs/entitlements/#offerings), [productos](https://wwwrevenuecatcom/docs/entitlements/#products), o [paquetes] disponibles(https://wwwrevenuecatcom /docs/entitlements/#adding-packages) están vacíos, se debe a algún problema de configuración en la tienda respectiva

Las razones más comunes para esto en App Store Connect son un "Acuerdo de aplicaciones pagas" desactualizado o productos que no están al menos en el estado "Listo para enviar". En GooglePlay, esto generalmente ocurre cuando la aplicación no está publicada en un canal cerrado. y se agregó un usuario de prueba válido

Puede encontrar más información sobre cómo solucionar este problema en RevenueCat [Centro de ayuda](https://supportrevenuecatcom/hc/en-us/articles/360041793174/)

### ▶️ Realizar una compra

El SDK incluye un método sencillo para facilitar las comprasLa `compra:paquete` toma un paquete de la Oferta recuperada y procesa la transacción con la tienda de aplicaciones respectiva.

El siguiente código de ejemplo muestra el proceso de compra de un paquete y su confirmación desbloquea el contenido "your\_entitlement\_id". Puede encontrar más detalles sobre el método `purchase:package` en la guía de RevenueCat en [Realizar compras](https:// wwwrevenuecatcom/docs/making-purchases/)

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

### ▶️ Verificar estado de suscripción

Puede usar este método siempre que necesite obtener el estado más reciente, y es seguro llamarlo repetidamente durante el ciclo de vida de su aplicación. _Compras_ almacena automáticamente en caché la última `CustomerInfo` cada vez que se actualiza, por lo que en la mayoría de los casos, este método extrae del caché. y corre muy rápido

Es típico llamar a este método al decidir qué interfaz de usuario mostrarle al usuario y cada vez que el usuario realiza una acción que requiere un cierto nivel de derechos.

> ### 📘
> 
> 💡 ¡Aquí te dejamos un consejo!
> 
> Puede acceder a mucha más información sobre una suscripción que simplemente si está activa o no. Consulte la guía de RevenueCat en [Estado de la suscripción](https://wwwrevenuecatcom/docs/customer-info/) para saber si la suscripción está configurada para renovarse, si se detecta un problema con la tarjeta de crédito del usuario y más

RevenueCat permite a sus usuarios restaurar sus compras dentro de la aplicación, reactivando cualquier contenido que hayan comprado previamente en la **misma cuenta de tienda** (cuenta de Apple, Google o Amazon). Recomendamos que todas las aplicaciones tengan alguna forma para que los usuarios activen la método de restauración Tenga en cuenta que Apple requiere un mecanismo de restauración en caso de que un usuario pierda el acceso a sus compras (por ejemplo: desinstalar/reinstalar la aplicación, perder la información de su cuenta, etc.)

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

Si dos [ID de usuario de aplicación] diferentes (https://wwwrevenuecatcom/docs/user-ids/) restauran transacciones de la misma cuenta de tienda subyacente (cuenta de Apple, Google o Amazon)
RevenueCat puede intentar crear un alias entre las dos ID de usuario de la aplicación y contarlas como el mismo usuario en el futuro. Consulte la guía de RevenueCat sobre [Restauración de compras](https://wwwrevenuecatcom/docs/restoring-purchases/) para obtener más información sobre las diferentes comportamientos de restauración configurables

Dado que el SDK funciona perfectamente en cualquier plataforma, los cambios en la información de compra de un usuario pueden provenir de una variedad de fuentes. Puede responder a cualquier cambio en la "Información del cliente" de un cliente mediante un método de delegado opcional, "compras:recibidasActualizado:".

Este método se activará cada vez que el SDK reciba un objeto `CustomerInfo` actualizado de llamadas a `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)` o `restorePurchases()`.

Las actualizaciones de CustomerInfo _no_ se envían a su aplicación desde el backend de RevenueCat; las actualizaciones solo pueden ocurrir desde una solicitud de red saliente a RevenueCat, como se mencionó anteriormente

Dependiendo de su aplicación, puede ser suficiente ignorar al delegado y simplemente manejar los cambios en la información del cliente la próxima vez que se inicie su aplicación o en los bloques de finalización de los métodos del SDK.

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> ¡Lo hiciste!
> 
> Ahora ha implementado un sistema de compra de suscripciones con todas las funciones sin pasar un mes escribiendo el código del servidor. ¡Felicidades!

### Aplicaciones de muestra

Para descargar ejemplos más completos de integración del SDK, diríjase a los recursos de la aplicación de muestra de RevenueCat.

**[Ver ejemplos](https://wwwrevenuecatcom/docs/sample-apps/)**

Pronto publicaré una aplicación de muestra usando Capacitor y Vuejs.

Si necesita avanzar en el uso profundo del SDK de Capacitor, consulte la documentación [aquí](https://githubcom/Cap-go/capacitor-purchases/)

### Próximos pasos
\
- Si aún no lo ha hecho, asegúrese de que sus productos estén configurados correctamente consultando RevenueCat [guía sobre derechos](https://wwwrevenuecatcom/docs/entitlements/)
- Si desea utilizar sus propios identificadores de usuario, lea acerca de [configurar los ID de usuario de la aplicación] (https://wwwrevenuecatcom/docs/user-ids/) 
- Si se está mudando a RevenueCat desde otro sistema, consulte la guía de RevenueCat sobre [migrar sus suscripciones existentes](https://wwwrevenuecatcom/docs/migrar-suscripciones-existentes/)
- Una vez que esté listo para probar su integración, puede seguir las guías de RevenueCat sobre [pruebas y depuración](https://wwwrevenuecatcom/docs/debugging/)
- Si califica para el Programa para pequeñas empresas de la App Store, consulte la guía de RevenueCat sobre [cómo solicitar e informar a RevenueCat] (https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Si necesita una actualización en vivo en su aplicación 

Únase a su uso aquí 👇

## Regístrese aquí para obtener su cuenta

[Capgo](/registrarse/)