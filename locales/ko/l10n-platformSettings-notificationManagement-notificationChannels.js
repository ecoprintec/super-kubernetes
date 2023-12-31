/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  "NOTIFICATION_MANAGEMENT": "알림 관리",
  "NOTIFICATION_CONFIGURATION": "알림 구성",
  "NOTIFICATION_CONFIGURATION_DESC": "Super Kubenetes는 여러 알림 채널에 대한 알림 구성을 지원합니다. 서버 및 수신자를 설정하고 알림을 활성화 또는 비활성화할 수 있습니다.",
  "NOTIFICATION_EMAIL": "이메일",
  "NOTIFICATION_CHANNELS": "알림 채널",
  "NOTIFICATION_CHANNELS_DESC": "리소스 측정항목이 알림 정책에 구성된 조건 및 기간을 충족할 때 사용자에게 알림이 전송되도록 알림 수신자를 설정합니다.",
  "MAIL_TITLE": "이메일",
  "MAIL_DESC": "서버 및 수신자를 설정하여 이메일 알림을 구성합니다.",
  "INVALID_PORT_DESC": "올바른 포트 번호를 입력하세요.",
  "ENTER_PORT_NUMBER": "포트 번호를 입력하세요.",
  "ALERTING_NAME": "경고 이름",
  "ALERTING_SEVERITY": "경고 심각도",
  "ADDRESS_EMPTY_DESC": "주소를 입력하세요.",
  "EMAIL_EMPTY_DESC": "이메일 주소를 입력 해주세요.",
  "SERVER_SETTINGS": "서버 설정",
  "RECIPIENT_SETTINGS": "받는 사람 설정",
  "FILTER_CONDITIONS": "필터 조건",
  "NOTIFICATION_CONDITIONS": "통지조건",
  "CONTAINER": "컨테이너",
  "VALUES": "가치",
  "CONDITION_OPERATOR": "작업자",
  "NOTIFICATION_CONDITION_SETTING_TIP": "연산자 <strong>값 포함</strong> 및 <b>값 포함하지 않음</b>에는 하나 이상의 레이블 값이 필요합니다. 캐리지 리턴을 사용하여 값을 구분합니다.</br>연산자 <b>존재함</b> 및 <b>존재하지 않음</b>은 레이블이 있는지 여부를 결정하며 레이블 값이 필요하지 않습니다.",
  "NOTIFICATION_CONDITION_SETTINGS_DESC": "조건에 맞는 알림만 받습니다.",
  "CONTAIN": "포함하다",
  "NOT_CONTAIN": "포함하지 않음",
  "EXIST": "존재하다",
  "NOT_EXIST": "존재하지 않음",
  "INCLUDES_VALUES": "값 포함",
  "DOES_NOT_INCLUDE_VALUES": "값을 포함하지 않음",
  "EXISTS": "존재",
  "DOES_NOT_EXIST": "존재하지 않음",
  "TAG_INPUT_PLACEHOLDER": "값을 입력하고 Enter를 눌러 확인하십시오",
  "PATTERN_TAG_INVALID_TIP": "잘못된 레이블입니다. 레이블에는 대문자 및 소문자, 숫자, 하이픈(-), 밑줄(_) 및 점(.)만 포함될 수 있으며 대문자 또는 소문자 또는 숫자로 시작하고 끝나야 합니다.",
  "PATTERN_TAG_VALUE_INVALID_TIP": "잘못된 레이블 값입니다. 레이블 값은 대문자와 소문자, 숫자, 하이픈(-), 밑줄(_) 및 점(.)만 포함할 수 있으며 대문자 또는 소문자 또는 숫자로 시작하고 끝나야 하며 최대 63자여야 합니다.",
  "INVALID_NOTIFICATION_CONDITION": "올바른 알림 조건을 입력하세요.",
  "SEND_TEST_MESSAGE": "테스트 메시지 보내기",
  "SEND_TEST_MESSAGE_DESC": "구성이 완료되면 확인을 위해 테스트 메시지를 보낼 수 있습니다.",
  "SEND_TEST_MESSAGE_SUCCESS_DESC": "성공적으로 확인되었습니다. 테스트 메시지가 전송되었습니다. 확인하십시오.",
  "SMTP_SERVER_ADDRESS": "SMTP 서버 주소",
  "USE_SSL_SECURE_CONNECTION": "SSL 보안 연결 사용",
  "SENDER_EMAIL": "발신자 이메일 주소",
  "INVALID_EMAIL": "잘못된 이메일 주소 형식입니다.",
  "INVALID_ADDRESS_DESC": "올바른 주소를 입력하세요.",
  "MAX_EAMIL_COUNT": "최대 {count}개의 이메일을 추가할 수 있습니다.",
  "SMTP_USER": "SMTP 사용자 이름",
  "SMTP_PASSWORD": "SMTP 비밀번호",
  "ENTER_PASSWORD_TIP": "비밀번호를 입력하세요.",
  "ENTER_RECIPIENT_EMAIL_DESC": "받는 사람의 이메일 주소를 하나 이상 추가하십시오.",
  "INVALID_EMAIL_ADDRESS_DESC": "이메일 형식이 잘못되었습니다. 정확한 이메일 주소를 입력하세요.",
  "SMTP_USER_EMPTY_DESC": "SMTP 사용자 이름을 입력하십시오.",
  "ADDED_SUCCESS_DESC": "성공적으로 추가되었습니다.",
  "POD": "Pod",
  "UPDATE_SUCCESSFUL": "업데이트되었습니다.",
  "DINGTALK_TITLE": "DingTalk",
  "DingTalk": "DingTalk",
  "DINGTALK_DESC": "Send notifications to DingTalk users.",
  "PLEASE_ENTER_VALUE_CUSTOM": "{value}을 입력해주세요.",
  "FEISHU": "Feishu",
  "FEISHU_TITLE": "Feishu",
  "FEISHU_DESC": "Send notifications to Feishu users.",
  "PLEASE_ENTER_APP_ID": "앱 ID를 입력해주세요.",
  "DINGTALK": "DingTalk",
  "CONVERSATION_SETTINGS": "대화 설정",
  "CONVERSATION_ID": "대화 ID",
  "CONVERSATION_ID_TIP": "대화 ID는 시스템 관리자가 구성한 후에만 얻을 수 있습니다. 대화 ID를 구성하려면 시스템 관리자에게 문의하십시오.",
  "DINGTALK_SETTING_TIP": "Please set up a chat or group chatbot.",
  "ENTER_CONVERSATION_ID_DESC": "대화 ID를 입력하십시오.",
  "MAX_CID_COUNT": "최대 {count}개의 채팅 ID를 추가할 수 있습니다.",
  "CONVERSATION_ID_EXISTS": "대화 ID가 이미 있습니다. 다른 대화 ID를 추가하십시오.",
  "PLEASE_ENTER_APP_KEY": "앱 키를 입력하세요.",
  "PLEASE_ENTER_APP_SECRET": "앱 비밀번호를 입력하세요.",
  "PLEASE_ENTER_CHAT_ID": "채팅 아이디를 입력해주세요.",
  "PLEASE_ENTER_WEBHOOK_URL": "웹훅 URL을 입력하세요.",
  "CHAT_SETTINGS": "채팅 설정",
  "CHAT_ID_TIP": "Contact the DingTalk administrator to obtain the chat ID.",
  "ENTER_CHAT_ID_DESC": "채팅 아이디를 입력해주세요.",
  "CHAT_ID_EXISTS": "채팅 ID가 이미 존재합니다. 다른 채팅 ID를 추가하세요.",
  "CHATBOT_SETTINGS": "DingTalk 챗봇",
  "KEYWORDS_LIST": "키워드 목록",
  "DINGTALK_CHATBOT_SECURITY_TIP": "Secret 또는 키워드를 입력하십시오.",
  "ENTER_KEYWORD_DESC": "키워드를 입력하십시오.",
  "MAX_KEYWORD_COUNT": "최대 {count}개의 키워드를 추가할 수 있습니다.",
  "KEYWORD_EXISTS": "키워드가 이미 있습니다. 다른 키워드를 추가하십시오.",
  "EMPTY_KEYWORDS_DESC": "키워드가 추가되지 않았습니다.",
  "DINGTALK_SECRET": "Secret",
  "WECOM": "WeCom",
  "WECOM_TITLE": "WeCom",
  "WECOM_DESC": "서버와 수신자를 설정하여 WeCom 알림을 구성합니다.",
  "WECOM_CORP_ID": "회사 ID",
  "WECOM_AGENT_ID": "App AgentId",
  "WECOM_SECRET": "앱 Secret",
  "RECIPIENT_SETTINGS_TIP": "알림을 받으려면 적어도 하나의 항목을 구성해야 합니다.",
  "ENTER_WECOM_CORP_ID_DESC": "회사 ID를 입력하십시오.",
  "ENTER_WECOM_AGENT_ID_DESC": "에이전트Id에 응용 프로그램을 입력하십시오.",
  "ENTER_WECOM_SECRET_DESC": "응용 프로그램 암호를 입력하십시오.",
  "USER_ID": "사용자 ID",
  "TOUSER_LIST": "사용자 ID 추가",
  "WECOM_TOUSER_PLACEHOLDER": "사용자 ID",
  "EMPTY_TOUSER_DESC": "사용자 ID가 추가되지 않았습니다.",
  "ENTER_TOUSER_TIP": "사용자 ID를 입력하십시오.",
  "TOUSER_EXISTS": "사용자 ID가 이미 있습니다. 다른 사용자 ID를 입력하십시오.",
  "MAX_TOUSER_COUNT": "최대 {count}명의 사용자를 추가할 수 있습니다.",
  "DEPARTMENT_ID": "부서 ID",
  "WECOM_TOPARTY_PLACEHOLDER": "부서 ID",
  "TOPARTY_LIST": "부서 ID 추가",
  "EMPTY_TOPARTY_DESC": "부서 ID가 추가되지 않았습니다.",
  "ENTER_TOPARTY_TIP": "부서 ID를 입력하십시오.",
  "TOPARTY_EXISTS": "부서 ID가 이미 있습니다. 다른 부서 ID를 입력하십시오.",
  "MAX_TOPARTY_COUNT": "최대 {count}개의 부서를 추가할 수 있습니다.",
  "TAG_ID": "태그 ID",
  "TOTAG_LIST": "태그 ID 추가",
  "WECOM_TOTAG_PLACEHOLDER": "태그 ID",
  "EMPTY_TOTAG_DESC": "태그 ID가 추가되지 않았습니다.",
  "ENTER_TOTAG_TIP": "태그 ID를 입력하십시오.",
  "TOTAG_EXISTS": "태그 ID가 이미 있습니다. 다른 태그 ID를 입력하십시오.",
  "MAX_TOTAG_COUNT": "태그는 최대 {count}개까지 추가할 수 있습니다.",
  "SLACK": "Slack",
  "SLACK_TITLE": "Slack",
  "SLACK_DESC": "서버 및 Slack 채널을 설정하여 Slack 알림을 구성합니다.",
  "SLACK_TOKEN": "Slack 토큰",
  "SLACK_TOKEN_DESC": "Slack 토큰을 입력하십시오.",
  "SLACK_CHANNEL": "Slack 채널",
  "CHANNEL_SETTINGS": "채널 설정",
  "ADDED_CHANNELS": "채널 추가",
  "EMPTY_CHANNEL_DESC": "추가된 채널이 없습니다.",
  "ADD_CHANNEL_TIP": "Please add a Slack channel.",
  "ADD_CHANNEL_DESC": "채널을 추가하십시오.",
  "CHANNEL_EXISTS": "채널은 이미 존재합니다. 다른 채널을 추가하십시오.",
  "CHANNEL_SETTINGS_DESC": "채널을 추가하십시오.",
  "MAX_CHANNEL_COUNT": "최대 {count}개의 채널을 추가할 수 있습니다.",
  "WEBHOOK": "Webhook",
  "WEBHOOK_TITLE": "Webhook",
  "WEBHOOK_DESC": "웹훅 서버를 설정하여 웹훅 알림을 구성합니다.",
  "WEBHOOK_URL_DESC": "Webhook URL을 입력하십시오.",
  "VERIFICATION_TYPE": "확인 유형",
  "AUTHENTICATION_TYPE": "Authentication Type",
  "AUTHENTICATION_TYPE_DESC": "Please select an authentication type.",
  "SKIP_TLS_VERFICATION": "TLS 확인 건너뛰기(보안에 취약)",
  "VERIFICATION_TYPE_DESC": "확인 유형을 선택하십시오.",
  "BASIC_AUTH": "기본 인증",
  "NO_AUTH": "인증 없음",
  "BEARER_TOKEN": "베어러 토큰",
  "TOKEN": "토큰",
  "WEBHOOK_USERNAME_EMPTY_DESC": "사용자 이름을 입력하십시오.",
  "WEBHOOK_PASSWORD_EMPTY_DESC": "암호를 입력하십시오.",
  "WEBHOOK_TOKEN_EMPTY_DESC": "토큰을 입력하십시오."
}