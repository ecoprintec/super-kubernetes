---
title: "코드 저장소 가져오기"
keywords: 'Kubernetes, GitOps, Super Kubenetes, Code Repository'
description: 'Describe how to import a code repository on Super Kubenetes.'
linkTitle: "Import a Code Repository"
weight: 11231
---

Super Kubenetes 3.3.0에서는 GitHub, GitLab, Bitbucket 또는 Git 기반 저장소를 가져올 수 있습니다. 다음은 GitHub 저장소를 가져오는 방법을 시연합니다.

## 사전 준비

- 워크스페이스, DevOps 프로젝트, DevOps 프로젝트에 `operator` 역할로 초대된 사용자(`project-regular`)가 있어야 합니다. 아직 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.


## 절차

1. Super Kubenetes 콘솔에 `project-regular`로 로그인하세요. 왼쪽 탐색 창에서 **DevOps 프로젝트**를 클릭하세요.

2. **DevOps 프로젝트** 페이지에서 생성한 DevOps 프로젝트를 클릭하세요.

3. 왼쪽 탐색 창에서 **코드 저장소**를 클릭하세요.

4. **코드 저장소** 페이지에서 **가져오기**를 클릭하세요.

5. **코드 저장소 가져오기** 대화 상자에서 코드 저장소 이름을 입력하고 GitHub 저장소를 선택하세요. 선택적으로 별칭을 설정하고 설명을 추가할 수 있습니다.

   다음 표에는 설정할 수 있는 지원되는 코드 저장소 및 파라미터가 나와 있습니다.

  <table border="1">
  <tbody>
  <tr>
    <th width="20%">
      코드 저장소
    </th>
    <th>
      파라미터
    </th>
  </tr>
  <tr>
    <td>
      GitHub
    </td>
    <td>
      <b>자격 증명</b>: 코드 저장소의 자격 증명을 선택합니다.
    </td>
  </tr>
  <tr>
    <td>
      GitLab
    </td>
    <td>
      <ul>
        <li><b>GitLab 서버 주소</b>: GitLab 서버 주소를 선택하고 기본값은 <b>https:gitlab.com</b>입니다.</li>
        <li><b>프로젝트 그룹/소유자</b>: GitLab 사용자 이름을 입력합니다.</li>
        <li><b>자격 증명</b>: 코드 저장소의 자격 증명을 선택합니다.</li>
        <li><b>코드 저장소</b>: 코드 저장소를 선택합니다.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      Bitbucket
    </td>
    <td>
      <ul>
        <li><b>Bitbucket 서버 주소</b>: Bitbucket 서버 주소를 설정합니다.</li>
        <li><b>자격 증명</b>: 코드 저장소의 자격 증명을 선택합니다.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      Git
    </td>
    <td>
      <ul>
        <li><b>Code 저장소 URL</b> code 저장소의 URL을 입력합니다.</li>
        <li><b>자격 증명</b>: 코드 저장소의 자격 증명을 선택합니다.</li>
      </ul>
    </td>
  </tr>
  </tbody>
  </table>

  <div className="notices note">
    <p>Note</p>
    <div>
      프라이빗 GitLab 저장소를 사용하려면 [GitLab으로 멀티 브랜치 파이프라인 생성-4단계](../../../../devops-user-guide/how-to-use/pipelines/ gitlab-multibranch-pipeline/)를 참조하십시오.
    </div>
  </div>


6. **자격 증명**에서 **자격 증명 생성**를 클릭하세요. **자격 증명 생성** 대화 상자에서 다음 파라미터를 설정하세요.
   - **이름**: 자격 증명의 이름을 입력합니다(예: `github-id`).
   - **유형**: **사용자 이름 및 비밀번호**, **SSH 키**, **액세스 토큰**, **kubeconfig**가 옵션 값입니다. DevOps 프로젝트에서는 **사용자 이름 및 비밀번호**가 권장됩니다.
   - **사용자 이름**: 기본 사용자 이름은 `admin`입니다.
   - **비밀번호/토큰**: GitHub 토큰을 입력합니다.
   - **설명**: 설명을 추가합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      자격 증명 생성 방법에 대한 자세한 내용은 [자격 증명 관리](../../../../devops-user-guide/how-to-use/devops-settings/credential-management/)를 참조하세요.
    </div>
  </div>


7. 표시된 GitHub 저장소에서 저장소를 선택하고 **확인**을 클릭하세요.

8. 가져온 코드 저장소 오른쪽의 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />를 클릭하고, 다음 작업을 수행할 수 있습니다.

   - **편집**: 코드 저장소의 별칭 및 설명을 편집하고 코드 저장소를 다시 선택합니다.
   - **YAML 편집**: 코드 저장소의 YAML 파일을 편집합니다.
   - **삭제**: 코드 저장소를 삭제합니다.


