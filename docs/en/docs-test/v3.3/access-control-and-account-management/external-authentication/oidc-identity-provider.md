---
title: "OIDC Identity Provider"
keywords: "OIDC, identity provider"
description: "How to use an external OIDC identity provider."
linkTitle: "OIDC Identity Provider"
weight: 12221
---

## OIDC Identity Provider

[OpenID Connect](https://openid.net/connect/) is an interoperable authentication protocol based on the OAuth 2.0 family of specifications. It uses straightforward REST/JSON message flows with a design goal of “making simple things simple and complicated things possible”. It’s uniquely easy for developers to integrate, compared to any preceding Identity protocol, such as Keycloak, Okta, Dex, Auth0, Gluu, Casdoor and many more.

## Prerequisites

You need to deploy a Kubernetes cluster and install Super Kubenetes in the cluster. For details, see [Installing on Linux](/docs/v3.3/installing-on-linux/) and [Installing on Kubernetes](/docs/v3.3/installing-on-kubernetes/).

## Procedure

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

2. Add the following fields under `spec.authentication.jwtSecret`. 

   *Example of using [Google Identity Platform](https://developers.google.com/identity/protocols/oauth2/openid-connect)*:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">spec</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;authentication</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jwtSecret</span>:<span style="color:#e6db74">&nbsp;''</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;authenticateRateLimiterMaxTries</span>:<span style="color:#ae81ff">&nbsp;10</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;authenticateRateLimiterDuration</span>:<span style="color:#ae81ff">&nbsp;10m0s</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;oauthOptions</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenMaxAge</span>:<span style="color:#ae81ff">&nbsp;1h</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenInactivityTimeout</span>:<span style="color:#ae81ff">&nbsp;30m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identityProviders</span>:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-<span style="color:#f92672">&nbsp;name</span>:<span style="color:#ae81ff">&nbsp;google</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>:<span style="color:#ae81ff">&nbsp;OIDCIdentityProvider</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mappingMethod</span>: <span style="color:#ae81ff">auto</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clientID</span>: <span style="color:#e6db74"><span>'</span>********<span>'</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clientSecret</span>: <span style="color:#e6db74"><span>'</span>********<span>'</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;issuer</span>: <span style="color:#ae81ff"><span></span>https://accounts.google.com</span>
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;redirectURL</span>: &nbsp;<span style="color:#e6db74"><span>'</span>https://ks-console/oauth/redirect/google<span>'</span></span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

   See description of parameters as below:

   <table>
   <thead>
   <tr>
      <th>
         Parameter
      </th>
      <th>
         Description
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         clientID
      </td>
      <td>
         The OAuth2 client ID.
      </td>
   </tr>
   <tr>
      <td>
         clientSecret
      </td>
      <td>
         The OAuth2 client secret.
      </td>
   </tr>
   <tr>
      <td>
         redirectURL
      </td>
      <td>
         The redirected URL to ks-console in the following format: <code>https://&lt;Domain name&gt;/oauth/redirect/&lt;Provider name&gt;</code>. The <code>&lt;Provider name&gt;</code> in the URL corresponds to the value of <code>oauthOptions:identityProviders:name</code>.
      </td>
   </tr>
   <tr>
      <td>
         issuer
      </td>
      <td>
         Defines how Clients dynamically discover information about OpenID Providers.
      </td>
   </tr>
   <tr>
      <td>
         preferredUsernameKey
      </td>
      <td>
         Configurable key which contains the preferred username claims. This parameter is optional.
      </td>
   </tr>
   <tr>
      <td>
         emailKey
      </td>
      <td>
         Configurable key which contains the email claims. This parameter is optional.
      </td>
   </tr>
   <tr>
      <td>
         getUserInfo
      </td>
      <td>
         GetUserInfo uses the userinfo endpoint to get additional claims for the token. This is especially useful where upstreams return "thin" ID tokens. This parameter is optional.
      </td>
   </tr>
   <tr>
      <td>
         insecureSkipVerify
      </td>
      <td>
         Used to turn off TLS certificate verification.
      </td>
   </tr>
   </tbody>
   </table>

