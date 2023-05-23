---
title: 멀티 노드 설치
keywords: 'Multi-node, Installation, Kuberix'
description: 'Learn the general steps of installing Super Kubenetes and Kubernetes on a multi-node cluster.'
linkTitle: 'Multi-node Installation'
weight: 3130
---

프로덕션 환경에서 단일 노드 클러스터는 클러스터의 리소스가 제한되고 컴퓨팅 기능이 충분하지 않기 때문에 대부분의 요구 사항을 충족할 수 없습니다. 따라서 단일 노드 클러스터는 대규모 데이터 처리에 권장되지 않습니다. 게다가 이러한 종류의 클러스터는 노드가 하나뿐이므로 고가용성으로 사용할 수 없습니다. 반면에 다중 노드 아키텍처는 애플리케이션 배포 및 배포 측면에서 가장 일반적이고 선호되는 선택입니다.

이 섹션에서는 개념, [KubeKey](../kubekey) 및 단계를 포함하여 단일 마스터 다중 노드 설치에 대한 개요를 제공합니다. HA 설치에 대한 자세한 내용은 [고가용성 구성](../../../installing-on-linux/high-availability-configurations/ha-configuration/), [퍼블릭 클라우드에 설치]()<!-- (../../public-cloud/install-Super Kubenetes-on-azure-vms/) --> 및 [온프레미스 환경에서 설치](../../../installing-on-linux/on-premises/install-Super Kubenetes-on-bare-metal/) .

## 개념

멀티 노드 클러스터는 하나 이상의 제어 평면과 하나의 작업자 노드로 구성됩니다. 모든 노드를 **taskbox**로 사용하여 설치 작업을 수행할 수 있습니다. 필요에 따라(예: 고가용성) 설치 전후에 노드를 추가할 수 있습니다.

- **제어 평면 노드**. 제어 평면은 일반적으로 제어 평면을 호스팅하고 전체 시스템을 제어 및 관리합니다.

- **작업자 노드**. 작업자 노드는 배치된 실제 애플리케이션을 실행합니다.

## 1단계: Linux 호스트 준비

