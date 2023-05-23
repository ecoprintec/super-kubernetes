---
title: 'Deploy Super Kubenetes on DigitalOcean Kubernetes'
keywords: 'Kubernetes, Super Kubenetes, DigitalOcean, Installation'
description: 'Learn how to deploy Super Kubenetes on DigitalOcean.'
weight: 4230
---

![Super Kubenetes+DOKS](/dist/assets/docs/v3.3/do/Kuberix-DOKS.png)

This guide walks you through the steps of deploying Super Kubenetes on [DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes/).

## Prepare a DOKS Cluster

A Kubernetes cluster in DO is a prerequisite for installing Super Kubenetes. Go to your [DO account](https://cloud.digitalocean.com/) and refer to the image below to create a cluster from the navigation menu.

![create-cluster-do](/dist/assets/docs/v3.3/do/create-cluster-do.png)

You need to select:

1. Kubernetes version (for example, _1.18.6-do.0_)
2. Datacenter region (for example, _Frankfurt_)
3. VPC network (for example, _default-fra1_)
4. Cluster capacity (for example, 2 standard nodes with 2 vCPUs and 4GB of RAM each)
5. A name for the cluster (for example, _Super Kubenetes-3_)

![config-cluster-do](/dist/assets/docs/v3.3/do/config-cluster-do.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      - To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
      - 2 nodes are included in this example. You can add more nodes based on your own needs especially in a production environment.
      - The machine type Standard / 4 GB / 2 vCPUs is for minimal installation. If you plan to enable several pluggable components or use the cluster for production, you can upgrade your nodes to a more powerful type (such as CPU-Optimized / 8 GB / 4 vCPUs). It seems that DigitalOcean provisions the control plane nodes based on the type of the worker nodes, and for Standard ones the API server can become unresponsive quite soon.</div></div>

When the cluster is ready, you can download the config file for kubectl.

![download-config-file](/dist/assets/docs/v3.3/do/download-config-file.png)

## Install Super Kubenetes on DOKS

Now that the cluster is ready, you can install Super Kubenetes following the steps below:

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

When the installation finishes, you can see the following message:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://10.XXX.XXX.XXX:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After logging into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please modify the default password after login.</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

## Access Super Kubenetes Console

Now that Super Kubenetes is installed, you can access the web console of Super Kubenetes by following the steps below.

- Go to the Kubernetes Dashboard provided by DigitalOcean.

  ![kubernetes-dashboard-access](/dist/assets/docs/v3.3/do/kubernetes-dashboard-access.png)

- Select the **Super Kubenetes-system** namespace.

  ![kubernetes-dashboard-namespace](/dist/assets/docs/v3.3/do/kubernetes-dashboard-namespace.png)

- In **Services** under **Service**, edit the service **ks-console**.

  ![kubernetes-dashboard-edit](/dist/assets/docs/v3.3/do/kubernetes-dashboard-edit.png)

- Change the type from `NodePort` to `LoadBalancer`. Save the file when you finish.

  ![lb-change](/dist/assets/docs/v3.3/do/lb-change.png)

- Access the Super Kubenetes's web console using the endpoint generated by DO.

  ![access-console](/dist/assets/docs/v3.3/do/access-console.png)

   <div className="notices tip">
     <p>Tip</p>
     <div>
       Instead of changing the service type to `LoadBalancer`, you can also access Super Kubenetes console via `NodeIP:NodePort` (service type set to `NodePort`). You need to get the public IP of one of your nodes.
     </div>
   </div>

- Log in to the console with the default account and password (`admin/P@88w0rd`). In the cluster overview page, you can see the dashboard.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.
