---
title: "Slack 알림 설정"
keywords: 'Super Kubenetes, Kubernetes, Slack, notifications'
description: 'Configure Slack notifications and add channels to receive notifications from alerting policies, kube-events, and kube-auditing.'
linkTitle: "Configure Slack Notifications"
weight: 8725
---

이 튜토리얼에서는 Slack 알림을 설정하고 알림 정책에 대한 알림을 받을 수 있는 채널을 추가하는 방법을 시연합니다.

## 사전 준비

사용 가능한 [Slack](https://slack.com/) 워크스페이스가 있습니다.

## Slack OAuth 토큰 받기

Slack 채널에 알림을 보내는 데 도움이 되도록 먼저 Slack 앱을 만들어야 합니다. 앱을 인증하려면 OAuth 토큰을 생성해야 합니다.

1. Slack에 로그인하여 [앱 생성](https://api.slack.com/apps)을 합니다.

2. **내 앱** 페이지에서 **새 앱 만들기**를 클릭하세요.

3. 표시되는 대화 상자에서 앱 이름을 입력하고 해당 앱에 대한 Slack 워크스페이스를을 선택합니다. 계속하려면 **앱 만들기**를 클릭하세요.

4. 왼쪽 탐색 모음에서 **기능** 아래의 **OAuth 및 권한**을 선택합니다. **인증 및 권한** 페이지에서 **범위**까지 아래로 스크롤하고 **봇 토큰 범위** 및 **사용자 토큰 범위**에서 각각 **OAuth 범위 추가**를 클릭하세요. 두 범위에 대해 **chart:write** 권한을 선택합니다.

5. **OAuth 토큰 및 리디렉션 URL**까지 스크롤하고 **워크스페이스에 설치**를 클릭하세요. 앱의 워크스페이스에 액세스할 수 있는 권한을 부여하면 **OAuth Tokens for Your Team**에서 생성된 토큰을 찾을 수 있습니다.

## Super Kubenetes 콘솔에서 Slack 알림 설정

Super Kubenetes가 채널에 알림을 보낼 수 있도록 인증을 위해 콘솔에 Slack 토큰을 제공해야 합니다.

1. `platform-admin` 역할이 부여된 사용자로 웹 콘솔에 로그인하세요.

2. 좌측 상단의 **플랫폼**을 클릭하고 **플랫폼 설정**을 선택합니다.

3. **알림 관리**에서 **Slack**으로 이동합니다.

4. **Server Settings** 아래의 **Slack Token**의 경우 인증을 위해 User OAuth Token 또는 Bot User OAuth Token을 입력할 수 있습니다. 사용자 OAuth 토큰을 사용하는 경우 Slack 채널에 알림을 보내는 것은 앱 소유자입니다. Bot User OAuth Token을 사용하면 알림을 보내는 앱입니다.

5. **채널 설정**에서 알림을 수신할 Slack 채널을 입력하고 **추가**를 클릭하세요.

6. 추가되면 **채널 목록** 아래에 채널이 나열됩니다. 최대 20개의 채널을 추가할 수 있으며 모든 채널에서 경고 알림을 받을 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      목록에서 채널을 제거하려면 채널 옆에 있는 십자 아이콘을 클릭하세요.
    </div>
  </div>


7. **저장**을 클릭하세요.

8. **알림 조건** 왼쪽의 체크박스를 선택하여 알림 조건을 설정합니다.

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

10. 설정이 완료되면 **테스트 메시지 보내기**를 클릭하여 확인할 수 있습니다.

11. 알림이 Slack 채널로 전송되도록 하려면 **알림 받기**를 켜고 **업데이트**를 클릭하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    - 알림 조건이 설정되면 수신자는 조건에 맞는 알림만 받게 됩니다.
    - 기존 설정을 변경할 경우 **확인**을 눌러 적용해야 합니다.
  </div>
</div>

9. 앱을 알림 발신자로 사용하려면 해당 앱이 채널에 있는지 확인하세요. Slack 채널에 추가하려면 채널에 `/invite @<app-name>`을 입력하세요.

## Slack 알림 받기

Slack 알림을 설정하고 채널을 추가한 후에는 [Super Kubenetes Alerting](../../../../pluggable-components/alerting/)을 활성화하고 워크로드 또는 노드에 대한 알림 정책을 생성해야 합니다. 트리거되면 목록의 모든 채널이 알림을 받을 수 있습니다.

아래 이미지는 Slack 알림 예시입니다:

<div className="notices note">
  <p>Note</p>
  <div>
    - Slack 알림 설정을 업데이트하면 Super Kubenetes는 최신 설정을 기반으로 알림을 보냅니다.
    - 기본적으로 Super Kubenetes는 동일한 경고에 대해 약 12시간마다 알림을 보냅니다. 알림 반복 간격은 주로 `Super Kubenetes-monitoring-system` 프로젝트의 Secret `alertmanager-main`에 있는 `repeat_interval`에 의해 제어됩니다. 필요에 따라 간격을 사용자 정의할 수 있습니다.
    - Super Kubenetes에는 기본 제공 알림 정책이 있기 때문에, 사용자 지정 알림 정책을 설정하지 않더라도, 기본 제공 알림 정책이 작동되면 수신자가 이메일 알림을 받을 수 있습니다.
  </div>
</div>
