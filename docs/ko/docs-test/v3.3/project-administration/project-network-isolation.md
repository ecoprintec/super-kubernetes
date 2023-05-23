---
title: "프로젝트 네트워크 격리"
keywords: 'Super Kubenetes, Kubernetes, Calico, Network Policy'
description: 'Understand the concept of network isolation and how to configure network policies for a project.'
linkTitle: "Project Network Isolation"
weight: 13300
---

Super Kubenetes 프로젝트 네트워크 격리를 통해 프로젝트 관리자는 다른 규칙을 사용하여 허용되는 네트워크 트래픽을 적용할 수 있습니다. 이 튜토리얼에서는 프로젝트 간에 네트워크 격리를 활성화하고 네트워크 트래픽을 제어하는 규칙을 설정하는 방법을 시연합니다.

## 사전 준비

- 먼저 [네트워크 정책](../../pluggable-components/network-policy/)을 활성화합니다.
- 사용 가능한 프로젝트와 프로젝트 수준의 `admin` 역할(`project-admin`) 사용자가 있어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

<div className="notices note">
  <p>Note</p>
  <div>
    네트워크 정책의 구현은 [Super Kubenetes NetworkPolicy]를 참조하세요. 
  </div>
</div>

## 프로젝트 네트워크 격리 활성화/비활성화

1. Super Kubenetes에 `project-admin`으로 로그인하세요. 프로젝트로 이동하여 **프로젝트 설정**에서 **네트워크 격리**를 선택하세요. 기본적으로 프로젝트 네트워크 격리는 비활성화되어 있습니다.

2. 프로젝트 네트워크 격리를 활성화하려면 **활성화**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      네트워크 격리가 켜져 있으면 기본적으로 이그레스 트래픽이 허용되지만, 다른 프로젝트에 대해 인그레스 트래픽이 거부됩니다. 그러나 이그레스 네트워크 정책을 추가하면, 정책과 일치하는 트래픽만 나가는 것이 허용됩니다.
    </div>
  </div>

3. 이 페이지에서 **활성화됨** 버튼을 토글하여 네트워크 격리를 비활성화할 수도 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      네트워크 격리가 해제되면 이전에 생성된 모든 네트워크 정책도 삭제됩니다.
    </div>
  </div>

## 네트워크 정책 설정

네트워크 격리가 활성화되어 있을 때 기본 정책이 요구 사항을 충족하지 않는 경우, 필요에 맞춰 네트워크 정책을 사용자 지정할 수 있습니다. 현재 클러스터 내의 트래픽 또는 클러스터 외부에서 들어오는 트래픽에 대해 Super Kubenetes에서 사용자 지정 네트워크 정책을 추가할 수 있습니다.

### 클러스터 내의 내부 트래픽의 경우

클러스터 내 프로젝트 수준의 네트워크 정책은, 동일한 클러스터 내의 다른 프로젝트에서 이 프로젝트의 리소스에 접속할 수 있는지의 여부와 사용자가 접속할 수 있는 서비스를 제어하는 데 사용됩니다.

NGINX 디플로이먼트 워크로드가 다른 프로젝트 `demo-project-2`에서 생성되었고 `TCP`가 있는 포트 `80`에서 서비스 `nginx`를 통해 노출되었다고 가정합시다. 아래는 인그레스 및 이그레스 트래픽 규칙을 설정하는 방법의 예시입니다.

<div className="notices note">
  <p>Note</p>
  <div>
    워크로드 생성 방법에 대한 자세한 내용은 [디플로이먼트](../../project-user-guide/application-workloads/deployments/) 및 [서비스](../../project-user-guide/)를 각각 참조하십시오.
  </div>
</div>

#### 다른 프로젝트의 워크로드에서 오는 인그레스 트래픽 허용

1. 현재 프로젝트의 **네트워크 격리** 페이지에서 **내부 허용 목록**을 클릭하세요.

2. **허용 목록 항목 추가**를 클릭하세요.

