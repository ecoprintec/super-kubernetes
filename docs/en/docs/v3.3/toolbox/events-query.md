---
title: "Event Query"
keywords: 'Super Kubenetes, Kubernetes, Event, Query'
description: 'Understand how you can perform quick event queries to keep track of the latest events of your cluster.'
linkTitle: "Event Query"
weight: 15200
---

Kubernetes events provide insight into what is happening inside a cluster, based on which Super Kubenetes adds longer historical query and aggregation capabilities, and also supports event query for tenant isolation.

This guide demonstrates how you can do multi-level, fine-grained event queries to track the status of your components.

## Prerequisites

[Super Kubenetes Events](../../pluggable-components/events/) needs to be enabled.

## Query Events

1. The event query function is available for all users. Log in to the console with any account, hover over <img src="/dist/assets/docs/v3.3/toolbox/event-query/toolbox.png" width='20' alt="icon" /> in the lower-right corner and select **Resource Event Search**.

2. In the displayed dialog box, you can view the number of events that the user has permission to view.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Super Kubenetes supports event queries on each cluster separately if you have enabled the [multi-cluster feature](../../multicluster-management/introduction/overview/). You can click <img src="/dist/assets/docs/v3.3/toolbox/event-query/drop-down-list.png" width='20' alt="icon" /> on the left of the search box and select a target cluster.

      - Super Kubenetes stores events for the last seven days by default.
    </div>
  </div>

3. You can click the search box and enter a condition to search for events by message, workspace, project, resource type, resource name, reason, category, or time range (for example, use `Time Range:Last 10 minutes` to search for events within the last 10 minutes).

4. Click any one of the results from the list, and you can see raw information of it. It is convenient for developers in terms of debugging and analysis.

<div className="notices note">
  <p>Note</p>
  <div>
    The event query interface supports dynamic refreshing every 5s, 10s or 15s.
  </div>
</div>