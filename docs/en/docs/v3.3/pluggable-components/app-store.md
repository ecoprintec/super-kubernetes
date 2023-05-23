---
title: "Super Kubenetes App Store"
keywords: "Kubernetes, Super Kubenetes, app-store, OpenPitrix"
description: "Learn how to enable the Super Kubenetes App Store to share data and apps internally and set industry standards of delivery process externally."
linkTitle: "Super Kubenetes App Store"
weight: 6200
---

As an open-source and app-centric container platform, Super Kubenetes provides users with a Helm-based App Store for application lifecycle management on the back of [OpenPitrix](https://github.com/openpitrix/openpitrix), an open-source web-based system to package, deploy and manage different types of apps. The Super Kubenetes App Store allows ISVs, developers, and users to upload, test, install, and release apps with just several clicks in a one-stop shop.

Internally, the Super Kubenetes App Store can serve as a place for different teams to share data, middleware, and office applications. Externally, it is conducive to setting industry standards of building and delivery. After you enable this feature, you can add more apps with app templates.

For more information, see [App Store](../../application-store/).

## Enable the App Store Before Installation

### Installing on Linux

When you implement multi-node installation of Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by running the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable the App Store in this mode (for example, for testing purposes), refer to [the following section](#enable-app-store-after-installation) to see how the App Store can be installed after installation.
    </div>
  </div>

2. In this file, search for `openpitrix` and change `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. Create a cluster using the configuration file:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

### Installing on Kubernetes

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable the Super Kubenetes App Store first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

1. Download the file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) and edit it.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>

2. In this local `cluster-configuration.yaml` file, search for `openpitrix` and enable the App Store by changing `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. Run the following commands to start installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/KubeSphere-installer.yaml</a>
              
              kubectl apply -f <a style="color:#ffffff; cursor:text;">cluster-configuration.yaml</a></p>
          </code>
        </div>
    </pre>
  </article>

## Enable the App Store After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-app-store/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.

4. In this YAML file, search for `openpitrix` and change `false` to `true` for `enabled`. After you finish, click **OK** in the lower-right corner to save the configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">openpitrix</span>:
                <span style="color:#f92672">&nbsp;&nbsp;store</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

5. Use the web kubectl to check the installation process by running the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-app-store/hammer.png" height="20px"> in the lower-right corner of the console.
    </div>
  </div>

## Verify the Installation of the Component

After you log in to the console, if you can see **App Store** in the upper-left corner and apps in it, it means the installation is successful.

  <div className="notices note">
    <p>Note</p>
    <div>
      - You can even access the App Store without logging in to the console by visiting `<Node IP Address>:30880/apps`.
      - The **OpenPitrix** tab in Super Kubenetes 3.3.0 does not appear on the **System Components** page after the App Store is enabled.</div></div>

## Use the App Store in a Multi-cluster Architecture

[In a multi-cluster architecture](../../multicluster-management/introduction/kubefed-in-Super Kubenetes/), you have one Host Cluster (H Cluster) managing all Member Clusters (M Clusters). Different from other components in Super Kubenetes, the App Store serves as a global application pool for all clusters, including H Cluster and M Clusters. You only need to enable the App Store on the H Cluster and you can use functions related to the App Store on M Clusters directly (no matter whether the App Store is enabled on M Clusters or not), such as [App Templates](../../project-user-guide/application/app-template/) and [App Repositories](../../workspace-administration/app-repository/import-helm-repository/).

However, if you only enable the App Store on M Clusters without enabling it on the H Cluster, you will not be able to use the App Store on any cluster in the multi-cluster architecture.
