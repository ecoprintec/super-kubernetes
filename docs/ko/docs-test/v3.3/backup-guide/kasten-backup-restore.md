---
title: Kasten 백업 및 복원
keywords: 'Kubernetes, Super Kubenetes, backup'
description: 'this is how to backup your Kubernetes cluster using kasten'
linkTitle: 'Backup guide'
weight: 14100
---

Kubernetes용으로 특별히 제작된 Kasten K10 데이터 관리 플랫폼은 Kubernetes 애플리케이션의 백업/복원, 재해 복구 및 애플리케이션 이동성을 위해 엔터프라이즈 운영 팀에 사용하기 쉽고 확장 가능하며 안전한 시스템을 제공합니다.

## Prerequisites

- [Super Kubenetes 앱스토어](../../../pluggable-components/app-store/)를 활성화되어 있어야 합니다.

### kasten 관리용 namespace 생성

```
kubectl create ns kasten-io
```

### kasten (k10) helm repo 추가 및 동기화

```
helm repo add kasten https://charts.kasten.io/
helm repo update
```

### kasten helm install

```
helm pull kasten/k10 --untar <br/>
helm install k10 kasten/k10 --namespace=kasten-io
```

### kasten 설치 결과 확인

```
kubectl get pods -n kasten-io
```

<img width="934" alt="스크린샷 2022-10-20 오전 10 16 42" src="https://user-images.githubusercontent.com/69182192/196835439-7641fdcd-000a-4ea0-a3cc-ae93f3f53478.png">

### kasten ui access 설정

- kasten은 gateway service를통해서 ui를 접근합니다.

```
kubectl --namespace kasten-io port-forward service/gateway 8080:8000
```

### ui 확인

