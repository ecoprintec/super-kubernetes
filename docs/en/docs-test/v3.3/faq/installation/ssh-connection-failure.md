---
title: "SSH Connection Failure"
keywords: "Installation, SSH, Super Kubenetes, Kubernetes"
description: "Understand why the SSH connection may fail when you use KubeKey to create a cluster."
linkTitle: "SSH Connection Failure"
Weight: 16600
---

When you use KubeKey to set up a cluster, you create a configuration file which contains necessary host information. Here is an example of the field `hosts`:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               spec: 
                  hosts: 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: control plane, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password: Testing123<span style="color:#f92672">}</span> 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password: Testing123<span style="color:#f92672">}</span> 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password: Testing123<span style="color:#f92672">}</span>
            </p>
         </code>
      </div>
   </pre>
</article>

Before you start to use the `./kk` command to create your cluster, it is recommended that you test the connection between the taskbox and other instances using SSH.

## Possible Error Message

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Failed to connect to xx.xxx.xx.xxx: could not establish connection to xx.xxx.xx.xxx:xx: ssh: handshake failed: ssh: unable to authenticate , attempted methods <span style="color:#f92672">[</span>none<span style="color:#f92672">]</span>, no supported methods remain node<span style="color:#f92672">=</span>xx.xxx.xx.xxx
            </p>
         </code>
      </div>
   </pre>
</article>

If you see an error message as above, verify that:

- You are using the correct port number. Port `22` is the default port of SSH and you need to add the port number after the IP address if your port is different. For example:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  hosts:
                  <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;{</span>name: control plane, address: 192.168.0.2, internalAddress: 192.168.0.2, port: 8022, user: ubuntu, password: Testing123<span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

- SSH connections are not restricted in `/etc/ssh/sshd_config`. For example, `PasswordAuthentication` should be set to `true`.

- You are using the correct username, password or key. Note that the user must have sudo privileges.

- Your firewall configurations allow SSH connections.