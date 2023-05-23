/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                             you can redistribute it and/or modify
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
  STORAGE_CLASS_PL: '스토리지 클래스',
  STORAGE_CLASS_DESC: '스토리지 클래스는 동적 볼륨 프로비저닝을 지원하므로 관리자가 필요에 따라 새 스토리지 볼륨을 생성할 수 있습니다.',
  // List
  STORAGE_CLASS_EMPTY_DESC: '스토리지 클래스를 생성하세요.',
  DEFAULT_STORAGE_CLASS: '기본 스토리지 클래스',
  ALLOW_VOLUME_SNAPSHOT: '볼륨 스냅샷 허용',
  ALLOW_VOLUME_CLONE: '볼륨 복제 허용',
  ALLOW_VOLUME_EXPANSION: '볼륨 확장 허용',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: '스토리지 시스템 선택',
  PROVISIONER_DEPENDENCE_DESC: '플러그인이 서비스를 제공하기 전에 스토리지 시스템에 플러그인을 배포해야 합니다.' ,
  QINGCLOUD_CSI_DESC: 'QingCloud CSI를 기본 스토리지 플러그인으로 사용합니다. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">자세히 알아보기</a>',
  CUSTOM: '사용자 정의',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: '볼륨 확장',
  RECLAIM_POLICY: '회수 정책',
  ACCESS_MODE: '액세스 모드',
  ACCESS_MODES_DESC: '스토리지 클래스에서 지원하는 액세스 모드를 하나 이상 선택하십시오.' ,
  STORAGE_SYSTEM: '스토리지 시스템',
  VOLUME_BINDING_MODE: '볼륨 바인딩 모드',
  IMMEDIATE_BINDING: '즉시 바인딩',
  BINDING_WAIT: '제본 지연',
  MAXSIZE: '최대 크기',
  MINSIZE: '최소 크기',
  STEPSIZE: '단계 크기',
  FSTYPE: '파일 시스템 유형',
  TAGS: '태그',
  QINGCLOUD_CSI_TYPE_DESC: 'ChingCloud Public Cloud Platform에서 0은 고성능 볼륨, 대용량 볼륨 2개, 초고성능 볼륨 3개, 엔터프라이즈 서버 SAN(NeonSAN) 5개, 표준 볼륨 100개, 엔터프라이즈 SSD 200개를 의미합니다.',
  CREATE_VOLUME_MAX_SIZE: '볼륨의 최대 크기입니다.' ,
  CREATE_VOLUME_STEP_SIZE: '볼륨의 단계 크기.' ,
  CREATE_VOLUME_MIN_SIZE: '볼륨의 최소 크기.' ,
  VOLUME_FS_TYPE: 'ext3, ext4 및 xfs를 지원합니다. 기본 유형은 ext4입니다.' ,
  QINGCLOUD_VOLUME_TAGS_DESC: '저장소 볼륨에 태그를 추가합니다. 여러 태그를 구분하려면 쉼표를 사용하십시오.' ,
  GID_RANGE_TIP: 'The value cannot be less than 2000 or greater than 2147483647.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: '볼륨을 프로비저닝하는 Heketi REST URL.',
  GLUSTERFS_ID_DESC: 'Gluster 클러스터 ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster는 REST 서버에 대한 인증을 활성화합니다.',
  GLUSTERFS_RESTUSER_DESC: 'Gluster REST 서비스 또는 Heketi 서비스의 사용자 이름입니다.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi 사용자 암호의 네임스페이스입니다.',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi 사용자 암호의 이름입니다.',
  GLUSTERFS_GID_MIN_DESC: '볼륨의 최소 GID입니다.',
  GLUSTERFS_GID_MAX_DESC: '볼륨의 최대 GID입니다.',
  GLUSTERFS_VOLUME_TYPE_DESC: '볼륨의 종류. 값은 없음, 복제:<복제 개수> 또는 분산:<데이터>:<중복 개수>일 수 있습니다. 볼륨 유형이 설정되지 않은 경우 기본 볼륨 유형은 replicate:3입니다.',
  RESTURL: 'REST URL',
  CLUSTER_ID: '클러스터 ID',
  REST_AUTH_ENABLED: 'REST 인증',
  REST_USER: 'REST 사용자',
  VOLUME_TYPE: '볼륨 유형',
  SECRET_NAME: '비밀 이름',
  REST_AUTH_TRUE: '진실',
  SECRET_NAMESPACE: '비밀 네임스페이스',
  GID_MIN: '최소 GID',
  GID_MAX: '최대 GID',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'Ceph 모니터의 IP 주소입니다.',
  CEPHRBD_ADMIN_ID_DESC: '풀에 이미지를 생성할 수 있는 Ceph 클라이언트 ID입니다.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'adminid의 비밀 이름입니다.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'adminSecretName의 네임스페이스',
  CEPHRBD_POOL_DESC: 'Ceph RBD 풀의 이름입니다.',
  CEPHRBD_USERID_DESC: 'RBD 이미지를 매핑하는 데 사용되는 Ceph 클라이언트 ID입니다. 기본값은 adminId와 동일합니다.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'RBD 이미지를 매핑하기 위한 userId의 Ceph 암호 이름입니다.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'userSecretName의 네임스페이스',
  CEPHRBD_FS_TYPE_DESC: '저장 볼륨의 파일 시스템 유형입니다.',
  CEPHRBD_IMAGE_FORMAT_DESC: '세프 볼륨의 옵션. 값은 "1" 또는 "2"일 수 있습니다. imageFormat을 "2"로 설정할 때 imageFeatures를 채워야 합니다.',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Ceph 클러스터의 추가 기능. imageFormat을 "2"로 설정한 경우에만 값을 설정해야 합니다.',
  CEPH_MONITOR_IP: 'IP 주소 및 포트 번호',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: '스토리지 클래스 설정',
  PARAMETERS: '매개변수',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS_DELETE_DESC: '볼륨 스냅샷 클래스를 삭제하면 볼륨 스냅샷의 일반적인 사용에 영향을 줄 수 있습니다. 볼륨 스냅샷 클래스를 삭제하시겠습니까?',
  STORAGE_CLASS_DELETE_DESC_PL: '볼륨 스냅샷 클래스를 삭제하면 볼륨 스냅샷의 일반적인 사용에 영향을 줄 수 있습니다. {type} 이름 <strong>{resource}</strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.'
}
