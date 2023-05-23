---
title: "Binary to Image: 쿠버네티스에 아티팩트 게시"
keywords: "Super Kubenetes, Kubernetes, Docker, B2I, Binary-to-Image"
description: "Use B2I to import an artifact and push it to a target repository."
linkTitle: "Binary to Image: Publish an Artifact to Kubernetes"
weight: 10620
---

B2I(Binary-to-Image)는 Jar, War 및 바이너리 패키지와 같은 바이너리 실행 파일에서 재현 가능한 컨테이너 이미지를 빌드하기 위한 툴킷 및 워크플로입니다. 더 구체적으로 말하면, 아티팩트를 업로드하고 이미지를 푸시하려는 Docker 허브나 Harbor와 같은 대상 리포지토리를 지정합니다. 모든 작업이 성공적으로 실행되면 이미지가 대상 리포지토리로 푸시되고 워크플로우에서 서비스를 생성하면 애플리케이션이 자동으로 쿠버네티스에 배포됩니다.

B2I 워크플로에서는 Dockerfile을 작성할 필요가 없습니다. 이를 통해 학습 비용이 절감될 뿐만 아니라 릴리스 효율성이 향상되어 사용자가 비즈니스에 더 집중할 수 있습니다.

이 튜토리얼은 B2I 워크플로에서 아티팩트를 기반으로 이미지를 빌드하는 두 가지 방법을 시연합니다. 결과적으로 이미지는 Docker 허브에 릴리스됩니다.

시연 및 테스트 목적으로 B2I 워크플로우를 구현하는 데 사용할 수 있는 몇 가지 예제 아티팩트는 다음과 같습니다:

<table>
<thead>
<tr>
	<th>
		아티팩트 패키지
	</th>
	<th>
		GitHub 리포지토리
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<a href="https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-war-java8.war" target="_blank" rel="noopener noreferrer">b2i-war-java8.war</a>
	</td>
	<td>
		<a href="https://github.com/spring-projects/spring-mvc-showcase" target="_blank" rel="noopener noreferrer">spring-mvc-showcase</a>
	</td>
</tr>
<tr>
	<td>
		<a href="https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-war-java11.war" target="_blank" rel="noopener noreferrer">b2i-war-java11.war</a>
	</td>
	<td>
		<a href="https://github.com/Super Kubenetes/s2i-java-container/tree/master/tomcat/examples/springmvc5" target="_blank" rel="noopener noreferrer">springmvc5</a>
	</td>
</tr>
<tr>
	<td>
		<a href="https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-binary" target="_blank" rel="noopener noreferrer">b2i-binary</a>
	</td>
	<td>
		<a href="https://github.com/runzexia/devops-go-sample" target="_blank" rel="noopener noreferrer">devops-go-sample</a>
	</td>
</tr>
<tr>
	<td>
		<a href="https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-jar-java11.jar" target="_blank" rel="noopener noreferrer">b2i-jar-java11.jar</a>
	</td>
	<td>
		<a href="https://github.com/Super Kubenetes/s2i-java-container/tree/master/java/examples/maven" target="_blank" rel="noopener noreferrer">java-maven-example</a>
	</td>
</tr>
<tr>
	<td>
		<a href="https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-jar-java8.jar" target="_blank" rel="noopener noreferrer">b2i-jar-java8.jar</a>
	</td>
	<td>
		<a href="https://github.com/Super Kubenetes/devops-maven-sample" target="_blank" rel="noopener noreferrer">devops-maven-sample</a>
	</td>
</tr>
</tbody>
</table>

## 사전 준비