아래 표시된 하드웨어 및 운영 체제에 대한 요구 사항을 참조하십시오. 이 자습서에서 다중 노드 설치를 시작하려면 다음 요구 사항에 따라 최소 3개의 호스트를 준비해야 합니다. 자원이 충분하다면 두 노드에 [Super Kubenetes Container Platform](https://ai.kuberix.co.kr/)을 설치할 수 있습니다.

### 시스템 요구 사항

<table>
<thead>
<tr>
	<th>
		Systems
	</th>
	<th>
		Minimum Requirements (Each node)
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<b>Ubuntu</b><em>16.04, 18.04, 20.04</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>Debian</b><em>Buster, Stretch</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>CentOS</b><em>7</em>.x
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>Red Hat Enterprise Linux</b><em>7</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>SUSE Linux Enterprise Server</b><em>15</em><b>/openSUSE Leap</b><em>15.2</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
</tbody>
</table>

<div className="notices note">
    <p>Note</p>
    <div>
      - `/var/lib/docker` 경로는 주로 컨테이너 데이터를 저장하는 데 사용되며, 사용 및 운영 중에 점차 크기가 커집니다. 프로덕션 환경의 경우 `/var/lib/docker`에서 드라이브를 별도로 마운트하는 것이 좋습니다.

      - x86_64 CPU만 지원되며 Arm CPU는 현재 완전히 지원되지 않습니다.</div></div>

### 노드 요구 사항

- 모든 노드는 'SSH'를 통해 액세스할 수 있어야 합니다.
- 모든 노드에 대한 시간 동기화.
- `sudo`/`curl`/`openssl`/`tar`는 모든 노드에서 사용해야 합니다.

### 컨테이너 런타임

클러스터에는 사용 가능한 컨테이너 런타임이 있어야 합니다. KubeKey를 사용하여 클러스터를 설정하는 경우 KubeKey는 기본적으로 최신 버전의 Docker를 설치합니다. 또는 클러스터를 생성하기 전에 Docker 또는 기타 컨테이너 런타임을 직접 설치할 수 있습니다.

  <table>
  <thead>
  <tr>
    <th>
      Supported Container Runtime
    </th>
    <th>
      Version
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Docker
    </td>
    <td>
      19.3.8+
    </td>
  </tr>
  <tr>
    <td>
      containerd
    </td>
    <td>
      Latest
    </td>
  </tr>
  <tr>
    <td>
      CRI-O (experimental, not fully tested)
    </td>
    <td>
      Latest
    </td>
  </tr>
  <tr>
    <td>
      iSula (experimental, not fully tested)
    </td>
    <td>
      Latest
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    오프라인 환경에서 Super Kubenetes를 배포하려면 컨테이너 런타임이 미리 설치되어 있어야 합니다.
  </div>
</div>

### 종속성 요구 사항

KubeKey는 쿠버네티스와 Super Kubenetes를 함께 설치할 수 있습니다. 설치해야 하는 종속성은 설치할 쿠버네티스 버전에 따라 다를 수 있습니다. 아래 목록을 참조하여 사전에 노드에 관련 종속성을 설치해야 하는지 확인할 수 있습니다.

| Dependency  | Kubernetes Version ≥ 1.18 | Kubernetes Version < 1.18 |
| ----------- | ------------------------- | ------------------------- |
| `socat`     | Required                  | Optional but recommended  |
| `conntrack` | Required                  | Optional but recommended  |
| `ebtables`  | Optional but recommended  | Optional but recommended  |
| `ipset`     | Optional but recommended  | Optional but recommended  |

### 네트워크 및 DNS 요구 사항

- `/etc/resolv.conf`의 DNS 주소가 사용 가능한지 확인하십시오. 그렇지 않으면 클러스터에서 일부 DNS 문제가 발생할 수 있습니다.
- 네트워크 구성이 방화벽 규칙이나 보안 그룹을 사용하는 경우 인프라 구성 요소가 특정 포트를 통해 서로 통신할 수 있는지 확인해야 합니다. 방화벽을 끄거나 [포트 요구 사항](../port-firewall/) 가이드를 따르는 것이 좋습니다.
- 지원되는 CNI 플러그인: Calico 및 Flannel. Cilium 및 Kube-OVN과 같은 다른 프로그램도 작동할 수 있지만 완전히 테스트되지는 않았습니다.

<div className="notices tip">
  <p>Tip</p>
  <div>
    - OS를 깨끗한 상태로 유지하는 것이 좋습니다(다른 소프트웨어가 설치되지 않은 상태). 그렇지 않으면 충돌이 발생할 수 있습니다.
    - 'dockerhub.io'에서 이미지 다운로드에 문제가 있는 경우 레지스트리 미러(부스터)를 준비하는 것이 좋습니다. [설치를 위한 부스터 구성](../../../faq/installation/configure-booster/) 및 [도커 데몬에 대한 레지스트리 미러 구성](https://docs.docker.com/registry/)을 참조하십시오. recipe/mirror/#configure-the-docker-daemon).
  </div>
</div>

이 예제에는 작업 상자 역할을 하는 컨트롤 플레인과 함께 아래와 같이 세 개의 호스트가 포함됩니다.

| Host IP     | Host Name     | Role                |
| ----------- | ------------- | ------------------- |
| 192.168.0.2 | control plane | control plane, etcd |
| 192.168.0.3 | node1         | worker              |
| 192.168.0.4 | node2         | worker              |

## 2단계: KubeKey 다운로드

아래 단계에 따라 [KubeKey](../kubekey)를 다운로드하십시오.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 양호함</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 불안정함</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p><a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release Page</a>에서 KebeKey를 다운로드 하거나 다음 명령을 실행합니다.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL<a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
      <p>다음 명령을 먼저 실행하여 올바른 영역에서 KubeKey를 다운로드했는지 확인하십시오.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>다음 명령을 실행하여 KubeKey를 다운로드하십시오.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          KubeKey를 다운로드한 후 Googleapis에 대한 네트워크 연결이 불량한 새 시스템으로 전송하는 경우 아래 단계를 진행하기 전에 export KKZONE=cn을 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    위의 명령은 KubeKey의 최신 릴리스(v2.2.2)를 다운로드합니다. 명령에서 버전 번호를 변경하여 특정 버전을 다운로드할 수 있습니다.
  </div>
</div>

`kk` 파일을 실행 가능하게 만듭니다.:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

## 3단계: 쿠버네티스 멀티 노드 클러스터 생성

멀티 노드 설치의 경우 구성 파일을 지정하여 클러스터를 생성해야 합니다.

### 1. 예제 구성 파일 생성

명령:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span></code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Super Kubenetes 3.3.0의 권장 쿠버네티스 버전: v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(실험 지원). 쿠버네티스 버전을 지정하지 않으면 KubeKey는 기본적으로 쿠버네티스 v1.23.7을 설치합니다. 지원되는 쿠버네티스 버전에 대한 자세한 내용은 [지원 매트릭스](../kubekey/#support-matrix)를 참조하십시오.

    - 이 단계에서 명령에 `--with-Super Kubenetes` 플래그를 추가하지 않으면 구성 파일의 `addons` 필드를 사용하여 설치하거나 `를 사용할 때 이 플래그를 다시 추가하지 않는 한 Super Kubenetes가 배포되지 않습니다. ./kp는 나중에 클러스터를 생성합니다.
    - Super Kubenetes 버전을 지정하지 않고 `--with-Super Kubenetes` 플래그를 추가하면 최신 버전의 Super Kubenetes가 설치됩니다.

  </div>
</div>

다음은 참고할 수 있는 몇 가지 예입니다.

- 기본 구성으로 예제 구성 파일을 생성할 수 있습니다. 다른 파일 이름이나 다른 폴더에 있는 파일을 지정할 수도 있습니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config <span style="color:#f92672">[</span>-f ~/myfolder/abc.yaml<span style="color:#f92672">]</span></code>
        </div>
    </pre>
  </article>

- 설치하려는 Super Kubenetes 버전을 지정할 수 있습니다(예: `--with-Super Kubenetes v3.3.0`).

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --with-Super Kubenetes <span style="color:#f92672">[</span>version<span style="color:#f92672">]</span></code>
        </div>
    </pre>
  </article>

### 2. 쿠버네티스 멀티 노드 클러스터의 구성 파일 편집

이름을 변경하지 않으면 기본 파일인 `config-sample.yaml`이 생성됩니다. 파일을 편집하면 다음은 컨트롤 플레인이 있는 멀티 노드 클러스터의 구성 파일 예입니다.

<div className="notices note">
  <p>Note</p>
  <div>
    To customize Kubernetes related parameters, refer to [Kubernetes Cluster Configurations](../vars/).
  </div>
</div>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

#### 호스트

'호스트' 아래에 모든 컴퓨터를 나열하고 위와 같이 자세한 정보를 추가합니다.

`name`: 인스턴스의 호스트 이름입니다.

`address`: SSH를 통해 작업 상자와 다른 인스턴스 간의 연결에 사용하는 IP 주소입니다. 환경에 따라 공인 IP 주소 또는 사설 IP 주소일 수 있습니다. 예를 들어, 일부 클라우드 플랫폼은 SSH를 통해 인스턴스에 액세스하는 데 사용하는 공용 IP 주소를 모든 인스턴스에 제공합니다. 이 경우 이 필드에 공용 IP 주소를 제공할 수 있습니다.

`internalAddress`: 인스턴스의 사설 IP 주소입니다.

동시에 각 인스턴스에 연결하는 데 사용되는 로그인 정보를 제공해야 합니다. 여기 몇 가지 예가 있습니다.

- 비밀번호 로그인의 경우:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#f92672">hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, port: 8022, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}
              </span>
              </p>
            </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이 튜토리얼에서 포트 `22`는 SSH의 기본 포트이므로 YAML 파일에 추가할 필요가 없습니다. 그렇지 않으면 위와 같이 IP 주소 뒤에 포트 번호를 추가해야 합니다.
    </div>
  </div>

- 기본 루트 사용자의 경우:

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#f92672">hosts</span>: 
            &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, password</span>: <span style="color:#ae81ff">Testing123}</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

- SSH 키를 사용한 암호 없는 로그인의 경우:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">hosts</span>: 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

- ARM 장치에 설치하는 경우:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">hosts</span>:
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password: Testing123, arch</span>: <span style="color:#ae81ff">arm64}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

<div className="notices tip">
  <p>Tip</p>
  <div>
    - Super Kubenetes를 설치하기 전에 '호스트'에 제공된 정보(예: IP 주소 및 암호)를 사용하여 SSH를 사용하여 태스크박스와 다른 인스턴스 간의 네트워크 연결을 테스트할 수 있습니다.
    - 설치 전에 포트 `6443`이 다른 서비스에서 사용되고 있지 않은지 확인하십시오. 그렇지 않으면 API 서버의 기본 포트가 '6443'이므로 충돌이 발생할 수 있습니다.
  </div>
</div>

#### 역할 그룹

- `etcd`: etcd 노드 이름
- `control-plane`: 제어 평면 노드 이름
- `worker`: 작업자 노드 이름

#### controlPlaneEndpoint(HA 설치 전용)

'controlPlaneEndpoint'는 HA 클러스터에 대한 외부 로드 밸런서 정보를 제공하는 곳입니다. 여러 컨트롤 플레인 노드를 설치해야 하는 경우에만 외부 로드 밸런서를 준비하고 구성해야 합니다. 주소와 포트는 `config-sample.yaml`에서 두 개의 공백으로 들여쓰기되어야 하고 `address`는 로드 밸런서의 IP 주소여야 합니다. 자세한 내용은 [HA 구성](../../../installing-on-linux/high-availability-configurations/ha-configuration/)을 참조하십시오.

#### 애드온

'config-sample.yaml'의 'addons' 필드에 스토리지를 지정하여 영구 스토리지 플러그인(예: NFS 클라이언트, Ceph RBD 및 GlusterFS)을 사용자 정의할 수 있습니다. 자세한 내용은 [영구 저장소 구성](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/)을 참조하십시오.

KubeKey는 기본적으로 개발 및 테스트 환경을 위해 [LocalPV](https://kubernetes.io/docs/concepts/storage/volumes/#local)를 프로비저닝하기 위해 [OpenEBS](https://openebs.io/)를 설치합니다. 새로운 사용자에게 편리합니다. 다중 노드 설치의 이 예에서는 기본 스토리지 클래스(로컬 볼륨)가 사용됩니다. 프로덕션의 경우 Ceph/GlusterFS/CSI 또는 상용 제품을 영구 스토리지 솔루션으로 사용할 수 있습니다.

<div className="notices tip">
  <p>Tip</p>
  <div>
    - 구성 파일을 편집하여 멀티 클러스터 기능을 활성화할 수 있습니다. 자세한 내용은 [멀티 클러스터 관리](../../../multicluster-management/introduction/overview/)를 참조하십시오.
    - 설치하려는 구성 요소를 선택할 수도 있습니다. 자세한 내용은 [플러그식 구성 요소 활성화](../../../pluggable-components/overview)를 참조하십시오. 완전한 `config-sample.yaml` 파일의 예는 [이 파일](https://github.com/ke/KubeKey/blob/release-2.2/docs/config-example.md)을 참조하십시오.
  </div>
</div>

편집이 끝나면 파일을 저장합니다.

### 3. 구성 파일을 사용하여 클러스터 생성

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    다른 이름을 사용하는 경우 위의 `config-sample.yaml`을 자신의 파일로 변경해야 합니다.
  </div>
</div>

전체 설치 프로세스는 컴퓨터와 네트워크에 따라 10-20분이 소요될 수 있습니다.

### 4. 설치 확인

설치가 완료되면 다음과 같은 내용을 볼 수 있습니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
            <span style="color:#75715e">###########################################################</span> 
            <span></span> 
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.2:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span></span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
            <span></span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

이제 기본 계정과 비밀번호(`admin/P@88w0rd`)로 `<NodeIP>:30880`에서 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    콘솔에 액세스하려면 환경에 따라 포트 전달 규칙을 구성해야 할 수 있습니다. 또한 보안 그룹에서 포트 `30880`이 열려 있는지 확인하십시오.
  </div>
</div>

![login](/dist/assets/docs/v3.3/installing-on-linux/introduction/multi-node-installation/login.png)

## kubectl 자동 완성 활성화

KubeKey는 kubectl 자동 완성을 활성화하지 않습니다. 아래 내용을 보고 켜십시오.:

<div className="notices note">
  <p>Note</p>
  <div>
    bash-autocompletion이 설치되어 작동하는지 확인하십시오.
  </div>
</div>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <span style="color:#75715e"><span>#</span><span>&nbsp;Install bash-completion</span></span> 
          <span>apt-get install bash-completion</span> 
          <span></span> 
          <span style="color:#75715e"><span>#</span><span>&nbsp;Source the completion script in your ~/.bashrc file</span></span> 
          echo <span style="color:#e6db74">'source &lt;(kubectl completion bash)'</span> &gt;&gt;~/.bashrc 
          <span></span> 
          <span style="color:#75715e"><span>#</span><span>&nbsp;Add the completion script to the /etc/bash_completion.d directory</span></span> 
          <span>kubectl completion bash &gt;/etc/bash_completion.d/kubectl</span>
        </code>
      </div>
  </pre>
</article>

자세한 내용은 [여기](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion)에서 확인할 수 있습니다.
