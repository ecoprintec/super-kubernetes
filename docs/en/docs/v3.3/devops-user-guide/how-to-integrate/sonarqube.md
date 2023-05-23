---
title: "Integrate SonarQube into Pipelines"
keywords: 'Kubernetes, Super Kubenetes, DevOps, Jenkins, SonarQube, Pipeline'
description: 'Integrate SonarQube into your pipeline for code quality analysis.'
linkTitle: "Integrate SonarQube into Pipelines"
weight: 11310
---

[SonarQube](https://www.sonarqube.org/) is a popular continuous inspection tool for code quality. You can use it for static and dynamic analysis of a codebase. After it is integrated into pipelines in Super Kubenetes [Container Platform](https://ai.kuberix.co.kr/), you can view common code issues such as bugs and vulnerabilities directly on the dashboard as SonarQube detects issues in a running pipeline.

This tutorial demonstrates how you can integrate SonarQube into pipelines. Refer to the following steps first before you [create a pipeline using a Jenkinsfile](../../../devops-user-guide/how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/).

## Prerequisites

You need to [enable the Super Kubenetes DevOps System](../../../pluggable-components/devops/).

## Install the SonarQube Server

To integrate SonarQube into your pipeline, you must install SonarQube Server first.

1. Install Helm first so that you can install SonarQube using the tool. For example, run the following command to install Helm 3:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  curl <a style="color:#ffffff; cursor:text;">https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3</a> | bash 
               </p>
            </code>
         </div>
      </pre>
   </article>

   View the Helm version.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm version 
                  
                  version.BuildInfo<span style="color:#f92672">{</span>Version:<span style="color:#e6db74">"v3.4.1"</span>, GitCommit:<span style="color:#e6db74">"c4e74854886b2efe3321e185578e6db9be0a6e29"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, GoVersion:<span style="color:#e6db74">"go1.14.11"</span><span style="color:#f92672">}</span></p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         For more information, see [the Helm documentation](https://helm.sh/docs/intro/install/).
      </div>
   </div>


2. Execute the following command to install SonarQube Server.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm upgrade --install sonarqube sonarqube --repo <a style="color:#ffffff; cursor:text;"> https://charts.Super Kubenetes.io/main</a> -n Super Kubenetes-devops-system  --create-namespace --set service.type=NodePort</p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
   <p>Note</p>
   <div>
      Make sure you use Helm 3 to install SonarQube Server.
   </div>
   </div>


3. You will get this prompt:

   ![sonarqube-install](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-install.png)

## Get the SonarQube Console Address

1. Execute the following command to get SonarQube NodePort.

	<article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services sonarqube-sonarqube<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT</a></p>
            </code>
         </div>
      </pre>
   </article>

2. You can get the output as below (`31434` is the port number in this example, which may be different from yours):

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text">http://192.168.0.4:31434</a></p>
            </code>
         </div>
      </pre>
   </article>

## Configure the SonarQube Server

### Step 1: Access the SonarQube console

1. Execute the following command to view the status of SonarQube. Note that the SonarQube console is not accessible until SonarQube is up and running.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>$ kubectl get pod -n Super Kubenetes-devops-system</span> 
                  <span>NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY&nbsp;&nbsp;&nbsp;STATUS&nbsp;&nbsp;&nbsp;&nbsp;RESTARTS&nbsp;&nbsp;&nbsp;AGE</span> 
                  <span>devops-jenkins-68b8949bb-7zwg4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;84m</span> 
                  <span>s2ioperator-0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;84m</span> 
                  <span>sonarqube-postgresql-0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5m31s</span> 
                  <span>sonarqube-sonarqube-bb595d88b-97594&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running <span style="color:#ae81ff">&nbsp;&nbsp;2</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5m31s </span></p>
            </code>
         </div>
      </pre>
   </article>  

2. Access the SonarQube console `http://<Node IP>:<NodePort>` in your browser.

3. Click **Log in** in the upper-right corner and log in as the default account `admin/admin`.

   <div className="notices note">
      <p>Note</p>
      <div>
         You may need to set up necessary port forwarding rules and open the port to access SonarQube in your security groups depending on where your instances are deployed.
      </div>
   </div>

### Step 2: Create a SonarQube admin token

1. Click the letter **A** and select **My Account** from the menu to go to the **Profile** page.

   ![sonarqube-config-1](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-1.jpg)

2. Click **Security** and enter a token name, such as `Super Kubenetes`.

   ![sonarqube-config-2](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-2.jpg)

3. Click **Generate** and copy the token.

   ![sonarqube-config-3](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-config-3.jpg)

   <div className="notices warning">
      <p>Warning</p>
      <div>
            Make sure you do copy the token because you won't be able to see it again as shown in the prompt.
      </div>
   </div> 

### Step 3: Create a webhook server

1. Execute the following command to get the address of SonarQube Webhook.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT/sonarqube-webhook/</a></p>
            </code>
         </div>
      </pre>
   </article>

2. Expected output:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text">http://192.168.0.4:30180/sonarqube-webhook/</a></p>
            </code>
         </div>
      </pre>
   </article>

3. Click **Administration**, **Configuration** and **Webhooks** in turn to create a webhook. 

   ![sonarqube-webhook-1](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-webhook-1.jpg)

4. Click **Create**.

   ![sonarqube-webhook-3](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-webhook-3.jpg)

5. Enter **Name** and **Jenkins Console URL** (for example, the SonarQube Webhook address) in the displayed dialog box. Click **Create** to finish.

   ![webhook-page-info](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/webhook-page-info.jpg)

### Step 4: Add the SonarQube configuration to ks-installer

1. Execute the following command to edit `ks-installer`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cc -n Super Kubenetes-system ks-installer</p>
            </code>
         </div>
      </pre>
   </article>

2. Navigate to `devops`. Add the field `sonarqube` and specify `externalSonarUrl` and `externalSonarToken` under it.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">devops</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_MaxRAM</span>: <span style="color:#ae81ff">2g</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_Xms</span>: <span style="color:#ae81ff">512m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsJavaOpts_Xmx</span>: <span style="color:#ae81ff">512m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsMemoryLim</span>: <span style="color:#ae81ff">2Gi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsMemoryReq</span>: <span style="color:#ae81ff">1500Mi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;jenkinsVolumeSize</span>: <span style="color:#ae81ff">8Gi</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;sonarqube</span>: <span style="color:#75715e"><span>#</span> Add this field manually.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;externalSonarUrl</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.4:31434<span></span></span><span style="color:#75715e">&nbsp;<span>#</span> The SonarQube IP address.</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;externalSonarToken</span>: <span style="color:#ae81ff">f75dc3be11fd3d58debfd4e445e3de844683ad93</span><span style="color:#75715e">&nbsp;<span>#</span> The SonarQube admin token created above.</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Save the file after you finish.

### Step 5: Add the SonarQube server to Jenkins

1. Execute the following command to get the address of Jenkins.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span><span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text">http://$NODE_IP:$NODE_PORT</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. You can get the output as below, which tells you the port number of Jenkins.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text"> http://192.168.0.4:30180</a></p>
            </code>
         </div>
      </pre>
   </article>

3. Access Jenkins with the address `http://<Node IP>:30180`. When Super Kubenetes is installed, the Jenkins dashboard is also installed by default. Besides, Jenkins is configured with Super Kubenetes LDAP, which means you can log in to Jenkins with Super Kubenetes accounts (for example, `admin/P@88w0rd`) directly. For more information about configuring Jenkins, see [Jenkins System Settings](../../../devops-user-guide/how-to-use/pipelines/jenkins-setting/).

   <div className="notices note">
      <p>Note</p>
      <div>
         You may need to set up necessary port forwarding rules and open port `30180` to access Jenkins in your security groups depending on where your instances are deployed.
      </div>
   </div>

4. Click **Manage Jenkins** on the left navigation pane.

5. Scroll down to **Configure System** and click it.

6. Navigate to **SonarQube servers** and click **Add SonarQube**.

7. Enter **Name** and **Server URL** (`http://<Node IP>:<NodePort>`). Click **Add**, select **Jenkins**, and then create the credentials with the SonarQube admin token in the displayed dialog box as shown in the second image below. After adding the credentials, select it from the drop-down list for **Server authentication token** and then click **Apply** to finish.

   ![sonarqube-jenkins-settings](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-jenkins-settings.png)

   ![add-credentials](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/add-credentials.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         If the **Add** button is not working, which is a known bug from Jenkins, you can navigate to **Manage Credentials** under **Manage Jenkins**, click **Jenkins** under **Stores scoped to Jenkins**, click **Global credentials (unrestricted)**, and then click **Add Credentials** from the left navigation bar to add the credentials with the SonarQube admin token by referencing the second image above. After you add the credentials, you can select it from the drop-down list for **Server authentication token**.
      </div>
   </div>

### Step 6: Add sonarqubeURL to the Super Kubenetes Console

You need to specify `sonarqubeURL` so that you can access SonarQube directly from the Super Kubenetes console.

1. Execute the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit  cm -n Super Kubenetes-system  ks-console-config</p>
            </code>
         </div>
      </pre>
   </article>

2. Go to `data.client.enableKubeConfig` and add the field `devops` with `sonarqubeURL` specified under it.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  client:
                  &nbsp;&nbsp;enableKubeConfig: true
                  &nbsp;&nbsp;devops: <span style="color:#75715e"><span>&nbsp;#</span><span> Add this field manually.</span></span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;sonarqubeURL: <a style="color:#ffffff; cursor:text">http://192.168.0.4:31434</a><span style="color:#75715e"><span>&nbsp;#</span><span> The SonarQube IP address.</span></span></p></code></div>
      </pre>
   </article>

3. Save the file.

### Step 7: Restart Services

Execute the following commands.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-devops-system rollout restart deploy devops-apiserver</p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system rollout restart deploy ks-console</p>
         </code>
      </div>
   </pre>
</article>

## Create a SonarQube Token for a New Project

You need a SonarQube token so that your pipeline can communicate with SonarQube as it runs.

1. On the SonarQube console, click **Create new project**.

   ![sonarqube-create-project](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-create-project.jpg)

2. Enter a project key, such as `java-demo`, and click **Set Up**.

   ![jenkins-projet-key](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/jenkins-projet-key.jpg)

3. Enter a project name, such as `java-sample`, and click **Generate**.

   ![generate-a-token](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/generate-a-token.jpg)

4. After the token is created, click **Continue**.

   ![token-created](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/token-created.jpg)

5. Choose **Java** and **Maven** respectively. Copy the serial number within the green box in the image below, which needs to be added in the [Credentials](../../../devops-user-guide/how-to-use/devops-settings/credential-management/#create-credentials) section if it is to be used in pipelines.

   ![sonarqube-example](/dist/assets/docs/v3.3/devops-user-guide/tool-integration/integrate-sonarqube-into-pipeline/sonarqube-example.jpg)

## View Results on the Super Kubenetes Console

After you [create a pipeline using the graphical editing panel](../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/) or [create a pipeline using a Jenkinsfile](../../how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/), you can view the result of code quality analysis.
