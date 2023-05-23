---
title: "Edit System Resources on the Console"
keywords: "system, resources, Super Kubenetes, Kubernetes"
description: "Enable the editing function of system resources on the console."
linkTitle: 'Edit System Resources on the Console'
Weight: 16520
---

When you install Super Kubenetes, the workspace `system-workspace` is created where all Super Kubenetes system projects and Kubernetes system projects run. To avoid any misoperation on both systems, you are not allowed to edit resources in the workspace directly on the console. However, you can still make adjustments to resources using `kubectl`.

This tutorial demonstrates how to enable the editing function of `system-workspace` resources.

<div className="notices warning">
  <p>Warning</p>
  <div>
    Editing resources in `system-workspace` may cause unexpected results, such as Super Kubenetes system and node failures, and your business may be affected. Please be extremely careful about the operation.
  </div>
</div>


## Edit the Console Configuration

1. Log in to Super Kubenetes as `admin`. Click <img src="/dist/assets/docs/v3.3/common-icons/hammer.png" height="25" width="25" alt="icon" /> in the lower-right corner and select **Kubectl**.

2. Execute the following command:

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl -n Super Kubenetes-system edit cm ks-console-config
               </p>
            </code>
         </div>
      </pre>
   </article>

   

3. Add the `systemWorkspace` field under `client` and save the file.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;client</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes</span>: <span style="color:#ae81ff">v3.3.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubernetes</span>: <span style="color:#ae81ff">v1.22.10</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;openpitrix</span>: <span style="color:#ae81ff">v3.3.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableKubeConfig</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;systemWorkspace</span>: <span style="color:#e6db74">"$"</span><span style="color:#75715e">&nbsp;<span>&nbsp;#</span> Add this line manually.</span> 
              </p>
           </code>
        </div>
    </pre>
  </article>

4. Redeploy `ks-console` by executing the following command and wait for Pods to be recreated.

   <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                  kubectl -n Super Kubenetes-system rollout restart deployment ks-console
              </p>
           </code>
        </div>
    </pre>
  </article>

5. Refresh the Super Kubenetes console and you can see that editing buttons in projects in `system-workspace` appear.

6. If you want to disable the editing function on the console, delete the field `systemWorkspace` by following the same steps above. 

