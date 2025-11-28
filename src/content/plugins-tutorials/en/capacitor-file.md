---
locale: en
---
# Using @capgo/capacitor-file Package

The `@capgo/capacitor-file` package provides comprehensive file system operations for your Capacitor apps, including reading, writing, copying, moving, and managing files and directories. In this tutorial, we will guide you through the process of installing and using this package.

## Installation

To install the `@capgo/capacitor-file` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-file
npx cap sync
```

## Setup

The plugin works out of the box on iOS and Android. No additional setup is required for basic file operations within the app's sandbox.

### Android Permissions (Optional)

For accessing external storage on older Android versions, you may need to add permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## API

The `@capgo/capacitor-file` package provides the following API methods:

### writeFile(options)

Write content to a file.

```javascript
import { CapacitorFile, Directory, Encoding } from '@capgo/capacitor-file';

async function writeTextFile() {
  const result = await CapacitorFile.writeFile({
    path: 'my-document.txt',
    directory: Directory.Documents,
    data: 'Hello, World!',
    encoding: Encoding.UTF8,
    recursive: true, // Create parent directories if needed
  });
  console.log('File saved to:', result.uri);
}
```

### readFile(options)

Read content from a file.

```javascript
import { CapacitorFile, Directory, Encoding } from '@capgo/capacitor-file';

async function readTextFile() {
  const result = await CapacitorFile.readFile({
    path: 'my-document.txt',
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  console.log('File contents:', result.data);
}
```

### appendFile(options)

Append content to an existing file.

```javascript
import { CapacitorFile, Directory, Encoding } from '@capgo/capacitor-file';

async function appendToFile() {
  await CapacitorFile.appendFile({
    path: 'log.txt',
    directory: Directory.Documents,
    data: '\nNew log entry',
    encoding: Encoding.UTF8,
  });
}
```

### exists(options)

Check if a file or directory exists.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function checkFileExists() {
  const result = await CapacitorFile.exists({
    path: 'my-document.txt',
    directory: Directory.Documents,
  });
  console.log('File exists:', result.exists);
  console.log('Type:', result.type); // 'file' or 'directory'
}
```

### stat(options)

Get metadata about a file or directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function getFileInfo() {
  const result = await CapacitorFile.stat({
    path: 'my-document.txt',
    directory: Directory.Documents,
  });
  console.log('Size:', result.size, 'bytes');
  console.log('Modified:', new Date(result.mtime));
  console.log('Type:', result.type);
}
```

### deleteFile(options)

Delete a file.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function removeFile() {
  await CapacitorFile.deleteFile({
    path: 'old-file.txt',
    directory: Directory.Documents,
  });
}
```

### mkdir(options)

Create a directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function createDirectory() {
  await CapacitorFile.mkdir({
    path: 'my-folder/subfolder',
    directory: Directory.Documents,
    recursive: true, // Create parent directories
  });
}
```

### readdir(options)

List contents of a directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function listDirectory() {
  const result = await CapacitorFile.readdir({
    path: 'my-folder',
    directory: Directory.Documents,
  });

  result.entries.forEach(entry => {
    console.log(`${entry.name} - ${entry.isFile ? 'File' : 'Directory'}`);
  });
}
```

### rmdir(options)

Delete a directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function removeDirectory() {
  await CapacitorFile.rmdir({
    path: 'my-folder',
    directory: Directory.Documents,
    recursive: true, // Delete contents too
  });
}
```

### copy(options)

Copy a file or directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function copyFile() {
  const result = await CapacitorFile.copy({
    from: 'original.txt',
    to: 'backup/copy.txt',
    directory: Directory.Documents,
    toDirectory: Directory.Documents,
  });
  console.log('Copied to:', result.uri);
}
```

### rename(options) / move(options)

Rename or move a file or directory.

```javascript
import { CapacitorFile, Directory } from '@capgo/capacitor-file';

async function renameFile() {
  await CapacitorFile.rename({
    from: 'old-name.txt',
    to: 'new-name.txt',
    directory: Directory.Documents,
  });
}
```

### getDirectories()

Get all available directory paths.

```javascript
import { CapacitorFile } from '@capgo/capacitor-file';

async function getAvailableDirectories() {
  const dirs = await CapacitorFile.getDirectories();
  console.log('Documents:', dirs.documentsDirectory);
  console.log('Cache:', dirs.cacheDirectory);
  console.log('Data:', dirs.dataDirectory);
}
```

### getFreeDiskSpace()

Get available disk space.

```javascript
import { CapacitorFile } from '@capgo/capacitor-file';

async function checkDiskSpace() {
  const result = await CapacitorFile.getFreeDiskSpace();
  const freeGB = (result.free / 1024 / 1024 / 1024).toFixed(2);
  console.log('Free space:', freeGB, 'GB');
}
```

## Directory Constants

The plugin provides several directory locations:

```javascript
import { Directory } from '@capgo/capacitor-file';

// User-visible documents (backed up on iOS)
Directory.Documents

// Private app data storage
Directory.Data

// App support files
Directory.Library

// Temporary cache (may be cleared by OS)
Directory.Cache

// External storage (Android only)
Directory.External

// Read-only application bundle
Directory.Application
```

## Encoding Options

```javascript
import { Encoding } from '@capgo/capacitor-file';

Encoding.UTF8   // UTF-8 text
Encoding.ASCII  // ASCII text
Encoding.UTF16  // UTF-16 text
// Omit encoding for binary data (base64)
```

## Complete Example

Here's a complete example showing common file operations:

```javascript
import { CapacitorFile, Directory, Encoding } from '@capgo/capacitor-file';

class FileManager {
  async saveUserData(data) {
    await CapacitorFile.writeFile({
      path: 'user-data.json',
      directory: Directory.Documents,
      data: JSON.stringify(data),
      encoding: Encoding.UTF8,
    });
  }

  async loadUserData() {
    try {
      const { exists } = await CapacitorFile.exists({
        path: 'user-data.json',
        directory: Directory.Documents,
      });

      if (!exists) return null;

      const result = await CapacitorFile.readFile({
        path: 'user-data.json',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      return JSON.parse(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await CapacitorFile.copy({
      from: 'user-data.json',
      to: `backups/${timestamp}.json`,
      directory: Directory.Documents,
      toDirectory: Directory.Documents,
    });
  }

  async listBackups() {
    const { entries } = await CapacitorFile.readdir({
      path: 'backups',
      directory: Directory.Documents,
    });
    return entries.filter(e => e.isFile).map(e => e.name);
  }
}

// Usage
const fileManager = new FileManager();
await fileManager.saveUserData({ name: 'John', score: 100 });
const data = await fileManager.loadUserData();
console.log('Loaded:', data);
```

That's it! You have successfully learned how to use the `@capgo/capacitor-file` package in your Ionic Capacitor app to perform file system operations.
