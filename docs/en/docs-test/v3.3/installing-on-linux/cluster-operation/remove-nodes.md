---
title: "Delete Kubernetes Nodes"
keywords: 'Kubernetes, Super Kubenetes, scale-in, remove-nodes'
description: 'Cordon a node and even delete a node to scale in your cluster.'
linkTitle: "Delete Nodes"
weight: 3620
---

## Cordon a Kubernetes Node

Marking a node as unschedulable prevents the scheduler from placing new Pods onto that node while not affecting existing Pods on the node. This is useful as a preparatory step before a node reboot or other maintenance.

Log in to the console as `admin` and go to the **Cluster Management** page. To mark a node unschedulable, choose **Cluster Nodes** under **Nodes** from the left menu, find a node you want to remove from the cluster, and click **Cordon**. Alternatively, you can run the command `kubectl cordon $NODENAME` directly. See [Kubernetes Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/) for more details.

<div className="notices note">
  <p>Note</p>
  <div>
    Pods that are part of a DaemonSet tolerate being run on an unschedulable node. DaemonSets typically provide node-local services that should run on the node even if it is being drained of workload applications.
  </div>
</div>

## Delete a Kubernetes Node

1. To delete a node, you need to prepare the configuration file of your cluster first, which is the one created when you [set up your cluster](../../introduction/multioverview/#1-create-an-example-configuration-file). If you do not have it, use [KubeKey](https://github.com/Super Kubenetes/kubekey) to retrieve cluster information (a file `sample.yaml` will be created by default).

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --from-cluster</code>
        </div>
    </pre>
  </article>

2. Make sure you provide all the information of your hosts in the configuration file and run the following command to delete a node.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk delete node <nodeName> -f sample.yaml</code>
        </div>
    </pre>
  </article>
