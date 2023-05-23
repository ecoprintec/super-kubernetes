---
title: 'Deploy Super Kubenetes on Oracle OKE'
keywords: 'Kubernetes, Super Kubenetes, OKE, Installation, Oracle-cloud'
description: 'Learn how to deploy Super Kubenetes on Oracle Cloud Infrastructure Container Engine for Kubernetes.'
weight: 4260
---

이 가이드는 [Oracle 쿠버네티스 엔진](https://www.oracle.com/cloud/compute/container-engine-kubernetes.html)에 Super Kubenetes를 배포하는 단계를 안내합니다.

## 쿠버네티스 클러스터 생성

- OKE의 표준 쿠버네티스 클러스터는 Super Kubenetes 설치의 전제 조건입니다. 탐색 메뉴로 이동하여 아래 이미지를 참고하여 클러스터를 생성하세요.

  ![oke-클러스터](https://ap3.qingstor.com/KubeSphere-website/docs/oke-cluster.jpg)

- 팝업 창에서 **빠른 생성**를 선택하고 **Launch Workflow**를 클릭합니다.

  ![oke-빠른생성](https://ap3.qingstor.com/KubeSphere-website/docs/oke-quickcreate.jpg)

  <div className="notices note">
    <p>노트</p>
    <div>
      이 예에서 **빠른 생성**는 Oracle Cloud의 클러스터에 필요한 모든 리소스를 자동으로 생성하는 데모에 사용됩니다. **사용자 정의 생성**을 선택하면 모든 리소스(VCN 및 LB 서브넷 등)를 직접 생성해야 합니다.
    </div>
  </div>

- 다음으로 기본 정보로 클러스터를 설정해야 합니다. 다음은 참조용 예입니다. 완료되면 **다음**을 클릭합니다.

  ![기본-정보-설정](https://ap3.qingstor.com/KubeSphere-website/docs/cluster-setting.jpg)

  <div className="notices note">
    <p>노트</p>
    <div>
      - 쿠버네티스에 Super Kubenetes 3.3.0을 설치하기 위해서는 귀하의 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x, v1.23.x(실험 지원) 이어야 합니다.
      - **Visibility Type**은 **공개**를 선택하는 것이 좋습니다. 이렇게 하면 모든 노드에 공용 IP 주소가 할당됩니다. IP 주소는 나중에 Super Kubenetes의 웹 콘솔에 액세스하는 데 사용할 수 있습니다.
      - Oracle Cloud에서 모양은 인스턴스에 할당되는 CPU 수, 메모리 양 및 기타 리소스를 결정하는 템플릿입니다. 이 예에서는 `VM.Standard.E2.2(2 CPU 및 16G 메모리)`가 사용됩니다. 자세한 내용은 [표준 형태](https://docs.cloud.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vmshapes__vm-standard)를 참고하십시오.
      - 이 예에는 3개의 노드가 포함되어 있습니다. 특히 프로덕션 환경에서 필요에 따라 노드를 더 추가할 수 있습니다.
    </div>
  </div>

- 클러스터 정보를 검토하고 조정이 필요하지 않은 경우 **클러스터 생성**을 클릭합니다.

  ![클러스터-생성](https://ap3.qingstor.com/KubeSphere-website/docs/create-cluster.jpg)

- 클러스터가 생성된 후 **닫기**를 클릭합니다.

  ![클러스터-준비](https://ap3.qingstor.com/KubeSphere-website/docs/cluster-ready.jpg)

- 클러스터 상태가 **활성**인지 확인하고 **액세스 클러스터**를 클릭합니다.

  ![액세스-클러스터](https://ap3.qingstor.com/KubeSphere-website/docs/access-cluster.jpg)

- 팝업 창에서 **Cloud Shell 액세스**를 선택하여 클러스터에 액세스합니다. **Launch Cloud Shell**을 클릭하고 Oracle Cloud에서 제공한 코드를 복사합니다.

  ![cloud-shell-액세스](https://ap3.qingstor.com/KubeSphere-website/docs/cloudshell-access.png)

- 나중에 설치 명령을 실행할 수 있도록 Cloud Shell에서 명령을 붙여넣습니다.

  ![cloud-shell-oke](https://ap3.qingstor.com/KubeSphere-website/docs/oke-cloud-shell.png)

  <div className="notices warning">
    <p>주의</p>
    <div>
        위의 명령어를 복사하여 실행하지 않으면 아래 단계를 진행할 수 없습니다.
    </div>
  </div>

## OKE에 Super Kubenetes 설치

- kubectl을 사용하여 Super Kubenetes를 설치합니다. 다음 명령은 기본 최소 설치에만 해당됩니다.

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

- 설치 로그를 검사합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
        </div>
    </pre>
  </article>

- 설치가 완료되면 다음 메시지를 볼 수 있습니다.

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
                <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://10.0.10.2:30880<span></span></span> 
                <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                <span></span> 
                <span style="color:#ae81ff">NOTES：</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After logging into the console, please check the</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the "Cluster Management". If any service is not</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please modify the default password after login.</span> 
                <span></span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
              </p>
          </code>
        </div>
    </pre>
  </article>

## Super Kubenetes 콘솔에 액세스

이제 Super Kubenetes가 설치되었으므로 `NodePort` 또는 `LoadBalancer`를 통해 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

- 다음 명령어를 통해 Super Kubenetes 콘솔의 서비스를 확인하십시오.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

- 출력은 아래와 같습니다. 외부 IP 주소가 노출될 수 있도록 유형을 `LoadBalancer`로 변경할 수 있습니다.

  ![console-nodeport](https://ap3.qingstor.com/KubeSphere-website/docs/nodeport-console.jpg)

   <div className="notices tip">
     <p>Tip</p>
     <div>
       It can be seen above that the service `ks-console` is being exposed through a NodePort, which means you can access the console directly via `NodeIP:NodePort` (the public IP address of any node is applicable). You may need to open port `30880` in firewall rules.
     </div>
   </div>

- 명령을 실행하여 서비스 구성을 편집합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl edit svc ks-console -o yaml -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

- `type`으로 이동하여 `NodePort`를 `LoadBalancer`로 변경합니다. 완료한 후 구성을 저장합니다.

  ![svc-유형-변경](https://ap3.qingstor.com/KubeSphere-website/docs/change-service-type.png)

- 다음 명령어를 다시 실행하면 아래와 같이 IP 주소가 표시되는 것을 볼 수 있습니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

  ![console-service](https://ap3.qingstor.com/KubeSphere-website/docs/console-service.png)

- 기본 계정과 비밀번호(`admin/P@88w0rd`)로 외부 IP 주소를 통해 콘솔에 로그인합니다. 클러스터 개요 페이지에서 대시보드를 볼 수 있습니다.

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. Super Kubenetes에서 다른 구성 요소를 활성화하려면 [플러그식 구성 요소 활성화](../../../pluggable-components/)를 참고하십시오.
