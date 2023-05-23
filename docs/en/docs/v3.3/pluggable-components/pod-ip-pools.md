---
title: "Pod IP Pools"
keywords: "Kubernetes, Super Kubenetes, Pod, IP pools"
description: "Learn how to enable Pod IP Pools to assign a specific Pod IP pool to your Pods."
linkTitle: "Pod IP Pools"
weight: 6920
---

A Pod IP pool is used to manage the Pod network address space, and the address space between each Pod IP pool cannot overlap. When you create a workload, you can select a specific Pod IP pool, so that created Pods will be assigned IP addresses from this Pod IP pool.

## Enable Pod IP Pools Before Installation

### Installing on Linux

When you implement multi-node installation of Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by executing the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									vi config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable Pod IP Pools in this mode (for example, for testing purposes), refer to [the following section](#enable-pod-ip-pools-after-installation) to see how Pod IP pools can be installed after installation.
    </div>
  </div>


2. In this file, navigate to `network.ippool.type` and change `none` to `calico`. Save the file after you finish.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;ippool</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">calico</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "calico".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Create a cluster using the configuration file:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									./kk create cluster -f config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

### Installing on Kubernetes

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable Pod IP Pools first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

1. Download the file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) and edit it.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									./kk create cluster -f config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

2. In this local `cluster-configuration.yaml` file, navigate to `network.ippool.type` and enable it by changing `none` to `calico`. Save the file after you finish.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;ippool</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">calico</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "calico".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Execute the following commands to start installation:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                  kubectl apply -f cluster-configuration.yaml</p>
            </code>
         </div>
      </pre>
   </article>


## Enable Pod IP Pools After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.

2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>


3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/pod-ip-pools/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.

4. In this YAML file, navigate to `network` and change `network.ippool.type` to `calico`. After you finish, click **OK** in the lower-right corner to save the configuration.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;ippool</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">calico</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "calico".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. You can use the web kubectl to check the installation process by executing the following command:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/pod-ip-pools/hammer.png" height="20px"> in the lower-right corner of the console.
    </div>
  </div>

## Verify the Installation of the Component

On the **Cluster Management** page, verify that you can see the **Pod IP Pools** module under **Network**.



