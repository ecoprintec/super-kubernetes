---
title: OAuth 2.0 자격증명 공급자 사용
keywords: 'Kubernetes, Super Kubenetes, OAuth2, Identity Provider'
description: 'How to use an external OAuth2 identity provider.'
linkTitle: 'Use an OAuth 2.0 Identity Provider'
weight: 12230
---

이 문서에서는 OAuth 2.0 프로토콜을 기반으로 외부 자격증명 공급자를 사용하는 방법을 설명합니다.

다음 그림은 Super Kubenetes와 외부 OAuth 2.0 자격증명 공급자 간의 인증 프로세스를 보여줍니다.

![oauth2](/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/use-an-oauth2-identity-provider/oauth2.png)

## 사전 준비

- 당신은 Kubernetes 클러스터를 배포하고 그 클러스터에 Super Kubenetes를 설치해야 합니다. 자세한 내용은 [리눅스에 설치](/docs/v3.3/installing-on-linux/) and [쿠버네티스에 설치](/docs/v3.3/installing-on-kubernetes/)를 참조하십시오.

## OAuth 2.0 플러그인 개발

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes는 두 가지 내장 OAuth 2.0 플러그인을 제공합니다: 깃허브 용 [GitHubIdentityProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) 그리고 알리바바 클라우드 IDaaS 용 [AliyunIDaasProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go). 내장된 플러그인에 따라 다른 플러그인을 개발할 수 있습니다.
  </div>
</div>

