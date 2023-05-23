/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                            you can redistribute it and/or modify
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
  LOG_COLLECTION: '로그 수집',
  DISK_LOG_COLLECTION_DESC: 'Log Collection(로그 수집) 기능을 통해 시스템은 볼륨에 저장된 컨테이너 로그를 수집하고 로그를 표준 출력으로 전송할 수 있습니다.' ,
  COLLECT_LOGS_ON_VOLUMES_Q: '볼륨에서 로그를 수집하려면 어떻게 해야 합니까?',
  COLLECT_LOGS_ON_VOLUMES_A: '볼륨에서 로그를 수집하려면 읽기 및 쓰기 모드의 볼륨을 컨테이너에 마운트하고 해당 볼륨에 로그를 내보내도록 컨테이너를 설정해야 합니다.' ,
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: '볼륨에서 로그 수집',
  DISABLE_LOG_COLLECTION: '로그 수집 사용 안 함',
  DISABLE_LOG_COLLECTION_TIP: '로그 수집을 비활성화하시겠습니까? 변경 내용을 적용하려면 파드 복제본을 다시 시작해야 합니다.' ,
  LOG_COLLECTION_ENABLED_DESC: '이 기능을 사용 또는 사용 안 함으로 설정한 후 변경 내용을 적용하려면 파드 복제본을 다시 시작해야 합니다.',
  DISABLED: '비활성화',
  ENABLED: '활성화'
};