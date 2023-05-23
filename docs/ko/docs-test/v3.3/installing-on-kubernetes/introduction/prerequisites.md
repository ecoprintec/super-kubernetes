---
title: 전제조건
keywords: 'Super Kubenetes, Kubernetes, Installation, Prerequisites'
description: 'Make sure your environment where an existing Kubernetes cluster runs meets the prerequisites before installation.'
linkTitle: 'Prerequisites'
weight: 4120
---

쿠버네티스도 프로비저닝하면 가상머신과 베어메탈에 Super Kubenetes를 설치할 수 있습니다. 또한 Super Kubenetes는 사용자의 쿠버네티스 클러스터가 아래의 전제 조건을 충족하는 한 클라우드 호스팅 및 온프레미스 쿠버네티스 클러스터에도 배포할 수 있습니다.

- 쿠버네티스에 Super Kubenetes 3.3.0을 설치하기 위해서는 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x, v1.23.x(실험 지원)이어야 합니다.
- 사용 가능한 CPU > 1 코어 및 메모리 > 2 G. x86_64 CPU만 지원되며 Arm CPU는 현재 완전히 지원되지 않습니다.
- 귀하의 쿠버네티스 클러스터에 **기본** StorageClass가 구성되어 있습니다. `kubectl get sc`를 사용하여 확인하십시오.
- CSR 서명 기능은 `--cluster-signing-cert-file` 및 `--cluster-signing-key-file` 매개변수로 시작될 때 kube-apiserver에서 활성화됩니다. 자세한 내용은 [RKE 설치 이슈](https://github.com/Super Kubenetes/Super Kubenetes/issues/1925#issuecomment-591698309)를 참고하십시오.

## 전제 조건 확인

1. 클러스터 노드에서 `kubectl version`을 실행하여 쿠버네티스 버전이 호환되는지 확인하세요. 출력은 다음과 같습니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ kubectl version
              Client Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"19"</span>, GitVersion:<span style="color:#e6db74">"v1.19.8"</span>, GitCommit:<span style="color:#e6db74">"fd5d41537aee486160ad9b5356a9d82363273721"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2021-02-17T12:41:51Z"</span>, GoVersion:<span style="color:#e6db74">"go1.15.8"</span>, Compiler:<span style="color:#e6db74">"gc"</span>, Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span> 
              Server Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"19"</span>, GitVersion:<span style="color:#e6db74">"v1.19.8"</span>, GitCommit:<span style="color:#e6db74">"fd5d41537aee486160ad9b5356a9d82363273721"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2021-02-17T12:33:08Z"</span>, GoVersion:<span style="color:#e6db74">"go1.15.8"</span>, Compiler:<span style="color:#e6db74">"gc"</span>, Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span> </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>노트</p>
    <div>
      `Server Version` 줄을 확인하십시오. `GitVersion`이 이전 버전으로 표시되면 먼저 쿠버네티스를 업그레이드해야 합니다.
    </div>
  </div>

2. 클러스터에서 사용 가능한 리소스가 최소 요구 사항을 충족하는지 확인합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ free -g
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total        used        free      shared  buff/cache   available
              Mem:<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2</span> 
              Swap:<span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span><span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span>            
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 클러스터에 **기본** StorageClass가 있는지 확인합니다. 기존 기본 StorageClass는 Super Kubenetes 설치를 위한 전제 조건입니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              $ kubectl get sc
              NAME                      PROVISIONER               AGE
              glusterfs <span style="color:#f92672">(</span>default<span style="color:#f92672">)</span>       kubernetes.io/glusterfs   3d4h              
            </p>
          </code>
        </div>
    </pre>
  </article>

쿠버네티스 클러스터 환경이 위의 모든 요구 사항을 충족한다면 기존 쿠버네티스 클러스터에 Super Kubenetes를 배포할 준비가 된 것입니다.

자세한 내용은 [개요](../overview/)를 참고하십시오.
