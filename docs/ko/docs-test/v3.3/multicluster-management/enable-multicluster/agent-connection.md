---
title: '에이전트 연결'
keywords: 'Kubernetes, Super Kubenetes, multicluster, agent-connection'
description: 'Understand the general steps of importing clusters through agent connection.'
titleLink: 'Agent Connection'
weight: 5220
---

Super Kubenetes의 컴포넌트 [타워]()<!-- (https://github.com/Super Kubenetes/tower) -->는 에이전트 연결에 사용됩니다. 타워는 에이전트를 통해 클러스터 간의 네트워크 연결을 위한 도구입니다. 호스트 클러스터가 멤버 클러스터에 직접 접속할 수 없는 경우, 호스트 클러스터의 프록시 서비스 주소를 노출시키십시오. 이렇게 하면 멤버 클러스터가 에이전트를 통해 호스트 클러스터에 연결할 수 있습니다. 이 방법은 멤버 클러스터가 프라이빗 환경(예: IDC)에 있고 호스트 클러스터가 프록시 서비스를 노출할 수 있는 경우에 적용할 수 있습니다. 또한 에이전트 연결은 클러스터가 여러 클라우드 공급자에 분산되어 있는 경우에도 적용할 수 있습니다.

에이전트를 이용한 멀티 클러스터 기능을 사용하려면, 각각 호스트 클러스터와 멤버 클러스터 역할을 하는 두 개 이상의 클러스터가 있어야 합니다. 클러스터는 Super Kubenetes를 설치하기 전이나 설치한 후 언제든 호스트 클러스터 또는 멤버 클러스터로 정의할 수 있습니다. Super Kubenetes 설치에 대한 자세한 내용은 [Linux에 설치](../../../installing-on-linux/introduction/overview) 및 [Kuberix에 설치](../../../installing-on-kubernetes/introduction/overview)를 참조하십시오.

## 영상 시연

## 호스트 클러스터 준비

호스트 클러스터는 중앙 컨트롤 플레인을 제공하며, 호스트 클러스터는 하나만 정의할 수 있습니다.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Super Kubenetes 설치 후</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes 설치 전</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes 설치 후">
			<p>이미 독립형 Super Kubenetes 클러스터가 설치된 경우 클러스터 구성을 편집하여 <code>clusterRole</code> 값을 <code>호스트</code>로 설정할 수 있습니다.</p>
			- 옵션 A - 웹 콘솔 사용:

    			`admin` 계정을 사용하여 콘솔에 로그인하고 **클러스터 관리** 페이지의 **CRDs*로 이동하세요. 키워드'ClusterConfiguration'을 입력하고 세부 정보 페이지로 이동합니다. ks-installer`의 YAML을 편집하세요. 이것은 [플러그 구성 요소 활성화](../../../pluggable-components/overview/)와 유사합니다.

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
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span></p>
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
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span>
    							<span style="color:#f92672">&nbsp;&nbsp;hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
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
    	<main className="tab-pane" title="Super Kubenetes has not been installed">
    		<p>Linux 또는 기존의 쿠버네티스 클러스터에 Super Kubenetes를 설치하기 전에 호스트 클러스터를 정의할 수 있습니다. 만약 <a href="../../../installing-on-linux/introduction/multioverview/#1-create-an-example-configuration-file">Linux에 Super Kubenetes를 설치</a>하려면, <code>config-sample.yaml</code> 파일을 사용하세요. 만약 <a href="../../../installing-on-kubernetes/introduction/overview/#deploy-Super Kubenetes">기존 쿠버네티스 클러스터에 Super Kubenetes를 설치</a>하려면, 두 개의 YAML 파일을 사용하세요. 그 중 하나는 <code>cluster-configuration.yaml</code> 입니다.</p>

    		<p>호스트 클러스터를 설정하려면, Super Kubenetes를 설치하기 전에 <code>config-sample.yaml</code> 또는 <code>cluster-configuration.yaml </code>에서 <code>clusterRole</code>의 값을 <code>host</code>로 변경하십시오.

    		<article className="highlight">
    			<pre>
    				<div className="copy-code-button" title="Copy Code"></div>
    				<div className="code-over-div">
    					<code>
    						<p>
    							<span style="color:#f92672">multicluster</span>:
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span></p>
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
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">host</span>
    							<span style="color:#f92672">&nbsp;&nbsp;hostClusterName</span>: <span style="color:#ae81ff">&lt;Host cluster name&gt;</span></p>
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

## 프록시 서비스 주소 설정

호스트 클러스터를 설치한 후, `LoadBalancer` 유형의 `타워`라는 프록시 서비스가 `Super Kubenetes-system`에 생성됩니다.

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">A 클러스터에 LoadBalancer 사용가능</a></li>
		<li className="nav-item"><a className="nav-link" href="#">클러스터에 LoadBalancer 사용불가</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="A LoadBalancer available in your cluster">
			<p>클러스터에 LoadBalancer 플러그인을 사용할 수 있는 경우, Super Kubenetes가 획득할 타워의 <code>EXTERNAL-IP</code>에 해당하는 주소를 볼 수 있습니다. 이 경우 프록시 서비스가 자동으로 설정됩니다. 즉, 프록시를 설정하는 단계를 건너뛰어도 됩니다. 
			다음 명령을 실행하여 LoadBalancer가 있는지 확인하십시오.</p>

    		<article className="highlight">
    			<pre>
    				<div className="copy-code-button" title="Copy Code"></div>
    				<div className="code-over-div">
    					<code>kubectl -n Super Kubenetes-system get svc</code>
    				</div>
    			</pre>
    		</article>

    		<p>출력은 다음과 같을 것입니다:</p>

    		<article className="highlight">
    			<pre>
    				<div className="copy-code-button" title="Copy Code"></div>
    				<div className="code-over-div">
    					<code>
    						<p>
    							NAME       TYPE            CLUSTER-IP      EXTERNAL-IP     PORT<span style="color:#f92672">(</span>S<span style="color:#f92672">)</span>              AGE
    							tower      LoadBalancer    10.233.63.191   139.198.110.23  8080:30721/TCP       16h</p>
    					</code>
    				</div>
    			</pre>
    		</article>

    		<article className="notices note">
    			<p>Note</p>
    			<div>
    				일반적으로, 퍼블릭 클라우드에는 항상 LoadBalancer 솔루션이 존재하며, 외부 IP는 LoadBalancer에 의해 자동으로 할당될 수 있습니다. 클러스터가 온프레미스 환경, 특히 **베어 메탈 환경**에서 실행되는 경우 [OpenELB](https://github.com/Super Kubenetes/openelb)를 LB 솔루션으로 사용할 수 있습니다.
    			</div>
    		</article>

    	</main>

    	<main className="tab-pane" title="No LoadBalancer available in your cluster">
    		1. 다음 명령을 실행하여 서비스를 체크하세요.

    			<article className="highlight">
    				<pre>
    					<div className="copy-code-button" title="Copy Code"></div>
    					<div className="code-over-div">
    						<code>kubectl -n Super Kubenetes-system get svc</code>
    					</div>
    				</pre>
    			</article>

    			이 예시에서, `NodePort`는 `30721`입니다.

    			<article className="highlight">
    				<pre>
    					<div className="copy-code-button" title="Copy Code"></div>
    					<div className="code-over-div">
    						<code>
    							<p>
    							NAME       TYPE            CLUSTER-IP      EXTERNAL-IP     PORT(S)              AGE
    							tower      LoadBalancer    10.233.63.191   <span><</span>pending<span>></span>  8080:30721/TCP            16h
    							</p>
    						</code>
    					</div></pre></article>

    		2. `EXTERNAL-IP`가 `pending`인 경우 프록시 주소를 수동으로 설정해야 합니다. 예를 들어 공인 IP 주소가 `139.198.120.120`인 경우 이 공인 IP 주소의 포트(예: `8080`)를 <NodeIP>:<NodePort>에 노출해야 합니다.

    		3. `ks-installer`의 구성 파일에 `proxyPublishAddress` 값을 추가하고 다음과 같이 공용 IP 주소(이 튜토리얼에서는 `139.198.120.120`)와 포트 번호를 제공합니다.


    			- 옵션 A - 웹 콘솔 사용:

    			`admin` 계정을 사용하여 콘솔에 로그인하고 **클러스터 관리** 페이지에서 **CRD**로 이동하세요. 키워드 `ClusterConfiguration`을 입력하고 세부 정보 페이지로 이동합니다. [플러그 구성 요소 활성화](../../../pluggable-components/overview/)와 유사한 `ks-installer`의 YAML을 편집하세요.

    			- 옵션 B - Kubectl 사용:

    				<article className="highlight">
    					<pre>
    						<div className="copy-code-button" title="Copy Code"></div>
    						<div className="code-over-div">
    							<code>kubectl -n Super Kubenetes-system edit clusterconfiguration ks-installer</code>
    						</div>
    					</pre></article>

    		  <p>Navigate to <code>multicluster</code>로 이동한 후, <code>proxyPublishAddress</code>을 위한 새 줄을 추가하여 타워에 접속할 IP 주소를 정의하세요.</p>

    			<article className="highlight">
    				<pre>
    					<div className="copy-code-button" title="Copy Code"></div>
    					<div className="code-over-div">
    						<code>
    							<p>
    								<span style="color:#f92672">multicluster</span>:
    									<span style="color:#f92672">clusterRole</span>: <span style="color:#ae81ff">host</span>
    									<span style="color:#f92672">proxyPublishAddress</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://139.198.120.120:8080</a></span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e"> &nbsp;Add this line to set the address to access tower</span>
    							</p>
    						</code>
    					</div>
    				</pre>
    			</article>

    		4. 설정을 저장하고 잠시 기다리거나, 또는 다음 명령을 사용하여 수동으로 `ks-apiserver`를 재시작하여 변경 사항을 즉시 적용할 수 있습니다.

    			<article className="highlight">
    				<pre>
    					<div className="copy-code-button" title="Copy Code"></div>
    					<div className="code-over-div">
    						<code>kubectl -n Super Kubenetes-system rollout restart deployment ks-apiserver</code>
    					</div>
    				</pre>
    			</article>
    	</main>
    </div>

</main>

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
		<code>
			<p>
				<span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU"</span></p>
		</code></div></pre></article>

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Super Kubenetes 설치 후</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Super Kubenetes 설치 전</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Super Kubenetes 설치 후">
			<p>이미 독립 실행형 Super Kubenetes 클러스터가 설치된 경우, 클러스터 구성을 편집하여 <code>clusterRole</code> 값을 <code>member</code>로 설정할 수 있습니다.</p>
			- 옵션 A - 웹 콘솔 사용:

    			`admin` 계정을 사용하여 콘솔에 로그인하고 **클러스터 관리** 페이지에서 **CRD**로 이동하세요. 키워드 `ClusterConfiguration`을 입력하고 세부 정보 페이지로 이동합니다. [플러그 구성 요소 활성화](../../../pluggable-components/overview/)와 유사한 'ks-installer'의 YAML을 편집하세요.

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
    							<span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
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
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span></p>
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
    							<span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">gfIwilcc0WjNGKJ5DLeksf2JKfcLgTZU</span></p>
    					</code>
    				</div></pre></article>

    		<article className="highlight">
    			<pre>
    				<div className="copy-code-button" title="Copy Code"></div>
    				<div className="code-over-div">
    					<code>
    						<p>
    							<span style="color:#f92672">multicluster</span>:
    							<span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span></p>
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

3. **연결 방법**에서 **에이전트 연결**을 선택하고 **생성**을 클릭하세요. 호스트 클러스터에서 생성한, 에이전트 디플로이먼트에 대한 YAML 설정 파일이 콘솔에 표시됩니다.

4. 설명을 따라 멤버 클러스터에 `agent.yaml` 파일을 만든 다음, 에이전트 디플로이먼트를 파일에 복사하여 붙여 넣으세요. 노드에서 `kubectl create -f agent.yaml`을 실행하고 에이전트가 실행될 때까지 기다립니다. 멤버 클러스터에서 프록시 주소에 액세스할 수 있는지 꼭 확인하십시오.

5. 클러스터 에이전트가 실행 중일 때 호스트 클러스터에서 가져온 클러스터를 볼 수 있습니다.
