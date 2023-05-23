---
title: "세션 시간 초과"
keywords: "Session timeout, Super Kubenetes, Kubernetes"
description: "Understand session timeout and customize the timeout period."
linkTitle: "Session Timeout"
Weight: 16420
---

사용자가 Super Kubenetes 콘솔에 로그인하면 세션이 시작됩니다. 세션이 만료되면 "**세션 시간 초과 또는 이 계정이 다른 곳에 로그인되어 있습니다. 다시 로그인하십시오**"라는 메시지가 표시될 수 있습니다.

## 세션 타임 아웃

세션이 만료되는 시기를 제어할 수 있습니다. 기본 세션 시간 초과는 2시간의 비활성 시간입니다. 이는 세션 시간 초과에 도달하면 사용자가 콘솔에서 자동으로 로그아웃됨을 의미합니다. 세션 시간 초과에 대해 [accessTokenMaxAge 및 accessTokenInactivityTimeout 설정](../../../access-control-and-account-management/external-authentication/set-up-external-authentication/)을 할 수 있습니다.

## 서명 검증 실패

[멀티 클러스터 환경](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-member-cluster)에서는 반드시 `clusterRole`과 `jwtSecret`을 올바르게 설정해야 합니다. 

## 노드 클럭 차이(skew)

노드 클럭 차이(skew)는 사용자 토큰의 만료 시간 확인과 같은 시간에 민감한 작업에 영향을 줍니다. NTP 서버와 서버 시간 동기화를 설정할 수 있습니다. [MaximumClockSkew](../../../access-control-and-account-management/external-authentication/set-up-external-authentication/)도 설정할 수 있으며, 기본값은 10초입니다.
