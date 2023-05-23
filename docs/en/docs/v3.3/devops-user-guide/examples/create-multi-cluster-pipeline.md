---
title: "Create a Multi-cluster Pipeline"
keywords: 'Super Kubenetes, Kubernetes, Multi-cluster, Pipeline, DevOps'
description: 'Learn how to create a multi-cluster pipeline on Super Kubenetes.'
linkTitle: "Create a Multi-cluster Pipeline"
weight: 11440
---

As cloud providers offer different hosted Kubernetes services, DevOps pipelines have to deal with use cases where multiple Kubernetes clusters are involved.

This tutorial demonstrates how to create a multi-cluster pipeline on Super Kubenetes.

## Prerequisites

- You need to have three Kubernetes clusters with Super Kubenetes installed. Choose one cluster as your host cluster and the other two as your member clusters. For more information about cluster roles and how to build a multi-cluster environment on Super Kubenetes, refer to [Multi-cluster Management](../../../multicluster-management/).
- You need to set your member clusters as [public clusters](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/#make-a-cluster-public). Alternatively, you can [set cluster visibility after a workspace is created](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/#set-cluster-visibility-after-a-workspace-is-created).
- You need to [enable the Super Kubenetes DevOps system](../../../pluggable-components/devops/) on your host cluster.
- You need to integrate SonarQube into your pipeline. For more information, refer to [Integrate SonarQube into Pipelines](../../how-to-integrate/sonarqube/).
- You need to create four accounts on your host cluster: `ws-manager`, `ws-admin`, `project-admin`, and `project-regular`, and grant these accounts different roles. For more information, refer to [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/#step-1-create-an-account).

## Workflow Overview

This tutorial uses three clusters to serve as three isolated environments in the workflow. See the diagram as below.

![use-case-for-multi-cluster](/dist/assets/docs/v3.3/devops-user-guide/examples/create-multi-cluster-pipeline/use-case-for-multi-cluster.png)

The three clusters are used for development, testing, and production respectively. Once codes get submitted to a Git repository, a pipeline will be triggered to run through the following stages—`Unit Test`, `SonarQube Analysis`, `Build & Push`, and `Deploy to Development Cluster`. Developers use the development cluster for self-testing and validation. When developers give approval, the pipeline will proceed to the stage of `Deploy to Testing Cluster` for stricter validation. Finally, the pipeline, with necessary approval ready, will reach the stage of `Deploy to Production Cluster` to provide services externally. 

## Hands-on Lab

### Step 1: Prepare clusters

See the table below for the role of each cluster. 

  <table>
  <thead>
  <tr>
    <th>
      Cluster Name
    </th>
    <th>
      Cluster Role
    </th>
    <th>
      Usage
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      host
    </td>
    <td>
      Host cluster
    </td>
    <td>
      Testing
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      Member cluster
    </td>
    <td>
      Production
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      Member cluster
    </td>
    <td>
      Development
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    These Kubernetes clusters can be hosted across different cloud providers and their Kubernetes versions can also vary. Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
  </div>
</div>

### Step 2: Create a workspace

1. Log in to the web console of the host cluster as `ws-manager`. On the **Workspaces** page, click **Create**.

2. On the **Basic Information** page, name the workspace `devops-multicluster`, select `ws-admin` for **Administrator**, and click **Next**.

3. On the **Cluster Settings** page, select all three clusters and click **Create**.

4. The workspace created is displayed in the list. You need to log out of the console and log back in as `ws-admin` to invite both `project-admin` and `project-regular` to the workspace and grant them the role `workspace-self-provisioner` and `workspace-viewer` respectively. For more information, refer to [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/#step-2-create-a-workspace).

### Step 3: Create a DevOps project

1. Log out of the console and log back in as `project-admin`. Go to the **DevOps Projects** page and click **Create**.

2. In the displayed dialog box, enter `multicluster-demo` for **Name**, select **host** for **Cluster Settings**, and then click **OK**.

  <div className="notices note">
    <p>Note</p>
    <div>
      Only clusters with the DevOps component enabled will be available in the drop-down list.
    </div>
  </div>


3. The DevOps project created is displayed in the list. Make sure you invite the `project-regular` user to this project and assign it the `operator` role. For more information, refer to [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/#step-5-create-a-devops-project-optional).

### Step 4: Create projects on clusters

You must create the projects as shown in the table below in advance. Make sure you invite the `project-regular` user to these projects and assign it the `operator` role. For more information about how to create a project, refer to [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/#step-3-create-a-project).

  <table>
  <thead>
  <tr>
    <th>
      Cluster Name
    </th>
    <th>
      Usage
    </th>
    <th>
      Project Name
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      host
    </td>
    <td>
      Testing
    </td>
    <td>
      Super Kubenetes-sample-prod
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      Production
    </td>
    <td>
      Super Kubenetes-sample-prod
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      Development
    </td>
    <td>
      Super Kubenetes-sample-dev
    </td>
  </tr>
  </tbody>
  </table>

### Step 5: Create credentials

1. Log out of the console and log back in as `project-regular`. On the **DevOps Projects** page, click the DevOps project `multicluster-demo`.

2. On the **Credentials** page, you need to create the credentials as shown in the table below. For more information about how to create credentials, refer to [Credential Management](../../how-to-use/devops-settings/credential-management/#create-credentials) and [Create a Pipeline Using a Jenkinsfile](../../how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/#step-1-create-credentials).

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
      host
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      The host cluster for testing
    </td>
  </tr>
  <tr>
    <td>
      shire
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      The member cluster for production
    </td>
  </tr>
  <tr>
    <td>
      rohan
    </td>
    <td>
      kubeconfig
    </td>
    <td>
      The member cluster for development
    </td>
  </tr>
  <tr>
    <td>
      dockerhub-id
    </td>
    <td>
      Username and password
    </td>
    <td>
      Docker Hub
    </td>
  </tr>
  <tr>
    <td>
      sonar-token
    </td>
    <td>
      Access token
    </td>
    <td>
      SonarQube
    </td>
  </tr>
  </tbody>
  </table>
  
  <div className="notices note">
    <p>Note</p>
    <div>
      You have to manually enter the kubeconfig of your member clusters when creating the kubeconfig credentials `shire` and `rohan`. Make sure your host cluster can access the API Server addresses of your member clusters.
    </div>
  </div>

3. Five credentials are created in total.

### Step 6: Create a pipeline

1. Go to the **Pipelines** page and click **Create**. In the displayed dialog box, enter `build-and-deploy-application` for **Name** and click **Next**.

2. On the **Advanced Settings** tab, click **Create** to use the default settings.

3. The pipeline created is displayed in the list. Click its name to go to the details page.

4. Click **Edit Jenkinsfile** and copy and paste the following contents. Make sure you replace the value of `DOCKERHUB_NAMESPACE` with your own value, and then click **OK**.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									pipeline <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;node <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;parameters <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string<span style="color:#f92672">(</span>name:<span style="color:#e6db74">'BRANCH_NAME'</span><span style="color:#f92672">,</span>defaultValue: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span>description:<span style="color:#e6db74">''</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKER_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'dockerhub-id'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROD_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'shire'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEST_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'host'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEV_KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'rohan'</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_NAMESPACE <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'your Docker Hub account ID'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-maven-sample'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SONAR_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'sonar-token'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TAG_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;"SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'checkout'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git branch: <span style="color:#e6db74">'master'</span><span style="color:#f92672">,</span> url: <span style="color:#e6db74"><a style="color:#e6db74; cursor:text";>'https://github.com/Super Kubenetes/devops-maven-sample.git'</a></span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'unit test'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn clean test'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'sonarqube analysis'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>string<span style="color:#f92672">(</span>credentialsId: <span style="color:#e6db74">"$SONAR_CREDENTIAL_ID"</span><span style="color:#f92672">,</span> variable: <span style="color:#e6db74">'SONAR_TOKEN'</span><span style="color:#f92672">)])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withSonarQubeEnv<span style="color:#f92672">(</span><span style="color:#e6db74">'sonar'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">"mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn -Dmaven.test.skip=true clean package'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span>usernamePassword<span style="color:#f92672">(</span>passwordVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_PASSWORD'</span> <span style="color:#f92672">&nbsp;,</span>usernameVariable <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;'DOCKER_USERNAME'</span> <span style="color:#f92672">,</span>&nbsp;credentialsId <span style="color:#f92672">:</span> <span style="color:#e6db74">&nbsp;"$DOCKER_CREDENTIAL_ID"</span> <span style="color:#f92672">&nbsp;,)])</span> <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'push latest'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to dev'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">DEV_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/dev-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to staging'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input<span style="color:#f92672">(</span>id: <span style="color:#e6db74">'deploy-to-staging'</span><span style="color:#f92672">,</span> message: <span style="color:#e6db74">'deploy to staging?'</span><span style="color:#f92672">)</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">TEST_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/prod-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy to production'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'maven'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input<span style="color:#f92672">(</span>id: <span style="color:#e6db74">'deploy-to-production'</span><span style="color:#f92672">,</span>&nbsp;message: <span style="color:#e6db74">'deploy to production?'</span><span style="color:#f92672">)</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">PROD_KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; deploy/prod-all-in-one/devops-sample.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      The flag `-o` in the `mvn` commands indicates that the offline mode is enabled. If you have relevant maven dependencies and caches ready locally, you can keep the offline mode on to save time.
    </div>
  </div>

5. After the pipeline is created, you can view its stages and steps on the graphical editing panel as well.

### Step 7: Run the pipeline and check the results

1. Click **Run** to run the pipeline. The pipeline will pause when it reaches the stage **deploy to staging** as resources have been deployed to the cluster for development. You need to manually click **Proceed** twice to deploy resources to the testing cluster `host` and the production cluster `shire`.

2. After a while, you can see the pipeline status shown as **Successful**.

3. Check the pipeline running logs by clicking **View Logs** in the upper-right corner. For each stage, you click it to inspect logs, which can be downloaded to your local machine for further analysis.

4. Once the pipeline runs successfully, click **Code Check** to check the results through SonarQube.

5. Go to the **Projects** page, and you can view the resources deployed in different projects across the clusters by selecting a specific cluster from the drop-down list.


   



