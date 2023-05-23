---
title: Super Kubenetes 기업 연합
keywords: 'Kubernetes, Super Kubenetes, federation, multicluster, hybrid-cloud'
description: 'Understand the fundamental concept of Kubernetes federation in Super Kubenetes, including member clusters and host clusters.'
linkTitle: 'Super Kubenetes Federation'
weight: 5120
---

멀티 클러스터 기능은 멀티 클러스터 간의 네트워크 연결과 관련됩니다. 따라서 클러스터의 토폴로지 관계를 이해하는 것이 중요합니다.

## 멀티 클러스터 아키텍처의 작동 방식

여러 클러스터의 관리를 위해 Super Kubenetes의 중앙 컨트롤 플레인을 사용하기 전에, **호스트** 클러스터를 생성해야 합니다. 호스트 클러스터는 기본적으로 멀티 클러스터 기능이 활성화된 Super Kubenetes 클러스터입니다. 이것은 **멤버** 클러스터의 통합 관리를 위한 컨트롤 플레인을 제공합니다. 멤버 클러스터는 중앙 컨트롤 플레인이 없는 일반적인 Super Kubenetes 클러스터입니다. 즉, 필요한 권한이 있는 테넌트(일반적으로 클러스터 관리자)는 호스트 클러스터에서 컨트롤 플레인에 접속하여 멤버 클러스터의 리소스 확인과 편집과 같은 모든 멤버 클러스터를 관리할 수 있습니다. 반대로 멤버 클러스터의 웹 콘솔에 별도로 접속하면 다른 클러스터의 리소스를 볼 수 없습니다.

여러 멤버 클러스터가 동시에 존재할 수 있는 반면, 호스트 클러스터는 하나만 있을 수 있습니다. 멀티 클러스터 아키텍처에서, 호스트 클러스터와 멤버 클러스터 간의 네트워크는 [직접 연결](../../enable-multicluster/direct-connection/) 또는 [에이전트를 통해](../.. /enable-multicluster/agent-connection/) 가능합니다. 멤버 클러스터 간의 네트워크는 완전히 격리된 환경에서 설정 가능합니다.

kubeadm을 통해 구축된 온프레미스 쿠버네티스 클러스터를 사용하는 경우, [쿠버네티스에서 Air-gapped 설치](../../../installing-on-kubernetes/on-prem-kubernetes/install-ks-on-linux-airgapped/)를 참조하여 Kubernetes 클러스터에 Super Kubenetes를 설치한 다음, 직접 연결 또는 에이전트 연결을 통해 Super Kubenetes 멀티 클러스터 관리를 활성화하십시오.

![Super Kubenetes-federation](/dist/assets/docs/v3.3/multicluster-management/introduction/kuberix-federation/kuberix-federation.png)

## 벤더에 구애받지 않음

Super Kubenetes는 강력하고 포괄적인 중앙 컨트롤 플레인을 제공하므로, 배포 환경이나 클라우드 제공업체에 관계없이 어떤 Super Kubenetes 클러스터든지 통합된 방법으로 관리할 수 있습니다.

## 리소스 요구 사항

멀티 클러스터 관리를 활성화하기 전에, 자신의 환경에 리소스가 충분한지 확인하세요.

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      kube-federation-system
    </th>
    <th>
      Super Kubenetes-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Sub-component
    </td>
    <td>
      2 x controller-manager
    </td>
    <td>
      tower
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      100 m
    </td>
    <td>
      100 m
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      500 m
    </td>
    <td>
      500 m
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      64 MiB
    </td>
    <td>
      128 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      512 MiB
    </td>
    <td>
      256 MiB
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
    <td>
      Optional
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    - CPU와 메모리 자원의 요청 및 제한은 모두 단일 레플리카에 적용됩니다.
    - 멀티 클러스터 기능이 활성화되면, 타워 및 컨트롤러 관리자가 호스트 클러스터에 설치됩니다. [에이전트 연결](../../../multicluster-management/enable-multicluster/agent-connection/)을 사용하는 경우에는, 멤버 클러스터에는 타워만 필요합니다. [직접 연결](../../../multicluster-management/enable-multicluster/direct-connection/)을 사용하는 경우 멤버 클러스터에 대한 추가 컴포넌트가 필요하지 않습니다.
  </div>
</div>

## 멀티 클러스터 아키텍처에서 앱 스토어 사용

Super Kubenetes의 다른 컴포넌트와 달리 [Super Kubenetes 앱 스토어](../../../pluggable-components/app-store/)는 호스트 클러스터와 멤버 클러스터를 포함한 모든 클러스터에 대한 글로벌 애플리케이션 풀 역할을 합니다. 호스트 클러스터에서 앱 스토어를 활성화하기만 하면 [앱 템플릿](. ./../../project-user-guide/애플리케이션/app-template/) 및 [앱 저장소](../../../워크스페이스-administration/app-repository/import-helm-repository/)와 같은 앱 스토어와 관련된 기능을 멤버 클러스터에서 바로 사용할 수 있습니다. (멤버 클러스터에서 App Store를 사용할 수 있는지 여부와는 무관)

하지만 앱 스토어를 호스트 클러스터에서 활성화하지 않고 멤버 클러스터에서만 활성화하면 멀티 클러스터 아키텍처의 어떤 클러스터에서도 앱 스토어를 사용할 수 없습니다.
