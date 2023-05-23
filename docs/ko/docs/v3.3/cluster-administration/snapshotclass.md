---
title: "볼륨 스냅샷 클래스"
keywords: 'Super Kubenetes, Kubernetes, PVC, PV, Snapshot, Snapshot Classes'
description: 'Learn how to manage snapshot classes on Super Kubenetes.'
linkTitle: "Volume Snapshot Classes"
weight: 8900
---

볼륨 스냅샷 클래스는 관리자가 볼륨 스냅샷에 사용되는 스토리지 유형을 정의할 수 있는 방법을 제공합니다. 이 문서에서는 스냅샷 클래스를 만들고 사용하는 방법을 시연합니다.

## 사전 준비

- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.

- 쿠버네티스 1.17 이상을 설치해야 합니다.

- 기본 저장소 플러그인은 스냅샷을 지원합니다.

## 절차

1. Super Kubenetes의 웹 콘솔에 `project-regular`로 로그인하세요. 왼쪽 탐색 창에서 **스토리지 > 볼륨 스냅샷 클래스**를 클릭하세요.

2. **볼륨 스냅샷 클래스** 페이지에서 **생성**를 클릭하세요.

3. 표시된 **볼륨 스냅샷 클래스 생성** 대화 상자에서 볼륨 스냅샷의 이름을 설정하고 **다음**를 클릭하세요. 별칭을 설정하고 설명을 추가할 수 있습니다.

4. **볼륨 스냅샷 클래스 설정** 탭에서 다음 유형을 지원하는 프로비저닝 및 삭제 정책을 선택하세요.

   - 삭제: 기본 저장소의 스냅샷이 VolumeSnapshotContent와 함께 삭제됩니다.
   - 유지: 기본 스토리지의 스냅샷과 VolumeSnapshotContent가 모두 유지됩니다.

