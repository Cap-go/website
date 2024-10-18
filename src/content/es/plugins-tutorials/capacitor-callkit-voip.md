---
locale: es
---

cantar @capgo/capacitor-callkit-voip Paquete

El paquete `@capgo/capacitor-callkit-voip` proporciona funcionalidad de PushKit para Ionic Capacitor. Está diseñado para ser usado con la aplicación BetterCall, pero también puede ser utilizado en otros proyectos.

## Instalación

Para instalar el paquete, puedes ejecutar el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

Asegúrate de tener Xcode instalado en tu computadora antes de proceder con la instalación.

## Configuración del Proyecto iOS

Para configurar tu proyecto iOS para usar el paquete, sigue estos pasos:

1 Abre tu proyecto de Xcode y ve a la sección de Capacidades.
2 Habilita la capacidad "Voice over IP" seleccionando la casilla.
3 Registra tu certificado en el sitio web de Apple Developer. Puedes encontrar instrucciones detalladas en el enlace proporcionado.
4 Descarga el certificado y ábrelo para importarlo en la aplicación Acceso a Llaveros.
5 Exporta los certificados como se muestra en la imagen proporcionada.
6 Navega a la carpeta donde exportaste el archivo y ejecuta el siguiente comando en la terminal:

[[BLOQUE_DE_CÓDIGO]]

Esto generará un archivo de certificado `apppem` que puede ser utilizado para enviar notificaciones VOIP.

## Uso

Una vez que el paquete esté instalado y el proyecto iOS esté configurado, puedes comenzar a usarlo en tu código.

Primero, importa el módulo `CallKitVoip`:

[[BLOQUE_DE_CÓDIGO]]

A continuación, necesitas llamar al método `register()` para comenzar el registro de notificaciones VOIP:

[[BLOQUE_DE_CÓDIGO]]

Para enviar una notificación VOIP, puedes usar el script `sendVoipsh` proporcionado:

[[BLOQUE_DE_CÓDIGO]]

## Conclusión

El paquete `@capgo/capacitor-callkit-voip` te permite agregar funcionalidad de PushKit a tu proyecto Ionic Capacitor. Siguiendo las instrucciones de instalación y uso, podrás enviar y recibir notificaciones VOIP en tu aplicación.