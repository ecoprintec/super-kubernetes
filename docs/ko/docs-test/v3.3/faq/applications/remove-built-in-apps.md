---
title: "Super Kubenetes에서 내장 앱 제거"
keywords: "Super Kubenetes, OpenPitrix, Application, App"
description: "Learn how to remove built-in apps from the Super Kubenetes App Store."
linkTitle: "Remove Built-in Apps in Super Kubenetes"
Weight: 16910
---

오픈 소스 및 앱 중심 컨테이너 플랫폼인 Super Kubenetes는 [OpenPitrix](https://github.com/openpitrix/openpitrix)를 기반으로 앱 스토어에 앱을 통합합니다. 워크스페이스의 모든 테넌트가 접속할 수 있으며 앱 스토어에서 제거할 수도 있습니다. 이 튜토리얼은 앱 스토어에서 내장 앱을 제거하는 방법을 시연합니다.

## 사전 준비

- 이 튜토리얼에서는 `platform-admin` 역할을 가진 사용자(예: `admin`)를 사용해야 합니다.
- [앱스토어 활성화](../../../pluggable-components/app-store/)가 필요합니다.

## 내장 앱 제거

1. Super Kubenetes의 웹 콘솔에 `admin`으로 로그인하고 왼쪽 상단의 **플랫폼**을 클릭한 다음 **앱 스토어 관리**를 선택하세요.

2. **앱** 페이지에서 목록에 있는 모든 앱을 볼 수 있습니다. 앱 스토어에서 제거하려는 앱을 선택하세요. 예를 들어 **Tomcat**을 클릭하면 세부 정보 페이지로 이동합니다.

3. Tomcat의 상세 페이지에서 **앱 일시 중단**을 클릭하여 앱을 제거합니다.

4. 표시된 대화 상자에서 **확인**을 클릭하여 작업을 확인하세요.

5. 앱 스토어에서 앱을 다시 사용할 수 있게 하려면 **앱 활성화**를 클릭한 다음 **확인**을 클릭하여 작업을 확인하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      필요에 따라 필요한 역할을 가진 새 사용자를 생성할 수도 있습니다. 필요에 따라 필요한 역할을 가진 새 사용자를 생성할 수도 있습니다. Super Kubenetes에서 앱을 관리하는 방법에 대한 자세한 내용은 [애플리케이션 라이프사이클 관리](../../../application-store/app-lifecycle-management/)를 참조하십시오.
    </div>
  </div>
