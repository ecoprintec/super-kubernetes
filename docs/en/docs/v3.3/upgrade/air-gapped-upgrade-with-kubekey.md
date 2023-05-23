---
title: "Air-Gapped Upgrade with KubeKey"
keywords: "Air-Gapped, kubernetes, upgrade, Super Kubenetes, 3.3.0"
description: "Use the offline package to upgrade Kubernetes and Super Kubenetes."
linkTitle: "Air-Gapped Upgrade with KubeKey"
weight: 7400
---
Air-gapped upgrade with KubeKey is recommended for users whose Super Kubenetes and Kubernetes were both deployed by [KubeKey](../../installing-on-linux/introduction/kubekey/). If your Kubernetes cluster was provisioned by yourself or cloud providers, refer to [Air-gapped Upgrade with ks-installer](../air-gapped-upgrade-with-ks-installer/).

## Prerequisites

- You need to have a Super Kubenetes cluster running v3.2.x. If your Super Kubenetes version is v3.1.x or earlier, upgrade to v3.2.x first.
- Your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
- Read [Release Notes for 3.3.0](../../../v3.3/release/release-v330/) carefully.
- Back up any important component beforehand.
- A Docker registry. You need to have a Harbor or other Docker registries.
- Make sure every node can push and pull images from the Docker Registry.


## Upgrade Super Kubenetes and Kubernetes

Upgrading steps are different for single-node clusters (all-in-one) and multi-node clusters.

<div className="notices info">
  <p>Info</p>
  <div>
    KubeKey upgrades Kubernetes from one MINOR version to the next MINOR version until the target version. For example, you may see the upgrading process going from 1.16 to 1.17 and to 1.18, instead of directly jumping to 1.18 from 1.16.    
  </div>
</div>

