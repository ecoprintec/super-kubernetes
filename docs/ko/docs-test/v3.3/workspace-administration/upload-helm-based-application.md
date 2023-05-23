---
title: "Helm 기반 애플리케이션 업로드"
keywords: "Kubernetes, Helm, Super Kubenetes, OpenPitrix, Application"
description: "Learn how to upload a Helm-based application as an app template to your workspace."
linkTitle: "Upload Helm-based Applications"
weight: 9200
---

Super Kubenetes는 애플리케이션에 대한 전체 라이프사이클 관리를 제공합니다. 무엇보다도 워크스페이스 관리자는 새 앱 템플릿을 업로드하거나 생성하고 빠르게 테스트할 수 있습니다. 또한 잘 테스트된 앱을 [앱 스토어](../../application-store/)에 게시하여 다른 사용자가 클릭 한 번으로 배포할 수 있도록 합니다. 앱 템플릿을 개발하려면 워크스페이스 관리자가 먼저 Super Kubenetes에 패키징된 [Helm 차트]( https://helm.sh/)를 업로드해야 합니다.

이 튜토리얼은는 패키징된 Helm 차트를 업로드하여 앱 템플릿을 개발하는 방법을 시연합니다.

Super Kubenetes는 애플리케이션에 대한 전체 라이프사이클 관리를 제공합니다. 무엇보다도 워크스페이스 관리자는 새 앱 템플릿을 업로드하거나 생성하고 빠르게 테스트할 수 있습니다. 또한 잘 테스트된 앱을 [앱 스토어](../../application-store/)에 게시하여 다른 사용자가 클릭 한 번으로 배포할 수 있도록 합니다. 앱 템플릿을 개발하려면 워크스페이스 관리자가 먼저 Super Kubenetes에 패키징된 [Helm 차트]( https://helm.sh/)를 업로드해야 합니다.

이 튜토리얼은는 패키징된 Helm 차트를 업로드하여 앱 템플릿을 개발하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes 앱 스토어(OpenPitrix)](../../pluggable-components/app-store/)를 활성화해야 합니다.
- 워크스페이스와 사용자(`project-admin`)를 생성해야 합니다. 사용자는 `workspace-self-provisioner` 역할로 워크스페이스에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 실습실

1. Super Kubenetes에 `project-admin`으로 로그인하세요. 워크스페이스에서 **앱 관리** 아래의 **앱 템플릿**으로 이동하고 **만들기**를 클릭하세요.

2. 표시되는 대화 상자에서 **업로드**를 클릭하세요. 자신의 Helm 차트를 업로드하거나 또는 [Nginx 차트](/files/application-templates/nginx-0.1.0.tgz)를 다운로드하여 다음 단계에서 예시로 사용할 수 있습니다.

3. 패키지가 업로드된 후 **확인**을 클릭하여 계속합니다.

4. **앱 정보**에서 앱의 기본 정보를 확인할 수 있습니다. 앱의 아이콘을 업로드하려면 **아이콘 업로드**를 클릭하세요. 이를 건너뛰고 바로 **확인**을 클릭할 수도 있습니다.
    
<div className="notices note">
  <p>Note</p>
  <div>
    앱 아이콘의 최대 허용 해상도: 96 x 96 픽셀.
  </div>
</div>

5. 앱이 성공적으로 업로드되면 **개발 중** 상태로 템플릿 목록에 앱이 나타나며, 이는 이 앱이 개발 중임을 의미합니다. 업로드된 앱은 동일한 워크스페이스의 모든 멤버에게 표시됩니다.

6. 앱을 클릭하면 **버전** 탭이 선택된 페이지가 열립니다. 초안 버전을 클릭하여 메뉴를 확장하면 **삭제**, **설치**, **출시를 위해 제출** 등의 옵션이 표시됩니다.

7. 앱 스토어에 앱을 출시하는 방법에 대한 자세한 내용은 [애플리케이션 라이프사이클 관리](../../application-store/app-lifecycle-management/#step-2-upload-and-submit -application)를 참조하십시오.
