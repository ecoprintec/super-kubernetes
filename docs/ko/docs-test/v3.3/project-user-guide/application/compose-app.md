---
title: "마이크로서비스 기반 앱 생성"
keywords: 'Super Kubenetes, Kubernetes, service mesh, microservices'
description: 'Learn how to compose a microservice-based application from scratch.'
linkTitle: "Create a Microservices-based App"
weight: 10140
---

각 마이크로 서비스가 앱 기능의 단일 부분을 처리하므로 앱은 각각 다른 컴포넌트들로 분할될 수 있습니다. 이러한 컴포넌트에는 서로 독립적인 고유한 책임과 제한 사항이 있습니다. Super Kubenetes에서는 이러한 종류의 앱을 <b>구성된 앱(Composed App)</b>이라고 하며 새로 생성된 서비스나 기존 서비스를 통해 구축할 수 있습니다.

이 튜토리얼에서는 4개의 서비스로 구성된 마이크로 서비스 기반 앱 Bookinfo를 만들고 앱에 접속할 수 있도록 사용자 지정 도메인 이름을 설정하는 방법을 시연합니다.

## 사전 준비

- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 이 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.
- `project-admin`은 앱을 만들 때 `project-regular`가 도메인 이름을 정의할 수 있도록 [프로젝트 게이트웨이 설정](../../../project-administration/project-gateway/)을 해야합니다.

## 앱을 구성하는 마이크로서비스 생성

1. Super Kubenetes의 웹 콘솔에 로그인하고 프로젝트의 <b>애플리케이션 워크로드</b>에서 <b>앱</b>으로 이동합니다. <b>구성된 앱</b> 탭에서 <b>생성</b>를 클릭하세요.

2. 앱 이름(예: `bookinfo`)을 설정하고 <b>다음</b>을 클릭하세요.

3. <b>서비스</b> 페이지에서 앱을 구성하는 마이크로서비스를 생성해야 합니다. <b>서비스 생성</b>을 클릭하고 <b>상태 유지를 하지 않는(stateless) 서비스</b>를 선택하세요.

4. 서비스 이름(예: `productpage`)을 설정하고 <b>다음</b>을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      대시보드에서 직접 서비스를 생성하거나 오른쪽 상단에서 <b>YAML 편집<b>을 활성화하여 YAML 파일을 편집할 수 있습니다.
    </div>
  </div>

5. Docker Hub 이미지를 사용하기 위해 <b>컨테이너</b> 아래의 <b>컨테이너 추가</b>를 클릭하고 검색창에 `Super Kubenetes/examples-bookinfo-productpage-v1:1.13.0`을 입력하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      이미지 이름을 입력한 후 키보드에서 <b>Enter</b> 키를 눌러야 합니다.
    </div>
  </div>

6. <b>기본 포트 사용</b>을 클릭하세요. 이미지 설정에 대한 자세한 내용은 [파드 설정](../../../project-user-guide/application-워크로드/container-image-settings/)을 참조하십시오. 우측 하단에 있는 <b>√</b>를 클릭하고, 계속하려면 <b>다음</b>을 클릭하십시오.

7. <b>스토리지 설정</b> 페이지에서 [볼륨 추가](../../../project-user-guide/storage/volumes/) 또는 <b>다음</b>을 눌러 계속합니다.

8. <b>고급 설정</b> 페이지에서 <b>생성</b>을 클릭하십시오.

9. 마찬가지로 앱에 다른 세 개의 마이크로서비스를 추가합니다. 다음은 이미지 정보입니다.

  <table>
  <thead>
  <tr>
    <th>
      서비스
    </th>
    <th>
      이름
    </th>
    <th>
      이미지
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>details</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-details-v1:1.13.0</code>
    </td>
  </tr>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>reviews</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-reviews-v1:1.13.0</code>
    </td>
  </tr>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>ratings</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-ratings-v1:1.13.0</code>
    </td>
  </tr>
  </tbody>
  </table>

10. 마이크로서비스 추가가 끝나면 <b>다음</b>을 클릭하세요.

11. <b>라우트 설정</b> 페이지에서 <b>라우팅 규칙 추가</b>를 클릭하세요. <b>도메인 지정</b> 탭에서 앱의 도메인 이름(예: `demo.bookinfo`)을 설정하고, <b>프로토콜</b> 영역에서 `HTTP`를 선택하세요. `경로`에 대해 `productpage` 서비스와 `9080` 포트를 선택하세요. <b>다음</b>을 눌러 계속합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      프로젝트 게이트웨이가 설정되어 있지 않으면 <b>라우팅 규칙 추가</b> 버튼이 표시되지 않습니다.
    </div>
  </div>

12. 규칙을 더 추가하거나 <b>생성</b>을 클릭하여 프로세스를 완료하세요.

13. 앱이 <b>준비</b> 상태가 될 때까지 기다립니다.


## 앱에 접속하기

1. 앱의 도메인 이름을 설정할 때 호스트(`/etc/hosts`) 파일에 항목을 추가해야 합니다. 예를 들어 아래와 같이 IP 주소와 호스트 이름을 추가하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									192.168.0.9 demo.bookinfo
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      <b>자신의</b> IP 주소와 호스트 이름을 추가해야 합니다.
    </div>
  </div>

2. <b>구성된 앱</b>에서 방금 만든 앱을 클릭하세요.

3. <b>리소스 상태</b>에서 <b>라우트</b> 아래의 <b>서비스 접속</b>를 클릭하여 앱에 접속합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
       보안 그룹에서 포트를 열어야 합니다.
    </div>
  </div>


4. 다른 <b>서비스</b>를 보려면 각각 <b>일반 사용자</b> 및 <b>테스트 사용자</b>를 클릭하세요.