3. **트래픽 방향**에서 **인그레스**를 선택하세요.

4. **프로젝트**에서 `demo-project-2` 프로젝트를 선택하세요.

5. **확인**을 클릭하면 프로젝트가 허용 목록에 있는 것을 볼 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    만약 네트워크 정책을 설정한 후 네트워크에 접속할 수 없다면, 피어 프로젝트에 해당 이그레스 규칙이 있는지 확인해야 합니다.
  </div>
</div>

#### 다른 프로젝트의 서비스로의 이그레스 트래픽 허용

1. 현재 프로젝트의 **네트워크 격리** 페이지에서 **내부 허용 목록**을 클릭하세요.

2. **허용 목록 항목 추가**를 클릭하세요.

3. **트래픽 방향**에서 **이그레스**를 선택하세요.

4. **유형**에서 **서비스** 탭을 선택하세요.

5. 드롭다운 목록에서 `demo-project-2` 프로젝트를 선택하세요.

6. 이그레스 트래픽을 수신하도록 허용된 서비스를 선택하세요. 이 경우엔 `nginx`를 선택하세요.

7. **확인**을 클릭하면 서비스가 허용 목록에 있는 것을 볼 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    서비스를 생성할 때는, 서비스의 셀렉터가 비어 있지 않은지 확인해야 합니다.
  </div>
</div>

### 클러스터 외부로 들어오는 트래픽의 경우

Super Kubenetes는 CIDR을 사용하여 피어를 구분합니다. Tomcat 디플로이먼트 워크로드가 현재 프로젝트에서 생성되었고 `TCP`가 있는 NodePort `80`의 `NodePort` 서비스 `demo-service`를 통해 노출되었다고 가정합시다. IP 주소가 `192.168.1.1`인 외부 클라이언트가 이 서비스에 접속하려면 이에 대한 규칙을 추가해야 합니다.

#### 클러스터 외부 클라이언트로부터의 인그레스 트래픽 허용

1.	현재 프로젝트의 **네트워크 격리** 페이지에서 **외부 허용 목록**을 선택하고 **허용 목록 항목 추가**를 클릭하세요.

2. **트래픽 방향**에서 **인그레스**를 선택하세요.

3. **네트워크 세그먼트**에 `192.168.1.1/32`를 입력합니다.

4. 프로토콜 `TCP`를 선택하고 포트 번호로 `80`을 입력합니다.

5. **확인**을 클릭하면 규칙이 추가된 것을 확인할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    패킷의 소스 주소가 변경되지 않도록 서비스 설정에서 `spec.externalTrafficPolicy`를 `로컬`로 설정하는 것을 권장합니다. 즉, 패킷의 소스 주소는 클라이언트의 소스 주소입니다.
  </div>
</div>

외부 클라이언트의 IP 주소가 `http://10.1.0.1:80`이라고 가정하고, 그러면 내부 서비스가 접속할 수 있도록 이그레스 트래픽에 대한 규칙을 설정해야 합니다.

#### 클러스터 외부의 서비스로의 이그레스 트래픽 허용

1. 현재 프로젝트의 **네트워크 격리** 페이지에서 **외부 허용 목록**을 선택하고 **허용 목록 항목 추가**를 클릭하세요.

2. **트래픽 방향**에서 **출구**를 선택하세요.

3. **네트워크 세그먼트**에 `10.1.0.1/32`를 입력합니다.

4. 프로토콜 `TCP`를 선택하고 포트 번호로 `80`을 입력합니다.

