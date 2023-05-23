---
title: "컨피그맵(ConfigMap)"
keywords: 'Super Kubenetes, Kubernetes, ConfigMaps'
description: 'Learn how to create a ConfigMap in Super Kubenetes.'
linkTitle: "ConfigMaps"
weight: 10420
---

쿠버네티스 [컨피그맵(ConfigMap)](https://kubernetes.io/docs/concepts/configuration/configMap/)은 설정 데이터를 키-값 쌍의 형태로 저장하는 데 사용됩니다. 컨피그맵 리소스는 설정 데이터를 파드에 주입하는 방법을 제공합니다. 컨피그맵 오브젝트에 저장된 데이터는 `컨피그맵` 유형의 볼륨에서 참조된 다음 파드에서 실행되는 컨테이너화된 애플리케이션에서 사용할 수 있습니다. 컨피그맵은 다음과 같은 경우에 자주 사용됩니다.

- 환경변수의 값을 설정.
- 컨테이너에 명령 파라미터를 설정.
- 볼륨에 설정 파일을 생성성.

이 튜토리얼은 Super Kubenetes에서 컨피그맵을 생성하는 방법을 시연합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 컨피그맵 생성

1. 콘솔에 `project-regular`로 로그인하세요. 프로젝트의 **설정**으로 이동하여 **컨피그맵**을 선택하고 **생성**을 클릭하세요.

2. 표시된 대화 상자에서 컨피그맵의 이름(예: `demo-configMap`)을 지정하고 **다음**을 클릭하여 계속합니다.

  <div className="notices tip">
    <p>Tip</p>
    <div>
      오른쪽 상단 모서리에서 **YAML 편집**을 활성화하면 컨피그맵 매니페스트 파일을 YAML 형식으로 볼 수 있습니다. Super Kubenetes를 사용하면 매니페스트 파일을 직접 편집하여 컨피그맵을 만들 수 있습니다. 그게 아니면, 아래 단계에 따라 대시보드를 통해 컨피그맵을 생성할 수 있습니다.
    </div>
  </div>

3. **데이터 설정** 탭에서 **데이터 추가**를 클릭하여 값을 구성합니다.

4. 키-값 쌍을 입력합니다. 예를 들어:

  <div className="notices note">
    <p>Note</p>
    <div>
      - 키-값 쌍은 매니페스트의 `data` 영역 아래에 표시됩니다.

      - Super Kubenetes 대시보드에서는 현재 컨피그맵에 대한 키-값 쌍만 추가할 수 있습니다. 향후 릴리스에서는 설정 파일이 포함된 디렉토리에 경로를 추가하여 대시보드에서 직접 컨피그맵을 생성할 수 있을 것입니다.
    </div>
  </div>

5. 오른쪽 하단 모서리에 있는 **√**를 클릭하여 저장하고 키-값 쌍을 더 추가하려면 **데이터 추가**를 다시 클릭하세요.

6. **생성**을 클릭하여 컨피그맵을 생성하세요.

## 컨피그맵 세부 정보 보기

1. 컨피그맵이 생성되면 **컨피그맵** 페이지에 표시됩니다. 오른쪽에서 <img src="/dist/assets/docs/v3.3/project-user-guide/configurations/configmaps/three-dots.png" height="20px" alt="icon">을 클릭하고 드롭다운 목록에서 아래 작업을 선택하세요.

    - **정보 편집**: 기본 정보를 조회 및 편집.
    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **설정 편집**: 컨피그맵의 키-값 쌍을 편집.
    - **삭제**: 컨피그맵을 삭제.
    
2. 컨피그맵의 이름을 클릭하여 세부 정보 페이지로 이동하세요. **데이터** 탭에서 컨피그맵에 추가한 모든 키-값 쌍을 볼 수 있습니다.

3. **더보기**를 클릭하여 이 컨피그맵에 대해 수행할 수 있는 작업을 표시합니다.

    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **설정 편집**: 컨피그맵의 키-값 쌍을 편집.
    - **삭제**: 컨피그맵을 삭제하고 목록 페이지로 돌아갑니다.

4. **정보 수정**을 클릭하면 기본 정보를 확인하고 수정할 수 있습니다.


## 컨피그맵 사용

워크로드, [서비스](../../../project-user-guide/application-workloads/services/), [잡](../../../project-user-guide/application-workloads/jobs/) 또는 [크론잡](../../../project-user-guide/application-workloads/cronjobs/)을 생성할 때, 컨테이너에 대한 환경 변수를 추가해야 할 수 있습니다. **컨테이너 추가** 페이지에서 **환경 변수**를 확인하고, **시크릿에서**를 클릭하여 목록에서 컨피그맵을 사용하세요.
