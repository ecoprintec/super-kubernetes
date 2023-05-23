---
title: "Jobs"
keywords: "Super Kubenetes, Kubernetes, Docker, Jobs"
description: "Learn basic concepts of Jobs and how to create Jobs on Super Kubenetes."
linkTitle: "Jobs"
weight: 10250
---

A Job creates one or more Pods and ensures that a specified number of them successfully terminates. As Pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the task (namely, Job) is complete. Deleting a Job will clean up the Pods it created.

A simple case is to create one Job object in order to reliably run one Pod to completion. The Job object will start a new Pod if the first Pod fails or is deleted (for example, due to a node hardware failure or a node reboot). You can also use a Job to run multiple Pods in parallel.

The following example demonstrates specific steps of creating a Job (computing π to 2000 decimal places) on Super Kubenetes.

## Prerequisites

You need to create a workspace, a project and a user (`project-regular`). The user must be invited to the project with the role of `operator`. For more information, see [Create Workspaces, Projects, Users and Roles](../../../quick-start/create-workspace-and-project/).

## Create a Job

### Step 1: Open the dashboard

Log in to the console as `project-regular`. Go to **Jobs** under **Application Workloads** and click **Create**.

### Step 2: Enter basic information

Enter the basic information. The following describes the parameters:

- **Name**: The name of the Job, which is also the unique identifier.
- **Alias**: The alias name of the Job, making resources easier to identify.
- **Description**: The description of the Job, which gives a brief introduction of the Job.

### Step 3: Strategy settings (optional)

You can set the values in this step or click **Next** to use the default values. Refer to the table below for detailed explanations of each field.

| Name                    | Definition                   | Description                                                  |
| ----------------------- | ---------------------------- | ------------------------------------------------------------ |
| Maximum Retries          | `spec.backoffLimit`          | It specifies the maximum number of retries before this Job is marked as failed. It defaults to 6. |
| Complete Pods             | `spec.completions`           | It specifies the desired number of successfully finished Pods the Job should be run with. Setting it to nil means that the success of any Pod signals the success of all Pods, and allows parallelism to have any positive value. Setting it to 1 means that parallelism is limited to 1 and the success of that Pod signals the success of the Job. For more information, see [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/). |
| Parallel Pods             | `spec.parallelism`           | It specifies the maximum desired number of Pods the Job should run at any given time. The actual number of Pods running in a steady state will be less than this number when the work left to do is less than max parallelism ((`.spec.completions - .status.successful`) < `.spec.parallelism`). For more information, see [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/). |
| Maximum Duration (s) | `spec.activeDeadlineSeconds` | It specifies the duration in seconds relative to the startTime that the Job may be active before the system tries to terminate it; the value must be a positive integer. |

### Step 4: Set a Pod

1. Select **Re-create Pod** for **Restart Policy**. You can only specify **Re-create Pod** or **Restart container** for **Restart Policy** when the Job is not completed:

   - If **Restart Policy** is set to **Re-create Pod**, the Job creates a new Pod when the Pod fails, and the failed Pod does not disappear.

   - If **Restart Policy** is set to **Restart container**, the Job will internally restart the container when the Pod fails, instead of creating a new Pod.

2. Click **Add Container** which directs you to the **Add Container** page. Enter `perl` in the image search box and press **Enter**.

3. On the same page, scroll down to **Start Command**. Enter the following commands in the box which computes pi to 2000 places then prints it. Click **√** in the lower-right corner and select **Next** to continue.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                perl,-Mbignum<span style="color:#f92672">=</span>bpi,-wle,print bpi<span style="color:#f92672">(</span>2000<span style="color:#f92672">)</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      For more information about setting images, see [Pod Settings](../container-image-settings/).
    </div>
  </div>


### Step 5: Inspect the Job manifest (optional)

