---
locale: de
---

Verwendung von @capgo/nativegeocoder für Geokodierung

Das Paket `@capgo/nativegeocoder` ist ein Capacitor-Plugin, das native Funktionen für vorwärts und rückwärts Geokodierung bereitstellt. Geokodierung ist der Prozess, Adressen in geografische Koordinaten (Breitengrad und Längengrad) und umgekehrt umzuwandeln.

Um das Paket `@capgo/nativegeocoder` zu verwenden, befolgen Sie die folgenden Schritte:

### Schritt 1: Paket installieren

Installieren Sie das Paket mit npm:

```bash
npm install @capgo/nativegeocoder
```

### Schritt 2: Ihr Projekt synchronisieren

Führen Sie den folgenden Befehl aus, um Ihr Projekt zu synchronisieren:

```bash
npx cap sync
```

### Schritt 3: Plugin importieren

Importieren Sie in Ihrem Code `NativeGeocoder` aus `@capgo/nativegeocoder`:

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### Schritt 4: Geokodierungsfunktionalität implementieren

Das Plugin `@capgo/nativegeocoder` bietet zwei Hauptmethoden für die Geokodierung:

#### Rückwärts-Geokodierung

Die Rückwärts-Geokodierung ist der Prozess, geografische Koordinaten (Breitengrad und Längengrad) in eine Adresse umzuwandeln.

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

Die Methode `reverseGeocode` nimmt ein Objekt mit den Eigenschaften Breitengrad und Längengrad. Sie gibt die Adresse als Ergebnis zurück.

#### Vorwärts-Geokodierung

Die Vorwärts-Geokodierung ist der Prozess, eine Adresse in geografische Koordinaten (Breitengrad und Längengrad) umzuwandeln.

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

Die Methode `forwardGeocode` nimmt ein Objekt mit der Adresseigenschaft. Sie gibt die Koordinaten als Ergebnis zurück.

### Fazit

Das Paket `@capgo/nativegeocoder` bietet eine einfache und effiziente Möglichkeit, Geokodierung in Ihrem Capacitor-Projekt durchzuführen. Indem Sie die in diesem Tutorial beschriebenen Schritte befolgen, können Sie die Geokodierungsfunktionalität problemlos in Ihre Anwendung integrieren.