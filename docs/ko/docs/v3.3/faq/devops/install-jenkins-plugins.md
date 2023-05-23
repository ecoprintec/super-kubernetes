---
title: "Super Kubenetes에서 Jenkins에 플러그인 설치"
keywords: "Super Kubenetes, Kubernetes, DevOps, Jenkins, Plugin"
description: "How to install plugins to Jenkins in Super Kubenetes"
linkTitle: "Install Plugins to Jenkins in Super Kubenetes"
Weight: 16810
---

Super Kubenetes DevOps System은 Jenkins를 기반으로 하는 컨테이너화된 CI/CD 기능을 제공합니다. Jenkins의 기능을 향상시키는 주된 수단은 플러그인을 설치하는 것입니다. 이 튜토리얼은 Jenkins 대시보드에 플러그인을 설치하는 방법을 시연합니다.

<div className="notices warning">
  <p>Warning</p>
  <div>
    모든 Jenkins 플러그인이 유지 관리를 잘 지원하는 것은 아닙니다. 일부 플러그인은 Jenkins에서 문제를 일으키거나 Super Kubenetes에서 심각한 문제를 일으킬 수 있습니다. 그러므로 플러그인을 설치하기 전에 백업을 해두고, 가능하면 다른 환경에서 테스트를 수행하는 것을 추천합니다.
  </div>
</div>





## 사전 준비

[Super Kubenetes DevOps 시스템](../../../pluggable-components/devops/)을 활성화해야 합니다.

## 플러그인 설치

### 1단계: Jenkins 주소 가져오기

1. 다음 명령을 실행하여 Jenkins의 주소를 가져옵니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export NODE_PORT<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.spec.ports[0].nodePort}"</span> services devops-jenkins<span style="color:#66d9ef">)</span> 
                  export NODE_IP<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes --namespace Super Kubenetes-devops-system -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">"{.items[0].status.addresses[0].address}"</span> <span style="color:#66d9ef">)</span> 
                  echo <a style="color:#ffffff; cursor:text;">http://$NODE_IP:$NODE_PORT</a>
               </p>
            </code>
         </div>
      </pre>
   </article>



2. 다음과 유사한 출력이 나올 것입니다. 자신의 Super Kubenetes 계정과 비밀번호 (예: `admin/P@88w0rd`)를 사용하여 주소를 통해 Jenkins 대시보드에 액세스할 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <a style="color:#ffffff; cursor:text;">http://192.168.0.4:30180</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Jenkins의 주소를 사용해야 하며 Super Kubenetes 클러스터가 배포되는 위치에 따라 Security Group에서 포트를 열고 관련 포트 포워딩 규칙을 설정해야 할 수도 있습니다.
    </div>
  </div>


### 2단계: Jenkins 대시보드에 플러그인 설치하기

1. Jenkins 대시보드에 로그인하고 **Jenkins 관리** 를 클릭합니다.

2. **Jenkins 관리** 페이지에서 아래로 스크롤하여 **플러그인 관리**를 클릭합니다.

3. **Available** 탭을 선택하면 검색 필드를 사용하여 필요한 플러그인을 검색할 수 있습니다. 예를 들어 검색 필드에 `git`를 입력하고 필요한 플러그인 옆에 있는 확인란을 선택하면 **재시작하지 않고 설치** 또는 **지금 다운로드 및 재시작 후 설치**를 선택할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      Jenkins 플러그인은 상호 의존적입니다. 플러그인을 설치할 때 종속된 플러그인을 설치해야 할 수도 있습니다.
    </div>
  </div>

4. 만약 미리 HPI 파일을 다운로드해 두었다면, **고급** 탭을 선택하고 HPI 파일을 업로드하여 플러그인으로 설치할 수도 있습니다.

5. **설치됨** 탭에서 설치된 모든 플러그인을 볼 수 있으며, 제거해도 안전한 플러그인은 오른쪽에 **제거** 버튼이 표시됩니다.

6. **업데이트** 탭에서, 플러그인의 체크박스를 체크한 후 **지금 다운로드 및 재시작 후 설치** 버튼을 클릭하여 플러그인의 업데이트를 설치할 수 있습니다. 또한 **지금 확인** 버튼을 클릭하여 업데이트를 확인할 수도 있습니다.

## 참고 항목

[플러그인 관리](https://www.jenkins.io/doc/book/managing/plugins/)