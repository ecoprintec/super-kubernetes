---
title: 'Super Kubenetes DevOps 시스템'
keywords: 'Kubernetes, Jenkins, Super Kubenetes, DevOps, cicd'
description: 'Learn how to enable DevOps to further free your developers and let them focus on code writing.'
linkTitle: 'Super Kubenetes DevOps System'
weight: 6300
---

Super Kubenetes DevOps System은 Kubernetes의 CI/CD 워크플로용으로 설계되었습니다. [Jenkins](https://jenkins.io/)를 기반으로 개발 및 운영 팀 모두가 앱을 빌드, 테스트 및 쿠버네티스에 게시하는 데 도움이 되는 원스톱 솔루션을 제공합니다. 또한 플러그인 관리, [Binary-to-Image(B2I)](../../project-user-guide/image-builder/binary-to-image/), [Source-to-Image(S2I) ](../../project-user-guide/image-builder/source-to-image/), 코드 종속성 캐싱, 코드 품질 분석, 파이프라인 로깅 등의 기능도 제공합니다.

DevOps System은 앱이 동일한 플랫폼에 자동으로 출시될 수 있으므로 사용자에게 자동화된 환경을 제공합니다. 또한 써드파티 개인 이미지 레지스트리(예: Harbour) 및 코드 저장소(예: GitLab/GitHub/SVN/BitBucket)와도 호환됩니다. 따라서 에어 갭 환경에서 매우 유용한 포괄적이고 시각화된 CI/CD 파이프라인을 사용자에게 제공하여 탁월한 사용자 경험을 제공합니다.

자세한 내용은 [DevOps 사용 설명서](../../devops-user-guide/)를 참조하세요.

## 설치 전에 DevOps 활성화

### 리눅스에 설치하기

Linux에 Super Kubenetes의 멀티 노드를 설치할 때, 모든 Super Kubenetes 컴포넌트를 열거하는 설정 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서, 기본 파일인 `config-sample.yaml`을 생성합니다. 그리고 다음 명령을 실행하여 파일을 수정하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
       [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 DevOps를 활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션](#enable-devops-after-installation)을 참조하여 설치 후 DevOps를 활성화하는 방법을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `devops`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 설정 파일을 사용하여 클러스터를 생성하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

### 쿠버네티스에 설치

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 devops를 활성화할 수 있습니다.

1. [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 편집하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>

2. 이 로컬 `cluster-configuration.yaml` 파일에서 `devops`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하여 DevOps를 활성화합니다. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 다음 명령을 실행하여 설치를 시작하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>
              
              kubectl apply -f <a style="color:#ffffff; cursor:text;">cluster-configuration.yaml</a></p>
          </code>
        </div>
    </pre>
  </article>

## 설치 후 DevOps 활성화

1. 콘솔에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다. 
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `devops`를 검색하고 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">devops</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

5. 웹 kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      웹 kubectl 도구는 콘솔의 좌측 하단의 모서리의 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-app-store/hammer.png" height="20px">를 클릭하여 찾을 수 있습니다.
    </div>
  </div>

## 컴포넌트 설치 확인

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">대시보드에서 컴포넌트 확인</a></li>
		<li className="nav-item"><a className="nav-link" href="#">kubectl을 통해 컴포넌트 확인</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="대시보드에서 컴포넌트 확인">
			<b>시스템 컴포넌트</b>로 이동하여 <b>DevOps</b> 탭 페이지의 모든 컴포넌트가 <b>정상</b> 상태인지 확인하십시오.
		</main>
		<main className="tab-pane" title="kubectl을 통해 컴포넌트 확인">
			<p>
				다음 명령을 실행하여 파드의 상태를 확인하세요:
			</p>
			<aticle className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>kubectl get pod -n Super Kubenetes-devops-system </code>
					</div>
				</pre>
			</aticle>
			<p>
				컴포넌트가 성공적으로 실행되면 다음과 같은 출력을 볼 수 있습니다:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>
              <p>
                NAME                          READY   STATUS    RESTARTS   AGE
                devops-jenkins-5cbbfbb975-hjnll   1/1     Running   <span style="color:#ae81ff">0</span>          40m
                s2ioperator-0                 1/1     Running   <span style="color:#ae81ff">0</span>          41m
              </p>
            </code>
          </div>
				</pre>
			</article>
		</main>
	</div>
</main>
