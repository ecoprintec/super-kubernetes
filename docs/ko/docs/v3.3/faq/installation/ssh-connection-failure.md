---
title: "SSH 연결 실패"
keywords: "Installation, SSH, Super Kubenetes, Kubernetes"
description: "Understand why the SSH connection may fail when you use KubeKey to create a cluster."
linkTitle: "SSH Connection Failure"
Weight: 16600
---

KubeKey를 사용하여 클러스터를 설정할 때, 필수 호스트 정보를 담고있는 설정 파일을 생성해야 합니다. 여기 `호스트` 영역의 예시가 있습니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               spec: 
                  hosts: 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: control plane, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password: Testing123<span style="color:#f92672">}</span> 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password: Testing123<span style="color:#f92672">}</span> 
                  <span>-</span> <span style="color:#f92672">&nbsp;{</span>name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password: Testing123<span style="color:#f92672">}</span>
            </p>
         </code>
      </div>
   </pre>
</article>

`./kk` 명령어로 클러스터를 만들기 전에,  SSH를 사용하여 태스크박스와 다른 인스턴스 간의 연결을 테스트하는 것이 좋습니다.

## 볼 수 있는 오류 메시지

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Failed to connect to xx.xxx.xx.xxx: could not establish connection to xx.xxx.xx.xxx:xx: ssh: handshake failed: ssh: unable to authenticate , attempted methods <span style="color:#f92672">[</span>none<span style="color:#f92672">]</span>, no supported methods remain node<span style="color:#f92672">=</span>xx.xxx.xx.xxx
            </p>
         </code>
      </div>
   </pre>
</article>

위와 같은 오류 메시지가 표시되면 다음을 확인하세요:

- 올바른 포트 번호를 사용해야 합니다. `22`번 포트가 SSH의 기본 포트이며, 만약 포트가 다르다면 IP 주소 뒤에 포트 번호를 추가해야 합니다. 예를 들면 다음과 같습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  hosts:
                  <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;{</span>name: control plane, address: 192.168.0.2, internalAddress: 192.168.0.2, port: 8022, user: ubuntu, password: Testing123<span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

- SSH 연결을 `/etc/ssh/sshd_config`에서 제한하지 않아야 합니다. 예를 들어 `PasswordAuthentication`은 `true`로 설정해야 합니다.

- 올바른 사용자 이름, 비밀번호 또는 키를 사용해야 합니다. 사용자는 sudo 권한이 있어야 함을 주의하세요.

- 방화벽 구성이 SSH 연결을 허용해야 합니다.
