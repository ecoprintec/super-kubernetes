---
title: '파이프라인 템플릿 사용'
keywords: 'Super Kubenetes, Kubernetes, Jenkins, Graphical Pipelines, Pipeline Templates'
description: 'Understand how to use pipeline templates on Super Kubenetes.'
linkTitle: 'Use Pipeline Templates'
weight: 11213
---

Super Kubenetes는 Jenkins 파이프라인의 스테이지와 스텝을 대화식 작업을 통해 정의할 수 있는 그래픽 편집 패널을 제공합니다. Super Kubenetes 3.3.0은 Node.js, Maven, Golang과 같은 기본 제공 파이프라인 템플릿을 제공하여 사용자가 파이프라인을 빠르게 생성할 수 있도록 합니다. 또한 Super Kubenetes 3.3.0은 기업의 다양한 요구 사항을 충족하기 위해 파이프라인 템플릿 사용자 지정도 지원합니다.

이 섹션에서는 Super Kubenetes에서 파이프라인 템플릿을 사용하는 방법을 시연합니다.

## 사전 준비

- 워크스페이스, DevOps 프로젝트, DevOps 프로젝트에 `operator` 역할로 초대된 사용자(`project-regular`)가 있어야 합니다. 아직 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

- [Super Kubenetes DevOps 시스템 활성화](../../../../pluggable-components/devops/)가 필요합니다.

- [파이프라인 생성](../../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/)이 필요합니다.

## 내장 파이프라인 템플릿 사용

다음은 Node.js를 예시로 기본 제공 파이프라인 템플릿을 사용하는 방법을 시연합니다. Maven과 Golang 파이프라인 템플릿을 사용하는 방법도 이와 유사합니다.

1. Super Kubenetes 콘솔에 `project-regular`로 로그인하세요. 왼쪽 탐색 창에서 **DevOps 프로젝트**를 클릭하세요.

2. **DevOps 프로젝트** 페이지에서 생성한 DevOps 프로젝트를 클릭하세요.

3. 왼쪽 탐색 창에서 **파이프라인**을 클릭하세요.

4. 오른쪽의 파이프라인 목록에서 생성된 파이프라인을 클릭하여 세부 정보 페이지로 이동하세요.

5. 오른쪽 창에서 **파이프라인 편집**을 클릭하세요.

6. **파이프라인 생성** 대화 상자에서 **Node.js**를 클릭한 후 **다음**을 클릭하세요.

7) **파라미터 설정** 탭에서 실제 상황에 따라 파라미터를 설정한 후 **생성**을 클릭하세요.

   <style>
    table th:first-of-type {
        width: 20%;
    }
    table th:nth-of-type(2) {
        width: 80%;
    }
    </style>
   <table>
   <thead>
   <tr>
      <th>
         파라미터
      </th>
      <th>
         의미
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         GitURL
      </td>
      <td>
         복제할 프로젝트 저장소의 URL
      </td>
   </tr>
   <tr>
      <td>
         GitRevision
      </td>
      <td>
         체크아웃할 개정판
      </td>
   </tr>
   <tr>
      <td>
         NodeDockerlmage
      </td>
      <td>
         Node.js의 Docker 이미지 버전
      </td>
   </tr>
   <tr>
      <td>
         InstallScript
      </td>
      <td>
         종속성 설치를 위한 셸 스크립트
      </td>
   </tr>
   <tr>
      <td>
         TestScript
      </td>
      <td>
         테스트용 셸 스크립트
      </td>
   </tr>
   <tr>
      <td>
         BuildScript
      </td>
      <td>
         프로젝트 빌드를 위한 셸 스크립트
      </td>
   </tr>
   <tr>
      <td>
         ArtifactsPath
      </td>
      <td>
         아티팩트가 있는 경로
      </td>
   </tr>
   </tbody>
   </table>

8) 왼쪽 창에서 시스템은 여러 스텝을 미리 설정하고 더 많은 스텝과 병렬 스테이지를 추가할 수 있습니다.

