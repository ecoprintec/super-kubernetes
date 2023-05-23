---
title: "Customize S2I Templates"
keywords: 'Super Kubenetes, Kubernetes, Docker, S2I, Source-to-Image'
description: 'Customize S2I templates and understand different template parameters.'
linkTitle: "Customize S2I Templates"
weight: 10640
---

Once you have understood the workflow and logic of Source-to-Image (S2I), you can customize Image Builder templates (i.e. S2I/B2I templates) based on your projects to extend S2I capabilities. Super Kubenetes provides several common Image Builder templates based on different languages, such as [Python](https://github.com/Super Kubenetes/s2i-python-container/) and [Java](https://github.com/Super Kubenetes/s2i-java-container/).

This tutorial demonstrates how to create an Image Builder that contains an NGINX service. If you need to use runtime images in your project, refer to [this document](https://github.com/Super Kubenetes/s2irun/blob/master/docs/runtime_image.md) for more information about how to create a runtime image.

## Prerequisites

S2I template customization can be divided into two parts.

- Part 1: S2I Image Builder customization
  - assemble (required): the `assemble` script that builds application artifacts from source code.
  - run (required): the `run` script that executes an application.
  - save-artifacts (optional): the `save-artifacts` script that manages all dependencies in an incremental building process.
  - usage (optional): the script that provides instructions.
  - test (optional): the script for testing.
- Part 2: definition of S2I template

You need to have the required elements for S2I template customization ready in advance.

<div className="notices note">
  <p>Note</p>
  <div>
    The Image Builder is compatible with that of OpenShift, and you can reuse it in Super Kubenetes. For more information about S2I Image Builders, refer to [S2IRun](https://github.com/Super Kubenetes/s2irun/blob/master/docs/builder_image.md#s2i-builder-image-requirements).
  </div>
</div>

## Create an Image Builder

### Step 1: Prepare an S2I directory

1. The [S2I command line tool](https://github.com/openshift/source-to-image/releases) provides an easy-to-use command to initialize a base directory structure required by the Builder. Run the following commands to install the S2I CLI.

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

2. This tutorial uses `nginx-centos7` as the name of the Image Builder. Run the `s2i create` command to initialize the base directory structure.

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

3. The directory structure is initialized as follows.

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

### Step 2: Modify the Dockerfile

A Dockerfile installs all of the necessary tools and libraries that are needed to build and run an application. This file will also copy the S2I scripts into the output image.

Modify the Dockerfile as follows to define the Image Builder.

#### Dockerfile

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
    S2I scripts will use the flags defined in the Dockerfile as parameters. If you need to use a base image different from those provided by Super Kubenetes, refer to [S2I Scripts](https://github.com/Super Kubenetes/s2irun/blob/master/docs/builder_image.md#s2i-scripts).
  </div>
</div>
### Step 3: Create S2I Scripts

1. Create an `assemble` script as follows to copy the configuration file and static contents to the target container.

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
      By default, `s2i build` places the application source code in `/tmp/src`. The above commands copy the application source code to the working directory `/opt/app-root/src` defined by `Super Kubenetesdev/s2i-base-centos7:1`.
    </div>
  </div>

2. Create a `run` script as follows. In this tutorial, it only starts the `nginx` server.

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
      This tutorial uses the `exec` command to execute the host process of `nginx` server to let all signals sent from `docker` be received by `nginx` while `nginx` can use the standard input and output streams of the container. Besides, the `save-artifacts` script allows a new build to reuse content from a previous version of application image. The `save-artifacts` script can be deleted because this tutorial does not implement incremental building. 
    </div>
  </div>

3. Create a `usage` script as follows. It prints out instructions on how to use the image.

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

### Step 4: Build and run

1. Modify the image name in `Makefile`.

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

2. Run the `make build` command to build the Image Builder for NGINX.

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

3. With the Image Builder created, run the following command to create an application image.

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
      Following the logic defined in the `assemble` script, S2I creates an application image using the Image Builder as a base and injecting the source code from the `test/test-app` directory.
    </div>
  </div>


4. Run the following command to run the application image.

   ```bash
   docker run -p 8080:8080  sample-app
   ```

   You can access the Nginx application at `http://localhost:8080`.

### Step 5: Push the image and create an S2I template

Once you finish testing the S2I Image Builder locally, you can push the image to your custom image repository. You also need to create a YAML file as the S2I Builder template as follows.

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

### Step 6: Use the S2I template on Super Kubenetes

1. Run the following command to submit the S2I template created above to Super Kubenetes.

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

2. You can find the customized S2I template available in **Build Environment** when you create an S2I build on Super Kubenetes.

## S2I Template Parameters Definition

Refer to the following detailed descriptions of S2I template labels passed as parameters for frontend classification.

<table>
<thead>
<tr>
	<th>
		Label Name
	</th>
	<th>
		Option
	</th>
	<th>
		Definition
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
		The type of this template is S2I, which builds images based on application source code.
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
		The type of this template is B2I, which builds images based on binary files or other artifacts.
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
		This type is complementary to the type of B2I and will be required when B2I is selected. For example, select the type of "jar" when a JAR package is provided. In Super Kubenetes v2.1.1 and later, it is also allowed to customize B2I templates.
	</td>
</tr>
</tbody>
</table>

Refer to the following detailed descriptions of S2I template parameters. The required parameters are marked with an asterisk.

  <table>
  <thead>
  <tr>
    <th>
      Parameter
    </th>
    <th>
      Type
    </th>
    <th>
      Definition
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
      The information about Image Builder.
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
      S2I Image Builder, such as Super Kubenetes/java-8-centos7:v2.1.0.
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
      S2I Runtime Image, such as Super Kubenetes/java-8-runtime:v2.1.0.
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
      The information about mounted volumes. The format is "volume_name:mount_path", such as ["s2i_java_cache:/tmp/artifacts","test_cache:test_path"].
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
      The list of original path and target path for the output artifact; only add it for phased building.
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
      The original path of artifact in Image Builder.
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
      The target path of artifact in Runtime Image.
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
      Whether to keep the data in the output image.
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
      The default Image Builder.
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
      The code framework type, such as Java and Ruby.
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
      The list of environment variables in the building process.
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
      The name of environment variables.
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
      The type of environment variable keys.
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
      The description of environment variables.
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
      The list of parameters for environment variables.
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
      Whether the environment variable is required to be set.
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
      The default value of environment variables.
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
      The value of environment variables.
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
      The application name.
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
      The version of S2I template.
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
      The description of the template's functions and usage.
    </td>
  </tr>
  </tbody>
  </table>

