---
locale: en
---
# Using @capgo/capacitor-zip Package

The `@capgo/capacitor-zip` package provides functionality for zipping and unzipping files on iOS, Android, and Web platforms. In this tutorial, we'll guide you through installing and using this package in your Capacitor app.

## Installation

To install the `@capgo/capacitor-zip` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-zip
npx cap sync
```

## API

The `@capgo/capacitor-zip` package provides the following API methods:

### zip(options)

This method creates a ZIP archive from a source folder.

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';

async function zipFolder() {
  const options = {
    source: 'file:///path/to/source/folder',
    destination: 'file:///path/to/output/archive.zip'
  };

  try {
    await CapacitorZip.zip(options);
    console.log('Folder zipped successfully!');
  } catch (error) {
    console.error('Zip failed:', error);
  }
}
```

**Options:**
- `source` (string, required): Path to the folder to compress
- `destination` (string, required): Path for the output ZIP file

### unzip(options)

This method extracts files from a ZIP archive.

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';

async function unzipArchive() {
  const options = {
    source: 'file:///path/to/archive.zip',
    destination: 'file:///path/to/output/folder'
  };

  try {
    await CapacitorZip.unzip(options);
    console.log('Archive extracted successfully!');
  } catch (error) {
    console.error('Unzip failed:', error);
  }
}
```

**Options:**
- `source` (string, required): Path to the ZIP file
- `destination` (string, required): Path to extract files to

## Complete Examples

### Creating a Backup

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';
import { Filesystem, Directory } from '@capacitor/filesystem';

async function createBackup() {
  try {
    const timestamp = Date.now();
    const sourceDir = `${Directory.Data}/userdata`;
    const backupName = `backup_${timestamp}.zip`;
    const destPath = `${Directory.Documents}/${backupName}`;

    await CapacitorZip.zip({
      source: sourceDir,
      destination: destPath
    });

    console.log('Backup created:', backupName);
    return destPath;
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw error;
  }
}
```

### Restoring from Backup

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';
import { Filesystem, Directory } from '@capacitor/filesystem';

async function restoreBackup(backupPath) {
  try {
    const restoreDir = `${Directory.Data}/userdata`;

    // Remove existing data
    await Filesystem.rmdir({
      path: 'userdata',
      directory: Directory.Data,
      recursive: true
    });

    // Extract backup
    await CapacitorZip.unzip({
      source: backupPath,
      destination: restoreDir
    });

    console.log('Backup restored successfully');
    return true;
  } catch (error) {
    console.error('Restore failed:', error);
    throw error;
  }
}
```

### Compressing Multiple Files

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';
import { Filesystem, Directory } from '@capacitor/filesystem';

async function compressFiles(filePaths, outputPath) {
  try {
    // Create temporary directory
    const tempDir = `temp_zip_${Date.now()}`;

    await Filesystem.mkdir({
      path: tempDir,
      directory: Directory.Cache,
      recursive: true
    });

    // Copy files to temp directory
    for (let i = 0; i < filePaths.length; i++) {
      const fileName = filePaths[i].split('/').pop();
      const destPath = `${tempDir}/${fileName}`;

      await Filesystem.copy({
        from: filePaths[i],
        to: destPath,
        directory: Directory.Cache
      });
    }

    // Zip the temp directory
    const tempDirPath = `${Directory.Cache}/${tempDir}`;
    await CapacitorZip.zip({
      source: tempDirPath,
      destination: outputPath
    });

    // Clean up temp directory
    await Filesystem.rmdir({
      path: tempDir,
      directory: Directory.Cache,
      recursive: true
    });

    console.log('Files compressed to:', outputPath);
    return outputPath;
  } catch (error) {
    console.error('Compression failed:', error);
    throw error;
  }
}

// Usage
const files = [
  'file:///path/to/file1.txt',
  'file:///path/to/file2.jpg',
  'file:///path/to/file3.pdf'
];

await compressFiles(files, 'file:///path/to/archive.zip');
```

### Extracting Specific Files

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';
import { Filesystem, Directory } from '@capacitor/filesystem';

