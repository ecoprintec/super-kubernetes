---
title: "Deployments"
keywords: 'Super Kubenetes, Kubernetes, Deployments, workload'
description: 'Learn basic concepts of Deployments and how to create Deployments in Super Kubenetes.'
linkTitle: "Deployments"
weight: 10210
---

A Deployment controller provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment object, and the Deployment controller changes the actual state to the desired state at a controlled rate. As a Deployment runs a number of replicas of your application, it automatically replaces instances that go down or malfunction. This is how Deployments make sure app instances are available to handle user requests.

For more information, see the [official documentation of Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

## Prerequisites

You need to create a workspace, a project and a user (`project-regular`). The user must be invited to the project with the role of `operator`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Create a Deployment

### Step 1: Open the dashboard

Log in to the console as `project-regular`. Go to <b>Application Workloads</b> of a project, select <b>Workloads</b>, and click <b>Create</b> under the tab <b>Deployments</b>.

### Step 2: Enter basic information

Specify a name for the Deployment (for example, `demo-deployment`), select a project, and click <b>Next</b>.

### Step 3: Set a Pod

1. Before you set an image, define the number of replicated Pods in <b>Pod Replicas</b> by clicking <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/plus-icon.png" width="20px" alt="icon" /> or <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/minus-icon.png" width="20px" alt="icon" />, which is indicated by the `.spec.replicas` field in the manifest file.

    <div className="notices tip">
      <p>Tip</p>
      <div>
        You can see the Deployment manifest file in YAML format by enabling <b>Edit YAML</b> in the upper-right corner. Super Kubenetes allows you to edit the manifest file directly to create a Deployment. Alternatively, you can follow the steps below to create a Deployment via the dashboard.
      </div>
    </div>

2. Click <b>Add Container</b>.

3. Enter an image name from public Docker Hub or from a [private repository](../../configuration/image-registry/) you specified. For example, enter `nginx` in the search box and press <b>Enter</b>.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Remember to press <b>Enter</b> on your keyboard after you enter an image name in the search box.
      - If you want to use your private image repository, you should [create an Image Registry Secret](../../configuration/image-registry/) first in <b>Secrets</b> under <b>Configuration</b>.
    </div>
  </div>


4. Set requests and limits for CPU and memory resources based on your needs. For more information, see [Resource Request and Resource Limit in Container Image Settings](../container-image-settings/#add-container-image).

5. Click <b>Use Default Ports</b> for <b>Port Settings</b> or you can customize <b>Protocol</b>, <b>Name</b> and <b>Container Port</b>.

6. Select a policy for image pulling from the drop-down list. For more information, see [Image Pull Policy in Container Image Settings](../container-image-settings/#add-container-image).

7. For other settings (<b>Health Check</b>, <b>Start Command</b>, <b>Environment Variables</b>, <b>Container Security Context</b> and <b>Synchronize Host Timezone</b>), you can configure them on the dashboard as well. For more information, see detailed explanations of these properties in [Pod Settings](../container-image-settings/#add-container-image). When you finish, click <b>√</b> in the lower-right corner to continue.

8. Select an update strategy from the drop-down menu. It is recommended that you choose <b>Rolling Update</b>. For more information, see [Update Strategy](../container-image-settings/#update-strategy).

9. Select a Pod scheduling rule. For more information, see [Pod Scheduling Rules](../container-image-settings/#pod-scheduling-rules).

10. Click <b>Next</b> to continue when you finish setting the Pod.

### Step 4: Mount volumes

You can add a volume directly or mount a ConfigMap or Secret. Alternatively, click <b>Next</b> directly to skip this step. For more information about volumes, visit [Volumes](../../storage/volumes/#mount-a-volume).

<div className="notices note">
  <p>Note</p>
  <div>
    Deployments can't use a volume template, which is used by StatefulSets.
  </div>
</div>

### Step 5: Configure advanced settings

You can set a policy for node scheduling and add metadata in this section. When you finish, click <b>Create</b> to complete the whole process of creating a Deployment.

- <b>Select Nodes</b>

  Assign Pod replicas to run on specified nodes. It is specified in the field `nodeSelector`.

- <b>Add Metadata</b>

  Additional metadata settings for resources such as <b>Labels</b> and <b>Annotations</b>.

## Check Deployment Details

### Details page

1. After a Deployment is created, it will be displayed in the list. You can click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/three-dots.png" width="20px" alt="icon" /> on the right and select options from the menu to modify your Deployment.

    - <b>Edit Information</b>: View and edit the basic information.
    - <b>Edit YAML</b>: View, upload, download, or update the YAML file.
    - <b>Re-create</b>: Re-create the Deployment.
    - <b>Delete</b>: Delete the Deployment.

2. Click the name of the Deployment and you can go to its details page.

3. Click <b>More</b> to display the operations about this Deployment you can do.

    - <b>Roll Back</b>: Select the revision to roll back.
    - <b>Edit Autoscaling</b>: Autoscale the replicas according to CPU and memory usage. If both CPU and memory are specified, replicas are added or deleted if any of the conditions is met.
    - <b>Edit Settings</b>: Configure update strategies, containers and volumes.
    - <b>Edit YAML</b>: View, upload, download, or update the YAML file.
    - <b>Re-create</b>: Re-create this Deployment.
    - <b>Delete</b>: Delete the Deployment, and return to the Deployment list page.

4. Click the <b>Resource Status</b> tab to view the port and Pod information of the Deployment.

    - <b>Replica Status</b>: Click <img src="/dist/assets/docs/v3.3/common-icons/replica-plus-icon.png" width="20px" alt="icon" /> or <img src="/dist/assets/docs/v3.3/common-icons/replica-minus-icon.png" width="20px" alt="icon" /> to increase or decrease the number of Pod replicas.
    - <b>Pods</b>

        - The Pod list provides detailed information of the Pod (status, node, Pod IP and resource usage).
        - You can view the container information by clicking a Pod item.
        - Click the container log icon to view output logs of the container.
        - You can view the Pod details page by clicking the Pod name.

### Revision records

After the resource template of workload is changed, a new log will be generated and Pods will be rescheduled for a version update. The latest 10 versions will be saved by default. You can implement a redeployment based on the change log.

### Metadata

Click the <b>Metadata</b> tab to view the labels and annotations of the Deployment.

### Monitoring

1. Click the <b>Monitoring</b> tab to view the CPU usage, memory usage, outbound traffic, and inbound traffic of the Deployment.

2. Click the drop-down menu in the upper-right corner to customize the time range and sampling interval.

3. Click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_autorefresh_start.png" width="20px" alt="icon" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_autorefresh_stop.png" width="20px" alt="icon" /> in the upper-right corner to start/stop automatic data refreshing.

4. Click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_refresh.png" width="20px" alt="icon" /> in the upper-right corner to manually refresh the data.

### Environment variables

Click the <b>Environment Variables</b> tab to view the environment variables of the Deployment.

### Events

Click the <b>Events</b> tab to view the events of the Deployment.