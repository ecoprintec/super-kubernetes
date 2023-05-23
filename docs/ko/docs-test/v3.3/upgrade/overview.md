---
title: "업그레이드 - 개요"
keywords: "Kubernetes, upgrade, Super Kubenetes, 3.3.0, upgrade"
description: "Understand what you need to pay attention to before the upgrade, such as versions, and upgrade tools."
linkTitle: "Overview"
weight: 7100
---

## Before the Upgrade

  <div className="notices warning">
    <p>Warning</p>
    <div>
      - 먼저 테스트 환경에서 업그레이드를 위한 시뮬레이션을 구현해야 합니다. 테스트 환경에서 업그레이드가 성공하고 모든 애플리케이션이 정상적으로 실행되면 운영 환경에서 클러스터를 업그레이드하십시오.
      - 업그레이드 프로세스 중에 애플리케이션이 잠시 중단될 수 있습니다(특히 단일 복제 파드에서). 업그레이드를 위해 합리적인 기간을 정하십시오.
      - 운영 전에 etcd 및 stateful 애플리케이션을 백업하는 것이 좋습니다. [Velero](https://velero.io/)를 사용하여 백업을 구현하고 쿠버네티스 리소스 및 영구 볼륨을 마이그레이션할 수 있습니다.
    </div>
  </div>



## 업그레이드 도구

기존 클러스터가 설정된 방식에 따라 KubeKey 또는 ks-installer를 사용하여 클러스터를 업그레이드할 수 있습니다. 클러스터를 KubeKey에서 생성한 경우 [KubeKey를 사용하여 클러스터를 업그레이드](../upgrade-with-kubekey/)하는 것이 좋습니다. 그렇지 않으면 [ks-installer를 사용하여 클러스터 업그레이드](../upgrade-with-ks-installer/)하세요.