---
slug: account-deletion-compliance-apple-guidelines
title: 'Cumplimiento de Eliminación de Cuenta: Directrices de Apple'
description: >-
  Conozca las directrices de eliminación de cuentas de Apple, los requisitos
  clave para desarrolladores y las mejores prácticas para garantizar la
  privacidad de los datos de los usuarios.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T03:15:15.208Z
updated_at: 2025-05-14T03:16:02.945Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/6823e678f8b9f5df39f52ef5-1747192562945.jpg
head_image_alt: Desarrollo Móvil
keywords: >-
  Apple guidelines, account deletion, user privacy, app compliance, mobile
  development
tag: 'Development, Mobile, Security'
published: true
locale: es
next_blog: ''
---
**Apple requiere que todas las aplicaciones en la [App Store](https://www.apple.com/app-store/) proporcionen una opción dentro de la aplicación para eliminar las cuentas de usuario.** Esta política, vigente desde el 30 de junio de 2022, asegura que los usuarios puedan borrar completamente sus datos, dándoles más control sobre su privacidad. Esto es lo que necesitas saber:

-   **Requisitos Clave**:
    
    -   La **opción de eliminación de cuenta** debe ser fácil de encontrar en la configuración de la aplicación.
    -   Los datos del usuario deben ser **completamente eliminados**, excepto cuando la retención sea legalmente requerida.
    -   Las aplicaciones que usan **"Iniciar sesión con Apple"** deben revocar los tokens a través de la API REST de Apple.
-   **Para Desarrolladores**:
    
    -   Probar el proceso de eliminación para facilidad de uso y eliminación completa de datos.
    -   Asegurar que los servicios de terceros también eliminen los datos de usuario.
    -   Usar herramientas como **[Capgo](https://capgo.app/)** para actualizaciones en vivo y monitoreo de cumplimiento.
-   **Problemas Comunes**:
    
    -   Sincronización de eliminaciones entre plataformas.
    -   Gestión de tokens huérfanos y purgas de datos incompletas.

El incumplimiento puede resultar en el rechazo o eliminación de la aplicación de la App Store. Los desarrolladores deben priorizar la privacidad del usuario y seguir las pautas de Apple para evitar problemas.

## Requisitos Técnicos

### Pasos Requeridos para la Eliminación

El proceso para eliminar una cuenta debe ser directo y fácil de encontrar. Colócalo de manera prominente en la configuración de la cuenta de la aplicación - no oculto en submenús o enlaces externos.

Aquí están los pasos clave a incluir:

-   **Verificación de Cuenta**: Asegura que la identidad del usuario se confirme mediante un código de correo electrónico o SMS.
-   **Comunicación Clara**: Explica claramente qué datos serán eliminados y destaca cualquier requisito legal para retener cierta información.
-   **Diálogo de Confirmación**: Proporciona una pantalla de confirmación final que describa las consecuencias de eliminar la cuenta.

Además, utiliza la API REST de Sign in with Apple para revocar tokens durante el proceso de eliminación de cuenta [\[2\]](https://developer.apple.com/news/?id=12m75xbj)[\[3\]](https://www.ketch.com/blog/posts/apple-delete-account-requirement).

Una vez que estos pasos estén implementados, concéntrate en asegurar que la eliminación de datos se alinee con estos requisitos.

### Estándares de Eliminación de Datos

| **Tipo de Datos** | **Requisitos de Eliminación** | **Consideraciones Legales** |
| --- | --- | --- |
| Contenido del Usuario | Eliminación completa | Puede necesitarse retención temporal |
| Datos de Autenticación | Eliminación inmediata | Se requiere revocación de tokens |
| Datos de Terceros | Eliminación coordinada | El cumplimiento varía según el servicio |
| Historial de Uso | Purga completa | Sujeto a reglas de retención legal |

Si los datos del usuario se almacenan con servicios de terceros, asegúrate de que esos servicios también eliminen los datos. Las industrias con regulaciones estrictas pueden requerir soporte adicional al cliente para asegurar el cumplimiento [\[2\]](https://developer.apple.com/news/?id=12m75xbj).

Es crucial verificar la adherencia a estos estándares mediante pruebas exhaustivas.

### Requisitos de Pruebas

Las pruebas del proceso de eliminación de cuenta son esenciales para asegurar el cumplimiento y la funcionalidad. Utiliza herramientas como [Xcode](https://developer.apple.com/xcode/) y herramientas de revisión de App Store para enfocarte en lo siguiente:

-   **Flujo de Eliminación**: Confirma que el proceso sea amigable para el usuario y fácil de acceder.
-   **Verificación de Datos**: Asegura que todos los datos del usuario sean completamente eliminados en todos los sistemas.
-   **Casos Límite**: Prueba escenarios que involucren compras dentro de la aplicación e integraciones de terceros.

Para desarrolladores que usan [Capacitor](https://capacitorjs.com/) con Capgo, las actualizaciones en vivo pueden ayudar a abordar problemas de cumplimiento rápidamente, evitando la necesidad de esperar la aprobación de la App Store. Durante las pruebas, asegúrate de verificar:

-   Revocación de tokens para usuarios que iniciaron sesión con Apple.
-   Eliminación completa de datos de todos los servicios conectados.
-   Manejo adecuado de suscripciones activas.

## Problemas Comunes y Soluciones

### Sincronización de Datos entre Plataformas

A veces, la eliminación de datos en iOS y Android no se sincroniza correctamente. Esto suele ocurrir debido a diferencias en cómo cada plataforma maneja el almacenamiento y los datos en caché.

Aquí está cómo abordar los problemas de sincronización:

-   **Manejador de Eliminación Centralizado**: Desarrolla un servicio unificado para gestionar tareas clave como:
    
    -   Limpieza del [almacenamiento local](https://capgo.app/plugins/capacitor-data-storage-sqlite/)
    -   Purga del almacenamiento seguro
    -   Finalización de procesos de sincronización en la nube
    -   Gestión de tokens
-   **Transmisión de Eventos entre Plataformas**: Utiliza lógica del lado del servidor para enviar eventos de eliminación a todas las sesiones y dispositivos activos, asegurando la consistencia.
    

### Actualizaciones de Plugins

Después de manejar la eliminación en toda la plataforma, necesitarás abordar los desafíos específicos de los plugins. Asegurar que los plugins sean compatibles y estén alineados con tu proceso de eliminación es crítico para evitar inconsistencias.

| **Problema** | **Impacto** | **Solución** |
| --- | --- | --- |
| Persistencia de Tokens | Los tokens huérfanos permanecen activos | Configurar revocación automática de tokens |
| Almacenamiento Local | La limpieza de datos puede estar incompleta | Realizar verificaciones recursivas de eliminación |
| Sincronización en la Nube | Los estados de eliminación pueden no coincidir | Usar manejadores síncronos para asegurar consistencia |

### Gestión de Actualizaciones de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6823e678f8b9f5df39f52ef5/21f0f35e63cf5752e2e56f9c4dd03eab.jpg)

La gestión de actualizaciones en tiempo real juega un papel fundamental en mantener el cumplimiento a través de plataformas y plugins. Aquí es donde **Capgo** puede simplificar el proceso de gestión de actualizaciones de eliminación de cuenta.

Así es como Capgo ayuda:

-   **Despliegues Graduales**: Prueba las actualizaciones del flujo de eliminación con un grupo pequeño antes de implementarlas ampliamente.
-   **Reversión Instantánea**: Si algo sale mal, vuelve a una versión estable anterior inmediatamente.
-   **Análisis de Actualizaciones**: Monitorea las tasas de éxito para los flujos de eliminación e identifica problemas de cumplimiento.

Según Capgo, las actualizaciones de cumplimiento llegan al 95% de los usuarios dentro de 24 horas[\[1\]](https://capgo.app). Además, todos los despliegues están asegurados con cifrado de extremo a extremo, garantizando la seguridad de los datos.

Para aprovechar al máximo Capgo para actualizaciones de cumplimiento:

-   **Control de Versiones**: Usa canales de actualización separados para probar flujos de eliminación antes de implementarlos para todos los usuarios.
-   **Monitoreo de Errores**: Configura alertas para eliminaciones fallidas o conflictos de plugins.
-   **Verificación de Cumplimiento**: Aprovecha los análisis de Capgo para confirmar que los usuarios están recibiendo las últimas actualizaciones para el cumplimiento de eliminación.

## Guía de Implementación

### Estándares de Interfaz de Usuario

Al diseñar la interfaz de usuario para la eliminación de cuenta, ten en cuenta estos puntos:

-   **Ubicación Principal**: Haz que la opción de eliminación sea fácil de encontrar. Colócala de manera prominente en la configuración de la cuenta (por ejemplo, _Configuración > Cuenta > Eliminar Cuenta_).
    
-   **Comunicación Clara**: Proporciona una explicación detallada de lo que sucede cuando se elimina una cuenta. Incluye información sobre:
    
    -   Qué datos serán eliminados
    -   Cualquier requisito legal de retención de datos
    -   Tiempos estimados para la eliminación
    -   Impactos potenciales en suscripciones activas
-   **Flujo de Verificación**: Asegura que el proceso sea seguro mediante:
    
    -   Solicitar a los usuarios que vuelvan a ingresar su contraseña
    -   Enviar un código de verificación por correo electrónico o SMS
    -   Mostrar diálogos de confirmación que describan claramente la acción

Estos estándares aseguran una experiencia amigable para el usuario mientras se alinean con protocolos de cumplimiento más amplios.

### Verificaciones Automatizadas de Cumplimiento

Para mantener una adhesión consistente a estos estándares, usa herramientas automatizadas para validar tu UI y procesos. Concéntrate en estas áreas críticas:

| Categoría de Prueba | Puntos de Verificación | Método de Implementación |
| --- | --- | --- |
| **Pruebas de UI** | Asegurar que la opción de eliminación sea fácil de encontrar | Usar pruebas automatizadas de navegación UI |
| **Eliminación de Datos** | Confirmar la eliminación completa de datos del usuario | Validar respuestas de API |
| **Gestión de Tokens** | Revocar tokens como "Iniciar sesión con Apple" | Realizar pruebas de integración de API REST |
| **Multiplataforma** | Asegurar consistencia en todos los dispositivos | Probar en múltiples dispositivos |

Las pruebas automatizadas regulares ayudan a identificar y abordar problemas potenciales antes de que afecten a los usuarios.

### Prevención de Riesgos

Para minimizar riesgos y asegurar operaciones fluidas, toma estos pasos:

-   **Gestión de Inventario de Datos**: Mantén un registro detallado de dónde se almacenan los datos del usuario. Esto incluye almacenamiento local, bases de datos en la nube, servicios de terceros, sistemas de autenticación y copias de seguridad. Verifica que los datos se eliminen de todas estas ubicaciones.
    
-   **Manejo de Errores**: Prepárate para problemas potenciales como:
    
    -   Interrupciones de red
    -   Llamadas API fallidas
    -   Eliminación incompleta de datos
    -   Errores de revocación de tokens  
        Implementa mecanismos de respaldo para manejar estos escenarios con elegancia.
-   **Monitoreo y Cumplimiento Legal**: Rastrea métricas clave como tasas de éxito de eliminación, tiempos promedio de finalización y cualquier dato remanente. Esto ayuda a identificar y resolver problemas rápidamente. Además, asegura el cumplimiento de requisitos legales, especialmente para industrias con regulaciones estrictas. Para aplicaciones en estos sectores, agrega pasos de verificación adicionales, documenta todos los procedimientos exhaustivamente y realiza auditorías regulares.
    

## Resumen

### Requisitos Principales

Desde el 30 de junio de 2022, Apple requiere que todas las aplicaciones incluyan una función nativa que permita a los usuarios eliminar completamente sus cuentas. A continuación, se presenta un desglose de los requisitos clave:

| **Categoría de Requisito** | **Detalles de Implementación** | **Notas de Cumplimiento** |
| --- | --- | --- |
| **Accesibilidad** | La opción de eliminación de cuenta debe ser fácil de encontrar dentro de la configuración de la aplicación. | Esta función debe estar integrada directamente en la aplicación. |
| **Manejo de Datos** | Los datos del usuario y la información de la cuenta deben eliminarse completamente. | Las eliminaciones parciales no cumplen con los estándares de cumplimiento. |
| **Autenticación** | Revocar correctamente los tokens para cuentas de "Iniciar sesión con Apple". | Usar la API REST de "Iniciar sesión con Apple" para la implementación. |
| **Comunicación** | Notificar claramente a los usuarios sobre el proceso de eliminación y los plazos. | Incluir información sobre políticas de retención de datos y obligaciones legales. |

Estas pautas forman la base para asegurar el cumplimiento de las políticas de Apple.

### Próximos Pasos

Para cumplir con estos requisitos, realice las siguientes acciones:

-   **Revisar el Almacenamiento de Datos**  
    Auditar todas las fuentes donde se almacenan datos de usuarios y evaluar las políticas de retención. Asegurar que las conexiones con terceros estén documentadas exhaustivamente.
    
-   **Implementar Flujos de Eliminación Seguros**  
    Establecer procesos para verificar las solicitudes de usuarios, revocar tokens y automatizar la eliminación de datos de usuarios.
    
-   **Protocolos de Pruebas**  
    Realizar pruebas exhaustivas en todas las plataformas, simular varios escenarios y mantener documentación para demostrar el cumplimiento.
    

Herramientas como Capgo pueden simplificar las actualizaciones permitiendo ajustes en vivo en tu aplicación. Las pruebas regulares y el monitoreo automatizado ayudarán a garantizar la integridad de los datos y mantener tu aplicación en cumplimiento a lo largo del tiempo. Además, mantente informado sobre los requisitos legales en evolución para evitar brechas de cumplimiento.

## Cómo Implementar la Eliminación de Cuenta en Tu Aplicación

<iframe src="https://www.youtube.com/embed/TC6d4pub1jU" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Preguntas Frecuentes

::: faq
### ¿Cómo pueden los desarrolladores asegurar que su aplicación cumpla con los requisitos de eliminación de cuenta de Apple?

Para cumplir con las pautas de eliminación de cuenta de Apple, los desarrolladores necesitan ofrecer a los usuarios una forma simple y clara de eliminar sus cuentas directamente dentro de la aplicación. El proceso debe ser fácil de encontrar, sencillo de seguir y no debe requerir que los usuarios visiten sitios web externos o contacten a equipos de soporte.

Para aquellos que utilizan Capacitor, herramientas como **Capgo** pueden facilitar el cumplimiento. Capgo permite actualizaciones en tiempo real de tu aplicación, lo que significa que puedes implementar cambios rápidamente - como ajustes en la función de eliminación de cuenta - sin esperar aprobaciones de la tienda de aplicaciones. Al asegurar el cumplimiento, no solo reduces el riesgo de rechazos de la aplicación sino que también fortaleces la confianza del usuario.
:::

::: faq
### ¿Cómo pueden los desarrolladores asegurar la eliminación adecuada de datos en todas las plataformas evitando problemas de sincronización?

Gestionar la eliminación de datos en varias plataformas no siempre es sencillo, especialmente cuando se debe cumplir con pautas específicas como las establecidas por Apple. Para abordar esto, los desarrolladores necesitan establecer sistemas backend confiables que procesen las solicitudes de eliminación de datos de manera uniforme en todas las plataformas integradas. Esto a menudo implica utilizar APIs o servicios que ejecuten eliminaciones simultáneamente, asegurando consistencia y previniendo desajustes.

Para aplicaciones creadas con Capacitor, herramientas como **Capgo** pueden simplificar esta tarea. Capgo admite actualizaciones en tiempo real y se alinea con los requisitos de Apple, ayudando a los desarrolladores a gestionar actualizaciones y funciones de la aplicación mientras cumplen con los estándares de eliminación de datos. Al utilizar herramientas que aseguran una sincronización fluida, los desarrolladores pueden minimizar errores y construir una mayor confianza del usuario.
:::

::: faq
### ¿Cómo pueden los desarrolladores de aplicaciones asegurar que sus aplicaciones cumplan con los requisitos de eliminación de cuenta de Apple?

## Asegurando el Cumplimiento de los Requisitos de Eliminación de Cuenta de Apple

Para cumplir con los requisitos de eliminación de cuenta de Apple, es crucial mantenerse actualizado sobre sus pautas y crear un proceso sencillo y amigable para la eliminación de cuentas dentro de tu aplicación. Revisar regularmente las Pautas de Revisión de la App Store de Apple, especialmente las secciones sobre gestión de cuentas y datos de usuarios, es un paso esencial para los desarrolladores.

Si tu aplicación está construida usando Capacitor, herramientas como **Capgo** pueden simplificar el proceso. Capgo ofrece características como actualizaciones en tiempo real y asegura que tu aplicación cumpla con los requisitos de la plataforma de Apple, todo mientras mantiene una experiencia de usuario fluida. Además, las pruebas y el monitoreo regulares son vitales para confirmar el cumplimiento y resolver rápidamente cualquier problema potencial.
:::
