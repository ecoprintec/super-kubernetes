---
title: "Helm 개발 가이드"
keywords: 'Kubernetes, Super Kubenetes, helm, development'
description: 'Develop your own Helm-based app.'
linkTitle: "Helm Developer Guide"
weight: 14410
---

앱의 Helm 차트를 Super Kubenetes에 업로드하여 필요한 권한이 있는 테넌트가 차트를 배포할 수 있도록  할수 있습니다. 이 튜토리얼은 NGINX를 예로 사용하여 Helm 차트를 준비하는 방법을 보여줍니다.

## Helm 설치

이미 Super Kubenetes를 설치한 경우 사용자 환경에 Helm이 배포됩니다. 그렇지 않으면 [Helm 설명서](https://helm.sh/docs/intro/install/)를 참조하여 먼저 Helm을 설치하십시오.

## 로컬 저장소 생성

다음 명령을 실행하여 컴퓨터에 저장소를 만드십시오.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               mkdir helm-repo
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               cd helm-repo
            </p>
         </code>
      </div>
   </pre>
</article>

## 앱 만들기

`helm 생성`을 사용하여 `nginx`라는 폴더를 만들면 앱에 대한 YAML 템플릿과 디렉토리가 자동으로 생성됩니다. 일반적으로, 최상위 디렉토리의 파일 및 디렉토리의 이름은 변경하지 않는 것이 좋습니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ helm create nginx
               $ tree nginx/
               nginx/
               ├── charts
               ├── Chart.yaml
               ├── templates
               │   ├── deployment.yaml
               │   ├── _helpers.tpl
               │   ├── ingress.yaml
               │   ├── NOTES.txt
               │   └── service.yaml
               └── values.yaml
            </p>
         </code>
      </div>
   </pre>
</article>

'Chart.yaml'은 이름, API, 앱 버전을 포함한 차트의 기본 정보를 정의하는 데 사용됩니다. 자세한 내용은 [Chart.yaml 파일](../helm-specification/#chartyaml-file)을 참조하십시오.

`Chart.yaml` 파일의 예:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">appVersion</span>: <span style="color:#e6db74">"1.0"</span> 
              <span style="color:#f92672">description</span>: <span style="color:#ae81ff">A Helm chart for Kubernetes</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">version</span>: <span style="color:#ae81ff">0.1.0</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

Helm 기반 앱을 쿠버네티스에 배포할 때, Super Kubenetes 콘솔에서 `values.yaml` 파일을 직접 편집할 수 있습니다.

`values.yaml` file의 예:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span><span>&nbsp;Default values for test.</span></span> 
              <span style="color:#75715e"><span>#</span><span>&nbsp;This is a YAML-formatted file.</span></span> 
              <span style="color:#75715e"><span>#</span><span>&nbsp;Declare variables to be passed into your templates.</span></span> 
              <span></span> 
              <span style="color:#f92672">replicaCount</span>: <span style="color:#ae81ff">1</span> 
              <span></span> 
              <span style="color:#f92672">image</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;repository</span>: <span style="color:#ae81ff">nginx</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tag</span>: <span style="color:#ae81ff">stable</span> 
              <span style="color:#f92672">&nbsp;&nbsp;pullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
              <span></span> 
              <span style="color:#f92672">nameOverride</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">fullnameOverride</span>: <span style="color:#e6db74">""</span> 
              <span></span> 
              <span style="color:#f92672">service</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ClusterIP</span> 
              <span style="color:#f92672">&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">80</span> 
              <span></span> 
              <span style="color:#f92672">ingress</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;annotations</span>: {} 
              <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;#</span> kubernetes.io/ingress.class: nginx<span></span></span> 
              <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;#</span> kubernetes.io/tls-acme: "true"</span>
              <span style="color:#f92672">&nbsp;&nbsp;path</span>: <span style="color:#ae81ff">/</span> 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">chart-example.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;tls</span>: []
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;- secretName: chart-example-tls</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;&nbsp;&nbsp;hosts:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- chart-example.local</span> 
              <span style="color:#f92672">resources</span>: {} 
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> We usually recommend not to specify default resources and to leave this as a conscious</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> choice for the user. This also increases chances charts run on environments with little</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> resources, such as Minikube. If you do want to specify resources, uncomment the following</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> lines, adjust them as necessary, and remove the curly braces after 'resources:'.</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> limits:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  cpu: 100m</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  memory: 128Mi</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span> requests:</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span>  cpu: 100m</span>
              <span style="color:#75715e"><span>&nbsp;&nbsp;#</span><span>&nbsp;&nbsp;memory: 128Mi</span></span> 
              <span></span> 
              <span style="color:#f92672">nodeSelector</span>: {} 
              <span></span> 
              <span style="color:#f92672">tolerations</span>: [] 
              <span></span> 
              <span style="color:#f92672">affinity</span>: {}
            </p>
        </code>
      </div>
  </pre>
</article>

[Helm 사양](../helm-specification/)을 참조하여 `nginx' 폴더에 있는 파일들을 편집하고 이를 저장합니다.

## 인덱스 파일 생성(선택 사항)

Super Kubenetes에서 HTTP 또는 HTTPS URL로 저장소를 추가하려면 'index.yaml' 파일을 미리 오브젝트 스토리지에 업로드해야 합니다. 인덱스 파일을 생성하려면 Helm을 사용해 'nginx' 디렉토리에서 아래 명령을 실행하십시오.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               helm repo index .
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ ls
               index.yaml  nginx
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - 저장소 URL이 S3 스타일인 경우 저장소에 앱을 추가할 때 오브젝트 스토리지에 인덱스 파일이 자동으로 생성됩니다.

    - Super Kubenetes에 저장소를 추가하는 방법에 대한 자세한 내용은 [Helm 저장소 가져오기](../../../workspace-administration/app-repository/import-helm-repository/)를 참조하십시오.
  </div>
</div>


## 차트 패키지

앞서 생성한 `nginx` 디렉토리로 가서, .tgz 패키지를 생성하는 차트를 패키징하기 위해 아래 명령을 실행하십시오..

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               helm package nginx
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               $ ls
               nginx  nginx-0.1.0.tgz
            </p>
         </code>
      </div>
   </pre>
</article>

## 앱 업로드

이제 Helm 기반 앱이 준비되었으므로 이를 Super Kubenetes에 불러와 플랫폼에서 테스트할 수 있습니다.

## 참고 항목

[Helm 사양](../helm-specification/)

[Helm 저장소 가져오기](../../../workspace-administration/app-repository/import-helm-repository/)
