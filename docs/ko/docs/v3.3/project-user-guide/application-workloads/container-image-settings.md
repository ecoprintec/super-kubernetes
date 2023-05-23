---
title: "파드 설정"
keywords: 'Super Kubenetes, Kubernetes, image, workload, setting, container'
description: 'Learn different properties on the dashboard in detail as you set Pods for your workload.'
linkTitle: "Pod Settings"
weight: 10280
---

디플로이먼트, StatefulSet 또는 DaemonSet를 생성할 때 파드를 명확히 지정해야 합니다. 동시에 Super Kubenetes는 상태 확인 프로브, 환경 변수 및 시작 커맨드과 같은 워크로드의 설정을 사용자 정의할 수 있는 다양한 옵션을 사용자에게 제공합니다. 이 페이지에서는 **파드 설정**의 다양한 특징에 대한 자세한 설명을 예시합니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       우측 상단 모서리에서 ** YAML 편집**을 활성화하면, 대시보드에서 속성 매니페스트 파일(YAML 형식)에서 해당 값을 확인할 수 있습니다.
     </div>
   </div>

## 파드 설정

### 파드 레플리카

매니페스트 파일의 '.spec.dll' 영역에 표시되는 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/container-image-settings/plus-icon.png" width="20px" alt="icon" /> 또는 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/container-image-settings/minus-icon.png" width="20px" alt="icon" />를 클릭하여 복제 파드 수를 설정하세요. DaemonSet에는 이 옵션을 사용할 수 없습니다.


만약 멀티 클러스터 프로젝트에서 디플로이먼트를 생성한다면, **레플리카 예약 모드**에서 레플리카 예약 모드를 선택하세요.

- **레플리카 지정**: 클러스터를 선택하고 각 클러스터의 파드 레플리카 수를 설정합니다.
- **가중치 지정**: 클러스터를 선택하고 **총 레플리카 수**에서 총 파드 레플리카 수를 설정하고, 각 클러스터에 대한 가중치를 지정합니다. 파드 레플리카는 가중치에 따라 클러스터에 비례하여 예약됩니다. 디플로이먼트가 생성된 후 가중치를 변경하려면, 디플로이먼트 이름을 클릭하여 세부 정보 페이지로 이동하고, **리소스 상태** 탭의 **가중치**에서 가중치를 변경하세요.

멀티 클러스터 프로젝트에서 StatefulSet을 생성하는 경우, 클러스터를 선택하고 **파드 레플리카**에서 각 클러스터의 파드 레플리카 수를 설정합니다.

### 컨테이너 추가

**컨테이너 추가**를 클릭하여 컨테이너를 추가합니다.

#### 이미지 검색창

우측의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/container-image-settings/cube-icon.png" width="20px" alt="icon" />을 클릭하여 목록에서 이미지를 선택하거나, 이미지 이름을 입력하여 검색할 수 있습니다. Super Kubenetes는 Docker Hub 이미지와 프라이빗 이미지 리포지토리를 제공합니다. 프라이빗 이미지 리포지토리를 사용하려면 **설정** 아래의 **시크릿**에서 먼저 이미지 레지스트리 시크릿을 생성해야 합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    검색창에 이미지 이름을 입력한 후 키보드에서 **Enter**키를 누르는 것을 잊지 마십시오.
  </div>
</div> 

#### 이미지 태그

`이미지이름:태그`와 같이 태그를 입력할 수 있습니다. 이를 지정하지 않으면 기본적으로 최신 버전으로 설정됩니다.

#### 컨테이너 이름

컨테이너 이름은 Super Kubenetes에 의해 자동으로 생성되며 `.spec.containers.name`으로 표시됩니다.

#### 컨테이너 유형

