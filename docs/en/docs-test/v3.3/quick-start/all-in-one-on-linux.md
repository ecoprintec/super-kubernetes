---
title: 'All-in-One Installation of Kubernetes and Super Kubenetes on Linux'
keywords: 'Super Kubenetes, Kubernetes, All-in-One, Installation'
description: 'Install Super Kubenetes on Linux with a minimal installation package. The tutorial serves as a basic kick-starter for you to understand the container platform, paving the way for learning the following guides.'
linkTitle: 'All-in-One Installation on Linux'
weight: 2100
showSubscribe: true
---

For those who are new to Super Kubenetes and looking for a quick way to discover the [container platform](https://ai.kuberix.co.kr/), the all-in-one mode is your best choice to get started. It features rapid deployment and hassle-free configurations with Super Kubenetes and Kubernetes all provisioned on your machine.

## Video Demonstration

## Step 1: Prepare a Linux Machine

To get started with all-in-one installation, you only need to prepare one host according to the following requirements for hardware and operating system.

### Hardware recommendations

<table>
  <tbody>
    <tr>
    <th width='320'>OS</th>
    <th>Minimum Requirements</th>
    </tr>
    <tr>
      <td><b>Ubuntu</b> <i>16.04</i>, <i>18.04</i></td>
      <td>2 CPU cores, 4 GB memory, and 40 GB disk space</td>
    </tr>
    <tr>
      <td><b>Debian</b> <i>Buster</i>, <i>Stretch</i></td>
      <td>2 CPU cores, 4 GB memory, and 40 GB disk space</td>
    </tr><tr>
    <td><b>CentOS</b> <i>7.x</i></td>
      <td>2 CPU cores, 4 GB memory, and 40 GB disk space</td>
    </tr><tr>
    <td><b>Red Hat Enterprise Linux 7</b></td>
      <td>2 CPU cores, 4 GB memory, and 40 GB disk space</td>
    </tr><tr>
    <td><b>SUSE Linux Enterprise Server 15/openSUSE Leap 15.2</b></td>
      <td>2 CPU cores, 4 GB memory, and 40 GB disk space</td>
    </tr>
  </tbody>
</table>

<div className="src-pages-docs-containers-Introduction-index__notices src-pages-docs-containers-Introduction-index__note">
  <p>Note</p>
  <div>
    The preceding system requirements and the following instructions are for the default minimal installation without any pluggable components enabled. If your machine has at least 8 CPU cores and 16 GB memory, it is recommended that you enable all components. For more information, see [Enable Pluggable Components](../../pluggable-components/).
  </div>
</div>

### Node requirements

- The node can be accessed through `SSH`.
- `sudo`/`curl`/`openssl`/`tar` should be used.

### Container runtimes

Your cluster must have an available container runtime. If you use KubeKey to set up a cluster, KubeKey installs the latest version of Docker by default. Alternatively, you can manually install Docker or other container runtimes before you create a cluster.

<table>
  <tbody>
    <tr>
      <th width='500'>Supported Container Runtime</th>
      <th>Version</th>
    </tr>
    <tr>
      <td>Docker</td>
      <td>19.3.8 +</td>
    </tr>
    <tr>
      <td>containerd</td>
      <td>Latest</td>
    </tr><tr>
      <td>CRI-O (experimental, not fully tested)</td>
      <td>Latest</td>
    </tr><tr>
      <td>iSula (experimental, not fully tested)</td>
      <td>Latest</td>
    </tr>
  </tbody>
</table>

### Dependency requirements

KubeKey can install Kubernetes and Super Kubenetes together. The dependency that needs to be installed may be different based on the Kubernetes version to be installed. You can refer to the following list to see if you need to install relevant dependencies on your node in advance.

<table>
  <tbody>
    <tr>
      <th>Dependency</th>
     <th>Kubernetes Version ≥ 1.18</th>
      <th>Kubernetes Version < 1.18</th>
    </tr>
    <tr>
      <td><code>socat</code></td>
     <td>Required</td> 
      <td>Optional but recommended</td> 
     </tr>
    <tr>
      <td><code>conntrack</code></td>
     <td>Required</td> 
      <td>Optional but recommended</td> 
    </tr><tr>
    <td><code>ebtables</code></td>
     <td>Optional but recommended</td> 
    <td>Optional but recommended</td> 
    </tr><tr>
    <td><code>ipset</code></td>
    <td>Optional but recommended</td> 
     <td>Optional but recommended</td> 
    </tr>
  </tbody>
</table>

<div className="notices info">
  <p>info</p>
  <div>
    Developed in Go, KubeKey represents a brand-new installation tool as a replacement for the ansible-based installer used before. KubeKey provides users with flexible installation choices, as they can install Super Kubenetes and Kubernetes separately or install them at one time, which is convenient and efficient.
  </div>
</div>

### Network and DNS requirements

- Make sure the DNS address in `/etc/resolv.conf` is available. Otherwise, it may cause some issues of DNS in the cluster.
- If your network configuration uses firewall rules or security groups, you must ensure infrastructure components can communicate with each other through specific ports. It is recommended that you turn off the firewall. For more information, see [Port Requirements](../../installing-on-linux/introduction/port-firewall/).
- Supported CNI plugins: Calico and Flannel. Others (such as Cilium and Kube-OVN) may also work but note that they have not been fully tested.

<div className="notices tip">
  <p>Tip</p>
  <div>
    - It is recommended that your OS be clean (without any other software installed). Otherwise, there may be conflicts.
    - It is recommended that a registry mirror (a booster) be prepared if you have trouble downloading images from `dockerhub.io`. For more information, see [Configure a Booster for Installation](../../faq/installation/configure-booster/).
  </div>
</div>

## Step 2: Download KubeKey

Perform the following steps to download KubeKey.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>Download KubeKey from its <a href="">GitHub Release Page</a> or run the following command:</p>
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
    The commands above download the latest release (v2.2.2) of KubeKey. You can change the version number in the command to download a specific version.
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

## Step 3: Get Started with Installation

You only need to run one command for all-in-one installation. The template is as follows:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster [--with-kubernetes version] [--with-Super Kubenetes version]</code>
      </div>
  </pre>
</article>

To create a Kubernetes cluster with Super Kubenetes installed, refer to the following command as an example:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
      - Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey installs Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../../installing-on-linux/introduction/kubekey/#support-matrix).
      - For all-in-one installation, you do not need to change any configuration.
      - If you do not add the flag `--with-Super Kubenetes` in the command in this step, Super Kubenetes will not be deployed. KubeKey will install Kubernetes only. If you add the flag `--with-Super Kubenetes` without specifying a Super Kubenetes version, the latest version of Super Kubenetes will be installed.
      - KubeKey will install [OpenEBS](https://openebs.io/) to provision LocalPV for the development and testing environment by default, which is convenient for new users. For other storage classes, see [Persistent Storage Configurations](../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/).
  </div>
</div>

After you run the command, you will see a table for environment check. For details, see [Node requirements](#node-requirements) and [Dependency requirements](#dependency-requirements). Type `yes` to continue.

## Step 4: Verify the Installation

Run the following command to check the result.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

The output displays the IP address and port number of the web console, which is exposed through `NodePort 30880` by default. Now, you can access the console at `<NodeIP>:30880` with the default account and password (`admin/P@88w0rd`).

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
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
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

<div className="notices note">
  <p>Note</p>
  <div>
    You may need to configure port forwarding rules and open the port in your security group so that external users can access the console.
  </div>
</div>

After logging in to the console, you can check the status of different components in **System Components**. You may need to wait for some components to be up and running if you want to use related services. You can also use `kubectl get pod --all-namespaces` to inspect the running status of Super Kubenetes workloads.

## Enable Pluggable Components (Optional)

This guide is used only for the minimal installation by default. For more information about how to enable other components in Super Kubenetes, see [Enable Pluggable Components](../../pluggable-components/).
