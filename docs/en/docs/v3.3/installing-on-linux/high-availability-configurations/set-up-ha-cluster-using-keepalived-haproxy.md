---
title: "Set up an HA Kubernetes Cluster Using Keepalived and HAproxy"
keywords: 'Kubernetes, Super Kubenetes, HA, high availability, installation, configuration, Keepalived, HAproxy'
description: 'Learn how to create a highly available cluster using Keepalived and HAproxy.'
linkTitle: "Set up an HA Cluster Using Keepalived and HAproxy"
weight: 3230
showSubscribe: true
---

A highly available Kubernetes cluster ensures your applications run without outages which is required for production. In this connection, there are plenty of ways for you to choose from to achieve high availability.

This tutorial demonstrates how to configure Keepalived and HAproxy for load balancing and achieve high availability. The steps are listed as below:

1. Prepare hosts.
2. Configure Keepalived and HAproxy.
3. Use KubeKey to set up a Kubernetes cluster and install Super Kubenetes.

## Cluster Architecture

The example cluster has three master nodes, three worker nodes, two nodes for load balancing and one virtual IP address. The virtual IP address in this example may also be called "a floating IP address". That means in the event of node failures, the IP address can be passed between nodes allowing for failover, thus achieving high availability.

![architecture-ha-k8s-cluster](/dist/assets/docs/v3.3/installing-on-linux/high-availability-configurations/set-up-ha-cluster-using-keepalived-haproxy/architecture-ha-k8s-cluster.png)

Notice that in this example, Keepalived and HAproxy are not installed on any of the master nodes. Admittedly, you can do that and high availability can also be achieved. That said, configuring two specific nodes for load balancing (You can add more nodes of this kind as needed) is more secure. Only Keepalived and HAproxy will be installed on these two nodes, avoiding any potential conflicts with any Kubernetes components and services.

## Prepare Hosts

| IP Address  | Hostname | Role                 |
| ----------- | -------- | -------------------- |
| 172.16.0.2  | lb1      | Keepalived & HAproxy |
| 172.16.0.3  | lb2      | Keepalived & HAproxy |
| 172.16.0.4  | master1  | master, etcd         |
| 172.16.0.5  | master2  | master, etcd         |
| 172.16.0.6  | master3  | master, etcd         |
| 172.16.0.7  | worker1  | worker               |
| 172.16.0.8  | worker2  | worker               |
| 172.16.0.9  | worker3  | worker               |
| 172.16.0.10 |          | Virtual IP address   |

For more information about requirements for nodes, network, and dependencies, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#step-1-prepare-linux-hosts).

## Configure Load Balancing

