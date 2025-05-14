---
slug: how-live-updates-for-capacitor-work
title: Cómo funcionan las Actualizaciones en Vivo en Capgo
description: >-
  Profundiza en la implementación técnica de las actualizaciones en vivo en
  Capgo, comprendiendo cómo funciona internamente tanto en iOS como en Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Arquitectura de Actualizaciones en Vivo
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: es
next_blog: ''
---
# Entendiendo las Actualizaciones en Vivo en Capgo

Las actualizaciones en vivo son una de las características más poderosas en las aplicaciones de Capacitor, permitiendo actualizaciones en tiempo real sin envíos a la tienda de aplicaciones. Vamos a profundizar en cómo Capgo implementa esta funcionalidad.

## Conceptos Clave

Una aplicación de Capacitor se compone de dos capas principales:

1. **Capa Web**: Contiene archivos HTML, CSS y JavaScript cargados en el WebView
2. **Capa Nativa**: Contiene código específico de la plataforma (Java/Kotlin para Android, Swift para iOS)

El sistema de actualizaciones en vivo de Capgo funciona reemplazando la capa web en tiempo de ejecución, ya que estos archivos no se compilan en el binario de la aplicación.

## Implementación Técnica

### Rutas del Servidor en Capacitor

Capgo gestiona dos rutas críticas:

- **Ruta del Servidor Actual**: Apunta a los archivos actualmente cargados en el WebView
- **Ruta del Servidor Siguiente**: Apunta a los archivos que se cargarán en el próximo reinicio de la aplicación

### Implementación en Android

En Android, Capgo gestiona rutas a través de:

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

Capgo implementa una seguridad de grado militar a través de cifrado de extremo a extremo, asegurando que las actualizaciones de tu aplicación permanezcan completamente seguras desde el desarrollo hasta la implementación. Nuestro sistema de cifrado va más allá de la firma de código tradicional para proporcionar una verdadera seguridad de cero conocimiento.

### Arquitectura de Cifrado de Extremo a Extremo

1. **Cifrado de Extremo a Extremo (E2EE)**: Cada paquete de actualización es cifrado usando cifrado AES-256-GCM antes de salir de tu entorno de desarrollo. Este cifrado de grado militar asegura que las actualizaciones de tu aplicación permanezcan completamente privadas y seguras a lo largo de todo el proceso de entrega.

2. **Arquitectura de Cero Conocimiento**: A diferencia de otras soluciones de actualización OTA que solo firman actualizaciones, Capgo emplea un verdadero cifrado de cero conocimiento. Esto significa:
   - El contenido de la actualización se cifra antes de la carga
   - Los servidores de Capgo solo almacenan datos cifrados
   - La descifrado solo ocurre en dispositivos de usuario final
   - Ningún intermediario puede acceder al contenido de tu actualización

3. **Gestión Segura de Claves**:
   - Las claves de cifrado se generan y almacenan de forma segura en tu entorno de CI/CD
   - Las claves privadas nunca tocan los servidores de Capgo
   - Cada versión de la aplicación puede usar claves de cifrado únicas
   - Soporte para rotación de claves para mayor seguridad

