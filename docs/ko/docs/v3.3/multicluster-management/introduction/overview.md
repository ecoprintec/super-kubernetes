---
title: "Kubernetes 멀티 클러스터 관리 — 개요"
keywords: 'Kubernetes, Super Kubenetes, multicluster, hybrid-cloud'
description: 'Gain a basic understanding of multi-cluster management, such as its common use cases, and the benefits that Super Kubenetes can bring with its multi-cluster feature.'
linkTitle: "Overview"
weight: 5110
---

요즘 조직에서 각기 다른 클라우드 제공업체나 인프라에 걸쳐 여러 쿠버네티스 클러스터를 실행하고 관리하는 것은 매우 일반적입니다. 각 쿠버네티스 클러스터는 비교적 독립형인 장치(self-contained unit)이므로, 업스트림 커뮤니티는 멀티 클러스터 관리 솔루션을 연구하고 개발하는 데 어려움을 겪고 있습니다. 하지만, [쿠버네테스 클러스터 페데레이션(KubeFed)](https://github.com/kubernetes-sigs/kubefed)은 유효한 접근 방식 중 하나일 수 있습니다.

멀티 클러스터 관리의 가장 일반적인 사용 사례로는 서비스 트래픽 로드 밸런싱, 개발 및 운영 격리, 데이터 처리와 데이터 스토리지의 분리, 클라우드 간 백업 및 재해 복구, 컴퓨팅 리소스의 유연한 할당, 지역 간 서비스를 통한 접속 지연 시간 단축, 그리고 공급업체 종속(vendor lock-in) 방지 등이 있습니다.

Super Kubenetes는 위에서 언급한 사례들을 포함해, 멀티 클러스터 및 멀티 클라우드 관리 문제를 해결하기 위해 개발되었습니다. Super Kubenetes는 애플리케이션과 그 레플리카를, 퍼블릭 클라우드에서부터 온프레미스 환경까지, 다양한 클러스터에 배포할 수 있는 통합 컨트롤 플레인을 사용자에게 제공합니다. 또한 Super Kubenetes는 중앙 집중식 모니터링, 로깅, 이벤트 및 감사 로그를 포함하여, 다양한 클러스터에서 풍부한 가시성을 자랑합니다.

![multi-cluster-overview](/dist/assets/docs/v3.3/multicluster-management/introduction/overview/multi-cluster-overview.jpg)
