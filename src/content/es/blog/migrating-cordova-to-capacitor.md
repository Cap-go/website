---
slug: migrating-cordova-to-capacitor
title: 'Migración de una aplicación web de Cordova a Capacitor: Una guía paso a paso'
description: >-
  Esta guía paso a paso te ayuda a migrar tu aplicación web de Cordova a
  Capacitor, cubre todas las secciones y es fácil de leer y seguir.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Ilustración de migración de Cordova a Capacitor
tag: Migration
published: true
locale: es
next_blog: ''
---

# Migración de una aplicación web que usa Cordova a Capacitor: Una guía paso a paso

Esta guía te ayudará a migrar tu aplicación web de Cordova a Capacitor, haciéndola fácil de leer y seguir. Cubriremos todas las secciones y proporcionaremos un enfoque paso a paso.

## Introducción a Cordova y Capacitor

Cordova y Capacitor son herramientas que permiten a los desarrolladores web crear aplicaciones nativas para varias plataformas utilizando HTML, CSS y JavaScript. Aunque comparten similitudes, existen diferencias clave en su enfoque de gestión de proyectos nativos, gestión de plugins y gestión de CLI/versiones.

## Estrategia de migración

La migración de Cordova a Capacitor puede realizarse gradualmente o como un reemplazo completo, dependiendo de la complejidad de tu aplicación. Capacitor es compatible con versiones anteriores de Cordova, lo que te permite cambiar tus aplicaciones web existentes cuando estés listo.

Para ayudar con la migración, considera usar la [Extensión de Ionic para VS Code](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) y auditar tus plugins de Cordova existentes. Puedes seguir usando plugins de Cordova si es necesario, o reemplazarlos con equivalentes de Capacitor.

## Guía de migración paso a paso

Sigue estos pasos para migrar tu aplicación web de Cordova a Capacitor:

1. **Trabaja en una rama de código separada**: Se recomienda trabajar en una rama de código separada al aplicar estos cambios.

2. **Inicializa tu aplicación con Capacitor**: Abre tu proyecto en la terminal y sigue las guías para [agregar Capacitor a una aplicación web](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) o [agregar Capacitor a una aplicación Ionic](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Usa la información de tu archivo `config.xml` de Cordova para el nombre de la aplicación y el ID del paquete.

3. **Compila tu aplicación web**: Compila tu proyecto web al menos una vez antes de agregar plataformas nativas. Esto asegura que la carpeta `www` esté configurada correctamente en el archivo de configuración de Capacitor.

4. **Agrega plataformas**: Ejecuta `npx cap add ios` y `npx cap add android` para agregar las plataformas iOS y Android. Esto creará carpetas de proyectos nativos separadas en la raíz de tu proyecto.

5. **Genera iconos y pantallas de bienvenida**: Si tienes imágenes de iconos y pantallas de bienvenida existentes, usa la herramienta `cordova-res` para generarlas y copiarlas en los proyectos nativos.

6. **Audita y migra los plugins de Cordova existentes**: Revisa tus plugins de Cordova existentes y reemplázalos con equivalentes de Capacitor si es posible. Elimina los plugins innecesarios.

7. **Elimina el plugin de Cordova**: Después de reemplazar o eliminar un plugin de Cordova, desinstala el plugin y ejecuta `npx cap sync` para eliminar el código del plugin del proyecto nativo.

8. **Aplica permisos adicionales**: Mapea entre `plugin.xml` y la configuración requerida en iOS y Android para aplicar los permisos necesarios.

9. **Configura preferencias**: Agrega manualmente las preferencias de `config.xml` al archivo de configuración de Capacitor.

10. **Maneja configuraciones específicas de plataforma**: Configura los elementos de `config.xml` para cada plataforma (iOS y Android) según sea necesario.

11. **Cambia el esquema para servir contenido**: Si es necesario, cambia el esquema utilizado para servir contenido en tu aplicación para evitar la pérdida de datos.

12. **Prueba y elimina Cordova**: Prueba tu aplicación migrada para asegurarte de que todos los cambios se hayan aplicado correctamente. Una vez satisfecho, puedes eliminar Cordova de tu proyecto o dejarlo si planeas seguir usando plugins de Cordova.

¡Felicidades! Has migrado exitosamente tu aplicación web de Cordova a Capacitor. Para aprender más sobre el uso de plugins de Cordova en un proyecto de Capacitor o el flujo de trabajo de desarrollo de Capacitor, visita la [documentación oficial de Capacitor](https://capacitorjs.com/docs/).

## Actualizaciones en vivo con nuestro servicio Capgo

Nos enorgullece ofrecer Capgo, nuestra solución que permite actualizaciones en vivo para tus aplicaciones de Capacitor, permitiéndote entregar actualizaciones Over-The-Air (OTA) a un precio justo.Este recurso es particularmente útil para realizar correcciones rápidas, implementar nuevas funciones y garantizar que sus usuarios siempre tengan la versión más reciente de su aplicación sin esperar la aprobación de la tienda de aplicaciones

### Cómo funciona nuestro servicio Capgo

Capgo es un servicio basado en la nube que le permite implementar actualizaciones en vivo en sus aplicaciones Capacitor. Consiste en un panel web y un SDK nativo que puede integrar en su aplicación. El SDK verifica si hay actualizaciones al inicio o en intervalos específicos y las descarga en segundo plano. Cuando hay una actualización disponible, el SDK solicitará al usuario que la instale. Si el usuario acepta, la actualización se instalará y aplicará inmediatamente.

### Beneficios de las actualizaciones en vivo de Capgo

- **Actualizaciones más rápidas:** Implemente actualizaciones al instante sin esperar la aprobación de la tienda de aplicaciones
- **Dependencia reducida de la App Store:** Evite las restricciones y limitaciones de la tienda de aplicaciones
- **Mejor experiencia de usuario:** Mantenga a los usuarios comprometidos con las últimas funciones y correcciones de errores sin requerir que actualicen manualmente la aplicación

### Cómo implementar actualizaciones en vivo de Capgo

Para implementar actualizaciones en vivo de Capgo en su proyecto Capacitor, siga estos pasos:
- Regístrese para obtener una [cuenta de Capgo](https://webcapgoapp/)
- Instale el SDK de Capgo en su proyecto
- Configure su aplicación para que busque actualizaciones al inicio o en intervalos específicos
- Implemente actualizaciones en su aplicación utilizando el panel de Capgo

## Conclusión

Esperamos que esta guía le haya ayudado a migrar su aplicación web de Cordova a Capacitor. Si tiene alguna pregunta o necesita ayuda con el proceso de migración, no dude en contactarnos en nuestro servidor de [discord](https://discordgg/VnYRvBfgA6)