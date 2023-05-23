---
title: "Helm 저장소 가져오기"
keywords: "Kubernetes, Helm, Super Kubenetes, Application"
description: "Import a Helm repository to Super Kubenetes to provide app templates for tenants in a workspace."
linkTitle: "Import a Helm Repository"
weight: 9310
---

Super Kubenetes는 사용자가 Helm 차트를 기반으로 쿠버네티스 애플리케이션을 사용할 수 있도록 하는 앱 저장소를 구축합니다. 앱 저장소는 클라우드 간 애플리케이션 관리를 위한 오픈 소스 플랫폼인 [OpenPitrix](https://github.com/openpitrix/openpitrix)에서 제공합니다. 앱 저장소에서 모든 애플리케이션은 기본 패키지 라이브러리 역할을 합니다. 앱 저장소에서 앱을 배포하고 관리하려면 저장소를 미리 생성해야 합니다.

저장소를 생성하기 위해 HTTP/HTTPS 서버나 오브젝트 스토리지 솔루션을 사용하여 패키지를 저장합니다. 보다 구체적으로, 앱 저장소는 [MinIO](https://min.io/) 오브젝트 스토리지, [QingStor 오브젝트 스토리지](https://github.com/qingstor), 그리고 [AWS 오브젝트 스토리지](https://aws.amazon.com/what-is-cloud-object-storage/)와 같은 OpenPitrix에 독립적인 외부 스토리지에 의존합니다. 이러한 오브젝트 스토리지 서비스는 개발자가 만든 설정 패키지 및 인덱스 파일을 저장하는 데 사용됩니다. 저장소가 등록된 후 설정 패키지는 배포 가능한 응용 프로그램으로 자동으로 인덱싱됩니다.

이 튜토리얼은 Super Kubenetes에 앱 저장소를 추가하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes 앱 스토어(OpenPitrix)](../../../pluggable-components/app-store/)를 활성화해야 합니다.
- 앱 저장소가 있어야 합니다. 저장소를 생성하거나 [Super Kubenetes 의 퍼블릭 저장소에 자신의 앱을 업로드](../upload-app-to-public-repository/)하세요. 그게 아니면 시연을 위해 아래 단계에서 예제 저장소를 사용합니다.
- 워크스페이스와 사용자(`ws-admin`)를 생성해야 합니다. 사용자는 워크스페이스에서 `workspace-admin` 역할을 부여받아야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.


## 앱 저장소 추가

1. Super Kubenetes의 웹 콘솔에 `ws-admin`으로 로그인하세요. 워크스페이스에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭하세요.

2. 표시되는 대화 상자에서 앱 저장소 이름을 지정하고 저장소 URL을 추가하세요. 예를 들면, `https://charts.Super Kubenetes.io/main`을 입력합니다.

    - **이름**: 사용자가 쉽게 식별할 수 있는 간단하고 명확한 저장소 이름을 설정하세요.
    - **URL**: 다음 세 가지 프로토콜을 지원하는 RFC 3986 사양을 따르십시오:
      - S3: URL은 `s3.<region>.amazonaws.com`와 같은 S3 스타일이고, 이는 S3 인터페이스를 사용하여 Amazon S3 서비스에 액세스하기 위한 것입니다. 이 유형을 선택하면 액세스 키와 시크릿을 제공해야 합니다.
      - HTTP: 예로는, `http://docs-repo.gd2.qingstor.com`. 예제에는 저장소가 생성된 후 자동으로 가져오는 샘플 앱 NGINX가 포함되어 있으며, 이것을 앱 템플릿에서 배포할 수 있습니다.
      - HTTPS: 예로는, `https://docs-repo.gd2.qingstor.com`.
<div className="notices note">
  <p>Note</p>
  <div>
    HTTP/HTTPS에서 기본 접속 인증을 사용하려면 `http://username:password@docs-repo.gd2.qingstor.com`과 같은 스타일의 URL을 사용하세요.
  </div>
</div>

    - **동기화 간격**: 원격 앱 저장소를 동기화하는 간격입니다.

    - **설명**: 앱 저장소의 주요 기능을 간략하게 소개합니다.


3. 필수 영역을를 지정한 후 **승인**를 클릭하여 URL을 확인하세요. 사용 가능한 경우 URL 옆에 녹색 체크 표시가 표시됩니다. **확인**을 클릭하여 완료하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 온프레미스 프라이빗 클라우드 환경에서 [ChartMuseum](https://chartmuseum.com/)을 기반으로 자신만의 저장소를 구축할 수 있습니다. 그런 다음 애플리케이션을 개발해 저장소에 업로드하고 필요에 따라 Super Kubenetes에 배포하세요.

      - HTTP 기본 접근 인증 설정이 필요한 경우 [이 문서](https://github.com/helm/chartmuseum#basic-auth)를 참조하세요.

    </div>
  </div>


4. 저장소는 가져와진 뒤에 저장소 목록에 나타나고, Super Kubenetes는 자동으로 저장소의 모든 앱을 앱 템플릿으로 추가합니다. 사용자가 앱 템플릿을 사용하여 앱을 배포하도록 선택하면 이 저장소에서 앱을 볼 수 있습니다. 자세한 내용은 [앱 템플릿에서 앱 배포](../../../project-user-guide/application/deploy-app-from-template/)를 참조하세요.
