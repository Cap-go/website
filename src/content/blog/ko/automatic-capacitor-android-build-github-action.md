---
slug: automatic-capacitor-android-build-github-action
title: GitHub 액션을 사용한 자동 Capacitor Android 빌드
description: 5분 안에 fastlane과 GitHub Actions를 사용하여 Android Capacitor 앱의 CI/CD 파이프라인 설정하기
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2024-06-01T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google play GitHub 작업 일러스트레이션
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: ko
next_blog: automatic-capacitor-ios-build-github-action
---
# GitHub Actions를 통한 자동 Android 빌드

Capacitor 앱을 위한 CI/CD 설정은 복잡하고 시간이 많이 소요될 수 있습니다. 다음은 알아야 할 사항입니다:

## 사전 요구사항

시작하기 전에 다음이 필요합니다:

- 관리자 권한이 있는 GitHub 계정
- Google Play Store에 이미 게시된 앱과 적절한 서명
- Android 서명 키와 키스토어 파일
- Play Store API가 활성화된 Google Cloud Console 프로젝트
- 적절한 권한이 있는 서비스 계정
- GitHub Actions 워크플로우에 대한 이해
- Fastlane 구성에 대한 지식
- 파이프라인 유지보수 및 디버깅을 위한 시간

## Capgo의 전문 CI/CD 설정

복잡성을 건너뛰세요. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/)가 선호하는 플랫폼에서 직접 CI/CD 파이프라인을 구성합니다:

- **플랫폼 독립성**: GitHub Actions, GitLab CI 등에서 작동
- **원활한 통합**: 플랫폼 전환이 필요 없으며 현재 프로세스와 함께 작동
- **맞춤형 구성**: 프로젝트 요구사항에 맞는 맞춤 설정
- **전문가 가이드**: 이미 50개 이상의 앱에 대한 CI/CD 설정 경험

### 가격
- 일회성 설정 비용: $2,600
- 운영 비용: ~$300/년
- 다른 독점 솔루션과 비교: $6,000/년
- **5년 동안 $26,100 절약**

[지금 CI/CD 설정하기](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## 수동 설정 가이드

직접 모든 것을 설정하고 싶다면, 다음과 같이 해야 합니다:

## GitHub Actions 가격

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions는 저장소 유형에 따라 무료 시간을 제공합니다:
- 공개 저장소: 월 2,000분
- 비공개 저장소: 월 2,000분 (Linux 러너)

비공개 프로젝트의 경우, 비용은 약 분당 $0.008입니다. 일반적인 빌드는 3-5분이 소요됩니다.

## 수동 설정 단계

1. Fastlane 설정
2. GitHub 시크릿 구성
3. GitHub Actions 워크플로우 생성

## 1. Fastlane 설정

프로젝트 루트에 `fastlane` 폴더를 생성하고 다음 내용으로 `Fastfile`을 추가하세요:

```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    
    lane :beta do
        keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
        File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
        json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
            'versionCode' => current_build_number
          })
        
        # Upload to Play Store
        upload_to_play_store(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            json_key_data: json_key_data,
            track: 'internal',
            release_status: 'completed',
            skip_upload_metadata: true,
            skip_upload_changelogs: true,
            skip_upload_images: true,
            skip_upload_screenshots: true,
        )
    end
end
```

## 2. GitHub 시크릿 구성

GitHub에서 민감한 정보를 안전하게 저장해야 합니다. 저장소 → Settings → Secrets and variables → Actions → New repository secret으로 이동하세요.

### 필수 시크릿:

1. **Google Play 서비스 계정 키**
   - Google Cloud Console에서 서비스 계정 생성
   - Google Play Developer API 활성화
   - Play Console에서 서비스 계정에 앱 접근 권한 부여
   - JSON 키 파일 다운로드
   - base64로 변환: `base64 service_account_key.json | pbcopy`
   - `PLAY_CONFIG_JSON`로 추가

2. **Android 서명 키**
   - 키스토어를 base64로 변환: `base64 your_keystore.jks | pbcopy`
   - `ANDROID_KEYSTORE_FILE`로 추가
   - 키스토어 상세 정보 추가:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (예: com.example.app)

## 3. GitHub Actions 워크플로우 생성

`.github/workflows/build-upload-android.yml` 생성:

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## 작동 방식

1. 워크플로우를 트리거하기 위한 Git 태그 생성
2. GitHub Actions가 앱을 빌드
3. Fastlane이 Google Play 베타 채널에 업로드
4. 앱이 자동으로 업데이트됨

## 빌드 시간 및 비용

- 빌드 시간: 3-5분
- 비공개 저장소 비용: 빌드당 약 $0.04
- 오픈소스 프로젝트는 무료

## 리소스

- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
