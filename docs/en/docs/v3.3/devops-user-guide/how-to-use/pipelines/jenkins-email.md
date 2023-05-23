---
title: "Set the Email Server for Super Kubenetes Pipelines"
keywords: 'Super Kubenetes, Kubernetes, notification, jenkins, devops, ci/cd, pipeline, email server'
description: 'Set the email server to receive notifications of your Jenkins pipelines.'
linkTitle: "Set Email Server for Super Kubenetes Pipelines"
Weight: 11218
---


The built-in Jenkins cannot share the same email configuration with the platform notification system. Thus, you need to configure email server settings for Super Kubenetes DevOps pipelines separately.

## Prerequisites

- You need to enable the [Super Kubenetes DevOps System](../../../../pluggable-components/devops/).
- You need a user granted a role including the **Cluster Management** permission. For example, you can log in to the console as `admin` directly or create a new role with the permission and assign it to a user.

## Set the Email Server

1. Click **Platform** in the upper-left corner and select **Cluster Management**.

2. If you have enabled the [multi-cluster feature](../../../../multicluster-management/) with member clusters imported, you can select a specific cluster to view its nodes. If you have not enabled the feature, refer to the next step directly.

3. Go to **Workloads** under **Application Workloads**, and select the project **Super Kubenetes-devops-system** from the drop-down list. Click <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" height="15" alt="icon" /> on the right of `devops-jenkins` and select **Edit YAML** to edit its YAML.

4. Scroll down to the fields in the image below which you need to specify. Click **OK** when you finish to save changes.

  <div className="notices warning">
    <p>Warning</p>
    <div>
        Once you modify the Email server in the `devops-jenkins` Deployment, it will restart itself. Consequently, the DevOps system will be unavailable for a few minutes. Please make such modification at an appropriate time.
    </div>
  </div>

   ![set-jenkins-email](/dist/assets/docs/v3.3/devops-user-guide/using-devops/jenkins-email/set-jenkins-email.png)

  <table>
  <thead>
  <tr>
    <th>
      Environment Variable Name
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      EMAIL_SMTP_HOST
    </td>
    <td>
      SMTP server address
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_SMTP_PORT
    </td>
    <td>
      SMTP server port (for example, 25)
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_ADDR
    </td>
    <td>
      Email sender address
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_NAME
    </td>
    <td>
      Email sender name
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_PASS
    </td>
    <td>
      Email sender password
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_USE_SSL
    </td>
    <td>
      SSL configuration enabled or not
    </td>
  </tr>
  </tbody>
  </table>
