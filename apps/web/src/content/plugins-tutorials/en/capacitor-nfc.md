---
locale: en
---
# Using @capgo/capacitor-nfc Package

The `@capgo/capacitor-nfc` package provides native NFC (Near Field Communication) support for Capacitor apps, enabling you to read and write NFC tags on both iOS and Android devices. This tutorial will guide you through installation, configuration, and usage of this powerful plugin.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-nfc
npx cap sync
```

## Platform Configuration

### iOS Setup

1. Add the NFC capability to your project in Xcode:
   - Open your project in Xcode
   - Select your target
   - Go to "Signing & Capabilities"
   - Click "+ Capability" and add "Near Field Communication Tag Reading"

2. Add the usage description to your `Info.plist`:

```xml
<key>NFCReaderUsageDescription</key>
<string>This app needs NFC access to read and write tags</string>
```

3. Create an entitlements file with NFC tag reading permissions if you haven't already.

### Android Setup

Add the NFC permission and feature to your `AndroidManifest.xml`:

```xml
<manifest>
  <uses-permission android:name="android.permission.NFC" />
  <uses-feature
    android:name="android.hardware.nfc"
    android:required="false" />
</manifest>
```

Setting `android:required="false"` makes NFC optional, allowing your app to run on devices without NFC hardware.

## Basic Usage

### Starting NFC Scanning

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

async function startNfcScanning() {
  try {
    await CapacitorNfc.startScanning({
      invalidateAfterFirstRead: false, // Keep session open
      alertMessage: 'Hold your device near an NFC tag',
    });

    console.log('NFC scanning started');
  } catch (error) {
    console.error('Failed to start NFC scanning:', error);
  }
}
```

### Reading NFC Tags

Set up a listener to handle NFC tag discoveries:

```typescript
async function setupNfcListener() {
  const listener = await CapacitorNfc.addListener('nfcEvent', (event) => {
    console.log('NFC Event Type:', event.type);
    console.log('Tag ID:', event.tag?.id);

    if (event.tag?.ndefMessage) {
      console.log('NDEF Records found:', event.tag.ndefMessage.length);

      event.tag.ndefMessage.forEach((record, index) => {
        console.log(`Record ${index}:`, record);
        decodeNdefRecord(record);
      });
    }
  });

  return listener;
}

function decodeNdefRecord(record: any) {
  // TNF 1 = Well-known type
  if (record.tnf === 1) {
    // Type 'T' = Text record
    if (record.type[0] === 0x54) {
      const langCodeLength = record.payload[0] & 0x3f;
      const text = new TextDecoder().decode(
        new Uint8Array(record.payload.slice(langCodeLength + 1))
      );
      console.log('Text:', text);
    }

    // Type 'U' = URI record
    if (record.type[0] === 0x55) {
      const uriPrefixCode = record.payload[0];
      const uri = new TextDecoder().decode(
        new Uint8Array(record.payload.slice(1))
      );
      console.log('URI:', getUriPrefix(uriPrefixCode) + uri);
    }
  }
}

function getUriPrefix(code: number): string {
  const prefixes = [
    '',
    'http://www.',
    'https://www.',
    'http://',
    'https://',
    'tel:',
    'mailto:',
    'ftp://anonymous:anonymous@',
    'ftp://ftp.',
    'ftps://',
    'sftp://',
    'smb://',
    'nfs://',
    'ftp://',
    'dav://',
    'news:',
    'telnet://',
    'imap:',
    'rtsp://',
    'urn:',
    'pop:',
    'sip:',
    'sips:',
    'tftp:',
    'btspp://',
    'btl2cap://',
    'btgoep://',
    'tcpobex://',
    'irdaobex://',
    'file://',
    'urn:epc:id:',
    'urn:epc:tag:',
    'urn:epc:pat:',
    'urn:epc:raw:',
    'urn:epc:',
    'urn:nfc:',
  ];
  return prefixes[code] || '';
}
```

