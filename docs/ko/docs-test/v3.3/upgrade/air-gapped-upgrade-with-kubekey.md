---
title: KubeKey를 이용한 에어갭 업그레이드
keywords: 'Air-Gapped, kubernetes, upgrade, Super Kubenetes, 3.3.0'
description: 'Use the offline package to upgrade Kubernetes and Super Kubenetes.'
linkTitle: 'Air-Gapped Upgrade with KubeKey'
weight: 7400
---

KubeKey를 사용한 Air-Gapped 업그레이드는 [KubeKey](../../installing-on-linux/introduction/kubekey/)에서 Super Kubenetes와 쿠버네티스를 모두 설치한 사용자에게 권장됩니다. 쿠버네티스 클러스터가 자체 또는 클라우드 공급자에 의해 프로비저닝된 경우 [ks-installer를 사용한 Air-gapped 업그레이드](../air-gapped-upgrade-with-ks-installer/)를 참조하십시오.

## 사전 준비

- v3를 실행하는 Super Kubenetes 클러스터가 있어야 합니다. 2.x. Super Kubenetes 버전이 v3.1.x 이하인 경우 먼저 v3.2.x로 업그레이드하세요.
- 쿠버네티스 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)여야 합니다.
- [ 3.3.0 릴리스 노트](../../../v3.3/release/release-v330/)를 주의 깊게 읽으십시오.
- 중요한 컴포넌트는 미리 백업하십시오.
- Docker 레지스트리. Harbor 또는 기타 Docker 레지스트리가 있어야 합니다.
- 모든 노드가 Docker 레지스트리에서 이미지를 푸시 및 풀할 수 있는지 확인하십시오.

## Super Kubenetes 및 쿠버네티스 업그레이드

단일 노드 클러스터(올인원)와 멀티 노드 클러스터의 업그레이드 단계는 서로 다릅니다.

<div className="notices info">
  <p>Info</p>
  <div>
    KubeKey는 하나의 MINOR 버전에서 다음 MINOR 버전으로 목표 버전이 될 때까지 쿠버네티스를 업그레이드합니다. 예를 들어, 업그레이드 프로세스가 1.16에서 1.18로 바로 가는 대신 1.16에서 1.17로, 그리고 1.18로 진행되는 것을 볼 수 있습니다.   
  </div>
</div>

