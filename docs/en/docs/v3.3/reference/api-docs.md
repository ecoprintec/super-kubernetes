---
title: 'Super Kubenetes API'
keywords: 'Kubernetes, Super Kubenetes, API'
description: 'The REST API is the fundamental fabric of Super Kubenetes. This guide shows you how to access the Super Kubenetes API server.'
linkTitle: 'Super Kubenetes API'
weight: 17200
---

## Architecture

The Super Kubenetes API server validates and configures data for API objects. The API Server services REST operations and provides the frontend to the cluster's shared state through which all other components interact.

![ks-apiserver](/dist/assets/docs/v3.3/reference/Super Kubenetes-api/ks-apiserver.png)

## Use the Super Kubenetes API

Super Kubenetes v3.0 moves the functionalities of **ks-apigateway** and **ks-account** into **ks-apiserver** to make the architecture more compact and clear. In order to use the Super Kubenetes API, you need to expose **ks-apiserver** to your client.

### Step 1: Expose the Super Kubenetes API service

If you are going to access Super Kubenetes inside the cluster, you can skip the following section and just use the Super Kubenetes API server endpoint **`http://ks-apiserver.Super Kubenetes-system.svc`**.

On the other hand, you need to expose the Super Kubenetes API server endpoint outside the cluster first.

There are many ways to expose a Kubernetes service. For demonstration purposes, this example uses `NodePort`. Change the service type of `ks-apiserver` to `NodePort` by using the following command.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ kubectl -n Super Kubenetes-system patch service ks-apiserver -p <span style="color:#e6db74">'{"spec":{"type":"NodePort"}}'</span> 
               $ kubectl -n Super Kubenetes-system get svc
               NAME            TYPE           CLUSTER-IP      EXTERNAL-IP      PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>              AGE
               etcd            ClusterIP      10.233.34.220   &lt;none&gt;           2379/TCP             44d
               ks-apiserver    NodePort       10.233.15.31    &lt;none&gt;           80:31407/TCP         49d
               ks-console      NodePort       10.233.3.45     &lt;none&gt;           80:30880/TCP         49d
            </p>
         </code>
      </div>
   </pre>
</article>

Now, you can access `ks-apiserver` outside the cluster through the URL like `http://[node ip]:31407`, where `[node ip]` means the IP address of any node in your cluster.

### Step 2: Generate a token

You need to identify yourself before making any call to the API server. The following example uses the password `P#$$w0rd`. The user needs to issue a request to generate a token as below:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               curl -X POST -H <span style="color:#e6db74">'Content-Type: application/x-www-form-urlencoded'</span><span style="color:#ae81ff">&nbsp;\</span> 
               <span style="color:#ae81ff"></span><span style="color:#e6db74">&nbsp;<span></span><a style="color:#e6db74; cursor:text;">'http://<span>[</span>node ip]:31407/oauth/token'</a></span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'grant_type=password'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'username=admin'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'password=P#$$w0rd'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'client_id=Super Kubenetes'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'client_secret=Super Kubenetes'</span>
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Replace `[node ip]` with your actual IP address. You can configure client credentials in `ClusterConfiguration`, there is a default client credential `client_id` and `client_secret` is `Super Kubenetes`.
  </div>
</div>

If the identity is correct, the server will respond as shown in the following output. `access_token` is the token to access the Super Kubenetes API Server.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               {
                  <span style="color:#f92672">"access_token"</span>: <span style="color:#e6db74">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6MTYwMDg1MjM5OCwiaWF0IjoxNjAwODQ1MTk4LCJpc3MiOiJrdWJlc3BoZXJlIiwibmJmIjoxNjAwODQ1MTk4fQ.Hcyf-CPMeq8XyQQLz5PO-oE1Rp1QVkOeV_5J2oX1hvU"</span>,
                  <span style="color:#f92672">"token_type"</span>: <span style="color:#e6db74">"Bearer"</span>,
                  <span style="color:#f92672">"refresh_token"</span>: <span style="color:#e6db74">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJleHAiOjE2MDA4NTk1OTgsImlhdCI6MTYwMDg0NTE5OCwiaXNzIjoia3ViZXNwaGVyZSIsIm5iZiI6MTYwMDg0NTE5OH0.PerssCLVXJD7BuCF3Ow8QUNYLQxjwqC8m9iOkRRD6Tc"</span>,
                  <span style="color:#f92672">"expires_in"</span>: <span style="color:#ae81ff">7200</span> 
               }
            </p>
         </code>
      </div>
   </pre>
