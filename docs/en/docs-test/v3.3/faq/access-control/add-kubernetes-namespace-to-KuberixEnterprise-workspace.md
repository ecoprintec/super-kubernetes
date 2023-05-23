---
title: "Add Existing Kubernetes Namespaces to a Super Kubenetes Workspace"
keywords: "namespace, project, Super Kubenetes, Kubernetes"
description: "Add your existing Kubernetes namespaces to a Super Kubenetes workspace."
linkTitle: "Add existing Kubernetes namespaces to a Super Kubenetes Workspace"
Weight: 16430
---

A Kubernetes namespace is a Super Kubenetes project. If you create a namespace object not from the Super Kubenetes console, the namespace does not appear directly in a certain workspace. But cluster administrators can still see the namespace on the **Cluster Management** page. At the same time, you can also place the namespace into a workspace.

This tutorial demonstrates how to add an existing Kubernetes namespace to a Super Kubenetes workspace.

## Prerequisites

- You need a user granted a role including the permission of **Cluster Management**. For example, you can log in to the console as `admin` directly or create a new role with the permission and assign it to a user.

- You have an available workspace so that the namespace can be assigned to it. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Create a Kubernetes Namespace

Create an example Kubernetes namespace first so that you can add it to a workspace later. Execute the following command:

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                kubectl create ns demo-namespace</p></code></div>
    </pre>
</article>

For more information about creating a Kubernetes namespace, see [Namespaces Walkthrough](https://kubernetes.io/docs/tasks/administer-cluster/namespaces-walkthrough/).

## Add the Namespace to a Super Kubenetes Workspace

1. Log in to the Super Kubenetes console as `admin` and go to the **Cluster Management** page. Click **Projects**, and you can see all your projects running on the current cluster, including the one just created.

2. The namespace created through kubectl does not belong to any workspace. Click <img src="/dist/assets/docs/v3.3/faq/access-control-and-account-management/add-exisiting-namespaces-to-a-Super Kubenetes-workspace/three-dots.png" height="20px"> on the right and select **Assign Workspace**.

3. In the dialog that appears, select a **Workspace** and a **Project Administrator** for the project and click **OK**.

4. Go to your workspace and you can see the project on the **Projects** page.

