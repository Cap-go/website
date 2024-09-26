---
slug: "how-I-manage-semantic-rerlease-with-CapGo-CapacitorUpdater.md"
title: How I manage Semantic Release with CapGo CapacitorUpdater
description: This is how I set up semantic release to manage releases of my applications which use CapGo CapacitorUpdater
author: Rupert Barrow
author_url: https://linkedin.com/in/rbarrow
created_at: 2024-09-22
updated_at: 2024-09-22
tag: CI/CD
published: true
next_blog: "xxx"

---

# How I manage Semantic Release with CapGo CapacitorUpdater

## 1. Introduction

At Rapido Cloud (www.rapido.cloud), I am developing a mobile application for Salesforce clients to easily deploy their own branded mobile application without having to go through the difficult loops of using the Salesforce Mobile SDK or the Salesforce Mobile Publisher.

I have developed this mobile app on a modern and "standard" platform with widespread components and tools including Ionic 8, Angular 18, TypeScript, Capacitor and now CapGo CapacitorUpdater. These are more simple to handle for clients who do not want to manage Salesforce platform specifics such as Lightning Web Components; and its easier and cheaper for me to recruit developers and maintainers of Ionic + Angular mobile applications.

This article explains my design, my choices and implementation which make CapGo and `semantic-release` a very successful no-brainer for managing all deployements automatically via Github Actions. All this was designed, tested and documented during the nice 14-day free trial period of CapGo CapacitorUpdater.

## 2. Why use CapGo ? Why use semantic-release ?
CapGo CapacitorUpdater attracted me with its promise to make mobile app deployments much more simple, much more rapid and flexible than going through the standard Apple AppStore/Google PlayStore delivery process.
This is my first mobile application which I am pushing to the stores, having concentrated in the past on web apps, usually developed on the Salesforce Experience Cloud.

I was rather afraid of the learning curve to make this successful but I got my app onto Apple TestFlight quite easily. I was then in position to use CapGo CapacitorUpdater to deploy my updates much faster.

My first requirement and test case was to deploy for myself to test my app as a real mobile app on my own phone, instead of testing in a mobile emulator or in a simulator via the Nexus mobile browser suggested by IIonic. That's because my app uses native features such as Geolocation or accessing the Photo Gallery and Camera. Not having the past experience of testing a Capacitor mobile app, I wasn't sure if everything was going to work properly : nothing better than to test the real app, in real conditions !

So CapGo CapacitorUpdater helped me udate my application on my mobile, live, 1 minute after saving a new feature or fix in my source code : so relieving, and so flexible, and easy to set up !

## 3. My branching and release model, and how semantic-release fits in

So now I have my delivery to CapGo servers working correctly, I need to automate this and fit it into my CI/CD pipeline.

### This is how I organize my branching and release model

For every application, whether mobile, web or Salesforce :
- **development** is carried out on `feature/...` branches off `main`, and they are merged into `main` which is the reference for most development branches, outside of maintenance and specific features for custom deliveries (more about this below)
- **deployments are triggered __from release branches__** which may be : `production`, prerelease branches (`alpha`, `beta`, `nightly`, etc.) and also customer-specific or context-specific branches for custom deliveries
- **deployments are triggered by a pull request** being merged into a deployment branch. I don't use tag-triggered deployments because semantic release manages tags and all the reste for me.

Basically, this is the Gitlab Flow :

![Gitlab Flow](/RBW_Gitlab_Flow.png)

*Gitlab Flow - source https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### A side-note on how semantic-release works :

In a deployment branch, when semantic-release is triggered, it will automatically calculate the new version number on this branch, depending on the version number of the previous tag on the branch and the delivered fixes or features. Fixes will create a new patch version, whereas features will create a new minor version. It also automatically includes the prerelease `alpha`, `beta`, etc. in the version number.

