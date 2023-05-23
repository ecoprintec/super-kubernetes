---
title: "설치를 위한 부스터 구성"
keywords: 'Super Kubenetes, booster, installation, faq'
description: 'Set a registry mirror to speed up image downloads during installation.'
linkTitle: "Configure a Booster for Installation"
weight: 16200
---

dockerhub.io에서 이미지를 다운로드하는 데 문제가 있다면 레지스트리 미러 (즉, 부스터)를 구성하는 것이 좋습니다. 
[Docker 공식 문서](https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon)를 참조하거나 아래 단계를 따르세요.

## 부스터 URL 가져오기

부스터를 구성하려면 레지스트리 미러 주소가 필요합니다.

## 레지스트리 미러 설정

Docker 데몬을 직접 구성하거나 KubeKey를 사용하여 구성을 설정할 수 있습니다.

### Docker 데몬 구성

<div className="notices note">
  <p>Note</p>
  <div>
    이 방법을 사용하려면 사전에 Docker를 설치해야 합니다.
  </div>
</div>

1. 다음 명령을 실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									sudo mkdir -p /etc/docker
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
									sudo vi /etc/docker/daemon.json
               </p>
            </code>
         </div>
      </pre>
   </article>

2. `registry-mirrors` 키와 값을 파일에 추가하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									{
									  <span style="color:#f92672">"registry-mirrors"</span>: [<span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://&lt;my-docker-mirror-host&gt;</a>"</span>]
									}
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      위 따옴표 안의 주소를 자신의 Booster URL로 바꾸십시오.
    </div>
  </div> 


3. 변경 사항을 적용하기위해 다음 명령을 실행하여 파일을 저장하고 Docker를 다시 로드합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									sudo systemctl daemon-reload
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
									sudo systemctl restart docker
               </p>
            </code>
         </div>
      </pre>
   </article>

### KubeKey를 사용하여 레지스트리 미러 설정

1. 설치 전에 KubeKey로 `config-sample.yaml` 파일을 생성한 후, 파일 안의 `registry`로 이동하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">registry</span>:
									<span style="color:#f92672">&nbsp;&nbsp;registryMirrors</span>: []
									<span style="color:#f92672">&nbsp;&nbsp;insecureRegistries</span>: []
									<span style="color:#f92672">&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `registry` 섹션의 각 매개변수에 대한 자세한 내용은 [쿠버네티스 Cluster 구성](../../../installing-on-linux/introduction/vars/)을 참조하십시오.
    </div>
  </div>

2. `registryMirrors` 값으로 레지스트리 미러 주소를 입력하고 파일을 저장합니다. 설치에 대한 자세한 내용은 [멀티 노드 설치](../../../installing-on-linux/introduction/multioverview/)를 참조하십시오.
<div className="notices note">
  <p>Note</p>
  <div>
    만일 [All-in-One 설치](../../../quick-start/all-in-one-on-linux/)를 채택하는 경우엔, 이 모드에서는 `config-sample.yaml` 파일이 필요하지 않으므로, 첫 번째 방법을 참조하십시오.
  </div>
</div>
