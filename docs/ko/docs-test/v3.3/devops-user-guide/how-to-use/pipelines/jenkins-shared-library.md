---
title: "파이프라인에서 Jenkins 공유 라이브러리 사용"
keywords: 'Super Kubenetes, Kubernetes, Jenkins, Shared Library, Pipelines'
description: 'Learn how to use Jenkins shared libraries in a pipeline.'
linkTitle: "Use Jenkins Shared Libraries in a Pipeline"
weight: 11217
---

동일한 스테이지 또는 스텝을 포함하는 Jenkins 파이프라인의 경우 파이프라인 코드에서 반복을 방지하는 한 가지 방법은 Jenkinsfiles에서 Jenkins 공유 라이브러리를 사용하는 것입니다.

이 튜토리얼은 Super Kubenetes DevOps 파이프라인에서 Jenkins 공유 라이브러리를 사용하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.
- 워크스페이스, DevOps 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 사용자는 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- Jenkins 공유 라이브러리를 사용할 수 있어야 합니다. 이 튜토리얼에서는 [깃허브 저장소](https://github.com/devops-ws/jenkins-shared-library)의 Jenkins 공유 라이브러리를 예로 사용합니다.

## Jenkins 대시보드에서 공유 라이브러리 설정

1. [Jenkins 대시보드에 로그인](../../../how-to-integrate/sonarqube/#step-5-add-the-sonarqube-server-to-jenkins)하고 왼쪽 탐색 창의 ** Jenkins 관리**를 클릭하세요. 

2. 아래로 스크롤하여 **시스템 설정**을 클릭하세요.

3. **글로벌 파이프라인 라이브러리**까지 아래로 스크롤하고 **추가**를 클릭하세요.

4. 다음과 같이 영역을를 설정하세요.

   - **이름**. Jenkinsfile에서 이 이름을 참조하여 공유 라이브러리를 가져올 수 있도록 공유 라이브러리의 이름(예: `demo-shared-library`)을 설정하세요.

   - **기본 버전**. 공유 라이브러리를 가져오기 위한 기본 브랜치로 공유 라이브러리를 넣은 저장소에서 브랜치 이름을 설정합니다. 이 튜토리얼에서는 `마스터`를 입력하세요.

   - **검색 방법**에서 **Modern SCM**을 선택합니다.

   - **소스 코드 관리**에서 **Git**을 선택하고 **프로젝트 저장소**에 대한 예제 저장소의 URL을 입력합니다. 액세스를 위해 자격 증명이 필요한 자체 저장소를 사용하는 경우 **자격 증명**을 설정해야 합니다.

5. 편집이 끝나면 **적용**을 클릭하세요.


  <div className="notices note">
    <p>Note</p>
    <div>
      [폴더 수준의 공유 라이브러리](https://www.jenkins.io/doc/book/pipeline/shared-libraries/#folder-level-shared-libraries)를 설정할 수도 있습니다.
    </div>
  </div>

## 파이프라인에서 공유 라이브러리 사용

### 1단계: 파이프라인 생성

1. Super Kubenetes 웹 콘솔에 `project-regular`로 로그인하세요. DevOps 프로젝트로 이동하고 **파이프라인** 페이지에서 **생성**을 클릭하세요.

2. 표시된 대화 상자에서 이름(예: `demo-shared-library`)을 설정하고 **다음**를 클릭하세요.

3. **고급 설정** 탭에서 **생성**을 클릭하여 기본 설정으로 파이프라인을 만듭니다.

### 2단계: 파이프라인 편집

1. 파이프라인 목록에서 파이프라인을 클릭하여 세부 정보 페이지로 이동하고 **Jenkinsfile 편집**을 클릭하세요.

2. 표시된 대화 상자에서 다음 예제 Jenkinsfile을 입력합니다. 편집이 끝나면 **확인**을 클릭하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                library identifier: <span style="color:#e6db74">'devops-ws-demo@master'</span><span style="color:#f92672">,</span> retriever: modernSCM<span style="color:#f92672">([</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;$class<span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'GitSCMSource'</span><span style="color:#f92672">,</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;remote: <span style="color:#e6db74"><span><a style="color:#e6db74; cursor:text;">'https://github.com/devops-ws/jenkins-shared-library'</a></span></span><span style="color:#f92672">,</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;traits: <span style="color:#f92672">[[</span>$class<span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'jenkins.plugins.git.traits.BranchDiscoveryTrait'</span><span style="color:#f92672">]]</span> 
            <span style="color:#f92672">])</span> 
                
            pipeline <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;agent any
                
                &nbsp;&nbsp;&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'Demo'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                        &nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                            &nbsp;&nbsp;&nbsp;&nbsp;script <span style="color:#f92672">{</span> 
                                &nbsp;&nbsp;&nbsp;&nbsp;mvn<span style="color:#f92672">.</span><span style="color:#a6e22e">fake</span><span style="color:#f92672">()</span> 
                            <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                        <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
            <span style="color:#f92672">}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>
   
<div className="notices note">
  <p>Note</p>
  <div>
    필요에 따라 `에이전트`에 `레이블`을 지정할 수 있습니다.
  </div>
</div>
   
3. 또는 `@Library(`<설정된 공유 라이브러리 이름>`) _`로 시작하는 Jenkinsfile을 사용할 수도 있습니다. 이러한 유형의 Jenkinsfile을 사용하는 경우 Jenkins 대시보드에서 미리 공유 라이브러리를 설정해야 합니다. 이 튜토리얼에서는 아래의 예제 Jenkinsfile을 사용합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#a6e22e">@Library</span><span style="color:#f92672">(</span><span style="color:#e6db74">'demo-shared-library'</span><span style="color:#f92672">)</span><span>&nbsp;_</span> 
                <span></span> 
                pipeline <span style="color:#f92672">{</span> 
                    agent any 
                    <span></span> 
                    stages <span style="color:#f92672">{</span> 
                        stage<span style="color:#f92672">(</span><span style="color:#e6db74">'Demo'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                            steps <span style="color:#f92672">{</span> 
                                script <span style="color:#f92672">{</span> 
                                    mvn<span style="color:#f92672">.</span><span style="color:#a6e22e">fake</span><span style="color:#f92672">()</span> 
                                <span style="color:#f92672">}</span> 
                            <span style="color:#f92672">}</span> 
                        <span style="color:#f92672">}</span> 
                    <span style="color:#f92672">}</span> 
                <span style="color:#f92672">}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      우측 예시처럼 특정 브렌치에 사용할 수 있습니다. `@Library('demo-shared-library@<branch name>') _`
    </div>
  </div>

### 3단계: 파이프라인 실행

1. **작업 상태** 탭에서 스테이지를 볼 수 있습니다. **실행**을 클릭하여 실행하세요.

2. 잠시 후 파이프라인이 성공적으로 실행되었습니다.

3. **실행 기록** 아래의 **성공** 레코드를 클릭한 다음 **로그 보기**를 클릭하여 로그 세부 정보를 볼 수 있습니다.

