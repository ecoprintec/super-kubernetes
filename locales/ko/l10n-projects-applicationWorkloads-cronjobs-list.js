/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                   you can redistribute it and/or modify
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
  // Banner
  CRONJOBS: '크론잡',
  CRONJOB_DESC: '크론잡은 시간 기반 일정에 따라 작업을 관리하며 주기적 또는 반복적인 작업을 수행하는 데 사용할 수 있습니다.' ,
  // List
  CRONJOB_PAUSED: '일시 중지',
  CRONJOB_RUNNING: '실행 중',
  CRONJOB_FAILED: '실패',
  // List > Create > Basic Information
  SCHEDULE: '일정',
  ENTER_SCHEDULE_TIP: '일정을 선택하세요.',
  CRONJOB_CRON_DESC: '크론잡에 대한 일정을 설정합니다. 는 기본적으로 UTC를 사용하며 시간대에 따라 일정을 조정해야 합니다. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">자세히 알아보기</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: '최대 시작 지연(초)',
  SUCCESSFUL_JOBS_RETAINED: '성공적인 일자리 유지',
  FAILED_JOBS_RETAINED: '실패한 작업 유지',
  CONCURRENCY_POLICY: '동시성 정책',
  MAXIMUM_DELAY_DESC: '특정한 이유로 작업이 누락된 경우 예약된 작업을 시작하기 전의 최대 지연',
  CONCURRENCY_POLICY_DESC: '크론잡의 여러 작업이 서로 겹칠 때 시스템에서 채택하는 정책입니다.',
  FAILED_JOBS_RETAINED_DESC: '유지할 수 있는 실패한 작업의 수입니다. 기본값은 1입니다.',
  SUCCESSFUL_JOBS_RETAINED_DESC: '유지할 수 있는 성공적인 작업의 수입니다. 기본값은 3입니다.',
  RUN_JOBS_CONCURRENTLY: '작업을 동시에 실행',
  SKIP_NEW_JOB: '새 작업 건너 뛰기',
  SKIP_OLD_JOB: '오래된 작업 건너 뛰기',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: '전략 설정',
  MAXIMUM_RETRIES: '최대 재시도',
  MAXIMUM_RETRIES_DESC: '작업이 실패한 것으로 표시되기 전의 최대 재시도 횟수입니다. 기본값은 6입니다.',
  PARALLEL_PODS_DESC: '작업에서 병렬로 실행되는 파드의 수입니다.',
  COMPLETE_PODS_DESC: '작업이 완료된 것으로 표시되는 데 필요한 전체 파드의 수입니다.',
  MAXIMUM_DURATION_DESC: '작업의 최대 기간입니다. 최대 기간에 도달하면 작업이 종료됩니다.',
  PARALLEL_PODS: '병렬 파드',
  COMPLETE_PODS: '완전한 파드',
  MAXIMUM_DURATION: '최대 기간(초)',
  // List > Create > Pod Settings
  RESTART_POLICY: '재시작 정책',
  RESTART_POLICY_DESC: 'Pod의 컨테이너가 비정상적으로 종료될 때 시스템에서 채택하는 정책을 선택합니다.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: '크론잡',
  CRONJOB_LOW: '크론잡'
};