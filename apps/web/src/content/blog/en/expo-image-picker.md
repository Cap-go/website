---
slug: expo-image-picker
title: 'Expo Image Picker: A Complete Guide for 2026'
description: 'Master expo image picker in your React Native app. This complete guide covers installation, permissions, camera/gallery access, cropping, base64, and uploading.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-06-22T08:09:22.697Z
updated_at: 2026-06-22T08:12:11.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/ba308f87-6f68-4a15-a46f-3ffc02bcba9e/expo-image-picker-guide.jpg'
head_image_alt: 'Expo Image Picker: A Complete Guide for 2026'
keywords: 'expo image picker, react native, expo, mobile development, image upload'
tag: 'Mobile, Guides'
published: true
locale: en
next_blog: ''
---
You're probably at the point where the UI is ready, the profile screen has an “Upload photo” button, and now the easy part suddenly isn't easy. The actual image selection flow touches native permissions, OS-controlled interfaces, different return shapes than many developers expect, and a handful of build-time details that only show up after you ship a real build.

That's where Expo Image Picker fits. It's the official Expo library for opening the system UI to choose images and videos from the device library or take a photo with the camera, as described in the [Expo package repository](https://github.com/expo/expo/tree/main/packages/expo-image-picker). In practice, that means you get a reliable bridge into native media input, but not a custom media experience that behaves identically on every device.

This guide is written for the first implementation, not the demo. It focuses on the decisions that matter in production: managed versus bare workflow setup, permission handling that won't surprise you later, safe result parsing, and a practical upload pattern after the user picks a file. If you're working in a custom native setup, it also helps to understand how this differs from an [Expo development client workflow](https://capgo.app/blog/expo-development-client/).

<a id="getting-started-with-expo-image-picker"></a>

## Table of Contents
- [Getting Started with Expo Image Picker](#getting-started-with-expo-image-picker)
- [Installation and Essential Configuration](#installation-and-essential-configuration)
  - [Managed workflow setup](#managed-workflow-setup)
  - [Bare React Native setup details](#bare-react-native-setup-details)
- [Accessing the Camera and Media Library](#accessing-the-camera-and-media-library)
  - [A minimal but safe component](#a-minimal-but-safe-component)
  - [Library and camera flows](#library-and-camera-flows)
  - [What to expect from the system UI](#what-to-expect-from-the-system-ui)
- [Handling Picker Results and Options](#handling-picker-results-and-options)
  - [Reading the result object correctly](#reading-the-result-object-correctly)
  - [Options that change downstream behavior](#options-that-change-downstream-behavior)
  - [URI versus base64](#uri-versus-base64)
  - [A safer result pattern for real apps](#a-safer-result-pattern-for-real-apps)
- [Advanced Patterns and Platform Differences](#advanced-patterns-and-platform-differences)
  - [A practical upload pattern](#a-practical-upload-pattern)
  - [Where platform differences actually matter](#where-platform-differences-actually-matter)
  - [Managed vs. bare workflow differences](#managed-vs-bare-workflow-differences)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Fast checks for common failures](#fast-checks-for-common-failures)
  - [A short production checklist](#a-short-production-checklist)

## Getting Started with Expo Image Picker

A product manager asks for profile photos. A week later, the same feature also needs receipt uploads, camera capture for incident reports, and retries when users deny permission the first time. Image input expands fast because it touches native permissions, OS-owned UI, temporary file handling, and backend upload flows.

`expo-image-picker` is the Expo SDK module for that job. It opens the platform picker or camera UI and returns the selected media in a shape your React Native code can handle. The JavaScript API is small. The main challenge lies in getting the native setup, permission flow, and result handling right on both managed and bare projects.

The main trade-off is straightforward. You let iOS and Android present their own media UI instead of building a custom picker. That usually gives a better result: users already understand the system screens, permission prompts behave the way the OS expects, and your team avoids maintaining a gallery implementation in JavaScript.

Treat this as a native integration feature with a React interface.

That mindset helps because the failure modes are rarely in the button that calls the picker. They usually come from one of three places:

- **Native configuration:** missing plugin setup, incorrect permission strings, or a stale build after changing config
- **Runtime behavior:** users can deny access, grant limited library access on iOS, or cancel the flow without selecting anything
- **Result parsing:** the current API returns an `assets` array, so older examples that read `result.uri` directly fail

Workflow choice also changes the setup path. In a managed Expo app, most of the native work lives in app config and requires a rebuild when that config changes. In a bare app, you still get the Expo module API, but you need to verify the underlying iOS and Android project settings more directly. If your team is using a custom client instead of Expo Go, this guide pairs well with Capgo's explanation of [how an Expo development client changes native module testing](https://capgo.app/blog/expo-development-client/).

That split matters for the rest of the guide because the happy path is only half the story. A picker implementation is solid when it works in both workflows, handles platform-specific permission quirks without surprising the user, and passes a usable file to your upload layer instead of stopping at a local preview.

<a id="installation-and-essential-configuration"></a>
## Installation and Essential Configuration

Installation takes one command. Getting the native configuration right is what determines whether the picker works on a real device, in a custom dev client, and in your production build.

`expo-image-picker` gives a React-facing API over the platform pickers for photos, videos, and camera capture. The JavaScript call is simple. The setup is not, because photo access and camera access are controlled by iOS and Android, not by React Native.

![A developer working on Expo image picker implementation by typing code on a laptop computer screen.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/472d305b-dc0d-4c11-bd68-7dfa290c2b4e/expo-image-picker-coding-setup.jpg)

Start with Expo's version-aware installer:

```bash
npx expo install expo-image-picker
```

Use `expo install` instead of `npm install` or `yarn add`. Expo matches the package version to your SDK, which avoids a common class of native compatibility problems. If you are comparing how Expo modules fit into your release process, this [Expo tooling overview](https://capgo.app/expo/) is a useful reference.

<a id="managed-workflow-setup"></a>
### Managed workflow setup

In the managed workflow, declare the plugin in app config so Expo can apply the native changes at build time.

Example with `app.json`:

```json
{
  "expo": {
    "plugins": ["expo-image-picker"]
  }
}
```

That is the minimum setup. In practice, teams usually add permission text as well, especially on iOS where the system prompt should explain why the app needs access. Keep the wording specific to the user action. “Upload a profile photo” is better than “Needs media access.”

One operational detail causes a lot of wasted time. Changing `plugins`, permission strings, or other native config requires a rebuild. Reloading JavaScript does not apply those changes. In Expo Go, you are also limited by what the client already includes. In a development build or production build, the native project reflects your config only after a new build.

<a id="bare-react-native-setup-details"></a>
### Bare React Native setup details

In a bare app, the package API is the same, but you need to verify more of the native project yourself. iOS usage descriptions are the first thing to check. If your flow can open the library, launch the camera, or record video with audio, your app needs the corresponding permission strings in `Info.plist` before you rebuild.

A practical checklist for bare projects looks like this:

1. Install `expo-image-picker` with `npx expo install expo-image-picker`.
2. Add the plugin config if your project uses Expo config plugins.
3. Confirm the iOS usage descriptions match the features you expose.
4. Rebuild the iOS and Android apps after any native config change.

Missing permission text often looks like a runtime bug because the UI code is fine and the button handler runs. The failure is lower in the stack. I usually check `Info.plist`, the app config, and whether the current build includes the latest native changes before I touch the component code.

A few habits make setup more predictable:

- **Write permission text for the actual action:** users should understand why they are seeing the prompt.
- **Configure camera and library separately:** one can work while the other still fails.
- **Rebuild after native changes:** hot reload and fast refresh do not update native permissions.
- **Test on device:** simulator behavior can hide permission and camera issues.

If the picker works during development but breaks in TestFlight or the Play Store build, treat that as a configuration problem first. Most of the time, it is.

<a id="accessing-the-camera-and-media-library"></a>
## Accessing the Camera and Media Library

A user taps “Upload photo,” expects the camera or library to open, and your app has one job at that moment. Open the right system UI, handle refusal or cancellation without breaking the screen, and return a usable local file reference for preview or upload.

That sounds simple until you test both managed and bare builds across iOS and Android. The JavaScript API stays compact, but the runtime behavior still depends on OS prompts, device hardware, and how your native permissions were configured earlier.

![Flowchart illustrating the mobile app image picker process for choosing between camera or media library sources.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/8b5d3dd9-62f4-4cb1-9583-163b87a38aa4/expo-image-picker-flowchart.jpg)

<a id="a-minimal-but-safe-component"></a>
### A minimal but safe component

The core flow is consistent in both Expo managed and bare workflow projects. Request the relevant permission, launch the picker, check whether the user canceled, then read the first asset from `result.assets`.

A baseline component looks like this:

```tsx
import { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoInput() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow photo library access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    setImageUri(asset.uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    setImageUri(asset.uri);
  };

  return (
    <View>
      <Button title="Choose from library" onPress={pickFromLibrary} />
      <Button title="Take photo" onPress={takePhoto} />
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200 }}
        />
      ) : null}
    </View>
  );
}
```

Three details matter here.

- Request library and camera permissions separately. They fail independently.
- Treat cancellation as a normal user action, not an error state.
- Read from `assets[0]`, because the picker returns an asset array rather than a top-level `uri`.

<a id="library-and-camera-flows"></a>
### Library and camera flows

Start with the library flow if you want the fastest path to a working feature. It is easier to test, it works in more simulator setups, and it avoids camera hardware edge cases. Add camera support once the result handling path is stable.

The camera path has more ways to fail in development. iOS Simulator support is limited. Android emulators may not expose camera behavior that matches a real device. In bare projects, those gaps can send you looking at component code even though the actual issue is native config or test environment.

A clean UI pattern is to ask the user for the source before calling the picker API:

```tsx
const showPickerOptions = () => {
  Alert.alert('Upload image', 'Choose a source', [
    { text: 'Camera', onPress: takePhoto },
    { text: 'Photo Library', onPress: pickFromLibrary },
    { text: 'Cancel', style: 'cancel' },
  ]);
};
```

That separation keeps each function focused. It also makes it easier to add analytics, feature flags, or backend-specific rules later. For example, some teams allow library uploads for profile images but require fresh camera captures for identity verification.

If your broader app also supports file access patterns outside Expo or you are comparing conventions across native stacks, this [Capacitor photo library reference](https://capgo.app/plugins/capacitor-photo-library/) is useful context.

A short demo helps when you're showing this flow to teammates or QA:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/0TfDaVwdwZc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="what-to-expect-from-the-system-ui"></a>
### What to expect from the system UI

`expo-image-picker` opens the platform picker or camera UI. Your app does not control every screen in that flow. That distinction matters because “works on my device” often means “the OS allowed the path I tested.”

On iOS, users may grant limited library access instead of full access. On Android, picker behavior can vary by OS version and vendor skin. In managed workflow projects, Expo handles more of the native wiring for you. In bare workflow projects, you need to confirm that your built app includes the native permission changes you made. The JavaScript call site can be identical in both cases while the runtime outcome differs.

I usually test these cases before calling the feature done:

- first permission request
- denied permission
- user cancellation
- successful library selection
- successful camera capture on a physical device
- immediate preview of the returned local URI

Those cases map directly to real production behavior. They also set up the next step cleanly if you need to send the file to a server, a moderation pipeline, or a publishing endpoint such as the [Instagram media publishing API](https://post-pulse.com/platforms/instagram/media-upload).

<a id="handling-picker-results-and-options"></a>
## Handling Picker Results and Options

The picker result is the part that usually needs real production logic. The system UI returns a structured object, not just a file path, and small mistakes here lead to broken previews, empty uploads, or crashes after a user cancels.

<a id="reading-the-result-object-correctly"></a>
### Reading the result object correctly

The result shape that matters in current Expo apps is `result.assets[0].uri`, not a top-level `result.uri`. That detail affects both managed and bare workflow projects because the JavaScript API is the same even though native setup differs underneath.

Use a guard-first pattern:

```tsx
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'],
  allowsEditing: true,
  quality: 1,
});

if (result.canceled) {
  return;
}

const asset = result.assets?.[0];
if (!asset) {
  return;
}

const { uri } = asset;
setImageUri(uri);
```

This handles the two failure cases I see most often. A canceled picker does not give you an asset to read, and code that assumes `result.assets[0]` always exists will fail at runtime.

Once you have the URI, rendering a preview is straightforward:

```tsx
<Image source={{ uri: imageUri }} style={{ width: 240, height: 240 }} />
```

If you plan to upload later, keep the whole `asset` object around, not just the URI. In practice, `fileName`, `mimeType`, `width`, `height`, and `fileSize` are often useful for validation, logging, or building a cleaner multipart request.

<a id="options-that-change-downstream-behavior"></a>
### Options that change downstream behavior

A few picker options affect more than the selection screen. They shape file size, editing behavior, and what your backend has to accept.

| Option | Type | What it changes | Typical use |
|---|---|---|---|
| `mediaTypes` | array | Restricts what the user can choose | Limit selection to images if your API only accepts images |
| `allowsEditing` | boolean | Lets the OS offer crop or edit UI where supported | Avatars, square covers, receipt capture |
| `quality` | number | Compresses supported image outputs | Reduce upload size for mobile networks |
| `base64` | boolean | Adds encoded image data to the result | Only for integrations that explicitly require inline image data |

A few trade-offs are easy to miss:

- **`allowsEditing`** is useful when the image slot has a fixed shape or size. It is less useful if your server does its own crop pipeline and you want the original file.
- **`quality`** affects upload time, memory pressure, and server storage. `quality: 1` is not automatically the right choice.
- **`mediaTypes`** should match backend rules. If the server rejects videos, do not let the picker return them.
- **`base64`** increases payload size in memory. Avoid it unless the receiving service requires it.

That last point matters on lower-memory devices. A local file URI is usually the better handoff for preview and multipart upload. Base64 has valid uses, but it is expensive compared with passing a file reference.

<a id="uri-versus-base64"></a>
### URI versus base64

For most apps, the rule is simple:

- Use **URI** for previews.
- Use **URI** for file uploads.
- Use **base64** only when the receiving system explicitly asks for encoded content.

That pattern keeps picker code small and easier to test. It also lines up with how many backend media flows are built, including services that eventually publish to external platforms such as the [Instagram media publishing API](https://post-pulse.com/platforms/instagram/media-upload).

If your team ships frequent OTA updates or moves image-heavy assets through app delivery, file size decisions here carry into the rest of the pipeline. This guide on [optimising images for app updates](https://capgo.app/blog/optimise-your-images-for-updates/) is a useful companion to picker configuration.

<a id="a-safer-result-pattern-for-real-apps"></a>
### A safer result pattern for real apps

For demo code, storing only `imageUri` is fine. In production, store a normalized object so the next step, preview, validation, upload, or retry, does not need to reinterpret the raw picker response every time.

```tsx
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'],
  allowsEditing: true,
  quality: 0.8,
});

if (result.canceled || !result.assets?.length) {
  return;
}

const asset = result.assets[0];

setSelectedImage({
  uri: asset.uri,
  fileName: asset.fileName ?? 'upload.jpg',
  mimeType: asset.mimeType ?? 'image/jpeg',
  width: asset.width,
  height: asset.height,
  fileSize: asset.fileSize ?? null,
});
```

This gives you one predictable shape inside the app. It also makes managed and bare projects easier to keep aligned because the app code stays stable while you work through native differences elsewhere.

One final check helps. Do not enable extra result fields just in case. Request the data you know you need, and keep the picker focused on selection rather than turning it into a general file-processing step.

<a id="advanced-patterns-and-platform-differences"></a>
## Advanced Patterns and Platform Differences

A picker feature usually stops being simple the moment the first selected image has to survive retries, auth headers, native permission differences, and a real upload endpoint. `expo-image-picker` handles selection well. The rest of the feature is on your app.

![An infographic titled Image Uploads: Local vs. Server Storage Considerations displaying pros and cons of server storage.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b0795924-7575-414b-aefb-16885b0ccc09/expo-image-picker-server-storage.jpg)

<a id="a-practical-upload-pattern"></a>
### A practical upload pattern

For APIs that expect a file upload, `FormData` is still the safest default. It works across common Rails, Node, Laravel, Django, and Go backends, and it keeps the picker separate from transport concerns.

```tsx
async function uploadImage(imageUri: string) {
  const formData = new FormData();

  formData.append('file', {
    uri: imageUri,
    name: 'upload.jpg',
    type: 'image/jpeg',
  } as any);

  const response = await fetch('https://your-api.example.com/uploads', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}
```

That code is enough to prove the path works, but production apps usually need one more layer. Derive `name` and `type` from the selected asset when possible, attach auth outside the picker function, and keep upload state separate from picker state so a failed request does not force the user to reopen the library.

A few checks prevent the common failures I see in review:

- Confirm the local `uri` exists before building the request
- Render a preview before upload so users catch the wrong file early
- Prevent repeated taps while the request is in flight
- Handle network failures separately from picker cancellation or permission errors
- Expect backend validation to reject large files, unsupported MIME types, or missing auth

If your backend requires base64 instead of multipart, that is usually a server constraint, not a picker requirement. Multipart is cheaper on memory and easier to reason about on mobile.

<a id="where-platform-differences-actually-matter"></a>
### Where platform differences actually matter

The picker UI is native, so it inherits native behavior. That affects both what users see and what your code should assume.

On iOS, editing flows and permission prompts follow Apple's conventions. Limited Photos access can return a narrower set of assets than your test account saw on a fully granted device. On Android, picker behavior varies more by OS version and manufacturer skin, especially around albums, file names, and how camera captures are returned. Bare React Native apps feel these differences more directly because you own more of the native setup, but managed Expo apps still need code that treats the picker as platform-shaped rather than perfectly uniform.

The practical rule is simple. Depend on the fields you can validate, not on identical UI or identical metadata across devices.

A few examples matter in real apps:

- **Editing and cropping:** The UI and crop behavior are not identical between iOS and Android
- **Returned metadata:** `fileName`, `mimeType`, and `fileSize` can be absent or inconsistent, so add fallbacks
- **Permissions:** iOS photo access can be limited to selected items, while Android behavior depends more on OS version and system picker support
- **Camera output:** Captured images may come back with different naming, orientation, or compression characteristics than library assets

If your team also works outside Expo, this [DesignStack app development guide](https://designstack.co.uk/android-app-development-services/) gives useful Android context for media handling decisions that show up beyond a single library.

<a id="managed-vs-bare-workflow-differences"></a>
### Managed vs. bare workflow differences

At this point, setup choices start to matter operationally.

In the managed workflow, permission strings and plugin config usually live in app config, and native changes are applied when you create a new build. That keeps the JavaScript surface area clean, but it also means a config fix is not visible until the next native build. OTA updates do not patch missing native permissions.

In the bare workflow, the same feature has more moving parts. You need to verify the native iOS usage descriptions, Android manifest behavior, package installation, and rebuild timing yourself. The upside is control. The cost is that a picker issue may be caused by native configuration, not by the JavaScript call site.

Teams that switch between Expo and Capacitor often underestimate how different these abstraction layers are. Capgo has a useful explanation of [how Capacitor handles platform differences](https://capgo.app/blog/how-capacitor-handles-platform-differences/), and it is a good comparison point if you are deciding how much native setup your team wants to own.

My preference is consistent across both workflows. Keep picker code narrow, normalize the result once, upload through a dedicated API layer, and treat platform-specific behavior as something to configure and test explicitly rather than smooth over with assumptions.

<a id="troubleshooting-common-issues"></a>
## Troubleshooting Common Issues

Most Expo Image Picker bugs fall into a small set of categories. The fastest fix is usually to identify which layer is failing: config, permission, result handling, or rendering.

![A checklist for troubleshooting common issues when using the expo-image-picker library in mobile development projects.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/032c9df5-5783-4f7f-9d2a-50d0c3cab4a9/expo-image-picker-troubleshooting-checklist.jpg)

<a id="fast-checks-for-common-failures"></a>
### Fast checks for common failures

If the picker won't open or permissions fail, check native setup first. In bare apps especially, missing iOS usage descriptions are a common root cause.

If the app crashes after a user closes the picker, inspect your result handling. Many implementations still assume a direct URI and skip the `canceled` check.

A few quick mappings help:

- **Permission denied errors:** Verify your app config and native permission strings, then rebuild.
- **`undefined` image URI:** Read from `result.assets?.[0]?.uri`, not `result.uri`.
- **Nothing happens after cancel:** That may be correct. Handle cancel as a no-op state.
- **Image doesn't render:** Confirm the URI was stored in state and passed into `<Image source={{ uri }} />`.
- **Camera acts strangely in simulator:** Test on a physical device before you chase a library bug.

<a id="a-short-production-checklist"></a>
### A short production checklist

Use this as a final pass before shipping:

- **Install with Expo tooling:** Use `npx expo install expo-image-picker`.
- **Configure native pieces:** Add the plugin and required permission descriptions.
- **Request permissions intentionally:** Separate camera and media library flows.
- **Guard every result:** Check `result.canceled` and safely read `assets[0]`.
- **Prefer URI-based uploads:** Keep base64 for special cases only.
- **Test real devices:** Especially for camera capture and permission prompts.

---

If your team ships Capacitor or Electron apps alongside React Native projects, [Capgo](https://capgo.app) is one option for delivering JavaScript, CSS, config, and asset updates without waiting on store review for every change. It's relevant when image-related fixes live in your web layer, such as upload UI, validation rules, copy, or asset handling around the picker flow.
