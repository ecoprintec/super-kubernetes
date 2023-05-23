---
title: " Super Kubenetes의 쿠버네티스 시크릿"
keywords: 'Super Kubenetes, Kubernetes, Secrets'
description: 'Learn how to create a Secret on Super Kubenetes.'
linkTitle: "Secrets"
weight: 10410
---

쿠버네티스 [시크릿](https://kubernetes.io/docs/concepts/configuration/secret/)은 비밀번호, OAuth 토큰, SSH 키와 같은 민감한 정보를 저장하고 관리하는 데 사용됩니다. 시크릿을 사용하려면 파드가 [다음 방법](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets) 중 하나를 참조해야 합니다.

- 파드에서 실행되는 컨테이너화된 애플리케이션에 의해 마운트되고 사용되는 볼륨의 파일로서.
- 파드의 컨테이너에서 사용하는 환경 변수로서.
- kubelet이 파드에 대해 이미지를 가져올 때 이미지 레지스트리 자격 증명으로서.

이 튜토리얼은 Super Kubenetes에서 시크릿을 생성하는 방법을 시연합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 쿠버네티스 시크릿 생성

### 1단계: 대시보드 열기

콘솔에 `project-regular`로 로그인하세요. 프로젝트의 **설정**으로 이동하여 **시크릿**을 선택하고 **생성**을 클릭하세요.

### 2단계: 기본 정보 입력

시크릿 이름(예: `demo-secret`)을 지정하고 **다음**을 클릭하여 계속합니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       우측 상단 모서리의 **YAML 편집**을 활성화하면 시크릿의 매니페스트 파일을 YAML 형식으로 볼 수 있습니다. Super Kubenetes를 사용하면 매니페스트 파일을 직접 편집하여 시크릿을 생성할 수 있습니다. 그게 아니면, 아래 단계에 따라 대시보드를 통해 시크릿을 생성할 수 있습니다.
     </div>
   </div>



### 3단계: 시크릿 설정

1. **데이터 설정** 탭에서 시크릿 유형을 선택해야 합니다. Super Kubenetes에서는 `유형` 영역으로 지정되는, 아래의 쿠버네티스 시크릿 유형을 생성할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      모든 시크릿 유형에 대해, 매니페스트의 `data` 영역 아래에 있는 모든 키의 값은 base64로 인코딩된 문자열이어야 합니다. Super Kubenetes 대시보드에서 값을 지정하고 나면, Super Kubenetes는 YAML 파일에서 해당 값을 base64 문자 값으로 변환합니다. 예를 들어, 기본 유형의 시크릿을 생성할 때 **데이터 편집** 페이지에서 **키**와 **값**에 각각 `password`와 `hello123`을 입력하면, YAML 파일에서 실제 표시되는 값은 `aGVsbG8xMjM=`(즉, base64 형식의 `hello123`)이며, 이것은 Super Kubenetes에서 자동으로 생성됩니다.
    </div>
  </div>

   - **기본**. 쿠버네티스의 [Opaque](https://kubernetes.io/docs/concepts/configuration/secret/#opaque-secrets) 유형이며, 쿠버네티스의 기본 시크릿 유형이기도 합니다. 이 유형의 시크릿에 대해 임의의 사용자 정의 데이터를 생성할 수 있습니다. 키-값 쌍을 추가하려면 **데이터 추가**를 클릭하세요.

   - **TLS 정보**. 일반적으로 사용되는 인증서 및 관련 키를 저장하는 데 사용되는 쿠버네티스의 [kubernetes.io/tls](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) 유형으로, 입력 리소스의 TLS 종료와 같이 일반적으로 TLS에 사용되는 인증서 및 관련 키를 저장하는 데 사용됩니다. 여기에는, YAML 파일에서 각각, `tls.crt` 및 `tls.key`로 표시된 **자격 증명** 및 **프라이빗 키**를 지정해야 합니다.

   - **이미지 레지스트리 정보**. 쿠버네티스의 [kubernetes.io/dockerconfigjson](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets) 유형으로, 이미지를 위한 Docker 레지스트리에 접속하기 위한 자격 증명을 저장하는 데 사용됩니다. 자세한 내용은 [이미지 레지스트리](../image-registry/)를 참조하십시오.

   - **사용자 이름과 비밀번호**. 쿠버네티스의 [kubernetes.io/basic-auth](https://kubernetes.io/docs/concepts/configuration/secret/#basic-authentication-secret) 유형으로, 기본 인증에 필요한 자격 증명을 저장하는 데 사용됩니다. 여기에는, YAML 파일에서 각각 `username`과 `password`로 표시된 **사용자 이름**과 **비밀번호**를 지정해야 합니다.

2. 이 튜토리얼에서는 기본 유형의 시크릿을 선택하세요. **데이터 추가**를 클릭하고 **키**(`MYSQL_ROOT_PASSWORD`) 및 **값**(`123456`)을 입력하여 MySQL에 대한 시크릿을 지정합니다.

3. 승인을 위해 우측 하단 모서리에 있는 **√**를 클릭하세요. 계속해서 키-값 쌍을 시크릿에 추가하거나 **생성**을 클릭하여 생성을 완료할 수 있습니다. 시크릿 사용 방법에 대한 자세한 내용은 [워드프레스 작성 및 배포](../../../quick-start/wordpress-deployment/#task-3-create-an-application)를 참조하세요.

## 시크릿 정보 확인

1. 시크릿이 생성되면 목록에 표시됩니다. 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/configurations/secrets/three-dots.png" width="20px" alt="icon" />를 클릭하고, 메뉴에서 작업을 선택하여 이를 수정할 수 있습니다.

    - **정보 편집**: 기본 정보를 조회 및 편집.
    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **설정 편집**: 시크릿의 키-값 쌍을 수정.
    - **삭제**: 시크릿을 삭제.

2. 시크릿의 이름을 클릭하면 그 시크릿의 세부 정보 페이지로 이동할 수 있습니다. **데이터** 탭에서 시크릿에 추가한 모든 키-값 쌍을 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      위에서 언급했듯이 Super Kubenetes는 키 값을 해당 base64 문자 값으로 자동 변환합니다. 실제 디코딩된 값을 보려면, 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/configurations/secrets/eye-icon.png" width="20px" alt="icon" />을 클릭하세요.
    </div>
  </div>

3.	이 시크릿에 대해 수행할 수 있는 작업을 표시하려면 **더 보기**를 클릭하세요.

    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **설정 편집**: 시크릿의 키-값 쌍을 수정.
    - **삭제**: 시크릿을 삭제하고 목록 페이지로 돌아갑니다.

## 쿠버네티스 시크릿을 사용하는 방법

일반적으로 워크로드, [서비스](../../../project-user-guide/application-workloads/services/), [잡](../../../project-user-guide/application-workloads/jobs/) 또는 [크론잡](../../../project-user-guide/application-workloads/cronjobs/)을 생성할 때는 시크릿을 사용해야 합니다.
예를 들면, 코드 리포지토리에 대한 시크릿을 선택할 수 있습니다. 자세한 내용은 [이미지 레지스트리](../image-registry/)를 참조하십시오.

그게 아니면, 컨테이너에 대한 환경 변수를 추가해야 할 수도 있습니다. **컨테이너 이미지** 페이지에서 **환경 변수**를 선택하고 **시크릿에서**를 클릭하여 목록에서 시크릿을 사용하세요.

## 가장 흔한 시크릿 생성

이 섹션에서는 Docker Hub 계정 및 GitHub 계정에서 시크릿을 생성하는 방법을 시연합니다.

### Docker Hub 시크릿 생성

1. `project-regular`로 Super Kubenetes에 로그인하고 프로젝트로 이동합니다. 내비게이션 바에서 **시크릿**을 선택하고 오른쪽의 **생성**을 클릭하세요.

2. `dockerhub-id`와 같은 이름을 설정하고, **다음**을 클릭하세요. **데이터 설정** 페이지에서 다음 영역을 채우고 **승인**을 클릭하여 제공된 정보가 유효한지 확인하세요.

   **유형**: **이미지 레지스트리 정보**를 선택하세요.

   **레지스트리 주소**: `docker.io`와 같은 Docker Hub 레지스트리 주소를 입력하세요.

   **사용자 이름**: Docker ID를 입력하세요.

   **비밀번호**: Docker Hub 비밀번호를 입력하세요.

3. **생성**을 클릭하여 완료합니다.

### GitHub 시크릿 생성

1. `project-regular`로 Super Kubenetes에 로그인하고 프로젝트로 이동합니다. 내비게이션 바에서 **시크릿**을 선택하고 오른쪽의 **생성**을 클릭하세요.

2. `github-id`와 같은 이름을 설정하고 **다음**을 클릭하세요. **데이터 설정** 페이지에서 다음 영역을 입력합니다.

   **유형**: **사용자 이름 및 비밀번호**를 선택하세요.

   **사용자 이름**: GitHub 계정을 입력하세요.

   **비밀번호**: GitHub 비밀번호를 입력하세요.

3. **생성**을 클릭하여 완료합니다.

