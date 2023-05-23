---
title: "카나리 릴리스"
keywords: 'Super Kubenetes, Kubernetes, Canary Release, Istio, Service Mesh'
description: 'Learn how to deploy a canary service on Super Kubenetes.'
linkTitle: "Canary Release"
weight: 10530
---

Super Kubenetes는 [Istio](https://istio.io/)를 기반으로 사용자에게 카나리 서비스를 배포하는 데 필요한 제어 기능을 제공합니다. 카나리 릴리스에서는 새 버전의 서비스를 도입하고 소량의 트래픽을 전송하여 이를 테스트할 수 있습니다. 동시에 이전 버전은 나머지 트래픽을 처리합니다. 모든 것이 순조롭게 진행되면 새 버전으로 전송되는 트래픽을 점진적으로 늘리는 동시에 이전 버전을 단계적으로 제거할 수 있습니다. 문제가 발생하는 경우 Super Kubenetes를 사용하면 트래픽 비율을 변경하면 이전 버전으로 롤백할 수 있습니다.

이 방법은 서비스의 성능과 안정성을 테스트하는 효율적인 방법입니다. 전체 시스템 안정성에 영향을 주지 않으면서 실제 환경에서 잠재적인 문제를 감지하는 데 도움이 될 수 있습니다.

![canary-release-0](/dist/assets/docs/v3.3/project-user-guide/grayscale-release/canary-release/canary-release-0.png)

## 사전 준비

- [Super Kubenetes 서비스 메시](../../../pluggable-components/service-mesh/)를 활성화해야 합니다.
- 추적 기능을 사용하려면 [Super Kubenetes 로깅](../../../pluggable-components/logging/)을 활성화해야 합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- 카나리 릴리스를 구현하려면 **애플리케이션 거버넌스**를 활성화해야하고 사용 가능한 앱이 있어야 합니다. 이 튜토리얼에서 사용하는 샘플 앱은 Bookinfo입니다. 자세한 내용은 [Bookinfo 배포 및 접속](../../../quick-start/deploy-bookinfo-to-k8s/)을 참조하십시오.

## 1단계: 카나리 릴리스 잡 생성

1. Super Kubenetes에 `project-regular`로 로그인하고 **그레이스케일 릴리스**로 이동합니다. **릴리스 모드** 아래에서 **카나리 릴리스** 오른쪽에 있는 **생성**을 클릭하세요.

2. 이름을 설정하고 **다음**을 클릭하세요.

3. **서비스 설정** 탭의 드롭다운 목록에서 앱을 선택하고 카나리 릴리스를 구현하려는 서비스를 선택하세요. 샘플 앱 Bookinfo를 사용하는 경우 **리뷰**를 선택하고 **다음**을 클릭하세요.

4. **새 버전 설정** 탭에서 다른 버전을 추가하고(예: `Super Kubenetes/examples-bookinfo-reviews-v2:1.16.2`; `v1`을 `v2`로 변경) **다음**을 클릭하세요.

5. 특정 비율 또는 `Http 헤더`, `쿠키`, `URI`와 같은 요청 콘텐츠에 따라, 이 두 버전(`v1` 및 `v2`)에 트래픽을 보냅니다. **트래픽 분포 지정**을 선택하고, 슬라이더를 가운데로 이동시켜 이 두 버전에 각각 전송되는 트래픽 비율을 변경하세요 (예: 둘 중 하나에 50% 설정). 완료되면 **생성**을 클릭하세요.

## 2단계: 카나리 릴리스 확인

이제 사용 가능한 두 가지 앱 버전이 있으므로, 카나리 릴리스를 확인하기 위해 앱에 접속하세요.

1. Bookinfo 웹사이트를 방문하여 브라우저를 반복해서 새로 고치세요. **북 리뷰** 섹션이 v1과 v2 사이를 50%의 비율로 전환하는 것을 볼 수 있습니다.

2. 생성된 카나리 릴리스 잡이 **릴리스 잡** 탭에 표시됩니다. 클릭하면 세부내용을 볼 수 있습니다.

3. 트래픽의 절반이 각자에게 가는 것을 볼 수 있습니다.

4. 새 디플로이먼트도 생성됩니다.

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
      - 위의 명령을 실행할 때 `demo-project`를 자신의 프로젝트 이름(즉, 네임스페이스)으로 바꾸세요.
      - Super Kubenetes 콘솔의 web kubectl에서 명령을 실행하려면 `admin` 사용자를 사용해야 합니다.
    </div>
  </div> 


6. 예상 출력:

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
                    &nbsp;weight: <span style="color:#ae81ff">50</span> 
                  &nbsp;- destination: 
                      &nbsp;host: reviews 
                      &nbsp;port: 
                        &nbsp;number: <span style="color:#ae81ff">9080</span> 
                      &nbsp;subset: v2 
                    &nbsp;weight: <span style="color:#ae81ff">50</span> 
                    &nbsp;... 
          </code>
        </div>
    </pre>
  </article>

## 3단계: 네트워크 토폴로지 보기

1. 0.5초마다 Bookinfo에 대한 접속을 시뮬레이션하기 위해, Super Kubenetes가 실행되는 시스템에서 다음 명령을 실행하여 실제 트래픽을 가져옵니다. 

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              watch -n 0.5 <span style="color:#e6db74"><span><a style="color:#e6db74; cursor:text;">"curl http://productpage.demo-project.192.168.0.2.nip.io:32277/productpage?u=normal"</a></span>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      위 명령의 호스트 이름과 포트 번호를 자신의 것으로 반드시 바꿔야 합니다.
    </div>
  </div>

2. **트래픽 모니터링**에서 여러 마이크로서비스 간의 통신, 종속성, 헬스 및 성능을 볼 수 있습니다.

3. 컴포넌트(예: **리뷰**)를 클릭하면 오른쪽에서 **트래픽**, *성공률** 및 **지속기간*의 실시간 데이터를 표시하는 트래픽 모니터링 정보를 볼 수 있습니다.

## 4단계: 추적 세부정보 보기

Super Kubenetes는 [Jaeger](https://www.jaegertracing.io/) 기반의 분산 추적 기능을 제공하며, 이는 마이크로 서비스 기반 분산 애플리케이션을 모니터링하고 문제를 해결하는 데 사용됩니다.

1. **추적** 탭에서 요청의 모든 단계 및 내부 호출과 각 단계의 기간을 볼 수 있습니다.

2. 아무 항목을 클릭하고 세부검색하면 요청의 세부 정보와 이 요청이 처리되는 위치(머신 또는 컨테이너)를 볼 수도 있습니다.

## 5단계: 모든 트래픽 인수

모든 것이 원활하게 실행되면 모든 트래픽을 새 버전으로 가져올 수 있습니다.

1. **릴리스 잡**에서 카나리 릴리스 잡을 클릭하세요.

2. 표시된 대화 상자에서, **리뷰 v2** 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/grayscale-release/canary-release/three-dots.png" width="20px" alt="icon" />를 클릭한 다음, **인계**를 선택하세요. 이는 트래픽의 100%가 새 버전(v2)으로 전송됨을 의미합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      새 버전에 문제가 있는 경우 언제든지 이전 버전 v1으로 롤백할 수 있습니다.
    </div>
  </div>

3. 다시 Bookinfo에 접속하여 브라우저를 여러 번 새로 고칩니다. **리뷰 v2**(검은색 별이 있는 등급)의 결과만 표시된다는 것을 알 수 있습니다.

