---
title: "Google GKE 클러스터 가져오기"
keywords: 'Kubernetes, Super Kubenetes, multicluster, Google GKE'
description: 'Learn how to import a Google Kubernetes Engine cluster.'
titleLink: "Import a Google GKE Cluster"
weight: 5330
---

이 가이드에서는 [직접 연결](../../../multicluster-management/enable-multicluster/direct-connection/) 방식을 통해 GKE 클러스터를 가져오는 방법을 시연합니다. 에이전트 연결 방식을 사용하려면 [에이전트 연결](../../../multicluster-management/enable-multicluster/agent-connection/)을 참조하십시오.

## 사전 준비

- Super Kubenetes가 설치된 쿠버네티스 클러스터가 있고, 이 클러스터를 호스트 클러스터로 준비하세요. 호스트 클러스터 준비 방법에 대한 자세한 내용은 [호스트 클러스터 준비](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-host-cluster)를 참조하십시오. .
- 멤버 클러스터로 사용할 EKS 클러스터가 합니다.

## GKE 클러스터 가져오기

### 1단계: GKE 클러스터에 Super Kubenetes 배포

먼저 GKE 클러스터에 Super Kubenetes를 배포해야 합니다. GKE에 Super Kubenetes를 배포하는 방법에 대한 자세한 내용은 [GKE에 Super Kubenetes 배포](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-gke/)를 참조하세요.

### 2단계: GKE 멤버 클러스터 준비

1. 호스트 클러스터에서 멤버 클러스터를 관리하기 위해서는 `jwtSecret`을 서로 동일하게 설정해야 합니다. 그러므로 우선 이것을 가져오기 위해 **호스트 클러스터**에서 다음 명령을 실행하세요.

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

5. `ks-installer`의 YAML 파일에서 `jwtSecret`의 값을 위에 표시된 해당 값으로 변경하고 `clusterRole`의 값을 `member`로 설정하세요. 

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">authentication</span>:
              <span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">QVguGh7qnURywHn2od9IiOX6X8f8wK8g</span>
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
              <span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span>
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

### 3단계: 새 kubeconfig 파일 생성

