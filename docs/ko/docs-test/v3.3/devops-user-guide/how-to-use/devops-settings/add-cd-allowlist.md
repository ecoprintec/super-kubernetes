---
title: "지속적 배포 허용 목록 추가"
keywords: 'Kubernetes, GitOps, Super Kubenetes, CI/CD, Allowlist'
description: 'Describe how to add a continuous deployment allowlist on Super Kubenetes.'
linkTitle: "Add a Continuous Deployment Allowlist"
weight: 11243
---
Super Kubenetes 3.3.0에서는 특정 코드 저장소 및 배포 위치만 연속 배포에 사용할 수 있도록 허용 목록을 설정할 수 있습니다.

## 사전 준비

- 워크스페이스, DevOps 프로젝트, DevOps 프로젝트에 `operator` 역할로 초대된 사용자(`project-regular`)가 있어야 합니다. 아직 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.

- [코드 저장소 가져오기](../../../../devops-user-guide/how-to-use/code-repositories/import-code-repositories/)가 필요합니다.

## 절차

1. Super Kubenetes 콘솔에 `project-regular`로 로그인합니다. 왼쪽 탐색 창에서 **DevOps 프로젝트**를 클릭하세요.

2. **DevOps 프로젝트** 페이지에서 생성한 DevOps 프로젝트를 클릭하세요.

3. 왼쪽 탐색 창에서 **DevOps 프로젝트 설정 > 기본 정보**를 선택하세요.

4. 우측 **연속 배포 허용 목록**에서 **허용 목록 사용**을 클릭하세요.

5. **허용 목록 편집** 대화 상자에서 코드 저장소와 코드 디플로이먼트가 배포될 클러스터 및 프로젝트를 선택한 다음 **확인**을 클릭하세요. **추가**를 클릭하여 여러 코드 저장소 및 디플로이먼트 위치를 추가할 수 있습니다.
