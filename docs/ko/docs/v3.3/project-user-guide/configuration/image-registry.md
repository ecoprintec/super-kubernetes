---
title: "이미지 레지스트리"
keywords: 'Super Kubenetes, Kubernetes, docker, Secrets'
description: 'Learn how to create an image registry on Super Kubenetes.'
linkTitle: "Image Registries"
weight: 10430
---

Docker 이미지는 컨테이너 서비스를 배포하는 데 사용할 수 있는 읽기 전용 템플릿입니다. 각 이미지에는 고유 식별자(예를 들면, 이미지 이름:태그)가 있습니다. 예를 들어 이미지에는 Apache와 몇 가지 애플리케이션만 설치된 Ubuntu 운영 체제 환경의 전체 패키지가 포함될 수 있습니다. 이미지 레지스트리는 Docker 이미지를 저장하고 배포하는 데 사용됩니다.

이 튜토리얼에서는 여러 이미지 레지스트리에 대한 시크릿을 만드는 방법을 시연합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 시크릿 생성

워크로드, [서비스](../../../project-user-guide/application-workloads/services/), [잡](../../../project-user-guide/application-workloads/jobs/) 또는 [크론잡](../../../project-user-guide/application-workloads/cronjobs/)을 생성할 때, 퍼블릭 레지스트리뿐만 아니라 프라이빗 레지스트리에서도 이미지를 선택할 수 있습니다. 프라이빗 레지스트리의 이미지를 사용하려면 레지스트리가 Super Kubenetes에 통합될 수 있도록 이에 대한 시크릿을 생성해야 합니다.

### 1단계: 대시보드 열기

Super Kubenetes의 웹 콘솔에 `project-regular`로 로그인하세요. 프로젝트의 **설정**으로 이동하여 **시크릿**을 선택하고 **생성**을 클릭하세요.

### 2단계: 기본 정보 입력

시크릿 이름(예: `demo-registry-secret`)을 지정하고 **다음**을 클릭하여 계속합니다.

<div className="notices tip">
   <p>Tip</p>
   <div>
      오른쪽 상단 모서리에서 **YAML 편집**을 활성화하면 시크릿의 매니페스트 파일을 YAML 형식으로 볼 수 있습니다. Super Kubenetes를 사용하면 매니페스트 파일을 직접 편집하여 시크릿을 생성할 수 있습니다. 그게 아니면, 아래 단계에 따라 대시보드를 통해 시크릿을 생성할 수 있습니다.
   </div>
</div>

### 3단계: 이미지 레지스트리 정보 지정

**유형**으로 **이미지 레지스트리 정보**를 선택하세요. 애플리케이션 워크로드를 생성할 때 프라이빗 레지스트리의 이미지를 사용하려면 다음 영역을 지정해야 합니다.

- **레지스트리 주소**. 애플리케이션 워크로드를 생성할 때 사용할 이미지를 저장하는 이미지 레지스트리의 주소.
- **사용자 이름**. 레지스트리에 로그인하는 데 사용하는 계정 이름.
- **비밀번호**. 레지스트리에 로그인하는 데 사용하는 비밀번호.
- **이메일**(선택사항). 자신의 이메일 주소.

#### Docker 허브 레지스트리 추가

