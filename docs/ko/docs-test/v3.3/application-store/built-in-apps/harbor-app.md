---
title: "Super Kubenetes에서 Harbor 배포"
keywords: 'Kubernetes, Super Kubenetes, Harbor, app-store'
description: 'Learn how to deploy Harbor from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Harbor on Super Kubenetes"
weight: 14220
---
[Harbor](https://goharbor.io/)는 정책 및 역할 기반 액세스 제어로 아티팩트를 보호하고, 이미지를 스캔하여 취약점이 없도록 하며, 이미지를 신뢰할 수 있는 것으로 서명하는 오픈 소스 레지스트리입니다. 

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서에서 [Harbor](https://goharbor.io/)를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 Harbor 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. Harbor를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. Harbor가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정** 페이지에서, Harbor 파일의 설정을 편집합니다. 아래 영역에 주의해주세요.

   `type`: Harbor 서비스에 액세스하는 데 사용하는 방법입니다. 이 예제에서는 `nodePort`를 사용합니다.

   `tls`: HTTPS를 활성화할지 여부를 지정합니다. 대부분의 경우  `false`로 설정합니다.

   `externalURL`: 테넌트에 노출된 URL입니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - `externalURL`을 꼭 설정하세요. 이 영역은 하버에 액세스하는 데 문제가 있는 경우 매우 유용합니다.

      - 이 튜토리얼에서, HTTP 프로토콜과 이에 해당하는 `nodePort`를 사용해야 합니다. 
    </div>
  </div>

   설정 편집을 완료했으면, **설치**을 눌러 다음으로 진행합니다.

5. Harbor가 실행될 때까지 기다립니다. 

### 2단계: Harbor 접속하기

1. 설정 파일에 설정한 `expose.type` 영역에 따라 접속 방식이 달라집니다. 이 예제에서는 `nodePort`를 사용하여 Harbor에 접속하므로 이전 단계에서 설정한 대로 `http://<NodeIP>:30002`로 이동합니다.

   ![harbor-login](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-login.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>

2. 기본 계정 및 암호를 사용하여 Harbor에 로그인합니다(`admin/Harbor12345`). 암호는 설정 파일의 `harborAdminPassword` 영역에서 변경할 수 있습니다.

   ![harbor-dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-dashboard.jpg)

## FAQ

1. HTTP 로그인을 어떻게 활성화 하나요?

   위의 1단계에서 `tls.enabled`를 `false`로 설정하세요. `externalURL`의 프로토콜은 반드시 `expose.nodePort.ports`와 동일해야 합니다.

   만약 도커 로그인을 사용하려면, `daemon.json`에서 `externalURL`을 `insecure-registries` 중 하나로 설정한 다음, 도커를 다시 로드하세요.

   다음은 참조할 수 있는 구성 파일의 예입니다. 달린 주석에 특별히 주의하세요.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span><span>#</span> 참고: 192.168.0.9 는 IP주소 예시이므로, 자신의 실제 IP 주소를 사용해야 합니다.</span>
              <span style="color:#f92672">expose</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">nodePort</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tls</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;secretName</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;notarySecretName</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;commonName</span>: <span style="color:#e6db74">"192.168.0.9"</span>  <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> commonName을 자신의 것으로 변경하세요.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;nodePort</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> NodePort 서비스의 이름</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">harbor</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> HTTP로 서비스할 때 Harbor가 수신하는 서비스 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> HTTP로 서비스할 때 Harbor가 수신하는 노드 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30002</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> HTTPS로 서비스할 때 Harbor가 수신하는 서비스 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">443</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> HTTPS로 서비스할 때 Harbor가 수신하는 노드 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30003</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> notary.enabled가 true로 설정되었을 때만 필요</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notary</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Notary가 수신하는 서비스 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">4443</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Notary가 수신하는 노드 포트</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30004</span> 
              &nbsp;&nbsp;&nbsp;
              <span style="color:#f92672">externalURL</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.9:30002<span></span></span><span style="color:#75715e">&nbsp;<span>#</span> 자신의 IP 주소를 사용하세요.</span>      
              <span style="color:#75715e"><span>#</span> Harbor 관리자의 초기 비밀번호입니다. 하버 실행 후 포털에서 변경하세요.</span>
              <span style="color:#f92672">harborAdminPassword</span>: <span style="color:#e6db74">"Harbor12345"</span> 
              <span style="color:#75715e"><span>#</span> 암호화에 사용되는 비밀 키입니다. 16자의 문자열이어야 합니다.</span>
              <span style="color:#f92672">secretKey</span>: <span style="color:#e6db74">"not-a-secure-key"</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

2. HTTPS 로그인을 어떻게 활성화 하나요?

    a. 자체 서명된 인증서 사용.
      * 1단계의 설정 파일에서 `tls.enabled`를 `true`로 설정하고, `externalURL`를 알맞게 수정하세요.
      * `harbor-core`파드의 `/etc/core/ca`에 저장된 CA 인증서를 당신의 호스트에 복사하세요.
      * 당신의 호스트에서 CA 인증서를 신뢰한 다음, 도커를 재시작하세요.

    b. Public SSL 사용.
      * certificates를 시크릿으로 추가하세요.
      * 1단계의 설정 파일에서 `tls.enabled`를 `true`로 설정하고, `externalURL`를 알맞게 수정하세요.
      * `tls.secretName`를 편집하세요.

더 자세한 내용은, [Harbor 문서](https://goharbor.io/docs/2.1.0/)를 참조하십시오.
