---
title: "Helm Developer Guide"
keywords: 'Kubernetes, Super Kubenetes, helm, development'
description: 'Develop your own Helm-based app.'
linkTitle: "Helm Developer Guide"
weight: 14410
---

You can upload the Helm chart of an app to Super Kubenetes so that tenants with necessary permissions can deploy it. This tutorial demonstrates how to prepare Helm charts using NGINX as an example.

## Install Helm

If you have already installed Super Kubenetes, then Helm is deployed in your environment. Otherwise, refer to the [Helm documentation](https://helm.sh/docs/intro/install/) to install Helm first.

## Create a Local Repository

Execute the following commands to create a repository on your machine.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               mkdir helm-repo
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
               cd helm-repo
            </p>
         </code>
      </div>
   </pre>
</article>

## Create an App

Use `helm create` to create a folder named `nginx`, which automatically creates YAML templates and directories for your app. Generally, it is not recommended to change the name of files and directories in the top level directory.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ helm create nginx
               $ tree nginx/
               nginx/
               ├── charts
               ├── Chart.yaml
               ├── templates
               │   ├── deployment.yaml
               │   ├── _helpers.tpl
               │   ├── ingress.yaml
               │   ├── NOTES.txt
               │   └── service.yaml
               └── values.yaml
            </p>
         </code>
      </div>
   </pre>
</article>

`Chart.yaml` is used to define the basic information of the chart, including name, API, and app version. For more information, see [Chart.yaml File](../helm-specification/#chartyaml-file).

An example of the `Chart.yaml` file:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">appVersion</span>: <span style="color:#e6db74">"1.0"</span> 
              <span style="color:#f92672">description</span>: <span style="color:#ae81ff">A Helm chart for Kubernetes</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">version</span>: <span style="color:#ae81ff">0.1.0</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

When you deploy Helm-based apps to Kubernetes, you can edit the `values.yaml` file on the Super Kubenetes console directly.

An example of the `values.yaml` file:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span><span>&nbsp;Default values for test.</span></span> 
              <span style="color:#75715e"><span>#</span><span>&nbsp;This is a YAML-formatted file.</span></span> 
              <span style="color:#75715e"><span>#</span><span>&nbsp;Declare variables to be passed into your templates.</span></span> 
              <span></span> 
              <span style="color:#f92672">replicaCount</span>: <span style="color:#ae81ff">1</span> 
              <span></span> 
              <span style="color:#f92672">image</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;repository</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tag</span>: <span style="color:#ae81ff">stable</span> 
              <span style="color:#f92672">&nbsp;&nbsp;pullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
              <span></span> 
              <span style="color:#f92672">nameOverride</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">fullnameOverride</span>: <span style="color:#e6db74">""</span> 
              <span></span> 
              <span style="color:#f92672">service</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ClusterIP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span></span> 
              <span style="color:#f92672">ingress</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;annotations</span>: {} 
              <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;#</span> kubernetes.io/ingress.class: nginx<span></span></span> 
              <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;#</span> kubernetes.io/tls-acme: "true"</span>
              <span style="color:#f92672">&nbsp;&nbsp;path</span>: <span style="color:#ae81ff">/</span> 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">chart-example.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tls</span>: []
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;- secretName: chart-example-tls</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;&nbsp;&nbsp;hosts:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- chart-example.local</span> 
              <span style="color:#f92672">resources</span>: {} 
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> We usually recommend not to specify default resources and to leave this as a conscious</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> choice for the user. This also increases chances charts run on environments with little</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> resources, such as Minikube. If you do want to specify resources, uncomment the following</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> lines, adjust them as necessary, and remove the curly braces after 'resources:'.</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> limits:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  cpu: 100m</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  memory: 128Mi</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> requests:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  cpu: 100m</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span><span>&nbsp;&nbsp;memory: 128Mi</span></span> 
              <span></span> 
              <span style="color:#f92672">nodeSelector</span>: {} 
              <span></span> 
              <span style="color:#f92672">tolerations</span>: [] 
              <span></span> 
              <span style="color:#f92672">affinity</span>: {}
            </p>
        </code>
      </div>
  </pre>
</article>

Refer to [Helm Specifications](../helm-specification/) to edit files in the `nginx` folder and save them when you finish editing.

## Create an Index File (Optional)

To add a repository with an HTTP or HTTPS URL in Super Kubenetes, you need to upload an `index.yaml` file to the object storage in advance. Use Helm to create the index file by executing the following command in the previous directory of `nginx`.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               helm repo index .
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
               $ ls
               index.yaml  nginx
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - If the repository URL is S3-styled, an index file will be created automatically in the object storage when you add apps to the repository.

    - For more information about how to add repositories to Super Kubenetes, see [Import an Helm Repository](../../../workspace-administration/app-repository/import-helm-repository/).
  </div>
</div>


## Package the Chart

Go to the previous directory of `nginx` and execute the following command to package your chart which creates a .tgz package.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               helm package nginx
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
               $ ls
               nginx  nginx-0.1.0.tgz
            </p>
         </code>
      </div>
   </pre>
</article>

## Upload Your App

Now that you have your Helm-based app ready, you can load it to Super Kubenetes and test it on the platform.

## See Also

[Helm Specifications](../helm-specification/)

[Import an Helm Repository](../../../workspace-administration/app-repository/import-helm-repository/)
