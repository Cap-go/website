---
slug: automatic-capacitor-android-build-gitlab
title: GitLab을 통한 자동 Capacitor Android 빌드
description: 5분 안에 fastlane과 GitLab을 사용하여 Android Ionic 앱의 CI/CD 파이프라인 설정하기
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: GitLab과 구글 플레이 Fastlane 일러스트
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: ko
next_blog: null
---
# GitLab CI를 사용한 자동 Android 빌드

Capacitor 앱의 CI/CD 설정은 복잡하고 시간이 많이 소요될 수 있습니다. 다음은 알아야 할 사항입니다:

## 사전 요구사항

시작하기 전에 다음이 필요합니다:

- 관리자 권한이 있는 GitLab 계정
- Google Play Store에 이미 게시된 앱과 적절한 서명
- Android 서명 키와 키스토어 파일
- Play Store API가 활성화된 Google Cloud Console 프로젝트
- 적절한 권한이 있는 서비스 계정
- GitLab CI/CD 워크플로우에 대한 이해
- Fastlane 구성에 대한 지식
- 파이프라인 유지보수 및 디버깅을 위한 시간

## Capgo의 전문 CI/CD 설정

복잡성을 건너뛰세요. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/)가 선호하는 플랫폼에서 직접 CI/CD 파이프라인을 구성합니다:

- **플랫폼 독립성**: GitHub Actions, GitLab CI 등에서 작동
- **원활한 통합**: 플랫폼 전환이 필요 없으며 현재 프로세스와 함께 작동
- **맞춤형 구성**: 프로젝트 요구사항에 맞는 맞춤 설정
- **전문가 가이드**: 이미 50개 이상의 앱에 대해 CI/CD를 설정했습니다

### 가격
- 일회성 설정 비용: $2,600
- 운영 비용: 연간 ~$300
- 다른 독점 솔루션과 비교: 연간 $6,000
- **5년 동안 $26,100 절약**

[CI/CD 지금 설정하기](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## 수동 설정 가이드

직접 모든 것을 설정하고 싶다면, 다음과 같이 해야 합니다:

**게시물에서 따라야 할 단계**

1. _Fastline 파일 복사_
2. _GitLab 암호화된 시크릿에 시크릿 저장_
3. _Google Play 서비스 계정 키 생성 및 저장_
4. _Android 서명 키 저장_
5. _GitLab 워크플로우 .yml 파일 설정_

## 1. Fastline 파일 복사

Fastlane은 일반적인 모바일 개발 작업을 자동화하기 위해 만들어진 Ruby 라이브러리입니다. Fastlane을 사용하면 일반적으로 Android Studio에서 수행하는 작업을 수행하는 "액션"들을 묶은 사용자 정의 "레인"을 구성할 수 있습니다. Fastlane으로 많은 것을 할 수 있지만, 이 튜토리얼에서는 핵심 액션 몇 가지만 사용할 것입니다.

프로젝트 루트에 Fastlane 폴더를 만들고 다음 파일들을 복사하세요:
Fastlane
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
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
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
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

### GitLab CI/CD 변수에 시크릿 저장하기

GitLab은 GitHub의 리포지토리 시크릿과 유사한 암호화된 CI/CD 변수를 저장하는 방법을 제공합니다. 민감한 정보를 안전하게 저장하려면:

1. GitLab 프로젝트의 설정으로 이동합니다.
2. CI/CD > Variables로 이동합니다.
3. 다음 변수들을 추가합니다:

- ANDROID_KEYSTORE_FILE: Android 빌드에 서명하는 데 사용되는 base64로 인코딩된 `.jks` 또는 `.keystore` 파일
- KEYSTORE_KEY_PASSWORD: 키스토어 파일과 연결된 비밀번호
- KEYSTORE_KEY_ALIAS: 키스토어 별칭
- KEYSTORE_STORE_PASSWORD: 개인 키 비밀번호
- DEVELOPER_PACKAGE_NAME: com.example.app와 같은 안드로이드 앱 ID
- PLAY_CONFIG_JSON: base64로 인코딩된 서비스 계정 키 JSON

### Google Play 서비스 계정 키 생성하기

`PLAY_CONFIG_JSON` 시크릿을 생성하려면 다음 단계를 따르세요:

1. [Google Cloud Console](https://console.cloud.google.com/)로 이동
2. 새 프로젝트를 만들거나 기존 프로젝트를 선택
3. Google Play Android Developer API 활성화
4. 서비스 계정 생성:
   - "IAM 및 관리" > "서비스 계정"으로 이동
   - "서비스 계정 만들기" 클릭
   - 이름과 설명 입력
   - "만들기 및 계속"을 클릭
   - 역할 할당을 건너뛰고 "완료" 클릭
5. JSON 키 생성:
   - 목록에서 서비스 계정 찾기
   - 세 점 메뉴 > "키 관리" 클릭
   - "키 추가" > "새 키 만들기" 클릭
   - JSON 형식 선택
   - "만들기" 클릭
6. Play Console에서 서비스 계정에 앱 접근 권한 부여:
   - [Play Console](https://play.google.com/console)로 이동
   - "사용자 및 권한"으로 이동
   - "새 사용자 초대" 클릭
   - 서비스 계정 이메일 입력 (@*.iam.gserviceaccount.com으로 끝남)
   - "프로덕션 릴리스" 권한 부여
   - "사용자 초대" 클릭
7. JSON 키를 base64로 변환:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. base64로 인코딩된 문자열을 GitLab의 `PLAY_CONFIG_JSON` 변수로 추가

## GitLab CI/CD 파이프라인 설정

프로젝트 루트에 .gitlab-ci.yml 파일을 생성하여 CI/CD 파이프라인을 정의하세요. 다음은 파이프라인 구조의 예시입니다:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## 파이프라인 트리거

GitLab 저장소에 새 태그를 푸시할 때마다, GitLab CI/CD는 정의된 파이프라인을 자동으로 트리거하여 Fastlane을 사용해 Android 앱을 빌드하고 배포합니다.

프로젝트 구조와 요구사항에 따라 경로와 종속성을 조정하세요. 이 설정은 GitLab CI/CD에서 Android 앱 배포를 자동화하는 데 도움이 됩니다.

## 결론

mingc/android-build-box Docker 이미지로 GitLab CI/CD를 구성하면 Android 앱 빌드 프로세스를 자동화하여 개발 워크플로우를 더욱 효율적이고 안정적으로 만들 수 있습니다. 이러한 자동화는 앱 개발의 핵심 측면에 집중할 수 있는 시간을 확보하게 해주어, 궁극적으로 더 효율적으로 고품질 Android 앱을 제공하는 데 도움이 됩니다.
