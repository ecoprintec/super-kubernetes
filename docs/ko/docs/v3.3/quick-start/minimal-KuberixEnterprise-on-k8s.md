---
title: 쿠버네티스의 미니멀 Super Kubenetes 기업
keywords: 'Super Kubenetes, Kubernetes, Minimal, Installation'
description: 'Install Super Kubenetes on an existing Kubernetes cluster with a minimal installation package. Your Kubernetes cluster can be hosted on cloud or on-premises.'
linkTitle: 'Minimal Super Kubenetes on Kubernetes'
weight: 2200,
showSubscribe: true
---

Linux 시스템에 Super Kubenetes를 설치하는 것 외에도 기존 Kubernetes 클러스터에 배포할 수도 있습니다. 이 튜토리얼은 Kubernetes에서 최소한의 Super Kubenetes 설치를 완료하는 일반적인 단계를 보여줍니다. 자세한 내용은 [쿠버네티스에 설치](../../installing-on-kubernetes/introduction/overview/)를 참고하십시오.

## 사전 요구 사항

- 쿠버네티스에 Super Kubenetes 3.3.0을 설치하려면 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(실험 지원)여야 합니다.
- 컴퓨터가 다음의 최소 하드웨어 요구 사항을 충족하는지 확인하십시오 : CPU > 1 Core, Memory > 2 GB
- 쿠버네티스 클러스터의 **기본** 스토리지 클래스는 설치 전에 구성해야 합니다.

<div className="notices note">
  <p>노트</p>
  <div>
    - CSR 서명 기능은 `--cluster-signing-cert-file` 및 `--cluster-signing-key-file` 매개변수로 시작될 때 `kube-apiserver`에서 활성화됩니다. 보다 자세한 내용은 [RKE 설치 이슈]()<!-- (https://github.com/Super Kubenetes/Super Kubenetes/issues/1925#issuecomment-591698309) -->를 참고하십시오.
    - 쿠버네티스에 Super Kubenetes를 설치하기 위한 전제 조건에 대한 자세한 내용은 [사전 요구 사항](../../installing-on-kubernetes/introduction/prerequisites/)를 참고하십시오.
  </div>
</div>

## 가이드

## Super Kubenetes 배포

시스템이 조건을 충족하는지 확인한 후 다음 단계를 수행하여 Super Kubenetes를 설치하십시오.

1. 다음 명령을 실행하여 설치를 시작합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></code>
        </div>
    </pre>

  </article>

2. Super Kubenetes가 성공적으로 설치된 후 다음 명령을 실행하여 설치 로그를 볼 수 있습니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

3. `kubectl get pod --all-namespaces`를 사용하여 모든 Pod가 Super Kubenetes의 관련 네임스페이스에서 정상적으로 실행되고 있는지 확인합니다. 잘 실행된다면 다음 명령을 실행하여 콘솔의 포트(기본값 : `30880`)를 확인하십시오.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl get svc/ks-console -n Super Kubenetes-system</code>
         </div>
      </pre>
   </article>

4. 보안 그룹에서 포트 `30880`이 열려 있는지 확인하고 기본 계정과 비밀번호(`admin / P@88w0rd`)로 NodePort(`IP:30880`)를 통해 웹 콘솔에 액세스합니다.

5. 콘솔에 로그인한 후 **시스템 구성 요소**에서 다양한 구성 요소의 상태를 확인할 수 있습니다. 관련 서비스를 사용하려면 일부 구성 요소가 실행될 때까지 기다려야 할 수도 있습니다.

## 플러그식 구성 요소 활성화 (선택 사항)

이 가이드는 기본적으로 최소 설치에만 사용됩니다. Super Kubenetes에서 다른 구성 요소를 활성화하는 방법에 대한 자세한 내용은 [플러그식 구성 요소 활성화](../../pluggable-components/)를 참고하십시오.
