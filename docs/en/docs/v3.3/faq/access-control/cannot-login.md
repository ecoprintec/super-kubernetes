---
title: "User Login Failure"
keywords: "login failure, user is not active, Super Kubenetes, Kubernetes"
description: "How to solve the issue of login failure"
linkTitle: "User Login Failure"
Weight: 16440
---

Super Kubenetes automatically creates a default user (`admin/P@88w0rd`) when it is installed. A user cannot be used for login if the status is not **Active** or you use an incorrect password.

Here are some of the frequently asked questions about user login failure.

## User Not Active

You may see an image below when the login fails. To find out the reason and solve the issue, perform the following steps:

![account-not-active](/dist/assets/docs/v3.3/faq/access-control-and-account-management/cannot-login/account-not-active.png)

1. Execute the following command to check the status of the user.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ kubectl get users
                  NAME         EMAIL                    STATUS
                  admin        admin@Super Kubenetes.io      Active
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Verify that `ks-controller-manager` is running and check if exceptions are contained in logs:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system logs -l app<span style="color:#f92672">=</span>ks-controller-manager
               </p>
            </code>
         </div>
      </pre>
   </article>

Here are some possible reasons for this issue.

### Admission webhooks malfunction in Kubernetes 1.19

Kubernetes 1.19 uses Golang 1.15 in coding, requiring the certificate for admission webhooks to be updated. This causes the failure of `ks-controller` admission webhook.

Related error logs:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Internal error occurred: failed calling webhook <span style="color:#e6db74">"validating-user.Super Kubenetes.io"</span>: Post <span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://ks-controller-manager.Super Kubenetes-system.svc:443/validate-email-iam-Super Kubenetes-io-v1alpha2-user?timeout=30s</a>"</span>: x509: certificate relies on legacy Common Name field, use SANs or temporarily enable Common Name matching with GODEBUG<span style="color:#f92672">=</span>x509ignoreCN<span style="color:#f92672">=</span><span style="color:#ae81ff">0</span>
            </p>
         </code>
      </div>
   </pre>
</article>

### ks-controller-manager malfunctions

`ks-controller-manager` relies on two stateful Services: OpenLDAP and Jenkins. When OpenLDAP or Jenkins goes down, `ks-controller-manager` will be in the status of `reconcile`.

Execute the following commands to verify that OpenLDAP and Jenkins are running normally. 

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
            <code>
            <p>
               kubectl -n Super Kubenetes-devops-system get po | grep -v Running
               kubectl -n Super Kubenetes-system get po | grep -v Running
               kubectl -n Super Kubenetes-system logs -l app=openldap</p></code></div>
   </pre>
</article>

Related error logs:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
            <code>
            <p>
               failed to connect to ldap service, please check ldap status, error: factory is not able to fill the pool: LDAP Result Code <span style="color:#ae81ff">200</span> <span style="color:#ae81ff">&nbsp;\\"</span>Network Error<span style="color:#ae81ff">\\"</span>: dial tcp: lookup openldap.Super Kubenetes-system.svc on 169.254.25.10:53: no such host</p></code></div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Internal error occurred: failed calling webhook “validating-user.Super Kubenetes.io”: Post <a style="color:#ffffff; cursor:text;">https://ks-controller-manager.Super Kubenetes-system.svc:443/validate-email-iam-Super Kubenetes-io-v1alpha2-user?timeout</a><span style="color:#f92672">=</span>4s: context deadline exceeded
            </p>
         </code>
      </div>
   </pre>
</article>

#### Solution

You need to restore OpenLDAP and Jenkins with good network connection, and then restart `ks-controller-manager`.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system rollout restart deploy ks-controller-manager
            </p>
         </code>
      </div>
   </pre>
</article>

### Wrong code branch used

If you used the incorrect version of ks-installer, the versions of different components would not match after the installation. Execute the following commands to check version consistency. Note that the correct image tag is `v3.3.0`.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system get deploy ks-installer -o jsonpath='{.spec.template.spec.containers[0].image}'
               kubectl -n Super Kubenetes-system get deploy ks-apiserver -o jsonpath='{.spec.template.spec.containers[0].image}'
               kubectl -n Super Kubenetes-system get deploy ks-controller-manager -o jsonpath='{.spec.template.spec.containers[0].image}'</p></code></div>
   </pre>
</article>

## Wrong Username or Password

![incorrect-password](/dist/assets/docs/v3.3/faq/access-control-and-account-management/cannot-login/wrong-password.png)

Run the following command to verify that the username and the password are correct.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               curl -u &lt;USERNAME&gt;:&lt;PASSWORD&gt; "<a style="color:#ffffff; cursor:text;">http://`kubectl</a> -n Super Kubenetes-system get svc ks-apiserver -o jsonpath='{.spec.clusterIP}'`/api/v1/nodes"
            </p>
         </code>
      </div>
   </pre>
