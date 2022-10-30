---
slug: "how-to-build-capacitor-app-in-xcode-cloud"
title: How to build capacitor app in Xcode Cloud
description: Use Xcode cloud to build your capacitor app and bypass the need of MacOS.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-09-01
updated_at: 2022-09-01
head_image: "/capgo-feature-image.webp"
head_image_alt: Capgo major version system
tag: Tutorial
published: false

---

## Intro

To make Xcode build your Capacitor app, you need to set up a few things.

## Package Preparation

Be sure to have your build command in your `package.json` script.
Then add the `sync:ios` command like below.

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
This step will make the post script work simply

## Post clone script
This script will be run by Xcode cloud after the clone step

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
# have to add node yourself link to this issue https://stackoverflow.com/questions/73462672/xcode-cloud-suddenly-failing-to-link-node-and-install-dependencies
NODE_VER=16
VERSION=$(curl -s https://nodejs.org/dist/latest-v$NODE_VER.x/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')
if [[ "$(arch)" == "arm64" ]]
then
  ARCH="arm64"
else
  ARCH="x64"
fi

curl "https://nodejs.org/dist/latest-v$NODE_VER.x/node-$VERSION-darwin-$ARCH.tar.gz" -o $HOME/Downloads/node.tar.gz
tar -xf "$HOME/Downloads/node.tar.gz"
NODE_PATH="$PWD/node-$VERSION-darwin-$ARCH/bin"
PATH+=":$NODE_PATH"
export PATH
node -v
npm -v

brew install pnpm # optional, you can also install yarn if you use it

# Install dependencies
pnpm install --frozen-lockfile
# or `npm ci` or `yarn install --frozen-lockfile`
npm run mobile
npm run sync:ios
```


## Create a Xcode workflow

Open Xcode (yes, to remove Xcode you need Xcode)

And go to this tab :
![Xcode step 1](/xcode_step_1.webp)

Click on create workflow, select your app, click next like below.

![Xcode step 2](/xcode_step_2.webp)

Click on Edit workflow on the left
![Xcode step 2](/xcode_step_3.webp)

Go to environments tab and chose like below Mac 12.4 and check the proper option
![Xcode step 3](/xcode_step_3.webp)

Choose your start condition.
If you use the same build as us, I suggest to use Tag instead of branch, to avoid double build.

Set your env variable
![Xcode step 4](/xcode_step_4.webp)

Connect your GitHub account
![Xcode step 5](/xcode_step_5.webp)

![Xcode step 6](/xcode_step_6.webp)


# Fastlane config ios


Copy files from this repo : capgo app

create a certificat location with fastlane match
run `fastlane match init`
follow instruction there 

add this to your github actions:

```yaml
build_ios:
  runs-on: macOS-latest
  steps:
    - uses: actions/checkout@v3
    - uses: pnpm/action-setup@v2
      with:
        version: 7
    - name: Use Node.js 16
      uses: actions/setup-node@v3
      with:
        node-version: 16
        cache: pnpm
    - name: Install dependencies
      id: install_code
      run: pnpm install --frozen-lockfile
    - name: Build
      id: build_code
      run: pnpm mobile
    - name: Sync
      id: sync_code
      run: npx cap sync
    - name: Install fastlane CLI
      run: |
        HOMEBREW_NO_INSTALL_CLEANUP=1 brew install fastlane
    - name: Archive IOS
      env:
        APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.APPSTORE_KEY_ID }}
        APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.APPSTORE_ISSUER_ID }}
        APP_STORE_CONNECT_API_KEY_CONTENT: ${{ secrets.APPSTORE_PRIVATE_KEY }}
        CERTIFICATE_STORE_URL: ${{ secrets.CERTIFICATE_STORE_URL }}
        MATCH_KEYCHAIN_PASSWORD: ${{ secrets.MATCH_KEYCHAIN_PASSWORD }}
      run: fastlane ios beta
    - name: Upload release bundle
      uses: actions/upload-artifact@v2
      with:
        name: ios-release
        path: ios/App/App.ipa
        retention-days: 60
```

create secrets in your github repo

- APP_STORE_CONNECT_API_KEY_ID
- APP_STORE_CONNECT_API_ISSUER_ID
- APP_STORE_CONNECT_API_KEY_CONTENT
- CERTIFICATE_STORE_URL ==> where your fastlane match is created
- MATCH_KEYCHAIN_PASSWORD ==> password for your fastlane match

create a github personal token with repo right
and then do 
` echo -n github_name:token | base64 `
to get your base64 token
