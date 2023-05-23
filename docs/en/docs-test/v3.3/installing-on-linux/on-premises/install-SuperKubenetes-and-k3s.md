---
title: "Deploy K3s and Super Kubenetes"
keywords: 'Kubernetes, Super Kubenetes, K3s'
description: 'Learn how to use KubeKey to install K3s and Super Kubenetes.'
linkTitle: "Deploy K3s and Super Kubenetes"
weight: 3530
---

[K3s](https://k3s.io/) is a lightweight Kubernetes distribution built for IoT and edge computing with external dependencies minimized. It is packaged as a single binary that reduces the dependencies and steps that are required to set up a Kubernetes cluster.

You can use KubeKey to install both K3s and Super Kubenetes while Super Kubenetes can also be deployed on an existing K3s cluster.

<div className="notices note">
  <p>Note</p>
  <div>
    Currently, Super Kubenetes on K3s is only for testing and development as some features have not been fully tested.
  </div>
</div> 

## Prerequisites

- For information about the prerequisites for K3s installation, see [the K3s documentation](https://rancher.com/docs/k3s/latest/en/installation/installation-requirements/).
- You may need to create necessary firewall rules or port forwarding rules depending on your environment. For more information, see [Port Requirements](../../../installing-on-linux/introduction/port-firewall/).

## Step 1: Download KubeKey

Follow the step below to download [KubeKey](../../../installing-on-linux/introduction/kubekey/).

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>Download KubeKey from its <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release Page</a> or run the following command:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
      <p>Run the following command first to make sure you download KubeKey from the correct zone.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>Run the following command to download KubeKey:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          After you download KubeKey, if you transfer it to a new machine also with poor network connections to Googleapis, you must run <code>export KKZONE=cn</code> again before you proceed with the following steps.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    The commands above download the latest release (v2.2.2) of KubeKey. Note that an earlier version of KubeKey cannot be used to install K3s.
  </div>
</div>

Make `kk` executable:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

## Step 2: Create a Cluster

1. Create a configuration file of your cluster by running the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --with-kubernetes v1.21.4-k3s --with-Super Kubenetes v3.3.0</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      KubeKey v2.2.2 supports the installation of K3s v1.21.4.
    </div>
  </div>

2. A default file `config-sample.yaml` will be created if you do not customize the name. Edit the file.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                ...
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;hosts</span>:
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node2</span> 
                <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
                <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.21.4-k3s</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;addons</span>: []
                ...
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      For more information about each field in the configuration file, see [an example file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).
    </div>
  </div>


3. Save the file and execute the following command to install K3s and Super Kubenetes:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

4. When the installation finishes, you can inspect installation logs with the following command:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

   Expected output:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#75715e">###########################################################</span> 
              <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
              <span style="color:#75715e">###########################################################</span> 
              <span></span> 
              <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.2:30880</a></span> 
              <span style="color:#ffffff">Account: admin</span> 
              <span style="color:#ffffff">Password: P@88w0rd</span> 
              <span></span> 
              <span style="color:#ffffff">NOTES：</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
              <span></span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
              <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
          </code>
        </div>
    </pre>
  </article>


5. Access the Super Kubenetes console at `<NodeIP>:30880` with the default account and password (`admin/P@88W0rd`).

  <div className="notices note">
    <p>Note</p>
    <div>
      You can enable pluggable components of Super Kubenetes after the installation while some features may not be compatible as Super Kubenetes on K3s is only experimental currently.
    </div>
  </div>
