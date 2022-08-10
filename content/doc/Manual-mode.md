---
slug: "Manual-mode"
title: "Manual mode"
description: "Documentation for manual mode"

---
# Before star

If you use this work on your own, I couldn't suggest you more to support my work [here](https://github.com/sponsors/riderx).

I made a big bet to open source all the precious code I built here.

I could have kept it for myself and put a high ticket price.

I want to focus on Capgo tooling, and make it an open and transparent business.

I do think it would make our world a better place by opening instead of fighting and hiding.

But to make it possible, it is necessary for all of us to do our part, including you 🥹.

Capgo offer can't suit you, then put your own price and back a bootstrapped Maker 
[HERE](https://github.com/sponsors/riderx) on your own terms.

# Quick install
You can add this code to your app to use manual download

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
App.addListener('appStateChange', async(state) => {
     if (state.isActive) {
       // Do the download during user active app time to prevent failed download
       data = await CapacitorUpdater.download({
       url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
       })
     }
     if (!state.isActive && data.version !== "") {
       // Do the switch when user leave app
       SplashScreen.show()
       try {
         await CapacitorUpdater.set(data)
       } catch (err) {
         console.log(err)
         SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
       }
     }
 })
```

Check the demo app for more info 

[Cap-go/demo-app](https://github.com/Cap-go/demo-app/blob/main/src/App.vue)