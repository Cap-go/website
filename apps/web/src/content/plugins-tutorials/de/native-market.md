---
published: true
locale: de
---

# @capgo/native-market Paket-Tutorial

Das `@capgo/native-market` Paket ist ein Capacitor-Community-Plugin für den nativen Markt, das es Ihnen ermöglicht, mit dem Play Store und dem App Store zu interagieren. Dieses Tutorial wird Sie durch die Installation und Nutzung dieses Pakets in Ihrem Capacitor-Projekt führen.

## Installation

Um das `@capgo/native-market` Paket zu installieren, öffnen Sie Ihr Terminal und führen Sie einen der folgenden Befehle aus, abhängig von Ihrem Paketmanager:

Mit npm:

```bash
npm install @capgo/native-market
```

Mit yarn:

```bash
yarn add @capgo/native-market
```

Nach der Installation synchronisieren Sie die nativen Dateien, indem Sie den folgenden Befehl ausführen:

```bash
npx cap sync
```

Auf iOS sind keine weiteren Aktionen erforderlich.

Auf Android sind keine weiteren Aktionen erforderlich.

## Nutzung

Das `@capgo/native-market` Paket bietet mehrere unterstützte Methoden, die Sie verwenden können, um mit dem nativen Markt zu interagieren. Hier ist ein Beispiel dafür, wie Sie jede Methode verwenden können:

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

Jede Methode benötigt unterschiedliche Eingabeparameter, abhängig von der Aktion, die Sie ausführen möchten. Stellen Sie sicher, dass Sie die Methodendokumentation für weitere Details zu den erforderlichen Parametern konsultieren.

Das war's! Sie haben jetzt das `@capgo/native-market` Paket erfolgreich in Ihrem Capacitor-Projekt installiert und verwendet. Fühlen Sie sich frei, weitere Funktionen zu erkunden und es nach Ihren Bedürfnissen anzupassen.

***

Herzlichen Glückwunsch zum Abschluss des Tutorials! Wenn Sie weitere Fragen haben oder Unterstützung benötigen, zögern Sie bitte nicht zu fragen.