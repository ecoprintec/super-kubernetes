---
title: "Maven 프로젝트 빌드 및 배포"
keywords: 'Kubernetes, Docker, DevOps, Jenkins, Maven'
description: 'Learn how to build and deploy a Maven project using a Super Kubenetes pipeline.'
linkTitle: "Build and Deploy a Maven Project"
weight: 11430
---

## 사전 준비

- [Super Kubenetes DevOps 시스템 활성화](../../../pluggable-components/devops/)가 필요합니다.
- [Docker hub](https://www.dockerhub.com/) 계정이 있어야 합니다.
- Workspace, DevOps 프로젝트, 사용자 계정을 생성해야 하며, 이 사용자는 `operator` 역할로 DevOps 프로젝트에 초대받아야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## Maven 프로젝트의 워크플로

아래 그래프에서 볼 수 있듯이 Super Kubenetes DevOps에는 Jenkins 파이프라인을 사용하여 Maven 프로젝트를 빌드하고 배포하는 Maven 프로젝트에 대한 워크플로가 있습니다. 모든 단계는 파이프라인에서 정의됩니다.

![maven-project-jenkins](/dist/assets/docs/v3.3/devops-user-guide/examples/build-and-deploy-a-maven-project/maven-project-jenkins.png)

먼저 Jenkins Master는 파이프라인을 실행할 파드를 생성합니다. Kubernetes는 Jenkins Master의 에이전트로 파드를 생성하며, 파이프라인이 완료된 후 파드가 소멸됩니다. 주요 프로세스에는 코드 복제, 이미지 빌드 및 푸시, 워크로드 배포가 포함됩니다.

## Jenkins의 기본 설정

### 메이븐 버전

Maven 빌더 컨테이너에서 다음 명령을 실행하여 버전 정보를 가져오세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
                  mvn --version

                  Apache Maven 3.5.3 <span style="color:#f92672">(</span>3383c37e1f9e9b3bc3df5050c29c8aff9f295297; 2018-02-24T19:49:05Z<span style="color:#f92672">)</span> 
                  Maven home: /opt/apache-maven-3.5.3 
                  Java version: 1.8.0_232, vendor: Oracle Corporation
                  Java home: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.i386/jre
                  Default locale: en_US, platform encoding: UTF-8</p>
         </code>
      </div>
   </pre>
</article>

### 메이븐 캐시

Jenkins 에이전트는 노드의 Docker 볼륨별로 디렉터리를 마운트합니다. 파이프라인은 Maven 빌드에 사용되는 `/root/.m2`와 같은 일부 특수 디렉토리를 캐시할 수 있으며, Super Kubenetes DevOps에서 Maven 도구의 기본 캐시 디렉토리를 사용하여 종속항목 패키지를 노드에 다운로드하고 캐시할 수 있습니다.

### Jenkins 에이전트의 글로벌 Maven 설정

Maven 설정의 기본 파일 경로는 `maven`이고 설정 파일 경로는 `/opt/apache-maven-3.5.3/conf/settings.xml`입니다. 다음 명령을 실행하여 Maven 설정의 내용을 가져오세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
                  kubectl get cm -n Super Kubenetes-devops-worker ks-devops-agent -o yaml
            </p>
         </code>
      </div>
   </pre>
</article>

### Maven 파드의 네트워크

`maven`이라고 표시된 파드는 docker-in-docker 네트워크를 사용하여 파이프라인을 실행합니다. 즉, 노드의 `/var/run/docker.sock`이 Maven 컨테이너에 마운트됩니다.

## Maven 파이프라인 예제

### Maven 프로젝트 준비

- 개발 장치에서 Maven 프로젝트를 성공적으로 빌드했는지 확인하세요.
- Dockerfile을 프로젝트 저장소에 추가하여 이미지를 빌드하세요. 자세한 내용은 <https://github.com/kubesphere/devops-maven-sample/blob/master/Dockerfile-online>을 참조하세요.
- 프로젝트 리포지토리에 YAML 파일을 추가하여 워크로드를 배포하세요. 자세한 내용은 <https://github.com/kubesphere/devops-maven-sample/tree/master/deploy/dev-ol>을 참조하세요. 다른 환경이 있는 경우 여러 디플로이먼트 파일을 준비해야 합니다.

### 자격 증명 생성

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
		사용자 이름과 비밀번호
	</td>
	<td>
		Docker Hub와 같은 레지스트리
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
		워크로드 디플로이먼트
	</td>
</tr>
</tbody>
</table>

자세한 내용은 [자격 증명 관리](../../how-to-use/devops-settings/credential-management/)를 참조하세요.

### 워크로드용 프로젝트 만들기

이 예에서 모든 워크로드는 `Super Kubenetes-sample-dev`에 배포됩니다. `Super Kubenetes-sample-dev` 프로젝트를 미리 생성해야 합니다.

### Maven 프로젝트를 위한 파이프라인 생성

1. DevOps 프로젝트의 **파이프라인**으로 이동하고 **생성**을 클릭하여 `maven`이라는 파이프라인을 생성하세요. 자세한 내용은 [파이프라인 생성 - 그래픽 편집 패널 사용](../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/)을 참조하십시오.

2. 파이프라인의 세부 정보 페이지로 이동하여 **Jenkinsfile 편집**을 클릭하세요.

3. 다음 내용을 복사하여 표시된 대화 상자에 붙여넣습니다. `DOCKERHUB_NAMESPACE` 값을 자신의 값으로 바꿔야 합니다. 편집이 끝나면 **확인**을 클릭하여 Jenkinsfile을 저장하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                    pipeline <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;parameters <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string<span style="color:#f92672">(</span>name:<span style="color:#e6db74">'TAG_NAME'</span><span style="color:#f92672">,</span>defaultValue: <span style="color:#e6db74">''</span><span style="color:#f92672">,</span>description:<span style="color:#e6db74">''</span><span style="color:#f92672">)</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKER_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dockerhub-id'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'demo-kubeconfig'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
                    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// need to replace by yourself dockerhub namespace 
                    </span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_NAMESPACE <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Docker Hub Namespace'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-maven-sample'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BRANCH_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dev'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROJECT_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'kubesphere-sample-dev'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'checkout scm'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Please avoid committing your test changes to this repository 
                    </span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git branch: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span> url: <span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://github.com/kubesphere/devops-maven-sample.git"</a></span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'unit test'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn clean test'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn -Dmaven.test.skip=true clean package'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>usernamePassword<span style="color:#f92672">(</span>passwordVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_PASSWORD'</span> <span style="color:#f92672">&nbsp;,</span>usernameVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_USERNAME'</span> <span style="color:#f92672">&nbsp;,</span>credentialsId <span style="color:#f92672">:</span> <span style="color:#e6db74">"$DOCKER_CREDENTIAL_ID"</span> <span style="color:#f92672">,)])</span> <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to dev'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

4. 그래픽 편집 패널에서 스테이지와 스텝이 자동으로 생성되는 것을 볼 수 있습니다.

### 실행 및 테스트

1. **실행**을 클릭하고 표시된 대화 상자에서 **TAG_NAME**에 대해 `v1`을 입력한 다음 **확인**를 클릭하여 파이프라인을 실행합니다.

2. 파이프라인이 성공적으로 실행되면 **실행 기록** 탭으로 이동하여 세부 정보를 볼 수 있습니다.

3. `Super Kubenetes-sample-dev` 프로젝트에서 새로운 워크로드가 생성되었습니다.

4. **서비스** 페이지에서 생성된 서비스에 대한 외부 액세스 정보를 확인합니다.