</article>

### Redis failure

`ks-console` and `ks-apiserver` use Redis to share data across multiple copies. Use the following commands to verify that Redis is running normally.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system logs -l app=ks-console
               kubectl -n Super Kubenetes-system get po | grep -v Running
               # High Availability
               kubectl -n Super Kubenetes-system  exec -it redis-ha-server-0 redis-cli info replication
               kubectl -n Super Kubenetes-system  exec -it redis-ha-server-0 -- sh -c 'for i in `seq 0 2`; do nc -vz redis-ha-server-$i.redis-ha.Super Kubenetes-system.svc 6379; done'
               kubectl -n Super Kubenetes-system logs -l app=redis-ha-haproxy
               kubectl -n Super Kubenetes-system logs -l app=redis-ha
               # Single Replica 
               kubectl -n Super Kubenetes-system logs -l app=redis
            </p>
         </code>
      </div>
   </pre>
</article>

Related error logs:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               1344:C <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:18.099 <span style="color:#75715e"><span>#</span><span>&nbsp;Failed opening the RDB file dump.rdb (in server root dir /data) for saving: Stale file handle</span></span> 
               1:M <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:18.198 <span style="color:#75715e"><span>#</span><span>&nbsp;Background saving error</span></span> 
               1:M <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:24.014 * <span style="color:#ae81ff">1</span> changes in <span style="color:#ae81ff">3600</span> seconds. Saving...
               1:M <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:24.015 * Background saving started by pid <span style="color:#ae81ff">1345</span> 
               1345:C <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:24.016 <span style="color:#75715e"><span>#</span><span>&nbsp;Failed opening the RDB file dump.rdb (in server root dir /data) for saving: Stale file handle</span></span> 
               1:M <span style="color:#ae81ff">17</span> Sep <span style="color:#ae81ff">2020</span> 17:13:24.115 <span style="color:#75715e"><span>#</span><span>&nbsp;Background saving error</span></span>
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
               E0909 07:05:22.770468 <span style="color:#ae81ff">1</span> redis.go:51<span style="color:#f92672">]</span> unable to reach redis host EOF</p></code></div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">[</span>WARNING<span style="color:#f92672">]</span> 252/094143 <span style="color:#f92672">(</span>6<span style="color:#f92672">)</span> : Server check_if_redis_is_master_0/R0 is DOWN, reason: Layer7 timeout, info: <span style="color:#e6db74">" at step 5 of tcp-check (expect string '10.223.2.232')"</span>, check duration: 1000ms. <span style="color:#ae81ff">2</span> active and <span style="color:#ae81ff">0</span> backup servers left. <span style="color:#ae81ff">0</span> sessions active, <span style="color:#ae81ff">0</span> requeued, <span style="color:#ae81ff">0</span> remaining in queue.
               <span style="color:#f92672">[</span>WARNING<span style="color:#f92672">]</span> 252/094143 <span style="color:#f92672">(</span>6<span style="color:#f92672">)</span> : Server check_if_redis_is_master_0/R1 is DOWN, reason: Layer7 timeout, info: <span style="color:#e6db74">" at step 5 of tcp-check (expect string '10.223.2.232')"</span>, check duration: 1000ms. <span style="color:#ae81ff">1</span> active and <span style="color:#ae81ff">0</span> backup servers left. <span style="color:#ae81ff">0</span> sessions active, <span style="color:#ae81ff">0</span> requeued, <span style="color:#ae81ff">0</span> remaining in queue.
               <span style="color:#f92672">[</span>WARNING<span style="color:#f92672">]</span> 252/094143 <span style="color:#f92672">(</span>6<span style="color:#f92672">)</span> : Server check_if_redis_is_master_0/R2 is DOWN, reason: Layer7 timeout, info: <span style="color:#e6db74">" at step 5 of tcp-check (expect string '10.223.2.232')"</span>, check duration: 1000ms. <span style="color:#ae81ff">0</span> active and <span style="color:#ae81ff">0</span> backup servers left. <span style="color:#ae81ff">0</span> sessions active, <span style="color:#ae81ff">0</span> requeued, <span style="color:#ae81ff">0</span> remaining in queue.
               <span style="color:#f92672">[</span>ALERT<span style="color:#f92672">]</span> 252/094143 <span style="color:#f92672">(</span>6<span style="color:#f92672">)</span> : backend <span style="color:#e6db74">'check_if_redis_is_master_0'</span> has no server available!
            </p>
         </code>
      </div>
   </pre>
</article>

#### Solution

You need to restore Redis and make sure it is running normally with good network connection between Pods. After that, restart `ks-console` to synchronize the data across copies.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system rollout restart deploy ks-console
            </p>
         </code>
      </div>
   </pre>
</article>
