---
title: "Bare Metal에 Kubernetes와 Super Kubenetes 배포"
keywords: 'Kubernetes, Super Kubenetes, bare-metal'
description: 'Learn how to create a multi-node cluster with one master on bare metal.'
linkTitle: "Deploy Super Kubenetes on Bare Metal"
weight: 3520
---

## 소개

Super Kubenetes는 클라우드 환경뿐만 아니라 Bare Metal 환경에도 설치할 수 있습니다. 가상화 계층이 제거됨에 따라 인프라 오버헤드가 큰 폭으로 감소하여 애플리케이션 구현에 더 많은 컴퓨팅 및 스토리지 리소스를 제공합니다. 그 결과, 하드웨어 효율이 향상됩니다. 베어메탈에 Super Kubenetes를 배치하려면 다음 예를 참고하세요.

## 전제 조건

- Super Kubenetes에서 [Multi-node 설치](../../../installing-on-linux/introduction/multioverview/) 방법을 숙지 하세요.
- 설치할 환경에서 서버 및 네트워크 이중화를 고려 하세요.
- 운영 환경의 경우, **default** StorageClass를 사전에 만들고 persistent storage를 준비하시길 추천 드립니다. 개발과 테스트 환경의 경우, OpenEBS를 사용하여 LocalPV를 스토리지 서비스로 직접 프로비저닝할 수 있습니다.

## Linux Hosts 준비

이 튜토리얼에서는 Super Kubenetes 배포를 위해 **CentOS Linux release 7.6.1810 (Core)**가 설치된 3대의 **DELL 620 Intel (R) Xeon (R) CPU E5-2640 v2 @ 2.00GHz (32G memory)** 물리 머신(최소 사양)을 사용합니다.

### CentOS 설치

