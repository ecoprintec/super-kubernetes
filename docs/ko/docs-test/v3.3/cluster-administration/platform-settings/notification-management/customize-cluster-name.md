---
title: "알림 메시지에서 클러스터 이름 사용자 지정"
keywords: 'Super Kubenetes, Kubernetes, Platform, Notification'
description: 'Learn how to customize cluster name in notification messages sent by Super Kubenetes.'
linkTitle: "Customize Cluster Name in Notification Messages"
weight: 8721
---

이 문서에서는 Super Kubenetes에서 보낸 알림 메시지에서 클러스터 이름을 사용자 지정하는 방법을 시연합니다.

## 사전 준비

예를 들어 `admin` 사용자와 같이 `platform-admin` 역할을 가진 사용자가 있어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 알림 메시지의 클러스터 이름 사용자 지정

1. Super Kubenetes 콘솔에 `admin`으로 로그인하세요.

2. 우측 하단에서 <img src="/dist/assets/docs/v3.3/common-icons/hammer.png" width="15" alt="icon" />를 클릭하고 **Kubectl**을 선택합니다. 

3. 표시된 대화 상자에서 다음 명령을 실행합니다:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl edit nm notification-manager
               </p>
            </code>
         </div>
      </pre>
   </article>

4. `.spec.receiver.options.global` 아래에 `cluster` 영역을를 추가하여 클러스터 이름을 사용자 지정합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;receivers</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;options</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;global</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cluster</span>: <span style="color:#ae81ff">&lt;Cluster name&gt;</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>
   
5. 완료되면 변경 사항을 저장합니다.