### 시스템 요구 사항

  <table>
  <thead>
  <tr>
    <th>
      시스템
    </th>
    <th>
      최소 요구 사항(각 노드)
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <strong>Ubuntu</strong><em>16.04, 18.04, 20.04</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <strong>Debian</strong><em>Buster, Stretch</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <strong>CentOS</strong><em>7.x</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <strong>Red Hat Enterprise Linux</strong><em>7</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <strong>SUSE Linux Enterprise Server</strong><em>15</em><strong>/openSUSE Leap</strong><em>15.2</em>
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
    [KubeKey](https://github.com/Super Kubenetes/kubekey)는 `/var/lib/docker`를 이미지를 포함한 모든 Docker 관련 파일이 저장되는 기본 디렉터리로 사용합니다. `/var/lib/docker` 및 `/mnt/registry`에 각각 마운트된 **100G** 이상의 스토리지 볼륨을 추가하는 것을 권장합니다. [fdisk](https://www.computerhope.com/unix/fdisk.htm) 명령을 참조하세요.
  </div>
</div>

### 1단계: KubeKey 다운로드

1. 1. 다음 명령을 실행하여 KubeKey v2.2.1을 다운로드하세요.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">GitHub/Googleapis에 대한 네트워크 연결 양호</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">GitHub/Googleapis에 대한 네트워크 연결 불량</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="GitHub/Googleapis에 대한 네트워크 연결 양호">
      <p><a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub 릴리스 페이지</a>에서 KubeKey를 다운로드하거나 다음 명령을 실행하세요.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
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
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
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

2. 파일의 압축을 푼 후 다음 명령을 실행하여 `kk`를 실행 가능하게 만드세요:

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

### 2단계: 설치 이미지 준비

Linux에 Super Kubenetes 및 쿠버네티스를 설치하려면 필요한 모든 이미지가 포함된 이미지 패키지를 미리 준비하고 쿠버네티스 바이너리 파일을 다운로드해야 합니다.

1. 다음 명령을 통해 인터넷에 접속할 수 있는 컴퓨터에서 이미지 목록 파일 `images-list.txt`를 다운로드하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/images-list.txt</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이 파일은 다른 모듈을 기반으로 `##+modulename` 아래에 이미지를 나열합니다. 동일한 규칙에 따라 자신의 이미지를 이 파일에 추가할 수 있습니다.
    </div>
  </div>

2.  `offline-installation-tool.sh`를 다운로드하세요.

    <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
    										curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/offline-installation-tool.sh</a>
                </p>
             </code>
          </div>
       </pre>
    </article>

3.  `.sh` 파일을 실행 가능하게 만드세요.

    <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
    										chmod +x offline-installation-tool.sh
                </p>
             </code>
          </div>
       </pre>
    </article>

4.  `./offline-installation-tool.sh -h` 명령을 실행하여 스크립트 사용 방법을 확인할 수 있습니다.

    <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
                   root@master:/home/ubuntu# ./offline-installation-tool.sh -h
                   Usage:

                     ./offline-installation-tool.sh <span style="color:#f92672">[</span>-l IMAGES-LIST<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-d IMAGES-DIR<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-r PRIVATE-REGISTRY<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-v KUBERNETES-VERSION <span style="color:#f92672">]</span>

                   Description:
                     -b                     : save kubernetes<span style="color:#e6db74">' binaries.
                     </span><span style="color:#e6db74">  -d IMAGES-DIR          : the dir of files (tar.gz) which generated by <span>`</span>docker save<span>`</span>. default: /home/ubuntu/Super Kubenetes-images
                     </span><span style="color:#e6db74">&nbsp;&nbsp;-l IMAGES-LIST         : text file with list of images.
                     </span><span style="color:#e6db74">-r PRIVATE-REGISTRY    : target private registry:port.
                     </span><span style="color:#e6db74">-s                     : save model will be applied. Pull the images in the IMAGES-LIST and save images as a tar.gz file.
                     </span><span style="color:#e6db74">-v KUBERNETES-VERSION  : download kubernetes'</span> binaries. default: v1.17.9
                     -h                     : usage message
                </p>
             </code>
          </div>

       </pre>
    </article>

5.  쿠버네티스 바이너리 파일을 다운로드하세요.

    <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
    										./offline-installation-tool.sh -b -v v1.22.10 
                </p>
             </code>
          </div>
       </pre>
    </article>

    Google의 오브젝트 스토리지 서비스에 접근할 수 없는 경우, 소스를 변경하기 위해 다음 명령을 대신 실행하여 환경 변수를 추가하세요.

    <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
    										export KKZONE<span style="color:#f92672">=</span>cn;./offline-installation-tool.sh -b -v v1.22.10
                </p>
             </code>
          </div>
       </pre>
    </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - 필요에 따라 다운로드한 쿠버네티스 버전을 변경할 수 있습니다. Super Kubenetes 3.3.0에 권장 되는 쿠버네티스 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)입니다. 쿠버네티스 버전을 지정하지 않으면 KubeKey는 기본적으로 쿠버네티스 v1.23.7을 설치합니다. 지원되는 쿠버네티스 버전에 대한 자세한 내용은 [지원 매트릭스](../../installing-on-linux/introduction/kubekey/#support-matrix)를 참조하세요.

      - v1.17.9 쿠버네티스 바이너리 파일을 다운로드하여 쿠버네티스를 v1.16.13에서 v1.17.9로 업그레이드할 수 있지만, 버전 간 업그레이드를 위해서는 모든 중간 버전을 미리 다운로드해야 합니다. 예를 들어 쿠버네티스를 v1.15.12에서 v1.18.6으로 업그레이드하려면 쿠버네티스 v1.16.13 및 v1.17.9와 v1.18.6 바이너리 파일을 다운로드해야 합니다.

      - 스크립트를 실행하면 `kubekey` 폴더가 자동으로 생성됩니다. 이 파일과 `kk`는 나중에 클러스터를 만들 때 같은 디렉토리에 있어야 합니다.
    </div>

  </div>

6. `offline-installation-tool.sh`에서 이미지를 가져오세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										./offline-installation-tool.sh -s -l images-list.txt -d ./Super Kubenetes-images
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      필요에 따라 이미지를 가져오도록 선택할 수 있습니다. 예를 들어 이미 쿠버네티스 클러스터가 있는 경우 `images-list.text`에서 `##k8s-images` 및 그 아래의 관련 이미지를 삭제할 수 있습니다.
    </div>
  </div>
  
## 2단계: 프라이빗 레지스트리에 이미지 푸시

패키징된 이미지 파일을 로컬 컴퓨터로 전송하고 다음 명령을 실행하여 레지스트리에 푸시하세요.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./offline-installation-tool.sh -l images-list.txt -d ./Super Kubenetes-images -r dockerhub.kubekey.local
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    명령에서 도메인 이름은 `dockerhub.kubekey.local`입니다. 반드시 **자신의 레지스트리 주소**를 사용해야 합니다.
  </div>
</div>

### 올인원 클러스터를 위한 에어갭 업그레이드

#### Example machines

  <table>
  <thead>
  <tr>
    <th>
      호스트 이름
    </th>
    <th>
      IP
    </th>
    <th>
      역할
    </th>
    <th>
      포트
    </th>
    <th>
      URL
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      Docker 레지스트리
    </td>
    <td>
      5000
    </td>
    <td>
      http://192.168.1.1:5000
    </td>
  </tr>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      master, etcd, worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>

#### 버전

  <table>
  <thead>
  <tr>
    <th>
    </th>
    <th>
      쿠버네티스
    </th>
    <th>
      Super Kubenetes
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      전
    </td>
    <td>
      v1.18.6
    </td>
    <td>
      v3.2.x
    </td>
  </tr>
  <tr>
    <td>
      후
    </td>
    <td>
      v1.22.10
    </td>
    <td>
      3.3.0
    </td>
  </tr>
  </tbody>
  </table>

#### 클러스터 업그레이드

이 예에서 Super Kubenetes는 단일 노드에 설치되며 호스트 정보를 추가하려면 설정 파일을 지정해야 합니다. 또한 Air-Gapped 설치의 경우 `.spec.registry.privateRegistry`에 특별한 주의를 기울여야 하며, 반드시 **자신의 레지스트리 주소**로 설정해야 합니다. 자세한 내용은 다음 섹션을 참조하십시오.

#### 예시 설정 파일 만들기

다음 명령을 실행하여 설치를 위한 예시 설정 파일을 생성합니다:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span>
            </p>
        </code>
      </div>
  </pre>
</article>

예시:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0 -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    쿠버네티스 버전이 자신이 다운로드한 버전인지 꼭 확인하십시오.
  </div>
</div>

#### 설정 파일 편집

설정 파일 `config -sample.yaml` 을 편집하세요. 여기 [예시](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md)를 참조하세요.

<div className="notices warning">
  <p>Warning</p>
  <div>
    Air-Gapped 설치의 경우 `privateRegistry`를 지정해야 하며, 이 예제에서는 `dockerhub.kubekey.local`입니다.
  </div>
</div>

`config-sample.yaml` 파일의 `hosts`를 설정하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>:
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.master, address: 192.168.1.1, internalAddress: 192.168.1.1, user: root, password</span>: <span style="color:#ae81ff">Qcloud@123}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control<span>-</span>plane</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span>
            </p>
        </code>
      </div>
  </pre>
