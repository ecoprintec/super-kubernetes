---
title: "Deploy Apps in a Multi-cluster Project Using a Jenkinsfile"
keywords: 'Kubernetes, Super Kubenetes, Docker, DevOps, Jenkins, Multi-cluster'
description: 'Learn how to deploy apps in a multi-cluster project using a Jenkinsfile-based pipeline.'
linkTitle: "Deploy Apps in a Multi-cluster Project Using a Jenkinsfile"
weight: 11420
---

## Prerequisites

- You need to [enable the multi-cluster feature](../../../multicluster-management/) and create a workspace with your multiple clusters.
- You need to have a [Docker Hub](https://hub.docker.com/) account.
- You need to [enable the Super Kubenetes DevOps System](../../../pluggable-components/devops/) on your host cluster.
- You need to use a user (for example, `project-admin`) with the role of `workspace-self-provisioner` to create a multi-cluster project and a DevOps project on the host cluster. This tutorial creates a multi-cluster project on the host cluster and one member cluster.
- You need to invite a user (for example, `project-regular`) to the DevOps project and grant it the role of `operator`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/), [Multi-cluster Management](../../../multicluster-management/) and [Multi-cluster Projects](../../../project-administration/project-and-multicluster-project/#multi-cluster-projects).

## Create a Docker Hub Access Token

1. Log in to [Docker Hub](https://hub.docker.com/), click your account in the upper-right corner, and select **Account Settings** from the menu.

2. Click **Security** in the left navigation pane and then click **New Access Token**.

3. In the displayed dialog box, enter a token name (`go-project-token`) and click **Create**.

4. Click **Copy and Close** and make sure you save the access token.

## Create Credentials

You need to create credentials in Super Kubenetes for the access token created so that the pipeline can interact with Docker Hub for pushing images. Besides, you also need to create kubeconfig credentials for the access to the Kubernetes cluster.

1. Log in to the web console of Super Kubenetes as `project-regular`. In your DevOps project, go to **Credentials** under **DevOps Project Settings** and then click **Create** on the **Credentials** page.

2. In the displayed dialog box, set a **Name**, which is used later in the Jenkinsfile, and select **Username and password** for **Type**. Enter your Docker Hub account name for **Username** and the access token just created for **Password/Token**. When you finish, click **OK**.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       For more information about how to create credentials, see [Credential Management](../../../devops-user-guide/how-to-use/devops-settings/credential-management/).
     </div>
   </div>


3. Log out of the Super Kubenetes web console and log back in as `project-admin`. Go to your DevOps project and click **Create** in **Credentials**. Select **kubeconfig** for **Type**. Note that Super Kubenetes automatically populates the **Content** field, which is the kubeconfig of the current account. Set a **Name** and click **OK**.
   
<div className="notices note">
  <p>Note</p>
  <div>
    In future releases, you will be able to invite the account `project-regular` to your multi-cluster project and grant it the necessary role to create the kubeconfig credentials.
  </div>
</div>


## Create a Pipeline

With the above credentials ready, you can use the user `project-regular` to create a pipeline with an example Jenkinsfile as below.

1. To create a pipeline, click **Create** on the **Pipelines** page.

2. Set a name in the displayed dialog box and click **Next**.

3. In this tutorial, you can use default values for all the fields. On the **Advanced Settings** tab, click **Create**.

## Edit the Jenkinsfile

1. In the pipeline list, click this pipeline to go to its details page. Click **Edit Jenkinsfile** to define a Jenkinsfile and your pipeline runs based on it.

2. Copy and paste all the content below to the displayed dialog box as an example Jenkinsfile for your pipeline. You must replace the value of `DOCKERHUB_USERNAME`, `DOCKERHUB_CREDENTIAL`, `KUBECONFIG_CREDENTIAL_ID`, `MULTI_CLUSTER_PROJECT_NAME`, and `MEMBER_CLUSTER_NAME` with yours. When you finish, click **OK**.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									pipeline <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'go'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;environment <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;REGISTRY <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'docker.io'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// Docker Hub username 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_USERNAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Your Docker Hub username'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;APP_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'devops-go-sample'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// ‘dockerhub’ is the Docker Hub credentials ID you created on the Super Kubenetes console 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;DOCKERHUB_CREDENTIAL <span style="color:#f92672">=</span> credentials<span style="color:#f92672">(</span><span style="color:#e6db74">'dockerhub'</span><span style="color:#f92672">)</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the kubeconfig credentials ID you created on the Super Kubenetes console 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;KUBECONFIG_CREDENTIAL_ID <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'kubeconfig'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// mutli-cluster project name under your own workspace 
									</span><span style="color:#75715e"></span>&nbsp;&nbsp;&nbsp;&nbsp;MULTI_CLUSTER_PROJECT_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'demo-multi-cluster'</span> 
									<span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// the name of the member cluster where you want to deploy your app 
									</span><span style="color:#75715e"></span>    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// in this tutorial, the apps are deployed on host cluster and only one member cluster 
									</span><span style="color:#75715e"></span>    <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;// for more member clusters, please edit manifest/multi-cluster-deploy.yaml 
									</span><span style="color:#75715e"></span>    MEMBER_CLUSTER_NAME <span style="color:#f92672">=</span> <span style="color:#e6db74">&nbsp;'Your member cluster name'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'docker login'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'echo $DOCKERHUB_CREDENTIAL_PSW  | docker login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'build &amp; push'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'git clone <a style="color:#e6db74; cursor:text">https://github.com/yuswift/devops-go-sample.git'</a></span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'cd devops-go-sample &amp;&amp; docker build -t $REGISTRY/$DOCKERHUB_USERNAME/$APP_NAME .'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'docker push $REGISTRY/$DOCKERHUB_USERNAME/$APP_NAME'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									
									&nbsp;&nbsp;&nbsp;&nbsp;stage<span style="color:#f92672">(</span><span style="color:#e6db74">'deploy app to multi cluster'</span><span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container<span style="color:#f92672">(</span><span style="color:#e6db74">'go'</span><span style="color:#f92672">)</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withCredentials<span style="color:#f92672">([</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubeconfigFile<span style="color:#f92672">(</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;credentialsId: env<span style="color:#f92672">.</span><span style="color:#a6e22e">KUBECONFIG_CREDENTIAL_ID</span><span style="color:#f92672">,</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: <span style="color:#e6db74">'KUBECONFIG'</span><span style="color:#f92672">)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])</span> <span style="color:#f92672">&nbsp;{</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'envsubst &lt; devops-go-sample/manifest/multi-cluster-deploy.yaml | kubectl apply -f -'</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If your pipeline runs successfully, images will be pushed to Docker Hub. If you are using Harbor, you cannot pass the parameter to `docker login -u`  via the Jenkins credential with environment variables. This is because every Harbor robot account username contains a  `$` character, which will be converted to `$$` by Jenkins when used by environment variables. [Learn more](https://number1.co.za/rancher-cannot-use-harbor-robot-account-imagepullbackoff-pull-access-denied/).
    </div>
  </div>


## Run the Pipeline

After you save the Jenkinsfile, click **Run**. If everything goes well, you will see the Deployment workload in your multi-cluster project.