**초기화 컨테이너**를 선택하면, 워크로드에 대해 초기화 컨테이너가 생성된다는 의미입니다. 초기화 컨테이너에 대한 자세한 내용은 [초기화 컨테이너] (https://kubernetes.io/docs/concepts/workloads/pods/init-containers/?spm=a2c4g.11186623.2.19.16704b3e9qHXPb)를 참고하세요.

#### 리소스 요청량

컨테이너가 예약한 리소스에는 CPU 및 메모리 리소스가 모두 포함됩니다. 이는 컨테이너의 리소스 독점으로 리소스가 부족해져서, 다른 서비스나 프로세스가 리소스를 놓고 경쟁하지 못하게 하여, 결국 애플리케이션을 사용할 수 없게 됨을 의미합니다.

- CPU 요청량은 매니페스트 파일에서 `.spec.containers[].resources.requests.cpu`로 표시됩니다. CPU 요청량은 초과될 수 있습니다.
- 메모리 요청량은 매니페스트 파일에서 `.spec.containers[].resources.requests.memory`로 표시됩니다. 메모리 요청량은 초과될 수 있지만 노드 메모리가 부족하면 컨테이너가 지워질 수 있습니다.

#### 리소스 상한

CPU, 메모리 및 GPU를 포함하여 애플리케이션이 사용할 수 있는 리소스의 상한을 지정하여 리소스가 과도하게 점유되는 것을 방지할 수 있습니다.

- CPU 상한은 매니페스트 파일의 `.spec.containers[].resources.limits.cpu`로 표시됩니다. CPU 상한은 잠시 동안 초과될 수 있으며 컨테이너는 중지되지 않습니다.
- 메모리 상한은 매니페스트 파일의 `.spec.containers[].resources.limits.memory`로 표시됩니다. 메모리 상한을 초과할 수 없습니다. 만약 초과하면 컨테이너가 중지되거나 리소스가 충분한 다른 시스템에게 예약될 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    CPU 리소스는 CPU 단위로 측정되며, Super Kubenetes에서는 **코어**로 측정됩니다. 메모리 리소스는 바이트 단위로 측정되며, Super Kubenetes에서는 **MiB**입니다.
  </div>
</div>


**GPU 유형**을 설정하려면 드롭다운 목록에서 GPU 유형을 선택하세요. 기본값은 `nvidia.com/gpu`입니다. **GPU 상한**은 기본적으로 상한이 없습니다.

#### **포트 설정**

컨테이너에 대한 접속 프로토콜과 포트 정보를 설정해야 합니다. 기본 설정을 사용하려면 **기본 포트 사용**을 클릭하세요.

#### **이미지 가져오기 정책**

이 값은 `imagePullPolicy` 영역으로 표시됩니다. 대시보드의 드롭다운 목록에서 다음 세 가지 옵션 중 하나를 선택할 수 있습니다.

- **로컬 이미지 먼저 사용**: 이미지가 로컬에 존재하지 않는 경우에만 이미지를 가져온다는 의미입니다.

- **이미지 항상 가져오기**: 파드가 시작될 때마다 이미지를 가져옴을 의미합니다.

- **로컬 이미지만 사용**: 이미지가 존재하든 존재하지 않든 이미지를 가져오지 않는다는 의미입니다.

<div className="notices tip">
	<p>Tip</p>
	<div>
		- 기본값은 **로컬 이미지 먼저 사용**이지만 `:latest`로 태그가 지정된 이미지의 값은 기본적으로 **이미지 항상 가져오기**입니다.
		- 이미지를 가져올 때 Docker를 확인하세요. MD5가 변경되지 않은 경우 가져오지 않습니다.
		- 운영 환경에서는 `:latest` 태그를 최대한 피해야 하며, 개발 환경에서는 `:latest` 태그에 의해 최신 이미지가 자동으로 가져와질 수 있습니다.
	</div>
</div>

#### **헬스 체크**

활성 체크, 준비 체크 및 스타트업 체크를 지원합니다.

- **활성 체크**: 활성 프로브는 `livenessProbe`로 표시되는 컨테이너가 실행 중인지 여부를 확인하는 데 사용됩니다.

- **준비 체크**: 준비 프로브는 `readinessProbe`로 표시되는 컨테이너가 요청을 처리할 준비가 되었는지 여부를 확인하는 데 사용됩니다.

- **스타트업 체크**: 스타트업 프로브는 `startupProbe`로 표시되는 컨테이너 애플리케이션이 시작되었는지 여부를 확인하는 데 사용됩니다.

활성, 준비, 스타트업 체크에는 다음 설정이 포함됩니다.

- **HTTP 요청**: 컨테이너의 IP 주소에 대해 지정된 포트 및 경로에 대해 HTTP `Get` 요청을 수행합니다. 응답 상태 코드가 200 이상 400 미만이면 진단이 성공한 것으로 간주합니다. 지원되는 파라미터는 다음과 같습니다:

  - **경로**: HTTP 또는 HTTPS (`scheme`으로 지정), HTTP 서버에 접속하기 위한 경로 (`경로`로 지정), 접속 포트 또는 포트 이름은 컨테이너에 의해 노출됩니다. 포트 번호는 1에서 65535 사이여야 합니다. 값은 `포트`로 지정됩니다.
  - **초기 지연(초)**: 활성 프로브가 시작되기 전에, 컨테이너가 시작된 다음 지난 시간(초)이며, `initialDelaySeconds`로 지정. 기본값은 0입니다.
  - **체크 간격(s)**: 프로브 주파수(초)이며, `periodSeconds`로 지정. 기본값은 10이고, 최소값은 1입니다.
  - **시간 초과(s)**: 프로브가 시간 초과되는 시간(초)이며, `timeoutSeconds`로 지정. 기본값은 1이고, 최소값은 1입니다.
  - **성공 임계값**: 실패 이후, 프로브가 성공으로 간주되는 최소 연속 성공값이며, `successThreshold`로 지정. 기본값은 1이고, (활성과 스타트업을 위해 반드시 1이어야 함) 최소값은 1입니다.
  - **실패 임계값**: 성공 이후, 프로브가 실패로 간주되는 최소 연속 실패값이며, `failureThreshold`로 지정. 기본값은 3이고, 최소값은 1입니다.

- **TCP 포트**: 컨테이너의 IP 주소에서 지정된 포트에 대한 TCP 체크를 수행합니다. 포트가 열려 있으면 진단이 성공한 것으로 간주합니다. 지원되는 파라미터는 다음과 같습니다:
  
  - **포트**: 접속 포트나 포트 이름이 컨테이너에 의해 노출됩니다. 포트 번호는 1에서 65535 사이여야 합니다. 값은 `포트`로 지정됩니다.
  - **초기 지연(초)**: 활성 프로브가 시작되기 전에, 컨테이너가 시작된 다음 지난 시간(초)이며, `initialDelaySeconds`로 지정. 기본값은 0입니다.
  - **체크 간격(s)**: 프로브 주파수(초)이며, `periodSeconds`로 지정. 기본값은 10이고, 최소값은 1입니다.
  - **시간 초과(s)**: 프로브가 시간 초과되는 시간(초)이며, `timeoutSeconds`로 지정. 기본값은 1이고, 최소값은 1입니다.
  - **성공 임계값**: 실패 이후, 프로브가 성공으로 간주되는 최소 연속 성공값이며, `successThreshold`로 지정. 기본값은 1이고, (활성과 스타트업을 위해 반드시 1이어야 함) 최소값은 1입니다.
  - **실패 임계값**: 성공 이후, 프로브가 실패로 간주되는 최소 연속 실패값이며, `failureThreshold`로 지정. 기본값은 3이고, 최소값은 1입니다.
  
- **커맨드**: 컨테이너에서 지정된 명령을 실행합니다. 명령이 종료될 때 반환 코드가 0이면 진단이 성공한 것으로 간주합니다. 지원되는 매개 변수는 다음과 같습니다:
  
  - **커맨드**: 컨테이너의 헬스를 감지하는 데 사용되는 감지 명령으로 `exec.command`로 지정.
  - **초기 지연(초)**: 활성 프로브가 시작되기 전에, 컨테이너가 시작된 다음 지난 시간(초)이며, `initialDelaySeconds`로 지정. 기본값은 0입니다.
  - **체크 간격(s)**: 프로브 주파수(초)이며, `periodSeconds`로 지정. 기본값은 10이고, 최소값은 1입니다.
  - **시간 초과(s)**: 프로브가 시간 초과되는 시간(초)이며, `timeoutSeconds`로 지정. 기본값은 1이고, 최소값은 1입니다.
  - **성공 임계값**: 실패 이후, 프로브가 성공으로 간주되는 최소 연속 성공값이며, `successThreshold`로 지정. 기본값은 1이고, (활성과 스타트업을 위해 반드시 1이어야 함) 최소값은 1입니다.
  - **실패 임계값**: 성공 이후, 프로브가 실패로 간주되는 최소 연속 실패값이며, `failureThreshold`로 지정. 기본값은 3이고, 최소값은 1입니다.

 헬스 체크에 대한 자세한 내용은 [컨테이너 프로브] (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)를 참고하세요.

#### **시작 커맨드**

기본적으로 컨테이너는 기본 이미지 명령을 실행합니다.

- **커맨드**는 매니페스트 파일에 있는 컨테이너의 `command` 영역을 나타냅니다.
- **파라미터**는 매니페스트 파일에 있는 컨테이너의 `args` 영역을 나타냅니다.

커맨드에 대한 자세한 내용은 [컨테이너를 위한 커맨드와 인자 정의하기](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/)를 참고하세요.

#### **환경 변수**

키-값 쌍의 형태로 파드에 대한 환경 변수를 설정합니다.

- 이름: 환경 변수의 이름, `env.name`으로 지정.
- 값: 참조된 변수의 값, `env.value`로 지정.
- 기존의 ConfigMap 또는 시크릿을 사용하려면 **configmap에서** 또는 **시크릿에서**를 클릭하세요.

커맨드에 대한 자세한 내용은 [파드 변수](https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/?spm=a2c4g.11186623.2.20.16704b3e9qHXPb)를 참고하세요.

#### **컨테이너 보안 컨텍스트**

보안 컨텍스트는 파드나 컨테이너에 대한 권한 및 접속 제어 설정을 정의합니다. 보안 컨텍스트에 대한 자세한 내용은 [파드 보안 정책](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)을 참고하세요.

#### **호스트 시간대 동기화**

컨테이너의 시간대는 동기화 후 호스트의 시간대와 일치합니다.

## **업데이트 전략**

### 파드 업데이트

업데이트 전략은 워크로드마다 다릅니다.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">디플로이먼트</a></li>
		<li className="nav-item"><a className="nav-link" href="#">스테이트풀셋</a></li>
		<li className="nav-item"><a className="nav-link" href="#">데몬셋</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="디플로이먼트">
			<p>
				<code>.spec.strategy</code> 영역은 이전 파드를 새 파드로 교체하는 데 사용되는 전략을 지정합니다. <code>.spec.strategy.type</code>은 <code>Recreate</code> 또는 <code>Rolling Update</code>일 수 있습니다. <code>Rolling Update</code>가 기본값입니다.
			</p>
			<ul>
				<li>
				<p>
					<b>롤링 업데이트(권장)</b>
				</p>
				<p>
					롤링 업데이트는 이전 버전의 인스턴스가 새 버전으로 점진적으로 대체됨을 의미합니다. 업그레이드 프로세스 동안, 트래픽이 로드 밸런스되고 이전 인스턴스와 새 인스턴스에 동시에 배당되므로, 서비스가 중단되지 않습니다.
				</p>
				</li>
				<li>
				<p>
					<b>동시 업데이트</b>
				</p>
				<p>
					모든 기존 파드는 새 파드가 생성되기 전에 종료됩니다. 업데이트가 진행되는 동안 서비스가 중단됨을 유의하세요.
				</p>
				</li>
			</ul>
			<p>
				업데이트 전략에 대한 자세한 내용은 <a href=" https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy">디플로이먼트 전략</a>을 참조하세요.
			</p>
		</main>
		<main className="tab-pane" title="스테이트풀셋">
			<p>
				<b>업데이트 전략</b> 아래의 드롭다운 메뉴는 매니페스트 파일에 있는 스테이트풀셋의 <code>.spec.updateStrategy</code> 영역으로 표시됩니다. 이를 통해 파드 컨테이너, 태그, 리소스 요청 또는 상한, 주석의 업데이트를 처리할 수 있습니다. 여기엔 두 가지의 전략이 있습니다:
			</p>
			<ul>
				<li>
				<p>
					<b>롤링 업데이트(권장)</b>
				</p>
				<p>
					<code>.spec.template</code>이 업데이트되면, 교체용으로 생성된 새 파드가 생성되면서 스테이트풀셋의 파드가 자동으로 삭제됩니다. 파드는 역순으로 업데이트되고, 순차적으로 삭제되고 생성됩니다. 새 파드 업데이트는 이전 파드가 업데이트된 후 작동될 때까지 시작되지 않습니다.
				</p>
				</li>
				<li>
				<p>
					<b>삭제 시 업데이트</b>
				</p>
				<p>
					<code>.spec.template</code>이 업데이트되면, 스테이트풀셋의 파드는 자동으로 업데이트되지 않습니다. 컨트롤러가 새 파드를 생성할 수 있도록 이전 파드를 수동으로 삭제해야 합니다.
				</p>
				</li>
			</ul>
			<p>
				업데이트 전략에 대한 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies">스테이트풀셋 업데이트 전략</a>을 참고하세요.
			</p>
		</main>
		<main className="tab-pane" title="데몬셋">
			<p>
				<b>업데이트 전략</b> 아래의 드롭다운 메뉴는 매니페스트 파일에 있는 데몬셋의 <code>.spec.updateStrategy</code> 영역으로 표시됩니다. 이를 통해 파드 컨테이너, 태그, 리소스 요청 또는 상한, 주석의 업데이트를 처리할 수 있습니다. 여기엔 두 가지 전략이 있습니다.
			</p>
			<ul>
				<li>
				<p>
					<b>롤링 업데이트(권장)</b>
				</p>
				<p>
					<code>.spec.template</code>이 업데이트되면, 새 파드가 생성되면서 이전 데몬셋 파드는 제어된 방식으로 자동 종료됩니다. 전체 업데이트 프로세스 동안 각 노드에서 최대 하나의 데몬셋 파드가 실행됩니다.
				</p>
				</li>
				<li>
				<p>
					<b>삭제 시 업데이트</b>
				</p>
				<p>
					<code>.spec.template</code>이 업데이트되면, 이전 데몬셋 파드를 수동으로 삭제할 때만 새 데몬셋 파드가 생성됩니다. 이는 쿠버네티스 버전 1.5 이하의 데몬셋과와 동일한 동작입니다.
				</p>
				</li>
			</ul>
			<p>
				업데이트 전략에 대한 자세한 내용은 <a href="https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/#daemonset-update-strategy">데몬셋 업데이트 전략</a >을 참고하세요.
			</p>
		</main>
	</div>
</main>



### 롤링 업데이트 설정
<main class="code-tabs">
	<ul class="nav nav-tabs">
		<li class="nav-item active"><a class="nav-link" href="#">디플로이먼트</a></li>
		<li class="nav-item"><a class="nav-link" href="#">스테이트풀셋</a></li>
		<li class="nav-item"><a class="nav-link" href="#">데몬셋</a></li>
	</ul>
	<div class="tab-content">
		<main class="tab-pane active" title="디플로이먼트">
			<p>
				디플로이먼트의 <strong>롤링 업데이트 설정</strong>은 스테이트풀셋의 설정과 다릅니다.
			</p>
			<ul>
				<li><strong> 최대 사용할 수 없는 파드</strong>: 업데이트 중에 사용할 수 없는 파드의 최대 개수로, <code>maxUnavailable</code>로 지정됩니다. 기본값은 25%입니다.</li>
				<li><strong>최대 여분 파드</strong>: 바라는 파드 수 이상으로 예약할 수 있는 파드의 최대 개수로, <code>maxSurge</code>로 지정됩니다. 기본값은 25%입니다.</li>
		</main>
		<main class="tab-pane" title="스테이트풀셋">
			<strong>파드 레플리카 분할을 위한 서수</strong>: 업데이트를 분할하면, 파티션에서 설정한 값보다 크거나 같은 서수를 가진 모든 파드는 스테이트풀셋의 파드 사양을 업데이트할 때 업데이트됩니다. 이 영역은 <code>.spec.updateStrategy.rollingUpdate.partition</code>에 의해 지정되며 기본값은 0입니다. 파티션에 대한 자세한 내용은 <a href="https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions">파티션</a>을 참고하세요.
		</main>
		<main class="tab-pane" title="데몬셋">
			<p>
				데몬셋의 <strong>롤링 업데이트 설정</strong>은 스테이트풀셋의 설정과 다릅니다.
			</p>
			<ul>
				<li><strong>파드 준비를 위한 최소 실행 시간(초)</strong>: 새로 생성된 데몬셋의 파드가 사용 가능한 것으로 처리되기 까지의 최소 시간(초)으로, <code>minReadySeconds</code>로 지정됩니다. 기본값은 0입니다.</li>
			</ul>
		</main>
	</div>
</main>




### 파드 보안 컨텍스트

보안 컨텍스트는 파드 또는 컨테이너에 대한 권한 및 접속 제어 설정을 정의합니다. 파드 보안 정책에 대한 자세한 내용은 [파드 보안 정책](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)을 참고하세요.

### 파드 예약 규칙

다른 배포 모드를 선택하여 파드 간 선호도와 파드 간 반선호도 간에 전환할 수 있습니다. 쿠버네티스에서 파드 간 선호도는 `affinity` 영역의 `podAffinity` 영역으로 지정되고 파드 간 반선호도는 `affinity` 영역의 `podAntiAffinity` 영역으로 지정됩니다. Super Kubenetes에서는 ` podAffinity`와 `podAntiAffinity`가 모두 `preferredDuringSchedulingIgnoredDuringExecution`으로 설정됩니다. 오른쪽 상단 모서리에서 **YAML 편집**을 활성화하여 영역 세부정보를 볼 수 있습니다.

- **분산 스케줄링**은 반선호도을 나타냅니다.
- **중앙 집중식 예약**은 선호도를 나타냅니다.
- **사용자 지정 규칙**은 필요에 따라 사용자 지정 일정 규칙을 추가하는 것입니다.

선호도 및 반선호도에 대한 자세한 내용은 [파드 선호도](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity)를 참고하세요.
