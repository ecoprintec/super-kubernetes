---
title: "컨테이너 리밋 레인지(Limit Range)"
keywords: 'Kubernetes, Super Kubenetes, resource, quotas, limits, requests, limit ranges, containers'
description: 'Learn how to set default container limit ranges in a project.'
linkTitle: "Container Limit Ranges"
weight: 13400
---

컨테이너는 [프로젝트를 위한 리소스 쿼터](../../workspace-administration/project-quotas/)에서 설정한 만큼의 CPU와 메모리를 사용할 수 있습니다. 동시에, Super Kubenetes는 요청과 상한을 사용하여 컨테이너에 대한 리소스(CPU와 메모리 같은) 사용을 제어하며, 쿠버네티스에서는 [리밋 레인지(Limit Range)](https://kubernetes.io/docs/concepts/policy/limit-range/)로도 알려져 있습니다. 요청은 컨테이너가 명확히 보장되고 예약되어 있는 만큼의 필요한 리소스를 가져올 수 있는지 확인합니다. 반대로 제한은 컨테이너가 특정 값을 초과하는 리소스를 사용할 수 없도록 합니다.

디플로이먼트와 같은 워크로드를 생성할 때, 컨테이너를 위한 리소스 [쿠버네티스 요청 및 제한](https://Super Kubenetes.io/blogs/understand-requests-and-limits-in-kubernetes/)을 설정할 수 있습니다. 이러한 요청 및 제한 영역을 값으로 미리 채우려면 기본 제한 범위를 설정할 수 있습니다.

이러한 요청 및 제한 필드에 값을 미리 입력하려면 기본 리밋 레인지를 설정하면 됩니다.

## 사전 준비

사용 가능한 워크스페이스, 프로젝트 및 사용자(`project-admin`)를 준비합니다. 사용자는 프로젝트 수준에서 `관리자` 역할이 있어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 기본 리밋 레인지 설정

1. 콘솔에 `project-admin`으로 로그인하고 프로젝트로 이동하세요. **개요** 페이지에서 프로젝트가 새로 생성된 경우, 기본 리밋 레인지가 설정되지 않은 상태로 유지되는 것을 볼 수 있습니다. **기본 컨테이너 쿼터가 설정되지 않음** 옆에 있는 **쿼터 편집**을 클릭하여 리밋 레인지를 설정하세요.

2. 표시되는 대화 상자에서, Super Kubenetes가 기본적으로 어떠한 요청이나 제한도 설정하지 않는 것을 볼 수 있습니다. CPU 및 메모리 리소스를 제어하기 위한 요청 및 제한을 설정하려면, 슬라이더를 원하는 값으로 이동시키거나 직접 숫자를 입력하세요. 영역을 공란으로 두면 요청이나 제한을 설정하지 않는다는 의미입니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      제한은 요청보다 절대 낮을 수 없습니다.
    </div>
  </div>

3. **확인**을 클릭하여 리밋 레인지 설정을 완료하세요.

4. **프로젝트 설정**의 **기본 정보**로 이동하면 프로젝트의 컨테이너에 대한 기본 리밋 레인지를 볼 수 있습니다.

5. 기본 리밋 레인지를 변경하려면, **기본 정보** 페이지에서 **프로젝트 편집**을 클릭하고 **기본 컨테이너 쿼터 편집**을 선택하세요.

6. 대화 상자에서 직접 리밋 레인지를 변경하고 **확인**을 클릭하세요.

7. 워크로드를 생성할 때 컨테이너의 요청 및 상한은 값으로 미리 채워집니다.
   
<div className="notices note">
  <p>Note</p>
  <div>
    자세한 내용은 [컨테이너 이미지 설정](../../project-user-guide/application-workloads/container-image-settings/)의 **리소스 요청**을 참조하세요.
  </div>
</div>

## 참고 항목

[프로젝트 쿼터](../../workspace-administration/project-quotas/)
