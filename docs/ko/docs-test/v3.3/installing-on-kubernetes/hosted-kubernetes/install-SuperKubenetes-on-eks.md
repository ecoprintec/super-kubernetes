---
title: AWS EKS에 Super Kubenetes 배포
keywords: 'Kubernetes, Super Kubenetes, EKS, Installation'
description: 'Learn how to deploy Super Kubenetes on Amazon Elastic Kubernetes Service.'
weight: 4220
---

이 가이드는 [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)에 Super Kubenetes를 배포하는 단계를 안내합니다. 또한 Amazon Web Services(AWS) CloudFormation 템플릿을 사용하여 최종 사용자가 AWS 클라우드에서 Amazon Elastic Kubernetes Service(Amazon EKS) 및 Super Kubenetes 환경을 자동으로 프로비저닝하는 데 도움이 되는 [AWS의 Super Kubenetes 빠른 시작]()<!-- (https://aws.amazon.com/quickstart/architecture/qingcloud-Super Kubenetes/) -->도 준비되어 있습니다.

## AWS CLI 설치

먼저 AWS CLI를 설치해야 합니다. 아래는 macOS 예시이며, 기타 운영체제는 [EKS 시작하기](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html)를 참고하십시오.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>pip3 install awscli --upgrade --user</code>
      </div>
  </pre>
</article>

`aws --version`으로 설치를 확인하십시오.
![check-aws-cli](/dist/assets/docs/v3.3/eks/check-aws-cli.png)

## EKS 클러스터 준비

1. AWS의 표준 쿠버네티스 클러스터는 Super Kubenetes 설치의 전제 조건입니다. 탐색 메뉴로 이동하여 아래 이미지를 참고하여 클러스터를 생성하세요.
   ![eks-클러스터-생성](/dist/assets/docs/v3.3/eks/eks-launch-icon.png)

2. **클러스터 구성** 페이지에서 다음 필드를 입력합니다.
   ![클러스터-페이지-구성](/dist/assets/docs/v3.3/eks/config-cluster-page.png)

   - Name : 클러스터의 고유한 이름입니다.

   - Kubernetes version : 클러스터에서 사용할 쿠버네티스의 버전입니다.

   - Cluster service role : [Amazon EKS 클러스터 IAM 역할 생성](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#role-create)으로 생성한 IAM 역할을 선택합니다.

   - Secrets encryption (선택 사항) : AWS Key Management Service(AWS KMS)를 사용하여 쿠버네티스 Secrets envelope 암호화를 활성화하려면 이 항목을 선택합니다. Secrets envelope 암호화를 활성화하시면 고객님께서 선택하신 고객마스터키(CMK)를 이용하여 쿠버네티스의 Secrets을 암호화 해드립니다. CMK는 대칭형이어야 하며 클러스터와 동일한 리전에서 생성되어야 합니다. CMK가 다른 계정에서 생성된 경우 사용자는 CMK에 액세스할 수 있어야 합니다. 자세한 내용은 *AWS Key Management Service 개발자 안내서*의 [다른 계정의 사용자가 CMK를 사용하도록 허용](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html)을 참고하십시오.

   - 쿠버네티스는 AWS KMS CMK로 Secrets 암호화를 사용하려면 쿠버네티스 버전 1.13 이상이 필요합니다. 키가 나열되지 않으면 먼저 키를 만들어야 합니다. 자세한 내용은 [키 생성](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)을 참고하십시오.

   - Tags (선택 사항) : 클러스터에 태그를 추가합니다. 자세한 내용은 [Amazon EKS 리소스에 태그 지정](https://docs.aws.amazon.com/eks/latest/userguide/eks-using-tags.html)을 참고하십시오.

3. **다음**을 선택합니다. **네트워킹 지정** 페이지에서 다음 필드의 값을 선택합니다.
   ![네트워크](/dist/assets/docs/v3.3/eks/networking.png)

   - VPC : 이전에 [Amazon EKS 클러스터 VPC 생성](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#vpc-create)에서 이전에 생성한 VPC입니다. 드롭다운 목록에서 VPC 이름을 찾을 수 있습니다.

   - Subnets : 기본적으로 이전 필드에 지정된 VPC에서 사용 가능한 서브넷이 미리 선택되어 있습니다. 작업자 노드 또는 로드 밸런서와 같은 클러스터 리소스를 호스팅하지 않을 서브넷을 선택하십시오.

   - Security groups : [Amazon EKS 클러스터 VPC 생성](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#vpc-create)으로 생성한 AWS CloudFormation 출력의 Security Groups 값입니다. 이 보안 그룹의 드롭다운 이름에는 ControlPlaneSecurityGroup이 있습니다.

   - **클러스터 엔드포인트 액세스**에 대해 다음 옵션 중 하나를 선택합니다.
     ![앤드포인트](/dist/assets/docs/v3.3/eks/endpoints.png)

     - Public : 클러스터의 쿠버네티스 API 서버 엔드포인트에 대한 공개 접근만 가능하게 합니다. 쿠버네티스 클러스터의 VPC 외부에서 발생하는 API 요청은 퍼블릭 엔드포인트를 사용합니다. 기본적으로 모든 소스 IP 주소에서 액세스가 허용됩니다. 예를 들어 **고급 설정**을 선택한 다음 **소스 추가**를 선택하여 192.168.0.0/16과 같은 하나 이상의 CIDR 범위에 대한 액세스를 선택적으로 제한할 수 있습니다.

     - Private : 클러스터의 쿠버네티스 API 서버 엔드포인트에 대한 비공개 접근만 허용합니다. 쿠버네티스 클러스터의 VPC 내에서 발생하는 API 요청은 프라이빗 VPC 엔드포인트를 사용합니다.

      <div className="notices note">
         <p>노트</p>
         <div>
            아웃바운드 인터넷 액세스 없이 VPC를 생성한 경우 프라이빗 액세스를 활성화해야 합니다.
         </div>
      </div>
      
      - 공개 및 비공개 : 공개 및 비공개 액세스를 활성화합니다.

4. **다음**을 선택합니다. **로깅 구성** 페이지에서 선택적으로 활성화하려는 로그 유형을 선택할 수 있습니다. 기본적으로 각 로그 유형은 **사용 안 함**입니다. 자세한 내용은 [Amazon EKS control plane logging](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)을 참고하십시오.
   ![logging](/dist/assets/docs/v3.3/eks/logging.png)

5. **다음**을 선택합니다. **페이지 검토 및 생성**에서 이전 페이지에서 입력하거나 선택한 정보를 검토합니다. 선택 사항을 변경해야 하는 경우 **편집**을 선택합니다. 설정이 만족스러우면 **생성**를 선택합니다. **상태** 필드는 클러스터 프로비저닝 프로세스가 완료될 때까지 **CREATING**을 표시합니다.
   ![revies](/dist/assets/docs/v3.3/eks/review.png)

   - 이전 옵션에 대한 자세한 내용은 [클러스터 엔드포인트 액세스 수정](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html#modify-endpoint-access)을 참고하십시오.
     클러스터 프로비저닝이 완료되면(보통 10분에서 15분 사이) API 서버 끝점 및 인증 기관 값을 저장합니다. 이는 kubectl 구성에서 사용됩니다.
     ![creating](/dist/assets/docs/v3.3/eks/creating.png)

6. **노드 그룹**을 만들고 이 클러스터에 3개의 노드를 정의합니다.
   ![노드-그룹](/dist/assets/docs/v3.3/eks/node-group.png)

7. 노드 그룹을 구성합니다.
   ![노드-그룹-구성](/dist/assets/docs/v3.3/eks/config-node-grop.png)

   <div className="notices note">
      <p>노트</p>
      <div>
         - 쿠버네티스에 Super Kubenetes 3.3.0을 설치하기 위해서는 귀하의 쿠버네티스 버전이 v1.19.x, v1.20.x, v1.21.x, v1.22.x, v1.23.x(실험지원) 이어야 합니다.
         - 이 예에는 3개의 노드가 포함되어 있습니다. 특히 프로덕션 환경에서 필요에 따라 노드를 더 추가할 수 있습니다.
         - 머신 유형 t3.medium(2 vCPU, 4GB 메모리)은 최소 설치용입니다. 연결 가능한 구성요소를 활성화하거나 클러스터를 프로덕션에 사용하려면 더 많은 리소스가 있는 머신 유형을 선택하세요.
         - 다른 설정의 경우 필요에 따라 변경하거나 기본값을 사용할 수도 있습니다.
      </div>
   </div>

8. EKS 클러스터가 준비되면 kubectl을 사용하여 클러스터에 연결할 수 있습니다.

## kubectl 구성

클러스터 API 서버와 통신하기 위해 kubectl 명령줄 유틸리티를 사용합니다. 먼저 지금 생성된 EKS 클러스터의 kubeconfig를 가져옵니다.

1. AWS CLI 자격 증명을 구성합니다.

   <article className="highlight">
   <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ aws configure
                  AWS Access Key ID <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: AKIAIOSFODNN7EXAMPLE
                  AWS Secret Access Key <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
                  Default region name <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: region-code
                  Default output format <span style="color:#f92672">[</span>None<span style="color:#f92672">]</span>: json</p>
            </code>
         </div>
   </pre>
   </article>

2. AWS CLI를 사용하여 kubeconfig 파일을 생성합니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
         <code>aws eks --region us-west-2 update-kubeconfig --name cluster_name</code>
         </div>
      </pre>
   </article>

   - 기본적으로 결과 구성 파일은 홈 디렉토리의 기본 kubeconfig 경로(`.kube/config`)에 생성되거나 해당 위치의 기존 kubeconfig와 병합됩니다. `--kubeconfig` 옵션으로 다른 경로를 지정할 수 있습니다.

   - kubectl 명령을 실행할 때 인증에 사용할 `--role-arn` 옵션을 사용하여 IAM 역할 ARN을 지정할 수 있습니다. 그렇지 않으면 기본 AWS CLI 또는 SDK 자격 증명 체인의 IAM 엔터티가 사용됩니다. `aws sts get-caller-identity` 명령을 실행하여 기본 AWS CLI 또는 SDK 자격 증명을 볼 수 있습니다.

   자세한 내용은 `aws eks update-kubeconfig help` 명령이 포함된 도움말 페이지를 참고하거나 *AWS CLI Command Reference*의 [update-kubeconfig](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html)를 참고하십시오.

3. 구성을 테스트하십시오.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>kubectl get svc</code>
            </div>
      </pre>
   </article>

## EKS에 Super Kubenetes 설치

- kubectl을 사용하여 Super Kubenetes를 설치합니다. 다음 명령은 기본 최소 설치에만 해당됩니다.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p>
            </code>
         </div>
      </pre>

   </article>

- 설치 로그를 검사합니다.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
               <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
            </div>
      </pre>
   </article>

- 설치가 완료되면 다음 메시지를 볼 수 있습니다.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e">###########################################################</span> 
                  <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
                  <span style="color:#75715e">###########################################################</span> 
                  <span style="color:#ffffff">Account: admin</span> 
                  <span style="color:#ffffff">Password: P@88w0rd</span> 
                  <span style="color:#ffffff">NOTES：</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
                  <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
                  <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
                  <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                  <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
               </p>
            </code>
            </div>
      </pre>
   </article>

## Super Kubenetes 콘솔에 액세스

이제 Super Kubenetes가 설치되었으므로 아래 단계에 따라 Super Kubenetes의 웹 콘솔에 액세스할 수 있습니다.

- 다음 명령어를 통해 Super Kubenetes 콘솔의 서비스를 확인합니다.

   <article className="highlight">
      <pre>
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
            <code>kubectl get svc -n Super Kubenetes-system</code>
            </div>
      </pre>
   </article>

- `kubectl edit ks-console`을 실행하여 **ks-console** 서비스 구성을 편집하고 `type`을 `NodePort`에서 `LoadBalancer`로 변경합니다. 완료되면 파일을 저장합니다.
  ![loadbalancer](/dist/assets/docs/v3.3/eks/loadbalancer.png)

- `kubectl get svc -n Super Kubenetes-system`을 실행하고 외부 IP를 가져옵니다.
  ![external-ip](/dist/assets/docs/v3.3/eks/external-ip.png)

- EKS에서 생성된 외부 IP를 사용하여 Super Kubenetes의 웹 콘솔에 액세스합니다.

- 기본 계정과 비밀번호(`admin/P@88w0rd`)로 콘솔에 로그인합니다. 클러스터 개요 페이지에서 대시보드를 볼 수 있습니다.

## 플러그식 구성 요소 활성화 (선택 사항)

위의 예는 기본 최소 설치 프로세스를 보여줍니다. Super Kubenetes에서 다른 구성 요소를 활성화하려면 [플러그식 구성 요소 활성화](../../../pluggable-components/)에서 자세한 내용을 참고하십시오.

## 참조

[AWS Management 콘솔 시작하기](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html)
