---
title: KubeKey를 사용한 업그레이드
keywords: 'Kubernetes, upgrade, Super Kubenetes, 3.3.0, KubeKey'
description: 'Use KubeKey to upgrade Kubernetes and Super Kubenetes.'
linkTitle: 'Upgrade with KubeKey'
weight: 7200
---

(../../installing-on-linux/introduction/kubekey/) 로 Super Kubenetes와 쿠버네티스를 모두 설치한 사용자에게 권장됩니다. 쿠버네티스 클러스터가 자체 또는 클라우드 공급자에 의해 프로비저닝된 경우 [ks-installer로 업그레이드](../upgrade-with-ks-installer/)를 참조하십시오.

이 튜토리얼은 KubeKey를 사용하여 클러스터를 업그레이드하는 방법을 시연합니다.

## 사전 준비

- v3를 실행하는 Super Kubenetes 클러스터가 있어야 합니다. 2.x. Super Kubenetes 버전이 v3.1.x 이하인 경우 먼저 v3.2.x로 업그레이드하세요.
- 쿠버네티스 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)여야 합니다.
- [ 3.3.0 릴리스 노트](../../../v3.3/release/release-v330/)를 주의 깊게 읽으십시오.
- 중요한 컴포넌트는 미리 백업하십시오.
- 업그레이드 계획을 세우십시오. 이 문서에서는 [올인원 클러스터](#all-in-one-cluster)와 [멀티 노드 클러스터](#multi-node-cluster)에 대한 각각의 두 가지 시나리오가 제공됩니다 .

## KubeKey 다운로드

클러스터를 업그레이드하기 전에 아래 단계에 따라 KubeKey를 다운로드하십시오.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">GitHub/Googleapis에 대한 네트워크 연결 양호</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">GitHub/Googleapis에 대한 네트워크 연결 불량</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="GitHub/Googleapis에 대한 네트워크 연결 양호">
      <p><a href="https://github.com/kubesphere/kubekey/releases">GitHub 릴리스 페이지</a>에서 KubeKey를 다운로드하거나 다음 명령을 실행하세요.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.kubesphere.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="GitHub/Googleapis에 대한 네트워크 연결 불량">
      <p>다음 명령을 먼저 실행하여 올바른 영역에서 KubeKey를 다운로드했는지 확인하세요.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>다음 명령을 실행하여 KubeKey를 다운로드하세요:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.kubesphere.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          KubeKey를 다운로드한 후, Googleapis에 대한 네트워크 연결이 좋지 않은 새 컴퓨터로 전송하는 경우 다음 단계를 진행하기 전에 반드시 <code>export KKZONE=cn</code>을 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

  <div className="notices note">
    <p>Note</p>
    <div>
      위의 명령은 KubeKey의 최신 릴리스(v2.2.1)를 다운로드합니다. 명령에서 버전 번호를 변경하여 특정 버전을 다운로드할 수 있습니다.
    </div>
  </div>

`kk`를 실행 가능하게 만드세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              chmod +x kk
            </p>
        </code>
      </div>
  </pre>
</article>

## Super Kubenetes 및 쿠버네티스 업그레이드

단일 노드 클러스터(올인원)와 멀티 노드 클러스터의 업그레이드 단계는 서로 다릅니다.

<div className="notices info">
  <p>Info</p>
  <div>
    Kubernetes를 업그레이드할 때, KubeKey는 하나의 MINOR 버전에서 다음 MINOR 버전으로 목표 버전이 될 때까지 업그레이드합니다. 예를 들어, 업그레이드 프로세스가 1.16에서 1.18로 바로 가는 대신 1.16에서 1.17로, 그리고 1.18로 진행되는 것을 볼 수 있습니다.   
  </div>
</div>

### 올인원 클러스터

다음 명령을 실행하여, KubeKey를 사용해 단일 노드 클러스터를 Super Kubenetes 3.3.0 및 쿠버네티스 v1.22.10으로 업그레이드하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade --with-kubernetes v1.22.10 --with-kubesphere v3.3.0
            </p>
        </code>
      </div>
  </pre>
</article>

쿠버네티스를 특정 버전으로 업그레이드하려면 `--with-kubernetes` 플래그 뒤에 버전을 명시하십시오. 사용 가능한 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)입니다.

### 멀티 노드 클러스터

#### 1단계: KubeKey를 사용하여 설정 파일 생성

이 명령은 클러스터의 설정 파일 `sample.yaml`을 생성합니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --from-cluster
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    kubeconfig가 `~/.kube/config`에 할당되어 있다고 가정합니다. 이것을 `--kubeconfig` 플래그로 변경할 수 있습니다.
  </div>
</div>

#### Step 2: Edit the configuration file template

클러스터 구성에 따라 `sample.yaml`을 편집 하세요. 다음 영역을 올바르게 교체했는지 확인하세요.

- `hosts`: 호스트의 기본 정보(호스트 이름 및 IP 주소) 및 SSH를 사용하여 호스트에 연결하는 방법.
- `roleGroups.etcd`: 자신의 etcd 노드.
- `controlPlaneEndpoint`: 자신의 로드 밸런서 주소(선택 사항).
- `registry`: 자신의 이미지 레지스트리 정보(선택 사항).

<div className="notices note">
  <p>Note</p>
  <div>
    자세한 내용은 [설정 파일 편집](../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file)을 참조하거나, [전체 설정 파일](https://github.com/kubesphere/kubekey/blob/release-2.2/docs/config-example.md)을 참조하세요.
  </div>
</div>

#### 3단계: 클러스터 업그레이드

다음 명령은 클러스터를 Super Kubenetes 3.3.0 및 쿠버네티스 v1.22.10으로 업그레이드합니다:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade --with-kubernetes v1.22.10 --with-kubesphere v3.3.0 -f sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

쿠버네티스를 특정 버전으로 업그레이드하려면 `--with-kubernetes` 플래그 뒤에 버전을 명시하십시오. 사용 가능한 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)입니다.

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes 3.3.0의 새로운 기능을 사용하려면 업그레이드 후 일부 플러그형 컴포넌트를 활성화해야 할 수 있습니다.
  </div>
</div>
