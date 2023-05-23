---
title: 워크스페이스, 프로젝트, 사용자 및 역할 생성
keywords: 'Super Kubenetes, Kubernetes, Multi-tenant, Workspace, User, Role, Project'
description: 'Take advantage of the multi-tenant system of Super Kubenetes for fine-grained access control at different levels.'
linkTitle: 'Create Workspaces, Projects, Users and Roles'
weight: 2300
---

이 빠른 시작에서는 다른 자습서에 필요한 워크스페이스, 역할 및 사용자를 만드는 방법을 보여줍니다. 또한, 워크로드가 실행되는 작업 공간 내에서 프로젝트 및 DevOps 프로젝트를 생성하는 방법을 배우게 됩니다. 이 튜토리얼을 읽고 나면 Super Kubenetes의 멀티 테넌트 관리 시스템에 익숙해질 것입니다.

## 사전 요구 사항

Super Kubenetes가 컴퓨터에 설치되어 있어야 합니다.

## 아키텍처

Super Kubenetes의 멀티 테넌트 시스템은 클러스터, 워크스페이스 및 프로젝트의 **3**단계 계층 구조를 특징으로합니다. Super Kubenetes의 프로젝트는 쿠버네티스 [네임스페이스](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)입니다.

시스템 리소스가 실행 중이고 대부분이 볼 수만 있는 시스템 워크스페이스를 사용하는 대신 작업할 새 [워크스페이스](../../workspace-administration/what-is-workspace/)을 만들어야 합니다. 또한 보안 고려 사항을 위해 작업 공간에서 서로 다른 테넌트가 해당 역할을 수행하는 것이 좋습니다.

Super Kubenetes 클러스터 내에 여러 개의 워크스페이스를 만들 수 있고, 각 워크스페이스 아래에서 여러 프로젝트를 생성할 수도 있습니다. 각 수준에는 여러 개의 기본 제공 역할이 있습니다. 또한 Super Kubenetes를 사용하면 사용자 지정 권한으로 역할을 생성할 수 있습니다. Super Kubenetes 계층 구조는 팀이나 그룹이 다르고 각 팀 내에서 역할이 다른 엔터프라이즈 사용자에게 적용할 수도 있습니다.

## 가이드

### 1단계 : 사용자 생성

Super Kubenetes가 설치된 후에는 다양한 리소스에서 다양한 수준에서 작업할 수 있도록 다양한 역할을 가진 다양한 사용자를 플랫폼에 추가해야 합니다. 처음에는 `platform-admin`역할을 부여받은 기본 사용자 `admin` 한 명만 있습니다. 첫 번째 단계에서는 샘플 사용자 `user-manager`를 생성하고 `user-manager`로 더 많은 사용자를 만듭니다.

1. 기본 사용자와 비밀번호를 사용하여 `admin`으로 웹 콘솔에 로그인합니다.(`admin/P@88w0rd`)

   <div className="notices tip">
     <p>팁</p>
     <div>
          계정 보안을 위해 콘솔에 처음 로그인할 때 암호를 변경하는 것이 좋습니다. 비밀번호를 변경하려면 오른쪽 상단의 드롭다운 목록에서 **사용자 설정**을 선택하세요. **비밀번호 설정**에서 새 비밀번호를 설정합니다. **사용자 설정**에서 콘솔 언어를 변경할 수도 있습니다.
     </div>
   </div>

2. 왼쪽 상단의 **플랫폼**을 클릭한 다음 **접근 제어**를 선택합니다. 왼쪽 탐색 창에서 **플랫폼 역할**을 선택합니다. 다음 표와 같이 4가지 기본 제공 역할이 있습니다.

   <table>
     <tbody>
       <tr>
         <th width='180'>기본 제공 역할</th>
         <th>설명</th>
       </tr>
       <tr>
         <td><code>workspaces-manager</code></td>
         <td>플랫폼의 모든 워크스페이스를 관리할 수 있는 워크스페이스 관리자입니다.</td>
       </tr>
       <tr>
         <td><code>users-manager</code></td>
         <td>플랫폼의 모든 사용자를 관리할 수 있는 사용자 관리자입니다.</td>
       </tr>
       <tr>
         <td><code>platform-regular</code></td>
         <td>워크스페이스 또는 클러스터에 참여하기 전에 리소스에 대한 액세스 권한이 없는 일반 사용자입니다.</td>
       </tr>
       <tr>
         <td><code>platform-admin</code></td>
         <td>플랫폼의 모든 리소스를 관리할 수 있는 관리자입니다.</td>
       </tr>
     </tbody>
   </table>

  <div className="notices note">
    <p>노트</p>
    <div>
      기본 제공 역할은 Super Kubenetes에서 자동으로 생성되며 편집하거나 삭제할 수 없습니다.
    </div>
  </div>
   
