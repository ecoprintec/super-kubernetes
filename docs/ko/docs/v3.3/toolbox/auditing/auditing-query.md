---
title: "감사 로그 쿼리"
keywords: "Kubernetes, Super Kubenetes, auditing, log, query"
description: "Understand how you can perform quick auditing log queries to keep track of the latest auditing information of your cluster."
linkTitle: "Auditing Log Query"
weight: 15330
---

Super Kubenetes는 격리된 테넌트 간의 감사 로그 쿼리를 지원합니다. 이 튜토리얼에서는 인터페이스, 검색 파라미터 및 세부 정보 페이지를 포함하여 쿼리 기능을 사용하는 방법을 시연합니다.

## 사전 준비

[Super Kubenetes 감사 로그](../../../pluggable-components/auditing-logs/)를 활성화해야 합니다.

## 쿼리 인터페이스 입력

1. 쿼리 기능은 모든 사용자가 사용할 수 있습니다. 임의의 사용자로 콘솔에 로그인하고  좌측 하단의 <img src="/dist/assets/docs/v3.3/toolbox/auditing-query/toolbox.png" width="20" alt="icon" />에 커서를 올리고, **감사 로그 검색**을 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      모든 사용자는 감사 로그를 쿼리할 수 있는 권한이 있지만 각 사용자가 볼 수 있는 로그는 다릅니다.

      - 사용자가 프로젝트의 리소스를 볼 수 있는 권한이 있으면, 사용자는 프로젝트에서 워크로드 생성과 같은 이 프로젝트에서 발생하는 감사 로그를 볼 수 있습니다.
      - 사용자가 워크스페이스의 프로젝트를 나열할 수 있는 권한이 있으면, 사용자는 워크스페이스에서 프로젝트 생성과 같이 프로젝트가 아닌 이 워크스페이스에서 발생하는 감사 로그를 볼 수 있습니다.
      - 사용자가 클러스터에 있는 프로젝트를 나열할 수 있는 권한이 있으면, 사용자는 이 클러스터에서 발생하지만 워크스페이스와 프로젝트에서는 발생하지 않는(클러스터의 작업영역 생성과 같은) 감사 로그를 볼 수 있습니다.
    </div>
  </div> 

2. 팝업창에서 지난 12시간 동안의 로그 추이를 볼 수 있습니다.

3. **감사 로그 검색** 콘솔은 다음 쿼리 파라미터를 지원합니다:

   <table>
     <tbody>
       <tr>
         <th width='150'>파라미터</th>
         <th>설명</th>
       </tr>
       <tr>
         <td>클러스터</td>
         <td>작업이 발생하는 클러스터. [멀티 클러스터 기능](../../../multicluster-management/introduction/overview/)이 켜져 있으면 활성화됩니다. </td>
         </tr>
       <tr>
         <td>프로젝트</td>
         <td>작업이 발생하는 프로젝트. 정확한 쿼리와 퍼지 쿼리를 지원합니다.</td>
       </tr>
       <tr>
         <td>워크스페이스</td>
         <td>작업이 발생하는 워크스페이스. 정확한 쿼리와 퍼지 쿼리를 지원합니다.</td>
       </tr>
       <tr>
         <td>리소스 유형</td>
         <td>요청과 연관된 리소스 유형. 퍼지 쿼리를 지원합니다.</td>
       </tr>
       <tr>
         <td>리소스 이름</td>
         <td>요청과 관련된 자원의 이름. 퍼지 쿼리를 지원합니다.</td>
       </tr><tr>
         <td>Verb</td>
         <td>요청과 관련된 쿠버네티스 Verb입니다. 리소스가 아닌 요청의 경우 소문자 HTTP 메서드입니다. 정확한 쿼리를 지원합니다.</td>
       </tr><tr>
         <td>상태 코드</td>
         <td>HTTP 응답 코드. 정확한 쿼리를 지원합니다.</td>
       </tr><tr>
         <td>운영 계정</td>
         <td>이 요청을 호출한 사용자입니다. 정확하고 퍼지 쿼리를 지원합니다.</td>
       </tr><tr>
         <td>소스 IP</td>
         <td>요청이 시작된 IP 주소 및 중간 프록시. 퍼지 쿼리를 지원합니다.</td>
       </tr><tr>
         <td>시간 범위</td>
         <td>요청이 apiserver 에 도달하는 시간.</td>
       </tr>
   </table>
   
  <div className="notices note">
    <p>Note</p>
    <div>
      - 퍼지 쿼리는 Elasticsearch 세분화 규칙을 기반으로, 대/소문자를 구분하지 않는 퍼지 매칭 및 단어나 구의 전반부로 전체 용어 검색을 지원합니다.
      - Super Kubenetes는 기본적으로 지난 7일 동안의 로그를 저장합니다. ConfigMap `elasticsearch-logging-curator`에서 보존 기간을 수정할 수 있습니다.
    </div>
  </div> 

## 쿼리 파라미터 입력

1. 필터를 선택하고 검색할 키워드를 입력하세요. 예를 들어, 생성된 '서비스'의 정보를 포함하는 감사 로그를 쿼리하세요.

2. 결과를 클릭하면 감사 로그 세부 정보를 볼 수 있습니다.