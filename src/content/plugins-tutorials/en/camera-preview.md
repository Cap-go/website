# @capgo/camera-preview Package Tutorial

In this tutorial, we will walk through the steps to use the `@capgo/camera-preview` package in your Capacitor project. This package allows you to interact with the camera from your JavaScript and HTML code.

## Installation

To install the `@capgo/camera-preview` package, open your terminal and run one of the following commands:

```bash
yarn add @capgo/camera-preview
```

or

```bash
npm install @capgo/camera-preview
```

After the installation is complete, run the following command to sync your Capacitor project:

```bash
npx cap sync
```

### Extra Android Installation Steps

If you are using Android, you need to make some additional changes to your project. Open the `android/app/src/main/AndroidManifest.xml` file and add the following line above the closing `</application>` tag to request the CAMERA permission:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

For more help, refer to the [Capacitor documentation](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifestxml/).

### Extra iOS Installation Steps

If you are using iOS, you need to add two permissions to your `Info.plist` file. Follow the [Capacitor documentation](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist) and add the `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` permissions. The `NSMicrophoneUsageDescription` permission is only required if you will be using audio. If you don't need audio, you can set the `disableAudio` option to `true` to disable the microphone permission request.

### Extra Web Installation Steps

If you are using the web platform with Ionic, add the following line to your entry script in `app.module.ts`:

```typescript
import '@capgo/camera-preview';
```

This will allow Capacitor to register the web platform from the plugin.

## API

The `@capgo/camera-preview` package provides the following API methods:

### start(options: CameraPreviewOptions)

Starts the camera preview instance.

### stop()

Stops the camera preview instance.

### capture(options: CameraPreviewPictureOptions)

Captures a picture from the camera.

### captureSample(options: CameraSampleOptions)

Captures a sample image.

### getSupportedFlashModes()

Gets the supported flash modes.

### getHorizontalFov()

Gets the horizontal field of view.

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Sets the flash mode.

### flip()

Flips the camera.

### setOpacity(options: CameraOpacityOptions)

Sets the camera opacity.

### stopRecordVideo()

Stops recording a video.

### startRecordVideo(options: CameraPreviewOptions)

Starts recording a video.

For more details on the parameters and return values of these methods, refer to the `@capgo/camera-preview` package documentation.

## Conclusion

In this tutorial, we learned how to install and use the `@capgo/camera-preview` package in a Capacitor project. We explored the available API methods and their usage. Now you can integrate camera functionality into your application using this package.
