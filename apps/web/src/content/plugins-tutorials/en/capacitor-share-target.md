---
locale: en
---

# Using @capgo/capacitor-share-target Package

The `@capgo/capacitor-share-target` package enables your Capacitor app to receive shared content from other applications. This makes your app appear in the system share sheet, allowing users to share text, URLs, images, videos, and files directly to your app. This tutorial will guide you through installation, configuration, and practical implementation.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-share-target
npx cap sync
```

## Platform Requirements

### Android
- Android 5.0 (API 21) or higher
- Intent filters configured in AndroidManifest.xml

### iOS
- iOS 12.0 or higher
- Share Extension target created in Xcode

### Web
Not supported - requires native platform integration.

## Android Configuration

To make your app appear in Android's share menu, you need to add intent filters to your `AndroidManifest.xml` file inside the main `<activity>` tag.

### Basic Text Sharing

```xml
<intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="text/plain" />
</intent-filter>
```

### Image Sharing

```xml
<!-- Single image -->
<intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="image/*" />
</intent-filter>

<!-- Multiple images -->
<intent-filter>
    <action android:name="android.intent.action.SEND_MULTIPLE" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="image/*" />
</intent-filter>
```

### Video Sharing

```xml
<intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="video/*" />
</intent-filter>
```

### All Content Types

```xml
<!-- Accept any type of content -->
<intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="*/*" />
</intent-filter>

<!-- Accept multiple files of any type -->
<intent-filter>
    <action android:name="android.intent.action.SEND_MULTIPLE" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="*/*" />
</intent-filter>
```

### Complete AndroidManifest.xml Example

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <activity
            android:name=".MainActivity"
            android:exported="true">

            <!-- Main launcher intent -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Share target intents -->
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="text/*" />
            </intent-filter>

            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="image/*" />
            </intent-filter>

            <intent-filter>
                <action android:name="android.intent.action.SEND_MULTIPLE" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="*/*" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## iOS Configuration

iOS requires creating a Share Extension to receive shared content. This is more complex than Android but provides a native iOS sharing experience.

### Step 1: Create Share Extension in Xcode

1. Open your iOS project in Xcode
2. Go to **File > New > Target**
3. Select **Share Extension** template
4. Click **Next**
5. Name it (e.g., "ShareExtension")
6. Choose Swift as the language
7. Click **Finish**
8. When prompted, **Activate the scheme**

### Step 2: Configure App Groups

Both your main app and Share Extension need to communicate via a shared container.

1. Select your **main app target**
2. Go to **Signing & Capabilities**
3. Click **+ Capability**
4. Add **App Groups**
5. Click **+** to create a new group: `group.com.yourcompany.yourapp`
6. Repeat steps 1-5 for your **Share Extension target**

### Step 3: Update Share Extension Code

Replace the content of `ShareViewController.swift` in your Share Extension:

```swift
import UIKit
import Social
import MobileCoreServices

class ShareViewController: UIViewController {

    private let appGroupIdentifier = "group.com.yourcompany.yourapp"

    override func viewDidLoad() {
        super.viewDidLoad()
        handleSharedContent()
    }

    private func handleSharedContent() {
        guard let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem else {
            closeExtension()
            return
        }

        var sharedData: [String: Any] = [:]

        if let attachments = extensionItem.attachments {
            processAttachments(attachments) { data in
                sharedData = data
                self.saveToUserDefaults(data: sharedData)
                self.closeExtension()
            }
        } else {
            closeExtension()
        }
    }

    private func processAttachments(_ attachments: [NSItemProvider], completion: @escaping ([String: Any]) -> Void) {
        var result: [String: Any] = [:]
        var processedCount = 0

        for attachment in attachments {
            if attachment.hasItemConformingToTypeIdentifier(kUTTypeURL as String) {
                attachment.loadItem(forTypeIdentifier: kUTTypeURL as String, options: nil) { (data, error) in
                    if let url = data as? URL {
                        result["url"] = url.absoluteString
                    }
                    processedCount += 1
                    if processedCount == attachments.count {
                        completion(result)
                    }
                }
            } else if attachment.hasItemConformingToTypeIdentifier(kUTTypeText as String) {
                attachment.loadItem(forTypeIdentifier: kUTTypeText as String, options: nil) { (data, error) in
                    if let text = data as? String {
                        result["text"] = text
                    }
                    processedCount += 1
                    if processedCount == attachments.count {
                        completion(result)
                    }
                }
            } else if attachment.hasItemConformingToTypeIdentifier(kUTTypeImage as String) {
                attachment.loadItem(forTypeIdentifier: kUTTypeImage as String, options: nil) { (data, error) in
                    // Handle image
                    processedCount += 1
                    if processedCount == attachments.count {
                        completion(result)
                    }
                }
            }
        }
    }

