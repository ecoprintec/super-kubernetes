---
title: 플러그식 구성 요소 활성화
keywords: 'Super Kubenetes, Kubernetes, pluggable, components'
description: 'Install pluggable components of Super Kubenetes so that you can explore the container platform in an all-around way. Pluggable components can be enabled both before and after the installation.'
linkTitle: 'Enable Pluggable Components'
weight: 2600
---

이 튜토리얼은 설치 전후에 Super Kubenetes의 플러그식 구성 요소를 활성화하는 방법을 보여줍니다. Super Kubenetes의 모든 플러그식 구성 요소는 아래 표를 참조하십시오.

| 설정             | 구성 요소                                  | 설명                                                                                                                                                                        |
| ---------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alerting`       | Super Kubenetes 경고 시스템              | 워크로드 및 노드에 대한 알림 정책을 사용자 지정할 수 있습니다. 알림 정책이 트리거된 후 알림 메시지는 다양한 채널(예: 이메일 및 Slack)을 통해 수신자에게 전송될 수 있습니다. |
| `auditing`       | Super Kubenetes 감사 로그 시스템         | 다양한 테넌트가 시작한 플랫폼에서 발생하는 일련의 활동을 기록하는 보안 관련 시간순 기록 세트를 제공합니다.                                                                  |
| `devops`         | Super Kubenetes DevOps 시스템            | Jenkins를 기반으로 하는 즉시 사용 가능한 CI/CD 시스템과 Source-to-Image 및 Binary-to-Image를 포함한 자동화된 워크플로 도구를 제공합니다.                                    |
| `events`         | Super Kubenetes 이벤트 시스템            | 다중 테넌트 Kubernetes 클러스터에서 Kubernetes 이벤트 내보내기, 필터링 및 경고를 위한 그래픽 웹 콘솔을 제공합니다.                                                          |
| `logging`        | Super Kubenetes 로깅 시스템              | 통합 콘솔에서 로그 쿼리, 수집 및 관리를 위한 유연한 로깅 기능을 제공합니다. Elasticsearch, Kafka 및 Fluentd와 같은 추가 로그 수집기를 추가할 수 있습니다.                   |
| `metrics_server` | HPA                                        | Horizontal Pod Autoscaler는 필요에 따라 Pod 수를 자동으로 조정합니다.                                                                                                       |
| `networkpolicy`  | 네트워크 정책                              | 동일한 클러스터 내에서 네트워크 격리를 허용합니다. 즉, 특정 인스턴스(Pod) 간에 방화벽을 설정할 수 있습니다.                                                                 |
| `kubeedge`       | Kube Edge                                  | 클러스터에 Edge 노드를 추가하고 워크로드를 실행합니다.                                                                                                                      |
| `openpitrix`     | Super Kubenetes 앱 스토어                | Helm 기반 애플리케이션을 위한 앱 스토어를 제공하고 사용자가 전체 수명 주기 동안 앱을 관리할 수 있도록 합니다.                                                               |
| `servicemesh`    | Super Kubenetes 서비스 메시 (Istio 기반) | 세분화된 트래픽 관리, 관찰 가능성 및 추적, 시각화된 트래픽 topology를 제공합니다.                                                                                           |
| `ippool`         | Pod IP Pool                                | Pod IP Pool을 생성하고 Pool의 IP 주소를 Pod에 할당합니다.                                                                                                                   |
| `topology`       | 서비스 Topology                            | [Weave Scope](https://www.weave.works/oss/scope/)를 통합하여 앱과 컨테이너의 서비스 간 통신(topology)을 봅니다.                                                             |

각 구성 요소에 대한 자세한 내용은 [플러그식 구성 요소 활성화 - 개요](../../pluggable-components/overview/)를 참고하십시오.

<div className="notices note">
   <p>노트</p>
   <div>
   - `멀티 클러스터`는 이 튜토리얼에서 다루지 않습니다. 이 기능을 사용하려면 `clusterRole`에 해당 값을 설정해야 합니다. 자세한 내용은 [멀티 클러스터 관리](../../multicluster-management/introduction/overview/)를 참고하세요.
   - 설치하기 전에 컴퓨터가 하드웨어 요구 사항을 충족하는지 확인하십시오. 플러그식 모든 구성 요소를 활성화하려는 경우 권장 사항은 다음과 같습니다 : CPU ≥ 8 Cores, Memory ≥ 16 G, Disk Space ≥ 100 G.
   </div>
</div>

## 설치 전 플러그식 구성 요소 활성화

대부분의 플러그식 구성 요소의 경우 아래 단계에 따라 활성화할 수 있습니다. [KubeEdge](../../pluggable-components/kubeedge/), [Pod IP Pools](../../pluggable-components/pod-ip-pools/) 및 [Service Topology](../../pluggable-components/service-topology/)를 활성화해야 할 경우 해당 자습서를 참조하십시오.

### Linux에 설치

Linux에서 Super Kubenetes의 다중 노드 설치를 구현하는 경우 모든 Super Kubenetes 구성 요소를 나열하는 구성 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서 기본 파일인 `config-sample.yaml`을 생성한 후, 다음 명령을 실행하여 파일 수정합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vi config-sample.yaml</code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>노트</p>
    <div>
      [Linux에 올인원 설치](../../quick-start/all-in-one-on-linux/)를 선택하면 `config-sample.yaml` 파일을 다음과 같이 생성할 필요가 없습니다. 클러스터를 직접 생성할 수 있습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 연결 가능한 구성 요소를 활성화하려면(예: 테스트 목적으로) [following section](#enable-pluggable-components-after-installation)을 참조하여 설치 후 연결 가능한 구성 요소를 설치하는 방법을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `enabled`에 대해 `false`를 `true`로 변경하여 설치하려는 플러그식 구성요소를 활성화하십시오. 다음은 참조용 [예시 파일]()입니다. --> 완료 후에는 파일을 저장합니다.

3. 구성 파일을 사용하여 클러스터를 만듭니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create cluster -f config-sample.yaml</code>
         </div>
      </pre>
   </article>

### 쿠버네티스에 설치

쿠버네티스에 Super Kubenetes를 설치할 때 아래와 같이 두 개의 YAML 파일을 적용하여 [ks-installer]()를 사용해야 합니다.

1. 먼저 [cluster-configuration.yaml]()파일을 다운로드하여 수정합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vi cluster-configuration.yaml</code>
         </div>
      </pre>
   </article>

2. 설치하려는 플러그형 구성 요소를 활성화하려면 이 파일의 구성 요소 아래에서 `enabled`을 `false`에서 '`true`로 변경합니다.

3. 이 로컬 파일을 저장하고 다음 명령을 실행하여 설치를 시작합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>
            
              kubectl apply -f cluster-configuration.yaml</code>
         </div>
      </pre>
   </article>

Super Kubenetes를 Linux 또는 쿠버네티스, 어떤 곳에 설치하더라도 Super Kubenetes의 웹 콘솔에서 활성화한 구성 요소의 상태를 확인할 수 있습니다. **시스템 구성 요소**로 이동하면 구성 요소 상태를 볼 수 있습니다.

## 설치 후 플러그식 구성 요소 활성화

Super Kubenetes 웹 콘솔은 사용자가 다양한 리소스를 보고 작업할 수 있는 편리한 방법을 제공합니다. 설치 후 플러그형 구성 요소를 활성화하려면 콘솔에서 직접 몇 가지 조정만 하면 됩니다. 쿠버네티스 명령줄 도구인 kubectl에 익숙한 사용자는 도구가 콘솔에 통합되어 있으므로 Super Kubenetes를 사용하는 데 어려움이 없을 것입니다.

<div className="notices note">
  <p>노트</p>
  <div>
    [KubeEdge](../../pluggable-components/kubeedge/), [Pod IP Pools](../../pluggable-components/pod-ip-pools/) 및 [Service Topology](../../pluggable-components/service-topology/)를 활성화해야 하는 경우 해당 자습서를 참조하십시오.
  </div>
</div>

1. 콘솔에 `admin`으로 로그인합니다. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력하고, 결과를 클릭하여 세부 정보 페이지를 봅니다.

  <div className="notices info">
    <p>정보</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 개체와 마찬가지로 이러한 리소스를 사용할 수 있습니다.    
    </div>
  </div>

3. **맞춤형 리소스**에서 `ks-installer` 오른쪽에 있는 세 개의 점을 클릭하고 **YAML 수정**을 선택합니다.

4. 이 YAML 파일에서 `enabled`을 `false`에서 `true`로 변경하여 설치하려는 플러그식 구성 요소를 활성화하십시오. 완료한 후 **확인**을 클릭하여 구성을 저장합니다.

5. 웹 kubectl을 사용하여 다음 명령을 실행하면 설치 프로세스를 확인할 수 있습니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

   <div className="notices tip">
     <p>팁</p>
     <div>
       콘솔의 오른쪽 하단 모서리에 있는 망치 아이콘을 클릭하여 웹 kubectl 도구를 찾을 수 있습니다.
     </div>
   </div>

6. 구성 요소가 성공적으로 설치된 경우 출력에 아래와 같은 메시지가 표시됩니다.

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
               <p>
                 <span style="color:#75715e">###########################################################</span> 
                 <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
                 <span style="color:#75715e">###########################################################</span> 
                 <span></span> 
                 <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.2:30880<span></span></span> 
                 <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                 <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                 <span></span> 
                 <span style="color:#ae81ff">NOTES：</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After you log into the console, please check the</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please change the default password after login.</span> 
                 <span></span> 
                 <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                 <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                 <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
               </p>
           </code>
         </div>
     </pre>
   </article>

7. **시스템 구성 요소**에서 다양한 구성 요소의 상태를 볼 수 있습니다.

   <div className="notices tip">
     <p>팁</p>
     <div>
       위 이미지에 관련 구성 요소가 표시되지 않으면 일부 Pod가 아직 준비되지 않은 것일 수 있습니다. kubectl을 통해 `kubectl get pod --all-namespaces`를 실행하여 Pod의 상태를 볼 수 있습니다.
     </div>
   </div>