3. **사용자**에서 **생성**를 클릭합니다. 표시된 대화 상자에서 필요한 모든 정보(*로 표시)를 제공하고 **플팻폼 역할**에서 `users-manager`를 선택합니다.

완료 후 **확인**을 클릭합니다. 새 사용자는 **사용자** 페이지에 표시됩니다.

4. 콘솔에서 로그아웃했다가 사용자 `user-manager`로 다시 로그인하여 다른 튜토리얼에서 사용할 4명의 사용자를 만듭니다.

   <div className="notices tip">
     <p>팁</p>
     <div>
       - 로그아웃하려면 오른쪽 상단에서 사용자 이름을 클릭하고 **로그아웃**을 선택합니다.
       - 다음 사용자 이름은 예시입니다. 필요한 경우 변경할 수 있습니다.
     </div>
   </div>

   <table>
     <tbody>
       <tr>
         <th width='140'>사용자</th>
         <th width='180'>할당된 플랫폼 역할</th>
         <th>사용자 권한</th>
       </tr>
       <tr>
         <td><code>ws-manager</code></td>
         <td><code>workspaces-manager</code></td>
         <td>모든 워크스페이스를 만들고 관리합니다.</td>
       </tr>
       <tr>
         <td><code>ws-admin</code></td>
         <td><code>platform-regular</code></td>
         <td>워크스페이스에 초대된 후 워크스페이스의 모든 리소스를 관리합니다.(이 사용자는 이 예에서 워크스페이스에 새 구성원을 초대하는 데 사용됨)</td>
       </tr>
       <tr>
         <td><code>project-admin</code></td>
         <td><code>platform-regular</code></td>
         <td>프로젝트 및 DevOps 프로젝트를 생성 및 관리하고 프로젝트에 새 구성원을 초대합니다.</td>
       </tr>
       <tr>
         <td><code>project-regular</code></td>
         <td><code>platform-regular</code></td>
         <td><code>project-regular</code>는 <code>project-admin</code>가 프로젝트 또는 DevOps 프로젝트에 초대합니다. 이 사용자는 지정된 프로젝트에서 워크로드, 파이프라인 및 기타 리소스를 생성하는 데 사용됩니다.</td>
       </tr>
     </tbody>
   </table>

5. **사용자** 페이지에서 생성된 4명의 사용자를 확인합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      사용자 이름 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" /> 아이콘을 클릭하여 사용자를 활성화하거나 비활성화할 수 있습니다. 또한 일괄적으로 사용자를 비활성화 및 활성화할 수 있습니다.
    </div>
  </div>

### 2단계 : 워크스페이스 생성

이 단계에서는 이전 단계에서 생성한 사용자 `ws-manager`를 사용하여 워크스페이스를 생성합니다. 프로젝트, DevOps 프로젝트 및 조직 구성원 관리를 위한 기본 논리 단위인 워크스페이스는 Super Kubenetes의 멀티 테넌트 시스템을 뒷받침합니다.

1. Super Kubenetes에 `ws-manager`로 로그인합니다. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **접근 제어**를 선택합니다. **워크스페이스**에서는 시스템 관련 구성요소와 서비스가 실행되는 기본 작업 공간 `system-workspace`이 하나만 있음을 알 수 있습니다. 이 워크스페이스는 삭제할 수 없습니다.