### System Requirements

  <table>
  <thead>
  <tr>
    <th>
      Systems
    </th>
    <th>
      Minimum Requirements (Each node)
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <b>Ubuntu</b><em>16.04, 18.04, 20.04</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <b>Debian</b><em>Buster, Stretch</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <b>CentOS</b><em>7.x</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <b>Red Hat Enterprise Linux</b><em>7</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  <tr>
    <td>
      <b>SUSE Linux Enterprise Server</b><em>15</em><b>/openSUSE Leap</b><em>15.2</em>
    </td>
    <td>
      CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    [KubeKey](https://github.com/Super Kubenetes/kubekey) uses `/var/lib/docker` as the default directory where all Docker related files, including images, are stored. It is recommended you add additional storage volumes with at least **100G** mounted to `/var/lib/docker` and `/mnt/registry` respectively. See [fdisk](https://www.computerhope.com/unix/fdisk.htm) command for reference.
  </div>
</div>


### Step 1: Download KubeKey
1. 1. Run the following commands to download KubeKey v2.2.2.
<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>Download KubeKey from its <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release Page</a> or run the following command:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
      <p>Run the following command first to make sure you download KubeKey from the correct zone.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>Run the following command to download KubeKey:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          After you download KubeKey, if you transfer it to a new machine also with poor network connections to Googleapis, you must run <code>export KKZONE=cn</code> again before you proceed with the following steps.
        </div>
      </article>
    </main>
  </div>
</main>

2. After you uncompress the file, execute the following command to make `kk` executable:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									chmod +x kk
               </p>
            </code>
         </div>
      </pre>
   </article>

### Step 2: Prepare installation images

As you install Super Kubenetes and Kubernetes on Linux, you need to prepare an image package containing all the necessary images and download the Kubernetes binary file in advance.

1. Download the image list file `images-list.txt` from a machine that has access to Internet through the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/images-list.txt</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      This file lists images under `##+modulename` based on different modules. You can add your own images to this file following the same rule.
    </div>
  </div>

2. Download `offline-installation-tool.sh`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									curl -L -O <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/offline-installation-tool.sh</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Make the `.sh` file executable.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									chmod +x offline-installation-tool.sh
               </p>
            </code>
         </div>
      </pre>
   </article>

4. You can execute the command `./offline-installation-tool.sh -h` to see how to use the script:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  root@master:/home/ubuntu# ./offline-installation-tool.sh -h
                  Usage:

                    ./offline-installation-tool.sh <span style="color:#f92672">[</span>-l IMAGES-LIST<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-d IMAGES-DIR<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-r PRIVATE-REGISTRY<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>-v KUBERNETES-VERSION <span style="color:#f92672">]</span> 

                  Description:
                    -b                     : save kubernetes<span style="color:#e6db74">' binaries.
                    </span><span style="color:#e6db74">  -d IMAGES-DIR          : the dir of files (tar.gz) which generated by <span>`</span>docker save<span>`</span>. default: /home/ubuntu/Super Kubenetes-images
                    </span><span style="color:#e6db74">&nbsp;&nbsp;-l IMAGES-LIST         : text file with list of images.
                    </span><span style="color:#e6db74">-r PRIVATE-REGISTRY    : target private registry:port.
                    </span><span style="color:#e6db74">-s                     : save model will be applied. Pull the images in the IMAGES-LIST and save images as a tar.gz file.
                    </span><span style="color:#e6db74">-v KUBERNETES-VERSION  : download kubernetes'</span> binaries. default: v1.17.9
                    -h                     : usage message
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Download the Kubernetes binary file.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									./offline-installation-tool.sh -b -v v1.22.10 
               </p>
            </code>
         </div>
      </pre>
   </article>

   If you cannot access the object storage service of Google, run the following command instead to add the environment variable to change the source.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									export KKZONE<span style="color:#f92672">=</span>cn;./offline-installation-tool.sh -b -v v1.22.10
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - You can change the Kubernetes version downloaded based on your needs. Recommended Kubernetes versions for Super Kubenetes 3.3.0 are v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey will install Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../../installing-on-linux/introduction/kubekey/#support-matrix).

      - You can upgrade Kubernetes from v1.16.13 to v1.17.9 by downloading the v1.17.9 Kubernetes binary file, but for cross-version upgrades, all intermediate versions need to be downloaded in advance. For example, if you want to upgrade Kubernetes from v1.15.12 to v1.18.6, you need to download Kubernetes v1.16.13 and v1.17.9, and the v1.18.6 binary file.

      - After you run the script, a folder `kubekey` is automatically created. Note that this file and `kk` must be placed in the same directory when you create the cluster later.
    </div>
  </div>


6. Pull images in `offline-installation-tool.sh`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									./offline-installation-tool.sh -s -l images-list.txt -d ./Super Kubenetes-images
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can choose to pull images as needed. For example, you can delete `##k8s-images` and related images under it in `images-list.text` if you already have a Kubernetes cluster.
    </div>
  </div>

### Step 3: Push images to your private registry

Transfer your packaged image file to your local machine and execute the following command to push it to the registry.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./offline-installation-tool.sh -l images-list.txt -d ./Super Kubenetes-images -r dockerhub.kubekey.local
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    The domain name is `dockerhub.kubekey.local` in the command. Make sure you use your **own registry address**.
  </div>
</div>
### Air-gapped upgrade for all-in-one clusters

#### Example machines
  <table>
  <thead>
  <tr>
    <th>
      Host Name
    </th>
    <th>
      IP
    </th>
    <th>
      Role
    </th>
    <th>
      Port
    </th>
    <th>
      URL
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      Docker registry
    </td>
    <td>
      5000
    </td>
    <td>
      http://192.168.1.1:5000
    </td>
  </tr>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      master, etcd, worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>

#### Versions

  <table>
  <thead>
  <tr>
    <th>
    </th>
    <th>
      Kubernetes
    </th>
    <th>
      Super Kubenetes
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Before
    </td>
    <td>
      v1.18.6
    </td>
    <td>
      v3.2.x
    </td>
  </tr>
  <tr>
    <td>
      After
    </td>
    <td>
      v1.22.10
    </td>
    <td>
      3.3.0
    </td>
  </tr>
  </tbody>
  </table>

#### Upgrade a cluster

In this example, Super Kubenetes is installed on a single node, and you need to specify a configuration file to add host information. Besides, for air-gapped installation, pay special attention to `.spec.registry.privateRegistry`, which must be set to **your own registry address**. For more information, see the following sections.

#### Create an example configuration file

Execute the following command to generate an example configuration file for installation:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span>
            </p>
        </code>
      </div>
  </pre>
</article>

For example:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0 -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Make sure the Kubernetes version is the one you downloaded.
  </div>
</div>
#### Edit the configuration file

Edit the configuration file `config-sample.yaml`. Here is [an example for your reference](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).

<div className="notices warning">
  <p>Warning</p>
  <div>
    For air-gapped installation, you must specify `privateRegistry`, which is `dockerhub.kubekey.local` in this example.
  </div>
</div> 

 Set `hosts` of your `config-sample.yaml` file:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>:
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.master, address: 192.168.1.1, internalAddress: 192.168.1.1, user: root, password</span>: <span style="color:#ae81ff">Qcloud@123}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control<span>-</span>plane</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Set `privateRegistry` of your `config-sample.yaml` file:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;registry</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#ae81ff">dockerhub.kubekey.local</span>
            </p>
        </code>
      </div>
  </pre>
