---
slug: how-live-updates-for-capacitor-work
title: Comment fonctionne la mise à jour en direct dans Capgo
description: >-
  Profundiza en la implementación técnica de las actualizaciones en vivo de
  Capgo y comprende los mecanismos internos de funcionamiento en ambas
  plataformas, iOS y Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Arquitectura de actualizaciones en vivo
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---

# Entendiendo las actualizaciones en vivo en Capgo

Las actualizaciones en vivo son una de las características más poderosas en las aplicaciones Capacitor, permitiendo actualizaciones en tiempo real sin envíos a las tiendas de aplicaciones. Profundicemos en cómo Capgo implementa esta funcionalidad.

## Conceptos Fundamentales

Una aplicación Capacitor consiste en dos capas principales:

1. **Capa Web**: Contiene archivos HTML, CSS y JavaScript cargados en el WebView
2. **Capa Nativa**: Contiene código específico de la plataforma (Java/Kotlin para Android, Swift para iOS)

El sistema de actualización en vivo de Capgo funciona reemplazando la capa web en tiempo de ejecución, ya que estos archivos no están compilados en el binario de la aplicación.

## Implementación Técnica

### Rutas del Servidor en Capacitor

Capgo gestiona dos rutas críticas:

- **Ruta Actual del Servidor**: Apunta a los archivos actualmente cargados en WebView
- **Ruta Siguiente del Servidor**: Apunta a los archivos que se cargarán en el próximo reinicio de la aplicación

### Implementación en Android

En Android, Capgo gestiona las rutas a través de:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### Implementación en iOS

En iOS, las rutas se gestionan a través de:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Medidas de Seguridad

Capgo implementa seguridad de grado militar a través de cifrado de extremo a extremo, asegurando que las actualizaciones de tu aplicación permanezcan completamente seguras desde el desarrollo hasta el despliegue. Nuestro sistema de cifrado va más allá de la firma de código tradicional para proporcionar verdadera seguridad de conocimiento cero.

### Arquitectura de Cifrado de Extremo a Extremo

1. **Cifrado de Extremo a Extremo (E2EE)**: Cada paquete de actualización se cifra utilizando cifrado AES-256-GCM antes de salir de tu entorno de desarrollo. Este cifrado de grado militar asegura que las actualizaciones de tu aplicación permanezcan completamente privadas y seguras durante todo el proceso de entrega.

2. **Arquitectura de Conocimiento Cero**: A diferencia de otras soluciones OTA que solo firman actualizaciones, Capgo emplea verdadero cifrado de conocimiento cero. Esto significa:
   - El contenido de las actualizaciones se cifra antes de la carga
   - Los servidores de Capgo solo almacenan datos cifrados
   - El descifrado solo ocurre en los dispositivos de usuarios finales
   - Ningún intermediario puede acceder al contenido de tu actualización

3. **Gestión Segura de Claves**:
   - Las claves de cifrado se generan y almacenan de forma segura en tu entorno CI/CD
   - Las claves privadas nunca tocan los servidores de Capgo
   - Cada versión de la aplicación puede usar claves de cifrado únicas
   - Soporte para rotación de claves para mayor seguridad

