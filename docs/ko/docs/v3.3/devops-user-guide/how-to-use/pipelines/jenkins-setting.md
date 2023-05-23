---
title: "Jenkins 시스템 설정"
keywords: 'Kubernetes, Super Kubenetes, Jenkins, CasC'
description: 'Learn how to customize your Jenkins settings.'
linkTitle: 'Jenkins System Settings'
Weight: 11216
---

Jenkins는 강력하고 유연하며 CI/CD 워크플로의 사실상 표준이 되었습니다. 그럼에도 불구하고 많은 플러그인은 사용하기 전에 사용자가 시스템 수준 설정을 설정해야 합니다.

Super Kubenetes DevOps System은 Jenkins를 기반으로 하는 컨테이너화된 CI/CD 기능을 제공합니다. 사용자에게 예약 가능한 Jenkins 환경을 제공하기 위해 Super Kubenetes는 Jenkins 시스템 설정에 **코드형 설정**를 사용합니다. 이를 통해 사용자는 Jenkins 대시보드에 로그인하고 설정이 수정된 후 다시 로드해야 합니다. 현재 릴리스에서 Jenkins 시스템 설정은 Super Kubenetes 콘솔에서 사용할 수 없으며 향후 릴리스에서 지원될 예정입니다.

이 튜토리얼에서는 Jenkins 대시보드에서 Jenkins를 설정하고 설정을 다시 로드하는 방법을 시연합니다.

## 사전 준비

[the Super Kubenetes DevOps System](../../../../pluggable-components/devops/)을 활성화 하세요.

## Jenkins 코드형 설정

Super Kubenetes에는 기본적으로 Jenkins 코드형 설정 플러그인이 설치되어 있어 YAML 파일을 통해 원하는 상태로 Jenkins 설정을 정의할 수 있고 플러그인 설정을 포함한 Jenkins 설정을 쉽게 재현할 수 있습니다.
[이 디렉토리](https://github.com/jenkinsci/configuration-as-code-plugin/tree/master/demos)에서 특정 Jenkins 설정 및 예제 YAML 파일에 대한 설명을 찾을 수 있습니다.

또한 저장소 [ks-jenkins](https://github.com/kubesphere/ks-jenkins)에서 `formula.yaml` 파일을 찾을 수 있습니다. 여기에서 플러그인 버전을 보고 필요에 따라 이러한 버전을 사용자 지정할 수 있습니다.

![plugin-version](/dist/assets/docs/v3.3/devops-user-guide/using-devops/jenkins-system-settings/plugin-version.png)

## ConfigMap 수정

CasC(Configuration as Code)를 통해 Super Kubenetes에서 Jenkins를 설정하는 것이 좋습니다. 내장된 Jenkins CasC 파일은 [ConfigMap](../../../../project-user-guide/configuration/configmaps/)으로 저장됩니다.

1. Super Kubenetes에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

2. 가져온 멤버 클러스터와 함께 [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택하여 ConfigMap을 편집할 수 있습니다. 기능을 활성화하지 않은 경우 다음 단계를 직접 참조하십시오.

3. 왼쪽 탐색 창의 **설정** 아래에서 **ConfigMaps**를 선택하세요. **ConfigMaps** 페이지의 드롭다운 목록에서 `Super Kubenetes-devops-system`을 선택하고 `jenkins-casc-config`를 클릭하세요.

4. 세부 정보 페이지의 **더보기** 드롭다운 목록에서 **YAML 편집**을 클릭하세요.

5. `jenkins-casc-config`의 설정 템플릿은 `data.jenkins_user.yaml:` 섹션 아래의 YAML 파일입니다. ConfigMap의 브로커(Kubernetes Jenkins 에이전트)에서 컨테이너 이미지, 레이블, 리소스 요청 및 제한 등을 수정하거나 podTemplate에서 컨테이너를 추가할 수 있습니다. 완료되면 **확인**을 클릭하세요.

6. 변경 사항이 자동으로 다시 로드될 때까지 70초 이상 기다립니다.

7. CasC를 통해 Jenkins를 설정하는 방법에 대한 자세한 내용은 [Jenkins 문서](https://github.com/jenkinsci/configuration-as-code-plugin)를 참조하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      현재 버전에서는 모든 플러그인이 CasC 설정을 지원하지는 않습니다. CasC는 CasC를 통해 설정된 플러그인 설정만 덮어씁니다.
    </div>
  </div>

