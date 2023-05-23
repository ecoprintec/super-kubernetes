---
title: "Deploy Apps from App Templates"
keywords: 'Kubernetes, Chart, Helm, Super Kubenetes, Application, App Templates'
description: 'Learn how to deploy an application from a Helm-based template.'
linkTitle: "Deploy Apps from App Templates"
weight: 10120
---

When you deploy an app, you can select the app from the App Store which contains built-in apps of Super Kubenetes and [apps uploaded as Helm charts](../../../workspace-administration/upload-helm-based-application/). Alternatively, you can use apps from private app repositories added to Super Kubenetes to provide app templates.

This tutorial demonstrates how to quickly deploy [Grafana](https://grafana.com/) using the app template from a private repository, which is based on QingStor object storage.

## Prerequisites

- You have enabled [OpenPitrix (App Store)](../../../pluggable-components/app-store/).
- You have completed the tutorial of [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/). Namely, you must have a workspace, a project and two users (`ws-admin` and `project-regular`). `ws-admin` must be granted the role of `workspace-admin` in the workspace and `project-regular` must be granted the role of `operator` in the project.

## Hands-on Lab

### Step 1: Add an app repository

1. Log in to the web console of Super Kubenetes as `ws-admin`. In your workspace, go to <b>App Repositories</b> under <b>App Management</b>, and then click <b>Add</b>.

2. In the displayed dialog box, enter `test-repo` for the app repository name and `https://helm-chart-repo.pek3a.qingstor.com/kubernetes-charts/` for the repository URL. Click <b>Validate</b> to verify the URL, set <b>Synchronization Interval</b> based on your needs, and click <b>OK</b>.

3. Your repository is displayed in the list after successfully imported to Super Kubenetes.

  <div className="notices note">
    <p>Note</p>
    <div>
      For more information about dashboard properties as you add a private repository, see [Import Helm Repository](../../../workspace-administration/app-repository/import-helm-repository/).
    </div>
  </div>

### Step 2: Deploy Grafana from app templates

1. Log out of Super Kubenetes and log back in as `project-regular`. In your project, go to <b>Apps</b> under <b>Application Workloads</b> and click <b>Create</b>.

2. Select <b>From App Template</b> in the displayed dialog box.

   <b>From App Store</b>: Choose built-in apps and apps uploaded individually as Helm charts.

   <b>From App Templates</b>: Choose apps from private app repositories and the workspace app pool.

3. Select `test-repo` from the drop-down list, which is the private app repository just uploaded.

  <div className="notices note">
    <p>Note</p>
    <div>
      The option <b>Current workspace</b> in the list represents the workspace app pool, which contains apps uploaded as Helm charts. They are also part of app templates.
    </div>
  </div>

4. Enter `grafana` in the search box to search for the app, and then click it to deploy it.

  <div className="notices note">
    <p>Note</p>
    <div>
      The app repository used in this tutorial is synchronized from the Google Helm repository. Some apps in it may not be deployed successfully as their Helm charts are maintained by different organizations.
    </div>
  </div> 

5. Its app information and configuration files are also displayed. Under <b>Version</b>, select a version number from the list and click <b>Install</b>.

6. Set an app name and confirm the version and deployment location. Click <b>Next</b>.
   
7. In <b>App Settings</b>, manually edit the manifest file or click <b>Install</b> directly.

8. Wait for Grafana to be up and running.

### Step 3: Expose the Grafana Service

To access Grafana outside the cluster, you need to expose the app through a NodePort first.

1. Go to <b>Services</b> and click the service name of Grafana.

2. Click <b>More</b> and select <b>Edit External Access</b> from the drop-down menu.

3. Select <b>NodePort</b> for <b>Access Method</b> and click <b>OK</b>. For more information, see [Project Gateway](../../../project-administration/project-gateway/).

4. Under <b>Ports</b>, view the exposed port.

### Step 4: Access Grafana

1. To access the Grafana dashboard, you need the username and password. Go to <b>Secrets</b> under <b>Configuration</b> and click the item that has the same name as the app name.

2. On the details page, click the eye icon to view the username and password.

3. Access Grafana through `<Node IP>:<NodePort>`.

  <div className="notices note">
    <p>Note</p>
    <div>
      You may need to open the port in your security groups and configure related port forwarding rules depending on your where your Kubernetes cluster is deployed.
    </div>
  </div>
