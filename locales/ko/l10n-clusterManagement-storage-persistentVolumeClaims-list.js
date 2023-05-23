/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                        you can redistribute it and/or modify
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
  // Navigation pane
  STORAGE: '스토리지',
  // Banner
  PERSISTENT_VOLUME_CLAIM_DESC: '퍼시스턴트 볼륨 클레임은 스토리지 요구 사항을 정의합니다. 시스템은 퍼시스턴트 볼륨 클레임에 따라 퍼시스턴트 볼륨을 생성합니다.',
  PERSISTENT_VOLUME_CLAIM: '퍼시스턴트 볼륨 클레임',
  PERSISTENT_VOLUME_CLAIM_PL: '퍼시스턴트 볼륨 클레임',
  WHAT_IS_STORAGE_CLASS_Q: '스토리지 클래스란?',
  WHAT_IS_STORAGE_CLASS_A: '스토리지 클래스는 클러스터 관리자가 설정한 스토리지 유형입니다. 다양한 스토리지 클래스는 클러스터 사용자에게 다양한 유형의 볼륨을 제공합니다.',
  WHAT_IS_LOCAL_VOLUME_Q: '로컬 볼륨이란?',
  WHAT_IS_LOCAL_VOLUME_A: '로컬 볼륨은 클러스터의 로컬 파일 시스템에 생성된 볼륨입니다.',
  // List
  VOLUME_STATUS_BOUND: '바운드',
  VOLUME_STATUS_LOST: '잃어버린',
  VOLUME_STATUS_PENDING: '보류 중',
  VOLUME_STATUS_TERMINATING: '종료',
  VOLUME_STATUS_UPDATING: '업데이트',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: '디스크 확장',
  PERSISTENT_VOLUME_CLAIM_EMPTY_DESC: '퍼시스턴트 볼륨 클레임을 생성하십시오.',
  MOUNT_STATUS: '마운트 상태',
  MOUNTED: '장착',
  NOT_MOUNTED: '마운트되지 않음',
  ACCESS_MODE_TCAP: '액세스 모드',
  RWO_DESC: 'RWO: Single-node 읽고 쓰기',
  ROX_DESC: 'ROX: Multi-node 읽기 전용',
  RWX_DESC: 'RWX: Multi-node 읽고 쓰기',
  // List > Create > Basic Information
  CREATE: '생성',
  CREATE_PERSISTENT_VOLUME_CLAIM: '퍼시스턴트 볼륨 클레임 생성',
  // List > Create > Storage Settings
  CREATION_METHOD: '작성 방법',
  CREATE_VOLUME_BY_STORAGE_CLASS: '스토리지 클래스에서',
  CREATE_VOLUME_BY_SNAPSHOT: '볼륨 스냅샷에서',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: '볼륨을 생성할 스냅샷을 선택하십시오.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: '볼륨을 생성할 스토리지 클래스를 선택하십시오.',
  VOLUME_CAPACITY: '볼륨 용량',
  PARAM_REQUIRED: '이 매개변수는 필수입니다.',
  VOLUME_SIZE_TIP: '볼륨 용량은 0보다 커야 합니다.',
  VOLUME_STORAGE_CLASS_DESC: '특정 유형의 볼륨을 생성하려면 스토리지 클래스를 선택하십시오.',
  // List > Advanced Settings
  // List > Edit
  // List > Edit YAML
  // List > Delete
  PERSISTENT_VOLUME_CLAIM_LOW: '퍼시스턴트 볼륨 클레임'
};