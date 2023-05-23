---
title: "Deploy Apps from the App Store"
keywords: 'Kubernetes, Chart, Helm, Super Kubenetes, Application, App Store'
description: 'Learn how to deploy an application from the App Store.'
linkTitle: "Deploy Apps from the App Store"
weight: 10130
---

The [App Store](../../../application-store/) is also the public app repository on the platform, which means every tenant on the platform can view the applications in the Store regardless of which workspace they belong to. The App Store contains 16 featured enterprise-ready containerized apps and apps released by tenants from different workspaces on the platform. Any authenticated users can deploy applications from the Store. This is different from private app repositories which are only accessible to tenants in the workspace where private app repositories are imported.

This tutorial demonstrates how to quickly deploy [NGINX](https://www.nginx.com/) from the Super Kubenetes App Store powered by [OpenPitrix](https://github.com/openpitrix/openpitrix) and access its service through a NodePort.

## Prerequisites

- You have enabled [OpenPitrix (App Store)](../../../pluggable-components/app-store/).
- You need to create a workspace, a project, and a user (`project-regular`) for this tutorial. The user must be invited to the project and granted the `operator` role. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Hands-on Lab

### Step 1: Deploy NGINX from the App Store

1. Log in to the web console of Super Kubenetes as `project-regular` and click <b>App Store</b> in the upper-left corner.

  <div className="notices note">
    <p>Note</p>
    <div>
      You can also go to <b>Apps</b> under <b>Application Workloads</b> in your project, click <b>Create</b>, and select <b>From App Store</b> to go to the App Store.
    </div>
  </div>

2. Search for NGINX, click it, and click <b>Install</b> on the <b>App Information</b> page. Make sure you click <b>Agree</b> in the displayed <b>App Deploy Agreement</b> dialog box.

3. Set a name and select an app version, confirm the location where NGINX will be deployed , and click <b>Next</b>.

4. In <b>App Settings</b>, specify the number of replicas to deploy for the app and enable Ingress based on your needs. When you finish, click <b>Install</b>.

  <div className="notices note">
    <p>Note</p>
    <div>
      To specify more values for NGINX, use the toggle to see the app’s manifest in YAML format and edit its configurations. 
    </div>
  </div>
   
5. Wait until NGINX is up and running.

### Step 2: Access NGINX

To access NGINX outside the cluster, you need to expose the app through a NodePort first.

1. Go to <b>Services</b> in the created project and click the service name of NGINX.

2. On the Service details page, click <b>More</b> and select <b>Edit External Access</b> from the drop-down menu.

3. Select <b>NodePort</b> for <b>Access Method</b> and click <b>OK</b>. For more information, see [Project Gateway](../../../project-administration/project-gateway/).

4. Under <b>Ports</b>, view the exposed port.

5. Access NGINX through `<NodeIP>:<NodePort>`.

  <div className="notices note">
    <p>Note</p>
    <div>
      You may need to open the port in your security groups and configure related port forwarding rules depending on your where your Kubernetes cluster is deployed.
    </div>
  </div>