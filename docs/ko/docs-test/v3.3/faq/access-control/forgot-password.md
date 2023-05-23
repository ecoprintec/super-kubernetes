---
title: "계정 비밀번호 재설정"
keywords: "Forgot, Password, Super Kubenetes, Kubernetes"
description: "Reset the password of any account."
linkTitle: "Reset the Account Password"
Weight: 16410
---

## 일반 사용자의 비밀번호 재설정

1. 사용자 관리 권한이 있는 관리자로 Super Kubenetes 웹 콘솔에 로그인합니다.

2. 왼쪽 상단의 **플랫폼**을 클릭하고 **접근 제어**를 선택한 후 **사용자**를 클릭하세요.

3. **사용자** 페이지에서 비밀번호를 변경해야 하는 사용자를 클릭하여 세부 정보 페이지로 이동합니다.

4. 세부 정보 페이지에서 **더 보기**를 클릭한 다음 드롭다운 목록에서 **비밀번호 변경**을 선택하세요.

5. 표시된 대화 상자에서 새 비밀번호를 입력하고 비밀번호를 확인하고 완료 후 **확인**을 클릭하세요.

## 관리자 비밀번호 재설정

호스트 클러스터에서 다음 명령을 실행하여 계정의 비밀번호를 변경하세요.


<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl patch users &lt;USERNAME&gt; -p <span style="color:#e6db74">'{"spec":{"password":"&lt;YOURPASSWORD&gt;"}}'</span> --type<span style="color:#f92672">=</span><span style="color:#e6db74">'merge'</span> <span style="color:#f92672">&amp;&amp;</span> kubectl annotate users &lt;USERNAME&gt; iam.Super Kubenetes.io/password-encrypted-
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    명령을 실행하기 전에 꼭 `<USERNAME>` 및 `<YOURPASSWORD>`를 사용자 이름과 새 비밀번호로 바꾸세요.
  </div>
</div>

