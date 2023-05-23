---
title: "Install an Add-on through YAML Using KubeKey"
keywords: "Installer, KubeKey, Super Kubenetes, Kubernetes, add-ons"
description: "Understand why the installation may fail when you use KubeKey to install an add-on through YAML."
linkTitle: "Install an Add-on through YAML Using KubeKey"
Weight: 16400
---

When you use KubeKey to install add-ons, you put the add-on information (Chart or YAML) under the `addons` field in the configuration file (`config-sample.yaml` by default). If the add-on configuration is provided as a YAML file, in some cases, you may see an error message similar to this during the installation:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Error from server: failed to create typed patch object: xxx: element 0: associative list with keys has an element that omits key field <span style="color:#e6db74">"protocol"</span>
            </p>
         </code>
      </div>
   </pre>
</article>

This is a [known issue of Kubernetes itself](https://github.com/kubernetes-sigs/structured-merge-diff/issues/130), caused by the flag `--server-side`. To solve this issue, do not add your add-on in the configuration file. Instead, you can apply your YAML file after Super Kubenetes is deployed. For example:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl apply -f xxx.yaml <span style="color:#75715e"><span>#</span><span> Use your own YAML file.</span></span>
            </p>
         </code>
      </div>
   </pre>
</article>