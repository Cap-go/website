---
title: Gambaran Umum
description: Explicación de los dos enfoques diferentes
sidebar:
  order: 1
locale: es
---

### Modo Cloud (Recomendado)
El Modo Cloud es nuestra opción recomendada para una gestión de actualizaciones sin complicaciones. El backend de Capgo se encarga de toda la lógica de actualización, tomando decisiones sobre las actualizaciones del lado del servidor para una mejor seguridad y control. Este modo se centra en la facilidad de uso: una vez configurado, funciona sin problemas por sí solo, ofreciendo características avanzadas como estadísticas y canales. También se puede configurar en modo manual, lo que te da más control, permitiéndote decidir cuándo actualizar usando tu código JavaScript. El backend sigue gestionando qué se actualiza. Este modo comparte muchos beneficios con el Modo Auto, especialmente en seguridad y características avanzadas, pero añade la flexibilidad de programar las actualizaciones tú mismo.

### Modo Auto-Alojado

El Modo Auto-Alojado es para aquellos que quieren manejar toda la lógica de actualización en su propio servidor. Ofrece completa autonomía pero requiere un servidor separado y más trabajo para gestionar las actualizaciones y los requisitos del servidor.

El Modo Manual Auto-Alojado combina control y autonomía. Tú decides cuándo actualizar a través de JavaScript, pero tu servidor maneja qué se actualiza. Es un poco complejo ya que estás incluyendo código de actualización en las actualizaciones.

:::note
Si eliges auto-alojar, te perderás todas las excelentes características que ofrece capgo cloud como: reversiones automáticas, alertas por email, canales, estadísticas, encriptación y más.
:::

:::danger
Si envías una actualización defectuosa a tus usuarios, puedes y romperás su aplicación.
:::