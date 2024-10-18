---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: >-
  Introducción de cifrado de extremo a extremo para capacitor-updater con firma
  de código
description: >-
  Uso de criptografía RSA + AES para cifrar actualizaciones, diseñado para
  empresas y aplicaciones con altos requisitos de seguridad
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Carga Segura Capgo
tag: Solution
published: true
locale: es
next_blog: ''
---

[Capacitor-updater](https://githubcom/Cap-go/capacitor-updater/) ahora admite el cifrado de código de extremo a extremo. La firma de código garantiza que las actualizaciones ejecutadas por los dispositivos de los usuarios finales no hayan sido alteradas y proporciona un nivel adicional de protección por encima de la seguridad estándar de nivel web de Capacitor-updater.

## La seguridad predeterminada de Capacitor-updater

Por defecto, el modelo de seguridad de Capgo es similar al de los proveedores de alojamiento web. Capgo almacena las actualizaciones [cifradas en reposo](https://cloudgooglecom/docs/security/encryption/default-encryption/) y las sirve a través de HTTPS utilizando cifrados modernos. Del mismo modo, la publicación de una actualización desde el ordenador de un desarrollador siempre utiliza HTTPS.

![Capgo obtiene una A+ en la prueba HTTPS de SSL Labs](/ssllabs_reportwebp)

La seguridad predeterminada de Capgo obtiene una A+ en la prueba HTTPS de SSL Labs (https://wwwssllabscom, noviembre de 2022).

Al igual que los mejores alojamientos web, Capgo utiliza HTTPS para proteger la privacidad e integridad de las conexiones de red entre el servidor y los dispositivos de los usuarios finales. Este es un excelente nivel de seguridad que funciona bien tanto para la web como para las aplicaciones Ionic que utilizan Capgo.

## La cadena de suministro de infraestructura en la nube

Otra cosa que Capgo y la mayoría de los alojamientos web tienen en común es que se ejecutan en una infraestructura en la nube de nivel inferior, a menudo de AWS, GCP u otro proveedor de nube popular. El hardware y el software operados por estos proveedores de nube y Capgo u otros alojamientos web forman parte de la cadena de suministro en la nube.

La cadena de suministro en la nube y su modelo de seguridad funcionan para un gran número de sitios web y aplicaciones. Cada desarrollador web que utiliza un proveedor de nube confía en ese proveedor y espera que los archivos que suben sean los archivos que se ejecutan o sirven sin ser alterados. Y los proveedores de nube trabajan duro para mantener segura su infraestructura.

Pero obviamente, se descubren vulnerabilidades de hardware y software. Los proveedores de nube parchan las vulnerabilidades en horarios oportunos, previenen proactivamente el software malicioso (por ejemplo, [SLSA de Google](https://securitygoogleblogcom/2021/06/introducing-slsa-end-to-end-frameworkhtml/)), y construyen capas de defensa en profundidad, y en la práctica, la infraestructura en la nube ha demostrado satisfacer las necesidades de seguridad de la mayoría de los sitios web y aplicaciones. Sin embargo, algunas aplicaciones Ionic incluyen infraestructura en la nube comprometida en sus modelos de amenazas. Para estas aplicaciones Capacitor JS con los requisitos de seguridad más altos por encima de la web, hemos incorporado la firma de código de extremo a extremo en Capgo y el [protocolo estándar de actualizaciones de Capgo](/docs/self-hosted/auto-update/update-endpoint/).

## Firma de código de extremo a extremo con Capgo

La firma de código de extremo a extremo de Capgo utiliza criptografía de clave pública para garantizar que los dispositivos de los usuarios finales ejecuten solo actualizaciones no modificadas y originales del desarrollador de la aplicación Capacitor.

"De extremo a extremo" significa que esta seguridad cubre el flujo desde el momento en que un desarrollador publica una actualización hasta el momento en que el dispositivo de un usuario final recibe y ejecuta la actualización. "Firma de código" es usar criptografía y una clave privada secreta para "firmar" el código, y luego usar una clave pública confiable para verificar la firma.

Aquí hay un esquema simple* para explicar cómo funciona:

![Esquema de cifrado de Capgo](/encryption_flowwebp)

* Complejo en la práctica, la criptografía es difícil

*Definición*:
- AES: Estándar de Cifrado Avanzado, un algoritmo de cifrado simétrico, una clave para cifrado y descifrado
- RSA: Rivest–Shamir–Adleman, un algoritmo de cifrado asimétrico, se utilizan dos claves: una clave pública y una clave privada
- Cypher: Los datos cifrados
- Clave de sesión: Una clave AES utilizada para cifrar y descifrar datos
- Checksum: Un hash calculado para un archivo
- Firma: Un checksum que fue cifrado con una clave RSA privada. Puede ser verificado con una clave RSA pública.

Utilizamos el algoritmo AES para cifrar la actualización. Se genera una clave AES aleatoria para cada carga, luego la clave AES y el checksum (en adelante "firma") se cifran con la clave RSA privada del desarrollador. La clave RSA pública del desarrollador se utiliza en la aplicación para descifrar la clave AES y la firma (convirtiéndola de nuevo en un checksum).Más tarde, la clave AES descifrada se utiliza para descifrar la actualización; se calcula un checksum de la actualización descifrada y se compara con la firma descifrada.

Usamos dos algoritmos de cifrado diferentes porque RSA no puede usarse para cifrar grandes cantidades de datos. AES se utiliza para cifrar la actualización y RSA se usa para cifrar la clave AES y el checksum.

Con esto, ni siquiera Capgo puede leer el contenido de tu paquete. Este es un modelo de seguridad robusto que es utilizado por muchos clientes empresariales.

**Actualización de cifrado V2 2024-08-27:**
- Cambiamos el tipo de clave que se almacena en la aplicación. Esto se hizo para evitar inferir la clave pública (anteriormente usada para cifrado) de la clave privada (anteriormente usada para descifrado). Ahora, la aplicación almacena la clave pública (ahora usada para descifrado).
- Cambiamos el checksum del algoritmo CRC32 al algoritmo SHA256. También comenzamos a [firmar el paquete](https://enwikipediaorg/wiki/RSA_(cryptosystem)#Signing_messages). Cuando se configura el cifrado V2, una actualización debe tener una firma válida. Esto es estrictamente aplicado por el plugin.
- Ahora exigimos una firma válida cuando se configura el cifrado V2.
Estos 3 cambios se han realizado después de un análisis de seguridad de un miembro de la comunidad. Están aquí para prevenir ataques criptográficos durante la actualización.

Si usaste el cifrado V1, migra a V2 para beneficiarte de las nuevas características de seguridad. Sigue las [instrucciones de migración](/docs/cli/migrations/encryption/)

Con la firma de código de extremo a extremo, Capgo se convierte en una infraestructura en la nube "sin confianza". Si uno de los proveedores en la nube de Capgo o incluso el propio Capgo modificara una actualización firmada con código, los dispositivos de los usuarios finales rechazarían esa actualización y ejecutarían la actualización confiable anterior que ya está en el dispositivo.

Mientras que el HTTPS a nivel web es suficiente para muchas aplicaciones, algunas grandes empresas encuentran atractivo el nivel extra de seguridad de la firma de código de extremo a extremo. Algunas de estas empresas hacen aplicaciones financieras que emiten transacciones permanentes de alto valor. Otras empresas tienen CISOs que incluyen infraestructura en la nube comprometida en sus modelos de amenazas. Construimos la firma de código de extremo a extremo en Capgo para estos casos de uso y estamos interesados en escuchar más de las empresas con necesidades de seguridad de nivel superior.

## Primeros pasos para clientes empresariales

Para grandes empresas o proyectos que se preocupan profundamente por la seguridad, queremos hacer que la firma de código sea fácil de configurar y mantener. Para ello, ahora proporcionamos las siguientes características:

-   Configuración rápida de certificados
-   Soporte para servidores de desarrollo de firma de código tanto con Capgo como con builds de desarrollo
-   Firma de código en producción en cada actualización

La firma de código de Capgo está disponible para todos los clientes. Para comenzar, sigue las [instrucciones de configuración](/docs/cli/commands/#end-to-end-encryption-trustless)

## Créditos

Muchas gracias a [Ionic](https://ioniccom/), este artículo está basado en [este artículo](https://ionicio/blog/introducing-the-ionic-end-to-end-testing-reference-example/) reescrito con chat-gpt-3 y adaptado.