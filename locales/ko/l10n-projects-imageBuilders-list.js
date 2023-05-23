/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                     you can redistribute it and/or modify
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
  IMAGE_BUILDER_PL: '이미지 빌더',
  IMAGE_BUILDER_DESC: '이미지 빌더는 소스 코드 또는 아티팩트에서 컨테이너 이미지를 빌드하는 도구입니다. 간단한 구성을 통해 소스 코드 또는 아티팩트에서 컨테이너 이미지를 빌드할 수 있습니다.',
  // List
  IMAGE_BUILDER_EMPTY_DESC: '이미지 빌더를 생성해주세요.',
  NOT_RUNNING_YET: '아직 실행되지 않음',
  BUILDING: 'Building',
  S2I: 'Source-to-image',
  B2I: 'Artifact-to-image',
  // List > Name (Displayed after you create a service from artifact)
  BUILD_IMAGE_FOR_SERVICE: '서비스 {service}에 대한 이미지를 빌드합니다.',
  // List > Create > Build Mode
  BUILD_MODE: '빌드 모드',
  CONTAINERD_RUNTIME_NOT_SUPPORTED: 'containerd 런타임에서 이 기능을 지원하지 않습니다.',
  S2I_DESC: '소스 코드 언어를 선택하십시오.' ,
  IMAGE_FROM_S2I: '소스 코드에서 이미지 빌드',
  IMAGE_FROM_B2I: ' 아티팩트에서 이미지 빌드',
  B2I_DESC: ' 아티팩트 파일 형식을 선택하십시오.' ,
  EMPTY_IMAGE_TYPE_DESC: '언어 또는 아티팩트 유형을 선택하십시오.',
  // List > Create > Java > Build Settings
  CODE_REPOSITORY_URL: '코드 저장소 URL',
  CODE_REPOSITORY_BRANCH: '코드 저장소 분기',
  CODE_REPOSITORY_KEY: '코드 저장소 키',
  CODE_REPOSITORY_URL_DESC: '소스 코드 저장소의 주소를 입력하십시오. 현재 Git 저장소만 지원됩니다.' ,
  CODE_REPOSITORY_KEY_DESC: '개인 코드 저장소를 사용하는 경우 코드 저장소 키가 들어 있는 암호를 선택하십시오.' ,
  IMAGE_NAME: '이미지 이름',
  IMAGE_TAG: '이미지 태그',
  TARGET_IMAGE_REPOSITORY: '대상 이미지 레지스트리',
  S2I_IMAGE_NAME_DESC: '이름에는 소문자, 숫자, 하이픈(-), 점(.), 슬래시(/), 콜론(:)만 사용할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다.' ,
  S2I_TARGET_IMAGE_REPOSITORY_DESC: '생성할 이미지를 저장할 이미지 레지스트리를 선택하십시오. 사용할 수 있는 이미지 레지스트리가 없으면 이미지 레지스트리 암호를 만들어야 합니다. <br/><a href={link} target="_blank">자세한 정보 </a>',
  TRIGGER_TOKEN: '트리거 토큰',
  INVALID_TRIGGER_TOKEN_DESC: '잘못된 토큰입니다. 토큰에는 대문자, 소문자 및 숫자만 포함될 수 있습니다.' ,
  TRIGGER_TOKEN_DESC: '클라이언트를 인증하는 데 사용되는 토큰을 Kuberix Enterprise에 대해 설정합니다. 웹 훅을 통해 Kuberix Enterprise에서 이미지 빌딩을 자동으로 트리거하도록 클라이언트를 설정할 수 있습니다. 토큰에는 대문자, 소문자 및 숫자만 포함될 수 있습니다.' ,
  CODE_RELATIVE_PATH: '코드 상대 경로',
  CODE_RELATIVE_PATH_DESC: '코드 저장소에 있는 코드의 상대 경로를 설정합니다. 기본 경로는 /.입니다',
  S2I_ENVIRONMENT_DESC: '환경 변수를 설정하여 이미지의 런타임 동작을 제어합니다. <a href={link} target="_blank">자세한 정보 </a>',
  // List > Create > JAR > Build Settings
  UPLOAD_ARTIFACT_FILE: '아티팩트 파일 업로드',
  UPLOAD_PERCENT: '업로드됨: {percent}%',
  UPLOAD_FULLY: '업로드: 100%',
  UPLOAD_FAILED: '업로드 실패.' ,
  ARTIFACT_FILE_EMPTY_DESC: ' 아티팩트 파일을 업로드하십시오.' ,
  B2I_DEFAULT_DESC: ' 아티팩트 파일을 업로드합니다.' ,
  JAR_DESC: 'JAR 형식으로 아티팩트 파일을 업로드합니다.' ,
  WAR_DESC: 'WAR 형식으로 아티팩트 파일을 업로드합니다.' ,
  BUILD_ENVIRONMENT: '환경 구축',
  CODE_REPOSITORY_KEY_NOT_REQUIRED: '현재 코드 저장소에는 키가 필요하지 않습니다.' ,
  FILE_SIZE_VALUE: '파일 크기: {value}',
  FILE_UPLOADED_TIP: '파일이 업로드되었습니다.' ,
  WRONG_FILE_EXTENSION_NAME: '선택한 파일 형식이 일치하지 않습니다. {type} 유형을 선택하십시오.' ,
  IMAGE_NAME_EMPTY_DESC: '이미지 이름을 입력하십시오.' ,
  IMAGE_TAG_EMPTY_DESC: '이미지 태그를 입력하십시오.' ,
  TARGET_IMAGE_REPOSITORY_EMPTY_DESC: '대상 이미지 레지스트리를 설정하십시오.'
};