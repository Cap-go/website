# Using @capgo/ivs-player

## Installation

To install the @capgo/ivs-player package, you need to run the following command:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## API

The @capgo/ivs-player package provides the following API:

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

This method creates an instance of the IVS player. It takes an options object as a parameter, which contains various properties such as the URL of the video, whether to enable picture-in-picture mode, the title and subtitle of the video, and more. It returns a Promise that resolves to the created instance.

### start() => Promise

This method starts playing the video in the IVS player. It returns a Promise.

### cast() => Promise

This method casts the video to a connected device. It returns a Promise.

### getCastStatus() => Promise<{ isActive: boolean; }>

This method retrieves the status of the casting feature. It returns a Promise that resolves to an object containing the isActive property, which indicates whether casting is active.

### pause() => Promise

This method pauses the video playback. It returns a Promise.

### delete() => Promise

This method deletes the IVS player instance. It returns a Promise.

### getUrl() => Promise

This method retrieves the URL of the video that is currently being played. It returns a Promise.

### getState() => Promise

This method retrieves the current state of the IVS player. It returns a Promise.

### setPlayerPosition(...) => Promise

This method sets the position of the IVS player on the screen. It takes x and y coordinates as parameters and returns a Promise.

### getPlayerPosition() => Promise

This method retrieves the current position of the IVS player on the screen. It returns a Promise.

### setAutoQuality(...) => Promise

This method sets the auto quality mode of the IVS player. It takes a boolean value as a parameter and returns a Promise.

### getAutoQuality() => Promise

This method retrieves the current auto quality mode of the IVS player. It returns a Promise.

### setPip(...) => Promise

This method sets the picture-in-picture mode of the IVS player. It takes a boolean value as a parameter and returns a Promise.

### getPip() => Promise

This method retrieves the current picture-in-picture mode of the IVS player. It returns a Promise.

### setFrame(...) => Promise

This method sets the frame of the IVS player. It takes a number value as a parameter and returns a Promise.

### getFrame() => Promise

This method retrieves the current frame of the IVS player. It returns a Promise.

### setMute(...) => Promise

This method sets the mute mode of the IVS player. It takes a boolean value as a parameter and returns a Promise.

### getMute() => Promise

This method retrieves the current mute mode of the IVS player. It returns a Promise.

### setQuality(...) => Promise

This method sets the quality of the video in the IVS player. It takes a string value as a parameter and returns a Promise.

### getQuality() => Promise

This method retrieves the current quality of the video in the IVS player. It returns a Promise.

### getQualities() => Promise

This method retrieves the available qualities of the video in the IVS player. It returns a Promise.

### addListener('expandPip', ...) => void

This method adds a listener for the expandPip event. It takes a callback function as a parameter and returns void.

### addListener('closePip', ...) => void

This method adds a listener for the closePip event. It takes a callback function as a parameter and returns void.

### addListener('onState', ...) => void

This method adds a listener for the onState event. It takes a callback function as a parameter and returns void.

### addListener('onCues', ...) => void

This method adds a listener for the onCues event. It takes a callback function as a parameter and returns void.

### addListener('onDuration', ...) => void

This method adds a listener for the onDuration event. It takes a callback function as a parameter and returns void.

### addListener('onError', ...) => void

This method adds a listener for the onError event. It takes a callback function as a parameter and returns void.

### addListener('onRebuffering', ...) => void

This method adds a listener for the onRebuffering event. It takes a callback function as a parameter and returns void.

### addListener('onSeekCompleted', ...) => void

This method adds a listener for the onSeekCompleted event. It takes a callback function as a parameter and returns void.

### addListener('onVideoSize', ...) => void

This method adds a listener for the onVideoSize event. It takes a callback function as a parameter and returns void.

### addListener('onQuality', ...) => void

This method adds a listener for the onQuality event. It takes a callback function as a parameter and returns void.

### addListener('onCastStatus', ...) => void

This method adds a listener for the onCastStatus event. It takes a callback function as a parameter and returns void.

### removeAllListeners() => void

This method removes all the added event listeners. It returns void.

## Conclusion

The @capgo/ivs-player package provides a comprehensive API for integrating an IVS player into your Capacitor app. By following the installation steps and referencing the API documentation, you can easily start playing videos in your app using the IVS player.