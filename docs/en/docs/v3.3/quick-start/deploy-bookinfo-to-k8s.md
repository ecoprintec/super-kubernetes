---
title: 'Deploy and Access Bookinfo'
keywords: 'Super Kubenetes, Kubernetes, Bookinfo, Istio'
description: 'Explore the basics of Super Kubenetes service mesh by deploying an example application Bookinfo.'
linkTitle: 'Deploy and Access Bookinfo'
weight: 2400
---

[Istio](https://istio.io/), as an open-source service mesh solution, provides powerful features of traffic management for microservices. The introduction of traffic management from the official website of [Istio](https://istio.io/latest/docs/concepts/traffic-management/) is as follows:

_Istio’s traffic routing rules let you easily control the flow of traffic and API calls between services. Istio simplifies configuration of service-level properties like circuit breakers, timeouts, and retries, and makes it easy to set up important tasks like A/B testing, canary rollouts, and staged rollouts with percentage-based traffic splits. It also provides out-of-box failure recovery features that help make your application more robust against failures of dependent services or the network._

To provide consistent user experiences of managing microservices, Super Kubenetes integrates Istio on the container platform. This tutorial demonstrates how to deploy a sample application Bookinfo composed of four separate microservices and access it through a NodePort.

## Prerequisites

- You need to enable [Super Kubenetes Service Mesh](../../pluggable-components/service-mesh/).

- You need to finish all tasks in [Create Workspaces, Projects, Users and Roles](../create-workspace-and-project/).

- You need to enable **Application Governance**. For more information, see [Set a Gateway](../../project-administration/project-gateway/#set-a-gateway).

<div className="notices note" style="margin-left:32px">
  <p>Note</p>
  <div>
    You need to enable **Application Governance** so that you can use the Tracing feature. Once it is enabled, check whether an annotation (for example, `nginx.ingress.kubernetes.io/service-upstream: true`) is added for your Route (Ingress) if the Route is inaccessible.
  </div>
</div>

## What is Bookinfo

Bookinfo is composed of the following four separate microservices. There are three versions of the **reviews** microservice.

- The **productpage** microservice calls the **details** and **reviews** microservices to populate the page.
- The **details** microservice contains book information.
- The **reviews** microservice contains book reviews. It also calls the **ratings** microservice.
- The **ratings** microservice contains book ranking information that accompanies a book review.

The following figure shows the end-to-end architecture of the application. For more information, see [Bookinfo Application](https://istio.io/latest/docs/examples/bookinfo/).

![bookinfo](/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/bookinfo.png)

## Hands-on Lab

### Step 1: Deploy Bookinfo

1. Log in to the console as `project-regular` and go to your project (`demo-project`). Go to **Apps** under **Application Workloads**, and then click **Deploy Sample App** on the right of the page.

2. Click **Next** in the displayed dialog box where required fields are pre-populated and relevant components are already set. You do not need to change the settings and just click **Create** on the final page.

  <div className="notices note">
    <p>Note</p>
    <div>
      Super Kubenetes creates the hostname automatically. To change the hostname, hover over the default route rule and click <img src="/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/edit-icon.png" width='20px' alt="icon"  /> to edit it. For more information, see [Create a Microservices-based App](../../project-user-guide/application/compose-app/).
    </div>
  </div>

1. In **Workloads**, verify that the status of all four Deployments is `Running`, indicating that the app has been created successfully.

  <div className="notices note">
    <p>Note</p>
    <div>
      It may take a few minutes before the Deployments are up and running.
    </div>
  </div>

### Step 2: Access Bookinfo

1. In **Apps**, go to **Composed Apps** and click the app `bookinfo` to see its details page.

  <div className="notices note">
    <p>Note</p>
    <div>
      If you do not see the app in the list, refresh your page.
    </div>
  </div>

2. On the details page, record the hostname and port number of the app, which will be used to access Bookinfo.

3. As the app will be accessed outside the cluster through a NodePort, you need to open the port in your security group for outbound traffic and set port forwarding rules if necessary.

4. Edit your local host file (`/etc/hosts`) by adding an entry in it to map the hostname to the IP address. For example:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>139.198.179.20 productpage.demo-project.192.168.0.2.nip.io</code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Do not copy the preceding content to your local host file. Replace it with your own IP address and hostname.
    </div>
  </div>

5. When you finish, click **Access Service** to access the app.

6. On the app details page, click **Normal user** in the lower-left corner.

7. In the following figure, you can notice that only **Reviewer1** and **Reviewer2** are displayed without any stars in the **Book Reviews** section. This is the status of this app version. To explore more features of traffic management, you can implement a [canary release](../../project-user-guide/grayscale-release/canary-release/) for this app.

   ![ratings-page](/dist/assets/docs/v3.3/quickstart/deploy-bookinfo-to-k8s/ratings-page.png)

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes provides three kinds of grayscale strategies based on Istio, including [blue-green deployment](../../project-user-guide/grayscale-release/blue-green-deployment/), [canary release](../../project-user-guide/grayscale-release/canary-release/) and [traffic mirroring](../../project-user-guide/grayscale-release/traffic-mirroring/).
  </div>
</div>
