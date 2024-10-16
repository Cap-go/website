---
locale: de
---

`@capgo/konsta` Paket

In diesem Tutorial zeigen wir Ihnen, wie Sie das `@capgo/konsta` Paket verwenden, um pixelgenaue mobile UI-Komponenten mit iOS- und Material Design-Komponenten für React, Vue und Svelte zu erstellen. Das `@capgo/konsta` Paket wurde mit Tailwind CSS erstellt und bietet eine breite Palette an UI-Komponenten, die sich leicht in Ihre Projekte integrieren lassen.

Befolgen Sie die folgenden Schritte, um zu beginnen:

## Schritt 1: Abhängigkeiten installieren

Um das `@capgo/konsta` Paket zu verwenden, müssen Sie alle erforderlichen Abhängigkeiten installieren. Öffnen Sie Ihr Terminal und navigieren Sie zu Ihrem Projektverzeichnis. Führen Sie dann den folgenden Befehl aus:

```shell
$ npm install @capgo/konsta
```

Dieser Befehl installiert das `@capgo/konsta` Paket und seine Abhängigkeiten in Ihrem Projekt.

## Schritt 2: Komponenten importieren und verwenden

Sobald die Abhängigkeiten installiert sind, können Sie die Komponenten aus dem `@capgo/konsta` Paket in Ihrem Projekt importieren und verwenden. Je nach gewähltem Framework (React, Vue oder Svelte) befolgen Sie die entsprechenden Schritte unten:

### React

Um die `@capgo/konsta` Komponenten in einem React-Projekt zu verwenden, importieren Sie die gewünschte Komponente wie unten gezeigt:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your React component
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

### Vue

Um die `@capgo/konsta` Komponenten in einem Vue-Projekt zu verwenden, importieren Sie die gewünschte Komponente wie unten gezeigt:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Vue component
export default {
  components: {
    Button,
  },
  template: `
    <div>
      <Button>Click me</Button>
    </div>
  `,
};
```

### Svelte

Um die `@capgo/konsta` Komponenten in einem Svelte-Projekt zu verwenden, importieren Sie die gewünschte Komponente wie unten gezeigt:

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Svelte component
let name = 'world';
```

```html
<script>
  import { Button } from '@capgo/konsta';

  // Use the Button component in your Svelte component
  let name = 'world';
</script>

<main>
  <Button>Hello {name}!</Button>
</main>
```

## Schritt 3: Komponenten anpassen und stylen

Das `@capgo/konsta` Paket bietet eine breite Palette von UI-Komponenten, die sich leicht anpassen und stylen lassen, um dem Design Ihres Projekts zu entsprechen. Sie können die Eigenschaften der Komponenten ändern, benutzerdefinierte CSS-Klassen hinzufügen oder Inline-Stile anwenden, um das gewünschte Aussehen und Gefühl zu erreichen. Weitere Informationen zur Anpassung und zum Stylen der Komponenten finden Sie in der Dokumentation unter [https://konstauicom](https://konstauicom/).

## Schritt 4: Bauen und Testen

Nachdem Sie die `@capgo/konsta` Komponenten in Ihr Projekt integriert haben, können Sie Ihre Anwendung bauen und testen. Verwenden Sie die entsprechenden Build-Befehle für Ihr Projekt, um den Code zu kompilieren und die Produktionsversion zu erstellen. Weitere Informationen finden Sie in der `packagejson`-Datei in Ihrem Projekt zu verfügbaren Build-Skripten.

## Fazit

Herzlichen Glückwunsch! Sie haben erfolgreich gelernt, wie Sie das `@capgo/konsta` Paket verwenden, um pixelgenaue mobile UI-Komponenten in Ihren React-, Vue- oder Svelte-Projekten zu erstellen. Sie können die Dokumentation erkunden und mit verschiedenen Komponenten und Anpassungsoptionen experimentieren, um die Benutzeroberfläche Ihrer Anwendung zu verbessern.

Für weitere Unterstützung oder zur Meldung von Problemen beachten Sie bitte die offizielle `@capgo/konsta` Dokumentation und Community. Viel Spaß beim Programmieren!