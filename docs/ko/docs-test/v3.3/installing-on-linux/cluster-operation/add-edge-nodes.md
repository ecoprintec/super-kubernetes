---
title: 엣지 노드 추가
keywords: 'Kubernetes, Kuberix, KubeEdge'
description: 'Add edge nodes to your cluster.'
linkTitle: 'Add Edge Nodes'
weight: 3630
---

Super Kubenetes는 [KubeEdge](https://kubeedge.io/en/)를 활용하여 네이티브 컨테이너화된 애플리케이션 오케스트레이션 기능을 에지의 호스트로 확장합니다. 별도의 클라우드 및 에지 코어 모듈을 통해 KubeEdge는 설치가 복잡하고 어려울 수 있지만 완전한 에지 컴퓨팅 솔루션을 제공합니다.

![kubeedge_arch](/dist/assets/docs/v3.3/installing-on-linux/add-and-delete-nodes/add-edge-nodes/kubeedge_arch.png)

<div className="notices note">
   <p>Note</p>
   <div>
      KubeEdge의 다양한 구성 요소에 대한 자세한 내용은 [KubeEdge 문서](https://docs.kubeedge.io/en/docs/kubeedge/#components)를 참조하세요.
   </div>
</div>

이 자습서에서는 클러스터에 에지 노드를 추가하는 방법을 보여줍니다.

## 전제 조건

- [KubeEdge](../../../pluggable-components/kubeedge/)를 활성화했습니다.
- 호환성 문제를 방지하기 위해 Kubernetes v1.21.x 또는 이전 버전을 설치하는 것이 좋습니다.
- 에지 노드로 사용할 수 있는 노드가 있습니다. 노드는 Ubuntu(권장) 또는 CentOS를 실행할 수 있습니다. 이 자습서에서는 Ubuntu 18.04를 예로 사용합니다.
- 에지 노드는 쿠버네티스 클러스터 노드와 달리 별도의 네트워크에서 작동해야 합니다.

## 비-에지 워크로드가 에지 노드에 예약되는 것을 방지

일부 데몬 세트(예: Calico)의 허용 오차로 인해 새로 추가된 에지 노드가 제대로 작동하도록 하려면 다음 명령을 실행하여 비-에지 워크로드가 에지로 예약되지 않도록 포드를 수동으로 패치해야 합니다. 노드.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
            <span style="color:#75715e"><span>#</span><span>!/bin/bash</span> 
            <span></span> 
            </span><span style="color:#75715e"></span> 
            NoShedulePatchJson<span style="color:#f92672">=</span><span style="color:#e6db74">'{"spec":{"template":{"spec":{"affinity":{"nodeAffinity":{"requiredDuringSchedulingIgnoredDuringExecution":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"node-role.kubernetes.io/edge","operator":"DoesNotExist"}]}]}}}}}}}'</span> 
            <span></span> 
            ns<span style="color:#f92672">=</span><span style="color:#e6db74">"kube-system"</span> 
            <span></span> 
            <span></span> 
            DaemonSets<span style="color:#f92672">=(</span><span style="color:#e6db74">"nodelocaldns"</span> <span style="color:#e6db74">&nbsp;"kube-proxy"</span> <span style="color:#e6db74">&nbsp;"calico-node"</span><span style="color:#f92672">)</span> 
            <span></span> 
            length<span style="color:#f92672">=</span><span style="color:#e6db74">${#</span>DaemonSets[@]<span style="color:#e6db74">}</span> 
            <span></span> 
            <span style="color:#66d9ef">for</span><span style="color:#f92672">((</span>i<span style="color:#f92672">=</span>0;i&lt;length;i++<span style="color:#f92672">))</span>; 
            <span style="color:#66d9ef">do</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ds<span style="color:#f92672">=</span><span style="color:#e6db74">${</span>DaemonSets[$i]<span style="color:#e6db74">}</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo <span style="color:#e6db74">"Patching resources:DaemonSet/</span><span style="color:#e6db74">${</span>ds<span style="color:#e6db74">}</span><span style="color:#e6db74">"</span> in ns:<span style="color:#e6db74">"</span>$ns<span style="color:#e6db74">"</span>,
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubectl -n $ns patch DaemonSet/<span style="color:#e6db74">${</span>ds<span style="color:#e6db74">}</span> --type merge --patch <span style="color:#e6db74">"</span>$NoShedulePatchJson<span style="color:#e6db74">"</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sleep <span style="color:#ae81ff">1</span> 
            <span style="color:#66d9ef">done</span>
            <p>
        </code>
      </div>
  </pre>
</article>

## 방화벽 규칙 및 포트 전달 규칙 만들기

에지 노드가 클러스터와 성공적으로 통신할 수 있도록 하려면 외부 트래픽이 네트워크로 들어갈 수 있도록 포트를 전달해야 합니다. 구체적으로, 아래 표에 따라 외부 포트를 해당 내부 IP 주소(제어 평면 노드) 및 포트에 매핑합니다. 또한 이러한 포트('10000' ~ '10004')로의 트래픽을 허용하는 방화벽 규칙도 만들어야 합니다.

<div className="notices note">
   <p>Note</p>
   <div>
      ke-installer의 'ClusterConfiguration'에서 내부 IP 주소를 설정하면 포워딩 규칙을 설정해야 합니다. 포워딩 규칙을 설정하지 않은 경우 포트 30000~30004에 직접 연결할 수 있습니다.
   </div>
</div>

| Fields              | External Ports | Fields                  | Internal Ports |
| ------------------- | -------------- | ----------------------- | -------------- |
| `cloudhubPort`      | `10000`        | `cloudhubNodePort`      | `30000`        |
| `cloudhubQuicPort`  | `10001`        | `cloudhubQuicNodePort`  | `30001`        |
| `cloudhubHttpsPort` | `10002`        | `cloudhubHttpsNodePort` | `30002`        |
| `cloudstreamPort`   | `10003`        | `cloudstreamNodePort`   | `30003`        |
| `tunnelPort`        | `10004`        | `tunnelNodePort`        | `30004`        |

## 에지 노드 구성

다음과 같이 에지 노드를 구성해야 합니다.

### 컨테이너 런타임 설치

[KubeEdge](https://docs.kubeedge.io/en/docs/)는 Docker, containerd, CRI-O 및 Virtlet을 포함한 여러 컨테이너 런타임을 지원합니다. 자세한 내용은 [KubeEdge 문서](https://docs.kubeedge.io/en/docs/advanced/cri/)를 참조하세요.

<div className="notices note">
   <p>Note</p>
   <div>
      에지 노드의 컨테이너 런타임으로 Docker를 사용하는 경우 Super Kubenetes가 Pod 메트릭을 가져올 수 있도록 Docker v19.3.0 이상이 설치되어 있어야 합니다.
   </div>
</div>

### EdgeMesh 구성

에지 노드에서 [EdgeMesh](https://kubeedge.io/en/docs/advanced/edgemesh/)를 구성하려면 다음 단계를 수행하십시오.

1. Edit `/etc/nsswitch.conf`.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>vi /etc/nsswitch.conf</code>
         </div>
     </pre>
   </article>

2. 이 파일에 다음 내용을 추가합니다.:

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>hosts:          dns files mdns4_minimal <span style="color:#f92672">[</span>NOTFOUND<span style="color:#f92672">=</span><span style="color:#66d9ef">return</span><span style="color:#f92672">]</span></code>
         </div>
     </pre>
   </article>

3. 파일을 저장하고 다음 명령을 실행하여 IP 전달을 활성화합니다.:

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>sudo echo <span style="color:#e6db74">"net.ipv4.ip_forward = 1"</span> >> /etc/sysctl.conf</code>
         </div>
     </pre>
   </article>

4. 수정 사항을 확인합니다.:

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>sudo sysctl -p | grep ip_forward</code>
         </div>
     </pre>
   </article>

   Expected result:

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>net.ipv4.ip_forward <span style="color:#f92672">=</span> <span style="color:#ae81ff">&nbsp;1</span></code>
         </div>
     </pre>
   </article>

## 에지 노드 추가

1. 콘솔에 `admin`으로 로그인하고 왼쪽 상단의 **Platform**을 클릭합니다.

2. **Cluster Management**를 선택하고 **Nodes**에서 **Edge Nodes**로 이동합니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         [멀티 클러스터 관리](../../../multicluster-management/)를 활성화한 경우 먼저 클러스터를 선택해야 합니다.
      </div>
   </div>

3. **Add**를 클릭합니다. 표시되는 대화 상자에서 노드 이름을 설정하고 에지 노드의 내부 IP 주소를 입력합니다. 계속하려면 **OK**을 클릭하세요.

    <div className="notices note">
     <p>Note</p>
     <div>
       - 내부 IP 주소는 노드 간 통신에만 사용되며 반드시 Edge 노드의 실제 내부 IP 주소를 사용할 필요는 없습니다. IP 주소가 성공적으로 확인되면 사용할 수 있습니다.
       - 기본 taint를 추가하려면 체크박스를 선택하는 것을 권장합니다.
     </div>
   </div>

4. **Edge Node Configuration Command** 아래에 자동으로 생성된 명령을 복사하여 Edge 노드에서 실행합니다.

    <div className="notices note">
     <p>Note</p>
     <div>
       명령을 실행하기 전에 에지 노드에 `wget`이 설치되어 있는지 확인하십시오.
     </div>
   </div>

5. 대화 상자를 닫고 페이지를 새로 고치면 에지 노드가 목록에 나타납니다.

    <div className="notices note">
     <p>Note</p>
     <div>
       에지 노드를 추가한 후 **Edge nodes** 페이지에서 CPU 및 메모리 리소스 사용량을 볼 수 없으면 [Metrics Server](../../../pluggable-components/metrics-server/ ) 0.4.1 이상이 클러스터에 설치되어 있습니다.
     </div>
   </div>

## 에지 노드에 대한 모니터링 정보 수집

에지 노드에 대한 모니터링 정보를 수집하려면 'ClusterConfiguration'에서 'metrics_server'를 활성화하고 KubeEdge에서 'edgeStream'을 활성화해야 합니다.

1. Super Kubenetes 웹 콘솔에서 **Platform > Cluster Management**를 선택합니다.

2. 왼쪽 탐색 창에서 **CRD**를 클릭합니다.

3. 오른쪽 창의 검색 창에 'clusterconfiguration'을 입력하고 결과를 클릭하여 세부 정보 페이지로 이동합니다.

4. ke-installer 오른쪽 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" /> 클릭 후 * 클릭 *YAML 편집\*\*.

5. **metrics_server**를 검색하고 'enabled' 값을 'false'에서 'true'로 변경합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
            <p>
                  <span style="color:#f92672">&nbsp;&nbsp;metrics_server</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span>&nbsp;Change "false" to "true".</span></p></code></div></pre>
   </article>

6. 오른쪽 하단의 **OK**을 클릭하여 변경 사항을 저장합니다.

7. `/etc/kubeedge/config` 파일을 열고 `edgeStream`을 검색하고 `false`를 `true`로 변경하고 변경 사항을 저장합니다.

   <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
             <p>
               cd /etc/kubeedge/config
               vi edgecore.yaml
             </p>
           </code>
         </div>
     </pre>
   </article>

   <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
             <p>
               edgeStream:
               enable: true <span style="color:#75715e"><span>#</span><span>Change "false" to "true".。</span></span> 
               handshakeTimeout: <span style="color:#ae81ff">30</span> 
               readDeadline: <span style="color:#ae81ff">15</span> 
               server: xx.xxx.xxx.xxx:10004 <span style="color:#75715e"><span>#</span><span>If port forwarding is not configured, change the port ID to 30004 here.</span></span> 
               tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
               tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
               tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
               writeDeadline: <span style="color:#ae81ff">15</span>
             </p>
           </code>
         </div>
     </pre>
   </article>

8. 다음 명령을 실행하여 `edgecore.service`를 다시 시작합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>systemctl restart edgecore.service</code>
         </div>
      </pre>
   </article>

9. 여전히 모니터링 데이터가 표시되지 않으면 다음 명령을 실행합니다.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>journalctl -u edgecore.service -b -r</code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      '실행 환경을 확인하지 못했습니다: edgecore를 실행할 때 kube-proxy가 edge 노드에서 실행되지 않아야 합니다'가 표시되면 8단계를 참조하여 'edgecore.service'를 다시 시작합니다.
    </div>
  </div>

## 에지 노드 제거

에지 노드를 제거하기 전에 에지 노드에서 실행 중인 모든 워크로드를 삭제하십시오.

1. 에지 노드에서 다음 명령을 실행합니다.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./keadm reset</code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>apt remove mosquitto</code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>rm -rf /var/lib/kubeedge /var/lib/edged /etc/kubeedge/ca /etc/kubeedge/certs</code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
      tmpfs-mount 폴더를 삭제할 수 없는 경우 노드를 다시 시작하거나 폴더를 먼저 마운트 해제합니다.
      </div>
   </div>

2. 다음 명령을 실행하여 클러스터에서 에지 노드를 제거합니다.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>kubectl delete node <edgenode-name></code>
         </div>
      </pre>
   </article>

3. 클러스터에서 KubeEdge를 제거하려면 다음 명령을 실행하십시오.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>helm uninstall kubeedge -n kubeedge</code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>kubectl delete ns kubeedge</code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
      제거 후에는 클러스터에 에지 노드를 추가할 수 없습니다.
      </div>
   </div>
