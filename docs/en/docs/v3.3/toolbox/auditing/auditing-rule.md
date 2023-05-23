---
title: "Auditing Rules"
keywords: "Kubernetes, docker, Super Kubenetes, auditing"
description: "Understand the auditing rule and how to customize a rule for processing auditing logs."
linkTitle: "Auditing Rules"
weight: 15320
---

An auditing rule defines the policy for processing auditing logs. Super Kubenetes Auditing Logs provide users with two CRD rules (`archiving-rule` and `alerting-rule`) for customization.

After you enable [Super Kubenetes Auditing Logs](../../../pluggable-components/auditing-logs/), log in to the console with a user of `platform-admin` role. In **CRDs** on the **Cluster Management** page, enter `rules.auditing.Super Kubenetes.io` in the search bar. Click the result **Rule** and you can see the two CRD rules.

Below are examples of part of the rules.

## archiving-rule

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">archiving</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">archiving-rule</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;desc</span>: <span style="color:#ae81ff">all action not need to be audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;get</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;list</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;watch</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ignore-action</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;condition</span>: <span style="color:#ae81ff">Verb not in ${ignore-action}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">All audit event except get, list, watch event</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enable</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">archiving</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;priority</span>: <span style="color:#ae81ff">DEBUG</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">rule</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

## alerting-rule

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
                <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;desc</span>: <span style="color:#ae81ff">all operator need to be audit</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;create</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;delete</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;update</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;patch</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">action</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
                <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;condition</span>: <span style="color:#ae81ff">Verb in ${action}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">audit the change of resource</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enable</span>: <span style="color:#66d9ef">true</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ResourceChange</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;priority</span>: <span style="color:#ae81ff">INFO</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">rule</span> 
            </p>
          </code>
      </div>
    </pre>
</article>

  <table>
  <thead>
  <tr>
    <th>
      Attributes
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>name</code>
    </td>
    <td>
      The name of the rule.
    </td>
  </tr>
  <tr>
    <td>
      <code>type</code>
    </td>
    <td>
      The type of the rule; known values are <code>rule</code>, <code>macro</code>, <code>list</code>, and <code>alias</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>desc</code>
    </td>
    <td>
      The description of the rule.
    </td>
  </tr>
  <tr>
    <td>
      <code>condition</code>
    </td>
    <td>
      A filtering expression that is applied against auditing logs to check whether they match the rule.
    </td>
  </tr>
  <tr>
    <td>
      <code>macro</code>
    </td>
    <td>
      The conditions of the macro.
    </td>
  </tr>
  <tr>
    <td>
      <code>list</code>
    </td>
    <td>
      The value of list.
    </td>
  </tr>
  <tr>
    <td>
      <code>alias</code>
    </td>
    <td>
      The value of alias.
    </td>
  </tr>
  <tr>
    <td>
      <code>enable</code>
    </td>
    <td>
      If it is set to <code>false</code>, the rule will not be effective.
    </td>
  </tr>
  <tr>
    <td>
      <code>output</code>
    </td>
    <td>
      Specifies the message of alert.
    </td>
  </tr>
  <tr>
    <td>
      <code>priority</code>
    </td>
    <td>
      The priority of the rule.
    </td>
  </tr>
  </tbody>
  </table>

When an auditing log matches a rule in `archiving-rule` and the rule priority is no less than `archivingPriority`, it will be stored for further use. When an auditing log matches a rule in `alerting-rule`, if the priority of the rule is less than `alertingPriority`, it will be stored for further use; otherwise it will generate an alert which will be sent to the user.


## Rule Conditions

