/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software:                                                                                 you can redistribute it and/or modify
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
  USER_DESC: '사용자와 사용자의 역할을 관리합니다.',
  USER_PL: '유저',
  // List
  NOT_LOGIN_YET: '아직 로그인하지 않았습니다',
  USER_EMPTY_DESC: '사용자를 생성하세요.',
  USER_ACTIVE: '활성',
  USER_AUTHLIMITEXCEEDED: '로그인 제한',
  USER_PENDING: '보류 중',
  USER_DISABLED: '사용할 수 없는',
  LAST_LOGIN: '최종 로그인',
  // List > Create
  USERNAME_DESC: '사용자 이름은 소문자, 숫자, 하이픈(-) 및 점(.)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 32자입니다.',
  PASSWORD_DESC: '비밀번호는 최소한 하나의 숫자, 하나의 소문자 및 하나의 대문자를 포함해야 합니다. 길이는 8~64자여야 합니다.',
  PASSWORD_INVALID_DESC: '유효하지 않은 비밀번호. 암호는 하나 이상의 숫자, 하나의 소문자 및 하나의 대문자를 포함해야 합니다. 길이는 8~64자여야 합니다.',
  PLATFORM_ROLE_DESC: 'Super Kubenetes 플랫폼에서 사용자의 역할을 설정합니다.',
  USER_SETTING_EMAIL_DESC: '이메일 주소는 Super Kubenetes 웹 콘솔에 로그인하는데 사용할 수 있습니다.',
  USERNAME_EXISTS: '사용자 이름이 이미 존재합니다. 다른 사용자 이름을 입력하십시오.',
  USERNAME_EMPTY_DESC: '사용자 이름을 입력하세요.',
  PLATFORM_ROLE: '플랫폼 역할',
  CREATE_USER: '사용자 생성',
  EMAIL: '이메일',
  EMAIL_EXISTS: '이미 존재하는 이메일 주소입니다. 다른 이메일 주소를 입력하세요.',
  USERNAME_INVALID: '잘못된 사용자 이름. {message}',
  USERNAME: '사용자명',
  PASSWORD: '비밀번호',
  // List > Edit
  EDIT_USER: '사용자 수정',
  // List > Delete
  USER_LOW: '사용자',
  DELETING_CURRENT_USER_NOT_ALLOWED: '현재 사용자는 삭제할 수 없습니다.'
};