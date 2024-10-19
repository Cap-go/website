---
slug: in-app-purchases-capacitor
title: Compras dentro de la aplicación para Capacitor
description: >-
  Cómo implementar compras dentro de la aplicación para apps de Capacitor
  utilizando el plugin Capacitor Purchases y RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Compras dentro de la aplicación con Revenue Cat
tag: Tutorial
published: true
locale: es
next_blog: ''
---

Capacitor Purchases es un plugin para el framework Capacitor que permite compras dentro de la aplicación en iOS y Android. Proporciona una API simple y consistente en múltiples plataformas, facilitando a los desarrolladores implementar suscripciones y compras dentro de la aplicación en sus apps móviles.

Una de las características clave del plugin Capacitor Purchases es que se integra con RevenueCat, una plataforma que proporciona herramientas para suscripciones y compras dentro de la aplicación. RevenueCat simplifica el proceso de implementar suscripciones y compras dentro de la aplicación al proporcionar una API simple y consistente en múltiples plataformas, y automatizar tareas como la validación de recibos y la gestión de usuarios.

Con RevenueCat, los desarrolladores pueden gestionar fácilmente suscripciones, realizar seguimiento de ingresos y realizar otras tareas relacionadas. Algunas características ofrecidas por RevenueCat incluyen:

- Validación automatizada de recibos
- Gestión de usuarios
- Soporte para modelos de precios personalizados
- Análisis detallados
- Escalabilidad

Al usar el plugin Capacitor Purchases con RevenueCat, los desarrolladores pueden ahorrar tiempo y esfuerzo al implementar suscripciones y compras dentro de la aplicación en sus apps móviles, y proporcionar características adicionales que pueden ayudar a mejorar la experiencia del usuario y aumentar los ingresos.

Usando el plugin Capacitor Purchases y RevenueCat, los desarrolladores pueden gestionar y realizar seguimiento fácilmente de suscripciones y compras dentro de la aplicación, validar recibos y gestionar usuarios en múltiples plataformas. También permite crear modelos de precios personalizados y obtener análisis detallados para mejorar el rendimiento y los ingresos.

## Instalación

Asegúrate de usar la última versión de Capacitor y el plugin Capacitor Purchases. Puedes verificar la última versión de Capacitor y el plugin Capacitor Purchases en el sitio web de Capacitor.

Para instalar el plugin Capacitor Purchases, ejecuta el siguiente comando:
`npm i @capgo/capacitor-purchases`
agrega el plugin al código nativo de tu aplicación
`npx cap sync`

agrega la capacidad de compras dentro de la aplicación en Xcode:

## 1. Crear una Cuenta de RevenueCat
Esta guía te llevará a través de cómo comenzar con suscripciones y el SDK de RevenueCat con solo unas pocas líneas de código.

Regístrate para obtener una nueva cuenta de RevenueCat aquí.

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> RevenueCat recomienda crear una cuenta de RevenueCat separada para cada aplicación / proyecto que tengas, especialmente si alguna vez tienes la intención de vender la aplicación. Esto acelerará el proceso de transferencia, ya que puedes transferir la cuenta completa en lugar de esperar a que el Soporte de RevenueCat transfiera proyectos individuales.

### Organizaciones / Empresas

Recomendamos usar una cuenta de empresa al registrarse en RevenueCat y configurar tu aplicación dentro de un proyecto. Podrás invitar al resto de tu equipo como colaboradores a tu proyecto, pero **solo el propietario del proyecto puede gestionar la facturación**. Los colaboradores del proyecto no pueden gestionar detalles de facturación.

## 2. Configuración del Proyecto y la Aplicación

### ▶️ Crear un Proyecto

Navega al panel de control de RevenueCat y agrega un nuevo proyecto desde el menú desplegable en la navegación superior llamado _Proyectos_.

El modal emergente para crear un nuevo Proyecto

### ▶️ Agregar una Aplicación / Plataforma

Desde **Configuración del Proyecto > Aplicaciones** en el menú izquierdo del panel del proyecto, selecciona la plataforma para la aplicación que agregarás.

Panel del proyecto para seleccionar la plataforma de la aplicación

El campo **Nombre de la aplicación** es obligatorio para agregar tu aplicación a RevenueCat. El resto de los campos de configuración se pueden agregar más tarde. Para realizar compras de prueba y producción, el ID del Bundle (iOS) / Nombre del Paquete (Android), así como el Secreto Compartido (iOS) / Credenciales de Servicio (Android) deben estar configurados.webp)