    private func saveToUserDefaults(data: [String: Any]) {
        if let userDefaults = UserDefaults(suiteName: appGroupIdentifier) {
            userDefaults.set(data, forKey: "SharedData")
            userDefaults.synchronize()
        }
    }

    private func closeExtension() {
        extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
}
```

### Step 4: Update Info.plist for Share Extension

In your Share Extension's `Info.plist`, configure accepted content types:

```xml
<key>NSExtension</key>
<dict>
    <key>NSExtensionAttributes</key>
    <dict>
        <key>NSExtensionActivationRule</key>
        <dict>
            <key>NSExtensionActivationSupportsImageWithMaxCount</key>
            <integer>10</integer>
            <key>NSExtensionActivationSupportsMovieWithMaxCount</key>
            <integer>10</integer>
            <key>NSExtensionActivationSupportsText</key>
            <true/>
            <key>NSExtensionActivationSupportsWebURLWithMaxCount</key>
            <integer>1</integer>
        </dict>
    </dict>
    <key>NSExtensionMainStoryboard</key>
    <string>MainInterface</string>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.share-services</string>
</dict>
```

## Basic Usage

### Import the Plugin

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';
```

### Listen for Shared Content

```typescript
function setupShareListener() {
  CapacitorShareTarget.addListener('shareReceived', (event) => {
    console.log('=== Shared Content Received ===');

    if (event.title) {
      console.log('Title:', event.title);
    }

    if (event.texts && event.texts.length > 0) {
      console.log('Texts:', event.texts);
    }

    if (event.files && event.files.length > 0) {
      console.log('Files:', event.files);
    }
  });
}

// Initialize on app start
setupShareListener();
```

## Complete Share Target Service

Here's a production-ready service for handling shared content:

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

export interface SharedFile {
  name: string;
  mimeType: string;
  uri: string;
  size?: number;
}

export interface SharedContent {
  title?: string;
  texts?: string[];
  files?: SharedFile[];
  timestamp: number;
}

export class ShareTargetService {
  private listener: any;
  private shareHandlers: Map<string, (content: SharedContent) => void> = new Map();

  initialize() {
    this.listener = CapacitorShareTarget.addListener('shareReceived', (event) => {
      this.handleShareReceived(event);
    });

    console.log('ShareTarget service initialized');
  }

  private handleShareReceived(event: any) {
    const content: SharedContent = {
      title: event.title,
      texts: event.texts,
      files: event.files,
      timestamp: Date.now()
    };

    console.log('Share received:', content);

    // Notify all registered handlers
    this.shareHandlers.forEach((handler) => {
      handler(content);
    });

    // Process based on content type
    if (content.texts && content.texts.length > 0) {
      this.handleSharedText(content.texts);
    }

    if (content.files && content.files.length > 0) {
      this.handleSharedFiles(content.files);
    }
  }

  private handleSharedText(texts: string[]) {
    texts.forEach((text) => {
      if (this.isURL(text)) {
        console.log('URL shared:', text);
        this.handleURL(text);
      } else {
        console.log('Text shared:', text);
        this.handlePlainText(text);
      }
    });
  }

  private handleSharedFiles(files: SharedFile[]) {
    files.forEach((file) => {
      console.log('File shared:', file.name, file.mimeType);

      const fileType = file.mimeType.split('/')[0];

      switch (fileType) {
        case 'image':
          this.handleImage(file);
          break;
        case 'video':
          this.handleVideo(file);
          break;
        case 'audio':
          this.handleAudio(file);
          break;
        default:
          this.handleGenericFile(file);
      }
    });
  }

