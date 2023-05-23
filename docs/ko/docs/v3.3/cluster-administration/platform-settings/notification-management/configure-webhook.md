---
title: "웹훅(webhook) 알림 설정"
keywords: 'Super Kubenetes, Kubernetes, custom, platform, webhook'
description: 'Configure a webhook server to receive platform notifications through the webhook.'
linkTitle: "Configure Webhook Notifications"
weight: 8726
---

웹훅은 앱이 특정 이벤트에 의해 트리거되는 알림을 보내는 방법입니다. 실시간으로 다른 애플리케이션에 정보를 전달하여 사용자가 즉시 알림을 받을 수 있도록 합니다.

이 튜토리얼에서는 플랫폼 알림을 수신하도록 웹훅 서버를 설정하는 방법을 설명합니다.

## 사전 준비

`platform-admin` 역할이 부여된 사용자를 준비해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 웹훅 서버 설정

1. Super Kubenetes 웹 콘솔에 `platform-admin` 사용자로 로그인하세요.

2. 좌측 상단의 **플랫폼**을 클릭하고 **플랫폼 설정**을 선택합니다.

3. 왼쪽 탐색 창에서 **알림 관리** 아래의 **알림 설정**을 클릭하고 **웹훅**을 선택합니다.

4. **웹훅** 탭 페이지에서 다음 파라미터를 설정합니다.

   - **웹훅 URL**: 웹훅 서버의 URL입니다.

   - **인증 유형**: 웹훅 인증 방식입니다.
   - **인증 안함**: 인증을 건너뜁니다. 모든 알림은 URL로 보낼 수 있습니다.
   - **Bearer 토큰**: 인증을 위해 토큰을 사용합니다.
   - **기본 인증**: 사용자 이름과 비밀번호를 사용하여 인증합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      현재 Super Kubenetes는 TLS 연결(HTTPS)을 지원하지 않습니다. HTTPS URL을 사용하는 경우 **TLS 확인 건너뛰기(안전하지 않음)**를 선택해야 합니다.
    </div>
  </div>

5. **알림 조건** 왼쪽의 체크박스를 선택하여 알림 조건을 설정합니다.

    - **레이블**: 알림 정책의 이름, 심각도 또는 모니터링 대상입니다. 레이블을 선택하거나 레이블을 사용자 정의할 수 있습니다.
    - **연산자**: 레이블과 값 간의 매핑. 연산자에는 **값 포함**, **값 포함하지 않음**, **있음** 및 **없음**이 포함됩니다.
    - **값**: 레이블과 관련된 값입니다.

    <div className="notices note">
      <p>Note</p>
      <div>
        - 연산자 **값 포함** 및 **값 포함하지 않음**에는 하나 이상의 레이블 값이 필요합니다. 캐리지 리턴을 사용하여 값을 구분합니다.
        - 연산자 **있음** 및 **없음**은 레이블이 있는지 여부를 결정하며 레이블 값이 필요하지 않습니다.
      </div>
    </div>

9. **추가**를 클릭하여 알림 조건을 추가하거나 알림 조건 우측에 있는 <img src="/dist/assets/docs/v3.3/common-icons/trashcan.png" width='25' height='25' alt="icon" /> 를 클릭하여 조건을 삭제하세요.

7. 설정이 완료되면 **테스트 메시지 보내기**를 클릭하여 확인할 수 있습니다.

8. 우측 상단에서 **비활성** 토글을 켜서 알림을 활성화하거나 **활성** 토글을 꺼서 비활성화할 수 있습니다.

9. 완료한 후 **확인**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 알림 조건이 설정되면 수신자는 조건에 맞는 알림만 받게 됩니다.
      - 기존 설정을 변경할 경우 **확인**을 눌러 적용해야 합니다.
    </div>
  </div>
