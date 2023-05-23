---
title: 'Kafka를 수신기로 추가'
keywords: 'Kubernetes, log, kafka, pod, container, fluentbit, output'
description: 'Learn how to add Kafka to receive container logs, resource events, or audit logs.'
linkTitle: 'Add Kafka as a Receiver'
weight: 8623
---

KubernetesEnterprise에서 Elasticsearch, Kafka 및 Fluentd를 로그 수신기로 사용할 수 있습니다. 이 튜토리얼에서는 다음을 다음을 시연합니다:

- [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)를 배포한 다음 `Kafka` 및 `KafkaTopic` CRD를 생성하여 Kafka 클러스터 및 Kafka 주제를 생성합니다.
- Fluent Bit에서 보낸 로그를 수신하려면 Kafka를 로그 수신기로 추가합니다.
- [Kafkacat](https://github.com/edenhill/kafkacat)을 사용하여 Kafka 클러스터가 로그를 수신하는지 확인합니다.

## 사전 준비

- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.
- 로그 수신기를 추가하기 전에 `logging`, `events` 또는 `auditing` 컴포넌트를 활성화해야 합니다. 자세한 내용은 [플러그 구성 요소 활성화](../../../../pluggable-components/overview)를 참고하세요. 이 튜토리얼에서는 `logging`을 예로 사용합니다.

## 1단계: Kafka 클러스터 및 Kafka 주제 생성

[strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)를 사용하여 Kafka 클러스터 및 Kafka 주제를 생성할 수 있습니다. 이미 Kafka 클러스터가 있는 경우 다음 단계부터 시작할 수 있습니다.

1. `default` 네임스페이스에 [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)를 설치하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm repo add strimzi <a style="color:#ffffff; cursor:text;">https://strimzi.io/charts/</a>
               </p>
            </code>
         </div>
      </pre>
   </article>
   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm install --name kafka-operator -n default strimzi/strimzi-kafka-operator
               </p>
            </code>
         </div>
      </pre>
   </article>

2) 다음 명령을 실행하여 `default` 네임스페이스에 Kafka 클러스터와 Kafka 주제를 생성하세요. 이 명령은 데모용으로 `emptyDir`인 스토리지 유형이 `임시`인 Kafka 및 Zookeeper 클러스터를 생성합니다. 운영 환경의 다른 스토리지 유형은 [kafka-persistent](https://github.com/strimzi/strimzi-kafka-operator/blob/0.19.0/examples/kafka/kafka-persistent.yaml)를 참고하세요.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#ae81ff">cat &lt;&lt;EOF | kubectl apply -f -</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kafka.strimzi.io/v1beta1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Kafka</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">my-cluster</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
                  <span style="color:#f92672">spec</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;kafka</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">2.5.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;listeners</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plain</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tls</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;config</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;offsets.topic.replication.factor</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transaction.state.log.replication.factor</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transaction.state.log.min.isr</span>: <span style="color:#ae81ff">2</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log.message.format.version</span>: <span style="color:#e6db74">'2.5'</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storage</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ephemeral</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;zookeeper</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storage</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ephemeral</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;entityOperator</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;topicOperator</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;userOperator</span>: {} 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kafka.strimzi.io/v1beta1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">KafkaTopic</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">my-topic</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;strimzi.io/cluster</span>: <span style="color:#ae81ff">my-cluster</span> 
                  <span style="color:#f92672">spec</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;partitions</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;config</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;retention.ms</span>: <span style="color:#ae81ff">7200000</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;segment.bytes</span>: <span style="color:#ae81ff">1073741824</span> 
                  <span style="color:#ae81ff">EOF</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3) 다음 명령을 실행하여 파드 상태를 확인하고 Kafka와 Zookeeper가 모두 실행될 때까지 기다립니다.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ kubectl -n default get pod 
                  NAME                                         READY   STATUS    RESTARTS   AGE
                  my-cluster-entity-operator-f977bf457-s7ns2   3/3     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-0                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-1                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-2                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-zookeeper-0                       1/1     Running   <span style="color:#ae81ff">0</span>          71m
                  my-cluster-zookeeper-1                       1/1     Running   <span style="color:#ae81ff">1</span>          71m
                  my-cluster-zookeeper-2                       1/1     Running   <span style="color:#ae81ff">1</span>          71m
                  strimzi-cluster-operator-7d6cd6bdf7-9cf6t    1/1     Running   <span style="color:#ae81ff">0</span>          104m
               </p>
            </code>
         </div>
      </pre>
   </article>

   다음 명령을 실행하여 Kafka 클러스터의 메타데이터를 확인하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kafkacat -L -b my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc:9092
               </p>
            </code>
         </div>
      </pre>
   </article>

## 2단계: Kafka를 로그 수신기로 추가

1. Super Kubenetes에 `admin`으로 로그인하세요. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

   <div className="notices note">
      <p>Note</p>
      <div>
         [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택할 수 있습니다.
      </div>
   </div>

2. **클러스터 관리** 페이지에서 **클러스터 설정**의 **로그 수신기**로 이동합니다.

3. **로그 수신기 추가**를 클릭하고 **Kafka**를 선택합니다. Kafka 서비스 주소와 포트 번호를 입력한 다음 **확인**을 클릭하여 계속합니다.

   <table>
   <thead>
   <tr>
      <th>
         서비스 주소
      </th>
      <th>
         포트 번호
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   <tr>
      <td>
         my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   <tr>
      <td>
         my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   </tbody>
   </table>

4. 다음 명령을 실행하여 Kafka 클러스터가 Fluent Bit에서 보낸 로그를 수신하는지 확인합니다:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Start a util container</span></span> 
                  <span>kubectl run --rm utils -it --generator</span><span style="color:#f92672">=</span>run-pod/v1 --image arunvelsriram/utils bash 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Install Kafkacat in the util container</span></span> 
                  <span>apt-get install kafkacat</span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Run the following command to consume log messages from kafka topic: my-topic</span></span> 
                  kafkacat -C -b my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc:9092 -t my-topic
               </p>
            </code>
         </div>
      </pre>
   </article>
