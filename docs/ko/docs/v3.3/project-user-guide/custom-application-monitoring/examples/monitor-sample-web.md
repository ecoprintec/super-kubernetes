---
title: "샘플 웹 애플리케이션 모니터링"
keywords: 'monitoring, prometheus, prometheus operator'
description: 'Use a Helm chart to deploy a sample web app and create a dashboard to monitor the app.'
linkTitle: "Monitor a Sample Web Application"
weight: 10813
---

이 섹션에서는 샘플 웹 애플리케이션을 모니터링하는 방법을 안내합니다. 애플리케이션은 코드에서 Prometheus Go 클라이언트로 장치됩니다. 따라서 내보내기 도구의 도움 없이 직접 메트릭을 노출할 수 있습니다.

## 사전 준비

- [OpenPitrix 시스템 활성화](../../../../pluggable-components/app-store/)가 필요합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정을 생성해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오. 계정은 플랫폼 일반 사용자여야 하며 `self-provisioner` 역할로 워크스페이스에 초대되어야 합니다. 즉, `self-provisioner` 역할의 사용자 `workspace-self-provisioner`를 만들고 이 계정을 사용하여 프로젝트(예: `test`)를 만드세요. 이 튜토리얼에서는 `workspace-self-provisioner`로 로그인하고 `demo-workspace` 워크스페이스의 `test` 프로젝트에서 작업합니다.

- Helm 차트 및 [PromQL](https://prometheus.io/docs/prometheus/latest/querying/examples/)에 대한 숙지가 필요합니다.

## 실습실

### 1단계: 샘플 웹 애플리케이션 이미지 준비

샘플 웹 애플리케이션은 `myapp_processed_ops_total`이라는 사용자 정의 메트릭을 노출합니다. 이것은 처리된 작업 수를 계산하는 카운터 유형 메트릭입니다. 카운터는 2초마다 자동으로 1씩 증가합니다.

이 샘플 애플리케이션은 엔드포인트 `http://localhost:2112/metrics`를 통해 애플리케이션별 메트릭을 노출합니다.

이 튜토리얼에서는 준비된 이미지인 `Super Kubenetesdev/promethues-example-app`을 사용합니다. 소스 코드는 [Super Kubenetes/prometheus-example-app](https://github.com/kubesphere/prometheus-example-app)에서 찾을 수 있습니다. 또한 Prometheus의 공식 문서의 [Prometheus용 Go 애플리케이션 장치하기](https://prometheus.io/docs/guides/go-application/)를 따를 수도 있습니다.

### 2단계: 애플리케이션을 Helm 차트에 패킹

재사용을 위해 디플로이먼트, 서비스 그리고 ServiceMonitor YAML 템플릿을 Helm 차트에 패킹하세요. 디플로이먼트와 서비스 템플릿에서 샘플 웹 컨테이너와 메트릭 엔드포인트에 대한 포트를 정의하세요. ServiceMonitor는 Prometheus Operator에서 정의하고 사용하는 사용자 지정 리소스입니다. 이것은 애플리케이션과 Super Kubenetes 모니터링 엔진(Prometheus)을 연결하여 엔진이 메트릭을 스크랩할 위치와 방법을 알 수 있도록 합니다. 향후 릴리스에서 Super Kubenetes는 손쉬운 작동을 위해 그래픽 유저 인터페이스를 제공할 것입니다.

[Super Kubenetes/prometheus-example-app](https://github.com/kubesphere/prometheus-example-app)의 `helm` 폴더에서 소스 코드를 찾습니다. Helm 차트 패키지는 준비된 상태이며 이름은 `prometheus-example-app-0.1.0.tgz`입니다. .tgz 파일을 다운로드하고 다음 단계에서 사용하십시오.

### 3단계: Helm 차트 업로드

1. `demo-workspace`의 워크스페이스 **개요** 페이지로 이동하여 **앱 관리** 아래의 **앱 템플릿**으로 이동하세요.

2. **생성**을 클릭하고 `prometheus-example-app-0.1.0.tgz`를 업로드하세요.

### 4단계: 샘플 웹 애플리케이션 배포

샘플 웹 애플리케이션을 `test`에 배포해야 합니다. 시연을 위해 테스트 배포를 간단히 실행해볼 수 있습니다.

1. `prometheus-example-app`을 클릭하세요.

2. 메뉴를 확장하고 **설치**를 클릭하세요.

3. `테스트`에서 샘플 웹 애플리케이션을 배포했는지 확인하고 **다음**을 클릭하세요.

4. `serviceMonitor.enabled`가 `true`로 설정되어 있는지 확인하고 **설치**를 클릭하세요.

5. `test` 프로젝트의 **워크로드**에서 샘플 웹 애플리케이션이 실행될 때까지 기다립니다.

### 5단계: 모니터링 대시보드 생성

이 섹션에서는 대시보드를 처음부터 만드는 방법을 안내합니다. 총 처리된 작업 수를 보여주는 텍스트 차트와 작업 속도를 표시하는 라인 차트를 만들 것입니다.

1. **사용자 지정 모니터링 대시보드**로 이동하고 **생성**을 클릭하세요.

2. 이름(예: `sample-web`)을 설정하고 **다음**을 클릭하세요.

3. 좌측 상단 모서리에 제목을 입력합니다(예: `Sample Web Overview`).

4. 왼쪽 열의 <img src="/dist/assets/docs/v3.3/project-user-guide/custom-application-monitoring/examples/monitor-sample-app/plus-icon.png" height="16px" width="20px" alt="icon" />를 클릭하여 텍스트 차트를 생성하세요.

5. **모니터링 메트릭** 영역에 PromQL 표현식 `myapp_processed_ops_total`을 입력하고, 차트 이름을 지정하세요(예: `Operation Count`). 계속하려면 오른쪽 하단의 **√**를 클릭하세요.

6. **모니터링 항목 추가**를 클릭하고 **라인 차트**를 선택한 다음 **확인**을 클릭하세요.

7. **모니터링 메트릭**에 PromQL 표현식 `irate(myapp_processed_ops_total[3m])`을 입력하고, 차트 이름을 `Operation Rate`로 지정합니다. 외관을 개선하기 위해 **메트릭 이름**을 `{{service}}`로 설정할 수 있습니다. 메트릭 레이블 `service`의 값으로 각 줄의 이름을 지정합니다. 다음으로, **소수점**을 `2`로 설정하여 결과가 소수점 이하 두 자리까지 표시되도록 합니다. 계속하려면 우측 하단의 **√**를 클릭하세요.

8. **템플릿 저장**을 클릭하여 저장하세요.

