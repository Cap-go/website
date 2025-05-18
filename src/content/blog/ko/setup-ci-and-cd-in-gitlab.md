---
slug: setup-ci-and-cd-gitlab
title: GitLab으로 앱 자동 빌드 및 릴리스하기
description: >-
  Crea la tua pipeline CI/CD con GitLab gratuitamente e distribuisci la tua
  applicazione Ionic Capacitor JS ad ogni push su main.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: GitLab의 CI/CD
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ko
next_blog: ''
---

이 문서는 GitLab을 사용한 CI/CD 파이프라인 설정 방법을 안내합니다.

## 서문

먼저 Capacitor 앱을 Capgo에 추가했는지 확인하세요. 이 튜토리얼은 업로드 단계에만 초점을 맞추고 있습니다. Capgo에 앱을 추가하는 방법은 이 [Tutorial](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)을 참고하세요.

## 커밋 규칙

먼저 [conventional commits](https://wwwconventionalcommitsorg/en/v100/) 커밋 규칙을 따르기 시작해야 합니다. 이는 도구가 버전 번호를 어떻게 업그레이드할지 이해하는데 도움이 되며, 5분이면 배울 수 있습니다.

![Conventional commits](/conventional_commits.webp)

## 태그를 위한 GitLab CI/CD

GitLab 저장소의 루트에 다음 내용으로 gitlab-ci.yml 파일을 생성하세요.

      
     stages:
          - tag

     bump_version:
       stage: tag
       only:
         - main
      except:
        variables:
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
      script:
       - git config --global user.email "gitlab@yourdomain.com"
       - git config --global user.name "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

스크립트 섹션에서 "gitlab@yourdomain.com"과 "GitLab CI/CD"를 귀하의 GitLab 이메일과 사용자 이름으로 바꾸세요. 이 설정은 main 브랜치에 푸시할 때만 작업을 트리거하고 "chore(release):"로 시작하는 커밋 메시지는 제외합니다.

## 빌드를 위한 GitLab CI/CD

gitlab-ci.yml 파일에 빌드를 위한 다른 단계를 추가하세요:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # 이 작업은 태그 푸시에서만 실행됩니다
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # GitLab 프로젝트 설정에서 이것을 정의하세요
         environment:
           name: production

GitLab 프로젝트의 CI/CD 변수에 Capgo API 키(CAPGO_TOKEN)가 추가되어 있는지 확인하세요. GitLab의 프로젝트로 이동하여 설정 > CI/CD > 변수로 이동한 다음, CAPGO_TOKEN이라는 이름의 변수를 API 키 값과 함께 추가하세요.

npm run build 명령을 변경하는 등 특정 프로젝트의 빌드 프로세스에 맞게 빌드 스크립트를 사용자 정의하세요.

## 결론

여기까지 입니다! 우리는 기술 여정에서 한 걸음 더 나아갔습니다. 현대 소프트웨어 개발에서 CI/CD는 필수적으로 고려해야 할 요소입니다. 이 가이드라인이 모든 분들께 도움이 되길 바랍니다.