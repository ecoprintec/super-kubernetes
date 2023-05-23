---
title: "Customize Jenkins Agent"
keywords: "Super Kubenetes, Kubernetes, DevOps, Jenkins, Agent"
description: "Learn how to customize a Jenkins agent on Super Kubenetes."
linkTitle: "Customize Jenkins Agent"
Weight: 112191
---

If you need to use a Jenkins agent that runs on a specific environment, for example, JDK 11, you can customize a Jenkins agent on Super Kubenetes.

This document describes how to customize a Jenkins agent on Super Kubenetes. 

## Prerequisites

- You have enabled [the Super Kubenetes DevOps System](../../../../pluggable-components/devops/).

## Customize a Jenkins agent

1. Log in to the web console of Super Kubenetes as `admin`.

2. Click **Platform** in the upper-left corner, select **Cluster Management**, and click **Configmaps** under **Configuration** on the left navigation pane.

3. On the **Configmaps** page, enter `jenkins-casc-config` in the search box and press **Enter**.

4. Click `jenkins-casc-config` to go to its details page, click **More**, and select **Edit YAML**.

5. In the displayed dialog box, enter the following code under the `data.jenkins_user.yaml:jenkins.clouds.kubernetes.templates` section and click **OK**.

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
    Make sure you follow the indentation in the YAML file.
  </div>
</div>

6. Wait for at least 70 seconds until your changes are automatically reloaded.

7. To use the custom Jenkins agent, refer to the following sample Jenkinsfile to specify the label and container name of the custom Jenkins agent accordingly when creating a pipeline.

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

   
