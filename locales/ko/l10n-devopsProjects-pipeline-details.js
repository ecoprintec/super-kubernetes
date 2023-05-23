/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                        you can redistribute it and/or modify
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
  // Edit Information
  CODE_REPOSITORY: '코드 저장소',
  // Details
  TASK_STATUS: '작업 상태',
  NOT_RUNNING: '실행되지 않음',
  QUEUED: '큐',
  ABORTED: '중단',
  UNSTABLE: '불안정',
  SKIPPED: '건너뛰기',
  NOT_BUILT: '구축되지 않음',
  SYNC_STATUS: '동기화 상태',
  DEVOPS_PROJECT: 'DevOps 프로젝트',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: '리포지토리 검색이 성공적으로 트리거되었습니다.' ,
  // More > View Scan Logs
  VIEW_SCAN_LOGS: '검사 로그 보기',
  STARTED_BY_NAME: '시작자: {name}',
  REPOSITORY_SCAN_LOGS: '리포지토리 스캔 로그',
  RESCAN: '재스캔',
  LOGS_OBTAINED_SUCCESSFULLY: '로그를 성공적으로 가져왔습니다.',
  // Health Status
  HEALTH_STATUS_SCAP: '연결 상태',
  // Task Status
  PIPELINE_QUEUED_TITLE: '초기화를 완료하려고 합니다',
  INITIALIZING_PIPELINE: '파이프라인 초기화',
  PIPELINE_PREPARE_DESC: '환경준비...',
  INITIALIZING_PIPELINE_DESC: '파이프라인 초기화가 완료될 때까지 기다리십시오.',
  TASK_FAILED_NOT_OPERATIONAL: '단계가 실패하여 작동하지 않습니다.',
  NO_PIPELINE_CONFIG_FILE_TIP: '파이프라인 구성 파일을 찾을 수 없습니다.',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: '파이프라인 수정',
  JENKINS_UNAVAILABLE: 'Jenkins가 준비되지 않았습니다',
  AGENT_TYPE_DESC: `에이전트 섹션은 에이전트 부분이 배치되는 위치에 따라 Jenkins 환경에서 전체 파이프라인 또는 특정 단계가 실행될 위치를 지정합니다.
  이 부분은 파이프라인 블록 내의 최상위 수준에서 정의해야 하지만 단계 수준 사용은 선택 사항입니다. `,
  NOT_VALID_REPO: '코드 레포가 유효하지 않으므로 만들 수 없습니다.',
  CREATE_PIPELINE_DESC: '파이프라인으로 빌드, 테스트 및 배포',
  CI: '지속적 통합(CI)',
  CI_DESC: '지속적 통합(CI)은 소스 코드가 변경된 후 자동으로 감지, 풀링, 빌드 및 (대부분의 경우) 단위 테스트를 수행하는 프로세스입니다.',
  CICD: '지속적 통합 및 전달(CI/CD)',
  CICD_DESC: '지속적 배포(CD)는 최종 사용자에게 지속적 배포 파이프라인에서 릴리스 버전을 자동으로 제공하는 아이디어를 말합니다. 사용자의 설치 방법에 따라 클라우드 환경에서 자동 배포, 앱 업그레이드(휴대폰의 앱 등), 웹사이트 업데이트 또는 사용 가능한 버전 목록만',
  CUSTOM_PIPELIEN: '커스텀 파이프라인',
  CUSTOM_PIPELIEN_DESC: '파이프라인의 내용을 사용자 지정하는 데 필요한 작업을 선택할 수 있습니다.',
  CC: 'CC',
  CREDENTIAL_NAME: '자격 증명 이름',
  REMOTE_REPOSITORY_URL: '원격 저장소 URL',
  SCM: 'SCM',
  INPUT_MESSAGE_DESC: '이 메시지는 파이프라인 실행 상태에서 표시됩니다.',
  KUBERNETES_DEPLOY_DESC: `Kubernetes 클러스터에 리소스를 배포합니다.
     지속적 통합 또는 지속적 배포 환경에서
     정기적으로 업데이트해야 하는 리소스만 배포 단계에 배치해야 합니다.
     따라서 이 단계는 이러한 리소스의 배포를 처리하는 데 주로 사용됩니다.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
  <label>이 단계에는 다음과 같은 주요 기능이 있습니다.</label>
  <li>kubectl 없이 배포</li>
  <li>Jenkinsfile에서 변수 대체, 동적 배포가 가능합니다. </li>
  <li>개인 이미지 저장소에서 도커 이미지 가져오기 지원</li>
  <label> 현재 이 단계는 다음 리소스를 지원합니다.</label>
  <br />
  <li>구성 </li>
  <li>키</li>
  <li>배포</li>
  <li>데이브 프로세스 세트</li>
  <li>앱 라우팅</li>
  <li>네임스페이스</li>
  <li>과제</li>
  <li>서비스</li>
  <li>복제본 세트</li>
  <리>
  복제
  컨트롤러(롤링 업데이트는 지원되지 않으며 롤링 업데이트를 사용하려는 경우 배포 사용)
  </li>`,
  STAGE: '스테이지',
  KUBERNETES_DEPLOY_DEPRECATED_TIP: '이 단계는 이후 버전에서 더 이상 사용되지 않으며, 다른 대안을 고려하는 것이 좋습니다.' ,
  ORIGINAL_IMAGE_ADDRESS: '원본 이미지 주소',
  NEW_IMAGE_ADDRESS: '새 이미지 주소',
  NEW_IMAGE_TAG: '새 이미지 태그',
  CD_STEP_DESC: '지속적인 배포를 사용하여 이미지 정보를 업데이트하십시오.' ,
  UPDATE_CD_TITLE: '업데이트의 지속적인 배포',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: 'Jenkinsfile 수정',
  CLOSE_JENKINSFILE_EDITOR_TIP: 'Jenkinsfile 편집기를 닫으시겠습니까?',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: '파이프라인 실행 로그',
  VIEW_LOGS: '로그 보기',
  DURATION_VALUE: '기간: {value}',
  DOWNLOAD_LOGS: '로그 다운로드',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: '실시간 로그 사용',
  STOP_REAL_TIME_LOG: '실시간 로그 사용 안 함',
  // Run Records
  RUN_RECORDS: '실행 기록',
  RUN: '실행',
  ACTIVITY_EMPTY_TIP: '파이프라인이 실행되지 않았습니다.',
  COMMIT: '커밋',
  DURATION: '기간',
  LAST_MESSAGE: '마지막 메시지',
  RUN_ID: '런아이디',
  STOP_PIPELINE_SUCCESSFUL: '파이프라인이 성공적으로 중지되었습니다.',
  INVALID_JENKINSFILE_TIP: '현재 Jenkinsfile은 표준 선언적 Jenkinsfile이 아니며 그래픽 표시를 사용할 수 없습니다.',
  PAUSED: '일시정지',
  // Run Records > Run
  SET_PARAMETERS: '매개변수 설정',
  PARAMS_DESC: `파이프라인 설정에 따라 다음 매개변수가 생성되거나
      운영 요구 사항에 따라 입력되는 Jenkinsfile의 매개 변수 섹션.`,
  PIPELINE_RUN_START_SI: '파이프라인 실행 시작...',
  PIPELINE_RUN_START_PL: '파이프라인 실행 시작...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: '브레이크',
  PROCEED: '진행',
  WAITING_FOR_INPUT: '입력 대기 중...',
  CANCELLED_IN_REVIEW: '검토 중 취소',
  STEPS_COMPLETE_TOTAL: '단계: {complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: '커밋',
  AUTHOR: '저자',
  NO_COMMIT_FOUND: '커밋을 찾을 수 없습니다.',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: '아티팩트',
  NO_ARTIFACT_FOUND_TIP: '아티팩트가 없습니다.',
  SIZE: '크기',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: '브랜치',
  BRANCH_PL: '브랜치',
  SCAN_REPOSITORY: '리포지토리 검색',
  PIPELINE: '파이프라인',
  NO_BRANCHES_FOUND: '브랜치를 찾을 수 없음',
  // Branches > Code Check
  CODE_CHECK: '코드 검사',
  BUG_PL: '버그',
  VULNERABILITY_PL: '취약점',
  CODE_SMELL_PL: '코드 스멜',
  CODE_LINE_COUNT: '코드 라인',
  COVERAGE: '커버리지',
  TEST_RESULTS: '결과',
  ISSUE_PL: '이슈',
  CRITICAL: '중요',
  MAJOR: '메이저',
  MINOR: '마이너',
  DISPLAY_ALL: '모두 표시',
  DISPLAY_ONLY_LAST_TEN: '최근 10개 이슈만 표시됩니다.' ,
  LINE_VALUE: '라인: {value}',
  PASSED: '합격한',
  // Pull Requests
  PULL_REQUEST_PL: 'Pull 요청',
  FAILED_CHECK_SCRIPT_COMPILE: '스크립트 컴파일을 검사하지 못했습니다. 단계를 건너뛰려면 계속 버튼을 클릭하십시오.'
};