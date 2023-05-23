---
title: "트래픽 미러링"
keywords: 'Super Kubenetes, Kubernetes, Traffic Mirroring, Istio'
description: 'Learn how to conduct a traffic mirroring job on Super Kubenetes.'
linkTitle: "Traffic Mirroring"
weight: 10540
---

섀도잉이라고도 하는 트래픽 미러링은 라이브 트래픽의 복사본을 미러링 중인 서비스로 보내면서 앱 버전을 테스트하는 강력하고 위험이 없는 방법입니다. 즉, 문제를 미리 감지할 수 있도록 수락 테스트를 위한 유사한 설정을 구현합니다. 미러링된 트래픽은 기본 서비스에 대한 중요 요청 경로의 대역 외에서 발생하므로, 최종 사용자는 전체 프로세스 동안 영향을 받지 않습니다.

## 사전 준비

- [Super Kubenetes 서비스 메시](../../../pluggable-components/service-mesh/)를 활성화해야 합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- **애플리케이션 거버넌스**를 활성화해야하고 앱의 트래픽을 미러링하기 위해 사용 가능한 앱이 있어야 합니다. 이 튜토리얼에서 사용하는 샘플 앱은 Bookinfo입니다. 자세한 내용은 [Bookinfo 배포 및 트래픽 관리](../../../quick-start/deploy-bookinfo-to-k8s/)를 참조하세요.

## 트래픽 미러링 작업 생성

1. Super Kubenetes에 `project-regular`로 로그인하고 **그레이스케일 릴리스**로 이동합니다. **릴리스 모드**에서 **트래픽 미러링** 오른쪽의 **생성**을 클릭하세요.

2. 이름을 설정하고 **다음**을 클릭하세요.

3. **서비스 설정** 탭의 드롭다운 목록에서 앱을 선택하고, 트래픽을 미러링할 서비스를 선택하세요. 샘플 앱 Bookinfo를 사용하는 경우 **리뷰**를 선택하고 **다음**을 클릭하세요.

4. **새 버전 설정** 탭에서 다른 버전(예: `Super Kubenetes/examples-bookinfo-reviews-v2:1.16.2`; `v1`을 `v2`로 변경)을 추가하고 **다음**을 클릭하세요. 

5. **전략 설정** 탭에서 **생성**을 클릭하세요.

6. 생성된 트래픽 미러링 작업은 **릴리스 잡** 탭 아래에 표시됩니다. 클릭하면 세부내용을 볼 수 있습니다.

7. 트래픽이 `v2`로 미러링되고 실시간 트래픽이 꺾은선형 차트로 표시되는 것을 볼 수 있습니다.

8. 새로운 **디플로이먼트**도 생성됩니다.

9. 다음 명령을 실행하여 가상 서비스에서 `mirror`와 `weight`를 볼 수 있도록 할 수 있습니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              kubectl -n demo-project get virtualservice -o yaml
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - 위의 명령어를 실행할 때 `demo-project`를 자신의 프로젝트 이름(즉, 네임스페이스)으로 바꾸세요.
      - Super Kubenetes 콘솔의 web kubectl에서 명령을 실행하려면 `admin` 사용자를 사용해야 합니다.
    </div>
  </div> 


10. 예상 출력:

       <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
								&nbsp;... 
								&nbsp;spec: 
								  &nbsp;hosts: 
								  &nbsp;- reviews 
								  &nbsp;http: 
								  &nbsp;- route: 
								    &nbsp;- destination: 
								        &nbsp;host: reviews 
								        &nbsp;port: 
								          &nbsp;number: <span style="color:#ae81ff">9080</span> 
								        &nbsp;subset: v1 
								      &nbsp;weight: <span style="color:#ae81ff">100</span> 
								    &nbsp;mirror: 
								      &nbsp;host: reviews 
								      &nbsp;port: 
								        &nbsp;number: <span style="color:#ae81ff">9080</span> 
								      &nbsp;subset: v2 
								      &nbsp;... 
            </code>
         </div>
      </pre>
   </article>

    이 라우팅 규칙은 트래픽의 100%를 `v1`으로 보냅니다. `미러` 영역은 `리뷰 v2` 서비스에 미러링하도록 지정합니다. 트래픽이 미러링되면 요청은 `-shadow`가 추가된 Host/Authority 헤더와 함께 미러링된 서비스로 전송됩니다. 예를 들어 `cluster-1`은 `cluster-1-shadow`가 됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      이러한 요청은 "실행 후 잊어버리기"로 미러링되며, 이는 응답이 삭제됨을 의미합니다. 모든 요청을 미러링하는 대신 `가중치` 영역을 지정하여 트래픽의 일부를 미러링할 수 있습니다. 이 영역이 없으면 이전 버전과의 호환성을 위해 모든 트래픽이 미러링됩니다. 자세한 내용은 [미러링](https://istio.io/v1.5/pt-br/docs/tasks/traffic-management/mirroring/)을 참조하세요.
    </div>
  </div>
  
## 오프라인으로 작업하기

**삭제**를 클릭하여 트래픽 미러링 작업을 제거할 수 있으며, 이는 현재 앱 버전에 영향을 주지 않습니다.

