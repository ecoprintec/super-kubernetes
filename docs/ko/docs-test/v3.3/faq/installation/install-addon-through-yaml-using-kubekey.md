---
title: "KubeKey를 사용하여 YAML을 통해 애드온 설치"
keywords: "Installer, KubeKey, Super Kubenetes, Kubernetes, add-ons"
description: "Understand why the installation may fail when you use KubeKey to install an add-on through YAML."
linkTitle: "Install an Add-on through YAML Using KubeKey"
Weight: 16400
---

KubeKey를 사용하여 애드온을 설치할 때, 설정 파일 (기본적으로 `config-sample.yaml`)의 `애드온` 영역 아래에 추가 정보 (차트 또는 YAML)를 넣어야 합니다. 애드온 설정이 YAML 파일로 제공되면, 경우에 따라 설치 중에 다음과 유사한 오류 메시지가 표시될 수 있습니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Error from server: failed to create typed patch object: xxx: element 0: associative list with keys has an element that omits key field <span style="color:#e6db74">"protocol"</span>
            </p>
         </code>
      </div>
   </pre>
</article>

이는 [Kubernetes 자체의 알려진 문제](https://github.com/kubernetes-sigs/structured-merge-diff/issues/130)로, `--server-side` 플래그가 원인입니다. 이 문제를 해결하려면 설정 파일에 애드온을 추가하지 마십시오. 대신 KuberixEnterpris를 배포한 후에 YAML 파일을 적용하세요. 예를 들면 다음과 같습니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl apply -f xxx.yaml <span style="color:#75715e"><span>#</span><span> Use your own YAML file.</span></span>
            </p>
         </code>
      </div>
   </pre>
</article>