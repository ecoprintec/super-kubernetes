---
title: "사용자 로그인 실패"
keywords: "login failure, user is not active, Super Kubenetes, Kubernetes"
description: "How to solve the issue of login failure"
linkTitle: "User Login Failure"
Weight: 16440
---

Super Kubenetes는 설치 시 기본 사용자(`admin/P@88w0rd`)를 자동으로 생성합니다. 상태가 **활성**이 아니거나 잘못된 비밀번호를 사용하는 경우 사용자는 로그인을 할 수 없습니다.

다음은 사용자 로그인 실패에 대해 자주 묻는 질문입니다.

## 활성 상태가 아닌 사용자

로그인 실패 시 아래 이미지를 볼 수 있습니다. 이유를 찾아 문제를 해결하려면 다음 단계를 수행하십시오.

![account-not-active](/dist/assets/docs/v3.3/faq/access-control-and-account-management/cannot-login/account-not-active.png)

1. 다음 명령어를 실행하여 사용자의 상태를 확인하세요.

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

2. `ks-controller-manager`가 실행 중인지 확인하고 예외가 로그에 포함되어 있는지 확인하세요.

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

아래는 이런 문제를 유발할 수 있는 몇 가지 원인입니다.

### 쿠버네티스 1.19에서 webhooks 오작동

쿠버네티스 1.19는 코딩에 Golang 1.15를 사용하므로 승인 webhooks에 대한 인증서를 업데이트해야 합니다. 이것이 `ks-controller` 승인 webhooks의 실패를 유발합니다.

관련 오류 로그:

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

`ks-controller-manager`는 두 가지 상태 저장 서비스, OpenLDAP과 Jenkins에 의존합니다. OpenLDAP이나 Jenkins가 다운되면 `ks-controller-manager`가 `조정` 상태가 됩니다.

다음 명령어를 실행하여 OpenLDAP과 Jenkins가 정상적으로 실행되고 있는지 확인하세요. 

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

관련 오류 로그:
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

#### 해결책

OpenLDAP과 Jenkins를 네트워크 연결이 양호하게 복원한 다음, `ks-controller-manager`를 재시작해야 합니다.

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

### 잘못된 코드 브랜치 사용

잘못된 버전의 ks-installer를 사용한 경우 설치 후 다른 컴포넌트의 버전이 일치하지 않습니다. 다음 명령을 실행하여 버전이 동일한지 확인하세요. 참고로 올바른 이미지 태그는 `v3.3.0`입니다.

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

## 잘못된 사용자 이름 또는 비밀번호

![incorrect-password](/dist/assets/docs/v3.3/faq/access-control-and-account-management/cannot-login/wrong-password.png)

다음 명령을 실행하여 사용자 이름과 비밀번호가 올바른지 확인하세요.

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

### Redis 실패

`ks-console` 및 `ks-apiserver`는 Redis를 사용하여 여러 사본에서 데이터를 공유합니다. 다음 명령을 사용하여 Redis가 정상적으로 실행 중인지 확인하세요.

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

관련 오류 로그:

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

#### 해결책

Redis를 복원하고 파드 간의 네트워크 연결이 양호한 상태에서 정상적으로 실행되고 있는지 확인해야 합니다. 그런 다음 `ks-console`을 재시작하여 복사본 간에 데이터를 동기화하세요.

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
