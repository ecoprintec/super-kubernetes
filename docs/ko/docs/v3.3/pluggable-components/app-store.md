---
title: Super Kubenetes 앱 스토어
keywords: 'Kubernetes, Super Kubenetes, app-store, OpenPitrix'
description: 'Learn how to enable the Super Kubenetes App Store to share data and apps internally and set industry standards of delivery process externally.'
linkTitle: 'Super Kubenetes App Store'
weight: 6200
---

Super Kubenetes 앱 스토어를 사용하면 ISV, 개발자 및 사용자가 원스톱 상점에서 단 몇 번의 클릭으로 앱을 업로드, 테스트, 설치 및 출시를 할 수 있습니다.

내부적으로 Super Kubenetes 앱 스토어는 여러 팀이 데이터, 미들웨어 및 사무용 애플리케이션을 공유하는 장소 역할을 할 수 있습니다. 외부적으로는 건설 및 납품에 대한 업계 표준을 설정하는 데 도움이 됩니다. 이 기능을 활성화한 후 앱 템플릿을 사용하여 더 많은 앱을 추가할 수 있습니다.

자세한 내용은 [앱 스토어](../../application-store/)를 참조하세요.

## 설치하기 전에 앱 스토어 활성화

### 리눅스에 설치하기

Linux에 Super Kubenetes의 멀티 노드를 설치할 때, 모든 Super Kubenetes 컴포넌트를 열거하는 설정 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서 기본 파일인 `config-sample.yaml`을 생성하세요. 다음 명령을 실행하여 파일을 수정하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 앱 스토어를 활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션](#enable-app-store-after-installation)을 참조하여 설치 후 앱 스토어를 활성화하는 방법을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `openpitrix`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 설정 파일을 이용하여 클러스터를 생성하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

### 쿠버네티스에 설치

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 앱 스토어를 활성화할 수 있습니다.

1. [cluster-configuration.yaml](https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 편집하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>

2. 이 로컬 `cluster-configuration.yaml` 파일에서 `openpitrix`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하여 앱 스토어를 활성화합니다. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 다음 명령을 실행하여 설치를 시작하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/kubesphere-installer.yaml</a>
              
              kubectl apply -f <a style="color:#ffffff; cursor:text;">cluster-configuration.yaml</a></p>
          </code>
        </div>
    </pre>
  </article>

## 설치 후 앱 스토어 활성화

1. 콘솔에 `admin`으로 로그인하세요. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다.
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubesphere-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `openpitrix`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

5. 웹 kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      웹 kubectl 도구는 콘솔의 좌측 하단의 모서리의 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubesphere-app-store/hammer.png" height="20px">를 클릭하여 찾을 수 있습니다. 
    </div>
  </div>

## 컴포넌트 설치 확인

콘솔에 로그인한 후 왼쪽 상단에 **앱 스토어**와 그 안에 앱이 표시되면 설치가 성공한 것입니다.

<div className="notices note">
  <p>Note</p>
  <div>
    - 콘솔에 로그인하지 않고도 `<노드 IP 주소>:30880/apps`에 접속하면 앱스토어에 접속할 수 있습니다.
- Super Kubenetes 3.3.0의 **OpenPitrix** 탭은 앱 스토어가 활성화된 후 **시스템 컴포넌트** 페이지에 나타나지 않습니다.
  </div>
</div>

## 멀티 클러스터 아키텍처에서 앱 스토어 사용

[멀티 클러스터 아키텍처](../../multicluster-management/introduction/kubefed-in-Super Kubenetes/)에서는 모든 멤버 클러스터 (M 클러스터)를 관리하는 하나의 호스트 클러스터 (H 클러스터)가 있습니다. Super Kubenetes의 다른 컴포넌트와 달리, 앱 스토어는 H 클러스터 및 M 클러스터를 포함한 모든 클러스터에 대한 글로벌 애플리케이션 풀 역할을 합니다. H 클러스터에서 앱 스토어를 활성화하기만 하면 [앱 템플릿](../../project-user-guide/application/app-template/)과 [앱 저장소](../../workspace-administration/app-repository/import-helm-repository/)와 같은 앱 스토어와 관련된 기능을 M 클러스터에서 바로 사용할 수 있습니다.

하지만 H 클러스터에서 앱 스토어를 활성화하지 않고 M 클러스터에서만 활성화하면, 멀티 클러스터 아키텍처의 클러스터에서 앱 스토어를 사용할 수 없습니다.
