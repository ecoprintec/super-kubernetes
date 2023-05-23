---
title: "Create a Microservices-based App"
keywords: 'Super Kubenetes, Kubernetes, service mesh, microservices'
description: 'Learn how to compose a microservice-based application from scratch.'
linkTitle: "Create a Microservices-based App"
weight: 10140
---

With each microservice handling a single part of the app's functionality, an app can be divided into different components. These components have their own responsibilities and limitations, independent from each other. In Super Kubenetes, this kind of app is called <b>Composed App</b>, which can be built through newly created Services or existing Services.

This tutorial demonstrates how to create a microservices-based app Bookinfo, which is composed of four Services, and set a customized domain name to access the app.

## Prerequisites

- You need to create a workspace, a project, and a user (`project-regular`) for this tutorial. The user needs to be invited to the project with the `operator` role. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).
- `project-admin` needs to [set the project gateway](../../../project-administration/project-gateway/) so that `project-regular` can define a domain name when creating the app.

## Create Microservices that Compose an App

1. Log in to the web console of Super Kubenetes and navigate to <b>Apps</b> in <b>Application Workloads</b> of your project. On the <b>Composed Apps</b> tab, click <b>Create</b>.

2. Set a name for the app (for example, `bookinfo`) and click <b>Next</b>.

3. On the <b>Services</b> page, you need to create microservices that compose the app. Click <b>Create Service</b> and select <b>Stateless Service</b>.

4. Set a name for the Service (e.g `productpage`) and click <b>Next</b>.

  <div className="notices note">
    <p>Note</p>
    <div>
      You can create a Service on the dashboard directly or enable <b>Edit YAML<b> in the upper-right corner to edit the YAML file.
    </div>
  </div>

5. Click <b>Add Container</b> under <b>Containers</b> and enter `Super Kubenetes/examples-bookinfo-productpage-v1:1.13.0` in the search box to use the Docker Hub image.

  <div className="notices note">
    <p>Note</p>
    <div>
      You must press <b>Enter</b> in your keyboard after you enter the image name.
    </div>
  </div>

6. Click <b>Use Default Ports</b>. For more information about image settings, see [Pod Settings](../../../project-user-guide/application-workloads/container-image-settings/). Click <b>√</b> in the lower-right corner and <b>Next</b> to continue.

7. On the <b>Storage Settings</b> page, [add a volume](../../../project-user-guide/storage/volumes/) or click <b>Next</b> to continue.

8. Click <b>Create</b> on the <b>Advanced Settings</b> page.

9. Similarly, add the other three microservices for the app. Here is the image information:

  <table>
  <thead>
  <tr>
    <th>
      Service
    </th>
    <th>
      Name
    </th>
    <th>
      Image
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>details</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-details-v1:1.13.0</code>
    </td>
  </tr>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>reviews</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-reviews-v1:1.13.0</code>
    </td>
  </tr>
  <tr>
    <td>
      Stateless
    </td>
    <td>
      <code>ratings</code>
    </td>
    <td>
      <code>Super Kubenetes/examples-bookinfo-ratings-v1:1.13.0</code>
    </td>
  </tr>
  </tbody>
  </table>

10. When you finish adding microservices, click <b>Next</b>.

11. On the <b>Route Settings</b> page, click <b>Add Routing Rule</b>. On the <b>Specify Domain</b> tab, set a domain name for your app (for example, `demo.bookinfo`) and select `HTTP` in the <b>Protocol</b> field. For `Paths`, select the Service `productpage` and port `9080`. Click <b>OK</b> to continue.

  <div className="notices note">
    <p>Note</p>
    <div>
      The button <b>Add Routing Rule</b> is not visible if the project gateway is not set.
    </div>
  </div>

12. You can add more rules or click <b>Create</b> to finish the process.

13. Wait for your app to reach the <b>Ready</b> status.


## Access the App

1. As you set a domain name for the app, you need to add an entry in the hosts (`/etc/hosts`) file. For example, add the IP address and hostname as below:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									192.168.0.9 demo.bookinfo
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You must add your <b>own</b> IP address and hostname.
    </div>
  </div>

2. In <b>Composed Apps</b>, click the app you just created.

3. In <b>Resource Status</b>, click <b>Access Service</b> under <b>Routes</b> to access the app.

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure you open the port in your security group.
    </div>
  </div>


4. Click <b>Normal user</b> and <b>Test user</b> respectively to see other <b>Services</b>.

