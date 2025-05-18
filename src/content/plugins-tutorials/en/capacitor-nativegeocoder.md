---
locale: en
---
## Using @capgo/nativegeocoder for Geocoding

The `@capgo/nativegeocoder` package is a Capacitor plugin that provides native forward and reverse geocoding functionality. Geocoding is the process of converting addresses into geographic coordinates (latitude and longitude) and vice versa.

To use the `@capgo/nativegeocoder` package, follow the steps below:

### Step 1: Install the package

Install the package using npm:

```bash
npm install @capgo/nativegeocoder
```

### Step 2: Sync your project

Run the following command to sync your project:

```bash
npx cap sync
```

### Step 3: Import the plugin

In your code, import the `NativeGeocoder` from `@capgo/nativegeocoder`:

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### Step 4: Implement geocoding functionality

The `@capgo/nativegeocoder` plugin provides two main methods for geocoding:

#### Reverse Geocoding

Reverse geocoding is the process of converting geographic coordinates (latitude and longitude) into an address.

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

The `reverseGeocode` method takes an object with the latitude and longitude properties. It returns the address as a result.

#### Forward Geocoding

Forward geocoding is the process of converting an address into geographic coordinates (latitude and longitude).

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

The `forwardGeocode` method takes an object with the address property. It returns the coordinates as a result.

### Conclusion

The `@capgo/nativegeocoder` package provides a simple and efficient way to perform geocoding in your Capacitor project. By following the steps outlined in this tutorial, you can easily integrate geocoding functionality into your application.
