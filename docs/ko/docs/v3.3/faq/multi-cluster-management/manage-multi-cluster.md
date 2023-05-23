---
title: "Super Kubenetes에서 멀티 클러스터 환경 관리"
keywords: 'Kubernetes, Super Kubenetes, federation, multicluster, hybrid-cloud'
description: 'Understand how to manage a multi-cluster environment on Super Kubenetes.'
linkTitle: "Manage a Multi-cluster Environment on Super Kubenetes"
weight: 16710
---

Super Kubenetes는 사용하기 쉬운 멀티 클러스터 기능을 제공하여 Super Kubenetes에서 멀티 클러스터 환경을 구축할 수 있도록 지원합니다.
이 가이드는 Super Kubenetes에서 멀티 클러스터 환경을 관리하는 방법을 시연합니다.

## 사전 준비

- Kubernetes 클러스터를 호스트 클러스터 및 멤버 클러스터로 사용하기 전에 Kubernetes 클러스터가 Super Kubenetes와 함께 설치되었는지 확인하십시오.

- 클러스터 역할이 호스트 클러스터와 멤버 클러스터에 각각 올바르게 설정되어 있고 `jwtSecret`이 동일한지 확인하십시오.

- 멤버 클러스터는 호스트 클러스터로 가져오기 전에 리소스가 생성되지 않은 깨끗한 환경에 있는 것이 좋습니다.


## Super Kubenetes 멀티 클러스터 환경 관리

Super Kubenetes에서 멀티 클러스터 환경을 구축하면 호스트 클러스터에서 중앙 컨트롤 플레인을 통해 이를 관리할 수 있습니다. 리소스를 생성할 때 특정 클러스터를 선택할 수 있으며 과부하가 발생할 경우 호스트 클러스터를 피해야 합니다. 일부 리소스 (예: 워크스페이스)는 관리를 위해 호스트 클러스터와 동기화되지 않으므로 멤버 클러스터의 Super Kubenetes 웹 콘솔에 로그인하여 리소스를 생성하지 않는 것이 좋습니다.

### 자원 관리

호스트 클러스터를 멤버 클러스터로 변경하거나 그 반대로 변경하지 않는 것이 좋습니다. 멤버 클러스터를 이전에 호스트 클러스터로 가져온 적이 있는 경우 이전 호스트 클러스터에서 바인딩을 해제한 후 새 호스트 클러스터로 가져올 때 동일한 클러스터 이름을 사용해야 합니다.

기존 프로젝트를 유지하면서 멤버 클러스터를 새 호스트 클러스터로 가져오려면 다음 단계를 따르십시오.

1. 멤버 클러스터에서 다음 명령을 실행하여 워크스페이스에서 유지할 프로젝트의 바인딩을 해제하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl label ns &lt;namespace&gt; Super Kubenetes.io/workspace- <span style="color:#f92672">&amp;&amp;</span> kubectl patch ns &lt;namespace&gt;   -p <span style="color:#e6db74">'{"metadata":{"ownerReferences":[]}}'</span> --type<span style="color:#f92672">=</span>merge
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 멤버 클러스터에서 다음 명령을 실행하여 워크스페이스를 지웁니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete workspacetemplate &lt;workspace name&gt;
               </p>
            </code>
         </div>
      </pre>
   </article>

3. 새 호스트 클러스터에서 워크스페이스를 만들고 멤버 클러스터를 이 워크스페이스에 할당할 때, 멤버 클러스터에서 다음 명령을 실행하여 보존된 프로젝트를 워크스페이스에 바인딩합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kuebctl label ns &lt;namespace&gt; Super Kubenetes.io/workspace<span style="color:#f92672">=</span>&lt;workspace name&gt;
               </p>
            </code>
         </div>
      </pre>
   </article>

### 사용자 관리

호스트 클러스터에서 중앙 컨트롤 플레인을 통해 생성한 사용자는 멤버 클러스터에 동기화됩니다.

다른 사용자가 다른 클러스터에 접속할 수 있도록 하려면 워크스페이스를 만들고 [다른 클러스터를 할당](../../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/)할 수 있습니다. 그런 다음 이러한 사용자의 액세스 요구 사항에 따라 이러한 워크스페이스에 다른 사용자를 초대할 수 있습니다.

### Super Kubenetes 컴포넌트 관리

Super Kubenetes는 필요에 따라 활성화할 수 있는 몇 가지 플러그형 컴포넌트를 제공합니다. 멀티 클러스터 환경에서는 호스트 클러스터 또는 멤버 클러스터에서 이러한 컴포넌트를 활성화하도록 선택할 수 있습니다

### Super Kubenetes 컴포넌트 관리

Super Kubenetes는 필요에 따라 활성화할 수 있는 몇 가지 플러그형 컴포넌트를 제공합니다. 멀티 클러스터 환경에서는 호스트 클러스터 또는 멤버 클러스터에서 이러한 컴포넌트를 활성화하도록 선택할 수 있습니다.

예를 들어, 호스트 클러스터에서 앱 스토어를 활성화하기만 하면 멤버 클러스터에서 앱 스토어와 관련된 기능을 직접 사용할 수 있습니다. 다른 컴포넌트의 경우, 호스트 클러스터에서 해당 컴포넌트를 사용하도록 설정하는 경우에도, 멤버 클러스터에서 동일한 컴포넌트를 수동으로 사용하도록 설정해야만 동일한 기능을 구현할 수 있습니다. 또한 멤버 클러스터에서만 컴포넌트를 활성화하여 해당 기능을 멤버 클러스터에서만 구현할 수도 있습니다.

플러그형 컴포넌트를 활성화하는 방법에 대한 자세한 내용은 [플러그형 컴포넌트 활성화](../../../pluggable-components/overview)를 참조하십시오.

