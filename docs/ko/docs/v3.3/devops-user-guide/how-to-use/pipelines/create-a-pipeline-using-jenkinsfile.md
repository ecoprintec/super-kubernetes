---
title: 'Jenkinsfile을 사용하여 파이프라인 생성'
keywords: 'Super Kubenetes, Kubernetes, Docker, Spring Boot, Jenkins, DevOps, CI/CD, Pipeline'
description: 'Learn how to create and run a pipeline by using an example Jenkinsfile.'
linkTitle: 'Create a Pipeline Using a Jenkinsfile'
weight: 11212
---

Jenkinsfile은 Jenkins 파이프라인의 정의를 포함하고 소스 제어에 체크인되는 텍스트 파일입니다. 전체 워크플로를 코드로 저장하므로 파이프라인의 코드 검토 및 반복 프로세스를 뒷받침합니다. 자세한 내용은 [Jenkins 공식 문서](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/)를 참조하세요.

이 튜토리얼은 GitHub 저장소에서 Jenkinsfile을 기반으로 파이프라인을 만드는 방법을 시연합니다. Jenkins 파이프라인을 사용하여 외부에서 액세스할 수 있는 개발 환경과 운영 환경에 각각 예제 애플리케이션을 배포합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes에서는 두 가지 유형의 파이프라인을 생성할 수 있습니다. 이 튜토리얼에서 소개하는 SCM의 Jenkinsfile을 기반으로 생성한 파이프라인과 [그래픽 편집 패널을 통해 생성한 파이프라인](../create-a-pipeline-using-graphical-editing-panel/)입니다. SCM의 Jenkinsfile은 소스 제어 관리(SCM)의 내부 Jenkinsfile을 필요로 합니다. 즉, Jenkfinsfile은 SCM의 일부로서 기능합니다. Super Kubenetes DevOps 시스템은 코드 저장소의 기존 Jenkinsfile을 기반으로 CI/CD Jenkins 파이프라인을 자동으로 구축합니다. '스테이지', '스텝'과 같은 워크플로우를 정의할 수 있습니다.
  </div>
</div>

## 사전 준비

- [Docker Hub](https://hub.docker.com/) 계정과 [GitHub](https://github.com/) 계정이 필요합니다.
- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 계정은 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)를 참조하십시오.
- 파이프라인을 실행하기 위한 CI 전용 노드를 설정해야 합니다. [종속성 캐싱을 위한 CI 노드 설정](../../../../devops-user-guide/how-to-use/devops-settings/set-ci-node/)을 참조하십시오.
- SonarQube를 설치하고 설정해야 합니다. [SonarQube를 파이프라인에 통합](../../../../devops-user-guide/how-to-integrate/sonarqube/)을 참조하십시오. 이 부분을 건너뛰면 아래의 **SonarQube 분석**이 존재하지 않습니다.

## Jenkins 파이프라인 개요

이 예제 파이프라인에는 다음과 같이 8개의 스테이지가 있습니다.

