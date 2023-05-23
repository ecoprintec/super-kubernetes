---
title: "Air-gapped Installation on Kubernetes"
keywords: 'Kubernetes, Super Kubenetes, air-gapped, installation'
description: 'Explore the best practice of installing Super Kubenetes in an air-gapped environment.'
linkTitle: "Air-gapped Installation"
weight: 4310
---

The air-gapped installation is almost the same as the online installation except that you must create a local registry to host Docker images. This tutorial demonstrates how to install Super Kubenetes on Kubernetes in an air-gapped environment.

Before you follow the steps below, read [Prerequisites](../../../installing-on-kubernetes/introduction/prerequisites/) first.

## Step 1: Prepare a Private Image Registry

You can use Harbor or any other private image registries. This tutorial uses Docker registry as an example with [self-signed certificates](https://docs.docker.com/registry/insecure/#use-self-signed-certificates) (If you have your own private image registry, you can skip this step).

### Use self-signed certificates

1. Generate your own certificate by executing the following commands:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>mkdir -p certs</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              openssl req <span style="color:#ae81ff">\</span> 
              -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key <span style="color:#ae81ff">\</span> 
              -x509 -days <span style="color:#ae81ff">36500</span> -out certs/domain.crt</p>
          </code>
        </div>
    </pre>
  </article>

2. Make sure you specify a domain name in the field `Common Name` when you are generating your own certificate. For instance, the field is set to `dockerhub.kubekey.local` in this example. 

   ![self-signed-cert](/dist/assets/docs/v3.3/installing-on-linux/introduction/air-gapped-installation/self-signed-cert.jpg)

### Start the Docker registry

Run the following commands to start the Docker registry:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            docker run -d \
              --restart=always \
              --name registry \
              -v "$(pwd)"/certs:/certs \
              -v /mnt/registry:/var/lib/registry \
              -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
              -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
              -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
              -p 443:443 \
              registry:2</p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Docker uses `/var/lib/docker` as the default directory where all Docker related files, including images, are stored. It is recommended you add additional storage volumes with at least **100G** mounted to `/var/lib/docker` and `/mnt/registry` respectively. See [fdisk](https://www.computerhope.com/unix/fdisk.htm) command for reference.
  </div>
</div>

### Configure the registry

1. Add an entry to `/etc/hosts` to map the hostname (i.e. the registry domain name; in this case, it is `dockerhub.kubekey.local`) to the private IP address of your machine as below.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;docker registry</span> 
              192.168.0.2 dockerhub.kubekey.local</p></code></div>
    </pre>
  </article>

2. Execute the following commands to copy the certificate to a specified directory and make Docker trust it.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>mkdir -p  /etc/docker/certs.d/dockerhub.kubekey.local</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>cp certs/domain.crt  /etc/docker/certs.d/dockerhub.kubekey.local/ca.crt</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      The path of the certificate is related to the domain name. When you copy the path, use your actual domain name if it is different from the one set above.
    </div>
  </div>

3. To verify whether the private registry is effective, you can copy an image to your local machine first, and use `docker push` and `docker pull` to test it.

## Step 2: Prepare Installation Images

As you install Super Kubenetes in an air-gapped environment, you need to prepare an image package containing all the necessary images in advance.

1. Download the image list file `images-list.txt` from a machine that has access to the Internet through the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/images-list.txt</a></code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      This file lists images under `##+modulename` based on different modules. You can add your own images to this file following the same rule. To view the complete file, see [Appendix](#appendix).
    </div>
  </div>

2. Download `offline-installation-tool.sh`. 

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/offline-installation-tool.sh</a></code>
        </div>
    </pre>
  </article>

3. Make the `.sh` file executable.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>chmod +x offline-installation-tool.sh</code>
        </div>
    </pre>
  </article>

4. You can execute the command `./offline-installation-tool.sh -h` to see how to use the script:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              root@master:/home/ubuntu# ./offline-installation-tool.sh -h
              Usage:
              
                ./offline-installation-tool.sh <span style="color:#f92672">[</span>-l IMAGES-LIST<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-d IMAGES-DIR<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-r PRIVATE-REGISTRY<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-v KUBERNETES-VERSION <span style="color:#f92672">]</span> 
              
              Description:
                -b                     : save kubernetes<span style="color:#e6db74">' binaries.</span> 
                <span style="color:#e6db74">  -d IMAGES-DIR          : the dir of files (tar.gz) which generated by <span>`</span>docker save<span>`</span>. default: ./Super Kubenetes-images</span> 
                <span style="color:#e6db74">  -l IMAGES-LIST         : text file with list of images.</span> 
                <span style="color:#e6db74">  -r PRIVATE-REGISTRY    : target private registry:port.</span> 
                <span style="color:#e6db74">  -s                     : save model will be applied. Pull the images in the IMAGES-LIST and save images as a tar.gz file.</span> 
                <span style="color:#e6db74">  -v KUBERNETES-VERSION  : download kubernetes'</span> binaries. default: v1.22.10
                -h                     : usage message</p>
          </code>
        </div>
    </pre>
  </article>

5. Pull images in `offline-installation-tool.sh`.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./offline-installation-tool.sh -s -l images-list.txt -d ./Super Kubenetes-images</code>
        </div>
    </pre>
  </article>
  
  <div className="notices note">
    <p>Note</p>
    <div>
      You can choose to pull images as needed. For example, you can delete `##k8s-images` and related images under it in `images-list.text` as you already have a Kubernetes cluster.
    </div>
  </div>

## Step 3: Push Images to Your Private Registry

Transfer your packaged image file to your local machine and execute the following command to push it to the registry.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./offline-installation-tool.sh -l images-list.txt -d ./Super Kubenetes-images -r dockerhub.kubekey.local</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    The domain name is `dockerhub.kubekey.local` in the command. Make sure you use your **own registry address**.
  </div>
</div>

## Step 4: Download Deployment Files

Similar to installing Super Kubenetes on an existing Kubernetes cluster in an online environment, you also need to download `cluster-configuration.yaml` and `Super Kubenetes-installer.yaml` first.

1. Execute the following commands to download these two files and transfer them to your machine that serves as the taskbox for installation.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a>
              curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a></p>
          </code>
        </div>
    </pre>
  </article>

2. Edit `cluster-configuration.yaml` to add your private image registry. For example, `dockerhub.kubekey.local` is the registry address in this tutorial, then use it as the value of `.spec.local_registry` as below:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;persistence</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageClass</span>: <span style="color:#e6db74">""</span> 
                <span style="color:#f92672">&nbsp;&nbsp;authentication</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jwtSecret</span>: <span style="color:#e6db74">""</span> 
                <span style="color:#f92672">&nbsp;&nbsp;local_registry</span>: <span style="color:#ae81ff">dockerhub.kubekey.local</span> <span style="color:#75715e">&nbsp;<span>#</span> Add this line manually; make sure you use your own registry address.</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can enable pluggable components in this YAML file to explore more features of Super Kubenetes. Refer to [Enable Pluggle Components](../../../pluggable-components/) for more details.
    </div>
  </div>

3. Save `cluster-configuration.yaml` after you finish editing. Replace `ks-installer` with your **own registry address** with the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sed -i <span style="color:#e6db74">"s#^\s*image: Super Kubenetes.*/ks-installer:.*#        image: dockerhub.kubekey.local/Super Kubenetes/ks-installer:v3.0.0#"</span> Super Kubenetes-installer.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices warning">
    <p>Warning</p>
    <div>
      `dockerhub.kubekey.local` is the registry address in the command. Make sure you use your own registry address.
    </div>
  </div>


## Step 5: Start Installation

Execute the following commands after you make sure that all steps above are completed.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            kubectl apply -f Super Kubenetes-installer.yaml
            kubectl apply -f cluster-configuration.yaml</p>
        </code>
      </div>
  </pre>
</article>

## Step 6: Verify Installation

When the installation finishes, you can see the content as follows:

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
            <span style="color:#ffffff">&nbsp;&nbsp;1. After logging into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please modify the default password after login.</span> 
            <span></span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

Now, you will be able to access the web console of Super Kubenetes through `http://{IP}:30880` with the default account and password `admin/P@88w0rd`.

  <div className="notices note">
    <p>Note</p>
    <div>
       To access the console, make sure port 30880 is opened in your security group.</div></div>

![Super Kubenetes-login](https://ap3.qingstor.com/Super Kubenetes-website/docs/login.png)

## Appendix

### Image list of Super Kubenetes 3.3.0

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
              <span>#</span><span>#</span><span>k8s-images</span> 
              kubesphere/kube-apiserver:v1.23.7
              kubesphere/kube-controller-manager:v1.23.7
              kubesphere/kube-proxy:v1.23.7
              kubesphere/kube-scheduler:v1.23.7
              kubesphere/kube-apiserver:v1.24.1
              kubesphere/kube-controller-manager:v1.24.1
              kubesphere/kube-proxy:v1.24.1
              kubesphere/kube-scheduler:v1.24.1
              kubesphere/kube-apiserver:v1.22.10
              kubesphere/kube-controller-manager:v1.22.10
              kubesphere/kube-proxy:v1.22.10
              kubesphere/kube-scheduler:v1.22.10
              kubesphere/kube-apiserver:v1.21.13
              kubesphere/kube-controller-manager:v1.21.13
              kubesphere/kube-proxy:v1.21.13
              kubesphere/kube-scheduler:v1.21.13
              kubesphere/pause:3.7
              kubesphere/pause:3.6
              kubesphere/pause:3.5
              kubesphere/pause:3.4.1
              coredns/coredns:1.8.0
              coredns/coredns:1.8.6
              calico/cni:v3.20.0
              calico/kube-controllers:v3.20.0
              calico/node:v3.20.0
              calico/pod2daemon-flexvol:v3.20.0
              calico/typha:v3.20.0
              kubesphere/flannel:v0.12.0
              openebs/provisioner-localpv:2.10.1
              openebs/linux-utils:2.10.0
              library/haproxy:2.3
              kubesphere/nfs-subdir-external-provisioner:v4.0.2
              kubesphere/k8s-dns-node-cache:1.15.12
              <span>#</span><span>#</span><span>kubesphere-images</span> 
              kubesphere/ks-installer:v3.3.0
              kubesphere/ks-apiserver:v3.3.0
              kubesphere/ks-console:v3.3.0
              kubesphere/ks-controller-manager:v3.3.0
              kubesphere/kubectl:v1.22.0
              kubesphere/kubectl:v1.21.0
              kubesphere/kubectl:v1.20.0
              kubesphere/kubefed:v0.8.1
              kubesphere/tower:v0.2.0
              minio/minio:RELEASE.2019-08-07T01-59-21Z
              minio/mc:RELEASE.2019-08-07T23-14-43Z
              csiplugin/snapshot-controller:v4.0.0
              kubesphere/nginx-ingress-controller:v1.1.0
              mirrorgooglecontainers/defaultbackend-amd64:1.4
              <span>kubesphere/metrics-server:v0.4.2</span> 
              <span>redis:5.0.14-alpine</span> 
              <span>haproxy:2.0.25-alpine</span> 
              <span>alpine:3.14</span> 
              <span>osixia/openldap:1.3.0</span> 
              <span>kubesphere/netshoot:v1.0</span> 
              <span>#</span><span>#</span><span>kubeedge-images</span> 
              kubeedge/cloudcore:v1.9.2
              kubeedge/iptables-manager:v1.9.2
              kubesphere/edgeservice:v0.2.0
              <span>#</span><span>#</span><span>gatekeeper-images</span> 
              openpolicyagent/gatekeeper:v3.5.2
              <span>#</span><span>#</span><span>openpitrix-images</span> 
              kubesphere/openpitrix-jobs:v3.2.1
              <span>#</span><span>#</span><span>kubesphere-devops-images</span> 
              kubesphere/devops-apiserver:v3.3.0
              kubesphere/devops-controller:v3.3.0
              kubesphere/devops-tools:v3.3.0
              kubesphere/ks-jenkins:v3.3.0-2.319.1
              jenkins/inbound-agent:4.10-2
              kubesphere/builder-base:v3.2.2
              kubesphere/builder-nodejs:v3.2.0
              kubesphere/builder-maven:v3.2.0
              kubesphere/builder-maven:v3.2.1-jdk11
              kubesphere/builder-python:v3.2.0
              kubesphere/builder-go:v3.2.0
              kubesphere/builder-go:v3.2.2-1.16
              kubesphere/builder-go:v3.2.2-1.17
              kubesphere/builder-go:v3.2.2-1.18
              kubesphere/builder-base:v3.2.2-podman
              kubesphere/builder-nodejs:v3.2.0-podman
              kubesphere/builder-maven:v3.2.0-podman
              kubesphere/builder-maven:v3.2.1-jdk11-podman
              kubesphere/builder-python:v3.2.0-podman
              kubesphere/builder-go:v3.2.0-podman
              kubesphere/builder-go:v3.2.2-1.16-podman
              kubesphere/builder-go:v3.2.2-1.17-podman
              kubesphere/builder-go:v3.2.2-1.18-podman
              kubesphere/s2ioperator:v3.2.1
              kubesphere/s2irun:v3.2.0
              kubesphere/s2i-binary:v3.2.0
              kubesphere/tomcat85-java11-centos7:v3.2.0
              kubesphere/tomcat85-java11-runtime:v3.2.0
              kubesphere/tomcat85-java8-centos7:v3.2.0
              kubesphere/tomcat85-java8-runtime:v3.2.0
              kubesphere/java-11-centos7:v3.2.0
              kubesphere/java-8-centos7:v3.2.0
              kubesphere/java-8-runtime:v3.2.0
              kubesphere/java-11-runtime:v3.2.0
              kubesphere/nodejs-8-centos7:v3.2.0
              kubesphere/nodejs-6-centos7:v3.2.0
              kubesphere/nodejs-4-centos7:v3.2.0
              kubesphere/python-36-centos7:v3.2.0
              kubesphere/python-35-centos7:v3.2.0
              kubesphere/python-34-centos7:v3.2.0
              kubesphere/python-27-centos7:v3.2.0
              quay.io/argoproj/argocd:v2.3.3
              quay.io/argoproj/argocd-applicationset:v0.4.1
              <span>ghcr.io/dexidp/dex:v2.30.2</span> 
              <span>redis:6.2.6-alpine</span> 
              <span>#</span><span>#</span><span>kubesphere-monitoring-images</span> 
              jimmidyson/configmap-reload:v0.5.0
              prom/prometheus:v2.34.0
              kubesphere/prometheus-config-reloader:v0.55.1
              kubesphere/prometheus-operator:v0.55.1
              kubesphere/kube-rbac-proxy:v0.11.0
              kubesphere/kube-state-metrics:v2.3.0
              prom/node-exporter:v1.3.1
              prom/alertmanager:v0.23.0
              thanosio/thanos:v0.25.2
              grafana/grafana:8.3.3
              kubesphere/kube-rbac-proxy:v0.8.0
              kubesphere/notification-manager-operator:v1.4.0
              kubesphere/notification-manager:v1.4.0
              kubesphere/notification-tenant-sidecar:v3.2.0
              <span>#</span><span>#</span><span>kubesphere-logging-images</span> 
              kubesphere/elasticsearch-curator:v5.7.6
              kubesphere/elasticsearch-oss:6.8.22
              <span>kubesphere/fluentbit-operator:v0.13.0</span> 
              <span>docker:19.03</span> 
              <span>kubesphere/fluent-bit:v1.8.11</span> 
              <span>kubesphere/log-sidecar-injector:1.1</span> 
              <span>elastic/filebeat:6.7.0</span> 
              <span>kubesphere/kube-events-operator:v0.4.0</span> 
              <span>kubesphere/kube-events-exporter:v0.4.0</span> 
              <span>kubesphere/kube-events-ruler:v0.4.0</span> 
              <span>kubesphere/kube-auditing-operator:v0.2.0</span> 
              <span>kubesphere/kube-auditing-webhook:v0.2.0</span> 
              <span>#</span><span>#</span><span>istio-images</span> 
              istio/pilot:1.11.1
              istio/proxyv2:1.11.1
              jaegertracing/jaeger-operator:1.27
              jaegertracing/jaeger-agent:1.27
              jaegertracing/jaeger-collector:1.27
              jaegertracing/jaeger-query:1.27
              jaegertracing/jaeger-es-index-cleaner:1.27
              kubesphere/kiali-operator:v1.38.1
              kubesphere/kiali:v1.38
              <span>#</span><span>#</span><span>example-images</span> 
              <span>busybox:1.31.1</span> 
              <span>nginx:1.14-alpine</span> 
              <span>joosthofman/wget:1.0</span> 
              <span>nginxdemos/hello:plain-text</span> 
              <span>wordpress:4.8-apache</span> 
              <span>mirrorgooglecontainers/hpa-example:latest</span> 
              <span>java:openjdk-8-jre-alpine</span> 
              <span>fluent/fluentd:v1.4.2-2.0</span> 
              <span>perl:latest</span> 
              <span>kubesphere/examples-bookinfo-productpage-v1:1.16.2</span> 
              <span>kubesphere/examples-bookinfo-reviews-v1:1.16.2</span> 
              <span>kubesphere/examples-bookinfo-reviews-v2:1.16.2</span> 
              <span>kubesphere/examples-bookinfo-details-v1:1.16.2</span> 
              <span>kubesphere/examples-bookinfo-ratings-v1:1.16.3</span> 
              <span>#</span><span>#</span><span>weave-scope-images</span> 
              <span>weaveworks/scope:1.13.0</span></p></code></div></pre>
</article>

