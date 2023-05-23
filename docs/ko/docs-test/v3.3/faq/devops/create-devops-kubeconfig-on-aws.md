---
title: AWS에서 DevOps Kubeconfig 생성
keywords: 'Super Kubenetes, Kubernetes, DevOps, Kubeconfig, AWS'
description: 'How to create a DevOps kubeconfig on AWS'
linkTitle: 'Create a DevOps Kubeconfig on AWS'
Weight: 16820
---

Super Kubenetes가 설치된 AWS 클러스터에서 파이프라인을 실행할 때 프로젝트에 애플리케이션을 배포하는 데 문제가 있는 경우 DevOps kubeconfig 문제가 원인일 수 있습니다. 이 튜토리얼은 AWS에서 DevOps kubeconfig를 생성하는 방법을 시연합니다.

## 사전 준비

- Super Kubenetes가 설치된 AWS 클러스터가 있어야 합니다. AWS에 Super Kubenetes를 설치하는 방법에 대한 자세한 내용은 [AWS EKS에 Super Kubenetes 배포](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-eks/)를 참조하십시오.
- [Super Kubenetes DevOps 시스템](../../../pluggable-components/devops/)을 활성화해야 합니다.
- 애플리케이션 배포에 사용할 수 있는 프로젝트가 있어야 합니다. 이 튜토리얼에서는 `Super Kubenetes-sample-dev` 프로젝트를 예로 사용합니다.

## DevOps Kubeconfig 생성

### 1단계: 서비스 계정 만들기

1. AWS 클러스터에 `devops-deploy.yaml` 파일을 생성하고 다음 내용을 입력하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ServiceAccount</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io/v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Role</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-role</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span style="color:#f92672">rules</span>: 
                  <span>-</span><span style="color:#f92672">&nbsp;apiGroups</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;resources</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;verbs</span>: 
                  <span>&nbsp;&nbsp;-</span><span style="color:#e6db74">&nbsp;"*"</span> 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io/v1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">RoleBinding</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-rolebinding</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span> 
                  <span style="color:#f92672">roleRef</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;apiGroup</span>: <span style="color:#ae81ff">rbac.authorization.k8s.io</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kind</span>: <span style="color:#ae81ff">Role</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy-role</span> 
                  <span style="color:#f92672">subjects</span>: 
                  <span>-</span><span style="color:#f92672">&nbsp;kind</span>: <span style="color:#ae81ff">ServiceAccount</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">devops-deploy</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-sample-dev</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 다음 명령어를 실행하여 YAML 파일을 적용하세요.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
						kubectl apply -f devops-deploy.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

### 2단계: 서비스 계정 토큰 받기

1. 다음 명령을 실행하여 서비스 계정 토큰을 가져옵니다.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export TOKEN_NAME<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-sample-dev get sa devops-deploy -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> 
                  kubectl -n Super Kubenetes-sample-dev get secret <span style="color:#e6db74">"</span><span style="color:#e6db74">${</span>TOKEN_NAME<span style="color:#e6db74">}</span><span style="color:#e6db74">"</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 출력은 다음과 유사합니다:

   ![get-token](/dist/assets/docs/v3.3/faq/devops/create-devops-kubeconfig-on-aws/get-token.jpg)

1. AWS 클러스터의 Super Kubenetes 콘솔에 로그인하고 DevOps 프로젝트로 이동하세요. **DevOps 프로젝트 설정** 아래의 **자격 증명**으로 이동한 다음 **만들기**를 클릭하세요. 필요에 따라 이 kubeconfig의 이름을 지정할 수 있습니다.

1. **내용** 텍스트 상자에서 다음 내용에 주의하십시오:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  user:
                      client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FUR...
                      client-key-data: LS0tLS1CRUdJTiBQUk...
               </p>
            </code>
         </div>
      </pre>
   </article>

   이것을 2단계에서 검색한 토큰으로 교체해야 하며, 그 다음 **확인**을 클릭하여 kubeconfig를 생성합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  user:
                    token:eyJhbGciOiJSUzI1NiIsImtpZCI6Ikl3UkhCay13dHpPY2Z6LW9VTlZKQVR6dVdmb2FHallJQ2E4VzJULUNjUzAifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlc3BoZXJlLXNhbXBsZS1kZXYiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiZGV2b3BzLWRlcGxveS10b2tlbi1kcGY2ZiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJkZXZvcHMtZGVwbG95Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiMjM0ZTI4OTUtMjM3YS00M2Y5LTkwMTgtZDg4YjY2YTQyNzVmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVzcGhlcmUtc2FtcGxlLWRldjpkZXZvcHMtZGVwbG95In0.Ls6mkpgAU75zVw87FkcWx-MLEXGcJjlnb4rUVtT61Jmc_G6jkn4X45MK1V_HuLje3JZMFjL80QUl5ljHLiCUPQ7oE5AUZaUCdqZVdDYEhqeFuGQb_7Qlh8-UFVGGg8vrb0HeGiOlS0qq5hzwKc9C1OmsXHS92yhNwz9gIOujZRafnGKIsG6TL2hEVY2xI0vvmseDKmKg5o0TbeaTMVePHvECju9Qz3Z7TUYsr7HAOvCPtGutlPWLqGx5uOHenOdeLn71x5RoS98xguZoxYVollciPKCQwBlZ4zWK2hzsLSNNLb9cZpxtgUVyHE0AB0e86IHRngnnNrzpp1_pDxL5jw/
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         자신 고유의 토큰을 사용하세요.
      </div>
   </div>