1. Enable **Edit YAML** in the upper-right corner which displays the manifest file of the Job. You can see all the values are set based on what you have specified in the previous steps.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">batch/v1</span> 
									<span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Job</span> 
									<span style="color:#f92672">metadata</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">demo-project</span> 
									<span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">job-test-1</span> 
									<span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">job-test-1</span> 
									<span style="color:#f92672">&nbsp;&nbsp;annotations</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes.io/alias-name</span>: <span style="color:#ae81ff">Test</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;Super Kubenetes.io/description</span>: <span style="color:#ae81ff">A job test</span> 
									<span style="color:#f92672">spec</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;template</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">job-test-1</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">container-4rwiyb</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">perl</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">perl</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">'-Mbignum=bpi'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">'-wle'</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">print bpi(2000)</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restartPolicy</span>: <span style="color:#ae81ff">Never</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceAccount</span>: <span style="color:#ae81ff">default</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initContainers</span>: [] 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes</span>: [] 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullSecrets</span>: <span style="color:#66d9ef">null</span> 
									<span style="color:#f92672">&nbsp;&nbsp;backoffLimit</span>: <span style="color:#ae81ff">5</span> 
									<span style="color:#f92672">&nbsp;&nbsp;completions</span>: <span style="color:#ae81ff">4</span> 
									<span style="color:#f92672">&nbsp;&nbsp;parallelism</span>: <span style="color:#ae81ff">2</span> 
									<span style="color:#f92672">&nbsp;&nbsp;activeDeadlineSeconds</span>: <span style="color:#ae81ff">300</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>
    
2. You can make adjustments in the manifest directly and click **Create** or disable the **Edit YAML** and get back to the **Create** page.

  <div className="notices note">
    <p>Note</p>
    <div>
      You can skip **Storage Settings** and **Advanced Settings** for this tutorial. For more information, see [Mount volumes](../deployments/#step-4-mount-volumes) and [Configure advanced settings](../deployments/#step-5-configure-advanced-settings).
    </div>
  </div>


### Step 6: Check the result

1. In the final step of **Advanced Settings**, click **Create** to finish. A new item will be added to the Job list if the creation is successful.

2. Click this Job and go to **Job Records** where you can see the information of each execution record. There are four completed Pods since **Completions** was set to `4` in Step 3.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       You can rerun the Job if it fails and the reason for failure is displayed under **Message**.
     </div>
   </div>

3. In **Resource Status**, you can inspect the Pod status. Two Pods were created each time as **Parallel Pods** was set to 2. Click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/down-arrow.png" width="20px" alt="icon" /> on the right and click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/container-log-icon.png" width="20px" alt="icon" /> to check the container log, which displays the expected calculation result.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       - In **Resource Status**, the Pod list provides the Pod's detailed information (for example, creation time, node, Pod IP and monitoring data).
       - You can view the container information by clicking the Pod.
       - Click the container log icon to view the output logs of the container.
       - You can view the Pod details page by clicking the Pod name.
     </div>
   </div>


## Check Job Details

### Operations

On the Job details page, you can manage the Job after it is created.

- **Edit Information**: Edit the basic information except `Name` of the Job.
- **Rerun**: Rerun the Job, the Pod will restart, and a new execution record will be generated.
- **View YAML**: View the Job's specification in YAML format.
- **Delete**: Delete the Job and return to the Job list page.

### Execution records

1. Click the **Job Records** tab to view the execution records of the Job.

2. Click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/refresh.png" width="20px" alt="icon" /> to refresh the execution records.

### Resource status

1. Click the **Resource Status** tab to view the Pods of the Job.

2. Click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/refresh.png" width="20px" alt="icon" /> to refresh the Pod information, and click <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/display.png" width="20px" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/jobs/hide.png" width="20px" /> to display/hide the containers in each Pod.

### Metadata

Click the **Metadata** tab to view the labels and annotations of the Job.

### Environment variables

Click the **Environment Variables** tab to view the environment variables of the Job.

### Events

Click the **Events** tab to view the events of the Job.
