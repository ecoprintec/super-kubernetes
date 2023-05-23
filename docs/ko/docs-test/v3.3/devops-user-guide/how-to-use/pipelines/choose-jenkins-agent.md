---
title: "Jenkins 에이전트 선택" 
keywords: 'Kubernetes, Super Kubenetes, Docker, DevOps, Jenkins, Agent'
description: 'Specify the Jenkins agent and use the built-in podTemplate for your pipeline.'
linkTitle: "Choose Jenkins Agent"
weight: 112190
---

`에이전트` 섹션은 `에이전트` 섹션이 배치되는 위치에 따라 Jenkins 환경에서 전체 파이프라인 또는 특정 단계가 실행되는 위치를 지정합니다. 섹션은 `pipeline` 블록 내부의 상위 수준에서 정의되어야 하지만 단계 수준 사용은 선택 사항입니다. 자세한 내용은 [Jenkins 공식 문서](https://www.jenkins.io/doc/book/pipeline/syntax/#agent)를 참조하세요.

## 내장 podTemplate

podTemplate은 에이전트를 생성하는 데 사용되는 Pod의 템플릿입니다. 사용자는 쿠버네티스 플러그인에서 사용할 podTemplate을 정의할 수 있습니다.

파이프라인이 실행될 때 모든 Jenkins 에이전트 Pod에는 Jenkins 컨트롤러와 Jenkins 에이전트 간의 통신을 위한 `jnlp`라는 컨테이너가 있어야 합니다. 또한 사용자는 자신의 필요에 맞게 podTemplate에 컨테이너를 추가할 수 있습니다. 자신의 파드 YAML을 사용하여 런타임을 유연하게 제어하도록 선택할 수 있으며, 컨테이너는 `container` 명령으로 전환할 수 있습니다. 다음은 예시입니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  pipeline <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;kubernetes <span style="color:#f92672">{</span> 
                  <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//cloud 'kubernetes' 
                  </span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'mypod'</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yaml <span style="color:#e6db74">"""
                  </span><span style="color:#e6db74">apiVersion: v1 
                  </span><span style="color:#e6db74">kind: Pod 
                  </span><span style="color:#e6db74">spec: 
                  </span><span style="color:#e6db74">&nbsp;&nbsp;containers: 
                  </span><span style="color:#e6db74">&nbsp;&nbsp;- name: maven 
                  </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;image: maven:3.3.9-jdk-8-alpine 
                  </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;command: ['cat'] 
                  </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;tty: true 
                  </span><span style="color:#e6db74">"""</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;}</span> 
                  &nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'Run maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn -version'</span> 
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

동시에 Super Kubenetes에는 podTemplate이 내장되어 있어 사용자가 YAML 파일을 작성하지 않아도 되므로, 학습 비용이 크게 절감됩니다.

현재 버전에는 `base`, `nodejs`, `maven` 및 `go`와 같은 4가지 유형의 내장 podTemplate이 있습니다. Super Kubenetes는 또한 파드에서 격리된 Docker 환경을 제공합니다.

에이전트에 대한 레이블을 지정하여 기본 제공 podTemplate을 사용할 수 있습니다. 예를 들어 nodejs podTemplate을 사용하려면 아래 예시와 같이 파이프라인 생성 시 레이블을 `nodejs`로 설정하면 됩니다.

![jenkins-agent](/dist/assets/docs/v3.3/devops-user-guide/using-devops/jenkins-agent/jenkins-agent.jpg)

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									pipeline <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;node <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'nodejs'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
                  <span></span> 
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'nodejs hello'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'nodejs'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'yarn -v'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'node -v'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker version'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker images'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">}</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

### 기본 podTemplate 

  <table>
  <thead>
  <tr>
    <th>
      이름
    </th>
    <th>
      유형 / 버전
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Jenkins Agent Label
    </td>
    <td>
      기본
    </td>
  </tr>
  <tr>
    <td>
      Container Name
    </td>
    <td>
      기본
    </td>
  </tr>
  <tr>
    <td>
      OS
    </td>
    <td>
      centos-7
    </td>
  </tr>
  <tr>
    <td>
      Docker
    </td>
    <td>
      18.06.0
    </td>
  </tr>
  <tr>
    <td>
      Helm
    </td>
    <td>
      2.11.0
    </td>
  </tr>
  <tr>
    <td>
      Kubectl
    </td>
    <td>
      Stable release
    </td>
  </tr>
  <tr>
    <td>
      Built-in tools
    </td>
    <td>
      unzip, which, make, wget, zip, bzip2, git
    </td>
  </tr>
  </tbody>
  </table>


### nodejs podTemplate 

  <table>
  <thead>
  <tr>
    <th>
      이름
    </th>
    <th>
      유형 / 버전
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Jenkins Agent Label
    </td>
    <td>
      nodejs
    </td>
  </tr>
  <tr>
    <td>
      Container Name
    </td>
    <td>
      nodejs
    </td>
  </tr>
  <tr>
    <td>
      OS
    </td>
    <td>
      centos-7
    </td>
  </tr>
  <tr>
    <td>
      Node
    </td>
    <td>
      9.11.2
    </td>
  </tr>
  <tr>
    <td>
      Yarn
    </td>
    <td>
      1.3.2
    </td>
  </tr>
  <tr>
    <td>
      Docker
    </td>
    <td>
      18.06.0
    </td>
  </tr>
  <tr>
    <td>
      Helm
    </td>
    <td>
      2.11.0
    </td>
  </tr>
  <tr>
    <td>
      Kubectl
    </td>
    <td>
      Stable release
    </td>
  </tr>
  <tr>
    <td>
      Built-in tools
    </td>
    <td>
      unzip, which, make, wget, zip, bzip2, git
    </td>
  </tr>
  </tbody>
  </table>


### maven podTemplate 

  <table>
  <thead>
  <tr>
    <th>
      이름
    </th>
    <th>
      유형 / 버전
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Jenkins Agent Label
    </td>
    <td>
      maven
    </td>
  </tr>
  <tr>
    <td>
      Container Name
    </td>
    <td>
      maven
    </td>
  </tr>
  <tr>
    <td>
      OS
    </td>
    <td>
      centos-7
    </td>
  </tr>
  <tr>
    <td>
      Jdk
    </td>
    <td>
      openjdk-1.8.0
    </td>
  </tr>
  <tr>
    <td>
      Maven
    </td>
    <td>
      3.5.3
    </td>
  </tr>
  <tr>
    <td>
      Docker
    </td>
    <td>
      18.06.0
    </td>
  </tr>
  <tr>
    <td>
      Helm
    </td>
    <td>
      2.11.0
    </td>
  </tr>
  <tr>
    <td>
      Kubectl
    </td>
    <td>
      Stable release
    </td>
  </tr>
  <tr>
    <td>
      Built-in tools
    </td>
    <td>
      unzip, which, make, wget, zip, bzip2, git
    </td>
  </tr>
  </tbody>
  </table>


### go podTemplate 

  <table>
  <thead>
  <tr>
    <th>
      이름
    </th>
    <th>
      유형 / 버전
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Jenkins Agent Label
    </td>
    <td>
      go
    </td>
  </tr>
  <tr>
    <td>
      Container Name
    </td>
    <td>
      go
    </td>
  </tr>
  <tr>
    <td>
      OS
    </td>
    <td>
      centos-7
    </td>
  </tr>
  <tr>
    <td>
      Go
    </td>
    <td>
      1.11
    </td>
  </tr>
  <tr>
    <td>
      GOPATH
    </td>
    <td>
      /home/jenkins/go
    </td>
  </tr>
  <tr>
    <td>
      GOROOT
    </td>
    <td>
      /usr/local/go
    </td>
  </tr>
  <tr>
    <td>
      Docker
    </td>
    <td>
      18.06.0
    </td>
  </tr>
  <tr>
    <td>
      Helm
    </td>
    <td>
      2.11.0
    </td>
  </tr>
  <tr>
    <td>
      Kubectl
    </td>
    <td>
      Stable release
    </td>
  </tr>
  <tr>
    <td>
      Built-in tools
    </td>
    <td>
      unzip, which, make, wget, zip, bzip2, git
    </td>
  </tr>
  </tbody>
  </table>
