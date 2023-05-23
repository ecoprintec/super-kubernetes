---
title: "스토리지 클래스"
keywords: "Storage, Volume, PV, PVC, storage class, csi, Ceph RBD, GlusterFS, QingCloud"
설명: "Learn basic concepts of PVs, PVCs,and storage classes, and demonstrate how to manage storage classes on Super Kubenetes."
linkTitle: "Storage Classes"
weight: 8800
---

이 튜토리얼은 클러스터 관리자가 Super Kubenetes에서 스토리지 클래스와 영구 볼륨을 관리하는 방법을 시연합니다.

## 소개

영구 볼륨(PV)은 관리자가 프로비저닝하거나 스토리지 클래스를 사용하여 동적으로 프로비저닝된 클러스터의 스토리지 부분입니다. PV는 볼륨과 같은 볼륨 플러그인이지만 PV를 사용하는 개별 Pod와 독립적인 수명 주기를 갖습니다. PV는 [정적으로](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static) 또는 [동적으로](https://kubernetes.io/docs/concepts/storage/persistent) 프로비저닝할 수 있습니다. 

영구 볼륨 클레임(PVC)은 사용자의 스토리지 요청입니다. 파드와 비슷합니다. Pod는 노드 리소스를 사용하고 PVC는 PV 리소스를 사용합니다.

Super Kubenetes는 PV를 생성하기 위해 스토리지 클래스를 기반으로 [동적 볼륨 프로비저닝](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/)을 지원합니다.

[스토리지 클래스](https://kubernetes.io/docs/concepts/storage/storage-classes)는 관리자가 제공하는 스토리지 클래스를 설명하는 방법을 제공합니다. 다른 클래스는 서비스 품질 수준, 백업 정책 또는 클러스터 관리자가 결정한 임의의 정책에 매핑될 수 있습니다. 각 스토리지 클래스에는 PV 프로비저닝에 사용되는 볼륨 플러그인을 결정하는 프로비저너가 있습니다. 이 필드를 지정해야 합니다. 어떤 값을 사용할지 [공식 쿠버네티스 문서](https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner)를 읽거나 스토리지 관리자에게 문의하세요.

아래 표에는 다양한 프로비저너(스토리지 시스템)에 대한 공통 볼륨 플러그인이 요약되어 있습니다.

  <table>
  <thead>
  <tr>
    <th>
      유형
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      In-tree
    </td>
    <td>
      기본 제공되며 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd" target="_blank" rel="noopener noreferrer">RBD</a> 및 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs" target="_blank" rel="noopener noreferrer">GlusterFS</a>와 같은 쿠버네티스의 일부로 실행됩니다. 이러한 종류의 플러그인을 더 보려면 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner" target="_blank" rel="noopener noreferrer">프로비저너</a>를 참고하세요.
    </td>
  </tr>
  <tr>
    <td>
      외부 프로비저너
    </td>
    <td>
      쿠버네티스와 독립적으로 배포되지만 <a href="https://github.com/kubernetes-retired/external-storage/tree/master/nfs-client" target="_blank" rel="noopener noreferrer">nfs-client</a>와 같은 인트리 플러그인처럼 작동합니다. 이러한 종류의 플러그인을 더 보려면 <a href="https://github.com/kubernetes-retired/external-storage" target="_blank" rel="noopener noreferrer">외부저장소</a>을 참조하십시오.
    </td>
  </tr>
  <tr>
    <td>
      CSI
    </td>
    <td>
      컨테이너 스토리지 인터페이스는 <a href="https://github.com/ceph/ceph-csi" target="_blank" rel="noopener noreferrer">Ceph-CSI</a>와 같은 CO(예: 쿠버네티스)의 워크로드에 스토리지 리소스를 노출하기 위한 표준입니다. 이러한 종류의 플러그인을 더 보려면 <a href="https://kubernetes-csi.github.io/docs/drivers.html" target="_blank" rel="noopener noreferrer">드라이버</a>을 참고하세요.
    </td>
  </tr>
  </tbody>
  </table>

## 사전 준비

**클러스터 관리** 권한을 포함한 역할이 부여된 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

## 스토리지 클래스 생성

1. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.
   
2. 가져온 멤버 클러스터와 함께 [멀티 클러스터 기능](../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택할 수 있습니다. 기능을 활성화하지 않은 경우 다음 단계를 하세요.

3. **클러스터 관리** 페이지에서 **스토리지** 아래의 **스토리지 클래스**로 이동하여 스토리지 클래스를 생성, 업데이트 및 삭제할 수 있습니다.

4. 스토리지 클래스를 생성하려면 **생성**를 클릭하고 표시된 대화 상자에 기본 정보를 입력합니다. 완료되면 **다음**을 클릭하세요.

5. Super Kubenetes에서 `GlusterFS` 및 `Ceph RBD`에 대한 스토리지 클래스를 생성할 수 있습니다. 또는 필요에 따라 다른 스토리지 시스템에 대한 맞춤형 스토리지 클래스를 생성할 수도 있습니다. 유형을 선택하고 **다음**을 클릭하세요.

### 공통 설정

일부 설정은 일반적으로 사용되며 스토리지 클래스 간에 공유됩니다. 콘솔에서 대시보드 파라미터로 찾을 수 있으며 StorageClass 매니페스트의 영역 또는 주석으로도 표시됩니다. 우측 상단의 **YAML 편집**을 클릭하면 YAML 형식의 매니페스트 파일을 볼 수 있습니다.

다음은 Super Kubenetes에서 일반적으로 사용되는 일부 영역의 파라미터 설명입니다.

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      파라미터
    </th>
    <th style="text-align:left">
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      볼륨 확장
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>allowVolumeExpansion</code>으로 지정됩니다. <code>true</code>로 설정하면 PV를 확장 가능하도록 설정할 수 있습니다. 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion" target="_blank" rel="noopener noreferrer">볼륨 확장 허용</a>을 참고하세요.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      회수 정책
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>reclaimPolicy</code>로 지정됩니다. 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#reclaim-policy" target="_blank" rel="noopener noreferrer">회수 정책</a >을 참고하세요.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      스토리지 시스템
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>provisioner</code>에 의해 지정됩니다. PV 프로비저닝에 사용되는 볼륨 플러그인을 결정합니다. 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner" target="_blank" rel="noopener noreferrer">제공자</a>를 참고하세요.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      접속 모드
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>metadata.annotations[storageclass.Super Kubenetes.io/supported-access-modes]</code>로 지정됩니다. 지원되는 <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes" target="_blank" rel="noopener noreferrer">접속 모드</a>를 Super Kubenetes에 알려줍니다. 
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      볼륨 바인딩 모드
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>volumeBindingMode</code>로 지정됩니다. 사용되는 바인딩 모드를 결정합니다. <strong>지연된 바인딩</strong>은 볼륨이 생성된 후 이 볼륨을 사용하는 파드가 생성될 때 볼륨 인스턴스에 바인딩됨을 의미합니다. <strong>즉시 바인딩</strong>은 볼륨이 생성된 후 볼륨 인스턴스에 즉시 바인딩됨을 의미합니다.
    </td>
  </tr>
  </tbody>
  </table>

다른 설정의 경우 매니페스트에서 항상 `파라미터` 영역 아래에 표시되는 다양한 스토리지 플러그인에 대해 각각 다른 정보를 제공해야 합니다. 아래 섹션에서 자세히 설명합니다. 쿠버네티스 공식 문서에서 [파라미터](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters)를 참고하세요.


### GlusterFS

GlusterFS는 쿠버네티스의 인트리 스토리지 플러그인이므로 추가로 볼륨 플러그인을 설치할 필요가 없습니다.

#### 사전 준비

GlusterFS 스토리지 시스템이 이미 설치되었습니다. 자세한 내용은 [GlusterFS 설치 문서](https://www.gluster.org/install/)를 참조하십시오.

#### 설정

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      파라미터
    </th>
    <th style="text-align:left">
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      REST URL
    </td>
    <td style="text-align:left">
      볼륨을 프로비저닝하는 Heketi REST URL. 예를 들어, &lt;Heketi Service cluster IP Address&gt;:&lt;Heketi Service port number&gt;.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      클러스터  ID
    </td>
    <td style="text-align:left">
      Gluster 클러스터 ID.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      REST 인증
    </td>
    <td style="text-align:left">
      Gluster가 REST 서버에 대한 인증을 활성화합니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      REST 사용자
    </td>
    <td style="text-align:left">
      Gluster REST 서비스 또는 Heketi 서비스의 사용자 이름입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      시크릿 네임스페이스/시크릿 이름
    </td>
    <td style="text-align:left">
      Heketi 사용자 시크릿의 네임스페이스입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      시크릿 이름
    </td>
    <td style="text-align:left">
      Heketi 사용자 시크릿의 이름입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      최소 GID
    </td>
    <td style="text-align:left">
      볼륨의 최소 GID입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      최대 GID
    </td>
    <td style="text-align:left">
      볼륨의 최대 GID입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      볼륨  유형
    </td>
    <td style="text-align:left">
      볼륨 유형. 값은 none, replicate:&lt;Replicate count&gt;, 또는 disperse:&lt;Data&gt;:&lt;Redundancy count&gt;일 수 있습니다. 볼륨 유형이 설정되지 않은 경우 기본 볼륨 유형은 replicate:3입니다.
    </td>
  </tr>
  </tbody>
  </table>

스토리지 클래스 파라미터에 대한 자세한 내용은 [쿠버네티스 문서의 GlusterFS](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)를 참고하세요.

### Ceph RBD

Ceph RBD는 쿠버네티스의 인트리 스토리지 플러그인이기도 합니다. 볼륨 플러그인은 이미 쿠버네티스에 있습니다.
그러나 Ceph RBD의 스토리지 클래스를 생성하기 전에 스토리지 서버를 설치해야 합니다.

**hyperkube** 이미지는 [1.17부터 더 이상 사용되지 않으므로](https://github.com/kubernetes/kubernetes/pull/85094), 인트리 Ceph RBD는 **hyperkube** 없이 작동하지 않을 수 있습니다. 
그럼에도 불구하고[rbd provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd)를 대용으로 사용할 수 있으며 형식은 인트리 Ceph RBD와 동일합니다.
유일한 다른 파라미터는 `provisioner`(즉, Super Kubenetes 콘솔의 **스토리지 시스템**)입니다. rbd-provisioner를 사용하려면 `provisioner`의 값이 `ceph.com/rbd`여야 합니다(아래 이미지의 **스토리지 시스템**에 이 값을 입력하세요). 인트리 Ceph RBD를 사용하는 경우 값은 `kubernetes.io/rbd`여야 합니다.

#### 사전 준비

- Ceph 서버가 이미 설치되어 있습니다. 자세한 내용은 [Ceph 설치 설명서](https://docs.ceph.com/en/latest/install/)를 참조하십시오.
- rbd-provisioner를 사용하기로 선택한 경우 플러그인을 설치합니다. 커뮤니티 개발자는 helm으로 rbd-provisioner를 설치하는 데 사용할 수 있는 [rbd provisioner용 차트](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test/rbd-provisioner)를 제공합니다.

#### 설정

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      파라미터
    </th>
    <th style="text-align:left">
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      모니터
    </td>
    <td style="text-align:left">
      Ceph 모니터의 IP 주소입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminId
    </td>
    <td style="text-align:left">
      풀에서 이미지를 생성할 수 있는 Ceph 클라이언트 ID입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminSecretName
    </td>
    <td style="text-align:left">
      <code>adminId</code>의 비밀 이름입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminSecretNamespace
    </td>
    <td style="text-align:left">
      <code>adminSecretName</code>의 네임스페이스입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      pool
    </td>
    <td style="text-align:left">
      Ceph RBD 풀의 이름입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userId
    </td>
    <td style="text-align:left">
      RBD 이미지를 매핑하는 데 사용되는 Ceph 클라이언트 ID입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userSecretName
    </td>
    <td style="text-align:left">
      RBD 이미지를 매핑하기 위한 <code>userId</code>의 Ceph Secret 이름입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userSecretNamespace
    </td>
    <td style="text-align:left">
      <code>userSecretName</code>의 네임스페이스입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      File System Type
    </td>
    <td style="text-align:left">
      스토리지 볼륨의 파일 시스템 유형입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      imageFormat
    </td>
    <td style="text-align:left">
       Ceph 볼륨의 옵션입니다. 값은 <code>1</code> 또는 <code>2</code>일 수 있습니다. <code>imageFeatures</code>는 imageFormat을 <code>2</code>로 설정할 때 채워져야 합니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      imageFeatures
    </td>
    <td style="text-align:left">
      Ceph 클러스터의 추가 기능입니다. imageFormat을 <code>2</code>로 설정한 경우에만 값을 설정해야 합니다.
    </td>
  </tr>
  </tbody>
  </table>

StorageClass 파라미터에 대한 자세한 내용은 [쿠버네티스 문서의 Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)를 참고하세요.

### 맞춤형 스토리지 클래스

Super Kubenetes에서 직접 지원하지 않는 스토리지 시스템에 대한 사용자 정의 스토리지 클래스를 생성할 수 있습니다. 다음 예는 Super Kubenetes 콘솔에서 NFS용 스토리지 클래스를 생성하는 방법을 보여줍니다.

#### NFS 소개

NFS(Net File System)는 외부 프로비저너 볼륨 플러그인인 [nfs-client](https://github.com/kubernetes-retired/external-storage/tree/master/nfs-client)와 함께 쿠버네티스에서 널리 사용됩니다. **사용자 정의**를 클릭하여 nfs-client의 스토리지 클래스를 생성할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    NFS는 Prometheus와 같은 일부 애플리케이션과 호환되지 않으므로 파드 생성 실패가 발생할 수 있습니다. 운영 환경에서 NFS를 사용해야 하는 경우 위험을 이해했는지 확인하세요. 자세한 내용은 <a href="mailto:support@kuberix.co.kr">support@kuberix.co.kr</a>에 문의하세요.
  </div>
</div>


#### 사전 준비

- 사용 가능한 NFS 서버.
- 볼륨 플러그인 nfs-client가 이미 설치되었습니다. 커뮤니티 개발자는 helm으로 nfs-client를 설치하는 데 사용할 수 있는 [nfs-client용 차트](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner)를 제공합니다. 

#### 공통 설정

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      파라미터
    </th>
    <th style="text-align:left">
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      볼륨 확장
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>allowVolumeExpansion</code>으로 지정됩니다. <코드>아니요</code>를 선택합니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      회수 정책
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>reclaimPolicy</code>로 지정됩니다. 값은 기본적으로 <code>삭제</code>입니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      스토리지 시스템
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>provisioner</code>에 의해 지정됩니다. <a href="https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner" target="_blank" rel="noopener noreferrer">charts for nfs-client</a>로 스토리지 클래스를 설치하는 경우 <code>cluster.local/nfs-client-nfs-client-provisioner</code>일 수 있습니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      접속 모드
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>.metadata.annotations.storageclass.Super Kubenetes.io/supported-access-modes</code>로 지정됩니다. <code>ReadWriteOnce</code>, <code>ReadOnlyMany</code> 및 <code>ReadWriteMany</code>는 모두 기본적으로 선택됩니다.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      볼륨 바인딩 모드
    </td>
    <td style="text-align:left">
      매니페스트에서 <code>volumeBindingMode</code>로 지정됩니다. 사용되는 바인딩 모드를 결정합니다. <strong>지연된 바인딩</strong>은 볼륨이 생성된 후 이 볼륨을 사용하는 파드가 생성될 때 볼륨 인스턴스에 바인딩됨을 의미합니다. <strong>즉시 바인딩</strong>은 볼륨이 생성된 후 볼륨 인스턴스에 즉시 바인딩됨을 의미합니다.
    </td>
  </tr>
  </tbody>
  </table>

#### 파라미터

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Key
    </th>
    <th style="text-align:left">
      설명
    </th>
    <th style="text-align:left">
      값
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      archiveOnDelete
    </td>
    <td style="text-align:left">
      삭제하는 동안 PVC 보관
    </td>
    <td style="text-align:left">
      <code>true</code>
    </td>
  </tr>
  </tbody>
  </table>

## 스토리지 클래스 관리

스토리지 클래스를 생성한 후 스토리지 클래스의 이름을 클릭하여 세부 정보 페이지로 이동합니다. 세부정보 페이지에서 **YAML 편집**을 클릭하여 스토리지 클래스의 매니페스트 파일을 편집하거나 **더보기**를 클릭하여 드롭다운 메뉴에서 작업을 선택합니다.

- **기본 스토리지 클래스로 설정**: 스토리지 클래스를 클러스터의 기본 스토리지 클래스로 설정합니다. Super Kubenetes 클러스터에는 하나의 기본 스토리지 클래스만 허용됩니다.
- **권한 부여 규칙 설정**: 특정 프로젝트 및 워크스페이스에서만 스토리지 클래스에 액세스할 수 있도록 권한 부여 규칙을 설정합니다.
- **볼륨 작업 설정**: **볼륨 복제**, **볼륨 스냅샷 생성**, **볼륨 확장**을 포함한 볼륨 기능을 관리합니다. 기능을 활성화하기 전에 시스템 관리자에게 문의하여 해당 기능이 스토리지 시스템에서 지원되는지 확인해야 합니다.
- **자동 확장 설정**: 남은 볼륨 공간이 임계값보다 낮을 때 시스템이 자동으로 볼륨을 확장하도록 설정합니다. **자동으로 워크로드 다시 시작**을 활성화할 수도 있습니다.
- **삭제**: 스토리지 클래스를 삭제합니다.

**퍼시스턴트 볼륨 클레임** 탭에서 스토리지 클래스와 연결된 PVC를 볼 수 있습니다.