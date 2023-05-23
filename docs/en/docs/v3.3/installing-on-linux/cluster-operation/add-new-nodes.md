---
title: "Add New Nodes to a Kubernetes Cluster"
keywords: 'Kubernetes, Super Kubenetes, scale-out, add-nodes'
description: 'Add more nodes to scale out your cluster.'
linkTitle: "Add New Nodes"
weight: 3610
---

After you use Super Kubenetes for a certain period of time, it is likely that you need to scale out your cluster with an increasing number of workloads. From Super Kubenetes v3.0.0, you can use the brand-new installer [KubeKey](https://github.com/Super Kubenetes/kubekey) to add new nodes to a Kubernetes cluster. Fundamentally, the operation is based on Kubelet's registration mechanism. In other words, the new nodes will automatically join the existing Kubernetes cluster. Super Kubenetes supports hybrid environments, which means the newly-added host OS can be CentOS or Ubuntu.

This tutorial demonstrates how to add new nodes to a single-node cluster. To scale out a multi-node cluster, the steps are basically the same.

## Prerequisites

- You need to have a single-node cluster. For more information, see [All-in-One Installation on Linux](../../../quick-start/all-in-one-on-linux/).

- You have [downloaded KubeKey](../../../installing-on-linux/introduction/multioverview/#step-2-download-kubekey).

## Add Worker Nodes to Kubernetes

1. Retrieve your cluster information using KubeKey. The command below creates a configuration file (`sample.yaml`).

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --from-cluster</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can skip this step if you already have the configuration file on your machine. For example, if you want to add nodes to a multi-node cluster which was set up by KubeKey, you might still have the configuration file if you have not deleted it.
    </div>
  </div>

2. In the configuration file, put the information of your new nodes under `hosts` and `roleGroups`. The example adds two new nodes (i.e. `node1` and `node2`). Here `master1` is the existing node.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              ···
              spec:
                hosts:
                <span>-</span><span style="color:#f92672">&nbsp;{</span>name: master1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                <span>-</span><span style="color:#f92672">&nbsp;{</span>name: node1, address: 192.168.0.4, internalAddress: 192.168.0.4, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                <span>-</span><span style="color:#f92672">&nbsp;{</span>name: node2, address: 192.168.0.5, internalAddress: 192.168.0.5, user: root, password: Qcloud@123<span style="color:#f92672">}</span> 
                roleGroups:
                  etcd:
                  <span>-</span> master1
                  control-plane:
                  <span>-</span> master1
                  worker:
                  <span>-</span> node1
                  <span>-</span> node2
              ···              
            </p>
          </code>
        </div>
    </pre>
  </article>
   
  <div className="notices note">
    <p>Note</p>
    <div>
      - For more information about the configuration file, see [Edit the configuration file](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).
      - You are not allowed to modify the host name of existing nodes when adding new nodes.
      - Replace the host name in the example with your own.
    </div>
  </div>

3. Execute the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk add nodes -f sample.yaml</code>
        </div>
    </pre>
  </article>

4. You will be able to see the new nodes and their information on the Super Kubenetes console when the installation finishes. On the **Cluster Management** page, select **Cluster Nodes** under **Nodes** from the left menu, or execute the command `kubectl get node` to check the changes.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ kubectl get node
              NAME          STATUS   ROLES           AGE   VERSION
              master1       Ready    master,worker   20d   v1.17.9
              node1         Ready    worker          31h   v1.17.9
              node2         Ready    worker          31h   v1.17.9              
            </p>
          </code>
        </div>
    </pre>
  </article>

## Add New Master Nodes for High Availability

The steps of adding master nodes are generally the same as adding worker nodes while you need to configure a load balancer for your cluster. You can use any cloud load balancers or hardware load balancers (for example, F5). In addition, Keepalived and [HAproxy](https://www.haproxy.com/), or Nginx is also an alternative for creating highly available clusters.

1. Create a configuration file using KubeKey.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --from-cluster</code>
        </div>
    </pre>
  </article>

2. Open the file and you can see some fields are pre-populated with values. Add the information of new nodes and your load balancer to the file. Here is an example for your reference:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Cluster</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> You should complete the ssh information of the hosts</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 172.16.0.2, internalAddress: 172.16.0.2, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 172.16.0.5, internalAddress: 172.16.0.5, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 172.16.0.6, internalAddress: 172.16.0.6, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: worker1, address: 172.16.0.3, internalAddress: 172.16.0.3, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: worker2, address: 172.16.0.4, internalAddress: 172.16.0.4, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: worker3, address: 172.16.0.7, internalAddress: 172.16.0.7, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker3</span> 
                <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If loadbalancer is used, 'address' should be set to loadbalancer's ip.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#ae81ff">172.16.0.253</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
                <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.17.9</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;proxyMode</span>: <span style="color:#ae81ff">ipvs</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll</span>: <span style="color:#66d9ef">false</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;maxPods</span>: <span style="color:#ae81ff">110</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodeCidrMaskSize</span>: <span style="color:#ae81ff">24</span> 
                <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>


3. Pay attention to the `controlPlaneEndpoint` field.

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If you use a load balancer, the address should be set to the load balancer's ip.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#ae81ff">172.16.0.253</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span></p>
          </code>
      </div>
    </pre>
  </article>

   - The domain name of the load balancer is `lb.Super Kubenetes.local` by default for internal access. You can change it based on your needs.
   - In most cases, you need to provide the **private IP address** of the load balancer for the field `address`. However, different cloud providers may have different configurations for load balancers. For example, if you configure a Server Load Balancer (SLB) on Alibaba Cloud, the platform assigns a public IP address to the SLB, which means you need to specify the public IP address for the field `address`.
   - The field `port` indicates the port of `api-server`.

4. Save the file and execute the following command to apply the configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk add nodes -f sample.yaml</code>
        </div>
    </pre>
  </article>


