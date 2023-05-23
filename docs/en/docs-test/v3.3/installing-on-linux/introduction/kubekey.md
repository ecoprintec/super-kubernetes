---
title: "KubeKey"
keywords: 'KubeKey, Installation, Super Kubenetes'
description: 'Understand what KubeKey is and how it works to help you create, scale and upgrade your Kubernetes cluster.'
linkTitle: "KubeKey"
weight: 3120
---

Developed in Go, [KubeKey](https://github.com/Super Kubenetes/kubekey) represents a brand-new installation tool as a replacement for the ansible-based installer used before. KubeKey provides you with flexible installation choices, as you can install Kubernetes only or install both Kubernetes and Super Kubenetes.

There are several scenarios to use KubeKey:

- Install Kubernetes only;
- Install Kubernetes and Super Kubenetes together in one command;
- Scale a cluster;
- Upgrade a cluster;
- Install Kubernetes-related add-ons (Chart or YAML).

## How Does KubeKey Work

After you download KubeKey, you use an executable called `kk` to perform different operations. No matter you use it to create, scale or upgrade a cluster, you must prepare a configuration file using `kk` beforehand. This configuration file contains basic parameters of your cluster, such as host information, network configurations (CNI plugin and Pod and Service CIDR), registry mirrors, add-ons (YAML or Chart) and pluggable component options (if you install Super Kubenetes). For more information, see [an example configuration file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).

With the configuration file in place, you execute the `./kk` command with varied flags for different operations. After that, KubeKey automatically installs Docker and pulls all the necessary images for installation. When the installation is complete, you can inspect installation logs.

## Why KubeKey

- The previous ansible-based installer has a bunch of software dependencies such as Python. KubeKey is developed in Go language to get rid of the problem in a variety of environments, making sure the installation is successful.
- KubeKey supports multiple installation options, such as [all-in-one installation](../../../quick-start/all-in-one-on-linux/), [multi-node installation](../multioverview/), and [air-gapped installation](../air-gapped-installation/).
- KubeKey uses Kubeadm to install Kubernetes clusters on nodes in parallel as much as possible in order to reduce installation complexity and improve efficiency. It greatly saves installation time compared to the older installer.
- KubeKey aims to install clusters as an object, i.e., CaaO.

## Download KubeKey

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
          After you download KubeKey, if you transfer it to a new machine also with poor network connections to Googleapis, you must run `export KKZONE=cn` again before you proceed with the steps below.
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


## Support Matrix

If you want to use KubeKey to install both Kubernetes and Super Kubenetes 3.3.0, see the following table of all supported Kubernetes versions.

<table>
  <thead>
    <tr>
      <th>Super Kubenetes version</th>
      <th>Supported Kubernetes versions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v3.3.0</td>
      <td>v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support)</td>
    </tr>
  </tbody>
</table>

<div className="notices note">
  <p>Note</p>
  <div>
    - You can also run `./kk version --show-supported-k8s` to see all supported Kubernetes versions that can be installed by KubeKey. 
    - The Kubernetes versions that can be installed using KubeKey are different from the Kubernetes versions supported by Super Kubenetes v3.3.0. If you want to [install Super Kubenetes 3.3.0 on an existing Kubernetes cluster](../../../installing-on-kubernetes/introduction/overview/), your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). 
    - If you want to use KubeEdge, you are advised to install Kubernetes v1.22.x or earlier to prevent compatability issues.
  </div>
</div> 

