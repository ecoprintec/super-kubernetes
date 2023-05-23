---
title: "Super Kubenetes에서 Minio 배포"
keywords: 'Kubernetes, Super Kubenetes, Minio, app-store'
description: 'Learn how to deploy Minio from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy MinIO on Super Kubenetes"
weight: 14240
---
[MinIO](https://min.io/) 오브젝트 스토리지는 고성능과 S3 API를 위해 디자인되었습니다. 엄격한 보안 요구사항이 있는 대규모 프라이빗 클라우드 환경에 이상적이며 다양한 워크로드에서 미션 크리티컬 가용성을 제공합니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 MinIO를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 MinIO 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. MinIO를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다..

3. 이름을 설정하고 앱 버전을 선택하세요. MinIO가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서는 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 계속하려면 **설치**를 클릭하세요.

5. MinIO가 실행될 때까지 기다립니다.

### 2단계: MinIO 브라우저 접속하기

클러스터 외부의 MinIO에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 MinIO의 서비스 이름을 클릭합니다.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [Project Gateway](../../../project-administration/project-gateway/)를 참조하십시오.

4. **서비스** 페이지에서, **MinIO**를 클릭하세요. 표시되는 페이지의 **Ports** 아래에서 포트가 노출된 것을 확인할 수 있습니다.

5. MinIO 브라우저에 액세스하려면 MinIO의 구성 파일에 지정된 `accessKey` 와 `secretKey`가 필요합니다. **Apps**의 **Template-Based Apps**로 이동하여 MinIO를 클릭하면 **차트 파일** 탭에서 이 두 영역의 값을 확인할 수 있습니다.

6. `accessKey` 및 `secretKey`를 사용하여 `<NodeIP>:<NodePort>`를 통해 MinIO 브라우저에 액세스합니다.

   ![minio-browser](/dist/assets/docs/v3.3/appstore/built-in-apps/minio-app/minio-browser.png)

   ![minio-browser-interface](/dist/assets/docs/v3.3/appstore/built-in-apps/minio-app/minio-browser-interface.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


7. MinIO에 대한 자세한 내용은 [공식 MinIO 문서](https://docs.min.io/)를 참조하시기 바랍니다.
