---
title: "청구 활성화"
keywords: 'Kubernetes, Super Kubenetes, ConfigMap, Billing'
description: 'Enable the billing function in Super Kubenetes to view the billing data of your resources during a period.'
linkTitle: 'Enable Billing'
weight: 15420
---

이 튜토리얼에서는 Super Kubenetes 청구(Billing)를 활성화하여 클러스터의 다양한 리소스 비용을 확인하는 방법을 시연합니다. 기본적으로 청구 기능은 비활성화되어 있으므로 ConfigMap에 가격 정보를 수동으로 추가해야 합니다.

Super Kubenetes 청구를 활성화하려면 다음 단계를 수행하십시오.

1. 다음 명령을 실행하여 ConfigMap `Super Kubenetes-config`를 편집하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cm Super Kubenetes-config -n Super Kubenetes-system
               </p>
            </code>
         </div>
      </pre>
   </article>

2. ConfigMap의 `metering`에서 유지 날짜 및 가격 정보를 추가하세요. 다음은 참고를 위한 예시입니다:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#ae81ff">$ kubectl get cm Super Kubenetes-config -n Super Kubenetes-system -oyaml</span> 
                  ...
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alerting</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prometheusEndpoint</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://prometheus-operated.Super Kubenetes-monitoring-system.svc:9090</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thanosRulerEndpoint</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://thanos-ruler-operated.Super Kubenetes-monitoring-system.svc:10902</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thanosRuleResourceLabels</span>: <span style="color:#ae81ff">thanosruler=thanos-ruler,role=thanos-alerting-rules</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metering</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retentionDay</span>: <span style="color:#ae81ff">7d</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;billing</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priceInfo</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currencyUnit</span>: <span style="color:#e6db74">"USD"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cpuPerCorePerHour</span>: <span style="color:#ae81ff">1.5</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memPerGigabytesPerHour</span>: <span style="color:#ae81ff">5</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ingressNetworkTrafficPerMegabytesPerHour</span>: <span style="color:#ae81ff">1</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;egressNetworkTrafficPerMegabytesPerHour</span>: <span style="color:#ae81ff">1</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pvcPerGigabytesPerHour</span>: <span style="color:#ae81ff">2.1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
                  ...
               </p>
            </code>
         </div>
      </pre>
   </article>

   다음 표에서는 파라미터에 대해 설명합니다.

   <table>
     <tbody>
       <tr>
         <th>파라미터</th>
         <th>설명</th>
       </tr>
       <tr>
         <td><code>retentionDay</code></td>
         <td><code>retentionDay</code>는 사용자의 <b>미터링 및 청구</b> 페이지에 표시되는 날짜 범위를 결정합니다. 이 파라미터의 값은 <a href='../../../faq/observability/monitoring/'>Prometheus</a>의 <code>retention</code>와 일치해야 합니다.</td>
       </tr>
       <tr>
         <td><code>currencyUnit</code></td>
         <td><b>미터링 및 청구</b> 페이지에 표시되는 통화입니다. 현재 허용되는 값은 <code>KRW</code>(원) 및 <code>USD</code>(미국 달러)입니다. 다른 통화를 지정하면 콘솔은 기본적으로 USD로 비용을 표시합니다.</td>
       </tr>
       <tr>
         <td><code>cpuCorePerHour</code></td>
         <td>코어/시간당 CPU 단가.</td>
       </tr><tr>
         <td><code>memPerGigabytesPerHour</code></td>
         <td>GB/시간당 메모리 단가.</td>
       </tr><tr>
         <td><code>ingressNetworkTrafficPerMegabytesPerHour</code></td>
         <td>MB/시간당 인그레스 트래픽 단가.</td>
       </tr><tr>
         <td><code>egressNetworkTrafficPerMegabytesPerHour</code></td>
         <td>MB/시간당 이그레스 트래픽 단가.</td>
       </tr><tr>
         <td><code>pvcPerGigabytesPerHour</code></td>
         <td>GB/시간당 PVC 단가. Super Kubenetes는 사용 중인 실제 스토리지와 상관없이, 스토리지 용량 PVC 요청을 기반으로 총 볼륨 비용을 계산합니다.</td>
       </tr>
     </tbody>
   </table>

3. 다음 명령을 실행하여 `ks-apiserver`를 재시작하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl rollout restart deploy ks-apiserver -n Super Kubenetes-system
               </p>
            </code>
         </div>
      </pre>
   </article>

4. **미터링 및 청구** 페이지에서 리소스 비용 정보를 볼 수 있습니다.
