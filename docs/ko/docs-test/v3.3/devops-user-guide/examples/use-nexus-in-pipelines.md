---
title: "파이프라인에서 Nexus 사용"
keywords: 'Super Kubenetes, Kubernetes, Pipeline, Nexus, Jenkins'
description: 'Learn how to use Nexus in pipelines on Super Kubenetes.'
linkTitle: "Use Nexus in Pipelines"
weight: 11450
---

[Nexus](https://www.sonatype.com/products/repository-oss)는 아티팩트를 저장, 정리, 배포하는 저장소 관리자입니다. Nexus를 사용하면 개발자는 개발 프로세스에 필요한 아티팩트를 더 잘 제어할 수 있습니다.

이 튜토리얼은 Super Kubenetes의 파이프라인에서 Nexus를 사용하는 방법을 시연합니다.

## 사전 준비

- [Super Kubenetes DevOps 시스템 활성화](../../../pluggable-components/devops/)가 필요합니다.
- [Nexus 인스턴스 준비](https://help.sonatype.com/repomanager3/installation)가 필요합니다.
- [GitHub](https://github.com/) 계정이 있어야 합니다.
- 워크스페이스, DevOps 프로젝트(예: `demo-devops`) 및 사용자(예: `project-regular`)를 생성해야 합니다. 이 계정은 `operator` 역할로 DevOps 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 실습실

### 1단계: Nexus에서 저장소 URL 가져오기

1. Nexus 콘솔에 `admin`으로 로그인하고 상단 내비게이션 바에서 <img src="/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/gear.png" height="18px" alt="icon" />를 클릭하세요.

2. **저장소** 페이지로 이동하면 Nexus에서 3가지 유형의 저장소를 제공하는 것을 볼 수 있습니다.

   - `proxy`: 캐시로 Nexus에 리소스를 다운로드하고 저장하기 위한 원격 저장소의 프록시.
   - `hosted`: Nexus에 아티팩트를 저장하는 저장소.
   - `group`: 설정된 Nexus 저장소의 그룹.

3. 저장소를 클릭하여 세부 정보를 볼 수 있습니다. 예를 들어 **maven-public**을 클릭하여 세부 정보 페이지로 이동하면 **URL**을 볼 수 있습니다.

### 2단계: GitHub 저장소에서 `pom.xml` 수정

1. GitHub에 로그인하세요. [예제 저장소](https://github.com/devops-ws/learn-pipeline-java)를 자신의 GitHub 계정으로 분기합니다.

2. **learn-pipeline-java**의 GitHub 저장소에서 루트 디렉터리의 `pom.xml` 파일을 클릭하세요.

3. 파일에서 `<distributionManagement>`의 코드 세그먼트를 수정하기 위해 <img src="/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/github-edit-icon.png" height="18px" alt="icon"  />를 클릭하세요. `<id>`를 설정하고 자신의 Nexus 저장소 URL을 사용하세요.

   ![modify-pom](/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/modify-pom.png)

4. 완료되면 페이지 하단의 **변경 사항 제출**을 클릭하세요.

### 3단계: ConfigMap 수정

1. Super Kubenetes 웹 콘솔에 `admin`으로 로그인하고 좌측 상단의 **플랫폼**을 클릭한 다음 **클러스터 관리**를 선택합니다.

2. **설정**에서 **ConfigMaps**를 선택합니다. **ConfigMaps** 페이지의 드롭다운 목록에서 `Super Kubenetes-devops-worker`를 선택하고 `ks-devops-agent`를 클릭하세요.

3. 세부정보 페이지의 **더보기** 드롭다운 메뉴에서 **YAML 편집**을 클릭하세요.

4. 표시된 대화 상자에서 아래로 스크롤하여 `<servers>`의 코드 세그먼트를 찾아 다음 코드를 입력하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                <span style="color:#ae81ff">&lt;servers&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&lt;server&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;id&gt;nexus&lt;/id&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;username&gt;admin&lt;/username&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;password&gt;admin&lt;/password&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;&lt;/server&gt;</span> 
                <span style="color:#ae81ff">&lt;/servers&gt;</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![enter-server-code](/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/enter-server-code.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         `<id>`는 2단계에서 Nexus에 대해 설정한 고유 식별자입니다. `<username>`은 Nexus 사용자 이름입니다. `<password>`는 Nexus 비밀번호입니다. 또한 Nexus에서 `NuGet API 키`를 설정하고, 더 나은 보안을 위해 여기에서 사용할 수 있습니다.
      </div>
   </div>

5. 계속해서 `<mirrors>`의 코드 세그먼트를 찾아 다음 코드를 입력하세요.

    <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#ae81ff">&lt;mirrors&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&lt;mirror&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;id&gt;nexus&lt;/id&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;name&gt;maven-public&lt;/name&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;url&gt;<span><a style="color:#ae81ff; cursor:text;">http://135.68.37.85:8081/repository/maven-public/</a></span>&lt;/url&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&lt;mirrorOf&gt;*&lt;/mirrorOf&gt;</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&lt;/mirror&gt;</span> 
                  <span style="color:#ae81ff">&lt;/mirrors&gt;</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![enter-mirror-code](/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/enter-mirror-code.png)

   <div className="notices note">
      <p>Note</p>
      <div>
         `<id>`는 2단계에서 Nexus에 대해 설정한 고유 식별자입니다. `<name>`은 Nexus 저장소 이름입니다. `<url>`은 Nexus 저장소의 URL입니다. `<mirrorOf>`는 미러링할 Maven 저장소입니다. 이 튜토리얼에서는 `*`를 입력하여 모든 Maven 저장소를 미러링합니다. 자세한 내용은 [Repositories용 미러 사용](https://maven.apache.org/guides/mini/guide-mirror-settings.html)을 참조하십시오.
   </div>

6. 완료되면 **확인**을 클릭하세요.

### 4단계: 파이프라인 생성

1. Super Kubenetes 웹 콘솔에서 로그아웃하고 `project-regular`로 다시 로그인합니다. DevOps 프로젝트로 이동하고 **파이프라인** 페이지에서 **생성**을 클릭하세요.

2. **기본 정보** 탭에서 파이프라인 이름(예: `nexus-pipeline`)을 설정하고 **다음**을 클릭하세요.

3. **고급 설정** 탭에서 **생성**을 클릭하여 기본 설정을 사용하세요.

4. 파이프라인 이름을 클릭하여 세부 정보 페이지로 이동하고 **Jenkinsfile 편집**을 클릭하세요.

5. 표시된 대화 상자에서 다음과 같이 Jenkinsfile을 입력하세요. 완료되면 **확인**을 클릭하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  pipeline <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;agent <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label <span style="color:#e6db74">'maven'</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;stages <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span> <span style="color:#e6db74">'clone'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;git <span style="color:#e6db74"><a style="color:#e6db74; cursor:text;">'https://github.com/Felixnoo/learn-pipeline-java.git'</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span> <span style="color:#e6db74">'build'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span> <span style="color:#e6db74">'maven'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn clean package'</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span> <span style="color:#e6db74">'deploy to Nexus'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container <span style="color:#f92672">(</span> <span style="color:#e6db74">'maven'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sh <span style="color:#e6db74">'mvn deploy -DaltDeploymentRepository=nexus::default::<a style="color:#e6db74; cursor:text;">http://135.68.37.85:8081/repository/maven-snapshots/'</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stage <span style="color:#f92672">(</span> <span style="color:#e6db74">'upload'</span> <span style="color:#f92672">)</span>  <span style="color:#f92672">&nbsp;{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps <span style="color:#f92672">{</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;archiveArtifacts artifacts: <span style="color:#e6db74">'target/*.jar'</span> <span style="color:#f92672">,&nbsp;</span>followSymlinks: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;}</span> 
                  <span style="color:#f92672">}</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

   <div className="notices note">
      <p>Note</p>
      <div>
         GitHub 저장소 주소를 자신의 것으로 바꿔야 합니다. `nexus에 배포` 단계의 명령에서 `nexus`는 ConfigMap의 `id`에서 설정한 이름이고 'http://135.68.37.85:8081/repository/maven-snapshots/'는 Nexus 저장소의 URL입니다.
      </div>
   </div>


### 5단계: 파이프라인 실행 및 결과 확인

1. 그래픽 편집 패널에 표시된 모든 단계와 단계를 볼 수 있습니다. **실행**을 클릭하여 파이프라인을 실행합니다.

2. 잠시 후 **성공**으로 표시된 파이프라인 상태를 볼 수 있습니다. 세부정보를 보려면 **성공** 기록을 클릭하세요.

3. **로그 보기**를 클릭하면 자세한 로그를 볼 수 있습니다.

4. Nexus에 로그인하고 **찾아보기**를 클릭하세요. **maven-public**을 클릭하면 모든 종속항목이 다운로드된 것을 볼 수 있습니다.

   ![maven-public](/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/maven-public.png)

5. **찾아보기** 페이지로 돌아가 **maven-snapshots**를 클릭하세요. JAR 패키지가 저장소에 업로드된 것을 볼 수 있습니다.

   ![maven-snapshots](/dist/assets/docs/v3.3/devops-user-guide/examples/use-nexus-in-pipeline/maven-snapshots.png)



