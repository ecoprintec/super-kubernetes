---
title: GKE에 Super Kubenetes 배포
keywords: 'Kubernetes, Super Kubenetes, GKE, Installation'
description: 'Learn how to deploy Super Kubenetes on Google Kubernetes Engine.'
weight: 4240
---

<!-- ![Super Kubenetes+GKE](https://pek3b.qingstor.com/kubesphere-docs/png/20191123145223.png) -->

![Super Kubenetes+GKE](/dist/assets/docs/v3.3/gke/kuberix-gke.png)

이 가이드는 [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)에 Super Kubenetes를 배포하는 단계를 안내합니다.

## GKE 클러스터 준비

- GKE의 표준 쿠버네티스 클러스터는 Super Kubenetes 설치의 전제 조건입니다. 탐색 메뉴로 이동하여 아래 이미지를 참고하여 클러스터를 생성하세요.

  <!-- ![gke-클러스터-생성](https://ap3.qingstor.com/Super Kubenetes-website/docs/create-cluster-gke.jpg) -->

- **클러스터 기본**에서 마스터 버전을 선택합니다. 여기서는 고정 버전 `1.15.12-gke.2`를 예로 사용했습니다.

  <!-- ![마스터-버전-선택](https://ap3.qingstor.com/Super Kubenetes-website/docs/master-version.png) -->

- **Node Pools** 아래의 **default-pool**에서 이 클러스터에 3개의 노드를 정의합니다.

  <!-- ![node-number](https://ap3.qingstor.com/Super Kubenetes-website/docs/node-number.png) -->

- **Nodes**로 이동하여 이미지 유형을 선택하고 아래와 같이 Machine Configuration을 설정합니다. 완료되면 **생성**을 클릭합니다.

  <!-- ![machine-config](https://ap3.qingstor.com/Super Kubenetes-website/docs/machine-configuration.jpg) -->

  <div className="notices note">
    <p>노트</p>
    <div>
      - 쿠버네티스에 Super Kubenetes 3.3.0을 설치하려면 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(실험지원) 이어야 합니다.
      - 이 예에는 3개의 노드가 포함되어 있습니다. 특히 프로덕션 환경에서 필요에 따라 노드를 더 추가할 수 있습니다.
      - 머신 유형 e2-medium(vCPU 2개, 메모리 4GB)은 최소 설치용입니다. 연결 가능한 구성요소를 활성화하거나 클러스터를 프로덕션에 사용하려면 더 많은 리소스가 있는 머신 유형을 선택하세요.
      - 다른 설정의 경우 필요에 따라 변경하거나 기본값을 사용할 수도 있습니다.
    </div>
  </div>

- GKE 클러스터가 준비되면 Cloud Shell을 사용하여 클러스터에 연결할 수 있습니다.

  ![cloud-shell-gke](https://ap3.qingstor.com/Super Kubenetes-website/docs/cloud-shell.png)

## GKE에 Super Kubenetes 설치

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
                <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://10.128.0.44:30880<span></span></span> 
                <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                <span style="color:#ae81ff">NOTES：</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After logging into the console, please check the</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the "Cluster Management". If any service is not</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please modify the default password after login.</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
              </p>
          </code>
        </div>
    </pre>
  </article>

## Super Kubenetes 콘솔에 액세스

이제 Super Kubenetes가 설치되었으므로 아래 단계에 따라 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

- **서비스 및 진입**에서 서비스 **ks-console**을 선택합니다.

  ![ks-console](https://ap3.qingstor.com/Super Kubenetes-website/docs/console-service.jpg)

- **서비스 세부 정보**에서 **편집**을 클릭하고 유형을 `NodePort`에서 `LoadBalancer`로 변경합니다. 완료되면 파일을 저장합니다.

  ![lb-change](https://ap3.qingstor.com/Super Kubenetes-website/docs/lb-change.jpg)

- GKE에서 생성한 엔드포인트를 사용하여 Super Kubenetes의 웹 콘솔에 액세스합니다.

  ![access-console](https://ap3.qingstor.com/Super Kubenetes-website/docs/access-console.png)

  <div className="notices tip">
    <p>팁</p>
    <div>
      서비스 유형을 `LoadBalancer`로 변경하는 대신 `NodeIP:NodePort`(서비스 유형 `NodePort`로 설정)를 통해 Super Kubenetes 콘솔에 액세스할 수도 있습니다. 방화벽 규칙에서 포트 `30880`을 열어야 할 수도 있습니다.
    </div>
  </div>

- 기본 계정과 비밀번호(`admin/P@88w0rd`)로 콘솔에 로그인합니다. 클러스터 개요 페이지에서 대시보드를 볼 수 있습니다.

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. Super Kubenetes에서 다른 구성 요소를 활성화하려면 [플러그식 구성 요소 활성화](../../../pluggable-components/)에서 자세한 내용을 참고하십시오.
