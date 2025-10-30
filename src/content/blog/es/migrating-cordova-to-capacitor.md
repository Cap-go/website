---
slug: migrating-cordova-to-capacitor
title: 'Migrando una aplicación web de Cordova a Capacitor: Una guía paso a paso'
description: >-
  Esta guía paso a paso cubre todas las secciones de la migración de una
  aplicación web de Cordova a Capacitor, presentada de manera clara y
  comprensible.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Migración de Cordova a Capacitor
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: es
next_blog: ''
---

# Migración de una aplicación web de Cordova a Capacitor: Una guía paso a paso

Esta guía te ayudará a migrar tu aplicación web de Cordova a Capacitor, haciéndola fácil de leer y seguir. Cubriremos todas las secciones y proporcionaremos un enfoque paso a paso.

## Introducción a Cordova y Capacitor

Cordova y Capacitor son herramientas que permiten a los desarrolladores web crear aplicaciones nativas para varias plataformas usando HTML, CSS y JavaScript. Aunque comparten similitudes, hay diferencias clave en su enfoque para la gestión de proyectos nativos, gestión de plugins y gestión de CLI/versiones.

## Estrategia de migración

La migración de Cordova a Capacitor se puede hacer gradualmente o como un reemplazo completo, dependiendo de la complejidad de tu aplicación. Capacitor es compatible con versiones anteriores de Cordova, permitiéndote cambiar tus aplicaciones web existentes cuando estés listo.

Para ayudar con la migración, considera usar la [Ionic VS Code Extension](https://marketplacevisualstudiocom/items/?itemName=ionicionic) y auditar tus plugins de Cordova existentes. Puedes continuar usando plugins de Cordova si es necesario, o reemplazarlos con equivalentes de Capacitor.

## Guía de migración paso a paso

Sigue estos pasos para migrar tu aplicación web de Cordova a Capacitor:

1. **Trabaja en una rama de código separada**: Se recomienda trabajar en una rama de código separada al aplicar estos cambios.

2. **Inicializa tu aplicación con Capacitor**: Abre tu proyecto en la terminal y sigue las guías para [agregar Capacitor a una aplicación web](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) o [agregar Capacitor a una aplicación Ionic](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Usa la información de tu archivo `configxml` de Cordova para el nombre de la aplicación y el ID del Bundle.

3. **Construye tu aplicación web**: Construye tu proyecto web al menos una vez antes de agregar plataformas nativas. Esto asegura que la carpeta `www` esté configurada correctamente en el archivo de configuración de Capacitor.

4. **Agrega plataformas**: Ejecuta `npx cap add ios` y `npx cap add android` para agregar las plataformas iOS y Android. Esto creará carpetas de proyecto nativas separadas en la raíz de tu proyecto.

5. **Genera iconos y pantallas de inicio**: Si tienes imágenes de iconos y pantallas de inicio existentes, usa la herramienta `cordova-res` para generarlas y copiarlas en los proyectos nativos.

6. **Audita y migra los plugins existentes de Cordova**: Revisa tus plugins existentes de Cordova y reemplázalos con equivalentes de Capacitor si es posible. Elimina cualquier plugin innecesario.

7. **Elimina el plugin de Cordova**: Después de reemplazar o eliminar un plugin de Cordova, desinstala el plugin y ejecuta `npx cap sync` para eliminar el código del plugin del proyecto nativo.

8. **Aplica permisos adicionales**: Mapea entre `pluginxml` y la configuración requerida en iOS y Android para aplicar los permisos necesarios.

9. **Configura preferencias**: Agrega manualmente las preferencias de `configxml` al archivo de configuración de Capacitor.

10. **Maneja configuraciones específicas de plataforma**: Configura elementos de `configxml` para cada plataforma (iOS y Android) según sea necesario.

11. **Cambia el esquema para servir contenido**: Si es necesario, cambia el esquema utilizado para servir contenido en tu aplicación para evitar pérdida de datos.

12. **Prueba y elimina Cordova**: Prueba tu aplicación migrada para asegurarte de que todos los cambios se han aplicado correctamente. Una vez satisfecho, puedes eliminar Cordova de tu proyecto o dejarlo si planeas continuar usando plugins de Cordova.

¡Felicitaciones! Has migrado exitosamente tu aplicación web de Cordova a Capacitor. Para aprender más sobre el uso de plugins de Cordova en un proyecto de Capacitor o el flujo de trabajo de desarrollo de Capacitor, visita la [documentación oficial de Capacitor](https://capacitorjs.com/docs/)

## Actualizaciones en vivo con nuestro servicio Capgo

Nos enorgullece ofrecer Capgo, nuestra solución que permite actualizaciones en vivo para tus aplicaciones Capacitor, permitiéndote entregar actualizaciones Over-The-Air (OTA) a un precio justo.Esta función es particularmente útil para realizar correcciones rápidas, implementar nuevas características y asegurar que sus usuarios siempre tengan la última versión de su aplicación sin esperar la aprobación de la tienda de aplicaciones

### Cómo funciona nuestro servicio Capgo

Capgo es un servicio basado en la nube que te permite implementar actualizaciones en vivo en tus aplicaciones Capacitor. Consiste en un panel web y un SDK nativo que puedes integrar en tu aplicación. El SDK verifica actualizaciones al inicio o en intervalos específicos y las descarga en segundo plano. Cuando hay una actualización disponible, el SDK solicitará al usuario que la instale. Si el usuario acepta, la actualización se instalará y aplicará inmediatamente.

### Beneficios de las actualizaciones en vivo de Capgo

- **Actualizaciones más rápidas:** Implementa actualizaciones al instante sin esperar la aprobación de la tienda de aplicaciones
- **Dependencia reducida de la App Store:** Evita las restricciones y limitaciones de la tienda de aplicaciones
- **Mejor experiencia de usuario:** Mantén a los usuarios involucrados con las últimas características y correcciones de errores sin requerir que actualicen manualmente la aplicación

### Cómo implementar actualizaciones en vivo de Capgo

Para implementar actualizaciones en vivo de Capgo en tu proyecto Capacitor, sigue estos pasos:
- Regístrate para obtener una [cuenta de Capgo](https://console.capgo.app/)
- Instala el SDK de Capgo en tu proyecto
- Configura tu aplicación para verificar actualizaciones al inicio o en intervalos específicos
- Implementa actualizaciones en tu aplicación usando el panel de Capgo

## Conclusión

Esperamos que esta guía te haya ayudado a migrar tu aplicación web de Cordova a Capacitor. Si tienes alguna pregunta o necesitas ayuda con el proceso de migración, no dudes en contactarnos en nuestro servidor de [discord](https://discordgg/VnYRvBfgA6)
