---
title: "Source to Image: Publish an App without a Dockerfile"
keywords: 'Super Kubenetes, Kubernetes, Docker, S2I, Source-to-Image'
description: 'Use S2I to import a Java sample project in Super Kubenetes, create an image and publish it to Kubernetes.'
linkTitle: "Source to Image: Publish an App without a Dockerfile"
weight: 10610
---

Source-to-Image (S2I) is a toolkit and workflow for building reproducible container images from source code. S2I produces ready-to-run images by injecting source code into a container image and letting the container prepare that source code for execution. Super Kubenetes integrates S2I to automatically build images and publish them to Kubernetes without any Dockerfile.

This tutorial demonstrates how to use S2I to import source code of a Java sample project into Super Kubenetes by creating a Service. Based on the source code, the Super Kubenetes Image Builder will create a Docker image, push it to a target repository and publish it to Kubernetes.

![build-process](/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-publish-app-without-dockerfile/build-process.png)

## Prerequisites

- You need to enable the [Super Kubenetes DevOps System](../../../pluggable-components/devops/) as S2I is integrated into it.
- You need to create a [GitHub](https://github.com/) account and a [Docker Hub](https://www.dockerhub.com/) account. GitLab and Harbor are also supported. This tutorial uses a GitHub repository to provide the source code for building and pushes an image to Docker Hub.
- You need to create a workspace, a project and a user (`project-regular`). The user must be invited to the project with the role of `operator`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).
- Set a CI dedicated node for building images. This is not mandatory but recommended for the development and production environment as it caches dependencies and reduces build time. For more information, see [Set a CI Node for Dependency Caching](../../../devops-user-guide/how-to-use/devops-settings/set-ci-node/).

## Use Source-to-Image (S2I)

### Step 1: Fork the example repository

Log in to GitHub and fork the GitHub repository [devops-maven-sample](https://github.com/Super Kubenetes/devops-maven-sample) to your personal GitHub account.

### Step 2: Create Secrets

Log in to Super Kubenetes as `project-regular`. Go to your project and create a Secret for Docker Hub and GitHub respectively. For more information, see [Create the Most Common Secrets](../../../project-user-guide/configuration/secrets/#create-the-most-common-secrets).

<div className="notices note">
  <p>Note</p>
  <div>
    You do not need to create the GitHub Secret if your forked repository is open to the public.
  </div>
</div>

### Step 3: Create a Service

1. In the same project, navigate to **Services** under **Application Workloads** and click **Create**.

2. Choose **Java** under **Create Service from Source Code**, name it `s2i-demo` and click **Next**.

  <div className="notices note">
    <p>Note</p>
    <div>
      Super Kubenetes has integrated common S2I templates such as Java, Node.js and Python. If you want to use other languages or customize your S2I templates, see [Customize S2I Templates](../s2i-templates/).
    </div>
  </div>

3. On the **Build Settings** page, provide the following information accordingly and click **Next**.

   **Service Type**: Select **Stateless Service** for this example. For more information about different Services, see [Service Type](../../../project-user-guide/application-workloads/services/#service-type).

   **Build Environment**: Select **Super Kubenetes/java-8-centos7:v2.1.0**.

   **Code Repository URL**: The source code repository address (currently support Git). You can specify the code branch and the relative path in the source code terminal. The URL supports HTTP and HTTPS. Paste the forked repository URL (your own repository address) into this field.

   **Code Repository Branch**: The branch that is used for image building. Enter `master` for this tutorial. You can enter `dependency` for a cache test.

   **Code Repository Key**: You do not need to provide any Secret for a public repository. Select the GitHub Secret if you want to use a private repository.

   **Image Name**: Customize an image name. As this tutorial will push an image to Docker Hub, enter `dockerhub_username/s2i-sample`. `dockerhub_username` is your Docker ID and make sure it has the permission to push and pull images.

   **Image Tag**: The image tag. Enter `latest`.

   **Target Image Registry**: Select the Docker Hub Secret as the image is pushed to Docker Hub.

   **Advanced Settings**: You can define the code relative path. Use the default `/` for this field.

4. On the **Pod Settings** page, scroll down to **Port Settings** to set the access policy for the container. Select **HTTP** for **Protocol**, customize the name (for example, `http-1`), and enter `8080` for both **Container Port** and **Service Port**.

5. Scroll down to **Health Check** and select it. Set **Readiness Check** by filling out the following parameters. Click **√** when you finish setting the probe and then click **Next** to continue.

   **HTTP Request**: Select **HTTP** as the protocol, enter `/` as the path (root path in this tutorial), and enter `8080` as the port exposed.

   **Initial Delay (s)**: The number of seconds after the container has started before the liveness probe is initiated. Enter `30` for this field.

   **Timeout (s)**: The number of seconds after which the probe times out. Enter `10` for this field.

   For other fields, use the default value directly. For more information about how to configure probes and set other parameters on the **Container Settings** page, see [Pod Settings](../../../project-user-guide/application-workloads/container-image-settings/).

6. On the **Storage Settings** page, you can add a volume for the container. For more information, see [Volumes](../../../project-user-guide/storage/volumes/). Click **Next** to continue.

7. On the **Advanced Settings** page, select **External Access** and select **NodePort** as the access method. Click **Create** to finish the whole process.

8. Click **Image Builders** from the navigation bar and you can see that the example image is being built.

### Step 4: Check results

1. Wait for a while and you can see the status of the image builder has reached **Successful**.

2. Click this image builder to go to its details page. Under **Job Records**, click <img src="/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-publish-app-without-dockerfile/down-arrow.png" width="20px" alt="icon" /> on the right of a record to see building logs. You can see `Build completed successfully` at the end of the log if everything runs normally.

3. Go back to the **Services**, **Deployments**, and **Jobs** page, and you can see the corresponding Service, Deployment, and Job of the image have been all created successfully.

4. In your Docker Hub repository, you can see that Super Kubenetes has pushed the image to the repository with the expected tag.

### Step 5: Access the S2I Service

1. On the **Services** page, click the S2I Service to go to its details page.

2. To access the Service, you can either use the endpoint with the `curl` command or visit `<Node IP>:<NodePort>`. For example:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
								$ curl 10.10.131.44:8080
								Really appreciate your star, that is the power of our life.
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you want to access the Service outside the cluster, you may need to open the port in your security groups and configure port forwarding rules depending on your deployment environment.
    </div>
  </div>
