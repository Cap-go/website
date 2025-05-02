---
slug: github-actions로-개발-및-프로덕션-빌드-관리
title: GitHub 액션으로 개발 및 프로덕션 빌드 관리
description: >-
  Capgo를 사용하여 특정 채널에 devbuild를 릴리스하고, Apple과 Google의 검토를 기다리지 않고도 팀이 Capacitor
  Ionic 앱을 테스트할 수 있습니다
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: 채널 빌드 일러스트레이션
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: ko
next_blog: how-to-send-specific-version-to-users
original_slug: manage-dev-and-prod-build-with-github-actions
---
이 튜토리얼은 GitHub 호스팅에 중점을 두고 있지만, 약간의 수정으로 다른 CI/CD 플랫폼에도 적용할 수 있습니다.

## 시작하기 전에

먼저 Capacitor 앱을 Capgo에 추가했는지 확인하세요. 이 튜토리얼은 업로드 단계에만 중점을 둡니다.

## 커밋 규칙

먼저 [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) 커밋 규칙을 따라야 합니다. 이는 버전 번호를 업그레이드하는 방법을 도구가 이해하는 데 도움이 됩니다. 5분이면 배울 수 있습니다.

![Conventional commits](/conventional_commits.webp)

## 태그를 위한 GitHub 액션

그런 다음 자동으로 빌드하고 태그를 생성하는 첫 번째 GitHub 액션을 만들어야 합니다.

다음 경로에 파일을 생성하세요: `.github/workflows/bump_version.yml`

다음 내용으로:

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
        uses: actions/checkout@v4
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

이것은 main 브랜치의 모든 커밋에 대해 태그를 릴리스하고, `development`에 대해 `alpha` 릴리스를, 그리고 마지막으로 `CHANGELOG.md`의 각 커밋에 대한 변경 로그 항목을 생성합니다.

이 파일이 없더라도 걱정하지 마세요. 자동으로 생성됩니다.

이 기능이 작동하려면 [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/)를 생성하여 GitHub [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets")에 `PERSONAL_ACCESS_TOKEN`으로 추가해야 합니다.

이는 CI가 변경 로그와 버전 범프를 커밋할 수 있도록 하는 데 필요합니다.

토큰을 생성할 때 만료를 `never`로, 범위를 `repo`로 선택하세요.

`package.json` 파일의 `version` 키를 설정하세요. 스토어에서 릴리스된 최신 버전을 사용하세요.

이는 처음에만 필요하며, 이후에는 도구가 자동으로 업데이트합니다.

이제 두 파일을 커밋하고 GitHub에서 첫 번째 태그가 나타나는 것을 확인할 수 있습니다!

`capacitor-standard-version`은 마법을 부리는 패키지입니다. 기본적으로 Android와 iOS의 버전 번호도 업데이트합니다.

## 빌드를 위한 GitHub 액션

다음 경로에 파일을 생성하세요: `.github/workflows/build.yml`

다음 내용으로:

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
        uses: actions/checkout@v4
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
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

이는 의존성을 설치하고 빌드한 후 Capgo로 전송합니다.

빌드 명령어가 다르다면 `build_code` 단계에서 변경할 수 있습니다.

환경 변수가 필요하다면 `MY_ENV_VAR`를 사용하고 GitHub 프로젝트 설정의 secret에서 GitHub Action을 설정하세요.

Capgo 업로드가 작동하려면 Capgo API 키를 가져와서 [GitHub 저장소의 secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets/)에 `CAPGO_TOKEN`으로 추가해야 합니다.

이제 두 파일을 커밋하고 Capgo에서 첫 번째 버전이 나타나는 것을 확인할 수 있습니다!

커밋을 추가하면 프로덕션과 개발 채널을 위한 새로운 Capacitor 빌드가 생성됩니다.

코드가 작동하는지 확실히 하기 위해 Ionic 빌드 단계에 테스트를 추가해야 합니다.

Capgo 대시보드로 이동하여 방금 나타난 빌드를 확인하세요. 이제 CI/CD 시스템이 구축되었습니다.
