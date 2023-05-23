---
title: "Super Kubenetes GitHub 저장소에 앱 업로드"
keywords: "Kubernetes, helm, Super Kubenetes, application"
description: "Upload your own apps to the GitHub repository of Super Kubenetes."
linkTitle: "Upload Apps to the Super Kubenetes GitHub Repository"
weight: 9320
---

Super Kubenetes는 테스트 및 개발을 위한 앱 저장소를 제공합니다. 사용자는 자신의 앱을 저장소에 업로드할 수 있으며, 일단 승인되면 사용 가능한 앱 템플릿으로 제공됩니다.

## 앱 업로드

[Helm 문서](https://helm.sh/docs/topics/charts/)를 기반으로 앱을 빌드하세요 . Super Kubenetes 앱 저장소에 있는 기존의 앱을 참조해도 됩니다. 공식 앱은 [src/main](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main)에 저장되고, 테스트 중인 앱은 [src/test](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test)에 저장됩니다.

### 1단계: 앱 개발

1. [Super Kubenetes의 앱 저장소를 포크](https://github.com/Super Kubenetes/helm-charts/fork)하세요.

2. [Helm 문서](https://helm.sh/docs/intro/install/)를 기반으로 Helm을 설치하세요.

3. 다음 명령을 실행하여 Helm 클라이언트를 초기화하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						helm init --client-only
               </p>
            </code>
         </div>
      </pre>
   </article>

4. 앱을 만듭니다. 예를 들어, `src/test` 디렉토리에 `mychart`라는 앱을 만드세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd src/test
                  helm create mychart
                  cd mychart
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Helm이 디렉터리에 관련 템플릿을 생성한 것을 확인할 수 있습니다. 자세한 내용은 [앱 만들기](../../../application-store/app-developer-guide/helm-developer-guide/#create-an-app)를 참조하세요.

### 2단계: 앱 제출

개발이 완료되면 검토를 위해 [Super Kubenetes의 공식 저장소]( https://github.com/Super Kubenetes/helm-charts)에 가져오기 요청을 제출하세요.

### 3단계: 앱 배포

가져오기 요청이 승인되면 앱을 사용할 수 있습니다. Super Kubenetes에 `https://charts.Super Kubenetes.io/main`을 추가하기 위한 더 자세한 내용은 [Helm 저장소 가져오기](.. /import-helm-repository/)를 참조하세요.

