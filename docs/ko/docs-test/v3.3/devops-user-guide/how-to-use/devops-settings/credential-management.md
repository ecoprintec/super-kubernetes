---
title: "자격 증명 관리"
keywords: 'Kubernetes, Docker, Credential, Super Kubenetes, DevOps'
description: 'Create credentials so that your pipelines can communicate with third-party applications or websites.'
linkTitle: "Credential Management"
weight: 11241
---

자격 증명은 사용자 이름 및 암호, SSH 키 및 토큰과 같은 민감한 정보를 포함하는 개체입니다. Super Kubenetes DevOps 파이프라인이 실행 중일 때 외부 환경의 개체와 상호 작용하여 코드 풀링, 이미지 푸시 및 풀링, 스크립트 실행을 비롯한 일련의 작업을 수행합니다. 이 프로세스 동안 자격 증명이 파이프라인에 명시적으로 표시되지 않는 동안 적절하게 제공되어야 합니다.

필요한 권한이 있는 DevOps 프로젝트 사용자는 Jenkins 파이프라인에 대한 자격 증명을 설정할 수 있습니다. 사용자가 DevOps 프로젝트에서 이러한 자격 증명을 추가하거나 설정하면 DevOps 프로젝트에서 이를 사용하여 서드파티 애플리케이션과 상호 작용할 수 있습니다.

현재 DevOps 프로젝트에서 다음 4가지 유형의 자격 증명을 만들 수 있습니다.

- **사용자 이름 및 암호**: GitHub 및 GitLab 계정과 같이 별도의 컴포넌트 또는 `username:password` 형식의 콜론으로 구분된 문자열로 처리할 수 있는 사용자 이름 및 암호입니다.
- **SSH 키**: 프라이빗 키가 있는 사용자 이름, SSH 퍼블릭/프라이빗 키 쌍.
- **액세스 토큰**: 특정 액세스 권한이 있는 토큰입니다.
- **kubeconfig**: 클러스터 간 인증을 설정하는 데 사용됩니다.

이 튜토리얼은 DevOps 프로젝트에서 자격 증명을 만들고 관리하는 방법을 시연합니다. 자격 증명을 사용하는 방법에 대한 자세한 내용은 [Jenkins 파일을 사용하여 파이프라인 생성](../../..///devops-user-guide/pipeline/create-a-pipeline-using-jenkinsfile/) 및 [그래픽 편집 패널을 사용하여 파이프라인 생성](../../../../devops-user-guide/how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/)을 참조하십시오.

## 사전 준비

- [Super Kubenetes DevOps 시스템](../../../../pluggable-components/devops/)을 활성화했습니다.
- 워크스페이스, DevOps 프로젝트, DevOps 프로젝트에 `operator` 역할로 초대된 사용자(`project-regular`)가 있어야 합니다. 아직 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 자격 증명 생성

Super Kubenetes 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하여 **자격 증명**을 선택하고 **생성**을 클릭하세요.
1. Super Kubenetes 콘솔에 `project-regular`로 로그인하세요.

2. DevOps 프로젝트로 이동하세요. 왼쪽 탐색 창에서 **DevOps 프로젝트 설정 > 자격 증명**을 선택하세요.

3. 우측의 **자격 증명** 영역에서 **생성**을 클릭하세요.

4. **자격증명 생성** 대화 상자에서 자격 증명 이름을 입력하고 자격 증명 유형을 선택하세요. 파라미터는 선택한 유형에 따라 다릅니다. 자세한 내용은 다음을 참조하십시오.

### 사용자 이름 및 암호 자격 증명 생성

GitHub 자격 증명을 설정하려면 다음 파라미터를 설정해야 합니다.

   - **이름**: 자격 증명 이름을 설정합니다(예: `github-id`).
   - **유형**: **사용자 이름 및 비밀번호**를 선택합니다.
   - **사용자 이름**: GitHub 사용자 이름을 입력합니다.
   - **비밀번호/토큰**: GitHub 토큰을 입력합니다.
   - **설명**: 자격 증명을 시연합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    - 2021년 8월부터 GitHub는 서비스에 코드를 제공하는 사용자에 대해 2단계 인증을 요구할 것이라고 발표했습니다. 따라서 GitHub 자격 증명을 생성하려면 암호 대신 GitHub 토큰을 입력해야 합니다. 토큰 생성 방법에 대한 자세한 내용은 [개인용 액세스 토큰 생성](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)을 참조하십시오.

    - 계정이나 비밀번호에 `@`, `$` 등의 특수문자가 있는 경우 인식되지 않아 파이프라인 실행 시 오류가 발생할 수 있습니다. 이 경우 먼저 [urlencoder](https://www.urlencoder.org/)와 같은 일부 서드파티 웹사이트에서 계정 또는 비밀번호를 인코딩해야 합니다. 그런 다음 자격 증명 정보에 대한 출력을 복사하여 붙여넣으세요.
  </div>
</div>

### SSH 키 자격 증명 생성

다음 파라미터를 설정해야 합니다.

- **이름**: 자격증명 이름을 설정합니다.
- **유형**: **SSH 키**를 선택합니다.
- **사용자 이름**: 사용자 이름을 입력합니다.
- **프라이빗 키**: SSH 키를 입력합니다.
- **비밀번호**: 비밀번호를 입력합니다. 보안 강화를 위해 이 파라미터를 설정하는 것이 좋습니다.
- **설명**: 자격 증명을 시연합니다.

### 액세스 토큰 자격 증명 생성

다음 파라미터를 설정해야 합니다.

- **이름**: 자격증명 이름을 설정합니다.
- **유형**: **액세스 토큰**을 선택합니다.
- **액세스 토큰**: 액세스 토큰을 입력합니다.
- **설명**: 자격 증명을 시연합니다.

### kubeconfig 자격 증명 생성

다음 파라미터를 설정해야 합니다.

- **이름**: 자격 증명 이름을 설정합니다(예: `demo-kubeconfig`).
- **유형**: **kubeconfig**를 선택합니다.
- **콘텐츠**: 현재 쿠버네티스 클러스터에 접속하면 시스템이 자동으로 콘텐츠를 채웁니다. 변경할 필요가 없습니다. 그러나 다른 클러스터에 접속하는 경우 kubeconfig의 내용을 변경해야 할 수 있습니다.
- **설명**: 자격 증명을 시연합니다.

<div className="notices info">
  <p>Info</p>
  <div>
    클러스터에 대한 접속를 설정하는 데 사용되는 파일을 kubeconfig 파일이라고 합니다. 이것은 설정 파일을 참조하는 일반적인 방법입니다. 자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)를 참조하십시오.
</div>

## 자격 증명 보기 및 관리

1. 계정 세부 정보 및 자격 증명과 관련된 모든 이벤트를 볼 수 있는 세부 정보 페이지로 이동하려면 이들 중 하나를 클릭하세요.

2. 이 페이지에서 자격 증명을 편집하거나 삭제할 수도 있습니다. 자격 증명을 편집할 때 Super Kubenetes는 기존 사용자 이름 또는 비밀번호 정보를 표시하지 않습니다. 새 사용자 이름과 비밀번호를 입력하면 이전 이름을 덮어씁니다.
