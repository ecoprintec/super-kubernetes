---
title: "외부 인증 설정"
keywords: "LDAP, external, third-party, authentication"
description: "How to set up external authentication on Super Kubenetes."
linkTitle: "Set Up External Authentication"
weight: 12210
---

이 문서에서는 Super Kubenetes의 LDAP 서비스 또는 Active Directory 서비스와 같은, 외부 자격증명 공급자를 사용하는 방법을 설명합니다.

Super Kubenetes는 내장 OAuth 서버를 제공합니다. 사용자는 Super Kubenetes API에 자신을 인증하기 위해 OAuth 액세스 토큰을 얻을 수 있습니다. Super Kubenetes 관리자는 CRD `ClusterConfiguration`의 `ks-installer`를 편집하여 OAuth를 구성하고 ID 공급자를 지정할 수 있습니다.

## 사전 준비

당신은 Kubernetes 클러스터를 배포하고 그 클러스터에 Super Kubenetes를 설치해야 합니다. 자세한 내용은 [리눅스에 설치](/docs/v3.3/installing-on-linux/) and [쿠버네티스에 설치](/docs/v3.3/installing-on-kubernetes/)를 참조하십시오.


## 절차

1. Super Kubenetes에 `admin`으로 로그인하고, 커서를 오른쪽 아래 모서리에 있는 <img src="/dist/assets/docs/v3.3/access-control-and-account-management/external-authentication/set-up-external-authentication/toolbox.png" width="20px" height="20px" alt="icon">으로 이동시켜서, **kubectl**를 클릭하고, CRD `ClusterConfiguration` 안의 `ks-installer`를 편집하기 위해 아래의 명령어를 실행하십시오 :

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n kubesphere-system edit cc ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

2. `spec.authentication.jwtSecret` 내부에 아래 영역을 추가하십시오. 

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


   해당 영역에 대한 설명은 다음과 같습니다:

   <div>
   * `jwtSecret`: 사용자 토큰에 서명하는 데 사용되는 시크릿입니다. 멀티 클러스터 환경에서 모든 클러스터는 [use the same Secret](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-member-cluster)을 사용해야 합니다. 
   * `authenticateRateLimiterMaxTries`: `authenticateRateLimiterDuration`으로 지정된 기간 동안 허용되는 최대 연속 로그인 실패 횟수입니다. 사용자의 연속 로그인 실패 횟수가 제한에 도달하면 사용자가 차단됩니다.
   * `authenticateRateLimiterDuration`: `authenticateRateLimiterMaxTries`가 적용되는 기간
   * `loginHistoryRetentionPeriod`: 로그인 기록의 보유기간. 오래된 로그인 기록은 자동으로 삭제됩니다.
   * `maximumClockSkew`: 토큰 만료 유효성 검사처럼 시간에 민감한 작업에 대한 최대 클럭 스큐. 기본값은`10초`입니다.
   * `multipleLogin`: 여러 사용자가 다른 위치에서 로그인할 수 있는지 여부. 기본값은 `true`입니다.
   * `oauthOptions`: OAuth 설정.
     * `accessTokenMaxAge`: 액세스 토큰 수명. 멀티 클러스터 환경의 멤버 클러스터의 경우, 기본값은 `0h`이며, 이는 액세스 토큰이 절대 만료되지 않음을 의미합니다. 다른 클러스터의 기본값은 `2h`입니다.
     * `accessTokenInactivityTimeout`: 액세스 토큰 비활성 시간 초과 기간. 이 영역에 지정된 기간 동안 액세스 토큰이 유휴(idle) 상태가 되면 해당 엑세스 토큰은 무효가 됩니다. 액세스 토큰 시간이 초과된 후 사용자가 다시 액세스하려면 새 액세스 토큰을 얻어야 합니다.
     * `identityProviders`: 자격증명 공급자.
       * `name`: 자격증명 공급자 이름.
       * `type`: 자격증명 공급자 유형.
       * `mappingMethod`: 계정 매핑 방법. 값은 `auto` 또는 `lookup`일 수 있습니다.
         * 만약 값이 `auto` (기본값)일 경우, 새 사용자 이름을 지정해야 합니다. Super Kubenetes는 사용자 이름에 따라 자동으로 사용자를 생성하고, 그 사용자를 서드파티 계정에 매핑합니다.
         * 만약 값이 `lookup`일 경우, 기존 Super Kubenetes 사용자를 서드파티 계정에 수동으로 매핑하려면 3단계를 수행해야 합니다.
       * `provider`: 자격증명 공급자 정보. 이 섹션의 내용은 자격증명 공급자 유형에 따라 다릅니다.
       </div>
   
3. 만약 `mappingMethod`가 `lookup`으로 설정된 경우, Super Kubenetes 사용자를 서드파티 계정에 매핑하기 위해 아래 명령어를 실행하고 레이블을 추가하십시오. `mappingMethod`가 `auto`로 설정된 경우엔 이 단계를 건너뜁니다.

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
                  <span style="color:#f92672">&nbsp;&nbsp;iam.kubesphere.io/identify-provider</span>: <span style="color:#ae81ff">&lt;Identity provider name&gt;</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;iam.kubesphere.io/origin-uid</span>: <span style="color:#ae81ff">&lt;Third-party username&gt;</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>
   
4. 필드가 구성되고 나면 변경 사항을 저장하고 ks-installer의 재시작이 완료될 때까지 기다립니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         멀티 클러스터 환경에서는 호스트 클러스터만 구성하면 됩니다.
      </div>
   </div>



## 자격증명 공급자

'identityProviders' 섹션에서 다중 자격증명 공급자(IdP)를 구성할 수 있습니다. 자격증명 공급자는 사용자를 인증하고 Super Kubenetes에 자격증명 토큰을 제공합니다.

Super Kubenetes는 기본적으로 다음 유형의 자격증명 공급자를 제공합니다.

* [LDAP 자격증명 공급자](../use-an-ldap-service)

* [OIDC 자격증명 공급자](../oidc-identity-provider)

* GitHub 자격증명 공급자

* CAS 자격증명 공급자

* Aliyun IDaaS 공급자

또한 Super Kubenetes [OAuth2 인증 플러그인](../use-an-oauth2-identity-provider)을 확장하여 계정 시스템과 통합할 수도 있습니다.