---
title: Manage development and production build with GitHub actions
description: Use Capgo to release your devbuild to specific channel, and let your team try it, without waiting Apple and Google review 
author: Martin Donadieu
date: 2022-06-16
head_image: "/capgo_ci-cd-illustration.webp"
head_image_alt: Channel builds illustration
tag: CI/CD
published: true
next_blog: '/blog/how-to-send-specific-version-to-users'

---
This tutorial focuses on the GitHub hosting, but you can adapt it with little tweak to any other CI/CD platform.

## Preface 

Be sure you have add your app first to capgo, this tutorial just focus on the upload phase

## Commit convention

First you need to start following the commit convention [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/)\` this will help the tooling understand how upgrade the version number, it's 5 min to learn it.

![Conventional commits](/conventional_commits.webp)

## GitHub actions for tag

Then you need to create your first GitHub action to automatically build and create tag.

Create a file at this path: `.github/workflows/bump_version.yml`

with this content:

```toml
name: Bump version

on:
  push:
    branches:
      - main
      - development

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        if: github.ref == 'refs/heads/main'
        run: npx capacitor-standard-version
      - name: Create bump and changelog
        if: github.ref != 'refs/heads/main'
        run: npx capacitor-standard-version --prerelease alpha
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags

```

This will release a tag for every commit in your main branch. And a `alpha` release for `development`, and lastly a changelog entry for each commit in `CHANGELOG.md`.

Don't worry if you don't have this file it will be created for you.

To make this work, you need to create a [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) _it in_ your GitHub [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") as `PERSONAL_ACCESS_TOKEN`.

This is necessary to let the CI commit the changelog and the version bump.

When you create the token, choose expiration as `never` and the scope as `repo`.


Set the `version` key in your `package.json` file. Use for that the last version released in The store.

This is only necessary the first time, then the tools will keep it up to date.

You can now commit this both file and see your first tag appear in GitHub!

`capacitor-standard-version` is the package who do the magic, by defaul he also update your version number in Android and ios


## GitHub actions for build

Create a file at this path: `.github/workflows/build.yml`

with this content:

```toml
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
        uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2.0.1
        with:
          version: 6.22.2
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm build
        env:
          MY_ENV_VAR: ${{ secrets.MY_ENV_VAR }}
      - name: Create Release Alpha
        if: "contains(github.ref, '-alpha.')"
        id: create_release_prepro
        run: npx @capgo/cli@latest upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

This will install and build your dependency before sending it to Capgo.

If your command for build is different you can change it in the `build_code` step.

If you need env var use the `MY_ENV_VAR` and set the secret in your github project setting, then secret then Github Action.

If don't remove it.

To make Capgo upload work, you need to get your API key for Capgo add it in the [secret of your GitHub repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets) as `CAPGO_TOKEN`.

You can now commit this both file and see your first version appear in Capgo!

Add the commit will generate a new build for production and development channel.

You should add your test in the build step to be sure your code is working.

Go To your Capgo dashboard and check your build who just appear, you now have you own CI/CD system.