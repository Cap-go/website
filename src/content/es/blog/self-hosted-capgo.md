---
slug: self-hosted-capgo
title: Capgo auto-hébergé
description: >-
  Capgo se mantiene automáticamente y permite implementar actualizaciones
  diarias directamente de Capacitor junto con sus usuarios sin necesidad de
  utilizar el servicio en la nube Capgo.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: self-hosted capgo
tag: Solution
published: true
next_blog: ''
locale: es
---

Este artículo proporciona una guía paso a paso sobre cómo autohospedar Capgo, así como una discusión sobre los beneficios y desafíos del autohospedaje.

# Introducción

El autohospedaje es una forma de ejecutar su propio sitio web o aplicación configurando un servidor y una red usted mismo. En lugar de utilizar una plataforma como servicio o un proveedor de nube pública, aquellos que elijan autohospedarse ejecutarán sus propias redes y serán responsables de el mantenimiento y el tiempo de actividad además de crear su sitio web o aplicación

La forma más fácil de comenzar con Capgo es con nuestro [servicio administrado oficial en la nube](https://capgoapp/), pero si está dispuesto a administrar el suyo propio, también puede alojar Capgo en su servidor.

## ¿Qué es el autohospedaje?

El autohospedaje, en el contexto del ámbito digital, se refiere a la práctica de ejecutar sus propios servidores o infraestructura de alojamiento para administrar y controlar su presencia y servicios en línea. En lugar de depender de proveedores de alojamiento externos, las personas y las organizaciones optan por configurar y administrar sus servidores, sitios web, aplicaciones y almacenamiento de datos en sus términos

## ¿Por qué eliges el autohospedaje?

Hay muchas razones por las que las personas eligen ser autohospedadores. Algunos de los beneficios más comunes incluyen:

* **Privacidad y control:** El autohospedaje le brinda control total sobre sus datos y su privacidad. No tiene que preocuparse de que proveedores externos rastreen su actividad o vendan sus datos.

* **Ahorro de costos:** El autohospedaje puede ser más rentable a largo plazo, especialmente si utiliza muchos recursos o ejecuta múltiples servicios.

* **Personalización:** El autohospedaje le brinda la flexibilidad de personalizar sus aplicaciones y servicios para satisfacer sus necesidades específicas.

* **Aprendizaje y experimentación:** El autohospedaje puede ser una excelente manera de aprender sobre Linux, administración de sistemas y otros temas técnicos. También puede ser una forma divertida de experimentar con software y servicios nuevos.

* **Independencia:** El autohospedaje reduce su dependencia de proveedores externos. No está a merced de sus términos de servicio, cambios de precios o posibles interrupciones del servicio. Esta independencia puede ser crucial para las empresas y las personas que dependen de sus servicios en línea. presencia para funciones críticas

## ¿Cuál es la diferencia entre Capgo Cloud y Capgo Self-Hosted?

Sólo hay una versión de Capgo Tanto mi producto Cloud como mi producto Self-Hosted son completamente iguales. No existe una versión comercial premium y exclusiva con un conjunto de características mejor o más completo.

Obtienes el mismo panel, las mismas métricas procesables y el mismo compromiso de [respetar la privacidad de tus visitantes](https://capgoapp/privacy/) con ambos

Comencé a desarrollar Capgo en diciembre de 2018 y lancé el negocio de suscripción SaaS en mayo de 2019. El proyecto está muy vivo, desarrollado activamente y en rápido crecimiento. Es sólido y también ha sido probado en batalla.

Estas son las diferencias entre Capgo Cloud y Capgo Self-Hosted:

|   | Nube | Autohospedado |
| --- | --- | --- |
| **Alojamiento** | Fácil y conveniente Tarda 2 minutos en comenzar a enviar tu primera actualización, alta disponibilidad, copias de seguridad, seguridad y mantenimiento, todo hecho por ti. Administro todo por ti para que no tengas que preocuparte por nada | Lo hace todo usted mismo Necesita obtener un servidor y administrar su infraestructura Usted es responsable de la instalación, el mantenimiento, las actualizaciones, la capacidad del servidor, el tiempo de actividad, la copia de seguridad, la seguridad, la estabilidad, la coherencia, el tiempo de carga, etc.
| **Almacenamiento** | Todos los datos de los visitantes se procesan exclusivamente en una infraestructura de nube propiedad de la UE. Mantengo los datos de su sitio en un servidor seguro, cifrado y en Alemania. Esto garantiza que los datos de su sitio estén protegidos por las estrictas leyes de privacidad de datos de la Unión Europea y garantiza el cumplimiento del RGPD. Los datos de su sitio web nunca sale de la UE | Tienes control total y puedes alojar tu Capgo en cualquier servidor en cualquier país que desees. Hospédalo en un servidor en tu sótano o con cualquier proveedor de nube donde quieras, incluso aquellos que no cumplen con GDPR.|
| **Datos sin procesar** | Puedes ver todas las estadísticas y métricas de tu sitio en mi panel de control moderno, fácil de usar y de carga rápida. Solo puedes ver las estadísticas agregadas en el panel | ¿Es usted analista y desea acceder a los datos sin procesar? Hospedar Capgo usted mismo le brinda esa opción. Tome los datos directamente de la base de datos e impórtelos a una herramienta de análisis de datos de su elección.
| **Costos** | Hay un costo asociado con el suministro de un servicio de actualización, por lo que cobro una tarifa de suscripción | Solo necesita pagar por su servidor y cualquier costo asociado con el funcionamiento de un servidor. Nunca tendrá que pagarme ninguna tarifa a mí, solo a su proveedor de nube.
| **Soporte Premium** | Soporte real brindado por seres humanos reales que construyen y mantienen Capgo | El soporte premium no está incluido. La versión autohospedada solo cuenta con soporte comunitario |
| **Lanzamientos** | Desarrollado y mejorado continuamente con nuevas funciones y actualizaciones varias veces por semana | Es una versión a largo plazo que se publica dos veces al año, por lo que las funciones más recientes no estarán disponibles de inmediato, ya que primero se prueban en la nube |

# Usando la CLI con capgo autohospedado
Para usar la CLI con capgo autohospedado, edite los capacitorconfigts del directorio de su aplicación y configúrelo así:

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

Nota: Para obtener localSupaAnon, siga este [tutorial](https://capgoapp/docs/self-hosted/local-dev/getting-started/) y copie la clave anon en localSupaAnon

# Usando el actualizador de capacitores con capgo autohospedado

**Requisito**

Clonado [capgo](https://githubcom/Cap-go/capgo/)

Para usar el actualizador de capacitores con capgo autohospedado, edite los `capacitorconfigts` del directorio de su aplicación y configúrelo así:

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

Esto le permitirá utilizar capgo local en el desarrollo. Sin embargo, de forma predeterminada, esto no es suficiente.

# Conclusión

En conclusión, el autohospedaje de Capgo puede ser una buena opción para las organizaciones que tienen los recursos y la experiencia para hacerlo. Ofrece una serie de beneficios, incluido el control sobre el proceso de actualización, la seguridad y el cumplimiento. Sin embargo, es importante sopesar cuidadosamente los Beneficios y desafíos antes de decidir si autohospedar

Si está considerando autohospedar Capgo, le recomiendo que comience leyendo la [documentación de autohospedaje] de Capgo (https://capgoapp/docs/self-hosted/getting-started/). Esto le dará una buena comprensión de Los requisitos y riesgos del autohospedaje.