9) 특정 스텝를 클릭하세요. 오른쪽 창에서 다음 작업을 수행할 수 있습니다.

   - 스테이지 이름 변경.
   - 스테이지 삭제.
   - 에이전트 유형 설정.
   - 조건 추가
   - 작업을 수정하거나 삭제.
   - 스텝 또는 중첩 스텝을 추가.

<div className="notices note">
  <p>Note</p>
  <div>
    필요에 따라 파이프라인 템플릿의 스테이지와 스텝을 사용자 지정할 수도 있습니다. 그래픽 편집 패널 사용 방법에 대한 자세한 내용은 [그래픽 편집 패널을 사용하여 파이프라인 생성](../create-a-pipeline-using-graphical-editing-panel/)을 참조하십시오.
  </div>
</div>

10. 왼쪽 **에이전트** 영역에서 에이전트 유형을 선택하고 **확인**을 클릭하세요. 기본값은 **쿠버네티스**입니다.

    다음 표에서는 에이전트 유형을 설명합니다.


    <style>
    table th:first-of-type {
        width: 20%;
    }
    table th:nth-of-type(2) {
        width: 80%;
    }
    </style>

   <table>
   <thead>
   <tr>
      <th>
         에이전트 유형
      </th>
      <th>
         설명
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         any
      </td>
      <td>
         기본 파드 템플릿을 사용하여 파이프라인을 실행할 Jenkins 에이전트 생성.
      </td>
   </tr>
   <tr>
      <td>
         node
      </td>
      <td>
         특정 레이블이 있는 파드 템플릿을 사용하여 파이프라인을 실행할 Jenkins 에이전트를 생성. 사용 가능한 레이블에는 base, java, nodejs, maven, go 등이 있습니다.
      </td>
   </tr>
   <tr>
      <td>
         kubernetes
      </td>
      <td>
         yaml 파일을 통해 표준 쿠버네티스 파드 템플릿을 사용자 지정하여, 파이프라인을 실행할 젠킨스 에이전트를 생성합니다.
      </td>
   </tr>
   </tbody>
   </table>

11. 파이프라인 세부 정보 페이지에서 생성된 파이프라인 템플릿을 볼 수 있습니다. **실행**을 클릭하여 파이프라인을 실행하세요.

## 기존 내장 파이프라인 템플릿

이전 버전에서 Super Kubenetes는 CI 및 CI 및 CD 파이프라인 템플릿도 제공합니다. 그러나 두 템플릿은 사용자 지정이 거의 불가능하므로 Node.js, Maven 또는 Golang 파이프라인 템플릿을 사용하거나 필요에 따라 템플릿을 직접 사용자 지정하는 것이 좋습니다.
다음은 CI 및 CI & CD 파이프라인 템플릿을 간략하게 소개합니다.

- CI 파이프라인 템플릿

  ![ci-template](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/ci-template.png)

  ![ci-stages](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/ci-stages.png)

  CI 파이프라인 템플릿에는 두 단계가 있습니다. **코드 복제** 단계는 코드를 확인하고 **빌드 & 푸시** 단계는 이미지를 빌드하고 Docker Hub에 푸시합니다. 코드 저장소 및 Docker Hub 레지스트리에 대한 자격 증명을 미리 만든 다음 해당 단계에서 저장소의 URL과 이러한 자격 증명을 설정해야 합니다. 편집을 마치면 파이프라인을 실행할 준비가 된 것입니다.

- CI & CD 파이프라인 템플릿

![cicd-template](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/cicd-template.png)

![cicd-stages](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/cicd-stages.png)

CI & CD 파이프라인 템플릿에는 여섯 스테이지가 있습니다. 각 스테이지에 대한 자세한 내용은 [Jenkinsfile을 사용하여 파이프라인 생성](../create-a-pipeline-using-jenkinsfile/#pipeline-overview)을 참조하면, 유사한 스테이지와 설명을 찾아 볼 수 있습니다. 코드 저장소, Docker gjqm 레지스트리 및 클러스터의 kubeconfig에 대한 자격 증명을 미리 만든 다음 해당 단계에서 저장소의 URL과 이러한 자격 증명을 설정해야 합니다. 편집을 마치면, 이제 파이프라인이 실행될 준비가 되었습니다.
