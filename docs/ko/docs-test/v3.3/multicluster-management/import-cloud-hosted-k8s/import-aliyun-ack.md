---
title: "Alibaba Cloud ACK 클러스터 가져오기"
keywords: 'Kubernetes, Super Kubenetes, multicluster, ACK'
description: 'Learn how to import an Alibaba Cloud Kubernetes cluster.'
titleLink: "Import an Alibaba Cloud Kubernetes (ACK) Cluster"
weight: 5310
---

이 튜토리얼 은 [직접 연결](../../../multicluster-management/enable-multicluster/direct-connection/) 방법을 사용하여 Alibaba Cloud ACK 클러스터를 가져오는 방법을 보여줍니다. 프록시 연결 방법을 사용하려면 [에이전트 연결](../../../multicluster-management/enable-multicluster/agent-connection/) 을 참조하십시오 .

## 사전 준비

- Super Kubenetes가 설치된 Kubernetes 클러스터를 준비하고 마스터 클러스터로 설정해야 합니다. 마스터 클러스터를 준비하는 방법에 대한 자세한 내용은 [호스트 클러스터 준비](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-host-cluster) 를 참조하십시오 .
- Super Kubenetes가 구성원 클러스터로 설치된 ACK 클러스터를 준비해야 합니다.

## ACK 클러스터 가져오기

### 1단계: ACK 구성원 클러스터 준비

1. 호스트 클러스터에서 멤버 클러스터를 관리하기 위해서는 `jwtSecret`을 서로 동일하게 설정해야 합니다. 그러므로 우선 이것을 가져오기 위해 **호스트 클러스터**에서 다음 명령을 실행하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
        </div>
    </pre>
  </article>

출력은 다음과 유사합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code><span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"QVguGh7qnURywHn2od9IiOX6X8f8wK8g"</span></code>
        </div>
    </pre>
  </article>

2. ACK 클러스터의 Super Kubenetes 콘솔에 `admin`으로 로그인합니다. 좌측 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요.

3. **CRDs**로 이동하여, 검색 창에 `ClusterConfiguration`을 입력한 다음, 키보드의 **Enter**를 누릅니다. **ClusterConfiguration**을 클릭하여 세부 정보 페이지로 이동하세요.

4. 오른쪽의 <img src="/dist/assets/docs/v3.3/multicluster-management/import-cloud-hosted-k8s/import-ack/three-dots.png" height="20px" alt="icon"> 를 클릭한 다음, **YAML 편집**을 선택하여 `ks-installer`를 편집하세요.
   
5. `ks-installer`의 YAML 파일에서 `jwtSecret`의 값을 위에 표시된 해당 값으로 변경하고 `clusterRole`의 값을 `member`로 설정하세요. 
   
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
      자신만의 `jwtSecret` 값을 사용하세요. 변경 사항이 적용되려면 잠시 기다려야 합니다.
    </div>
  </div>

### 3단계: 새 kubeconfig 파일 생성

Alibaba Cloud 콘솔에 로그인합니다. **Container Service - Kubernetes** 아래의 **클러스터** 를 클릭하여 클러스터 세부정보 페이지에 액세스한 다음 **연결 정보** 탭을 선택합니다. **Public Access**  탭에서 kubeconfig 파일을 볼 수 있습니다. kubeconfig 파일의 내용을 복사합니다.

![kubeconfig](/dist/assets/docs/v3.3/multicluster-management/import-cloud-hosted-k8s/import-ack/kubeconfig.png)

### 4단계: ACK 멤버 클러스터 가져오기

1. 호스트 클러스터의 Super Kubenetes 콘솔에 `admin`으로 로그인하세요. 좌측 상단에서 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택하세요. **클러스터 관리** 페이지에서 **클러스터 추가**를 클릭하세요.


2. 필요에 따라 기본 정보를 입력하고 **다음**을 클릭하세요.

3. **연결 방법**에서 **직접 연결**을 선택하세요. GKE 멤버 클러스터의 새 kubeconfig 파일을 입력한 다음 **생성**을 클릭하세요.

4. 클러스터 초기화가 완료될 때까지 기다리세요.
