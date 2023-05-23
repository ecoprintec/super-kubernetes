---
title: "Deploy Super Kubenetes on Huawei CCE"
keywords: "Super Kubenetes, Kubernetes, installation, huawei, cce"
description: "Learn how to deploy Super Kubenetes on Huawei Cloud Container Engine."
weight: 4250
---

이 가이드는 [Huaiwei CCE](https://support.huaweicloud.com/en-us/qs-cce/cce_qs_0001.html)에 Super Kubenetes를 배포하는 단계를 안내합니다.

## Huawei CCE 준비

### 쿠버네티스 클러스터 생성

먼저 아래 요구 사항에 따라 쿠버네티스 클러스터를 만듭니다.

- 쿠버네티스에 Super Kubenetes 3.3.0을 설치하기 위해서는 귀하의 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x, v1.23.x(실험 지원) 이어야 합니다.
- 쿠버네티스 클러스터의 클라우드 컴퓨팅 네트워크가 작동하는지 확인하거나 **자동 생성** 또는 **기존 선택**을 사용할 때 탄력적 IP를 사용하세요. 클러스터가 생성된 후 네트워크를 구성할 수도 있습니다. 관련되 내용은 [NAT Gateway](https://support.huaweicloud.com/en-us/productdesc-natgateway/en-us_topic_0086739762.html)를 참고하십시오.
- 노드로 `s3.xlarge.2` `4-core｜8GB`를 선택하고 필요한 경우 더 추가합니다.(프로덕션 환경에는 3개 이상의 노드가 필요합니다)

### kubectl에 공개 키 생성

- **리소스 관리** > **클러스터 관리** > **기본 정보** > **네트워크**로 이동하여 `Public apiserver`를 바인딩합니다.
- 오른쪽 열에서 **kubectl**을 선택하고 **kubectl 구성 파일 다운로드**로 이동한 다음 **다운로드하려면 여기를 클릭**을 클릭하면 kubectl의 공개 키를 얻을 수 있습니다.

  ![Kubectl 구성 파일 생성](/dist/assets/docs/v3.3/huawei-cce/en/generate-kubeconfig.png)

kubectl에 대한 구성 파일을 가져온 후 kubectl 명령줄을 사용하여 클러스터에 대한 연결을 확인합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            $ kubectl version
            Client Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"18"</span>, GitVersion:<span style="color:#e6db74">"v1.18.8"</span>, GitCommit:<span style="color:#e6db74">"9f2892aab98fe339f3bd70e3c470144299398ace"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2020-08-15T10:08:56Z"</span>, GoVersion:<span style="color:#e6db74">"go1.14.7"</span>, Compiler:"gc", Platform:<span style="color:#e6db74">"darwin/amd64"</span><span style="color:#f92672">}</span> 
            Server Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"17+"</span>, GitVersion:<span style="color:#e6db74">"v1.17.9-r0-CCE20.7.1.B003-17.36.3"</span>, GitCommit:<span style="color:#e6db74">"136c81cf3bd314fcbc5154e07cbeece860777e93"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2020-08-08T06:01:28Z"</span>, GoVersion:<span style="color:#e6db74">"go1.13.9"</span>, Compiler:"gc", Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span></p>
        </code>
      </div>
  </pre>
</article>

## Super Kubenetes 배포

### 사용자 지정 StorageClass 생성

<div className="notices note">
  <p>노트</p>
  <div>
    Huawei CCE 내장 Everest CSI는 기본적으로 SATA(Normal I/O)를 사용하는 StorageClass `csi-disk`를 제공하지만, 쿠버네티스 클러스터에 사용되는 실제 디스크는 SAS(high I/O) 또는 SSD( 매우 높은 I/O)입니다. 따라서 추가 StorageClass를 생성하여 **default**로 설정하는 것이 좋습니다. 관련된 내용은 공식문서 [kubectl을 사용하여 cloud storage 생성](https://support.huaweicloud.com/en-us/usermanual-cce/cce_01_0044.html)을 참고하십시오.
  </div>
</div>

다음은 해당 StorageClass에 대한 SAS(high I/O)를 생성하는 예입니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e"><span>#</span> csi-disk-sas.yaml</span> 
                <span></span>
                <span>-</span> <span>-</span> <span>-</span> 
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">storage.k8s.io/v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">StorageClass</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;annotations</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.kubernetes.io/is-default-class</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.Super Kubenetes.io/support-snapshot</span>: <span style="color:#e6db74">"false"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">csi-disk-sas</span> 
                <span style="color:#f92672">parameters</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;csi.storage.k8s.io/csi-driver-name</span>: <span style="color:#ae81ff">disk.csi.everest.io</span> 
                <span style="color:#f92672">&nbsp;&nbsp;csi.storage.k8s.io/fstype</span>: <span style="color:#ae81ff">ext4</span> 
                <span style="color:#75715e">&nbsp;&nbsp;# Bind Huawei “high I/O storage. If use “extremely high I/O, change it to SSD.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;everest.io/disk-volume-type</span>: <span style="color:#ae81ff">SAS</span> 
                <span style="color:#f92672">&nbsp;&nbsp;everest.io/passthrough</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">provisioner</span>: <span style="color:#ae81ff">everest-csi-provisioner</span> 
                <span style="color:#f92672">allowVolumeExpansion</span>: <span style="color:#66d9ef">true</span> 
                <span style="color:#f92672">reclaimPolicy</span>: <span style="color:#ae81ff">Delete</span> 
                <span style="color:#f92672">volumeBindingMode</span>: <span style="color:#ae81ff">Immediate</span></p>
          </code>
        </div></pre></article>
기본 StorageClass 설정 및 해제 방법은 쿠버네티스 공식 문서 [기본 StorageClass 변경](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/)을 참고하십시오.

### ks-installer를 사용하여 배포를 최소화하기

[ks-installer](https://github.com/Super Kubenetes/ks-installer)를 사용하여 기존 쿠버네티스 클러스터에 Super Kubenetes를 배포합니다. 최소 설치를 위해 다음 명령을 직접 실행합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p>
        </code>
      </div>
  </pre>
</article>

**워크로드** > **Pod**로 이동하여 네임스페이스의 `Super Kubenetes-system`에서 Pod의 실행 상태를 확인하여 Super Kubenetes의 최소 배포를 알 수 있습니다. Super Kubenetes 콘솔의 가용성을 이해하려면 네임스페이스의 `ks-console-xxxx`를 확인하십시오.

  ![최소한의 Super Kubenetes 배포](/dist/assets/docs/v3.3/huawei-cce/en/deploy-ks-minimal.png)

### Super Kubenetes 콘솔 노출

'Super Kubenetes-system' 네임스페이스에서 Pod의 실행 상태를 확인하고 Super Kubenetes의 기본 구성요소가 실행 중인지 확인합니다. 그런 다음 Super Kubenetes 콘솔을 노출합니다.

**리소스 관리** > **네트워크**로 이동하여 `ks-console`에서 서비스를 선택합니다. `LoadBalancer`를 선택하는 것이 좋습니다.(공용 IP가 필요합니다) 구성은 아래와 같습니다.

  ![Super Kubenetes 콘솔 노출](/dist/assets/docs/v3.3/huawei-cce/en/expose-ks-console.png)

기타 세부 구성의 경우 기본 설정이 좋지만 필요에 따라 설정할 수도 있습니다.

  ![Super Kubenetes 콘솔 SVC 편집](/dist/assets/docs/v3.3/huawei-cce/en/edit-ks-console-svc.png)

Super Kubenetes 콘솔에 대해 LoadBalancer를 설정한 후 지정된 주소를 통해 방문할 수 있습니다. Super Kubenetes 로그인 페이지로 이동하여 기본 계정(사용자 이름 `admin` 및 비밀번호 `P@88w0rd`)을 사용하여 로그인합니다.

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. Super Kubenetes에서 다른 구성 요소를 활성화하는 자세한 내용은 [플러그식 구성 요소 활성화](../../../pluggable-components/)를 참고하십시오.

<div className="notices warning">
  <p>주의</p>
  <div>
    Super Kubenetes의 Istio 기반 기능을 사용하기 전에 CRD 충돌로 인해 Huawei CCE에 내장된 `applications.app.k8s.io`를 삭제해야 합니다. `kubectl delete crd applications.app.k8s.io` 명령을 직접 실행하여 삭제할 수 있습니다.
  </div>
</div>

구성 요소가 설치된 후 **클러스터 관리** 페이지로 이동하면 아래 인터페이스가 표시됩니다. **시스템 구성 요소**에서 구성 요소의 상태를 확인할 수 있습니다.
