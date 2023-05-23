---
title: "클러스터 바인딩 해제"
keywords: 'Kubernetes, Super Kubenetes, multicluster, hybrid-cloud'
description: 'Learn how to unbind a cluster from your cluster pool in Super Kubenetes.'
linkTitle: "Unbind a Cluster"
weight: 5500
---

이 튜토리얼은 Super Kubenetes의 중앙 컨트롤 플레인에서 클러스터를 바인딩을 해제하는 방법을 시연합니다.

## 사전 준비

- 멀티 클러스터 관리를 활성화해야 합니다.
- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어, 콘솔에 `admin`으로 직접 로그인하거나, 관리 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

## 클러스터 바인딩 해제
다음 방법 중 하나를 사용하여 클러스터 바인딩을 해제할 수 있습니다:

**방법 1**

1. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **멤버 클러스터** 영역에서, 제어 플레인으로부터 제거하려는 클러스터의 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />을 클릭한 다음, **클러스터 바인딩 해제**를 클릭하세요.

3. 표시되는 **클러스터 바인딩 해제** 대화 상자의 위험 경고를 주의 깊게 읽으세요. 계속 진행하려면 멤버 클러스터의 이름을 입력하고 **확인**을 클릭하세요.

**방법 2**

1. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **멤버 클러스터** 영역에서, 컨트롤 플레인으로부터 제거하려는 멤버 클러스터의 이름을 클릭하세요.

3. 왼쪽 탐색 트리에서 **클러스터 설정** > **기본 정보**를 선택하세요.

4. **클러스터 정보** 영역에서 **관리** > **클러스터 바인딩 해제**를 클릭하세요.

5. 표시되는 **클러스터 바인딩 해제** 대화 상자의 위험 경고를 주의 깊게 읽으십시오. 계속 진행하려면 멤버 클러스터의 이름을 입력하고 **확인**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      클러스터 바인딩을 해제한 후에는, 클러스터의 쿠버네티스 리소스를 삭제할 때까지 제어 플레인에서 클러스터를 관리할 수 없습니다.
    </div>
  </div>


## 비정상 클러스터 바인딩 해제

경우에 따라, 위의 단계를 따라서 클러스터를 바인딩 해제할 수 없습니다. 예를 들어, 잘못된 자격 증명으로 클러스터를 가져왔다면 **클러스터 설정**에 접속할 수 없습니다. 이 경우엔 다음 명령을 실행하여 비정상 클러스터를 바인딩 해제하세요:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl delete cluster &lt;cluster name&gt;</code>
      </div>
  </pre>
</article>
