---
title: DigitalOcean 쿠버네티스에 Super Kubenetes 구축
keywords: 'Kubernetes, Super Kubenetes, DigitalOcean, Installation'
description: 'Learn how to deploy Super Kubenetes on DigitalOcean.'
weight: 4230
---

![Super Kubenetes+DOKS](/dist/assets/docs/v3.3/do/Kuberix-DOKS.png)

이 가이드는 [DigitalOcean 쿠버네티스](https://www.digitalocean.com/products/kubernetes/)에 Super Kubenetes를 배포하는 단계를 안내합니다.

## DOKS 클러스터 준비

DO의 쿠버네티스 클러스터는 Super Kubenetes를 설치하기 위한 전제 조건입니다. [DO 계정](https://cloud.digitalocean.com/)으로 이동하여 아래 이미지를 참고하여 탐색 메뉴에서 클러스터를 생성하세요.

![do-클러스터-생성](/dist/assets/docs/v3.3/do/create-cluster-do.png)

다음을 선택해야 합니다.

1. 쿠버네티스 버전 (예 : _1.18.6-do.0_)
2. 데이터 센터 지역 (예 : _Frankfurt_)
3. VPC 네트워크 (예 : _default-fra1_)
4. 클러스터 용량 (예 : vCPU 2개 및 각각 4GB RAM이 있는 표준 노드 2개)
5. 클러스터 이름 (예 : _Super Kubenetes-3_)

![do-클러스터-구성](/dist/assets/docs/v3.3/do/config-cluster-do.png)

  <div className="notices note">
    <p>노트</p>
    <div>
      - 쿠버네티스에 Super Kubenetes 3.3.0을 설치하기 위해서는 귀하의 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x, v1.23.x(실험 지원) 이어야 합니다.
      - 이 예에는 2개의 노드가 포함되어 있습니다. 특히 프로덕션 환경에서 필요에 따라 노드를 더 추가할 수 있습니다.
      - 머신 유형 Standard / 4GB / 2 vCPU는 최소 설치용입니다. 여러 연결 가능한 구성 요소를 활성화하거나 클러스터를 프로덕션에 사용할 계획이라면 노드를 더 강력한 유형(예 : CPU-Optimized / 8GB /4 vCPU)으로 업그레이드할 수 있습니다. DigitalOcean은 작업자 노드 유형에 따라 제어 평면 노드를 프로비저닝하는 것으로 보이며 표준 노드의 경우 API 서버가 바로 응답하지 않을 수 있습니다.</div></div>

클러스터가 준비되면 kubectl에 대한 구성 파일을 다운로드할 수 있습니다.

![다운로드 구성 파일](/dist/assets/docs/v3.3/do/download-config-file.png)

## DOKS에 Super Kubenetes 설치

클러스터가 준비되었으므로 아래 단계에 따라 Super Kubenetes를 설치할 수 있습니다.

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

설치가 완료되면 다음 메시지를 볼 수 있습니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://10.XXX.XXX.XXX:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After logging into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are ready.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please modify the default password after login.</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

## Super Kubenetes 콘솔에 액세스

이제 Super Kubenetes가 설치되었으므로 아래 단계에 따라 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

- DigitalOcean에서 제공하는 쿠버네티스 대시보드로 이동합니다.

  ![쿠버네티스-dashboard-access](/dist/assets/docs/v3.3/do/kubernetes-dashboard-access.png)

- **Super Kubenetes 시스템** 네임스페이스를 선택합니다.

  ![쿠버네티스-dashboard-namespace](/dist/assets/docs/v3.3/do/kubernetes-dashboard-namespace.png)

- **Services** 아래의 **Service**에서 **ks-console** 서비스를 편집합니다.

  ![쿠버네티스-dashboard-edit](/dist/assets/docs/v3.3/do/kubernetes-dashboard-edit.png)

- 유형을 `NodePort`에서 `LoadBalancer`로 변경합니다. 완료되면 파일을 저장합니다.

  ![lb-change](/dist/assets/docs/v3.3/do/lb-change.png)

- DO에서 생성된 엔드포인트를 사용하여 Super Kubenetes의 웹 콘솔에 액세스합니다.

  ![액세스-콘솔](/dist/assets/docs/v3.3/do/access-console.png)

   <div className="notices tip">
     <p>팁</p>
     <div>
       서비스 유형을 `LoadBalancer`로 변경하는 대신 `NodeIP:NodePort`(서비스 유형은 `NodePort`로 설정)를 통해 Super Kubenetes 콘솔에 액세스할 수도 있습니다. 노드 중 하나의 공개 IP를 가져와야 합니다.
     </div>
   </div>

- 기본 계정과 비밀번호(`admin/P@88w0rd`)로 콘솔에 로그인합니다. 클러스터 개요 페이지에서 대시보드를 볼 수 있습니다.

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. Super Kubenetes에서 다른 구성 요소를 활성화하려면 [플러그식 구성 요소 활성화](../../../pluggable-components/)에서 자세한 내용을 참고하십시오.
