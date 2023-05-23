---
title: "Install Plugins to Jenkins in Super Kubenetes"
keywords: "Super Kubenetes, Kubernetes, DevOps, Jenkins, Plugin"
description: "How to install plugins to Jenkins in Super Kubenetes"
linkTitle: "Install Plugins to Jenkins in Super Kubenetes"
Weight: 16810
---

The Super Kubenetes DevOps System offers containerized CI/CD functions based on Jenkins. The primary means of enhancing the functionality of Jenkins is to install plugins. This tutorial demonstrates how to install plugins on the Jenkins dashboard.

<div className="notices warning">
  <p>Warning</p>
  <div>
    Not all Jenkins plugins have good maintaining support. Some plugins may lead to issues in Jenkins or even cause serious problems in Super Kubenetes. It is highly recommended that you make a backup before installing any plugin and run testing in another environment if you can.
  </div>
</div>





## Prerequisites

You need to enable [the Super Kubenetes DevOps system](../../../pluggable-components/devops/).

## Install Plugins

### Step 1: Get the address of Jenkins

1. Run the following command to get the address of Jenkins.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span> <span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text;">http://$NODE_IP:$NODE_PORT</a>
               </p>
            </code>
         </div>
      </pre>
   </article>



2. You can get the output similar to the following. You can access the Jenkins dashboard through the address with your own Super Kubenetes account and password (for example, `admin/P@88w0rd`).

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text;">http://192.168.0.4:30180</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure you use your own address of Jenkins. You may also need to open the port in your security groups and configure related port forwarding rules depending on where your Super Kubenetes cluster is deployed.
    </div>
  </div>


### Step 2: Install plugins on the Jenkins dashboard

1. Log in to the Jenkins dashboard and click **Manage Jenkins**.

2. On the **Manage Jenkins** page, scroll down to **Manage Plugins** and click it.

3. Select the **Available** tab and you have to use the search field to search for the plugins you need. For example, you can enter `git` in the search field, check the checkbox next to the plugin you need, and then click **Install without restart** or **Download now and install after restart** based on your needs.

  <div className="notices note">
    <p>Note</p>
    <div>
      Jenkins plugins are inter-dependent. You may also need to install dependencies when you install a plugin.
    </div>
  </div>

4. If you downloaded an HPI file in advance, you can also select the **Advanced** tab and upload the HPI file to install it as a plugin.

5. On the **Installed** tab, you can view all the plugins installed, and the plugins that are safe to uninstall will have the **Uninstall** button shown on the right.

6. On the **Updates** tab, you can install the updates for plugins by checking the checkbox of a plugin and then click the **Download now and install after restart** button. You can also click the **Check now** button to check for updates.

## See Also

[Managing Plugins](https://www.jenkins.io/doc/book/managing/plugins/)