---
title: "OIDC 자격증명 공급자"
keywords: "OIDC, identity provider"
description: "How to use an external OIDC identity provider."
linkTitle: "OIDC Identity Provider"
weight: 12221
---

## OIDC 자격증명 공급자

[OpenID Connect](https://openid.net/connect/) OAuth 2.0 사양 제품군에 기반한 상호 운용 가능한 인증 프로토콜입니다. 이것은 "단순한 것은 단순하게 만들고, 복잡한 것은 가능하게 만든다"는 디자인 목표를 가지고, 간단한 REST/JSON 메시지 흐름을 사용합니다.  Keycloak, Okta, Dex, Auth0, Gluu, Casdoor 등과 같은 예전의 자격 프로토콜에 비해, 개발자가 통합하기가 매우 쉽습니다.

## 사전 준비

당신은 쿠버네티스 클러스터를 배포하고 그 클러스터에 Super Kubenetes를 설치해야 합니다. 자세한 내용은 [리눅스에 설치](/docs/v3.3/installing-on-linux/) and [쿠버네티스에 설치](/docs/v3.3/installing-on-kubernetes/)를 참조하십시오.

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

2. `spec.authentication.jwtSecret` 내부에 아래의 내용을 추가하십시오. 

   *[Google Identity Platform](https://developers.google.com/identity/protocols/oauth2/openid-connect)을 사용한 예시*:

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

   아래 파라미터에 대한 설명을 참조하십시오:

   <table>
   <thead>
   <tr>
      <th>
         파라미터
      </th>
      <th>
         설명
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         clientID
      </td>
      <td>
         OAuth2 클라이언트 ID.
      </td>
   </tr>
   <tr>
      <td>
         clientSecret
      </td>
      <td>
         The OAuth2 클라이언트 시크릿.
      </td>
   </tr>
   <tr>
      <td>
         redirectURL
      </td>
      <td>
         리디렉션된 URL은 다음 형식의 ks-console입니다: <code>https://&lt;Domain name&gt;/oauth/redirect/&lt;Provider name&gt;</code>. URL의 <code>&lt;Provider name&gt;</code>은 <code>oauthOptions:identityProviders:name</code>으로 지정된 값입니다..
      </td>
   </tr>
   <tr>
      <td>
         issuer
      </td>
      <td>
         클라이언트가 OpenID 공급자에 대한 정보를 동적으로 검색하는 방법을 정의합니다.
      </td>
   </tr>
   <tr>
      <td>
         preferredUsernameKey
      </td>
      <td>
         우선 사용자 이름 클레임을 포함하는, 구성 가능한 키입니다. 이 매개 변수는 선택 사항입니다.
      </td>
   </tr>
   <tr>
      <td>
         emailKey
      </td>
      <td>
         이메일 클레임을 포함하는, 구성 가능한 키입니다. 이 파라미터는 선택 사항입니다.
      </td>
   </tr>
   <tr>
      <td>
         getUserInfo
      </td>
      <td>
         GetUserInfo는 userinfo endpoint를 사용하여 토큰에 대한 추가 클레임을 가져옵니다. 이것은 업스트림이 "얇은" ID 토큰을 반환하는 경우에 특히 유용합니다. 이 파라미터는 선택 사항입니다.
      </td>
   </tr>
   <tr>
      <td>
         insecureSkipVerify
      </td>
      <td>
         TLS 인증서 확인을 해제하는 데 사용됩니다.
      </td>
   </tr>
   </tbody>
   </table>

