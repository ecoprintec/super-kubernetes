---
title: "Upgrade with KubeKey"
keywords: "Kubernetes, upgrade, Super Kubenetes, 3.3.0, KubeKey"
description: "Use KubeKey to upgrade Kubernetes and Super Kubenetes."
linkTitle: "Upgrade with KubeKey"
weight: 7200
---
KubeKey is recommended for users whose Super Kubenetes and Kubernetes were both installed by [KubeKey](../../installing-on-linux/introduction/kubekey/). If your Kubernetes cluster was provisioned by yourself or cloud providers, refer to [Upgrade with ks-installer](../upgrade-with-ks-installer/).

This tutorial demonstrates how to upgrade your cluster using KubeKey.

## Prerequisites

- You need to have a Super Kubenetes cluster running v3.2.x. If your Super Kubenetes version is v3.1.x or earlier, upgrade to v3.2.x first.
- Read [Release Notes for 3.3.0](../../../v3.3/release/release-v330/) carefully.
- Back up any important component beforehand.
- Make your upgrade plan. Two scenarios are provided in this document for [all-in-one clusters](#all-in-one-cluster) and [multi-node clusters](#multi-node-cluster) respectively.

## Download KubeKey

Follow the steps below to download KubeKey before you upgrade your cluster.

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
      The commands above download the latest release (v2.2.2) of KubeKey. You can change the version number in the command to download a specific version.</div></div>

Make `kk` executable:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              chmod +x kk
            </p>
        </code>
      </div>
  </pre>
</article>

## Upgrade Super Kubenetes and Kubernetes

Upgrading steps are different for single-node clusters (all-in-one) and multi-node clusters.

<div className="notices info">
  <p>Info</p>
  <div>
    When upgrading Kubernetes, KubeKey will upgrade from one MINOR version to the next MINOR version until the target version. For example, you may see the upgrading process going from 1.16 to 1.17 and to 1.18, instead of directly jumping to 1.18 from 1.16.    
  </div>
</div>
### All-in-one cluster

Run the following command to use KubeKey to upgrade your single-node cluster to Super Kubenetes 3.3.0 and Kubernetes v1.22.10:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0
            </p>
        </code>
      </div>
  </pre>
</article>

To upgrade Kubernetes to a specific version, explicitly provide the version after the flag `--with-kubernetes`. Available versions are v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).

### Multi-node cluster

#### Step 1: Generate a configuration file using KubeKey

This command creates a configuration file `sample.yaml` of your cluster.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --from-cluster
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    It assumes your kubeconfig is allocated in `~/.kube/config`. You can change it with the flag `--kubeconfig`.
  </div>
</div>

#### Step 2: Edit the configuration file template

Edit `sample.yaml` based on your cluster configuration. Make sure you replace the following fields correctly.

- `hosts`: The basic information of your hosts (hostname and IP address) and how to connect to them using SSH.
- `roleGroups.etcd`: Your etcd nodes.
- `controlPlaneEndpoint`: Your load balancer address (optional).
- `registry`: Your image registry information (optional).

<div className="notices note">
  <p>Note</p>
  <div>
    For more information, see [Edit the configuration file](../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file) or refer to the `Cluster` section of [the complete configuration file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md) for more information.
  </div>
</div>

#### Step 3: Upgrade your cluster
The following command upgrades your cluster to Super Kubenetes 3.3.0 and Kubernetes v1.22.10:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0 -f sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

To upgrade Kubernetes to a specific version, explicitly provide the version after the flag `--with-kubernetes`. Available versions are v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).

<div className="notices note">
  <p>Note</p>
  <div>
    To use new features of Super Kubenetes 3.3.0, you may need to enable some pluggable components after the upgrade.
  </div>
</div>