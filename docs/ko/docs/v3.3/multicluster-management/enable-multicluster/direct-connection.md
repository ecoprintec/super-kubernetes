---
title: "직접 연결"
keywords: 'Kubernetes, Super Kubenetes, multicluster, hybrid-cloud, direct-connection'
description: 'Understand the general steps of importing clusters through direct connection.'
titleLink: "Direct Connection"
weight: 5210
---

If the kube-apiserver address of the member cluster is accessible on any node of the host cluster, you can adopt **Direction Connection**. This method is applicable when the kube-apiserver address of the member cluster can be exposed or host cluster and member cluster are in the same private network or subnet.

에이전트를 이용한 멀티 클러스터 기능을 사용하려면, 각각 호스트 클러스터와 멤버 클러스터 역할을 하는 두 개 이상의 클러스터가 있어야 합니다. 클러스터는 Super Kubenetes를 설치하기 전이나 설치한 후 언제든 호스트 클러스터 또는 멤버 클러스터로 정의할 수 있습니다. Super Kubenetes 설치에 대한 자세한 내용은 [Linux에 설치](../../../installing-on-linux/) 및 [Kuberix에 설치] (../../../installing-on-kubernetes/)를 참조하십시오.

## 영상 시연

## 호스트 클러스터 준비

호스트 클러스터는 중앙 컨트롤 플레인을 제공하며, 호스트 클러스터는 하나만 정의할 수 있습니다.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#"Super Kubenetes 설치 후</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes 설치 전</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes 설치 후">
			<p>이미 독립형 Super Kubenetes 클러스터가 설치된 경우 클러스터 구성을 편집하여 <code>clusterRole</code> 값을 <code>호스트</code>로 설정할 수 있습니다.</p>
			- 옵션 A - 웹 콘솔 사용:

				`admin` 계정을 사용하여 콘솔에 로그인하고 **클러스터 관리** 페이지의 **CRDs*로 이동하세요. 키워드'ClusterConfiguration'을 입력하고 세부 정보 페이지로 이동합니다. ks-installer`의 YAML을 편집하세요. 이것은 [Enable Pluggable Components](../../../pluggable Components/)와 유사합니다.

			- 옵션 B - Kubectl 사용:

				<article className="highlight">
					<pre>
						<div className="copy-code-button" title="Copy Code"></div>
						<div className="code-over-div">
							<code>kubectl edit cc ks-installer -n Super Kubenetes-system</code>
						</div></pre></article>

			<p>`ks-installer`의 YAML 파일에서 `multicluster`로 이동하여 `clusterRole`의 값을 `host`로 설정한 다음 **확인**(웹 콘솔을 사용하는 경우)을 클릭하여 적용하세요:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span></p>
						</code>
					</div></pre></article>

			<p>호스트 클러스터 이름을 설정하려면 <code>ks-installer</code>의 YAML 파일에서 <code>multicluster.clusterRole</code> 아래에 <code>hostClusterName</code> 영역을를 추가하세요:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span> 
								<span style="color:#f92672">hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
						</code>
					</div>
				</pre>
			</article>

			<article className="notices note">
				<p>Note</p>
				<div>
					- 호스트 클러스터를 준비하는 동안 호스트 클러스터 이름을 설정하는 것이 좋습니다. 리소스가 배포된 상태에서 호스트 클러스터가 설정되고 실행되고 있다면, 호스트 클러스터 이름을 설정하는 것을 추천하지 않습니다.
					- 호스트 클러스터 이름은 소문자, 숫자, 하이픈(-) 또는 마침표(.)만 포함할 수 있으며, 시작과 끝은 소문자 또는 숫자여야 합니다.
				</div>
			</article>

			변경 사항이 적용되려면 잠시 기다려야 합니다.				
		</main>
		<main className="tab-pane" title="Super Kubenetes 설치 전">
			<p>Linux 또는 기존의 쿠버네티스 클러스터에 Super Kubenetes를 설치하기 전에 호스트 클러스터를 정의할 수 있습니다. 만약 <a href="../../../installing-on-linux/introduction/multioverview/#1-create-an-example-configuration-file">Linux에 Super Kubenetes를 설치</a>하려면, <code>config-sample.yaml</code> 파일을 사용하세요. 만약 <a href="../../../installing-on-kubernetes/introduction/overview/#deploy-Super Kubenetes">기존 쿠버네티스 클러스터에 Super Kubenetes를 설치</a>하려면, 두 개의 YAML 파일을 사용하세요. 그 중 하나는 <code>cluster-configuration.yaml</code> 입니다.</p>

			<p>호스트 클러스터를 설정하려면, Super Kubenetes를 설치하기 전에 <code>config-sample.yaml</code> 또는 <code>cluster-configuration.yaml </code>에서 <code>clusterRole</code>의 값을 <code>host</code>로 변경하십시오. 

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span></p>
						</code>
					</div></pre></article>

			<p>호스트 클러스터 이름을 설정하려면 <code>config-sample.yaml</code> 또는 <code>cluster-configuration.yaml</code> 파일에서 <code>multicluster.clusterRole</code> 아래에 <code>hostClusterName</code> 영역을를 추가하세요:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span> 
								<span style="color:#f92672">hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
						</code>
					</div>
				</pre>
			</article>

			<article className="notices note">
				<p>Note</p>
				<div>
					- 호스트 클러스터 이름은 소문자, 숫자, 하이픈(-) 또는 마침표(.)만 포함할 수 있으며, 시작과 끝은 소문자 또는 숫자여야 합니다.
				</div>
			</article>

			<article className="notices info">
				<p>Note</p>
				<div>
					단일 노드 클러스터([All-in-One](../../../quick-start/all-in-one-on-linux/))에 Super Kubenetes를 설치하는 경우 `config-sample.yaml` 파일을 생성할 필요가 없습니다. 이 경우엔 Super Kubenetes 설치 후에 호스트 클러스터를 설정하면 됩니다.
				</div>
			</article>			
		</main>
	</div>
</main>

**kubectl**을 사용하여 다음 명령을 실행하여 설치 로그를 검색하여 상태를 확인할 수 있습니다. 잠시 후 호스트 클러스터가 준비되 로그 반환이 성공적으로 동작하는 것을 볼 수 있습니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## 멤버 클러스터 준비

**호스트 클러스터**에서 멤버 클러스터를 관리하기 위해서는 `jwtSecret`을 서로 동일하게 설정해야 합니다. 그러므로 우선 이것을 가져오기 위해 **호스트 클러스터**에서 다음 명령을 실행하세요.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
      </div>
  </pre>
</article>

출력은 다음과 같을 것입니다:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code><span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU"</span></code>
      </div>
  </pre>
</article>

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Super Kubenetes 설치 후</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes 설치 전</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes 설치 후">
			<p>이미 독립 실행형 Super Kubenetes 클러스터가 설치된 경우, 클러스터 구성을 편집하여 <code>clusterRole</code> 값을 <code>member</code>로 설정할 수 있습니다.</p>
			- 옵션 A - 웹 콘솔 사용:

				`admin` 계정을 사용하여 콘솔에 로그인하고 **클러스터 관리** 페이지에서 **CRD**로 이동하세요. 키워드 `ClusterConfiguration`을 입력하고 세부 정보 페이지로 이동합니다. [Enable Pluggable Components](../../../pluggable Components/)와 유사한 'ks-installer'의 YAML을 편집하세요.

			- 옵션 B - Kubectl 사용:

			   <article className="highlight">
				 <pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>kubectl edit cc ks-installer -n Super Kubenetes-system</code>
					</div></pre></article>

			<p><code>ks-installer</code>의 YAML 파일에서, 위에 표시된 해당 <code>jwtSecret</code>를 입력하세요:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">authentication</span>:
								<span style="color:#f92672">jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
						</code>
					</div></pre></article>

			<p>아래로 스크롤하여 <code>clusterRole</code> 값을 <code>member</code>로 설정한 다음 <strong>확인</strong>(웹 콘솔을 사용하는 경우)을 클릭하여 적용하세요:</p>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">member</span></p>
						</code>
					</div></pre></article>

			<p>변경사항이 적용되려면 <strong>잠시 기다려야 합니다.</strong></p>
		</main>
		<main className="tab-pane" title="Super Kubenetes 설치 전">
			<p>Linux 또는 기존의 쿠버네티스 클러스터에 Super Kubenetes를 설치하기 전에, 멤버 클러스터를 정의할 수 있습니다. <a href="../../../installing-on-linux/introduction/multioverview/#1-create-an-example-configuration-file">Linux에 Super Kubenetes를 설치</a>하려는 경우 , <code>config-sample.yaml</code> 파일을 사용하세요. 만약 <a href="../../../installing-on-kubernetes/introduction/overview/#deploy-Super Kubenetes">기존의 Kubernetes 클러스터에 Super Kubenetes를 설치</a>하려면 두 개의 YAML을 사용합니다. 그 중 하나는 <code>cluster-configuration.yaml</code>입니다.
			멤버 클러스터를 설정하려면 위의 <code>jwtSecret</code> 값을 입력하고, Super Kubenetes를 설치하기 전에 <code>config-sample.yaml</code> 또는 <code>cluster-configuration.yaml</code>에서 <code>clusterRole</code>의 값을 <code> member </code>로 변경하십시오.</p>
			
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">authentication</span>:
								<span style="color:#f92672">jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
						</code>
					</div></pre></article>

			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code"></div>
					<div className="code-over-div">
						<code>
							<p>
								<span style="color:#f92672">multicluster</span>:
								<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">member</span></p>
						</code>
					</div></pre></article>

			<article className="notices note">
				<p>Note</p>
				<div>
					단일 노드 클러스터([All-in-One](../../../quick-start/all-in-one-on-linux/))에 Super Kubenetes를 설치하는 경우 `config-sample.yaml` 파일을 생성할 필요가 없습니다. 이 경우엔 Super Kubenetes 설치 후에 멤버 클러스터를 설정하면 됩니다.
				</div>
			</article>
		</main>
	</div>
</main>

**kubectl**을 사용하여 다음 명령을 실행하여 설치 로그를 검색하여 상태를 확인할 수 있습니다. 잠시 후 호스트 클러스터가 준비되 로그 반환이 성공적으로 동작하는 것을 볼 수 있습니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

## 멤버 클러스터 가져오기

1. Super Kubenetes 콘솔에 `admin`으로 로그인하고 **클러스터 관리** 페이지에서 **클러스터 추가**를 클릭하세요.

2. **클러스터 가져오기** 페이지에서 가져올 클러스터의 기본 정보를 입력하세요. 또한 오른쪽 상단의 **편집 모드**를 클릭하여 기본 정보를 YAML 양식에서 편집할 수도 있습니다. 편집을 마친 후 **다음**을 클릭하세요.

3. **연결 방법**에서  **직접 연결**을 선택하고 멤버 클러스터의 kubeconfig를 복사하여 상자에 붙여넣습니다. 또한 오른쪽 상단의 **편집 모드**를 클릭하여 기본 정보를 YAML 양식에서 편집할 수도 있습니다.

	<div className="notices note">
		<p>Note</p>
		<div>
			KubeConfig의 `서버` 주소가 호스트 클러스터의 모든 노드에서 접속 가능한지 꼭 확인하십시오.
		</div>
	</div>

4. **생성**을 클릭하고 클러스터 초기화가 완료될 때까지 기다리세요.