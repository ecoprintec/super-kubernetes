---
title: "Source to Image: Dockerfile 없이 앱 게시"
keywords: 'Super Kubenetes, Kubernetes, Docker, S2I, Source-to-Image'
description: 'Use S2I to import a Java sample project in Super Kubenetes, create an image and publish it to Kubernetes.'
linkTitle: "Source to Image: Publish an App without a Dockerfile"
weight: 10610
---

S2I(Source-to-Image)는 소스 코드에서 재현 가능한 컨테이너 이미지를 빌드하기 위한 툴킷 및 워크플로입니다. S2I는 소스 코드를 컨테이너 이미지에 삽입하고 컨테이너가 실행을 위해 해당 소스 코드를 준비하도록 하여, 바로 실행할 수 있는 이미지를 생성합니다. Dockerfile 없이 자동으로 이미지를 빌드하고 쿠버네티스에 게시하기 위해 Super Kubenetes는 S2I를 통합했습니다.

이 튜토리얼은 서비스를 생성하여 Java 샘플 프로젝트의 소스 코드를 Super Kubenetes로 가져오기 위해 S2I를 사용하는 방법을 시연합니다. 소스 코드를 기반으로, Super Kubenetes 이미지 빌더는 Docker 이미지를 생성하여 이를 대상 리포지토리에 푸시하고 쿠버네티스에 게시합니다.

![build-process](/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-publish-app-without-dockerfile/build-process.png)

## 사전 준비