- [Super Kubenetes DevOps System](../../../pluggable-components/devops/)을 활성화합니다.
- [Docker 허브](https://www.dockerhub.com/) 계정을 생성해야 합니다. GitLab 및 Harbor도 지원됩니다.
- 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- 이미지 구축을 위한 CI 전용 노드를 설정하세요. 이는 필수 사항은 아니지만 종속성을 캐시하고 빌드 시간을 단축하므로 개발 및 운영 환경에 권장됩니다. 자세한 내용은 [종속성 캐싱을 위한 CI 노드 설정](../../../devops-user-guide/how-to-use/devops-settings/set-ci-node/)을 참조하십시오.

## Binary-to-Image(B2I)를 사용하여 서비스 생성

아래 단계는 B2I 워크플로에서 서비스를 생성하여 아티팩트를 업로드하고, 이미지를 빌드하고, 쿠버네티스에 릴리스하는 방법을 시연합니다.

![service-build](/dist/assets/docs/v3.3/project-user-guide/image-builder/b2i-publish-artifact-to-kubernetes/service-build.png)

### 1단계: Docker 허브 암호 생성

B2I를 통해 생성된 Docker 이미지를 Docker 허브에 푸시할 수 있도록 Docker 허브 시크릿을 생성해야 합니다. Super Kubenetes에 `project-regular`로 로그인하고 프로젝트로 이동하여 Docker 허브용 시크릿을 생성하세요. 자세한 내용은 [가장 일반적인 시크릿 생성](../../../project-user-guide/configuration/secrets/#create-the-most-common-secrets)을 참조하세요.

### 2단계: 서비스 생성

1. 동일한 프로젝트에서 **애플리케이션 워크로드** 아래의 **서비스**로 이동하고 **생성**을 클릭하세요.

2. **아티팩트에서 서비스 생성**까지 아래로 스크롤하고 **WAR**를 선택하세요. 이 튜토리얼에서는 [spring-mvc-particle](https://github.com/spring-projects/spring-mvc-showcase) 프로젝트를 샘플로 사용하여 war 아티팩트를 Super Kubenetes에 업로드합니다. b2i-war-java8과 같은, 이름을 설정하고 **다음**을 클릭하세요.

3. **빌드 설정** 페이지에서 적절하게 다음 정보를 제공하고 **다음**을 클릭하세요.

   **서비스 유형**: 이 예제에서는 **스테이트리스 서비스**를 선택하세요. 여러 서비스에 대한 자세한 내용은 [서비스 유형](../../../project-user-guide/application-workloads/services/#service-type)을 참조하세요.

   **아티팩트 파일**: war 아티팩트([b2i-war-java8](https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-war-java8.war))를 업로드하세요.

   **빌드 환경**: **Super Kubenetes/tomcat85-java8-centos7:v2.1.0**을 선택하세요.

   **이미지 이름**: 이미지 이름으로 `<DOCKERHUB_USERNAME>/<IMAGE NAME>` 또는 `<HARBOR-PROJECT_NAME>/<IMAGE NAME>`을 입력하세요.

   **이미지 태그**: 이미지 태그입니다. `latest`를 입력하세요.

   **대상 이미지 레지스트리**: 이미지가 Docker 허브로 푸시될 때 Docker 허브 시크릿을 선택하세요.
   
4. **파드 설정** 페이지에서, **포트 설정**까지 아래로 스크롤하여 컨테이너에 대한 접속 정책을 설정하세요. **프로토콜**에 대해 **HTTP**를 선택하고 이름(예: `http-port`)을 설정한 다음 **컨테이너 포트** 및 **서비스 포트**에 모두 `8080`을 입력하세요. 계속하려면 **다음**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      **컨테이너 설정** 페이지에서 다른 파라미터를 설정하는 방법에 대한 자세한 내용은 [파드 설정](../../../project-user-guide/application-workloads/container-image-settings/)을 참조하세요.
    </div>
  </div>

5. **스토리지 설정** 페이지에서 컨테이너의 볼륨을 추가할 수 있습니다. 자세한 내용은 [볼륨](../../../project-user-guide/storage/volumes/)을 참조하십시오. 계속하려면 **다음**을 클릭하세요.

6. **고급 설정** 페이지에서 **외부 접속**을 선택하고 접속 방법으로 **NodePort**를 선택하세요. **생성**을 클릭하여 전체 프로세스를 완료합니다.

7. 내비게이션 바에서 **이미지 빌더**를 클릭하면 예제 이미지가 빌드되는 것을 볼 수 있습니다.

### 3단계: 결과 확인

1. 잠시 기다리면 이미지 빌더의 상태가 **성공**으로 바뀐 것을 확인할 수 있습니다.

2. 해당 이미지를 클릭하면 상세페이지로 이동합니다. 빌딩 로그를 보려면, **잡 기록** 아래에서, 기록 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/image-builder/b2i-publish-artifact-to-kubernetes/down-arrow.png" width="20px" alt="icon" />를 클릭하세요. 모든 것이 정상적으로 실행되면 로그 끝에서 `Build completed successfully`를 볼 수 있습니다.

3. **서비스**, **디플로이먼트** 및 **잡** 페이지로 돌아가면 해당 서비스, 디플로이먼트 및 잡 이미지가 모두 성공적으로 생성되었음을 확인할 수 있습니다.

4. Docker 허브 리포지토리에서 Super Kubenetes가 예상 태그가 있는 리포지토리로 이미지를 푸시한 것을 볼 수 있습니다.

### 4단계: B2I 서비스 접속

1. **서비스** 페이지에서, B2I 서비스를 클릭하여 세부 정보 페이지로 이동하세요. 여기서 포트 번호가 표시된 것을 볼 수 있습니다.

2. `http://<Node IP>:<NodePort>/<Binary-Package-Name>/`에서 서비스에 접속합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      배포 환경에 따라 보안 그룹에서 포트를 열고 포트 포워딩 규칙을 설정해야 할 수도 있습니다.
    </div>
  </div>

## 이미지 빌더를 사용하여 이미지 구축

위의 예는 서비스를 생성하여 B2I의 전체 워크플로를 구현했습니다. 그게 아니면, 이미지 빌더를 사용하여 아티팩트를 기반으로 이미지를 직접 빌드할 수 있지만 이 방법은 이미지를 쿠버네티스에 게시하지 않습니다.

![build-binary](/dist/assets/docs/v3.3/project-user-guide/image-builder/b2i-publish-artifact-to-kubernetes/build-binary.png)

<div className="notices note">
  <p>Note</p>
  <div>
    Docker 허브에 대한 시크릿을 생성했는지 반드시 확인하십시오. 자세한 내용은 [가장 일반적인 시크릿 생성](../../../project-user-guide/configuration/secrets/#create-the-most-common-secrets)을 참조하세요.
  </div>
구체</div>

### 1단계: 아티팩트 업로드

1. `project-regular`로 Super Kubenetes에 로그인하고 프로젝트로 이동하세요.

2. 내비게이션 바에서 **이미지 빌더**를 선택하고 **생성**을 클릭하세요.

3. 표시된 대화 상자에서 **바이너리**를 선택하고 **다음**을 클릭하세요.

4. **빌드 설정** 페이지에서 적절하게 다음 정보를 제공하고 **생성**을 클릭하세요.

   **아티팩트 파일**: [b2i-binary](https://github.com/Super Kubenetes/tutorial/raw/master/tutorial%204%20-%20s2i-b2i/b2i-binary)를 다운로드하여 Super Kubenetes에 업로드하세요.

   **빌드 환경**: **Super Kubenetes/s2i-binary:v2.1.0**을 선택하세요.

   **이미지 이름**: 이미지 이름을 사용자 지정하세요.

   **이미지 태그**: 이미지 태그입니다. `latest`을 입력하세요.

   **대상 이미지 레지스트리**: 이미지가 Docker 허브로 푸시되므로 Docker 허브 시크릿을 선택하세요.

5. **이미지 빌더** 페이지에서 이미지가 빌드되고 있는 것을 볼 수 있습니다.

### 2단계: 결과 확인

1. 잠시 기다리면 이미지 빌더의 상태가 **성공**으로 바뀐 것을 확인할 수 있습니다.

2. 해당 이미지 빌더를 클릭하면 상세페이지로 이동합니다. 빌딩 로그를 보려면, **잡 기록** 아래에서, 기록 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/image-builder/b2i-publish-artifact-to-kubernetes/down-arrow.png" width="20px" alt="icon" />를 클릭하세요. 모든 것이 정상적으로 실행되면 로그 끝에서 `Build completed successfully`를 볼 수 있습니다.

3. **잡** 페이지로 이동하면 해당 이미지의 잡이 성공적으로 생성된 것을 확인할 수 있습니다.

4. Docker 허브 리포지토리에서 Super Kubenetes가 예상 태그가 있는 리포지토리로 이미지를 푸시한 것을 볼 수 있습니다.

