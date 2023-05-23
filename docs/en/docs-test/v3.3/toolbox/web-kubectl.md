---
title: "Web Kubectl"
keywords: 'Super Kubenetes, Kubernetes, kubectl, cli'
description: 'The web kubectl tool is integrated into Super Kubenetes to provide consistent user experiences for Kubernetes users.'
linkTitle: "Web Kubectl"
weight: 15500
---

The Kubernetes command-line tool, kubectl, allows you to run commands on Kubernetes clusters. You can use kubectl to deploy applications, inspect and manage cluster resources, view logs, and more.

Super Kubenetes provides web kubectl on the console for user convenience. By default, in the current version, only the account granted the `platform-admin` role (such as the default account `admin`) has the permission to use web kubectl for cluster resource operation and management.

This tutorial demonstrates how to use web kubectl to operate on and manage cluster resources.

## Use Web Kubectl

1. Log in to Super Kubenetes with a user granted the `platform-admin` role, hover over the **Toolbox** in the lower-right corner and select **Kubectl**.

2. You can see the kubectl interface in the pop-up window. If you have enabled the multi-cluster feature, you need to select the target cluster first from the drop-down list in the upper-right corner. This drop-down list is not visible if the multi-cluster feature is not enabled.

3. Enter kubectl commands in the command-line tool to query and manage Kubernetes cluster resources. For example, execute the following command to query the status of all PVCs in the cluster.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl get pvc --all-namespaces
               </p>
            </code>
         </div>
      </pre>
   </article>

    ![web-kubectl-example](/dist/assets/docs/v3.3/web-kubectl/web-kubectl-example.png)

4. Use the following syntax to run kubectl commands from your terminal window:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl <span style="color:#f92672">[</span>command<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>TYPE<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>NAME<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>flags<span style="color:#f92672">]</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - Where `command`, `TYPE`, `NAME`, and `flags` are:
        - `command`: Specifies the operation that you want to perform on one or more resources, such as `create`, `get`, `describe` and `delete`.
        - `TYPE`: Specifies the [resource type](https://kubernetes.io/docs/reference/kubectl/overview/#resource-types). Resource types are case-insensitive and you can specify the singular, plural, or abbreviated forms.
        - `NAME`: Specifies the name of the resource. Names are case-sensitive. If the name is omitted, details for all resources are displayed, such as `kubectl get pods`.
        - `flags`: Specifies optional flags. For example, you can use the `-s` or `--server` flags to specify the address and port of the Kubernetes API server.
      - If you need help, run `kubectl help` from the terminal window or refer to the [Kubernetes kubectl CLI documentation](https://kubernetes.io/docs/reference/kubectl/overview/).
    </div>
  </div>
