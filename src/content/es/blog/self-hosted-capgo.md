---
slug: self-hosted-capgo
title: Capgo autohospedado
description: >-
  El autoalojamiento de Capgo le permite distribuir actualizaciones en vivo de
  Capacitor a sus usuarios sin tener que utilizar el servicio en la nube de
  Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: Capgo autohospedado
tag: Solution
published: true
locale: es
next_blog: ''
---

Este artículo proporciona una guía paso a paso sobre cómo alojar Capgo por cuenta propia, así como una discusión sobre los beneficios y desafíos del alojamiento propio.

# Introducción

El alojamiento propio es una forma de ejecutar tu propio sitio web o aplicación configurando un servidor y una red por ti mismo. En lugar de utilizar una Plataforma como Servicio o un Proveedor de Nube Pública, quienes eligen el alojamiento propio ejecutarán sus propias redes y serán responsables del mantenimiento y el tiempo de actividad además de construir su sitio web o aplicación.

La forma más fácil de comenzar con Capgo es con nuestro [servicio oficial gestionado en la nube](https://capgo.app/), pero si estás dispuesto a gestionarlo tú mismo, también puedes alojar Capgo en tu propio servidor.

## ¿Qué es el alojamiento propio?

El alojamiento propio, en el contexto del ámbito digital, se refiere a la práctica de ejecutar tus propios servidores o infraestructura de alojamiento para gestionar y controlar tu presencia en línea y servicios. En lugar de depender de proveedores de alojamiento de terceros, individuos y organizaciones eligen configurar y gestionar sus servidores, sitios web, aplicaciones y almacenamiento de datos en sus propios términos.

## ¿Por qué elegir el alojamiento propio?

Hay muchas razones por las que las personas eligen el alojamiento propio. Algunos de los beneficios más comunes incluyen:

* **Privacidad y control:** El alojamiento propio te da control completo sobre tus datos y privacidad. No tienes que preocuparte de que proveedores terceros rastreen tu actividad o vendan tus datos.

* **Ahorro de costos:** El alojamiento propio puede ser más rentable a largo plazo, especialmente si estás utilizando muchos recursos o ejecutando múltiples servicios.

* **Personalización:** El alojamiento propio te da la flexibilidad de personalizar tus aplicaciones y servicios para satisfacer tus necesidades específicas.

* **Aprendizaje y experimentación:** El alojamiento propio puede ser una gran manera de aprender sobre Linux, administración de sistemas y otros temas técnicos. También puede ser una forma divertida de experimentar con nuevo software y servicios.

* **Independencia:** El alojamiento propio reduce tu dependencia de proveedores externos. No estás a merced de sus términos de servicio, cambios de precios o posibles interrupciones del servicio. Esta independencia puede ser crucial para empresas e individuos que dependen de su presencia en línea para funciones críticas.

## ¿Cuál es la diferencia entre Capgo Cloud y Capgo Self-Hosted?

Solo hay una versión de Capgo. Tanto mi producto Cloud como mi Self-Hosted son completamente iguales. No hay una versión comercial premium y exclusiva con un conjunto de características mejor o más completo.

Obtienes el mismo panel de control, las mismas métricas accionables y el mismo compromiso de [respetar la privacidad de tus visitantes](https://capgo.app/privacy/) con ambos.

Comencé a desarrollar Capgo en diciembre de 2018 y lancé el negocio de suscripción SaaS en mayo de 2019. El proyecto está muy vivo, se desarrolla activamente y crece rápidamente. También es robusto y probado en batalla.

Aquí están las diferencias entre Capgo Cloud y Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Alojamiento** | Fácil y conveniente. Toma 2 minutos comenzar a enviar tu primera actualización, alta disponibilidad, copias de seguridad, seguridad y mantenimiento, todo hecho por mí. Yo gestiono todo por ti para que no tengas que preocuparte por nada. | Lo haces todo tú mismo. Necesitas obtener un servidor y gestionar tu infraestructura. Eres responsable de la instalación, mantenimiento, actualizaciones, capacidad del servidor, tiempo de actividad, copia de seguridad, seguridad, estabilidad, consistencia, tiempo de carga, etc. |
| **Almacenamiento** | Todos los datos de los visitantes se procesan exclusivamente en infraestructura en la nube propiedad de la UE. Mantengo los datos de tu sitio en un servidor seguro y encriptado en Alemania. Esto asegura que los datos de tu sitio estén protegidos por las estrictas leyes de privacidad de datos de la Unión Europea y garantiza el cumplimiento del RGPD. Los datos de tu sitio web nunca salen de la UE. | Tienes control total y puedes alojar tu Capgo en cualquier servidor en cualquier país que desees. Alójalo en un servidor en tu sótano o alójalo con cualquier proveedor de nube donde quieras, incluso aquellos que no cumplen con el RGPD.|
| **Datos sin procesar** | Puedes ver todas las estadísticas y métricas de tu sitio en mi panel de control moderno, fácil de usar y de carga rápida. Solo puedes ver las estadísticas agregadas en el panel | ¿Eres un analista y quieres acceso a los datos sin procesar? Hospedar Capgo tú mismo te da esa opción. Toma los datos directamente de la base de datos e impórtalos a una herramienta de análisis de datos de tu elección |
| **Costos** | Hay un costo asociado con proporcionar un servicio de actualización, por lo que cobro una tarifa de suscripción | Solo necesitas pagar por tu servidor y cualquier costo asociado con ejecutar un servidor. Nunca tienes que pagarme ninguna tarifa, solo a tu proveedor de nube |
| **Soporte Premium** | Soporte real proporcionado por seres humanos reales que construyen y mantienen Capgo | El soporte premium no está incluido. La versión autohospedada solo tiene soporte comunitario |
| **Versiones** | Desarrollado y mejorado continuamente con nuevas características y actualizaciones varias veces por semana | Es una versión a largo plazo publicada dos veces al año, por lo que las últimas características no estarán disponibles inmediatamente ya que se prueban primero en la nube |

# Usando la CLI con Capgo autohospedado
Para usar la CLI con Capgo autohospedado, edita el capacitor.config.ts desde el directorio de tu aplicación y configúralo así:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Nota: Para obtener localSupaAnon, sigue este [tutorial](https://capgo.app/docs/self-hosted/local-dev/getting-started/) y copia la clave anon en localSupaAnon

# Usando el actualizador de Capacitor con Capgo autohospedado

**Requisito**

Clonar [capgo](https://github.com/Cap-go/capgo/)

Para usar el actualizador de Capacitor con Capgo autohospedado, edita el `capacitor.config.ts` desde el directorio de tu aplicación y configúralo así:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

Esto te permitirá usar Capgo local en desarrollo. Sin embargo, por defecto, esto no es suficiente

# Conclusión

En conclusión, autohospedar Capgo puede ser una buena opción para organizaciones que tienen los recursos y la experiencia para hacerlo. Ofrece una serie de beneficios, incluyendo control sobre el proceso de actualización, seguridad y cumplimiento. Sin embargo, es importante sopesar cuidadosamente los beneficios y desafíos antes de decidir si autohospedar

Si estás considerando autohospedar Capgo, te recomiendo que comiences leyendo la [documentación de autohospedaje](https://capgo.app/docs/self-hosted/getting-started/) de Capgo. Esto te dará una buena comprensión de los requisitos y riesgos del autohospedaje