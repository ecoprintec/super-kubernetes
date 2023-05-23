---
title: "Workspace Role and Member Management"
keywords: "Kubernetes, workspace, Super Kubenetes, multitenancy"
description: "Customize a workspace role and grant it to tenants."
linkTitle: "Workspace Role and Member Management"
weight: 9400
---

This tutorial demonstrates how to manage roles and members in a workspace.

## Prerequisites

At least one workspace has been created, such as `demo-workspace`. Besides, you need a user of the `workspace-admin` role (for example, `ws-admin`) at the workspace level. For more information, see [Create Workspaces, Projects, Users and Roles](../../quick-start/create-workspace-and-project/).

<div className="notices note">
  <p>Note</p>
  <div>
    The actual role name follows a naming convention: `workspace name-role name`. For example, for a workspace named `demo-workspace`, the actual role name of the role `admin` is `demo-workspace-admin`.
  </div>
</div> 

## Built-in Roles

In **Workspace Roles**, there are four available built-in roles. Built-in roles are created automatically by Super Kubenetes when a workspace is created and they cannot be edited or deleted. You can only view permissions included in a built-in role or assign it to a user.

  <table>
  <thead>
  <tr>
    <th>
      Built-in Roles
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>workspace-viewer</code>
    </td>
    <td>
      Workspace viewer who can view all resources in the workspace.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-self-provisioner</code>
    </td>
    <td>
      Workspace regular member who can view workspace settings, manage app templates, and create projects and DevOps projects.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-regular</code>
    </td>
    <td>
      Workspace regular member who can view workspace settings.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-admin</code>
    </td>
    <td>
      Workspace administrator who has full control over all resources in the workspace.
    </td>
  </tr>
  </tbody>
  </table>

To view the permissions that a role contains:

1. Log in to the console as `ws-admin`. In **Workspace Roles**, click a role (for example, `workspace-admin`) and you can see role details.

2. Click the **Authorized Users** tab to see all the users that are granted the role.

## Create a Workspace Role

1. Navigate to **Workspace Roles** under **Workspace Settings**.

2. In **Workspace Roles**, click **Create** and set a role **Name** (for example, `demo-project-admin`). Click **Edit Permissions** to continue.

3. In the pop-up window, permissions are categorized into different **Modules**. In this example, click **Project Management** and select **Project Creation**, **Project Management**, and **Project Viewing** for this role. Click **OK** to finish creating the role.

  <div className="notices note">
    <p>Note</p>
    <div>
      **Depends on** means the major permission (the one listed after **Depends on**) needs to be selected first so that the affiliated permission can be assigned.
    </div>
  </div> 

4. Newly-created roles will be listed in **Workspace Roles**. To edit the information or permissions, or delete an existing role, click <img src="/dist/assets/docs/v3.3/workspace-administration/role-and-member-management/three-dots.png" height="20px" alt="icon"> on the right.

## Invite a New Member

1. Navigate to **Workspace Members** under **Workspace Settings**, and click **Invite**.
2. Invite a user to the workspace by clicking <img src="/dist/assets/docs/v3.3/workspace-administration/role-and-member-management/add.png" height="20px" alt="icon"> on the right of it and assign a role to it.

3. After you add the user to the workspace, click **OK**. In **Workspace Members**, you can see the user in the list.

4. To edit the role of an existing user or remove the user from the workspace, click <img src="/dist/assets/docs/v3.3/workspace-administration/role-and-member-management/three-dots.png" height="20px" alt="icon"> on the right and select the corresponding operation.