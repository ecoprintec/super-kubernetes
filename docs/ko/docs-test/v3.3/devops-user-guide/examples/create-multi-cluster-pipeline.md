---
title: "멀티 클러스터 파이프라인 생성"
keywords: 'Super Kubenetes, Kubernetes, Multi-cluster, Pipeline, DevOps'
description: 'Learn how to create a multi-cluster pipeline on Super Kubenetes.'
linkTitle: "Create a Multi-cluster Pipeline"
weight: 11440
---

클라우드 제공업체는 다양한 호스팅 쿠버네티스 서비스를 제공하므로 DevOps 파이프라인은 여러 쿠버네티스 클러스터가 관련된 사용 사례를 처리해야 합니다.

이 튜토리얼은 Super Kubenetes에서 멀티 클러스터 파이프라인을 생성하는 방법을 시연합니다.

## 사전 준비

- Super Kubenetes가 설치된 3개의 쿠버네티스 클러스터가 필요합니다. 하나의 클러스터를 호스트 클러스터로 선택하고 다른 두 개를 멤버 클러스터로 선택합니다. 클러스터 역할 및 Super Kubenetes에서 멀티 클러스터 환경을 구축하는 방법에 대한 자세한 내용은 [멀티 클러스터 관리](../../../multicluster-management/)를 참조하십시오.
- 멤버 클러스터를 [퍼블릭 클러스터](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/#make-a-cluster-public)로 설정해야 합니다. 또는 [워크스페이스가이 생성된 후 클러스터 가시성을 설정](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/#set-cluster-visibility-after-a-workspace-is-created)하세요.
- 호스트 클러스터에서 [Super Kubenetes DevOps 시스템을 활성화](../../../pluggable-components/devops/)해야 합니다.
- SonarQube를 파이프라인에 통합해야 합니다. 자세한 내용은 [SonarQube를 파이프라인에 통합](../../how-to-integrate/sonarqube/)을 참조하세요.
- 호스트 클러스터에 `ws-manager`, `ws-admin`, `project-admin` 및 `project-regular`의 4개 계정을 만들고, 이 계정에 다른 역할을 부여해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/#step-1-create-an-account)을 참조하세요.

## 워크플로 개요

이 튜토리얼에서는 세 개의 클러스터를 사용하여 워크플로에서 세 개의 격리된 환경을 제공합니다. 아래 도표를 참조하십시오.

![use-case-for-multi-cluster](/dist/assets/docs/v3.3/devops-user-guide/examples/create-multi-cluster-pipeline/use-case-for-multi-cluster. png)

3개의 클러스터는 각각 개발, 테스트 및 운영에 사용됩니다. 코드가 Git 리포지토리에 제출되면 파이프라인이 `단위 테스트`, `SonarQube 분석`, `빌드 및 푸시` 및 `개발 클러스터에 배포` 단계를 통해 실행되도록 트리거됩니다. 개발자는 자체 테스트 및 검증을 위해 개발 클러스터를 사용합니다. 개발자가 승인하면 파이프라인은 엄격한 검증을 위해 `테스트 클러스터에 배포` 단계로 진행됩니다. 마지막으로 필요한 승인이 준비된 파이프라인은 `운영 클러스터에 배포` 단계에 도달하여 외부에서 서비스를 제공합니다.

## 실습

### 1단계: 클러스터 준비

각 클러스터의 역할은 아래 표를 참조하십시오.

  <table>
  <thead>
  <tr>
    <th>
      클러스터 이름
    </th>
    <th>
      클러스터 역할
    </th>
    <th>
      용법
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      host
    </td>
    <td>
      호스트 클러스터
    </td>
    <td>
      테스트
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      멤버 클러스터 
    </td>
    <td>
      운영
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      멤버 클러스터
    </td>
    <td>
      개발
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
이러한 쿠버네티스 클러스터는 다양한 클라우드 제공업체에서 호스팅될 수 있으며 해당 쿠버네티스 버전도 다를 수 있습니다. Super Kubenetes 3.3.0에 권장되는 쿠버네티스 버전: v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x (실험 지원).
  </div>
</div>

### 2단계: 워크스페이스 생성

1. 호스트 클러스터의 웹 콘솔에 `ws-manager`로 로그인합니다. **작업공간** 페이지에서 **생성**를 클릭하세요.

2. **기본 정보** 페이지에서 워크스페이스의 이름을 `devops-multicluster`로 지정하고 **관리자**에 대해 `ws-admin`을 선택한 후 **다음**을 클릭하세요.

3. **클러스터 설정** 페이지에서 세 개의 클러스터를 모두 선택하고 **생성**을 클릭하세요.

4. 생성된 워크스페이스가이 목록에 표시됩니다. 콘솔에서 로그아웃하고 `ws-admin`으로 다시 로그인하여 `project-admin`과 `project-regular`를 작업공간에 초대하고 이들에게 `workspace-self-provisioner` 및 `workspace-viewer` 역할을 부여해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/#step-2-create-a-workspace)를 참조하세요.

### 3단계: DevOps 프로젝트 생성

1. 콘솔에서 로그아웃하고 `project-admin`으로 다시 로그인합니다. **DevOps 프로젝트** 페이지로 이동하여 **생성**를 클릭하세요.

2. 표시된 대화 상자에서 **이름**에 `multicluster-demo`를 입력하고 **클러스터 설정**에 대해 **호스트**를 선택한 다음 **확인**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      DevOps 컴포넌트가 활성화된 클러스터만 드롭다운 목록에서 사용할 수 있습니다.
    </div>
  </div>


3. 생성된 DevOps 프로젝트가 목록에 표시됩니다. `project-regular` 사용자를 이 프로젝트에 초대하고 `operator` 역할을 할당했는지 확인하세요. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/#step-5-create-a-devops-project-optional).

### 4단계: 클러스터에서 프로젝트 생성

사전에 아래 표와 같이 프로젝트를 생성해야 합니다. 이 프로젝트에 `project-regular` 사용자를 초대하고 `operator` 역할을 할당했는지 확인하세요. 프로젝트 생성 방법에 대한 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/#step-3-create-a-project).

  <table>
  <thead>
  <tr>
    <th>
      클러스터 이름
    </th>
    <th>
      용법
    </th>
    <th>
      프로젝트 이름
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      host
    </td>
    <td>
      테스트
    </td>
    <td>
      Super Kubenetes-sample-prod
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      운영
    </td>
    <td>
      Super Kubenetes-sample-prod
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      개발
    </td>
    <td>
      Super Kubenetes-sample-dev
    </td>
  </tr>
  </tbody>
  </table>

### 5단계: 자격 증명 생성

1. 콘솔에서 로그아웃하고 `project-regular`로 다시 로그인합니다. **DevOps 프로젝트** 페이지에서 DevOps 프로젝트 `multicluster-demo`를 클릭하세요.

2. **자격 증명** 페이지에서 아래 표와 같이 자격 증명을 생성해야 합니다. 자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../how-to-use/devops-settings/credential-management/#create-credentials) 및 [Jenkinsfile을 사용하여 파이프라인 생성](../../how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/#step-1-create-credentials)dmf 참조하세요. .

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
      host
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      테스트용 호스트 클러스터
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      운영용 멤버 클러스터
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      개발을 위한 멤버 클러스터
    </td>
  </tr>
  <tr>
    <td>
      dockerhub-id
    </td>
    <td>
      사용자 이름과 비밀번호
    </td>
    <td>
      Docker 허브
    </td>
  </tr>
  <tr>
    <td>
      sonar-token
    </td>
    <td>
      엑세스 토큰
    </td>
    <td>
      SonarQube
    </td>
  </tr>
  </tbody>
  </table>
  
  <div className="notices note">
    <p>Note</p>
    <div>
      kubeconfig 자격 증명 `shire` 및 `rohan`을 생성할 때 멤버 클러스터의 kubeconfig를 수동으로 입력해야 합니다. 호스트 클러스터가 멤버 클러스터의 API 서버 주소에 액세스할 수 있는지 확인하십시오.
    </div>
  </div>

3. 총 5개의 자격 증명이 생성됩니다.

### 6단계: 파이프라인 생성

1. **파이프라인** 페이지로 이동하여 **생성**를 클릭하세요. 표시된 대화 상자에서 **이름**에 `build-and-deploy-application`을 입력하고 **다음**를 클릭하세요.

2. **고급 설정** 탭에서 **생성**를 클릭하여 기본 설정을 사용합니다.

3. 생성된 파이프라인이 목록에 표시됩니다. 이름을 클릭하면 세부 정보 페이지로 이동합니다.

4. **Jenkinsfile 편집**을 클릭하고 다음 내용을 복사하여 붙여넣습니다. `DOCKERHUB_NAMESPACE` 값을 자신의 값으로 바꾼 다음 **확인**을 클릭하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									pipeline <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;node <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;parameters <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string<span style="color:#f92672">(</span>name:<span style="color:#e6db74">'BRANCH_NAME'</span><span style="color:#f92672">,</span>defaultValue: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span>description:<span style="color:#e6db74">''</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKER_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dockerhub-id'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROD_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'shire'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEST_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'host'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEV_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'rohan'</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_NAMESPACE <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'your Docker Hub account ID'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-maven-sample'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SONAR_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'sonar-token'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TAG_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;"SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'checkout'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git branch: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span> url: <span style="color:#e6db74"><a style="color:#e6db74; cursor:text";>'https://github.com/Super Kubenetes/devops-maven-sample.git'</a></span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'unit test'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn clean test'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'sonarqube analysis'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>string<span style="color:#f92672">(</span>credentialsId: <span style="color:#e6db74">"$SONAR_CREDENTIAL_ID"</span><span style="color:#f92672">,</span> variable: <span style="color:#e6db74">'SONAR_TOKEN'</span><span style="color:#f92672">)])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withSonarQubeEnv<span style="color:#f92672">(</span><span style="color:#e6db74">'sonar'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">"mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn -Dmaven.test.skip=true clean package'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>usernamePassword<span style="color:#f92672">(</span>passwordVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_PASSWORD'</span> <span style="color:#f92672">&nbsp;,</span>usernameVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_USERNAME'</span> <span style="color:#f92672">,</span>&nbsp;credentialsId <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;"$DOCKER_CREDENTIAL_ID"</span> <span style="color:#f92672">&nbsp;,)])</span> <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'push latest'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to dev'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">DEV_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/dev-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to staging'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input<span style="color:#f92672">(</span>id: <span style="color:#e6db74">'deploy-to-staging'</span><span style="color:#f92672">,</span> message: <span style="color:#e6db74">'deploy to staging?'</span><span style="color:#f92672">)</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">TEST_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/prod-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to production'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input<span style="color:#f92672">(</span>id: <span style="color:#e6db74">'deploy-to-production'</span><span style="color:#f92672">,</span>&nbsp;message: <span style="color:#e6db74">'deploy to production?'</span><span style="color:#f92672">)</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">PROD_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/prod-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `mvn` 명령의 `-o` 플래그는 오프라인 모드가 활성화되었음을 나타냅니다. 관련 maven 종속성과 캐시가 로컬로 준비되어 있는 경우 오프라인 모드를 유지하여 시간을 절약할 수 있습니다.
    </div>
  </div>

5. 파이프라인이 생성된 후 그래픽 편집 패널에서도 해당 단계와 단계를 볼 수 있습니다.

### 7단계: 파이프라인 실행 및 결과 확인

1. **실행**을 클릭하여 파이프라인을 실행하세요. 파이프라인은 개발을 위해 리소스가 클러스터에 배포되었으므로 **스테이징에 배포** 단계에 도달하면 일시 중지됩니다. 테스트 클러스터 `host`와 운영 클러스터 `shire`에 리소스를 배포하려면 수동으로 **진행**을 두 번 클릭해야 합니다.

2. 잠시 후 **성공**으로 표시된 파이프라인 상태를 볼 수 있습니다.

3. 우측 상단의 **로그 보기**를 클릭하여 파이프라인 실행 로그를 확인하세요. 각 단계에 대해 이를 클릭하여 로그를 검사합니다. 로그는 추가 분석을 위해 로컬 시스템으로 다운로드할 수 있습니다.

4. 파이프라인이 성공적으로 실행되면 **코드 체크**를 클릭하여 SonarQube를 통해 결과를 확인하세요.

5. **프로젝트** 페이지로 이동하고 드롭다운 목록에서 특정 클러스터를 선택하여 클러스터 전체에서 서로 다른 프로젝트에 배포된 리소스를 볼 수 있습니다.
