---
title: 'Installing Super Kubenetes on Kubernetes — Overview'
keywords: 'Super Kubenetes, Kubernetes, Installation'
description: 'Develop a basic understanding of the general steps of deploying Super Kubenetes on an existing Kubernetes cluster.'
linkTitle: 'Overview'
weight: 4110
---

![Super Kubenetes+k8s](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/Kuberix+k8s.png)

As part of Super Kubenetes's commitment to provide a plug-and-play architecture for users, it can be easily installed on existing Kubernetes clusters. More specifically, Super Kubenetes can be deployed on Kubernetes either hosted on clouds (for example, AWS EKS, QingCloud QKE and Google GKE) or on-premises. This is because Super Kubenetes does not hack Kubernetes itself. It only interacts with the Kubernetes API to manage Kubernetes cluster resources. In other words, Super Kubenetes can be installed on any native Kubernetes cluster and Kubernetes distribution.

This section gives you an overview of the general steps of installing Super Kubenetes on Kubernetes. For more information about the specific way of installation in different environments, see Installing on Hosted Kubernetes and Installing on On-premises Kubernetes.

<div className="notices note">
  <p>Note</p>
  <div>
    Read [Prerequisites](../prerequisites/) before you install Super Kubenetes on existing Kubernetes clusters.
  </div>
</div>

## Video Demonstration

## Deploy Super Kubenetes

After you make sure your existing Kubernetes cluster meets all the requirements, you can use kubectl to install Super Kubenetes with the default minimal package.

1. Execute the following commands to start installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p></code></div>
    </pre>

  </article>

2. Inspect the logs of installation:

  <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

3. Use `kubectl get pod --all-namespaces` to see whether all pods are running normally in relevant namespaces of Super Kubenetes. If they are, check the port (30880 by default) of the console through the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc/ks-console -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

4. Make sure port 30880 is opened in security groups and access the web console through the NodePort (`IP:30880`) with the default account and password (`admin/P@88w0rd`).

   ![login](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/login.png)

## Enable Pluggable Components (Optional)

If you start with a default minimal installation, refer to [Enable Pluggable Components](../../../pluggable-components/) to install other components.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       - Pluggable components can be enabled either before or after the installation. Please refer to the example file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/blob/release-3.0/deploy/cluster-configuration.yaml) for more details.
       - Make sure there is enough CPU and memory available in your cluster.
       - It is highly recommended that you install these pluggable components to discover the full-stack features and capabilities provided by Super Kubenetes.
     </div>
   </div>
