---
title: "Use an LDAP Service"
keywords: "LDAP, identity provider, external, authentication"
description: "How to use an LDAP service."
linkTitle: "Use an LDAP Service"
weight: 12220
---

This document describes how to use an LDAP service as an external identity provider, which allows you to authenticate users against the LDAP service.

## Prerequisites

* You need to deploy a Kubernetes cluster and install Super Kubenetes in the cluster. For details, see [Installing on Linux](/docs/v3.3/installing-on-linux/) and [Installing on Kubernetes](/docs/v3.3/installing-on-kubernetes/).
* You need to obtain the manager distinguished name (DN) and manager password of an LDAP service.

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
   
2. Configure fields other than `oauthOptions:identityProviders` in the `spec:authentication` section. For details, see [Set Up External Authentication](../set-up-external-authentication/).

3. Configure fields in `oauthOptions:identityProviders` section.

   * `name`: User-defined LDAP service name.
   * `type`: To use an LDAP service as an identity provider, you must set the value to `LDAPIdentityProvider`.
   * `mappingMethod`: Account mapping method. The value can be `auto` or `lookup`.
     *  If the value is `auto` (default), you need to specify a new username. Super Kubenetes automatically creates a user according to the username and maps the user to an LDAP user.
     *  If the value is `lookup`, you need to perform step 4 to manually map an existing Super Kubenetes user to an LDAP user.
   * `provider`:
     * `host`: Address and port number of the LDAP service.
     * `managerDN`: DN used to bind to the LDAP directory.
     * `managerPassword`: Password corresponding to `managerDN`.
     * `userSearchBase`: User search base. Set the value to the DN of the directory level below which all LDAP users can be found.
     * `loginAttribute`: Attribute that identifies LDAP users.
     * `mailAttribute`: Attribute that identifies email addresses of LDAP users.
   
4. If `mappingMethod` is set to `lookup`, run the following command and add the labels to map a Super Kubenetes user to an LDAP user. Skip this step if `mappingMethod` is set to `auto`.

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
                  <span style="color:#f92672">&nbsp;&nbsp;iam.Super Kubenetes.io/identify-provider</span>: <span style="color:#ae81ff">&lt;LDAP service name&gt;</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;iam.Super Kubenetes.io/origin-uid</span>: <span style="color:#ae81ff">&lt;LDAP username&gt;</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

5. After the fields are configured, save your changes, and wait until the restart of ks-installer is complete.

  <div className="notices note">
    <p>Note</p>
    <div>
      The Super Kubenetes web console is unavailable during the restart of ks-installer. Please wait until the restart is complete.
    </div>
  </div>
   

   
6. If you are using Super Kubenetes 3.2.0, run the following command after configuring LDAP and wait until `ks-installer` is up and running:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system set image deployment/ks-apiserver *<span style="color:#f92672">=</span>Super Kubenetes/ks-apiserver:v3.2.1
               </p>
            </code>
         </div>
      </pre>
   </article>
   
  <div className="notices note">
    <p>Note</p>
    <div>
      If you are using Super Kubenetes 3.2.1, skip this step.
    </div>
  </div>

   
7. Go to the Super Kubenetes login page and enter the username and password of an LDAP user to log in.

  <div className="notices note">
    <p>Note</p>
    <div>
      The username of an LDAP user is the value of the attribute specified by `loginAttribute`.
    </div>
  </div>
