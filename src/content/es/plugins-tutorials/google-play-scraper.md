---
locale: es
---

cantar Paquete `@capgo/google-play-scraper`

## Instalación

Para usar el paquete `@capgo/google-play-scraper`, necesitas instalarlo a través de npm:

[[BLOQUE_DE_CÓDIGO]]

## Ejemplo de Uso

Aquí tienes un ejemplo de cómo puedes utilizar el paquete `@capgo/google-play-scraper` para extraer datos de la Google Play Store:

[[BLOQUE_DE_CÓDIGO]]

En el ejemplo anterior, primero importamos la clase `GooglePlayScraper` del paquete `@capgo/google-play-scraper`.

Luego, podemos utilizar el método `getAppDetails()` para extraer los detalles de una aplicación específica. Proporcionamos el ID de la aplicación como parámetro y devuelve un objeto con varios detalles como el nombre de la aplicación, el nombre del desarrollador, las calificaciones, etc.

De manera similar, podemos usar el método `getAppReviews()` para extraer reseñas de aplicaciones. Proporcionamos el ID de la aplicación y opciones adicionales como la clasificación y el número de reseñas a obtener. Devuelve un array de reseñas con detalles como el texto de la reseña, la calificación, el nombre del reseñador, etc.

## Conclusión

El paquete `@capgo/google-play-scraper` proporciona una forma conveniente de extraer datos de la Google Play Store. Puedes usarlo para obtener detalles de aplicaciones, reseñas y más. Con este paquete, puedes recopilar fácilmente información de la Play Store para tu aplicación o cualquier otra aplicación de interés.