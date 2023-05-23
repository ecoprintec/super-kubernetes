---
title: 'Super Kubenetes에서 Chaos Mesh 배포'
tag: 'Super Kubenetes, Kubernetes, Applications, Chaos Engineering, Chaos experiments, Chaos Mesh'
keywords: 'Chaos Mesh, Kubernetes, Helm, Super Kubenetes'
description: 'Learn how to deploy Chaos Mesh on Super Kubenetes and start running chaos experiments.'
linkTitle: 'Deploy Chaos Mesh on Super Kubenetes'
---

[Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh)는 쿠버네티스 환경에서 혼돈을 오케스트레이션하는 클라우드 네이티브 카오스 엔지니어링 플랫폼입니다. Chaos Mesh를 사용하면 다양한 유형의 결함을 파드, 네트워크, 파일 시스템, 심지어 커널에 주입하여 쿠버네티스에서 시스템의 복원력과 견고성을 테스트할 수 있습니다.

![Chaos Mesh architecture](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-architecture-v2.png)

## Super Kubenetes에서 앱 스토어 활성화

1. [Super Kubenetes 앱 스토어](../../../pluggable-components/app-store/)를 설치하고 활성화했는지 확인하십시오.

2. 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## Chaos Mesh로 Chaos 실험

### 1단계: Chaos Mesh 배포

1. Super Kubenetes에 `project-regular`로 로그인하고, **앱 스토어**에서 **chaos-mesh**를 검색한 후, 검색 결과를 클릭하여 앱으로 들어갑니다.

   ![Chaos Mesh app](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-app.png)

2. **앱 정보** 페이지에서, 우측 상단 모서리의 **설치**를 클릭합니다.

   ![Install Chaos Mesh](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/install-chaos-mesh.png)

3. **앱 설정** 페이지에서, 애플리케이션의 **Name,** **Location** (사용자의 네임스페이스로)과 **앱 버전**을 설정한 후, 우측 상단 모서리의 **다음**을 클릭합니다.

   ![Chaos Mesh basic information](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-basic-info.png)

4. 필요에 따라 `values.yaml` 파일을 설정하거나, **설치**를 클릭하여 기본 설정을 사용합니다.

   ![Chaos Mesh configurations](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-config.png)

5. 배포가 완료될 때까지 기다리십시오. 완료되면 Super Kubenetes에서 Chaos Mesh가 **Running**으로 표시됩니다.

   <!-- ![Chaos Mesh deployed](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-deployed.png) -->

### 2단계: Chaos 대시보드 방문

1. **리소스 상태** 페이지에서, `chaos 대시보드`의 **NodePort**를 복사합니다.

   <!-- ![Chaos Mesh NodePort](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-mesh-nodeport.png) -->

2. 브라우저에서 `${NodeIP}:${NODEPORT}`를 입력하여 chaos 대시보드에 접속합니다. [Manage User Permissions](https://chaos-mesh.org/docs/manage-user-permissions/)를 참고하여 chaos 대시보드에 토큰과 로그 정보를 생성하세요.

   ![Login to Chaos Dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/login-to-dashboard.png)

### 3단계: Chaos 실험 생성

Chaos 실험을 생성하기 전에, 실험 대상을 식별하고 배포하여 네트워크 대기 시간에서 애플리케이션이 어떻게 작동하는지 등을 테스트해야 합니다. 여기서는 테스트 대상 애플리케이션으로 데모 애플리케이션 `web-show`를 사용하며, 테스트 목표는 시스템 네트워크 지연 시간을 관찰하는 것입니다. `web-show` 명령을 사용하여 데모 애플리케이션 `web-show`를 배포할 수 있습니다.

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
        <code>
            <p>
                curl -sSL <a style="color:#ffffff; cursor:text;">https://mirrors.chaos-mesh.org/latest/web-show/deploy.sh</a> | bash
            </p>
        </code>
        </div>
    </pre>
</article>

> Note: 파드의 네트워크 지연 시간은 web-show 애플리케이션 패드에서 Kube 시스템 파드로 직접 관찰할 수 있습니다.

1. 웹 브라우저에서 \${NodeIP}:8081을 접속하여 **Web Show** 애플리케이션에 액세스합니다.

   ![Chaos Mesh web show app](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/web-show-app.png)

2. Chaos 대시보드에 로그인하여 Chaos 실험을 생성하세요. 네트워크 지연이 애플리케이션에 미치는 영향을 관찰하기 위해 **Target**을 "Network Attack"으로 설정하여 네트워크 지연 시나리오를 시뮬레이션했습니다.

   ![Chaos Dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-dashboard-networkchaos.png)

   실험의 **Scope**는 `app: web-show`으로 설정.

   ![Chaos Experiment scope](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/chaos-experiment-scope.png)

3. 제출을 눌러 Chaos 실험을 시작하세요.

   ![Submit Chaos Experiment](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/start-chaos-experiment.png)

이제 **Web Show**를 방문하여 실험 결과를 확인할 수 있습니다.

![Chaos Experiment result](/dist/assets/docs/v3.3/appstore/built-in-apps/deploy-chaos-mesh/experiment-result.png)
