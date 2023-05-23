---
title: "리소스 사용량 확인"
keywords: 'Kubernetes, Super Kubenetes, metering, billing, consumption'
description: "Track information about resource usage of your cluster's workloads at different levels."
linkTitle: 'View Resource Consumption'
weight: 15410
---

Super Kubenetes 미터링은 특정 클러스터 또는 워크스페이스 내에서 세분화된 수준으로 리소스 사용량을 추적하는 것을 돕습니다. 다른 역할을 가진 다른 테넌트는 접속 권한이 있는 데이터만 볼 수 있습니다. 게다가 다양한 리소스에 대한 가격을 설정하여 청구 정보를 볼 수도 있습니다.

## 사전 준비

- **미터링 및 청구** 섹션은 모든 테넌트가 접속할 수 있지만 각 테넌트에게 표시되는 정보는 어떤 수준에서 어떤 역할을 가지고 있는지에 따라 다를 수 있습니다. 미터링은 Super Kubenetes의 플러그형 컴포넌트가 아니므로 Super Kubenetes 클러스터가 있는 한 사용할 수 있습니다. 새로 생성된 클러스터의 경우 미터링 정보를 보려면 약 1시간을 기다려야 합니다.
- 청구 정보를 보려면 먼저 [청구를 활성화](../enable-billing/)해야 합니다.

## 클러스터 리소스 사용량 보기

**클러스터 리소스 사용량**은 CPU, 메모리, 스토리지와 같은 클러스터(및 포함된 노드)의 리소스 사용량 정보를 담고 있습니다.

1. Super Kubenetes 콘솔에 `admin`으로 로그인하고, 우측 하단 모서리에서 <img src="/dist/assets/docs/v3.3/toolbox/metering-and-billing/view-resource-consumption/toolbox.png" width="20" alt="icon" />을 클릭한 다음, **미터링 및 청구**을 선택하세요.

2. **클러스터 리소스 소비량** 섹션에서 **소비량 보기**를 클릭하세요.

3. 대시보드 왼쪽에는, [멀티 클러스터 관리](../../../multicluster-management/introduction/overview/)를 활성화한 경우 호스트 클러스터와 모든 멤버 클러스터를 포함하는 클러스터 목록이 표시됩니다. 활성화되지 않은 경우 목록에 `default`라는 클러스터가 하나만 있습니다.

   오른쪽에는 서로 다른 방식으로 리소스 소비를 보여주는 세 부분이 있습니다.

   <table>
     <tbody>
       <tr>
         <th width='200'>모듈</th>
         <th>설명</th>
       </tr>
        <tr>
          <td>개요</td>
          <td>클러스터 생성 이후 클러스터의 다양한 리소스에 대한 사용량 개요를 표시합니다. ConfigMap <code>Super Kubenetes-config</code>에서 [이러한 리소스에 대한 가격을 설정](../enable-billing/)한 경우 청구 정보를 볼 수도 있습니다.</td>
       </tr> <tr>
         <td>어제까지의 사용량</td>
         <td>어제까지의 총 리소스 사용량을 표시합니다. 시간 범위와 특정 리소스를 사용자 지정하여 특정 기간 내의 데이터를 볼 수도 있습니다.</td>
       </tr> <tr>
         <td>현재 리소스 포함</td>
         <td>지난 1시간 동안 선택한 대상 오브젝트(이 경우, 선택한 클러스터의 모든 노드)에 포함된 리소스의 사용량을 표시합니다.</td>
       </tr>
     </tbody>
   </table>

4. 자세한 사용량 정보를 보려면, 왼쪽의 클러스터를 클릭하고 노드 또는 파드로 더 깊이 들어가세요.

<div className="notices note">
  <p>Note</p>
  <div>
    오브젝트의 미터링 및 청구 데이터를 CSV 파일로 내보내려면, 왼쪽의 체크박스를 선택하고 **✓**를 클릭하세요.
  </div>
</div>

## 워크스페이스(프로젝트) 리소스 사용량 보기

**워크스페이스(프로젝트) 리소스 사용량**는 CPU, 메모리, 스토리지와 같은 워크스페이스(및 포함된 프로젝트)의 리소스 사용량 정보를 담고 있습니다.

1. Super Kubenetes 콘솔에 `admin`으로 로그인하고, 우측 하단 모서리에서 <img src="/dist/assets/docs/v3.3/toolbox/metering-and-billing/view-resource-consumption/toolbox.png" width="20" alt="icon" />을 클릭한 다음, **미터링 및 청구**을 선택하세요.

2. **워크스페이스(프로젝트) 자원 사용량** 섹션에서 **사용량 보기**를 클릭하세요.

3. 대시보드 왼쪽에서 현재 클러스터의 모든 워크스페이스가 포함된 목록을 볼 수 있습니다. 오른쪽에는 선택된 워크스페이스의 상세 사용량 정보가 표시되며, 레이아웃은 기본적으로 클러스터와 동일합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      멀티 클러스터 아키텍처에서는 사용 가능한 클러스터가 할당되지 않은 워크스페이스의 미터링 및 청구 정보를 볼 수 없습니다. 자세한 내용은 [클러스터 가시성 및 인증](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/)을 참조하십시오.
    </div>
  </div>

4. 자세한 사용량 정보를 보려면, 왼쪽의 클러스터를 클릭하고 프로젝트 또는 워크로드(예: 디플로이먼트 및 스테이트풀셋)로 더 깊이 들어가세요.
