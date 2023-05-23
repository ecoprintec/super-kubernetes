---
title: "Super Kubenetes에서 RadonDB PostgreSQL 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, RadonDB PostgreSQL'
description: 'Learn how to deploy RadonDB PostgreSQL from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy RadonDB PostgreSQL on Super Kubenetes"
weight: 14294
---

[RadonDB PostgreSQL](https://github.com/radondb/radondb-postgresql-kubernetes)은 [PostgreSQL](https://postgresql.org) 데이터베이스 시스템을 기반으로 하는 오픈 소스, 클라우드 기반의 고가용성 클러스터 솔루션입니다. 

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 RadonDB PostgreSQL를 배포하는 예시를 설명합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 RadonDB PostgreSQL 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. **Categories** 아래의 **Database & Cache**를 클릭합니다.

3. RadonDB PostgreSQL를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

4. 이름을 설정하고 앱 버전을 선택하세요. RadonDB PostgreSQL가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

5. **앱 설정**에서 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 계속하려면 **설치**를 클릭하세요. 

6. RadonDB PostgreSQL이 실행될 때까지 기다립니다.

### 2단계: PostgreSQL 클러스터 상태 보기

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 현재 프로젝트의 리소스 사용 리스트를 확인할 수 있습니다.

2. **애플리케이션 워크로드** 아래의 **서비스**에서 **스테이트풀셋** 탭을 클릭하면, 스테이트풀셋이 시작됩니다.

   스테이트풀셋을 클릭하여 세부 정보 페이지로 이동합니다. **모니터링** 탭에 들어가면 일정 기간에 대한 꺾은선 그래프에서 측정값을 볼 수 있습니다.

3. **애플리케이션 워크로드** 아래의 **파드**에서는 실행 중인 모든 파드들을 확인할 수 있습니다.

4. **스토리지** 아래의 **퍼시스턴트 볼륨 클레임**에서는 PostgreSQL 클러스터 컴포넌트가 퍼시스턴트 볼륨을 사용하고 있는 것을 볼 수 있습니다.

   퍼시스턴트 볼륨 사용 또한 모니터링됩니다. 퍼시스턴트 볼륨을 클릭하여 세부 정보 페이지로 이동하세요.

### 3단계: RadonDB PostgreSQL 접속하기

1. **애플리케이션 워크로드** 아래의 **파드**로 이동하여 파드를 클릭하면 세부 정보 페이지로 이동합니다.

2. **리소스 상태** 페이지에서, **터미널** 아이콘을 클릭하세요.

3. 표시된 대화 상자에서 다음 명령을 실행하고, 앱을 사용하기 위해 터미널에 사용자 암호를 입력하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                     psql -h &lt;Pod name&gt; -p <span style="color:#ae81ff">5432</span> -U postgres -d postgres
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![Access RadonDB PostgreSQL](/dist/assets/docs/v3.3/appstore/built-in-apps/radondb-postgresql-app/radondb-postgresql-service-terminal.png)

4. 클러스터 외부에서 RadonDB PostgreSQL에 접속하려면 [RadonDB PostgreSQL의 오픈 소스 프로젝트](https://github.com/radondb/radondb-postgresql-kubernetes)를 참조하십시오.
