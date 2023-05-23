---
title: "Customize Cluster Name in Notification Messages"
keywords: 'Super Kubenetes, Kubernetes, Platform, Notification'
description: 'Learn how to customize cluster name in notification messages sent by Super Kubenetes.'
linkTitle: "Customize Cluster Name in Notification Messages"
weight: 8721
---

This document describes how to customize your cluster name in notification messages sent by Super Kubenetes.

## Prerequisites

You need to have a user with the `platform-admin` role, for example, the `admin` user. For more information, see [Create Workspaces, Projects, Users and Roles](../../../../quick-start/create-workspace-and-project/).

## Customize Cluster Name in Notification Messages

1. Log in to the Super Kubenetes console as `admin`.

2. Click <img src="/dist/assets/docs/v3.3/common-icons/hammer.png" width="15" alt="icon" /> in the lower-right corner and select **Kubectl**.

3. In the displayed dialog box, run the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl edit nm notification-manager
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Add a field `cluster` under `.spec.receiver.options.global` to customize your cluster name:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;receivers</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;options</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;global</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cluster</span>: <span style="color:#ae81ff">&lt;Cluster name&gt;</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>
   
5. When you finish, save the changes.



