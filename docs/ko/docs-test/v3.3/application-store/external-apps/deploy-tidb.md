---
title: "Super Kubenetes에서 TiDB 오퍼레이터 및 TiDB 클러스터 배포"
keywords: 'Super Kubenetes, Kubernetes, TiDB, TiDB Operator, TiDB Cluster'
description: 'Learn how to deploy TiDB Operator and a TiDB Cluster on Super Kubenetes.'
linkTitle: "Deploy TiDB Operator and a TiDB Cluster"
weight: 14320
---

[TiDB](https://en.pingcap.com/)는 하이브리드 트랜잭션 및 분석 처리(HTAP) 워크로드를 지원하는 클라우드 기반, 오픈 소스 NewSQL 데이터베이스입니다. 수평 확장성, 강력한 일관성 및 고가용성을 제공합니다.

이 튜토리얼은 Super Kubenetes에서 TiDB 오퍼레이터 및 TiDB 클러스터를 배포하는 방법을 보여줍니다.

## 사전 준비

- 예약 가능한 노드가 3개 이상 있어야 합니다.
- [OpenPitrix 시스템](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. `ws-admin` 계정은 작업공간에서 `workspace-admin` 역할을 부여받아야 하며, `project-regular` 계정은 `operator` 역할로 프로젝트에 초대받아야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 실습실

### 1 단계: TiDB 오퍼레이터 CRD 설치

1. Super Kubenetes 웹 콘솔에 `admin`으로 로그인한 다음, 좌측 하단 모서리에 있는 **툴박스**에서 **Kubectl**를 사용하여, 다음 명령을 실행해 TiDB 오퍼레이터 CRD를 설치합니다.


  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl apply -f <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/pingcap/tidb-operator/v1.1.6/manifests/crd.yaml</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 예상되는 출력은 아래와 같습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									customresourcedefinition.apiextensions.k8s.io/tidbclusters.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/backups.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/restores.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/backupschedules.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/tidbmonitors.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/tidbinitializers.pingcap.com created
									customresourcedefinition.apiextensions.k8s.io/tidbclusterautoscalers.pingcap.com created
               </p>
            </code>
         </div>
      </pre>
   </article>

### 2 단계: 앱 저장소 추가

1. Super Kubenetes에 `ws-admin`으로 로그인합니다. 워크스페이스에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭합니다.

2. 표시된 대화 상자에서, 앱 저장소 이름으로 `pingcap`을 입력하고 PingCAP Helm 저장소 URL로 `https://charts.pingcap.org`을 입력합니다. **유효성 검사**를 클릭하여 URL을 확인하면, 사용 가능한 경우에 URL 옆으로 녹색 체크 표시를 확인할 수 있습니다. 
계속하려면 **확인**을 클릭하세요.

3. 저장소가 Super Kubenetes로 성공적으로 추가된 후 목록에 표시됩니다.

### 3 단계: TiDB 오퍼레이터 배포
 
1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. 프로젝트에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화상자에서, **앱 템플릿에서**을 선택하세요.

3. 드롭다운 목록에서 `pingcap`을 선택한 다음 **TiDB-오퍼레이터**를 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 튜토리얼에서는 TiDB 오퍼레이터 및 TiDB 클러스터를 배포하는 방법만 시연합니다. 필요에 따라 다른 도구를 배포할 수도 있습니다.
    </div>
  </div>

4. **차트 파일** 탭에서 콘솔에서 직접 설정을 확인하거나 오른쪽 상단의 아이콘을 클릭하여 기본 `values.yaml` 파일을 다운로드할 수 있습니다. **버전** 아래의 드롭다운 목록에서 버전 번호를 선택하고 **설치**를 클릭합니다.

5. **기본 정보** 페이지에서 앱 이름, 앱 버전, 배포 위치를 확인할 수 있습니다. 계속하려면 **다음**을 클릭하세요.

6. **앱 설정**에서 yaml 파일을 편집하거나 또는 곧바로 **설치**를 클릭할 수 있습니다.

7. TiDB 오퍼레이터가 실행될 때까지 기다리세요.

8. **워크로드**로 이동하면 TiDB 오퍼레이터용으로 생성된 모든 디플로이먼트 및 스테이트풀셋을 볼 수 있습니다.

### 4 단계: TiDB 클러스터 배포

TiDB 클러스터의 배포 과정은 TiDB Operator 배포와 비슷합니다.

1. **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하고, **앱 템플릿에서**을 선택하세요.

2. PingCAP 저장소에서 **TiDB-cluster**를 클릭하세요.

3. **차트 파일** 탭에서, 설정과 `values.yaml` 파일 다운로드를 확인할 수 있습니다. 계속하려면 **다음**을 클릭하세요.

4. **기본 정보** 페이지에서 앱 이름, 앱 버전, 배포 위치를 확인할 수 있습니다. 계속하려면 **다음**을 클릭하세요.

5. 가끔 TiDB 컴포넌트에는 [스토리지 클래스](../../../cluster-administration/storageclass/)가 필요합니다. 다음 명령을 실행하여 스토리지 클래스를 볼 수 있습니다.

  <article className="highlight">
    <pre style="background: rgb(36, 46, 66);">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
             <p>
                $ kubectl get sc
                NAME                       PROVISIONER     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
                csi-high-capacity-legacy   csi-cloud   Delete          Immediate           true                   71m
                csi-high-perf              csi-cloud   Delete          Immediate           true                   71m
                csi-ssd-enterprise         csi-cloud   Delete          Immediate           true                   71m
                csi-standard (default)     csi-cloud   Delete          Immediate           true                   71m
                csi-super-high-perf        csi-cloud   Delete          Immediate           true                   71m
                </p></code></div></pre>
  </article>

6. **앱 설정** 페이지에서, `storageClassName` 영역의 모든 기본값을 `local-storage`에서 자신의 스토리지 클래스 이름으로 변경하세요. 예를 들어, 위와 같은 출력값에 기반한 경우에는 `csi-standard`로 변경할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      오직 `storageClassName` 영역만 외부 퍼시스턴트 스토리지를 제공하도록 변경 가능합니다. 만약 [TiKV](https://docs.pingcap.com/tidb/dev/tidb-architecture#tikv-server) 및 [Placement Driver](https://docs.pingcap.com/tidb/dev/tidb-architecture#placement-driver-pd-server)와 같은 각각의 TiDB 컴포넌트를 개별 노드에 배포하고자 한다면, `nodeAffinity` 영역을 명기하세요.
    </div>
  </div>

7. **설치**를 클릭하면, 목록에서 두 앱을 확인할 수 있습니다.

### 5 단계: TiDB 클러스터 상태 확인

1. **애플리케이션 워크로드** 아래의 **워크로드**로 이동하여 모든 TiDB 클러스터 배포가 실행 중인지 확인합니다.

2. **스테이트풀셋** 탭으로 전환하면, TiDB, TiKV 및 PD가 실행되고 있는 것을 확인할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      TiKV 및 TiDB는 자동으로 생성되며 목록에 표시되기까지 다소 시간이 걸릴 수 있습니다.
    </div>
  </div>

3. 단일 스테이트풀셋을 클릭하여 세부 정보 페이지로 이동합니다. **모니터링** 탭에 들어가면 일정 기간에 대한 꺾은선 그래프에서 측정값을 볼 수 있습니다.

4. **애플리케이션 워크로드** 아래의 **파드**에서, TiDB 클러스터에 두 개의 TiDB 파드, 세 개의 TiKV 파드 그리고 세 개의 PD 파드가 포함된 것을 볼 수 있습니다.

5. **스토리지** 아래의 **퍼시스턴트 볼륨 클레임**에서는 TiKV와 PD가 영구 용량을 사용하고 있는 것을 볼 수 있습니다.

6. 영구 용량의 사용도 모니터링됩니다. 퍼시스턴트 볼륨을 클릭하여 세부 정보 페이지로 이동합니다.

7.  프로젝트의 **개요** 페이지에서 현재 프로젝트의 리소스 사용량 목록을 볼 수 있습니다.

### 6 단계: TiDB 클러스터 접속

1. **애플리케이션 워크로드** 아래의 **서비스**로 이동하면 모든 서비스의 상세 정보를 확인할 수 있습니다. 서비스 유형은 기본적으로 `NodePort`로 설정되어 있으므로, 클러스터 외부의 Node IP 주소를 통해 접속할 수 있습니다. 

2. TiDB는 Prometheus와 Grafana를 통합하여 데이터베이스 클러스터의 성능을 모니터링합니다. 예를 들어 `<NodeIP>:<NodePort>`를 통해 Grafana에 접속하여 측정값을 볼 수 있습니다.

   ![tidb-grafana](/dist/assets/docs/v3.3/appstore/external-apps/deploy-tidb-operator-and-cluster/tidb-grafana.PNG)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