1. GKE 클라우드 쉘 터미널에서 다음 명령을 실행하세요:

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									TOKEN<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-system get secret <span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-system get sa Super Kubenetes -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d<span style="color:#66d9ef">)</span> 
									kubectl config set-credentials Super Kubenetes --token<span style="color:#f92672">=</span><span style="color:#e6db74">${</span>TOKEN<span style="color:#e6db74">}</span> 
									kubectl config set-context --current --user<span style="color:#f92672">=</span>Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 다음 명령을 실행하여 새로운 kubeconfig 파일을 가져옵니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>cat ~/.kube/config</code>
        </div>
    </pre>
  </article>

  출력은 다음과 비슷할 것입니다:
    

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
            <span style="color:#f92672">clusters</span>:
            <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
                <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLekNDQWhPZ0F3SUJBZ0lSQUtPRUlDeFhyWEdSbjVQS0dlRXNkYzR3RFFZSktvWklodmNOQVFFTEJRQXcKTHpFdE1Dc0dBMVVFQXhNa1pqVTBNVFpoTlRVdFpEZzFZaTAwWkdZNUxXSTVNR1V0TkdNeE0yRTBPR1ZpWW1VMwpNQjRYRFRJeE1ETXhNVEl5TXpBMU0xb1hEVEkyTURNeE1ESXpNekExTTFvd0x6RXRNQ3NHQTFVRUF4TWtaalUwCk1UWmhOVFV0WkRnMVlpMDBaR1k1TFdJNU1HVXROR014TTJFME9HVmlZbVUzTUlJQklqQU5CZ2txaGtpRzl3MEIKQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdkVHVGtKRjZLVEl3QktlbXNYd3dPSnhtU3RrMDlKdXh4Z1grM0dTMwpoeThVQm5RWEo1d3VIZmFGNHNWcDFzdGZEV2JOZitESHNxaC9MV3RxQk5iSlNCU1ppTC96V3V5OUZNeFZMS2czCjVLdnNnM2drdUpVaFVuK0tMUUFPdTNUWHFaZ2tTejE1SzFOSU9qYm1HZGVWSm5KQTd6NTF2ZkJTTStzQWhGWTgKejJPUHo4aCtqTlJseDAvV0UzTHZEUUMvSkV4WnRCRGFuVFU0anpHMHR2NGk1OVVQN2lWbnlwRHk0dkFkWm5mbgowZncwVnplUXJqT2JuQjdYQTZuUFhseXZubzErclRqakFIMUdtU053c1IwcDRzcEViZ0lXQTNhMmJzeUN5dEJsCjVOdmJKZkVpSTFoTmFOZ3hoSDJNenlOUWVhYXZVa29MdDdPN0xqYzVFWlo4cFFJREFRQUJvMEl3UURBT0JnTlYKSFE4QkFmOEVCQU1DQWdRd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVUVyVkJrc3MydGV0Qgp6ZWhoRi92bGdVMlJiM2N3RFFZSktvWklodmNOQVFFTEJRQURnZ0VCQUdEZVBVa3I1bDB2OTlyMHZsKy9WZjYrCitBanVNNFoyOURtVXFHVC80OHBaR1RoaDlsZDQxUGZKNjl4eXFvME1wUlIyYmJuTTRCL2NVT1VlTE5VMlV4VWUKSGRlYk1oQUp4Qy9Uaks2SHpmeExkTVdzbzVSeVAydWZEOFZob2ZaQnlBVWczajdrTFgyRGNPd1lzNXNrenZ0LwpuVUlhQURLaXhtcFlSSWJ6MUxjQmVHbWROZ21iZ0hTa3MrYUxUTE5NdDhDQTBnSExhMER6ODhYR1psSi80VmJzCjNaWVVXMVExY01IUHd5NnAwV2kwQkpQeXNaV3hZdFJyV3JFWUhZNVZIanZhUG90S3J4Y2NQMUlrNGJzVU1ZZ0wKaTdSaHlYdmJHc0pKK1lNc3hmalU5bm5XYVhLdXM5ZHl0WG1kRGw1R0hNU3VOeTdKYjIwcU5RQkxhWHFkVmY0PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==</span> 
                <span style="color:#f92672">server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://130.211.231.87</a></span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">contexts</span>:
            <span>-</span><span style="color:#f92672">&nbsp;context</span>:
                <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
                <span style="color:#f92672">user</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
            <span style="color:#f92672">preferences</span>: {}
            <span style="color:#f92672">users</span>:
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">auth-provider</span>:
                  <span style="color:#f92672">config</span>:
                    <span style="color:#f92672">cmd-args</span>: <span style="color:#ae81ff">config config-helper --format=json</span> 
                    <span style="color:#f92672">cmd-path</span>: <span style="color:#ae81ff">/usr/lib/google-cloud-sdk/bin/gcloud</span> 
                    <span style="color:#f92672">expiry-key</span>: <span style="color:#e6db74">'{.credential.token_expiry}'</span> 
                    <span style="color:#f92672">token-key</span>: <span style="color:#e6db74">'{.credential.access_token}'</span> 
                  <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gcp</span> 
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">token</span>: <span style="color:#ae81ff">eyJhbGciOiJSUzI1NiIsImtpZCI6InNjOFpIb3RrY3U3bGNRSV9NWV8tSlJzUHJ4Y2xnMDZpY3hhc1BoVy0xTGsifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlc3BoZXJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJlc3BoZXJlLXRva2VuLXpocmJ3Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Imt1YmVzcGhlcmUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyMGFmZGI1Ny01MTBkLTRjZDgtYTAwYS1hNDQzYTViNGM0M2MiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXNwaGVyZS1zeXN0ZW06a3ViZXNwaGVyZSJ9.ic6LaS5rEQ4tXt_lwp7U_C8rioweP-ZdDjlIZq91GOw9d6s5htqSMQfTeVlwTl2Bv04w3M3_pCkvRzMD0lHg3mkhhhP_4VU0LIo4XeYWKvWRoPR2kymLyskAB2Khg29qIPh5ipsOmGL9VOzD52O2eLtt_c6tn-vUDmI_Zw985zH3DHwUYhppGM8uNovHawr8nwZoem27XtxqyBkqXGDD38WANizyvnPBI845YqfYPY5PINPYc9bQBFfgCovqMZajwwhcvPqS6IpG1Qv8TX2lpuJIK0LLjiKaHoATGvHLHdAZxe_zgAC2cT_9Ars3HIN4vzaSX0f-xP--AcRgKVSY9g</span>
          </code>
        </div>
    </pre>
  </article>

### 4단계: GKE 멤버 클러스터 가져오기

1. 호스트 클러스터의 Super Kubenetes 콘솔에 `admin`으로 로그인하세요. 좌측 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요. **클러스터 관리** 페이지에서 **클러스터 추가**를 클릭하세요.

2. 필요에 따라 기본 정보를 입력하고 **다음**을 클릭하세요.

3. **연결 방법**에서 **직접 연결**을 선택하세요. GKE 멤버 클러스터의 새 kubeconfig 파일을 입력한 다음 **생성**을 클릭하세요.

4. 클러스터 초기화가 완료될 때까지 기다리세요.