- S2I가 통합되어 있는 [Super Kubenetes DevOps 시스템](../../../pluggable-components/devops/)을 활성화해야 합니다.
- [GitHub](https://github.com/) 계정과 [Docker Hub](https://www.dockerhub.com/) 계정을 생성해야 합니다. GitLab 및 Harbor도 지원됩니다. 이 튜토리얼에서는 이미지를 빌드하고 Docker Hub에 푸시하기 위한 소스코드를 제공하기 위해 GitHub 리포지토리를 사용합니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- 이미지 빌딩을 위한 CI 전용 노드를 설정하세요. 이는 필수 사항은 아니지만 종속개체를 캐시하고 빌드 시간을 단축하므로 개발 및 운영 환경에 권장됩니다. 자세한 내용은 [종속개체 캐싱을 위한 CI 노드 설정](../../../devops-user-guide/how-to-use/devops-settings/set-ci-node/)을 참조하십시오.

## Source-to-Image (S2I) 사용

### 1단계: 예제 리포지토리 포크

GitHub에 로그인하고 GitHub 리포지토리 [devops-maven-sample](https://github.com/Super Kubenetes/devops-maven-sample)을 개인 GitHub 계정에 포크합니다.

### 2단계: 시크릿 생성

Super Kubenetes에 `project-regular`로 로그인하세요. 프로젝트로 이동하여 Docker 허브 및 GitHub에 대한 시크릿을 각각 생성하세요. 자세한 내용은 [가장 일반적인 시크릿 생성](../../../project-user-guide/configuration/secrets/#create-the-most-common-secrets)을 참조하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    포크된 리포지토리가 공개된 경우엔 GitHub 시크릿을 생성할 필요가 없습니다.
  </div>
</div>

### 3단계: 서비스 생성

1. 동일한 프로젝트에서 **애플리케이션 워크로드** 아래의 **서비스**로 이동하고 **생성**을 클릭하세요.

2. **소스코드로부터 서비스 생성**에서 **Java**를 선택하고 이름을 `s2i-demo`로 지정한 후 **다음**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      Super Kubenetes는 Java, Node.js 및 Python과 같은 공통 S2I 템플릿을 통합했습니다. 다른 언어를 사용하거나 S2I 템플릿을 사용자 지정하려면 [S2I 템플릿 사용자 지정](../s2i-templates/)을 참조하십시오.
    </div>
  </div>

3. **빌드 설정** 페이지에서 적절하게 다음 정보를 제공하고 **다음**을 클릭하세요.

   **서비스 유형**: 이 예제에서는 **스테이트리스**를 선택하세요. 여러 서비스에 대한 자세한 내용은 [서비스 유형](../../../project-user-guide/application-워크로드/services/#service-type)을 참조하세요.

   **빌드 환경**: **Super Kubenetes/java-8-centos7:v2.1.0**을 선택.

   **코드 리포지토리 URL**: 소스 코드 리포지토리 주소(현재 Git 지원). 소스 코드 터미널에서 코드 브랜치와 상대 경로를 지정할 수 있습니다. URL은 HTTP와 HTTPS를 지원합니다. 포크된 리포지토리 URL(자신의 리포지토리 주소)을 이 영역에 붙여넣으세요.

   **코드 리포지토리 브랜치**: 이미지 빌드에 사용되는 브랜치. 이 튜토리얼에서는 `master`를 입력하세요. 캐시 테스트를 위해 `dependency`를 입력할 수도 있습니다.

   **코드 리포지토리 키**: 퍼블릭 리포지토리를 위해서는 시크릿을 제공할 필요가 없습니다. 프라이빗 리포지토리를 사용하려면 GitHub 시크릿을 선택하세요.

   **이미지 이름**: 이미지 이름을 사용자 지정. 이 튜토리얼에서는 이미지를 Docker 허브로 푸시하므로 `dockerhub_username/s2i-sample`을 입력합니다. `dockerhub_username`은 Docker ID이며 이것이 이미지를 푸시하고 가져올 수 있는 권한이 있는지 반드시 확인하세요.

   **이미지 태그**: 이미지 태그입니다. `latest`를 입력합니다.

   **대상 이미지 레지스트리**: 이미지가 Docker 허브로 푸시되므로 Docker 허브 시크릿을 선택하세요.

   **고급 설정**: 코드 상대 경로를 정의할 수 있습니다. 이 영역에는 기본값 `/`를 사용하세요.

4. **파드 설정** 페이지에서, **포트 설정**까지 아래로 스크롤하여 컨테이너에 대한 접속 정책을 설정하세요. **프로토콜**에 대해 **HTTP**를 선택하고 이름(예: `http-1`)을 설정한 다음 **컨테이너 포트** 및 **서비스 포트**에 모두 `8080`을 입력하세요.

5. **헬스 체크**까지 아래로 스크롤하여 선택하세요. 다음 파라미터를 입력하여 **준비 상태 체크**를 설정합니다. 프로브 설정이 완료되면 **√**를 클릭하고 **다음**을 클릭하여 계속합니다.

   **HTTP 요청**: 프로토콜로 **HTTP**를 선택하고, 경로(이 튜토리얼의 루트 경로)로 `/`를 입력하고, 노출된 포트로 `8080`을 입력합니다.

   **초기 지연(초)**: 활성 프로브가 시작되기 전에, 컨테이너가 시작된 다음 지난 시간(초)입니다. 이 영역에 `30`을 입력하세요.

   **시간 초과(초)**: 프로브가 시간 초과되는 시간(초)입니다. 이 영역에 `10`을 입력합니다.

   다른 영역의 경우 기본값을 바로 사용하십시오. **컨테이너 설정** 페이지에서 프로브와 다른 파라미터를 설정하는 방법에 대한 자세한 내용은 [파드 설정](../../../project-user-guide/application-workloads/container-image-settings/)을 참조하세요. 

6. **스토리지 설정** 페이지에서 컨테이너의 볼륨을 추가할 수 있습니다. 자세한 내용은 [볼륨](../../../project-user-guide/storage/volumes/)을 참조하십시오. 계속하려면 **다음**을 클릭하세요.

7. **고급 설정** 페이지에서 **외부 접속**을 선택하고 접속 방법으로 **NodePort**를 선택하세요. **생성**을 클릭하여 전체 프로세스를 완료합니다.

8. 내비게이션 바에서 **이미지 빌더**를 클릭하면 예제 이미지가 빌드되는 것을 볼 수 있습니다.

### 4단계: 결과 확인

1. 잠시 기다리면 이미지 빌더의 상태가 **성공**으로 변한 것을 확인할 수 있습니다.

2. 해당 이미지를 클릭하면 상세페이지로 이동합니다. 빌딩 로그를 보려면, **잡 기록** 아래에서, 기록 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-publish-app-without-dockerfile/down-arrow.png" width="20px" alt="icon" />를 클릭하세요. 모든 것이 정상적으로 실행되면 로그 끝에서 `Build completed successfully`를 볼 수 있습니다.

3. **서비스**, **디플로이먼트** 및 **잡** 페이지로 돌아가면 해당 서비스, 디플로이먼트 및 잡 이미지가 모두 성공적으로 생성되었음을 확인할 수 있습니다.

4. Docker 허브 리포지토리에서 Super Kubenetes가 예상 태그가 있는 리포지토리로 이미지를 푸시한 것을 볼 수 있습니다.

### 5단계: S2I 서비스에 접속

1. **서비스** 페이지에서 S2I 서비스를 클릭하여 세부 정보 페이지로 이동합니다.

2. 서비스에 접속하려면 `curl` 명령으로 엔드포인트를 사용하거나 또는 `<Node IP>:<NodePort>`를 방문하십시오. 예를 들어:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
								$ curl 10.10.131.44:8080
								Really appreciate your star, that is the power of our life.
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      클러스터 외부에서 서비스에 접속하려면 보안 그룹에서 포트를 열고 배포 환경에 따라 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>
