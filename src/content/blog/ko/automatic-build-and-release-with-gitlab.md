---
slug: automatic-build-and-release-with-gitlab
title: Gitlab을 통한 자동 빌드 및 배포
description: GitLab을 사용하여 무료로 자체 CI/CD 파이프라인을 만들고 주요 브랜치에 푸시할 때마다 애플리케이션을 배포하세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Gitlab CI 일러스트레이션
keywords: 'Gitlab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ko
next_blog: ''
---

# GitLab CI에 관한 튜토리얼이지만, 약간의 수정으로 다른 CI/CD 플랫폼에도 적용할 수 있습니다.

## 서문

Capgo에 앱을 먼저 추가했는지 확인하세요. 이 튜토리얼은 업로드 단계에만 초점을 맞추고 있습니다.

## 커밋 컨벤션

먼저 [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)의 커밋 컨벤션을 따라야 합니다. 이는 버전 번호를 업그레이드하는 방법을 도구가 이해하는 데 도움이 됩니다. 배우는 데 5분이면 충분합니다.

![Conventional commits](/conventional_commits.webp)

## 태그를 위한 GitLab CI

그 다음 자동으로 빌드하고 태그를 생성하는 첫 번째 GitLab을 생성해야 합니다.

`github/workflows/bump_version.yml` 경로에 파일을 생성하세요.

다음 내용으로:

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
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
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

이는 메인 브랜치의 모든 커밋에 대해 태그를 릴리스하고 메인 브랜치의 각 커밋에 대해 `CHANGELOG.md`에 변경 로그 항목을 추가합니다.

이 파일이 없어도 걱정하지 마세요. 자동으로 생성됩니다.

이를 작동시키기 위해, [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/)를 생성하고 GitHub [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets")에 `PERSONAL_ACCESS_TOKEN`으로 저장하세요.

이는 CI가 변경 로그를 커밋할 수 있도록 하는데 필요합니다.

토큰을 생성할 때, 만료를 `never`로, 범위를 `repo`로 선택하세요.

마지막으로, 도구가 버전이 저장된 위치를 이해할 수 있도록 저장소의 루트에 `cz.toml` 파일을 생성해야 합니다.

그리고 다음 내용을 추가하세요:

```toml
[tool.commitizen]
name = "cz_conventional_commits"
tag_format = "$major.$minor.$patch$prerelease"
version = "0.11.5"
version_files = [
    "package.json:version",
    ".cz.toml"
]
```

이 파일의 버전을 `package.json` 파일의 버전과 동일하게 설정하세요.

이는 처음에만 필요하며, 이후에는 도구가 자동으로 업데이트합니다.

이제 두 파일을 커밋하고 GitHub에 첫 태그가 나타나는 것을 확인할 수 있습니다!

## 빌드를 위한 GitHub actions

`github/workflows/build.yml` 경로에 파일을 생성하세요.

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
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

이는 의존성을 설치하고 빌드한 후 Capgo로 전송합니다.

빌드 명령어가 다르다면 `build_code` 단계에서 변경할 수 있습니다.

이를 작동시키기 위해, Capgo용 API 키를 얻어서 [GitHub 저장소의 secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets/)에 `CAPGO_TOKEN`으로 추가해야 합니다.

이제 두 파일을 커밋하고 GitHub에 첫 태그가 나타나는 것을 확인할 수 있습니다!

커밋을 추가하면 프로덕션 채널용 새로운 빌드가 생성됩니다.

코드가 작동하는지 확인하기 위해 빌드 단계에 테스트를 추가해야 합니다.

Capgo 대시보드로 가서 방금 나타난 빌드를 확인하세요. 이제 CI/CD 시스템이 구축되었습니다.

모든 사용자가 업데이트가 가능할 때마다 받을 수 있도록 하려면, 채널로 가서 `public`으로 설정하세요.