---
title: "S2I 및 B2I Webhook 설정"
keywords: 'Super Kubenetes, Kubernetes, S2I, Source-to-Image, B2I, Binary-to-Image, Webhook'
description: 'Learn how to configure S2I and B2I webhooks.'
linkTitle: "Configure S2I and B2I Webhooks"
weight: 10650
---

Super Kubenetes는 S2I(Source-to-Image) 및 B2I(Binary-to-Image) 기능을 제공하여 이미지 빌드 및 푸시 그리고 애플리케이션 배포를 자동화합니다. Super Kubenetes에서는, 코드 리포지토리에 관련 활동이 있을 때 이미지 빌더가 자동으로 트리거될 수 있도록 S2I 및 B2I 웹훅을 설정할 수 있습니다.

이 튜토리얼에서는 S2I 및 B2I 웹훅을 설정하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템](../../../pluggable-components/devops/)을 활성화해야 합니다.
- 워크스페이스, 프로젝트(`demo-project`) 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- S2I 이미지 빌더와 B2I 이미지 빌더를 생성해야 합니다. 자세한 내용은 [Source to Image: Dockerfile 없이 앱 게시](../source-to-image/) 및 [Binary to Image: 쿠버네티스에 아티팩트 게시](../binary-to-image/)를 참조하십시오.

## S2I 웹훅 설정

### 1단계: S2I 트리거 서비스 노출

1. Super Kubenetes 웹 콘솔에 `admin`으로 로그인하세요. 왼쪽 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요.

2. **애플리케이션 워크로드** 아래의 **서비스**의 드롭다운 목록에서 **Super Kubenetes-devops-system**을 선택하고 **s2ioperator-trigger-service**를 클릭하여 세부 정보 페이지로 이동하세요.

3. **더보기**를 클릭하고 **외부 접속 편집**을 선택하세요.

4. 표시된 대화 상자에서 **접속 방법**의 드롭다운 목록에서 **NodePort**를 선택한 다음 **확인**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 튜토리얼에서는 시연용으로 **NodePort**를 선택합니다. 필요에 따라 **LoadBalancer**를 선택할 수도 있습니다.
    </div>
  </div>

5. 세부 정보 페이지에서 **NodePort**를 볼 수 있습니다. 이것은 S2I 웹훅 URL에 포함될 것입니다.

### 2단계: S2I 웹훅 설정

1. Super Kubenetes에서 로그아웃하고 `project-regular`로 다시 로그인하세요. `데모 프로젝트`로 이동하세요.

2. **이미지 빌더**에서 S2I 이미지 빌더를 클릭하여 세부 정보 페이지로 이동하세요.

3. **리모트 트리거**에서 자동 생성된 링크를 볼 수 있습니다. S2I 웹훅 URL에 포함될 `/s2itrigger/v1alpha1/general/namespaces/demo-project/s2ibuilders/felixnoo-s2i-sample-latest-zhd/`를 복사하세요.

4. GitHub 계정에 로그인하고 S2I 이미지 빌더에 사용되는 소스 코드 리포지토리로 이동합니다. **설정** 아래의 **웹훅**으로 이동한 다음 **웹훅 추가**를 클릭하세요.

5. **페이로드 URL**에 `http://<IP>:<Service NodePort>/s2itrigger/v1alpha1/general/namespaces/demo-project/s2ibuilders/felixnoo-s2i-sample-latest-zhd/`를 입력하세요. 필요에 따라 트리거 이벤트를 선택할 수 있으며, 그 다음 **웹훅 추가**를 클릭하세요. 이 튜토리얼에서는 시연 목적으로 **푸시 이벤트만** 선택합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      `<IP>`는 자신의 IP 주소이고, `<Service NodePort>`는 1단계에서 얻은 NodePort이며, `/s2itrigger/v1alpha1/general/namespaces/demo-project/s2ibuilders/felixnoo-s2i-sample-latest -zhd/`는 S2I 리모트 트리거 링크에서 왔습니다. 반드시 자신의 IP, Service NodePort, S2I 리모트 트리거 링크를 사용하십시오. 쿠버네티스 클러스터가 배포된 위치에 따라 필요한 포트 포워딩 규칙을 설정하고 보안 그룹에서 포트를 열어야 할 수도 있습니다.
    </div>
  </div>

6. 웹훅이 추가되고 나면, 웹훅을 클릭하여 **최근 전송**에서 전송 내역을 볼 수 있습니다. 페이로드 URL이 유효한 경우 녹색 체크 표시를 볼 수 있습니다.

7. 위의 모든 작업을 완료한 후 소스 코드 리포지토리에 푸시 이벤트가 있는 경우 S2I 이미지 빌더가 자동으로 트리거됩니다.

## B2I 웹훅 설정

동일한 단계에 따라 B2I 웹훅을 설정할 수 있습니다.

1. S2I 트리거 서비스를 노출하세요.

2. B2I 이미지 빌더의 세부 정보 페이지에서 **리모트 트리거**를 확인하세요.

3. 소스 코드 리포지토리에 페이로드 URL을 추가하세요. B2I 페이로드 URL 형식은 S2I 페이로드 URL 형식과 동일합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 배포된 위치에 따라 필요한 포트 포워딩 규칙을 구성하고 보안 그룹에서 포트를 열어야 할 수 있습니다.
    </div>
  </div>

4. 소스 코드 리포지토리에 관련 이벤트가 있는 경우 B2I 이미지 빌더가 자동으로 트리거됩니다.




