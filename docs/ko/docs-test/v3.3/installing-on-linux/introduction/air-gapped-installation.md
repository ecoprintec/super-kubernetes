---
title: 에어갭 설치
keywords: 'Air-gapped, installation, Kuberix, KubeKey'
description: 'Understand how to install Super Kubenetes and Kubernetes in the air-gapped environment.'
linkTitle: 'Air-gapped Installation'
weight: 3140
---

KubeKey을 사용하면 쿠버네티스/K3s만(쿠버네티스/K3s 및 Super Kubenetes 둘 다) 및 기타 클라우드 네이티브 플러그인을 유연하고 빠르고 편리한 방식으로 설치할 수 있습니다. 또한 클러스터를 확장하고 업그레이드하는 데 효과적인 도구입니다.

KubeKey v2.1.0에서는 쿠버네티스 클러스터의 에어갭 설치를 위한 솔루션을 제공하는 매니페스트 및 아티팩트의 개념을 도입했습니다. 매니페스트 파일은 현재 쿠버네티스 클러스터의 정보를 설명하고 아티팩트의 콘텐츠를 정의합니다. 이전에는 배포할 쿠버네티스 버전과 이미지가 다르기 때문에 배포 도구, 이미지(.tar) 파일 및 기타 바이너리를 사용자가 준비해야 했습니다. 이제 KubeKey를 사용하면 에어 갭 설치가 그 어느 때보다 쉬워집니다. 매니페스트 파일을 사용하여 에어 갭 환경에서 클러스터에 필요한 것을 정의한 다음, 아티팩트 파일을 내보내 이미지 레지스트리와 쿠버네티스 클러스터를 빠르고 쉽게 배포할 수 있습니다.

## 전제 조건

| Host IP     | Host Name | Usage                                                                                               |
| ----------- | --------- | --------------------------------------------------------------------------------------------------- |
| 192.168.0.2 | node1     | 쿠버네티스 v1.22.10 및 Super Kubenetes v3.3.0이 설치된 소스 클러스터 패키징을 위한 온라인 호스트 |
| 192.168.0.3 | node2     | 에어 갭 환경의 컨트롤 패널 노드                                                                     |
| 192.168.0.4 | node3     | 에어갭 환경의 이미지 레지스트리 노드                                                                |

## 설치 준비

1. 다음 명령을 실행하여 KubeKey v2.2.2를 다운로드합니다.

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
               <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
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
               <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
             </div>
           </pre>
         </article>
       </main>
     </div>
   </main>

