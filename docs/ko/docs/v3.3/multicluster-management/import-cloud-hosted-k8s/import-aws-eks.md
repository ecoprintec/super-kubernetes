---
title: "AWS EKS 클러스터 가져오기"
keywords: 'Kubernetes, Super Kubenetes, multicluster, Amazon EKS'
description: 'Learn how to import an Amazon Elastic Kubernetes Service cluster.'
titleLink: "Import an AWS EKS Cluster"
weight: 5320
---

이 튜토리얼에서는 [직접 연결](../../../multicluster-management/enable-multicluster/direct-connection/) 방식을 통해 AWS EKS 클러스터를 가져오는 방법을 시연합니다. 에이전트 연결 방식을 사용하려면 [에이전트 연결](../../../multicluster-management/enable-multicluster/agent-connection/)을 참조하십시오.

## 사전 준비

- Super Kubenetes가 설치된 쿠버네티스 클러스터가 있고, 이 클러스터를 호스트 클러스터로 준비하세요. 호스트 클러스터 준비 방법에 대한 자세한 내용은 [호스트 클러스터 준비](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-host-cluster)를 참조하십시오. .
- 멤버 클러스터로 사용할 EKS 클러스터가 있어야 합니다.

## EKS 클러스터 가져오기

### 1단계: EKS 클러스터에 Super Kubenetes 배포

