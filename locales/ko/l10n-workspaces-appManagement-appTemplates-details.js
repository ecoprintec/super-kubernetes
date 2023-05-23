/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                       you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 *  Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with  Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  // Edit
  MODIFY_SUCCESSFUL: '수정되었습니다.',
  SERVICE_PROVIDER_WEBSITE_DESC: '서비스 제공자의 공식 웹사이트 주소',
  WRONG_ADDRESS_TIP: '잘못된 주소 형식입니다. 정확한 주소를 입력하세요.',
  APP_NAME_DESC: '최대한 20개의 기능을 제공하고 있습니다.',
  APP_DESCRIPTION_DESC: '설명은 모든 문자를 포함할 수 있으며 최대 길이는 120자입니다.',
  APP_ICON_FORMAT: '형식: PNG 또는 JPG',
  APP_ICON_SIZE: '크기: 96 x 96픽셀',
  CHOOSE_APP_CATEGORY_DESC: '앱 카테고리를 선택하세요.',
  EDIT_APP_DESC: '앱 템플릿의 기본 정보를 수정합니다.',
  ICON: '아이콘',
  SERVICE_PROVIDER_WEBSITE_TCAP: '서비스 제공자 웹사이트',
  START_EDITING: '편집 시작...',
  SCREENSHOTS_COLON: '스크린샷: ',
  DELETE_ALL: '모두 삭제',
  // More > Install
  // More > Upload Version
  ADD_VERSION_SUCCESSFUL: '버전이 성공적으로 추가되었습니다.',
  UPLOAD_PACKAGE_OK_NOTE: '버전이 이미 존재합니다. 다른 버전을 업로드하십시오.',
  UPLOAD_NEW_VERSION: '업로드 버전',
  UPLOAD_NEW_VERSION_DESC: '앱 템플릿의 새 버전을 업로드합니다.',
  // More > Delete
  DELETE_APP_TEMPLATE_DESC: '이 작업의 위험을 이해하고 있음을 확인하려면 앱 템플릿 이름 <b>{resource}</b>을 입력하세요.',
  DELETE_APP_TEMPLATE_VERSIONS_DESC: '이 작업의 위험을 이해하고 있음을 확인하려면 앱 템플릿 이름 <b>{resource}</b>을 입력하세요. 앱 템플릿을 삭제하기 전에 템플릿의 모든 버전을 삭제해야 합니다.',
  APP_TEMPLATE_LOW: '앱 템플릿',
  // Details
  // Versions
  APP_STATUS_SUBMITTED: '제출된',
  APP_STATUS_NOT_SUBMITTED: '제출하지 않은',
  VERSION_INFO: '버전 정보',
  INSTALL: '설치',
  SUBMIT_FOR_REVIEW: '검토를 위해 제출',
  DOWNLOAD_SUCCESSFUL: '다운로드에 성공했습니다.',
  VERSION_DELETE_TIP: '<strong>{name}</strong> 버전을 삭제하시겠습니까?',
  VERSION_SUBMIT_TIP: '출시를 위해 <strong>{name}</strong> 버전을 제출하시겠습니까?',
  VERSION_CANCEL_TIP: '<strong>{name}</strong> 버전 제출을 취소하시겠습니까?',
  VERSION_RELEASE_TIP: '사용자는 출시 후 App Store에서 버전 <strong>{name}</strong>을 보고 배포할 수 있습니다. 해제하시겠습니까?',
  VERSION_SUSPEND_TIP: '<strong>{name}</strong> 버전은 일시 중단된 후 App Store에 표시되지 않습니다. 중지하시겠습니까?',
  VERSION_RECOVER_TIP: '<strong>{name}</strong> 버전은 복구된 후 App Store에 표시됩니다. 복구하시겠습니까?',
  UPDATE_TIME_SCAP: '업데이트 시간',
  VIEW_IN_STORE: '스토어에서 보기',
  // Versions > Upload
  UPLOAD_AGAIN_TIP: '오류가 발생했습니다. 다시 시도해 주세요.',
  // Versions > Submit for Review
  ENTER_VERSION_NUMBER_TIP: '버전 번호를 입력하세요.',
  SUBMIT_REVIEW_DESC: '앱 스토어에 출시하기 전에 검토를 위해 앱 템플릿을 제출하세요.',
  APP_LEARN_MORE: '<a href="{docUrl}/application-store/app-developer-guide/helm-developer-guide/" target="_blank">자세히 알아보기</a>',
  INVALID_VERSION_TIP: '올바른 버전 번호를 입력하세요.',
  // Versions > Submit for Review > Test Steps
  TEST_STEPS: '테스트 단계',
  VERSION_SUBMIT_TEST_STEPS: '1. 모든 종속 차트가 제출되었습니다.<br/>' + '2. 정적 분석을 통과했습니다(helm lint).<br/>' + '3. 앱은 기본값을 사용하여 시작할 수 있습니다(helm install). 모든 파드는 실행 상태이고 모든 서비스에는 하나 이상의 엔드포인트가 있습니다.<br/>' + '4. 사용된 이미지는 보안 취약점이 없습니다.<br/>' + '5. 업그레이드가 지원됩니다.<br/>' + '6. 맞춤형 애플리케이션 구성이 지원됩니다.<br/>' + '7. Kubernetes의 알파 기능을 사용하지 마십시오.<br/>' + '8. 앱 소개, 사전 설정 및 사용자 정의 매개변수 구성을 포함한 자세한 문서가 제공됩니다.<br/>',
  VERSION_SUBMIT_NOTE: '제출하기 전에 앱이 다음 요구 사항을 충족하는지 확인하세요.',
  // Versions > Submit for Review > Update Log
  UPDATE_LOG_DESC: '앱 업데이트에 대한 자세한 정보를 입력하세요.',
  SUBMIT_SUCCESSFUL: '성공적으로 제출했습니다.',
  CANCEL_SUCCESSFUL: '성공적으로 취소되었습니다.',
  // App Information
  // App Release
  // App Instances
  APP_INSTANCES: '앱 인스턴스'
};