A `Condition` is a filtering expression that can use comparison operators (=, !=, <, <=, >, >=, contains, in, like, and regex) and can be combined using Boolean operators (and, or and not) and parentheses. Here are the supported filters.

  <table>
  <thead>
  <tr>
    <th>
      Filter
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>Workspace</code>
    </td>
    <td>
      The workspace where the audit event happens.
    </td>
  </tr>
  <tr>
    <td>
      <code>Devops</code>
    </td>
    <td>
      The DevOps project where the audit event happens.
    </td>
  </tr>
  <tr>
    <td>
      <code>Level</code>
    </td>
    <td>
      The level of auditing logs.
    </td>
  </tr>
  <tr>
    <td>
      <code>RequestURI</code>
    </td>
    <td>
      RequestURI is the request URI as sent by the client to a server.
    </td>
  </tr>
  <tr>
    <td>
      <code>Verb</code>
    </td>
    <td>
      The verb associated with the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>User.Username</code>
    </td>
    <td>
      The name that uniquely identifies this user among all active users.
    </td>
  </tr>
  <tr>
    <td>
      <code>User.Groups</code>
    </td>
    <td>
      The names of groups this user is a part of.
    </td>
  </tr>
  <tr>
    <td>
      <code>SourceIPs</code>
    </td>
    <td>
      The source IP from where the request originated and intermediate proxies.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Resource</code>
    </td>
    <td>
      The resource of the object associated with the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Namespace</code>
    </td>
    <td>
      The namespace of the object associated with the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Name</code>
    </td>
    <td>
      The name of the object associated with the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Subresource</code>
    </td>
    <td>
      The subresource of the object associated with the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>ResponseStatus.code</code>
    </td>
    <td>
      The suggested HTTP return code for the request.
    </td>
  </tr>
  <tr>
    <td>
      <code>ResponseStatus.Status</code>
    </td>
    <td>
      The status of the operation.
    </td>
  </tr>
  <tr>
    <td>
      <code>RequestReceivedTimestamp</code>
    </td>
    <td>
      The time the request reaches the apiserver.
    </td>
  </tr>
  <tr>
    <td>
      <code>StageTimestamp</code>
    </td>
    <td>
      The time the request reaches the current audit stage.
    </td>
  </tr>
  </tbody>
  </table>

For example, to match all logs in the namespace `test`:

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ObjectRef.Namespace = "test"
            </p>
        </code>
      </div>
  </pre>
</article>

To match all logs in the namespaces that start with `test`:

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ObjectRef.Namespace like "test*"
            </p>
        </code>
      </div>
  </pre>
</article>

To match all logs happening in the latest one hour:

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              RequestReceivedTimestamp >= "2020-06-12T09:23:28.359896Z" and RequestReceivedTimestamp <= "2020-06-12T10:23:28.359896Z"
            </p>
        </code>
      </div>
  </pre>
</article>

## Macro

A `macro` is a rule condition snippet that can be re-used inside rules and even other macros. Macros provide a way to name common patterns and factor out redundancies in rules. Here is an example of a macro.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">pod</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">macro</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">pod</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;macro</span>: <span style="color:#ae81ff">ObjectRef.Resource="pods"</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    A `macro` can be used in rules or other macros like ${pod} or ${alerting-rule.pod}. The difference between these two methods is that ${pod} can only be used in the CRD Rule `alerting-rule`, while ${alerting-rule.pod} can be used in all CRD Rules. This principle also applies to lists and alias.
  </div>
</div>

## List

A `list` is a collection of items that can be included in rules, macros, or other lists. Unlike rules and macros, lists cannot be parsed as filtering expressions. Here is an example of a list.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">action</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">all operator needs to be audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;create</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;delete</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;update</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;patch</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

## Alias

An `alias` is a short name of a filter field. It can be included in rules, macros, lists, and output strings. Here is an example of an alias.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">namespace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alias</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">the alias of the resource namespace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alias</span>: <span style="color:#ae81ff">ObjectRef.Namespace</span>
            </p>
        </code>
      </div>
  </pre>
</article>

## Output
The `Output` string is used to format the alerting message when an auditing log triggers an alert. The `Output` string can include lists and alias. Here is an example.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">Output</span>: <span style="color:#ae81ff">${user} ${verb} a HostNetwork Pod ${name} in ${namespace}.</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    The fields of `user`, `verb`, `namespace`, and `name` are all aliases.
  </div>
</div> 