먼저 EKS 클러스터에 Super Kubenetes를 배포해야 합니다. EKS에 Super Kubenetes를 배포하는 방법에 대한 자세한 내용은 [AWS EKS에 Super Kubenetes 배포](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-eks/#install-Super Kubenetes-on-eks)를 참조하십시오.

### 2단계: EKS 멤버 클러스터 준비

1. **호스트 클러스터**에서 멤버 클러스터를 관리하기 위해서는 `jwtSecret`을 서로 동일하게 설정해야 합니다. 그러므로 우선 이것을 가져오기 위해 **호스트 클러스터**에서 다음 명령을 실행하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
        </div>
    </pre>
  </article>

   출력은 다음과 비슷할 것입니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code><span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"QVguGh7qnURywHn2od9IiOX6X8f8wK8g"</span></code>
        </div>
    </pre>
  </article>

2. EKS 클러스터의 Super Kubenetes 콘솔에 `admin`으로 로그인합니다. 좌측 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요.

3. **CRDs**로 이동하여, 검색 창에 `ClusterConfiguration`을 입력한 다음, 키보드의 **Enter**를 누릅니다. **ClusterConfiguration**을 클릭하여 세부 정보 페이지로 이동하세요.

4. 오른쪽의 <img src="/images/docs/v3.3/multicluster-management/import-cloud-hosted-k8s/import-eks/three-dots.png" height="20px" v>를 클릭한 다음, **YAML 편집**을 선택하여 `ks-installer`를 편집하세요.

5. `ks-installer`의 YAML 파일에서 `jwtSecret`의 값을 위에 표시된 해당 값으로 변경하고 `clusterRole`의 값을 `member`로 설정하세요. **업데이트**를 클릭하여 변경 사항을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">authentication</span>:
              <span style="color:#f92672">jwtSecret</span>: <span style="color:#ae81ff">"QVguGh7qnURywHn2od9IiOX6X8f8wK8g"</span>
          </code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">multicluster</span>:
              <span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">"member"</span>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      자신 고유의 `jwtSecret` 값을 사용하세요. 변경 사항이 적용되려면 잠시 기다려야 합니다.
    </div>
  </div>

### 3단계: 새로운 kubeconfig 파일 생성

1. [Amazon EKS](https://docs.aws.amazon.com/eks/index.html)는 표준 kubeadm 클러스터와 달리 내장된 kubeconfig 파일을 제공하지 않습니다. 그렇지만 이 [문서](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html)를 참조하여 kubeconfig 파일을 생성할 수 있습니다. 생성되는 kubeconfig 파일은 다음과 같습니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
          <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
          <span style="color:#f92672">clusters</span>:
          <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
              <span style="color:#f92672">server</span>: <span style="color:#ae81ff">&lt;endpoint-url&gt;</span> 
              <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">&lt;base64-encoded-ca-cert&gt;</span> 
            <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kubernetes</span> 
          <span style="color:#f92672">contexts</span>:
          <span>-</span><span style="color:#f92672">&nbsp;context</span>:
              <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">kubernetes</span> 
              <span style="color:#f92672">user</span>: <span style="color:#ae81ff">aws</span> 
            <span style="color:#f92672">name</span>: <span style="color:#ae81ff">aws</span> 
          <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">aws</span> 
          <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
          <span style="color:#f92672">preferences</span>: {}
          <span style="color:#f92672">users</span>:
          <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">aws</span> 
            <span style="color:#f92672">user</span>:
              <span style="color:#f92672">exec</span>:
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">client.authentication.k8s.io/v1alpha1</span> 
                <span style="color:#f92672">command</span>: <span style="color:#ae81ff">aws</span> 
                <span style="color:#f92672">args</span>:
                  <span>-</span><span style="color:#e6db74">&nbsp;"eks"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"get-token"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"--cluster-name"</span> 
                  <span>-</span><span style="color:#e6db74">&nbsp;"&lt;cluster-name&gt;"</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;"--role"</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;"&lt;role-arn&gt;"</span> 
                <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;env:</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;-</span><span style="color:#75715e">&nbsp;name: AWS_PROFILE</span> 
                  <span style="color:#75715e">#</span><span style="color:#75715e">&nbsp;value: "&lt;aws-profile&gt;"</span>
          </code>
        </div>
    </pre>
  </article>

   하지만 이 자동으로 생성된 kubeconfig 파일을 사용하려면 이 kubeconfig를 사용하고자 하는 모든 컴퓨터에 `aws`(aws CLI 도구) 명령을 설치해야 합니다.

2. 로컬 컴퓨터에서 다음 명령을 실행하여 Super Kubenetes에서 생성한 ServiceAccount `Super Kubenetes`의 토큰을 가져옵니다. 이것은 클러스터에 대한 클러스터 관리자 접속 권한을 가지고 있으며 새로운 kubeconfig 토큰으로 사용될 것입니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              TOKEN<span style="color:#f92672">=</span>kubectl -n Super Kubenetes-system get secret <span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-system get sa Super Kubenetes -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d<span style="color:#66d9ef">)</span> 
              kubectl config set-credentials Super Kubenetes --token<span style="color:#f92672">=</span>${TOKEN}
              kubectl config set-context --current --user<span style="color:#f92672">=</span>Super Kubenetes</p>
          </code>
        </div>
    </pre>
  </article>

3. 다음 명령을 실행하여 새 kubeconfig 파일을 가져오세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>cat ~/.kube/config</code>
        </div>
    </pre>
  </article>

   출력은 아래와 비슷할 것이며, 새로운 사용자 `Super Kubenetes`가 삽입되어 current-context사용자로 설정된 것을 확인할 수 있습니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
            <span style="color:#f92672">clusters</span>:
            <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
                <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZ...S0tLQo=</span> 
                <span style="color:#f92672">server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://*.sk1.cn-north-1.eks.amazonaws.com.cn</a></span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">contexts</span>:
            <span>-</span><span style="color:#f92672">&nbsp;context</span>:
                <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
                <span style="color:#f92672">user</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
            <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
            <span style="color:#f92672">preferences</span>: {}
            <span style="color:#f92672">users</span>:
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">arn:aws-cn:eks:cn-north-1:660450875567:cluster/EKS-LUSLVMT6</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">exec</span>:
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">client.authentication.k8s.io/v1alpha1</span> 
                  <span style="color:#f92672">args</span>:
                  <span>-</span><span style="color:#f92672">&nbsp;--<span style="color:#ae81ff">region</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">cn-north-1</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">eks</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">get-token</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;--<span style="color:#ae81ff">cluster-name</span> 
                  <span>-</span><span style="color:#f92672">&nbsp;<span style="color:#ae81ff">EKS-LUSLVMT6</span> 
                  <span style="color:#f92672">command</span>: <span style="color:#ae81ff">aws</span> 
                  <span style="color:#f92672">env</span>: <span style="color:#66d9ef">null</span> 
              <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">token</span>: <span style="color:#ae81ff">eyJhbGciOiJSUzI1NiIsImtpZCI6ImlCRHF4SlE5a0JFNDlSM2xKWnY1Vkt5NTJrcDNqRS1Ta25IYkg1akhNRmsifQ.eyJpc3M................9KQtFULW544G-FBwURd6ArjgQ3Ay6NHYWZe3gWCHLmag9gF-hnzxequ7oN0LiJrA-al1qGeQv-8eiOFqX3RPCQgbybmix8qw5U6f-Rwvb47-xA</span>
          </code>
        </div>
    </pre>
  </article>

   다음 명령을 실행하여 새 kubeconfig가 EKS 클러스터에 대한 접속 권한을 가지고 있는지 확인할 수 있습니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get nodes</code>
        </div>
    </pre>
  </article>

   출력은 다음과 비슷할 것입니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              NAME                                        STATUS   ROLES    AGE   VERSION
              ip-10-0-47-38.cn-north-1.compute.internal   Ready    &lt;none&gt;   11h   v1.18.8-eks-7c9bda
              ip-10-0-8-148.cn-north-1.compute.internal   Ready    &lt;none&gt;   78m   v1.18.8-eks-7c9bda            
            </p>
          </code>
        </div>
    </pre>
  </article>

### 4단계: EKS 멤버 클러스터 가져오기

1. 호스트 클러스터의 Super Kubenetes 콘솔에 `admin`으로 로그인하세요. 좌측 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요. **클러스터 관리** 페이지에서 **클러스터 추가**를 클릭하세요.

2. 필요에 따라 기본 정보를 입력하고 **다음**을 클릭하세요.

3. **연결 방법**에서 **직접 연결**을 선택하세요. EKS 멤버 클러스터의 새 kubeconfig 파일을 입력한 다음 **생성**을 클릭하세요.

4. 클러스터 초기화가 완료될 때까지 기다리세요.