Obtén más información sobre nuestro sistema de cifrado en nuestra guía detallada: [Cifrado de Extremo a Extremo en Actualizaciones en Vivo de Capgo](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Proceso de Seguridad de Actualizaciones

1. **Cifrado Pre-Carga**:
   - Las actualizaciones se cifran en tu pipeline de CI/CD
   - Cada archivo se cifra individualmente
   - Los metadatos también se cifran para una privacidad completa

2. **Almacenamiento Seguro**:
   - Los paquetes cifrados se almacenan en el CDN global de Capgo
   - Ningún dato en texto plano toca nuestros servidores
   - Incluso en caso de violación del servidor, los datos permanecen seguros

3. **Entrega Segura**:
   - Las actualizaciones se entregan a través de canales cifrados
   - Cada instancia de la aplicación valida la integridad del cifrado
   - Mecanismos de reintento automáticos para descifrados fallidos

4. **Seguridad del Lado del Cliente**:
   - Las actualizaciones se verifican antes de la instalación
   - Un descifrado fallido activa un retroceso automático
   - Almacenamiento seguro de claves en el almacenamiento protegido de la aplicación

Este enfoque de seguridad integral asegura que las actualizaciones de tu aplicación permanezcan protegidas contra:
- Ataques de intermediarios
- Violaciones del lado del servidor
- Modificaciones no autorizadas
- Ataques de reproducción
- Manipulación de contenido

## Ciclo de Vida de las Actualizaciones

El proceso de actualización de Capgo está diseñado para ser automático por defecto. Aquí está cómo funciona el proceso automático:

### 1. Verificación Automática de Actualizaciones

El plugin verifica automáticamente las actualizaciones en estas situaciones:
- Cuando la aplicación se inicia

Este comportamiento es controlado por la configuración `autoUpdate`:

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
4. Las descargas exitosas se almacenan en el almacenamiento de la aplicación

Puedes monitorear este proceso a través de eventos:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Instalación Automática

El tiempo de instalación depende de tu configuración:

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
- En el próximo momento de fondo de la aplicación si `directUpdate` es falso
- Retroceso automático si la instalación falla

El plugin también gestiona automáticamente el almacenamiento:
- Elimina actualizaciones fallidas si `autoDeleteFailed` es verdadero
- Limpia versiones antiguas si `autoDeletePrevious` es verdadero

### Demorando Actualizaciones

Puedes controlar cuándo se instalan las actualizaciones utilizando condiciones de demora:

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

Condiciones de demora disponibles:
- **background**: Instalar cuando la aplicación va a segundo plano
- **date**: Instalar después de una fecha/hora específica
- **nativeVersion**: Instalar después de la próxima actualización nativa
- **kill**: Instalar después de que la aplicación se cierre

Esto es útil para:
- Programar actualizaciones durante horas no pico
- Coordinar actualizaciones con la actividad del usuario
- Asegurar una experiencia de actualización fluida
- Prevenir interrupciones durante tareas críticas

### Estados de Actualización

Durante el proceso automático, los paquetes transitan por estos estados:
1. **descargando**: Descarga en progreso
2. **pendiente**: Descarga completa, esperando instalación
3. **éxito**: Actualización instalada y activa
4. **error**: Actualización fallida (activa retroceso automático)

## Cumplimiento de la Tienda

### Apple App Store ✅

Las Actualizaciones en Vivo cumplen totalmente con las políticas de la Apple App Store. Como se indica en el Acuerdo de Licencia del Programa de Desarrolladores de Apple:

> "El código interpretado puede descargarse a una Aplicación pero solo mientras dicho código: (a) no cambie el propósito principal de la Aplicación al proporcionar características o funcionalidades que son inconsistentes con el propósito previsto y publicitado de la Aplicación tal como se presentó a la App Store, (b) no cree una tienda o escaparate para otro código o aplicaciones, y (c) no eluda la firma, el sandbox o otras características de seguridad del OS."

Las actualizaciones de Capgo solo modifican la capa web mientras respetan todos los límites de seguridad de la plataforma.

### Google Play Store ✅

Las Actualizaciones en Vivo cumplen con las Políticas de Google Play. La política de Abuso de Dispositivos y Redes establece específicamente:

> "Esta restricción no se aplica al código que se ejecuta en una máquina virtual o un intérprete donde cualquiera de ellos proporciona acceso indirecto a las API de Android (como JavaScript en un webview o navegador)."

Dado que Capgo solo actualiza el contenido de WebView, se encuentra dentro de estas pautas permitidas.

## Mejores Prácticas

1. **Despliegues por Fases**: Desplegar actualizaciones gradualmente
2. **Control de Versiones**: Rastrear todas las versiones desplegadas
3. **Soporte de Retroceso**: Recuperación rápida de problemas
4. **Actualizaciones Delta**: Solo descargar archivos cambiados

## Cuándo Usar Actualizaciones en Vivo

Perfecto para:
- Corrección de errores
- Mejoras en la UI
- Actualizaciones de contenido
- Alternancias de características

No es adecuado para:
- Cambios en el código nativo
- Actualizaciones de versiones importantes
- Parches de seguridad que requieren cambios nativos
