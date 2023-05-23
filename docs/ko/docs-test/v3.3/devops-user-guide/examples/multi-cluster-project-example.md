---
title: "Jenkinsfile을 사용하여 멀티 클러스터 프로젝트에 앱 배포"
keywords: 'Kubernetes, Super Kubenetes, Docker, DevOps, Jenkins, Multi-cluster'
description: 'Learn how to deploy apps in a multi-cluster project using a Jenkinsfile-based pipeline.'
linkTitle: "Deploy Apps in a Multi-cluster Project Using a Jenkinsfile"
weight: 11420
---

## 사전 준비

- [멀티 클러스터 기능을 활성화](../../../multicluster-management/)하고 여러 클러스터로 워크스페이스를 만들어야 합니다.
- [Docker Hub](https://hub.docker.com/) 계정이 있어야 합니다.
- 호스트 클러스터에서 [Super Kubenetes DevOps System을 활성화](../../../pluggable-components/devops/)해야 합니다.
- 호스트 클러스터에서 멀티 클러스터 프로젝트와 DevOps 프로젝트를 생성하려면 `workspace-self-provisioner` 역할을 가진 사용자(예: `project-admin`)를 사용해야 합니다. 이 튜토리얼은 호스트 클러스터와 하나의 멤버 클러스터에 멀티 클러스터 프로젝트를 생성합니다.
- DevOps 프로젝트에 사용자(예: `project-regular`)를 초대하고 `operator` 역할을 부여해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/), [멀티 클러스터 관리](../../../multicluster-management/) 및 [멀티 클러스터 프로젝트](../../../project-administration/project-and-multicluster-project/#multi-cluster-projects)를 참조하세요.

## Docker Hub 액세스 토큰 생성

1. [Docker Hub](https://hub.docker.com/)에 로그인한 후, 우측 상단의 내 계정을 클릭한 다음, 메뉴에서 **계정 설정**을 선택합니다.

2. 왼쪽 탐색 창에서 **보안**을 클릭한 다음 **새 액세스 토큰**을 클릭하세요.

3. 표시된 대화 상자에서 토큰 이름(`go-project-token`)을 입력하고 **생성**를 클릭하세요.

4. **복사 후 닫기**를 클릭하고 액세스 토큰을 저장했는지 확인하세요.

## 자격 증명 생성

파이프라인이 이미지 푸시를 위해 Docker 헙와 상호 작용할 수 있도록 생성된 액세스 토큰에 대해 Super Kubenetes에서 자격 증명을 생성해야 합니다. 게다가 쿠버네티스 클러스터에 액세스하기 위한 kubeconfig 자격 증명도 생성해야 합니다.

1. Super Kubenetes의 웹 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트에서 **DevOps 프로젝트 설정** 아래의 **자격 증명**으로 이동한 다음 **자격 증명** 페이지에서 **생성**를 클릭하세요.

2. 표시된 대화 상자에서 나중에 Jenkinsfile에서 사용할 **이름**을 설정하고 **유형**에 **사용자 이름 및 암호**를 선택하세요. **사용자 이름**에 Docker Hub 계정 이름을 입력하고 **비밀번호/토큰**에 대해 방금 생성한 액세스 토큰을 입력하세요. 완료되면 **확인**을 클릭하세요.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../../devops-user-guide/how-to-use/devops-settings/credential-management/)를 참조하십시오.
     </div>
   </div>


3. Super Kubenetes 웹 콘솔에서 로그아웃하고 `project-admin`으로 다시 로그인하세요. DevOps 프로젝트로 이동하여 **자격 증명**에서 **생성**을 클릭하세요. **유형**에 대해 **kubeconfig**를 선택하세요. Super Kubenetes는 현재 계정의 kubeconfig인 **콘텐트** 영역을 자동으로 채웁니다. **이름**을 설정하고 **확인**을 클릭하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    향후 릴리스에서는 `project-regular` 계정을 멀티 클러스터 프로젝트에 초대하고 kubeconfig 자격 증명을 생성하는 데 필요한 역할을 부여할 수 있습니다.
  </div>
</div>


## 파이프라인 생성

위의 자격 증명이 준비되면 `project-regular` 사용자를 사용하여 아래와 같이 예제 Jenkinsfile로 파이프라인을 만들 수 있습니다.

1. 파이프라인을 생성하려면 **파이프라인** 페이지에서 **생성**을 클릭하세요.

2. 표시된 대화 상자에서 이름을 설정하고 **다음**을 클릭하세요.

3. 이 튜토리얼에서는 모든 영역에 기본값을 사용할 수 있습니다. **고급 설정** 탭에서 **생성**을 클릭하세요.

## 젠킨스 파일 편집

1. 파이프라인 목록에서 이 파이프라인을 클릭하여 세부 정보 페이지로 이동하세요. **Jenkinsfile 편집**을 클릭하여 Jenkinsfile을 정의하면 파이프라인이 이를 기반으로 실행됩니다.

2. 아래의 모든 콘텐츠를 파이프라인에 대한 예제 Jenkinsfile로 복사하여 표시된 대화 상자에 붙여넣습니다. `DOCKERHUB_USERNAME`, `DOCKERHUB_CREDENTIAL`, `KUBECONFIG_CREDENTIAL_ID`, `MULTI_CLUSTER_PROJECT_NAME` 및 `MEMBER_CLUSTER_NAME` 값을 자신의 값으로 바꿔야 합니다. 완료되면 **확인**을 클릭하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									pipeline <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'go'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// Docker Hub username 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_USERNAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Your Docker Hub username'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-go-sample'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// ‘dockerhub’ is the Docker Hub credentials ID you created on the Super Kubenetes console 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_CREDENTIAL <span style="color:#f92672">=</span> credentials<span style="color:#f92672">(</span><span style="color:#e6db74">'dockerhub'</span><span style="color:#f92672">)</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the kubeconfig credentials ID you created on the Super Kubenetes console 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'kubeconfig'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// mutli-cluster project name under your own workspace 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;MULTI_CLUSTER_PROJECT_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'demo-multi-cluster'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the name of the member cluster where you want to deploy your app 
									</span><span style="color:#75715e"></span>    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// in this tutorial, the apps are deployed on host cluster and only one member cluster 
									</span><span style="color:#75715e"></span>    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// for more member clusters, please edit manifest/multi-cluster-deploy.yaml 
									</span><span style="color:#75715e"></span>    MEMBER_CLUSTER_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Your member cluster name'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'docker login'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo $DOCKERHUB_CREDENTIAL_PSW  | docker login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'git clone <a style="color:#e6db74; cursor:text">https://github.com/yuswift/devops-go-sample.git'</a></span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'cd devops-go-sample &amp;&amp; docker build -t $REGISTRY/$DOCKERHUB_USERNAME/$APP_NAME .'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push $REGISTRY/$DOCKERHUB_USERNAME/$APP_NAME'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy app to multi cluster'</span><span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; devops-go-sample/manifest/multi-cluster-deploy.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
       파이프라인이 성공적으로 실행되면 이미지가 Docker Hub로 푸시됩니다. Harbor를 사용하는 경우, 환경 변수가 있는 Jenkins 자격 증명을 통해 파라미터를 `docker login -u`에 전달할 수 없습니다. 이는 모든 Harbour 로봇 계정 사용자 이름에 `$` 문자가 포함되어 있기 때문입니다. 이 문자는 환경 변수에서 사용할 때 Jenkins에 의해 `$$`로 변환됩니다. [더 알아보기](https://number1.co.za/rancher-cannot-use-harbor-robot-account-imagepullbackoff-pull-access-denied/).
    </div>
  </div>


## 파이프라인 실행

Jenkinsfile을 저장한 후 **실행**을 클릭하세요. 모든 것이 잘 진행되면 멀티 클러스터 프로젝트에 디플로이먼트 워크로드가 표시됩니다.
