---
title: 'Deploy Super Kubenetes on AKS'
keywords: 'Super Kubenetes, Kubernetes, Installation, Azure, AKS'
description: 'Learn how to deploy Super Kubenetes on Azure Kubernetes Service.'
weight: 4210
---

This guide walks you through the steps of deploying Super Kubenetes on [Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/).

## Prepare an AKS cluster

Azure can help you implement infrastructure as code by providing resource deployment automation options. Commonly adopted tools include [ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) and [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/what-is-azure-cli?view=azure-cli-latest). In this guide, we will use Azure CLI to create all the resources that are needed for the installation of Super Kubenetes.

### Use Azure Cloud Shell

You don't have to install Azure CLI on your machine as Azure provides a web-based terminal. Click the Cloud Shell button on the menu bar at the upper-right corner in Azure portal.

![Cloud Shell](/dist/assets/docs/v3.3/aks/aks-launch-icon.png)

Select **Bash** Shell.

![Bash Shell](/dist/assets/docs/v3.3/aks/aks-choices-bash.png)

### Create a Resource Group

An Azure resource group is a logical group in which Azure resources are deployed and managed. The following example creates a resource group named `Super KubenetesRG` in the location `westus`.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az group create --name Super KubenetesRG --location westus</code>
      </div>
  </pre>
</article>

### Create an AKS Cluster

Use the command `az aks create` to create an AKS cluster. The following example creates a cluster named `KuberSphereCluster` with three nodes. This will take several minutes to complete.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az aks create --resource-group Super KubenetesRG --name KuberSphereCluster --node-count <span style="color:#ae81ff">3</span> --enable-addons monitoring --generate-ssh-keys</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    You can use `--node-vm-size` or `-s` option to change the size of Kubernetes nodes. The default node size is Standard_DS2_v2 (2vCPU, 7GB memory). For more options, see [az aks create](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-create).
  </div>
</div>

### Connect to the Cluster

To configure kubectl to connect to the Kubernetes cluster, use the command `az aks get-credentials`. This command downloads the credentials and configures that the Kubernetes CLI will use.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az aks get-credentials --resource-group Super KubenetesRG --name KuberSphereCluster</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
              $ kubectl get nodes
              NAME                                STATUS   ROLES   AGE   VERSION
              aks-nodepool1-23754246-vmss000000   Ready    agent   38m   v1.16.13</p>
        </code>
      </div>
  </pre>
</article>

### Check Azure Resources in the Portal

After you execute all the commands above, you can see there are 2 Resource Groups created in Azure Portal.

![Resource groups](/dist/assets/docs/v3.3/aks/aks-create-command.png)

Azure Kubernetes Services itself will be placed in `Super KubenetesRG`.

![Azure Kubernetes Services](/dist/assets/docs/v3.3/aks/aks-dashboard.png)

All the other Resources will be placed in `MC_Super KubenetesRG_KuberSphereCluster_westus`, such as VMs, Load Balancer and Virtual Network.

![Azure Kubernetes Services](/dist/assets/docs/v3.3/aks/aks-all-resources.png)

## Deploy Super Kubenetes on AKS

To start deploying Super Kubenetes, use the following commands.

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

You can inspect the logs of installation through the following command:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## Access Super Kubenetes Console

To access Super Kubenetes console from a public IP address, you need to change the service type to `LoadBalancer`.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl edit service ks-console -n Super Kubenetes-system</code>
      </div>
  </pre>
</article>

Find the following section and change the type to `LoadBalancer`.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;clusterIP</span>: <span style="color:#ae81ff">10.0.78.113</span> 
              <span style="color:#f92672">&nbsp;&nbsp;externalTrafficPolicy</span>: <span style="color:#ae81ff">Cluster</span> 
              <span style="color:#f92672">&nbsp;&nbsp;ports</span>: 
              &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30880</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span>: <span style="color:#ae81ff">8000</span> 
              <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">ks-console</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;tier</span>: <span style="color:#ae81ff">frontend</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v3.0.0</span> 
              <span style="color:#f92672">&nbsp;&nbsp;sessionAffinity</span>: <span style="color:#ae81ff">None</span> 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">LoadBalancer</span> <span style="color:#75715e">&nbsp;<span>#</span> Change NodePort to LoadBalancer</span> 
              <span style="color:#f92672">status</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;loadBalancer</span>: {}
            </p>
        </code>
      </div>
  </pre>
</article>

After saving the configuration of ks-console service, you can use the following command to get the public IP address (under `EXTERNAL-IP`). Use the IP address to access the console with the default account and password (`admin/P@88w0rd`).

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            $ kubectl get svc/ks-console -n Super Kubenetes-system
            NAME         TYPE           CLUSTER-IP    EXTERNAL-IP   PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>        AGE
            ks-console   LoadBalancer   10.0.181.93   13.86.xxx.xxx   80:30194/TCP   13m       6379/TCP       10m          
          </p>
        </code>
      </div>
  </pre>
</article>

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. For pluggable components, you can enable them either before or after the installation. See [Enable Pluggable Components](../../../pluggable-components/) for details.
