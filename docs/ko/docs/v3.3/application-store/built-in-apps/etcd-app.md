---
title: "Super Kubenetes에서 etcd 배포"
keywords: 'Kubernetes, Super Kubenetes, etcd, app-store'
description: 'Learn how to deploy etcd from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy etcd on Super Kubenetes"
weight: 14210
---

Go로 작성된, [etcd](https://etcd.io/)는 분산 시스템 또는 머신 클러스터에서 액세스해야 하는 데이터를 저장하는 분산 키-값 저장소입니다. 쿠버네티스에서 서비스 검색을 위한 백엔드이며 클러스터 상태 및 설정을 저장합니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 etcd를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 etcd 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. etcd를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다..

3. 이름을 설정하고 앱 버전을 선택하세요. etcd가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정** 페이지에서 etcd의 퍼시스턴트 볼륨 크기를 지정하고 **설치**를 클릭합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      etcd에 더 많은 값을 지정하려면 토글 스위치를 사용하여 앱의 매니페스트를 YAML 형식으로 변경하고 설정을 편집합니다.
    </div>
  </div>

5. **앱** 페이지의 **Template-Based Apps**에서, etcd가 실행될 때까지 기다립니다.

### 2단계: etcd 서비스에 접근

앱이 배포된 후에, etcd 서버와의 상호 작용을 위한 커맨드 라인 도구인 etcdctl을 사용하여 Super Kubenetes 콘솔에서 직접 etcd에 접근할 수 있습니다.

1. **워크로드**에서 **스테이트풀셋**로 이동하여 etcd의 서비스 이름을 클릭합니다.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다.

3. 터미널에서 데이터를 직접 읽고 쓸 수 있습니다. 예를 들어, 다음 두 명령을 각각 실행합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									etcdctl set /name Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									etcdctl get /name
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Super Kubenetes 클러스터 내의 클라이언트의 경우 etcd 서비스는 `<app name>.<project name>.svc.<K8s domain>:2379`를 통해 액세스할 수 있습니다. (예를 들면, 이 가이드에서는 `etcd-bqe0g4.demo-project.svc.cluster.local:2379`).

5. 자세한 내용은 [공식 etcd 문서](https://etcd.io/docs/v3.4.0/)를 참조하십시오..
