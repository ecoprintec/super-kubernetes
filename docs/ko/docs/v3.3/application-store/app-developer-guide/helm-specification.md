---
title: "Helm 구성"
keywords: 'Kubernetes, Super Kubenetes, Helm, specifications'
description: 'Understand the chart structure and specifications.'
linkTitle: "Helm Specifications"
weight: 14420
---

Helm 차트는 패키징 형식으로 사용됩니다. 차트는 관련된 쿠버네티스 리소스 세트를 설명하는 파일모음입니다. 자세한 내용은 [Helm 문서](https://helm.sh/docs/topics/charts/)를 참조하십시오.

## 구조

차트의 모든 관련 파일은 일반적으로 다음을 포함하는 디렉토리에 저장됩니다:

<article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  chartname/
                     Chart.yaml          # 버전 및 이름과 같은 차트에 대한 기본 정보가 포함된 YAML 파일
                     LICENSE             # (선택 사항) 차트에 대한 라이선스가 포함된 일반 텍스트 파일
                     README.md           # (선택사항) 앱에 대한 설명 및 사용 방법 안내
                     values.yaml         # 이 차트의 기본 설정 값들
                     values.schema.json  # (선택 사항) values.yaml 파일에 구조를 부과하기 위한 JSON 스키마
                     charts/             # 이 차트가 의존하는 차트들을 포함하는 디렉토리
                     crds/               # 사용자 정의 리소스 정의
                     templates/          # 제공된 값으로 유효한 쿠버네티스 설정 파일을 생성하는 템플릿 디렉토리
                     templates/NOTES.txt # (선택 사항) 사용 참고 사항이 있는 일반 텍스트 파일
               </p>
            </code>
         </div>
      </pre>
</article>

## Chart.yaml 파일

차트에 대한 `chart.yaml` 파일을 제공해야 합니다. 다음은 각 영역에 대한 설명이 있는 파일의 예입니다.

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">(필수) 차트 API 버전. </span> 
               <span style="color:#f92672">name</span>: <span style="color:#ae81ff">(필수) chart 이름.</span> 
               <span style="color:#f92672">version</span>: <span style="color:#ae81ff">(필수) 버전 (SemVer 2 표준을 따르는) </span> 
               <span style="color:#f92672">kubeVersion</span>: <span style="color:#ae81ff">(선택) 호환되는 Kubernetes 버전 (SemVer 2 표준을 따르는)</span> 
               <span style="color:#f92672">description</span>: <span style="color:#ae81ff">(선택) 앱에 대한 한 문장 설명</span> 
               <span style="color:#f92672">type</span>: <span style="color:#ae81ff">(선택) 차트의 유형</span> 
               <span style="color:#f92672">keywords</span>: 
               &nbsp;&nbsp;- <span style="color:#ae81ff">(선택) 앱에 대한 키워드 리스트</span> 
               <span style="color:#f92672">home</span>: <span style="color:#ae81ff">(선택) 앱의 URL </span> 
               <span style="color:#f92672">sources</span>: 
               &nbsp;&nbsp;- <span style="color:#ae81ff">(선택) 앱의 소스 코드에 대한 URL 목록</span> 
               <span style="color:#f92672">dependencies</span>: <span style="color:#ae81ff">(선택) 차트 요구 사항 목록</span> 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">차트의 이름 (ex: nginx)</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">차트의 버전 (ex: 1.2.3)</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;repository</span>: <span style="color:#ae81ff">저장소 URL ("<a style="color:#ae81ff; cursor:text;">https://example.com/charts</a>") 또는 별칭 ("@repo-name").</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;condition</span>: <span style="color:#ae81ff">(선택) 차트 활성화/비활성화에 사용되고, 불리언으로 결정되는 yaml 경로 (ex: subchart1.enabled)</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;tags</span>: <span style="color:#ae81ff">(선택)</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">태그를 사용하여 차트를 함께 활성화/비활성화할 수 있습니다.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;import-values</span>: <span style="color:#ae81ff">(선택)</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">ImportValues는 가져올 상위 키에 대한 소스 값의 매핑을 유지합니다. 각 항목은 문자열이나 한 쌍의 부모-자식관계인 하위목록 항목일 수 있습니다.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alias</span>: <span style="color:#ae81ff">(선택) 차트에 사용할 별칭. 동일한 차트를 여러 번 추가해야 할 때 유용합니다.</span> 
               <span style="color:#f92672">maintainers</span>: <span style="color:#ae81ff">(선택)</span> 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">(필수) maintainer 이름</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;email</span>: <span style="color:#ae81ff">(선택) maintainer 이메일.</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;url</span>: <span style="color:#ae81ff">(선택) maintainer의 URL.</span> 
               <span style="color:#f92672">icon</span>: <span style="color:#ae81ff">(선택) 아이콘으로 사용할 SVG 또는 PNG 이미지의 URL</span> 
               <span style="color:#f92672">appVersion</span>: <span style="color:#ae81ff">(선택) 앱 버전. SemVer일 필요는 없습니다.</span> 
               <span style="color:#f92672">deprecated</span>: <span style="color:#ae81ff">(선택, 불리언) 이 차트가 더 이상 사용되지 않는지 여부.</span> 
               <span style="color:#f92672">annotations</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;example</span>: <span style="color:#ae81ff">(선택) 이름으로 키가 지정된 주석 목록</span> 
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - 'dependencies' 영역은 'v1' 차트에 대해 별도의 파일 'requirements.yaml'에 있는 차트 종속성을 정의하는 데 사용됩니다. 자세한 내용은 [차트 종속성](https://helm.sh/docs/topics/charts/#chart-dependencies)을 참조하세요.
    - 'type' 영역은 차트 유형을 정의하는 데 사용됩니다. 허용되는 값은 'application'과 'library'입니다. 자세한 내용은 [차트 유형](https://helm.sh/docs/topics/charts/#chart-types)을 참조하세요.
  </div>
</div>


## Values.yaml 과 템플릿

[Go 템플릿 언어](https://golang.org/pkg/text/template/)로 작성된 Helm 차트 템플릿은 차트의 'templates' 폴더에 저장됩니다. 템플릿에 값을 제공하는 방법에는 두 가지가 있습니다:

1. 참조할 수 있는 기본값을 사용하여 차트 내부에 `values.yaml` 파일을 만듭니다.
2. 필요한 값이 포함된 YAML 파일을 만들고 `helm install` 명령으로 파일을 사용합니다.

다음은 `templates` 폴더에 있는 템플릿의 예시입니다.

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ReplicationController</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">deis</span> 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/managed-by</span>: <span style="color:#ae81ff">deis</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app.kubernetes.io/name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceAccount</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">deis-database</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: {{<span style="color:#ae81ff">.Values.imageRegistry}}/postgres:{{.Values.dockerTag}}</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: {{<span style="color:#ae81ff">.Values.pullPolicy}}</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">5432</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;env</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">DATABASE_STORAGE</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value</span>: {{<span style="color:#ae81ff">default "minio" .Values.storage}}</span> 
            </p>
         </code>
      </div>
   </pre>
</article>

위의 예시는 쿠버네티스에서 ReplicationController 템플릿을 정의합니다. 여기에 `values.yaml`에서 정의한 일부 값이 참조됩니다.

- `imageRegistry`: Docker 이미지 레지스트리
- `dockerTag`: Docker 이미지 태그
- `pullPolicy`: 이미지 가져오기 정책
- `storage`:  저장소 백엔드. 기본값은 `minio`.

An example `values.yaml` file:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               imageRegistry: "quay.io/deis"
               dockerTag: "latest"
               pullPolicy: "Always"
               storage: "s3"
            </p>
         </code>
      </div>
   </pre>
</article>

## 참고 항목

[Helm 문서](https://helm.sh/docs/)

[차트](https://helm.sh/docs/topics/charts/)
