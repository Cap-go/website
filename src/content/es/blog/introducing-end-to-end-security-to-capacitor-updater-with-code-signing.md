---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introducción al cifrado de datos en el programa de puesta en marcha del día de
  los condensadores con firma de código
description: >-
  Utilización de la criptografía RSA + AES para guardar las actualizaciones del
  día, conçues para las aplicaciones empresariales y de alta seguridad.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Secure upload Capgo
tag: Solution
published: true
next_blog: ''
locale: es
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) ahora admite cifrado de código de extremo a extremo La firma de código garantiza que las actualizaciones ejecutadas por los dispositivos de los usuarios finales no hayan sido manipuladas y proporciona una nivel adicional de protección por encima de la seguridad de nivel web estándar de Capacitor-updater

## La seguridad predeterminada de Capacitor-updater

De forma predeterminada, el modelo de seguridad de Capgo es similar al de los proveedores de alojamiento web. Capgo almacena actualizaciones [cifradas en reposo](https://cloudgooglecom/docs/security/encryption/default-encryption/) y las entrega a través de HTTPS utilizando cifrados modernos. publicar una actualización desde la computadora de un desarrollador siempre usa HTTPS

![Capgo obtiene una A+ en la prueba HTTPS de SSL Labs](/ssllabs_reportwebp)

La seguridad predeterminada de Capgo obtiene una puntuación A+ en la prueba HTTPS de SSL Labs (https://wwwssllabscom, noviembre de 2022)

Al igual que los mejores servidores web de su clase, Capgo utiliza HTTPS para proteger la privacidad y la integridad de las conexiones de red entre el servidor y los dispositivos de los usuarios finales. Este es un excelente nivel de seguridad que funciona bien tanto para la web como para las aplicaciones Ionic que usan Capgo.

## La cadena de suministro de infraestructura en la nube

Otra cosa que Capgo y la mayoría de los servidores web tienen en común es que se ejecutan en una infraestructura de nube de nivel inferior, a menudo de AWS, GCP u otro proveedor de nube popular. El hardware y el software operados por estos proveedores de nube y Capgo u otros servidores web son parte del cadena de suministro en la nube

La cadena de suministro de la nube y su modelo de seguridad funcionan para una gran cantidad de sitios web y aplicaciones. Cada desarrollador web que utiliza un proveedor de la nube confía en ese proveedor y espera que los archivos que carga sean los archivos que se ejecutan o sirven sin ser manipulados. Los proveedores de la nube trabajan duro para mantener segura su infraestructura.

Pero, obviamente, las vulnerabilidades de hardware y software se descubren. Los proveedores de la nube parchean las vulnerabilidades en horarios oportunos y previenen proactivamente el software malicioso (por ejemplo, [SLSA de Google](https://securitygoogleblogcom/2021/06/introtaining-slsa-end-to-end-frameworkhtml/ )), y construir capas de defensa en profundidad y, en la práctica, la infraestructura de la nube ha demostrado satisfacer las necesidades de seguridad de la mayoría de los sitios web y aplicaciones. Sin embargo, algunas aplicaciones de Ionic incluyen una infraestructura de la nube comprometida en sus modelos de amenazas. Para estas aplicaciones de Capacitor JS con la mayor seguridad requisitos anteriores a la web, creamos código de extremo a extremo para iniciar sesión en Capgo y el [protocolo estándar de actualizaciones de Capgo](/docs/self-hosted/auto-update/update-endpoint/)

## Firma de código de un extremo a otro con Capgo

La firma de código de extremo a extremo de Capgo utiliza criptografía de clave pública para garantizar que los dispositivos de los usuarios finales ejecuten solo actualizaciones originales y sin modificaciones del desarrollador de la aplicación Capacitor.

"De extremo a extremo" significa que esta seguridad cubre el flujo desde el momento en que un desarrollador publica una actualización hasta el momento en que el dispositivo de un usuario final recibe y ejecuta la actualización. La "firma de código" utiliza criptografía y una clave privada secreta para "firmar" el código. y luego usar una clave pública confiable para verificar la firma

Aquí hay un esquema simple* para explicar cómo funciona:

![Esquema de cifrado de Capgo](/encryption_flowwebp)

* Compleja en la práctica, la criptografía es difícil

*Definición*:
- AES: Estándar de cifrado avanzado, un algoritmo de cifrado simétrico, una clave para cifrado y descifrado
- RSA: Rivest–Shamir–Adleman, un algoritmo de cifrado asimétrico, se utilizan dos claves: una pública y una privada.
- Cypher: Los datos cifrados
- Clave de sesión: una clave AES utilizada para cifrar y descifrar datos.
- Suma de comprobación: un hash calculado para un archivo
- Firma: una suma de verificación que se cifró con una clave RSA privada. Se puede verificar con una clave RSA pública. 

Usamos el algoritmo AES para cifrar la actualización. Se genera una clave AES aleatoria para cada carga, luego la clave AES y la suma de comprobación (en adelante, "firma") se cifran con la clave RSA privada del desarrollador. La clave RSA pública del desarrollador se utiliza en la actualización. aplicación para descifrar la clave AES y la firma (convirtiéndola nuevamente en una suma de verificación)Posteriormente, la clave AES descifrada se utiliza para descifrar la actualización; Se calcula una suma de verificación de la actualización descifrada y se compara con la firma descifrada.

Usamos dos algoritmos de cifrado diferentes porque RSA no se puede usar para cifrar grandes cantidades de datos. Se usa AES para cifrar la actualización y RSA se usa para cifrar la clave AES y la suma de verificación.

Con esto, ni siquiera Capgo puede leer el contenido de su paquete. Este es un modelo de seguridad sólido que utilizan muchos clientes empresariales.

**Actualización de cifrado V2 2024-08-27:**
- Cambiamos el tipo de clave que se almacena en la aplicación. Esto se hizo para evitar inferir la clave pública (anteriormente utilizada para el cifrado) de la clave privada (anteriormente utilizada para el descifrado). Ahora, la aplicación almacena la clave pública (ahora utilizada para descifrar)
- Cambiamos la suma de verificación del algoritmo CRC32 al algoritmo SHA256. También comenzamos a [firmar el paquete](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages) Cuando se configura el cifrado V2, una actualización debe tener una firma válida Esto lo aplica estrictamente el complemento.
- Ahora aplicamos un cifrado de firma válido V2 configurado
Estos 3 cambios se han realizado después de un análisis de seguridad por parte de un miembro de la comunidad. Están aquí para evitar ataques criptográficos durante la actualización.

Si utilizó cifrado V1, migre a V2 para beneficiarse de las nuevas funciones de seguridad. Siga las [instrucciones de migración](/docs/cli/migrations/encryption/)

Con la firma de código de extremo a extremo, Capgo se convierte en una infraestructura de nube "no confiable". Si uno de los proveedores de nube de Capgo o incluso el propio Capgo modificaran una actualización firmada con código, los dispositivos de los usuarios finales rechazarían esa actualización y ejecutarían la versión anterior confiable. actualización que ya está en el dispositivo

Si bien HTTPS a nivel web es suficiente para muchas aplicaciones, algunas grandes empresas consideran atractivo el nivel adicional de seguridad que supone la firma de código de extremo a extremo. Algunas de estas empresas crean aplicaciones financieras que emiten transacciones permanentes y de alto valor. Otras empresas tienen CISO que incluyen infraestructura de nube comprometida en sus modelos de amenazas Creamos código de inicio de sesión de extremo a extremo en Capgo para estos casos de uso y estamos interesados ​​en escuchar más de empresas con necesidades de seguridad de mayor nivel.

## Primeros pasos para clientes empresariales

Para grandes empresas o proyectos que se preocupan profundamente por la seguridad, queremos que la firma de código sea fácil de configurar y mantener. Para ello, ahora ofrecemos las siguientes funciones:

- Instalación y configuración rápida de certificados
- Soporte para servidores de desarrollo de firma de código tanto con Capgo como con compilaciones de desarrollo.
- Firma de código de producción en cada actualización.

La firma de código Capgo está disponible para todos los clientes. Para comenzar, siga las [instrucciones de configuración](/docs/cli/commands/#end-to-end-encryption-trustless)

## Créditos

Muchas gracias a [Ionic](https://ioniccom/), este artículo está basado en [este artículo](https://ionicio/blog/introduciendo-the-ionic-end-to-end-testing-reference- ejemplo/) reescrito con chat-gpt-3 y adaptado