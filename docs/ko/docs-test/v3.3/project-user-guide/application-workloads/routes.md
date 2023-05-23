---
title: "라우트"
keywords: "Super Kubenetes, Kubernetes, Route, Ingress"
description: "Learn basic concepts of Routes (i.e. Ingress) and how to create Routes in Super Kubenetes."
weight: 10270
---

이 문서는 Super Kubenetes에서 라우트를 생성, 사용 및 편집하는 방법을 설명합니다.

Super Kubenetes의 라우트는 쿠버네티스의 [인그레스](https://kubernetes.io/docs/concepts/services-networking/ingress/#what-is-ingress)와 동일합니다. 라우트와 단일 IP 주소를 사용하여 여러 서비스를 집계하고 노출할 수 있습니다.

## 사전 준비

- 워크스페이스, 프로젝트 및 두 명의 사용자를 생성해야 합니다(예: `project-admin` 및 `project-regular`). 프로젝트에서 `admin` 역할은 `project-admin`이어야 하고, `project-regular`은 `operator`여야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](/docs/v3.3/quick-start/create-workspace-and-project/)을 참조하십시오.
- HTTPS 모드에서 라우트에 접속하려면 [시크릿 생성](/docs/v3.3/project-user-guide/configuration/secrets/)이 필요하며, 이것은 암호화에 사용되는 `tls.crt`(TLS 인증서)와 `tls.key`(TLS 프라이빗 키) 키를 담고 있습니다.
- [서비스를 하나 이상 생성](/docs/v3.3/project-user-guide/application-workloads/services/)해야 합니다. 이 문서에서는 외부 요청에 파드 이름을 반환하는 데모 서비스를 예시로 사용합니다.

## 라우트 접속 방법 설정

1. Super Kubenetes 웹 콘솔에 `project-admin`으로 로그인하고 프로젝트로 이동하세요.

2. 왼쪽 내비게이션 바의 **프로젝트 설정**에서 **게이트웨이 설정**을 선택하고 오른쪽의 **게이트웨이 활성화**를 클릭하세요.

3. 표시된 대화 상자에서 **접속 모드**를 **NodePort** 또는 **LoadBalancer**로 설정하고 **확인**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      **접속 모드**가 **LoadBalancer**로 설정된 경우, 플러그인 사용 설명서에 따라 사용자 환경에서 로드 밸런서 플러그인을 활성화해야 할 수 있습니다.
    </div>
  </div>

## 라우트 생성

### 1단계: 기본 정보 설정

1. Super Kubenetes 웹 콘솔에서 로그아웃하고 `project-regular`로 다시 로그인한 후 동일한 프로젝트로 이동하세요.

2. 왼쪽 내비게이션 바의 **애플리케이션 워크로드**에서 **라우트**를 선택하고 오른쪽에서 **생성**을 클릭하세요.

3. **기본 정보** 탭에서 라우트에 대한 기본 정보를 설정하고 **다음**을 클릭하세요.
   * **이름**: 라우트의 이름으로, 고유 식별자로 사용됩니다.
   * **별칭**: 라우트의 별칭.
   * **설명**: 라우트에 대한 설명.

### 2단계: 라우팅 규칙 설정

1. **라우팅 규칙** 탭에서 **라우팅 규칙 추가**를 클릭하세요.

