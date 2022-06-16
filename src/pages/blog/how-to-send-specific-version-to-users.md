---
title: How to send specific version to user
description: with this you can allow you user to try beta version without the need of TestFlight
author: Martin Donadieu
date: 2022-06-16
head_image: "/testflight_alternative.webp"
head_image_alt: TestFlight alternative illustration
tag: alternatives
published: false
next_blog: ''

---

## Preface

When you start to enjoy the update system of Capgo, like me for my own apps, you will start to get the feeling "What if i whant more?"

I got the feeling too, but since i'm the maker of Capgo i was able to take a look !

> Since all is open source you have this power too :)

So the next pain i got in the app distribution process is to make other teammates test the updates !

With TestFlight, the issue is simple, bring people in your team and make them understand how to get it is time consuming !

And of course each time you send to Apple you have a random review process by a bot who can take 5 min or 5 hours, you never know.

I got many time my presentation delayed by this...

And for Google this is even worst, the big mistery of my life, release a production version take less than 2 hours, but release a close beta take 1-2 days !


## solution

To fix this, i crated the Channel system in Capgo.

`npx @capgo/cli@latest upload -c production` will update to all user (if production channel is set to public)

If you do `npx @capgo/cli@latest upload -c development` then the version land to a different channel, this can be automatised in [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions). 

Then you have 2 way to let users get the updates from the channel

### Manual way

This can be usefull for your internal team, this is fast to implement.
Allow user to copy they deviceID from your app and send it to you manually, this code will help you to get it
```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getId()
```
Hide a button somewhere in your app, or show the button to only connected user with a `admin` role for exemple.

Then Go to the Web app or native app Capgo, connect as app admin, select your app, click on device list.

Then put in the searchbar the DeviceId click on the one found and then click on Channel link choose the `development`, ask your teammate to open the app again, wait 30 sec and open close again.

He should get your version.


### Automatic way

This can be usefull for your beta testers, this is longer to implement.

Same as manual way you have to get the deviceID
```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getId()
```

But this time you have to send it automatically to your backend, i let you decide how you do that.

I will just suggest you to store it in database, that will facilitate your life later !

Then in your backend you have to send it to Capgo backend too. below a code exemple in Nodejs

```javascript
import axios from 'axios'

await  axios.post('https://capgo.app/api/device', {
  app_id: 'YOUR_APP_ID',
  device_id: 'DEVICE_ID',
  channel: 'CHANNEL_NAME', // The name of the channel, or undefined if version_id provided
  version_id: 'VERSION_NAME' // this is optionnal, if provide it will override the channel, that usefull when you want to debug only one user.
}, {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})
```

After this configured, try to add a button in your app to opt-in to the channel, and check in the web app if that have been set.

You can also send `null` to remove override

If you need to check programatictly what override is set on a device you can get on the same url

```javascript
import axios from 'axios'

const res = await axios.get('https://capgo.app/api/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```

