---
locale: de
---

sing @capgo/capacitor-navigation-bar

## Installation

Um das Paket `@capgo/capacitor-navigation-bar` zu verwenden, müssen Sie es zunächst installieren, indem Sie den folgenden Befehl ausführen:

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## Einstellung der Navigationsleistenfarbe

Sie können die Farbe der Navigationsleiste für Android Lollipop und höher mit der Funktion `setNavigationBarColor` festlegen. Hier ist ein Beispiel, wie Sie es verwenden können:

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

Der Parameter `color` ist ein String, der die Farbe der Navigationsleiste darstellt.

## Abrufen der Navigationsleistenfarbe

Sie können auch die aktuelle Farbe der Navigationsleiste mit der Funktion `getNavigationBarColor` abrufen. Hier ist ein Beispiel, wie Sie es verwenden können:

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

Die Variable `color` enthält die aktuelle Farbe der Navigationsleiste.

Und das war's! Sie wissen jetzt, wie Sie das Paket `@capgo/capacitor-navigation-bar` verwenden, um die Farbe der Navigationsleiste in Ihrer Android-App festzulegen und abzurufen.