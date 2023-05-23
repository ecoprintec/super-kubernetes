---
title: '네트워크 정책'
keywords: 'Kubernetes, Super Kubenetes, NetworkPolicy'
description: 'Learn how to enable Network Policies to control traffic flow at the IP address or port level.'
linkTitle: 'Network Policies'
weight: 6900
---

v3.0.0부터 사용자는 Super Kubenetes에서 순정 쿠버네티스의 네트워크 정책을 설정할 수 있습니다. 네트워크 정책은 애플리케이션 중심 구조로, 파드가 네트워크를 통해 다양한 네트워크 엔티티와 통신할 수 있는 방법을 지정할 수 있습니다. 네트워크 정책을 통해 사용자는 동일한 클러스터 내에서 네트워크 격리를 달성할 수 있습니다. 이는 특정 인스턴스(파드) 간에 방화벽을 설정할 수 있음을 의미합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 기능을 활성화하기 전에, 클러스터에서 사용하는 CNI 네트워크 플러그인이 네트워크 정책을 지원하는지 확인하십시오. Calico, Cilium, Kube-router, Romana 및 Weave Net을 포함해, 네트워크 정책을 지원하는 수많은 CNI 네트워크 플러그인이 존재합니다.
      - 네트워크 정책을 활성화하기 전에, [Calico](https://www.projectcalico.org/)를 CNI 플러그인으로 사용할 것을 권장합니다.</div></div>

자세한 내용은 [네트워크 정책](https://kubernetes.io/docs/concepts/services-networking/network-policies/)을 참조하십시오.

## 설치하기 전에 네트워크 정책 활성화

### 리눅스에 설치하기

Linux에 Super Kubenetes의 멀티 노드를 설치할 때, 모든 Super Kubenetes 컴포넌트를 열거하는 설정 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서, 기본 파일인 `config-sample.yaml`을 생성합니다. 그리고 다음 명령을 실행하여 파일을 수정하세요:

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
   								vi config-sample.yaml
              </p>
           </code>
        </div>
     </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 네트워크 정책을  활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션](#enable-network-policy-after-installation)을 참조하여 설치 후 네트워크 정책을  활성화하는 방법을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `network.networkpolicy`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료 후 파일을 저장하세요.

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                 <span style="color:#f92672">network</span>:
                   <span style="color:#f92672">networkpolicy</span>:
                     <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "false" to "true".</span>
              </p>
           </code>
        </div>
     </pre>
   </article>

3. 설정 파일을 사용하여 클러스터를 생성하세요:

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                 ./kk create cluster -f config-sample.yaml
              </p>
           </code>
        </div>
     </pre>
   </article>

### 쿠버네티스에 설치

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 네트워크 정책을 활성화할 수 있습니다.

1.  [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 수정하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi cluster-configuration.yaml
               </p>
            </code>
         </div>
      </pre>
    </article>

2.  이 로컬 `cluster-configuration.yaml` 파일에서 `network.networkpolicy`로 이동하고 `enabled`에 대해 `false`를 `true`로 변경하여 이를 활성화하세요. 완료 후 파일을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                    <span style="color:#f92672">networkpolicy</span>:
                      <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "false" to "true".</span>
               </p>
            </code>
         </div>
      </pre>
    </article>

3.  다음 명령을 실행하여 설치를 시작하세요:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                  kubectl apply -f cluster-configuration.yaml</p>
            </code>
         </div>

      </pre>
    </article>

## Enable the Network Policy After Installation

1. 콘솔에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다. 
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `network.networkpolicy`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                 <span style="color:#f92672">network</span>:
                   <span style="color:#f92672">networkpolicy</span>:
                     <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "false" to "true".</span>
              </p>
           </code>
        </div>
     </pre>
   </article>

5. web kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
           <code>
              <p>
                 kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f
              </p>
           </code>
        </div>
     </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      웹 kubectl 도구는 콘솔의 좌측 하단의 모서리의 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-app-store/hammer.png" height="20px">를 클릭하여 찾을 수 있습니다. 
    </div>
  </div>

## 컴포넌트 설치 확인

**Network**에서 **Network Policies** 모듈이 보인다면, 컴포넌트를 설치하기 전까지는 이 부분이 표시되지 않으므로, 설치가 성공한 것입니다.