Semantic release generates the changelog from your commits, grouping fixes and features as defined in conventional commits (see https://www.conventionalcommits.org/en/about) and configured in semantic release.

It will also update all your git (Github, in my case) merged pull requests and related issues with comments linking them to the tag and release. Finally, in this Github release, it will attach assets such as source code, binaries if necessary, `CHANGELOG.md`, etc.

## 4. Branches, releases/prereleases, channels in semantic release and in CapGo

So what I want semantic release to do for CapGo deployments is the following.

### I want semantic release to generate the version number

CapGo have developed and documented their own version of the "Conventional Commits" `standard-version` tool, with their forked repo `standard-version` (https://github.com/Cap-go/standard-version), and their own `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) as well as `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version) repos. They have documented on their blog the version scheme used by CapGo in their deployemnts (https://capgo.app/blog/how-version-work-in-capgo/). JavaScript bundles follow the "standard" semver "Semantic Versioning" (https://semver.org) which `semantic-release` also follows (obviously !)

So that's great, and is a relief for me because I use `semantic-release` extensively.

### I also want semantic release to generate app deployments on different channels

As mentioned above, I need to deply prerelase version from branches such as `alpha`, `beta`, `nightly` etc., but also customer-specific versions on branches such as `production-customer-jones`, `production-customer-doe`, etc.

CapGo provides the "channels" feature which is exactly what semantic release also supports, so I am excited to make them work together. These also fit in with the different branch builds managed by XCode Cloud (see more about this below).

Semver version numbers generated by semantic release on prereleases look like `1.0.0-alpha.1`. Successive builds on this branch will increment the build number to `1.0.0-alpha.2`, etc. Although not documented explicitly, these version numbers are supported by CapGo, which is great news for me : I will use semantic release channels and prerelease to generate versions of my app with Capgo channels. 

## 5. How can I use CapGo to release my application ?

To automate deployment of your app bundles to CapGo, you need to use the CapGo CLI command `bundle upload`. Type `npx @capgo/cli@latest bundle upload --help` to get the numerous upload options. Among those, we will use the following :
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL is the CapGo channel to which we want to deploy (eg `alpha`)
- VERSION is  generated by semantic release (eg `1.0.0-alpha.1`)
- CAPGO_APIKEY is provided by CapGo to uniquely identify your CI/CD pipeline login
- CAPGO_APPID is provided by CapGo to uniquely identify your application (eg `com.mystartup.mysuperapp`)

## 6. My semantic release + CapGo CapacitorUpdate setup

Finally, how does this all fit together ?

![App bundle versions built with semantic release and Github Actions](/RBW_CapGo_channels_and_versions.png)

*App bundle versions built with semantic release and Github Actions*


### Semantic release automation with Github Actions

The beauty of semantic release is that the deployment automation, in the form of a Github Action workflow, is very simple. This will look very similar on other CI/CD platforms .
```YAML
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

This just installs the NodeJS environment, then calls semantic release.

For every mzerge on a branch listed in `branches`, semantic release will trigger a deployment.
Set `CAPGO_APIKEY` in your repository's secrets.
Update your `CAPGO_APPID` here.

The behaviour of semantic release is set in its `.releaserc.json` configuration file.
Here are my settings, explained below :
```JSON
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches` : 
  - `branches` sets the configuration of branches (`name`), mapped to the CapGo channel (`channel`) and how the prerelease version number will be called (`prerelease`). For example, if `branch.prerelease = "development"`, the version number generated by semantic release will be `x.y.z-development.n`
  - deployments to the `alpha`and `alpha-nocapgo` branches will both deploy the app on the `alpha`channel, but with different prerelase names in the version number
  - deployments to the developer branches `dev-rupert`or `dev-paul` will both deploy to the `development`channel on CapGo, all with the same `development`prerelease keyword in the version number
- `verifyConditions` : in the first stage of semantic release, it checks that it has the correct access to Github. I hope to add an authentication check for the CapGo CLI here later
- `@semantic-release/commit-analyzer` : standard semantic release stuff - see their documentation (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator` : generate the changelog file as `CHANGELOG.md`
- `@semantic-release/git` : commit the following files which have been updated by the Ionic build of the applicatioon and by the semantic release work (`package.json`, `CHANGELOG.md` and `ios/App/App.xcodeproj/project.pbxproj` - I don't build for Android, yet)
- `@semantic-release/github` : attach the `CHANGELOG.md` file to the Github release as an asset
- `@semantic-release/exec`: use these 2 commands to prepare the build of the app (`prepareCmd`) and then to effectively build deploy the app bundle to the CapGo servers (`publishCmd`)

You will notice that their is no fiddling around with explaining how we want the version number to be calculated and incremented, how we need to generate a changelog, a Github tag or release, etc. : everything is handled by default by semantic release, with minimal configuration.

### Building new binaries with XCode Cloud

Integrating all this with XCode Cloud building new versions of the application binary is simple (I am not yet deploying on Google Play, but that build should be similar) :
- I set up an XCode Cloud process to build when there is a change on the branch I wish to use for this (eg `production`)
- on this branch, I set XCode Cloud to build only when the `CHANGELOG.md` file is updated. This is updated after each version generated by semantic release
- I can trigger builds on different branches to simulate the deployment for different channels. In each configuration of XCode Cloud build on a different branch, I set an environment variable manually with the value of `branch.channel` set in `releaserc.json` (yes, this is a manual duplication) and then, if I wanted to, I could deploy a different AppStore application for each custom customer application deployed from a custom release branch, as mentioned earlier.


![Building app binaries on XCode Cloud with CapGo channels](/RBW_XCode_Cloud_building.png)

*Building app binaries on XCode Cloud with CapGo channels*


## 7. Conclusion

In conclusion, I am very happy to have been able to integrate CapGo CapacitorUpdater into my standard semantic release pipeline, rapidly within the delay of the 14-day trial period, and the result is the following :
- bundle version numbers are generated automatically by semantic release and compatible with the CapGo servers
- semantic release automatically deploys CapGo application bundles, also making use of CapGo channels
- this fits in nicely with XCode Cloud builds of application binaries

### Next steps

I am currently in the development phase of this app. I will quickly make it available to testers through TestFlight (for iOS). Considering the power of CapGo, I will most certainly deploy a free version of the app to the AppStore for tests, which will be updated regularly with CapGo during tests. I will then deploy another (paid) version of the app on the AppStore, under another record, and also update that regularly with CapGo.

I hope to add better pre-build verification of CapGo `bundle upload` prerequisites into my semantic release configuration.

I now have a clean, simple an reproducible semantic release pipeline for future mobile apps developed with Ionic + Angular + Capacitor.


## Author - Rupert Barrow

I have over 22 years' experience of Salesforce, as a client and user, as a partner and integrator, architect, developer, business analyst and consultant. I co-founded and co-managed Altius Services as COO and CTO for 13 years, a successful Salesforce SI partner in France, before setting off on a new adventure as a Salesforce solopreneur with my **Rapido Cloud** product offering.

You can find me on LinkedIn at https://linkedin.com/in/rbarrow. 

You can take a look at our Salesforce offerings at https://www.rapido-companion.app and https://www.rapido.cloud (under development).
