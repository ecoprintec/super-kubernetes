---
title: "Harbor를 파이프라인에 통합"
keywords: 'Kubernetes, Docker, DevOps, Jenkins, Harbor'
description: 'Integrate Harbor into your pipeline to push images to your Harbor registry.'
linkTitle: "Integrate Harbor into Pipelines"
weight: 11320
---

이 튜토리얼은 Harbor를 Super Kubenetes 파이프라인에 통합하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템 활성화](../../../pluggable-components/devops/)가 필요합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 계정은 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## Harbor 설치

[Super Kubenetes의 앱 스토어](../../../application-store/built-in-apps/harbor-app/)를 통해 Harbor를 설치하는 것이 좋습니다. 그렇지 않으면 Helm3를 통해 Harbor를 수동으로 설치하십시오.

  <article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                helm repo add harbor <a style="color:#ffffff; cursor:text">https://helm.goharbor.io</a> 
                <span style="color:#75715e"><span>#</span><span>&nbsp;For a quick start, you can expose Harbor by nodeport and disable tls.</span></span> 
                <span style="color:#75715e"><span>#</span><span>&nbsp;Set externalURL to one of your node ip and make sure it can be accessed by jenkins.</span></span> 
                helm install harbor-release harbor/harbor --set expose.type<span style="color:#f92672">=</span>nodePort,externalURL<span style="color:#f92672">=</span>http://$ip:30002,expose.tls.enabled<span style="color:#f92672">=</span>false
              </p>
          </code>
        </div>
    </pre>
  </article>

## Harbor 자격 증명 받기

1. Harbor가 설치된 후 `<NodeIP>:30002`를 방문하여 기본 계정과 비밀번호(`admin/Harbor12345`)로 콘솔에 로그인하세요. 왼쪽 탐색 창에서 **프로젝트**를 클릭하고 **프로젝트** 페이지에서 **새 프로젝트**를 클릭하세요.

2. 표시된 대화 상자에서 이름(`ks-devops-harbor`)을 설정하고 **확인**을 클릭하세요.

3. 방금 생성한 프로젝트를 클릭하고 **Robot Accounts** 탭에서 **NEW ROBOT ACCOUNT**를 클릭하세요.

4. 표시된 대화 상자에서 로봇 계정의 이름(`robot-test`)을 설정하고 **저장**을 클릭하세요. **권한**에서 아티팩트 푸시 확인란을 선택했는지 확인하세요.

5. 표시된 대화 상자에서 **파일로 내보내기**를 클릭하여 토큰을 저장합니다.

## 안전하지 않은 레지스트리 활성화

Harbour 레지스트리에 대한 보안을 무시하도록 Docker를 설정해야 합니다.

1. 호스트에서 `vim /etc/docker/daemon.json` 명령을 실행하여 `daemon.json` 파일을 편집하고 다음 내용을 입력하고 변경 사항을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
          <code>
            <p>
              {
                <span style="color:#f92672">"insecure-registries"</span> : [<span style="color:#e6db74">"103.61.38.55:30002"</span>]
              }
            </p>
          </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `103.61.38.55:30002`를 Harbor 레지스트리 주소로 바꿔야 하는 것을 명심하세요.
      `daemon.json` 파일의 기본 위치는 Linux의 경우 `/etc/docker/daemon.json`이고, Windows의 경우 `C:\ProgramData\docker\config\daemon.json`입니다.
    </div>
  </div>

2. 변경 사항을 적용하려면 다음 명령을 실행하여 Docker를 다시 시작하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
          <code>
            <p>
                sudo systemctl daemon-reload
                sudo systemctl restart docker
            </p>
          </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이 솔루션은 격리된 테스트나 엄격하게 제어되는 air-gapped 환경에서 사용하는 것을 권장합니다. 자세한 내용은 [일반 HTTP 레지스트리 배포](https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry)를 참조하세요. 위 작업을 완료한 후 프로젝트에 워크로드를 배포할 때 Harbor 레지스트리의 이미지를 사용할 수도 있습니다. Harbour 레지스트리에 대한 이미지 시크릿을 생성한 다음 Harbour 레지스트리를 선택하고, **컨테이너 이미지** 탭 아래의 **컨테이너 설정**에서 이미지의 절대 경로를 입력하여 이미지를 검색해야 합니다.
    </div>
  </div>