Página de configuración de la aplicación para una aplicación de la App Store de Apple

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> Después de registrar su aplicación, RevenueCat recomienda configurar [Notificaciones del servidor de plataforma](https://wwwrevenuecatcom/docs/server-notifications/) Estas notificaciones no son obligatorias, pero acelerarán los tiempos de entrega de [webhooks](https://wwwrevenuecatcom/docs/webhooks/) e integración y reducirán el tiempo de retraso en la actualización de sus suscriptores

> ### 📘
> 
> Aplicaciones y usuarios de staging vs producción
> 
> RevenueCat en sí no tiene entornos separados para staging y producción. Más bien, las transacciones subyacentes para los usuarios se diferencian por sandbox y producción
> 
> Cualquier aplicación de RevenueCat puede realizar compras tanto en sandbox como en producción desde las tiendas. Si tiene aplicaciones separadas para staging y producción, puede crear múltiples proyectos en RevenueCat para reflejar su configuración
> 
> Además, los usuarios tampoco están separados por entorno. El mismo usuario puede tener compras activas en sandbox y compras activas en producción al mismo tiempo


### ▶️ Credenciales de servicio

Las credenciales de servicio deben configurarse para que RevenueCat se comunique con las tiendas de aplicaciones en su nombre. Consulte las guías de RevenueCat [Secreto compartido de App Store Connect](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Credenciales de servicio de Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) y [Secreto compartido de Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) para obtener más información

Tenga en cuenta que las credenciales de servicio de Play pueden tardar hasta 36 horas en propagarse por los servidores de Google

## 3 Configuración de productos

### ▶️ Configuración de la tienda

Antes de poder comenzar a usar RevenueCat para obtener productos, debe configurar sus productos en las respectivas tiendas. Consulte las siguientes guías para [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) y [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) para obtener ayuda para navegar por este proceso

Si está vendiendo productos de iOS, asegúrese de firmar su 'Acuerdo de aplicaciones de pago' y completar su información bancaria y fiscal en **App Store Connect > Acuerdos, impuestos y banca**. **Esto debe completarse antes de poder probar cualquier compra**

> ### 📘
> 
> ¿Quiere omitir la configuración de la tienda mientras prueba?
> 
> En iOS, puede retrasar la configuración de productos en App Store Connect probando con archivos de configuración de StoreKit en su lugar. Estos archivos de configuración requieren una configuración mínima y se pueden configurar directamente a través de Xcode
> 
> Lea más sobre cómo configurar archivos de configuración de StoreKit en la guía de [Pruebas en sandbox](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) de RevenueCat

### ▶️ Configurar productos y derechos en RevenueCat

Una vez que sus productos dentro de la aplicación se hayan configurado en [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) o [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), deberá copiar esa configuración en el panel de RevenueCat. RevenueCat utiliza un sistema de 'Derechos' para controlar el acceso a las funciones premium y 'Ofertas' para gestionar el conjunto de productos que ofrece a los clientes

Los derechos son el nivel de acceso al que un cliente tiene "derecho" después de comprar un producto específico
Las ofertas son una forma sencilla de organizar los productos dentro de la aplicación que desea "ofrecer" en su muro de pago y configurarlos de forma remota. RevenueCat **recomienda** utilizar estas funciones para simplificar su código y permitirle cambiar productos sin lanzar una actualización de la aplicación

Consulte [Configuración de productos](https://wwwrevenuecatcom/docs/entitlements/) para configurar sus productos y luego organizarlos en Ofertas o Derechos

![Paso 4 de RevenueCat](/revenuecat_step4webp)

## 4Usando el SDK de Compras de RevenueCat

El SDK de RevenueCat implementa de forma transparente compras y suscripciones en todas las plataformas mientras sincroniza tokens con el servidor de RevenueCat

Si tiene problemas con el SDK, consulte [Solución de problemas de los SDK](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) para obtener orientación

> ### 📘
> 
> Use solo su clave SDK pública para configurar Purchases
> 
> Puede obtener su clave SDK pública en la pestaña **Claves API** en **Configuración del proyecto** en el panel de control

Solo debe configurar la instancia compartida de _Purchases_ una vez, generalmente al iniciar la aplicación. Posteriormente, la misma instancia se comparte en toda su aplicación accediendo a la instancia `shared` en el SDK

Consulte la guía de RevenueCat sobre [Configuración del SDK](https://docsrevenuecatcom/docs/configuring-sdk/) para obtener más información y mejores prácticas

Asegúrese de configurar _Purchases_ solo con su clave SDK pública. Puede leer más sobre las diferentes claves API disponibles en RevenueCat en la [guía de autenticación](https://wwwrevenuecatcom/docs/authentication/)

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

Durante el desarrollo, RevenueCat recomienda habilitar registros de depuración más detallados. Para obtener más información sobre estos registros, consulte su guía de [Depuración](https://wwwrevenuecatcom/docs/debugging/)

Si planea usar RevenueCat junto con su código de compra existente, consulte su guía sobre el [Modo Observador](https://wwwrevenuecatcom/docs/observer-mode/)

> ### 📘
> 
> Configuración de Purchases con ID de usuario
> 
> Si tiene un sistema de autenticación de usuarios en su aplicación, puede proporcionar un identificador de usuario en el momento de la configuración o en una fecha posterior con una llamada a `logIn()`. Para obtener más información, consulte la guía de RevenueCat sobre [Identificación de usuarios](https://wwwrevenuecatcom/docs/user-ids/)

El SDK obtendrá automáticamente las [Ofertas configuradas](https://wwwrevenuecatcom/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya estarán cargados cuando los clientes lancen su pantalla de compra

A continuación se muestra un ejemplo de obtención de Ofertas. Puede utilizar las Ofertas para organizar su pantalla de pago. Consulte la guía de RevenueCat sobre [Mostrar productos](https://wwwrevenuecatcom/docs/displaying-products/) para obtener más información y mejores prácticas

### ▶️ Obtener y mostrar productos disponibles

> ### 📘
> 
> Configuración de Purchases con ID de usuario
> 
> Si tiene un sistema de autenticación de usuarios en su aplicación, puede proporcionar un identificador de usuario en el momento de la configuración o en una fecha posterior con una llamada a `logIn()`. Para obtener más información, consulte la guía de RevenueCat sobre [Identificación de usuarios](https://wwwrevenuecatcom/docs/user-ids/)

El SDK obtendrá automáticamente las [Ofertas configuradas](https://wwwrevenuecatcom/docs/entitlements/#offerings) y recuperará la información del producto de Apple, Google o Amazon. Por lo tanto, los productos disponibles ya estarán cargados cuando los clientes lancen su pantalla de compra

A continuación se muestra un ejemplo de obtención de Ofertas. Puede utilizar las Ofertas para organizar su pantalla de pago. Consulte la guía de RevenueCat sobre [Mostrar productos](https://wwwrevenuecatcom/docs/displaying-products/) para obtener más información y mejores prácticas

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si al obtener sus [Ofertas](https://wwwrevenuecatcom/docs/entitlements/#offerings), [productos](https://wwwrevenuecatcom/docs/entitlements/#products) o [paquetes](https://wwwrevenuecatcom/docs/entitlements/#adding-packages) disponibles están vacíos, se debe a algún problema de configuración en la tienda respectiva

Las razones más comunes para esto en App Store Connect son un 'Acuerdo de Aplicaciones Pagas' desactualizado o productos que no están al menos en el estado 'Listo para enviar'. En Google Play, esto generalmente ocurre cuando la aplicación no está publicada en una pista cerrada y no se ha agregado un usuario de prueba válido

Puede encontrar más información sobre la solución de este problema en el [Centro de Ayuda](https://supportrevenuecatcom/hc/en-us/articles/360041793174/) de RevenueCat

### ▶️ Realizar una compra

El SDK incluye un método simple para facilitar las comprasEl método `purchase:package` toma un paquete de la Oferta obtenida y procesa la transacción con la tienda de aplicaciones correspondiente.

El ejemplo de código a continuación muestra el proceso de comprar un paquete y confirmar que desbloquea el contenido "your_entitlement_id". Más detalles sobre el método `purchase:package` se pueden encontrar en la guía de RevenueCat sobre [Realizar Compras](https://wwwrevenuecatcom/docs/making-purchases/)

### ▶️ Verificar Estado de Suscripción

Puedes usar este método cuando necesites obtener el estado más reciente, y es seguro llamarlo repetidamente durante el ciclo de vida de tu aplicación. _Purchases_ automáticamente almacena en caché la última `CustomerInfo` cada vez que se actualiza, por lo que en la mayoría de los casos, este método obtiene datos de la caché y se ejecuta muy rápidamente.

Es típico llamar a este método al decidir qué interfaz mostrar al usuario, y siempre que el usuario realice una acción que requiera cierto nivel de derechos.

> ### 📘
> 
> 💡 ¡Aquí hay un consejo!
> 
> Puedes acceder a mucha más información sobre una suscripción que simplemente si está activa o no. Consulta la guía de RevenueCat sobre [Estado de Suscripción](https://wwwrevenuecatcom/docs/customer-info/) para saber si la suscripción está configurada para renovarse, si se detecta algún problema con la tarjeta de crédito del usuario, y más.

RevenueCat permite a tus usuarios restaurar sus compras dentro de la aplicación, reactivando cualquier contenido que hayan comprado previamente desde la **misma cuenta de tienda** (cuenta de Apple, Google o Amazon). Recomendamos que todas las aplicaciones tengan alguna forma para que los usuarios activen el método de restauración. Ten en cuenta que Apple requiere un mecanismo de restauración en caso de que un usuario pierda acceso a sus compras (por ejemplo: desinstalando/reinstalando la aplicación, perdiendo la información de su cuenta, etc.).

Si dos [ID de Usuario de App](https://wwwrevenuecatcom/docs/user-ids/) diferentes restauran transacciones de la misma cuenta de tienda subyacente (cuenta de Apple, Google o Amazon), RevenueCat puede intentar crear un alias entre los dos ID de Usuario de App y contarlos como el mismo usuario en adelante. Consulta la guía de RevenueCat sobre [Restaurar Compras](https://wwwrevenuecatcom/docs/restoring-purchases/) para obtener más información sobre los diferentes comportamientos de restauración configurables.

Dado que el SDK funciona perfectamente en cualquier plataforma, los cambios en la información de compra de un usuario pueden provenir de diversas fuentes. Puedes responder a cualquier cambio en la `CustomerInfo` de un cliente implementando un método delegado opcional, `purchases:receivedUpdated:`.

Este método se activará cada vez que el SDK reciba un objeto `CustomerInfo` actualizado de las llamadas a `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, o `restorePurchases()`.

Las actualizaciones de CustomerInfo no se envían a tu aplicación desde el backend de RevenueCat, las actualizaciones solo pueden ocurrir a partir de una solicitud de red saliente a RevenueCat, como se mencionó anteriormente.

Dependiendo de tu aplicación, puede ser suficiente ignorar el delegado y simplemente manejar los cambios en la información del cliente la próxima vez que se inicie tu aplicación o en los bloques de finalización de los métodos del SDK.

> ### 👍
> 
> ¡Lo lograste!
> 
> Ahora has implementado un sistema de compra de suscripciones completo sin pasar un mes escribiendo código de servidor. ¡Felicidades!

### Aplicaciones de Ejemplo

Para descargar ejemplos más completos de integración del SDK, dirígete a los recursos de aplicaciones de ejemplo de RevenueCat.

**[Ver Ejemplos](https://wwwrevenuecatcom/docs/sample-apps/)**

Pronto publicaré una aplicación de ejemplo usando Capacitor y Vuejs.

Si necesitas un uso más profundo del SDK de Capacitor, consulta la documentación [aquí](https://githubcom/Cap-go/capacitor-purchases/)

### Próximos Pasos

- Si aún no lo has hecho, asegúrate de que tus productos estén configurados correctamente consultando la [guía sobre derechos](https://wwwrevenuecatcom/docs/entitlements/) de RevenueCat.
- Si quieres usar tus propios identificadores de usuario, lee sobre [configurar ID de usuario de la app](https://wwwrevenuecatcom/docs/user-ids/)
- Si te estás mudando a RevenueCat desde otro sistema, consulta la guía de RevenueCat sobre [migrar tus suscripciones existentes](https://wwwrevenuecatcom/docs/migrating-existing-subscriptions/)
-   Cuando estés listo para probar tu integración, puedes seguir las guías de RevenueCat sobre [pruebas y depuración](https://wwwrevenuecatcom/docs/debugging/)
-   Si calificas para el Programa para Pequeñas Empresas de la App Store, consulta la guía de RevenueCat sobre [cómo aplicar e informar a RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Si necesitas actualizaciones en vivo en tu aplicación

Únete a nosotros aquí 👇

## Regístrate aquí para obtener tu cuenta

[Capgo](/register/)