Aprende más sobre nuestro sistema de cifrado en nuestra guía detallada: [End-to-End Encryption in Capgo Live Updates](https://capgoapp/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Proceso de Seguridad de Actualizaciones

1. **Cifrado Pre-Carga**:
   - Las actualizaciones se cifran en tu pipeline CI/CD
   - Cada archivo se cifra individualmente
   - Los metadatos también se cifran para privacidad completa

2. **Almacenamiento Seguro**:
   - Los paquetes cifrados se almacenan en el CDN global de Capgo
   - Ningún dato en texto plano toca nuestros servidores
   - Incluso en caso de violación del servidor, los datos permanecen seguros

3. **Entrega Segura**:
   - Las actualizaciones se entregan a través de canales cifrados
   - Cada instancia de la aplicación valida la integridad del cifrado
   - Mecanismos automáticos de reintento para descifrados fallidos

4. **Seguridad del Lado del Cliente**:
   - Las actualizaciones se verifican antes de la instalación
   - Los descifrados fallidos activan reversión automática
   - Almacenamiento seguro de claves en el almacenamiento protegido de la aplicación

Este enfoque integral de seguridad asegura que las actualizaciones de tu aplicación permanezcan protegidas contra:
- Ataques de intermediarios
- Violaciones del lado del servidor
- Modificaciones no autorizadas
- Ataques de repetición
- Manipulación de contenido

## Ciclo de Vida de Actualización

El proceso de actualización de Capgo está diseñado para ser automático por defecto. Así es como funciona el proceso automático:

### 1. Verificación Automática de Actualizaciones

El plugin verifica automáticamente las actualizaciones en estas situaciones:
- Cuando la aplicación inicia

Este comportamiento está controlado por la configuración `autoUpdate`:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
También puedes verificar manualmente con `getLatest()`

### 2. Descarga Automática

Cuando se detecta una nueva versión, si `autoUpdate` está habilitado:
1. La descarga comienza automáticamente
2. El progreso se rastrea internamente
3. Las descargas fallidas se reintentan automáticamente en cada apertura de la aplicación
4.Las descargas exitosas se almacenan en el almacenamiento de la aplicación

Puedes monitorear este proceso a través de eventos:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3 Instalación Automática

El momento de la instalación depende de tu configuración:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

La instalación ocurre:
- Inmediatamente si `directUpdate` es verdadero
- En el siguiente paso a segundo plano de la app si `directUpdate` es falso
- Auto-reversión si la instalación falla

El plugin también gestiona automáticamente el almacenamiento:
- Elimina actualizaciones fallidas si `autoDeleteFailed` es verdadero
- Limpia versiones antiguas si `autoDeletePrevious` es verdadero

### Retrasando Actualizaciones

Puedes controlar cuándo se instalan las actualizaciones usando condiciones de retraso:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Condiciones de retraso disponibles:
- **background**: Instalar cuando la app pase a segundo plano
- **date**: Instalar después de una fecha/hora específica
- **nativeVersion**: Instalar después de la próxima actualización nativa
- **kill**: Instalar después de que la app sea cerrada

Esto es útil para:
- Programar actualizaciones durante horas de bajo uso
- Coordinar actualizaciones con la actividad del usuario
- Asegurar una experiencia fluida de actualización
- Prevenir interrupciones durante tareas críticas

### Estados de Actualización

Durante el proceso automático, los paquetes pasan por estos estados:
1. **downloading**: Descarga en progreso
2. **pending**: Descarga completa, esperando instalación
3. **success**: Actualización instalada y activa
4. **error**: Actualización fallida (activa auto-reversión)

## Cumplimiento de las Tiendas

### App Store de Apple ✅

Las Actualizaciones en Vivo cumplen totalmente con las políticas de la App Store de Apple. Como se establece en el Acuerdo de Licencia del Programa de Desarrolladores de Apple:

> "El código interpretado puede descargarse en una Aplicación solo si dicho código: (a) no cambia el propósito principal de la Aplicación proporcionando características o funcionalidad inconsistentes con el propósito previsto y anunciado de la Aplicación según se envió a la App Store, (b) no crea una tienda o punto de venta para otro código o aplicaciones, y (c) no evita la firma, el sandbox u otras características de seguridad del SO"

Capgo solo modifica la capa web mientras respeta todos los límites de seguridad de la plataforma

### Google Play Store ✅

Las Actualizaciones en Vivo cumplen con las Políticas de Google Play. La política de Abuso de Dispositivos y Red específicamente establece:

> "Esta restricción no se aplica al código que se ejecuta en una máquina virtual o un intérprete donde cualquiera proporciona acceso indirecto a las APIs de Android (como JavaScript en un webview o navegador)"

Como Capgo solo actualiza el contenido de WebView, está dentro de estas pautas permitidas

## Mejores Prácticas

1. **Implementaciones Graduales**: Desplegar actualizaciones gradualmente
2. **Control de Versiones**: Rastrear todas las versiones desplegadas
3. **Soporte de Reversión**: Recuperación rápida de problemas
4. **Actualizaciones Delta**: Solo descargar archivos modificados

## Cuándo Usar Actualizaciones en Vivo

Perfecto para:
- Corrección de errores
- Mejoras de UI
- Actualizaciones de contenido
- Activación de funciones

No adecuado para:
- Cambios de código nativo
- Actualizaciones de versiones mayores
- Parches de seguridad que requieren cambios nativos