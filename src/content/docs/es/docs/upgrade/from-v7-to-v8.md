---
title: "De V7 a V8"
locale: es
description: "Una guía detallada sobre la transición de la versión 7 a la versión 8 del actualizador de Capgo, describiendo los pasos necesarios y las consideraciones para un proceso de actualización exitoso, asegurando la compatibilidad con las características y mejoras de Capacitor 8."
sidebar:
  order: 0
---

## Por qué esta actualización

Esta versión mayor está aquí para seguir la versión mayor 8 de Capacitor

Primero sigue la guía de migración de Capacitor:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Instalación

`npm i @capgo/capacitor-updater@8`

Luego sincroniza la actualización del código nativo:

`npx cap sync`

¡Eso es todo! ¡Bastante fácil!

## Novedades en V8

La versión 8 de capacitor-updater trae compatibilidad completa con Capacitor 8, asegurando que tu aplicación pueda aprovechar las últimas características y mejoras del sistema operativo móvil.

### Actualizaciones clave

- **Compatibilidad con Capacitor 8**: Soporte completo para las características nativas mejoradas de Capacitor 8
- **Mejoras de rendimiento**: Proceso optimizado de entrega e instalación de actualizaciones
- **Estabilidad mejorada**: Correcciones de errores y mejoras de estabilidad desde v7
- **Compatibilidad de API mantenida**: Sin cambios importantes en la API del plugin desde v7

## Configuración

La configuración sigue siendo la misma que en v7. Tu configuración existente de `capacitor.config` continuará funcionando:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... otras configuraciones
    }
  }
}
```

## Lista de verificación de migración

- [ ] Actualizar @capacitor/core a ^8.0.0
- [ ] Actualizar @capacitor/android a ^8.0.0
- [ ] Actualizar @capacitor/ios a ^8.0.0
- [ ] Seguir la guía de migración v8 de Capacitor
- [ ] Actualizar @capgo/capacitor-updater a ^8.0.0
- [ ] Ejecutar `npx cap sync`
- [ ] Probar tu aplicación exhaustivamente en iOS y Android

## ¿Necesitas ayuda?

Si encuentras algún problema durante la migración, por favor:

1. Consulta nuestra [documentación](/docs/live-updates/)
2. Visita nuestra [comunidad de Discord](https://discord.com/invite/VnYRvBfgA6)
3. Abre un problema en [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
