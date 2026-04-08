---
title: "Cambios Incompatibles"
description: "Cómo manejar cambios incompatibles con canales versionados"
locale: es
sidebar:
  order: 6
---

Esta documentación explica cómo manejar cambios incompatibles en tu aplicación usando canales versionados. Este enfoque te permite mantener diferentes versiones de tu aplicación mientras aseguras que los usuarios reciban actualizaciones compatibles.

## Escenario de Ejemplo

Digamos que tienes:
- Versión de aplicación 1.2.3 (versión antigua) - usa canal production
- Versión de aplicación 2.0.0 (nueva versión con cambios incompatibles) - usa canal v2
- Actualización en vivo 1.2.4 (compatible con 1.2.3)
- Actualización en vivo 2.0.1 (compatible con 2.0.0)

## Estrategia: Siempre Usa defaultChannel para Versiones Mayores

**Enfoque recomendado:** Establece un `defaultChannel` para cada versión mayor. Esto asegura que siempre puedas enviar actualizaciones a grupos específicos de usuarios sin depender de asignación dinámica de canales.

```ts
// Lanzamientos versión 1.x
defaultChannel: 'v1'

// Lanzamientos versión 2.x
defaultChannel: 'v2'

// Lanzamientos versión 3.x (futuro)
defaultChannel: 'v3'
```

:::Consejo
**Beneficios de este enfoque:**
- **Siempre tienes control** sobre qué usuarios reciben actualizaciones
- **No se necesita cambio dinámico de canal** en el código de tu aplicación
- **Separación clara** entre diferentes versiones de aplicación
- **Flexibilidad** para enviar actualizaciones a cualquier grupo de versión específico
:::

## 1. Crear Canal para Nueva Versión

```bash
# Crear canal para versión 2.x
npx @capgo/cli channel create v2
```

## 2. Actualizar Configuración de Capacitor para Versión 2.0.0

Actualiza tu configuración de Capacitor antes de compilar la versión 2.0.0 para la tienda de aplicaciones:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... otras opciones
      defaultChannel: 'v2' // Todos los usuarios de 2.0.0 usarán el canal v2
    }
  }
};

export default config;
```

:::Nota
**Para versión 1.x:** Si no estableciste un `defaultChannel` inicialmente, los usuarios de la versión 1.x están en el canal `production`. Para futuras versiones mayores, siempre establece un canal específico como `v3`, `v4`, etc.
:::

## 3. Gestionar Ramas de Código Separadas

Crea ramas Git separadas para mantener compatibilidad entre versiones de aplicación:

```bash
# Crear y mantener una rama para actualizaciones de versión 1.x
git checkout -b v1-maintenance
git push origin v1-maintenance

# Tu rama principal continúa con desarrollo de versión 2.x
git checkout main
```

:::Advertencia
**Crítico:** Nunca envíes Paquetes JavaScript a aplicaciones antiguas que esperan código/APIs nativas que no tienen. Siempre compila actualizaciones desde la rama apropiada:
- **rama v1-maintenance**: Para actualizaciones a aplicaciones 1.x (canal production)
- **rama main**: Para actualizaciones a aplicaciones 2.x (canal v2)
:::

## 4. Subir Paquetes a Canales Respectivos

```bash
# Para actualizaciones 1.x: Compila desde rama v1-maintenance
git checkout v1-maintenance
# Haz tus cambios compatibles con 1.x aquí
npx @capgo/cli bundle upload --channel production

# Para actualizaciones 2.x: Compila desde rama main
git checkout main
# Haz tus cambios para 2.x aquí
npx @capgo/cli bundle upload --channel v2
```

## 5. Habilitar Auto-Asignación

```bash
# Permitir que las aplicaciones se auto-asignen al canal v2
npx @capgo/cli channel set v2 --self-assign
```

## 6. Desplegar en la Tienda de Aplicaciones

Compila y despliega la versión 2.0.0 en la tienda de aplicaciones. Todos los usuarios que descarguen esta versión (ya sean usuarios nuevos o usuarios existentes actualizando) automáticamente usarán el canal v2 porque está configurado en el Paquete de la aplicación.

:::Nota
**¡No se necesitan cambios de código!** Como `defaultChannel: 'v2'` está incluido en la versión de la tienda de aplicaciones, todos los usuarios que descarguen la versión 2.0.0 usarán automáticamente el canal correcto.
:::

## Escalar a Versiones Futuras

Cuando lances la versión 3.0.0 con más cambios incompatibles:

```bash
# Crear canal para versión 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts para versión 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Usuarios de versión 3.x
    }
  }
};
```

Ahora puedes enviar actualizaciones a cualquier versión:
- Canal `production` → Usuarios de versión 1.x
- Canal `v2` → Usuarios de versión 2.x
- Canal `v3` → Usuarios de versión 3.x

## 7. Limpieza (Después de la Migración)

Una vez que todos los usuarios hayan migrado a la versión 2.x (cuenta 3-4 meses):

1. Elimina `defaultChannel` de tu configuración de Capacitor
2. Elimina el canal v2:

```bash
npx @capgo/cli channel delete v2
```

3. Elimina la rama v1-maintenance:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::Consejo
Este enfoque asegura que los usuarios solo reciban actualizaciones compatibles con su versión de aplicación
:::

:::Advertencia
Siempre prueba las actualizaciones a fondo en cada canal antes del despliegue
:::

:::Nota
Puedes eliminar con seguridad el canal v2 en Capgo incluso si algunos usuarios todavía tienen la anulación de canal. Automáticamente recibirán actualizaciones del canal production en su lugar.
:::

## Mantener Actualizaciones de Versión 1.x

Para enviar actualizaciones compatibles con la versión 1.x:

1. Cambia a la rama v1-maintenance:
```bash
git checkout v1-maintenance
```

2. Haz tus cambios y confírmalos:
```bash
# Haz cambios compatibles con 1.x
git add .
git commit -m "Fix para v1.x"
git push origin v1-maintenance
```

3. Compila y sube al canal production:
```bash
npx @capgo/cli bundle upload --channel production
```

:::Consejo
Mantén tu rama v1-maintenance actualizada con correcciones de errores que sean compatibles con la versión 1.x, pero nunca fusiones cambios incompatibles desde main
:::
