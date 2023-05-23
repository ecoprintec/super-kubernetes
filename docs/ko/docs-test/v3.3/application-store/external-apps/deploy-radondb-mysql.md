---
title: "Super Kubenetes에서  MySQL 오퍼레이터 및 RadonDB MySQL 클러스터 배포"
keywords: 'Super Kubenetes, Kubernetes, Deploy, RadonDB MySQL'
description: 'Learn how to deploy RadonDB MySQL Operator and RadonDB MySQL Cluster on Super Kubenetes.'
linkTitle: "Deploy RadonDB MySQL Operator and Cluster"
weight: 14350
---

[RadonDB MySQL](https://github.com/radondb/radondb-mysql-kubernetes)은 [MySQL](https://MySQL.org) 데이터베이스를 기반으로 하는 오픈 소스, 클라우드 기반의 고가용성 클러스터 솔루션입니다. Raft 프로토콜을 이용해 RadonDB MySQL은 트랜잭션 손실 없이 빠른 페일오버를 가능하게 합니다.

이 튜토리얼은 Super Kubenetes에서 MySQL 오퍼레이터 및 RadonDB MySQL 클러스터를 배포하는 방법을 보여줍니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.
- 외부 접속을 제공하려면 프로젝트에서 게이트웨이를 활성화해야 합니다. 아직 준비가 안됐다면 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

## 실습실

### 1 단계: 앱 저장소 추가

1. Super Kubenetes 웹 콘솔에 로그인합니다.

2. 워크스페이스에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭합니다.

3. 표시되는 대화 상자에서 앱 저장소 이름과 URL을 입력합니다.

   앱 저장소 이름으로 `radondb-mysql-operator`를 입력합니다.
   MeterSphere 저장소 URL에 'https://radondb.github.io/radondb-mysql-kubernetes/'를 입력합니다. **유효성 검사**을 클릭하여 URL을 확인합니다.

4. 사용 가능한 경우에 URL 옆으로 녹색 체크 표시를 확인할 수 있습니다. 계속하려면 **확인**을 클릭하세요.

   저장소가 Super Kubenetes로 성공적으로 추가된 후 목록에 표시됩니다.

![certify URL](/dist/assets/docs/v3.3/appstore/external-apps/deploy-radondb-mysql/certify_url.png)

### 2 단계: RadonDB MySQL 오퍼레이터 배포

1. `demo-project`에서 **애플리케이션 워크로드** 아래의 **앱**로 이동하고 **신규 앱 배포**을 클릭합니다.

2. 표시되는 대화 상자에서 **앱 템플릿에서**를 선택합니다.

3. 표시된 새 페이지에서, 드롭다운 목록의 'radondb-mysql-operator'를 선택합니다.

4. **clickhouse-cluster**를 클릭하고 RadonDB MySQL 오퍼레이터를 확인 및 설정합니다.

   **차트 파일** 탭에서 설정을 확인하거나 `.yaml` 파일을 편집할 수 있습니다.
   **버전** 목록에서 앱 버전을 확인하고 버전을 선택할 수 있습니다.


   ![operator configuration](/dist/assets/docs/v3.3/appstore/external-apps/deploy-radondb-mysql/operator_yaml.png)

5. **배포**를 클릭하고 **기본 정보** 페이지로 이동합니다.

   앱 이름, 앱 버전 및 배포 위치를 확인하세요.


6. **다음**을 클릭하여 **앱 구성** 페이지로 이동합니다.

   YAML 파일을 수정하여 사용자 지정 설정을 할 수 있습니다.

7. **배포**를 클릭하여 기본 설정을 사용합니다.

   잠시 후 앱이 ** 실행 중** 상태임을 확인할 수 있습니다.

### 3 단계: RadonDB MySQL 클러스터 배포

[RadonDB MySQL 템플릿](https://github.com/radondb/radondb-mysql-kubernetes/tree/main/config/samples)을 참조하여 클러스터를 배포하거나, yaml 파일을 수정하여 클러스터를 배포할 수 있습니다. 

`mysql_v1alpha1_mysqlcluster.yaml` 템플릿을 예제로 삼아 RadonDB MySQL 클러스터를 생성합니다.

1. 좌측 하단 모서리에 있는 망치 아이콘 위에 커서를 놓고 **Kubectl**을 선택합니다.

2. 다음 명령어를 실행하여 RadonDB MySQL 클러스터를 설치합니다.

   <article className="highlight">
      <pre style="background: rgb(36, 46, 66);">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/radondb/radondb-mysql-kubernetes/releases/latest/download/mysql_v1alpha1_mysqlcluster.yaml</a> --namespace=&lt;project_name&gt;
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         프로젝트를 지정하지 않으면 클러스터는 기본적으로 `Super Kubenetes-controls-system` 프로젝트에 설치됩니다. 프로젝트를 지정하려면 설치 명령에 `--namespace=<project_name>` 영역을 추가해야 합니다.
      </div>
   </div>

   설치가 성공했을 때 예상되는 출력은 아래와 같습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ kubectl apply <span style="color:#f92672">-f</span> https<span style="color:#960050;background-color:#1e0010">:</span>//github.com/radondb/radondb-mysql-kubernetes/releases/latest/download/mysql_v1alpha1_mysqlcluster.yaml --namespace=demo-project
                  mysqlcluster.mysql.radondb.com/sample created
               </p>
            </code>
         </div>
      </pre>
   </article>

3. 다음 명령을 실행하여 RadonDB MySQL 클러스터의 모든 서비스를 볼 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl get statefulset,svc
               </p>
            </code>
         </div>
      </pre>
   </article>

   **예상되는 출력**

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ kubectl get statefulset,svc
                  NAME                            READY   AGE
                  statefulset.apps/sample-mysql   3/3     10m
                  
                  NAME                           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
                  service/<span style="color:#66d9ef">default</span>-http-backend   ClusterIP   10.96.69.202    &lt;none&gt;        80/TCP     3h2m
                  service/sample-follower        ClusterIP   10.96.9.162     &lt;none&gt;        3306/TCP   10m
                  service/sample-leader          ClusterIP   10.96.255.188   &lt;none&gt;        3306/TCP   10m
                  service/sample-mysql           ClusterIP   None            &lt;none&gt;        3306/TCP   10m
               </p>
            </code>
         </div>
      </pre>
   </article>

### 4 단계: RadonDB MySQL 클러스터 상태 보기

1. `demo-project` 프로젝트에서 **애플리케이션 워크로드** 아래의 **서비스**로 이동하면 서비스 정보를 볼 수 있습니다.

2. **애플리케이션 워크로드** 아래의 **워크로드**에서 **스테이트풀셋** 탭을 클릭하면 스테이트풀셋이 실행 중인 것을 확인할 수 있습니다.

   단일 스테이트풀셋을 클릭하여 세부 정보 페이지로 이동합니다. **모니터링** 탭에서 일정 기간에 대한 꺾은선 그래프에서 측정값을 볼 수 있습니다.

3. **애플리케이션 워크로드** 아래의 **파드**에서 모든 파드가 실행 중임을 확인할 수 있습니다.

4. **스토리지** 아래의 **퍼시스턴트 볼륨 클레임**에서 ClickHouse 클러스터 컴포넌트가 퍼시스턴트 볼륨을 사용하고 있음을 확인할 수 있습니다.

   퍼시스턴트 볼륨 사용도 모니터링됩니다. 퍼시스턴트 볼륨을 클릭하여 세부 정보 페이지로 이동합니다.


### 5 단계: RadonDB MySQL 클러스터에 접속

다음은 Super Kubenetes 웹 콘솔에서 RadonDB MySQL에 접속하는 방법을 보여줍니다. 클러스터 외부에서 RadonDB MySQL에 접근하는 방법은 [RadonDB MySQL 오픈소스 프로젝트](https://github.com/radondb/radondb-mysql-kubernetes/)를 참조하시기 바랍니다

**방법 1**

`demo-project` 프로젝트 관리 페이지로 이동하여 터미널을 통해 RadonDB MySQL에 접속합니다.

1. **애플리케이션 워크로드** 아래의 **파드**로 이동합니다.

2. 파드 이름을 클릭하여 파드 관리 페이지로 이동합니다.

3. **리소스 상태**의 **컨테이너** 열에서 **mysql** 컨테이너의 터미널 아이콘을 클릭합니다.

4. 터미널 창에서 다음 명령을 실행하여 RadonDB MySQL 클러스터에 접속합니다.


![Access RadonDB MySQL](/dist/assets/docs/v3.3/appstore/external-apps/deploy-radondb-mysql/pod_terminal.png)

**방법 2**

좌측 하단 모서리에 있는 망치 아이콘 위에 커서를 놓고 **Kubectl**을 선택합니다.

다음 명령을 실행하여 RadonDB MySQL 클러스터에 접속합니다.

<article className="highlight">
   <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl exec -it &lt;pod_name&gt; -c mysql -n &lt;project_name&gt; -- mysql --user=&lt;user_name&gt; --password=&lt;user_password&gt;
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
   <p>Note</p>
   <div>
      위 명령에서 `sample-mysql-0`은 파드 이름이고 `demo-project`는 프로젝트 이름입니다. 자신 고유의 파드 이름, 프로젝트 이름, 사용자 이름 및 암호를 사용하세요.
   </div>
</div>

![Access RadonDB MySQL](/dist/assets/docs/v3.3/appstore/external-apps/deploy-radondb-mysql/kubectl_terminal.png)