2. 소스 클러스터에서 KubeKey를 사용하여 매니페스트를 생성합니다. 다음 두 가지 방법이 지원됩니다.

   - (권장) 생성된 클러스터에서 다음 명령어를 실행하여 매니페스트 파일을 생성합니다.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create manifest</code>
         </div>
      </pre>
   </article>

   - 템플릿에 따라 수동으로 매니페스트 파일을 생성하고 컴파일합니다. 자세한 내용은 [ manifest-example ](https://github.com/ke/KubeKey/blob/master/docs/manifest-example.md)을 참조하세요.

3. 다음 명령을 실행하여 소스 클러스터에서 매니페스트 구성을 수정합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vim manifest.yaml</code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span>-</span><span>-</span><span>-</span> 
   										<span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha2</span> 
   										<span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Manifest</span> 
   										<span style="color:#f92672">metadata</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
   										<span style="color:#f92672">spec</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;arches</span>: 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">amd64</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;operatingSystems</span>: 
   										&nbsp;&nbsp;- <span style="color:#f92672">arch</span>: <span style="color:#ae81ff">amd64</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">linux</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;id</span>: <span style="color:#ae81ff">centos</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#e6db74">"7"</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;repository</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iso</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localPath</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</span>: <span style="color:#ae81ff"><span></span>https://github.com/Super Kubenetes/kubekey/releases/download/v2.2.2/centos7-rpms-amd64.iso<span></span></span> 
   										&nbsp;&nbsp;- <span style="color:#f92672">arch</span>: <span style="color:#ae81ff">amd64</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">linux</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;id</span>: <span style="color:#ae81ff">ubuntu</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#e6db74">"20.04"</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;repository</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iso</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localPath</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</span>: <span style="color:#ae81ff"><span></span>https://github.com/Super Kubenetes/kubekey/releases/download/v2.2.2/ubuntu-20.04-debs-amd64.iso<span></span></span> 
   										<span style="color:#f92672">&nbsp;&nbsp;kubernetesDistributions</span>: 
   										&nbsp;&nbsp;- <span style="color:#f92672">type</span>: <span style="color:#ae81ff">kubernetes</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.10</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;components</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;helm</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v3.6.3</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v0.9.1</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v3.4.13</span> 
   										<span style="color:#75715e">&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span> For now, if your cluster container runtime is containerd, KubeKey will add a docker 20.10.8 container runtime in the below list.</span> 
   										<span style="color:#75715e">&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span> The reason is KubeKey creates a cluster with containerd by installing a docker first and making kubelet connect the socket file of containerd which docker contained.</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;containerRuntimes</span>: 
   										&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">type</span>: <span style="color:#ae81ff">docker</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">20.10.8</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;crictl</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.0</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;docker-registry</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#e6db74">"2"</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;harbor</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v2.4.1</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;docker-compose</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v2.2.2</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;images</span>: 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-apiserver:v1.22.10</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-controller-manager:v1.22.10</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-proxy:v1.22.10</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-scheduler:v1.22.10</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/pause:3.5</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/coredns/coredns:1.8.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/calico/cni:v3.23.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/calico/kube-controllers:v3.23.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/calico/node:v3.23.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/calico/pod2daemon-flexvol:v3.23.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/calico/typha:v3.23.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/flannel:v0.12.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/openebs/provisioner-localpv:3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/openebs/linux-utils:3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/haproxy:2.3</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/nfs-subdir-external-provisioner:v4.0.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/k8s-dns-node-cache:1.15.12</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/ks-installer:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/ks-apiserver:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/ks-console:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/ks-controller-manager:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kubectl:v1.20.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kubectl:v1.21.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kubectl:v1.22.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kubefed:v0.8.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/tower:v0.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/minio/minio:RELEASE.2019-08-07T01-59-21Z</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/minio/mc:RELEASE.2019-08-07T23-14-43Z</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/csiplugin/snapshot-controller:v4.0.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/nginx-ingress-controller:v1.1.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/mirrorgooglecontainers/defaultbackend-amd64:1.4</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/metrics-server:v0.4.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/redis:5.0.14-alpine</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/haproxy:2.0.25-alpine</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/alpine:3.14</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/osixia/openldap:1.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/netshoot:v1.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/kubeedge/cloudcore:v1.9.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/kubeedge/iptables-manager:v1.9.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/edgeservice:v0.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/openpitrix-jobs:v3.2.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/devops-apiserver:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/devops-controller:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/devops-tools:v3.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/ks-jenkins:v3.3.0-2.319.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jenkins/inbound-agent:4.10-2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-base:v3.2.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-nodejs:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-maven:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-maven:v3.2.1-jdk11</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-python:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.16</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.17</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.18</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-base:v3.2.2-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-nodejs:v3.2.0-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-maven:v3.2.0-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-maven:v3.2.1-jdk11-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-python:v3.2.0-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.0-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.16-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.17-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/builder-go:v3.2.2-1.18-podman</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/s2ioperator:v3.2.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/s2irun:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/s2i-binary:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/tomcat85-java11-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/tomcat85-java11-runtime:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/tomcat85-java8-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/tomcat85-java8-runtime:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/java-11-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/java-8-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/java-8-runtime:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/java-11-runtime:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/nodejs-8-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/nodejs-6-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/nodejs-4-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/python-36-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/python-35-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/python-34-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/python-27-centos7:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">quay.io/argoproj/argocd:v2.3.3</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">quay.io/argoproj/argocd-applicationset:v0.4.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">ghcr.io/dexidp/dex:v2.30.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/redis:6.2.6-alpine</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jimmidyson/configmap-reload:v0.5.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/prom/prometheus:v2.34.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/prometheus-config-reloader:v0.55.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/prometheus-operator:v0.55.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-rbac-proxy:v0.11.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-state-metrics:v2.3.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/prom/node-exporter:v1.3.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/prom/alertmanager:v0.23.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/thanosio/thanos:v0.25.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/grafana/grafana:8.3.3</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-rbac-proxy:v0.8.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/notification-manager-operator:v1.4.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/notification-manager:v1.4.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/notification-tenant-sidecar:v3.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/elasticsearch-curator:v5.7.6</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/elasticsearch-oss:6.8.22</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/fluentbit-operator:v0.13.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/docker:19.03</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/fluent-bit:v1.8.11</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/log-sidecar-injector:1.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/elastic/filebeat:6.7.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-events-operator:v0.4.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-events-exporter:v0.4.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-events-ruler:v0.4.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-auditing-operator:v0.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kube-auditing-webhook:v0.2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/istio/pilot:1.11.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/istio/proxyv2:1.11.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jaegertracing/jaeger-operator:1.27</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jaegertracing/jaeger-agent:1.27</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jaegertracing/jaeger-collector:1.27</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jaegertracing/jaeger-query:1.27</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/jaegertracing/jaeger-es-index-cleaner:1.27</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kiali-operator:v1.38.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/kiali:v1.38</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/busybox:1.31.1</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/nginx:1.14-alpine</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/joosthofman/wget:1.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/nginxdemos/hello:plain-text</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/wordpress:4.8-apache</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/mirrorgooglecontainers/hpa-example:latest</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/java:openjdk-8-jre-alpine</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/fluent/fluentd:v1.4.2-2.0</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/library/perl:latest</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/examples-bookinfo-productpage-v1:1.16.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/examples-bookinfo-reviews-v1:1.16.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/examples-bookinfo-reviews-v2:1.16.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/examples-bookinfo-details-v1:1.16.2</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/Super Kubenetes/examples-bookinfo-ratings-v1:1.16.3</span> 
   										&nbsp;&nbsp;- <span style="color:#ae81ff">docker.io/weaveworks/scope:1.13.0</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices note">
  <p>Note</p>
  <div>
    - 내보낼 아티팩트 파일에 conntarck, chrony 등의 ISO 종속성이 포함된 경우 **operationSystem**의 **repostiory.iso.url**에서 ISO 종속성을 다운로드할 IP 주소를 설정합니다. 또는 미리 ISO 패키지를 다운로드하여 **localPath**에 로컬 경로를 입력하고 `url` 구성 항목을 삭제할 수 있습니다.

    - KubeKey를 사용하여 이미지 푸시를 위한 Harbor 레지스트리를 구축할 때 사용할 **harbor** 및 **docker-compose** 구성 항목을 활성화해야 합니다.

    - 기본적으로 생성된 매니페스트의 이미지 목록은 **docker.io**에서 가져옵니다.

    - **manifest-sample.yaml** 파일을 사용자 지정하여 원하는 아티팩트 파일을 내보낼 수 있습니다.

    - ISO 파일은 https://github.com/ke/KubeKey/releases/tag/v2.2.2에서 다운로드할 수 있습니다.

  </div>
</div>
   
4. 소스 클러스터에서 아티팩트를 내보냅니다.

   <main className="code-tabs">
    <ul className="nav nav-tabs">
      <li className="nav-item"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 양호함</a></li>
      <li className="nav-item active"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 불안정함</a></li>
    </ul>
    <div className="tab-content">
      <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
        <p>다음 명령을 실행합니다.</p>
        <article className="highlight">
          <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>./kk artifact export -m manifest-sample.yaml -o Super Kubenetes.tar.gz </code>
            </div>
          </pre>
        </article>
      </main>
      <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
        <p>다음 명령을 실행합니다.</p>
        <article className="highlight">
          <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>
                export KKZONE<span style="color:#f92672">=</span>cn
                <span></span> 
                ./kk artifact export -m manifest-sample.yaml -o Super Kubenetes.tar.gz
              </code>
            </div>
          </pre>
        </article>
      </main>
    </div>
  </main>

   <div className="notices note">
    <p>Note</p>
    <div>
      아티팩트는 지정된 매니페스트 파일에서 내보낸 이미지 패키지(.tar) 및 관련 바이너리를 포함하는 .tgz 패키지입니다. KubeKey 명령에서 이미지 레지스트리 초기화, 클러스터 생성, 노드 추가 및 클러스터 업그레이드를 위해 아티팩트를 지정할 수 있으며, 그러면 KubeKey는 명령을 실행할 때 자동으로 아티팩트의 압축을 풀고 압축이 풀린 파일을 사용합니다.

      - 네트워크 연결이 작동하는지 확인하십시오.

      - KubeKey는 이미지 목록에서 이미지 이름을 확인합니다. 이미지 레지스트리에 인증이 필요한 경우 매니페스트 파일의 **.registry.auths**에서 구성할 수 있습니다.
    </div>

  </div>
   
## 에어 갭 환경에 클러스터 설치

1. USB 장치를 사용하여 에어 갭 환경의 노드에 다운로드한 KubeKey 아티팩트를 복사합니다.

2. 다음 명령을 실행하여 air-gapped 클러스터에 대한 구성 파일을 생성합니다.:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create config --with-Super Kubenetes v3.3.0 --with-kubernetes v1.22.10 -f config-sample.yaml</code>
         </div>
      </pre>
   </article>

3. 다음 명령을 실행하여 구성 파일을 수정합니다.:

    <article className="highlight">
       <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>vim config-sample.yaml</code>
          </div>
       </pre>
    </article>

    <div className="notices note">
     <p>Note</p>
     <div>
     - 에어갭 환경의 실제 구성에 따라 노드 정보를 수정한다.
     - 배포할 '레지스트리'가 있는 노드를 지정해야 합니다(자체 구축 Harbour 레지스트리의 KubeKey 배포의 경우).
     - `registry`에서 `type`의 값은 `harbor`의 값으로 지정되어야 합니다. 그렇지 않으면 기본적으로 도커 레지스트리가 설치됩니다.
     </div>
   </div>

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
               <p>
                 <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha2</span> 
                 <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Cluster</span> 
                 <span style="color:#f92672">metadata</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
                 <span style="color:#f92672">spec</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.3, internalAddress: 192.168.0.3, user: root, password</span>: <span style="color:#e6db74">"&lt;REPLACE_WITH_YOUR_ACTUAL_PASSWORD&gt;"</span>} 
                 &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.4, internalAddress: 192.168.0.4, user: root, password</span>: <span style="color:#e6db74">"&lt;REPLACE_WITH_YOUR_ACTUAL_PASSWORD&gt;"</span>} 
                 <span></span> 
                 <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If you want to use KubeKey to automatically deploy the image registry, set this value. You are advised to separately deploy the registry and the cluster.</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registry</span>: 
                 &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span> Internal loadbalancer for apiservers</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> internalLoadbalancer: haproxy</span> 
                 <span></span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.10</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span>&nbsp;multus support. <a style="color:#75715e; cursor:text;">https://github.com/k8snetworkplumbingwg/multus-cni</a></span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;multusCNI</span>: 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> To use KubeKey to deploy Harbor, set the value of this parameter to harbor. If you do not set this parameter and still use KubeKey to create an container image registry, the docker registry is used by default.</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">harbor</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If Harbor or other registries deployed by using KubeKey requires login, you can set the auths parameter of the registry. However, if you create a docker registry using KubeKey, you do not need to set the auths parameter.</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Note: If you use KubeKey to deploy Harbor, do not set this parameter until Harbor is started.</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>auths:</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>  "dockerhub.kubekey.local":</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>    username: admin</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>    password: Harbor12345</span> 
                 <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Set the private registry to use during cluster deployment.</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;namespaceOverride</span>: <span style="color:#e6db74">""</span> 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                 <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                 <span style="color:#f92672">&nbsp;&nbsp;addons</span>: []
               </p>
           </code>
         </div>
     </pre>
   </article>

