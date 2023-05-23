/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                                                                          you can redistribute it and/or modify
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
  // List
  DAEMONSETS: '데몬셋',
  DAEMONSET_EMPTY_DESC: '데몬셋을 생성해주세요.',
  // List > Create > Basic Information
  // List > Create > Pod Settings
  // List > Create > Pod Settings > Add Container > Update Strategy > Rolling Update Settings
  MIN_READY_SECONDS: 'Pod 준비를 위한 최소 실행 시간',
  MAX_UNAVAILABLE_PODS: '사용할 수 없는 최대 파드',
  ROLLING_UPDATE_SETTINGS: '롤링 업데이트 설정',
  MAX_UNAVAILABLE_PODS_DESC: '업데이트 프로세스 중에 허용되는 사용할 수 없는 파드 복제본의 최대 수 또는 백분율입니다.',
  MIN_READY_SECONDS_DESC: '파드 복제본이 준비된 것으로 간주되는 데 필요한 최소 안정적인 실행 시간',
  MIN_READY_SECONDS_EMPTY: '파드 복제본이 준비된 것으로 간주되는 데 필요한 최소 안정적인 실행 시간을 설정하십시오.',
  MAX_UNAVAILABLE_EMPTY: '업데이트 프로세스 중에 허용되는 사용할 수 없는 파드 복제본의 최대 수 또는 백분율을 설정하십시오.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > HTTP Request
  FAILURE_THRESHOLD: '실패 임계값',
  HTTP_REQUEST: 'HTTP 요청',
  INITIAL_DELAY_S: '초기 지연(들)',
  INITIAL_DELAY_TIMEOUT_VALUE: '{delay}초 초기 지연, {timeout}초 시간 초과 기간',
  PROBE_TIME: '{delay}초 지연, {timeout}초 시간 초과',
  TIMEOUT_PERIOD_S: '시간 초과',
  CHECK_INTERVAL_S: '확인 간격',
  SUCCESS_THRESHOLD: '성공의 문턱',
  INITIAL_DELAY_DESC: '컨테이너 시작 후 프로브가 시작되기 전의 지연 시간입니다. 값은 정수여야 하며 최소값은 0입니다.',
  TIMEOUT_PERIOD_DESC: '탐색이 시간 초과되고 실패한 것으로 간주되는 시간 초과 기간입니다. 값은 정수여야 하며 최소값은 1입니다.',
  CHECK_INTERVAL_DESC: '확인 시도 사이의 간격입니다. 값은 정수여야 하며 최소값은 1입니다.',
  SUCCESS_THRESHOLD_DESC: '프로브가 실패한 후 성공적인 것으로 간주되기 위한 최소 연속 성공 횟수입니다. 활성 및 시작 프로브의 경우 최소값은 1이고 값은 1이어야 합니다.',
  FAILURE_THRESHOLD_DESC: '프로브가 성공한 후 실패한 것으로 간주되는 연속적인 실패의 최소 횟수입니다. 최소값은 1입니다.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > Command
  PROBE_COMMAND_EMPTY: '명령을 하나 이상 입력하십시오.',
  // List > Create > Pod Settings > Add Container > Health Check > Liveness Check > TCP Port
  TCP_PORT: 'TCP 포트',
  // List > Create > Storage Settings
  MOUNT_PATH_IN_USE: '마운트 경로가 이미 사용 중입니다. 다른 마운트 경로를 입력하세요.'
};