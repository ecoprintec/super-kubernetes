---
title: ks-installer를 사용한 업그레이드
keywords: 'Kubernetes, upgrade, Super Kubenetes, v3.3.0'
description: 'Use ks-installer to upgrade Super Kubenetes.'
linkTitle: 'Upgrade with ks-installer'
weight: 7300
---

ks-installer는 쿠버네티스 클러스터가 [KubeKey](../../installing-on-linux/introduction/kubekey/)에 의해 설정되지 않았고, 클라우드 공급자에 의해 호스팅되거나 자체적으로 생성된 사용자에게 권장됩니다. 이 튜토리얼은 **Super Kubenetes 업그레이드 전용**입니다. 클러스터 운영자는 사전에 쿠버네티스를 업그레이드할 책임이 있습니다.

## 사전 준비

- v3를 실행하는 Super Kubenetes 클러스터가 있어야 합니다. 2.x. Super Kubenetes 버전이 v3.1.x 이하인 경우 먼저 v3.2.x로 업그레이드하세요.
- [ 3.3.0 릴리스 노트](../../../v3.3/release/release-v330/)를 주의 깊게 읽으십시오.
- 중요한 컴포넌트는 미리 백업하십시오.
- Docker 레지스트리. Harbor 또는 기타 Docker 레지스트리가 있어야 합니다. 자세한 내용은 [프라이빗 이미지 레지스트리 준비](../../installing-on-linux/introduction/air-gapped-installation/#step-2-prepare-a-private-image-registry)를 참조하세요.
- Super Kubenetes 3.3.0의 지원되는 쿠버네티스 버전: v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(실험적 지원).

## ks-installer 적용

다음 명령을 실행하여 클러스터를 업그레이드하십시오.

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
        <code>
            <p>
               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/kubesphere-installer.yaml</a>  --force
            </p>
        </code>
        </div>
    </pre>
</article>

## 플러그 가능한 컴포넌트 활성화

업그레이드 후 Super Kubenetes 3.3.0의 [새 플러그형 컴포넌트를 활성화](../../pluggable-components/overview/)하여 컨테이너 플랫폼의 더 많은 기능을 탐색할 수 있습니다.
