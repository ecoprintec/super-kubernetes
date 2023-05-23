---
title: "Helm Specifications"
keywords: 'Kubernetes, Super Kubenetes, Helm, specifications'
description: 'Understand the chart structure and specifications.'
linkTitle: "Helm Specifications"
weight: 14420
---

Helm charts serve as a packaging format. A chart is a collection of files that describe a related set of Kubernetes resources. For more information, see the [Helm documentation](https://helm.sh/docs/topics/charts/).

## Structure

All related files of a chart is stored in a directory which generally contains:

<article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  chartname/
                     Chart.yaml          # A YAML file containing basic information about the chart, such as version and name.
                     LICENSE             # (Optional) A plain text file containing the license for the chart.
                     README.md           # (Optional) The description of the app and how-to guide.
                     values.yaml         # The default configuration values for this chart.
                     values.schema.json  # (Optional) A JSON Schema for imposing a structure on the values.yaml file.
                     charts/             # A directory containing any charts upon which this chart depends.
                     crds/               # Custom Resource Definitions.
                     templates/          # A directory of templates that will generate valid Kubernetes configuration files with corresponding values provided.
                     templates/NOTES.txt # (Optional) A plain text file with usage notes.
               </p>
            </code>
         </div>
      </pre>
</article>

## Chart.yaml File

You must provide the `chart.yaml` file for a chart. Here is an example of the file with explanations for each field.

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">(Required) The chart API version. </span> 
               <span style="color:#f92672">name</span>: <span style="color:#ae81ff">(Required) The name of the chart.</span> 
               <span style="color:#f92672">version</span>: <span style="color:#ae81ff">(Required) The version, following the SemVer 2 standard. </span> 
               <span style="color:#f92672">kubeVersion</span>: <span style="color:#ae81ff">(Optional) The compatible Kubernetes version, following the SemVer 2 standard.</span> 
               <span style="color:#f92672">description</span>: <span style="color:#ae81ff">(Optional) A single-sentence description of the app.</span> 
               <span style="color:#f92672">type</span>: <span style="color:#ae81ff">(Optional) The type of the chart.</span> 
               <span style="color:#f92672">keywords</span>: 
               &nbsp;&nbsp;- <span style="color:#ae81ff">(Optional) A list of keywords about the app.</span> 
               <span style="color:#f92672">home</span>: <span style="color:#ae81ff">(Optional) The URL of the app.</span> 
               <span style="color:#f92672">sources</span>: 
               &nbsp;&nbsp;- <span style="color:#ae81ff">(Optional) A list of URLs to source code for this app.</span> 
               <span style="color:#f92672">dependencies</span>: <span style="color:#ae81ff">(Optional) A list of the chart requirements.</span> 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">The name of the chart, such as nginx.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">The version of the chart, such as "1.2.3".</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;repository</span>: <span style="color:#ae81ff">The repository URL ("<a style="color:#ae81ff; cursor:text;">https://example.com/charts</a>") or alias ("@repo-name").</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;condition</span>: <span style="color:#ae81ff">(Optional) A yaml path that resolves to a boolean, used for enabling/disabling charts (for example, subchart1.enabled ).</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;tags</span>: <span style="color:#ae81ff">(Optional)</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">Tags can be used to group charts for enabling/disabling together.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;import-values</span>: <span style="color:#ae81ff">(Optional)</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">ImportValues holds the mapping of source values to parent key to be imported. Each item can be a string or pair of child/parent sublist items.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alias</span>: <span style="color:#ae81ff">(Optional) Alias to be used for the chart. It is useful when you have to add the same chart multiple times.</span> 
               <span style="color:#f92672">maintainers</span>: <span style="color:#ae81ff">(Optional)</span> 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">(Required) The maintainer name.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;email</span>: <span style="color:#ae81ff">(Optional) The maintainer email.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;url</span>: <span style="color:#ae81ff">(Optional) A URL for the maintainer.</span> 
               <span style="color:#f92672">icon</span>: <span style="color:#ae81ff">(Optional) A URL to an SVG or PNG image to be used as an icon.</span> 
               <span style="color:#f92672">appVersion</span>: <span style="color:#ae81ff">(Optional) The app version. This needn't be SemVer.</span> 
               <span style="color:#f92672">deprecated</span>: <span style="color:#ae81ff">(Optional, boolean) Whether this chart is deprecated.</span> 
               <span style="color:#f92672">annotations</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;example</span>: <span style="color:#ae81ff">(Optional) A list of annotations keyed by name.</span> 
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - The field `dependencies` is used to define chart dependencies which were located in a separate file `requirements.yaml` for `v1` charts. For more information, see [Chart Dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies).
    - The field `type` is used to define the type of chart. Allowed values are `application` and `library`. For more information, see [Chart Types](https://helm.sh/docs/topics/charts/#chart-types).
  </div>
</div>


## Values.yaml and Templates

Written in the [Go template language](https://golang.org/pkg/text/template/), Helm chart templates are stored in the `templates` folder of a chart. There are two ways to provide values for the templates:

1. Make a `values.yaml` file inside of a chart with default values that can be referenced.
2. Make a YAML file that contains necessary values and use the file through the command line with `helm install`. 

Here is an example of the template in the `templates` folder.

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ReplicationController</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">deis</span> 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/managed-by</span>: <span style="color:#ae81ff">deis</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceAccount</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: {{<span style="color:#ae81ff">.Values.imageRegistry}}/postgres:{{.Values.dockerTag}}</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: {{<span style="color:#ae81ff">.Values.pullPolicy}}</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">5432</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;env</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">DATABASE_STORAGE</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value</span>: {{<span style="color:#ae81ff">default "minio" .Values.storage}}</span> 
            </p>
         </code>
      </div>
   </pre>
</article>

The above example defines a ReplicationController template in Kubernetes. There  are some values referenced in it which are defined in `values.yaml`.

- `imageRegistry`: The Docker image registry.
- `dockerTag`: The Docker image tag.
- `pullPolicy`: The image pulling policy.
- `storage`: The storage backend. It defaults to `minio`.

An example `values.yaml` file:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               imageRegistry: "quay.io/deis"
               dockerTag: "latest"
               pullPolicy: "Always"
               storage: "s3"
            </p>
         </code>
      </div>
   </pre>
</article>

## Reference

[Helm Documentation](https://helm.sh/docs/)

[Charts](https://helm.sh/docs/topics/charts/)