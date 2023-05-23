---
title: "Telemetry in Super Kubenetes"
keywords: 'Installer, Telemetry, Super Kubenetes, Kubernetes'
description: 'Understand what Telemetry is and how to enable or disable it in Super Kubenetes.'
linkTitle: 'Telemetry in Super Kubenetes'
Weight: 16300
---

Telemetry collects aggregate information about the size of Super Kubenetes clusters installed, Super Kubenetes and Kubernetes versions, components enabled, cluster running time, error logs and so on. Super Kubenetes promises that the information is only used by the Super Kubenetes community to improve products and will not be shared with any third parties.

## What Information Is Collected

- External network IP
- Download date
- Kubernetes version
- Super Kubenetes version
- Kubernetes cluster size
- The type of the operating system
- Installer error logs
- Components enabled
- The running time of Kubernetes clusters
- The running time of Super Kubenetes clusters
- Cluster ID
- Machine ID

## Disable Telemetry

Telemetry is enabled by default when you install Super Kubenetes, while you also have the option to disable it either before or after the installation.

### Disable Telemetry before installation

When you install Super Kubenetes on an existing Kubernetes cluster, you need to download the file [cluster-configuration.yaml]() for cluster settings. If you want to disable Telemetry, do not run `kubectl apply -f` directly for this file.

<div className="notices note">
  <p>Note</p>
  <div>
    If you install Super Kubenetes on Linux, see [Disable Telemetry After Installation](../telemetry/#disable-telemetry-after-installation) directly.
  </div>
</div>

1. Download the file [cluster-configuration.yaml]() and edit it:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi cluster-configuration.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

2. In this local `cluster-configuration.yaml` file, scroll down to the bottom of the file and add `telemetry_enabled: false` as follows:

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span style="color:#f92672">&nbsp;&nbsp;openpitrix</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;store</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;servicemesh</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;telemetry_enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e">&nbsp;<span>#</span> Add this line manually to disable Telemetry.</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Save the file and run the following commands to start installation.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span>kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a></span> 
                  <span></span> 
   										<span>kubectl apply -f cluster-configuration.yaml</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### Disable Telemetry after installation

1. Log in to the console as `admin` and click **Platform** in the upper-left corner.

2. Select **Cluster Management** and navigate to **CRDs**.

  <div className="notices note">
    <p>Note</p>
    <div>
      If you have enabled [the multi-cluster feature](../../../multicluster-management/), you need to select a cluster first.
    </div>
  </div>

3. Enter `clusterconfiguration` in the search bar and click the result to go to its detail page.

4. Click <img src="/dist/assets/docs/v3.3/faq/installation/telemetry-in-Super Kubenetes/three-dots.png" height="20px" alt="icon"> on the right of `ks-installer` and select **Edit YAML**.

5. Scroll down to the bottom of the file, add `telemetry_enabled: false`, and then click **OK**.

<div className="notices note">
  <p>Note</p>
  <div>
    If you want to enable Telemetry again, you can update `ks-installer` by deleting `telemetry_enabled: false` or changing it to `telemetry_enabled: true`.
  </div>
</div>
