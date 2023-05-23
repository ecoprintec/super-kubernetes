---
title: '잡'
keywords: 'Super Kubenetes, Kubernetes, Docker, Jobs'
description: 'Learn basic concepts of Jobs and how to create Jobs on Super Kubenetes.'
linkTitle: 'Jobs'
weight: 10250
---

잡은 하나 이상의 파드를 생성하고 지정된 수의 파드가 성공적으로 종료되도록 합니다. 파드가 성공적으로 완료되면 잡은 그 성공적인 완료를 추적합니다. 성공적인 완료가 지정된 수에 도달하면 이 작업(잡)이 완료됩니다. 잡을 삭제하면 잡이 생성한 파드도 정리됩니다.

간단한 경우는 하나의 파드를 안정적으로 실행하여 완료하기 위해 하나의 잡 오브젝트를 생성하는 것입니다. (예를 들어, 노드 하드웨어 오류나 노드 재부팅으로 인해) 첫 번째 파드가 실패하거나 삭제되면, 잡 오브젝트는 새 파드를 시작할 것입니다. 또한 잡을 사용하여 여러 파드를 병렬로 실행할 수도 있습니다.

다음 예는 Super Kubenetes에서 잡을 생성하는 특정 단계(π를 소수점 이하 2000자리까지 계산)를 시연합니다.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 잡 생성

### 1단계: 대시보드 열기

콘솔에 `project-regular`로 로그인하세요. **애플리케이션 워크로드** 아래의 **잡**으로 이동하고 **생성**을 클릭하세요.

### 2단계: 기본 정보 입력

기본 정보를 입력합니다. 다음은 파라미터 설명입니다:

- **이름**: 잡의 이름으로, 고유 식별자이기도 함.
- **별칭**: 잡의 별칭 이름으로, 리소스를 더 쉽게 식별할 수 있습니다.
- **설명**: 잡에 대한 설명으로, 잡에 대한 간략한 소개를 제공합니다.

### 3단계: 전략 설정(선택사항)

이 단계의 값들을 설정하거나, 또는 **다음**을 클릭하여 기본값을 사용할 수 있습니다. 각 영역에 대한 자세한 설명은 아래 표를 참조하세요.

| 이름          | 정의                         | 설명                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 최대 재시도   | `spec.backoffLimit`          | 이 잡이 실패로 표시되기 전에 재시도할 최대 횟수를 지정합니다. 기본값은 6입니다.                                                                                                                                                                                                                                                                                                                 |
| 완료 파드     | `spec.completions`           | 잡을 실행해야 하는 파드가 성공적으로 완료될 원하는 횟수를 지정합니다. nil로 설정하는 것은 어떤 파드의 성공이 모든 파드의 성공을 의미하며, 병렬 처리가 양수의 값을 가질 수 있도록 합니다. 1로 설정하면 병렬 처리가 1로 제한되고 해당 파드의 성공은 잡의 성공을 의미합니다. 자세한 내용은 [잡](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/)을 참조하십시오. |
| 병렬 파드     | `spec.parallelism`           | 지정된 시간에 잡을 실행할 최대 파드 수를 지정합니다. 남은 작업이 최대 병렬 처리보다 적을 때, 정상 상태에서 실행되는 실제 파드 수는 이 수보다 작습니다. (`.spec.completions - .status.successful`) < `.spec.parallelism`). 자세한 내용은 [잡](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/)을 참조하십시오.                                                 |
| 최대 기간(초) | `spec.activeDeadlineSeconds` | 시스템이 잡을 종료하려고 시도하기 전에 잡이 활성화될 수 있는 기간(초)을 startTime을 기점으로 지정합니다. 값은 양의 정수여야 합니다.                                                                                                                                                                                                                                                             |

### 4단계: 파드 설정

1. **재시작 정책**에 대해 **파드 재생성**을 선택하세요. 잡이 완료되지 않은 경우, **재시작 정책**에 대해 **파드 재생성** 또는 **컨테이너 재시작**만 지정할 수 있습니다.

   - **재시작 정책**이 **파드 재생성**으로 설정된 경우, 파드가 실패할 때 잡이 새 파드를 생성하고, 실패한 파드는 사라지지 않습니다.

   - **재시작 정책**이 **컨테이너 재시작**으로 설정된 경우, 잡은 파드가 실패할 때 새 파드를 생성하는 대신 내부적으로 컨테이너를 다시 시작합니다.

2. **컨테이너 추가**를 클릭하면 **컨테이너 추가** 페이지로 이동합니다. 이미지 검색창에 `perl`을 입력하고 **확인**을 누르세요.

3. 같은 페이지에서 **시작 커맨드**까지 아래로 스크롤하세요. 파이를 2000 자리까지 계산하고 이를 출력하기 위해 네모칸에 다음 명령을 입력하세요. 우측 하단의 **√**를 클릭하고, 계속하기 위해 **다음**을 선택하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                perl,-Mbignum<span style="color:#f92672">=</span>bpi,-wle,print bpi<span style="color:#f92672">(</span>2000<span style="color:#f92672">)</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이미지 설정에 대한 자세한 내용은 [파드 설정](../container-image-settings/)을 참조하십시오.
    </div>
  </div>

