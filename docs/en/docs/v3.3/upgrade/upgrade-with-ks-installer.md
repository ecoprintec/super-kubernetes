---
title: "Upgrade with ks-installer"
keywords: "Kubernetes, upgrade, Super Kubenetes, v3.3.0"
description: "Use ks-installer to upgrade Super Kubenetes."
linkTitle: "Upgrade with ks-installer"
weight: 7300
---

ks-installer is recommended for users whose Kubernetes clusters were not set up by [KubeKey](../../installing-on-linux/introduction/kubekey/), but hosted by cloud vendors or created by themselves. This tutorial is for **upgrading Super Kubenetes only**. Cluster operators are responsible for upgrading Kubernetes beforehand.

## Prerequisites

- You need to have a Super Kubenetes cluster running v3.2.x. If your Super Kubenetes version is v3.1.x or earlier, upgrade to v3.2.x first.
- Read [Release Notes for 3.3.0](../../../v3.3/release/release-v330/) carefully.
- Back up any important component beforehand.
- Supported Kubernetes versions of Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).

## Apply ks-installer

Run the following command to upgrade your cluster.


<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
        <code>
            <p>
               kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>  --force
            </p>
        </code>
        </div>
    </pre>
</article>

## Enable Pluggable Components

You can [enable new pluggable components](../../pluggable-components/overview/) of Super Kubenetes 3.3.0 after the upgrade to explore more features of the container platform.