4)  다음 명령을 실행하여 이미지 레지스트리를 설치합니다.:

     <article className="highlight">
        <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
              <code>./kk init registry -f config-sample.yaml -a Super Kubenetes.tar.gz</code>
           </div>
        </pre>
     </article>

     <div className="notices note">
      <p>Note</p>
      <div>
        명령의 매개변수는 다음과 같이 설명됩니다.

        - **config-sample.yaml**: air-gapped 환경에서 클러스터의 구성 파일을 지정합니다.

        - **Super Kubenetes.tar.gz**: 소스 클러스터의 이미지 패키지를 지정한다.

      </div>
    </div>

5)  하버 프로젝트를 생성합니다.

      <div className="notices note">
        <p>Note</p>
        <div>
          Harbor는 RBAC(역할 기반 액세스 제어) 메커니즘을 채택하므로 지정된 사용자만 특정 작업을 수행할 수 있습니다. 따라서 Harbour에 이미지를 푸시하기 전에 프로젝트를 생성해야 합니다. Harbor는 두 가지 유형의 프로젝트를 지원합니다.

          - **공개**: 모든 사용자가 프로젝트에서 이미지를 가져올 수 있습니다.

          - **비공개**: 프로젝트 구성원만 프로젝트에서 이미지를 가져올 수 있습니다.

          Harbor 로그인을 위한 사용자 이름과 비밀번호는 기본적으로 **admin** 및 **Harbor12345**입니다. Harbor의 설치 파일은 **/opt/harbor**에 있으며, 여기서 Harbour의 O&M을 수행할 수 있습니다.
        </div>

      </div>

    방법 1: 다음 명령을 실행하여 하버 프로젝트를 생성합니다.

    a. 다음 명령을 실행하여 지정된 스크립트를 다운로드하여 Harbour 레지스트리를 초기화합니다.:

      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
              <code>curl -O <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/Super Kubenetes/ks-installer/master/scripts/create_project_harbor.sh</a></code>
          </div>
        </pre>
      </article>

    b. 다음 명령을 실행하여 스크립트 구성 파일을 수정하십시오.:

      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
              <code>vim create_project_harbor.sh</code>
          </div>
        </pre>
      </article>

      <article className="highlight">
        <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>
                  <p>
                    <span style="color:#75715e"><span>#</span>!/usr/bin/env bash</span> 
                    <span style="color:#75715e"><span>#</span> Copyright 2018 The Super Kubenetes Authors.</span>
                    <span style="color:#75715e"><span>#</span></span> 
                    <span style="color:#75715e"><span>#</span> Licensed under the Apache License, Version 2.0 (the "License");</span>
                    <span style="color:#75715e"><span>#</span> you may not use this file except in compliance with the License.</span>
                    <span style="color:#75715e"><span>#</span> You may obtain a copy of the License at</span>
                    <span style="color:#75715e"><span>#</span></span> 
                    <span style="color:#75715e"><span>#</span><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0<span></span></span> 
                    <span style="color:#75715e"><span>#</span></span> 
                    <span style="color:#75715e"><span>#</span> Unless required by applicable law or agreed to in writing, software</span>
                    <span style="color:#75715e"><span>#</span> distributed under the License is distributed on an "AS IS" BASIS,</span>
                    <span style="color:#75715e"><span>#</span> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
                    <span style="color:#75715e"><span>#</span> See the License for the specific language governing permissions and</span>
                    <span style="color:#75715e"><span>#</span> limitations under the License.</span> 
                    <span style="color:#ae81ff"><span></span>url="https://dockerhub.kubekey.local"<span></span></span> <span style="color:#75715e">&nbsp;&nbsp;<span>#</span>Change the value of url to <a style="color:#75715e; cursor:text;">https://dockerhub.kubekey.local.</a></span> 
                    <span style="color:#ae81ff">user="admin"</span> 
                    <span style="color:#ae81ff">passwd="Harbor12345"</span> 
                    <span></span> 
                    <span style="color:#ae81ff">harbor_projects=(library</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetesio</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;calico</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;coredns</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;openebs</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;csiplugin</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;minio</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;mirrorgooglecontainers</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;osixia</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;prom</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;thanosio</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;jimmidyson</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;grafana</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;elastic</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;istio</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;jaegertracing</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;jenkins</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;weaveworks</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;openpitrix</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;joosthofman</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;nginxdemos</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;fluent</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;kubeedge</span> 
                    <span style="color:#ae81ff">)</span> 
                    <span></span> 
                    <span style="color:#ae81ff">for project in "${harbor_projects[@]}"; do</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;echo "creating $project"</span> 
                    <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;curl -u "${user}:${passwd}" -X POST -H "Content-Type: application/json" "${url}/api/v2.0/projects" -d "{ \\"project_name\\": \\"${project}\\", \\"public\\": true}" -k</span> <span style="color:#75715e"><span>&nbsp;#</span>Add -k at the end of the curl command.</span>
                    <span style="color:#ae81ff">done</span>
                  </p>
              </code>
            </div>
        </pre>
      </article>

     <div className="notices note">
      <p>Note</p>
      <div>
        - **url**의 값을 **https://dockerhub.KubeKey.local**로 변경합니다.

        - 레지스트리의 프로젝트 이름은 이미지 목록과 동일해야 합니다.

        - **curl** 명령 끝에 **-k**를 추가합니다.

      </div>
    </div>

    c. 다음 명령어를 실행하여 Harbour 프로젝트를 생성합니다.:

      <article className="highlight">
        <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>chmod +x create_project_harbor.sh</code>
            </div>
        </pre>
      </article>

      <article className="highlight">
        <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>./create_project_harbor.sh</code>
            </div>
        </pre>
      </article>
     
     방법 2: Harbour에 로그인하여 프로젝트를 생성합니다. 모든 사용자가 이 프로젝트에서 이미지를 가져올 수 있도록 프로젝트를 **공개**로 설정합니다. 자세한 내용은 [프로젝트 생성]( https://goharbor.io/docs/1.10/working-with-projects/create-projects/)을 참조하세요.
     
     ![harbor-login](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-login.jpg)

6.  다음 명령을 다시 실행하여 클러스터 구성 파일을 수정합니다.：

     <article className="highlight">
        <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
              <code>vim config-sample.yaml</code>
           </div>
        </pre>
     </article>

      <div className="notices note">
        <p>Note</p>
        <div>
          - **auths**에서 **dockerhub.KubeKey.local**과 사용자 이름 및 비밀번호를 추가합니다.
          - **privateRegistry**에서 **dockerhub.KubeKey.local**을 추가합니다.</div></div>

     <article className="highlight">
      <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>
                <p>
                  <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">harbor</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;auths</span>: 
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"dockerhub.kubekey.local"</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</span>: <span style="color:#ae81ff">admin</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</span>: <span style="color:#ae81ff">Harbor12345</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">"dockerhub.kubekey.local"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;namespaceOverride</span>: <span style="color:#e6db74">"Super Kubenetesio"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                  <span style="color:#f92672">&nbsp;&nbsp;addons</span>: []
                </p>
            </code>
          </div>
      </pre>
    </article>

      <div className="notices note">
        <p>Note</p>
        <div>
          - In **auths**, enter **dockerhub.kubekey.local**, username (**admin**) and password (**Harbor12345**).
          - In **privateRegistry**, enter **dockerhub.kubekey.local**.
          - In **namespaceOverride**, enter **Super Kubenetesio**.
        </div>
     </div>

7)  다음 명령을 실행하여 Super Kubenetes 클러스터를 설치합니다.:

    <article className="highlight">
       <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>./kk create cluster -f config-sample1.yaml -a Super Kubenetes.tar.gz --with-packages</code>
          </div>
       </pre>
    </article>

    매개변수는 다음과 같이 설명됩니다.：

    - **config-sample.yaml**: air-gapped 환경에서 클러스터에 대한 구성 파일을 지정합니다.
    - **Super Kubenetes.tar.gz**: 소스 클러스터가 패키징되는 tarball 이미지를 지정합니다.
    - **--with-packages**: ISO 종속성을 설치하려는 경우 이 매개변수가 필요합니다.

