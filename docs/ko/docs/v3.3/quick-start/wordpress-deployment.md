---
title: WordPress 작성 및 배포
keywords: 'Super Kubenetes, Kubernetes, app, WordPress'
description: 'Learn the entire process of deploying an example application in Super Kubenetes, including credential creation, volume creation, and component settings.'
linkTitle: 'Compose and Deploy WordPress'
weight: 2500
---

## WordPress 소개

WordPress는 PHP로 작성된 무료 오픈 소스 콘텐츠 관리 시스템으로 사용자가 자신의 웹사이트를 구축할 수 있습니다. 전체 WordPress 애플리케이션에는 백엔드 데이터베이스 역할을 하는 MySQL과 함께 다음과 같은 쿠버네티스 객체가 포함됩니다.

![WordPress](/dist/assets/docs/v3.3/quickstart/wordpress-deployment/WordPress.png)

## 개요

이 튜토리얼은 Super Kubenetes에서 애플리케이션(예: WordPress)을 생성하고 클러스터 외부에서 액세스하는 방법을 보여줍니다.

## 사전 요구 사항

프로젝트 중 하나에 할당된 `operator` 역할을 가진 `project-regular` 계정이 필요합니다.(프로젝트에 초대된 사용자여야 합니다) 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../create-workspace-and-project/)를 참고하십시오.

## 예상 시간

약 15분 내외

## 가이드

### 1단계 : Secrets 생성

#### MySQL Secret 생성

환경변수 `WORDPRESS_DB_PASSWORD`는 WordPress 데이터베이스에 접속하기 위한 비밀번호입니다. 이 단계에서는 MySQL Pod 템플릿에서 사용할 환경 변수를 저장할 Secret을 생성해야 합니다.

1. `project-regular` 계정을 사용하여 Super Kubenetes 콘솔에 로그인합니다. `demo-project`의 세부 정보 페이지로 이동하여 **구성**으로 이동합니다. **Secrets**에서 오른쪽 **생성**을 클릭합니다.

2. 기본정보 (예 : `mysql-secret`로 이름 지정)를 입력하고 **Next**를 클릭합니다. 다음 페이지에서 **유형**에 대해 **기본값**을 선택하고 **데이터 추가**를 클릭하여 키-값 쌍을 추가합니다. 키(`MYSQL_ROOT_PASSWORD`)와 값(`123456`)을 입력하고 오른쪽 하단의 **√**를 클릭하여 확인합니다. 완료되면 **생성**을 클릭하여 계속합니다.

#### WordPress Secret 생성

위의 동일한 단계에 따라 키 `WORDPRESS_DB_PASSWORD` 및 값 `123456`을 사용하여 WordPress Secret인 `wordpress-secret`을 생성합니다. 생성된 Secret이 목록에 표시됩니다.

### 2단계 : PVC 생성

1. **저장소** 아래의 **Persistent Volume Claims**로 이동하고 **생성**을 클릭합니다.

2. 영구 볼륨 클레임(PVC)의 기본 정보(예 : `wordpress-pvc`)를 입력하고 **다음**을 클릭합니다..

3. **저장소 설정**에서 사용 가능한 **저장소 등급**을 선택하고 **액세스 모드** 및 **볼륨 용량**을 설정해야 하고, 기본값을 사용할 수도 있습니다. 설정을 완료했다면 **다음**을 클릭하세요.

4. **고급 설정**의 경우 이 단계에서 추가 정보를 추가할 필요가 없으며 **생성**을 클릭하여 완료합니다.

### 3단계 : 애플리케이션 생성

#### MySQL 백엔드 구성 요소 추가

1. **애플리케이션 워크로드** 아래의 **앱**으로 이동하여 **구성된 앱**을 선택한 다음 **생성**을 클릭합니다.

2. 기본 정보(예 : **이름**은 `wordpress`)를 입력하고 **다음**을 클릭합니다.

3. **서비스 설정**에서 **서비스 생성**을 클릭하여 앱에서 서비스를 생성합니다.

4. **상태 저장 서비스**를 선택하여 서비스 유형을 정의합니다.

5. 상태 저장 서비스의 이름(예 : **mysql**)을 입력하고 **다음**을 클릭합니다.

6. **컨테이너**에서 **컨테이너 추가**를 클릭합니다.

7. 검색 상자에 `mysql:5.6`을 입력하고 **엔터**를 누른 다음 **기본 포트 사용**을 클릭합니다. 그 후에는 설정이 아직 완료되지 않았으므로 오른쪽 하단의 **√**를 클릭하지 마십시오.

  <div className="notices note">
    <p>노트</p>
    <div>
      **고급 설정**에서 메모리 제한이 1000Mi 이상인지 확인하십시오. 그렇지 않으면 메모리 부족으로 인해 MySQL이 시작되지 않을 수 있습니다.
    </div>
  </div>