1. 로컬 시스템에 [Super Kubenetes 저장소](https://github.com/Super Kubenetes/Super Kubenetes)를 복제하고 로컬 Super Kubenetes 저장소로 이동한 후 '/pkg/apiserver/authentication/identity provider/' 디렉토리에 플러그인을 위한 패키지를 생성합니다.

2. 플러그인 패키지에서 다음 인터페이스를 구현합니다.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#75715e">// /pkg/apiserver/authentication/identityprovider/oauth_provider.go
									</span><span style="color:#75715e"></span><span style="color:#66d9ef">type</span> <span style="color:#a6e22e">&nbsp;OAuthProvider</span> <span style="color:#66d9ef">&nbsp;interface</span> {
									 <span style="color:#75715e">// Exchange identity with a remote server.
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;IdentityExchange</span>(<span style="color:#a6e22e">code</span> <span style="color:#66d9ef">&nbsp;string</span>) (<span style="color:#a6e22e">Identity</span>, <span style="color:#66d9ef">error</span><span>)</span> 
									<span>}</span> 
                  <span></span> 
									<span style="color:#66d9ef">type</span> <span style="color:#a6e22e">&nbsp;OAuthProviderFactory</span> <span style="color:#66d9ef">&nbsp;interface</span> {
									 <span style="color:#75715e">// Return the identity provider type.
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;Type</span>() <span style="color:#66d9ef">string</span> 
									 <span style="color:#75715e">// Apply settings from Super Kubenetes-config.
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;Create</span>(<span style="color:#a6e22e">options</span> <span style="color:#a6e22e">&nbsp;oauth</span>.<span style="color:#a6e22e">DynamicOptions</span>) (<span style="color:#a6e22e">OAuthProvider</span>, <span style="color:#66d9ef">error</span>)
									<span>}</span>  
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
									<span style="color:#75715e">// /pkg/apiserver/authentication/identityprovider/identity_provider.go
									</span><span style="color:#75715e"></span><span style="color:#66d9ef">type</span> <span style="color:#a6e22e">&nbsp;Identity</span> <span style="color:#66d9ef">&nbsp;interface</span> { 
									  <span style="color:#75715e">// (Mandatory) Return the identifier of the user at the identity provider. 
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;GetUserID</span>() <span style="color:#66d9ef">string</span> 
									  <span style="color:#75715e">// (Optional) Return the name of the user to be referred as on Super Kubenetes. 
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;GetUsername</span>() <span style="color:#66d9ef">string</span> 
									  <span style="color:#75715e">// (Optional) Return the email address of the user. 
									</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;GetEmail</span>() <span style="color:#66d9ef">string</span> 
									<span>}</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. 플러그인 패키지의 init() 함수에 플러그인을 등록합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span style="color:#75715e">// Custom plugin package
   										</span><span style="color:#75715e"></span><span style="color:#66d9ef">func</span> <span style="color:#a6e22e">&nbsp;init</span>() {
   										  <span style="color:#75715e">// Change &lt;StructName&gt; to the actual name of the struct that
   										</span><span style="color:#75715e"></span>  <span style="color:#75715e">&nbsp;&nbsp;// implements the OAuthProviderFactory interface.
   										</span><span style="color:#75715e"></span> <span style="color:#a6e22e">&nbsp;identityprovider</span>.<span style="color:#a6e22e">RegisterOAuthProvider</span>(<span style="color:#f92672">&amp;</span>&lt;<span style="color:#a6e22e">StructName</span>&gt;{})
   										<span>}</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

4. 플러그인 패키지를 `/pkg/apiserver/authentication/options/authenticate_options.go`에 가져오기.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span style="color:#75715e">// Change &lt;CustomPackage&gt; to the actual name of your plugin package.
   										</span><span style="color:#75715e"></span><span style="color:#f92672">import</span> (
   										 <span style="color:#f92672">...</span> 
   										 <span style="color:#a6e22e">_</span> <span style="color:#e6db74">&nbsp;"Super Kubenetes.io/Super Kubenetes/pkg/apiserver/authentication/identityprovider/&lt;CustomPackage&gt;"</span> 
   										 <span style="color:#f92672">...</span> 
   										 <span>)</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. [ks-apiserver의 이미지를 빌드](https://github.com/Super Kubenetes/community/blob/104bab42f67094930f2ca87c603b7c6365cd092a/developer-guide/development/quickstart.md)하고 클러스터에 배포합니다.

## 자격증명 공급자를 Super Kubenetes와 통합

1. Super Kubenetes에 `admin`으로 로그인하고, 커서를 오른쪽 아래 모서리에 있는 <img src="/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/set-up-external-authentication/toolbox.png" width="20px" height="20px" alt="icon">으로 이동시켜서, **kubectl**를 클릭하고, CRD `ClusterConfiguration` 안의 `ks-installer`를 편집하기 위해 아래의 명령어를 실행하십시오:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										kubectl -n Super Kubenetes-system edit cc ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

2. `spec:authentication` 섹션에서 `oauthOptions:identityProviders` 이외의 영역을 구성합니다. 자세한 내용은 [외부 인증 설정](../set-up-external-authentication/)을 참조하십시오.

3. 개발한 자격증명 공급자 플러그인에 따라 `oauthOptions:identityProviders` 섹션의 영역 구성하기.

   다음은 GitHub를 외부 자격증명 공급자로 사용하는 설정 예입니다. 자세한 내용은 [공식 GitHub 문서](https://docs.github.com/en/developers/apps/building-oauth-apps)와 [GitHubIdentityProvider의 소스코드](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) 플러그인을 참조하십시오.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;authentication</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jwtSecret</span>: <span style="color:#e6db74">''</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;authenticateRateLimiterMaxTries</span>: <span style="color:#ae81ff">10</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;authenticateRateLimiterDuration</span>: <span style="color:#ae81ff">10m0s</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;oauthOptions</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenMaxAge</span>: <span style="color:#ae81ff">1h</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenInactivityTimeout</span>: <span style="color:#ae81ff">30m</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identityProviders</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">github</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">GitHubIdentityProvider</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mappingMethod</span>: <span style="color:#ae81ff">auto</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clientID</span>: <span style="color:#e6db74"><span></span>'******'<span></span></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clgure fields ientSecret</span>: <span style="color:#e6db74"><span></span>'******'<span></span></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;redirectURL</span>: <span style="color:#e6db74"><span></span>'https://ks-console/oauth/redirect/github'<span></span></span> 
            </p>
        </code>
      </div>
  </pre>
</article>
   
   마찬가지로, 알리바바 클라우드 IDaaS를 외부 자격증명 공급자로 사용할 수 있습니다. 자세한 내용은 [공식 알리바바 클라우드 IDaaS 문서](https://www.alibabacloud.com/help/product/111120.htm?spm=a3c0i.14898238.2766395700.1.62081da1NlxYV0)와 [AliyunIDaasProvider의 소스코드](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) 플러그인을 참조하십시오.

4. 필드가 구성되고 나면 변경 사항을 저장하고 ks-installer의 재시작이 완료될 때까지 기다립니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      ks-installer를 다시 시작하는 동안 Super Kubenetes 웹 콘솔을 사용할 수 없습니다. 재시작이 완료될 때까지 기다리십시오.
    </div>
  </div>

5. Super Kubenetes 로그인 페이지로 이동하여 **Log In with XXX**을 클릭합니다. (예를 들어, **Log In with GitHub**).

6. 외부 자격증명 공급자의 로그인 페이지에서 자격증명 공급자에서 설정한 사용자의 이름과 비밀번호를 입력하여 Super Kubenetes에 로그인 하십시오.

   ![github-login-page](/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/use-an-oauth2-identity-provider/github-login-page.png)
