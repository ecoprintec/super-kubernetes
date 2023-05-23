---
title: 'Deploy Super Kubenetes on GKE'
keywords: 'Kubernetes, Super Kubenetes, GKE, Installation'
description: 'Learn how to deploy Super Kubenetes on Google Kubernetes Engine.'
weight: 4240
---

<!-- ![Super Kubenetes+GKE](https://pek3b.qingstor.com/kubesphere-docs/png/20191123145223.png) -->

![Super Kubenetes+GKE](/dist/assets/docs/v3.3/gke/kuberix-gke.png)

This guide walks you through the steps of deploying Super Kubenetes on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/).

## Prepare a GKE Cluster

- A standard Kubernetes cluster in GKE is a prerequisite of installing Super Kubenetes. Go to the navigation menu and refer to the image below to create a cluster.

  ![create-cluster-gke](https://ap3.qingstor.com/KubeSphere-website/docs/create-cluster-gke.jpg)

- In **Cluster basics**, select a Master version. The static version `1.15.12-gke.2` is used here as an example.

  ![select-master-version](https://ap3.qingstor.com/KubeSphere-website/docs/master-version.png)

- In **default-pool** under **Node Pools**, define 3 nodes in this cluster.

  ![node-number](https://ap3.qingstor.com/KubeSphere-website/docs/node-number.png)

- Go to **Nodes**, select the image type and set the Machine Configuration as below. When you finish, click **Create**.

  ![machine-config](https://ap3.qingstor.com/KubeSphere-website/docs/machine-configuration.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      - To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
      - 3 nodes are included in this example. You can add more nodes based on your own needs especially in a production environment.
      - The machine type e2-medium (2 vCPU, 4GB memory) is for minimal installation. If you want to enable pluggable components or use the cluster for production, please select a machine type with more resources.
      - For other settings, you can change them as well based on your own needs or use the default value.
    </div>
  </div>

- When the GKE cluster is ready, you can connect to the cluster with Cloud Shell.

  ![cloud-shell-gke](https://ap3.qingstor.com/KubeSphere-website/docs/cloud-shell.png)

## Install Super Kubenetes on GKE

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
                <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://10.128.0.44:30880<span></span></span> 
                <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                <span style="color:#ae81ff">NOTES：</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After logging into the console, please check the</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the "Cluster Management". If any service is not</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please modify the default password after login.</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
              </p>
          </code>
        </div>
    </pre>
  </article>

## Access Super Kubenetes Console

Now that Super Kubenetes is installed, you can access the web console of Super Kubenetes by following the steps below.

- In **Services & Ingress**, select the service **ks-console**.

  ![ks-console](https://ap3.qingstor.com/KubeSphere-website/docs/console-service.jpg)

- In **Service details**, click **Edit** and change the type from `NodePort` to `LoadBalancer`. Save the file when you finish.

  ![lb-change](https://ap3.qingstor.com/KubeSphere-website/docs/lb-change.jpg)

- Access the web console of Super Kubenetes using the endpoint generated by GKE.

  ![access-console](https://ap3.qingstor.com/KubeSphere-website/docs/access-console.png)

  <div className="notices tip">
    <p>Tip</p>
    <div>
      Instead of changing the service type to `LoadBalancer`, you can also access Super Kubenetes console via `NodeIP:NodePort` (service type set to `NodePort`). You may need to open port `30880` in firewall rules.
    </div>
  </div>

- Log in to the console with the default account and password (`admin/P@88w0rd`). In the cluster overview page, you can see the dashboard.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.
