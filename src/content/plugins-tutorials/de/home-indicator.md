---
locale: de
---

capgo/home-indicator

Das `@capgo/home-indicator` Paket ermöglicht es Ihnen, den Home-Button-Indikator in Ihrer Capacitor-App auszublenden und anzuzeigen.

## Installation

Um das Paket zu installieren, führen Sie den folgenden Befehl in Ihrem Terminal aus:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

Das Paket bietet die folgenden Methoden:

### `hide()`

```typescript
hide() => Promise
```

Blenden Sie den Home-Indikator aus.

**Seit:** 001

### `show()`

```typescript
show() => Promise
```

Zeigen Sie den Home-Indikator an.

**Seit:** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

Erhalten Sie den Status des Home-Indikators.

**Gibt zurück:** Promise<{ hidden: boolean; }>

**Seit:** 001

## CSS-Variablen

Sie können `--safe-area-inset-bottom` verwenden, um sicherzustellen, dass Ihr Inhalt nicht vom Home-Indikator verdeckt wird. Diese Variable wird vom Plugin für Android injiziert. Es ist nützlich, wenn Sie den echten Vollbildmodus auf Android aktivieren.

Beispielverwendung:

```java
getWindow().setDecorFitsSystemWindows(false);
```

## Credits

Dieses Plugin wurde ursprünglich für [Kickcom](https://kickcom/) von [Capgo](https://capgoapp/) erstellt.

Für weitere Informationen und Updates besuchen Sie [Capgo](https://capgoapp/).