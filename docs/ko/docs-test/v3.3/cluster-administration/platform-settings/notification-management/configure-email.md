---
title: "이메일 알림 설정"
keywords: 'Super Kubenetes, Kubernetes, custom, platform'
description: 'Configure a email server and add recipients to receive email notifications.'
linkTitle: "Configure Email Notifications"
weight: 8722
---

이 튜토리얼에서는 이메일 서버를 설정하고 알림 정책에 대한 이메일 알림을 받을 수신자를 추가하는 방법을 시연합니다.

## 이메일 서버 설정

1. `platform-admin` 역할이 부여된 사용자로 웹 콘솔에 로그인하세요.

2. 좌측 상단의 **플랫폼**을 클릭하고 **플랫폼 설정**을 선택합니다.

3. **알림 관리**에서 **알림 설정**으로 이동한 다음 **이메일**을 선택합니다.

4. **서버 설정**에서 다음 영역을를 채워 이메일 서버를 설정합니다.

   - **SMTP 서버 주소**: 이메일 서비스를 제공하는 SMTP 서버 주소입니다. 포트는 일반적으로 `25`입니다.
   - **SSL 보안 연결 사용**: SSL을 사용하여 이메일을 암호화할 수 있으므로 이메일로 전송되는 정보의 보안이 향상됩니다. 일반적으로 이메일 서버에 대한 인증서를 설정해야 합니다.
   - **SMTP 사용자 이름**: SMTP 계정입니다.
   - **SMTP 비밀번호**: SMTP 계정 비밀번호입니다.
   - **발신자 이메일 주소**: 발신자의 이메일 주소입니다.

5. **확인**을 클릭하세요.

## 수신자 설정

### 수신자 추가

1. **받는 사람 설정**에서 받는 사람의 이메일 주소를 입력하고 **추가**를 클릭하세요.

2. 추가되면 **받는 사람 설정** 아래에 받는 사람의 이메일 주소가 나열됩니다. 수신자를 최대 50명까지 추가할 수 있으며 모두 이메일 알림을 받을 수 있습니다.

3. 수신자를 제거하려면 제거하려는 이메일 주소 위로 마우스를 가져간 다음 <img src="/dist/assets/docs/v3.3/common-icons/trashcan.png" width="25" height="25" alt="icon" />를 클릭하세요. 


### 알림 조건 설정

1. **알림 조건** 왼쪽의 체크박스를 선택하여 알림 조건을 설정합니다.

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

2. **추가**를 클릭하여 알림 조건을 추가할 수 있습니다.

3. 우측의 <img src="/dist/assets/docs/v3.3/common-icons/trashcan.png" width=`25` height=`25` alt="icon" />을 클릭할 수 있습니다. 조건을 삭제하는 알림 조건입니다.

4. 설정이 완료되면 **테스트 메시지 보내기**를 클릭하여 확인할 수 있습니다.

5. 우측 상단에서 **비활성화됨** 토글을 켜서 알림을 활성화하거나 **활성화됨** 토글을 꺼서 비활성화할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 알림 조건이 설정되면 수신자는 조건에 맞는 알림만 받게 됩니다.
      - 기존 설정을 변경할 경우 **확인**을 눌러 적용해야 합니다.
    </div>
  </div>


## 이메일 알림 수신

이메일 서버를 설정하고 수신자를 추가한 후 [Super Kubenetes Alerting](../../../../pluggable-components/alerting/)을 활성화하고 워크로드 또는 노드에 대한 알림 정책을 생성해야 합니다. 트리거되면 모든 수신자가 이메일 알림을 받을 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    - 이메일 서버 설정을 업데이트하면 Super Kubenetes는 최신 설정을 기반으로 이메일 알림을 보냅니다.
    - 기본적으로 Super Kubenetes는 동일한 경고에 대해 약 12시간마다 알림을 보냅니다. 알림 반복 간격은 주로 `Super Kubenetes-monitoring-system` 프로젝트의 Secret `alertmanager-main`에 있는 `repeat_interval`에 의해 제어됩니다. 필요에 따라 간격을 사용자 정의할 수 있습니다.
    - Super Kubenetes에는 기본 제공 알림 정책이 있기 때문에, 사용자 지정 알림 정책을 설정하지 않더라도, 기본 제공 알림 정책이 작동되면 수신자가 이메일 알림을 받을 수 있습니다.
  </div>
</div>