</article>

#### Upgrade your single-node cluster to Super Kubenetes 3.3.0 and Kubernetes v1.22.10

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

To upgrade Kubernetes to a specific version, explicitly provide the version after the flag `--with-kubernetes`. Available versions are v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).

### Air-gapped upgrade for multi-node clusters

#### Example machines
  <table>
  <thead>
  <tr>
    <th>
      Host Name
    </th>
    <th>
      IP
    </th>
    <th>
      Role
    </th>
    <th>
      Port
    </th>
    <th>
      URL
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      Docker registry
    </td>
    <td>
      5000
    </td>
    <td>
      http://192.168.1.1:5000
    </td>
  </tr>
  <tr>
    <td>
      master
    </td>
    <td>
      192.168.1.1
    </td>
    <td>
      master, etcd
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
      slave1
    </td>
    <td>
      192.168.1.2
    </td>
    <td>
      worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
      slave1
    </td>
    <td>
      192.168.1.3
    </td>
    <td>
      worker
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>


#### Versions

  <table>
  <thead>
  <tr>
    <th>
    </th>
    <th>
      Kubernetes
    </th>
    <th>
      Super Kubenetes
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Before
    </td>
    <td>
      v1.18.6
    </td>
    <td>
      v3.2.x
    </td>
  </tr>
  <tr>
    <td>
      After
    </td>
    <td>
      v1.22.10
    </td>
    <td>
      3.3.0
    </td>
  </tr>
  </tbody>
  </table>

#### Upgrade a cluster

In this example, Super Kubenetes is installed on multiple nodes, so you need to specify a configuration file to add host information. Besides, for air-gapped installation, pay special attention to `.spec.registry.privateRegistry`, which must be set to **your own registry address**. For more information, see the following sections.

#### Create an example configuration file

   Execute the following command to generate an example configuration file for installation:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span>
            </p>
        </code>
      </div>
  </pre>
</article>

   For example:
   
<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0 -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Make sure the Kubernetes version is the one you downloaded.
  </div>
</div>

#### Edit the configuration file

Edit the configuration file `config-sample.yaml`. Here is [an example for your reference](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).

<div className="notices warning">
  <p>Warning</p>
  <div>
    For air-gapped installation, you must specify `privateRegistry`, which is `dockerhub.kubekey.local` in this example.
  </div>
</div> 


Set `hosts` of your `config-sample.yaml` file:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.master, address: 192.168.1.1, internalAddress: 192.168.1.1, user: root, password</span>: <span style="color:#ae81ff">Qcloud@123}</span> 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.slave1, address: 192.168.1.2, internalAddress: 192.168.1.2, user: root, privateKeyPath</span>: <span style="color:#e6db74">"/root/.ssh/kp<span>-</span>qingcloud"</span>} 
              <span>&nbsp;&nbsp;-</span> {<span style="color:#f92672">name: ks.slave2, address: 192.168.1.3, internalAddress: 192.168.1.3, user: root, privateKeyPath</span>: <span style="color:#e6db74">"/root/.ssh/kp<span>-</span>qingcloud"</span>} 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control<span>-</span>plane</span>:
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.slave1</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;ks.slave2</span> 
            </p>
        </code>
      </div>
  </pre>
</article>
Set `privateRegistry` of your `config-sample.yaml` file:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;registry</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: []
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#ae81ff">dockerhub.kubekey.local</span>
            </p>
        </code>
      </div>
  </pre>
</article>

#### Upgrade your multi-node cluster to Super Kubenetes 3.3.0 and Kubernetes v1.22.10

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ./kk upgrade -f config-sample.yaml
            </p>
        </code>
      </div>
  </pre>
</article>

To upgrade Kubernetes to a specific version, explicitly provide the version after the flag `--with-kubernetes`. Available versions are v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
