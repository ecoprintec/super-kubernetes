---
title: "Deploy Memcached on Super Kubenetes"
keywords: 'Kubernetes, Super Kubenetes, Memcached, app-store'
description: 'Learn how to deploy Memcached from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Memcached on Super Kubenetes"
weight: 14230
---
[Memcached](https://memcached.org/) is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering. Its API is available for the majority of popular languages.

This tutorial walks you through an example of deploying Memcached from the App Store of Super Kubenetes.

## Prerequisites

- Please make sure you [enable the OpenPitrix system](../../../pluggable-components/app-store/).
- You need to create a workspace, a project, and a user account (`project-regular`) for this tutorial. The account needs to be a platform regular user and to be invited as the project operator with the `operator` role. In this tutorial, you log in as `project-regular` and work in the project `demo-project` in the workspace `demo-workspace`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Hands-on Lab

### Step 1: Deploy Memcached from the App Store

1. On the **Overview** page of the project `demo-project`, click **App Store** in the upper-left corner.

2. Find Memcached and click **Install** on the **App Information** page.

3. Set a name and select an app version. Make sure Memcached is deployed in `demo-project` and click **Next**.

4. In **App Settings**, you can use the default configuration or customize the configuration by editing the YAML file directly. Click **Install** to continue.

5. Wait until Memcached is up and running.

### Step 2: Access Memcached

1. Navigate to **Services**, and click the service name of Memcached.

2. On the detail page, you can find the port number and Pod's IP address under **Ports** and **Pods** respectively.

3. As the Memcached service is headless, access it inside the cluster through the Pod IP and port number. The basic syntax of Memcached `telnet` command is `telnet HOST PORT`. For example:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span><span>&nbsp;telnet 10.10.235.3 11211</span></span> 
                  Trying 10.10.235.3... 
                  Connected to 10.10.235.3. 
                  Escape character is <span style="color:#e6db74">'^]'</span>. 
                  set runoob <span style="color:#ae81ff">0</span> <span style="color:#ae81ff">&nbsp;900</span> <span style="color:#ae81ff">&nbsp;9</span> 
                  memcached 
                  STORED</p>
            </code>
         </div>
      </pre>
   </article>

4. For more information, see [Memcached](https://memcached.org/).