### 5단계: 잡 매니페스트 검사(선택 사항)

1. 오른쪽 상단 모서리에 표시된 잡의 매니페스트 파일에서 **YAML 편집**을 활성화합니다. 이전 단계에서 지정한 값을 기반으로 모든 값이 설정되었음을 확인할 수 있습니다.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										<span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">batch/v1</span> 
   										<span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Job</span> 
   										<span style="color:#f92672">metadata</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">demo-project</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">job-test-1</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">job-test-1</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;annotations</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes.io/alias-name</span>: <span style="color:#ae81ff">Test</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes.io/description</span>: <span style="color:#ae81ff">A job test</span> 
   										<span style="color:#f92672">spec</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;template</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">job-test-1</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
   										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">container-4rwiyb</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">perl</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</span>: 
   										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">perl</span> 
   										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">'-Mbignum=bpi'</span> 
   										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">'-wle'</span> 
   										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">print bpi(2000)</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restartPolicy</span>: <span style="color:#ae81ff">Never</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceAccount</span>: <span style="color:#ae81ff">default</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initContainers</span>: [] 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes</span>: [] 
   										<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullSecrets</span>: <span style="color:#66d9ef">null</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;backoffLimit</span>: <span style="color:#ae81ff">5</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;completions</span>: <span style="color:#ae81ff">4</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;parallelism</span>: <span style="color:#ae81ff">2</span> 
   										<span style="color:#f92672">&nbsp;&nbsp;activeDeadlineSeconds</span>: <span style="color:#ae81ff">300</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>


2. 매니페스트에서 직접 설정하고 **생성**을 클릭하거나, **YAML 편집**을 비활성화하고 **생성** 페이지로 돌아갈 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 튜토리얼에서는 **스토리지 설정** 및 **고급 설정**을 건너뛸 수 있습니다. 자세한 내용은 [볼륨 마운트](../deployments/#step-4-mount-volumes)와 [고급 설정](../deployments/#step-5-configure-advanced-settings)을 참조하세요.
    </div>
  </div>

### 6단계: 결과 확인

1. **고급 설정**의 마지막 단계에서 **생성**을 클릭하여 완료합니다. 생성이 완료되면 새 항목이 잡 목록에 추가됩니다.

2. 이 잡을 클릭하고 **잡 기록**으로 이동하면 각 실행 기록의 정보를 볼 수 있습니다. 3단계에서 **Completions**가 `4`로 설정되었기 때문에 4개의 완료된 파드가 있습니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       만약 잡이 실패하고 **메시지** 아래에 실패 이유가 표시되면, 잡을 다시 실행할 수 있습니다.
     </div>
   </div>

3. **리소스 상태**에서 파드 상태를 검사할 수 있습니다. **병렬 파드**가 2로 설정되었으므로 매번 2개의 파드가 생성되었습니다. 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/down-arrow.png" width="20px" alt="icon" />을 클릭하고, <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/container-log-icon.png" width="20px" alt="icon" />을 클릭하여 예상 계산 결과를 표시하는 컨테이너 로그를 확인하세요.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       - **리소스 상태**에서 파드 목록은 파드의 세부 정보(예: 생성 시간, 노드, 파드 IP, 모니터링 데이터)를 제공합니다.
       - 파드를 클릭하면 컨테이너 정보를 볼 수 있습니다.
       - 컨테이너 로그 아이콘을 클릭하면 컨테이너의 출력 로그를 볼 수 있습니다.
       - 파드 이름을 클릭하면 파드 세부 정보 페이지를 볼 수 있습니다.
     </div>
   </div>

## 잡 내용 확인

### 작업

잡 세부 정보 페이지에서, 잡이 생성된 후 이를 관리할 수 있습니다.

- **정보 편집**: 잡의 `이름`을 제외한, 기본 정보를 편집.
- **재실행**: 잡을 다시 실행. 파드가 다시 시작되고 새 실행 레코드가 생성됩니다.
- **YAML 보기**: 잡의 세부사항을 YAML 형식으로 봅니다.
- **삭제**: 잡을 삭제하고 잡 목록 페이지로 돌아갑니다.

### 실행 기록

1. 잡의 실행 기록을 보려면 **잡 기록** 탭을 클릭하세요.

2. <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/refresh.png" width="20px" alt="icon" />을 클릭하여 실행 기록을 새로 고침하세요.

### 리소스 상태

1. 잡의 파드를 보려면 **리소스 상태** 탭을 클릭하세요.

2. <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/refresh.png" width="20px" alt="icon" />을 클릭하여 파드 정보를 새로 고침하고, <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/display.png" width="20px" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/hide.png" width="20px" />를 클릭하여 각 파드의 컨테이너를 표시/숨깁니다.

### 메타데이터

잡의 레이블과 주석을 보려면 **메타데이터** 탭을 클릭하세요.

### 환경 변수

잡의 환경 변수를 확인하려면 **환경 변수** 탭을 클릭하세요.

### 이벤트

잡의 이벤트를 보려면 **이벤트** 탭을 클릭하세요.
