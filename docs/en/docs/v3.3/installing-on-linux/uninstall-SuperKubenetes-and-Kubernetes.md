---
title: "Uninstall Super Kubenetes and Kubernetes"
keywords: 'Kubernetes, Super Kubenetes, uninstalling, remove-cluster'
description: 'Remove Super Kubenetes and Kubernetes from your machines.'
linkTitle: "Uninstall Super Kubenetes and Kubernetes"
weight: 3700
---


Uninstalling Super Kubenetes and Kubernetes means they will be removed from your machine. This operation is irreversible and does not have any backup. Please be cautious with the operation.

To delete your cluster, execute the following command.

- If you installed Super Kubenetes with the quickstart ([all-in-one](../../quick-start/all-in-one-on-linux/)):

    <article className="highlight">
       <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
               <code>./kk delete cluster</code></div></pre></article>
    
- If you installed Super Kubenetes with the advanced mode ([created with a configuration file](../introduction/multioverview/#step-3-create-a-cluster)):

    <article className="highlight">
       <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
               <code>./kk delete cluster <span style="color:#f92672">[</span>-f config-sample.yaml<span style="color:#f92672">]</span></code></div></pre></article>

