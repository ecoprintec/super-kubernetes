---
title: "Agent Connection"
keywords: 'Kubernetes, Super Kubenetes, multicluster, agent-connection'
description: 'Understand the general steps of importing clusters through agent connection.'
titleLink: "Agent Connection"
weight: 5220
---

The component [Tower](https://github.com/Super Kubenetes/tower) of Super Kubenetes is used for agent connection. Tower is a tool for network connection between clusters through the agent. If the host cluster cannot access the member cluster directly, you can expose the proxy service address of the host cluster. This enables the member cluster to connect to the host cluster through the agent. This method is applicable when the member cluster is in a private environment (for example, IDC) and the host cluster is able to expose the proxy service. The agent connection is also applicable when your clusters are distributed across different cloud providers.

To use the multi-cluster feature using an agent, you must have at least two clusters serving as the host cluster and the member cluster respectively. A cluster can be defined as the host cluster or the member cluster either before or after you install Super Kubenetes. For more information about installing Super Kubenetes, refer to [Installing on Linux](../../../installing-on-linux/) and [Installing on Kubernetes](../../../installing-on-kubernetes/).

## Video Demonstration

## Prepare a Host Cluster

A host cluster provides you with the central control plane and you can only define one host cluster.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Super Kubenetes has been installed</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes has not been installed</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes has been installed">
			<p>If you already have a standalone Super Kubenetes cluster installed, you can set the value of <code>clusterRole</code> to <code>host</code> by editing the cluster configuration.</p>
			- Option A - Use the web console:

				Use the `admin` account to log in to the console and go to **CRDs** on the **Cluster Management** page. Enter the keyword `ClusterConfiguration` and go to its detail page. Edit the YAML of `ks-installer`, which is similar to [Enable Pluggable Components](../../../pluggable-components/).

			- Option B - Use Kubectl:

				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>kubectl edit cc ks-installer -n Super Kubenetes-system</code>
						</div></pre></article>

			<p>In the YAML file of `ks-installer`, navigate to `multicluster`, set the value of `clusterRole` to `host`, then click **OK** (if you use the web console) to make it effective:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span></p>
						</code>
					</div></pre></article>

			<p>To set the host cluster name, add a field <code>hostClusterName</code> under <code>multicluster.clusterRole</code> in the YAML file of <code>ks-installer</code>:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span> 
								<span style="color:#f92672">&nbsp;&nbsp;hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
						</code>
					</div>
				</pre>
			</article>

			<article className="notices note">
				<p>Note</p>
				<div>
					- It is recommended that you set the host cluster name while you are preparing your host cluster. When your host cluster is set up and running with resources deployed, it is not recommended that you set the host cluster name.
					- The host cluster name can contain only lowercase letters, numbers, hyphens (-), or periods (.), and must start and end with a lowercase letter or number.
				</div>
			</article>

			You need to wait for a while so that the change can take effect.			
		</main>
		<main className="tab-pane" title="Super Kubenetes has not been installed">
			<p>You can define a host cluster before you install Super Kubenetes either on Linux or on an existing Kubernetes cluster. If you want to <a href="../../../installing-on-linux/introduction/multioverview/#1-create-an-example-configuration-file">install Super Kubenetes on Linux</a>, you use a <code>config-sample.yaml</code> file. If you want to <a href="../../../installing-on-kubernetes/introduction/overview/#deploy-Super Kubenetes">install Super Kubenetes on an existing Kubernetes cluster</a>, you use two YAML files, one of which is <code>cluster-configuration.yaml</code>.</p>

			<p>To set a host cluster, change the value of <code>clusterRole</code> to <code>host</code> in <code>config-sample.yaml</code> or <code>cluster-configuration.yaml</code> accordingly before you install Super Kubenetes.</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span></p>
						</code>
					</div></pre></article>

			<p>To set the host cluster name, add a field <code>hostClusterName</code> under <code>multicluster.clusterRole</code> in <code>config-sample.yaml</code> or <code>cluster-configuration.yaml</code>:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span> 
								<span style="color:#f92672">&nbsp;&nbsp;hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
						</code>
					</div>
				</pre>
			</article>

			<article className="notices note">
				<p>Note</p>
				<div>
					- The host cluster name can contain only lowercase letters, numbers, hyphens (-), or periods (.), and must start and end with a lowercase letter or number.
				</div>
			</article>

			<article className="notices info">
				<p>Note</p>
				<div>
					If you install Super Kubenetes on a single-node cluster ([All-in-One](../../../quick-start/all-in-one-on-linux/)), you do not need to create a `config-sample.yaml` file. In this case, you can set a host cluster after Super Kubenetes is installed.
				</div>
			</article>
		</main>
	</div>
</main>

You can use **kubectl** to retrieve the installation logs to verify the status by running the following command. Wait for a while, and you will be able to see the successful log return if the host cluster is ready.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## Set the Proxy Service Address

After the installation of the host cluster, a proxy service called `tower` will be created in `Super Kubenetes-system`, whose type is `LoadBalancer`.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">A LoadBalancer available in your cluster</a></li>
		<li className="nav-item"><a className="nav-link" href="#">No LoadBalancer available in your cluster</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="A LoadBalancer available in your cluster">
			<p>If a LoadBalancer plugin is available for the cluster, you can see a corresponding address for <code>EXTERNAL-IP</code> of tower, which will be acquired by Super Kubenetes. In this case, the proxy service is set automatically. That means you can skip the step to set the proxy. Execute the following command to verify if you have a LoadBalancer.</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>kubectl -n Super Kubenetes-system get svc</code>
					</div>
				</pre>
			</article>

			<p>The output is similar to this:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								NAME       TYPE            CLUSTER-IP      EXTERNAL-IP     PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>              AGE
								tower      LoadBalancer    10.233.63.191   139.198.110.23  8080:30721/TCP       16h</p>
						</code>
					</div>
				</pre>
			</article>

			<article className="notices note">
				<p>Note</p>
				<div>
					Generally, there is always a LoadBalancer solution in the public cloud, and the external IP can be allocated by the load balancer automatically. If your clusters are running in an on-premises environment, especially a **bare metal environment**, you can use [OpenELB](https://github.com/Super Kubenetes/openelb) as the LB solution.
				</div>
			</article>

		</main>

		<main className="tab-pane" title="No LoadBalancer available in your cluster">
			1. Run the following command to check the service:

				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>kubectl -n Super Kubenetes-system get svc</code>
						</div>
					</pre>
				</article>

				In this sample, `NodePort` is `30721`.
				
				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>
								<p>
								NAME       TYPE            CLUSTER-IP      EXTERNAL-IP     PORT(S)              AGE
								tower      LoadBalancer    10.233.63.191   <span><</span>pending<span>></span>  8080:30721/TCP            16h
								</p>
							</code>
						</div></pre></article>

			2. If `EXTERNAL-IP` is `pending`, you need to manually set the proxy address. For example, if your public IP address is `139.198.120.120`, you need to expose port (for example, `8080`) of this public IP address to <NodeIP>:<NodePort>.

			3. Add the value of `proxyPublishAddress` to the configuration file of `ks-installer` and provide the public IP address (`139.198.120.120` in this tutorial) and port number as follows.

				- Option A - Use the web console:

				Use the `admin` account to log in to the console and go to **CRDs** on the **Cluster Management** page. Enter the keyword `ClusterConfiguration` and go to its detail page. Edit the YAML of `ks-installer`, which is similar to [Enable Pluggable Components](../../../pluggable-components/).

				- Option B - Use Kubectl:

					<article className="highlight">
						<pre>
							<div className="copy-code-button" title="Copy Code"></div>
							<div className="code-over-div">
								<code>kubectl -n Super Kubenetes-system edit clusterconfiguration ks-installer</code>
							</div>
						</pre></article>

			  <p>Navigate to <code>multicluster</code> and add a new line for <code>proxyPublishAddress</code> to define the IP address to access tower.</p>

				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>
								<p>
									<span style="color:#f92672">multicluster</span>:
										<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span> 
										<span style="color:#f92672">proxyPublishAddress</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://139.198.120.120:8080</a></span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e"> &nbsp;Add this line to set the address to access tower</span>
								</p>
							</code>
						</div>
					</pre>
				</article>

			4. Save the configuration and wait for a while, or you can manually restart `ks-apiserver` to make the change effective immediately using the following command.

				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>kubectl -n Super Kubenetes-system rollout restart deployment ks-apiserver</code>
						</div>
					</pre>
				</article>
		</main>
	</div>
</main>

## Prepare a Member Cluster

In order to manage the member cluster from the **host cluster**, you need to make `jwtSecret` the same between them. Therefore, get it first by excuting the following command on the **host cluster**.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
      </div>
  </pre>
</article>

The output may look like this:

<article className="highlight">
	<pre>
		<div className="copy-code-button" title="Copy Code"></div>
		<div className="code-over-div">
		<code>
			<p>
				<span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU"</span></p>
		</code></div></pre></article>

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Super Kubenetes has been installed</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes has not been installed</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes has been installed">
			<p>If you already have a standalone Super Kubenetes cluster installed, you can set the value of <code>clusterRole</code> to <code>member</code> by editing the cluster configuration.</p>
			- Option A - Use the web console:

				Use the  `admin` account to log in to the console and go to **CRDs** on the **Cluster Management** page. Enter the keyword `ClusterConfiguration` and go to its detail page. Edit the YAML of `ks-installer`, which is similar to [Enable Pluggable Components](../../../pluggable-components/).

			- Option B - Use Kubectl:

			   <article className="highlight">
				 <pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>kubectl edit cc ks-installer -n Super Kubenetes-system</code>
					</div></pre></article>

			<p>In the YAML file of <code>ks-installer</code>, enter the corresponding <code>jwtSecret</code> shown above:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">authentication</span>:
								<span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
						</code>
					</div></pre></article>

			<p>Scroll down and set the value of <code>clusterRole</code> to <code>member</code>, then click <b>OK</b> (if you use the web console) to make it effective:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span></p>
						</code>
					</div></pre></article>

			<p>You need to <b>wait for a while</b> so that the change can take effect.</p>
		</main>
		<main className="tab-pane" title="Super Kubenetes has not been installed">
			<p>You can define a member cluster before you install Super Kubenetes either on Linux or on an existing Kubernetes cluster. If you want to <a href="../../../installing-on-linux/introduction/multioverview/#1-create-an-example-configuration-file">install Super Kubenetes on Linux</a>, you use a <code>config-sample.yaml</code> file. If you want to <a href="../../../installing-on-kubernetes/introduction/overview/#deploy-Super Kubenetes">install Super Kubenetes on an existing Kubernetes cluster</a>, you use two YAML files, one of which is <code>cluster-configuration.yaml</code>. To set a member cluster, enter the value of <code>jwtSecret</code> shown above and change the value of <code>clusterRole</code> to <code>member</code> in <code>config-sample.yaml</code> or <code>cluster-configuration.yaml</code> accordingly before you install Super Kubenetes.</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">authentication</span>:
								<span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
						</code>
					</div></pre></article>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span></p>
						</code>
					</div></pre></article>

			<article className="notices note">
				<p>Note</p>
				<div>
					If you install Super Kubenetes on a single-node cluster ([All-in-One](../../../quick-start/all-in-one-on-linux/)), you do not need to create a `config-sample.yaml` file. In this case, you can set a member cluster after Super Kubenetes is installed.
				</div>
			</article>
		</main>
	</div>
</main>

You can use **kubectl** to retrieve the installation logs to verify the status by running the following command. Wait for a while, and you will be able to see the successful log return if the member cluster is ready.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## Import a Member Cluster

1. Log in to the Super Kubenetes console as `admin` and click **Add Cluster** on the **Cluster Management** page.

2. Enter the basic information of the cluster to be imported on the **Import Cluster** page. You can also click **Edit Mode** in the upper-right corner to view and edit the basic information in YAML format. After you finish editing, click **Next**.

3. In **Connection Method**, select **Agent connection** and click **Create**. It will show the YAML configuration file for the agent Deployment generated by the host cluster on the console.

4. Create an `agent.yaml` file on the member cluster based on the instruction, then copy and paste the agent deployment to the file. Execute `kubectl create -f agent.yaml` on the node and wait for the agent to be up and running. Please make sure the proxy address is accessible to the member cluster.

5. You can see the cluster you have imported in the host cluster when the cluster agent is up and running.