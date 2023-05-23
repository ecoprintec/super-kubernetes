---
title: "Import a Google GKE Cluster"
keywords: 'Kubernetes, Super Kubenetes, multicluster, Google GKE'
description: 'Learn how to import a Google Kubernetes Engine cluster.'
titleLink: "Import a Google GKE Cluster"
weight: 5330
---

This tutorial demonstrates how to import a GKE cluster through the [direct connection](../../../multicluster-management/enable-multicluster/direct-connection/) method. If you want to use the agent connection method, refer to [Agent Connection](../../../multicluster-management/enable-multicluster/agent-connection/).

## Prerequisites

- You have a Kubernetes cluster with Super Kubenetes installed, and prepared this cluster as the host cluster. For more information about how to prepare a host cluster, refer to [Prepare a host cluster](../../../multicluster-management/enable-multicluster/direct-connection/#prepare-a-host-cluster).
- You have a GKE cluster to be used as the member cluster.

## Import a GKE Cluster

### Step 1: Deploy Super Kubenetes on your GKE cluster

You need to deploy Super Kubenetes on your GKE cluster first. For more information about how to deploy Super Kubenetes on GKE, refer to [Deploy Super Kubenetes on GKE](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-gke/).

### Step 2: Prepare the GKE member cluster

1. To manage the member cluster from the host cluster, you need to make `jwtSecret` the same between them. Therefore, get it first by executing the following command on your host cluster.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v <span style="color:#e6db74">"apiVersion"</span> | grep jwtSecret</code>
        </div>
    </pre>
  </article>

  The output is similar to the following:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code><span style="color:#f92672">jwtSecret</span>: <span style="color:#e6db74">"QVguGh7qnURywHn2od9IiOX6X8f8wK8g"</span></code>
        </div>
    </pre>
  </article>

2. Log in to the Super Kubenetes console on GKE as `admin`. Click **Platform** in the upper-left corner and then select **Cluster Management**.

3. Go to **CRDs**, enter `ClusterConfiguration` in the search bar, and then press **Enter** on your keyboard. Click **ClusterConfiguration** to go to its detail page.

4. Click <img src="/dist/assets/docs/v3.3/multicluster-management/import-cloud-hosted-k8s/import-gke/three-dots.png" height="20px" alt="icon"> on the right and then select **Edit YAML** to edit `ks-installer`. 

5. In the YAML file of `ks-installer`, change the value of `jwtSecret` to the corresponding value shown above and set the value of `clusterRole` to `member`.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">authentication</span>:
              <span style="color:#f92672">&nbsp;&nbsp;jwtSecret</span>: <span style="color:#ae81ff">QVguGh7qnURywHn2od9IiOX6X8f8wK8g</span>
          </code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <span style="color:#f92672">multicluster</span>:
              <span style="color:#f92672">&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">member</span>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Make sure you use the value of your own `jwtSecret`. You need to wait for a while so that the changes can take effect.
    </div>
  </div>

### Step 3: Create a new kubeconfig file

1. Run the following commands on your GKE Cloud Shell Terminal:

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									TOKEN<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-system get secret <span style="color:#66d9ef">$(</span>kubectl -n Super Kubenetes-system get sa Super Kubenetes -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.secrets[0].name}'</span><span style="color:#66d9ef">)</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.data.token}'</span> | base64 -d<span style="color:#66d9ef">)</span> 
									kubectl config set-credentials Super Kubenetes --token<span style="color:#f92672">=</span><span style="color:#e6db74">${</span>TOKEN<span style="color:#e6db74">}</span> 
									kubectl config set-context --current --user<span style="color:#f92672">=</span>Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Retrieve the new kubeconfig file by running the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>cat ~/.kube/config</code>
        </div>
    </pre>
  </article>

  The output is similar to the following:
    

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
            <span style="color:#f92672">clusters</span>:
            <span>-</span><span style="color:#f92672">&nbsp;cluster</span>:
                <span style="color:#f92672">certificate-authority-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLekNDQWhPZ0F3SUJBZ0lSQUtPRUlDeFhyWEdSbjVQS0dlRXNkYzR3RFFZSktvWklodmNOQVFFTEJRQXcKTHpFdE1Dc0dBMVVFQXhNa1pqVTBNVFpoTlRVdFpEZzFZaTAwWkdZNUxXSTVNR1V0TkdNeE0yRTBPR1ZpWW1VMwpNQjRYRFRJeE1ETXhNVEl5TXpBMU0xb1hEVEkyTURNeE1ESXpNekExTTFvd0x6RXRNQ3NHQTFVRUF4TWtaalUwCk1UWmhOVFV0WkRnMVlpMDBaR1k1TFdJNU1HVXROR014TTJFME9HVmlZbVUzTUlJQklqQU5CZ2txaGtpRzl3MEIKQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdkVHVGtKRjZLVEl3QktlbXNYd3dPSnhtU3RrMDlKdXh4Z1grM0dTMwpoeThVQm5RWEo1d3VIZmFGNHNWcDFzdGZEV2JOZitESHNxaC9MV3RxQk5iSlNCU1ppTC96V3V5OUZNeFZMS2czCjVLdnNnM2drdUpVaFVuK0tMUUFPdTNUWHFaZ2tTejE1SzFOSU9qYm1HZGVWSm5KQTd6NTF2ZkJTTStzQWhGWTgKejJPUHo4aCtqTlJseDAvV0UzTHZEUUMvSkV4WnRCRGFuVFU0anpHMHR2NGk1OVVQN2lWbnlwRHk0dkFkWm5mbgowZncwVnplUXJqT2JuQjdYQTZuUFhseXZubzErclRqakFIMUdtU053c1IwcDRzcEViZ0lXQTNhMmJzeUN5dEJsCjVOdmJKZkVpSTFoTmFOZ3hoSDJNenlOUWVhYXZVa29MdDdPN0xqYzVFWlo4cFFJREFRQUJvMEl3UURBT0JnTlYKSFE4QkFmOEVCQU1DQWdRd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVUVyVkJrc3MydGV0Qgp6ZWhoRi92bGdVMlJiM2N3RFFZSktvWklodmNOQVFFTEJRQURnZ0VCQUdEZVBVa3I1bDB2OTlyMHZsKy9WZjYrCitBanVNNFoyOURtVXFHVC80OHBaR1RoaDlsZDQxUGZKNjl4eXFvME1wUlIyYmJuTTRCL2NVT1VlTE5VMlV4VWUKSGRlYk1oQUp4Qy9Uaks2SHpmeExkTVdzbzVSeVAydWZEOFZob2ZaQnlBVWczajdrTFgyRGNPd1lzNXNrenZ0LwpuVUlhQURLaXhtcFlSSWJ6MUxjQmVHbWROZ21iZ0hTa3MrYUxUTE5NdDhDQTBnSExhMER6ODhYR1psSi80VmJzCjNaWVVXMVExY01IUHd5NnAwV2kwQkpQeXNaV3hZdFJyV3JFWUhZNVZIanZhUG90S3J4Y2NQMUlrNGJzVU1ZZ0wKaTdSaHlYdmJHc0pKK1lNc3hmalU5bm5XYVhLdXM5ZHl0WG1kRGw1R0hNU3VOeTdKYjIwcU5RQkxhWHFkVmY0PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==</span> 
                <span style="color:#f92672">server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://130.211.231.87</a></span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">contexts</span>:
            <span>-</span><span style="color:#f92672">&nbsp;context</span>:
                <span style="color:#f92672">cluster</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
                <span style="color:#f92672">user</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
              <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
            <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
            <span style="color:#f92672">preferences</span>: {}
            <span style="color:#f92672">users</span>:
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">gke_grand-icon-307205_us-central1-c_cluster-3</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">auth-provider</span>:
                  <span style="color:#f92672">config</span>:
                    <span style="color:#f92672">cmd-args</span>: <span style="color:#ae81ff">config config-helper --format=json</span> 
                    <span style="color:#f92672">cmd-path</span>: <span style="color:#ae81ff">/usr/lib/google-cloud-sdk/bin/gcloud</span> 
                    <span style="color:#f92672">expiry-key</span>: <span style="color:#e6db74">'{.credential.token_expiry}'</span> 
                    <span style="color:#f92672">token-key</span>: <span style="color:#e6db74">'{.credential.access_token}'</span> 
                  <span style="color:#f92672">name</span>: <span style="color:#ae81ff">gcp</span> 
            <span>-</span><span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">user</span>:
                <span style="color:#f92672">token</span>: <span style="color:#ae81ff">eyJhbGciOiJSUzI1NiIsImtpZCI6InNjOFpIb3RrY3U3bGNRSV9NWV8tSlJzUHJ4Y2xnMDZpY3hhc1BoVy0xTGsifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlc3BoZXJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJlc3BoZXJlLXRva2VuLXpocmJ3Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Imt1YmVzcGhlcmUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyMGFmZGI1Ny01MTBkLTRjZDgtYTAwYS1hNDQzYTViNGM0M2MiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXNwaGVyZS1zeXN0ZW06a3ViZXNwaGVyZSJ9.ic6LaS5rEQ4tXt_lwp7U_C8rioweP-ZdDjlIZq91GOw9d6s5htqSMQfTeVlwTl2Bv04w3M3_pCkvRzMD0lHg3mkhhhP_4VU0LIo4XeYWKvWRoPR2kymLyskAB2Khg29qIPh5ipsOmGL9VOzD52O2eLtt_c6tn-vUDmI_Zw985zH3DHwUYhppGM8uNovHawr8nwZoem27XtxqyBkqXGDD38WANizyvnPBI845YqfYPY5PINPYc9bQBFfgCovqMZajwwhcvPqS6IpG1Qv8TX2lpuJIK0LLjiKaHoATGvHLHdAZxe_zgAC2cT_9Ars3HIN4vzaSX0f-xP--AcRgKVSY9g</span>
          </code>
        </div>
    </pre>
  </article>

### Step 4: Import the GKE member cluster

1. Log in to the Super Kubenetes console on your host cluster as `admin`. Click **Platform** in the upper-left corner and then select **Cluster Management**. On the **Cluster Management** page, click **Add Cluster**.

2. Enter the basic information based on your needs and click **Next**.

3. In **Connection Method**, select **Direct connection**. Fill in the new kubeconfig file of the GKE member cluster and then click **Create**.

4. Wait for cluster initialization to finish.