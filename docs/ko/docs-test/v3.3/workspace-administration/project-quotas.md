---
title: "프로젝트 쿼터"
keywords: 'Super Kubenetes, Kubernetes, projects, quotas, resources, requests, limits'
description: 'Set requests and limits to control resource usage in a project.'
linkTitle: "Project Quotas"
weight: 9600
---

Super Kubenetes는 [쿠버네티스 요청 및 상한](https://Super Kubenetes.io/blogs/understand-requests-and-limits-in-kubernetes/)을 사용하여 프로젝트의 리소스(예: CPU 및 메모리) 사용량을 제어하며, 쿠버네티스에서는 [리소스 쿼터](https://kubernetes.io/docs/concepts/policy/resource-quotas/)로도 알려져 있습니다. 요청은 프로젝트가 구체적으로 보장되고 예약되기 때문에 필요한 리소스를 확실히 얻을 수 있도록 합니다. 반대로 상한은 프로젝트가 특정 값 이상의 리소스를 사용할 수 없도록 합니다.

CPU와 메모리 외에도 프로젝트의 파드, [디플로이먼트](../../project-user-guide/application-workloads/deployments/), [잡](../../project-user-guide/application-workloads/jobs/), [서비스](../../project-user-guide/application-workloads/services/) 및 [ConfigMaps](../. ./project-user-guide/configuration/configmaps/)과 같은, 다른 오브젝트에 대한 리소스 쿼터도 별도로 설정할 수 있습니다.

이 가이드에서는 프로젝트의 쿼터을 설정하는 방법을 시연합니다.

## 사전 준비

사용 가능한 워크스페이스, 프로젝트 및 사용자(`ws-admin`)가 있어야 합니다. 사용자는 워크스페이스 수준에서 `admin` 역할을 가지고 있어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

<div className="notices note">
  <p>Note</p>
  <div>
     사용자 `project-admin`(프로젝트 수준에서 `admin` 역할의 사용자)을 사용하는 경우에도 새 프로젝트에 대해서 프로젝트 쿼터를 설정할 수 있습니다. 하지만 `project-admin`은 프로젝트 쿼터를 한번 설정하고 나면 이를 변경할 수 없습니다. 일반적으로 프로젝트에 대한 상한 및 요청을 설정하는 것은 `ws-admin`의 책임입니다. `project-admin`은 프로젝트의 컨테이너에 대한 [리밋 레인지 설정](../../project-administration/container-limit-ranges/)을 담당합니다.
  </div>
</div>

## 프로젝트 쿼터 설정

1. `ws-admin`으로 콘솔에 로그인하고 프로젝트로 이동하세요. **개요** 페이지에서, 프로젝트가 새로 생성된 경우 프로젝트 쿼터가 계속 설정되지 않은 상태임을 볼 수 있습니다. 
**쿼터 편집**를 클릭하여 쿼터를 설정하세요.

2. 표시된 대화 상자에서 기본적으로 Super Kubenetes가 프로젝트에 대한 요청이나 상한을 설정하지 않은 것을 확인할 수 있습니다. CPU 및 메모리 리소스를 제어하기 위한 상한을 설정하려면 슬라이더를 사용하여 원하는 값으로 이동시키거나 직접 숫자를 입력하세요. 영역을 비워 두면 요청이나 상한을 설정하지 않는다는 의미입니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      상한은 요청보다 절대 낮을 수 없습니다.
    </div>
  </div>

3. 다른 리소스에 대한 쿼터를 설정하려면, **프로젝트 리소스 쿼터** 아래 **추가**를 클릭한 후 리소스를 선택하거나 리소스 이름을 입력하고 쿼터를 설정하세요.

4. **확인**을 클릭하여 쿼터 설정을 마칩니다.

5. **프로젝트 설정**의 **기본 정보**로 이동하면 프로젝트에 대한 모든 리소스 쿼터를 볼 수 있습니다.

6. 프로젝트 쿼터를 변경하려면 **기본 정보** 페이지에서 **프로젝트 편집**을 클릭하고 **프로젝트 쿼터 편집**을 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      [멀티 클러스터 프로젝트](../../project-administration/project-and-multicluster-project/#multi-cluster-projects)의 경우, **프로젝트 쿼터 편집** 옵션이 **프로젝트 관리** 드롭다운 메뉴에 표시되지 않습니다. 멀티 클러스터 프로젝트에 대한 쿼터를 설정하려면 **프로젝트 설정** 아래의 **프로젝트 쿼터**로 이동하여 **쿼터 편집**를 클릭하세요. 멀티 클러스터 프로젝트는 여러 클러스터에 걸쳐 실행되므로, 여러 클러스터에 리소스 쿼터를 개별적으로 설정할 수 있습니다.
    </div>
  </div>

7. 표시되는 대화 상자에서 프로젝트 쿼터를 변경하고 **확인**을 클릭하세요.

## 참고 항목

[컨테이너 리밋 레인지](../../project-administration/container-limit-ranges/)
