---
title: "Deploy GitLab on Super Kubenetes"
keywords: 'Super Kubenetes, Kubernetes, GitLab, App Store'
description: 'Learn how to deploy GitLab on Super Kubenetes and access its service.'
linkTitle: "Deploy GitLab on Super Kubenetes"
weight: 14310
---

[GitLab](https://about.gitlab.com/) is an open-source end-to-end software development platform with built-in version control, issue tracking, code review, CI/CD, and more.

This tutorial demonstrates how to deploy GitLab on Super Kubenetes.

## Prerequisites

- You need to enable [the OpenPitrix system](../../../pluggable-components/app-store/).
- You need to create a workspace, a project, and two accounts (`ws-admin` and `project-regular`) for this tutorial. The account `ws-admin` must be granted the role of `workspace-admin` in the workspace, and the account `project-regular` must be invited to the project with the role of `operator`. If they are not ready, refer to [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Hands-on Lab

### Step 1: Add an app repository

1. Log in to Super Kubenetes as `ws-admin`. In your workspace, go to **App Repositories** under **App Management**, and then click **Add**.

2. In the displayed dialog box, enter `main` for the app repository name and `https://charts.Super Kubenetes.io/main` for the app repository URL. Click **Validate** to verify the URL and you will see a green check mark next to the URL if it is available. Click **OK** to continue.

3. The repository displays in the list after it is successfully imported to Super Kubenetes.

### Step 2: Deploy GitLab

1. Log out of Super Kubenetes and log back in as `project-regular`. In your project, go to **Apps** under **Application Workloads** and click **Create**.

2. In the dialog box that appears, select **From App Template**.

3. Select `main` from the drop-down list, then click **gitlab**.

4. On the **App Information** tab and the **Chart Files** tab, you can view the default settings on the console. Click **Install** to continue.

5. On the **Basic Information** page, you can view the app name, app version, and deployment location. This tutorial uses the version `4.2.3 [13.2.2]`. Click **Next** to continue.

6. On the **App Settings** page, use the following settings to replace the default ones, and then click **Install**.

    <article className="highlight">
      <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>
                <p>
                  <span style="color:#f92672">global</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">demo-project.svc.cluster.local</span> 
                  <span style="color:#f92672">gitlab-runner</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;install</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">gitlab</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;webservice</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;helmTests</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
                </p>
            </code>
          </div>
      </pre>
    </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `demo-project` refers to the project name where GitLab is deployed. Make sure you use your own project name.
    </div>
  </div>

7. Wait for GitLab to be up and running.

8. Go to **Workloads**, and you can see all the Deployments and StatefulSets created for GitLab.

  <div className="notices note">
    <p>Note</p>
    <div>
      It may take a while before all the Deployments and StatefulSets are up and running.
    </div>
  </div>

### Step 3: Get the root user's password

1. Go to **Secrets** under **Configuration**, enter `gitlab-initial-root-password` in the search box, and then press **Enter** on your keyboard to search the Secret.

2. Click the Secret to go to its detail page, and then click <img src="/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/eye-icon.png" width="20px" alt="icon" /> in the upper-right corner to view the password. Make sure you copy it.

### Step 4: Edit the hosts file

1. Find the `hosts` file on your local machine.

  <div className="notices note">
    <p>Note</p>
    <div>
      The path of the `hosts` file is `/etc/hosts` for Linux, or `c:\windows\system32\drivers\etc\hosts` for Windows.
    </div>
  </div>


2. Add the following item into the `hosts` file.

   <article className="highlight">
      <pre style="background: rgb(36, 46, 66);">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									192.168.4.3  gitlab.demo-project.svc.cluster.local
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - `192.168.4.3` and `demo-project` refer to the NodeIP and project name respectively where GitLab is deployed. Make sure you use your own NodeIP and project name.
      - You can use any IP address of the nodes in your Kubernetes cluster.
    </div>
  </div>

### Step 5: Access GitLab

1. Go to **Services** under **Application Workloads**, enter `nginx-ingress-controller` in the search box, and then press **Enter** on your keyboard to search the Service. You can see the Service has been exposed through port `31246`, which you can use to access GitLab.

  <div className="notices note">
    <p>Note</p>
    <div>
      The port number shown on your console may be different. Make sure you use your own port number.
    </div>
  </div>


2. Access GitLab through `http://gitlab.demo-project.svc.cluster.local:31246` using the root account and its initial password (`root/ojPWrWECLWN0XFJkGs7aAqtitGMJlVfS0fLEDE03P9S0ji34XDoWmxs2MzgZRRWF`).

   ![access-gitlab](/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/access_gitlab.png)

   ![gitlab-console](/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/gitlab_console.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      You may need to open the port in your security groups and configure related port forwarding rules depending on where your Kubernetes cluster is deployed.
    </div>
  </div>

