---
title: "클러스터 종료 및 재시작"
description: "Learn how to gracefully shut down your cluster and restart it."
layout: "single"
linkTitle: "Cluster Shutdown and Restart"
weight: 8800
icon: "/dist/assets/docs/v3.3/docs.svg"
---
이 문서에서는 쿠버네티스 클러스터를 정상적으로 종료하는 방법과 다시 시작하는 방법을 시연합니다. 유지 관리를 위해 클러스터를 일시적으로 종료해야 할 수 있습니다.

<div className="notices warning">
  <p>Warning</p>
  <div>    
		클러스터를 종료하는 것은 매우 위험합니다. 작업과 그 결과에 대해서 완전히 이해해야 합니다. 계속 진행하기 전에 etcd 백업을 만드세요.
    일반적으로 전체 클러스터를 다시 시작하는 대신 노드를 하나씩 유지 관리하는 것이 좋습니다.
  </div>
</div>


## 사전 준비
- 클러스터를 종료하기 전에 [etcd 백업](https://etcd.io/docs/current/op-guide/recovery/#snapshotting-the-keyspace)을 하세요.
- 호스트간 SSH [비밀번호 없는 로그인](https://man.openbsd.org/ssh.1#AUTHENTICATION)을 설정하세요.

## 쿠버네티스 클러스터 종료

<div className="notices tip">
  <p>Tip</p>
  <div>
    - 클러스터를 다시 시작할 때 문제가 발생할 경우 클러스터를 복원할 수 있으므로 클러스터를 종료하기 전에 etcd 데이터를 백업해야 합니다.
    - 이 문서의 방법을 사용하면 데이터 손상 가능성이 존재하는 동안에도 클러스터를 정상적으로 종료할 수 있습니다.
  </div>
</div>

### 1단계: 노드 목록 가져오기

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              nodes<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes -o name<span style="color:#66d9ef">)</span>
            </p>
        </code>
      </div>
  </pre>
</article>

### 2단계: 모든 노드 종료

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#66d9ef">for</span> node in <span style="color:#e6db74">${</span>nodes[@]<span style="color:#e6db74">}</span> 
              <span style="color:#66d9ef">do</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;echo <span style="color:#e6db74">"==== Shut down </span>$node<span style="color:#e6db74">&nbsp;===="</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;ssh $node sudo shutdown -h <span style="color:#ae81ff">1</span> 
              <span style="color:#66d9ef">done</span>
            </p>
        </code>
      </div>
  </pre>
</article>
그런 다음 외부 저장소와 같은 클러스터 종속성을 종료할 수 있습니다.

## 클러스터를 정상적으로 다시 시작
클러스터를 정상적으로 종료한 후 클러스터를 정상적으로 다시 시작할 수 있습니다.

### 사전 준비
클러스터를 정상적으로 종료했습니다.

<div className="notices tip">
  <p>Tip</p>
  <div>
    일반적으로 클러스터는 재시작 후 사용할 수 있지만 예상치 못한 상황으로 인해 클러스터를 사용하지 못할 수 있습니다. 예를 들어:
    - 종료 중 etcd 데이터 손상.
    - 노드 오류.
    - 예상치 못한 네트워크 오류.
  </div>
</div>

### 1단계: 모든 클러스터 종속성 상태 확인
외부 저장소와 같은 모든 클러스터 종속성이 준비되었는지 확인하세요.
### 2단계: 클러스터 시스템 전원 켜기
클러스터가 가동되어 실행될 때까지 기다리세요(약 10분 정도 소요될 수 있음).
### 3단계: 모든 컨트롤 플레인 컴포넌트의 상태 확인
etcd 서비스와 같은 핵심 컴포넌트의 상태를 확인하고 모든 것이 준비되었는지 확인하세요.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get nodes -l node-role.kubernetes.io/master
            </p>
        </code>
      </div>
  </pre>
</article>

### 4단계: 모든 작업자 노드의 상태 확인

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get nodes -l node-role.kubernetes.io/worker
            </p>
        </code>
      </div>
  </pre>
</article>

클러스터가 다시 시작되지 않으면 [etcd 클러스터 복원](https://etcd.io/docs/current/op-guide/recovery/#restoreing-a-cluster)을 시도하세요.