---
title: "서비스 계정"
keywords: 'Super Kubenetes, Kubernetes, Service Accounts'
description: 'Learn how to create service accounts on Super Kubenetes.'
linkTitle: "Service Accounts"
weight: 10440
---

[서비스 계정](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)은 파드에서 실행되는 프로세스에 대한 ID를 제공합니다. 클러스터에 접근할 때 사용자는 특정 사용자 계정으로 API 서버에 의해 인증됩니다. 파드 내부 컨테이너의 프로세스는 이러한 프로세스가 API 서버에 접속할 때 특정 서비스 계정으로 인증됩니다.

이 문서는 Super Kubenetes에서 서비스 계정을 생성하는 방법을 설명합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 만들고 사용자를 프로젝트에 초대하고 `operator` 역할을 할당해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 서비스 계정 생성

1. Super Kubenetes 콘솔에 `project-regular`로 로그인하고 **프로젝트**를 클릭하세요.

2. 서비스 계정을 생성할 프로젝트를 선택하세요.

3. 왼쪽 탐색 창에서 **설정** > **서비스 계정**을 선택하세요.  **서비스 계정** 페이지에서, 프로젝트 생성 시 자동으로 생성된 서비스 계정 `default`를 볼 수 있습니다. 

  <div className="notices note">
    <p>Note</p>
    <div>
      프로젝트에서 워크로드를 생성할 때 어떠한 서비스 계정도 지정하지 않은 경우, 동일한 프로젝트의 서비스 계정 `default`가 자동으로 할당됩니다.
    </div>
  </div>

4. **생성**을 클릭하세요. 표시된 **서비스 계정 생성** 대화 상자에서 다음 파라미터를 설정합니다.

- **이름**(필수): 서비스 계정의 고유 식별자를 지정.
- **별칭**: 서비스 계정을 더 잘 식별할 수 있도록 서비스 계정의 별칭을 지정.
- **설명**: 서비스 계정을 간략하게 소개.
- **프로젝트 역할**: 드롭다운 목록에서 서비스 계정에 대한 프로젝트 역할을 선택. 프로젝트 역할마다 [다른 권한](../../../project-administration/role-and-member-management/#built-in-roles)이 있습니다.

5. 파라미터 설정을 마친 후 **생성**을을 클릭하세요. 생성된 서비스 계정은 **서비스 계정** 페이지에 표시됩니다.

## 서비스 계정의 세부정보 페이지 보기

1. 왼쪽 탐색 창에서 **설정** > **서비스 계정**을 선택하세요. 생성된 서비스 계정을 클릭하여 세부정보 페이지로 이동합니다.

2. **정보 편집**을 클릭하여 기본 정보를 편집하거나, 또는 **더보기**를 클릭하여 다음 작업을 수행하세요.
   - **YAML 편집**: YAML 파일을 보거나 업데이트하거나 다운로드.
   - **역할 변경**: 서비스 계정의 프로젝트 역할을 변경.
   - **삭제**: 서비스 계정을 삭제.
   
3. 오른쪽의 **리소스 상태** 탭에서 시크릿의 세부 정보와 서비스 계정의 kubeconfig를 확인하세요.


