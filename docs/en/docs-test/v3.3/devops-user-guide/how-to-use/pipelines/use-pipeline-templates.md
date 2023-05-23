---
title: "Use Pipeline Templates"
keywords: 'Super Kubenetes, Kubernetes, Jenkins, Graphical Pipelines, Pipeline Templates'
description: 'Understand how to use pipeline templates on Super Kubenetes.'
linkTitle: "Use Pipeline Templates"
weight: 11213
---

Super Kubenetes offers a graphical editing panel where the stages and steps of a Jenkins pipeline can be defined through interactive operations. Super Kubenetes 3.3.0 provides built-in pipeline templates, such as Node.js, Maven, and Golang, to help users quickly create pipelines. Additionally, Super Kubenetes 3.3.0 also supports customization of pipeline templates to meet diversified needs of enterprises.

This section describes how to use pipeline templates on Super Kubenetes.
## Prerequisites

- You have a workspace, a DevOps project and a user (`project-regular`) invited to the DevOps project with the `operator` role. If they are not ready yet, please refer to [Create Workspaces, Projects, Users and Roles](../../../../quick-start/create-workspace-and-project/).

- You need to [enable the Super Kubenetes DevOps system](../../../../pluggable-components/devops/).

- You need to [create a pipeline](../../../how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/).

## Use a Built-in Pipeline Template

The following takes Node.js as an example to show how to use a built-in pipeline template. Steps for using Maven and Golang pipeline templates are alike.


1. Log in to the Super Kubenetes console as `project-regular`. In the navigation pane on the left, click **DevOps Projects**.

2. On the **DevOps Projects** page, click the DevOps project you created.

3. In the navigation pane on the left, click **Pipelines**.

4. On the pipeline list on the right, click the created pipeline to go to its details page.

5. On the right pane, click **Edit Pipeline**.

6. On the **Create Pipeline** dialog box, click **Node.js**, and then click **Next**.


7. On the **Parameter Settings** tab, set the parameters based on the actual situation, and then click **Create**.
   
   <table>
   <thead>
   <tr>
      <th>
         Parameter
      </th>
      <th>
         Meaning
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         GitURL
      </td>
      <td>
         URL of the project repository to clone
      </td>
   </tr>
   <tr>
      <td>
         GitRevision
      </td>
      <td>
         Revision to check out from
      </td>
   </tr>
   <tr>
      <td>
         NodeDockerImage
      </td>
      <td>
         Docker image version of Node.js
      </td>
   </tr>
   <tr>
      <td>
         InstallScript
      </td>
      <td>
         Shell script for installing dependencies
      </td>
   </tr>
   <tr>
      <td>
         TestScript
      </td>
      <td>
         Shell script for testing
      </td>
   </tr>
   <tr>
      <td>
         BuildScript
      </td>
      <td>
         Shell script for building a project
      </td>
   </tr>
   <tr>
      <td>
         ArtifactsPath
      </td>
      <td>
         Path where the artifacts reside
      </td>
   </tr>
   </tbody>
   </table>

8. On the left pane, the system has preset several steps, and you can add more steps and parallel stages.

9. Click a specific step. On the right pane, you can perform the following operations:
   - Change the stage name.
   - Delete a stage.
   - Set the agent type.
   - Add conditions.
   - Edit or delete a task.
   - Add steps or nested steps.
   
<div className="notices note">
  <p>Note</p>
  <div>
    You can also customize the stages and steps in the pipeline templates based on your needs. For more information about how to use the graphical editing panel, refer to [Create a Pipeline Using Graphical Editing Panels](../create-a-pipeline-using-graphical-editing-panel/).
  </div>
</div>

10. On the **Agent** area on the left, select an agent type, and click **OK**. The default value is **kubernetes**.
    
    The following table explains the agent types.

    <style>
    table th:first-of-type {
        width: 20%;
    }
    table th:nth-of-type(2) {
        width: 80%;
    }
    </style>
   <table>
   <thead>
   <tr>
      <th>
         Agent Type
      </th>
      <th>
         Description
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         any
      </td>
      <td>
         Uses the default base pod template to create a Jenkins agent to run pipelines.
      </td>
   </tr>
   <tr>
      <td>
         node
      </td>
      <td>
         Uses a pod template with the specific label to create a Jenkins agent to run pipelines. Available labels include base, java, nodejs, maven, go, and more.
      </td>
   </tr>
   <tr>
      <td>
         kubernetes
      </td>
      <td>
         Use a yaml file to customize a standard Kubernetes pod template to create a jenkins agent to run pipelines.
      </td>
   </tr>
   </tbody>
   </table>

11. On the pipeline details page, you can view the created pipeline template. Click **Run** to run the pipeline.

## Legacy Built-in Pipeline Templates

In earlier versions, Super Kubenetes also provides the CI and CI & CD pipeline templates. However, as the two templates are hardly customizable, you are advised to use the Node.js, Maven, or Golang pipeline template, or directly customize a template based on your needs.
The following briefly introduces the CI and CI & CD pipeline templates.

- CI pipeline template

   ![ci-template](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/ci-template.png)

   ![ci-stages](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/ci-stages.png)

   The CI pipeline template contains two stages. The **clone code** stage checks out code and the **build & push** stage builds an image and pushes it to Docker Hub. You need to create credentials for your code repository and your Docker Hub registry in advance, and then set the URL of your repository and these credentials in corresponding steps. After you finish editing, the pipeline is ready to run.

- CI & CD pipeline template

   ![cicd-template](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/cicd-template.png)

   ![cicd-stages](/dist/assets/docs/v3.3/devops-user-guide/using-devops/use-pipeline-templates/cicd-stages.png)

   The CI & CD pipeline template contains six stages. For more information about each stage, refer to [Create a Pipeline Using a Jenkinsfile](../create-a-pipeline-using-jenkinsfile/#pipeline-overview), where you can find similar stages and the descriptions. You need to create credentials for your code repository, your Docker Hub registry, and the kubeconfig of your cluster in advance, and then set the URL of your repository and these credentials in corresponding steps. After you finish editing, the pipeline is ready to run.