![Pipeline Overview](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-a-jenkinsfile/pipeline-overview.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      - **스테이지 1. SCM 확인**: GitHub 저장소에서 소스 코드를 확인합니다.
      - **스테이지2. 단위 테스트**: 테스트를 통과할 때까지 다음 스테이지로 진행하지 않습니다.
      - **스테이지 3. SonarQube 분석**: SonarQube 코드 품질 분석.
      - **스테이지 4. 스냅샷 이미지 빌드 및 푸시**: **전략 설정**에서 선택한 브랜치를 기반으로 이미지를 빌드합니다. `SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER`의 태그를 Docker Hub에 푸시합니다. 이 중 `$BUILD_NUMBER`는 파이프라인의 활동 목록에 있는 작업 일련 번호입니다.
      - **스테이지 5. 최신 이미지 푸시**: sonarqube 브랜치에 `최신`으로 태그를 지정하고 Docker Hub에 푸시합니다.
      - **스테이지 6. 개발자 환경에 배포**: sonarqube 브랜치를 개발 환경에 배포합니다. 이 스테이지에서는 검토가 필요합니다.
      - **스테이지 7. 태그로 푸시**: 태그를 생성하고 GitHub에 릴리스합니다. 태그가 Docker Hub로 푸시됩니다.
      - **스테이지 8. 운영 환경에 배포**: 출시된 태그를 운영 환경에 배포합니다.
    </div>
  </div>

## 실습실

### 1단계: 자격 증명 생성

1. Super Kubenetes 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하여 **DevOps 프로젝트 설정** 아래의 **자격 증명**에서 다음 자격 증명을 생성합니다. 자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../../../devops-user-guide/how-to-use/devops-settings/credential-management/)를 참조하십시오.

  <div className="notices note">
    <p>Note</p>
    <div>
      계정이나 비밀번호에 `@`, `$`와 같은 특수 문자가 있는 경우 인식되지 않을 수 있으므로 파이프라인 실행 시 오류가 발생할 수 있습니다. 이 경우 먼저 [urlencoder](https://www.urlencoder.org/)와 같은 일부 타사 웹사이트에서 계정 또는 비밀번호를 인코딩해야 합니다. 그런 다음 자격 증명 정보에 대한 출력을 복사하여 붙여넣으세요.
    </div>
  </div>

  <table>
  <thead>
  <tr>
    <th>
      자격 증명 ID
    </th>
    <th>
      유형
    </th>
    <th>
      사용처
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      dockerhub-id
    </td>
    <td>
      계정 자격 증명
    </td>
    <td>
      Docker Hub
    </td>
  </tr>
  <tr>
    <td>
      github-id
    </td>
    <td>
      계정 자격 증명
    </td>
    <td>
      GitHub
    </td>
  </tr>
  <tr>
    <td>
      demo-kubeconfig
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      쿠버네티스
    </td>
  </tr>
  </tbody>
  </table>

2. 위에서 언급한 스테이지 3 (SonarQube 분석)에서 사용되는 SonarQube에 대한 추가 자격 증명(`sonar-token`)을 생성해야 합니다. **액세스 토큰** 유형의 자격 증명은 [새 프로젝트용 SonarQube 토큰 만들기](../../../../devops-user-guide/how-to-integrate/sonarqube/#create-a-sonarqube-token-for-a-new-project)를 참조하여 **토큰** 영역에 SonarQube 토큰을 입력하세요. **확인**을 클릭하여 완료합니다.

3. 또한 아래 이미지와 같은 권한으로 GitHub 개인용 액세스 토큰을 생성한 후 생성된 토큰을 사용하여 DevOps 프로젝트에서 GitHub 인증을 위한 계정 자격 증명(예: `github-token`)을 생성해야 합니다.

   ![github-token-scope](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-a-jenkinsfile/github-token-scope.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      GitHub 개인 액세스 토큰을 만들려면 GitHub 계정의 **설정**으로 이동하여 **개발자 설정**을 클릭하고 **개인 액세스 토큰**을 선택한 다음 **새 토큰 생성**을 클릭하세요.
    </div>
  </div>

4. 목록에 자격 증명이 총 5개가 됩니다.

### 2단계: GitHub 저장소에서 Jenkinsfile 수정

1. GitHub에 로그인하세요. GitHub 저장소에서 자신의 GitHub 계정으로 [devops-maven-sample](https://github.com/kubesphere/devops-maven-sample)을 포크하세요.

2. **devops-maven-sample**의 자체 GitHub 저장소에서 루트 디렉터리의 `Jenkinsfile-online` 파일을 클릭하세요.

3. 오른쪽의 수정 아이콘을 클릭하여 환경변수를 수정하세요.

   ![jenkins-edit-2](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-a-jenkinsfile/jenkins-edit-2.jpg)

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      항목
    </th>
    <th style="text-align:left">
      값
    </th>
    <th style="text-align:left">
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      DOCKER_CREDENTIAL_ID
    </td>
    <td style="text-align:left">
      dockerhub-id
    </td>
    <td style="text-align:left">
      Docker Hub 계정에 대해 Super Kubenetes에서 설정한 <strong>이름</strong>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      GITHUB_CREDENTIAL_ID
    </td>
    <td style="text-align:left">
      github-id
    </td>
    <td style="text-align:left">
      GitHub 계정에 대해 Super Kubenetes에서 설정한 <strong>이름</strong>. GitHub 저장소에 태그를 푸시하는 데 사용됩니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      KUBECONFIG_CREDENTIAL_ID
    </td>
    <td style="text-align:left">
      demo-kubeconfig
    </td>
    <td style="text-align:left">
      kubeconfig에 대해 Super Kubenetes에서 설정한 <strong>이름</strong>. 실행 중인 Kubernetes 클러스터에 액세스하는 데 사용됩니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      REGISTRY
    </td>
    <td style="text-align:left">
      docker.io
    </td>
    <td style="text-align:left">
      기본값은 <code>docker.io</code>이며, 푸시 이미지의 주소 역할을 합니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      DOCKERHUB_NAMESPACE
    </td>
    <td style="text-align:left">
      your-dockerhub-account
    </td>
    <td style="text-align:left">
      Docker 허브의 계정 이름으로 바꾸세요. 계정 아래의 조직 이름일 수 있습니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      GITHUB_ACCOUNT
    </td>
    <td style="text-align:left">
      your-github-account
    </td>
    <td style="text-align:left">
      GitHub 계정 이름으로 바꾸세요. 예를 들어 GitHub 주소가 &nbsp;<code>https://github.com/Super Kubenetes/</code>인 경우 GitHub 계정 이름은 <code>Super Kubenetes</code>입니다. 또한 계정의 조직 이름일 수도 있습니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      APP_NAME
    </td>
    <td style="text-align:left">
      devops-maven-sample
    </td>
    <td style="text-align:left">
      애플리케이션 이름.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      SONAR_CREDENTIAL_ID
    </td>
    <td style="text-align:left">
      sonar-token
    </td>
    <td style="text-align:left">
      SonarQube 토큰에 대해 Super Kubenetes에서 설정한 <strong>이름</strong>. 코드 품질 테스트에 사용됩니다.
    </td>
  </tr>
  </tbody>
  </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      Jenkinsfile의 `mvn`의 명령 파라미터 `-o`는 오프라인 모드가 활성화되었음을 나타냅니다. 시간을 절약하고 특정 환경에서 네트워크 간섭에 적응하기 위해 관련 종속성이 이 자습서에서 이미 다운로드되었습니다. 오프라인 모드는 기본적으로 켜져 있습니다.
    </div>
  </div>

4. 환경 변수를 수정한 후 페이지 하단의 **변경 사항 커밋**을 클릭하면 SonarQube 브랜치의 파일이 업데이트됩니다.

### 3단계: 프로젝트 생성

각각 개발 환경과 운영 환경을 나타내는 `Super Kubenetes-sample-dev` 및 `Super Kubenetes-sample-prod`와 같은 두 개의 프로젝트를 만들어야 합니다. 파이프라인이 성공적으로 실행되면 앱의 관련 배포 및 서비스가 이 두 프로젝트에서 자동으로 생성됩니다.

<div className="notices note">
  <p>Note</p>
  <div>
    `project-admin` 계정은 CI/CD 파이프라인의 검토자이므로 미리 생성해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)를 참조하십시오.
  </div>
</div>

1. `project-admin` 계정을 사용하여 Super Kubenetes에 로그인하세요. DevOps 프로젝트를 생성한 동일한 워크스페이스에서 아래와 같이 2개의 프로젝트를 생성하세요. 이 두 프로젝트에 `operator` 역할로 `project-regular`를 초대했는지 확인하세요.

  <table>
  <thead>
  <tr>
    <th>
      프로젝트 이름
    </th>
    <th>
      별칭
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Super Kubenetes-sample-dev
    </td>
    <td>
      개발 환경
    </td>
  </tr>
  <tr>
    <td>
      Super Kubenetes-sample-prod
    </td>
    <td>
      운영 환경
    </td>
  </tr>
  </tbody>
  </table>

2. 해당 프로젝트가 생성되면 프로젝트 목록에 나열됩니다.

### 4단계: 파이프라인 생성

1. Super Kubenetes에서 로그아웃하고 `project-regular`로 다시 로그인하세요. DevOps 프로젝트 `demo-devops`로 이동하여 **생성**을 클릭하세요.

2. 표시된 대화 상자에 기본 정보를 입력하세요. 이름을 `jenkinsfile-in-scm`로 지정하고 **코드 저장소** 아래에 코드 저장소를 지정합니다.

3. **GitHub** 탭의 **자격 증명** 아래 드롭다운 목록에서 **github-토큰**을 선택한 다음 **확인**를 클릭하여 저장소를 선택하세요.

4. GitHub 계정을 선택하세요. 이 토큰과 관련된 모든 저장소가 오른쪽에 나열됩니다. **devops-maven-sample**을 선택하고 **선택**을 클릭하세요. 계속하려면 **다음**을 클릭하세요.

5. **고급 설정**에서 **오래된 브랜치 삭제** 옆의 확인란을 선택하세요. 이 튜토리얼에서는 **브랜치 보존 기간(일)** 및 **최대 브랜치**의 기본값을 사용할 수 있습니다.

   오래된 브랜치 삭제는 브랜치 레코드를 모두 함께 폐기한다는 것을 의미합니다. 브랜치 기록에는 콘솔 출력, 아카이브된 아티팩트 및 특정 브랜치의 기타 관련 메타데이터가 포함됩니다. 브랜치가 적으면 Jenkins가 사용하는 디스크 공간을 절약할 수 있습니다. Super Kubenetes는 오래된 브랜치가 폐기되는 시점을 결정하는 두 가지 옵션을 제공합니다.

   - **브랜치 보유 기간(일)**. 보유 기간을 초과한 브랜치는 삭제됩니다.

   - **최대 브랜치**. 브랜치 수가 최대 수를 초과하면 가장 이른 브랜치가 삭제됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      **브랜치 보유 기간(일)**과 **최대 브랜치**은 동시에 브랜치에 적용됩니다. 브랜치가 어느 한 쪽의 조건이라도 충족하면 폐기됩니다. 예를 들어, 보존 일수로 2일을 지정하고 최대 브랜치 수로 3개를 지정하는 경우, 두 수를 초과하는 브랜치는 모두 삭제됩니다. Super Kubenetes에서  이 두 영역에 미리 설정된 기본값은 각각 7과 5입니다.
    </div>
  </div>

6. **전략 설정**에서 Super Kubenetes는 기본적으로 4가지 전략을 제공합니다. 이 전략은 이 예제에서 사용되지 않으므로 **포크에서 PR 검색**을 삭제할 수 있습니다. 설정을 변경할 필요 없이 기본값을 직접 사용할 수도 있습니다.

   Jenkins 파이프라인이 실행되면 개발자가 제출한 PR(Pull Request)도 별도의 분기로 간주됩니다.

   **브랜치 검색**

   - **PRS로 접수된 브랜치 를 제외**. 원본의 마스터 브랜치와 같은 소스 브랜치는 스캔되지 않습니다. 이러한 브랜치를 병합해야 합니다.
   - **PRS로 접수된 브랜치 만 포함**. PR 브랜치만 스캔.
   - **모든 브랜치 포함**. 저장소 원본에서 모든 브랜치를 가져옴.

   **원본에서 PR 검색**

   - **PR이 병합된 코드를 가져오기**. PR이 대상 브랜치에 병합된 후 소스 코드를 기반으로 파이프라인이 생성되고 실행됩니다.
   - **PR 브랜치에서 코드를 가져오기**. PR 자체의 소스 코드를 기반으로 파이프라인이 생성되고 실행됩니다.
   - **두개의 파이프라인 각각 생성**. Super Kubenetes는 두 개의 파이프라인을 생성합니다. 하나는 PR이 타겟 브랜치에 병합된 후의 소스 코드를 기반으로 하는 파이프라인이고, 다른 하나는 PR 자체의 소스 코드를 기반으로 하는 파이프라인입니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      여기서 **전략 설정**의 설정을 활성화하려면 GitHub를 코드 저장소로 선택해야 합니다.
    </div>
  </div>

7. **스크립트 경로**까지 아래로 스크롤 하세요. 이 영역은 코드 저장소의 Jenkinsfile 경로를 지정합니다. 이것은 저장소의 루트 디렉터리를 나타냅니다. 만약 파일 위치가 변하면, 스크립트 경로도 변경되어야 합니다.
   루트 디렉터리에 있는 예제 저장소에 있는 Jenkinsfile의 파일 이름인 `Jenkinsfile-online`으로 변경하세요.

8. **스캔 트리거**에서 **정기적으로 스캔**을 선택하고 간격을 **5분**으로 설정합니다. 완료하려면 **생성**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      **전략 설정**에서 설정한 전략을 기반으로 모든 코드 업데이트 또는 새 PR을 감지할 수 있도록 파이프라인이 원격 저장소를 스캔할 수 있도록 특정 간격을 설정할 수 있습니다.
    </div>
  </div>

### 5단계: 파이프라인 실행

1. 파이프라인이 생성된 후 해당 이름을 클릭하여 세부 정보 페이지로 이동하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 파이프라인 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />를 클릭하고 그런 다음 **복사**를 선택하여 사본을 만듭니다. 여러 브랜치를 포함하지 않는 여러 파이프라인을 동시에 실행해야 하는 경우 이러한 파이프라인을 모두 선택한 다음 **실행**을 클릭하여 일괄적으로 실행할 수 있습니다.
      - 파이프라인 세부 정보 페이지에 **동기화 상태**가 표시됩니다. Super Kubenetes와 Jenkins 간의 동기화 결과를 반영하며, 동기화가 성공하면 **성공** 아이콘을 볼 수 있습니다.

    </div>

  </div>

2. **실행 기록**에서 세 개의 브랜치를 스캔하고 있습니다. 오른쪽의 **실행**을 클릭하면 설정한 행동 전략에 따라 파이프라인이 실행됩니다. 드롭다운 목록에서 **sonarqube**를 선택하고 `v0.0.2`와 같은 태그 번호를 추가하세요. **확인**을 클릭하여 새 활동을 작동시키세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 이 페이지에 실행 기록이 표시되지 않으면, 브라우저를 수동으로 새로 고치거나 드롭다운 메뉴(**더보기** 버튼)에서 **저장소 스캔**을 클릭해야 합니다.
     - 태그 이름은 GitHub 및 Docker Hub에서 태그로 릴리스 및 이미지를 생성하는 데 사용됩니다. 기존 태그 이름은 `TAG_NAME` 영역에 다시 사용할 수 없습니다. 그렇지 않으면 파이프라인이 성공적으로 실행되지 않습니다.

    </div>

  </div>

3. 잠시 기다리면, 일부 활동이 중지되고 일부가 실패하는 것을 볼 수 있습니다. 세부 정보를 보려면 수 첫 번째 항목을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      활동 실패는 다양한 요인으로 인해 발생할 수 있습니다. 이 예시에서는, 위의 단계에서 환경 변수들을 편집할 때 sonarqube 브랜치의 Jenkinsfile만 변경되었습니다. 반면, 종속항목과 마스터 브랜치의 이 변수들은 변경된 상태로 남아있으므로(즉, 잘못된 GitHub 및 Docker Hub 계정) 결국 오류가 발생합니다. 세부 정보를 보려면 이것을 클릭하고 로그를 검사하면 됩니다. 오류의 다른 이유로는 네트워크 문제, Jenkinsfile의 잘못된 코딩 등이 있습니다.
    </div>
  </div>

4. 파이프라인은 `개발 환경에 배포` 스테이지에서 일시 중지됩니다. **진행**를 수동으로 클릭해야 합니다. 파이프라인은 Jenkinsfile에 각각 `개발 환경에 배포`, `태그와 함께 푸시`, `운영 환경에 배포`이 정의되어 있으므로 세 번 검토됩니다.

   개발 또는 운영 환경에서는 파이프라인, 이미지 및 코드 분석 결과를 검토하기 위해 더 높은 권한을 가진 사람(예: 릴리스 관리자)이 필요합니다. 이들은 파이프라인이 다음 스테이지로 넘어갈 수 있는지 여부를 결정할 권한이 있습니다. Jenkinsfile에서 `입력` 영역을 이용하여 파이프라인을 검토하는 사람을 지정하세요. 검토할 사용자 (예를 들어, `project-admin`)를 지정하려면 Jenkinsfile에 영역을를 추가하면 됩니다. 사용자가 여러 명인 경우, 아래처럼 쉼표를 사용하여 구분해야 합니다.

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
          <p>
            <span style="color:#960050;background-color:#1e0010">···</span> 
            input<span style="color:#f92672">(</span>id: <span style="color:#e6db74">'release-image-with-tag'</span><span style="color:#f92672">,</span> message: <span style="color:#e6db74">'release image with tag?'</span><span style="color:#f92672">,</span> submitter: <span style="color:#e6db74">'project-admin,project-admin1'</span><span style="color:#f92672">)</span> 
            <span style="color:#960050;background-color:#1e0010">···</span></p></code></div>
    </pre>
  </article>
   
<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes 3.3.0에서, 검토자가 지정되지 않은 경우, 파이프라인을 실행할 수 있는 계정은 파이프라인을 유지하거나 종료할 수 있습니다. 파이프라인 생성자와 프로젝트에서 `admin` 역할을 가진 계정 또는 사용자가 지정한 계정도 파이프라인을 유지하거나 종료할 수 있습니다.
  </div>
</div>

### 6단계: 파이프라인 상태 확인

1. **작업 상태**에서 파이프라인이 어떻게 실행되고 있는지 확인할 수 있습니다. 파이프라인은 생성된 후 몇 분 동안 계속 초기화됩니다. 샘플 파이프라인에는 8개의 스테이지가 있으며 [Jenkinsfile-online](https://github.com/kubesphere/devops-maven-sample/blob/sonarqube/Jenkinsfile-online)에 별도로 정의되어 있습니다.

2. 오른쪽 상단의 **로그 보기**를 클릭하여 파이프라인 실행 로그를 확인하세요. 파이프라인 실행을 중지할 수 있는 오류를 포함하여 파이프라인의 동적 로그 출력을 볼 수 있습니다. 이것을 클릭하여 각 스테이지에 대한 추가 분석을 위해, 로컬 시스템에 다운로드 가능한 로그를 검사하세요.

### 7단계: 결과 확인

1. 파이프라인을 성공적으로 실행했으면 **코드 체크**를 클릭하여 다음과 같이 SonarQube를 통해 결과를 확인하세요.

2. 파이프라인을 통해 빌드된 Docker 이미지는 Jenkinsfile에 정의된 대로 Docker Hub에도 성공적으로 푸시되었습니다. Docker Hub에서 파이프라인이 실행되기 전에 지정된 `v0.0.2` 태그가 있는 이미지를 찾을 수 있습니다.

3. 동시에 GitHub에서 새 태그와 새 릴리스가 생성되었습니다.

4. 샘플 애플리케이션이 생성된 해당 배포 및 서비스와 함께 `Super Kubenetes-sample-dev` 및 `Super Kubenetes-sample-prod`에 배포됩니다. 이 두 프로젝트로 이동하고 예상 결과는 다음과 같습니다.

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      환경
    </th>
    <th style="text-align:left">
      URL
    </th>
    <th style="text-align:left">
      네임스페이스
    </th>
    <th style="text-align:left">
      디플로이먼트
    </th>
    <th style="text-align:left">
      서비스
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      개발
    </td>
    <td style="text-align:left">
      <code>http://{$NodeIP}:{$30861}</code>
    </td>
    <td style="text-align:left">
      Super Kubenetes-sample-dev
    </td>
    <td style="text-align:left">
      ks-sample-dev
    </td>
    <td style="text-align:left">
      ks-sample-dev
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      운영
    </td>
    <td style="text-align:left">
      <code>http://{$NodeIP}:{$30961}</code>
    </td>
    <td style="text-align:left">
      Super Kubenetes-sample-prod
    </td>
    <td style="text-align:left">
      ks-sample
    </td>
    <td style="text-align:left">
      ks-sample
    </td>
  </tr>
  </tbody>
  </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      URL로 앱에 액세스할 수 있도록 보안 그룹에서 포트를 열어야 할 수도 있습니다.
    </div>
  </div>

### 8단계: 예제 서비스에 접속

1. 서비스에 접속 하려면 **툴박스**에서 **kubectl**을 사용하기 위해 Super Kubenetes에 `admin`으로 로그인하세요. 프로젝트 `Super Kubenetes-sample-dev`로 이동하여 **애플리케이션 워크로드** 아래의 **서비스**에서 `ks-sample-dev`를 클릭하세요. 서비스에 접속하기 위한 엔드포인트는 세부 정보 페이지에서 확인할 수 있습니다.

2. 다음 명령을 실행하여 좌측 하단 모서리에 있는 **툴박스**의 **kubectl**을 사용하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                curl 10.233.120.230:8080
              </p>
          </code>
        </div>
    </pre>
  </article>

3. 예상되는 출력:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                Really appreciate your star, that's the power of our life.
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `curl` 엔드포인트 또는 {$Virtual IP}:{$Port} 또는 {$Node IP}:{$NodePort}를 사용하세요.
    </div>
  </div>

4. 마찬가지로, `Super Kubenetes-sample-prod` 프로젝트에서 서비스를 테스트할 수 있으며 동일한 결과를 볼 수 있습니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
               <p>
                   $ curl 10.233.120.236:8080
                   Really appreciate your star, that's the power of our life.
               </p>
           </code>
         </div>
     </pre>
   </article>
