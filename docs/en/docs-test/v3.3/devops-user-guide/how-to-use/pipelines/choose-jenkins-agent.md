---
title: "Choose Jenkins Agent"
keywords: 'Kubernetes, Super Kubenetes, Docker, DevOps, Jenkins, Agent'
description: 'Specify the Jenkins agent and use the built-in podTemplate for your pipeline.'
linkTitle: "Choose Jenkins Agent"
weight: 112190
---

The `agent` section specifies where the entire Pipeline, or a specific stage, will execute in the Jenkins environment depending on where the `agent` section is placed. The section must be defined at the upper-level inside the `pipeline` block, but stage-level usage is optional. For more information, see [the official documentation of Jenkins](https://www.jenkins.io/doc/book/pipeline/syntax/#agent).

## Built-in podTemplate

A podTemplate is a template of a Pod that is used to create agents. Users can define a podTemplate to use in the Kubernetes plugin.

As a pipeline runs, every Jenkins agent Pod must have a container named `jnlp` for communications between the Jenkins controller and Jenkins agent. In addition, users can add containers in the podTemplate to meet their own needs. They can choose to use their own Pod YAML to flexibly control the runtime, and the container can be switched by the `container` command. Here is an example.

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

At the same time, Super Kubenetes has some built-in podTemplates, so that users can avoid writing YAML files, greatly reducing learning costs.

In the current version, there are 4 types of built-in podTemplates, i.e. `base`, `nodejs`, `maven` and `go`. Super Kubenetes also provides an isolated Docker environment in Pods.

You can use the built-in podTemplate by specifying the label for an agent. For example, to use the nodejs podTemplate, you can set the label to `nodejs` when creating the Pipeline, as shown in the example below.

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

### podTemplate base

  <table>
  <thead>
  <tr>
    <th>
      Name
    </th>
    <th>
      Type / Version
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Jenkins Agent Label
    </td>
    <td>
      base
    </td>
  </tr>
  <tr>
    <td>
      Container Name
    </td>
    <td>
      base
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


### podTemplate nodejs

  <table>
  <thead>
  <tr>
    <th>
      Name
    </th>
    <th>
      Type / Version
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


### podTemplate maven

  <table>
  <thead>
  <tr>
    <th>
      Name
    </th>
    <th>
      Type / Version
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


### podTemplate go

  <table>
  <thead>
  <tr>
    <th>
      Name
    </th>
    <th>
      Type / Version
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
