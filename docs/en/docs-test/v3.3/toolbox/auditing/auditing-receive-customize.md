---
title: "Receive and Customize Auditing Logs"
keywords: "Kubernetes, Super Kubenetes, auditing, log, customize, receive"
description: "Learn how to receive and customize auditing logs."
linkTitle: "Receive and Customize Auditing Logs"
weight: 15310
---

Super Kubenetes Auditing Logs provide a security-relevant chronological set of records documenting the sequence of activities that have affected the system by individual users, administrators, or other components of the system. Each request to Super Kubenetes generates an event that is then written to a webhook and processed according to a certain rule. The event will be ignored, stored, or generate an alert based on different rules.

## Enable Super Kubenetes Auditing Logs

To enable auditing logs, see [Super Kubenetes Auditing Logs](../../../pluggable-components/auditing-logs/).

## Receive Auditing Logs from Super Kubenetes

The Super Kubenetes Auditing Log system receives auditing logs only from Super Kubenetes by default, while it can also receive auditing logs from Kubernetes.

Users can stop receiving auditing logs from Super Kubenetes by changing the value of `auditing.enable` in ConfigMap `Super Kubenetes-config` in the namespace `Super Kubenetes-system` using the following command: 

<article article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl edit cm -n Super Kubenetes-system Super Kubenetes-config
            </p>
        </code>
      </div>
  </pre>
</article>

Change the value of `auditing.enabled` as `false` to stop receiving auditing logs from Super Kubenetes.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditing</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
            </p>
        </code>
      </div>
  </pre>
</article>

You need to restart the Super Kubenetes apiserver to make the changes effective.

## Receive Auditing Logs from Kubernetes

To make the Super Kubenetes Auditing Log system receive auditing logs from Kubernetes, you need to add a Kubernetes audit policy file and Kubernetes audit webhook config file to `/etc/kubernetes/manifests/kube-apiserver.yaml` as follows.

### Audit policy

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Pod</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">kube-apiserver</span> 
              <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;containers</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;command</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;kube-apiserver</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> --<span style="color:#ae81ff">audit-policy-file=/etc/kubernetes/audit/audit-policy.yaml</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> --<span style="color:#ae81ff">audit-webhook-config-file=/etc/kubernetes/audit/audit-webhook.yaml</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;volumeMounts</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;mountPath</span>: <span style="color:#ae81ff">/etc/kubernetes/audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">k8s-audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;readOnly</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;volumes</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;hostPath</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path</span>: <span style="color:#ae81ff">/etc/kubernetes/audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">DirectoryOrCreate</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">k8s-audit</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    This operation will restart the Kubernetes apiserver.
  </div>
</div> 

The file `audit-policy.yaml` defines rules about what events should be recorded and what data they should include. You can use a minimal audit policy file to log all requests at the Metadata level:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span> Log all requests at the Metadata level.</span>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">audit.k8s.io/v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Policy</span> 
              <span style="color:#f92672">rules</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;level</span>: <span style="color:#ae81ff">Metadata</span>
            </p>
        </code>
      </div>
  </pre>
</article>

For more information about the audit policy, see [Audit Policy](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/).

### Audit webhook

The file `audit-webhook.yaml` defines the webhook which the Kubernetes auditing logs will be sent to. Here is an example configuration of the Kube-Auditing webhook.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
              <span style="color:#f92672">clusters</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">kube-auditing</span> 
              <span style="color:#f92672">&nbsp;&nbsp;cluster</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://{ip}:6443/audit/webhook/event</a></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecure-skip-tls-verify</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">contexts</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;context</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cluster</span>: <span style="color:#ae81ff">kube-auditing</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;user</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">default-context</span> 
              <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">default-context</span> 
              <span style="color:#f92672">preferences</span>: {} 
              <span style="color:#f92672">users</span>: []
            </p>
        </code>
      </div>
  </pre>
</article>

The `ip` is the `CLUSTER-IP` of Service `kube-auditing-webhook-svc` in the namespace `Super Kubenetes-logging-system`. You can get it using this command.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get svc -n Super Kubenetes-logging-system
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    You need to restart the Kubernetes apiserver to make the changes effective after you modified these two files.
  </div>
</div>

Edit the CRD Webhook `kube-auditing-webhook`, and change the value of `k8sAuditingEnabled` to `true` through the following commands.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl edit webhooks.auditing.Super Kubenetes.io kube-auditing-webhook
            </p>
        </code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditing</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;k8sAuditingEnabled</span>: <span style="color:#66d9ef">true</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices tip">
  <p>Tip</p>
  <div>
    You can also use a user of `platform-admin` role to log in to the console, search `Webhook` in **CRDs** on the **Cluster Management** page, and edit `kube-auditing-webhook` directly.
  </div>
</div>

To stop receiving auditing logs from Kubernetes, remove the configuration of auditing webhook backend, then change the value of `k8sAuditingEnabled` to `false`.

## Customize Auditing Logs

Super Kubenetes Auditing Log system provides a CRD Webhook `kube-auditing-webhook` to customize auditing logs. Here is an example yaml file:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Webhook</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">kube-auditing-webhook</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditLevel</span>: <span style="color:#ae81ff">RequestResponse</span> 
              <span style="color:#f92672">&nbsp;&nbsp;auditSinkPolicy</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alertingRuleSelector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;archivingRuleSelector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">persistence</span> 
              <span style="color:#f92672">&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/kube-auditing-webhook:v0.1.0</span> 
              <span style="color:#f92672">&nbsp;&nbsp;archivingPriority</span>: <span style="color:#ae81ff">DEBUG</span> 
              <span style="color:#f92672">&nbsp;&nbsp;alertingPriority</span>: <span style="color:#ae81ff">WARNING</span> 
              <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;receivers</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">alert</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alertmanager</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-monitoring-system</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alertmanager-main</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">9093</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

  <table>
  <thead>
  <tr>
    <th>
      Parameter
    </th>
    <th>
      Description
    </th>
    <th>
      Default
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>replicas</code>
    </td>
    <td>
      The replica number of the Kube-Auditing webhook.
    </td>
    <td>
      2
    </td>
  </tr>
  <tr>
    <td>
      <code>archivingPriority</code>
    </td>
    <td>
      The priority of the archiving rule. The known audit types are <code>DEBUG</code>, <code>INFO</code>, and <code>WARNING</code>.
    </td>
    <td>
      <code>DEBUG</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>alertingPriority</code>
    </td>
    <td>
      The priority of the alerting rule. The known audit types are <code>DEBUG</code>, <code>INFO</code>, and <code>WARNING</code>.
    </td>
    <td>
      <code>WARNING</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>auditLevel</code>
    </td>
    <td>
      The level of auditing logs. The known levels are:<br>
      - <code>None</code>: don't log events.<br>
      - <code>Metadata</code>: log request metadata (requesting user, timestamp, resource, verb, etc.) but not requests or response bodies.<br>
      - <code>Request</code>: log event metadata and request bodies but no response body. This does not apply to non-resource requests.<br>
      - <code>RequestResponse</code>: log event metadata, requests, and response bodies. This does not apply to non-resource requests.
    </td>
    <td>
      <code>Metadata</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>k8sAuditingEnabled</code>
    </td>
    <td>
      Whether to receive Kubernetes auditing logs.
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>receivers</code>
    </td>
    <td>
      The receivers to receive alerts.
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    You can change the level of Kubernetes auditing logs by modifying the file `audit-policy.yaml`, then restart the Kubernetes apiserver.
  </div>
</div> 
