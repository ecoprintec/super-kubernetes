---
title: 'Minimal Super Kubenetes on Kubernetes'
keywords: 'Super Kubenetes, Kubernetes, Minimal, Installation'
description: 'Install Super Kubenetes on an existing Kubernetes cluster with a minimal installation package. Your Kubernetes cluster can be hosted on cloud or on-premises.'
linkTitle: 'Minimal Super Kubenetes on Kubernetes'
weight: 2200,
showSubscribe: true
---

In addition to installing Super Kubenetes on a Linux machine, you can also deploy it on existing Kubernetes clusters. This tutorial demonstrates the general steps of completing a minimal Super Kubenetes installation on Kubernetes. For more information, see [Installing on Kubernetes](../../installing-on-kubernetes/).

## Prerequisites

- To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
- Make sure your machine meets the minimal hardware requirement: CPU > 1 Core, Memory > 2 GB.
- A **default** Storage Class in your Kubernetes cluster needs to be configured before the installation.

<div className="notices note">
  <p>Note</p>
  <div>
    - The CSR signing feature is activated in `kube-apiserver` when it is started with the `--cluster-signing-cert-file` and `--cluster-signing-key-file` parameters. See [RKE installation issue]()<!-- (https://github.com/Super Kubenetes/Super Kubenetes/issues/1925#issuecomment-591698309) -->.
    - For more information about the prerequisites of installing Super Kubenetes on Kubernetes, see [Prerequisites](../../installing-on-kubernetes/introduction/prerequisites/).
  </div>
</div>

## Video Demonstration

## Deploy Super Kubenetes

After you make sure your machine meets the conditions, perform the following steps to install Super Kubenetes.

1. Run the following commands to start installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></code>
        </div>
    </pre>

  </article>

2. After Super Kubenetes is successfully installed, you can run the following command to view the installation logs:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

3. Use `kubectl get pod --all-namespaces` to see whether all Pods are running normally in relevant namespaces of Super Kubenetes. If they are, check the port (`30880` by default) of the console by running the following command:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl get svc/ks-console -n Super Kubenetes-system</code>
         </div>
      </pre>
   </article>

4. Make sure port `30880` is opened in your security group and access the web console through the NodePort (`IP:30880`) with the default account and password (`admin/P@88w0rd`).

5. After logging in to the console, you can check the status of different components in **System Components**. You may need to wait for some components to be up and running if you want to use related services.

## Enable Pluggable Components (Optional)

This guide is used only for the minimal installation by default. For more information about how to enable other components in Super Kubenetes, see [Enable Pluggable Components](../../pluggable-components/).
