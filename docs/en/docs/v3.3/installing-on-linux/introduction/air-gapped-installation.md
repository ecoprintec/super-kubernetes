---
title: "Air-gapped Installation"
keywords: 'Air-gapped, installation, Super Kubenetes'
description: 'Understand how to install Super Kubenetes and Kubernetes in the air-gapped environment.'
linkTitle: "Air-gapped Installation"
weight: 3140
---

KubeKey is an open-source, lightweight tool for deploying Kubernetes clusters. It allows you to install Kubernetes/K3s only, both Kubernetes/K3s and Super Kubenetes, and other cloud-native plugins in a flexible, fast, and convenient way. Additionally, it is an effective tool for scaling and upgrading clusters.

In KubeKey v2.1.0, we bring in concepts of manifest and artifact, which provides a solution for air-gapped installation of Kubernetes clusters. A manifest file describes information of the current Kubernetes cluster and defines content in an artifact. Previously, users had to prepare deployment tools, image (.tar) file, and other binaries as the Kubernetes version and image to deploy are different. Now, with KubeKey, air-gapped installation can never be so easy. You simply use a manifest file to define what you need for your cluster in air-gapped environments, and then export the artifact file to quickly and easily deploy image registries and Kubernetes cluster.

## Prerequisites

|Host IP| Host Name | Usage      |
| ---------------- | ---- | ---------------- |
|192.168.0.2 | node1    | Online host for packaging the source cluster with Kubernetes v1.22.10 and Super Kubenetes v3.3.0 installed |
|192.168.0.3 | node2    | Control plane node of the air-gapped environment |
|192.168.0.4 | node3    | Image registry node of the air-gapped environment |

## Preparations

1. Run the following commands to download KubeKey v2.2.2.

  <main className="code-tabs">
    <ul className="nav nav-tabs">
      <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
      <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
    </ul>
    <div className="tab-content">
      <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
        <p>Download KubeKey from its <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release Page</a> or run the following command:</p>
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
        <p>Run the following command first to make sure you download KubeKey from the correct zone.</p>
        <article className="highlight">
          <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
              <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
            </div>
          </pre>
        </article>
        <p>Run the following command to download KubeKey:</p>
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

2. In the source cluster, use KubeKey to create a manifest. The following two methods are supported:

   - (Recommended) In the created cluster, run the following command to create a manifest file:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create manifest</code>
         </div>
      </pre>
   </article>

   - Create and compile the manifest file manually according to the template. For more information, see [ manifest-example ](https://github.com/Super Kubenetes/kubekey/blob/master/docs/manifest-example.md).

3. Run the following command to modify the manifest configurations in the source cluster.
   
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
    - If the artifact file to export contains ISO dependencies, such as conntarck and chrony, set the IP address for downloading the ISO dependencies in **.repostiory.iso.url** of **operationSystem**. Alternatively, you can download the ISO package in advance and fill in the local path in **localPath** and delete the `url` configuration item.
   
    - You need to enable **harbor** and **docker-compose** configuration items, which will be used when you use KubeKey to build a Harbor registry for pushing images.
   
    - By default, the list of images in the created manifest is obtained from **docker.io**.
   
    - You can customize the **manifest-sample.yaml** file to export the desired artifact file.

    - You can download the ISO files at https://github.com/Super Kubenetes/kubekey/releases/tag/v2.2.2.
  </div>
</div>

   
4. Export the artifact from the source cluster.

  <main className="code-tabs">
    <ul className="nav nav-tabs">
      <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
      <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
    </ul>
    <div className="tab-content">
      <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
        <p>Run the following command directly::</p>
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
        <p>Run the following commands:</p>
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
      An artifact is a .tgz package containing the image package (.tar) and associated binaries exported from the specified manifest file. You can specify an artifact in the KubeKey commands for initializing the image registry, creating clusters, adding nodes, and upgrading clusters, and then KubeKey will automatically unpack the artifact and use the unpacked file when running the command.

      - Make sure the network connection is working.

      - KubeKey will resolve image names in the image list. If the image registry requires authentication, you can configure it in **.registry.auths** in the manifest file.
    </div>
  </div>

## Install Clusters in the Air-gapped Environment

1. Copy the downloaded KubeKey and artifact to nodes in the air-gapped environment using a USB device.

2. Run the following command to create a configuration file for the air-gapped cluster:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create config --with-Super Kubenetes v3.3.0 --with-kubernetes v1.22.10 -f config-sample.yaml</code>
         </div>
      </pre>
   </article>

3. Run the following command to modify the configuration file:

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
      - Modify the node information according to the actual configuration of the air-gapped environment.
      - You must specify the node where the `registry` to deploy (for KubeKey deployment of self-built Harbor registries).
      - In `registry`, the value of `type` must be specified as that of `harbor`. Otherwise, the docker registry is installed by default.
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


4. Run the following command to install an image registry:

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
      The parameters in the command are explained as follows:

      - **config-sample.yaml**: Specifies the configuration file of the cluster in the air-gapped environment.

      - **Super Kubenetes.tar.gz**: Specifies the image package of the source cluster.
    </div>
  </div>

5. Create a Harbor project.
   
<div className="notices note">
  <p>Note</p>
  <div>
    As Harbor adopts the Role-based Access Control (RBAC) mechanism, which means that only specified users can perform certain operations. Therefore, you must create a project before pushing images to Harbor. Harbor supports two types of projects:

    - **Public**: All users can pull images from the project.

    - **Private**: Only project members can pull images from the project.

    The username and password for logging in to Harbor is **admin** and **Harbor12345** by default. The installation file of Harbor is located in **/opt/harbor**, where you can perform O&M of Harbor.
  </div>
</div>

   Method 1: Run the following commands to create a Harbor project.

   a. Run the following command to download the specified script to initialize the Harbor registry:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>curl -O <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/Super Kubenetes/ks-installer/master/scripts/create_project_harbor.sh</a></code>
         </div>
      </pre>
   </article>

   b. Run the following command to modify the script configuration file:

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
      - Change the value of **url** to **https://dockerhub.kubekey.local**.

      - The project name of the registry must be the same as that of the image list.

      - Add **-k** at the end of the **curl** command.
    </div>
  </div>

   c. Run the following commands to create a Harbor project:
  
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

   Method 2: Log in to Harbor and create a project. Set the project to **Public**, so that any user can pull images from this project. For more information, please refer to [Create Projects]( https://goharbor.io/docs/1.10/working-with-projects/create-projects/).
   
   ![harbor-login](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-login.jpg)
   
6. Run the following command again to modify the cluster configuration file：

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
      - In **auths**, add **dockerhub.kubekey.local** and the username and password.
      - In **privateRegistry**, add **dockerhub.kubekey.local**.</div></div>

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

7. Run the following command to install a Super Kubenetes cluster:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create cluster -f config-sample1.yaml -a Super Kubenetes.tar.gz --with-packages</code>
         </div>
      </pre>
   </article> 

   The parameters are explained as follows：

   - **config-sample.yaml**: Specifies the configuration file for the cluster in the air-gapped environment.
   - **Super Kubenetes.tar.gz**: Specifies the  tarball image from which the source cluster is packaged.
   - **--with-packages**: This parameter is required if you want to install the ISO dependencies.

8. Run the following command to view the cluster status:

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
              <span style="color:#ffffff">&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
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

9.  Access Super Kubenetes's web console at `http://{IP}:30880` using the default account and password `admin/P@88w0rd`.

![login](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/login.png)

<div className="notices note">
  <p>Note</p>
  <div>
    To access the console, make sure that port 30880 is enabled in your security group.
  </div>
</div>