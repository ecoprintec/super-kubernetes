---
title: 북인포 배포 및 액세스
keywords: 'Super Kubenetes, Kubernetes, Bookinfo, Istio'
description: 'Explore the basics of Super Kubenetes service mesh by deploying an example application Bookinfo.'
linkTitle: 'Deploy and Access Bookinfo'
weight: 2400
---

[Istio](https://istio.io/)는 오픈 소스 서비스 메시 솔루션으로 마이크로서비스를 위한 강력한 트래픽 관리 기능을 제공합니다. [Istio](https://istio.io/latest/docs/concepts/traffic-management/) 공식 홈페이지의 트래픽 관리 소개는 다음과 같습니다.

_Istio의 트래픽 라우팅 규칙을 사용하면 서비스 간의 트래픽 흐름 및 API 호출을 쉽게 제어할 수 있습니다. Istio는 회로 차단기, 시간 초과 및 재시도와 같은 서비스 수준 속성의 구성을 단순화하고 백분율 기반 트래픽 분할을 사용하여 A/B 테스트, 카나리아 롤아웃 및 단계적 롤아웃과 같은 중요한 작업을 쉽게 설정할 수 있도록 합니다. 또한 종속 서비스 또는 네트워크의 오류에 대해 애플리케이션을 보다 강력하게 만드는 데 도움이 되는 즉시 사용 가능한 오류 복구 기능을 제공합니다._

마이크로서비스 관리에 대한 일관된 사용자 경험을 제공하기 위해 Super Kubenetes는 Istio를 컨테이너 플랫폼에 통합합니다. 이 튜토리얼은 4개의 개별 마이크로서비스로 구성된 샘플 애플리케이션 Bookinfo를 배포하고 NodePort를 통해 액세스하는 방법을 보여줍니다.

## 사전 요구 사항

- [Super Kubenetes 서비스 메시](../../pluggable-components/service-mesh/)를 활성화해야 합니다.

- [워크스페이스, 프로젝트, 사용자 및 역할 생성](../create-workspace-and-project/)의 모든 작업을 완료해야 합니다.

- **애플리케이션 거버넌스**를 활성화해야 합니다. 자세한 내용은 [게이트웨이 설정](../../project-administration/project-gateway/#set-a-gateway)을 참고하세요.

<div className="notices note" style="margin-left:32px">
  <p>노트</p>
  <div>
    추적 기능을 사용하려면 **애플리케이션 거버넌스**를 활성화해야 합니다. 활성화되면 경로에 액세스할 수 없는 경우 경로(Ingress)에 주석(예: `nginx.ingress.kubernetes.io/service-upstream: true`)이 추가되었는지 확인합니다.
  </div>
</div>

## Bookinfo란

Bookinfo는 다음과 같은 4개의 개별 마이크로 서비스로 구성됩니다. **reviews** 마이크로서비스에는 세 가지 버전이 있습니다.

- **productpage** 마이크로서비스는 **details** 및 **reviews** 마이크로서비스를 호출하여 페이지를 구성합니다.
- **details** 마이크로서비스에는 도서 정보가 포함되어 있습니다.
- **reviews** 마이크로서비스에는 서평이 포함되어 있습니다. **ratings** 마이크로서비스라고도 합니다.
- **ratings** 마이크로서비스에는 도서평과 함께 제공되는 도서 순위 정보가 포함되어 있습니다.

다음 그림은 애플리케이션의 종단 간 아키텍처를 보여줍니다. 자세한 내용은 [Bookinfo 애플리케이션](https://istio.io/latest/docs/examples/bookinfo/)을 참고하십시오.

![bookinfo](/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/bookinfo.png)

## 가이드

### 1단계 : Bookinfo 배포

1. 콘솔에 `project-regular`로 로그인하고 프로젝트(`demo-project`)로 이동합니다. **애플리케이션 워크로드** 아래의 **앱**로 이동한 다음, 페이지 오른쪽의 **샘플 앱 배포**을 클릭합니다.

2. 필수 필드가 미리 채워져 있고 관련 구성 요소가 이미 설정되어 있는 표시된 대화 상자에서 **다음**를 클릭합니다. 설정을 변경할 필요 없이 최종 페이지에서 **생성**을 클릭하기만 하면 됩니다.

<div className="notices note" style="margin-left:32px">
  <p>노트</p>
  <div>
    Super Kubenetes는 자동으로 호스트 이름을 만듭니다. 호스트 이름을 변경하려면 기본 경로 규칙 위에 마우스를 놓고 <img src="/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/edit-icon.png" width='20px' alt="icon"  />을 클릭하여 편집합니다. 자세한 내용은 [마이크로서비스 기반 앱 생성](../../project-user-guide/application/compose-app/)을 참고하십시오.
  </div>
</div>

1. **워크로드**에서 4개의 배포 상태가 모두 `Running`인지 확인하여 앱이 성공적으로 생성되었는지 확인합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      배포가 시작되고 실행되기까지 몇 분 정도 걸릴 수 있습니다.
    </div>
  </div>

### 2단계 : Bookinfo에 액세스

1. **앱**에서 **구성된 앱**으로 이동하고 앱 `bookinfo`를 클릭하여 세부정보 페이지를 확인합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      목록에 앱이 표시되지 않으면 페이지를 새로고침하세요.
    </div>
  </div>

2. 세부 정보 페이지에서 Bookinfo에 액세스하는 데 사용할 앱의 호스트 이름과 포트 번호를 기록합니다.

3. 앱은 NodePort를 통해 클러스터 외부에서 액세스되므로 아웃바운드 트래픽에 대해 보안 그룹의 포트를 열고 필요한 경우 포트 전달 규칙을 설정해야 합니다.

4. 호스트 이름을 IP 주소에 매핑하는 항목을 추가하여 로컬 호스트 파일(`/etc/hosts`)을 편집합니다. 다음은 예시입니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>139.198.179.20 productpage.demo-project.192.168.0.2.nip.io</code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>노트</p>
    <div>
      앞의 내용을 로컬 호스트 파일에 복사하지 마십시오. 자신의 IP 주소와 호스트 이름으로 바꾸십시오.
    </div>
  </div>

5. 완료되면 **서비스 액세스**를 클릭하여 앱에 액세스합니다.

6. 앱 세부정보 페이지에서 왼쪽 하단의 **일반 사용자**를 클릭합니다.

7. 다음 그림에서 **도서 리뷰** 섹션에는 **Reviewer1**과 **Reviewer2**만 별표 없이 표시되는 것을 알 수 있는데, 이는 이 앱 버전의 상태입니다. 트래픽 관리의 추가 기능을 살펴보려면 이 앱에 대해 [canary release](../../project-user-guide/grayscale-release/canary-release/)를 구현하면 됩니다.

   ![ratings-page](/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/ratings-page.png)

<div className="notices note">
  <p>노트</p>
  <div>
    Super Kubenetes는 [blue-green deployment](../../project-user-guide/grayscale-release/blue-green-deployment/), [canary release](../../project-user-guide/grayscale-release/canary-release/)와 [traffic mirroring](../../project-user-guide/grayscale-release/traffic-mirroring/)를 포함하여 Istio를 기반으로 하는 3가지 종류의 그레이스케일 전략을 제공합니다.
  </div>
</div>
