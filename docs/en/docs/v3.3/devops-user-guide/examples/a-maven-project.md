---
title: "Build and Deploy a Maven Project"
keywords: 'Kubernetes, Docker, DevOps, Jenkins, Maven'
description: 'Learn how to build and deploy a Maven project using a Super Kubenetes pipeline.'
linkTitle: "Build and Deploy a Maven Project"
weight: 11430
---

## Prerequisites

- You need to [enable the Super Kubenetes DevOps System](../../../pluggable-components/devops/).
- You need to have a [Docker Hub](https://www.dockerhub.com/) account.
- You need to create a workspace, a DevOps project, and a user account, and this user needs to be invited into the DevOps project with the role of `operator`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Workflow for a Maven Project

As is shown in the graph below, there is the workflow for a Maven project in Super Kubenetes DevOps, which uses a Jenkins pipeline to build and deploy the Maven project. All steps are defined in the pipeline.

![maven-project-jenkins](/dist/assets/docs/v3.3/devops-user-guide/examples/build-and-deploy-a-maven-project/maven-project-jenkins.png)

At first, the Jenkins Master creates a Pod to run the pipeline. Kubernetes creates the Pod as the agent of Jenkins Master, and the Pod will be destroyed after the pipeline finished. The main process includes cloning code, building and pushing an image, and deploying the workload.

## Default Configurations in Jenkins

### Maven version

Execute the following command in the Maven builder container to get version information.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
                  mvn --version

                  Apache Maven 3.5.3 <span style="color:#f92672">(</span>3383c37e1f9e9b3bc3df5050c29c8aff9f295297; 2018-02-24T19:49:05Z<span style="color:#f92672">)</span> 
                  Maven home: /opt/apache-maven-3.5.3 
                  Java version: 1.8.0_232, vendor: Oracle Corporation
                  Java home: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.i386/jre
                  Default locale: en_US, platform encoding: UTF-8</p>
         </code>
      </div>
   </pre>
</article>

### Maven cache

The Jenkins Agent mounts the directories by Docker Volume on the node. The pipeline can cache some special directories such as `/root/.m2`, which are used for Maven building and the default cache directory for Maven tools in Super Kubenetes DevOps, so that dependency packages are downloaded and cached on the node.

### Global Maven settings in the Jenkins Agent

The default file path of Maven settings is `maven` and the configuration file path is `/opt/apache-maven-3.5.3/conf/settings.xml`. Execute the following command to get the content of Maven settings.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
                  kubectl get cm -n Super Kubenetes-devops-worker ks-devops-agent -o yaml
            </p>
         </code>
      </div>
   </pre>
</article>

### Network of Maven Pod

The Pod labeled `maven` uses the docker-in-docker network to run the pipeline. Namely, `/var/run/docker.sock` in the node is mounted to the Maven container.

## A Maven Pipeline Example

### Prepare for the Maven project

- Ensure you build the Maven project successfully on the development device.
- Add the Dockerfile to the project repository to build the image. For more information, refer to <https://github.com/Super Kubenetes/devops-maven-sample/blob/master/Dockerfile-online>.
- Add the YAML file to the project repository to deploy the workload. For more information, refer to <https://github.com/Super Kubenetes/devops-maven-sample/tree/master/deploy/dev-ol>. If there are different environments, you need to prepare multiple deployment files.

### Create credentials

<table>
<thead>
<tr>
	<th>
		Credential ID
	</th>
	<th>
		Type
	</th>
	<th>
		Where to Use
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		dockerhub-id
	</td>
	<td>
		Username and password
	</td>
	<td>
		Registry, such as Docker Hub
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
		Workload deployment
	</td>
</tr>
</tbody>
</table>

For details, refer to the [Credential Management](../../how-to-use/devops-settings/credential-management/).

### Create a project for workloads

In this example, all workloads are deployed in `Super Kubenetes-sample-dev`. You must create the project `Super Kubenetes-sample-dev` in advance.

### Create a pipeline for the Maven project

1. Go to **Pipelines** of your DevOps project and click **Create** to create a pipeline named `maven`. For more information, see [Create a Pipeline - using Graphical Editing Panel](../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/).

2. Go to the details page of the pipeline and click **Edit Jenkinsfile**.

3. Copy and paste the following content into the displayed dialog box. You must replace the value of `DOCKERHUB_NAMESPACE` with yours. When you finish editing, click **OK** to save the Jenkinsfile.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                    pipeline <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;parameters <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string<span style="color:#f92672">(</span>name:<span style="color:#e6db74">'TAG_NAME'</span><span style="color:#f92672">,</span>defaultValue: <span style="color:#e6db74">''</span><span style="color:#f92672">,</span>description:<span style="color:#e6db74">''</span><span style="color:#f92672">)</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKER_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dockerhub-id'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'demo-kubeconfig'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
                    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// need to replace by yourself dockerhub namespace 
                    </span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_NAMESPACE <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Docker Hub Namespace'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-maven-sample'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BRANCH_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dev'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROJECT_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Super Kubenetes-sample-dev'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'checkout scm'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Please avoid committing your test changes to this repository 
                    </span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git branch: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span> url: <span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://github.com/Super Kubenetes/devops-maven-sample.git"</a></span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'unit test'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn clean test'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn -Dmaven.test.skip=true clean package'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>usernamePassword<span style="color:#f92672">(</span>passwordVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_PASSWORD'</span> <span style="color:#f92672">&nbsp;,</span>usernameVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_USERNAME'</span> <span style="color:#f92672">&nbsp;,</span>credentialsId <span style="color:#f92672">:</span> <span style="color:#e6db74">"$DOCKER_CREDENTIAL_ID"</span> <span style="color:#f92672">,)])</span> <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to dev'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                    <span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

4. You can see stages and steps are automatically created on graphical editing panels.

### Run and test

1. Click **Run**, enter `v1` for **TAG_NAME** in the displayed dialog box, and then click **OK** to run the pipeline.

2. When the pipeline runs successfully, you can go to the **Run Records** tab to view its details.

3. In the project of `Super Kubenetes-sample-dev`, new workloads were created.

4. On the **Services** page, view the external access information about the Service created.