  private isURL(text: string): boolean {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  private handleURL(url: string) {
    console.log('Processing URL:', url);
    // Implementation: Save bookmark, open in app, etc.
  }

  private handlePlainText(text: string) {
    console.log('Processing text:', text.substring(0, 50));
    // Implementation: Create note, save to clipboard, etc.
  }

  private handleImage(file: SharedFile) {
    console.log('Processing image:', file.name);
    // Implementation: Save to gallery, upload, etc.
  }

  private handleVideo(file: SharedFile) {
    console.log('Processing video:', file.name);
    // Implementation: Save to library, process, etc.
  }

  private handleAudio(file: SharedFile) {
    console.log('Processing audio:', file.name);
    // Implementation: Add to playlist, transcribe, etc.
  }

  private handleGenericFile(file: SharedFile) {
    console.log('Processing file:', file.name);
    // Implementation: Save to documents, upload, etc.
  }

  registerShareHandler(key: string, handler: (content: SharedContent) => void) {
    this.shareHandlers.set(key, handler);
  }

  unregisterShareHandler(key: string) {
    this.shareHandlers.delete(key);
  }

  cleanup() {
    if (this.listener) {
      this.listener.remove();
    }
    this.shareHandlers.clear();
  }
}
```

## Application Examples

### Bookmark Manager App

```typescript
class BookmarkApp {
  private shareService: ShareTargetService;

  constructor() {
    this.shareService = new ShareTargetService();
  }

  initialize() {
    this.shareService.initialize();

    this.shareService.registerShareHandler('bookmarks', (content) => {
      if (content.texts) {
        content.texts.forEach(text => {
          if (this.isURL(text)) {
            this.saveBookmark(text, content.title);
          }
        });
      }
    });
  }

  private isURL(text: string): boolean {
    return text.startsWith('http://') || text.startsWith('https://');
  }

  private async saveBookmark(url: string, title?: string) {
    console.log('Saving bookmark:', url);

    const bookmark = {
      url: url,
      title: title || await this.fetchPageTitle(url),
      timestamp: Date.now()
    };

    // Save to database
    await this.saveToDatabase(bookmark);

    // Show notification
    this.showNotification(`Bookmark saved: ${bookmark.title}`);
  }

  private async fetchPageTitle(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const match = html.match(/<title>(.*?)<\/title>/i);
      return match ? match[1] : url;
    } catch {
      return url;
    }
  }

  private async saveToDatabase(bookmark: any) {
    // Database implementation
    console.log('Saved:', bookmark);
  }

  private showNotification(message: string) {
    console.log('Notification:', message);
    // Show toast or notification
  }
}

// Usage
const app = new BookmarkApp();
app.initialize();
```

### Photo Gallery App

```typescript
class PhotoGalleryApp {
  private shareService: ShareTargetService;

  constructor() {
    this.shareService = new ShareTargetService();
  }

  initialize() {
    this.shareService.initialize();

    this.shareService.registerShareHandler('gallery', async (content) => {
      if (content.files) {
        const images = content.files.filter(f =>
          f.mimeType.startsWith('image/')
        );

        if (images.length > 0) {
          await this.importImages(images);
        }
      }
    });
  }

  private async importImages(images: SharedFile[]) {
    console.log(`Importing ${images.length} image(s)`);

    for (const image of images) {
      try {
        await this.processImage(image);
      } catch (error) {
        console.error('Failed to process image:', error);
      }
    }

    this.showNotification(`Imported ${images.length} image(s)`);
  }

  private async processImage(image: SharedFile) {
    // Read file
    const response = await fetch(image.uri);
    const blob = await response.blob();

    // Generate thumbnail
    const thumbnail = await this.generateThumbnail(blob);

    // Save to gallery
    await this.saveToGallery({
      original: blob,
      thumbnail: thumbnail,
      name: image.name,
      mimeType: image.mimeType,
      timestamp: Date.now()
    });

    console.log('Image processed:', image.name);
  }

  private async generateThumbnail(blob: Blob): Promise<Blob> {
    // Thumbnail generation logic
    return blob; // Simplified
  }

  private async saveToGallery(imageData: any) {
    // Save implementation
    console.log('Saved to gallery:', imageData.name);
  }

