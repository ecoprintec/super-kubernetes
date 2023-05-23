---
title: "Deploy Super Kubenetes on AWS EKS"
keywords: 'Kubernetes, Super Kubenetes, EKS, Installation'
description: 'Learn how to deploy Super Kubenetes on Amazon Elastic Kubernetes Service.'
weight: 4220
---

This guide walks you through the steps of deploying Super Kubenetes on [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html). You also can visit [Super Kubenetes on AWS Quick Start](https://aws.amazon.com/quickstart/architecture/qingcloud-Super Kubenetes/) which uses Amazon Web Services (AWS) CloudFormation templates to help end users automatically provision an Amazon Elastic Kubernetes Service (Amazon EKS) and Super Kubenetes environment on the AWS Cloud.

## Install the AWS CLI

First we need to install the AWS CLI. Below is an example for macOS and please refer to [Getting Started EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html) for other operating systems.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>pip3 install awscli --upgrade --user</code>
      </div>
  </pre>
</article>

Check the installation with `aws --version`.
![check-aws-cli](/dist/assets/docs/v3.3/eks/check-aws-cli.png)

## Prepare an EKS Cluster

1. A standard Kubernetes cluster in AWS is a prerequisite of installing Super Kubenetes. Go to the navigation menu and refer to the image below to create a cluster.
   ![create-cluster-eks](/dist/assets/docs/v3.3/eks/eks-launch-icon.png)

2. On the **Configure cluster** page, fill in the following fields:
   ![config-cluster-page](/dist/assets/docs/v3.3/eks/config-cluster-page.png)

   - Name: A unique name for your cluster.

   - Kubernetes version: The version of Kubernetes to use for your cluster.

   - Cluster service role: Select the IAM role that you created with [Create your Amazon EKS cluster IAM role](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#role-create).

   - Secrets encryption (Optional): Choose to enable envelope encryption of Kubernetes secrets using the AWS Key Management Service (AWS KMS). If you enable envelope encryption, the Kubernetes secrets are encrypted using the customer master key (CMK) that you select. The CMK must be symmetric, created in the same region as the cluster. If the CMK was created in a different account, the user must have access to the CMK. For more information, see [Allowing users in other accounts to use a CMK](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html) in the *AWS Key Management Service Developer Guide*.

   - Kubernetes secrets encryption with an AWS KMS CMK requires Kubernetes version 1.13 or later. If no keys are listed, you must create one first. For more information, see [Creating keys](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).

   - Tags (Optional): Add any tags to your cluster. For more information, see [Tagging your Amazon EKS resources](https://docs.aws.amazon.com/eks/latest/userguide/eks-using-tags.html).

3. Select **Next**. On the **Specify networking** page, select values for the following fields:
   ![network](/dist/assets/docs/v3.3/eks/networking.png)

   - VPC: The VPC that you created previously in [Create your Amazon EKS cluster VPC](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#vpc-create). You can find the name of your VPC in the drop-down list.

   - Subnets: By default, the available subnets in the VPC specified in the previous field are preselected. Select any subnet that you don't want to host cluster resources, such as worker nodes or load balancers.

   - Security groups: The SecurityGroups value from the AWS CloudFormation output that you generated with [Create your Amazon EKS cluster VPC](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#vpc-create). This security group has ControlPlaneSecurityGroup in the drop-down name.

   - For **Cluster endpoint access**, choose one of the following options:
      ![endpoints](/dist/assets/docs/v3.3/eks/endpoints.png)

      - Public: Enables only public access to your cluster's Kubernetes API server endpoint. Kubernetes API requests that originate from outside of your cluster's VPC use the public endpoint. By default, access is allowed from any source IP address. You can optionally restrict access to one or more CIDR ranges such as 192.168.0.0/16, for example, by selecting **Advanced settings** and then selecting **Add source**.

      - Private: Enables only private access to your cluster's Kubernetes API server endpoint. Kubernetes API requests that originate from within your cluster's VPC use the private VPC endpoint.

      <div className="notices note">
         <p>Note</p>
         <div>
            If you created a VPC without outbound internet access, then you must enable private access.
         </div>
      </div>
      
      - Public and private: Enables public and private access.

4. Select **Next**. On the **Configure logging** page, you can optionally choose which log types that you want to enable. By default, each log type is **Disabled**. For more information, see [Amazon EKS control plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html).
   ![logging](/dist/assets/docs/v3.3/eks/logging.png)

5. Select **Next**. On the **Review and create page**, review the information that you entered or selected on the previous pages. Select **Edit** if you need to make changes to any of your selections. Once you're satisfied with your settings, select **Create**. The **Status** field shows **CREATING** until the cluster provisioning process completes.
   ![revies](/dist/assets/docs/v3.3/eks/review.png)

   - For more information about the previous options, see [Modifying cluster endpoint access](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html#modify-endpoint-access).
   When your cluster provisioning is complete (usually between 10 and 15 minutes), save the API server endpoint and Certificate authority values. These are used in your kubectl configuration.
   ![creating](/dist/assets/docs/v3.3/eks/creating.png)

6. Create **Node Group** and define 3 nodes in this cluster.
   ![node-group](/dist/assets/docs/v3.3/eks/node-group.png)

7. Configure the node group.
   ![config-node-group](/dist/assets/docs/v3.3/eks/config-node-grop.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         - To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
         - 3 nodes are included in this example. You can add more nodes based on your own needs especially in a production environment.
         - The machine type t3.medium (2 vCPU, 4GB memory) is for minimal installation. If you want to enable pluggable components or use the cluster for production, please select a machine type with more resources.
         - For other settings, you can change them as well based on your own needs or use the default value.
      </div>
   </div>

8. When the EKS cluster is ready, you can connect to the cluster with kubectl.

## Configure kubectl

We will use the kubectl command-line utility for communicating with the cluster API server. First, get the kubeconfig of the EKS cluster created just now.

1. Configure your AWS CLI credentials.

   <article className="highlight">
   <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ aws configure
                  AWS Access Key ID <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: AKIAIOSFODNN7EXAMPLE
                  AWS Secret Access Key <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
                  Default region name <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: region-code
                  Default output format <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: json</p>
            </code>
         </div>
   </pre>
   </article>

2. Create your kubeconfig file with the AWS CLI.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>aws eks --region us-west-2 update-kubeconfig --name cluster_name</code>
         </div>
      </pre>
   </article>

   - By default, the resulting configuration file is created at the default kubeconfig path (`.kube/config`) in your home directory or merged with an existing kubeconfig at that location. You can specify another path with the `--kubeconfig` option.

   - You can specify an IAM role ARN with the `--role-arn` option to use for authentication when you issue kubectl commands. Otherwise, the IAM entity in your default AWS CLI or SDK credential chain is used. You can view your default AWS CLI or SDK identity by running the `aws sts get-caller-identity` command.

   For more information, see the help page with the `aws eks update-kubeconfig help` command or see [update-kubeconfig](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html) in the *AWS CLI Command Reference*.

3. Test your configuration.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>kubectl get svc</code>
            </div>
      </pre>
   </article>

## Install Super Kubenetes on EKS

- Install Super Kubenetes using kubectl. The following commands are only for the default minimal installation.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p>
            </code>
         </div>
      </pre>
   </article>

- Inspect the logs of installation:

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
               <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
            </div>
      </pre>
   </article>

- When the installation finishes, you can see the following message:

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e">###########################################################</span> 
                  <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
                  <span style="color:#75715e">###########################################################</span> 
                  <span style="color:#ffffff">Account: admin</span> 
                  <span style="color:#ffffff">Password: P@88w0rd</span> 
                  <span style="color:#ffffff">NOTES：</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
                  <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
                  <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                  <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
               </p>
            </code>
            </div>
      </pre>
   </article>

## Access Super Kubenetes Console

Now that Super Kubenetes is installed, you can access the web console of Super Kubenetes by following the step below.

- Check the service of Super Kubenetes console through the following command.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>kubectl get svc -n Super Kubenetes-system</code>
            </div>
      </pre>
   </article>

- Edit the configuration of the service **ks-console** by executing `kubectl edit ks-console` and change `type` from `NodePort` to `LoadBalancer`. Save the file when you finish.
![loadbalancer](/dist/assets/docs/v3.3/eks/loadbalancer.png)

- Run `kubectl get svc -n Super Kubenetes-system` and get your external IP.
  ![external-ip](/dist/assets/docs/v3.3/eks/external-ip.png)

- Access the web console of Super Kubenetes using the external IP generated by EKS.

- Log in to the console with the default account and password (`admin/P@88w0rd`). In the cluster overview page, you can see the dashboard.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.

## Reference

[Getting started with the AWS Management Console](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html)
