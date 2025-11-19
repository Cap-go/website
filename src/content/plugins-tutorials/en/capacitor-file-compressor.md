---
locale: en
---
# Using @capgo/capacitor-file-compressor Package

The `@capgo/capacitor-file-compressor` package provides efficient image compression supporting PNG, JPEG, and WebP formats across iOS, Android, and Web platforms. In this tutorial, we'll guide you through installing and using this package in your Capacitor app.

## Installation

To install the `@capgo/capacitor-file-compressor` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-file-compressor
npx cap sync
```

## Platform Support

| Platform | Supported Formats | Notes |
|----------|-------------------|-------|
| iOS | JPEG | Only JPEG compression supported |
| Android | JPEG, WebP | Both formats fully supported |
| Web | JPEG, WebP | Canvas API-based compression |

Note: EXIF metadata is removed during compression on all platforms.

## API

The `@capgo/capacitor-file-compressor` package provides the following API methods:

### compressImage(options)

This method compresses an image file with specified dimensions and quality settings.

```javascript
import { FileCompressor } from '@capgo/capacitor-file-compressor';

async function compressImage() {
  const options = {
    source: 'file:///path/to/image.jpg',
    quality: 0.8,
    width: 1920,
    height: 1080,
    format: 'jpeg'
  };

  try {
    const result = await FileCompressor.compressImage(options);
    console.log('Compressed image path:', result.path);
    console.log('Original size:', result.originalSize);
    console.log('Compressed size:', result.size);
    console.log('Compression ratio:', ((1 - result.size / result.originalSize) * 100).toFixed(1) + '%');
  } catch (error) {
    console.error('Compression failed:', error);
  }
}
```

**Options:**
- `source` (string, required): Path to the image file
- `quality` (number, optional): Compression quality from 0.0 to 1.0 (default: 0.8)
- `width` (number, optional): Target width in pixels
- `height` (number, optional): Target height in pixels
- `format` (string, optional): Output format - 'jpeg' or '.webp'

**Result:**
- `path` (string): Path to the compressed image
- `size` (number): Compressed file size in bytes
- `originalSize` (number): Original file size in bytes

### getPluginVersion()

This method returns the version of the native plugin implementation.

```javascript
import { FileCompressor } from '@capgo/capacitor-file-compressor';

async function getVersion() {
  const { version } = await FileCompressor.getPluginVersion();
  console.log('Plugin version:', version);
}
```

## Complete Example

Here's a complete example demonstrating how to use the plugin with the Camera API:

```javascript
import { FileCompressor } from '@capgo/capacitor-file-compressor';
import { Camera, CameraResultType } from '@capacitor/camera';

async function captureAndCompressImage() {
  try {
    // Take a photo
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (!photo.path) {
      throw new Error('No image path');
    }

    // Compress the photo
    const compressed = await FileCompressor.compressImage({
      source: photo.path,
      quality: 0.7,
      width: 1920,
      height: 1080,
      format: 'jpeg'
    });

    console.log('Compression successful!');
    console.log('Original size:', compressed.originalSize, 'bytes');
    console.log('Compressed size:', compressed.size, 'bytes');
    console.log('Saved:', compressed.originalSize - compressed.size, 'bytes');

    return compressed.path;
  } catch (error) {
    console.error('Failed to capture and compress image:', error);
    throw error;
  }
}
```

## Best Practices

1. **Quality Settings**: Start with 0.8 quality for a good balance between file size and image quality
2. **Aspect Ratio**: If you specify only width or height, the aspect ratio is automatically preserved
3. **Format Selection**: Use JPEG for photos and WebP for better compression on supported platforms
4. **Error Handling**: Always wrap compression calls in try-catch blocks
5. **Memory Management**: Be cautious when compressing very large images on mobile devices

## Troubleshooting

### Image not compressing
- Ensure the source path is valid and accessible
- Check that the file exists and is a valid image format

### Out of memory errors
- Reduce the target width and height
- Compress images one at a time instead of batch processing
- Lower the quality setting

### Format not supported
- Check the platform support table
- Use JPEG for maximum compatibility across all platforms

## Conclusion

The `@capgo/capacitor-file-compressor` package provides a simple and efficient way to compress images in your Capacitor app. With support for multiple formats and customizable compression settings, it's perfect for optimizing image uploads, reducing storage, and improving app performance.
