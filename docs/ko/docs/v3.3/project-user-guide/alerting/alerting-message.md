---
title: "경고 메시지(워크로드 수준)"
keywords: 'Super Kubenetes, Kubernetes, Workload, Alerting, Message, Notification'
description: 'Learn how to view alerting messages for workloads.'
linkTitle: "Alerting Messages (Workload Level)"
weight: 10720
---

경고 메시지는 정의된 경고 정책에 따라 트리거된 경고에 대한 자세한 정보를 기록합니다. 이 튜토리얼은는 워크로드 수준에서 경고 메시지를 보는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes 경고](../../../pluggable-components/alerting/)를 활성화합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.
- 워크로드 수준 경고 정책을 생성했으며 경고를 트리거 시킨 상태입니다. 자세한 내용은 [경고 정책(워크로드 수준)](../alerting-policy/)을 참고하세요.

## 경고 메시지 보기

1. 콘솔에 `project-regular`로 로그인하고 프로젝트로 이동한 다음 **모니터링 & 경고** 아래의 **경고 메시지**로 이동합니다.

2. **알림 메시지** 페이지에서 목록의 모든 알림 메시지를 볼 수 있습니다. 첫 번째 열에는 경고 알림에서 정의한 요약 및 메시지가 표시됩니다. 알림 메시지의 세부 정보를 보려면 알림 정책 이름을 클릭하고 표시된 페이지에서 **알림 기록** 탭을 클릭하세요.

3. **알림 기록** 탭에서 알림 심각도, 모니터링 대상 및 활성화 시간을 볼 수 있습니다.

## 알림 보기

경고 알림(예: 이메일 및 Slack 메시지)도 수신하려면 먼저 [알림 채널](../../../cluster-administration/platform-settings/notification-management/configure-email/)을 설정해야 합니다. 
