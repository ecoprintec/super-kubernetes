---
title: 'S2I 템플릿 사용자 정의'
keywords: 'Super Kubenetes, Kubernetes, Docker, S2I, Source-to-Image'
description: 'Customize S2I templates and understand different template parameters.'
linkTitle: 'Customize S2I Templates'
weight: 10640
---

Source-to-Image (S2I)의 워크플로와 논리를 이해하고 나면 프로젝트를 기반으로 이미지 빌더 템플릿(예: S2I/B2I 템플릿)을 사용자 지정하여 S2I 기능을 확장할 수 있습니다. Super Kubenetes는 [Python](https://github.com/Super Kubenetes/s2i-python-container/)과 [Java](https://github.com/Super Kubenetes/s2i-java-container/)와 같은 다양한 언어를 기반으로 하는 몇 가지 공통 이미지 빌더 템플릿을 제공합니다.

이 튜토리얼은 NGINX 서비스가 포함된 이미지 빌더를 생성하는 방법을 시연합니다. 프로젝트에서 런타임 이미지를 사용해야 하는 경우, 런타임 이미지를 만드는 방법에 대한 자세한 내용은 [이 문서](https://github.com/Super Kubenetes/s2irun/blob/master/docs/runtime_image.md)를 참조하세요.

## 사전 준비

S2I 템플릿 사용자 정의는 두 부분으로 나눌 수 있습니다.

- 파트 1: S2I 이미지 빌더 사용자 정의
  - assemble (필수): 소스 코드에서 애플리케이션 아티팩트를 빌드하는 `assemble` 스크립트.
  - run (필수): 애플리케이션을 실행하는 `run` 스크립트.
  - save-artifacts (선택 사항): 증분 빌드 프로세스에서 모든 종속개체를 관리하는 `save-artifacts` 스크립트.
  - usage (선택 사항): 설명을 제공하는 스크립트.
  - test (선택 사항): 테스트를 위한 스크립트.
- 파트 2: S2I 템플릿 정의

S2I 템플릿 사용자 지정에 필요한 요소를 미리 준비해야 합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    이미지 빌더는 OpenShift와 호환되며 Super Kubenetes에서 재사용할 수 있습니다. S2I 이미지 빌더에 대한 자세한 내용은 [S2IRun](https://github.com/Super Kubenetes/s2irun/blob/master/docs/builder_image.md#s2i-builder-image-requirements)을 참조하세요.
  </div>
</div>

## 이미지 빌더 생성

### 1단계: S2I 디렉터리 준비

1. [S2I 명령줄 도구](https://github.com/openshift/source-to-image/releases)는 빌더에 필요한 기본 디렉터리 구조를 초기화하는 사용하기 쉬운 명령을 제공합니다. 다음 명령을 실행하여 S2I CLI를 설치하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span><a style="color:#ffffff; cursor:text;">$ wget https://github.com/openshift/source-to-image/releases/download/v1.2.04/source-to-image-v1.1.14-874754de-linux-386.tar.gz</a></span> 
                <span>$ tar -xvf source-to-image-v1.1.14-874754de-linux-386.tar.gz</span> 
                <span>$ ls</span> 
                <span>s2i source-to-image-v1.1.14-874754de-linux-386.tar.gz  sti</span> 
                <span>$ cp s2i /usr/local/bin</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

2. 이 튜토리얼에서는 이미지 빌더의 이름으로 `nginx-centos7`을 사용합니다. `s2i create` 명령을 실행하여 기본 디렉토리 구조를 초기화하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                s2i create nginx-centos7 s2i-builder-docs
            </p>
          </code>
        </div>
    </pre>
  </article>

3. 디렉토리 구조는 다음과 같이 초기화됩니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  s2i-builder-docs/
                     Dockerfile - a standard Dockerfile to define the Image Builder
                     Makefile - a script for testing and building the Image Builder
                     test/
                        run - a script that runs the application to test whether the Image Builder is working properly
                        test-app/ - directory of the test application
                     s2i/bin
                        assemble - a script that builds the application
                        run - a script that runs the application
                        usage - a script that prints the usage of the Image Builder</p>
            </code>
         </div>
      </pre>
   </article>

### 2단계: Dockerfile 수정

Dockerfile은 애플리케이션을 빌드하고 실행하는 데 필요한 모든 도구와 라이브러리를 설치합니다. 또한 이 파일은 S2I 스크립트를 출력 이미지로 복사합니다.

다음과 같이 Dockerfile을 수정하여 이미지 빌더를 정의하세요.

#### 도커파일

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span>#</span> nginx-centos7
              FROM Super Kubenetesdev/s2i-base-centos7:1 
              <span></span> 
              <span>#</span> Here you can specify the maintainer for the image that you're building
              LABEL maintainer="maintainer name &lt;email@xxx.com&gt;"
              <span></span> 
              <span>#</span> Define the current version of the application
              ENV NGINX_VERSION=1.6.3
              <span></span> 
              <span>#</span> Set the labels that are used for Super Kubenetes to describe the Image Builder.
              LABEL io.k8s.description="Nginx Webserver" \
                    io.k8s.display-name="Nginx 1.6.3" \
                    io.Super Kubenetes.expose-services="8080:http" \
                    io.Super Kubenetes.tags="builder,nginx,html"
              <span></span> 
              <span>#</span> Install the nginx web server package and clean the yum cache
              RUN yum install -y epel-release &amp;&amp; \
                  yum install -y --setopt=tsflags=nodocs nginx &amp;&amp; \
                  yum clean all
              <span></span> 
              <span>#</span> Change the default port for nginx
              RUN sed -i 's/80/8080/' /etc/nginx/nginx.conf
              RUN sed -i 's/user nginx;//' /etc/nginx/nginx.conf
              <span></span> 
              <span>#</span> Copy the S2I scripts to /usr/libexec/s2i in the Image Builder
              COPY ./s2i/bin/ /usr/libexec/s2i
              <span></span> 
              RUN chown -R 1001:1001 /usr/share/nginx
              RUN chown -R 1001:1001 /var/log/nginx
              RUN chown -R 1001:1001 /var/lib/nginx
              RUN touch /run/nginx.pid
              RUN chown -R 1001:1001 /run/nginx.pid
              RUN chown -R 1001:1001 /etc/nginx
              <span></span> 
              USER 1001
              <span></span> 
              <span>#</span> Set the default port for applications built using this image
              EXPOSE 8080
              <span></span> 
              <span>#</span> Modify the usage script in your application dir to inform the user how to run this image.
              CMD ["/usr/libexec/s2i/usage"]
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    S2I 스크립트는 Dockerfile에 정의된 플래그를 파라미터로 사용합니다. Super Kubenetes에서 제공하는 것과 다른 기본 이미지를 사용해야 하는 경우에는 [S2I Scripts](https://github.com/Super Kubenetes/s2irun/blob/master/docs/builder_image.md#s2i-scripts)를 참조하십시오.
  </div>
</div>

### 3단계: S2I 스크립트 생성

1. 다음과 같이 `assemble` 스크립트를 생성하여 설정 파일과 스태틱 콘텐츠를 목표 컨테이너에 복사하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e"><span>#</span>!/bin/bash -e</span>
                <span style="color:#75715e"></span> 
                <span style="color:#66d9ef">if&nbsp;</span> <span style="color:#f92672">[[</span> <span style="color:#e6db74">&nbsp;"</span>$1<span style="color:#e6db74">"</span> <span style="color:#f92672">&nbsp;==&nbsp;</span> <span style="color:#e6db74">"-h"&nbsp;</span> <span style="color:#f92672">]]</span>; <span style="color:#66d9ef">then</span> 
                 exec /usr/libexec/s2i/usage
                <span style="color:#66d9ef">fi</span> 
                <span></span><span></span> 
                <span>echo</span> <span style="color:#e6db74">&nbsp;"<span>-</span><span>-</span><span>-</span>&gt; Building and installing application from source..."</span> 
                <span style="color:#66d9ef">if&nbsp;</span><span style="color:#f92672">[</span> -f /tmp/src/nginx.conf <span style="color:#f92672">]</span>; <span style="color:#66d9ef">then</span> 
                  mv /tmp/src/nginx.conf /etc/nginx/nginx.conf
                <span style="color:#66d9ef">fi</span>

                <span style="color:#66d9ef">if&nbsp;</span> <span style="color:#f92672">[</span> <span style="color:#e6db74">&nbsp;"</span><span style="color:#66d9ef">$(</span>ls -A /tmp/src<span style="color:#66d9ef">)</span><span style="color:#e6db74">"&nbsp;</span> <span style="color:#f92672">]</span>; <span style="color:#66d9ef">then</span>
                  mv /tmp/src/* /usr/share/nginx/html/
                <span style="color:#66d9ef">fi</span>
              </p>
          </code>
        </div>
    </pre>

  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      기본적으로, `s2i build`는 애플리케이션 소스 코드를 `/tmp/src`에 배치합니다. 위 명령어는 애플리케이션 소스 코드를 `Super Kubenetesdev/s2i-base-centos7:1`에 의해 정의된 작업 디렉토리 `/opt/app-root/src`에 복사합니다.
    </div>
  </div>

2. 다음과 같이 `run` 스크립트를 생성하세요. 이 튜토리얼에서는 `nginx` 서버만 시작합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e"><span>#</span>!/bin/bash -e 
                </span><span style="color:#75715e"></span> 
                exec /usr/sbin/nginx -g <span style="color:#e6db74">"daemon off;"</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
 'nginx' 서버의 호스트 프로세스를 실행하여 'docker'에서 전송된 모든 신호를 'nginx'가 수신할 수 있도록 하기 위해 이 튜토리얼에서는 'exec' 명령을 사용하는 반면에, 'nginx'는 컨테이너의 표준 입출력 스트림을 사용할 수 있습니다. 게다가 `save-artifacts` 스크립트를 사용하면 새 빌드에서 이전 버전의 애플리케이션 이미지 콘텐츠를 재사용할 수 있습니다. 이 튜토리얼은 증분 빌드를 구현하지 않기 때문에 `save-artifacts` 스크립트를 삭제할 수 있습니다.
    </div>
  </div>

3. 다음과 같이 `usage` 스크립트를 생성하세요. 이것은 이미지 사용 방법에 대한 설명을 출력합니다.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span>!/bin/bash -e
                  </span><span style="color:#75715e"></span>cat <span style="color:#e6db74">&lt;&lt;EOF
                  </span><span style="color:#e6db74">This is the nginx-centos7 S2I image:
                  </span><span><a style="color:#e6db74; cursor:text;">To use it, install S2I: https://github.com/Super Kubenetes/s2i-operator</a>
                  </span><span style="color:#e6db74">Sample invocation:
                  </span><span style="color:#e6db74">s2i build test/test-app Super Kubenetesdev/nginx-centos7 nginx-centos7-app
                  </span><span style="color:#e6db74">You can then run the resulting image via:
                  </span><span style="color:#e6db74">docker run -d -p 8080:8080 nginx-centos7-app
                  </span><span><a style="color:#e6db74; cursor:text;">and see the test via http://localhost:8080</a> 
                  </span><span style="color:#e6db74">EOF</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### 4단계: 빌드 및 실행

1. `Makefile`에서 이미지 이름을 수정하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                IMAGE_NAME <span style="color:#f92672">=</span> Super Kubenetesdev/nginx-centos7-s2ibuilder-sample
                <span></span> 
                <span style="color:#75715e"><span>#</span><span> &nbsp;Create an Image Builder named above based on the Dockerfile that was created previously.</span></span> 
                .PHONY: build 
                build:
                 docker build -t <span style="color:#66d9ef">$(</span>IMAGE_NAME<span style="color:#66d9ef">)</span> .
                <span></span> 
                <span style="color:#75715e"><span>#</span><span> &nbsp;The Image Builder can be tested using the following commands:</span></span> 
                .PHONY: test
                test:
                 docker build -t <span style="color:#66d9ef">$(</span>IMAGE_NAME<span style="color:#66d9ef">)</span>-candidate .
                 IMAGE_NAME<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>IMAGE_NAME<span style="color:#66d9ef">)</span>-candidate test/run
              </p>
          </code>
        </div>
    </pre>
  </article>

2. `make build` 명령을 실행하여 NGINX용 이미지 빌더를 빌드하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                $ make build 
                docker build -t Super Kubenetesdev/nginx-centos7-s2ibuilder-sample . 
                Sending build context to Docker daemon  164.9kB
                Step 1/17 : FROM Super Kubenetesdev/s2i-base-centos7:1
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; 48f8574c05df
                Step 2/17 : LABEL maintainer<span style="color:#f92672">=</span><span style="color:#e6db74">"Runze Xia &lt;runzexia@yunify.com&gt;"</span> 
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; Using cache
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; d60ebf231518
                Step 3/17 : ENV NGINX_VERSION<span style="color:#f92672">=</span>1.6.3
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; Using cache
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; 5bd34674d1eb
                Step 4/17 : LABEL io.k8s.description<span style="color:#f92672">=</span><span style="color:#e6db74">"Nginx Webserver"</span>       io.k8s.display-name<span style="color:#f92672">=</span><span style="color:#e6db74">"Nginx 1.6.3"</span>       io.Super Kubenetes.expose-services<span style="color:#f92672">=</span><span style="color:#e6db74">"8080:http"</span>       io.Super Kubenetes.tags<span style="color:#f92672">=</span><span style="color:#e6db74">"builder,nginx,html"</span> 
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; Using cache 
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; c837ad649086 
                Step 5/17 : RUN yum install -y epel-release <span style="color:#f92672">&amp;&amp;</span>     yum install -y --setopt<span style="color:#f92672">=</span>tsflags<span style="color:#f92672">=</span>nodocs nginx <span style="color:#f92672">&amp;&amp;</span>     yum clean all
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; Running in d2c8fe644415
                
                …………
                …………
                …………
                
                Step 17/17 : CMD <span style="color:#f92672">[</span><span style="color:#e6db74">"/usr/libexec/s2i/usage"</span><span style="color:#f92672">]</span> 
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; Running in c24819f6be27
                Removing intermediate container c24819f6be27
                &nbsp;<span>-</span><span>-</span><span>-</span>&gt; c147c86f2cb8
                Successfully built c147c86f2cb8
                Successfully tagged Super Kubenetesdev/nginx-centos7-s2ibuilder-sample:latest
              </p>
          </code>
        </div>
    </pre>
  </article>

3. 이미지 빌더가 생성된 상태에서, 다음 명령을 실행하여 애플리케이션 이미지를 생성하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										$ s2i build ./test/test-app Super Kubenetesdev/nginx-centos7-s2ibuilder-sample:latest sample-app
   										<span>-</span><span>-</span><span>-</span>&gt; Building and installing application from source...
   										Build completed successfully
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      `assemble` 스크립트에 정의된 논리에 따라, S2I는 이미지 빌더를 기본으로 사용하여 애플리케이션 이미지를 생성하고 `test/test-app` 디렉토리로부터 소스 코드를 삽입합니다.
    </div>
  </div>

4. 다음 명령을 실행하여 애플리케이션 이미지를 실행하세요.

   ```bash
   docker run -p 8080:8080  sample-app
   ```

   You can access the Nginx application at `http://localhost:8080`.

### 5단계: 이미지 푸시 및 S2I 템플릿 생성

로컬에서 S2I 이미지 빌더 테스트를 마치면, 이미지를 사용자 정의 이미지 저장소로 푸시할 수 있습니다. 또한 다음과 같이 S2I 빌더 템플릿으로서 YAML 파일을 생성해야 합니다.

#### s2ibuildertemplate.yaml

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">devops.Super Kubenetes.io/v1alpha1</span> 
									<span style="color:#f92672">kind</span>: <span style="color:#ae81ff">S2iBuilderTemplate</span> 
									<span style="color:#f92672">metadata</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;controller-tools.k8s.io</span>: <span style="color:#e6db74">"1.0"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;builder-type.Super Kubenetes.io/s2i</span>: <span style="color:#e6db74">"s2i"</span> 
									<span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">nginx-demo</span> 
									<span style="color:#f92672">spec</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;containerInfo</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">builderImage</span>: <span style="color:#ae81ff">Super Kubenetesdev/nginx-centos7-s2ibuilder-sample</span> 
									<span style="color:#f92672">&nbsp;&nbsp;codeFramework</span>: <span style="color:#ae81ff">nginx</span> <span style="color:#75715e"><span>&nbsp;#</span> type of code framework</span>
									<span style="color:#f92672">&nbsp;&nbsp;defaultBaseImage</span>: <span style="color:#ae81ff">Super Kubenetesdev/nginx-centos7-s2ibuilder-sample</span> <span style="color:#75715e"><span>&nbsp;#</span> default Image Builder (can be replaced by a customized image)</span>
									<span style="color:#f92672">&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">0.0.1</span> <span style="color:#75715e"><span>&nbsp;#</span> Builder template version</span>
									<span style="color:#f92672">&nbsp;&nbsp;description</span>: <span style="color:#e6db74">"This is an S2I builder template for NGINX builds whose result can be run directly without any further application server."</span> <span style="color:#75715e"><span>#</span> Builder template description</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### 6단계: Super Kubenetes에서 S2I 템플릿 사용

1. 다음 명령을 실행하여 위에서 생성한 S2I 템플릿을 Super Kubenetes에 제출하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
   										$ kubectl apply -f s2ibuildertemplate.yaml
   										s2ibuildertemplate.devops.Super Kubenetes.io/nginx created
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Super Kubenetes에서 S2I 빌드를 생성할 때, **빌드 환경**에서 사용할 수 있는 사용자 지정 S2I 템플릿을 찾을 수 있습니다.

## S2I 템플릿 파라미터 정의

프론트엔드 분류를 위한 파라미터로서 전달된 S2I 템플릿 레이블에 대한 다음 자세한 설명을 참조하십시오.

<table>
<thead>
<tr>
	<th>
		레이블 이름
	</th>
	<th>
		옵션
	</th>
	<th>
		정의
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		builder-type.Super Kubenetes.io/s2i: "s2i"
	</td>
	<td>
		"s2i"
	</td>
	<td>
		이 템플릿 유형은 애플리케이션 소스 코드를 기반으로 이미지를 빌드하는 S2I입니다.
	</td>
</tr>
<tr>
	<td>
		builder-type.Super Kubenetes.io/b2i
	</td>
	<td>
		"b2i"
	</td>
	<td>
		이 템플릿 유형은 바이너리 파일 또는 기타 아티팩트를 기반으로 이미지를 빌드하는 B2I입니다.
	</td>
</tr>
<tr>
	<td>
		binary-type.Super Kubenetes.io
	</td>
	<td>
		"jar", "war", "binary"
	</td>
	<td>
		이 유형은 B2I 유형과 상호보완적이며 B2I를 선택할 때 필요합니다. 예를 들면, JAR 패키지가 제공될 때는 "jar" 유형을 선택하세요. Super Kubenetes v2.1.1 이상에서는 B2I 템플릿을 사용자 정의할 수도 있습니다.
	</td>
</tr>
</tbody>
</table>

S2I 템플릿 파라미터에 대한 다음 자세한 설명을 참조하십시오. 필수 파라미터는 별표로 표시했습니다.

  <table>
  <thead>
  <tr>
    <th>
      파라미터
    </th>
    <th>
      유형
    </th>
    <th>
      정의
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      *containerInfo
    </td>
    <td>
      []struct
    </td>
    <td>
      이미지 빌더에 대한 정보.
    </td>
  </tr>
  <tr>
    <td>
      *containerInfo.builderImage
    </td>
    <td>
      string
    </td>
    <td>
      S2I 이미지 빌더.
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.runtimeImage
    </td>
    <td>
      string
    </td>
    <td>
      S2I 런타임 이미지.
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.buildVolumes
    </td>
    <td>
      []string
    </td>
    <td>
      마운트된 볼륨에 대한 정보. 형식은 "volume_name:mount_path"입니다.
      <br/>(예:["s2i_java_cache:/tmp/artifacts",<br/>"test_cache:test_path"])
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.runtimeArtifacts
    </td>
    <td>
      []struct
    </td>
    <td>
      출력 아티팩트를 위한 원래 경로 및 목표 경로 목록. <br/> 단계적 빌딩(phased building)에만 추가하십시오.
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.runtimeArtifacts.source
    </td>
    <td>
      string
    </td>
    <td>
      이미지 빌더에서 아티팩트의 원래 경로입니다.
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.runtimeArtifacts.destination
    </td>
    <td>
      string
    </td>
    <td>
      런타임 이미지에서 아티팩트의 목표 경로입니다.
    </td>
  </tr>
  <tr>
    <td>
      containerInfo.runtimeArtifacts.keep
    </td>
    <td>
      bool
    </td>
    <td>
      출력 이미지에 데이터를 유지할지 여부.
    </td>
  </tr>
  <tr>
    <td>
      *defaultBaseImage
    </td>
    <td>
      string
    </td>
    <td>
      기본 이미지 빌더.
    </td>
  </tr>
  <tr>
    <td>
      *codeFramework
    </td>
    <td>
      string
    </td>
    <td>
      Java 및 Ruby와 같은, 코드 프레임워크 유형.
    </td>
  </tr>
  <tr>
    <td>
      environment
    </td>
    <td>
      []struct
    </td>
    <td>
      빌드 프로세스의 환경 변수 목록.
    </td>
  </tr>
  <tr>
    <td>
      environment.key
    </td>
    <td>
      string
    </td>
    <td>
      환경 변수의 이름.
    </td>
  </tr>
  <tr>
    <td>
      environment.type
    </td>
    <td>
      string
    </td>
    <td>
      환경 변수 키의 유형.
    </td>
  </tr>
  <tr>
    <td>
      environment.description
    </td>
    <td>
      string
    </td>
    <td>
      환경 변수에 대한 설명.
    </td>
  </tr>
  <tr>
    <td>
      environment.optValues
    </td>
    <td>
      []string
    </td>
    <td>
      환경 변수에 대한 파라미터 목록.
    </td>
  </tr>
  <tr>
    <td>
      environment.required
    </td>
    <td>
      bool
    </td>
    <td>
      환경 변수를 설정해야 하는지 여부.
    </td>
  </tr>
  <tr>
    <td>
      environment.defaultValue
    </td>
    <td>
      string
    </td>
    <td>
       환경 변수의 기본값.
    </td>
  </tr>
  <tr>
    <td>
      environment.value
    </td>
    <td>
      string
    </td>
    <td>
      환경 변수의 값.
    </td>
  </tr>
  <tr>
    <td>
      iconPath
    </td>
    <td>
      string
    </td>
    <td>
      애플리케이션 이름.
    </td>
  </tr>
  <tr>
    <td>
      version
    </td>
    <td>
      string
    </td>
    <td>
      S2I 템플릿의 버전.
    </td>
  </tr>
  <tr>
    <td>
      description
    </td>
    <td>
      string
    </td>
    <td>
       템플릿의 기능 및 사용법에 대한 설명.
    </td>
  </tr>
  </tbody>
  </table>
