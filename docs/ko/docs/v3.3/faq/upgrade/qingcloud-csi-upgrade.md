---
title: "Upgrade QingCloud CSI"
keywords: "Kubernetes, upgrade, Super Kubenetes, v3.2.0"
description: "Upgrade the QingCloud CSI after you upgrade Super Kubenetes."
linkTitle: "Upgrade QingCloud CSI"
weight: 16210
---

## Upgrade QingCloud CSI after Upgrading Super Kubenetes

Currently QingCloud CSI cannot be upgraded by KubeKey. You can run the following command to upgrade the CSI manually after you upgrade Super Kubenetes:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               git clone <a style="color:#ffffff; cursor:text;">https://github.com/yunify/qingcloud-csi.git</a>
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               cd qingcloud-csi/
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               git checkout v1.2.0
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl delete -f  deploy/disk/kubernetes/releases/qingcloud-csi-disk-v1.1.1.yaml
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl delete sc csi-qingcloud
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               helm repo add test <a style="color:#ffffff; cursor:text;">https://charts.Super Kubenetes.io/test</a>
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span>helm install test/csi-qingcloud --name-template csi-qingcloud --namespace kube-system \</span> 
               <span>&nbsp;&nbsp;--set config.qy_access_key_id=KEY,config.qy_secret_access_key=SECRET,config.zone=ZONE,sc.type=2</span>
            </p>
         </code>
      </div>
   </pre>
</article>

Wait until the CSI controller and DaemonSet are up and running.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ kubectl get po -n kube-system | grep csi
               csi-qingcloud-controller-56979d46cb-qk9ck   5/5     Running            0          24h
               csi-qingcloud-node-4s8n5                    2/2     Running            0          24h
               csi-qingcloud-node-65dqn                    2/2     Running            0          24h
               csi-qingcloud-node-khk49                    2/2     Running            0          24h
               csi-qingcloud-node-nz9q9                    2/2     Running            0          24h
               csi-qingcloud-node-pxr56                    2/2     Running            0          24h
               csi-qingcloud-node-whqhk                    2/2     Running            0          24h
            </p>
         </code>
      </div>
   </pre>
</article>

Run the following command to check whether the CSI image version is 1.2.x:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ kubectl get po -n kube-system csi-qingcloud-controller-56979d46cb-qk9ck -ojson | jq '.spec.containers[].image' | grep qingcloud
               "csiplugin/csi-qingcloud:v1.2.0-rc.4"
            </p>
         </code>
      </div>
   </pre>
</article>
