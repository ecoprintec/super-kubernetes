/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software:                                                                                                                                 you can redistribute it and/or modify
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
  // Banner
  ROUTE_DESC: '라우트는 서비스를 집계하는 방법을 제공합니다. 외부에서 액세스할 수 있는 IP 주소를 통해 클러스터 외부에 내부 서비스를 노출할 수 있습니다.',
  PREREQUESTS_FOR_USE_ROUTE_Q: '라우트를 사용하기 위한 전제 조건은 무엇입니까?',
  PREREQUESTS_FOR_USE_ROUTE_A: '라우트를 사용하려면 프로젝트 관리자에게 문의하여 해당 프로젝트의 게이트웨이를 설정해야 합니다.',
  ACCESS_TYPES_OF_ROUTE_Q: '라우트의 외부 접근 모드는 무엇입니까?',
  ACCESS_TYPES_OF_ROUTE_A: 'Super Kubenetes 라우트는 NodePort 및 LoadBalancer 외부 액세스 모드를 지원합니다.',
  ROUTE_PL: '라우트',
  // List
  GATEWAY_ADDRESS_TCAP: '게이트웨이 주소',
  ROUTE_EMPTY_DESC: '라우트를 만들어 주세요.',
  // List > Create > Basic Information
  // List > Create > Routing Rules
  ADD_ROUTING_RULE_DESC: '도메인 이름 라우트를 서비스에 매핑하는 라우팅 규칙을 추가합니다.',
  ADD_ROUTING_RULE: '라우팅 규칙 추가',
  ROUTING_RULE_EMPTY_DESC: '하나 이상의 라우팅 규칙을 추가하십시오.',
  PATH_EMPTY_DESC: '하나 이상의 라우트를 추가하십시오.',
  AUTO_GENERATE_TCAP: '자동 생성',
  DOMAIN_NAME_TCAP: '도메인 이름',
  DOMAIN_NAME_EMPTY_DESC: '도메인 이름을 입력하세요.',
  INVALID_DOMAIN_DESC: '잘못된 도메인 이름입니다.',
  INVALID_PATH_DESC: '유효하지 않은 라우트.',
  MODE_TCAP: '모드',
  PATH_PL: '패스',
  PATH_SERVICE_TIP: '서비스',
  SET_ROUTING_RULES: '라우팅 규칙 설정',
  SPECIFY_DOMAIN_TCAP: '도메인 지정',
  NO_GATEWAY_DESC: '자동 생성을 사용하려면 프로젝트 관리자에게 문의하여 프로젝트의 게이트웨이 설정에서 게이트웨이 액세스 모드를 설정하십시오.',
  PATH: '패스',
  PROTOCOL: '프로토콜',
  PORT: '포트',
  PORT_VALUE: '포트: {value}',
  CERTIFICATE: '자격증',
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Routing Rules
  EDIT_ROUTING_RULES: '라우팅 규칙 편집',
  // List > Edit Annotations
  EDIT_ANNOTATIONS: '주석 수정',
  // List > Delete
  ROUTE_LOW: '라우트'
};