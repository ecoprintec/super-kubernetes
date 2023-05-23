---
title: "GitLab으로 멀티 브랜치 파이프라인 생성"
keywords: 'Super Kubenetes, Kubernetes, GitLab, Jenkins, Pipelines'
description: 'Learn how to create a multi-branch pipeline with GitLab on Super Kubenetes.'
linkTitle: "Create a Multi-branch Pipeline with GitLab"
weight: 11215
---

[GitLab](https://about.gitlab.com/)은 퍼블릭 및 프라이빗 저장소를 제공하는 오픈 소스 코드 저장소 플랫폼입니다. 전문가가 프로젝트에서 작업을 수행할 수 있도록 하는 완전한 DevOps 플랫폼입니다.

Super Kubenetes 3.1.x 이상에서는 DevOps 프로젝트에서 GitLab을 사용하여 멀티 브랜치 파이프라인을 생성할 수 있습니다. 이 튜토리얼에서는 GitLab으로 멀티 브랜치 파이프라인을 만드는 방법을 시연합니다.

## 사전 준비

- [GitLab](https://gitlab.com/users/sign_in) 계정과 [Docker Hub](https://hub.docker.com/) 계정이 필요합니다.
- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 사용자는 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 실습실

### 1단계: 자격 증명 생성

1. Super Kubenetes 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하여 **DevOps 프로젝트 설정** 아래의 **자격 증명**에서 다음 자격 증명을 만드세요. 자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../../../devops-user-guide/how-to-use/devops-settings/credential-management/)를 참조하십시오.

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
      gitlab-id
    </td>
    <td>
      계정 자격 증명
    </td>
    <td>
      GitLab
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

2. 생성 후 목록에서 자격 증명을 볼 수 있습니다.

### 2단계: GitLab 저장소에서 Jenkinsfile 수정

1. GitLab에 로그인하여 공개 프로젝트를 생성하세요. **가져오기 프로젝트/저장소**를 클릭하고 **URL로 저장소 가져오기**을 선택하여 [devops-maven-sample](https://github.com/kubesphere/devops-maven-sample)의 URL을 입력하고 *를 선택하세요. **가시성 수준**에 대해 **공개**를 클릭한 다음 **프로젝트 생성**를 클릭하세요.

2. 방금 만든 프로젝트에서 마스터 브랜치에서 새 브랜치를 만들고 이름을 `gitlab-demo`로 지정합니다.

3. `gitlab-demo` 브랜치에서 루트 디렉토리의 `Jenkinsfile-online` 파일을 클릭하세요.

4. **편집**을 클릭하고 `GITHUB_CREDENTIAL_ID`, `GITHUB_ACCOUNT`, `@github.com`을 각각 `GITLAB_CREDENTIAL_ID`, `GITLAB_ACCOUNT`, `@gitlab.com`으로 변경한 후 다음 항목을 편집하세요. 또한 `push latest` 및 `deploy to dev` 단계에서 `branch` 값을 `gitlab-demo`로 변경해야 합니다.

  <table>
  <thead>
  <tr>
    <th>
      항목
    </th>
    <th>
      값
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      GITLAB_CREDENTIAL_ID
    </td>
    <td>
      gitlab-id
    </td>
    <td>
      GitLab 계정에 대해 Super Kubenetes에서 설정한 <strong>이름</strong>. GitLab 저장소에 태그를 푸시하는 데 사용됩니다.
    </td>
  </tr>
  <tr>
    <td>
      DOCKERHUB_NAMESPACE
    </td>
    <td>
      felixnoo
    </td>
    <td>
      Docker Hub의 계정 이름으로 바꿉니다. 계정 아래의 조직 이름일 수 있습니다.
    </td>
  </tr>
  <tr>
    <td>
      GITLAB_ACCOUNT
    </td>
    <td>
      felixnoo
    </td>
    <td>
      GitLab 계정 이름으로 바꿉니다. 계정의 그룹 이름일 수도 있습니다.
    </td>
  </tr>
  </tbody>
  </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      Jenkinsfile의 환경 변수에 대한 자세한 내용은 [Jenkinsfile을 사용하여 파이프라인 생성](../create-a-pipeline-using-jenkinsfile/#step-2-modify-the-jenkinsfile-in-your-github-repository)을 참조하십시오.
    </div>
  </div>

5. **변경 사항 커밋**을 클릭하여 이 파일을 업데이트하세요.

### 3단계: 프로젝트 생성

`Super Kubenetes-sample-dev` 및 `Super Kubenetes-sample-prod`와 같이 각각 개발 환경과 운영 환경을 나타내는 두 개의 프로젝트를 생성해야 합니다. 자세한 내용은 [Jenkinsfile을 사용하여 파이프라인 생성](../create-a-pipeline-using-jenkinsfile/#step-3-create-projects)을 참조하세요.

### 4단계: 파이프라인 생성

1. Super Kubenetes 웹 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하고 **생성**을 클릭하여 새 파이프라인을 만듭니다.

2. 표시된 대화 상자에 기본 정보를 입력하세요. 이름을 `gitlab-multi-branch`로 지정하고 코드 저장소를 선택합니다.

3. **GitLab** 탭에서 **GitLab 서버 주소**에 대해 기본 옵션 `https://gitlab.com`을 선택하고 **프로젝트 그룹/소유자**에 대해 GitLab 프로젝트 소유자의 사용자 이름을 입력하세요. 를 클릭한 다음 **코드 저장소**의 드롭다운 목록에서 `devops-maven-sample` 저장소를 선택합니다. 오른쪽 하단에서 **√**를 클릭한 후 **다음**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      GitLab의 프라이빗 저장소를 사용하려면 다음 단계를 참조하세요.

    - GitLab의 **사용자 설정 > 액세스 토큰**으로 이동하여 API 및 read_repository 권한이 있는 액세스 토큰을 생성하세요.
    - [Jenkins 대시보드에 로그인](../../../how-to-integrate/sonarqube/#step-5-add-the-sonarqube-server-to-jenkins)하고, **Jenkins 관리 > 자격 증명 관리**로 이동하여 GitLab 토큰을 사용하여 GitLab에 액세스하기 위한 Jenkins 자격 증명을 만듭니다.
    그리고 **Jenkins 관리 > 시스템 설정**으로 이동하여 **GitLab 서버**에 자격 증명을 추가하세요.
    - DevOps 프로젝트에서 **DevOps 프로젝트 설정 > 자격 증명**을 선택하여 GitLab 토큰을 사용하여 자격 증명을 만듭니다. 파이프라인을 생성할 때 **GitLab** 탭의 **자격 증명**에서 자격 증명을 지정해야만 파이프라인이 프라이빗 GitLab 저장소로부터 코드를 가져올 수 있습니다.
    </div>
  </div>


4. **고급 설정** 탭에서 **스크립트 경로**까지 아래로 스크롤합니다. `Jenkinsfile-online`으로 변경한 다음 **생성**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      영역은는 코드 저장소의 Jenkinsfile 경로를 지정합니다. 저장소의 루트 디렉터리를 나타냅니다. 파일 위치가 변경되면 스크립트 경로도 변경해야 합니다.
    </div>
  </div>


### 5단계: 파이프라인 실행

1. 파이프라인이 생성되면 목록에 표시됩니다. 이름을 클릭하면 세부 정보 페이지로 이동합니다.

2. 오른쪽 **실행**을 클릭하세요. 표시된 대화 상자의 드롭다운 목록에서 **gitlab-demo**를 선택하고 `v0.0.2`와 같은 태그 번호를 추가합니다. **확인**을 클릭하여 새로 작동시킵니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      파이프라인은 `개발 환경에 배포` 단계에서 일시 중지됩니다. **진행**를 수동으로 클릭해야 합니다. 파이프라인은 Jenkinsfile에 각각 `개발 환경에 배포`, `태그와 함께 푸시`, `운영 환경에 배포`이 정의되어 있으므로 세 번 검토됩니다.
    </div>
  </div>

### 6단계: 파이프라인 상태 확인

1. **작업 상태** 탭에서 파이프라인이 어떻게 실행되고 있는지 확인할 수 있습니다. 오른쪽 상단의 **로그 확인**을 클릭하여 파이프라인 실행 로그를 확인하세요.

2. 파이프라인 실행을 중지할 수 있는 오류를 포함하여 파이프라인의 동적 로그 출력을 볼 수 있습니다. 각 단계에 대해 클릭하여 로그를 검사할 수 있으며 추가 분석을 위해 로컬 시스템에 다운로드할 수도 있습니다.

### 7단계: 결과 확인

1. 파이프라인을 통해 빌드된 Docker 이미지는 Jenkinsfile에 정의된 대로 Docker Hub에 성공적으로 푸시되었습니다. Docker Hub에서 파이프라인이 실행되기 전에 지정된 `v0.0.2` 태그가 있는 이미지를 찾을 수 있습니다.

2. 동시에 GitLab에 새로운 태그가 생성됩니다.

3. 샘플 애플리케이션은 해당 배포 및 서비스가 생성된 상태로 `Super Kubenetes-sample-dev` 및 `Super Kubenetes-sample-prod`에 배포됩니다.

  <table>
  <thead>
  <tr>
    <th>
      환경
    </th>
    <th>
      URL
    </th>
    <th>
      네임스페이스
    </th>
    <th>
      디플로이먼트
    </th>
    <th>
      서비스
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      개발
    </td>
    <td>
      <code>http://{$NodeIP}:{$30861}</code>
    </td>
    <td>
      Super Kubenetes-sample-dev
    </td>
    <td>
      ks-sample-dev
    </td>
    <td>
      ks-sample-dev
    </td>
  </tr>
  <tr>
    <td>
      운영
    </td>
    <td>
      <code>http://{$NodeIP}:{$30961}</code>
    </td>
    <td>
      Super Kubenetes-sample-prod
    </td>
    <td>
      ks-sample
    </td>
    <td>
      ks-sample
    </td>
  </tr>
  </tbody>
  </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      URL로 앱에 액세스할 수 있도록 보안 그룹에서 포트를 열어야 할 수도 있습니다. 자세한 내용은 [예제 서비스에 접속](../create-a-pipeline-using-jenkinsfile/#step-8-access-the-example-service)을 참조하세요.
    </div>
  </div>

