---
title: 로그 수집
keywords: 'Super Kubenetes, Kubernetes, project, disk, log, collection'
description: 'Enable log collection so that you can collect, manage, and analyze logs in a unified way.'
linkTitle: 'Log Collection'
weight: 13600
---

Super Kubenetes는 운영 팀이 통일되고 유연한 방식으로 로그를 수집, 관리 및 분석할 수 있도록 다양한 로그 수집 방법을 지원합니다.

이 튜토리얼에서는 예제 앱에 대한 로그를 수집하는 방법을 시연합니다.

## 사전 준비

- 워크스페이스, 프로젝트 및 사용자(`project-admin`)를 생성해야 합니다. 사용자는 프로젝트 수준에서 `admin` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.
- [Super Kubenetes 로깅 시스템](../../pluggable-components/logging/)을 활성화해야 합니다.

## 로그 수집 활성화

1. Super Kubenetes의 웹 콘솔에 `project-admin`으로 로그인하고 프로젝트로 이동합니다.

2. 좌측의 내비게이션 바에서 **프로젝트 설정**의 **로그 수집**을 클릭한 다음, <img src="/dist/assets/docs/v3.3/project-administration/disk-log-collection/log-toggle-switch.png" width="60" alt="icon" />을 클릭하여 기능을 활성화하세요.

## 디플로이먼트 생성

1. 좌측의 내비게이션 바에서 **애플리케이션 워크로드**의 **워크로드**를 선택하세요. **디플로이먼트** 탭에서 **생성**를 클릭하세요.

2. 표시되는 대화 상자에서 디플로이먼트 이름(예: `demo-deployment`)을 설정하고 **다음**을 클릭하세요.

3. **컨테이너**에서 **컨테이너 추가**를 클릭하세요.

4. 이미지(태그: 'latest')를 예시로 사용하기 위해 검색창에 알파인(alpine)을 입력하세요.

5. **명령 시작**까지 아래로 스크롤하고 확인란을 선택하세요. **커맨드** 및 **파라미터**에 각각 다음 값을 입력하고, **√**를 클릭한 후 **다음**을 클릭하세요.

   **커맨드**

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									/bin/sh
               </p>
            </code>
         </div>
      </pre>
   </article>

**파라미터**

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span>-</span>c,if <span style="color:#f92672">[</span> ! -d /data/log <span style="color:#f92672">]</span>;<span style="color:#66d9ef">then</span> mkdir -p /data/log;<span style="color:#66d9ef">fi</span>; <span style="color:#66d9ef">while</span> true; <span style="color:#66d9ef">do</span> date &gt;&gt; /data/log/app-test.log; sleep 30;<span style="color:#66d9ef">done</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      위의 커맨드와 파라미터는 날짜 정보가 30초마다 `/data/log`의 `app-test.log`로 내보내진다는 것을 의미합니다.
    </div>
  </div>

6. **저장소 설정** 탭에서 <img src="/dist/assets/docs/v3.3/project-administration/disk-log-collection/toggle-switch.png" width="20" alt="icon" />을 클릭하여 **볼륨에 대한 로그 수집**을 활성화하고, **볼륨 마운트**를 클릭하세요.

7. **임시 볼륨** 탭에서 볼륨 이름(예: `demo-disk-log-collection`)을 입력하고 접속 모드와 경로를 설정하세요.

   **√**를 클릭하고 **다음**을 클릭하세요.

8. **고급 설정**에서 **생성**을 클릭하여 프로세스를 완료합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      자세한 내용은 [디플로이먼트](../../project-user-guide/application-workloads/deployments/)를 참조하십시오.
    </div>
  </div>

## 로그 보기

1. **디플로이먼트** 탭에서 방금 생성된 디플로이먼트를 클릭하여 세부 정보 페이지로 이동하세요.

2. **리소스 상태**에서 <img src="/dist/assets/docs/v3.3/project-administration/disk-log-collection/arrow.png" width="20" alt="icon" />을 클릭하여 컨테이너 세부 정보를 확인한 다음, `logsidecar-container`(filebeat 컨테이너)의 <img src="/dist/assets/docs/v3.3/project-administration/disk-log-collection/log-icon.png" width="20" alt="icon" />를 클릭하여 로그를 봅니다.

3. 또는 우측 아래에 있는 <img src="/dist/assets/docs/v3.3/project-administration/disk-log-collection/toolbox.png" width="20" alt="icon" />을 클릭하고 **로그 검색**를 선택하여 stdout 로그를 볼 수도 있습니다. 예를 들어, 퍼지 쿼리에 디플로이먼트의 파드 이름을 사용하세요.
