---
title: "SonarQube를 파이프라인에 통합"
keywords: 'Kubernetes, Super Kubenetes, DevOps, Jenkins, SonarQube, Pipeline'
description: 'Integrate SonarQube into your pipeline for code quality analysis.'
linkTitle: "Integrate SonarQube into Pipelines"
weight: 11310
---

[SonarQube](https://www.sonarqube.org/)는 인기 있는 코드 품질 연속 검사 도구입니다. 코드베이스의 정적 및 동적 분석에 사용할 수 있습니다. Super Kubenetes [컨테이너 플랫폼](https://Super Kubenetes.io/)의 파이프라인에 통합된 후 SonarQube가 실행 중인 파이프라인에서 문제를 감지하므로 대시보드에서 직접 버그 및 취약점과 같은 일반적인 코드 문제를 볼 수 있습니다.

이 튜토리얼은 SonarQube를 파이프라인에 통합하는 방법을 시연합니다. 먼저 [Jenkinsfile을 사용하여 파이프라인 생성](../../../devops-user-guide/how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/)을 참고하세요.

## 사전 준비

[Super Kubenetes DevOps 시스템을 활성화](../../../pluggable-components/devops/)해야 합니다.

## SonarQube 서버 설치

SonarQube를 파이프라인에 통합하려면 먼저 SonarQube 서버를 설치해야 합니다.

1. 도구를 사용하여 SonarQube를 설치할 수 있도록 먼저 Helm을 설치하세요. 예를 들어, 다음 명령을 실행하여 Helm 3을 설치합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  curl <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3</a> | bash 
               </p>
            </code>
         </div>
      </pre>
   </article>

   Helm 버전을 확인합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm version 
                  
                  version.BuildInfo<span style="color:#f92672">{</span>Version:<span style="color:#e6db74">"v3.4.1"</span>, GitCommit:<span style="color:#e6db74">"c4e74854886b2efe3321e185578e6db9be0a6e29"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, GoVersion:<span style="color:#e6db74">"go1.14.11"</span><span style="color:#f92672">}</span></p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         자세한 내용은 [Helm 문서](https://helm.sh/docs/intro/install/)를 참조하세요.
      </div>
   </div>


2. 다음 명령어를 실행하여 SonarQube 서버를 설치하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm upgrade --install sonarqube sonarqube --repo <a style="color:#ffffff; cursor:text;"> https://charts.Super Kubenetes.io/main</a> -n Super Kubenetes-devops-system  --create-namespace --set service.type=NodePort</p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
   <p>Note</p>
   <div>
      Helm 3를 사용하여 SonarQube 서버를 설치해야 합니다.
   </div>
   </div>


3. 다음과 같은 프롬프트가 표시될 것입니다.

   ![sonarqube-install](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-install.png)

## SonarQube 콘솔 주소 가져오기

1. 다음 명령을 실행하여 SonarQube NodePort를 가져오세요.

	<article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services sonarqube-sonarqube<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT</a></p>
            </code>
         </div>
      </pre>
   </article>

2. 아래와 같은 출력을 볼 수 있습니다. (`31434`는 이 예시에서의 포트 번호이며 자신의 것과 다를 수 있음) :

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text">http://192.168.0.4:31434</a></p>
            </code>
         </div>
      </pre>
   </article>

## SonarQube 서버 설정

### 1단계: SonarQube 콘솔에 액세스

1. 다음 명령을 실행하여 SonarQube의 상태를 확인하세요. SonarQube가 실행될 때까지 SonarQube 콘솔에 액세스할 수 없습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>$ kubectl get pod -n Super Kubenetes-devops-system</span> 
                  <span>NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY&nbsp;&nbsp;&nbsp;STATUS&nbsp;&nbsp;&nbsp;&nbsp;RESTARTS&nbsp;&nbsp;&nbsp;AGE</span> 
                  <span>devops-jenkins-68b8949bb-7zwg4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;84m</span> 
                  <span>s2ioperator-0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;84m</span> 
                  <span>sonarqube-postgresql-0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5m31s</span> 
                  <span>sonarqube-sonarqube-bb595d88b-97594&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;2</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5m31s </span></p>
            </code>
         </div>
      </pre>
   </article>  

2. 브라우저에서 SonarQube 콘솔 `http://<Node IP>:<NodePort>`에 액세스하세요.

3. 우측 상단의 **로그인**을 클릭하고 기본 계정인 `admin/admin`으로 로그인하세요.

   <div className="notices note">
      <p>Note</p>
      <div>
         인스턴스가 배포된 위치에 따라 보안 그룹의 SonarQube에 액세스하기 위해 필요한 포트 포워딩 규칙을 설정하고 포트를 열어야 할 수도 있습니다.
      </div>
   </div>

### 2단계: SonarQube 관리 토큰 생성

1. **A**를 클릭하고 메뉴에서 **내 계정**을 선택하여 **프로필** 페이지로 이동하세요.

   ![sonarqube-config-1](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-1.jpg)

2. **보안**을 클릭하고 `Super Kubenetes`와 같은 토큰 이름을 입력하세요.

   ![sonarqube-config-2](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-2.jpg)

3. **생성**을 클릭하고 토큰을 복사하세요.

   ![sonarqube-config-3](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-3.jpg)

   <div className="notices warning">
      <p>Warning</p>
      <div>
            프롬프트에 표시된 것처럼 토큰을 다시 볼 수 없으므로 토큰을 반드시 복사해야 합니다.
      </div>
   </div> 

### 3단계: 웹훅 서버 생성

1. 다음 명령을 실행하여 SonarQube 웹훅의 주소를 가져오세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT/sonarqube-webhook/</a></p>
            </code>
         </div>
      </pre>
   </article>

2. 예상되는 출력:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text">http://192.168.0.4:30180/sonarqube-webhook/</a></p>
            </code>
         </div>
      </pre>
   </article>

3. **관리**, **설정**, **웹훅**을 차례로 클릭하여 웹훅을 생성하세요. 

   ![sonarqube-webhook-1](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-webhook-1.jpg)

4. **생성**을 클릭하세요.

   ![sonarqube-webhook-3](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-webhook-3.jpg)

5. 표시된 대화 상자에 **이름** 및 **Jenkins 콘솔 URL**(예: SonarQube webhook 주소)을 입력합니다. **생성**을 클릭하여 완료합니다.

   ![webhook-page-info](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/webhook-page-info.jpg)

### 4단계: ks-installer에 SonarQube 설정 추가

1. 다음 명령어를 실행하여 `ks-installer`를 편집하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cc -n Super Kubenetes-system ks-installer</p>
            </code>
         </div>
      </pre>
   </article>

2. `DevOps`로 이동하세요. `sonarqube` 영역을 추가하고 그 아래에 `externalSonarUrl` 및 `externalSonarToken`을 지정하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">devops</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_MaxRAM</span>: <span style="color:#ae81ff">2g</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_Xms</span>: <span style="color:#ae81ff">512m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_Xmx</span>: <span style="color:#ae81ff">512m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsMemoryLim</span>: <span style="color:#ae81ff">2Gi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsMemoryReq</span>: <span style="color:#ae81ff">1500Mi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsVolumeSize</span>: <span style="color:#ae81ff">8Gi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;sonarqube</span>: <span style="color:#75715e"><span>#</span> Add this field manually.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;externalSonarUrl</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.4:31434<span></span></span><span style="color:#75715e">&nbsp;<span>#</span> The SonarQube IP address.</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;externalSonarToken</span>: <span style="color:#ae81ff">f75dc3be11fd3d58debfd4e445e3de844683ad93</span><span style="color:#75715e">&nbsp;<span>#</span> The SonarQube admin token created above.</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. 완료 후 파일을 저장합니다.

### 5단계: Jenkins에 SonarQube 서버 추가

1. 다음 명령을 실행하여 Jenkins의 주소를 가져오세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Jenkins의 포트 번호를 알려주는 다음과 같은 출력을 얻을 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text"> http://192.168.0.4:30180</a></p>
            </code>
         </div>
      </pre>
   </article>

3. `http://<Node IP>:30180` 주소로 Jenkins에 접속합니다. Super Kubenetes가 설치되면 Jenkins 대시보드도 기본적으로 설치됩니다. 게다가 Jenkins는 Super Kubenetes LDAP로 설정되어 있으므로 Super Kubenetes 계정(예: `admin/P@88w0rd`)으로, Jenkins에 직접 로그인할 수 있습니다. Jenkins 설정에 대한 자세한 내용은 [Jenkins 시스템 설정](../../../devops-user-guide/how-to-use/pipelines/jenkins-setting/)을 참조하십시오.

   <div className="notices note">
      <p>Note</p>
      <div>
         인스턴스가 배포된 위치에 따라 보안 그룹의 Jenkins에 접속하려면 필요한 포트 포워딩 규칙을 설정하고 포트 `30180`을 열어야 할 수 있습니다.
      </div>
   </div>

4. 왼쪽 탐색 창에서 **Jenkins 관리**를 클릭하세요.

5. **시스템 설정**까지 아래로 스크롤하여 클릭하세요.

6. **SonarQube 서버**로 이동하여 **SonarQube 추가**를 클릭하세요.

7. **이름** 및 **서버 URL**(`http://<노드 IP>:<노드포트>`)을 입력하세요. **추가**를 클릭하고 **Jenkins**를 선택한 다음, 아래 두 번째 이미지와 같이 표시된 대화 상자에서 SonarQube 관리 토큰을 사용하여 자격 증명을 만드세요. 자격 증명을 추가한 후 **서버 인증 토큰**의 드롭다운 목록에서 선택한 다음, **적용**을 클릭하여 완료합니다.

   ![sonarqube-jenkins-settings](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-jenkins-settings.png)

   ![add-credentials](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/add-credentials.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         Jenkins의 알려진 버그인, **추가** 버튼이 작동하지 않는 경우 **Jenkins 관리** 아래의 **자격 증명 관리**로 이동하여 **Stores scoped to**에서 **Jenkins**를 클릭할 수 있습니다. Jenkins**, **전역 자격 증명(무제한)**을 클릭한 다음 왼쪽 내비게이션 바에서 **자격 증명 추가**를 클릭하여, 위의 두 번째 이미지를 참고해서, SonarQube 관리 토큰으로 자격 증명을 추가하세요. 자격 증명을 추가한 후 **서버 인증 토큰**의 드롭다운 목록에서 자격 증명을 선택할 수 있습니다.
      </div>
   </div>

### 6단계: Super Kubenetes 콘솔에 sonarqubeURL 추가

Super Kubenetes 콘솔에서 직접 SonarQube에 접속할 수 있도록 `sonarqubeURL`을 지정해야 합니다.

1. 다음 명령을 실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit  cm -n Super Kubenetes-system  ks-console-config</p>
            </code>
         </div>
      </pre>
   </article>

2. `data.client.enableKubeConfig`로 이동하여 `sonarqubeURL`이 지정된 `devops` 영역을 그 아래에 추가하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  client:
                  &nbsp;&nbsp;enableKubeConfig: true
                  &nbsp;&nbsp;devops: <span style="color:#75715e"><span>&nbsp;#</span><span> Add this field manually.</span></span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;sonarqubeURL: <a style="color:#ffffff; cursor:text">http://192.168.0.4:31434</a> <span style="color:#75715e"><span>&nbsp;#</span> The SonarQube IP address.</span></p>
            </code>
         </div>
      </pre>
   </article>

3. 파일을 저장하세요.

### 7단계: 서비스 다시 시작

다음 명령을 실행하세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-devops-system rollout restart deploy devops-apiserver</p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system rollout restart deploy ks-console</p>
         </code>
      </div>
   </pre>
</article>

## 새 프로젝트를 위한 SonarQube 토큰 생성

파이프라인이 실행될 때 SonarQube와 통신할 수 있도록 SonarQube 토큰이 필요합니다.

1. SonarQube 콘솔에서 **새 프로젝트 생성**를 클릭하세요.

   ![sonarqube-create-project](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-create-project.jpg)

2. `java-demo`와 같은 프로젝트 키를 입력하고 **설정**을 클릭하세요.

   ![jenkins-projet-key](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/jenkins-projet-key.jpg)

3. `java-sample`과 같은 프로젝트 이름을 입력하고 **생성**를 클릭하세요.

   ![generate-a-token](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/generate-a-token.jpg)

4. 토큰이 생성되면 **계속**을 클릭하세요.

   ![token-created](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/token-created.jpg)

5. **Java** 및 **Maven**을 각각 선택합니다. 일련 번호를 파이프라인에서 사용하려면 [자격 증명](../../../devops-user-guide/how-to-use/devops-settings/credential-management/#create-credentials) 섹션에 추가해야 하는, 아래 이미지의 녹색 상자 안의 시리얼 번호를 복사하세요. 

   ![sonarqube-example](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-example.jpg)

## Super Kubenetes 콘솔에서 결과 보기

[그래픽 편집 패널을 사용하여 파이프라인을 생성](../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/)하거나 또는 [Jenkinsfile을 사용하여 파이프라인을 생성](../../how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/)한 후에 코드 품질 분석 결과를 볼 수 있습니다.
