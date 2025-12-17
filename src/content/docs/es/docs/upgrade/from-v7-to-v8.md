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

## Requisito de versión mínima de iOS

El objetivo de implementación mínimo de iOS se ha aumentado a **15.5** para garantizar que los dispositivos iOS con [CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943) sean excluidos. Esta es la versión mínima de la biblioteca zip de iOS que tiene implementada la corrección de seguridad.

### Solución alternativa para Swift Package Manager (SPM)

Capacitor actualmente tiene un bug ([ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)) que no permite establecer el objetivo de implementación de iOS en 15.5 cuando se usa SPM.

Si necesitas soporte de SPM, puedes usar temporalmente nuestro fork:

**GitHub:** [https://github.com/Cap-go/capacitor-plus](https://github.com/Cap-go/capacitor-plus)

Para usarlo, reemplaza el paquete CLI `@capacitor/cli` por `@capacitor-plus/cli`:

```bash
npm uninstall @capacitor/cli
npm install @capacitor-plus/cli
```

Luego usa el CLI como de costumbre:

```bash
npx capacitor sync
```

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

- [ ] Seguir la [guía de migración](https://capacitorjs.com/docs/updating/8-0) v8 de Capacitor, verificar cambios incompatibles
- [ ] Aumentar el objetivo de implementación mínimo de iOS a 15.5 (requerido para la corrección de CVE-2022-36943)
- [ ] Si usas SPM, cambiar temporalmente a [@capacitor-plus/cli](https://github.com/Cap-go/capacitor-plus) hasta que [ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556) sea corregido
- [ ] Actualizar @capgo/capacitor-updater a ^8.0.0
- [ ] Ejecutar `npx cap sync`
- [ ] Probar tu aplicación exhaustivamente en iOS y Android

## ¿Necesitas ayuda?

Si encuentras algún problema durante la migración, por favor:

1. Consulta nuestra [documentación](/docs/live-updates/)
2. Visita nuestra [comunidad de Discord](https://discord.com/invite/VnYRvBfgA6)
3. Abre un problema en [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