## 자격 증명 생성

1. Super Kubenetes에 `project-regular`로 로그인하고 DevOps 프로젝트로 이동하여 **DevOps 프로젝트 설정** 아래의 **자격 증명**에서 Harbor에 대한 자격 증명을 만드세요.

2. **자격 증명 생성** 페이지에서 자격 증명 ID(`robot-test`)를 설정하고 **유형**에 대해 **사용자 이름 및 비밀번호**를 선택하세요. **사용자 이름** 영역은는 방금 다운로드한 JSON 파일의 `name` 값과 같아야 하며 **비밀번호/토큰**에 대한 파일의 `token` 값을 입력해야 합니다.

3. **확인**을 클릭하여 저장합니다.

## 파이프라인 생성

1. **파이프라인** 페이지로 이동하여 **생성**을 클릭하세요. **기본 정보** 탭에서 파이프라인의 이름(`demo-pipeline`)을 입력하고 **다음**를 클릭하세요.

2. **고급 설정**에서 기본값을 사용하고 **생성**을 클릭하세요.

## 젠킨스 파일 편집

1. 파이프라인을 클릭하여 세부 정보 페이지로 이동하고 **Jenkinsfile 편집**을 클릭하세요.

2. 다음 내용을 복사하여 Jenkinsfile에 붙여넣습니다. `REGISTRY`, `HARBOR_NAMESPACE`, `APP_NAME` 및 `HARBOR_CREDENTIAL` 값을 자신의 값으로 바꿔야 합니다.

      <article className="highlight">
      <pre>
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
									
									&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the address of your harbor registry
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'103.61.38.55:30002'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the project name 
									</span><span style="color:#75715e"></span>    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// make sure your robot account have enough access to the project
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;HARBOR_NAMESPACE <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'ks-devops-harbor'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// docker image name 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker-example'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// ‘robot-test’ is the credential ID you created on the KubeSphere console 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;HARBOR_CREDENTIAL <span style="color:#f92672">=</span> credentials<span style="color:#f92672">(</span><span style="color:#e6db74">'robot-test'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'docker login'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps<span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// replace the Docker Hub username behind -u and do not forget ''. You can also use a Docker Hub token. 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'''echo $HARBOR_CREDENTIAL_PSW | docker login $REGISTRY -u 'robot$robot-test' --password-stdin'''</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'git clone <a style="color:#e6db74; cursor:text;">https://github.com/kstaken/dockerfile-examples.git'</a></span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'cd dockerfile-examples/rethinkdb &amp;&amp; docker build -t $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:devops-test .'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:devops-test'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
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
      환경 변수가 있는 Jenkins 자격 증명을 통해 파라미터를 `docker login -u`에 전달할 수 있습니다. 그러나 모든 Harbor robot account의 사용자 이름에는 "\$" 문자가 포함되어 있으며 환경 변수에서 사용할 때 Jenkins에 의해 "\$$"로 변환됩니다. [더 알아보기](https://number1.co.za/rancher-cannot-use-harbor-robot-account-imagepullbackoff-pull-access-denied/).
    </div>
  </div>

## 파이프라인 실행

Jenkinsfile을 저장하고 Super Kubenetes는 그래픽 편집 패널에 모든 단계와 단계를 자동으로 생성합니다. **실행**을 클릭하여 파이프라인을 실행하세요. 모든 것이 잘되면 이미지가 Jenkins에 의해 Harbour 레지스트리로 푸시됩니다.


