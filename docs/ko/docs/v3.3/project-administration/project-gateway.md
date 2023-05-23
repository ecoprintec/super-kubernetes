---
title: "프로젝트 게이트웨이"
keywords: 'Super Kubenetes, Kubernetes, project, gateway, NodePort, LoadBalancer'
description: 'Understand the concept of project gateway and how to manage it.'
linkTitle: "Project Gateway"
weight: 13500
---

Super Kubenetes 프로젝트의 게이트웨이는 [NGINX 인그레스 컨트롤러](https://www.nginx.com/products/nginx/kubernetes-ingress-controller)입니다. Super Kubenetes은 [라우트](../../project-user-guide/application- workloads/routes/)라는 HTTP 로드 밸런싱을 위한 설정을 내장하고 있습니다. 라우트는 클러스터 내부 서비스로의 외부 연결에 대한 규칙을 정의합니다. 자신의 서비스로의 외부 접속을를 제공해야 하는 사용자는 URI 경로, 지원 서비스 이름 및 기타 정보를 포함한 규칙을 정의하는 라우트 리소스를 생성하세요.

프로젝트 게이트웨이 외에도, Super Kubenetes는 모든 프로젝트가 글로벌 게이트웨이를 공유할 수 있도록 [클러스터 범위 게이트웨이](../../cluster-administration/cluster-settings/cluster-gateway/)도 지원합니다.

이 튜토리얼은 서비스 및 라우트에 대한 외부 접속을를 위해 Super Kubenetes에서 프로젝트 게이트웨이를 활성화하는 방법을 시연합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-admin`)를 생성해야 합니다. 사용자는 프로젝트 수준에서 `admin` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 게이트웨이 활성화

1. Super Kubenetes 웹 콘솔에 `project-admin`으로 로그인하고 프로젝트로 이동하세요. 네비게이션 바의 **프로젝트 설정**에서 **게이트웨이 설정**을 클릭하세요.

2. **게이트웨이 활성화**를 클릭하세요. 팝업 창에서 게이트웨이에 대한 두 가지 접속 모드를 선택할 수 있습니다.

   **NodePort**: 게이트웨이를 통해 해당 노드 포트로 서비스에 접속할 수 있습니다.
   
   **LoadBalancer**: 게이트웨이를 통해 단일 IP 주소로 서비스에 접속할 수 있습니다.
   
3. **게이트웨이 활성화** 페이지에서 **추적**을 활성화할 수도 있습니다. 추적 기능을 사용할 수 있으며 [다양한 그레이스케일 릴리스 전략](../../project-user-guide/grayscale-release/overview/)을 사용할 수 있도록 구성된 애플리케이션을 만들 때는 **애플리케이션 거버넌스**를 꼭 켜야 합니다. 이것이 활성화되고, 만약 라우트에 접속이 안 된다면, 자신의 라우트(인그레스)에 주석(예를 들어, `nginx.ingress.kubernetes.io/service-upstream: true`)이 추가되었는지를 확인하세요.

4. **설정 옵션**에서 키-값 쌍을 추가하여 NGINX 인그레스 컨트롤러의 시스템 컴포넌트에 대한 설정을 제공하세요. 자세한 내용은 [NGINX 인그레스 컨트롤러 문서](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#configuration-options)를 참조하세요.

5. 접속 방식을 선택한 후 **확인**을 클릭하세요.

## NodePort

**NodePort**를 선택하면, Super Kubenetes는 http 및 https 요청에 대해 각각 포트를 설정합니다. 사용자는 `EIP:NodePort` 또는 `Hostname:NodePort`에서 서비스에 접속할 수 있습니다.

예를 들어, 탄력적 IP 주소(EIP)로 서비스에 접속하려면, 다음을 방문하십시오:

- `http://EIP:32734`
- `https://EIP:32471`

[라우트](../../project-user-guide/application-workloads/routes/)(인그레스)를 만들 때 서비스에 접속하기 위한 호스트 이름을 사용자 지정할 수 있습니다. 예를 들어, 라우트에 설정된 호스트 이름으로 서비스에 접속하려면, 다음을 방문하십시오:



<div className="notices note">
  <p>Note</p>
  <div>
      - 자신의 환경에 따라, 보안 그룹에서 포트를 열고 관련 포트 포워딩 규칙을 설정해야 할 수 있습니다.

      - 호스트 이름을 사용하여 서비스에 접속하는 경우, 설정한 도메인 이름이 IP 주소로 변환될 수 있는지 확인하십시오.
      - **NodePort**는 운영 환경에 권장되지 않습니다. 대신 **LoadBalancer**를 사용할 수 있습니다.
  </div>
</div>

## LoadBalancer

**LoadBalancer**를 선택하기 전에 미리 로드 밸런서를 설정해야 합니다. 로드 밸런서의 IP 주소는 게이트웨이에 바인딩되어 내부 서비스 및 라우트에 대한 접속을 제공합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    클라우드 공급자는 종종 로드 밸런서 플러그인을 지원합니다. 해당 플랫폼의 메이저 쿠버네티스 엔진에 Super Kubenetes를 설치하면, 자신이 사용할 환경에서 로드 밸런서를 이미 사용할 수 있음을 알게 될 것입니다. 만약 베어메탈 환경에 Super Kubenetes를 설치한다면, 로드 밸런싱을 위해 [OpenELB](https://github.com/kubesphere/openelb)를 사용할 수 있습니다.
  </div>
</div>
