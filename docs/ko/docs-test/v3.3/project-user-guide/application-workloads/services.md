---
title: '서비스'
keywords: 'Super Kubenetes, Kubernetes, services, workloads'
description: 'Learn basic concepts of Services and how to create Services in Super Kubenetes.'
linkTitle: 'Services'
weight: 10240
---

서비스는 파드 집합에서 실행 중인 애플리케이션을 네트워크 서비스로 노출하는 추상적인 방법입니다. 즉, 서비스는 이러한 파드의 엔드포인트를, 다양한 방식으로 접속할 수 있는 단일 리소스로 그룹화합니다.

쿠버네티스를 사용하면 익숙하지 않은 서비스 디스커버리 메커니즘을 사용하기 위해 애플리케이션을 수정할 필요가 없습니다. 쿠버네티스는 파드에게 고유한 IP 주소와 파드 집합에 대한 단일 DNS 이름을 부여하고, 그것들 간에 로드-밸런스를 수행할 수 있습니다.

자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/services-networking/service/)를 참조하세요.

## 접속 유형

- **가상 IP**: 이것은 클러스터에서 생성한 고유 IP를 기반으로 합니다. 클러스터 내부에서 이 IP를 통해 서비스에 접속할 수 있습니다. 이 유형은 대부분의 서비스에 적합합니다. 그게 아니면, 클러스터 외부의 NodePort 및 LoadBalancer를 통해 서비스에 접속할 수도 있습니다.

- **헤드리스**: 클러스터는 서비스에 대한 IP 주소를 생성하지 않으며, 서비스는 클러스터 내 서비스의 백엔드 파드 IP를 통해 직접 접속됩니다. 이 유형은 마스터와 에이전트를 구분해야 하는 서비스와 같은, 백엔드 이기종 서비스에 적합합니다.

<div className="notices tip">
  <p>Tip</p>
  <div>
    Super Kubenetes에서 스테이트풀 및 스테이트리스 서비스는 기본적으로 가상 IP로 생성됩니다. 헤드리스 서비스를 생성하려면 **YAML**을 사용하여 직접 설정하세요.
  </div>
</div>

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 서비스 유형

Super Kubenetes는 서비스를 생성하는 세 가지 기본 방법인 **스테이트리스 서비스**, **스테이트풀 서비스**, **외부 서비스**를 제공합니다. 또한 **서비스 사용자 지정** 아래의 **워크로드 지정**과 ** YAML 편집**을 통해 서비스를 사용자 지정할 수도 있습니다.

- **상태 유지를 하지 않는(Stateless) 서비스**

  스테이트리스 서비스는 컨테이너 서비스에서 가장 일반적으로 사용되는 서비스입니다. 롤링 업데이트 및 롤백을 포함해, 파드 상태를 제어하는 파드 템플릿을 정의합니다. 스테이트리스 서비스를 생성할 때 **디플로이먼트** 워크로드도 생성됩니다. 스테이트리스 서비스에 대한 자세한 내용은 [디플로이먼트](../../application-workloads/deployments/)를 참조하십시오.

- **상태 유지가 필요한(Stateful) 서비스**

  스테이트풀 서비스는 스테이트풀 애플리케이션을 관리하는 데 사용되며, 질서 있고 정상적인 배포 및 확장을 보장합니다. 또한 안정적인 퍼시스턴트 스토리지 및 네트워크 식별자를 제공합니다. **스테이트풀셋** 워크로드는 스테이트풀 서비스를 생성할 때도 생성됩니다. 스테이트풀 서비스에 대한 자세한 내용은 [스테이트풀셋](../../application-workloads/statefulsets/)을 참조하세요.

- **외부 서비스**

  스테이트리스와 스테이트풀 서비스와는 다르게, 외부 서비스는 서비스를 셀렉터 대신 DNS 이름에 매핑합니다. YAML 파일에서 `externalName`으로 표시된 **외부 서비스 주소** 영역에 이러한 서비스를 지정해야 합니다.

- **워크로드 지정**

  기존 파드로 서비스를 생성하세요.

- **YAML 편집**

  YAML을 사용하여 직접 서비스를 만듭니다. 콘솔에서 YAML 설정 파일을 업로드 및 다운로드할 수 있습니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       `annotations:Super Kubenetes.io/serviceType` 키워드의 값은 `statelessservice`, `statefulservice`, `externalservice`, `None`으로 정의할 수 있습니다.
     </div>
   </div>

## 스테이트리스 서비스 생성

### 1단계: 대시보드 열기

1. 프로젝트의 **애플리케이션 워크로드** 아래의 **서비스**로 이동하여 **생성**을 클릭하세요.

2. **스테이트리스 서비스**를 클릭하세요.


    <div className="notices note">
      <p>Note</p>
      <div>
        스테이트풀 서비스와 스테이트리스 서비스를 만드는 단계는 기본적으로 동일합니다. 이 예제는 시연을 위해 스테이트리스 서비스를 생성하는 과정만 진행합니다.
      </div>
    </div>

### 2단계: 기본 정보 입력

