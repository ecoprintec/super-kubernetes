---
title: "멤버 클러스터에 대한 호스트 클러스터 액세스 복원"
keywords: "Kubernetes, Super Kubenetes, Multi-cluster, Host Cluster, Member Cluster"
description: "Learn how to restore the Host Cluster access to a Member Cluster."
linkTitle: "Restore the Host Cluster Access to A Member Cluster"
Weight: 16720
---

## 볼 수 있는 오류 메시지

중앙 컨트롤 플레인에서 멤버 클러스터에 접속할 수 없고 브라우저가 계속 Super Kubenetes의 로그인 페이지로 리디렉션하는 경우, 해당 멤버 클러스터에서 다음 명령을 실행하여 ks-apiserver의 로그를 가져옵니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system logs ks-apiserver-7c9c9456bd-qv6bs
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    `ks-apiserver-7c9c9456bd-qv6bs`는 해당 멤버 클러스터의 파드 ID를 나타냅니다. 자신의 파드 ID를 사용하세요.
  </div>
</div>


아마 다음과 같은 오류 메시지를 보게 될 것입니다.:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               E0305 03:46:42.105625       1 token.go:65] token not found in cache
               E0305 03:46:42.105725       1 jwt_token.go:45] token not found in cache
               E0305 03:46:42.105759       1 authentication.go:60] Unable to authenticate the request due to error: token not found in cache
               E0305 03:46:52.045964       1 token.go:65] token not found in cache
               E0305 03:46:52.045992       1 jwt_token.go:45] token not found in cache
               E0305 03:46:52.046004       1 authentication.go:60] Unable to authenticate the request due to error: token not found in cache
               E0305 03:47:34.502726       1 token.go:65] token not found in cache
               E0305 03:47:34.502751       1 jwt_token.go:45] token not found in cache
               E0305 03:47:34.502764       1 authentication.go:60] Unable to authenticate the request due to error: token not found in cache
            </p>
         </code>
      </div>
   </pre>
</article>

해결책

### 1단계: jwtSecret 확인

호스트 클러스터와 멤버 클러스터에서 다음 명령을 실행하여 각각 jwtSecret이 동일한지 확인하십시오.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v “apiVersion” | grep jwtSecret
            </p>
         </code>
      </div>
   </pre>
</article>

### 2단계: `accessTokenMaxAge` 수정

jwtSecrets가 동일한지 확인한 다음, 해당 멤버 클러스터에서 다음 명령을 실행하여 `accessTokenMaxAge` 값을 가져옵니다

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v "apiVersion" | grep accessTokenMaxAge
            </p>
         </code>
      </div>
   </pre>
</article>

만약 값이 `0`이 아니면, 다음 명령어를 실행하여 `accessTokenMaxAge` 값을 수정하세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system edit cm Super Kubenetes-config -o yaml
            </p>
         </code>
      </div>
   </pre>
</article>

`accessTokenMaxAge` 값을 `0`으로 수정한 후, 다음 명령을 실행하여 ks-apiserver를 재시작하세요.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl -n Super Kubenetes-system rollout restart deploy ks-apiserver
            </p>
         </code>
      </div>
   </pre>
</article>

이제 중앙 컨트롤 플레인에서 해당 멤버 클러스터에 다시 액세스할 수 있습니다.