- 아래 url로 접근해야 합니다.

  - kasten ingress 생성할때도 참고 필요 ( /k10/#/ 으로 리다이렉션 해야 함 )

```
http://127.0.0.1:8080/k10/#/
```

- 이메일과 회사 이름을 작성합니다.

<img width="1059" alt="스크린샷 2022-10-20 오전 10 16 59" src="https://user-images.githubusercontent.com/69182192/196835438-b1d988bc-c963-47a2-bfcd-bd5e7d572b34.png">

- Applications
  - namespcae와 같은 단위 입니다.
  - kasten은 application별로 backup & restore 작업을 수행할 수 있습니다.

<img width="1106" alt="스크린샷 2022-10-20 오전 10 17 17" src="https://user-images.githubusercontent.com/69182192/196835437-a9cb2b41-ae2e-4738-a217-e38648a0d4b9.png">

<br/>
<br/>
<br/>
<br/>
<br/>

# BackUP TEST

### **TEST용 argocd install**

- argocd를 통해서 backup test를 진행합니다.

### argocd helm install

```
kubectl create namespace argo
```

### argocd helm repo 추가 및 동기화

```
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
```

### argocd 설치용 helm chart download

```
helm pull argo/argo-cd --untar
```

### argocd helm install

- NodePort로 install

```
helm upgrade --install argocd . \
--namespace=argo \
--set controller.logLevel="info" \
--set server.logLevel="info" \
--set repoServer.logLevel="info" \
--set server.replicas=2 \
--set server.ingress.https=true \
--set repoServer.replicas=2 \
--set controller.enableStatefulSet=true \
--set installCRDs=false \
--set server.service.type=NodePort \
-f values.yaml
```

### 설치 결과 확인

```
kubectl get pods -n argo
```

<img width="1055" alt="스크린샷 2022-10-20 오전 10 17 25" src="https://user-images.githubusercontent.com/69182192/196835436-ff576733-31ca-4850-9248-6c3f7e3aabfa.png">

### admin 계정 password 확인

```
kubectl -n argo get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

### argocd ui 확인

<img width="1114" alt="스크린샷 2022-10-20 오전 10 17 31" src="https://user-images.githubusercontent.com/69182192/196835432-6aeb9457-b862-4153-bd8f-d6e864539f03.png">

## Backup test

<br/>

### Test 프로세스

```
1. elastic repository 등록
2. kibana application 생성 및 배포
3. kasten을 통해 snapshot 생성
4. argocd application 및 repository 제거
5. 생성한 snapshot으로 kasten에서 backup
```

### 1. mysql repository 등록

setting → Repository에서 Connect repo using ssh 버튼으로 elastic repository 등록 →
connect 버튼으로 등록 완료

- Name : ealstic
- Project : default
- Repository URL : https://github.com/elastic/helm-charts.git

<img width="1061" alt="스크린샷 2022-10-20 오전 10 17 36" src="https://user-images.githubusercontent.com/69182192/196835428-49cf9499-b9a4-4d88-835a-dd9efa78ff90.png">

등록 완료 후 상태 확인

<img width="1114" alt="스크린샷 2022-10-20 오전 10 17 41" src="https://user-images.githubusercontent.com/69182192/196835422-cf608e40-0b8f-434d-b49e-8fecf057f1a0.png">

### 2. kibana application 생성 및 배포

먼저 kibana 관리용 namespace를 생성합니다.

```
kubectl create ns kibana
```

- application → NEW APP → kibana helm chart 선택 후 create → sync 버튼으로 배포
  - Application Name : kibana-test
  - Project Name : default
  - Repository URL : https://github.com/elastic/helm-charts.git
  - Revision : HEAD
  - Path : kibana
  - Cluster URL : https://kubernetes.default.svc
  - Namespace : kibana
  - VALUES FILES : values.yaml

kibana 배포

- application 클릭 후 SYNCHRONIZE 버튼 클릭합니다.
  - ( 배포가 되지 않더라도 , 해당 상태로 되돌아오면 backup 이 완료된것이기에 넘어가도록
    합니다. )

<img width="1109" alt="스크린샷 2022-10-20 오전 10 17 46" src="https://user-images.githubusercontent.com/69182192/196835421-6e6450db-7deb-47b7-8a21-b9c2dbbd1b0c.png">

<img width="1116" alt="스크린샷 2022-10-20 오전 10 17 51" src="https://user-images.githubusercontent.com/69182192/196835419-2f6a9293-73b5-40d3-9f04-02e140069660.png">

### snapshot 생성

kasten dashboard 이동 → Application 클릭

<img width="1033" alt="스크린샷 2022-10-20 오전 10 17 56" src="https://user-images.githubusercontent.com/69182192/196835418-55855cae-e5fa-4bb2-9a97-dd8a914f15e7.png">

백업 대상 application ( namespace ) 의 Policy를 생성합니다

- Policy를 생성하는것은 추가 사항입니다. ( 권장 )
- application의 Create a Policy 버튼을 클릭하여 생성합니다.
- snapshot 대상 및 주기 , 고급 옵션을 선택합니다.

<img width="1119" alt="스크린샷 2022-10-20 오전 10 18 01" src="https://user-images.githubusercontent.com/69182192/196835413-0530cb6b-94f1-4747-a3fd-4cdb4a665cab.png">

생성 완료 후 run once 버튼으로 생성한 policy 등록합니다.

- policy는 여러개 생성해 두고 사용할 수 있습니다.

대시보드에서 policy 개수와 policy 등록 상태를 확인할 수 있습니다.

<img width="1055" alt="스크린샷 2022-10-20 오전 10 18 06" src="https://user-images.githubusercontent.com/69182192/196835412-4851834e-7c99-4481-8125-bc36d3008919.png">

policy가 등록된 application은 Compliant With Policies로 status가 변경됩니다.

<img width="1111" alt="스크린샷 2022-10-20 오전 10 18 11" src="https://user-images.githubusercontent.com/69182192/196835409-b36cd0ef-5df7-42c8-abcf-d67aa3bc7698.png">

백업 대상 application의 snapshot을 클릭한 뒤 , profile 등 옵션 선택 후 snapshot 생성합니다.

<img width="1110" alt="스크린샷 2022-10-20 오전 10 18 15" src="https://user-images.githubusercontent.com/69182192/196835407-37e279cc-4161-465a-a336-526652d49c6c.png">

dashboard에서 backup process 상태를 확인할 수 있습니다.

<img width="1014" alt="스크린샷 2022-10-20 오전 10 18 20" src="https://user-images.githubusercontent.com/69182192/196835404-3c49add1-235d-4df6-ad36-decad0db877b.png">

argocd에서 kibana를 제거합니다.

<img width="1116" alt="스크린샷 2022-10-20 오전 10 18 24" src="https://user-images.githubusercontent.com/69182192/196835402-60663e6b-71ef-4631-a9f0-2d68f74be813.png">

elastic repository또한 제거합니다.

<img width="1114" alt="스크린샷 2022-10-20 오전 10 18 30" src="https://user-images.githubusercontent.com/69182192/196835401-8d5f26ff-153c-4923-a326-c1105fc97735.png">

만들어둔 snapshot으로 restore 진행합니다.

- dashboard → applications → argo 탭에서 restore 클릭
  - 생성해둔 snapshot중 한가지 클릭 → restore 클릭

<img width="1112" alt="스크린샷 2022-10-20 오전 10 18 34" src="https://user-images.githubusercontent.com/69182192/196835397-73116086-d465-41cf-9dcb-31d58d230d3f.png">

restore status dashboard에서 확인

<img width="1025" alt="스크린샷 2022-10-20 오전 10 18 39" src="https://user-images.githubusercontent.com/69182192/196835395-3b49881b-17c1-4c17-bd5b-effb41e98706.png">

backup 완료 상태 확인

1. repository 상태 확인

<img width="1117" alt="스크린샷 2022-10-20 오전 10 18 44" src="https://user-images.githubusercontent.com/69182192/196835393-fc6609ff-ecb9-4062-823e-1bd8155b049c.png">

2. application 상태 확인

<img width="1115" alt="스크린샷 2022-10-20 오전 10 18 49" src="https://user-images.githubusercontent.com/69182192/196835387-f861fabb-7af2-48d2-91ce-29d979ff2c97.png">
