---
title: AKS에 Super Kubenetes 배포
keywords: 'Super Kubenetes, Kubernetes, Installation, Azure, AKS'
description: 'Learn how to deploy Super Kubenetes on Azure Kubernetes Service.'
weight: 4210
---

이 가이드는 [Azure 쿠버네티스 서비스](https://docs.microsoft.com/en-us/azure/aks/)에 Super Kubenetes를 배포하는 단계를 안내합니다.

## AKS 클러스터 준비

Azure는 리소스 배포 자동화 옵션을 제공하여 코드로서의 인프라를 구현하는 데 도움을 줄 수 있습니다. 일반적으로 채택되는 도구에는 [ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) 및 [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/what-is-azure-cli?view=azure-cli-latest)가 있습니다. 이 가이드에서는 Azure CLI를 사용하여 Super Kubenetes 설치에 필요한 모든 리소스를 생성합니다.

### Azure Cloud Shell 사용

Azure는 웹 기반 터미널을 제공하므로 컴퓨터에 Azure CLI를 설치할 필요가 없습니다. Azure Portal의 오른쪽 위 모서리에 있는 메뉴 바에서 Cloud Shell 버튼을 클릭합니다.

![Cloud Shell](/dist/assets/docs/v3.3/aks/aks-launch-icon.png)

**Bash** Shell을 선택합니다.

![Bash Shell](/dist/assets/docs/v3.3/aks/aks-choices-bash.png)

### 리소스 그룹 생성

Azure 리소스 그룹은 Azure 리소스가 배포 및 관리되는 논리적 그룹입니다. 다음 예에서는 `westus` 위치에 `KuberixRG`라는 리소스 그룹을 생성합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az group create --name Super KubenetesRG --location westus</code>
      </div>
  </pre>
</article>

### AKS 클러스터 생성

`az aks create` 명령을 사용하여 AKS 클러스터를 만듭니다. 다음 예에서는 3개의 노드가 있는 `KuberixCluster`라는 클러스터를 생성합니다. 완료하는 데 몇 분 정도 걸립니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az aks create --resource-group Super KubenetesRG --name KuberixCluster --node-count <span style="color:#ae81ff">3</span> --enable-addons monitoring --generate-ssh-keys</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>노트</p>
  <div>
    `--node-vm-size` 또는 `-s` 옵션을 사용하여 쿠버네티스 노드의 크기를 변경할 수 있습니다. 기본 노드 크기는 Standard_DS2_v2(2vCPU, 7GB memory)입니다. 추가 옵션은 [az aks create](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-create)를 참고하십시오.
  </div>
</div>

### 클러스터에 연결

쿠버네티스 클러스터에 연결하도록 kubectl을 구성하려면 `az aks get-credentials` 명령을 사용합니다. 이 명령은 자격 증명을 다운로드하고 쿠버네티스 CLI에서 사용할 자격 증명을 구성합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>az aks get-credentials --resource-group KuberixRG --name KuberixCluster</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
              $ kubectl get nodes
              NAME                                STATUS   ROLES   AGE   VERSION
              aks-nodepool1-23754246-vmss000000   Ready    agent   38m   v1.16.13</p>
        </code>
      </div>
  </pre>
</article>

### 포털에서 Azure 리소스 확인

위의 모든 명령을 실행하면 Azure Portal에 2개의 리소스 그룹이 생성된 것을 볼 수 있습니다.

![리소스 그룹](/dist/assets/docs/v3.3/aks/aks-create-command.png)

Azure 쿠버네티스 서비스 자체는 `KuberixRG`에 배치됩니다.

![Azure 쿠버네티스 서비스](/dist/assets/docs/v3.3/aks/aks-dashboard.png)

VM, 로드 밸런서 및 가상 네트워크와 같은 다른 모든 리소스는 `MC_KuberixRG_KuberixCluster_westus`에 배치됩니다.

![Azure 쿠버네티스 서비스](/dist/assets/docs/v3.3/aks/aks-all-resources.png)

## AKS에 Super Kubenetes 배포

Super Kubenetes 배포를 시작하려면 다음 명령을 사용하십시오.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p>
        </code>
      </div>

  </pre>
</article>

다음 명령을 통해 설치 로그를 검사할 수 있습니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## Super Kubenetes 콘솔에 액세스

공개 IP 주소에서 Super Kubenetes 콘솔에 액세스하려면 서비스 유형을 `LoadBalancer`로 변경해야 합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl edit service ks-console -n Super Kubenetes-system</code>
      </div>
  </pre>
</article>

다음 섹션을 찾아 유형을 `LoadBalancer`로 변경합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;clusterIP</span>: <span style="color:#ae81ff">10.0.78.113</span> 
              <span style="color:#f92672">&nbsp;&nbsp;externalTrafficPolicy</span>: <span style="color:#ae81ff">Cluster</span> 
              <span style="color:#f92672">&nbsp;&nbsp;ports</span>: 
              &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodePort</span>: <span style="color:#ae81ff">30880</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span>: <span style="color:#ae81ff">8000</span> 
              <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">ks-console</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;tier</span>: <span style="color:#ae81ff">frontend</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v3.0.0</span> 
              <span style="color:#f92672">&nbsp;&nbsp;sessionAffinity</span>: <span style="color:#ae81ff">None</span> 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">LoadBalancer</span> <span style="color:#75715e">&nbsp;<span>#</span> Change NodePort to LoadBalancer</span> 
              <span style="color:#f92672">status</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;loadBalancer</span>: {}
            </p>
        </code>
      </div>
  </pre>
</article>

ks-console 서비스 구성을 저장한 후 다음 명령을 사용하여 공개 IP 주소(`EXTERNAL-IP` 아래)를 가져올 수 있습니다. IP 주소를 사용하여 기본 계정과 비밀번호(`admin/P@88w0rd`)로 콘솔에 액세스합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            $ kubectl get svc/ks-console -n Super Kubenetes-system
            NAME         TYPE           CLUSTER-IP    EXTERNAL-IP   PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>        AGE
            ks-console   LoadBalancer   10.0.181.93   13.86.xxx.xxx   80:30194/TCP   13m       6379/TCP       10m          
          </p>
        </code>
      </div>
  </pre>
</article>

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. 플러그형 구성 요소의 경우 설치 전이나 후에 활성화할 수 있습니다. 자세한 내용은 [플러그식 구성 요소 활성화](../../../pluggable-components/)를 참고하십시오.