[Keepalived](https://www.keepalived.org/) provides a VRPP implementation and allows you to configure Linux machines for load balancing, preventing single points of failure. [HAProxy](https://www.haproxy.org/), providing reliable, high performance load balancing, works perfectly with Keepalived.

As Keepalived and HAproxy are installed on `lb1` and `lb2`, if either one goes down, the virtual IP address (i.e. the floating IP address) will be automatically associated with another node so that the cluster is still functioning well, thus achieving high availability. If you want, you can add more nodes all with Keepalived and HAproxy installed for that purpose.

Run the following command to install Keepalived and HAproxy first.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install keepalived haproxy psmisc -y</code>
      </div>
  </pre>
</article>

### HAproxy Configuration

1. The configuration of HAproxy is exactly the same on the two machines for load balancing. Run the following command to configure HAproxy.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi /etc/haproxy/haproxy.cfg</code>
        </div>
    </pre>
  </article>

2. Here is an example configuration for your reference (Pay attention to the `server` field. Note that `6443` is the `apiserver` port):

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              global
                  log /dev/log  local0 warning
                  chroot      /var/lib/haproxy
                  pidfile     /var/run/haproxy.pid
                  maxconn     <span style="color:#ae81ff">4000</span> 
                  user        haproxy
                  group       haproxy
                  daemon
              
                 stats socket /var/lib/haproxy/stats
              
              defaults
                log global
                option  httplog
                option  dontlognull
                      timeout connect <span style="color:#ae81ff">5000</span> 
                      timeout client <span style="color:#ae81ff">50000</span> 
                      timeout server <span style="color:#ae81ff">50000</span> 
              
              frontend kube-apiserver
                bind *:6443
                mode tcp
                option tcplog
                default_backend kube-apiserver
              
              backend kube-apiserver
                  mode tcp
                  option tcplog
                  option tcp-check
                  balance roundrobin
                  default-server inter 10s downinter 5s rise <span style="color:#ae81ff">2</span> fall <span style="color:#ae81ff">2</span> slowstart 60s maxconn <span style="color:#ae81ff">250</span> maxqueue <span style="color:#ae81ff">256</span> weight <span style="color:#ae81ff">100</span>
                  <span></span> 
                  <span>server kube-apiserver-3 172.16.0.6:6443 check <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;Replace the IP address with your own.</span></span> 
                  <span>server kube-apiserver-2 172.16.0.5:6443 check <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;Replace the IP address with your own.</span></span> 
                  <span>server kube-apiserver-3 172.16.0.6:6443 check <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;Replace the IP address with your own.</span></span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. Save the file and run the following command to restart HAproxy.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl restart haproxy</code>
        </div>
    </pre>
  </article>

4. Make it persist through reboots:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl enable haproxy</code>
        </div>
    </pre>
  </article>

5. Make sure you configure HAproxy on the other machine (`lb2`) as well.

### Keepalived Configuration

Keepalived must be installed on both machines while the configuration of them is slightly different.

1. Run the following command to configure Keepalived.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi /etc/keepalived/keepalived.conf</code>
        </div>
    </pre>
  </article>

2. Here is an example configuration (`lb1`) for your reference:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              global_defs <span style="color:#f92672">{</span> 
                notification_email <span style="color:#f92672">{</span> 
                <span style="color:#f92672">}</span> 
                router_id LVS_DEVEL
                vrrp_skip_check_adv_addr
                vrrp_garp_interval <span style="color:#ae81ff">0</span> 
                vrrp_gna_interval <span style="color:#ae81ff">0</span> 
              <span style="color:#f92672">}</span> 
              
              vrrp_script chk_haproxy <span style="color:#f92672">{</span> 
                script <span style="color:#e6db74">"killall -0 haproxy"</span> 
                interval <span style="color:#ae81ff">2</span> 
                weight <span style="color:#ae81ff">2</span> 
              <span style="color:#f92672">}</span> 
              
              vrrp_instance haproxy-vip <span style="color:#f92672">{</span> 
                state BACKUP
                priority <span style="color:#ae81ff">100</span> 
                interface eth0                       <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;Network card</span> 
                virtual_router_id <span style="color:#ae81ff">60</span> 
                advert_int <span style="color:#ae81ff">1</span> 
                authentication <span style="color:#f92672">{</span> 
                  auth_type PASS
                  auth_pass <span style="color:#ae81ff">1111</span> 
                <span style="color:#f92672">}</span> 
                unicast_src_ip 172.16.0.2      <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;The IP address of this machine</span> 
                unicast_peer <span style="color:#f92672">{</span> 
                  172.16.0.3                         <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;The IP address of peer machines</span> 
                <span style="color:#f92672">}</span> 
              
                virtual_ipaddress <span style="color:#f92672">{</span> 
                  172.16.0.10/24                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;The VIP address</span> 
                <span style="color:#f92672">}</span> 
              
                track_script <span style="color:#f92672">{</span> 
                  chk_haproxy
                <span style="color:#f92672">}</span> 
              <span style="color:#f92672">}</span>            
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - For the `interface` field, you must provide your own network card information. You can run `ifconfig` on your machine to get the value.

      - The IP address provided for `unicast_src_ip` is the IP address of your current machine. For other machines where HAproxy and Keepalived are also installed for load balancing, their IP address must be provided for the field `unicast_peer`.
    </div>
  </div> 

3. Save the file and run the following command to restart Keepalived.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl restart keepalived</code>
        </div>
    </pre>
  </article>

4. Make it persist through reboots:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl enable keepalived</code>
        </div>
    </pre>
  </article>

5. Make sure you configure Keepalived on the other machine (`lb2`) as well.

## Verify High Availability

Before you start to create your Kubernetes cluster, make sure you have tested the high availability. 

1. On the machine `lb1`, run the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#f92672">[</span>root@lb1 ~<span style="color:#f92672">]</span><span style="color:#75715e"><span>#</span> <span>&nbsp;ip a s</span></span> 
              <span>1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu</span> <span style="color:#ae81ff">65536</span> qdisc noqueue state UNKNOWN group default qlen <span style="color:#ae81ff">1000</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
              &nbsp;&nbsp;&nbsp;&nbsp;inet 127.0.0.1/8 scope host lo
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
              &nbsp;&nbsp;&nbsp;&nbsp;inet6 ::1/128 scope host
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
              2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu <span style="color:#ae81ff">1500</span> qdisc mq state UP group default qlen <span style="color:#ae81ff">1000</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;link/ether 52:54:9e:27:38:c8 brd ff:ff:ff:ff:ff:ff
              &nbsp;&nbsp;&nbsp;&nbsp;inet 172.16.0.2/24 brd 172.16.0.255 scope global noprefixroute dynamic eth0
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft 73334sec preferred_lft 73334sec
              &nbsp;&nbsp;&nbsp;&nbsp;inet 172.16.0.10/24 scope global secondary eth0 <span style="color:#75715e"><span>#</span><span> The VIP address</span></span> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
              &nbsp;&nbsp;&nbsp;&nbsp;inet6 fe80::510e:f96:98b2:af40/64 scope link noprefixroute
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
            </p>
          </code>
        </div>
    </pre>
  </article>

2. As you can see above, the virtual IP address is successfully added. Simulate a failure on this node:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl stop haproxy</code>
        </div>
    </pre>
  </article>

3. Check the floating IP address again and you can see it disappear on `lb1`.

  <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">[</span>root@lb1 ~<span style="color:#f92672">]</span><span style="color:#75715e"><span>#</span> <span>&nbsp;ip a s</span></span> 
									<span>1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu </span><span style="color:#ae81ff">65536</span> qdisc noqueue state UNKNOWN group default qlen <span style="color:#ae81ff">1000</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
									&nbsp;&nbsp;&nbsp;&nbsp;inet 127.0.0.1/8 scope host lo
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
									&nbsp;&nbsp;&nbsp;&nbsp;inet6 ::1/128 scope host
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
									2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu <span style="color:#ae81ff">1500</span> qdisc mq state UP group default qlen <span style="color:#ae81ff">1000</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;link/ether 52:54:9e:27:38:c8 brd ff:ff:ff:ff:ff:ff
									&nbsp;&nbsp;&nbsp;&nbsp;inet 172.16.0.2/24 brd 172.16.0.255 scope global noprefixroute dynamic eth0
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft 72802sec preferred_lft 72802sec
									&nbsp;&nbsp;&nbsp;&nbsp;inet6 fe80::510e:f96:98b2:af40/64 scope link noprefixroute
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Theoretically, the virtual IP will be failed over to the other machine (`lb2`) if the configuration is successful. On `lb2`, run the following command and here is the expected output:

  <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">[</span>root@lb2 ~<span style="color:#f92672">]</span><span style="color:#75715e"><span>#</span> <span>&nbsp;ip a s</span></span> 
									<span>1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu </span><span style="color:#ae81ff">65536</span> qdisc noqueue state UNKNOWN group default qlen <span style="color:#ae81ff">1000</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
									&nbsp;&nbsp;&nbsp;&nbsp;inet 127.0.0.1/8 scope host lo
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
									&nbsp;&nbsp;&nbsp;&nbsp;inet6 ::1/128 scope host
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
									2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu <span style="color:#ae81ff">1500</span> qdisc mq state UP group default qlen <span style="color:#ae81ff">1000</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;link/ether 52:54:9e:3f:51:ba brd ff:ff:ff:ff:ff:ff
									&nbsp;&nbsp;&nbsp;&nbsp;inet 172.16.0.3/24 brd 172.16.0.255 scope global noprefixroute dynamic eth0
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft 72690sec preferred_lft 72690sec
									&nbsp;&nbsp;&nbsp;&nbsp;inet 172.16.0.10/24 scope global secondary eth0   <span style="color:#75715e"><span>#</span><span>&nbsp;The VIP address</span></span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
									&nbsp;&nbsp;&nbsp;&nbsp;inet6 fe80::f67c:bd4f:d6d5:1d9b/64 scope link noprefixroute
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid_lft forever preferred_lft forever
               </p>
            </code>
         </div>
      </pre>
   </article>

5. As you can see above, high availability is successfully configured.

## Use KubeKey to Create a Kubernetes Cluster

[KubeKey](https://github.com/Super Kubenetes/kubekey) is an efficient and convenient tool to create a Kubernetes cluster. Follow the steps below to download KubeKey.

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

<div className="notices note">
  <p>Note</p>
  <div>
    The commands above download the latest release (v2.2.2) of KubeKey. You can change the version number in the command to download a specific version.
  </div>
</div>

Make `kk` executable:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

Create an example configuration file with default configurations. Here Kubernetes v1.22.10 is used as an example.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config --with-Super Kubenetes v3.3.0 --with-kubernetes v1.22.10</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey will install Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../../../installing-on-linux/introduction/kubekey/#support-matrix).
    
    - If you do not add the flag `--with-Super Kubenetes` in the command in this step, Super Kubenetes will not be deployed unless you install it using the `addons` field in the configuration file or add this flag again when you use `./kk create cluster` later.
    
    - If you add the flag `--with-Super Kubenetes` without specifying a Super Kubenetes version, the latest version of Super Kubenetes will be installed.
  </div>
</div>

## Deploy Super Kubenetes and Kubernetes

After you run the commands above, a configuration file `config-sample.yaml` will be created. Edit the file to add machine information, configure the load balancer and more.

<div className="notices note">
  <p>Note</p>
  <div>
    The file name may be different if you customize it.
  </div>
</div>

### config-sample.yaml example

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ...
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 172.16.0.4, internalAddress: 172.16.0.4, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 172.16.0.5, internalAddress: 172.16.0.5, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 172.16.0.6, internalAddress: 172.16.0.6, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker1, address: 172.16.0.7, internalAddress: 172.16.0.7, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker2, address: 172.16.0.8, internalAddress: 172.16.0.8, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker3, address: 172.16.0.9, internalAddress: 172.16.0.9, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
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
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#ae81ff">172.16.0.10</span>   <span style="color:#75715e">&nbsp;<span>#</span> The VIP address</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
              ...
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Replace the value of `controlPlaneEndpoint.address` with your own VIP address.
    - For more information about different parameters in this configuration file, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).
  </div>
</div>

### Start installation

After you complete the configuration, you can execute the following command to start the installation:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

### Verify installation

1. Run the following command to inspect the logs of installation.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

2. When you see the following message, it means your HA cluster is successfully created.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#75715e">###########################################################</span> 
              <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
              <span style="color:#75715e">###########################################################</span> 
              <span></span> 
              <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://172.16.0.4:30880</a></span> 
              <span style="color:#ffffff">Account: admin</span> 
              <span style="color:#ffffff">Password: P@88w0rd</span> 
              <span></span> 
              <span style="color:#ffffff">NOTES：</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
              <span></span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
              <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-xx-xx xx:xx:xx</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
          </code>
        </div>
    </pre>
  </article>
