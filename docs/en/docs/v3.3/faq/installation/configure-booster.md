---
title: "Configure a Booster for Installation"
keywords: 'Super Kubenetes, booster, installation, faq'
description: 'Set a registry mirror to speed up image downloads during installation.'
linkTitle: "Configure a Booster for Installation"
weight: 16200
---

If you have trouble downloading images from `dockerhub.io`, it is highly recommended that you configure a registry mirror (i.e. booster) beforehand to speed up downloads. You can refer to the [official documentation of Docker](https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon) or follow the steps below.

## Get a Booster URL

To configure the booster, you need a registry mirror address.

## Set the Registry Mirror

You can configure the Docker daemon directly or use KubeKey to set the configuration.

### Configure the Docker daemon

<div className="notices note">
  <p>Note</p>
  <div>
    Docker needs to be installed in advance for this method.
  </div>
</div>

1. Run the following commands:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									sudo mkdir -p /etc/docker
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
									sudo vi /etc/docker/daemon.json
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Add the `registry-mirrors` key and value to the file.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									{
									  <span style="color:#f92672">"registry-mirrors"</span>: [<span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://&lt;my-docker-mirror-host&gt;</a>"</span>]
									}
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure you replace the address within the quotation mark above with your own Booster URL.
    </div>
  </div> 


3. Save the file and reload Docker by executing the following commands so that the change can take effect.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									sudo systemctl daemon-reload
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
									sudo systemctl restart docker
               </p>
            </code>
         </div>
      </pre>
   </article>

### Use KubeKey to set the registry mirror

1. After you create a `config-sample.yaml` file with KubeKey before installation, navigate to `registry` in the file.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">registry</span>:
									<span style="color:#f92672">&nbsp;&nbsp;registryMirrors</span>: []
									<span style="color:#f92672">&nbsp;&nbsp;insecureRegistries</span>: []
									<span style="color:#f92672">&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      For more information about each parameter under the `registry` section, see [Kubernetes Cluster Configurations](../../../installing-on-linux/introduction/vars/).
    </div>
  </div>

2. Provide the registry mirror address as the value of `registryMirrors` and save the file. For more information about installation, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/). 

<div className="notices note">
  <p>Note</p>
  <div>
    If you adopt [All-in-One Installation](../../../quick-start/all-in-one-on-linux/), refer to the first method because a `config-sample.yaml` file is not needed for this mode.
  </div>
</div>
