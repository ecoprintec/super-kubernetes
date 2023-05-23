---
title: "Deploy Harbor on Super Kubenetes"
keywords: 'Kubernetes, Super Kubenetes, Harbor, app-store'
description: 'Learn how to deploy Harbor from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Harbor on Super Kubenetes"
weight: 14220
---
[Harbor](https://goharbor.io/) is an open-source registry that secures artifacts with policies and role-based access control, ensures images are scanned and free from vulnerabilities, and signs images as trusted.

This tutorial walks you through an example of deploying [Harbor](https://goharbor.io/) from the App Store of Super Kubenetes.

## Prerequisites

- Please make sure you [enable the OpenPitrix system](../../../pluggable-components/app-store/).
- You need to create a workspace, a project, and a user account for this tutorial. The account needs to be a platform regular user and to be invited as the project operator with the `operator` role. In this tutorial, you log in as `project-regular` and work in the project `demo-project` in the workspace `demo-workspace`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Hands-on Lab

### Step 1: Deploy Harbor from the App Store

1. On the **Overview** page of the project `demo-project`, click **App Store** in the upper-left corner.

2. Find Harbor and click **Install** on the **App Information** page.

3. Set a name and select an app version. Make sure Harbor is deployed in `demo-project` and click **Next**.

4. On the **App Settings** page, edit the configuration file of Harbor. Pay attention to the following fields.

   `type`: The method you use to access the Harbor Service. This example uses `nodePort`.

   `tls`: Specify whether you want to enable HTTPS. Set it to `false` for most cases.

   `externalURL`: The URL exposed to tenants.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Don't forget to specify `externalURL`. This field can be very helpful if you have trouble accessing Harbor.

      - Make sure you use the HTTP protocol and its corresponding `nodePort` in this tutorial.
    </div>
  </div>

   When you finish editing the configuration, click **Install** to continue.

5. Wait until Harbor is up and running.

### Step 2: Access Harbor

1. Based on the field `expose.type` you set in the configuration file, the access method may be different. As this example uses `nodePort` to access Harbor, visit `http://<NodeIP>:30002` as set in the previous step.

   ![harbor-login](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-login.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      You may need to open the port in your security groups and configure related port forwarding rules depending on your where your Kubernetes cluster is deployed.
    </div>
  </div>

2. Log in to Harbor using the default account and password (`admin/Harbor12345`). The password is defined in the field `harborAdminPassword` in the configuration file.

   ![harbor-dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/harbor-app/harbor-dashboard.jpg)

## FAQ

1. How to enable HTTP login?

   Set `tls.enabled` to `false` in step 1 above. The protocol of `externalURL` must be the same as `expose.nodePort.ports`.

   If you use Docker login, set `externalURL` to one of `insecure-registries` in `daemon.json`, then reload Docker.

   Here is an example configuration file for your reference. Pay special attention to the comments.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span><span>#</span> NOTICE 192.168.0.9 is the example IP address and you must use your own.</span>
              <span style="color:#f92672">expose</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">nodePort</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tls</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;secretName</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;notarySecretName</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;commonName</span>: <span style="color:#e6db74">"192.168.0.9"</span>  <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> Change commonName to your own.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;nodePort</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The name of NodePort service</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">harbor</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The service port Harbor listens on when serving with HTTP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The node port Harbor listens on when serving with HTTP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30002</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The service port Harbor listens on when serving with HTTPS</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">443</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The node port Harbor listens on when serving with HTTPS</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30003</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Only needed when notary.enabled is set to true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notary</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The service port Notary listens on</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">4443</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The node port Notary listens on</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30004</span> 
              &nbsp;&nbsp;&nbsp;
              <span style="color:#f92672">externalURL</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.9:30002<span></span></span><span style="color:#75715e">&nbsp;<span>#</span> Use your own IP address.</span>      
              <span style="color:#75715e"><span>#</span> The initial password of Harbor admin. Change it from portal after launching Harbor</span>
              <span style="color:#f92672">harborAdminPassword</span>: <span style="color:#e6db74">"Harbor12345"</span> 
              <span style="color:#75715e"><span>#</span> The secret key used for encryption. Must be a string of 16 chars.</span>
              <span style="color:#f92672">secretKey</span>: <span style="color:#e6db74">"not-a-secure-key"</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

2. How to enable HTTPS login?

    a. Use self-signed certificates.
      * Set `tls.enabled` to `true` in the configuration file in step 1, and edit `externalURL` accordingly.
      * Copy the CA certificates stored in the Pod `harbor-core` \'s `/etc/core/ca` to your host.
      * Trust the CA certificates by your host first, then restart Docker.

    b. Use public SSL.
      * Add certificates as a Secret.
      * Set `tls.enabled` to `true` in the configuration file in step 1, and edit `externalURL` accordingly.
      * Edit `tls.secretName`.

For more information, see [the documentation of Harbor](https://goharbor.io/docs/2.1.0/).