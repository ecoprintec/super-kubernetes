---
title: "워크스페이스 네트워크 격리"
keywords: 'Super Kubenetes, Kubernetes, Calico, Network Policy'
description: 'Enable or disable the network policy in your workspace.'
linkTitle: "Workspace Network Isolation"
weight: 9500
---

## 사전 준비

- [네트워크 정책](../../pluggable-components/network-policy/)을 활성화해야 합니다.

- `workspace-admin` 역할의 사용자가 필요합니다. 예를 들어 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)에서 생성된 `ws-admin` 사용자를 사용하세요.


  <div className="notices note">
    <p>Note</p>
    <div>
      네트워크 정책 구현은 [Super Kubenetes NetworkPolicy](https://github.com/kubesphere/community/blob/master/sig-network/concepts-and-designs/kubesphere-network-policy.md)를 참조하십시오.
    </div>
  </div>


## 워크스페이스 네트워크 격리 활성화 또는 비활성화

워크스페이스 네트워크 격리는 기본적으로 비활성화되어 있습니다. **워크스페이스 설정**의 **기본 정보**에서 네트워크 격리를 켤 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    네트워크 격리가 켜져 있으면, 기본적으로 이그레스 트래픽은 허용되는 반면에, 다른 워크스페이스에 대한 인그레스 트래픽은 거부됩니다. 네트워크 정책을 사용자 정의해야 하는 경우 [프로젝트 네트워크 격리](../../project-administration/project-network-isolation/)을 켜고 **프로젝트 설정**에서 네트워크 정책을 추가해야 합니다.
  </div>
</div>

또한 **기본 정보** 페이지에서 네트워크 격리를 비활성화할 수도 있습니다.

## 모범 사례

워크스페이스의 모든 파드가 안전한지 보장하기 위한 하나의 모범 사례는 워크스페이스 네트워크 격리를 활성화하는 것입니다.

네트워크 격리가 켜져 있으면 다른 워크스페이스에서 이 워크스페이스에 접속할 수 없습니다. 워크스페이스의 기본 네트워크 격리가 자신의 필요 사항을 충족하지 않는다면, 프로젝트 네트워크 격리를 켜고 프로젝트의 네트워크 정책을 사용자 지정하세요.