---
title: "S2I 워크플로 및 논리"
keywords: 'Super Kubenetes, Kubernetes, Docker, S2I, Source-to-Image'
description: 'Understand how S2I works and why it works in the expected way.'
linkTitle: "S2I Workflow and Logic"
weight: 10630
---

S2I(Source-to-Image)는 소스 코드에서 이미지를 빌드하기 위한 자동화 도구입니다. S2I는 컴파일을 위해 소스 코드를 이미지 빌더에 주입한 다음 컴파일된 코드를 Docker 이미지로 자동 패키징합니다.

Super Kubenetes에서 S2I를 사용하는 방법에 대한 자세한 내용은 [Source to Image: Dockerfile 없이 앱 게시](../source-to-image/)을 참조하십시오. 그 외에도, 더 상세한 것은 코드 저장소 [S2IOoperator](https://github.com/Super Kubenetes/s2ioperator#source-to-image-operator)와 [S2IRun](https://github.com/Super Kubenetes/s2irun#)을 참조할 수 있습니다. 

## S2I 워크플로 및 로직

### 이미지 빌더

Python 및 Ruby와 같은 해석 언어의 경우 애플리케이션의 빌드 시간과 런타임 환경은 일반적으로 동일합니다. 예를 들어, Ruby 기반 이미지 빌더에는 일반적으로 Bundler, Rake, Apache, GCC, 그리고 런타임 환경을 설정하는 데 필요한 기타 패키지가 포함되어 있습니다. 
다음 다이어그램은 빌드 워크플로에 대해 설명합니다.

![s2i-builder](/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-intro/s2i-builder.png)

### S2I 작동 방식

S2I는 다음 단계를 수행합니다.

1. 지정된 디렉토리에 삽입된 애플리케이션 소스 코드를 사용하여 이미지 빌더에서 컨테이너를 시작하세요.
2. 종속개체를 설치하고 소스 코드를 작업 디렉토리로 이동하여 해당 소스 코드를 바로 실행할 수 있는 애플리케이션으로 빌드하기 위해, 이미지 빌더에서 `assemble` 스크립트를 실행하세요. 
3. 이미지 빌더에서 제공하는 `run` 스크립트를 컨테이너 시작을 위한 이미지 엔트리포인트로 설정한 다음, 새 이미지를 사용자 요구에 맞도록 애플리케이션 이미지로 커밋하세요.

아래 S2I 워크플로 차트를 참조하세요.

![s2i-flow](/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-intro/s2i-flow.png)

### 런타임 이미지

Go, C, C++ 또는 Java와 같은 컴파일된 언어의 경우, 컴파일에 필요한 종속개체가 결과 이미지의 크기를 증가시킵니다. 더 슬림한 이미지를 빌드하기 위해, S2I는 이미지에서 불필요한 파일을 제거하는 단계별 빌드 워크플로를 사용합니다. Jar 파일이나 바이너리 파일과 같은 실행 파일인 아티팩트는 이미지 빌더에서 빌드가 완료될 때 추출되고, 그리고 나서 실행을 위해 런타임 이미지에 삽입됩니다.

아래 빌딩 워크플로를 참조하세요.

![s2i-runtime-build](/dist/assets/docs/v3.3/project-user-guide/image-builder/s2i-intro/s2i-runtime-build.png)
