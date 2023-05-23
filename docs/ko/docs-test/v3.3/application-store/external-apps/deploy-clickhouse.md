---
title: "ClickHouse 오퍼레이터 및 ClickHouse 클러스터 배포"
keywords: 'Super Kubenetes, Kubernetes, ClickHouse, ClickHouse Operator, ClickHouse Cluster'
description: 'Learn how to deploy ClickHouse Operator and a ClickHouse Cluster on Super Kubenetes.'
linkTitle: "Deploy RadonDB ClickHouse Operator and Cluster"
weight: 14340
---

[ClickHouse](https://clickhouse.tech/)는 쿼리의 온라인 분석 처리(OLAP)를 위한 컬럼 지향 데이터베이스 관리 시스템(DBMS)입니다. [RadonDB ClickHouse](https://github.com/radondb/radondb-clickhouse-kubernetes)는 ClickHouse 클러스터 기능을 유지 관리하고 자동화된 클러스터 관리, 클러스터 내 데이터 재배포, 더 적은 비용으로 우수한 성능을 제공하는 심층 맞춤형 ClickHouse 클러스터 애플리케이션입니다.

이 튜토리얼은 Super Kubenetes에서 ClickHouse 오퍼레이터 및 ClickHouse 클러스터를 배포하는 방법을 보여줍니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. `ws-admin` 계정은 작업공간에서 `workspace-admin` 역할을 부여받아야 하며, `project-regular` 계정은 `operator` 역할로 프로젝트에 초대받아야 합니다. 이 튜토리얼은 시연을 위해 `demo-workspace`와 `demo-project`를 사용합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.
- 외부 접속을 제공하려면 프로젝트에서 게이트웨이를 활성화해야 합니다. 아직 준비가 안됐다면 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

## 실습실

### 1 단계: ClickHouse 오퍼레이터 배포

1. Super Kubenetes 웹 콘솔에 `admin`으로 로그인한 다음, 좌측 하단 모서리에 있는 **툴박스**에서 **Kubectl**를 사용하여, 다음 명령을 실행해 ClickHouse 오퍼레이터를 설치합니다. 클러스터에서 사용 가능한 워커 노드가 두 개 이상 있는 것이 좋습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									$ kubectl apply -f <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/radondb/radondb-clickhouse-kubernetes/master/clickhouse-operator-install.yml</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이 명령은 네임스페이스 `kube-system`에 ClickHouse 오퍼레이터를 설치합니다. 따라서 ClickHouse 오퍼레이터는 쿠버네티스 클러스터에 한 번만 설치하면 됩니다.
    </div>
  </div>


2. 설치가 성공하면 아래와 같은 출력을 볼 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									$ kubectl apply <span style="color:#f92672">-f</span> https<span style="color:#960050;background-color:#1e0010">:</span>//raw.githubusercontent.com/radondb/radondb-clickhouse-kubernetes/main/clickhouse-operator-install.yml
									customresourcedefinition.apiextensions.k8s.io/clickhouseinstallations.clickhouse.radondb.com created
									customresourcedefinition.apiextensions.k8s.io/clickhouseinstallationtemplates.clickhouse.radondb.com created
									customresourcedefinition.apiextensions.k8s.io/clickhouseoperatorconfigurations.clickhouse.radondb.com created
									serviceaccount/clickhouse-operator created
									clusterrole.rbac.authorization.k8s.io/clickhouse-operator-kube-system created
									clusterrolebinding.rbac.authorization.k8s.io/clickhouse-operator-kube-system created
									configmap/etc-clickhouse-operator-files created
									configmap/etc-clickhouse-operator-confd-files created
									configmap/etc-clickhouse-operator-configd-files created
									configmap/etc-clickhouse-operator-templatesd-files created
									configmap/etc-clickhouse-operator-usersd-files created
									deployment.apps/clickhouse-operator created
									service/clickhouse-operator-metrics created
               </p>
            </code>
         </div>
      </pre>
   </article>
   
3. 다음 명령을 실행하여 ClickHouse 오퍼레이터의 리소스 상태를 볼 수 있습니다.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									$ kubectl get all --selector<span style="color:#f92672">=</span>app<span style="color:#f92672">=</span>clickhouse-operator -n kube-system
               </p>
            </code>
         </div>
      </pre>
   </article>

   예상되는 출력:

   <article className="highlight">
      <pre style="background: rgb(36, 46, 66);">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									NAME                                      READY   STATUS    RESTARTS   AGE
									pod/clickhouse-operator-6b8494c8f-tmkmn   2/2     Running   0          6m34s

									NAME                                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
									service/clickhouse-operator-metrics   ClusterIP   10.233.51.66   &lt;none&gt;        8888/TCP   6m34s

									NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
									deployment.apps/clickhouse-operator   1/1     1            1           6m34s

									NAME                                            DESIRED   CURRENT   READY   AGE
									replicaset.apps/clickhouse-operator-6b8494c8f   1         1         1       6m34s
               </p>
            </code>
         </div>
      </pre>
   </article>

### 2 단계: 앱 저장소 추가

1. Super Kubenetes에서 로그아웃하고 `ws-admin`으로 재로그인 합니다. `demo-workspace`에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭합니다.

2. 표시되는 대화 상자에서, 앱 저장소 이름으로 `clickhouse`를 입력하고 앱 저장소 URL로 `https://radondb.github.io/radondb-clickhouse-kubernetes/`를 입력합니다. **유효성 검사**를 클릭하여 URL을 확인하면, 사용 가능한 경우에 URL 옆으로 녹색 체크 표시를 확인할 수 있습니다. 
계속하려면 **확인**을 클릭하세요.

3. 저장소가 Super Kubenetes로 성공적으로 추가된 후 목록에 표시됩니다.

### 3 단계: ClickHouse 클러스터 배포

1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. `demo-project`에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화상자에서, **앱 템플릿에서**을 선택하세요.

3. 표시된 새 페이지에서, 드롭다운 목록의 **clickhouse**를 선택한 다음 **clickhouse-cluster**를 클릭하세요.

4. **차트 파일** 탭에서 설정을 볼 수 있으며 `values.yaml`파일을 다운받을 수 있습니다. 계속하려면 **설치**를 클릭하세요.

5. **기본 정보** 페이지에서 앱 이름, 앱 버전, 배포 위치를 확인합니다. 계속하려면 **다음**을 클릭하세요.

6. **앱 설정** 탭에서 YAML 파일을 수정하여 사용자 지정 설정을 할 수 있습니다. 이 튜토리얼에서는 **설치**를 클릭하여 기본 설정을 사용합니다.

7. 잠시 후 앱이 **실행 중** 상태임을 확인할 수 있습니다.

### 4 단계: ClickHouse 클러스터 상태 보기

1. **애플리케이션 워크로드** 아래의 **워크로드**에서 **스테이트풀셋** 탭을 클릭하면 스테이트풀셋이 실행 중인 것을 확인할 수 있습니다.

2. 단일 스테이트풀셋을 클릭하여 세부 정보 페이지로 이동합니다. **모니터링** 탭에 들어가면 일정 기간에 대한 꺾은선 그래프에서 측정값을 볼 수 있습니다.

3. **애플리케이션 워크로드** 아래의 **파드**에서는 실행 중인 모든 파드들을 확인할 수 있습니다.

4. **스토리지** 아래의 **퍼시스턴트 볼륨 클레임**에서는 PostgreSQL 클러스터 컴포넌트가 퍼시스턴트 볼륨을 사용하고 있는 것을 볼 수 있습니다.

5. 퍼시스턴트 볼륨 사용도 모니터링됩니다. 퍼시스턴트 볼륨을 클릭하여 세부 정보 페이지로 이동합니다.

6. 프로젝트의 **개요** 페이지에서 현재 프로젝트의 리소스 사용량 목록을 볼 수 있습니다.

### 5 단계: ClickHouse 클러스터 접속

1. Super Kubenetes에서 로그아웃 하고 `admin`으로 재로그인 합니다. 좌측 하단 모서리에 있는 망치 아이콘 위에 커서를 놓고 **Kubectl**을 선택합니다.

2. 나타나는 창에서 다음 명령을 실행한 다음 ClickHouse 클러스터의 사용자 이름과 암호로 이동합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									$ kubectl edit chi clickho-749j8s -n demo-project
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![get-username-password](/dist/assets/docs/v3.3/appstore/external-apps/deploy-clickhouse/get-username-password.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      위 명령에서 `clickho-749j8s`는 ClickHouse 애플리케이션 이름이고 `demo-project`는 프로젝트 이름입니다. 자기 고유의 애플리케이션 이름과 프로젝트 이름을사용하세요.
    </div>
  </div>


3. 아래 명령을 실행하여 ClickHouse 클러스터에 접속한 다음, `show database`와 같은 명령어를 사용하여 클러스터와 상호 작용할 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">ubectl
            <code>
               <p>
									$ kubectl exec -it chi-clickho-749j8s-all-nodes-0-0-0 -n demo-project -- clickhouse-client --user<span style="color:#f92672">=</span>clickhouse --password<span style="color:#f92672">=</span>c1ickh0use0perator
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![use-clickhouse](/dist/assets/docs/v3.3/appstore/external-apps/deploy-clickhouse/use-clickhouse.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      위 명령에서 `chi-clickho-749j8s-all-nodes-0-0-0`은 파드 이름이며 **애플리케이션 워크로드** 아래의 **파드**에서 찾을 수 있습니다. 자기 고유의 파드 이름, 프로젝트 이름, 사용자 이름 및 암호를 사용하세요.
    </div>
  </div>

