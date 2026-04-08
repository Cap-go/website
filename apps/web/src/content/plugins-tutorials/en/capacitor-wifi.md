---
locale: en
---
# Using @capgo/capacitor-wifi Package

The `@capgo/capacitor-wifi` package allows you to manage WiFi connectivity in your Capacitor app. In this tutorial, we'll guide you through installing and using this package to scan networks, connect to WiFi, and monitor connection status.

## Installation

To install the `@capgo/capacitor-wifi` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-wifi
npx cap sync
```

## Configuration

### Android Setup

Add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### iOS Setup

Add the following to your `Info.plist` file:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need location access to scan WiFi networks</string>
```

## API

The `@capgo/capacitor-wifi` package provides the following API methods:

### getWifiInfo()

This method retrieves information about the currently connected WiFi network.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function getWifiInfo() {
  try {
    const info = await CapacitorWifi.getWifiInfo();
    console.log('SSID:', info.ssid);
    console.log('BSSID:', info.bssid);
    console.log('IP Address:', info.ip);
    console.log('Frequency:', info.frequency, 'MHz');
    console.log('Link Speed:', info.linkSpeed, 'Mbps');
    console.log('Signal Strength:', info.signalStrength, '%');
  } catch (error) {
    console.error('Failed to get WiFi info:', error);
  }
}
```

### scan()

This method scans for available WiFi networks.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function scanNetworks() {
  try {
    const { networks } = await CapacitorWifi.scan();

    networks.forEach(network => {
      console.log('SSID:', network.ssid);
      console.log('Signal Level:', network.level, 'dBm');
      console.log('Frequency:', network.frequency, 'MHz');
      console.log('Security:', network.capabilities);
      console.log('---');
    });

    return networks;
  } catch (error) {
    console.error('Scan failed:', error);
  }
}
```

### connect(options)

This method connects to a WiFi network.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function connectToNetwork() {
  const options = {
    ssid: 'MyNetwork',
    password: 'mypassword',
    isHiddenSsid: false
  };

  try {
    await CapacitorWifi.connect(options);
    console.log('Connected successfully!');
  } catch (error) {
    console.error('Connection failed:', error);
  }
}
```

**Options:**
- `ssid` (string, required): Network name
- `password` (string, optional): Network password for secured networks
- `isHiddenSsid` (boolean, optional): Whether the SSID is hidden

### disconnect()

This method disconnects from the current WiFi network.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function disconnectFromNetwork() {
  try {
    await CapacitorWifi.disconnect();
    console.log('Disconnected successfully');
  } catch (error) {
    console.error('Disconnect failed:', error);
  }
}
```

### getSSID()

This method retrieves the SSID of the currently connected network.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function getCurrentSSID() {
  try {
    const { ssid } = await CapacitorWifi.getSSID();
    console.log('Connected to:', ssid);
    return ssid;
  } catch (error) {
    console.error('Failed to get SSID:', error);
  }
}
```

### getIP()

This method retrieves the current device IP address.

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

async function getIPAddress() {
  try {
    const { ip } = await CapacitorWifi.getIP();
    console.log('IP Address:', ip);
    return ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
  }
}
```

## Complete Examples

### WiFi Manager Service

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

export class WifiManager {
  async getCurrentNetwork() {
    try {
      const info = await CapacitorWifi.getWifiInfo();

      return {
        name: info.ssid,
        strength: this.getSignalQuality(info.signalStrength),
        speed: `${info.linkSpeed} Mbps`,
        frequency: info.frequency >= 5000 ? '5GHz' : '2.4GHz',
        ip: info.ip
      };
    } catch (error) {
      console.error('Failed to get network info:', error);
      return null;
    }
  }

