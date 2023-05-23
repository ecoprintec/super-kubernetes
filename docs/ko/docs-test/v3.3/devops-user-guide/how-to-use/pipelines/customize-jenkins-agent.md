---
title: "Jenkins 에이전트 사용자 지정"
keywords: "Super Kubenetes, Kubernetes, DevOps, Jenkins, Agent"
description: "Learn how to customize a Jenkins agent on Super Kubenetes."
linkTitle: "Customize Jenkins Agent"
Weight: 112191
---

JDK 11 등의 특정 환경에서 실행되는 Jenkins 에이전트를 사용해야 하는 경우 Super Kubenetes에서 Jenkins 에이전트를 사용자 지정할 수 있습니다.

이 문서에서는 Super Kubenetes에서 Jenkins 에이전트를 사용자 지정하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템](../../../../pluggable-components/devops/)을 활성화해야 합니다.

## Jenkins 에이전트 사용자 지정

1. Super Kubenetes의 웹 콘솔에 `admin`으로 로그인하세요.

2. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택한 다음 왼쪽 탐색 창의 **설정** 아래에서 ** Configmaps**을 클릭하세요.

3. **Configmaps** 페이지의 검색 상자에 `jenkins-casc-config`를 입력하고 **확인**를 누릅니다.

4. `jenkins-casc-config`를 클릭하여 세부 정보 페이지로 이동하고 **더보기**를 클릭하고 **YAML 편집**을 선택하세요.

5. 표시된 대화 상자에서 `data.jenkins_user.yaml:jenkins.clouds.kubernetes.templates` 섹션 아래에 다음 코드를 입력하고 **확인**을 클릭하세요.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              -&nbsp;<span style="color:#f92672">name</span>: <span style="color:#e6db74">"maven-jdk11"</span> <span style="color:#75715e">&nbsp;<span>#</span> The name of the customized Jenkins agent.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;label</span>: <span style="color:#e6db74">"maven jdk11"</span> <span style="color:#75715e">&nbsp;<span>#</span> The label of the customized Jenkins agent. To specify multiple labels, use spaces to seperate them. </span> 
              <span style="color:#f92672">&nbsp;&nbsp;inheritFrom</span>: <span style="color:#e6db74">"maven"</span> <span style="color:#75715e">&nbsp;<span>#</span> The name of the existing pod template from which this customzied Jenkins agent inherits.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;containers</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;-&nbsp;name</span>: <span style="color:#e6db74">"maven"</span> <span style="color:#75715e">&nbsp;<span>#</span> The container name specified in the existing pod template from which this customzied Jenkins agent inherits.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#e6db74">"Super Kubenetesdev/builder-maven:v3.2.0jdk11"</span> <span style="color:#75715e">&nbsp;<span>#</span> This image is used for testing purposes only. You can use your own images.</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    YAML 파일의 들여쓰기를 지켜야 합니다.
  </div>
</div>

6. 변경 사항이 자동으로 다시 로드될 때까지 70초 이상 기다립니다.

7. 사용자 지정 Jenkins 에이전트를 사용하려면 다음 샘플 Jenkinsfile을 참조하여 파이프라인 생성 시 사용자 지정 Jenkins 에이전트의 레이블 및 컨테이너 이름을 적절하게 지정하세요.

    <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                pipeline <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;node <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven &amp;&amp; jdk11'</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;}</span> 
                &nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'Print Maven and JDK version'</span><span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">''' 
                </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mvn -v 
                </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;java -version 
                </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'''</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;}</span> 
                <span style="color:#f92672">}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

   
