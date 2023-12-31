---
title: "Project Network Isolation"
keywords: 'Super Kubenetes, Kubernetes, Calico, Network Policy'
description: 'Understand the concept of network isolation and how to configure network policies for a project.'
linkTitle: "Project Network Isolation"
weight: 13300
---

Super Kubenetes project network isolation lets project administrators enforce which network traffic is allowed using different rules. This tutorial demonstrates how to enable network isolation among projects and set rules to control network traffic.

## Prerequisites

- You have already enabled [Network Policies](../../pluggable-components/network-policy/).
- You must have an available project and a user of the `admin` role (`project-admin`) at the project level. For more information, see [Create Workspaces, Projects, Users and Roles](../../quick-start/create-workspace-and-project/).

<div className="notices note">
  <p>Note</p>
  <div>
    For the implementation of the Network Policy, you can refer to [Super Kubenetes NetworkPolicy](https://github.com/Super Kubenetes/community/blob/master/sig-network/concepts-and-designs/Super Kubenetes-network-policy.md).
  </div>
</div>

## Enable/Disable Project Network Isolation

1. Log in to Super Kubenetes as `project-admin`. Go to your project and select **Network Isolation** in **Project Settings**. By default, project network isolation is disabled.

2. To enable project network isolation, click **Enable**.

  <div className="notices note">
    <p>Note</p>
    <div>
      When network isolation is turned on, egress traffic will be allowed by default, while ingress traffic will be denied for different projects. But when you add an egress network policy, only traffic that matches your policy will be allowed to go out.
    </div>
  </div>

3. You can also disable network isolation by toggling the **Enabled** button on this page.

  <div className="notices note">
    <p>Note</p>
    <div>
      When network isolation is turned off, any previously created network policies will be deleted as well.
    </div>
  </div>

## Set a Network Policy

If the default policy does not meet your needs when network isolation is enabled, you can customize your network policy to meet your needs. Currently, you can add custom network policies in Super Kubenetes for traffic within the cluster or incoming traffic outside the cluster.

### For internal traffic within the cluster

Network policies at the project level within a cluster are used to control whether resources in this project can be accessed by other projects within the same cluster, and which Services you can access.

Assume an NGINX Deployment workload has been created in another project `demo-project-2` and is exposed via the Service `nginx` on the port `80` with `TCP`. Here is an example of how to set ingress and egress traffic rules.

<div className="notices note">
  <p>Note</p>
  <div>
    For more information about how to create workloads, see [Deployments](../../project-user-guide/application-workloads/deployments/) and [Services](../../project-user-guide/application-workloads/services/) respectively.
  </div>
</div>

#### Allow ingress traffic from workloads in a different project

1. On the **Network Isolation** page of your current project, click **Internal Allowlist**.

2. Click **Add Allowlist Entry**.

3. Select **Ingress** under **Traffic Direction**.

4. In **Project**, select the project `demo-project-2`.

5. Click **OK**, and then you can see that the project is now in the allowlist.

<div className="notices note">
  <p>Note</p>
  <div>
    If the network is not accessible after you set the network policy, then you need to check whether the peer project has a corresponding egress rule in it.
  </div>
</div>

#### Allow egress traffic to Services in a different project

1. On the **Network Isolation** page of your current project, click **Internal Allowlist**.

2. Click **Add Allowlist Entry**.

3. Select **Egress** under **Traffic Direction**.

4. Select the tab **Service** under **Type**.

5. Select the project `demo-project-2` from the drop-down list.

6. Select the Service that is allowed to receive egress traffic. In this case, select `nginx`.

7. Click **OK**, and then you can see that the Service is now in the allowlist.

<div className="notices note">
  <p>Note</p>
  <div>
    When creating a Service, you must make sure that the selectors of the Service are not empty.
  </div>
</div>

### For incoming traffic outside the cluster

Super Kubenetes uses CIDR to distinguish between peers. Assume a Tomcat Deployment workload has been created in your current project and is exposed via the `NodePort` Service `demo-service` on the NodePort `80` with `TCP`. For an external client with the IP address `192.168.1.1` to access this Service, you need to add a rule for it.

#### Allow ingress traffic from a client outside the cluster

1. On the **Network Isolation** page of your current project, select **External Allowlist** and click **Add Allowlist Entry**.

2. Select **Ingress** under **Traffic Direction**.

3. Enter `192.168.1.1/32` for **Network Segment**.

4. Select the protocol `TCP` and enter `80` as the port number.

5. Click **OK**, and then you can see that the rule has been added.

<div className="notices note">
  <p>Note</p>
  <div>
    It is recommended to set `spec.externalTrafficPolicy` in the Service configuration to `local`, so that the source address of the packet will not change. Namely, the source address of the packet is the source address of the client.
  </div>
</div>

Assume the IP address of an external client is `http://10.1.0.1:80`, then you need to set a rule for the egress traffic so that the internal Service can access it.

#### Allow egress traffic to Services outside the cluster

1. On the **Network Isolation** page of your current project, select **External Allowlist** and click **Add Allowlist Entry**.

2. Select **Egress** under **Traffic Direction**.

3. Enter `10.1.0.1/32` for **Network Segment**.

4. Select the protocol `TCP` and enter `80` as the port number.

5. Click **OK**, and you can see that the rule has been added.

<div className="notices note">
  <p>Note</p>
  <div>
    In step 4, when you select **SCTP**, you must make sure SCTP is [enabled](https://kubernetes.io/docs/concepts/services-networking/network-policies/#sctp-support).
  </div>
</div>

### Best practices

To ensure that all Pods in a project are secure, a best practice is to enable network isolation. When network isolation is on, the project cannot be accessed by other projects. If your workloads need to be accessed by others, you can follow these steps:

1. Set a [gateway](../project-gateway/) in **Project Settings**.
2. Expose workloads that need to be accessed to a gateway via a Service.
3. Allow ingress traffic from the namespace where your gateway locates.

If egress traffic is controlled, you should have a clear plan of what projects, Services, and IP addresses can be accessed, and then add them one by one. If you are not sure about what you want, it is recommended that you keep your network policy unchanged.

## FAQs

Q: Why cannot the custom monitoring system of Super Kubenetes get data after I enabled network isolation?

A: After you enable custom monitoring, the Super Kubenetes monitoring system will access the metrics of the Pod. You need to allow ingress traffic for the Super Kubenetes monitoring system. Otherwise, it cannot access Pod metrics.

Super Kubenetes provides a configuration item `allowedIngressNamespaces` to simplify similar configurations, which allows all projects listed in the configuration.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#ae81ff">root@node1:~# kubectl get -n Super Kubenetes-system clusterconfigurations.installer.Super Kubenetes.io  ks-installer -o yaml</span> 
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
              <span style="color:#f92672">metadata</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                <span style="color:#ae81ff">...</span> 
              <span style="color:#f92672">spec</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">networkpolicy</span>: 
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">nsnpOptions</span>: 
                    <span style="color:#f92672">allowedIngressNamespaces</span>: 
                      <span>-</span> <span style="color:#ae81ff">&nbsp;Super Kubenetes-system</span> 
                      <span>-</span> <span style="color:#ae81ff">&nbsp;Super Kubenetes-monitoring-system</span> 
                <span style="color:#ae81ff">...</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Q: Why cannot I access a Service even after setting a network policy through the Service?

A: When you add a network policy and access the Service via the cluster IP address, if the network is not
   working, check the kube-proxy configuration to see if `masqueradeAll` is `false`.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#ae81ff">root@node1:~# kubectl get cm -n kube-system kube-proxy -o yaml</span> 
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">data</span>: 
                <span style="color:#f92672">config.conf</span>: |-<span style="color:#e6db74"> 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;... 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;iptables: 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll: false 
              </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;...  </span> 
                <span style="color:#ae81ff">...</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
              <span style="color:#f92672">metadata</span>: 
                <span style="color:#ae81ff">...</span> 
                <span style="color:#f92672">labels</span>: 
                  <span style="color:#f92672">app</span>: <span style="color:#ae81ff">kube-proxy</span> 
                <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kube-proxy</span> 
                <span style="color:#f92672">namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#ae81ff">...</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Q: How do I determine the network segment when I set the ingress rule?

A: In Kubernetes, the source IP address of the packet is often handled by NAT, so you need to figure out what the source address of the packet will be before you add the rule. For more information, refer to [Source IP](https://github.com/Super Kubenetes/community/blob/master/sig-network/concepts-and-designs/Super Kubenetes-network-policy.md#source-ip).
