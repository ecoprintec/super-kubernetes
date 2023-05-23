---
title: "모니터링 대시보드 - 개요"
keywords: 'monitoring, prometheus, prometheus operator'
description: 'Understand the general steps of creating a monitoring dashboard as well as its layout.'
linkTitle: "Overview"
weight: 10815
---

이 섹션에서는 모니터링 대시보드 기능을 소개합니다. 사용자 지정 앱을 위해 Super Kubenetes에서 메트릭 데이터를 시각화하는 방법을 배웁니다. 앱 메트릭을 Super Kubenetes 모니터링 시스템에 통합하는 방법을 모르는 경우 먼저 [소개](../../introduction/)를 읽으십시오.

## 모니터링 대시보드 생성

앱 메트릭에 대한 새 대시보드를 만들려면 프로젝트의 **모니터링 및 알림**에서 **사용자 지정 모니터링**으로 이동합니다. 모니터링 대시보드를 만드는 방법에는 기본 제공 템플릿, 사용자 지정을 위한 빈 템플릿, 그리고 YAML 파일의 세 가지가 있습니다.

MySQL, Elasticsearch, Redis에 대해 각각 사용 가능한 세 가지 기본 제공 템플릿이 있습니다. 이 템플릿은 데모용이며 Super Kubenetes 릴리스로 업데이트됩니다. 또한 사용자 지정 모니터링 대시보드를 선택할 수 있습니다.

Super Kubenetes 사용자 지정 모니터링 대시보드는 간단히 YAML 설정 파일로 볼 수 있습니다. 데이터 모델은 모니터링 및 가관측성을 위한 오픈 소스 도구인 [Grafana](https://github.com/grafana/grafana)에서 크게 영감을 받았습니다.

### 내장 템플릿에서

Super Kubenetes는 빠르게 시작할 수 있도록 MySQL, Elasticsearch, 그리고 Redis용 기본 제공 템플릿을 제공합니다. 기본 제공 템플릿에서 대시보드를 만들려면 템플릿을 선택한 후 **다음**을 클릭하세요.

### 빈 템플릿에서

빈 템플릿으로 시작하려면 **다음**을 클릭하세요.

### YAML 파일에서

오른쪽 상단 모서리에서 **YAML 편집**을 켠 다음 대시보드 YAML 파일을 붙여넣으세요.

## 대시보드 레이아웃

모니터링 대시보드는 네 부분으로 구성됩니다. 글로벌 설정은 페이지 상단에 있습니다. 가장 왼쪽 열은 메트릭의 현재 값을 보여주는 텍스트 기반 차트입니다. 가운데 열에는 특정 기간 동안의 메트릭을 시각화하기 위한 차트 모음이 포함되어 있습니다. 가장 오른쪽 열은 차트에 자세한 정보를 표시합니다.

### 상단 바

상단 표시줄에서 제목, 테마, 시간 범위 및 새로 고침 간격과 같은 설정을 할 수 있습니다.

### 텍스트 차트 열

가장 왼쪽 열에 새 텍스트 차트를 추가할 수 있습니다.

### 차트 표시 열

가운데 열에서 차트를 볼 수 있습니다.

### 세부정보 열

가장 오른쪽 열에서 차트 세부 정보를 볼 수 있습니다. 특정 기간 내 측정항목의 **max**, **min**, **avg**, **last** 값을 보여줍니다.

## 모니터링 대시보드 수정

우측 상단의 **템플릿 편집**을 클릭하여 기존 템플릿을 수정할 수 있습니다.

### 차트 추가

텍스트 차트를 추가하려면 왼쪽 열에서 ➕ 를 클릭하세요. 가운데 열에 차트를 추가하려면 오른쪽 하단의 **모니터링 항목 추가**를 클릭하세요.

### 모니터링 그룹 추가

모니터링 항목을 그룹화하려면 <img src="/dist/assets/docs/v3.3/project-user-guide/custom-application-monitoring/visualization/overview/six-dots.png" width="20px " alt="icon" /> 항목을 대상 그룹으로 끌어다 놓습니다. 새 그룹을 추가하려면 **모니터링 그룹 추가**를 클릭하세요. 그룹 위치를 변경하려면 그룹 위로 마우스를 가져간 후 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/custom-application-monitoring/visualization/overview/up-arrow.png" width="20px" align="center" /> 또는 <img src="/dist/assets/docs/v3.3/project-user-guide/custom-application-monitoring/visualization/overview/down-arrow.png" width="20px" align="center" /> 화살표를 클릭하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    오른쪽에 있는 그룹의 위치는 가운데에 있는 차트의 위치와 일치합니다. 즉, 그룹의 순서를 변경하면 해당 차트의 위치도 그에 따라 변경됩니다.
  </div>
</div>