async function extractSpecificFiles(zipPath, fileNames) {
  try {
    // Extract to temp location
    const tempDir = `temp_extract_${Date.now()}`;
    const tempDirPath = `${Directory.Cache}/${tempDir}`;

    await CapacitorZip.unzip({
      source: zipPath,
      destination: tempDirPath
    });

    // Read only specific files
    const extractedFiles = {};

    for (const fileName of fileNames) {
      const filePath = `${tempDir}/${fileName}`;

      try {
        const content = await Filesystem.readFile({
          path: filePath,
          directory: Directory.Cache
        });

        extractedFiles[fileName] = content.data;
      } catch (error) {
        console.warn(`File ${fileName} not found in archive`);
      }
    }

    // Clean up temp directory
    await Filesystem.rmdir({
      path: tempDir,
      directory: Directory.Cache,
      recursive: true
    });

    return extractedFiles;
  } catch (error) {
    console.error('Extraction failed:', error);
    throw error;
  }
}

// Usage
const files = await extractSpecificFiles(
  'file:///path/to/archive.zip',
  ['config.json', 'data.txt']
);
```

### Zip Service Class

Here's a complete service class for managing zip operations:

```javascript
import { CapacitorZip } from '@capgo/capacitor-zip';
import { Filesystem, Directory } from '@capacitor/filesystem';

export class ZipService {
  async createArchive(sourceDir, archiveName) {
    const destPath = `${Directory.Documents}/${archiveName}`;

    await CapacitorZip.zip({
      source: sourceDir,
      destination: destPath
    });

    return destPath;
  }

  async extractArchive(archivePath, destDir) {
    await CapacitorZip.unzip({
      source: archivePath,
      destination: destDir
    });

    return destDir;
  }

  async validateArchive(zipPath) {
    try {
      const tempDir = `validate_${Date.now()}`;
      const tempDirPath = `${Directory.Cache}/${tempDir}`;

      // Try to extract
      await CapacitorZip.unzip({
        source: zipPath,
        destination: tempDirPath
      });

      // Clean up
      await Filesystem.rmdir({
        path: tempDir,
        directory: Directory.Cache,
        recursive: true
      });

      return true;
    } catch (error) {
      console.error('Archive validation failed:', error);
      return false;
    }
  }

  async batchZip(folders) {
    const results = [];

    for (const folder of folders) {
      const folderName = folder.split('/').pop();
      const zipName = `${folderName}_${Date.now()}.zip`;
      const zipPath = `${Directory.Documents}/${zipName}`;

      try {
        await CapacitorZip.zip({
          source: folder,
          destination: zipPath
        });

        results.push({
          folder,
          zipPath,
          success: true
        });
      } catch (error) {
        results.push({
          folder,
          error: error.message,
          success: false
        });
      }
    }

    return results;
  }

  async getArchiveSize(zipPath) {
    try {
      const stat = await Filesystem.stat({
        path: zipPath
      });

      return stat.size;
    } catch (error) {
      console.error('Failed to get archive size:', error);
      return 0;
    }
  }
}

// Usage
const zipService = new ZipService();

// Create archive
const archivePath = await zipService.createArchive(
  'file:///path/to/folder',
  'myarchive.zip'
);

// Extract archive
await zipService.extractArchive(
  archivePath,
  'file:///path/to/output'
);

// Validate archive
const isValid = await zipService.validateArchive(archivePath);

// Batch zip
const results = await zipService.batchZip([
  'file:///path/to/folder1',
  'file:///path/to/folder2'
]);
```

## Best Practices

1. **Path Validation**: Always ensure source and destination paths exist and are valid
2. **Error Handling**: Wrap all zip/unzip operations in try-catch blocks
3. **Cleanup**: Remove temporary files and folders after operations
4. **Large Files**: Be cautious with large archives - monitor available storage
5. **Permissions**: Ensure your app has necessary file system permissions
6. **Progress Feedback**: Show loading indicators for long-running operations

## Troubleshooting

### Zip operation fails
- Ensure source path exists and is a directory
- Check that you have write permissions for destination
- Verify there's enough disk space available

### Unzip operation fails
- Confirm the ZIP file is valid and not corrupted
- Check destination path is writable
- Ensure enough disk space for extracted files

### Out of storage errors
- Check available disk space before operations
- Clean up temporary files regularly
- Consider compressing in smaller batches

### Permission errors
- Verify file system permissions in app configuration
- Check that paths are within allowed directories
- Ensure app has storage permissions on Android

## Conclusion

The `@capgo/capacitor-zip` package provides a simple and effective way to handle file compression and extraction in your Capacitor app. Whether you're creating backups, compressing files for upload, or extracting downloaded archives, this plugin makes it easy to work with ZIP files across all platforms.
