---
title: "Create a DevOps Kubeconfig on AWS"
keywords: "Super Kubenetes, Kubernetes, DevOps, Kubeconfig, AWS"
description: "How to create a DevOps kubeconfig on AWS"
linkTitle: "Create a DevOps Kubeconfig on AWS"
Weight: 16820
---

If you have trouble deploying applications into your project when running a pipeline on your AWS cluster with Super Kubenetes installed, it may be caused by the issue of DevOps kubeconfig. This tutorial demonstrates how to create a DevOps kubeconfig on AWS.

## Prerequisites

- You have an AWS cluster with Super Kubenetes installed. For more information about how to install Super Kubenetes on AWS, refer to [Deploy Super Kubenetes on AWS EKS](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-eks/).
- You have enabled [the Super Kubenetes DevOps system](../../../pluggable-components/devops/).
- You have a project available for deploying applications. This tutorial uses the project `Super Kubenetes-sample-dev` as an example.

## Create a DevOps Kubeconfig

### Step 1: Create a Service Account

1. Create a `devops-deploy.yaml` file on your AWS cluster and enter the following contents.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ServiceAccount</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io/v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Role</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-role</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span style="color:#f92672">rules</span>: 
                  <span>-</span><span style="color:#f92672">&nbsp;apiGroups</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;resources</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;verbs</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io/v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">RoleBinding</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-rolebinding</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span style="color:#f92672">roleRef</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;apiGroup</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kind</span>: <span style="color:#ae81ff">Role</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-role</span> 
                  <span style="color:#f92672">subjects</span>: 
                  <span>-</span><span style="color:#f92672">&nbsp;kind</span>: <span style="color:#ae81ff">ServiceAccount</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Run the following command to apply the YAML file.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						kubectl apply -f devops-deploy.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>
   

### Step 2: Get the Service Account Token

1. Run the following command to get the Service Account token.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export TOKEN_NAME<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-sample-dev get sa devops-deploy -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> 
                  kubectl -n Super Kubenetes-sample-dev get secret <span style="color:#e6db74">"</span><span style="color:#e6db74">${</span>TOKEN_NAME<span style="color:#e6db74">}</span><span style="color:#e6db74">"</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d
               </p>
            </code>
         </div>
      </pre>
   </article>

2. The output is similar to the following:

   ![get-token](/dist/assets/docs/v3.3/faq/devops/create-devops-kubeconfig-on-aws/get-token.jpg)

### Step 3: Create a DevOps kubeconfig

1. Log in to your Super Kubenetes console of the AWS cluster and go to your DevOps project. Go to **Credentials** under **DevOps Project Settings**, and then click **Create**. You can name this kubeconfig based on your needs.

2. In the **Content** text box, pay attention to the following contents:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  user:
                      client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FUR...
                      client-key-data: LS0tLS1CRUdJTiBQUk...
               </p>
            </code>
         </div>
      </pre>
   </article>

   You have to replace them with the token retrieved in step 2, then click **OK** to create the kubeconfig.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  user:
                    token:eyJhbGciOiJSUzI1NiIsImtpZCI6Ikl3UkhCay13dHpPY2Z6LW9VTlZKQVR6dVdmb2FHallJQ2E4VzJULUNjUzAifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlc3BoZXJlLXNhbXBsZS1kZXYiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiZGV2b3BzLWRlcGxveS10b2tlbi1kcGY2ZiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJkZXZvcHMtZGVwbG95Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjM0ZTI4OTUtMjM3YS00M2Y5LTkwMTgtZDg4YjY2YTQyNzVmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVzcGhlcmUtc2FtcGxlLWRldjpkZXZvcHMtZGVwbG95In0.Ls6mkpgAU75zVw87FkcWx-MLEXGcJjlnb4rUVtT61Jmc_G6jkn4X45MK1V_HuLje3JZMFjL80QUl5ljHLiCUPQ7oE5AUZaUCdqZVdDYEhqeFuGQb_7Qlh8-UFVGGg8vrb0HeGiOlS0qq5hzwKc9C1OmsXHS92yhNwz9gIOujZRafnGKIsG6TL2hEVY2xI0vvmseDKmKg5o0TbeaTMVePHvECju9Qz3Z7TUYsr7HAOvCPtGutlPWLqGx5uOHenOdeLn71x5RoS98xguZoxYVollciPKCQwBlZ4zWK2hzsLSNNLb9cZpxtgUVyHE0AB0e86IHRngnnNrzpp1_pDxL5jw/
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         Make sure you use your own token.
      </div>
   </div>





