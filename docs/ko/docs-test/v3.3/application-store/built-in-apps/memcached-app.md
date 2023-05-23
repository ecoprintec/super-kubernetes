---
title: "Super Kubenetes에서 Memcached 배포"
keywords: 'Kubernetes, Super Kubenetes, Memcached, app-store'
description: 'Learn how to deploy Memcached from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Memcached on Super Kubenetes"
weight: 14230
---
[Memcached](https://memcached.org/)은 데이터베이스 호출, API 호출 또는 페이지 렌더링의 결과에서 임의 데이터(문자, 오브젝트)의 작은 덩어리를 저장하는 인메모리 키 값 저장소입니다. API는 대부분의 대중적인 언어에서 사용할 수 있습니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 Memcached를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 Memcached 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. Memcached를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. Memcached가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서는 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 계속하려면 **설치**를 클릭하세요.

5. Memcached가 실행될 때까지 기다립니다.

### 2단계: Memcached 접속하기

1. **서비스**로 이동하여 Memcached의 서비스 이름을 클릭합니다.

2. 상세 페이지에서, **포트**와 **파드**에서 각각 포트 번호와 파드의 IP 주소를 찾을 수 있습니다.

3. Memcached 서비스는 헤드리스이므로, 파드 IP 및 포트 번호를 통해 클러스터 내에서 액세스하십시오. Memcached `telnet` 명령어의 기본 구문은 `telnet HOST PORT`입니다. 예시:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span><span>&nbsp;telnet 10.10.235.3 11211</span></span> 
                  Trying 10.10.235.3... 
                  Connected to 10.10.235.3. 
                  Escape character is <span style="color:#e6db74">'^]'</span>. 
                  set runoob <span style="color:#ae81ff">0</span> <span style="color:#ae81ff">&nbsp;900</span> <span style="color:#ae81ff">&nbsp;9</span> 
                  memcached 
                  STORED</p>
            </code>
         </div>
      </pre>
   </article>

4. 더 자세한 내용은 [Memcached](https://memcached.org/)를 참조하십시오.