먼저, CentOS [이미지](https://www.centos.org/download/)를 다운로드하여 설치합니다. 버전은 CentOS Linux release 7.6.1810 (Core)을 추천합니다. 도커 이미지를 저장하는 루트 디렉토리에 200GB 이상을 할당해야 합니다(테스트용으로 Super Kubenetes를 설치하는 경우 이 작업은 생략될 수 있습니다).

지원되는 시스템에 대한 자세한 내용은 [시스템 요구 사항](../../../installing-on-linux/introduction/multioverview/)을 참고하세요.

다음은 참고하기 위한 3개의 호스트 리스트 입니다. 


<table>
	<thead>
		<tr>
			<th>호스트 IP</th>
			<th>호스트 Name</th>
			<th>역할</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>192.168.60.152</td>
			<td>master1</td>
			<td>master1, etcd</td>
		</tr>
		<tr>
			<td>192.168.60.153</td>
			<td>worker1</td>
			<td>worker</td>
		</tr>
		<tr>
			<td>192.168.60.154</td>
			<td>worker2</td>
			<td>worker</td>
		</tr>
	</tbody>
</table>

### NIC 세팅

1. NIC 설정을 초기화합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>ifdown em1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>ifdown em2</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>rm -rf /etc/sysconfig/network-scripts/ifcfg-em1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>rm -rf /etc/sysconfig/network-scripts/ifcfg-em2</code>
        </div>
    </pre>
  </article>

2. NIC bonding을 생성합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond con-name bond0 ifname bond0 mode 802.3ad ip4 192.168.60.152/24 gw4 192.168.60.254</code>
        </div>
    </pre>
  </article>

3. bonding mode를 설정합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con mod id bond0 bond.options mode<span style="color:#f92672">=</span>802.3ad,miimon<span style="color:#f92672">=</span>100,lacp_rate<span style="color:#f92672">=</span>fast,xmit_hash_policy<span style="color:#f92672">=</span>layer2+3</code>
        </div>
    </pre>
  </article>

4. physical NIC를 바인드합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond-slave ifname em1 con-name em1 master bond0</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond-slave ifname em2 con-name em2 master bond0</code>
        </div>
    </pre>
  </article>

5. NIC mode를 변경합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            vi /etc/sysconfig/network-scripts/ifcfg-bond0
            BOOTPROTO<span style="color:#f92672">=</span>static
          </code>
        </div>
    </pre>
  </article>

6. Network Manager를 재시작합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl restart NetworkManager</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con <span style="color:#75715e">#</span><span style="color:#75715e"> Display NIC information</span></code>
        </div>
    </pre>
  </article>   

7. host name and DNS를 변경합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>hostnamectl set-hostname worker-1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vim /etc/resolv.conf</code>
        </div>
    </pre>
  </article>

### 시간 설정

1. 시간을 동기화합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> yum install -y chrony</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> systemctl enable chronyd</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> systemctl start chronyd</code>
        </div>
    </pre>
  </article>

   <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>timedatectl set-ntp true</code>
        </div>
    </pre>
  </article>

2. time zone을 설정합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>timedatectl set-timezone Asia/Shanghai</code>
        </div>
    </pre>
  </article>

3. ntp-server를 사용할 수 있는지 확인합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>chronyc activity -v</code>
        </div>
    </pre>
  </article>

### 방화벽 설정

다음 명령을 실행하여 FirewallD 서비스를 중지 및 비활성화 합니다:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>iptables -F</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl status firewalld</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl stop firewalld</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl disable firewalld</code>
      </div>
  </pre>
</article>

### 패키지 업데이트 및 종속성

다음 명령을 실행하여 시스템 패키지를 업데이트하고 종속성을 설치합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum update</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install openssl openssl-devel</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install socat</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install epel-release</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install conntrack-tools</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>메모</p>
  <div>
    설치하는 Super Kubenetes 버전에 대하여 모든 의존 관계를 설치 할 필요는 없습니다. 자세한 내용은 [종속성 요구 사항](../../../installing-on-linux/introduction/multioverview/)을 참고하세요.
  </div>
</div> 


## KubeKey 다운로드

[Kubekey](https://github.com/Super Kubenetes/kubekey)는 Kubernetes and Super Kubenetes를 쉽고 빠르게 설치할 수 있는 설치 프로그램입니다.

다음 단계를 따라서 KubeKey를 다운로드 하세요.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">양호한 네트워크에서 GitHub/Googleapis 연결</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">좋지않은 네트워크에서 GitHub/Googleapis 연결</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>KubeKey <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release 페이지</a>에서 다운로드 또는 다음 명령어를 실행하세요:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
      <p>KubeKey을 다운로드 하기 전에 다음 명령을 실행하세요.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>KubeKey을 다운로드 하기 위해서 다음 명령어를 실행합니다:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          KubeKey을 다운로드한 후 Googleapis에 대한 네트워크 연결이 좋지 않은 새로운 시스템으로 전송하는 경우 아래 단계를 진행하기 전에<code>export KKZONE=cn</code>내보내기를 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    위의 명령어는 KubeKey 최신 릴리스(v2.2.2)를 다운로드합니다. 특정 버전을 다운로드 하기 위해서 명령어에서 버전 명을 변경할 수 있습니다. 
  </div>
</div>

`kk` 실행파일 만들기:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

## Multi-node Cluster 만들기

KubeKey를 이용하면 Kubernetes와 Super Kubenetes를 함께 설치할 수 있습니다. 다른 옵션으로 설정 파일에서 파라미터들을 커스터마이징하여 multi-node cluster를 생성할 수 있습니다. 구성 파일에서 매개 변수를 사용자 지정하여 다중 노드 클러스터를 생성할 수 있습니다. 
Super Kubenetes가 설치된 Kubernetes 클러스터를 만들 수 있습니다 (for example, `--with-Super Kubenetes v3.3.0`):

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>메모</p>
  <div>
    - Super Kubenetes v3.3.0에 권장되는 Kubernetes 버전: v1.19.x, v1.20.x, v1.22.x 및 v1.23.x KubeKey는 버전을 지정하지 않으면 기본적으로 Kubernetes v1.23.7을 설치합니다. 지원되는 Kubernetes 버전에 대한 자세한 내용은 지원 매트릭스(../../../installing-on-linux/introduction/kubekey/#support-matrix)를 참조하세요.

    - 위 커맨드에서 `--with-Super Kubenetes` 플래그를 추가하지 않으면 설정 파일의 `addons` 필드를 사용하여 설치하거나 나중에 `./kk create cluster`를 사용할 때 해당 플래그를 추가하여야 Super Kubenetes가 배포됩니다.
    
    - Super Kubenetes 버전을 지정하지 않고 `--with-Super Kubenetes` 플래그를 추가하면, 가장 최신 버전의 Super Kubenetes가 설치됩니다.
  </div>
</div>

디폴트 파일 `config-sample.yaml`이 생성되며 환경에 맞게 수정하세요.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>vi config-sample.yaml</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Cluster</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config-sample</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 192.168.60.152, internalAddress: 192.168.60.152, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker1, address: 192.168.60.153, internalAddress: 192.168.60.153, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker2, address: 192.168.60.154, internalAddress: 192.168.60.154, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Create a cluster using the configuration file you customized above:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create cluster -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

#### 설치 확인

설치가 완료되면 다음 커맨드를 실행하여 설치 로그를 확인할 수 있습니다:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

아래의 초기 로그가 확인되면 설치가 성공한 것입니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.60.152:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

#### 콘솔 로그인

기본 계정 및 암호(`admin/P@88w0rd`)를 사용하여 콘솔`http://{$IP}:30880`에 로그인할 수 있습니다. 로그인 후 기본 비밀번호를 변경해 주세요.

#### 플러그형 컴포넌트 사용(옵션)

위의 예제는 기본 최소 설치를 나타낸 것입니다. Super Kubenetes에서 다른 컴포넌트를 사용하려면 [플러그형 컴포넌트 활성화](../../../pluggable-components/)를 참고하세요.

## 시스템 개선

- 시스템을 업데이트 합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>yum update</code>
        </div>
    </pre>
  </article>

- kernel boot arguments에 필요한 옵션을 추가합니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo /sbin/grubby --update-kernel<span style="color:#f92672">=</span>ALL --args<span style="color:#f92672">=</span><span style="color:#e6db74">'cgroup_enable=memory cgroup.memory=nokmem swapaccount=1'</span></code>
        </div>
    </pre>
  </article>

- `overlay2` kernel module을 활성화 합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>echo <span style="color:#e6db74">"overlay2"</span> | sudo tee -a /etc/modules-load.d/overlay.conf</code>
        </div>
    </pre>
  </article>

- 동적으로 생성된 grub2 설정을 refresh 합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo grub2-set-default <span style="color:#ae81ff">0</span></code>
        </div>
    </pre>
  </article>

- 커널 매개변수를 조정하고 변경 사항을 적용합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              cat <span style="color:#e6db74">&lt;&lt;EOF | sudo tee -a /etc/sysctl.conf</span> 
              <span style="color:#e6db74">vm.max_map_count = 262144</span> 
              <span style="color:#e6db74">fs.may_detach_mounts = 1</span> 
              <span style="color:#e6db74">net.ipv4.ip_forward = 1</span> 
              <span style="color:#e6db74">vm.swappiness=1</span> 
              <span style="color:#e6db74">kernel.pid_max =1000000</span> 
              <span style="color:#e6db74">fs.inotify.max_user_instances=524288</span> 
              <span style="color:#e6db74">EOF</span> 
              sudo sysctl -p            
            </p>
          </code>
        </div>
    </pre>
  </article>

- 시스템 limits를 조정합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              vim /etc/security/limits.conf
              <span>*</span>                soft    nofile         <span style="color:#ae81ff">1024000</span> 
              <span>*</span>                hard    nofile         <span style="color:#ae81ff">1024000</span> 
              <span>*</span>                soft    memlock        unlimited
              <span>*</span>                hard    memlock        unlimited
              root             soft    nofile         <span style="color:#ae81ff">1024000</span> 
              root             hard    nofile         <span style="color:#ae81ff">1024000</span> 
              root             soft    memlock        unlimited    
            </p>
          </code>
        </div>
    </pre>
  </article>

- 이전의 limit 설정을 삭제합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo rm /etc/security/limits.d/20-nproc.conf</code>
        </div>
    </pre>
  </article>

- 시스템을 재기동합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>reboot</code>
        </div>
    </pre>
  </article>
