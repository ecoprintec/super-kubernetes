---
title: "NFS 서버 설정"
keywords: 'Kubernetes, Super Kubenetes, NFS Server'
description: 'How to set up an NFS Server'
linkTitle: "Set up an NFS Server"
weight: 17410
---

Super Kubenetes는 스토리지 플러그인으로 [NFS-client Provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/nfs-client)를 지원합니다. 이것을 사용하기 위해서는 미리 NFS 서버를 설정해야 합니다. NFS 서버가 있으면, NFS 클라이언트는 NFS 서버에 존재하는 파일이 NFS 클라이언트에 액세스할 수 있도록 서버 머신에 디렉토리를 마운트합니다. 즉, 클라이언트 머신이 액세스할 수 있는 디렉토리를 생성하고 내보내야 합니다.

NFS 서버가 준비되면 [KubeKey](../../../installing-on-linux/introduction/kubekey/)를 사용하여 쿠버네티스 및 Super Kubenetes와 함께 Helm 차트로 NFS 클라이언트 프로비저너를 설치할 수 있습니다. NFS 서버의 내보낸 디렉토리는 설치 중에 KubeKey에서 사용하는 차트 설정에 제공되어야 합니다.

<div className="notices note">
   <p>Note</p>
   <div>
         - Super Kubenetes 클러스터를 설치한 후 NFS 클라이언트의 스토리지 클래스를 생성할 수도 있습니다.
         - `잠금 획득 실패` 및 `입력/출력 오류`와 같은 어떤 문제가 발생하여 파드 `CrashLoopBackOff`를 야기할 수 있으므로, NFS 스토리지를 운영(특히 쿠버네티스 버전 1.20 이상)에 사용하는 것은 권장하지 않습니다. 또한 [Prometheus](https://github.com/prometheus/prometheus/blob/03b354d4d9386e4b3bfbcd45da4bb58b182051a5/docs/storage.md#operational-aspects)를 비롯한 일부 앱은 NFS와 호환되지 않을 수 있습니다.
   </div>
</div>

이 튜토리얼은 Ubuntu 16.04에 NFS 서버를 설치하는 방법을 예시로 시연합니다.

## NFS 서버 설치 및 설정

### 1단계: NFS 커널 서버 설치

서버 머신을 설정하려면 NFS 커널 서버를 설치해야 합니다.

1. 설치를 위해 Ubuntu에서 최신 패키지를 사용하도록 다음 명령을 실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo apt-get update
               </p>
            </code>
         </div>
      </pre>
   </article>

2. NFS 커널 서버를 설치하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo apt install nfs-kernel-server
               </p>
            </code>
         </div>
      </pre>
   </article>

### 2단계: 내보내기 디렉토리 생성

NFS 클라이언트는 NFS 서버에서 내보낸 디렉토리를 서버 머신에 마운트합니다.

1. 다음 명령을 실행하여 마운트 폴더 이름을 지정하세요. (예: `/mnt/demo`)

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo mkdir -p /mnt/demo
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 시연 목적으로, 모든 클라이언트가 디렉토리에 액세스할 수 있도록 폴더의 제한적인 권한을 제거합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo chown nobody:nogroup /mnt/demo
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo chmod <span style="color:#ae81ff">777</span> /mnt/demo
               </p>
            </code>
         </div>
      </pre>
   </article>

### 3단계: 클라이언트 시스템에 NFS 서버에 대한 액세스 권한 부여

1. 다음 명령을 실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						sudo nano /etc/exports
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 클라이언트 정보를 파일에 추가하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						/mnt/demo clientIP<span style="color:#f92672">(</span>rw,sync,no_subtree_check<span style="color:#f92672">)</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

   만약 클라이언트 머신이 여러 개라면, 그 전부를 파일에 추가할 수 있습니다. 그게 아니면, 파일 내의 모든 클라이언트가 NFS 서버에 액세스할 수 있도록 파일에 서브넷을 지정하세요. 
   예를 들어:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						/mnt/demo 192.168.0.0/24<span style="color:#f92672">(</span>rw,sync,no_subtree_check<span style="color:#f92672">)</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         - `rw`: 읽기 및 쓰기 작업. 클라이언트 머신은 볼륨에 대한 읽기 및 쓰기 권한을 둘 다 갖습니다.
         - `sync`: 변경 사항이 디스크와 메모리에 기록됩니다.
         - `no_subtree_check`: 하위 트리 검사를 막습니다. 이것은 허용된 하위 디렉토리를 클라이언트가 마운트하기 위해 필요한 보안 확인을 비활성화합니다.
      </div>
   </div>

3. 편집이 끝나면 파일을 저장하세요.

### 4단계: 설정 적용

1. 다음 명령을 실행하여 공유 디렉터리를 내보냅니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						 sudo exportfs -a
               </p>
            </code>
         </div>
      </pre>
   </article>

2. NFS 커널 서버를 재시작하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						 sudo systemctl restart nfs-kernel-server
               </p>
            </code>
         </div>
      </pre>
   </article>
