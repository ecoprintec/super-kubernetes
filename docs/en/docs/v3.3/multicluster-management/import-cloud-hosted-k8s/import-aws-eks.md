---
title: "Import an AWS EKS Cluster"
keywords: 'Kubernetes, Super Kubenetes, multicluster, Amazon EKS'
description: 'Learn how to import an Amazon Elastic Kubernetes Service cluster.'
titleLink: "Import an AWS EKS Cluster"
weight: 5320
---

This tutorial demonstrates how to import an AWS EKS cluster through the [direct connection](../../../multicluster-management/enable-multicluster/direct-connection/) method. If you want to use the agent connection method, refer to [Agent Connection](../../../multicluster-management/enable-multicluster/agent-connection/).

## Prerequisites

- You have a Kubernetes cluster with Super Kubenetes installed, and prepared this cluster as the host cluster. For more information about how to prepare a host cluster, refer to [Prepare a host cluster](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-host-cluster).
- You have an EKS cluster to be used as the member cluster.

## Import an EKS Cluster

### Step 1: Deploy Super Kubenetes on your EKS cluster

You need to deploy Super Kubenetes on your EKS cluster first. For more information about how to deploy Super Kubenetes on EKS, refer to [Deploy Super Kubenetes on AWS EKS](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-eks/#install-Super Kubenetes-on-eks).

### Step 2: Prepare the EKS member cluster

1. In order to manage the member cluster from the host cluster, you need to make `jwtSecret` the same between them. Therefore, get it first by executing the following command on your host cluster.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
        </div>
    </pre>
  </article>

   The output is similar to the following:
  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code><span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"QVguGh7qnURywHn2od9IiOX6X8f8wK8g"</span></code>
        </div>
    </pre>
  </article>

2. Log in to the Super Kubenetes console of the EKS cluster as `admin`. Click **Platform** in the upper-left corner and then select **Cluster Management**.

3. Go to **CRDs**, enter `ClusterConfiguration` in the search bar, and then press **Enter** on your keyboard. Click **ClusterConfiguration** to go to its detail page.

4. Click <img src="/dist/assets/docs/v3.3/multicluster-management/import-cloud-hosted-k8s/import-eks/three-dots.png" height="20px" v> on the right and then select **Edit YAML** to edit `ks-installer`. 

5. In the YAML file of `ks-installer`, change the value of `jwtSecret` to the corresponding value shown above and set the value of `clusterRole` to `member`. Click **Update** to save your changes.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">authentication</span>:
              <span style="color:#f92672">jwtSecret</span>: <span style="color:#ae81ff">QVguGh7qnURywHn2od9IiOX6X8f8wK8g</span>
          </code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">multicluster</span>:
              <span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">member</span>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure you use the value of your own `jwtSecret`. You need to wait for a while so that the changes can take effect.
    </div>
  </div>

### Step 3: Create a new kubeconfig file

1. [Amazon EKS](https://docs.aws.amazon.com/eks/index.html) doesn’t provide a built-in kubeconfig file as a standard kubeadm cluster does. Nevertheless, you can create a kubeconfig file by referring to this [document](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html). The generated kubeconfig file will be like the following:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
          <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
          <span style="color:#f92672">clusters</span>:
          <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
              <span style="color:#f92672">server</span>: <span style="color:#ae81ff">&lt;endpoint-url&gt;</span> 
              <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">&lt;base64-encoded-ca-cert&gt;</span> 
            <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kubernetes</span> 
          <span style="color:#f92672">contexts</span>:
          <span>-</span><span style="color:#f92672">&nbsp;context</span>:
              <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">kubernetes</span> 
              <span style="color:#f92672">user</span>: <span style="color:#ae81ff">aws</span> 
            <span style="color:#f92672">name</span>: <span style="color:#ae81ff">aws</span> 
          <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">aws</span> 
          <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
          <span style="color:#f92672">preferences</span>: {}
          <span style="color:#f92672">users</span>:
          <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">aws</span> 
            <span style="color:#f92672">user</span>:
              <span style="color:#f92672">exec</span>:
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">client.authentication.k8s.io/v1alpha1</span> 
                <span style="color:#f92672">command</span>: <span style="color:#ae81ff">aws</span> 
                <span style="color:#f92672">args</span>:
                  <span>-</span><span style="color:#e6db74">&nbsp;"eks"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"get-token"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"--cluster-name"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"&lt;cluster-name&gt;"</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;"--role"</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;"&lt;role-arn&gt;"</span> 
                <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;env:</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;name: AWS_PROFILE</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;value: "&lt;aws-profile&gt;"</span>
          </code>
        </div>
    </pre>
  </article>

   However, this automatically generated kubeconfig file requires the command `aws` (aws CLI tools) to be installed on every computer that wants to use this kubeconfig.

2. Run the following commands on your local computer to get the token of the ServiceAccount `Super Kubenetes` created by Super Kubenetes. It has the cluster admin access to the cluster and will be used as the new kubeconfig token.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>TOKEN</span><span style="color:#f92672">=</span><span style="color:#66d9ef"><span>$</span><span>(</span></span><span>kubectl -n Super Kubenetes-system get secret </span><span style="color:#66d9ef"><span>$</span><span>(</span></span>kubectl -n Super Kubenetes-system get sa Super Kubenetes -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d<span style="color:#66d9ef">)</span> 
                  kubectl config set-credentials Super Kubenetes --token<span style="color:#f92672">=</span><span style="color:#e6db74"><span>$</span><span>{</span></span><span>TOKEN</span><span style="color:#e6db74">}</span> 
                  kubectl config set-context --current --user<span style="color:#f92672">=</span>Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Retrieve the new kubeconfig file by running the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>cat ~/.kube/config</code>
        </div>
    </pre>
  </article>

   The output is similar to the following and you can see that a new user `Super Kubenetes` is inserted and set as the current-context user:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
            <span style="color:#f92672">clusters</span>:
            <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
                <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZ...S0tLQo=</span> 
                <span style="color:#f92672">server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://*.sk1.cn-north-1.eks.amazonaws.com.cn</a></span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">contexts</span>:
            <span>-</span><span style="color:#f92672">&nbsp;context</span>:
                <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
                <span style="color:#f92672">user</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
            <span style="color:#f92672">preferences</span>: {}
            <span style="color:#f92672">users</span>:
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">exec</span>:
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">client.authentication.k8s.io/v1alpha1</span> 
                  <span style="color:#f92672">args</span>:
                  <span>-</span><span style="color:#f92672">&nbsp;--<span style="color:#ae81ff">region</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">cn-north-1</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">eks</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">get-token</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;--<span style="color:#ae81ff">cluster-name</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">EKS-LUSLVMT6</span> 
                  <span style="color:#f92672">command</span>: <span style="color:#ae81ff">aws</span> 
                  <span style="color:#f92672">env</span>: <span style="color:#66d9ef">null</span> 
          <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">token</span>: <span style="color:#ae81ff">eyJhbGciOiJSUzI1NiIsImtpZCI6ImlCRHF4SlE5a0JFNDlSM2xKWnY1Vkt5NTJrcDNqRS1Ta25IYkg1akhNRmsifQ.eyJpc3M................9KQtFULW544G-FBwURd6ArjgQ3Ay6NHYWZe3gWCHLmag9gF-hnzxequ7oN0LiJrA-al1qGeQv-8eiOFqX3RPCQgbybmix8qw5U6f-Rwvb47-xA</span>
          </code>
        </div>
    </pre>
  </article>

   You can run the following command to check that the new kubeconfig does have access to the EKS cluster.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get nodes</code>
        </div>
    </pre>
  </article>

   The output is simialr to this:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              NAME                                        STATUS   ROLES    AGE   VERSION
              ip-10-0-47-38.cn-north-1.compute.internal   Ready    &lt;none&gt;   11h   v1.18.8-eks-7c9bda
              ip-10-0-8-148.cn-north-1.compute.internal   Ready    &lt;none&gt;   78m   v1.18.8-eks-7c9bda            
            </p>
          </code>
        </div>
    </pre>
  </article>

### Step 4: Import the EKS member cluster

1. Log in to the Super Kubenetes console on your host cluster as `admin`. Click **Platform** in the upper-left corner and then select **Cluster Management**. On the **Cluster Management** page, click **Add Cluster**.

2. Enter the basic information based on your needs and click **Next**.

3. In **Connection Method**, select **Direct connection**. Fill in the new kubeconfig file of the EKS member cluster and then click **Create**.

4. Wait for cluster initialization to finish.