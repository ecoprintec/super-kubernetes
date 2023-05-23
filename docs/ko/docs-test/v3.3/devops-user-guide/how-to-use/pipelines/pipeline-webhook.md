---
title: '웹훅을 사용하여 파이프라인 트리거'
keywords: 'Kubernetes, DevOps, Jenkins, Pipeline, 웹훅'
description: 'Learn how to trigger a Jenkins pipeline by using a 웹훅.'
linkTitle: 'Trigger a Pipeline by Using a 웹훅'
weight: 11219
---

원격 코드 저장소에서 Jenkinsfile 기반 파이프라인을 생성하는 경우 원격 저장소가 변경될 때 파이프라인이 자동으로 트리거되도록 원격 저장소에서 웹훅을 설정할 수 있습니다.

이 튜토리얼에서는 웹훅을 사용하여 파이프라인을 트리거하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 계정을 DevOps 프로젝트에 초대하고 `운영자` 역할을 할당해야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)를 참조하십시오.

- 원격 코드 저장소에서 Jenkinsfile 기반 파이프라인을 생성해야 합니다. 자세한 내용은 [Jenkinsfile을 사용하여 파이프라인 생성](../create-a-pipeline-using-jenkinsfile/)을 참조하십시오.

## 웹훅 설정

### 웹훅 URL 가져오기

1. Super Kubenetes 웹 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하고 파이프라인(예: `jenkins-in-scm`)을 클릭하여 세부 정보 페이지로 이동합니다.

2. **더보기**를 클릭하고 드롭다운 목록에서 **설정 편집**을 선택하세요.

3. 표시된 대화 상자에서 **웹훅**까지 아래로 스크롤하여 웹훅 푸시 URL을 가져옵니다.

### GitHub 저장소에 웹훅 설정

1. GitHub에 로그인하고 자신의 저장소 `devops-maven-sample`로 이동하세요.

2. **설정**, **웹훅**, **웹훅 추가**를 차례로 클릭하세요.

3. **페이로드 URL**에 대한 파이프라인의 웹훅 푸시 URL을 입력하고 **웹훅 추가**를 클릭하세요. 이 튜토리얼에서는 데모 목적으로 **푸시 이벤트만**을 선택합니다. 필요에 따라 다른 설정을 할 수 있습니다. 자세한 내용은 [GitHub 문서](https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks)를 참조하세요.

4. 설정된 웹훅이 **웹훅** 페이지에 표시됩니다.

## 웹훅을 사용하여 파이프라인 트리거

### 저장소에 가져오기 요청 제출

1. 자신의 저장소의 **코드** 페이지에서 **마스터**를 클릭한 다음 **sonarqube** 브랜치를 선택하세요.

2. `/deploy/dev-ol/`로 이동하여 `devops-sample.yaml` 파일을 클릭하세요.

3. <img src="/dist/assets/docs/v3.3/devops-user-guide/using-devops/pipeline-webhook/edit-btn.png" width="20px" alt="icon" />클릭하여 파일을 편집하세요. 예를 들면, `spec.replicas`의 값을 `3`으로 변경하세요.

4. 페이지 하단의 **변경사항 커밋**을 클릭하세요.

### 웹훅 전달 확인

1. 자신의 저장소의 **웹훅** 페이지에서 웹훅을 클릭하세요.

2. **최근 배송**을 클릭하고 특정 배송 기록을 클릭하여 세부 정보를 봅니다.

### 파이프라인 확인

1. Super Kubenetes 웹 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하여 파이프라인을 클릭하세요.

2. **실행 기록** 탭에서 원격 저장소의 `sonarqube` 브랜치에 제출된 가져오기 요청에 의해 새 실행이 트리거되었는지 확인하세요.

3. `Super Kubenetes-sample-dev` 프로젝트의 **파드** 페이지로 이동하여 3개의 파드 상태를 확인하세요. 3개의 파드가 실행 중이면 파이프라인이 제대로 실행되고 있는 것입니다.
