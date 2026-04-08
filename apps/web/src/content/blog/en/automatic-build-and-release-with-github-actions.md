---
slug: automatic-build-and-release-with-github-actions
title: Automatic build and release app with Github actions
description: >-
  Create your own CI/CD pipeline with Github actions for free, deploy your Ionic
  Capacitor JS app every time you push to main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2025-12-04T21:45:51.000Z
head_image: /github_actions.webp
head_image_alt: Github action illustration
keywords: Github actions, CI/CD, automatic build, automatic release, mobile app updates
tag: CI/CD
published: true
locale: en
next_blog: automatic-capacitor-ios-build-github-action
---
This tutorial focuses on the GitHub hosting, but you can adapt it with little tweak to any other CI/CD platform.

## Preface 

Be sure you have added your Capacitor app first to Capgo, this tutorial just focuses on the upload phase.
If you need to add your app to Capgo, you can follow this [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Commit convention

First you need to start following the commit convention [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)\` this will help the tooling understand how to upgrade the version number, it's 5 min to learn it.

![Conventional commits](/conventional_commits.webp)

## GitHub actions for tag

Then you have to create your first GitHub action to automatically build and create tag.

Create a file at this path: `.github/workflows/bump_version.yml`

with this content:

```toml
name: Bump version

on:
  push:
    branches:
      - main

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        run: npx capacitor-standard-version
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags
```

This will release a tag for every commit in your main branch. And add a changelog entry for each commit in the main branch in `CHANGELOG.md`.

Don't worry if you don't have this file, it will be created for you.

To make this work, create a [PERSONAL ACCESS TOKEN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) and add it to your GitHub [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") as `PERSONAL_ACCESS_TOKEN`.

This is necessary to let the CI commit the changelog.

When you create the token, choose expiration as `never` and the scope as `repo`.

Lastly, set the version in your `package.json` file, sync it with your Native version number that will facilitate, then next step.

This is only necessary the first time, then the tools will keep it up to date.

You can now commit this both files and see your first tag appear in GitHub!

Both native and web platform will have the version number bump after each commit.
## GitHub actions for build

Create a file at this path: `.github/workflows/build.yml`

with this content:

```yml
name: Build source code and send to Capgo

on:
  push:
    tags:
      - '*'
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    name: "Build code and release"
    steps:
      - name: Check out
        uses: actions/checkout@v6
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Example of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

This will install and build your dependency before sending it to Capgo.

If your command for build is different, you can change it in the `build_code` step.

To make this work, you need to get your API key for Capgo, add it in the [secret of your GitHub repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) as `CAPGO_TOKEN`.

You can now commit this both files and see your first tag appear in GitHub!

Add the commit will generate a new build for the production channel.

You should add your test in the build step to ensure your code is working.

Go To your Capgo dashboard and check your build who just appeared, you now have your CI/CD system.

If you want to let all of your users get the update whenever it's available, go to your channel and set it to `public`.

You can also add the native build of your Ionic Capacitor JavaScript app by following this tutorial 👇
