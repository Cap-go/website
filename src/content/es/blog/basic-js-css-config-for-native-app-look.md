---
slug: basic-js-css-config-for-native-app-look
title: Configuraciones básicas de JS y CSS para una apariencia de aplicación nativa
description: >-
  Aprenda a configurar su aplicación web con configuraciones básicas de
  JavaScript y CSS para que se vea y se sienta como una aplicación nativa,
  incluida la desactivación de los efectos de desplazamiento.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: Native app look illustration
tag: Web Development
published: true
next_blog: ''
locale: es
---

# Configuraciones básicas de JS y CSS para una apariencia de aplicación nativa

Al crear una aplicación web, es esencial hacer que se vea y se sienta como una aplicación nativa para brindar una experiencia de usuario perfecta. En este artículo, cubriremos las configuraciones básicas de JavaScript y CSS necesarias para lograr una apariencia de aplicación nativa, incluida la desactivación de los efectos de desplazamiento.

## Deshabilitar efectos de desplazamiento

En los dispositivos táctiles, los efectos de desplazamiento pueden ser problemáticos ya que no tienen un estado de desplazamiento real como los dispositivos de escritorio. Para deshabilitar los efectos de desplazamiento en dispositivos táctiles, puede usar el siguiente código CSS:

```css
@media (hover: none) {
  .element:hover {
    /* Reset the hover styles */
    background-color: initial;
    color: initial;
    /* Add any other style resets needed */
  }
}
```

Reemplace `elemento` con el selector apropiado para los elementos en los que desea deshabilitar los efectos de desplazamiento

## Deshabilitar vista previa de enlace

Para deshabilitar la vista previa de enlaces en dispositivos táctiles, puede utilizar el siguiente código JavaScript:

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## Deshabilitar selección

Para deshabilitar la selección de texto, agregue el siguiente código CSS a su hoja de estilo:

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## Desactivar zoom

Para desactivar el zoom, agregue la siguiente metaetiqueta al encabezado de su archivo HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## Agregar zona CSS segura

Para garantizar que su contenido se muestre dentro del área segura del dispositivo, agregue el siguiente código CSS a su hoja de estilo:

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## Consejos adicionales

- Utilice técnicas de diseño responsivo para garantizar que su aplicación se vea genial en todos los dispositivos
- Optimice el rendimiento de su aplicación minimizando el uso de bibliotecas y marcos de JavaScript pesados.
- Pruebe su aplicación en varios dispositivos y navegadores para garantizar la compatibilidad y una experiencia de usuario consistente

Si sigue estas configuraciones básicas de JavaScript y CSS, puede crear una aplicación web que se vea y se sienta como una aplicación nativa, brindando una experiencia de usuario fluida y agradable.