### Writing to NFC Tags

#### Write Text to NFC Tag

```typescript
async function writeTextToTag(text: string) {
  try {
    const encoder = new TextEncoder();

    // Encode language code
    const langBytes = Array.from(encoder.encode('en'));

    // Encode text
    const textBytes = Array.from(encoder.encode(text));

    // Create payload: [language code length, language code, text]
    const payload = [langBytes.length & 0x3f, ...langBytes, ...textBytes];

    await CapacitorNfc.write({
      allowFormat: true,
      records: [
        {
          tnf: 0x01, // Well-known type
          type: [0x54], // 'T' for Text
          id: [],
          payload,
        },
      ],
    });

    console.log('Text written to NFC tag successfully');
  } catch (error) {
    console.error('Failed to write to NFC tag:', error);
  }
}
```

#### Write URL to NFC Tag

```typescript
async function writeUrlToTag(url: string) {
  try {
    // Remove common prefixes to use URI code
    let uriCode = 0x00;
    let shortenedUrl = url;

    if (url.startsWith('https://www.')) {
      uriCode = 0x02;
      shortenedUrl = url.substring(12);
    } else if (url.startsWith('http://www.')) {
      uriCode = 0x01;
      shortenedUrl = url.substring(11);
    } else if (url.startsWith('https://')) {
      uriCode = 0x04;
      shortenedUrl = url.substring(8);
    } else if (url.startsWith('http://')) {
      uriCode = 0x03;
      shortenedUrl = url.substring(7);
    }

    const urlBytes = Array.from(new TextEncoder().encode(shortenedUrl));
    const payload = [uriCode, ...urlBytes];

    await CapacitorNfc.write({
      allowFormat: true,
      records: [
        {
          tnf: 0x01, // Well-known type
          type: [0x55], // 'U' for URI
          id: [],
          payload,
        },
      ],
    });

    console.log('URL written to NFC tag successfully');
  } catch (error) {
    console.error('Failed to write URL:', error);
  }
}
```

### Erasing NFC Tags

```typescript
async function eraseTag() {
  try {
    await CapacitorNfc.erase();
    console.log('NFC tag erased');
  } catch (error) {
    console.error('Failed to erase tag:', error);
  }
}
```

### Making Tags Read-Only

**Warning:** This operation is permanent and cannot be undone!

```typescript
async function makeTagReadOnly() {
  const confirmed = confirm(
    'This will make the tag permanently read-only. Continue?'
  );

  if (confirmed) {
    try {
      await CapacitorNfc.makeReadOnly();
      console.log('Tag is now read-only');
    } catch (error) {
      console.error('Failed to make tag read-only:', error);
    }
  }
}
```

## Advanced Features

### Checking NFC Status

```typescript
async function checkNfcStatus() {
  try {
    const { status } = await CapacitorNfc.getStatus();

    switch (status) {
      case 'NFC_OK':
        console.log('NFC is available and enabled');
        return true;

      case 'NO_NFC':
        console.log('Device does not have NFC hardware');
        alert('This device does not support NFC');
        return false;

      case 'NFC_DISABLED':
        console.log('NFC is disabled');
        const enable = confirm('NFC is disabled. Open settings to enable it?');
        if (enable) {
          await CapacitorNfc.showSettings();
        }
        return false;

      case 'NDEF_PUSH_DISABLED':
        console.log('NDEF Push (Android Beam) is disabled');
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('Failed to check NFC status:', error);
    return false;
  }
}
```

### Android Beam (P2P Sharing)

Share data between two Android devices using Android Beam:

