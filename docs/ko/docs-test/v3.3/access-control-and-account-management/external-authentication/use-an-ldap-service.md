---
title: "LDAP 서비스 사용"
keywords: "LDAP, identity provider, external, authentication"
description: "How to use an LDAP service."
linkTitle: "Use an LDAP Service"
weight: 12220
---

이 문서에서는 LDAP 서비스를 외부 자격증명 공급자로 사용하여 LDAP 서비스에 대해 사용자를 인증하는 방법에 대해 설명합니다.

## 사전 준비

* 당신은 Kubernetes 클러스터를 배포하고 그 클러스터에 Super Kubenetes를 설치해야 합니다. 자세한 내용은 [리눅스에 설치](/docs/v3.3/installing-on-linux/) and [쿠버네티스에 설치](/docs/v3.3/installing-on-kubernetes/)를 참조하십시오.
* LDAP 서비스의 관리자 고유 이름(DN)과 관리자 비밀번호를 얻어야 합니다.

## 절차

1. Super Kubenetes에 `admin`으로 로그인하고, 커서를 오른쪽 아래 모서리에 있는 <img src="/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/set-up-external-authentication/toolbox.png" width="20px" height="20px" alt="icon">으로 이동시켜서, **kubectl**를 클릭하고, CRD `ClusterConfiguration` 안의 `ks-installer`를 편집하기 위해 아래의 명령어를 실행하십시오 :

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
   

   예시:
   
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
   
2. `spec:authentication` 섹션에서 `oauthOptions:identityProviders` 이외의 영역을 구성합니다. 자세한 내용은 [외부 인증 설정](../set-up-external-authentication/)을 참조하십시오.

3. `oauthOptions:identityProviders` 섹션의 영역 구성하기.

   * `name`: 사용자가 정의한 LDAP 서비스 이름입니다.
   * `type`: LDAP 서비스를 자격증명 공급자로 사용하려면 값을 `LDAPIdentityProvider`로 설정해야 합니다.
   * `mappingMethod`: 계정 매핑 방법. 값은 `auto` 또는 `lookup`.
     *  만약 값이 `auto` (default), (기본값)일 경우, 새 사용자 이름을 지정해야 합니다. Super Kubenetes는 사용자 이름에 따라 자동으로 사용자를 생성하고, 그 사용자를 LDAP 사용자에 매핑합니다.
     *  만약 값이 `lookup`일 경우, 기존 Super Kubenetes 사용자를 LDAP 사용자에 수동으로 매핑하려면 4단계를 수행해야 합니다.
   * `provider`:
     * `host`: LDAP 서비스의 주소와 포트 번호.
     * `managerDN`: LDAP 디렉토리에 바인딩하는 데 사용되는 DN.
     * `managerPassword`: `managerDN`에 대응하는 비밀번호.
     * `userSearchBase`: 사용자 검색 기반. 모든 LDAP 사용자를 찾을 수 있는 디렉토리 레벨 아래의 DN으로 값을 설정하십시오.
     * `loginAttribute`: LDAP 사용자를 식별하는 속성.
     * `mailAttribute`: LDAP 사용자의 이메일 주소를 식별하는 속성.
   
4. 만약 `mappingMethod`가 `lookup`으로 설정된 경우, Super Kubenetes 사용자를 LDAP 사용자에 매핑하기 위해 아래 명령어를 실행하고 레이블을 추가하십시오. `mappingMethod`가 `auto`로 설정된 경우엔 이 단계를 건너뜁니다.

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

5. 필드가 구성되고 나면 변경 사항을 저장하고 ks-installer의 재시작이 완료될 때까지 기다립니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      ks-installer를 다시 시작하는 동안 Super Kubenetes 웹 콘솔을 사용할 수 없습니다. 재시작이 완료될 때까지 기다리십시오.
    </div>
  </div>
   

   
6. Super Kubenetes 3.2.0을 사용하는 경우 LDAP를 구성한 후 아래 명령을 실행하고 `ks-installer`가 실행될 때까지 기다립니다.

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
      Super Kubenetes 3.2.1을 사용하는 경우 이 단계를 건너뜁니다.
    </div>
  </div>

   
7. Super Kubenetes 로그인 페이지로 이동하여 로그인할 LDAP 사용자의 이름과 비밀번호를 입력합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      LDAP 사용자의 이름은 'loginAttribute'로 지정된 속성 값입니다.
    </div>
  </div>
