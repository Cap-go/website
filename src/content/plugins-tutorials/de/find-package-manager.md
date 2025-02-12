---
locale: de
---

sing @capgo/find-package-manager

Das `@capgo/find-package-manager` Paket ist ein nützliches Tool, um zu bestimmen, welcher Paketmanager in einem bestimmten Pfad verwendet wird. Dies kann hilfreich sein, wenn man mit Projekten arbeitet, die unterschiedliche Paketmanager verwenden.

Hier ist eine Schritt-für-Schritt-Anleitung, wie man dieses Paket verwendet:

## Installation

Zuerst stelle sicher, dass du Nodejs und npm auf deinem Computer installiert hast. Öffne dann dein Terminal und führe den folgenden Befehl aus, um das `@capgo/find-package-manager` Paket zu installieren:

```
npm install @capgo/find-package-manager
```

## Paket importieren

Sobald das Paket installiert ist, kannst du es mit der folgenden Zeile in deinen Code importieren:

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'
```

## Den Paketmanager-Typ finden

Um den Paketmanager-Typ in einem bestimmten Pfad zu finden, kannst du die Funktion `findPackageManagerType` verwenden. Hier ist ein Beispiel:

```typescript
console.log(findPackageManagerType())
```

Die Funktion `findPackageManagerType` gibt einen String zurück, der den Typ des verwendeten Paketmanagers angibt. Sie kann einen der folgenden Werte zurückgeben:

- `npm`: wenn npm verwendet wird
- `yarn`: wenn yarn verwendet wird
- `pnpm`: wenn pnpm verwendet wird
- `unknown`: wenn der Paketmanager-Typ nicht bestimmt werden kann

## Alles zusammenfügen

Hier ist ein vollständiges Beispiel, wie man das `@capgo/find-package-manager` Paket verwendet:

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'

console.log(findPackageManagerType()) // npm | yarn | pnpm | unknown
```

Das war's! Du kannst jetzt das `@capgo/find-package-manager` Paket verwenden, um den Paketmanager-Typ in einem bestimmten Pfad zu bestimmen.