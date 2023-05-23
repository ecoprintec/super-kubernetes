---
title: "Super Kubenetes Audit Logs"
keywords: "Kubernetes, auditing, Super Kubenetes, logs"
description: "Learn how to enable Auditing to document platform events and activities."
linkTitle: "Super Kubenetes Audit Logs"
weight: 6700
---

The Super Kubenetes Auditing Log System provides a security-relevant chronological set of records documenting the sequence of activities related to individual users, managers, or other components of the system. Each request to Super Kubenetes generates an event that is then written to a webhook and processed according to a certain rule.

For more information, see [Auditing Log Query](../../toolbox/auditing/auditing-query/).

## Enable Auditing Logs Before Installation

### Installing on Linux

When you implement multi-node installation Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by executing the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable Auditing in this mode (for example, for testing purposes), refer to [the following section](#enable-auditing-logs-after-installation) to see how Auditing can be installed after installation.
    </div>
  </div>

2. In this file, navigate to `auditing` and change `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">auditing</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      By default, KubeKey will install Elasticsearch internally if Auditing is enabled. For a production environment, it is highly recommended that you set the following values in `config-sample.yaml` if you want to enable Auditing, especially `externalElasticsearchUrl` and `externalElasticsearchPort`. Once you provide the following information before installation, KubeKey will integrate your external Elasticsearch directly instead of installing an internal one.
    </div>
  </div>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">es</span>:<span style="color:#75715e">&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Storage backend for logging, tracing, events and auditing.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of master nodes. Even numbers are not allowed.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch master nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Log retention day in built-in Elasticsearch. It is 7 days by default.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The Host of external Elasticsearch.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The port of external Elasticsearch.</span>
          </code>
        </div>
    </pre>
  </article>

3. Create a cluster using the configuration file:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

### Installing on Kubernetes

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable Super Kubenetes Auditing first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

1. Download the file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) and edit it.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>
 
2. In this local `cluster-configuration.yaml` file, navigate to `auditing` and enable Auditing by changing `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">auditing</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      By default, ks-installer will install Elasticsearch internally if Auditing is enabled. For a production environment, it is highly recommended that you set the following values in `cluster-configuration.yaml` if you want to enable Auditing, especially `externalElasticsearchUrl` and `externalElasticsearchPort`. Once you provide the following information before installation, ks-installer will integrate your external Elasticsearch directly instead of installing an internal one.
    </div>
  </div>

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">es</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;#</span><span>&nbsp;Storage backend for logging, tracing, events and auditing.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;The total number of master nodes. Even numbers are not allowed.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;The total number of data nodes.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi  </span><span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;The volume size of Elasticsearch master nodes.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi   </span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;The volume size of Elasticsearch data nodes.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Log retention day in built-in Elasticsearch. It is 7 days by default.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash             </span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;The Host of external Elasticsearch.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;The port of external Elasticsearch.</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Execute the following commands to start installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>
              
              kubectl apply -f cluster-configuration.yaml</p>
          </code>
        </div>
    </pre>
  </article>

## Enable Auditing Logs After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-auditing-logs/three-dots.png" height="20px">  on the right of `ks-installer` and select **Edit YAML**.

4. In this YAML file, navigate to `auditing` and change `false` to `true` for `enabled`. After you finish, click **OK** in the lower-right corner to save the configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">auditing</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      By default, Elasticsearch will be installed internally if Auditing is enabled. For a production environment, it is highly recommended that you set the following values in this yaml file if you want to enable Auditing, especially `externalElasticsearchUrl` and `externalElasticsearchPort`. Once you provide the following information, Super Kubenetes will integrate your external Elasticsearch directly instead of installing an internal one.
    </div>
  </div>

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">es</span>:  <span style="color:#75715e"><span>#</span> Storage backend for logging, tracing, events and auditing.</span>
									<span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;#</span> The total number of master nodes. Even numbers are not allowed.</span>
									<span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span>
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> The total number of data nodes.</span>
									<span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;#</span> The volume size of Elasticsearch master nodes.</span>
									<span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;#</span> The volume size of Elasticsearch data nodes.</span>
									<span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Log retention day in built-in Elasticsearch. It is 7 days by default.</span>
									<span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span>
									<span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>: <span style="color:#75715e"><span>#</span> The Host of external Elasticsearch.</span>
									<span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>: <span style="color:#75715e"><span>#</span> The port of external Elasticsearch.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. You can use the web kubectl to check the installation process by executing the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-auditing-logs/hammer.png" height="20px"> in the lower-right corner of the console.
    </div>
  </div>

## Verify the Installation of the Component

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Verify the component on the dashboard</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Verify the component through kubectl</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Verify the component on the dashboard">
			Verify that you can use the <b>Audit Log Search</b> function from the <b>Toolbox</b> in the lower-right corner.
		</main>
		<main className="tab-pane" title="Verify the component through kubectl">
			<p>
				Execute the following command to check the status of Pods:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>kubectl get pod -n Super Kubenetes-logging-system </code>
					</div>
				</pre>
			</article>
			<p>
				The output may look as follows if the component runs successfully:
			</p>
      <article className="highlight">
        <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
              <code>
                <p>
                    <span style="color:#ae81ff">NAME                                                              READY   STATUS      RESTARTS   AGE</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-curator-elasticsearch-curator-159872n9g9g   0/1     Completed   0          2d10h</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-curator-elasticsearch-curator-159880tzb7x   0/1     Completed   0          34h</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-curator-elasticsearch-curator-1598898q8w7   0/1     Completed   0          10h</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-data-0                                      1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-data-1                                      1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">elasticsearch-logging-discovery-0                                 1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">fluent-bit-6v5fs                                                  1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">fluentbit-operator-5bf7687b88-44mhq                               1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">kube-auditing-operator-7574bd6f96-p4jvv                           1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">kube-auditing-webhook-deploy-6dfb46bb6c-hkhmx                     1/1     Running     1          2d20h</span> 
                    <span style="color:#ae81ff">kube-auditing-webhook-deploy-6dfb46bb6c-jp77q                     1/1     Running     1          2d20h</span>
                </p>
              </code>
          </div>
        </pre>
    </article>
		</main>
	</div>
</main>
