---
title: "Super Kubenetes에서 Litmus 배포"
tag: 'Super Kubenetes, Kubernetes, Applications, Chaos engineering, Chaos experiments, Litmus'
keywords: 'Litmus,LitmusChaos,Kubernetes,Helm,Super Kubenetes'
description: 'Learn how to deploy Litmus on Super Kubenetes and create chaos experiments.'
linkTitle: "Deploy Litmus on Super Kubenetes"
Weight: 14350
---

[Litmus](https://litmuschaos.io/)는 쿠버네티스 클러스터에서의 실패 테스트 시뮬레이션에 중점을 둔 오픈 소스, 클라우드 기반 카오스 엔지니어링 툴킷입니다. 개발자와 SRE가 클러스터와 프로그램의 취약성을 찾아 시스템의 견고성을 향상시키는 데 도움이 됩니다.

아키텍처에 대한 자세한 내용은 [Litmus 문서](https://litmusdocs-beta.netlify.app/docs/architecture/)를 참조하십시오.

<!-- ![](https://pek3b.qingstor.com/kubesphere-community/images/20210601004600.png) -->

이 튜토리얼은 Super Kubenetes에서 Litmus를 배포하는 방법을 보여줍니다.

## 사전 준비

- [Super Kubenetes 앱 스토어 (OpenPitrix)](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1 단계: 앱 저장소 추가
1. 워크스페이스에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭합니다.

2. 표시된 대화 상자에서, 앱 저장소 이름을 입력하고(예를 들어, `litmus`), 앱 저장소 URL로 `https://litmuschaos.github.io/litmus-helm/`을 입력합니다. **유효성 검사**를 클릭하여 URL을 확인하세요. 
계속하려면 **확인**을 클릭하세요.

3. 저장소가 Super Kubenetes로 성공적으로 가져와진 후 목록에 표시됩니다.

### 단계 2: Litmus 포털 배포
1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. 프로젝트에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화상자에서, **앱 템플릿에서**을 선택하세요.

   - **앱 스토어에서**: Super Kubenetes의 공식 앱 스토어에서 앱을 선택합니다.

   - **앱 템플릿에서**: 워크스페이스 앱 템플릿과 앱 저장소의 타사 Helm 앱 템플릿에서 앱을 선택합니다.

3. 드롭다운 목록에서 `litmus`를 선택한 다음 `litmus-2-0-0-beta`를 선택하세요.

4. 앱 정보와 차트 파일을 볼 수 있습니다. **버전** 아래에서 구체적인 버전을 선택하고 **설치**를 클릭하세요.

5. **기본 정보**에서 앱 이름을 설정합니다. 앱 버전 및 배포 위치를 확인한 후 **다음**을 클릭하세요.
   
6. **앱 설정**에서 yaml 파일을 편집하거나 또는 곧바로 **설치**를 클릭할 수 있습니다.
   
7. 앱을 성공적으로 생성되면 앱이 목록에 표시됩니다.
   
  <div className="notices note">
    <p>Note</p>
    <div>
      Litmus가 실행되기까지 시간이 걸릴 수 있습니다. 배포가 완료될 때까지 기다리십시오.    </div>
  </div>


### 3 단계: Litmus 포털 접속

1. **애플리케이션 워크로드** 아래의 **서비스**로 이동하여 `litmusportal-frontend-service`의 `NodePort`를 복사합니다.

2. 기본 사용자 이름과 비밀번호(`admin`/`litmus`)를 사용하여 `${NodeIP}:${NODEPORT}`를 통해 Litmus `포털`에 액세스할 수 있습니다.

   ![litmus-login-page](/dist/assets/docs/v3.3/appstore/external-apps/deploy-litmus/litmus-login-page.png)

   ![litmus-login-1](/dist/assets/docs/v3.3/appstore/external-apps/deploy-litmus/litmus-login-1.png)

<div className="notices note">
   <p>Note</p>
   <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다. 자신 고유의 `NodeIP`를 사용하세요.
   </div>
</div>


### 단계 4: 에이전트 배포 (선택사항)

Litmus `Agent`는 `Self-Agent`와 `External-Agent`로 분류할 수 있습니다. 기본적으로 Litmus가 설치된 클러스터는 `Self-Agent`로 자동 등록되며, `포털`은 기본적으로 `Self-Agent`에서 카오스 실험을 실행합니다.

<!-- ![](https://pek3b.qingstor.com/kubesphere-community/images/20210604162858.png) -->

External Agent를 배포하는 방법에 대한 자세한 사항은 [Litmus 문서](https://litmusdocs-beta.netlify.app/docs/agent-install)를 참조하십시오.

### 5 단계: 카오스 실험 생성

- **실험 1**

1. 클러스터에 테스트 응용 프로그램을 만들어야 합니다. 예를 들어 다음 명령을 사용하여 `nginx`를 배포할 수 있습니다.
   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									$ kubectl create deployment nginx --image<span style="color:#f92672">=</span>nginx --replicas<span style="color:#f92672">=</span><span style="color:#ae81ff">2</span> --namespace<span style="color:#f92672">=</span>default
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Litmus `포털`에 로그인한 다음, **워크플로우 예약**을 클릭하세요.

3. `Agent`(예시: `Self-Agent`)를 선택한 후,  **다음**을 클릭하세요.

4. **MyHub의 실험을 사용하여 새 워크플로우 만들기**를 선택합니다. 드롭다운 목록에서 **카오스 허브**를 선택한 후 **다음**을 클릭하세요.

5. 워크플로우의 이름을 설정합니다(예시: `pod-delete`). 또한 워크플로우에 대한 설명을 추가할 수도 있습니다. 
**다음**을 클릭하세요.

6. **새 실험 추가**를 클릭하여 워크플로우에 카오스 실험을 추가합니다. 
**다음**을 클릭하세요.

7. 실험(예시: `generic/pod-delete`)을 선택한 다음 **완료**를 클릭하세요.

8. 워크플로우에서 실험의 가중치를 조정할 지점을 선택합니다. **다음**을 클릭하세요.

9. **지금 예약**을 선택한 후 **다음**을 클릭하세요.

10. 워크플로우를 확인한 다음 **완료**를 클릭하세요.

    Super Kubenetes 콘솔에서 파드가 삭제되고 다시 생성되는 것을 볼 수 있습니다.

    리트머스 `포털`에서 실험이 성공한 것을 볼 수 있습니다.

    ![litmus-successful](/dist/assets/docs/v3.3/appstore/external-apps/deploy-litmus/litmus-successful.png)

    특정 워크플로 노드를 클릭하여 자세한 로그를 볼 수 있습니다.

    <!-- ![](https://pek3b.qingstor.com/kubesphere-community/images/20210604165915.png) -->


- **실험 2**

1. **실험 1**의 1~10단계를 수행하여 새로운 카오스 실험(`pod-cpu-hog`)을 만듭니다. 
   <!-- ![](https://pek3b.qingstor.com/kubesphere-community/images/20210604171414.png) -->

2. Super Kubenetes 콘솔에서 파드 CPU 사용량이 1코어에 가까운 것을 볼 수 있습니다.

- **실험 3**

1. `nginx` 복제본을 `1`로 설정합니다. 파드가 하나만 남아 있는 것과 파드 IP 주소를 볼 수 있습니다.

2. **실험 1**의 1~10단계를 수행하여 새로운 카오스 실험(`pod-network-loss`)을 만듭니다.
   <!-- ![](https://pek3b.qingstor.com/kubesphere-community/images/20210604174057.png) -->

   파드 IP 주소를 ping하여 패킷 손실률을 테스트할 수 있습니다.

   ![packet-loss-rate](/dist/assets/docs/v3.3/appstore/external-apps/deploy-litmus/packet-loss-rate.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      위의 실험은 파드에서 시행됩니다. 또한 노드 및 다른 쿠버네티스 컴포넌트를 실험할 수도 있습니다. 카오스 실험에 대한 자세한 내용은 [Litmus ChaosHub](https://hub.litmuschaos.io/)를 참조하십시오.
    </div>
  </div>
