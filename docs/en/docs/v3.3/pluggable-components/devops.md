---
title: "Super Kubenetes DevOps System"
keywords: "Kubernetes, Jenkins, Super Kubenetes, DevOps, cicd"
description: "Learn how to enable DevOps to further free your developers and let them focus on code writing."
linkTitle: "Super Kubenetes DevOps System"
weight: 6300
---

The Super Kubenetes DevOps System is designed for CI/CD workflows in Kubernetes. Based on [Jenkins](https://jenkins.io/), it provides one-stop solutions to help both development and Ops teams build, test and publish apps to Kubernetes in a straight-forward way. It also features plugin management, [Binary-to-Image (B2I)](../../project-user-guide/image-builder/binary-to-image/), [Source-to-Image (S2I)](../../project-user-guide/image-builder/source-to-image/), code dependency caching, code quality analysis, pipeline logging, and more.

The DevOps System offers an automated environment for users as apps can be automatically released to the same platform. It is also compatible with third-party private image registries (for example, Harbor) and code repositories (for example, GitLab/GitHub/SVN/BitBucket). As such, it creates excellent user experience by providing users with comprehensive, visualized CI/CD pipelines which are extremely useful in air-gapped environments.

For more information, see [DevOps User Guide](../../devops-user-guide/).

## Enable DevOps Before Installation

### Installing on Linux

When you implement multi-node installation of Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by running the following command:

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
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable DevOps in this mode (for example, for testing purposes), refer to [the following section](#enable-devops-after-installation) to see how DevOps can be installed after installation.
    </div>
  </div>

2. In this file, search for `devops` and change `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
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

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable Super Kubenetes DevOps first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

1. Download the file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) and edit it.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>

2. In this local `cluster-configuration.yaml` file, search for `devops` and enable DevOps by changing `false` to `true` for `enabled`. Save the file after you finish.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. Run the following commands to start installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>
              
              kubectl apply -f <a style="color:#ffffff; cursor:text;">cluster-configuration.yaml</a></p>
          </code>
        </div>
    </pre>
  </article>

## Enable DevOps After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-devops-system/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.
   
4. In this YAML file, search for `devops` and change `false` to `true` for `enabled`. After you finish, click **OK** in the lower-right corner to save the configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

5. Use the web kubectl to check the installation process by running the following command:

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
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-devops-system/hammer.png" height="20px"> in the lower-right corner of the console.
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
			Go to <b>System Components</b> and check that all components on the <b>DevOps</b> tab page is in <b>Healthy</b> state.
		</main>
		<main className="tab-pane" title="Verify the component through kubectl">
			<p>
				Run the following command to check the status of Pods:
			</p>
			<aticle className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>kubectl get pod -n Super Kubenetes-devops-system </code>
					</div>
				</pre>
			</aticle>
			<p>
				The output may look as follows if the component runs successfully:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>
              <p>
                NAME                          READY   STATUS    RESTARTS   AGE
                devops-jenkins-5cbbfbb975-hjnll   1/1     Running   <span style="color:#ae81ff">0</span>          40m
                s2ioperator-0                 1/1     Running   <span style="color:#ae81ff">0</span>          41m
              </p>
            </code>
          </div>
				</pre>
			</article>
		</main>
	</div>
</main>
