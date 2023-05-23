---
title: "Super Kubenetes에서 GitLab 배포"
keywords: 'Super Kubenetes, Kubernetes, GitLab, App Store'
description: 'Learn how to deploy GitLab on Super Kubenetes and access its service.'
linkTitle: "Deploy GitLab on Super Kubenetes"
weight: 14310
---

[GitLab](https://about.gitlab.com/)은 버전 제어, 이슈 추적, 코드 검토, CI/CD 등이 내장된 오픈 소스의 종단 간 소프트웨어 개발 플랫폼입니다.

이 튜토리얼은 Super Kubenetes에서 GitLab를 배포하는 방법을 보여줍니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. `ws-admin` 계정은 작업공간에서 `workspace-admin` 역할을 부여받아야 하며, `project-regular` 계정은 `operator` 역할로 프로젝트에 초대받아야 합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1 단계: 앱 저장소 추가

1. Super Kubenetes에 `ws-admin`으로 로그인합니다. 워크스페이스에서 **앱 관리** 아래의 **앱 저장소**로 이동한 다음 **추가**를 클릭합니다.

2. 표시된 대화 상자에서, 앱 저장소 이름으로 `main`을 입력하고 앱 저장소 URL로 `https://charts.Super Kubenetes.io/main`을 입력합니다. **유효성 검사**를 클릭하여 URL을 확인하면, 사용 가능한 경우에 URL 옆으로 녹색 체크 표시를 확인할 수 있습니다. 
계속하려면 **확인**을 클릭하세요.

3. 저장소가 Super Kubenetes로 성공적으로 추가된 후 목록에 표시됩니다.

### 2 단계: GitLab 배포 

1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. 프로젝트에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화상자에서, **From App Template**을 선택하세요.

3. 드롭다운 목록에서 `main`을 선택한 다음 **gitlab**을 클릭하세요.

4. **앱 정보** 탭과 **차트 파일** 탭에서 콘솔의 기본 설정을 볼 수 있습니다. 계속하려면 **설치**를 클릭하세요.

5. **기본 정보** 페이지에서 앱 이름, 앱 버전, 배포 위치를 확인할 수 있습니다. 이 튜토리얼은 `4.2.3 [13.2.2]` 버전을 사용합니다. 계속하려면 **다음**을 클릭하세요.

6. **앱 설정** 페이지에서, 아래 설정을 사용하여 기본 설정을 바꾸고, **설치**를 클릭합니다.

    <article className="highlight">
      <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>
                <p>
                  <span style="color:#f92672">global</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">demo-project.svc.cluster.local</span> 
                  <span style="color:#f92672">gitlab-runner</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;install</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">gitlab</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;webservice</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;helmTests</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
                </p>
            </code>
          </div>
      </pre>
    </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `demo-project`는 GitLab이 배포된 프로젝트 이름을 말합니다. 자신 고유의 프로젝트 이름을 사용하세요.
    </div>
  </div>

7. GitLab이 실행될 때까지 기다리세요.

8. **워크로드**로 이동하면 GitLab용으로 생성된 모든 디플로이먼트 및 스테이트풀셋을 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      모든 디플로이먼트 및 스테이트풀셋이 실행되기까지 시간이 걸릴 수 있습니다.
    </div>
  </div>

### 3 단계: 루트 사용자용 암호 얻기

1. **설정**아래에서 **시크릿**으로 이동하여, 검색 상자에 `gitlab-initial-root-password`를 입력한 다음, 키보드에서 **Enter**를 눌러 암호를 검색합니다.

2. 시크릿을 클릭하여 세부 페이지로 이동한 다음, 오른쪽 상단 모서리에서 <img src="/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/eye-icon.png" width="20px" alt="icon" />를 클릭하여 암호를 확인하세요. 이것을 복사해 놓습니다.

### 4 단계: 호스트 파일 편집

1. 로컬 컴퓨터에서 `hosts` 파일을 찾으세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      `hosts` 파일의 경로는 Linux의 경우 `/etc/hosts` 그리고 Windows의 경우 `c:\windows\system32\drivers\etc\hosts` 입니다.
    </div>
  </div>


2. `hosts` 파일에 다음 항목을 추가합니다.

   <article className="highlight">
      <pre style="background: rgb(36, 46, 66);">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									192.168.4.3  gitlab.demo-project.svc.cluster.local
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - `192.168.4.3`과 `demo-project`는 각각 GitLab이 배포된 NodeIP와 프로젝트 이름을 말합니다. 자신 고유의 NodeIP 및 프로젝트 이름을 사용하세요.
      - 쿠버네티스 클러스터에 있는 노드의 모든 IP 주소를 사용할 수 있습니다.
    </div>
  </div>

### 5 단계: GitLab 접속

1. **애플리케이션 워크로드** 아래의 **서비스**로 이동하여, 검색 상자에 `nginx-ingress-controller`를 입력한 다음, 키보드의 **Enter** 키를 눌러 서비스를 검색합니다. GitLab에 액세스하는 데 사용할 수 있는 포트 `31246`을 통해 서비스가 노출된 것을 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      자신의 콘솔에 표시된 포트 번호는 다를 수 있습니다. 자신 고유의 포트 번호를 사용하세요.
    </div>
  </div>


2. 루트 계정과 초기 비밀번호(`root/ojPWrWECLWN0XFJkGs7aAqtitGMJlVfS0fLEDE03P9S0ji34XDoWmxs2MzgZRRWF`)를 사용하여 `http://gitlab.demo-project.svc.cluster.local:31246`을 통해 GitLab에 접속하세요.

   ![access-gitlab](/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/access_gitlab.png)

   ![gitlab-console](/dist/assets/docs/v3.3/appstore/external-apps/deploy-gitlab/gitlab_console.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>