```typescript
async function shareViaBeam(message: string) {
  try {
    const encoder = new TextEncoder();
    const langBytes = Array.from(encoder.encode('en'));
    const textBytes = Array.from(encoder.encode(message));
    const payload = [langBytes.length & 0x3f, ...langBytes, ...textBytes];

    await CapacitorNfc.share({
      records: [
        {
          tnf: 0x01,
          type: [0x54],
          id: [],
          payload,
        },
      ],
    });

    console.log('Ready to share via Android Beam');
  } catch (error) {
    console.error('Failed to setup Android Beam:', error);
  }
}

async function stopBeamSharing() {
  try {
    await CapacitorNfc.unshare();
    console.log('Stopped Android Beam sharing');
  } catch (error) {
    console.error('Failed to stop sharing:', error);
  }
}
```

## Complete NFC Service Example

Here's a complete service class for managing NFC operations:

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';
import { PluginListenerHandle } from '@capacitor/core';

export class NfcService {
  private listener: PluginListenerHandle | null = null;
  private isScanning = false;

  async initialize(): Promise<boolean> {
    const status = await this.checkStatus();
    if (!status) {
      return false;
    }

    await this.startScanning();
    return true;
  }

  private async checkStatus(): Promise<boolean> {
    try {
      const { status } = await CapacitorNfc.getStatus();

      if (status === 'NO_NFC') {
        console.error('NFC not available');
        return false;
      }

      if (status === 'NFC_DISABLED') {
        const enable = confirm('Enable NFC in settings?');
        if (enable) {
          await CapacitorNfc.showSettings();
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('Status check failed:', error);
      return false;
    }
  }

  async startScanning() {
    if (this.isScanning) {
      console.log('Already scanning');
      return;
    }

    try {
      await CapacitorNfc.startScanning({
        invalidateAfterFirstRead: false,
        alertMessage: 'Ready to scan NFC tags',
      });

      this.listener = await CapacitorNfc.addListener('nfcEvent', (event) => {
        this.handleNfcEvent(event);
      });

      this.isScanning = true;
      console.log('NFC scanning started');
    } catch (error) {
      console.error('Failed to start scanning:', error);
      throw error;
    }
  }

  async stopScanning() {
    if (!this.isScanning) {
      return;
    }

    try {
      if (this.listener) {
        await this.listener.remove();
        this.listener = null;
      }

      await CapacitorNfc.stopScanning();
      this.isScanning = false;
      console.log('NFC scanning stopped');
    } catch (error) {
      console.error('Failed to stop scanning:', error);
    }
  }

  private handleNfcEvent(event: any) {
    console.log('NFC Event:', event.type);

    if (!event.tag) {
      console.log('No tag data');
      return;
    }

    console.log('Tag ID:', event.tag.id);
    console.log('Tag Type:', event.tag.type);

    if (event.tag.ndefMessage) {
      this.processNdefMessage(event.tag.ndefMessage);
    }
  }

  private processNdefMessage(records: any[]) {
    records.forEach((record, index) => {
      console.log(`Processing record ${index}`);

      if (record.tnf === 1) {
        // Text record
        if (record.type[0] === 0x54) {
          const text = this.decodeTextRecord(record);
          console.log('Text:', text);
        }

        // URI record
        if (record.type[0] === 0x55) {
          const uri = this.decodeUriRecord(record);
          console.log('URI:', uri);
        }
      }
    });
  }

  private decodeTextRecord(record: any): string {
    const langLen = record.payload[0] & 0x3f;
    return new TextDecoder().decode(
      new Uint8Array(record.payload.slice(langLen + 1))
    );
  }

  private decodeUriRecord(record: any): string {
    const prefixCode = record.payload[0];
    const uri = new TextDecoder().decode(
      new Uint8Array(record.payload.slice(1))
    );
    return this.getUriPrefix(prefixCode) + uri;
  }

  private getUriPrefix(code: number): string {
    const prefixes = ['', 'http://www.', 'https://www.', 'http://', 'https://'];
    return prefixes[code] || '';
  }

  async writeText(text: string) {
    const encoder = new TextEncoder();
    const langBytes = Array.from(encoder.encode('en'));
    const textBytes = Array.from(encoder.encode(text));
    const payload = [langBytes.length & 0x3f, ...langBytes, ...textBytes];

    try {
      await CapacitorNfc.write({
        allowFormat: true,
        records: [
          {
            tnf: 0x01,
            type: [0x54],
            id: [],
            payload,
          },
        ],
      });

      console.log('Text written successfully');
      return true;
    } catch (error) {
      console.error('Write failed:', error);
      return false;
    }
  }

  async writeUrl(url: string) {
    let uriCode = 0x00;
    let shortenedUrl = url;

    if (url.startsWith('https://www.')) {
      uriCode = 0x02;
      shortenedUrl = url.substring(12);
    } else if (url.startsWith('https://')) {
      uriCode = 0x04;
      shortenedUrl = url.substring(8);
    }

    const urlBytes = Array.from(new TextEncoder().encode(shortenedUrl));

    try {
      await CapacitorNfc.write({
        allowFormat: true,
        records: [
          {
            tnf: 0x01,
            type: [0x55],
            id: [],
            payload: [uriCode, ...urlBytes],
          },
        ],
      });

      console.log('URL written successfully');
      return true;
    } catch (error) {
      console.error('Write failed:', error);
      return false;
    }
  }

  async eraseTag() {
    try {
      await CapacitorNfc.erase();
      console.log('Tag erased');
      return true;
    } catch (error) {
      console.error('Erase failed:', error);
      return false;
    }
  }

  cleanup() {
    this.stopScanning();
  }
}
```

## Best Practices

1. **Always Check NFC Status**: Before starting operations, verify NFC is available and enabled

2. **Handle Errors Gracefully**: Wrap all NFC operations in try-catch blocks

3. **Stop Scanning When Done**: Always stop scanning to conserve battery

4. **Test on Real Devices**: NFC doesn't work on emulators/simulators

5. **User Feedback**: Provide clear feedback during NFC operations

6. **Platform Differences**: Be aware of iOS vs Android NFC capabilities

## Common Use Cases

### 1. Smart Business Cards

```typescript
async function writeBusinessCard(contact: {
  name: string;
  phone: string;
  email: string;
  website: string;
}) {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.website}
END:VCARD`;

  const vCardBytes = Array.from(new TextEncoder().encode(vCard));

  await CapacitorNfc.write({
    allowFormat: true,
    records: [
      {
        tnf: 0x02, // MIME type
        type: Array.from(new TextEncoder().encode('text/vcard')),
        id: [],
        payload: vCardBytes,
      },
    ],
  });
}
```

### 2. Product Information Tags

```typescript
async function writeProductInfo(product: {
  name: string;
  sku: string;
  price: number;
}) {
  const info = JSON.stringify(product);

  await nfcService.writeText(info);
}
```

### 3. Access Control

```typescript
async function checkAccessTag() {
  const listener = await CapacitorNfc.addListener('nfcEvent', async (event) => {
    if (event.tag?.id) {
      const tagId = event.tag.id.join('');
      const hasAccess = await verifyAccessTag(tagId);

      if (hasAccess) {
        unlockDoor();
      } else {
        denyAccess();
      }
    }
  });
}
```

## Troubleshooting

### NFC Not Working on iOS

- Ensure NFC capability is enabled in Xcode
- Check that `NFCReaderUsageDescription` is in Info.plist
- Verify device supports NFC (iPhone 7 and later)

### NFC Not Working on Android

- Confirm NFC permission is in AndroidManifest.xml
- Check that NFC is enabled in device settings
- Ensure device has NFC hardware

### Tags Not Detected

- Hold device steady near the tag
- Try different tag positions
- Verify tag is NDEF-formatted
- Check tag isn't damaged or demagnetized

## Conclusion

The `@capgo/capacitor-nfc` plugin provides comprehensive NFC support for your Capacitor apps. With support for reading, writing, and managing NFC tags on both iOS and Android, you can build powerful contactless experiences.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/nfc/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-nfc).