</article>

`config-sample.yaml` 파일의 `privateRegistry`를 설정하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;registry</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#ae81ff">dockerhub.kubekey.local</span>
            </p>
        </code>
      </div>
  </pre>
</article>

#### 단일 노드 클러스터를 Super Kubenetes 3.3.0 및 쿠버네티스 v1.22.10으로 업그레이드

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

쿠버네티스를 특정 버전으로 업그레이드하려면 `--with-kubernetes` 플래그 뒤에 버전을 명시하십시오. 사용 가능한 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)입니다.

### 멀티 노드 클러스터를 위한 Air-Gapped 업그레이드

#### 머신 예시

  <table>
  <thead>
  <tr>
    <th>
      호스트 이름
    </th>
    <th>
      IP
    </th>
    <th>
      역할
    </th>
    <th>
      포트
    </th>
    <th>
      URL
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      Docker 레지스트리
    </td>
    <td>
      5000
    </td>
    <td>
      http://192.168.1.1:5000
    </td>
  </tr>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      master, etcd
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
      slave1
    </td>
    <td>
      192.168.1.2
    </td>
    <td>
      worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
      slave1
    </td>
    <td>
      192.168.1.3
    </td>
    <td>
      worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>

#### 버전

  <table>
  <thead>
  <tr>
    <th>
    </th>
    <th>
      쿠버네티스
    </th>
    <th>
      Super Kubenetes
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      전
    </td>
    <td>
      v1.18.6
    </td>
    <td>
      v3.2.x
    </td>
  </tr>
  <tr>
    <td>
      후
    </td>
    <td>
      v1.22.10
    </td>
    <td>
      3.3.0
    </td>
  </tr>
  </tbody>
  </table>

