---
title: 그래픽 편집 패널을 사용하여 파이프라인 생성
keywords: 'Super Kubenetes, Kubernetes, jenkins, cicd, graphical pipelines'
description: 'Learn how to create and run a pipeline by using the graphical editing panel of Super Kubenetes.'
linkTitle: 'Create a Pipeline Using Graphical Editing Panels'
weight: 11211
---

Super Kubenetes의 그래픽 편집 패널에는 Jenkins [스테이지](https://www.jenkins.io/doc/book/pipeline/#stage) 및 [스텝](https://www.jenkins.js)에서 사용되는 모든 필요한 작업이 포함되어 있습니다. io/doc/book/pipeline/#step). Jenkinsfile을 생성하지 않고 대화형 패널에서 이러한 스테이지와 스텝을 직접 정의할 수 있습니다.

이 튜토리얼은 Super Kubenetes에서 그래픽 편집 패널을 통해 파이프라인을 생성하는 방법을 시연합니다. 전체 프로세스 동안 Super Kubenetes가 편집 패널의 설정을 기반으로 자동으로 생성하므로 Jenkinsfile을 수동으로 생성할 필요가 없습니다. 파이프라인이 성공적으로 실행되면 개발 환경에 따라 디플로이먼트 및 서비스를 생성하고 이미지를 Docker Hub에 푸시합니다.

## 사전 준비

- [Super Kubenetes DevOps System 활성화](../../../../pluggable-components/devops/)가 필요합니다.
- [Docker Hub](https://www.dockerhub.com/) 계정이 있어야 합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 사용자는 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)를 참조하십시오.
- 파이프라인을 실행할 CI 전용 노드를 설정합니다. 자세한 내용은 [종속성 캐시에 대한 CI 노드 설정](../../../../devops-user-guide/how-to-use/devops-settings/set-ci-node/)을 참조하십시오.
- 파이프라인 알림을 위해 이메일 서버를 설정합니다(선택 사항). 자세한 내용은 [Super Kubenetes Pipelines용 이메일 서버 설정](../../../../devops-user-guide/how-to-use/pipelines/jenkins-email/)을 참조하십시오.
- 파이프라인의 일부로 코드 분석을 포함하도록 SonarQube를 설정합니다(선택 사항). 자세한 내용은 [SonarQube를 파이프라인에 통합](../../../../devops-user-guide/how-to-integrate/sonarqube/)을 참조하세요.

## 파이프라인 개요

이 예제 파이프라인에는 다음 여섯 스테이지가 포함됩니다.

<!-- ![Pipeline](https://pek3b.qingstor.com/kubesphere-docs/png/20190516091714.png#align=left&display=inline&height=1278&originHeight=1278&originWidth=2190&search=&status=done&width=2190) -->

![Pipeline](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/20190516091714.png)

<div className="notices note">
   <p>Note</p>
   <div>
         - **스테이지 1. SCM 체크아웃**: GitHub 저장소에서 소스 코드를 가져옵니다.
         - **스테이지 2. 단위 테스트**: 테스트를 통과할 때까지 다음 스테이지로 진행하지 않습니다.
         - **스테이지 3. 코드 분석**: 정적 코드 분석을 위해 SonarQube를 설정합니다.
         - **스테이지 4. 빌드 및 푸시**: 이미지를 빌드하고 `snapshot-$BUILD_NUMBER` 태그를 사용하여 Docker Hub에 푸시합니다. 이 중 `$BUILD_NUMBER`는 파이프라인의 활동 목록에 있는 레코드 일련 번호입니다.
         - **스테이지 5. 아티팩트**: 아티팩트(JAR 패키지)를 생성하고 저장합니다.
         - **스테이지 6. 개발 환경에 배포**: 개발 환경에서 디플로이먼트 및 서비스를 생성합니다. 이 스테이지에서 검토가 필요합니다. 디플로이먼트가 성공하면 이메일 알림이 전송됩니다.
   </div>
</div>

## 실습실

### 1단계: 자격 증명 생성

1. Super Kubenetes 콘솔에 `project-regular`로 로그인합니다. DevOps 프로젝트로 이동하여 **DevOps 프로젝트 설정** 아래의 **자격 증명**에서 다음 자격 증명을 만드세요. 자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../../../devops-user-guide/how-to-use/devops-settings/credential-management/)를 참조하십시오.

   <div className="notices note">
   <p>Note</p>
   <div>
      계정이나 비밀번호에 `@`, `$`와 같은 특수 문자가 있는 경우 인식되지 않을 수 있으므로 파이프라인 실행 시 오류가 발생할 수 있습니다. 이 경우 먼저 [urlencoder](https://www.urlencoder.org/)와 같은 일부 타사 웹사이트에서 계정 또는 비밀번호를 인코딩해야 합니다. 그런 다음 자격 증명 정보에 대한 출력을 복사하여 붙여넣으세요.
   </div>
   </div>

   <table>
   <thead>
   <tr>
      <th>
         자격 증명 ID
      </th>
      <th>
         유형
      </th>
      <th>
         사용처
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         dockerhub-id
      </td>
      <td>
         사용자 이름과 비밀번호
      </td>
      <td>
         Docker Hub
      </td>
   </tr>
   <tr>
      <td>
         demo-kubeconfig
      </td>
      <td>
         kubeconfig
      </td>
      <td>
         쿠버네티스
      </td>
   </tr>
   </tbody>
   </table>

2. 위에 언급한 스테이지 3(코드 분석)에서 사용하는 소나큐브의 자격 증명 ID(`sonar-token`)를 추가로 생성해야 합니다.
   **엑세스 토큰** 유형의 자격 증명을 위해서 **토큰** 영역에 SonarQube 토큰을 입력하려면 [새 프로젝트용 SonarQube 토큰 만들기](../../../devops-user-guide/how-to-integrated/sonarqube/#create-new-project)를 참조하십시오.
   완료하려면 **확인**를 클릭하세요.

3. 목록에 자격 증명이 총 3개가 됩니다.

### 2단계: 프로젝트 생성

이 튜토리얼에서 예제 파이프라인은 [샘플](https://github.com/kubesphere/devops-maven-sample/tree/sonarqube) 앱을 프로젝트에 배포합니다. 따라서 미리 프로젝트(예: `Super Kubenetes-sample-dev`)를 생성해야 합니다. 파이프라인이 성공적으로 실행되면 앱의 디플로이먼트 및 서비스가 프로젝트에서 자동으로 생성됩니다.

사용자 `project-admin`을 사용하여 프로젝트를 생성할 수 있습니다. 게다가 이 사용자는 CI/CD 파이프라인의 검토자이기도 합니다. `project-regular` 계정이 `operator` 역할로 프로젝트에 초대되었는지 확인하세요. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

### 3단계: 파이프라인 생성

1. Super Kubenetes에 `project-regular`로 로그인했는지 확인한 다음 DevOps 프로젝트로 이동하세요. **파이프라인** 페이지에서 **생성**을 클릭하세요.

2. 표시된 대화 상자에서 이름을 `graphical-pipeline`으로 지정하고 **다음**를 클릭하세요.

3. **고급 설정** 페이지에서 **추가**를 클릭하여 다음과 같이 세 개의 문자열 파라미터를 추가하세요. 이러한 파라미터는 파이프라인의 Docker 명령에 사용됩니다. 추가를 마치면 **생성**을 클릭하세요.

   <table>
   <thead>
   <tr>
      <th>
         파라미터 유형
      </th>
      <th>
         이름
      </th>
      <th>
         값
      </th>
      <th>
         설명
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         문자열
      </td>
      <td>
         REGISTRY
      </td>
      <td>
         <code>docker.io</code>
      </td>
      <td>
         이미지 레지스트리 주소. 이 예에서는 <code>docker.io</code>를 사용합니다.
      </td>
   </tr>
   <tr>
      <td>
         문자열
      </td>
      <td>
         DOCKERHUB_NAMESPACE
      </td>
      <td>
         Docker ID
      </td>
      <td>
         Docker Hub 계정 또는 계정 아래의 조직 이름.
      </td>
   </tr>
   <tr>
      <td>
         문자열
      </td>
      <td>
         APP_NAME
      </td>
      <td>
         <code>devops-sample</code>
      </td>
      <td>
         앱 이름.
      </td>
   </tr>
   </tbody>
   </table>

   <div className="notices note">
   <p>Note</p>
   <div>
      다른 영역의 경우 기본값을 직접 사용하거나 [파이프라인 설정](../pipeline-settings/)을 참조하여 설정을 사용자 지정하세요.
   </div>
   </div>

4. 생성된 파이프라인이 목록에 표시됩니다.

### 4단계: 파이프라인 편집

파이프라인을 클릭하여 세부정보 페이지로 이동합니다. 그래픽 편집 패널을 사용하려면 **작업 상태** 탭에서 **파이프라인 편집**을 클릭하세요. 표시된 대화 상자에서 **사용자 정의 파이프라인**을 클릭하세요. 이 파이프라인은 여섯 스테이지로 설정됩니다. 아래 순서에 따라 각 스테이지를 설정하십시오.

<div className="notices note">
  <p>Note</p>
  <div>
      - 파이프라인 세부 정보 페이지에 **동기화 상태**가 표시됩니다. Super Kubenetes와 Jenkins 간의 동기화 결과를 반영하며, 동기화가 성공하면 **Successful** 아이콘을 볼 수 있습니다. **Jenkinsfile 편집**을 클릭하여 파이프라인에 대한 Jenkinsfile을 수동으로 생성할 수도 있습니다.
      
      - Super Kubenetes에서 제공하는 [내장 파이프라인 템플릿 사용](../use-pipeline-templates/)도 가능합니다.
  </div>
</div>

#### 스테이지 1: 소스 코드 가져오기(SCM 체크아웃)

그래픽 편집 패널에는 왼쪽의 **캔버스**와 우측의 **콘텐츠**의 두 영역이 있습니다. 다양한 스테이지와 스텝을 설정하는 방법에 따라 Jenkinsfile을 자동으로 생성하므로 개발자에게 훨씬 더 친숙합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    파이프라인에는 [선언형 파이프라인](https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline)과 [스크립트형 파이프라인](https://www.jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline).이 있습니다. 현재 패널을 통해 선언형 파이프라인을 생성할 수 있습니다. 파이프라인 구문에 대한 자세한 내용은 [Jenkins 문서](https://jenkins.io/doc/book/pipeline/syntax/)을 참조하십시오.
  </div>
</div>

1. 그래픽 편집 패널의 **유형** 드롭다운 목록에서 **노드**를 선택하고 **레이블** 드롭다운 목록에서 **maven**을 선택합니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         `에이전트`는 실행 환경을 정의하는 데 사용됩니다. `에이전트` 지시문은 Jenkins에게 파이프라인을 실행하는 위치와 방법을 알려줍니다. 자세한 내용은 [Jenkins 에이전트 선택](../choose-jenkins-agent/)을 참조하세요.
      </div>
   </div>

   ![graphical-panel](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/graphical-panel.png)

2. 스테이지를 추가하려면 왼쪽에 있는 더하기 아이콘을 클릭하세요. **스텝 추가** 영역 위의 상자를 클릭하고 우측의 **이름** 영역에서 스테이지의 이름(예: `Checkout SCM`)을 설정하세요.

   ![edit-panel](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/edit-panel.png)

3. **스텝 추가**를 클릭하세요. GitHub에서 예제 코드를 가져오므로 목록에서 **git**을 선택합니다. 표시된 대화 상자에서 필수 영역을를 입력하세요. **확인**을 클릭하여 완료합니다.

   - **URL**. GitHub 저장소 주소 `https://github.com/kubesphere/devops-maven-sample.git`을 입력합니다. 이것은 예이며 자신의 저장소 주소를 사용해야 합니다.
   - **이름**. 이 튜토리얼에서는 자격 증명 ID를 입력할 필요가 없습니다.
   - **브랜치**. 비워 두면 기본적으로 마스터 브랜치가 됩니다. `sonarqube`를 입력하거나 코드 분석 스테이지가 필요하지 않은 경우 비워 둡니다.

   ![enter-repo-url](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/enter-repo-url.png)

4. 이제 첫 번째 스테이지가 설정되었습니다.

   ![first-stage-set](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/first-stage-set.png)

#### 스테이지 2: 단위 테스트

1. 스테이지 1 오른쪽에 있는 더하기 아이콘을 클릭하여 컨테이너에서 단위 테스트를 수행할 새 스테이지를 추가하세요. 이름을 `단위 테스트`로 지정하세요.

   ![unit-test](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/unit-test.png)

2. **스텝 추가**를 클릭하고 목록에서 **컨테이너**를 선택하세요. 이름을 `maven`으로 지정한 다음 **확인**을 클릭하세요.

   ![container](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/container.png)

3. **중첩 스텝 추가**를 클릭하여 `maven` 컨테이너 아래에 중첩 스텝을 추가하세요. 목록에서 **쉘**을 선택하고 명령줄에 다음 명령을 입력하세요. **확인**을 클릭하여 저장합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   							mvn clean -gs <span style="color:#e6db74">`</span>pwd<span style="color:#e6db74">`</span>/configuration/settings.xml test
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
   <p>Note</p>
   <div>
      그래픽 편집 패널의 주어진 스테이지 지시문에서 실행할 일련의 [스텝](https://www.jenkins.io/doc/book/pipeline/syntax/#steps)을 지정할 수 있습니다.
   </div>
   </div>

#### 스테이지 3: 코드 분석(선택 사항)

이 스테이지에서는 SonarQube를 사용하여 코드를 테스트하세요. 분석이 필요하지 않은 경우 이 스테이지를 건너뛸 수 있습니다.

1. `단위 테스트` 스테이지 오른쪽에 있는 더하기 아이콘을 클릭하여 컨테이너에 SonarQube 코드 분석을 위한 스테이지를 추가하세요. 이름을 `코드 분석`으로 지정하세요.

   ![code-analysis-stage](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/code-analysis-stage.png)

2. **코드 분석**의 **작업** 아래에서 **스텝 추가**을 클릭하고 **컨테이너**를 선택하세요. 이름을 `maven`으로 지정하고 **확인**을 클릭하세요.

   ![maven-container](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/maven-container.png)

3. `maven` 컨테이너 아래의 **중첩 스텝 추가**를 클릭하여 중첩 스텝을 추가합니다. **withCredentials**를 클릭하고 **이름** 목록에서 SonarQube 토큰(`sonar-token`)을 선택하세요. **텍스트 변수**에 `SONAR_TOKEN`을 입력한 다음 **확인**을 클릭하세요.

   ![sonarqube-credentials](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/sonarqube-credentials.png)

4. **withCredentials** 스텝에서 **중첩 스텝 추가**를 클릭하여 중첩 스텝을 추가하세요.

   ![nested-step](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/nested-step.png)

5. **withSonarQubeEnv**를 클릭하세요. 표시된 대화 상자에서 기본 이름인 `sonar`를 변경하지 않고 **확인**을 클릭하여 저장하세요.

   ![sonar](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/sonar.png)

6. **withSonarQubeEnv** 스텝 아래에서 **중첩 스텝 추가**를 클릭하여 중첩 스텝을 추가하세요.

   ![add-nested-step](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/add-nested-step.png)

7. **쉘**을 클릭하고 sonarqube 분기 및 인증을 위한 명령줄에 다음 명령을 입력하세요. **확인**을 클릭하여 완료합니다.

   ```shell
   mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN
   ```

   ![sonarqube-shell-new](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/sonarqube-shell-new.png)

8. **컨테이너** 스텝에 대해 **중첩 스텝 추가**(세 번째 스텝)를 직접 클릭하고 **시간 초과**를 선택하세요. 시간에 `1`을 입력하고 단위로 **시간**을 선택하세요. **확인**을 클릭하여 완료합니다.

   ![add-nested-step-2](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/add-nested-step-2.png)

   ![timeout](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/timeout.png)

9. **시간 초과** 스텝에 대해 **중첩 스텝 추가**를 클릭하고 **waitForQualityGate**를 선택하세요. 표시된 대화상자에서 **검사 후 후속 작업 시작**을 선택하세요. **확인**을 클릭하여 저장합니다.

   ![waitforqualitygate](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/waitforqualitygate.png)

   ![sonar-ready](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/sonar-ready.png)

#### 스테이지 4: 이미지 빌드 및 푸시

1. 이전 스테이지의 오른쪽에 있는 더하기 아이콘을 클릭하여 Docker Hub에 이미지를 빌드하고 푸시할 새 스테이지를 추가하세요. 이름을 `빌드 및 푸시`로 지정하세요.

   ![build-and-push-image](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/build-and-push-image.png)

2. **작업**에서 **스텝 추가**를 클릭하고 **컨테이너**를 선택하세요. 이름을 'maven'으로 지정한 다음 **확인**를 클릭합니다.

   ![maven-set](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/maven-set.png)

3. `maven` 컨테이너 아래의 **중첩 스텝 추가**를 클릭하여 중첩 스텝을 추가하세요. 목록에서 **쉘**을 선택하고 표시된 대화상자에 다음 명령어를 입력하세요. **확인**을 클릭하여 완료합니다.

   ```shell
   mvn -Dmaven.test.skip=true clean package
   ```

   ![nested-step-maven](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/nested-step-maven.png)

4. **중첩 스텝 추가**를 다시 클릭하고 **쉘**을 선택하세요. [Dockerfile](https://github.com/kubesphere/devops-maven-sample/blob/sonarqube/Dockerfile-online) 기반으로 Docker 이미지를 빌드하려면 명령줄에 다음 명령을 입력하세요. **확인**을 클릭하여 승인합니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         명령어 끝에 있는 점 `.`을 생략하지 마십시오.
      </div>
   </div>

      <article className="highlight">
         <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
               <code>
                  <p>
                     docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BUILD_NUMBER .
                  </p>
               </code>
            </div>
         </pre>
      </article>

   ![shell-command](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/shell-command.png)

5. **중첩 스텝 추가**를 다시 클릭하고 **withCredentials**를 선택하세요. 표시된 대화 상자에서 다음 영역을를 채우십시오. **확인**을 클릭하여 확인합니다.

   - **자격 증명 이름**: `dockerhub-id`와 같이 생성한 Docker Hub 자격 증명을 선택합니다.
   - **비밀번호 변수**: `DOCKER_PASSWORD`를 입력합니다.
   - **사용자 이름 변수**: `DOCKER_USERNAME`을 입력합니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         보안상의 이유로 계정 정보는 스크립트에서 변수로 표시됩니다.
      </div>
   </div>

   ![docker-credential](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/docker-credential.png)

6. 위에서 만든 **withCredentials** 스텝에서 **중첩 스텝 추가**(첫 번째 단계)를 클릭하세요. **쉘**을 선택하고 Docker 허브에 로그인하는 데 사용되는 표시된 대화 상자에 다음 명령어를 입력하세요. **확인**을 클릭하여 확인합니다.

   ```shell
   echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin
   ```

   ![login-docker-command](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/login-docker-command.png)

7. **withCredentials** 스텝에서 **중첩 스텝 추가**를 클릭하세요. **쉘**을 선택하고 다음 명령을 입력하여 SNAPSHOT 이미지를 Docker 허브에 푸시하세요. **확인**을 클릭하여 완료합니다.

   ```shell
   docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BUILD_NUMBER
   ```

   ![push-snapshot-to-docker](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/push-snapshot-to-docker.png)

#### 스테이지 5: 아티팩트 생성

1. **빌드 및 푸시** 스테이지 오른쪽에 있는 더하기 아이콘을 클릭하여 아티팩트를 저장할 새 스테이지를 추가하고 이름을 `Artifacts`로 지정하세요. 이 예에서는 JAR 패키지를 사용합니다.

   ![add-artifact-stage](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/add-artifact-stage.png)

2. **아티팩트** 스테이지를 선택한 상태에서 **작업** 아래의 **스텝 추가**을 클릭하고 **archiveArtifacts**를 선택하세요. Jenkins에서 아티팩트의 아카이브 경로를 설정하는 데 사용되는 표시된 대화 상자에 `target/*.jar`을 입력하세요. **확인**을 클릭하여 완료합니다.

   ![artifact-info](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/artifact-info.png)

#### 스테이지 6: 개발 환경에 배포

1. **아티팩트** 스테이지 오른쪽의 더하기 아이콘을 클릭하여 마지막 스테이지를 추가하세요. 이름을 `개발 환경에 배포`로 지정하세요. 이 스테이지는 개발 환경(즉, `Super Kubenetes-sample-dev` 프로젝트)에 리소스를 배포하는 데 사용됩니다.

   ![develop-to-dev](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/develop-to-dev.png)

2. **개발 환경에 배포** 스테이지에서 **스텝 추가**를 클릭하세요. 목록에서 **입력**을 선택하고 **메시지** 영역에 `@project-admin`을 입력하세요. 즉, `project-admin` 계정이 이 스테이지로 실행될 때 이 파이프라인을 검토할 것입니다. **확인**을 클릭하여 저장합니다.

   ![input-message](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/input-message.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         Super Kubenetes 3.3.0에서 파이프라인을 실행할 수 있는 계정은 검토자가 지정되지 않은 경우 파이프라인을 계속하거나 종료할 수 있습니다. 파이프라인 작성자, 프로젝트에서 `admin` 역할을 가진 계정 또는 지정한 계정은 파이프라인을 계속하거나 종료할 수 있습니다.
      </div>
   </div>

3. **개발 환경에 배포** 스테이지에서 **스텝 추가**을 다시 클릭하세요. 목록에서 **컨테이너**를 선택하고 이름을 `maven`으로 지정한 다음 **확인**을 클릭하세요.

4. `maven` 컨테이너 스텝에서 **중첩 스텝 추가**를 클릭하세요. 목록에서 **withCredentials**를 선택하고 표시된 대화 상자에서 다음 영역을를 채우고 **확인**을 클릭하세요.

   - **자격 증명 이름**: `demo-kubeconfig`와 같이 생성한 kubeconfig 자격 증명을 선택합니다.
   - **Kubeconfig 변수**: `KUBECONFIG_CONTENT`를 입력합니다.

5. **withCredentials** 스텝에서 **중첩 스텝 추가**를 클릭하세요. 목록에서 **쉘**을 선택하고 표시된 대화 상자에 다음 명령을 입력한 후 **확인**을 클릭하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                     mkdir ~/.kube
                     echo <span style="color:#e6db74">"</span>$KUBECONFIG_CONTENT<span style="color:#e6db74">"</span> &gt; ~/.kube/config
                     envsubst &lt; deploy/dev-ol/devops-sample-svc.yaml | kubectl apply -f -
                     envsubst &lt; deploy/dev-ol/devops-sample.yaml | kubectl apply -f -
               </p>
            </code>
         </div>
      </pre>
   </article>

6. 파이프라인이 성공적으로 실행될 때 이메일 알림을 받으려면 **스텝 추가**를 클릭하고 **메일**을 선택하여 이메일 정보를 추가하세요. 이메일 서버 설정은 선택 사항이므로 이 단계를 건너뛰어도 파이프라인을 계속 실행할 수 있습니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         더 많은 정보를 확인하기 위해 당신의 이메일 서버를 구성하는 방법은 좌측을 확인하세요. [Set Email Server for Super Kubenetes Pipelines](../jenkins-email/).
      </div>
   </div>

7. 위의 단계를 마치면 오른쪽 하단의 **저장**을 클릭하세요. 이제 파이프라인에 각 스테이지가 파이프라인에 명확하게 나열되는 완전한 워크플로가 있음을 알 수 있습니다. 그래픽 편집 패널을 사용하여 파이프라인을 정의하면 Super Kubenetes가 해당 Jenkinsfile을 자동으로 생성합니다. **Jenkinsfile 편집**을 클릭하여 Jenkinsfile을 봅니다.

   <div className="notices note">
      <p>Note</p>
      <div>      
         **파이프라인** 페이지에서 파이프라인 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />을 클릭한 다음 **복사**를 선택하여 복사본을 만들 수 있습니다. 여러 분기를 포함하지 않는 여러 파이프라인을 동시에 실행해야 하는 경우 이러한 파이프라인을 모두 선택한 다음 **실행**을 클릭하여 일괄적으로 실행할 수 있습니다.
      </div>
   </div>

### 5단계: 파이프라인 실행

1. 그래픽 편집 패널을 통해 생성된 파이프라인을 수동으로 실행해야 합니다. **실행**을 클릭하면 3단계에서 정의한 세 개의 문자열 파라미터를 볼 수 있습니다. **확인**를 클릭하여 파이프라인을 실행하세요.

   ![run-pipeline](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/run-pipeline.png)

2. 파이프라인의 상태를 보려면 **실행 기록** 탭으로 이동하여 보려는 레코드를 클릭하세요.

3. 잠시 기다리면 파이프라인이 성공적으로 실행되면 **개발 환경에 배포** 스테이지에서 중지됩니다. 파이프라인의 검토자로서 `project-admin`은 리소스가 개발 환경에 배포되기 전에 이를 승인해야 합니다.

   ![pipeline-successful](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/pipeline-successful.jpg)

4. Super Kubenetes에서 로그아웃하고 콘솔에 `project-admin`으로 다시 로그인하세요. DevOps 프로젝트로 이동하여 `그래픽 파이프라인` 파이프라인을 클릭하세요. **실행 기록** 탭에서 검토할 레코드를 클릭하세요. 파이프라인을 승인하려면 **진행**을 클릭하세요.

### 6단계: 파이프라인 세부정보 보기

1. 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하여 `그래픽 파이프라인` 파이프라인을 클릭하세요. **실행 기록** 탭의 **상태** 아래에서 **성공**으로 표시된 레코드를 클릭하세요.

2. 모든 것이 성공적으로 실행되면 모든 스테이지가 완료된 것을 볼 수 있습니다.

3. 오른쪽 상단 모서리에 있는 **로그 보기**를 클릭하여 모든 로그를 검사하세요. 각 스테이지를 클릭하면 자세한 로그를 볼 수 있습니다. 추가 분석을 위해 로컬로 다운로드할 수도 있는 로그를 기반으로 모든 문제를 디버깅할 수 있습니다.

### 7단계: 아티팩트 다운로드

**아티팩트** 탭을 클릭한 후 오른쪽에 있는 아이콘을 클릭하여 아티팩트를 다운로드하세요.

![download-artifact](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/download-artifact.png)

### 8단계: 코드 분석 결과 보기

**코드 체크** 페이지에서 SonarQube에서 제공하는 이 예제 파이프라인의 코드 분석 결과를 확인하세요. SonarQube를 미리 설정하지 않으면 이 섹션을 사용할 수 없습니다. 자세한 내용은 [SonarQube를 파이프라인에 통합](../../../how-to-integrate/sonarqube/)을 참조하십시오.

![sonarqube-result-detail](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/sonarqube-result-detail.png)

### 9단계: 쿠버네티스 리소스 확인

1. 파이프라인의 모든 스테이지가 성공적으로 실행되면 Docker 이미지가 자동으로 빌드되어 Docker Hub 저장소에 푸시됩니다. 최종적으로 파이프라인은 미리 설정한 프로젝트에 디플로이먼트 및 서비스를 자동으로 생성합니다.

2. 프로젝트(예: 이 튜토리얼에서는 `Super Kubenetes-sample-dev`)로 이동하여 **애플리케이션 워크로드** 아래의 **워크로드**를 클릭하면 목록에 디플로이먼트가 표시되는 것을 볼 수 있습니다.

3. **서비스**에서 NodePort를 통해 노출된 예시 서비스의 포트 번호를 확인할 수 있습니다. 서비스에 접속하려면 `<Node IP>:<NodePort>`를 방문하세요.

   <div className="notices note">
      <p>Note</p>
      <div>
         서비스에 접속하기 전에 포트 포워딩 규칙을 설정하고 보안 그룹에서 포트를 열어야 할 수 있습니다.
      </div>
   </div>

4. 이제 파이프라인이 성공적으로 실행되었으므로 이미지가 Docker 허브로 푸시됩니다. Docker 허브에 로그인하여 결과를 확인합하세요.

   ![dockerhub-image](/dist/assets/docs/v3.3/devops-user-guide/using-devops/create-a-pipeline-using-graphical-editing-panels/dockerhub-image.png)

5. 앱 이름은 `APP_NAME` 값이고 태그가 `SNAPSHOT-$BUILD_NUMBER` 값이므로 `devops-sample`이라고 합니다. `$BUILD_NUMBER`는 **실행 기록** 탭에 있는 레코드의 일련 번호입니다.

6. 이메일 서버를 설정하고 마지막 스테이지에서 이메일 알림 스텝을 추가하면 이메일 메시지도 받을 수 있습니다.

## 참고 항목

[Jenkinsfile을 사용하여 파이프라인 생성](../create-a-pipeline-using-jenkinsfile/)

[Jenkins 에이전트 선택](../choose-jenkins-agent/)

[Super Kubenetes Pipelines용 이메일 서버 설정](../jenkins-email/)
