---
title: "Super Kubenetes와 Kubernetes uninstall"
keywords: 'Kubernetes, Super Kubenetes, uninstalling, remove-cluster'
description: 'Remove Super Kubenetes and Kubernetes from your machines.'
linkTitle: "Uninstall Super Kubenetes and Kubernetes"
weight: 3700
---


Super Kubenetes 및 Kubernetes를 제거하면 시스템에서 완전히 제거됩니다. 이 작업은 되돌릴 수 없으며 백업이 없습니다. 주의해 주세요.

클러스터를 삭제하려면 다음 명령을 수행합니다.

- Super Kubenetes를 ([all-in-one](../../quick-start/all-in-one-on-linux/))으로 설치한 경우:

    <article className="highlight">
       <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
               <code>./kk delete cluster</code></div></pre></article>
    
- Super Kubenetes를 ([고급 모드](../introduction/multioverview/#step-3-create-a-cluster))로 설치한 경우:

    <article className="highlight">
       <pre>
           <div className="copy-code-button" title="Copy Code"></div>
           <div className="code-over-div">
               <code>./kk delete cluster <span style="color:#f92672">[</span>-f config-sample.yaml<span style="color:#f92672">]</span></code></div></pre></article>

