---
title: "Kubernetes Cluster Configurations"
keywords: 'Kubernetes, cluster, configuration, KubeKey'
description: 'Customize your Kubernetes settings in the configuration file for your cluster.'Super Kubenetes
linkTitle: "Kubernetes Cluster Configurations"
weight: 3160
---

When creating a Kubernetes cluster, you can use [KubeKey](../kubekey/) to define a configuration file (`config-sample.yaml`) which contains basic information of your cluster. Refer to the following example for Kubernetes-related parameters in the configuration file.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.10</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll</span>: <span style="color:#66d9ef">false</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;maxPods</span>: <span style="color:#ae81ff">110</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodeCidrMaskSize</span>: <span style="color:#ae81ff">24</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;proxyMode</span>: <span style="color:#ae81ff">ipvs</span> 
                <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;calico</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ipipMode</span>: <span style="color:#ae81ff">Always</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vxlanMode</span>: <span style="color:#ae81ff">Never</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vethMTU</span>: <span style="color:#ae81ff">1440</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span> 
                <span style="color:#f92672">&nbsp;&nbsp;addons</span>: [] 
              </p>
          </code>
        </div>
    </pre></article>

The below table describes the above parameters in detail.

  <table border="1">
   <tbody>
   <tr>
     <th width='140'>Parameter</th>
     <th>Description</th>
   </tr>
   <tr>
     <th colSpan='2'><code>kubernetes</code></th>
   </tr>
   <tr>
     <td><code>version</code></td>
     <td>The Kubernetes version to be installed. If you do not specify a Kubernetes version, <a href="/docs/installing-on-linux/introduction/kubekey">KubeKey</a> v2.2.1 will install Kubernetes v1.23.7 by default. For more information, see <a href="/docs/installing-on-linux/introduction/kubekey/#support-matrix">Support Matrix</a>.</td>
   </tr>
   <tr>
     <td><code>imageRepo</code></td>
     <td>The Docker Hub repository where images will be downloaded.</td>
   </tr>
   <tr>
     <td><code>clusterName</code></td>
     <td>The Kubernetes cluster name.</td>
   </tr>
   <tr>
     <td><code>masqueradeAll</code>*</td>
     <td><code>masqueradeAll</code> tells kube-proxy to SNAT everything if using the pure iptables proxy mode. It defaults to <code>false</code>.</td>
   </tr>
   <tr>
     <td><code>maxPods</code>*</td>
     <td>The maximum number of Pods that can run on this Kubelet. It defaults to <code>110</code>.</td>
   </tr>
   <tr>
     <td><code>nodeCidrMaskSize</code>*</td>
     <td>The mask size for node CIDR in your cluster. It defaults to <code>24</code>.</td>
   </tr>
   <tr>
     <td><code>proxyMode</code>*</td>
     <td>The proxy mode to use. It defaults to <code>ipvs</code>.</td>
   </tr>
   <tr>
     <th colSpan='2'><code>network</code></th>
   </tr>
   <tr>
     <td><code>plugin</code></td>
     <td>The CNI plugin to use. KubeKey installs Calico by default while you can also specify Flannel. Note that some features can only be used when Calico is adopted as the CNI plugin, such as Pod IP Pools.</td>
   </tr>
   <tr>
     <td><code>calico.ipipMode</code>*</td>
     <td>The IPIP Mode to use for the IPv4 POOL created at startup. If it is set to a value other than <code>Never</code>, <code>vxlanMode</code> should be set to <code>Never</code>. Allowed values are <code>Always</code>, <code>CrossSubnet</code> and <code>Never</code>. It defaults to <code>Always</code>.</td>
   </tr>
   <tr>
     <td><code>calico.vxlanMode</code>*</td>
     <td>The VXLAN Mode to use for the IPv4 POOL created at startup. If it is set to a value other than <code>Never</code>, <code>ipipMode</code> should be set to <code>Never</code>. Allowed values are <code>Always</code>, <code>CrossSubnet</code> and <code>Never</code>. It defaults to <code>Never</code>.</td>
   </tr>
   <tr>
     <td><code>calico.vethMTU</code>*</td>
     <td>The maximum transmission unit (MTU) setting determines the largest packet size that can be transmitted through your network. It defaults to <code>1440</code>.</td>
   </tr>
   <tr>
     <td><code>kubePodsCIDR</code></td>
     <td>A valid CIDR block for your Kubernetes Pod subnet. It should not overlap with your node subnet and your Kubernetes Services subnet.</td>
   </tr>
   <tr>
     <td><code>kubeServiceCIDR</code></td>
     <td>A valid CIDR block for your Kubernetes Services. It should not overlap with your node subnet and your Kubernetes Pod subnet.</td>
   </tr>
   <tr>
     <th colSpan='2'><code>registry</code></th>
   </tr>
   <tr>
     <td><code>registryMirrors</code></td>
     <td>Configure a Docker registry mirror to speed up downloads. For more information, see <a href="https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon">Configure the Docker daemon</a>.</td>
   </tr>
   <tr>
     <td><code>insecureRegistries</code></td>
     <td>Set an address of insecure image registry. For more information, see <a href="https://docs.docker.com/registry/insecure/">Test an insecure registry</a>.</td>
   </tr>
   <tr>
     <td><code>privateRegistry</code>*</td>
     <td>Configure a private image registry for air-gapped installation (for example, a Docker local registry or Harbor). For more information, see <a href="/docs/installing-on-linux/introduction/air-gapped-installation/">Air-gapped Installation on Linux</a>.</td>
   </tr> 
   </tbody>
   </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      - \* By default, KubeKey does not define these parameters in the configuration file while you can manually add them and customize their values.
      - `addons` is used to install cloud-native add-ons (YAML or Chart). For more information, see [this file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/addons.md).
      - This page only lists part of the parameters in the configuration file created by KubeKey. For more information about other parameters, see [this example file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).</div></div>