</article>

### Step 3: Make the call

If you have everything you need to access the Super Kubenetes API server, make the call using the access token acquired above as shown in the following example to get the node list:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ curl -X GET -H <span style="color:#e6db74">"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6MTYwMDg1MjM5OCwiaWF0IjoxNjAwODQ1MTk4LCJpc3MiOiJrdWJlc3BoZXJlIiwibmJmIjoxNjAwODQ1MTk4fQ.Hcyf-CPMeq8XyQQLz5PO-oE1Rp1QVkOeV_5J2oX1hvU"</span> <span style="color:#ae81ff">\
               </span><span style="color:#ae81ff"></span>  -H <span style="color:#e6db74">'Content-Type: application/json'</span><span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  <span style="color:#e6db74">&nbsp;&nbsp;'<a style="color:#e6db74; cursor:text;">http://[node</a> ip]:31407/kapis/resources.Super Kubenetes.io/v1alpha3/nodes'</span> 
               <span></span> 
               <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;"items"</span>: <span style="color:#f92672">[</span> 
               <span style="color:#f92672">&nbsp;&nbsp;{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;"metadata"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"name"</span>: <span style="color:#e6db74">"node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"selfLink"</span>: <span style="color:#e6db74">"/api/v1/nodes/node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"uid"</span>: <span style="color:#e6db74">"dd8c01f3-76e8-4695-9e54-45be90d9ec53"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"resourceVersion"</span>: <span style="color:#e6db74">"84170589"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"creationTimestamp"</span>: <span style="color:#e6db74">"2020-06-18T07:36:41Z"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"labels"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a"</span>: <span style="color:#e6db74">"a"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"beta.kubernetes.io/arch"</span>: <span style="color:#e6db74">"amd64"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"beta.kubernetes.io/os"</span>: <span style="color:#e6db74">"linux"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"gitpod.io/theia.v0.4.0"</span>: <span style="color:#e6db74">"available"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"gitpod.io/ws-sync"</span>: <span style="color:#e6db74">"available"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/arch"</span>: <span style="color:#e6db74">"amd64"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/hostname"</span>: <span style="color:#e6db74">"node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/os"</span>: <span style="color:#e6db74">"linux"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/role"</span>: <span style="color:#e6db74">"new"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node-role.kubernetes.io/worker"</span>: <span style="color:#e6db74">""</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"topology.disk.csi.qingcloud.com/instance-type"</span>: <span style="color:#e6db74">"Standard"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"topology.disk.csi.qingcloud.com/zone"</span>: <span style="color:#e6db74">"ap2a"</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"annotations"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"csi.volume.kubernetes.io/nodeid"</span>: <span style="color:#e6db74">"{\\"disk.csi.qingcloud.com\\":\\"i-icjxhi1e\\"}"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubeadm.alpha.kubernetes.io/cri-socket"</span>: <span style="color:#e6db74">"/var/run/dockershim.sock"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node.alpha.kubernetes.io/ttl"</span>: <span style="color:#e6db74">"0"</span>, 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Replace `[node ip]` with your actual IP address.
  </div>
</div>

## API Reference

The Super Kubenetes API swagger JSON file can be found in the repository https://github.com/Super Kubenetes/Super Kubenetes/tree/release-3.1/api.

- Super Kubenetes specified the API [swagger json](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/api/ks-openapi-spec/swagger.json) file. It contains all the APIs that are only applied to Super Kubenetes.
- Super Kubenetes specified the CRD [swagger json](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/api/openapi-spec/swagger.json) file. It contains all the generated CRDs API documentation. It is same as Kubernetes API objects.