1. [Docker 허브](https://hub.docker.com/)에 이미지 레지스트리를 추가하기 전에, 사용 가능한 Docker 허브 계정이 있는지 확인하세요. **시크릿 설정** 페이지에서 **레지스트리 주소**에 `docker.io`를 입력하고 **사용자 이름**과 **비밀번호**에 Docker ID와 비밀번호를 입력합니다. **승인**을 클릭하여 주소를 사용할 수 있는지 확인하세요.

2. **생성**을 클릭하세요. 이후 시크릿이 **시크릿** 페이지에 표시됩니다. 시크릿을 생성한 후에 시크릿을 수정하는 방법에 대한 자세한 내용은 [시크릿 세부정보 확인](../../../project-user-guide/configuration/secrets/#check-secret-details)을 참조하세요.

#### Harbor 이미지 레지스트리 추가

[Harbor](https://goharbor.io/)는 콘텐츠를 저장, 서명 및 스캔하는 오픈 소스의 신뢰할 수 있는 클라우드 네이티브 레지스트리 프로젝트입니다. Harbor는 보안, ID 및 관리와 같이 일반적으로 사용자가 필요로 하는 기능을 추가하여 오픈 소스 Docker 배포를 확장합니다. Harbor는 HTTP 및 HTTPS를 사용하여 레지스트리 요청을 제공합니다.

**HTTP**

1. 클러스터 내의 모든 노드에 대한 Docker 설정을 수정해야 합니다. 예를 들어, 외부 Harbor 레지스트리가 있고 IP 주소가 `http://192.168.0.99`이면 `--insecure-registry=192.168.0.99` 영역을 `/etc/systemd/system/docker.service.d/docker-options.conf`에 추가해야 합니다 :

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <span style="color:#f92672">[</span>Service<span style="color:#f92672">]</span>
               Environment<span style="color:#f92672">=</span><span style="color:#e6db74">"DOCKER_OPTS=--registry-mirror=<span><a style="color:#e6db74; cursor:text;">https://registry.docker-cn.com</a></span> --insecure-registry=10.233.0.0/18 --data-root=/var/lib/docker --log-opt max-size=50m --log-opt max-file=5 \
               </span><span style="color:#e6db74">--insecure-registry=192.168.0.99"</span></code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - 이미지 레지스트리 주소를 자신의 레지스트리 주소로 바꾸세요.

      - `환경`은 [dockerd 옵션](https://docs.docker.com/engine/reference/commandline/dockerd/)을 나타냅니다.

      - `--insecure-registry`는 안전하지 않은 레지스트리와의 통신을 위해 Docker daemon에 의해 요구됩니다. 해당 구문은 [Docker 문서](https://docs.docker.com/engine/reference/commandline/dockerd/#https-registries)를 참조하세요.
    </div>
  </div> 

2. 그 다음, 설정 파일을 다시 로드하고 Docker를 다시 시작하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
                 sudo systemctl daemon-reload
            </code>
         </div>
      </pre>
   </article>

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
                  sudo systemctl restart docker
            </code>
         </div>
      </pre>
   </article>

3. **데이터 설정** 페이지로 돌아가서 **유형**으로 **이미지 레지스트리 정보**를 선택하세요. **레지스트리 주소**에 Harbor IP 주소를 입력하고, 사용자 이름과 비밀번호를 입력하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      Harbor에서 IP 주소 대신 도메인 이름을 사용하려면 클러스터 내에서 CoreDNS와 nodelocaldns를 구성해야 할 수 있습니다.
    </div>
  </div> 
   
4. **생성**을 클릭하세요. 이후 시크릿이 **시크릿** 페이지에 표시됩니다. 시크릿을 생성한 후에 시크릿을 수정하는 방법에 대한 자세한 내용은 [시크릿 세부정보 확인](../../../project-user-guide/configuration/secrets/#check-secret-details)을 참조하세요.


**HTTPS**

HTTPS 기반의 Harbor 레지스트리 통합은 [Harbor 문서](https://goharbor.io/docs/1.10/install-config/configure-https/)을 참고하세요. 반드시 `도커 로그인`을 사용하여 Harbor 레지스트리에 연결하세요.

## 이미지 레지스트리 사용

이미지를 설정할 때, 시크릿 이미지 레지스트리를 미리 생성해 두면 프라이빗 이미지 레지스트리를 선택할 수 있습니다. 예를 들어, [디플로이먼트](../../../project-user-guide/application-workloads/deployments/)를 생성할 때 **컨테이너 추가** 페이지에서 화살표를 클릭하여 레지스트리 목록을 확장하세요. 이미지 레지스트리를 선택한 후, 이미지 이름과 태그를 입력하여 이미지를 사용하세요.

