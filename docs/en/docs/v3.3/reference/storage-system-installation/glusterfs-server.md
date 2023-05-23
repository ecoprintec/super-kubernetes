---
 title: "Set up a GlusterFS Server"
keywords: 'Kubernetes, Super Kubenetes, GlusterFS'
description: 'How to set up a GlusterFS Server'
linkTitle: "Set up a GlusterFS Server"
weight: 17420
---

As an open-source distributed file system, [GlusterFS](https://kubernetes.io/docs/concepts/storage/volumes/#glusterfs) allows you to mount `glusterfs` volumes to your Pods. If a `glusterfs` volume is pre-populated with data, they can be shared among your Pods in a Kubernetes cluster.

This tutorial demonstrates how to configure GlusterFS on three server machines and install [Heketi](https://github.com/heketi/heketi) to manage your GlusterFS cluster.

Once you have GlusterFS and Heketi set up, you can install GlusterFS on your client machine and use KubeKey to create a Super Kubenetes cluster with GlusterFS as a storage class.

## Prepare GlusterFS Nodes

There are three server machines of Ubuntu 16.04 in this example with each having one attached disk.

  <table>
  <thead>
  <tr>
    <th>
      Hostname
    </th>
    <th>
      IP Address
    </th>
    <th>
      Operating System
    </th>
    <th>
      Device
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      server1
    </td>
    <td>
      192.168.0.2
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  <tr>
    <td>
      server2
    </td>
    <td>
      192.168.0.3
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  <tr>
    <td>
      server3
    </td>
    <td>
      192.168.0.4
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
   <p>Note</p>
   <div>
   - Heketi will be installed on `server1`, which provides a RESTful management interface to manage the lifecycle of GlusterFS volumes. You can install it on a separate machine as well.

   - Attach more block storage disks to your server machine if you need more storage space.
   - Data will be saved to `/dev/vdd` (block device), which must be original without partitioning or formatting.
   </div>
</div>

## Set up Passwordless SSH Login

### Configure root login

1. Log in to `server1` and switch to the root user.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sudo -i
               </p>
            </code>
         </div>
      </pre>
   </article>
   
2. Change the root user password:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  passwd
               </p>
            </code>
         </div>
      </pre>
   </article>
   
<div className="notices note">
  <p>Note</p>
  <div>
    Make sure password authentication is enabled in the file `/etc/ssh/sshd_config` (the value of `PasswordAuthentication` should be `yes`).
  </div>
</div>

3. Change the root user password of `server2` and `server3` as well.

### Add hosts file entries

1. Configure your DNS or edit the `/etc/hosts` file on all server machines to add their hostnames and IP addresses:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/hosts
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
                  <span>#</span><span>&nbsp;hostname loopback address</span> 
                  192.168.0.2  server1
                  192.168.0.3  server2
                  192.168.0.4  server3</p>
            </code>
         </div>
      </pre>
   </article>

2. Make sure you add the above entries to the `hosts` file of all server machines.

### Configure passwordless SSH login

1. On `server1`, create a key by running the following command. Press **Enter** directly for all the prompts.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-keygen</p>
            </code>
         </div>
      </pre>
   </article>

2. Copy the key to all GlusterFS nodes.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-copy-id root@server1</p>
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
                  ssh-copy-id root@server2</p>
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
                  ssh-copy-id root@server3</p>
            </code>
         </div>
      </pre>
   </article>

3. Verify that you can access all server machines from `server1` through passwordless login.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh root@server1</p>
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
                  ssh root@server2</p>
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
                  ssh root@server3</p>
            </code>
         </div>
      </pre>
   </article>

## Install GlusterFS on All Server Machines

1. On `server1`, run the following command to install `software-properties-common`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get install software-properties-common</p>
            </code>
         </div>
      </pre>
   </article>

2. Add the community GlusterFS PPA.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  add-apt-repository ppa:gluster/glusterfs-7</p>
            </code>
         </div>
      </pre>
   </article>

3. Make sure you are using the latest package.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get update</p>
            </code>
         </div>
      </pre>
   </article>

4. Install the GlusterFS server.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get install glusterfs-server -y</p>
            </code>
         </div>
      </pre>
   </article>

5. Make sure you run the above commands on `server2` and `server3` as well and verify the version on all machines.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  glusterfs -V</p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices note">
  <p>Note</p>
  <div>
    The above commands may be slightly different if you do no install GlusterFS on Ubuntu. For more information, see [the Gluster documentation](https://docs.gluster.org/en/latest/Install-Guide/Install/#installing-gluster).
  </div>
</div>

## Load Kernel Modules

1. Run the following commands to load three necessary kernel modules on `server1`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  echo dm_thin_pool | sudo tee -a /etc/modules</p>
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
                  echo dm_snapshot | sudo tee -a /etc/modules</p>
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
                  echo dm_mirror | sudo tee -a /etc/modules</p>
            </code>
         </div>
      </pre>
   </article>

2. Intall `thin-provisioning-tools`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get -y install thin-provisioning-tools</p>
            </code>
         </div>
      </pre>
   </article>

3. Make sure you run the above commands on `server2` and `server3` as well.

## Create a GlusterFS Cluster

1. Run the following command on `server1` to add other nodes and create a cluster.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  gluster peer probe server2</p>
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
                  gluster peer probe server3</p>
            </code>
         </div>
      </pre>
   </article>

2. Verify that all nodes in the cluster are connected successfully.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  gluster peer status</p>
            </code>
         </div>
      </pre>
   </article>

3. Expected output:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  Number of Peers: <span style="color:#ae81ff">2</span>

                  Hostname: server2
                  Uuid: e1192d6a-b65e-4ce8-804c-72d9425211a6
                  State: Peer in Cluster <span style="color:#f92672">(</span>Connected<span style="color:#f92672">)</span>
                     
                  Hostname: server3
                  Uuid: 9bd733e4-96d4-49d5-8958-6c947a2b4fa6
                  State: Peer in Cluster <span style="color:#f92672">(</span>Connected<span style="color:#f92672">)</span></p>
            </code>
         </div>
      </pre>
   </article>

## Install Heketi

As GlusterFS itself does not provide a way for API calls, you can install [Heketi](https://github.com/heketi/heketi) to manage the lifecycle of GlusterFS volumes with a RESTful API for Kubernetes calls. In this way, your Kubernetes cluster can dynamically provision GlusterFS volumes. Heketi v7.0.0 will be installed in this example. For more information about available Heketi versions, see its [Release Page](https://github.com/heketi/heketi/releases/).

1. Download Heketi on `server1`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  wget <a style="color:#ffffff; cursor:text;">https://github.com/heketi/heketi/releases/download/v7.0.0/heketi-v7.0.0.linux.amd64.tar.gz</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can also install Heketi on a separate machine.
    </div>
  </div>

2. Unzip the file.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  tar -xf heketi-v7.0.0.linux.amd64.tar.gz
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
                  cd heketi
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
                  cp heketi /usr/bin
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
                  cp heketi-cli /usr/bin
               </p>
            </code>
         </div>
      </pre>
   </article>
   
3. Create a Heketi service file.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /lib/systemd/system/heketi.service
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
                  [Unit]
                  Description=Heketi Server
                  [Service]
                  Type=simple
                  WorkingDirectory=/var/lib/heketi
                  ExecStart=/usr/bin/heketi --config=/etc/heketi/heketi.json
                  Restart=on-failure
                  StandardOutput=syslog
                  StandardError=syslog
                  [Install]
                  WantedBy=multi-user.target
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Create Heketi folders.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  mkdir -p /var/lib/heketi
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
                  mkdir -p /etc/heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Create a JSON file for Heketi configurations.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/heketi/heketi.json
               </p>
            </code>
         </div>
      </pre>
   </article>

   An example file:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  {
                  <span style="color:#f92672">&nbsp;&nbsp;"_port_comment"</span>: <span style="color:#e6db74">"Heketi Server Port Number"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"port"</span>: <span style="color:#e6db74">"8080"</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_use_auth"</span>: <span style="color:#e6db74">"Enable JWT authorization. Please enable for deployment"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"use_auth"</span>: <span style="color:#66d9ef">false</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_jwt"</span>: <span style="color:#e6db74">"Private keys for access"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"jwt"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_admin"</span>: <span style="color:#e6db74">"Admin has access to all APIs"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"admin"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key"</span>: <span style="color:#e6db74">"123456"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_user"</span>: <span style="color:#e6db74">"User only has access to /volumes endpoint"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key"</span>: <span style="color:#e6db74">"123456"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_glusterfs_comment"</span>: <span style="color:#e6db74">"GlusterFS Configuration"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"glusterfs"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_executor_comment"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Execute plugin. Possible choices: mock, ssh"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mock: This setting is used for testing and development."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"      It will not send commands to any node."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ssh:  This setting will notify Heketi to ssh to the nodes."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"      It will need the values in sshexec to be configured."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes: Communicate with GlusterFS containers over"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"            Kubernetes exec api."</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"executor"</span>: <span style="color:#e6db74">"ssh"</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_sshexec_comment"</span>: <span style="color:#e6db74">"SSH username and private key file information"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"sshexec"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"keyfile"</span>: <span style="color:#e6db74">"/root/.ssh/id_rsa"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: <span style="color:#e6db74">"root"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_kubeexec_comment"</span>: <span style="color:#e6db74">"Kubernetes configuration"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"kubeexec"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"host"</span> :<span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://kubernetes.host:8443"</a></span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"cert"</span> : <span style="color:#e6db74">"/path/to/crt.file"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"insecure"</span>: <span style="color:#66d9ef">false</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: <span style="color:#e6db74">"kubernetes username"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password"</span>: <span style="color:#e6db74">"password for kubernetes user"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"namespace"</span>: <span style="color:#e6db74">"Kubernetes namespace"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fstab"</span>: <span style="color:#e6db74">"Optional: Specify fstab file on node.  Default is /etc/fstab"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_db_comment"</span>: <span style="color:#e6db74">"Database file name"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"db"</span>: <span style="color:#e6db74">"/var/lib/heketi/heketi.db"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"brick_max_size_gb"</span> : <span style="color:#ae81ff">1024</span>,
                  <span style="color:#f92672">&nbsp;"brick_min_size_gb"</span> : <span style="color:#ae81ff">1</span>,
                  <span style="color:#f92672">&nbsp;"max_bricks_per_volume"</span> : <span style="color:#ae81ff">33</span>,
                  
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_loglevel_comment"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Set log level. Choices are:"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  none, critical, error, warning, info, debug"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Default is warning"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"loglevel"</span> : <span style="color:#e6db74">"debug"</span> 
                  &nbsp;&nbsp;}
                  }
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      The account `admin` and its `key` value must be provided when you install GlusterFS as a storage class of your Super Kubenetes cluster.
    </div>
  </div>

6. Start Heketi.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl start heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

7. Check the status of Heketi.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl status heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   If you can see `active (running)`, it means the installation is successful. Expected output:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ● heketi.service - Heketi Server
                  &nbsp;&nbsp;&nbsp;Loaded: loaded <span style="color:#f92672">(</span>/lib/systemd/system/heketi.service; disabled; vendor preset: enabled<span style="color:#f92672">)</span> 
                  &nbsp;&nbsp;&nbsp;Active: active <span style="color:#f92672">(</span>running<span style="color:#f92672">)</span> since Tue 2021-03-09 13:04:30 CST; 4s ago 
                  &nbsp;Main PID: <span style="color:#ae81ff">9282</span> <span style="color:#f92672">&nbsp;(</span>heketi<span style="color:#f92672">)</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;Tasks: <span style="color:#ae81ff">8</span> 
                  &nbsp;&nbsp;&nbsp;Memory: 6.5M 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CPU: 62ms 
                  &nbsp;&nbsp;&nbsp;CGroup: /system.slice/heketi.service 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─9282 /usr/bin/heketi --config<span style="color:#f92672">=</span>/etc/heketi/heketi.json 

                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 systemd<span style="color:#f92672">[</span>1<span style="color:#f92672">]</span>: Started Heketi Server. 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: Heketi v7.0.0 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Loaded ssh executor 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Max bricks per volume set to <span style="color:#ae81ff">33</span> 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Max brick size <span style="color:#ae81ff">1024</span> GB
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Min brick size <span style="color:#ae81ff">1</span> GB
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 GlusterFS Application Loaded
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Started Node Health Cache Monitor
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: Listening on port <span style="color:#ae81ff">8080</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

8. Enable Heketi.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl enable heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   Expected output:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  Created symlink from /etc/systemd/system/multi-user.target.wants/heketi.service to /lib/systemd/system/heketi.service.
               </p>
            </code>
         </div>
      </pre>
   </article>

9. Create a topology configuration file for Heketi. It contains the information of clusters, nodes, and disks added to Heketi.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/heketi/topology.json
               </p>
            </code>
         </div>
      </pre>
   </article>

   An example file:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"clusters"</span>: [
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nodes"</span>: [
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.2"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.2"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.3"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.3"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.4"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.4"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;}
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - Replace the IP addresses above with your own.
      - Add your own disk name for `devices`.
    </div>
  </div> 

10. Load the Heketi JSON file.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export HEKETI_CLI_SERVER<span style="color:#f92672">=</span><a style="color:#ffffff; cursor:text;">http://localhost:8080</a>
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
                  heketi-cli topology load --json<span style="color:#f92672">=</span>/etc/heketi/topology.json
               </p>
            </code>
         </div>
      </pre>
   </article>

    Expected output:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Creating cluster ... ID: 2d9e11adede04fe6d07cb81c5a1a7ea4
                     Allowing file volumes on cluster.
                     Allowing block volumes on cluster.
                     Creating node 192.168.0.2 ... ID: 0a9f240ab6fd96ea014948c5605be675
                        Adding device /dev/vdd ... OK
                     Creating node 192.168.0.3 ... ID: 2468086cadfee8ef9f48bc15db81c88a
                        Adding device /dev/vdd ... OK
                     Creating node 192.168.0.4 ... ID: 4c21b33d5c32029f5b7dc6406977ec34
                        Adding device /dev/vdd ... OK
            </p>
         </code>
      </div>
   </pre>
</article>

11. The above output displays both your cluster ID and node ID. Run the following command to view your cluster information.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
               heketi-cli cluster info 2d9e11adede04fe6d07cb81c5a1a7ea4 <span style="color:#75715e"># Use your own cluster ID.</span>
         </code>
      </div>
   </pre>
</article>

Expected output:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Cluster id: 2d9e11adede04fe6d07cb81c5a1a7ea4
               Nodes:
               0a9f240ab6fd96ea014948c5605be675
               2468086cadfee8ef9f48bc15db81c88a
               4c21b33d5c32029f5b7dc6406977ec34
               Volumes:

               Block: true

               File: true
            </p>
         </code>
      </div>
   </pre>
</article>
   

