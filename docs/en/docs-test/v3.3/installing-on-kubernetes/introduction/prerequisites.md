---
title: "Prerequisites"
keywords: "Super Kubenetes, Kubernetes, Installation, Prerequisites"
description: "Make sure your environment where an existing Kubernetes cluster runs meets the prerequisites before installation."
linkTitle: "Prerequisites"
weight: 4120
---

You can install Super Kubenetes on virtual machines and bare metal with Kubernetes also provisioned. In addition, Super Kubenetes can also be deployed on cloud-hosted and on-premises Kubernetes clusters as long as your Kubernetes cluster meets the prerequisites below.

- To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
- Available CPU > 1 Core and Memory > 2 G. Only x86_64 CPUs are supported, and Arm CPUs are not fully supported at present.
- A **default** StorageClass in your Kubernetes cluster is configured; use `kubectl get sc` to verify it.
- The CSR signing feature is activated in kube-apiserver when it is started with the `--cluster-signing-cert-file` and `--cluster-signing-key-file` parameters. See [RKE installation issue](https://github.com/Super Kubenetes/Super Kubenetes/issues/1925#issuecomment-591698309).

## Pre-checks

1. Make sure your Kubernetes version is compatible by running `kubectl version` in your cluster node. The output may look as below:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ kubectl version
              Client Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"19"</span>, GitVersion:<span style="color:#e6db74">"v1.19.8"</span>, GitCommit:<span style="color:#e6db74">"fd5d41537aee486160ad9b5356a9d82363273721"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2021-02-17T12:41:51Z"</span>, GoVersion:<span style="color:#e6db74">"go1.15.8"</span>, Compiler:<span style="color:#e6db74">"gc"</span>, Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span> 
              Server Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"19"</span>, GitVersion:<span style="color:#e6db74">"v1.19.8"</span>, GitCommit:<span style="color:#e6db74">"fd5d41537aee486160ad9b5356a9d82363273721"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2021-02-17T12:33:08Z"</span>, GoVersion:<span style="color:#e6db74">"go1.15.8"</span>, Compiler:<span style="color:#e6db74">"gc"</span>, Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span> </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Pay attention to the `Server Version` line. If `GitVersion` shows an older one, you need to upgrade Kubernetes first.
    </div>
  </div>


2. Check if the available resources in your cluster meet the minimum requirements.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ free -g
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total        used        free      shared  buff/cache   available
              Mem:<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2</span> 
              Swap:<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span>            
            </p>
          </code>
        </div>
    </pre>
  </article>

3. Check if there is a **default** StorageClass in your cluster. An existing default StorageClass is a prerequisite for Super Kubenetes installation.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ kubectl get sc
              NAME                      PROVISIONER               AGE
              glusterfs <span style="color:#f92672">(</span>default<span style="color:#f92672">)</span>       kubernetes.io/glusterfs   3d4h              
            </p>
          </code>
        </div>
    </pre>
  </article>

If your Kubernetes cluster environment meets all the requirements above, then you are ready to deploy Super Kubenetes on your existing Kubernetes cluster.

For more information, see [Overview](../overview/).
