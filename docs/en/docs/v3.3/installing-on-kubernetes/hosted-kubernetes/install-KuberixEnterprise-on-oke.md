---
title: 'Deploy Super Kubenetes on Oracle OKE'
keywords: 'Kubernetes, Super Kubenetes, OKE, Installation, Oracle-cloud'
description: 'Learn how to deploy Super Kubenetes on Oracle Cloud Infrastructure Container Engine for Kubernetes.'
weight: 4260
---

This guide walks you through the steps of deploying Super Kubenetes on [Oracle Kubernetes Engine](https://www.oracle.com/cloud/compute/container-engine-kubernetes.html).

## Create a Kubernetes Cluster

- A standard Kubernetes cluster in OKE is a prerequisite of installing Super Kubenetes. Go to the navigation menu and refer to the image below to create a cluster.

  ![oke-cluster](https://ap3.qingstor.com/KubeSphere-website/docs/oke-cluster.jpg)

- In the pop-up window, select **Quick Create** and click **Launch Workflow**.

  ![oke-quickcreate](https://ap3.qingstor.com/KubeSphere-website/docs/oke-quickcreate.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      In this example, **Quick Create** is used for demonstration which will automatically create all the resources necessary for a cluster in Oracle Cloud. If you select **Custom Create**, you need to create all the resources (such as VCN and LB Subnets) by yourself.
    </div>
  </div>

- Next, you need to set the cluster with basic information. Here is an example for your reference. When you finish, click **Next**.

  ![set-basic-info](https://ap3.qingstor.com/KubeSphere-website/docs/cluster-setting.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      - To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
      - It is recommended that you should select **Public** for **Visibility Type**, which will assign a public IP address for every node. The IP address can be used later to access the web console of Super Kubenetes.
      - In Oracle Cloud, a Shape is a template that determines the number of CPUs, amount of memory, and other resources that are allocated to an instance. `VM.Standard.E2.2 (2 CPUs and 16G Memory)` is used in this example. For more information, see [Standard Shapes](https://docs.cloud.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vmshapes__vm-standard).
      - 3 nodes are included in this example. You can add more nodes based on your own needs especially in a production environment.
    </div>
  </div>

- Review cluster information and click **Create Cluster** if no adjustment is needed.

  ![create-cluster](https://ap3.qingstor.com/KubeSphere-website/docs/create-cluster.jpg)

- After the cluster is created, click **Close**.

  ![cluster-ready](https://ap3.qingstor.com/KubeSphere-website/docs/cluster-ready.jpg)

- Make sure the Cluster Status is **Active** and click **Access Cluster**.

  ![access-cluster](https://ap3.qingstor.com/KubeSphere-website/docs/access-cluster.jpg)

- In the pop-up window, select **Cloud Shell Access** to access the cluster. Click **Launch Cloud Shell** and copy the code provided by Oracle Cloud.

  ![cloud-shell-access](https://ap3.qingstor.com/KubeSphere-website/docs/cloudshell-access.png)

- In Cloud Shell, paste the command so that we can execute the installation command later.

  ![cloud-shell-oke](https://ap3.qingstor.com/KubeSphere-website/docs/oke-cloud-shell.png)

  <div className="notices warning">
    <p>Warning</p>
    <div>
        If you do not copy and execute the command above, you cannot proceed with the steps below.
    </div>
  </div>

## Install Super Kubenetes on OKE

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
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e">###########################################################</span> 
                <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
                <span style="color:#75715e">###########################################################</span> 
                <span></span> 
                <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://10.0.10.2:30880<span></span></span> 
                <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                <span></span> 
                <span style="color:#ae81ff">NOTES：</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After logging into the console, please check the</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the "Cluster Management". If any service is not</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please modify the default password after login.</span> 
                <span></span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
              </p>
          </code>
        </div>
    </pre>
  </article>

## Access Super Kubenetes Console

Now that Super Kubenetes is installed, you can access the web console of Super Kubenetes either through `NodePort` or `LoadBalancer`.

- Check the service of Super Kubenetes console through the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

- The output may look as below. You can change the type to `LoadBalancer` so that the external IP address can be exposed.

  ![console-nodeport](https://ap3.qingstor.com/KubeSphere-website/docs/nodeport-console.jpg)

   <div className="notices tip">
     <p>Tip</p>
     <div>
       It can be seen above that the service `ks-console` is being exposed through a NodePort, which means you can access the console directly via `NodeIP:NodePort` (the public IP address of any node is applicable). You may need to open port `30880` in firewall rules.
     </div>
   </div>

- Execute the command to edit the service configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl edit svc ks-console -o yaml -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

- Navigate to `type` and change `NodePort` to `LoadBalancer`. Save the configuration after you finish.

  ![change-svc-type](https://ap3.qingstor.com/KubeSphere-website/docs/change-service-type.png)

- Execute the following command again and you can see the IP address displayed as below.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

  ![console-service](https://ap3.qingstor.com/KubeSphere-website/docs/console-service.png)

- Log in to the console through the external IP address with the default account and password (`admin/P@88w0rd`). In the cluster overview page, you can see the dashboard.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.
