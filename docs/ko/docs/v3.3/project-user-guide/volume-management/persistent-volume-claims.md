---
title: "영구 볼륨 클레임"
keywords: 'Kubernetes, Persistent Volumes, Persistent Volume Claims, Volume Clone, Volume Snapshot, Volume Expansion'
description: 'Learn how to create, edit, and mount a PVC on Super Kubenetes.'
linkTitle: "Persistent Volume Claims"
weight: 10310
---

프로젝트에서 애플리케이션 워크로드를 생성할 때 이에 대한 [영구 볼륨 클레임](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)(PVC)을 생성할 수 있습니다. PVC를 사용하면 스토리지 요청을 생성하여 애플리케이션에 영구 스토리지를 추가로 프로비저닝할 수 있습니다. 보다 구체적으로 말하면 영구 스토리지는 영구 볼륨 리소스에 의해 관리됩니다.

클러스터 관리자는 스토리지 클래스를 사용하여 영구 볼륨(PV)을 설정합니다. 즉, 프로젝트에서 PVC를 작성하려면 클러스터에 사용 가능한 스토리지 클래스가 있어야 합니다. 만약 Super Kubenetes를 설치할 때 사용자 정의된 스토리지 클래스가 설정되지 않은 경우, 로컬 영구 볼륨을 제공하기 위해 기본적으로 [OpenEBS](https://openebs.io/)가 클러스터에 설치됩니다. 하지만 동적 볼륨 프로비저닝은 지원하지 않습니다. 운영 환경에서는 앱에 영구 스토리지 서비스를 제공하기 위해 미리 스토리지 클래스를 구성하는 것을 권장합니다.

이 튜토리얼은 PVC를 생성하고, PVC를 마운트하고, 세부 정보 페이지에서 PVC 기능을 사용하는 방법을 시연합니다.

## 사전 준비

- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

- 볼륨을 동적으로 프로비저닝하려면 동적 프로비저닝을 지원하는 [스토리지 클래스 설정](../../../cluster-administration/storageclass/)이 필요합니다.

## PVC 생성

Super Kubenetes는 용량 및 접속 모드와 같이, PVC에 대해 설정한 요청을 충족하는 PV에 PVC를 바인딩합니다. 애플리케이션 워크로드를 생성할 때, 원하는 PVC를 선택하고 워크로드에 마운트할 수 있습니다.

1. Super Kubenetes의 웹 콘솔에 `project-regular`로 로그인하고 프로젝트로 이동합니다. 내비게이션 바에서 **스토리지** 아래의 **영구 볼륨 클레임**을 클릭하면 프로젝트의 워크로드에 마운트된 모든 PVC가 표시됩니다.

2. PVC를 생성하려면 **영구 볼륨 클레임** 페이지에서 **생성**을 클릭하세요.

3. 표시된 대화 상자에서 PVC의 이름(예: `demo-volume`)을 설정하고 프로젝트를 선택한 후, **다음**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      오른쪽 상단 모서리에서 **YAML 편집**을 활성화하면 PVC의 매니페스트 파일을 YAML 형식으로 볼 수 있고, 매니페스트 파일을 직접 편집하여 PVC를 만들 수 있습니다. 그렇지 않으면, 아래 단계에 따라 콘솔을 사용하여 PVC를 생성할 수 있습니다.
    </div>
  </div>


4. **스토리지 설정** 페이지에서 PVC 생성 방법을 선택하세요.

   - **스토리지 클래스에서**. Super Kubenetes 설치하기 [이전](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/)과 [이후](../../. ./cluster-administration/storageclass/)에 모두 스토리지 클래스를 설정할 수 있습니다.

   - **볼륨 스냅샷에서**. 스냅샷을 사용하여 PVC를 생성하려면, 먼저 볼륨 스냅샷을 생성해야 합니다.

   이 예제제에서는 **스토리지 클래스에서**를 선택하세요. 스냅샷으로 PVC를 만드는 방법에 대한 자세한 내용은 [볼륨 스냅샷](../volume-snapshots/)을 참조하십시오.

5. 드롭다운 목록에서 스토리지 클래스를 선택하세요. 이 튜토리얼에서는 QingCloud Platform에서 제공하는 표준 스토리지 클래스인 `csi-standard`를 사용합니다. 자신의 스토리지 클래스를 선택할 수도 있습니다.

6. 선택한 스토리지 클래스에 따라 일부 PV는 특정 접속 모드만 지원하므로 이 섹션에서 여러 접속 모드를 볼 수 있습니다. 총 세 가지 접속 모드가 있습니다.

   - **ReadWriteOnce**: 볼륨은 단일 노드에 의해 읽기-쓰기로 마운트될 수 있습니다.
   - **ReadOnlyMany**: 볼륨은 많은 노드에서 읽기 전용으로 마운트될 수 있습니다.
   - **ReadWriteMany**: 볼륨을 여러 노드에서 읽기-쓰기로 마운트될 수 있습니다.

   원하는 접속 모드를 선택하세요.

7. **볼륨 용량**에서 PVC의 크기를 지정하세요. 계속하려면 **다음**을 클릭하세요.

8. **고급 설정** 페이지에서 **레이블** 및 **주석**과 같은 메타데이터를 PVC에 추가할 수 있습니다. 리소스를 검색하고 예약하기 위한 식별자로 이것들을 사용할 수 있습니다.

9. **생성**을 클릭하여 PVC 생성을 마칩니다.

10. 생성된 PVC는 프로젝트의 **영구 볼륨 클레임** 페이지에 표시됩니다. 워크로드에 마운트되고 나면, **마운트 상태** 열 아래에서 **마운트됨**으로 바뀝니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      새로 생성된 PVC는 **클러스터 관리**의 **영구 볼륨 클레임** 페이지에도 표시됩니다. `project-regular`와 같은 프로젝트 사용자는 **영구 볼륨** 열에서 PV를 볼 수 있습니다. 클러스터 관리자는 프로젝트에서 생성된 PVC를 보고 추적할 책임이 있습니다. 반대로 클러스터 관리자가 **클러스터 관리**에서 프로젝트에 대한 PVC를 생성하는 경우, PVC는 프로젝트의 **영구 볼륨 클레임** 페이지에도 표시됩니다.
    </div>
  </div>

## PVC 마운트

[디플로이먼트](../../../project-user-guide/application-workloads/deployments/), [스테이트풀셋](../../../project-user-guide/application-workloads/statefulsets/), [데몬셋](../../../project-user-guide/application-workloads/daemonsets/)과 같은 애플리케이션 워크로드를 생성할 때, 그 워크로드에 PVC를 마운트할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    이 튜토리얼에서는 워크로드를 생성하는 방법을 설명하지 않습니다. 자세한 내용은 [애플리케이션 워크로드](../../application-workloads/deployments/)의 관련 가이드를 참조하세요.
  </div>
</div>

**스토리지 설정** 페이지에서 워크로드에 탑재할 수 있는 다양한 볼륨이 있는 것을 확인할 수 있습니다.

- **영구 볼륨 청구 템플릿 추가** ([스테이트풀셋](../../../project-user-guide/application-workloads/statefulsets/)에서만 사용 가능): PVC 템플릿은 PVC를 동적으로 생성하는 데 사용됩니다. `volumeClaimTemplates` 영역에 표시되는 이름, 스토리지 클래스, 접속 모드, 용량 및 경로를 설정하여 StorageClass 유형의 PVC를 파드에 마운트하세요.

- **마운트 볼륨**: emptyDir 볼륨 및 PVC를 지원합니다.

  **마운트 볼륨**에는 세 가지 종류의 볼륨이 있습니다.

  - **영구 볼륨**: PVC를 사용하여 마운트합니다.

    영구 볼륨은 사용자의 영구 데이터를 저장하는 데 사용할 수 있습니다. 목록에서 기존 PVC를 선택할 수 있도록 미리 PVC를 생성해야 합니다.

  - **임시 볼륨**: emptyDir 볼륨을 사용하여 마운트합니다.

    임시 볼륨은 [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir)을 나타내며, 이는 파드가 노드에 할당될 때 처음 생성되고 해당 파드가 실행되는 동안 해당 노드에 존재합니다. emptyDir 볼륨은 파드의 컨테이너가 읽고 쓸 수 있는 빈 디렉터리를 제공합니다. 배포 환경에 따라, emptyDir 볼륨은 노드를 지원하는 모든 매체(디스크 또는 SSD일 수 있음)에 저장할 수 있습니다. 어떤 이유로든 파드가 노드에서 제거되면, emptyDir의 데이터는 영원히 삭제됩니다.

  - **HostPath 볼륨**: hostPath 볼륨을 사용하여 마운트합니다.

    HostPath 볼륨은 호스트 노드의 파일 시스템에서 파드로 파일이나 디렉토리를 마운트합니다. 이것은 대부분의 파드에 필요한 것은 아니지만, 일부 애플리케이션에 강력한 탈출구를 제공합니다. 자세한 내용은 [쿠버네티스 문서](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)를 참조하세요.

- **컨피그맵 또는 시크릿 마운트**: [컨피그맵](../../../project-user-guide/configuration/configmaps/) 또는 [시크릿](../../../project-user-guide/configuration/secrets/)의 키-값 쌍을 지원합니다.

  [시크릿](https://kubernetes.io/docs/concepts/storage/volumes/#secret) 볼륨은 파드에 비밀번호, OAuth 토큰, SSH 키와 같은 민감한 정보를 제공하는 데 사용됩니다. 시크릿 볼륨은 tmpfs(RAM 기반 파일시스템)에 의해 지원되므로 비휘발성 스토리지에 기록되지 않습니다.

  [컨피그맵](https://kubernetes.io/docs/concepts/storage/volumes/#configmap)은 구성 데이터를 키-값 쌍의 형태로 저장하는 데 사용됩니다. 컨피그맵 리소스는 구성 데이터를 파드에 주입하는 방법을 제공합니다. 컨피그맵 오브젝트에 저장된 데이터는 `컨피그맵` 유형의 볼륨에서 참조된 다음, 파드에서 실행되는 컨테이너화된 애플리케이션에서 소비될 수 있습니다. 컨피그맵은 다음과 같은 경우에 자주 사용됩니다.

  - 환경변수의 값을 설정.
  - 컨테이너에 명령 파라미터를 설정.
  - 볼륨에 설정 파일을 생성.

## PVC 보기 및 관리

PVC를 생성한 후, 세부 정보를 보거나, 그것을 편집하거나, PVC 기능을 활용할 수 있습니다. PVC 세부 정보를 보려면 **영구 볼륨 클레임** 페이지에서 PVC를 클릭하세요.

### PVC 세부정보 보기

PVC 세부 정보를 보려면 **영구 볼륨 클레임** 페이지에서 PVC를 클릭하세요.

1. **리소스 상태** 탭을 클릭해서 PVC 사용량 및 탑재된 파드를 봅니다.

2. **메타데이터** 탭을 클릭해서 PVC의 레이블과 주석을 봅니다.

3. **이벤트** 탭을 클릭해서 PVC의 이벤트를 봅니다.

4.	**스냅샷** 탭을 클릭해서 PVC의 스냅샷을 봅니다.

### PVC 편집

세부 정보 페이지에서 **정보 수정**을 클릭하여 기본 정보를 변경할 수 있습니다. **더보기**를 클릭하면 YAML 파일을 편집하거나 또는 이 PVC를 삭제할 수 있습니다.

PVC를 삭제하려면, PVC가 워크로드에 마운트되지 않았는지 반드시 확인하세요. PVC를 마운트 해제하려면 워크로드의 세부사항 페이지로 이동합니다. **더보기**의 드롭다운 목록에서 **설정 편집**을 클릭하세요. **설정 편집** 대화 상자에서 **스토리지**를 클릭하세요. PVC 위에 마우스 커서를 올리고, 휴지통 아이콘을 클릭하여 마운트를 해제하세요.

만약 **삭제**를 클릭한 후에도 PVC 상태가 오랫동안 **종료 중**으로 유지되는 경우에는 다음 명령을 사용하여 수동으로 삭제하세요:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span>kubectl patch pvc &lt;pvc-name&gt; -p </span><span style="color:#e6db74">'{"metadata":{"finalizers":null}}'</span>
            </p>
        </code>
      </div>
  </pre>
</article>

### PVC 기능 사용

**더보기** 드롭다운 메뉴에는, `스토리지 기능(Storage Capability)`이라고도 하는 기본 스토리지 플러그인을 기반으로 Super Kubenetes에서 제공하는 다른 추가 옵션들이 존재합니다. PVC 기능에는 다음이 포함됩니다.

- **클론**: 동일한 PVC를 생성.
- **스냅샷 생성**: PVC를 생성하는 데 사용할 수 있는 볼륨 스냅샷을 생성. 자세한 내용은 [볼륨 스냅샷](../volume-snapshots/)을 참조하십시오.
- **확장**: PVC의 크기를 늘림. 데이터 손실 가능성 때문에 콘솔에서 PVC의 크기를 줄일 수 없다는 점을 유의하십시오.

`스토리지 기능`에 대한 자세한 내용은 [디자인 문서](https://github.com/kubesphere/community/blob/master/sig-storage/concepts-and-designs/storage-capability-interface.md)를 참조하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    앞의 시스템 요구 사항과 다음의 지침은 플러그형 컴포넌트를 사용하지 않는 기본 최소 설치를 위한 것입니다. 만약 컴퓨터의 CPU 코어가 8개 이상이고 16GB 메모리가 있다면, 모든 컴포넌트를 활성화하는 것을 권장합니다. 자세한 내용은 [플러그형 컴포넌트 활성화](../../pluggable-components/)를 참조하십시오.
  </div>
</div>

일부 인-트리 또는 특수 CSI 플러그인은 `스토리지 기능`에 포함되지 않을 수 있습니다. Super Kubenetes가 자신의 클러스터에 올바른 기능을 표시하지 않는다면, [이 가이드](https://github.com/kubesphere/kubesphere/issues/2986)에 따라 조정할 수 있습니다.

### PVC 모니터링

Super Kubenetes는 용량 사용량 및 inode 사용량을 포함하여, PVC를 모니터링하기 위해 Kubelet에서 `Filesystem` 모드로 PVC의 메트릭 데이터를 검색합니다.

PVC 모니터링에 대한 자세한 내용은 [볼륨 모니터링 리서치](https://github.com/kubesphere/kubesphere/issues/2921)를 참조하십시오.

## PV 목록 보기 및 PV 관리
 ### PV 목록 보기

1. 다음 정보를 제공하는 PV 목록 페이지를 보려면, **영구 볼륨 클레임** 페이지에서 **영구 볼륨** 탭을 클릭하세요:

   <table border="1">
     <tbody>
     	<tr>
       	<th width="20%">파라미터</th>
         <th>설명</th>
       </tr>
       <tr>
       	<td>이름</td>
          <td> PV의 이름. PV의 매니페스트 파일에서 <b>.metadata.name</b> 영역으로 지정됩니다.</td>
       </tr>
       <tr>
       	<td>상태</td>
         <td>
         	PV의 현재 상태. PV의 매니페스트 파일에서 영역 <b>.status.phase</b>로 지정되며, 다음을 포함합니다:
           <ul>
             <li><b>사용 가능</b>: PV를 사용할 수 있으며 아직 PVC에 바인딩되지 않았습니다.</li>
             <li><b>바운드</b>: PV가 PVC에 바인딩되었습니다.</li>
             <li><b>삭제 중</b>: PV가 삭제되고 있습니다.</li>
             <li><b>실패</b>: PV를 사용할 수 없습니다.</li>
           </ul>
         </td>
       </tr>
       <tr>
       	<td>용량</td>
         <td>PV의 용량. PV의 매니페스트 파일에서 <b>.spec.capacity.storage</b> 영역으로 지정됩니다.</td>
       </tr>
       <tr>
       	<td>접속 모드</td>
         <td>
          PV의 접속 모드. PV의 매니페스트 파일에 있는 <b>.spec.accessModes</b> 영역으로 지정되며, 다음을 포함합니다:
           <ul>
              <li><b>RWO</b>: PV는 단일 노드에 의해 읽기-쓰기로 마운트될 수 있습니다.</li>
              <li><b>ROX</b>: PV는 여러 노드에 의해 읽기 전용으로 마운트될 수 있습니다.</li>
              <li><b>RWX</b>: PV는 여러 노드에 의해 읽기-쓰기로 마운트될 수 있습니다.</li>
           </ul>
         </td>
       </tr>
       <tr>
       	<td>회수 정책</td>
         <td>
          PV의 회수 정책. PV의 매니페스트 파일에서 <b>.spec.persistentVolumeReclaimPolicy</b> 영역으로 지정되며, 다음을 포함합니다:
           <ul>
             <li><b>보유</b>: PVC가 삭제되더라도 PV는 여전히 존재하며, 수동 회수가 필요합니다.</li>
             <li><b>삭제</b>: 볼륨 플러그인 인프라에서 PV 및 관련 스토리지 자산을 모두 제거합니다.</li>
             <li><b>재활용</b>: PV의 데이터를 지우고 PV를 새 PVC에 다시 사용할 수 있도록 합니다.</li>
           </ul>
         </td>
       </tr>
       <tr>
       	<td>생성 시간</td>
         <td>PV가 생성된 시간.</td>
       </tr>
     </tbody>
   </table>

2. PV 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />를 클릭하면 다음을 수행할 수 있습니다:

   - **정보 편집**: PV의 정보를 편집.
   - **YAML 편집**: PV의 YAML 파일을 편집.
   - **삭제**: PV를 삭제. **바운드** 상태의 PV는 삭제할 수 없습니다.

### PV 세부 정보 페이지 보기

1. PV의 이름을 클릭하면 세부 정보 페이지로 이동합니다.

2. 상세 페이지에서 **정보 수정**을 클릭하여 PV의 기본 정보를 수정하세요.

3. **더 보기**를 클릭하면 다음을 수행할 수 있습니다.

   - **YAML 보기**: PV의 YAML 파일을 봅니다.
   - **삭제**: PV를 삭제하고 목록 페이지로 돌아갑니다. **바운드** 상태의 PV는 삭제할 수 없습니다.

4. PV가 바인딩된 PVC를 확인하려면 **리소스 상태** 탭을 클릭하세요.

5. PV의 레이블 및 주석을 보려면 **메타데이터** 탭을 클릭하세요.

6. PV의 이벤트를 보려면 **이벤트** 탭을 클릭하하세요.
