---
title: Super Kubenetes의 쿠버네티스 멀티 테넌시
keywords: 'Kubernetes, Super Kubenetes, multi-tenancy'
description: 'Understand the multi-tenant architecture in Super Kubenetes.'
linkTitle: 'Multi-tenancy in Super Kubenetes'
weight: 12100
---

쿠버네티스는 애플리케이션을 편성하고 컨테이너를 계획하여 리소스 활용도를 크게 향상시키는데 도움을 줍니다. 하지만 쿠버네티스를 사용하면서 리소스 공유와 보안 측면에서 개인과 기업 모두에게 여러 과제가 놓여져 있고, 이는 과거에 클러스터를 관리하고 유지했던 방식과는 다릅니다.

최우선으로 해결해야 할 과제는 기업에서 멀티 테넌시와 테넌트의 보안 경계를 정의하는 방법입니다. [멀티 테넌시에 대한 논의](https://docs.google.com/document/d/1fj3yzmeU2eU8ZNBCUJG97dk_wC7228-e_MmdcmTNrZY)는 Kubernetes 커뮤니티에서 끊임없이 이루어지지만, 멀티 테넌트 시스템을 구성하는 방법에 대한 정답은 없습니다.

## 쿠버네티스 멀티 테넌시의 과제

멀티 테넌시는 일반적인 소프트웨어 구조입니다. 멀티 테넌트 환경의 리소스들은 "테넌트"라고도 부르는 여러 사용자들에 의해 공유되고, 그 각각의 데이터는 서로 격리되어 있습니다. 멀티 테넌트 쿠버네티스 클러스터의 관리자는 반드시 손상된 테넌트나 악성 테넌트가 다른 사람에게 줄 수 있는 피해를 최소화해야 하고, 리소스가 공정하게 할당되도록 해야 합니다.

기업 멀티 테넌트 시스템이 어떻게 구성되었는지와는 상관없이, 항상 논리적 리소스 격리와 물리적 리소스 격리라는 두 가지 컴포넌트가 함께 제공됩니다.

논리적 리소스 격리에는 주로 API 액세스 제어 및 테넌트 기반 권한 제어가 수반됩니다. 쿠버네티스 및 네임스페이스의 [역할 기반 액세스 제어(RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)는 논리 격리를 제공합니다. 그렇지만 이것들은 대부분의 기업 환경에 적용되지 않습니다. 기업의 테넌트는 종종 여러 네임스페이스 또는 클러스터에 걸쳐 리소스를 관리해야 합니다. 그리고 동작 및 이벤트 쿼리를 기반으로 격리된 테넌트에 대한 감사 로그를 제공하는 기능도 멀티 테넌시에서 필수입니다.

물리적 리소스의 격리는 노드와 네트워크를 포함하며 이는 컨테이너 런타임 보안과도 관련이 있습니다. 예를 들어, [NetworkPolicy](../../pluggable-components/network-policy/) 리소스를 생성하여 트래픽 흐름을 제어하고 PodSecurityPolicy 개체를 사용하여 컨테이너 동작을 제어할 수 있습니다. [Kata Containers](https://katacontainers.io/) 는 보다 안전한 컨테이너 런타임을 제공합니다.

## Super Kubenetes의 쿠버네티스 멀티 테넌시

이러한 문제를 해결하기 위해 Super Kubenetes는 쿠버네티스 기반의 멀티 테넌트 관리 솔루션을 제공합니다.

![멀티 테넌시 구조](/dist/assets/docs/v3.3/access-control-and-account-management/multi-tanancy-in-Super Kubenetes/multi-tenancy-architecture.png)

Super Kubenetes에서 [워크스페이스](../../workspace-administration/what-is-workspace/)는 가장 작은 테넌트 단위입니다. 워크스페이스를 통해 사용자는 클러스터들과 프로젝트들 간에 리소스를 공유할 수 있습니다. 워크스페이스 구성원은 승인된 클러스터에서 프로젝트를 생성하고 다른 구성원을 초대하여 같은 프로젝트에서 협력하도록 할 수 있습니다.

**user**는 Super Kubenetes 계정의 한 예시입니다. 사용자를 플랫폼 관리자로 지정하여 클러스터를 관리하거나 워크스페이스에 추가하여 프로젝트에 협력할 수 있습니다.

멀티 레벨의 접속 제어 및 리소스 할당량 제한은 Super Kubenetes에서 리소스 격리의 기반이 됩니다. 이는 멀티 테넌트 아키텍처를 구축하고 관리하는 방법을 결정합니다.

### 논리적 격리

쿠버네티스와 유사하게 Super Kubenetes는 사용자에게 부여된 권한을 관리하기위해 RBAC를 사용하므로, 논리적으로 리소스 격리를 실행합니다.

Super Kubenetes의 접속 제어는 플랫폼, 워크스페이스, 프로젝트의 세 가지 수준으로 나뉩니다. 각 역할을 부여하여 사용자가 여러 리소스에 대해 어떤 수준의 권한을 가질지 제어할 수 있습니다.

1. [플랫폼 역할](/docs/v3.3/quick-start/create-workspace-and-project/): 플랫폼 사용자가 클러스터, 워크스페이스 및 플랫폼 구성원과 같은 플랫폼 리소스에 대해 가지는 권한을 제어합니다.
2. [워크스페이스 역할](/docs/v3.3/workspace-administration/role-and-member-management/): 워크스페이스 구성원이 프로젝트(예: 네임스페이스) 및 DevOps 프로젝트와 같은 워크스페이스 리소스에 대해 가지는 권한을 제어합니다.
3. [프로젝트 역할](/docs/v3.3/project-administration/role-and-member-management/): 프로젝트 구성원이 작업량 및 파이프라인과 같은 프로젝트 리소스에 대해 가지는 권한을 제어합니다.

### 네트워크 격리

리소스를 논리적으로 격리하는 것 외에도, Super Kubenetes는 워크스페이스 및 프로젝트에 대한 [네트워크 격리 정책](../../pluggable-components/network-policy/)을 설정할 수 있습니다.

### 감사

Super Kubenetes는 사용자에게 [로그 감사](../../pluggable-components/auditing-logs/)또한 제공합니다.

### 인증 및 권한부여

Super Kubenetes의 전체 인증 및 권한 부여 체인은 다음 다이어그램을 참조하십시오. Super Kubenetes는 OPA(Open Policy Agent)를 사용하여 RBAC 규칙을 확장했습니다. 그리고 Super Kubenetes 팀은 더 많은 보안 관리 정책을 제공하기 위해 [Gatekeeper]를 통합하기를 기대하고 있습니다.

![request-chain](/dist/assets/docs/v3.3/access-control-and-account-management/multi-tanancy-in-Super Kubenetes/request-chain.jpg)