5. **확인**을 클릭하면 규칙이 추가된 것을 확인할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    4단계에서 **SCTP**를 선택할 때, SCTP가 [활성화](https://kubernetes.io/docs/concepts/services-networking/network-policies/#sctp-support)되어 있는지 꼭 확인해야 합니다.
  </div>
</div>

### 모범 사례

프로젝트의 모든 파드가 안전한지 확인하려면 네트워크 격리를 활성화하는 것이 가장 좋습니다. 네트워크 격리가 켜져 있으면 다른 프로젝트에서 이 프로젝트에 접속할 수 없습니다. 만약 다른 사람이 자신의 워크로드에 접속해야 하는 경우에는 다음 단계를 따라하세요:

1. **프로젝트 설정**에서 [게이트웨이](../project-gateway/)를 설정합니다.
2. 서비스를 통해 게이트웨이에 접속해야 하는 워크로드를 노출합니다.
3. 게이트웨이가 있는 네임스페이스의 인그레스 트래픽을 허용합니다.

만약 이그레스 트래픽이 제어되는 경우에는, 어떤 프로젝트와 서비스 그리고 IP 주소에 접속할 수 있는지에 대한 명확한 계획을 가지고 하나씩 추가해야 합니다. 원하는 것이 무엇인지 확실하지 않다면 네트워크 정책을 변경하지 않는 것이 좋습니다.

## FAQ

Q: 네트워크 격리를 활성화한 후 Super Kubenetes의 사용자 지정 모니터링 시스템이 데이터를 가져올 수 없는 이유는 무엇입니까?

A: 사용자 지정 모니터링을 활성화하면, Super Kubenetes 모니터링 시스템이 파드의 메트릭에 접속할 것입니다. 따라서 Super Kubenetes 모니터링 시스템에 대한 인그레스 트래픽을 허용해야 합니다. 그렇지 않으면 파드 메트릭에 접속할 수 없습니다.

Super Kubenetes는 유사한 설정을 단순화하기 위해 설정 항목 `allowedIngressNamespaces`를 제공합니다. 이것은 설정에 열거된 모든 프로젝트를 허용합니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#ae81ff">root@node1:~# kubectl get -n Super Kubenetes-system clusterconfigurations.installer.Super Kubenetes.io  ks-installer -o yaml</span> 
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
              <span style="color:#f92672">metadata</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                <span style="color:#ae81ff">...</span> 
              <span style="color:#f92672">spec</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">networkpolicy</span>: 
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">nsnpOptions</span>: 
                    <span style="color:#f92672">allowedIngressNamespaces</span>: 
                      <span>-</span> <span style="color:#ae81ff">&nbsp;Super Kubenetes-system</span> 
                      <span>-</span> <span style="color:#ae81ff">&nbsp;Super Kubenetes-monitoring-system</span> 
                <span style="color:#ae81ff">...</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Q: 서비스를 통해 네트워크 정책을 설정한 후에도 서비스에 접속할 수 없는 이유는 무엇입니까?

A: 네트워크 정책을 추가하고 클러스터 IP 주소를 통해 서비스에 액세스할 때 네트워크가 작동하지 않으면 kube-proxy 구성을 확인하여 `masqueradeAll`이 `false`인지 확인하십시오.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#ae81ff">root@node1:~# kubectl get cm -n kube-system kube-proxy -o yaml</span> 
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">data</span>: 
                <span style="color:#f92672">config.conf</span>: |-<span style="color:#e6db74"> 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;... 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;iptables: 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll: false 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;...  </span> 
                <span style="color:#ae81ff">...</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
              <span style="color:#f92672">metadata</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">labels</span>: 
                  <span style="color:#f92672">app</span>: <span style="color:#ae81ff">kube-proxy</span> 
                <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kube-proxy</span> 
                <span style="color:#f92672">namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#ae81ff">...</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Q: 인그레스 규칙을 설정할 때 네트워크 세그먼트를 어떻게 결정하나요?

A: 쿠버네티스에서 패킷의 소스 IP 주소는 NAT에 의해 처리되는 경우가 많으므로, 규칙을 추가하기 전에, 패킷의 소스 주소가 무엇인지 파악해야 합니다. 자세한 내용은 [소스 IP](https://github.com/Super Kubenetes/community/blob/master/sig-network/concepts-and-designs/Super Kubenetes-network-policy.md#source-ip)를 참조하세요.
