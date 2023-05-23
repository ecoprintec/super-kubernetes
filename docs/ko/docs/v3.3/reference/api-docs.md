---
title: Super Kubenetes API
keywords: 'Kubernetes, Super Kubenetes, API'
description: 'The REST API is the fundamental fabric of Super Kubenetes. This guide shows you how to access the Super Kubenetes API server.'
linkTitle: 'Super Kubenetes API'
weight: 17200
---

## 아키텍쳐

Super Kubenetes API 서버는 API 오브젝트에 대한 데이터를 검증하고 설정합니다. API 서버는 REST 작업을 지원하고 다른 모든 컴포넌트가 상호 작용하는 클러스터의 공유 상태에 프런트엔드를 제공합니다.

![ks-apiserver](/dist/assets/docs/v3.3/reference/Super Kubenetes-api/ks-apiserver.png)

## Super Kubenetes API 사용

Super Kubenetes v3.0은 아키텍처를 보다 간결하고 명료하게 만들기 위해 **ks-apigateway**와 **ks-account**의 기능을 **ks-apiserver**로 이동시켰습니다. Super Kubenetes API를 사용하려면 **ks-apiserver**를 클라이언트에 노출해야 합니다.

### 1단계: Super Kubenetes API 서비스 노출

클러스터 내부의 Super Kubenetes에 접속하려는 경우엔, 다음 섹션을 건너뛰고, Super Kubenetes API 서버 엔드포인트인 **`http://ks-apiserver.Super Kubenetes-system.svc`**를 그냥 사용할 수 있습니다.

그 외의 경우는, Super Kubenetes API 서버 엔드포인트를 먼저 클러스터 외부에 노출해야 합니다.

쿠버네티스 서비스를 노출하는 방법에는 여러 가지가 있습니다. 시연 목적으로, 이 예제에서는 `NodePort`를 사용합니다. 다음 명령을 사용하여 `ks-apiserver`의 서비스 유형을 `NodePort`로 변경하세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ kubectl -n Super Kubenetes-system patch service ks-apiserver -p <span style="color:#e6db74">'{"spec":{"type":"NodePort"}}'</span> 
               $ kubectl -n Super Kubenetes-system get svc
               NAME            TYPE           CLUSTER-IP      EXTERNAL-IP      PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>              AGE
               etcd            ClusterIP      10.233.34.220   &lt;none&gt;           2379/TCP             44d
               ks-apiserver    NodePort       10.233.15.31    &lt;none&gt;           80:31407/TCP         49d
               ks-console      NodePort       10.233.3.45     &lt;none&gt;           80:30880/TCP         49d
            </p>
         </code>
      </div>
   </pre>
</article>

이제 `http://[node ip]:31407`과 같은 URL을 통해 클러스터 외부의 `ks-apiserver`에 액세스할 수 있습니다. 여기서 `[node ip]`는 클러스터에 있는 모든 노드의 IP 주소를 의미합니다.

### 2단계: 토큰 생성

API 서버를 호출하기 전에 자신을 식별해야 합니다. 아래 예시에서는 비밀번호 `P#$$w0rd`를 사용합니다. 사용자는 아래와 같이 토큰 생성 요청을 발행해야 합니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               curl -X POST -H <span style="color:#e6db74">'Content-Type: application/x-www-form-urlencoded'</span><span style="color:#ae81ff">&nbsp;\</span> 
               <span style="color:#ae81ff"></span><span style="color:#e6db74">&nbsp;<span></span><a style="color:#e6db74; cursor:text;">'http://<span>[</span>node ip]:31407/oauth/token'</a></span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'grant_type=password'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'username=admin'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'password=P#$$w0rd'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'client_id=Super Kubenetes'</span> <span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  --data-urlencode <span style="color:#e6db74">'client_secret=Super Kubenetes'</span>
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    `[node ip]`를 자신의 실제 IP 주소로 바꾸십시오. `ClusterConfiguration`에서 클라이언트 자격 증명을 설정할 수 있습니다. 기본 클라이언트 자격 증명인 `client_id`가 있고 `client_secret`은 `Super Kubenetes`입니다.
  </div>
</div>

ID가 올바르면 서버는 아래 출력에서 보이는 것과 같이 응답합니다. `access_token`은 Super Kubenetes API 서버에 접속하기 위한 토큰입니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               {
                  <span style="color:#f92672">"access_token"</span>: <span style="color:#e6db74">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6MTYwMDg1MjM5OCwiaWF0IjoxNjAwODQ1MTk4LCJpc3MiOiJrdWJlc3BoZXJlIiwibmJmIjoxNjAwODQ1MTk4fQ.Hcyf-CPMeq8XyQQLz5PO-oE1Rp1QVkOeV_5J2oX1hvU"</span>,
                  <span style="color:#f92672">"token_type"</span>: <span style="color:#e6db74">"Bearer"</span>,
                  <span style="color:#f92672">"refresh_token"</span>: <span style="color:#e6db74">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJleHAiOjE2MDA4NTk1OTgsImlhdCI6MTYwMDg0NTE5OCwiaXNzIjoia3ViZXNwaGVyZSIsIm5iZiI6MTYwMDg0NTE5OH0.PerssCLVXJD7BuCF3Ow8QUNYLQxjwqC8m9iOkRRD6Tc"</span>,
                  <span style="color:#f92672">"expires_in"</span>: <span style="color:#ae81ff">7200</span> 
               }
            </p>
         </code>
      </div>
   </pre>