2. 모드를 선택하고, 라우팅 규칙을 구성하고, **√**를 클릭하고, **다음**을 클릭하세요.

   * **자동 생성**: Super Kubenetes는 `<서비스 이름>.<프로젝트 이름>.<게이트웨이 주소>.nip.io` 형식의 도메인 이름을 자동으로 생성하고, 도메인 이름은 [nip.io](https://nip.io/)에 의해 자동으로 게이트웨이 주소로 변환됩니다. 이 모드는 HTTP만 지원합니다.
     
     * **경로**: 각각의 서비스를 경로에 매핑합니다. **추가**를 클릭하여 여러 경로를 추가할 수 있습니다.
     
   * **도메인 지정**: 사용자가 정의한 도메인 이름을 사용합니다. 이 모드는 HTTP와 HTTPS를 모두 지원합니다.

     * **도메인 이름**: 라우트에 대한 도메인 이름을 설정.
     * **프로토콜**: `http` 또는 `https`를 선택하세요. `https`를 선택한 경우, 암호화에 사용되는 `tls.crt`(TLS 인증서)와 `tls.key`(TLS 프라이빗 키) 키를 담고 있는 시크릿을 선택해야 합니다.
     * **경로**: 각각의 서비스를 경로에 매핑합니다. **추가**를 클릭하여 여러 경로를 추가할 수 있습니다.

### (선택 사항) 3단계: 고급 설정 구성

1. **고급 설정** 탭에서 **메타데이터 추가**를 선택하세요.

2. 라우트에 대한 주석과 레이블을 설정하고 **생성**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      주석을 사용하여 라우트의 동작을 사용자 지정할 수 있습니다. 자세한 내용은 [공식 Nginx 인그레스 컨트롤러 문서](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)를 참조하십시오.
    </div>
  </div>

### 4단계: 도메인 이름, 서비스 라우트 및 게이트웨이 주소 얻기

1. 왼쪽 내비게이션 바의 **애플리케이션 워크로드**에서 **라우트**를 선택하고 오른쪽에서 라우트 이름을 클릭하세요.

2. **규칙** 영역에서 도메인 이름, 서비스 경로, 게이트웨이 주소를 얻습니다.

   * [라우트 접속 모드](#configure-the-route-access-method)가 NodePort로 설정된 경우, 쿠버네티스 클러스터 노드의 IP 주소가 게이트웨이 주소로 사용되며 도메인 이름 뒤에 NodePort가 표시됩니다.

   * [라우트 접속 모드](#configure-the-route-access-method)가 LoadBalancer로 설정되어 있는 경우, 게이트웨이 주소는 로드밸런서 플러그인에 의해 할당됩니다.

## 도메인 이름 변환 설정

[라우팅 규칙 설정](#step-2-configure-route-rules)에서 **자동 생성**을 선택한 경우, 도메인 이름 변환을 설정할 필요가 없으며 도메인 이름은 [nip.io](https://nip.io/)에 의해 자동으로 게이트웨이 주소로 변환됩니다.

[라우팅 규칙 구성](#step-2-configure-route-rules)에서 **도메인 지정**을 선택한 경우, DNS 서버에서 도메인 이름 변환을 설정하거나, 또는 `<라우트 게이트웨이 주소> <라우트 도메인 이름>`을 클라이언트 장비의 `etc/hosts` 파일에 추가하세요.

## 라우트에 접속

### NodePort 접속 모드

1. 라우트 게이트웨이 주소에 연결된 클라이언트 장비에 로그인하세요.

2. `<라우트 도메인 이름>:<NodePort>/<서비스 경로>` 주소를 사용하여 라우트의 백엔드 서비스에 접속하세요.


### LoadBalancer 접속 방식

1. 라우트 게이트웨이 주소에 연결된 클라이언트 장비에 로그인하세요.

2. `<라우트 도메인 이름>/<서비스 경로>` 주소를 사용하여 라우트의 백엔드 서비스에 접속하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    <p>
    네트워크 환경에 따라, NodePort 또는 LoadBalancer 중 하나를 사용하여 프라이빗 네트워크 외부에서 라우트에 접속해야 하는 경우:
    </p>
    <ul>
    <li>라우트의 게이트웨이 주소와 포트 번호에 접속할 수 있도록 인프라 환경에서 트래픽 포워딩 및 방화벽 정책을 설정해야 할 수도 있습니다.</li>
    <li><a href="#step-2-configure-routing-rules">라우팅 규칙 설정</a>에서 <b>자동 생성</b>을 선택한 경우, 수동으로 <a href="#edit-the-route">라우팅 규칙을 편집</a>하여 루트 도메인 이름의 게이트웨이 주소를 프라이빗 네트워크의 외부 IP 주소로 변경해야 할 수 있습니다.</li>
    <li><a href="#step-2-configure-routing-rules">라우팅 규칙 설정</a>에서 <b>도메인 지정</b>을 선택한 경우, 도메인 이름을 프라이빗 네트워크의 외부 IP 주소로 확인할 수 있도록 DNS 서버 또는 클라이언트 시스템의 <code>etc/hosts</code> 파일에서 설정을 변경해야 할 수 있습니다.</li>
    </ul>
  </div>
</div>


## 라우트 세부 정보 확인

### 작업

1. 왼쪽 내비게이션 바의 **애플리케이션 워크로드**에서 **라우트**를 선택하고 오른쪽에서 라우트의 이름을 클릭하세요.

2. **정보 편집**을 클릭하거나 **더보기**를 클릭하고, 드롭다운 메뉴에서 작업을 선택하세요.
   * **YAML 편집**: 라우트의 YAML 설정 파일을 편집.
   * **라우팅 규칙 편집**: 라우팅 규칙을 편집.
   * **주석 편집**: 라우트 주석을 편집. 자세한 내용은 [공식 Nginx 인그레스 컨트롤러 문서](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)를 참조하십시오.
   * **삭제**: 라우트를 삭제하고 라우트 목록 페이지로 돌아갑니다.

### 리소스 상태

라우팅 규칙을 보려면 **리소스 상태** 탭을 클릭하세요.

### 메타데이터

라우트의 레이블과 주석을 보려면 **메타데이터** 탭을 클릭하세요.

### 이벤트

라우트의 이벤트를 보려면 **이벤트** 탭을 클릭하세요.