1. 표시된 대화 상자에서 `v1`이 미리 채워진 **버전** 영역을 볼 수 있습니다. `demo-stateless`와 같이, 서비스 이름을 정의해야 합니다. 완료되면 **다음**을 클릭하여 계속하세요.

   - **이름**: 서비스와 디플로이먼트의 이름으로, 고유 식별자이기도 함.
   - **별칭**: 서비스의 별칭 이름으로, 리소스를 더 쉽게 식별할 수 있습니다.
   - **버전**: 소문자와 숫자만 포함할 수 있습니다. 최대 문자 길이는 16자로 설정됩니다.

  <div className="notices tip">
    <p>Tip</p>
    <div>
      오른쪽 상단에서 **YAML 편집**을 활성화하면, 디플로이먼트와 서비스의 매니페스트 파일을 볼 수 있습니다. 아래는 참조용 예제 파일입니다.
    </div>
  </div>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Deployment</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">xxx</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">xxx-v1</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">xxx</span> 
                <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">xxx</span> 
                <span>-</span><span>-</span><span>-</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Service</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">xxx</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">xxx</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">xxx</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

### 3단계: 파드 설정

서비스에 대한 컨테이너 이미지를 추가하려면 [파드 설정](../deployments/#step-3-set-a-pod)을 참조하세요.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       대시보드 속성 설명에 대한 자세한 내용은 [파드 설정](../container-image-settings/)을 직접 참조하십시오.
     </div>
   </div>

### 4단계: 볼륨 마운트

서비스에 대한 볼륨을 마운트하려면 자세한 내용은 [볼륨 마운트](../deployments/#step-4-mount-volumes)를 참조하십시오.

### 5단계: 고급 설정 구성

노드 스케줄링에 대한 정책을 설정하고 [디플로이먼트](../deployments/#step-5-configure-advanced-settings)에서 설명한 것과 동일한 메타데이터를 추가할 수 있습니다. 서비스의 경우 **외부 접속** 및 **고정 세션**의 두 가지 추가 옵션을 사용할 수 있습니다.

- 외부 접속

  NodePort와 LoadBalancer 두 가지 방법을 통해 서비스를 외부에 노출할 수 있습니다.

  - **NodePort**: 정적 포트에서 각 노드의 IP 주소에 서비스가 노출됩니다.

  - **LoadBalancer**: 클라이언트가 로드 밸런서의 IP 주소로 요청을 보냅니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 값은 `.spec.type`에 의해 지정됩니다. **LoadBalancer**를 선택하면 이에 대한 주석을 함께 추가해야 합니다.
    </div>
  </div>

- 고정 세션

  단일 클라이언트 세션에서 전송된 모든 트래픽을, 여러 레플리카에서 실행되는 동일한 앱 인스턴스로 라우팅할 수 있습니다. 이렇게 하면 대기 시간이 줄어들어 캐시를 더 잘 사용할 수 있습니다. 이러한 로드 밸런싱 동작을 고정 세션이라고 합니다.

  매니페스트 파일의 `.spec.sessionAffinityConfig.clientIP.timeoutSeconds`로 지정되는 이 영역에서 최대 세션 고정 시간을 설정할 수 있으며, 그 기본값은 10800입니다.

## 서비스 내용 확인

### 세부정보 페이지

1. 서비스를 생성한 후에는 오른쪽의 모듈을<!-- <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots.png" width="20pdown" alt=" icon" /> --> 클릭하여, 메타데이터(**이름** 제외), YAML, 포트 및 인터넷 접속 등의 추가 편집을 할 수 있습니다.

   - **정보 편집**: 기본 정보를 조회 및 편집.
   - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
   - **서비스 편집**: 접근 유형을 확인하고 셀렉터 및 포트를 설정.
   - **외부 접근 편집**: 서비스에 대한 외부 접근 방식을 수정.
   - **삭제**: 서비스를 삭제하면 관련 리소스가 표시됩니다. 그 리소스를 체크하면 서비스와 함께 삭제됩니다.

2. 서비스 이름을 클릭하면 세부 정보 페이지로 이동할 수 있습니다.

   - **더보기**를 클릭하여 서비스 목록에 있는 것과 동일한 드롭다운 메뉴를 확장합니다.
   - 파드 목록은 파드의 세부 정보(상태, 노드, 파드 IP 및 리소스 사용량)를 제공합니다.
   - 파드 항목을 클릭하면 컨테이너 정보를 볼 수 있습니다.
   - 컨테이너 로그 아이콘을 클릭하면 컨테이너의 출력 로그를 볼 수 있습니다.
   - 파드 이름을 클릭하면 파드 세부 정보 페이지를 볼 수 있습니다.

### 리소스 상태

1. 서비스 포트, 워크로드 및 파드에 대한 정보를 보려면 **리소스 상태** 탭을 클릭하세요.

2. <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/refresh.png" width="20px" alt="icon" /> 을 클릭하여 파드 정보를 새로 고침하고, <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/display.png" width="20px" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/hide.png" width="20px" />를 클릭하여 각 파드의 컨테이너를 표시/숨깁니다.

### 메타데이터

서비스의 레이블과 주석을 보려면 **메타데이터** 탭을 클릭하세요.

### 이벤트

서비스의 이벤트를 보려면 **이벤트** 탭을 클릭하세요.
