---
title: "앱 템플릿"
keywords: 'Kubernetes, Chart, Helm, Super Kubenetes, Application Template, Repository'
description: 'Understand the concept of app templates and how they can help to deploy applications within enterprises.'
linkTitle: "App Templates"
weight: 10110
---

앱 템플릿은 사용자가 앱을 업로드, 제공 및 관리하는 방법입니다. 일반적으로 앱은, 외부 환경과의 통신 및 작동 방식에 따라, 하나 이상의 쿠버네티스 워크로드(예: [디플로이먼트](../../../project-user-guide/application-workloads/deployments/), [스테이트풀셋](../../../project-user-guide/application-workloads/statefulsets/), [데몬셋](../../../project-user-guide/application-workloads/daemonsets/))과과 [서비스](../../../project-user-guide/application-workloads/services/) 로 구성됩니다. 앱 템플릿으로 업로드되는 앱은 [Helm](https://helm.sh/) 패키지를 기반으로 구축됩니다.

## 앱 템플릿 작동 방식

앱 템플릿을 제공하기 위해 Helm 차트를 Super Kubenetes의 퍼블릭 리포지토리로 전달하거나 프라이빗 앱 리포지토리를 가져올 수 있습니다.

Super Kubenetes의 앱 스토어라고도 하는 퍼블릭 리포지토리는 워크스페이스의 모든 테넌트가 접속할 수 있습니다. [앱의 Helm 차트 업로드](../../../workspace-administration/upload-helm-based-application/) 후, 기능 테스트를 위해 앱을 배포하고 리뷰를 위해 제출할 수 있습니다. 최종적으로 앱이 승인된 후 앱 스토어에 출시할 수 있는 옵션이 있습니다. 자세한 내용은 [애플리케이션 라이프사이클 관리](../../../application-store/app-lifecycle-management/)를 참조하세요.

프라이빗 리포지토리의 경우 필요한 권한이 있는 사용자만 워크스페이스에서 [프라이빗 리포지토리 추가](../../../workspace-administration/app-repository/import-helm-repository/)가 허용됩니다. 일반적으로 프라이빗 리포지토리는 MinIO와 같은 오브젝트 스토리지 서비스를 기반으로 구축됩니다. Super Kubenetes로 가져온 후 이러한 프라이빗 리포지토리는 앱 템플릿을 제공하는 애플리케이션 풀로 사용됩니다.

<div className="notices note">
  <p>Note</p>
  <div>
    [Helm 차트로 업로드되는 개별 앱의 경우](../../../workspace-administration/upload-helm-based-application/) 승인 및 출시 후에 Super Kubenetes에 내장 앱과 함께 앱 스토어에 표시됩니다. 또한 프라이빗 앱 리포지토리에서 앱 템플릿을 선택하면, 목록에서 Helm 차트로 업로드된 이런 개별 앱들을 저장하는 <b>현재의 워크스페이스</b>를 볼 수 있습니다.
  </div>
</div>

Super Kubenetes는 [OpenPitrix](https://github.com/openpitrix/openpitrix) 기반의 앱 리포지토리 서비스를 [플러그형 컴포넌트](../../../pluggable-components/app-store/)로 배포합니다.

## 앱 템플릿을 사용해야 하는 이유

앱 템플릿을 사용하면 사용자가 시각화된 방식으로 앱을 배포하고 관리할 수 있습니다. 내부적으로는 팀 내 조정 및 협력을 위해 기업에서 생성한 공유 리소스(예: 데이터베이스, 미들웨어 및 운영 체제)로서 중요한 역할을 합니다. 외부적으로 앱 템플릿은 구축 및 제공에 대한 업계 표준을 설정합니다. 사용자는 원 클릭 배포를 통해 자신의 요구 사항을 충족하기 위해 다양한 시나리오에서 앱 템플릿을 활용할 수 있습니다.

또한 OpenPitrix가 Super Kubenetes에 통합되어 전체 라이프사이클에 걸쳐 애플리케이션 관리를 제공하므로, 이 플랫폼을 통해 ISV, 개발자 및 일반 사용자가 모두 프로세스에 참여할 수 있습니다. Super Kubenetes의 멀티 테넌트 시스템을 기반으로, 각 테넌트는 앱 업로드, 앱 리뷰, 릴리스, 테스트 및 버전 관리와 같은 자체 파트만 담당합니다. 결과적으로 기업은 자체 앱 스토어를 구축하고 맞춤형 표준으로 애플리케이션 풀을 강화할 수 있습니다. 덕분에 앱도 표준화된 방식으로 제공될 수 있습니다.

앱 템플릿 사용 방법에 대한 자세한 내용은 [앱 템플릿에서 앱 배포](../deploy-app-from-template/)를 참조하세요.
