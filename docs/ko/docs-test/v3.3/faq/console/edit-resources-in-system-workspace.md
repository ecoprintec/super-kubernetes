---
title: 콘솔에서 시스템 리소스 편집
keywords: 'system, resources, Super Kubenetes, Kubernetes'
description: 'Enable the editing function of system resources on the console.'
linkTitle: 'Edit System Resources on the Console'
Weight: 16520
---

Super Kubenetes를 설치하면 모든 Super Kubenetes 시스템 프로젝트와 쿠버네티스 시스템 프로젝트가 실행되는 워크스페이스 `system-워크스페이스`가 생성됩니다. 두 시스템에서 오작동을 방지하기 위해 콘솔에서 직접 워크스페이스의 리소스를 편집할 수 없습니다. 그러나 `kubectl`을 사용하여 리소스를 조정할 수 있습니다.

이 튜토리얼은 `system-워크스페이스` 리소스의 편집 기능을 활성화하는 방법을 시연합니다

<div className="notices warning">
  <p>Warning</p>
  <div>
    `system-워크스페이스`에서 리소스를 편집하면 Super Kubenetes 시스템 및 노드 오류와 같은 예기치 않은 결과가 발생할 수 있으며 비즈니스에 영향을 미칠 수 있습니다. 조작에 각별히 주의해 주십시오.
  </div>
</div>

## Edit the Console Configuration

1. `admin`으로 Super Kubenetes에 로그인합니다. 오른쪽 하단 모서리에서 <img src="/dist/assets/docs/v3.3/common-icons/hammer.png" height="25" width="25" alt="icon" />을 클릭하고 **Kubectl**를 선택하세요.

2. 다음 명령을 실행하세요:

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl -n Super Kubenetes-system edit cm ks-console-config
               </p>
            </code>
         </div>
      </pre>
   </article>

3. `client` 아래에 `systemWorkspace` 영역을 추가하고 파일을 저장합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;client</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes</span>: <span style="color:#ae81ff">v3.3.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubernetes</span>: <span style="color:#ae81ff">v1.22.10</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;openpitrix</span>: <span style="color:#ae81ff">v3.3.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableKubeConfig</span>: <span style="color:#66d9ef">true</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;systemWorkspace</span>: <span style="color:#e6db74">"$"</span><span style="color:#75715e">&nbsp;<span>&nbsp;#</span> Add this line manually.</span> 
              </p>
           </code>
        </div>
    </pre>
  </article>

4. 다음 명령을 실행하여 `ks-console`을 다시 배포하고, 파드가 다시 생성될 때까지 기다립니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                   kubectl -n Super Kubenetes-system rollout restart deployment ks-console
               </p>
            </code>
         </div>
     </pre>
   </article>

5. Super Kubenetes 콘솔을 새로고침 하면 `system-workspace`의 프로젝트에 편집 버튼이 나타납니다.

6. 콘솔에서 편집 기능을 비활성화하려면 위와 동일한 단계를 따라 `system-workspace` 영역을 삭제하세요.
