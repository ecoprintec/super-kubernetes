---
title: "Set Up External Authentication"
keywords: "LDAP, external, third-party, authentication"
description: "How to set up external authentication on Super Kubenetes."
linkTitle: "Set Up External Authentication"
weight: 12210
---

This document describes how to use an external identity provider such as an LDAP service or Active Directory service on Super Kubenetes.

Super Kubenetes provides a built-in OAuth server. Users can obtain OAuth access tokens to authenticate themselves to the Super Kubenetes API. As a Super Kubenetes administrator, you can edit  `ks-installer` of the CRD `ClusterConfiguration` to configure OAuth and specify identity providers.

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

   Example:

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
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;loginHistoryRetentionPeriod</span>: <span style="color:#ae81ff">168h</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;maximumClockSkew</span>: <span style="color:#ae81ff">10s</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;multipleLogin</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;oauthOptions</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenMaxAge</span>: <span style="color:#ae81ff">1h</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessTokenInactivityTimeout</span>: <span style="color:#ae81ff">30m</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identityProviders</span>: 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">LDAP</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">LDAPIdentityProvider</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mappingMethod</span>: <span style="color:#ae81ff">auto</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host</span>: <span style="color:#ae81ff">192.168.0.2</span>:<span style="color:#ae81ff">389</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;managerDN</span>: <span style="color:#ae81ff">uid=root,cn=users,dc=nas</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;managerPassword</span>: <span style="color:#75715e"><span></span>********<span></span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userSearchBase</span>: <span style="color:#ae81ff">cn=users,dc=nas</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loginAttribute</span>: <span style="color:#ae81ff">uid</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mailAttribute</span>: <span style="color:#ae81ff">mail</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>


   The fields are described as follows:

   <div>
   * `jwtSecret`: Secret used to sign user tokens. In a multi-cluster environment, all clusters must [use the same Secret](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-member-cluster). 
   * `authenticateRateLimiterMaxTries`: Maximum number of consecutive login failures allowed during a period specified by `authenticateRateLimiterDuration`. If the number of consecutive login failures of a user reaches the limit, the user will be blocked.
   * `authenticateRateLimiterDuration`: Period during which `authenticateRateLimiterMaxTries` applies.
   * `loginHistoryRetentionPeriod`: Retention period of login records. Outdated login records are automatically deleted.
   * `maximumClockSkew`: Maximum clock skew for time-sensitive operations such as token expiration validation. The default value is `10s`.
   * `multipleLogin`: Whether multiple users are allowed to log in from different locations. The default value is `true`.
   * `oauthOptions`: OAuth settings.
      * `accessTokenMaxAge`: Access token lifetime. For member clusters in a multi-cluster environment, the default value is `0h`, which means access tokens never expire. For other clusters, the default value is `2h`.
      * `accessTokenInactivityTimeout`: Access token inactivity timeout period. An access token becomes invalid after it is idle for a period specified by this field. After an access token times out, the user needs to obtain a new access token to regain access.
      * `identityProviders`: Identity providers.
         * `name`: Identity provider name.
         * `type`: Identity provider type.
         * `mappingMethod`: Account mapping method. The value can be `auto` or `lookup`.
         * If the value is `auto` (default), you need to specify a new username. Super Kubenetes automatically creates a user according to the username and maps the user to a third-party account.
         * If the value is `lookup`, you need to perform step 3 to manually map an existing Super Kubenetes user to a third-party account.
         * `provider`: Identity provider information. Fields in this section vary according to the identity provider type.
   </div>

3. If `mappingMethod` is set to `lookup`, run the following command and add the labels to map a Super Kubenetes user to a third-party account. Skip this step if `mappingMethod` is set to `auto`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit user &lt;Super Kubenetes username&gt;
               </p>
            </code>
         </div>
      </pre>
   </article>
   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">labels</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;iam.Super Kubenetes.io/identify-provider</span>: <span style="color:#ae81ff">&lt;Identity provider name&gt;</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;iam.Super Kubenetes.io/origin-uid</span>: <span style="color:#ae81ff">&lt;Third-party username&gt;</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>
   
4. After the fields are configured, save your changes, and wait until the restart of ks-installer is complete.

   <div className="notices note">
      <p>Note</p>
      <div>
         In a multi-cluster environment, you only need to configure the host cluster.
      </div>
   </div>



## Identity provider

You can configure multiple identity providers (IdPs) in the 'identityProviders' section. The identity provider authenticates the user and provides an identity token to Super Kubenetes.

Super Kubenetes provides the following types of identity providers by default:

* [LDAP Identity Provider](../use-an-ldap-service)

* [OIDC Identity Provider](../oidc-identity-provider)

* GitHub Identity Provider

* CAS Identity Provider

* Aliyun IDaaS Provider

You can also expand the Super Kubenetes [OAuth2 authentication plug-in](../use-an-oauth2-identity-provider) to integrate with your account system.
