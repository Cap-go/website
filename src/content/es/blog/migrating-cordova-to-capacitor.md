---
slug: migrating-cordova-to-capacitor
title: 'Migración de una aplicación Web de Cordova a Capacitor: una guía paso a paso'
description: >-
  Esta guía es el primer paso para que le ayude a migrar su aplicación Web de
  Cordova a Capacitor, que le permitirá acceder a todas las secciones y
  facilitar la lectura de la lira y el éxito.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Cordova to Capacitor migration illustration
tag: Migration
published: true
next_blog: ''
locale: es
---

# Migración de una aplicación web usando Cordova a Capacitor: una guía paso a paso

Esta guía lo ayudará a migrar su aplicación web de Cordova a Capacitor, haciéndola fácil de leer y seguir. Cubriremos todas las secciones y brindaremos un enfoque paso a paso.

## Introducción a Cordova y Capacitor

Cordova y Capacitor son herramientas que permiten a los desarrolladores web crear aplicaciones nativas para varias plataformas utilizando HTML, CSS y JavaScript. Si bien comparten similitudes, existen diferencias clave en su enfoque de la gestión de proyectos nativos, la gestión de complementos y la gestión de CLI/versiones.

## Estrategia de migración

La migración de Cordova a Capacitor se puede realizar gradualmente o como un reemplazo completo, dependiendo de la complejidad de su aplicación. Capacitor es compatible con Cordova, lo que le permite cambiar sus aplicaciones web existentes cuando esté listo.

Para ayudar con la migración, considere usar la [Extensión de código Ionic VS](https://marketplacevisualstudiocom/items/?itemName=ionicinic) y auditar sus complementos de Cordova existentes. Puede continuar usando los complementos de Cordova si es necesario o reemplazarlos con equivalentes de Capacitor.

## Guía de migración paso a paso

Siga estos pasos para migrar su aplicación web de Cordova a Capacitor:

1 **Trabajar en una rama de código separada**: se recomienda trabajar en una rama de código separada al aplicar estos cambios

2 **Inicializa tu aplicación con Capacitor**: abre tu proyecto en la terminal y sigue las guías para [agregar Capacitor a una aplicación web](https://capacitorjscom/docs/getting-started/#adding-capacitor-to- your-app) o [agregar condensador a una aplicación Ionic](https://capacitorjscom/docs/getting-started/with-ionic/#existing-ionic-project) Utilice la información de su archivo `configxml` de Cordova para la aplicación nombre e ID del paquete

3 **Cree su aplicación web**: cree su proyecto web al menos una vez antes de agregar cualquier plataforma nativa. Esto garantiza que la carpeta `www` esté configurada correctamente en el archivo de configuración de Capacitor.

4 **Agregar plataformas**: Ejecute `npx cap add ios` y `npx cap add android` para agregar las plataformas iOS y Android. Esto creará carpetas de proyecto nativas separadas en la raíz de su proyecto.

5 **Generar íconos y pantallas de presentación**: si tiene íconos y imágenes de pantalla de presentación existentes, use la herramienta `cordova-res` para generarlos y copiarlos en los proyectos nativos.

6 **Audite y migre los complementos de Cordova existentes**: revise sus complementos de Cordova existentes y, si es posible, reemplácelos con equivalentes de Capacitor. Elimine los complementos innecesarios.

7 **Eliminar el complemento Cordova**: después de reemplazar o eliminar un complemento Cordova, desinstale el complemento y ejecute `npx cap sync` para eliminar el código del complemento del proyecto nativo.

8 **Aplicar permisos adicionales**: Mapee entre `pluginxml` y la configuración requerida en iOS y Android para aplicar los permisos necesarios

9 **Configurar preferencias**: agregue manualmente preferencias desde `configxml` al archivo de configuración de Capacitor

10 **Manejar configuraciones específicas de la plataforma**: configure elementos de `configxml` para cada plataforma (iOS y Android) según sea necesario

11 **Cambiar el esquema para servir contenido**: si es necesario, cambie el esquema utilizado para servir contenido en su aplicación para evitar la pérdida de datos.

12 **Pruebe y elimine Cordova**: pruebe su aplicación migrada para asegurarse de que todos los cambios se hayan aplicado correctamente. Una vez satisfecho, puede eliminar Cordova de su proyecto o dejarlo si planea continuar usando los complementos de Cordova.

¡Felicidades! Ha migrado exitosamente su aplicación web de Cordova a Capacitor. Para obtener más información sobre el uso de complementos de Cordova en un proyecto de Capacitor o el flujo de trabajo de desarrollo de Capacitor, visite la [documentación oficial de Capacitor](https://capacitorjscom/docs/)

## Actualizaciones en vivo con nuestro servicio Capgo

Estamos orgullosos de ofrecer Capgo, nuestra solución que permite actualizaciones en vivo para sus aplicaciones Capacitor, lo que le permite ofrecer actualizaciones inalámbricas (OTA) a un precio justo.Esta función es particularmente útil para realizar correcciones rápidas, implementar nuevas funciones y garantizar que sus usuarios siempre tengan la última versión de su aplicación sin esperar la aprobación de la tienda de aplicaciones.

### Cómo funciona nuestro servicio Capgo

Capgo es un servicio basado en la nube que le permite implementar actualizaciones en vivo para sus aplicaciones Capacitor. Consiste en un panel web y un SDK nativo que puede integrar en su aplicación. El SDK busca actualizaciones al inicio o en intervalos específicos y las descarga en en segundo plano Cuando hay una actualización disponible, el SDK solicitará al usuario que la instale. Si el usuario acepta, la actualización se instalará y aplicará inmediatamente

### Beneficios de las actualizaciones de Capgo Live

- **Actualizaciones más rápidas:** Implemente actualizaciones al instante sin esperar la aprobación de la tienda de aplicaciones
- **Reducción de la dependencia de Apple Store:** Evite las restricciones y limitaciones de la tienda de aplicaciones
- **Experiencia de usuario mejorada:** Mantenga a los usuarios interesados ​​con las últimas funciones y correcciones de errores sin necesidad de actualizar manualmente la aplicación.


### Cómo implementar actualizaciones de Capgo Live

Para implementar actualizaciones en vivo de Capgo en su proyecto Capacitor, siga estos pasos:
- Regístrese para obtener una [cuenta Capgo] (https://webcapgoapp/)
- Instala el SDK de Capgo en tu proyecto
- Configure su aplicación para buscar actualizaciones al inicio o en intervalos específicos
- Implemente actualizaciones en su aplicación usando el panel de Capgo

## Conclusión

Esperamos que esta guía le haya ayudado a migrar su aplicación web de Cordova a Capacitor. Si tiene alguna pregunta o necesita ayuda con el proceso de migración, no dude en contactarnos en nuestro servidor [discord](https://discordgg/VnYRvBfgA6)