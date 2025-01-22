---
locale: es
---

Cantar paquete @capgo/capacitor-crisp

El paquete `@capgo/capacitor-crisp` te permite integrar Crisp, un SDK nativo, en tu aplicación de Capacitor. Proporciona métodos para configurar Crisp, abrir el chat, establecer detalles del usuario, enviar eventos y más.

Para comenzar con el paquete `@capgo/capacitor-crisp`, sigue estos pasos:

## Instalación

1 Abre tu terminal y navega al directorio raíz de tu aplicación de Capacitor.
2 Ejecuta el siguiente comando para instalar el paquete:

[[BLOQUE_DE_CÓDIGO]]

## Inicializar Crisp

Antes de usar cualquiera de los métodos proporcionados por el paquete `@capgo/capacitor-crisp`, necesitas configurar Crisp con tu ID de sitio web. Añade el siguiente código a tu proyecto:

[[BLOQUE_DE_CÓDIGO]]

Reemplaza `'******-****-****-****-********'` con tu ID de sitio web de Crisp real.

### Integración en iOS

Si estás dirigiéndote a iOS, necesitas agregar los siguientes permisos al archivo Infoplist de tu aplicación:

- Privacidad - Descripción del Uso de la Cámara (NSCameraUsageDescription)
- Privacidad - Descripción del Uso de Adiciones a la Biblioteca de Fotos (NSPhotoLibraryAddUsageDescription)

Asegúrate de proporcionar una descripción para cada permiso explicando por qué tu aplicación lo necesita.

### Integración en Android

No se requieren pasos adicionales para la integración en Android.

## Abrir el Chat

Para abrir el chat de Crisp en tu aplicación, utiliza el método `openMessenger` proporcionado por el paquete `@capgo/capacitor-crisp`. Añade el siguiente código a tu proyecto:

[[BLOQUE_DE_CÓDIGO]]

Esto abrirá el chat de Crisp para que los usuarios inicien una conversación con tu equipo de soporte.

## Funcionalidad Adicional

El paquete `@capgo/capacitor-crisp` proporciona varios otros métodos para personalizar e interactuar con Crisp. Aquí hay algunos de los métodos disponibles:

- `setTokenID`: Establecer el ID de token para el usuario.
- `setUser`: Establecer los detalles del usuario como apodo, número de teléfono, correo electrónico y avatar.
- `pushEvent`: Enviar un evento personalizado a Crisp.
- `setCompany`: Establecer los detalles de la empresa, incluyendo nombre, URL, descripción, empleo y geolocalización.
- `setInt`: Establecer un valor entero personalizado.
- `setString`: Establecer un valor de cadena personalizado.
- `sendMessage`: Enviar un mensaje de chat a Crisp.
- `setSegment`: Establecer el segmento para el usuario.
- `reset`: Restablecer la configuración de Crisp.

Para más información sobre estos métodos y sus parámetros, consulta la documentación oficial del paquete `@capgo/capacitor-crisp`.

¡Eso es todo! Has aprendido cómo usar el paquete `@capgo/capacitor-crisp` para integrar Crisp en tu aplicación de Capacitor. Disfruta de una comunicación fluida con tus usuarios a través del chat de Crisp.