  private showNotification(message: string) {
    console.log('Notification:', message);
  }
}

// Usage
const galleryApp = new PhotoGalleryApp();
galleryApp.initialize();
```

### Note-Taking App

```typescript
class NotesApp {
  private shareService: ShareTargetService;

  constructor() {
    this.shareService = new ShareTargetService();
  }

  initialize() {
    this.shareService.initialize();

    this.shareService.registerShareHandler('notes', async (content) => {
      await this.createNoteFromShare(content);
    });
  }

  private async createNoteFromShare(content: SharedContent) {
    let noteContent = '';
    let attachments: SharedFile[] = [];

    // Add title
    if (content.title) {
      noteContent += `# ${content.title}\n\n`;
    }

    // Add text content
    if (content.texts && content.texts.length > 0) {
      noteContent += content.texts.join('\n\n');
    }

    // Add file attachments
    if (content.files && content.files.length > 0) {
      attachments = content.files;
      noteContent += '\n\n## Attachments\n';
      content.files.forEach(file => {
        noteContent += `- ${file.name}\n`;
      });
    }

    // Create note
    const note = {
      title: content.title || 'Shared Note',
      content: noteContent,
      attachments: attachments,
      createdAt: new Date().toISOString(),
      tags: ['shared']
    };

    await this.saveNote(note);
    this.showNotification('Note created from shared content');
  }

  private async saveNote(note: any) {
    console.log('Note saved:', note.title);
    // Database implementation
  }

  private showNotification(message: string) {
    console.log('Notification:', message);
  }
}

// Usage
const notesApp = new NotesApp();
notesApp.initialize();
```

## Framework Integration

### React Integration

```typescript
import { useEffect } from 'react';
import { ShareTargetService, SharedContent } from './ShareTargetService';

function useShareTarget(onShareReceived: (content: SharedContent) => void) {
  useEffect(() => {
    const service = new ShareTargetService();
    service.initialize();
    service.registerShareHandler('react-app', onShareReceived);

    return () => {
      service.cleanup();
    };
  }, [onShareReceived]);
}

// Usage in component
function App() {
  useShareTarget((content) => {
    console.log('Share received in React:', content);
    // Handle shared content
  });

  return <div>My App</div>;
}
```

### Vue 3 Integration

```typescript
import { onMounted, onUnmounted } from 'vue';
import { ShareTargetService, SharedContent } from './ShareTargetService';

export function useShareTarget(onShareReceived: (content: SharedContent) => void) {
  let service: ShareTargetService;

  onMounted(() => {
    service = new ShareTargetService();
    service.initialize();
    service.registerShareHandler('vue-app', onShareReceived);
  });

  onUnmounted(() => {
    if (service) {
      service.cleanup();
    }
  });
}

// Usage in component
export default {
  setup() {
    useShareTarget((content) => {
      console.log('Share received in Vue:', content);
      // Handle shared content
    });
  }
};
```

## Best Practices

1. **Initialize Early**: Set up share listener as soon as your app starts
2. **Validate Content**: Always check content types before processing
3. **Handle Errors**: File URIs might be invalid or inaccessible
4. **Provide Feedback**: Show users what was received
5. **Test Thoroughly**: Test with different apps and content types
6. **Respect Privacy**: Don't access shared content without user action
7. **Clean Up**: Remove listeners when not needed

## Troubleshooting

### Android: App Not Appearing in Share Menu

- Verify intent filters are in the correct `<activity>` tag
- Ensure `android:exported="true"` is set
- Check MIME type matches what you're sharing
- Reinstall the app after manifest changes

### iOS: Share Extension Not Working

- Verify App Group ID is identical in both targets
- Check that Share Extension is activated
- Ensure Info.plist has correct activation rules
- Test on a real device (simulators may have limitations)

### Files Not Accessible

```typescript
async function safelyAccessFile(file: SharedFile) {
  try {
    const response = await fetch(file.uri);
    if (!response.ok) {
      throw new Error('File not accessible');
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Failed to access file:', error);
    alert('Unable to access shared file');
    return null;
  }
}
```

## Conclusion

The `@capgo/capacitor-share-target` plugin provides powerful share target capabilities for your Capacitor app. By properly configuring platform-specific settings and implementing event listeners, you can create seamless sharing experiences that integrate naturally with the device's native sharing functionality.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/share-target/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-share-target).
