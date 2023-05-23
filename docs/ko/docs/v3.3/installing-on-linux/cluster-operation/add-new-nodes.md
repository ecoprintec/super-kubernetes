---
title: 새 노드 추가
keywords: 'Kubernetes, Kuberix, scale-out, add-nodes'
description: 'Add more nodes to scale out your cluster.'
linkTitle: 'Add New Nodes'
weight: 3610
---

일정 기간 Super Kubenetes를 사용한 후에는 워크로드 수가 증가하면서 클러스터를 확장해야 할 가능성이 높습니다. Super Kubenetes 설치 프로그램 [KubePOP](https://github.com/ke/kubepop)를 사용하여 쿠버네티스 클러스터에 새 노드를 추가할 수 있습니다. 기본적으로 작업은 Kubelet의 등록 메커니즘을 기반으로 합니다. 즉, 새 노드는 기존 쿠버네티스 클러스터에 자동으로 조인됩니다. Super Kubenetes는 하이브리드 환경을 지원하므로 새로 추가된 호스트 OS는 CentOS 또는 Ubuntu가 될 수 있습니다.

이 자습서에서는 단일 노드 클러스터에 새 노드를 추가하는 방법을 보여줍니다. 다중 노드 클러스터를 확장하는 단계는 기본적으로 동일합니다.

## 전제 조건

- 단일 노드 클러스터가 있어야 합니다. 자세한 내용은 [Linux에서 일체형 설치](../../../quick-start/all-in-one-on-linux/)를 참조하십시오.

- [KubePOP 다운로드](../../../installing-on-linux/introduction/multioverview/#step-2-download-kubepop)가 있습니다.

## 쿠버네티스에 작업자 노드 추가

1. KubePOP를 사용하여 클러스터 정보를 검색합니다. 아래 명령은 구성 파일(`sample.yaml`)을 생성합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --from-cluster</code>
        </div>
    </pre>
  </article>

    <div className="notices note">
      <p>Note</p>
      <div>
        컴퓨터에 이미 구성 파일이 있는 경우 이 단계를 건너뛸 수 있습니다. 예를 들어 KubePOP에서 설정한 다중 노드 클러스터에 노드를 추가하려는 경우 구성 파일을 삭제하지 않은 경우 여전히 구성 파일이 있을 수 있습니다.
      </div>
    </div>

2. 구성 파일에서 `hosts` 및 `roleGroups` 아래에 새 노드의 정보를 입력합니다. 이 예에서는 두 개의 새 노드(예: `node1` 및 `node2`)를 추가합니다. 여기서 'master1'은 기존 노드입니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
             <p>
               ···
               spec:
                 hosts:
                 <span>-</span><span style="color:#f92672">&nbsp;{</span>name: master1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                 <span>-</span><span style="color:#f92672">&nbsp;{</span>name: node1, address: 192.168.0.4, internalAddress: 192.168.0.4, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                 <span>-</span><span style="color:#f92672">&nbsp;{</span>name: node2, address: 192.168.0.5, internalAddress: 192.168.0.5, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                 roleGroups:
                   etcd:
                   <span>-</span> master1
                   control-plane:
                   <span>-</span> master1
                   worker:
                   <span>-</span> node1
                   <span>-</span> node2
               ···              
             </p>
           </code>
         </div>
     </pre>
   </article>

     <div className="notices note">
       <p>Note</p>
       <div>
         - 설정 파일에 대한 자세한 내용은 [설정 파일 편집](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file)을 참조하십시오.
         - 새 노드를 추가할 때 기존 노드의 호스트 이름을 수정할 수 없습니다.
         - 예제의 호스트 이름을 자신의 호스트 이름으로 바꾸십시오.
       </div>
     </div>


3. 다음 명령을 실행합니다.

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
      <code>./kk add nodes -f sample.yaml</code>
      </div>
    </pre>
  </article>

4. 설치가 완료되면 Super Kubenetes 콘솔에서 새 노드와 해당 정보를 볼 수 있습니다. **Cluster Management** 페이지에서 왼쪽 메뉴의 **Nodes** 아래에 있는 **Cluster Nodes**를 선택하거나 `kubectl get node` 명령을 실행하여 변경 사항을 확인합니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
             <p>
               $ kubectl get node
               NAME          STATUS   ROLES           AGE   VERSION
               master1       Ready    master,worker   20d   v1.17.9
               node1         Ready    worker          31h   v1.17.9
               node2         Ready    worker          31h   v1.17.9              
             </p>
           </code>
         </div>
     </pre>
   </article>

## 고가용성을 위한 새 마스터 노드 추가

마스터 노드를 추가하는 단계는 일반적으로 작업자 노드를 추가하는 단계와 동일하지만 클러스터에 대한 로드 밸런서를 구성해야 합니다. 모든 클라우드 로드 밸런서 또는 하드웨어 로드 밸런서(예: F5)를 사용할 수 있습니다. 또한 Keepalived 및 [HAproxy](https://www.haproxy.com/) 또는 Nginx도 고가용성 클러스터를 생성하기 위한 대안입니다.

1. KubePOP를 사용하여 구성 파일을 생성합니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>./kk create config --from-cluster</code>
         </div>
     </pre>
   </article>

2. 파일을 열면 일부 필드에 값이 미리 채워져 있는 것을 볼 수 있습니다. 파일에 새 노드 및 로드 밸런서 정보를 추가합니다. 다음은 참조용 예입니다.:

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
               <p>
                 <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha1</span> 
                 <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Cluster</span> 
                 <span style="color:#f92672">metadata</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
                 <span style="color:#f92672">spec</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                 <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> You should complete the ssh information of the hosts</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 172.16.0.2, internalAddress: 172.16.0.2, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 172.16.0.5, internalAddress: 172.16.0.5, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 172.16.0.6, internalAddress: 172.16.0.6, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: worker1, address: 172.16.0.3, internalAddress: 172.16.0.3, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: worker2, address: 172.16.0.4, internalAddress: 172.16.0.4, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: worker3, address: 172.16.0.7, internalAddress: 172.16.0.7, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker1</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker2</span> 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker3</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If loadbalancer is used, 'address' should be set to loadbalancer's ip.</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#ae81ff">172.16.0.253</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.17.9</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;proxyMode</span>: <span style="color:#ae81ff">ipvs</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll</span>: <span style="color:#66d9ef">false</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;maxPods</span>: <span style="color:#ae81ff">110</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodeCidrMaskSize</span>: <span style="color:#ae81ff">24</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span> 
               </p>
           </code>
         </div>
     </pre>
   </article>

3. Pay attention to the `controlPlaneEndpoint` field.

    <article className="highlight">
     <pre>
       <div className="copy-code-button" title="Copy Code"></div>
       <div className="code-over-div">
           <code>
             <p>
               <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
               <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If you use a load balancer, the address should be set to the load balancer's ip.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#ae81ff">172.16.0.253</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span></p>
           </code>
       </div>
     </pre>
   </article>

   - 내부 접근을 위한 로드밸런서의 도메인 이름은 기본적으로 `lb.kuberix.local`이다. 필요에 따라 변경할 수 있습니다.
   - 대부분의 경우 'address' 필드에 로드 밸런서의 **private IP address**를 제공해야 합니다. 그러나 클라우드 공급자마다 로드 밸런서에 대한 구성이 다를 수 있습니다.
   - 'port' 필드는 'api-server'의 포트를 나타냅니다.

4. 파일을 저장하고 다음 명령을 실행하여 구성을 적용합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk add nodes -f sample.yaml</code>
        </div>
    </pre>
  </article>
