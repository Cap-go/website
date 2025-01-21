---
locale: es
---

capgo/home-indicator

El paquete `@capgo/home-indicator` te permite ocultar y mostrar el indicador del botón de inicio en tu aplicación Capacitor.

## Instalación

Para instalar el paquete, ejecuta el siguiente comando en tu terminal:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

El paquete proporciona los siguientes métodos:

### `hide()`

```typescript
hide() => Promise
```

Oculta el indicador del inicio.

**Desde:** 001

### `show()`

```typescript
show() => Promise
```

Muestra el indicador del inicio.

**Desde:** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

Obtiene el estado del indicador del inicio.

**Devuelve:** Promise<{ hidden: boolean; }>

**Desde:** 001

## Variables CSS

Puedes usar `--safe-area-inset-bottom` para asegurarte de que tu contenido no esté oculto por el indicador del inicio. Esta variable es inyectada por el plugin para Android. Es útil si configuras el modo de pantalla completa real en Android.

Ejemplo de uso:

```java
getWindow().setDecorFitsSystemWindows(false);
```

## Créditos

Este plugin fue creado originalmente para [Kickcom](https://kickcom/) por [Capgo](https://capgoapp/).

Para más información y actualizaciones, visita [Capgo](https://capgoapp/).