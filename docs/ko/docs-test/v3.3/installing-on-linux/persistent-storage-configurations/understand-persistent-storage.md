---
title: "Persistent Storage 설치 이해"
keywords: 'Super Kubenetes, Kubernetes, storage, installation, configuration'
description: 'Understand how to use KubeKey to install different storage systems.'
linkTitle: "Understand Persistent Storage Installation"
weight: 3310
---

Persistent volume은 Super Kubenetes를 설치하기 위해 **필수적으로** 설정해야 합니다. [KubeKey](../../../installing-on-linux/introduction/kubekey/)를 사용하여 Super Kubenetes 및 cluster를 생성할 때, 다른 storage 시스템을 [add-on](https://github.com/Super Kubenetes/kubekey/blob/master/docs/addons.md)으로 설치할 수 있습니다. 리눅스에서  KubeKey로 Super Kubenetes를 설치하는 일반적인 단계는 다음과 같습니다:

1. Kubernetes 설치.
2. 제공된 add-on 설치.
3. [ks-installer](https://github.com/Super Kubenetes/ks-installer)로 Super Kubenetes 설치.

두번째 단계에서 사용가능한 StorageClass가 **필수적으로** 설치되어야 합니다. StorageClass는 다음을 포함합니다:

- StorageClass 자체
- StorageClass용 스토리지 플러그인(필요할 경우)

<div className="notices note">
  <p>Note</p>
  <div>
    일부 스토리지 시스템에서는 외부 스토리지 서비스를 제공하기 위해 스토리지 서버를 미리 준비해야 합니다.
  </div>
</div>

## KubeKey를 통해 다른 스토리지 시스템을 설치하는 방법

KubeKey는 클러스터에 대한 [설정 파일](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file) (`config-sample.yaml`)을 생성합니다. 이 파일에는 다양한 추가 기능을 포함하며 다양한 리소스에 대하여 정의할 수 있는 필수 매개 변수를 포함합니다. 다른 스토리지 시스템은 Helm 차트 또는 YAML을 통해 추가 기능으로 설치할 수도 있습니다. KubeKey를 통해 설치하려면 스토리지 시스템의 필요한 설정이 설정 파일에 포함되어야 합니다.  

KubeKey를 이용하여 설치할 스토리지 시스템의 설정을 적용하려면 두 가지 방법이 있습니다.

1. `config-sample.yaml`의 `addons` 필드에 필요한 매개변수를 입력합니다.
2. 추가 기능에 대한 별도의 구성 파일을 만들어 필요한 모든 매개변수를 나열합니다. 그리고 KubeKey가 설치 중에 참조할 수 있도록 `config-sample.yaml`에 파일 경로를 설정 해야합니다.

더 많은 정보는 [add-ons](https://github.com/Super Kubenetes/kubekey/blob/master/docs/addons.md)를 참고하세요.

## 기본 Storage Class

KubeKey는 다양한 스토리지 플러그인 및 스토리지 클래스 설치를 지원합니다. 설정 파일에서 사용할 기본 스토리지 클래스를 특정 할 수 있습니다. KubeKey는 기본 스토리지 클래스가 지정되지 않은 것을 확인하면 기본적으로 [OpenEBS](https://github.com/openebs/openebs)를 설치합니다.

OpenEBS Dynamic Local PV 제공자는 데이터를 유지하기 위해 노드에서 고유한 HostPath(디렉토리)를 사용하여 Kubernetes Local Persistent Volume을 생성할 수 있습니다. 그리고 이는 스토리지 시스템이 없을 때 사용하기 좋습니다.

## Multi-storage 솔루션

둘 이상의 스토리지 플러그인을 설치하려는 경우 이들 중 하나만 기본 저장소 클래스로 설정해야 합니다. 

## 지원되는 CSI 플러그인

Kubernetes는 버전 1.21에서 In-tree 볼륨 플러그인이 Kubernetes에서 제거될 것이라고 발표했습니다. 더 자세한 내용은 [Kubernetes In-Tree to CSI Volume Migration Moves to Beta](https://kubernetes.io/blog/2019/12/09/kubernetes-1-17-feature-csi-migration-beta/)를 참고하세요. 그러므로 CSI 플러그인을 설치하는 것을 추천합니다.

지원되는 CSI 플러그인:

- [neonsan-csi](https://github.com/yunify/qingstor-csi)
- [ceph-csi](../install-ceph-csi-rbd/)