2. 오른쪽의 **생성**을 클릭하고 새 작업 공간의 이름(예 : `demo-workspace`)을 설정하고 사용자 `ws-admin`을 작업 공간 관리자로 설정합니다. 완료한 후 **생성**을 클릭합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      [멀티 클러스터 기능]()<!-- (../../multicluster-management/) -->을 활성화한 경우 클러스터에서 프로젝트를 생성할 수 있도록 워크스페이스에 [사용 가능한 클러스터나 멀티 클러스터를 할당](../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/#select-available-clusters-when-you-create-a-workspace)해야 합니다.
    </div>
  </div>

3. 콘솔에서 로그아웃 하고 `ws-admin`으로 다시 로그인합니다. **워크스페이스 설정**에서 **워크스페이스 멤버**를 선택하고 **초대**를 클릭합니다.

4. 워크스페이스에 `project-admin`과 `project-regular`를 모두 초대합니다. 각각 `workspace-self-provisioner` 및 `workspace-viewer` 역할을 할당하고 **확인**을 클릭합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      실제 역할 이름은 `<워크스페이스 이름>-<역할 이름>`과 같은 명명 규칙을 따릅니다. 예를들어, `demo-workspace`라는 작업 공간에서 `viewer` 역할의 실제 역할 이름은 `demo-workspace-viewer`입니다.
    </div>
  </div>

5. 작업 공간에 `project-admin`과 `project-regular`를 모두 추가한 후 **확인**을 클릭합니다. **워크스페이스 멤버**에서 3명의 구성원이 나열되는 것을 볼 수있습니다.

   <table>
     <tbody>
       <tr>
         <th width='150'>사용자</th>
         <th width='200'>할당된 워크스페이스 역할</th>
         <th>역할 권한</th>
       </tr>
       <tr>
         <td><code>ws-admin</code></td>
         <td><code>demo-workspace-admin</code></td>
         <td>워크스페이스 아래의 모든 리소스를 관리합니다.(이 사용자로 워크스페이스에 새 구성원 초대합니다.)</td>
       </tr>
       <tr>
         <td><code>project-admin</code></td>
         <td><code>demo-workspace-self-provisioner</code></td>
         <td>프로젝트 및 DevOps 프로젝트를 생성 및 관리하고 프로젝트에 참여할 새 구성원을 초대합니다.</td>
       </tr><tr>
         <td><code>project-regular</code></td>
         <td><code>demo-workspace-viewer</code></td>
       <td><code>project-admin</code>가 <code>project-regular</code>를 프로젝트 또는 DevOps 프로젝트에 참여하도록 초대할 수 있습니다. 이 사용자는 워크로드, 파이프라인 등을 생성하는 데 사용할 수 있습니다.</td>
       </tr>
     </tbody>
   </table>

### 3단계 : 프로젝트 생성

이 단계에서는 이전 단계에서 생성한 사용자 `project-admin`을 사용하여 프로젝트를 생성합니다. Super Kubenetes의 프로젝트는 리소스에 대한 가상 격리를 제공하는 쿠버네티스의 네임스페이스와 동일합니다. 자세한 내용은 [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)를 참고하십시오.

1. Super Kubenetes에 `project-admin`으로 로그인합니다. **프로젝트**에서 **생성**을 클릭합니다.

2. 프로젝트 이름(예 : `demo-project`)를 입력하고 **확인**을 클릭합니다. 프로젝트에 대한 별칭과 설명을 추가할 수도 있습니다.

3. **프로젝트**에서 지금 생성된 프로젝트를 클릭하면 세부 정보를 볼 수 있습니다.

4. 프로젝트의 **개요**페이지에서 프로젝트 할당량은 기본적으로 설정되지 않은 상태로 유지됩니다. **할당량 편집**을 클릭하고 필요에 따라 [리소스 요청 및 제한](../../workspace-administration/project-quotas/)을 지정할 수 있습니다.(예 : CPU 1 core, memory 1000Gi)

5. 이 프로젝트에 `project-regular`를 초대하고 이 사용자에게 `operator`역할을 부여합니다.

  <div className="notices info">
    <p>정보</p>
    <div>
      사용자에게 부여된 역할 `operator`는 프로젝트의 사용자 및 역할 이외의 리소스를 관리할 수 있는 프로젝트 관리자입니다.
    </div>
  </div>
  
6. 쿠버네티스에서 [경로](../../project-user-guide/application-workloads/routes/)([Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/))를 만들기 전에 이 프로젝트의 게이트웨이를  활성화 해야합니다. 게이트웨이는 프로젝트에서 실행되는 [NGINX Ingress controller](https://github.com/kubernetes/ingress-nginx)입니다. 게이트웨이를 설정하려면 **프로젝트 설정**의 **게이트웨이 설정**으로 이동하여 **게이트웨이 활성화**를 클릭합니다. 사용자 `project-admin`은 이 단계에서 계속 사용됩니다.

7. 엑세스 방법 **NodePort**를 선택하고 **확인**을 클릭합니다.

8. **프로젝트 게이트웨이** 아래 목록에서 http 및 https의 게이트웨이 주소와 NodePort를 얻을 수 있습니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      `LoadBalancer` 유형을 사용하여 서비스를 노출하려면 클라우드 제공업체의 LoadBalancer 플러그인을 사용해야 합니다. 쿠버네티스 클러스터가 베어메탈 환경에서 실행 중인 경우 [OpenELB](https://openelb.io/)를 LoadBalancer 플러그인으로 사용하는 것이 좋습니다.
    </div>
  </div>

### 4단계 : 역할 생성

위의 단계를 완료한 후에는 사용자에게 다른 수준에서 다른 역할을 부여할 수 있다는 것을 알게 됩니다. 이전 단계에서 사용된 역할은 모두 Super Kubenetes에서 생성한 기본 제공 역할입니다. 이 단계에서는 작업의 요구 사항을 충족하기 위해 사용자 지정 역할을 정의하는 방법을 배웁니다.

1. Super Kubenetes 웹 콘솔에 다시 `admin`으로 로그인하고 **엑세스 제어**로 이동합니다.

2. 왼쪽 탐색 창에서 **플랫폼 역할**을 클릭한 다음 오른쪽에서 **생성**을 클릭합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      **플랫폼 역할** 페이지에서 사전 설정된 역할은 편집 및 삭제할 수 없습니다.
    </div>
  </div>

3. **플랫폼 역할 생성** 대화상자에서 이름(예 : `clusters-admin`), 별칭 및 역할 설명을 설정하고 **권한 편집**을 클릭합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      이 예시는 클러스터 관리를 담당하는 역할을 만드는 방법을 보여줍니다.
    </div>
  </div>

4. **권한 편집** 대화 상자에서 역할 권한을 설정하고(예 : **클러스터 관리** 선택) **확인**을 클릭합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      * 이 예에서 `clusters-admin` 역할에는 **클러스터 관리** 및 **클러스터 보기** 권한이 포함되어 있습니다.
      * 일부 권한은 상호 의존적입니다. 종속성은 각 권한 아래의 **Depends on** 필드에 의해 지정됩니다.
      * 권한이 선택되면 종속된 권한이 자동으로 선택됩니다.
      * 권한의 선택을 취소하려면 먼저 하위 권한을 선택 해제해야 합니다.
    </div>
  </div>

5. **플랫폼 역할** 페이지에서 생성된 역할의 이름을 클릭하여 역할 세부 정보를 보고 <img src="/dist/assets/docs/v3.3/quickstart/create-workspaces-projects-accounts/operation-icon.png" width="20px" alt="icon" align="center"> 역할을 편집하거나 역할 권한을 편집하거나 역할을 삭제합니다.

6. **사용자** 페이지에서 사용자를 생성하거나 기존 사용자를 편집할 때 사용자에게 역할을 할당할 수 있습니다.

### 5단계 : DevOps 프로젝트 생성 (선택 사항)

  <div className="notices note" style="margin-left:32px">
    <p>노트</p>
    <div>
      DevOps 프로젝트를 생성하려면 CI/CD 파이프라인, 바이너리-이미지, 소스-이미지 등을 제공하는 플러그형 구성 요소인 Super Kubenetes DevOps 시스템을 미리 설치해야 합니다. DevOps를 활성화하는 방법에 대한 자세한 내용은 Super Kubenetes [DevOps 시스템](../../pluggable-components/devops/)을 참고하십시오.</div></div>

1. 콘솔에 `project-admin`으로 로그인 합니다. **DevOps 프로젝트**에서 **생성**을 클릭합니다.

2. DevOps 프로젝트 이름(예 : `demo-devops`)를 입력하고 **확인**을 클릭합니다. 프로젝트에 대한 별칭과 설명을 추가할 수도 있습니다.

3. **DevOps 프로젝트**에서 지금 생성된 프로젝트를 클릭하면 자세한 정보를 볼 수 있습니다.

4. **프로젝트 관리**로 이동하여 **프로젝트 멤버**를 선택합니다.**초대**를 클릭하여 사용자 `project-regular`를 초대하고 파이프라인 및 자격 증명을 생성할 수 있는 `operator`역할을 부여합니다.

이제 Super Kubenetes의 다중 테넌트 관리 시스템에 익숙해졌습니다. 다른 자습서에서는 사용자 `project-regular`를 사용하여 프로젝트 또는 DevOps 프로젝트에서 애플리케이션 및 리소스를 만드는 방법을 보여줍니다.
