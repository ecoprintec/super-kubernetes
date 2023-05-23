---
title: "경고 정책(워크로드 수준)"
keywords: 'Super Kubenetes, Kubernetes, Workload, Alerting, Policy, Notification'
description: 'Learn how to set alerting policies for workloads.'
linkTitle: "Alerting Policies (Workload Level)"
weight: 10710
---

Super Kubenetes는 노드 및 워크로드에 대한 경고 정책을 제공합니다. 이 튜토리얼에서는 프로젝트의 워크로드에 대한 알림 정책을 만드는 방법을 시연합니다. 노드에 대한 경고 정책을 설정하는 방법을 배우려면 [경고 정책(노드 수준)](../../../cluster-administration/cluster-wide-alerting-and-notification/alerting-policy/)을 참고하세요.

## 사전 준비

- [Super Kubenetes Alerting](../../../pluggable-components/alerting/)을 활성화합니다.
- 경고 알림을 받기 위해서는 미리 [알림 채널](../../../cluster-administration/platform-settings/notification-management/configure-email/)을 설정해야 합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.
- 이 프로젝트에 워크로드가 있어야 합니다. 준비되지 않은 경우 [Bookinfo 배포 및 접속](../../../quick-start/deploy-bookinfo-to-k8s/)를 참고하여 샘플 앱을 만드세요.

## 알림 정책 생성

1. 콘솔에 `project-regular`로 로그인하고 프로젝트로 이동합니다. **모니터링 & 알림** 아래의 **알림 정책**으로 이동한 다음 **생성**를 클릭하세요.

2. 표시된 대화 상자에서 다음과 같이 기본 정보를 입력합니다. 계속하려면 **다음**을 클릭하세요.

   - **이름**. `alert-demo`와 같은 고유한 식별자로 간결하고 명확한 이름.
   - **별칭**. 알림 정책을 더 잘 구분할 수 있도록 함.
   - **설명**. 알림 정책에 대한 간략한 소개.
   - **임계값 기간 (분)**. 경고 규칙에 설정된 조건의 지속 시간이 임계값에 도달하면 경고 정책의 상태가 '활성'이 됩니다.
   - **심각성**. 허용되는 값은 **주의**, **오류** 및 **심각**을 포함하며, 경고가 얼마나 심각한지의 지표를 제공합니다.


3. **규칙 설정** 탭에서 규칙 템플릿을 사용하거나 또는 사용자 지정 규칙을 만들 수 있습니다. 템플릿을 사용하려면 다음 영역을 입력하세요.

   - **리소스 유형**. **Deployment**, **StatefulSet**, **DaemonSet** 등 모니터링할 리소스 유형을 선택하세요.
   - **모니터링 대상**. 선택한 리소스 유형에 따라 대상이 다를 수 있습니다. 프로젝트에 워크로드가 없으면 대상을 볼 수 없습니다.
   - **경고 규칙**. 알림 정책에 대한 규칙을 정의합니다. 이러한 규칙은 Prometheus 표현식을 기반으로 하며 조건이 충족되면 경고가 트리거됩니다. CPU 및 메모리와 같은 오브젝트를 모니터링할 수 있습니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         **모니터링 메트릭** 영역(자동 완성 지원)에 표현식을 입력하여 PromQL로 사용자 정의 규칙을 생성할 수 있습니다. 자세한 내용은 [Prometheus 쿼리](https://prometheus.io/docs/prometheus/latest/querying/basics/)를 참고하세요.
      </div>
   </div>


   계속하려면 **다음**을 클릭하세요.

4. **메시지 설정** 탭에서 알림에 포함할 경고 요약 및 메시지를 입력한 다음 **생성**을 클릭하세요.

5. 막 생성된 알림 정책은 **비활성** 상태가 됩니다. 규칙 표현식의 조건이 충족되면 먼저 **보류**으로 변한 다음, 주어진 시간 범위에서 조건이 계속 충족되면 **활성**으로 바뀝니다.

## 알림 정책 편집

알림 정책을 만든 후 편집하려면 **알림 정책** 페이지에서 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/alerting/alerting-policies/edit-alerting-policy.png" height="20px" alt="icon">를 클릭하세요.

1. 드롭다운 메뉴에서 **편집**을 클릭하고, 경고 정책 생성 때와 동일한 단계를 따라 정책을 편집하세요. **메시지 설정** 페이지에서 **확인**을 클릭하여 저장하세요.

2. 경고 정책을 삭제하려면, 드롭다운 메뉴에서 **삭제**를 클릭하세요.

## 알림 정책 보기

**알림 정책** 페이지에서 알림 정책을 클릭하면 알림 규칙 및 알림 기록을 포함한 세부 정보를 볼 수 있습니다. 알림 정책을 생성할 때 사용하는 템플릿을 기반으로 하는 규칙 표현식도 볼 수 있습니다.

**경고 모니터링** 아래의 **경고 모니터링** 차트는 시간 경과에 따른 리소스의 실제 사용량 또는 양을 보여줍니다. **알림 메시지**는 알림에서 설정한 사용자 지정 메시지를 표시합니다.