#### 예제 설정 파일 만들기

다음 명령을 실행하여 설치를 위한 예시 설정 파일을 생성하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span>
            </p>
        </code>
      </div>
  </pre>
</article>

예시:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0 -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    쿠버네티스 버전이 자신이 다운로드한 버전인지 확인하십시오.
  </div>
</div>

#### 설정 파일 편집

설정 파일 `config -sample.yaml` 을 편집하세요. 여기 [예시](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md)를 참조하세요.

<div className="notices warning">
  <p>Warning</p>
  <div>
    Air-Gapped 설치의 경우 `privateRegistry`를 지정해야 하며, 이 예제에서는 `dockerhub.kubekey.local`입니다.
  </div>
</div>

`config-sample.yaml` 파일의 `hosts`를 설정하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.master, address: 192.168.1.1, internalAddress: 192.168.1.1, user: root, password</span>: <span style="color:#ae81ff">Qcloud@123}</span> 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.slave1, address: 192.168.1.2, internalAddress: 192.168.1.2, user: root, privateKeyPath</span>: <span style="color:#e6db74">"/root/.ssh/kp<span>-</span>qingcloud"</span>} 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.slave2, address: 192.168.1.3, internalAddress: 192.168.1.3, user: root, privateKeyPath</span>: <span style="color:#e6db74">"/root/.ssh/kp<span>-</span>qingcloud"</span>} 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control<span>-</span>plane</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.slave1</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.slave2</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

`config-sample.yaml` 파일의 `privateRegistry`를 설정하세요:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;registry</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#ae81ff">dockerhub.kubekey.local</span>
            </p>
        </code>
      </div>
  </pre>
</article>

#### 멀티 노드 클러스터를 Super Kubenetes 3.3.0 및 쿠버네티스 v1.22.10으로 업그레이드

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

쿠버네티스를 특정 버전으로 업그레이드하려면 `--with-kubernetes` 플래그 뒤에 버전을 명시하십시오. 사용 가능한 버전은 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(테스트 중)입니다.