8)  다음 명령을 실행하여 클러스터 상태를 확인합니다.:

     <article className="highlight">
        <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
              <code>$ kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
           </div>
        </pre>
     </article>

    After the installation is completed, the following information is displayed:

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
                <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.3:30880</a></span> 
                <span style="color:#ffffff">Account: admin</span> 
                <span style="color:#ffffff">Password: P@88w0rd</span> 
                <span></span> 
                <span style="color:#ffffff">NOTES：</span> 
                <span style="color:#ffffff"><span>&nbsp;1. After you log into the console, please check the</span></span> 
                <span style="color:#ffffff">&nbsp;monitoring status of service components in</span> 
                <span style="color:#ffffff">&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
                <span style="color:#ffffff">&nbsp;ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
                <span style="color:#ffffff">&nbsp;are up and running.</span> 
                <span style="color:#ffffff">&nbsp;2. Please change the default password after login.</span> 
                <span></span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
                <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022-02-28 23:30:06</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
              </p>
            </code>
          </div>
      </pre>
    </article>

9)  기본 계정 및 비밀번호 `admin/P@88w0rd`를 사용하여 `http://{IP}:30880`에서 Super Kubenetes 웹 콘솔에 액세스합니다.

    ![login](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/login.png)

    <div className="notices note">
     <p>Note</p>
     <div>
       콘솔에 액세스하려면 보안 그룹에서 포트 30880이 활성화되어 있는지 확인하십시오.
     </div>
    </div>
