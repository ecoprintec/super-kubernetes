---
title: "Super Kubenetes의 원격 측정"
keywords: 'Installer, Telemetry, Super Kubenetes, Kubernetes'
description: 'Understand what Telemetry is and how to enable or disable it in Super Kubenetes.'
linkTitle: 'Telemetry in Super Kubenetes'
Weight: 16300
---

텔레메트리는 설치된 Super Kubenetes 클러스터의 크기, Super Kubenetes 및 쿠버네티스 버전, 활성화된 컴포넌트, 클러스터 실행 시간, 오류 로그 등에 대한 전체 정보를 수집합니다. Super Kubenetes는 이 정보가 Super Kubenetes 커뮤니티에서 제품 개선을 위해서만 사용되며 제3자에게 공유되지 않을 것을 약속합니다.

## 수집하는 정보

- 외부 네트워크 IP
- 다운로드 날짜
- 쿠버네티스 버전
- Super Kubenetes 버전
- Kubernetes 클러스터 크기
- 운영체제의 종류
- 설치 프로그램 오류 로그
- 컴포넌트 활성화
- Kubernetes 클러스터의 실행 시간
- Super Kubenetes 클러스터의 실행 시간
- 클러스터 ID
- 머신 ID

## 텔레메트리 비활성화

텔레메트리는 Super Kubenetes를 설치할 때 기본적으로 활성화되지만, 설치 전이나 후에 비활성화할 수도 있습니다.

### 설치 전에 텔레메트리 비활성화

기존의 쿠버네티스 클러스터에 Super Kubenetes를 설치할 때, 클러스터 설정을 위해 [cluster-configuration.yaml]() 파일을 다운로드해야 합니다.
텔레메트리를 비활성화 하고 싶다면 이 파일에 `kubectl apply -f`를 직접 실행하지 마십시오.

<div className="notices note">
  <p>Note</p>
  <div>
    Linux에 Super Kubenetes를 설치하는 경우엔 곧바로 [설치 후 텔레메트리 비활성화](../telemetry/#disable-telemetry-after-installation)를 참조하세요.
  </div>
</div>

1. [cluster-configuration.yaml]()파일을 다운로드하고 편집하세요:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi cluster-configuration.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 이 로컬 `cluster-configuration.yaml` 파일에서, 파일 맨 아래로 스크롤하여 다음과 같이 `telemetry_enabled: false`를 추가하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span style="color:#f92672">&nbsp;&nbsp;openpitrix</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;store</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;servicemesh</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;telemetry_enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e">&nbsp;<span>#</span> Add this line manually to disable Telemetry.</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. 파일을 저장하고 다음 명령을 실행하여 설치를 시작합니다.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span>kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a></span> 
                  <span></span> 
   										<span>kubectl apply -f cluster-configuration.yaml</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### 설치 후 텔레메트리 비활성화

1. 콘솔에 `admin`으로 로그인하고 왼쪽 상단의 **플랫폼**을 클릭하세요.

2. **클러스터 관리**를 선택하고 **CRD**로 이동합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      [멀티 클러스터 기능](../../../multicluster-management/)을 활성화한 경우엔 먼저 클러스터를 선택해야 합니다.
    </div>
  </div>

3. 검색창에 `clusterconfiguration`을 입력하고 결과를 클릭하면 세부정보 페이지로 이동합니다.

4. `ks-installer` 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/faq/installation/telemetry-in-Super Kubenetes/three-dots.png" height="20px" alt="icon">을 클릭하고 **YAML 편집**을 선택하세요.

5. 파일 맨 아래로 스크롤하여 `telemetry_enabled: false`를 추가한 다음 **확인**을 클릭하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    텔레메트리를을 다시 활성화하려면, `telemetry_enabled: false`를 삭제하거나 `telemetry_enabled: true`로 변경하여 `ks-installer`를 업데이트할 수 있습니다.
  </div>
</div>
