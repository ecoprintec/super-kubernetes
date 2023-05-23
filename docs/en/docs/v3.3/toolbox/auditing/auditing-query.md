---
title: "Auditing Log Query"
keywords: "Kubernetes, Super Kubenetes, auditing, log, query"
description: "Understand how you can perform quick auditing log queries to keep track of the latest auditing information of your cluster."
linkTitle: "Auditing Log Query"
weight: 15330
---

Super Kubenetes supports the query of auditing logs among isolated tenants. This tutorial demonstrates how to use the query function, including the interface, search parameters and detail pages.

## Prerequisites

You need to enable [Super Kubenetes Auditing Logs](../../../pluggable-components/auditing-logs/).

## Enter the Query Interface

1. The query function is available for all users. Log in to the console with any user, hover over the <img src="/dist/assets/docs/v3.3/toolbox/auditing-query/toolbox.png" width="20" alt="icon" /> in the lower-right corner and select **Audit Log Search**.

  <div className="notices note">
    <p>Note</p>
    <div>
      Any user has the permission to query auditing logs, while the logs that each user is able to see are different.

      - If a user has the permission to view resources in a project, it can see the auditing log that happens in this project, such as workload creation in the project.
      - If a user has the permission to list projects in a workspace, it can see the auditing log that happens in this workspace but not in projects, such as project creation in the workspace.
      - If a user has the permission to list projects in a cluster, it can see the auditing log that happens in this cluster but not in workspaces and projects, such as workspace creation in the cluster.
    </div>
  </div> 

2. In the pop-up window, you can view log trends in the last 12 hours. 

3. The **Audit Log Search** console supports the following query parameters:

   <table>
     <tbody>
       <tr>
         <th width='150'>Parameter</th>
         <th>Description</th>
       </tr>
       <tr>
         <td>Cluster</td>
         <td>Cluster where the operation happens. It is enabled if the [multi-cluster feature](../../../multicluster-management/introduction/overview/) is turned on.</td>
         </tr>
       <tr>
         <td>Project</td>
         <td>Project where the operation happens. It supports exact query and fuzzy query.</td>
       </tr>
       <tr>
         <td>Workspace</td>
         <td>Workspace where the operation happens. It supports exact query and fuzzy query.</td>
       </tr>
       <tr>
         <td>Resource Type</td>
         <td>Type of resource associated with the request. It supports fuzzy query.</td>
       </tr>
       <tr>
         <td>Resource Name</td>
         <td>Name of the resource associated with the request. It supports fuzzy query.</td>
       </tr><tr>
         <td>Verb</td>
         <td>Kubernetes verb associated with the request. For non-resource requests, this is the lower-case HTTP method. It supports exact query.</td>
       </tr><tr>
         <td>Status Code</td>
         <td>HTTP response code. It supports exact query.</td>
       </tr><tr>
         <td>Operation Account</td>
         <td>User who calls this request. It supports exact and fuzzy query.</td>
       </tr><tr>
         <td>Source IP</td>
         <td>IP address from where the request originated and intermediate proxies. It supports fuzzy query.</td>
       </tr><tr>
         <td>Time Range</td>
         <td>Time when the request reaches the apiserver.</td>
       </tr>
   </table>
   
  <div className="notices note">
    <p>Note</p>
    <div>
      - Fuzzy query supports case-insensitive fuzzy matching and retrieval of full terms by the first half of a word or phrase based on Elasticsearch segmentation rules.
      - Super Kubenetes stores logs for the last seven days by default. You can modify the retention period in the ConfigMap `elasticsearch-logging-curator`.
    </div>
  </div> 

## Enter Query Parameters

1. Select a filter and enter the keyword you want to search. For example, query auditing logs containing the information of `services` created.

2. You can click the results to see the auditing log details.