  async scanAndConnect(ssid, password) {
    try {
      // First, scan for networks
      const { networks } = await CapacitorWifi.scan();

      // Find target network
      const targetNetwork = networks.find(n => n.ssid === ssid);

      if (!targetNetwork) {
        throw new Error(`Network "${ssid}" not found`);
      }

      console.log(`Found network with signal: ${targetNetwork.level} dBm`);

      // Connect to the network
      await CapacitorWifi.connect({
        ssid,
        password
      });

      console.log('Successfully connected!');
      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }

  async findStrongestNetwork(preferredNetworks) {
    const { networks } = await CapacitorWifi.scan();

    // Filter to preferred networks
    const available = networks.filter(n =>
      preferredNetworks.includes(n.ssid)
    );

    if (available.length === 0) {
      return null;
    }

    // Sort by signal strength (highest first)
    available.sort((a, b) => b.level - a.level);

    return {
      ssid: available[0].ssid,
      signalLevel: available[0].level
    };
  }

  getSignalQuality(strength) {
    if (strength >= 80) return 'Excellent';
    if (strength >= 60) return 'Good';
    if (strength >= 40) return 'Fair';
    return 'Poor';
  }

  getSecurityType(capabilities) {
    const caps = capabilities.toLowerCase();

    if (caps.includes('wpa3')) return 'WPA3';
    if (caps.includes('wpa2')) return 'WPA2';
    if (caps.includes('wpa')) return 'WPA';
    if (caps.includes('wep')) return 'WEP';

    return 'Open';
  }
}

// Usage
const wifiManager = new WifiManager();

// Get current network info
const network = await wifiManager.getCurrentNetwork();
console.log('Current network:', network);

// Scan and connect
await wifiManager.scanAndConnect('MyNetwork', 'password123');

// Find strongest preferred network
const strongest = await wifiManager.findStrongestNetwork([
  'HomeWiFi',
  'OfficeWiFi'
]);
```

### Network Monitor

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

export class NetworkMonitor {
  constructor() {
    this.currentSsid = null;
    this.listeners = [];
    this.intervalId = null;
  }

  start(intervalMs = 5000) {
    this.stop(); // Clear any existing interval

    this.intervalId = setInterval(async () => {
      await this.checkConnection();
    }, intervalMs);

    // Initial check
    this.checkConnection();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async checkConnection() {
    try {
      const { ssid } = await CapacitorWifi.getSSID();

      if (ssid !== this.currentSsid) {
        const oldSsid = this.currentSsid;
        this.currentSsid = ssid;

        this.notifyListeners({
          type: 'change',
          oldSsid,
          newSsid: ssid
        });
      }
    } catch (error) {
      if (this.currentSsid !== null) {
        const oldSsid = this.currentSsid;
        this.currentSsid = null;

        this.notifyListeners({
          type: 'disconnected',
          oldSsid
        });
      }
    }
  }

  onNetworkChange(callback) {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  notifyListeners(event) {
    this.listeners.forEach(listener => listener(event));
  }
}

// Usage
const monitor = new NetworkMonitor();

// Start monitoring
monitor.start(3000); // Check every 3 seconds

// Listen for network changes
const unsubscribe = monitor.onNetworkChange((event) => {
  if (event.type === 'change') {
    console.log(`Network changed from ${event.oldSsid} to ${event.newSsid}`);
  } else if (event.type === 'disconnected') {
    console.log(`Disconnected from ${event.oldSsid}`);
  }
});

// Stop monitoring when done
// monitor.stop();
// unsubscribe();
```

### Auto-Connect Manager

```javascript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

export class AutoConnectManager {
  constructor(preferredNetworks) {
    // preferredNetworks: [{ ssid: 'Network1', password: 'pass1' }, ...]
    this.preferredNetworks = preferredNetworks;
  }

  async tryConnect() {
    try {
      // Scan for networks
      const { networks } = await CapacitorWifi.scan();

      // Try to connect to preferred networks in order
      for (const preferred of this.preferredNetworks) {
        const found = networks.find(n => n.ssid === preferred.ssid);

        if (found) {
          console.log(`Attempting to connect to ${preferred.ssid}...`);

          try {
            await CapacitorWifi.connect({
              ssid: preferred.ssid,
              password: preferred.password
            });

            console.log(`Successfully connected to ${preferred.ssid}`);
            return {
              success: true,
              ssid: preferred.ssid
            };
          } catch (error) {
            console.error(`Failed to connect to ${preferred.ssid}:`, error);
          }
        }
      }

      return {
        success: false,
        error: 'No preferred networks found'
      };
    } catch (error) {
      console.error('Auto-connect failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async connectToBest() {
    const { networks } = await CapacitorWifi.scan();

    // Filter to preferred networks
    const available = networks
      .filter(n => this.preferredNetworks.some(p => p.ssid === n.ssid))
      .sort((a, b) => b.level - a.level); // Sort by signal strength

    if (available.length === 0) {
      throw new Error('No preferred networks in range');
    }

    const best = available[0];
    const credentials = this.preferredNetworks.find(p => p.ssid === best.ssid);

    await CapacitorWifi.connect({
      ssid: best.ssid,
      password: credentials.password
    });

    return best.ssid;
  }
}

// Usage
const autoConnect = new AutoConnectManager([
  { ssid: 'HomeWiFi', password: 'homepass123' },
  { ssid: 'OfficeWiFi', password: 'officepass456' }
]);

// Try to connect to any preferred network
const result = await autoConnect.tryConnect();

// Or connect to the strongest preferred network
const connectedSsid = await autoConnect.connectToBest();
```

## Best Practices

1. **Request Permissions**: Request location permissions before scanning networks
2. **Error Handling**: Always wrap WiFi operations in try-catch blocks
3. **User Feedback**: Show loading indicators during network operations
4. **Security**: Never store WiFi passwords in plain text
5. **Platform Differences**: Be aware of iOS limitations (cannot programmatically connect)
6. **Testing**: Test on real devices as WiFi APIs may not work in emulators

## Platform Differences

### iOS
- Requires location permissions to scan networks
- Cannot programmatically connect to networks (will open Settings)
- Limited access to network details for privacy reasons

### Android
- Full programmatic WiFi control
- Requires location permissions for network scanning
- Can connect/disconnect programmatically
- More detailed network information available

## Troubleshooting

### Scan returns empty list
- Check that location permissions are granted
- Ensure WiFi is enabled on the device
- On Android, verify location services are enabled

### Cannot connect to network
- Verify the password is correct
- Ensure the network is in range
- Check that the SSID is spelled correctly
- On iOS, this operation will open Settings instead

### getWifiInfo() fails
- Ensure device is connected to a WiFi network
- Check that WiFi is enabled
- Verify app has necessary permissions

### Permission denied errors
- Add required permissions to platform configuration files
- Request runtime permissions on Android
- Ensure location permissions are granted

## Conclusion

The `@capgo/capacitor-wifi` package provides comprehensive WiFi management capabilities for your Capacitor app. With features for scanning networks, connecting programmatically (on Android), and monitoring connection status, you can create robust WiFi-dependent features in your application.
