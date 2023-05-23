---
title: 에어갭 설치
keywords: 'Kubernetes, Super Kubenetes, air-gapped, installation'
description: 'Explore the best practice of installing Super Kubenetes in an air-gapped environment.'
linkTitle: 'Air-gapped Installation'
weight: 4310
---

에어 갭 설치는 Docker 이미지를 호스팅하기 위해 로컬 레지스트리를 생성해야 한다는 점을 제외하고는 온라인 설치와 거의 동일합니다. 이 튜토리얼은 에어 갭 환경에서 쿠버네티스에 Super Kubenetes를 설치하는 방법을 보여줍니다.

아래 단계를 수행하기 전에 먼저 [사전 요구 사항](../../../installing-on-kubernetes/introduction/prerequisites/)을 확인하십시오.

## 1단계 : 개인 이미지 레지스트리 준비

Harbour 또는 기타 개인 이미지 레지스트리를 사용할 수 있습니다. 이 자습서에서는 [자체 서명된 인증서](https://docs.docker.com/registry/insecure/#use-self-signed-certificates)와 함께 Docker 레지스트리를 예로 사용합니다(자체 프라이빗 이미지 레지스트리가 있는 경우 이 단계를 건너뛸 수 있습니다).

### 자체 서명 인증서사용

1. 다음 명령을 실행하여 자체 인증서를 생성합니다.

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

2. 자신의 인증서를 생성할 때 `Common Name` 필드에 도메인 이름을 지정해야 합니다. 예를 들어, 이 예에서 필드는 `dockerhub.kubekey.local`로 설정됩니다.

   ![자체 서명 인증서](/dist/assets/docs/v3.3/installing-on-linux/introduction/air-gapped-installation/self-signed-cert.jpg)

### Docker 레지스트리 시작

다음 명령을 실행하여 Docker 레지스트리를 시작하십시오.

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
  <p>노트</p>
  <div>
    Docker는 이미지를 포함한 모든 Docker 관련 파일이 저장되는 기본 디렉토리로 `/var/lib/docker`를 사용합니다. 최소 100GB가 `/var/lib/docker` 및 `/mnt/registry`에 각각 마운트된 추가 스토리지 볼륨을 추가하는 것이 좋습니다. 자세한 내용은 [fdisk](https://www.computerhope.com/unix/fdisk.htm)명령어를 참고하세요.
  </div>
</div>

### 레지스트리 구성

1. `/etc/hosts`에 항목을 추가하여 아래와 같이 호스트 이름(예: 레지스트리 도메인 이름, 이 경우 `dockerhub.kubekey.local`을 컴퓨터의 개인 IP 주소에 매핑합니다.

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

2. 다음 명령을 실행하여 인증서를 지정된 디렉터리에 복사하고 Docker가 이를 신뢰하도록 합니다.

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
    <p>노트</p>
    <div>
      인증서의 경로는 도메인 이름과 관련이 있습니다. 경로를 복사할 때 위에 설정한 것과 다른 경우 실제 도메인 이름을 사용하십시오.
    </div>
  </div>

3. 개인 레지스트리가 효과적인지 확인하려면 먼저 이미지를 로컬 컴퓨터에 복사하고 `docker push` 및 `docker pull`을 사용하여 테스트할 수 있습니다.

## 2단계 : 설치 이미지 준비

에어갭 환경에 Super Kubenetes를 설치할 때 필요한 모든 이미지가 포함된 이미지 패키지를 미리 준비해야 합니다.

1. 음 명령을 통해 인터넷에 액세스할 수 있는 컴퓨터에서 이미지 목록 파일 `images-list.txt`를 다운로드합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/images-list.txt</a></code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>노트</p>
    <div>
      이 파일은 다른 모듈을 기반으로 `##+modulename` 아래에 이미지를 나열합니다. 동일한 규칙에 따라 이 파일에 자신의 이미지를 추가할 수 있습니다. 전체 파일을 보려면 [부록](#appendix)을 참고하십시오.
    </div>
  </div>

2. `offline-installation-tool.sh` 파일을 다운로드 합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/offline-installation-tool.sh</a></code>
        </div>
    </pre>
  </article>

3. `.sh` 파일을 실행 가능하게 만듭니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>chmod +x offline-installation-tool.sh</code>
        </div>
    </pre>
  </article>

4. `./offline-installation-tool.sh -h` 명령을 실행하여 스크립트 사용 방법을 확인할 수 있습니다.

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

5. `offline-installation-tool.sh`에서 이미지를 가져옵니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./offline-installation-tool.sh -s -l images-list.txt -d ./Super Kubenetes-images</code>
        </div>
    </pre>
  </article>
  
  <div className="notices note">
    <p>노트</p>
    <div>
      필요에 따라 이미지를 가져오도록 선택할 수 있습니다. 예를 들어, 이미 쿠버네티스 클러스터가 있으므로 `##k8s-images`에서 `images-list.text` 및 그 아래 관련 이미지를 삭제할 수 있습니다.
    </div>
  </div>

## 3단계 : 개인 레지스트리에 이미지 푸시

패키지된 이미지 파일을 로컬 시스템으로 전송하고 다음 명령을 실행하여 레지스트리에 푸시합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./offline-installation-tool.sh -l images-list.txt -d ./Super Kubenetes-images -r dockerhub.kubekey.local</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>노트</p>
  <div>
    도메인 이름은 명령에서 `dockerhub.kubekey.local`입니다. **own registry address**를 사용해야 합니다.
  </div>
</div>

## 4단계 : 배포 파일 다운로드

온라인 환경에서 기존 쿠버네티스 클러스터에 Super Kubenetes를 설치하는 것과 마찬가지로 `cluster-configuration.yaml`과 `Super Kubenetes-installer.yaml`도 먼저 다운로드해야 합니다.

1. 다음 명령을 실행하여 이 두 파일을 다운로드하고 설치를 위한 작업 상자 역할을 하는 컴퓨터로 전송합니다.

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

2. `cluster-configuration.yaml`을 편집하여 개인 이미지 레지스트리를 추가합니다. 예를 들어 `dockerhub.kubekey.local`은 이 튜토리얼에서 레지스트리 주소이고, 아래와 같이 `.spec.local_registry`의 값으로 사용합니다.

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
    <p>노트</p>
    <div>
      이 YAML 파일에서 플러그형 구성 요소를 활성화하여 Super Kubenetes의 더 많은 기능을 탐색할 수 있습니다. 자세한 내용은 [플러그식 구성 요소 활성화](../../../pluggable-components/)를 참고하십시오.
    </div>
  </div>

3. 편집이 끝나면 `cluster-configuration.yaml`을 저장합니다. 다음 명령을 사용하여 `ks-installer`를 **own registry address**로 바꿉니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sed -i <span style="color:#e6db74">"s#^\s*image: Super Kubenetes.*/ks-installer:.*#        image: dockerhub.kubekey.local/Super Kubenetes/ks-installer:v3.0.0#"</span> Super Kubenetes-installer.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices warning">
    <p>주의</p>
    <div>
      `dockerhub.kubekey.local`은 명령의 레지스트리 주소입니다. 자신의 레지스트리 주소를 사용해야 합니다.
    </div>
  </div>

## 5단계 : 설치 시작

위의 모든 단계가 완료되었는지 확인한 후 다음 명령을 실행합니다.

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

## 6단계 : 설치 확인

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

이제 기본 계정 및 비밀번호 `admin/P@88w0rd`로 `http://{IP}:30880`을 통해 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

<div className="notices note">
  <p>노트</p>
  <div>
    콘솔에 액세스하려면 보안 그룹에서 포트 30880이 열려 있는지 확인하십시오.
  </div>
</div>

![Super Kubenetes-login](https://ap3.qingstor.com/Super Kubenetes-website/docs/login.png)

## 부록

### Super Kubenetes 3.3.0의 이미지 목록

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
              <span>#</span><span>#</span><span>k8s-images</span> 
              Super Kubenetes/kube-apiserver:v1.23.7
              Super Kubenetes/kube-controller-manager:v1.23.7
              Super Kubenetes/kube-proxy:v1.23.7
              Super Kubenetes/kube-scheduler:v1.23.7
              Super Kubenetes/kube-apiserver:v1.24.1
              Super Kubenetes/kube-controller-manager:v1.24.1
              Super Kubenetes/kube-proxy:v1.24.1
              Super Kubenetes/kube-scheduler:v1.24.1
              Super Kubenetes/kube-apiserver:v1.22.10
              Super Kubenetes/kube-controller-manager:v1.22.10
              Super Kubenetes/kube-proxy:v1.22.10
              Super Kubenetes/kube-scheduler:v1.22.10
              Super Kubenetes/kube-apiserver:v1.21.13
              Super Kubenetes/kube-controller-manager:v1.21.13
              Super Kubenetes/kube-proxy:v1.21.13
              Super Kubenetes/kube-scheduler:v1.21.13
              Super Kubenetes/pause:3.7
              Super Kubenetes/pause:3.6
              Super Kubenetes/pause:3.5
              Super Kubenetes/pause:3.4.1
              coredns/coredns:1.8.0
              coredns/coredns:1.8.6
              calico/cni:v3.20.0
              calico/kube-controllers:v3.20.0
              calico/node:v3.20.0
              calico/pod2daemon-flexvol:v3.20.0
              calico/typha:v3.20.0
              Super Kubenetes/flannel:v0.12.0
              openebs/provisioner-localpv:2.10.1
              openebs/linux-utils:2.10.0
              library/haproxy:2.3
              Super Kubenetes/nfs-subdir-external-provisioner:v4.0.2
              Super Kubenetes/k8s-dns-node-cache:1.15.12
              <span>#</span><span>#</span><span>Super Kubenetes-images</span> 
              Super Kubenetes/ks-installer:v3.3.0
              Super Kubenetes/ks-apiserver:v3.3.0
              Super Kubenetes/ks-console:v3.3.0
              Super Kubenetes/ks-controller-manager:v3.3.0
              Super Kubenetes/kubectl:v1.22.0
              Super Kubenetes/kubectl:v1.21.0
              Super Kubenetes/kubectl:v1.20.0
              Super Kubenetes/kubefed:v0.8.1
              Super Kubenetes/tower:v0.2.0
              minio/minio:RELEASE.2019-08-07T01-59-21Z
              minio/mc:RELEASE.2019-08-07T23-14-43Z
              csiplugin/snapshot-controller:v4.0.0
              Super Kubenetes/nginx-ingress-controller:v1.1.0
              mirrorgooglecontainers/defaultbackend-amd64:1.4
              <span>Super Kubenetes/metrics-server:v0.4.2</span> 
              <span>redis:5.0.14-alpine</span> 
              <span>haproxy:2.0.25-alpine</span> 
              <span>alpine:3.14</span> 
              <span>osixia/openldap:1.3.0</span> 
              <span>Super Kubenetes/netshoot:v1.0</span> 
              <span>#</span><span>#</span><span>kubeedge-images</span> 
              kubeedge/cloudcore:v1.9.2
              kubeedge/iptables-manager:v1.9.2
              Super Kubenetes/edgeservice:v0.2.0
              <span>#</span><span>#</span><span>gatekeeper-images</span> 
              openpolicyagent/gatekeeper:v3.5.2
              <span>#</span><span>#</span><span>openpitrix-images</span> 
              Super Kubenetes/openpitrix-jobs:v3.2.1
              <span>#</span><span>#</span><span>Super Kubenetes-devops-images</span> 
              Super Kubenetes/devops-apiserver:v3.3.0
              Super Kubenetes/devops-controller:v3.3.0
              Super Kubenetes/devops-tools:v3.3.0
              Super Kubenetes/ks-jenkins:v3.3.0-2.319.1
              jenkins/inbound-agent:4.10-2
              Super Kubenetes/builder-base:v3.2.2
              Super Kubenetes/builder-nodejs:v3.2.0
              Super Kubenetes/builder-maven:v3.2.0
              Super Kubenetes/builder-maven:v3.2.1-jdk11
              Super Kubenetes/builder-python:v3.2.0
              Super Kubenetes/builder-go:v3.2.0
              Super Kubenetes/builder-go:v3.2.2-1.16
              Super Kubenetes/builder-go:v3.2.2-1.17
              Super Kubenetes/builder-go:v3.2.2-1.18
              Super Kubenetes/builder-base:v3.2.2-podman
              Super Kubenetes/builder-nodejs:v3.2.0-podman
              Super Kubenetes/builder-maven:v3.2.0-podman
              Super Kubenetes/builder-maven:v3.2.1-jdk11-podman
              Super Kubenetes/builder-python:v3.2.0-podman
              Super Kubenetes/builder-go:v3.2.0-podman
              Super Kubenetes/builder-go:v3.2.2-1.16-podman
              Super Kubenetes/builder-go:v3.2.2-1.17-podman
              Super Kubenetes/builder-go:v3.2.2-1.18-podman
              Super Kubenetes/s2ioperator:v3.2.1
              Super Kubenetes/s2irun:v3.2.0
              Super Kubenetes/s2i-binary:v3.2.0
              Super Kubenetes/tomcat85-java11-centos7:v3.2.0
              Super Kubenetes/tomcat85-java11-runtime:v3.2.0
              Super Kubenetes/tomcat85-java8-centos7:v3.2.0
              Super Kubenetes/tomcat85-java8-runtime:v3.2.0
              Super Kubenetes/java-11-centos7:v3.2.0
              Super Kubenetes/java-8-centos7:v3.2.0
              Super Kubenetes/java-8-runtime:v3.2.0
              Super Kubenetes/java-11-runtime:v3.2.0
              Super Kubenetes/nodejs-8-centos7:v3.2.0
              Super Kubenetes/nodejs-6-centos7:v3.2.0
              Super Kubenetes/nodejs-4-centos7:v3.2.0
              Super Kubenetes/python-36-centos7:v3.2.0
              Super Kubenetes/python-35-centos7:v3.2.0
              Super Kubenetes/python-34-centos7:v3.2.0
              Super Kubenetes/python-27-centos7:v3.2.0
              quay.io/argoproj/argocd:v2.3.3
              quay.io/argoproj/argocd-applicationset:v0.4.1
              <span>ghcr.io/dexidp/dex:v2.30.2</span> 
              <span>redis:6.2.6-alpine</span> 
              <span>#</span><span>#</span><span>Super Kubenetes-monitoring-images</span> 
              jimmidyson/configmap-reload:v0.5.0
              prom/prometheus:v2.34.0
              Super Kubenetes/prometheus-config-reloader:v0.55.1
              Super Kubenetes/prometheus-operator:v0.55.1
              Super Kubenetes/kube-rbac-proxy:v0.11.0
              Super Kubenetes/kube-state-metrics:v2.3.0
              prom/node-exporter:v1.3.1
              prom/alertmanager:v0.23.0
              thanosio/thanos:v0.25.2
              grafana/grafana:8.3.3
              Super Kubenetes/kube-rbac-proxy:v0.8.0
              Super Kubenetes/notification-manager-operator:v1.4.0
              Super Kubenetes/notification-manager:v1.4.0
              Super Kubenetes/notification-tenant-sidecar:v3.2.0
              <span>#</span><span>#</span><span>Super Kubenetes-logging-images</span> 
              Super Kubenetes/elasticsearch-curator:v5.7.6
              Super Kubenetes/elasticsearch-oss:6.8.22
              <span>Super Kubenetes/fluentbit-operator:v0.13.0</span> 
              <span>docker:19.03</span> 
              <span>Super Kubenetes/fluent-bit:v1.8.11</span> 
              <span>Super Kubenetes/log-sidecar-injector:1.1</span> 
              <span>elastic/filebeat:6.7.0</span> 
              <span>Super Kubenetes/kube-events-operator:v0.4.0</span> 
              <span>Super Kubenetes/kube-events-exporter:v0.4.0</span> 
              <span>Super Kubenetes/kube-events-ruler:v0.4.0</span> 
              <span>Super Kubenetes/kube-auditing-operator:v0.2.0</span> 
              <span>Super Kubenetes/kube-auditing-webhook:v0.2.0</span> 
              <span>#</span><span>#</span><span>istio-images</span> 
              istio/pilot:1.11.1
              istio/proxyv2:1.11.1
              jaegertracing/jaeger-operator:1.27
              jaegertracing/jaeger-agent:1.27
              jaegertracing/jaeger-collector:1.27
              jaegertracing/jaeger-query:1.27
              jaegertracing/jaeger-es-index-cleaner:1.27
              Super Kubenetes/kiali-operator:v1.38.1
              Super Kubenetes/kiali:v1.38
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
              <span>Super Kubenetes/examples-bookinfo-productpage-v1:1.16.2</span> 
              <span>Super Kubenetes/examples-bookinfo-reviews-v1:1.16.2</span> 
              <span>Super Kubenetes/examples-bookinfo-reviews-v2:1.16.2</span> 
              <span>Super Kubenetes/examples-bookinfo-details-v1:1.16.2</span> 
              <span>Super Kubenetes/examples-bookinfo-ratings-v1:1.16.3</span> 
              <span>#</span><span>#</span><span>weave-scope-images</span> 
              <span>weaveworks/scope:1.13.0</span></p></code></div></pre>
</article>
