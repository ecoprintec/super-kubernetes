---
title: 쿠버네티스에 설치 - 개요
keywords: 'Super Kubenetes, Kubernetes, Installation'
description: 'Develop a basic understanding of the general steps of deploying Super Kubenetes on an existing Kubernetes cluster.'
linkTitle: 'Overview'
weight: 4110
---

![Super Kubenetes+k8s](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/Kuberix+k8s.png)

사용자를 위한 plug-and-play 아키텍처를 제공하려는 Super Kubenetes의 약속의 일환으로 기존 쿠버네티스 클러스터에 쉽게 설치할 수 있습니다. 더 구체적으로 말하면 Super Kubenetes는 클라우드(예: AWS EKS, QingCloud QKE 및 Google GKE) 또는 온프레미스에서 호스팅되는 쿠버네티스에 배포할 수 있습니다. Super Kubenetes는 쿠버네티스 자체를 바꾸지 않기 때문입니다. 쿠버네티스 클러스터 리소스를 관리하기 위해 쿠버네티스 API와만 상호 작용합니다. 즉, Super Kubenetes는 기본 쿠버네티스 클러스터 및 쿠버네티스 배포 환경에 설치할 수 있습니다.

이 섹션에서는 쿠버네티스에 Super Kubenetes를 설치하는 일반적인 단계에 대한 개요를 제공합니다. 다양한 환경에서의 특정 설치 방법에 대한 자세한 내용은 호스팅된 쿠버네티스에 설치 및 온프레미스 쿠버네티스에 설치를 참조하십시오.

<div className="notices note">
  <p>노트</p>
  <div>
    기존 쿠버네티스 클러스터에 Super Kubenetes를 설치하기 전에 [사전 요구 사항](../prerequisites/)을 확인해 주십시오.
  </div>
</div>

## 가이드

## Super Kubenetes 배포

기존 쿠버네티스 클러스터가 모든 요구 사항을 충족하는지 확인한 후 kubectl을 사용하여 기본 최소 패키지로 Super Kubenetes를 설치할 수 있습니다.

1. 다음 명령을 실행하여 설치를 시작합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p></code></div>
    </pre>

  </article>

2. 설치 로그를 검사합니다.

  <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

3. `kubectl get pod --all-namespaces`를 사용하여 모든 Pod가 Super Kubenetes의 관련 네임스페이스에서 정상적으로 실행되고 있는지 확인합니다. 정상적으로 실행되고 있다면 다음 명령을 통해 콘솔의 포트(기본값 : 30880)를 확인하십시오.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get svc/ks-console -n Super Kubenetes-system</code>
        </div>
    </pre>
  </article>

4. 보안 그룹에서 포트 30880이 열려 있는지 확인하고 기본 계정과 비밀번호(`admin/P@88w0rd`)로 NodePort(`IP:30880`)를 통해 웹 콘솔에 액세스합니다.

   ![login](/dist/assets/docs/v3.3/installing-on-kubernetes/introduction/overview/login.png)

## 플러그식 구성 요소 활성화(선택 사항)

기본 최소 설치로 시작하는 경우 [플러그식 구성 요소 활성화](../../../pluggable-components/)를 참조하여 다른 구성 요소를 설치합니다.

   <div className="notices tip">
     <p>팁</p>
     <div>
       - 플러그식 구성 요소는 설치 전이나 후에 활성화할 수 있습니다. 자세한 내용은 예제 파일 [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/blob/release-3.0/deploy/cluster-configuration.yaml)을 참고하십시오.
       - 클러스터에 사용 가능한 CPU와 메모리가 충분한지 확인하십시오.
       - Super Kubenetes에서 제공하는 전체 스택 기능을 검색하려면 이러한 플러그형 구성 요소를 설치하는 것이 좋습니다.
     </div>
   </div>
