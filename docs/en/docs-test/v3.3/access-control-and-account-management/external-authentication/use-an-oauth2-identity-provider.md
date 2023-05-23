---
title: 'Use an OAuth 2.0 Identity Provider'
keywords: 'Kubernetes, Super Kubenetes, OAuth2, Identity Provider'
description: 'How to use an external OAuth2 identity provider.'
linkTitle: 'Use an OAuth 2.0 Identity Provider'
weight: 12230
---

This document describes how to use an external identity provider based on the OAuth 2.0 protocol.

The following figure shows the authentication process between Super Kubenetes and an external OAuth 2.0 identity provider.

![oauth2](/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/use-an-oauth2-identity-provider/oauth2.png)

## Prerequisites

You need to deploy a Kubernetes cluster and install Super Kubenetes in the cluster. For details, see [Installing on Linux](/docs/v3.3/installing-on-linux/) and [Installing on Kubernetes](/docs/v3.3/installing-on-kubernetes/).

## Develop an OAuth 2.0 Plugin

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes provides two built-in OAuth 2.0 plugins: [GitHubIdentityProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) for GitHub and  [AliyunIDaasProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) for Alibaba Cloud IDaaS. You can develop other plugins according to the built-in plugins.
  </div>
</div>

1. Clone the [Super Kubenetes repository](https://github.com/Super Kubenetes/Super Kubenetes) on your local machine, go to the local Super Kubenetes repository, and create a package for your plugin in the `/pkg/apiserver/authentication/identityprovider/` directory.

2. In the plugin package, implement the following interfaces:

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

3. Register the plugin in the `init()` function of the plugin package.

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

4. Import the plugin package in `/pkg/apiserver/authentication/options/authenticate_options.go`.

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

5. [Build the image of ks-apiserver](https://github.com/Super Kubenetes/community/blob/104bab42f67094930f2ca87c603b7c6365cd092a/developer-guide/development/quickstart.md) and deploy it in your cluster.

## Integrate an Identity Provider with Super Kubenetes

1. Log in to Super Kubenetes as `admin`, move the cursor to <img src="/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/set-up-external-authentication/toolbox.png" width="20px" height="20px" alt="icon"> in the lower-right corner, click **kubectl**, and run the following command to edit `ks-installer` of the CRD `ClusterConfiguration`:

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

2. Confiother than `oauthOptions:identityProviders` in the `spec:authentication` section. For details, see [Set Up External Authentication](../set-up-external-authentication/).

3. Configure fields in `oauthOptions:identityProviders` section according to the identity provider plugin you have developed.

   The following is a configuration example that uses GitHub as an external identity provider. For details, see the [official GitHub documentation](https://docs.github.com/en/developers/apps/building-oauth-apps) and the [source code of the GitHubIdentityProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) plugin.

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
   
   Similarly, you can also use Alibaba Cloud IDaaS as an external identity provider. For details, see the official [Alibaba IDaaS documentation](https://www.alibabacloud.com/help/product/111120.htm?spm=a3c0i.14898238.2766395700.1.62081da1NlxYV0) and the [source code of the AliyunIDaasProvider](https://github.com/Super Kubenetes/Super Kubenetes/blob/release-3.1/pkg/apiserver/authentication/identityprovider/github/github.go) plugin.

4. After the fields are configured, save your changes, and wait until the restart of ks-installer is complete.

  <div className="notices note">
    <p>Note</p>
    <div>
      The Super Kubenetes web console is unavailable during the restart of ks-installer. Please wait until the restart is complete.
    </div>
  </div>

5. Go to the Super Kubenetes login page, click **Log In with XXX** (for example, **Log In with GitHub**).

6. On the login page of the external identity provider, enter the username and password of a user configured at the identity provider to log in to Super Kubenetes.

   ![github-login-page](/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/use-an-oauth2-identity-provider/github-login-page.png)
