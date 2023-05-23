---
title: "Super Kubenetes에서의 쿠버네티스 블루-그린 배포"
keywords: 'Super Kubenetes, Kubernetes, Service Mesh, Istio, Grayscale Release, Blue-Green deployment'
description: 'Learn how to release a blue-green deployment on Super Kubenetes.'
linkTitle: "Blue-Green Deployment with Kubernetes"
weight: 10520
---


블루-그린 릴리스는 다운타임이 없는 배포를 제공합니다. 즉, 이전 버전을 보존한 상태로 새 버전을 배포할 수 있습니다. 언제든지 버전 중 하나만 활성화되어 모든 트래픽을 처리하고 다른 버전은 유휴 상태로 유지됩니다. 만약 실행에 문제가 있으면, 빠르게 이전 버전으로 롤백할 수 있습니다.

![blue-green-0](/dist/assets/docs/v3.3/project-user-guide/grayscale-release/blue-green-deployment/blue-green-0.png)


## 사전 준비

- [Super Kubenetes 서비스 메시](../../../pluggable-components/service-mesh/)를 활성화해야 합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- 앱에 대해 블루-그린 배포를 구현하기 위해서는 **애플리케이션 거버넌스**를 활성화해야하고 사용 가능한 앱이 있어야 합니다. 이 튜토리얼에서 사용하는 샘플 앱은 Bookinfo입니다. 자세한 내용은 [Bookinfo 배포 및 트래픽 관리](../../../quick-start/deploy-bookinfo-to-k8s/)를 참조하세요.

## 블루-그린 배포 잡 생성

1. Super Kubenetes에 `project-regular`로 로그인하고 **그레이스케일 릴리스**로 이동합니다. **릴리스 모드** 아래에서 **블루-그린 배포** 오른쪽의 **생성**을 클릭하세요.

2. 이름을 설정하고 **다음**을 클릭하세요.

3. **서비스 설정** 탭의 드롭다운 목록에서 앱을 선택하고, 블루-그린 배포를 구현하려는 서비스를 선택하세요. 샘플 앱 Bookinfo를 사용하는 경우 **리뷰**를 선택하고 **다음**을 클릭하세요.

4. **새 버전 설정** 탭에서 다음 그림과 같이 다른 버전(예: `Super Kubenetes/examples-bookinfo-reviews-v2:1.16.2`)을 추가하고 **다음**을 클릭하세요.

5. **전략 설정** 탭에서 앱 버전 `v2`가 모든 트래픽을 인계하도록 허용하려면 **인계**를 선택하고 **생성**을 클릭하세요.

6. 생성된 블루-그린 배포 잡이 **릴리스 잡** 탭 아래에 표시됩니다. 클릭하시면 세부내용을 볼 수 있습니다.

7. 잠시 기다리면 모든 트래픽이 `v2` 버전으로 이동하는 것을 볼 수 있습니다.

8. 새로운 **디플로이먼트**도 생성됩니다.

5. 다음 명령을 실행하여 가상 서비스에서 가중치를 직접 확인하도록 할 수 있습니다:

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
        - Super Kubenetes 콘솔의 웹 kubectl에서 명령을 실행하려면 `admin` 사용자를 사용해야 합니다.
      </div>
    </div> 

10. 예상 출력:

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
								...
								<span style="color:#f92672">&nbsp;&nbsp;spec</span>: 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;hosts</span>: 
								&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">reviews</span> 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;http</span>: 
								&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">route</span>: 
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">destination</span>: 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host</span>: <span style="color:#ae81ff">reviews</span> 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number</span>: <span style="color:#ae81ff">9080</span> 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subset</span>: <span style="color:#ae81ff">v2</span> 
								<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;weight</span>: <span style="color:#ae81ff">100</span> 
								<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span>
            </code>
         </div>
      </pre>
   </article>

## 잡을 오프라인으로 전환

블루-그린 배포를 구현하고 나서 결과가 기대에 부합하다면, **삭제**를 클릭하여 버전 `v1`을 제거하고 작업을 오프라인으로 전환할 수 있습니다.