</article>

### 3단계: 호출하기

Super Kubenetes API 서버에 접속하기 위해 필요한 모든 것이 준비됐다면, 노드 목록을 가져오기 위해 다음 예시와 같이 위에서 얻은 액세스 토큰을 사용하여 호출하세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ curl -X GET -H <span style="color:#e6db74">"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidWlkIjoiYTlhNjJmOTEtYWQ2Yi00MjRlLWIxNWEtZTFkOTcyNmUzNDFhIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImV4cCI6MTYwMDg1MjM5OCwiaWF0IjoxNjAwODQ1MTk4LCJpc3MiOiJrdWJlc3BoZXJlIiwibmJmIjoxNjAwODQ1MTk4fQ.Hcyf-CPMeq8XyQQLz5PO-oE1Rp1QVkOeV_5J2oX1hvU"</span> <span style="color:#ae81ff">\
               </span><span style="color:#ae81ff"></span>  -H <span style="color:#e6db74">'Content-Type: application/json'</span><span style="color:#ae81ff">&nbsp;\
               </span><span style="color:#ae81ff"></span>  <span style="color:#e6db74">&nbsp;&nbsp;'<a style="color:#e6db74; cursor:text;">http://[node</a> ip]:31407/kapis/resources.Super Kubenetes.io/v1alpha3/nodes'</span> 
               <span></span> 
               <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;"items"</span>: <span style="color:#f92672">[</span> 
               <span style="color:#f92672">&nbsp;&nbsp;{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;"metadata"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"name"</span>: <span style="color:#e6db74">"node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"selfLink"</span>: <span style="color:#e6db74">"/api/v1/nodes/node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"uid"</span>: <span style="color:#e6db74">"dd8c01f3-76e8-4695-9e54-45be90d9ec53"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"resourceVersion"</span>: <span style="color:#e6db74">"84170589"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"creationTimestamp"</span>: <span style="color:#e6db74">"2020-06-18T07:36:41Z"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"labels"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a"</span>: <span style="color:#e6db74">"a"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"beta.kubernetes.io/arch"</span>: <span style="color:#e6db74">"amd64"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"beta.kubernetes.io/os"</span>: <span style="color:#e6db74">"linux"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"gitpod.io/theia.v0.4.0"</span>: <span style="color:#e6db74">"available"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"gitpod.io/ws-sync"</span>: <span style="color:#e6db74">"available"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/arch"</span>: <span style="color:#e6db74">"amd64"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/hostname"</span>: <span style="color:#e6db74">"node3"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/os"</span>: <span style="color:#e6db74">"linux"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes.io/role"</span>: <span style="color:#e6db74">"new"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node-role.kubernetes.io/worker"</span>: <span style="color:#e6db74">""</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"topology.disk.csi.qingcloud.com/instance-type"</span>: <span style="color:#e6db74">"Standard"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"topology.disk.csi.qingcloud.com/zone"</span>: <span style="color:#e6db74">"ap2a"</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"annotations"</span>: <span style="color:#f92672">{</span> 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"csi.volume.kubernetes.io/nodeid"</span>: <span style="color:#e6db74">"{\\"disk.csi.qingcloud.com\\":\\"i-icjxhi1e\\"}"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubeadm.alpha.kubernetes.io/cri-socket"</span>: <span style="color:#e6db74">"/var/run/dockershim.sock"</span>, 
               <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node.alpha.kubernetes.io/ttl"</span>: <span style="color:#e6db74">"0"</span>, 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    [node ip]를 자신의 실제 IP 주소로 바꿉니다.
  </div>
</div>

## API 레퍼런스

Super Kubenetes API swagger JSON 파일은 저장소에서 찾을 수 있습니다.

- Super Kubenetes는 API [swagger json] 파일을 지정했습니다. 여기에는 Super Kubenetes에만 적용되는 모든 API가 포함되어 있습니다.
- Super Kubenetes는 CRD [swagger json] 파일을 지정했습니다. 여기에는 생성된 모든 CRDs API 문서가 포함되어 있습니다. 이는 쿠버네티스 API 오브젝트와 동일합니다.

[여기] 에서도 Super Kubenetes API 문서를 탐색할 수 있습니다.