8. **환경 변수**까지 아래로 스크롤한 다음 **From secret**을 클릭합니다. `MYSQL_ROOT_PASSWORD`라는 이름을 입력하고 리소스 `mysql-secret`과 이전 단계에서 생성한 `MYSQL_ROOT_PASSWORD` 키를 선택합니다. 완료한 후 **√**를 클릭하고 계속하려면 **다음**을 클릭하세요.

9. **저장소 설정**에서 **Add Persistent Volume Claim Template**을 클릭합니다. PVC 이름 접두사(`mysql`) 및 **마운트 경로**(모드: `ReadAndWrite`, 경로: `/var/lib/mysql`)를 입력합니다.

   완료한 후 **√**를 클릭하고 **다음**을 클릭하여 계속합니다.

10. **고급 설정**에서 **생성**을 하거나 필요에 따라 다른 옵션을 설정할 수 있습니다.

#### WordPress 프론트엔드 구성 요소 추가

11. **애플리케이션 워크로드** 아래의 **서비스**에서 **생성**을 다시 클릭하고 이번에는 **Stateless Service**를 선택합니다. `wordpress`라는 이름을 입력하고 **다음**을 클릭합니다.

12. 이전 단계와 유사하게 **컨테이너 추가**를 클릭하고 검색 상자에 `wordpress:4.8-apache`를 입력하고 **엔터**를 누르고 **기본 포트 사용**을 클릭합니다.

13. **환경 변수**까지 아래로 스크롤한 다음 **From secret**를 클릭합니다. 여기에 두 개의 환경 변수를 추가해야 합니다. 다음과 같은 값을 입력합니다.

    - `WORDPRESS_DB_PASSWORD`는 작업 1에서 생성한 `wordpress-secret`과 `WORDPRESS_DB_PASSWORD`를 선택합니다.

    - **환경 변수 추가**를 클릭하고 키와 값으로 `WORDPRESS_DB_HOST`와 `mysql`을 입력합니다.

  <div className="notices warning">
    <p>주의</p>
    <div>
      여기에 추가된 두 번째 환경 변수의 값은 5단계에서 설정한 MySQL 이름과 같아야 합니다. 그렇지 않으면 WordPress에서 해당 MySQL 데이터베이스에 연결할 수 없습니다.
    </div>
  </div>
    
    **√**를 클릭하여 저장하고 **다음**을 클릭하여 계속합니다.

14. **저장소 설정**에서 **마운트 볼륨**을 클릭한 다음 **Select Persistent Volume Claim**을 클릭합니다.

15. 이전 단계에서 생성한 `wordpress-pvc`를 선택하고, 모드를 `ReadAndWrite`로 설정하고, 마운트 경로로 `/var/www/html`을 입력합니다. **√**를 클릭하여 저장하고 **다음**을 클릭하여 계속합니다.

16. **고급 설정**에서 **생성**을 하거나 필요에 따라 다른 옵션을 설정할 수 있습니다.

17. 이제 프론트엔드 구성 요소도 설정되었습니다. 계속하려면 **다음**을 클릭하세요.

18. 여기에서 경로 규칙(Ingress)을 설정하거나 **생성** 할 수도 있습니다.

19. 앱을 만든 후 목록에 앱이 표시됩니다.

### 4단계 : 리소스 확인

**워크로드**의 **Deployments** 및 **StatefulSets**에서 각각 `wordpress-v1` 및 `mysql-v1`의 상태를 확인합니다. 제대로 실행되고 있다면 WordPress가 성공적으로 생성되었음을 의미합니다.

### 5단계: NodePort를 사용하여 WordPress에 액세스

1. 클러스터 외부에서 서비스에 액세스하려면 왼쪽의 탐색 창에서 **애플리케이션 워크로드 > 서비스**를 먼저 클릭합니다. `wordpress` 오른쪽에 있는 점 세 개를 클릭하고 **외부 액세스 편집**을 선택합니다.

2. **액세스 방법**으로 `NodePort`를 선택하고 **확인**을 클릭합니다.

3. 서비스를 클릭하면 포트가 노출된 것을 볼 수 있습니다.

4. `{Node IP}:{NodePort}` 에서 이 애플리케이션에 액세스합니다.

  <div className="notices note">
    <p>노트</p>
    <div>
      서비스에 액세스하기 전에 보안 그룹에서 포트가 열려 있는지 확인하십시오.
    </div>
  </div>
