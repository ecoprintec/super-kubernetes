---
title: "Add Edge Nodes"
keywords: 'Kubernetes, Super Kubenetes, KubeEdge'
description: 'Add edge nodes to your cluster.'
linkTitle: "Add Edge Nodes"
weight: 3630
---

Super Kubenetes leverages [KubeEdge](https://kubeedge.io/en/), to extend native containerized application orchestration capabilities to hosts at edge. With separate cloud and edge core modules, KubeEdge provides complete edge computing solutions while the installation may be complex and difficult.

![kubeedge_arch](/dist/assets/docs/v3.3/installing-on-linux/add-and-delete-nodes/add-edge-nodes/kubeedge_arch.png)

<div className="notices note">
  <p>Note</p>
  <div>
    For more information about different components of KubeEdge, see [the KubeEdge documentation](https://docs.kubeedge.io/en/docs/kubeedge/#components).
  </div>
</div>

This tutorial demonstrates how to add an edge node to your cluster.

## Prerequisites

- You have enabled [KubeEdge](../../../pluggable-components/kubeedge/).
- You have an available node to serve as an edge node. The node can run either Ubuntu (recommended) or CentOS. This tutorial uses Ubuntu 18.04 as an example.
- Edge nodes, unlike Kubernetes cluster nodes, should work in a separate network.

## Prevent non-edge workloads from being scheduled to edge nodes

Due to the tolerations some daemonsets (for example, Calico) have, to ensure that the newly added edge nodes work properly, you need to run the following command to manually patch the pods so that non-edge workloads will not be scheduled to the edge nodes.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
            <span style="color:#75715e"><span>#</span><span>!/bin/bash</span> 
            <span></span> 
            </span><span style="color:#75715e"></span> 
            NoShedulePatchJson<span style="color:#f92672">=</span><span style="color:#e6db74">'{"spec":{"template":{"spec":{"affinity":{"nodeAffinity":{"requiredDuringSchedulingIgnoredDuringExecution":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"node-role.kubernetes.io/edge","operator":"DoesNotExist"}]}]}}}}}}}'</span> 
            <span></span> 
            ns<span style="color:#f92672">=</span><span style="color:#e6db74">"kube-system"</span> 
            <span></span> 
            <span></span> 
            DaemonSets<span style="color:#f92672">=(</span><span style="color:#e6db74">"nodelocaldns"</span> <span style="color:#e6db74">&nbsp;"kube-proxy"</span> <span style="color:#e6db74">&nbsp;"calico-node"</span><span style="color:#f92672">)</span> 
            <span></span> 
            length<span style="color:#f92672">=</span><span style="color:#e6db74">${#</span>DaemonSets[@]<span style="color:#e6db74">}</span> 
            <span></span> 
            <span style="color:#66d9ef">for</span><span style="color:#f92672">((</span>i<span style="color:#f92672">=</span>0;i&lt;length;i++<span style="color:#f92672">))</span>; 
            <span style="color:#66d9ef">do</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ds<span style="color:#f92672">=</span><span style="color:#e6db74">${</span>DaemonSets[$i]<span style="color:#e6db74">}</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo <span style="color:#e6db74">"Patching resources:DaemonSet/</span><span style="color:#e6db74">${</span>ds<span style="color:#e6db74">}</span><span style="color:#e6db74">"</span> in ns:<span style="color:#e6db74">"</span>$ns<span style="color:#e6db74">"</span>,
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubectl -n $ns patch DaemonSet/<span style="color:#e6db74">${</span>ds<span style="color:#e6db74">}</span> --type merge --patch <span style="color:#e6db74">"</span>$NoShedulePatchJson<span style="color:#e6db74">"</span> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sleep <span style="color:#ae81ff">1</span> 
            <span style="color:#66d9ef">done</span>
            <p>
        </code>
      </div>
  </pre>
</article>

## Create Firewall Rules and Port Forwarding Rules

To make sure edge nodes can successfully talk to your cluster, you must forward ports for outside traffic to get into your network. Specifically, map an external port to the corresponding internal IP address (control plane node) and port based on the table below. Besides, you also need to create firewall rules to allow traffic to these ports (`10000` to `10004`).

<div className="notices note">
  <p>Note</p>
  <div>
    In `ClusterConfiguration` of the ks-installer, if you set an internal IP address, you need to set the forwarding rule. If you have not set the forwarding rule, you can directly connect to ports 30000 to 30004.
  </div>
</div>


| Fields              | External Ports | Fields                  | Internal Ports |
| ------------------- | -------------- | ----------------------- | -------------- |
| `cloudhubPort`      | `10000`        | `cloudhubNodePort`      | `30000`        |
| `cloudhubQuicPort`  | `10001`        | `cloudhubQuicNodePort`  | `30001`        |
| `cloudhubHttpsPort` | `10002`        | `cloudhubHttpsNodePort` | `30002`        |
| `cloudstreamPort`   | `10003`        | `cloudstreamNodePort`   | `30003`        |
| `tunnelPort`        | `10004`        | `tunnelNodePort`        | `30004`        |

## Configure an Edge Node

You need to configure the edge node as follows.

### Install a container runtime

[KubeEdge](https://docs.kubeedge.io/en/docs/) supports several container runtimes including Docker, containerd, CRI-O and Virtlet. For more information, see [the KubeEdge documentation](https://docs.kubeedge.io/en/docs/advanced/cri/).

<div className="notices note">
  <p>Note</p>
  <div>
    If you use Docker as the container runtime for your edge node, Docker v19.3.0 or later must be installed so that Super Kubenetes can get Pod metrics of it.
  </div>
</div>

### Configure EdgeMesh

Perform the following steps to configure [EdgeMesh](https://kubeedge.io/en/docs/advanced/edgemesh/) on your edge node.

1. Edit `/etc/nsswitch.conf`.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi /etc/nsswitch.conf</code>
        </div>
    </pre>
  </article>

2. Add the following content to this file:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>hosts:          dns files mdns4_minimal <span style="color:#f92672">[</span>NOTFOUND<span style="color:#f92672">=</span><span style="color:#66d9ef">return</span><span style="color:#f92672">]</span></code>
        </div>
    </pre>
  </article>

3. Save the file and run the following command to enable IP forwarding:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo echo <span style="color:#e6db74">"net.ipv4.ip_forward = 1"</span> >> /etc/sysctl.conf</code>
        </div>
    </pre>
  </article>

4. Verify your modification:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo sysctl -p | grep ip_forward</code>
        </div>
    </pre>
  </article>

   Expected result:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>net.ipv4.ip_forward <span style="color:#f92672">=</span> <span style="color:#ae81ff">&nbsp;1</span></code>
        </div>
    </pre>
  </article>

## Add an Edge Node

1. Log in to the console as `admin` and click **Platform** in the upper-left corner.

2. Select **Cluster Management** and navigate to **Edge Nodes** under **Nodes**.

  <div className="notices note">
    <p>Note</p>
    <div>
      If you have enabled [multi-cluster management](../../../multicluster-management/), you need to select a cluster first.
    </div>
  </div>

3. Click **Add**. In the dialog that appears, set a node name and enter an internal IP address of your edge node. Click **Validate** to continue.

  <div className="notices note">
    <p>Note</p>
    <div>
      - The internal IP address is only used for inter-node communication and you do not necessarily need to use the actual internal IP address of the edge node. As long as the IP address is successfully validated, you can use it.
      - It is recommended that you check the box to add the default taint.
    </div>
  </div> 

4. Copy the command automatically created under **Edge Node Configuration Command** and run it on your edge node.

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure `wget` is installed on your edge node before you run the command.
    </div>
  </div>

5. Close the dialog, refresh the page, and the edge node will appear in the list.

  <div className="notices note">
    <p>Note</p>
    <div>
      After an edge node is added, if you cannot see CPU and memory resource usage on the **Edge Nodes** page, make sure [Metrics Server](../../../pluggable-components/metrics-server/) 0.4.1 or later is installed in your cluster.
    </div>
  </div>

## Collect Monitoring Information on Edge Nodes

To collect monitoring information on edge node, you need to enable `metrics_server` in `ClusterConfiguration` and `edgeStream` in KubeEdge.

1. On the Super Kubenetes web console, choose **Platform > Cluster Management**.

2. On the navigation pane on the left, click **CRDs**.

3. In the search bar on the right pane, enter `clusterconfiguration`, and click the result to go to its details page.

4. Click <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" /> on the right of ks-installer, and click **Edit YAML**.

5. Search for **metrics_server**, and change the value of `enabled` from `false` to `true`.

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">&nbsp;&nbsp;metrics_server</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span>&nbsp;Change "false" to "true".</span></p></code></div></pre>
  </article>

6. Click **OK** in the lower right corner to save the change.

7. Open the `/etc/kubeedge/config` file, search for `edgeStream`, change `false` to `true`, and save the change.

    <article className="highlight">
      <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>
              <p>
                cd /etc/kubeedge/config
                vi edgecore.yaml
              </p>
            </code>
          </div>
      </pre>
    </article>

    <article className="highlight">
      <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>
              <p>
                edgeStream:
                enable: true <span style="color:#75715e"><span>#</span><span>Change "false" to "true".。</span></span> 
                handshakeTimeout: <span style="color:#ae81ff">30</span> 
                readDeadline: <span style="color:#ae81ff">15</span> 
                server: xx.xxx.xxx.xxx:10004 <span style="color:#75715e"><span>#</span><span>If port forwarding is not configured, change the port ID to 30004 here.</span></span> 
                tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
                tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
                tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
                writeDeadline: <span style="color:#ae81ff">15</span>
              </p>
            </code>
          </div>
      </pre>
    </article>

8. Run the following command to restart `edgecore.service`.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl restart edgecore.service</code>
        </div>
    </pre>
  </article>

9. If you still cannot see the monitoring data, run the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>journalctl -u edgecore.service -b -r</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If `failed to check the running environment: kube-proxy should not running on edge node when running edgecore` is displayed, refer to Step 8 to restart `edgecore.service` again.
    </div>
  </div>

## Remove an Edge Node

Before you remove an edge node, delete all your workloads running on it.

1. On your edge node, run the following commands:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./keadm reset</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>apt remove mosquitto</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>rm -rf /var/lib/kubeedge /var/lib/edged /etc/kubeedge/ca /etc/kubeedge/certs</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you cannot delete the tmpfs-mounted folder, restart the node or unmount the folder first.
    </div>
  </div>

2. Run the following command to remove the edge node from your cluster:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl delete node <edgenode-name></code>
        </div>
    </pre>
  </article>

3. To uninstall KubeEdge from your cluster, run the following commands:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>helm uninstall kubeedge -n kubeedge</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl delete ns kubeedge</code>
        </div>
    </pre>
  </article>
   
  <div className="notices note">
    <p>Note</p>
    <div>
      After uninstallation, you will not be able to add edge nodes to your cluster.
    </div>
  </div>

