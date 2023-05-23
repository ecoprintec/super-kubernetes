---
title: "Kubeconfig 가져오기"
keywords: 'Kubernetes, Super Kubenetes, multicluster, hybrid-cloud, kubeconfig'
description: 'Retrieve the Kubeconfig which is needed for cluster importing through direct connection.'
titleLink: "Retrieve KubeConfig"
weight: 5230
---

[직접 연결](../direct-connection/)을 사용하여 멤버 클러스터를 가져올 경우, 멤버 클러스터의 kubeconfig를 제공해야 합니다.

## 사전 준비

Kubernetes 클러스터가 있어야 합니다.

## KubeConfig 가져오기

`$HOME/.kube`로 이동하여, 일반적으로 `config`라는 파일이 있는 디렉토리에서 파일을 확인하세요. 다음 명령을 사용하여 KubeConfig 파일을 가져오세요.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>cat $HOME/.kube/config</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">clusters</span>: 
              &nbsp;- <span style="color:#f92672">cluster</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;certificate-authority-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJd01EZ3dPREE1hqaVE3NXhwbGFQNUgwSm5ySk5peTBacFh6QWxjYzZlV2JlaXJ1VgpUbmZUVjZRY3pxaVcrS3RBdFZVbkl4MCs2VTgzL3FiKzdINHk2RnA0aVhUaDJxRHJ6Qkd4dG1UeFlGdC9OaFZlCmhqMHhEbHVMOTVUWkRjOUNmSFgzdGZJeVh5WFR3eWpnQ2g1RldxbGwxVS9qVUo2RjBLVVExZ1pRTFp4TVJMV0MKREM2ZFhvUGlnQ3BNaVRPVXl5SVNhWUVjYVNBMEo5VWZmSGd4ditVcXVleTc0cEM2emszS0lOT2tGMkI1MllxeApUa09OT2VkV2hDUExMZkUveVJqeGw1aFhPL1Z4REFaVC9HQ1Y1a0JZN0toNmRhendmUllOa21IQkhDMD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=hqaVE3NXhwbGFQNUgwSm5ySk5peTBacFh6QWxjYzZlV2JlaXJ1VgpUbmZUVjZRY3pxaVcrS3RBdFZVbkl4MCs2VTgzL3FiKzdINHk2RnA0aVhUaDJxRHJ6Qkd4dG1UeFlGdC9OaFZlCmhqMHhEbHVMOTVUWkRjOUNmSFgzdGZJeVh5WFR3eWpnQ2g1RldxbGwxVS9qVUo2RjBLVVExZ1pRTFp4TVJMV0MKREM2ZFhvUGlnQ3BNaVRPVXl5SVNhWUVjYVNBMEo5VWZmSGd4ditVcXVleTc0cEM2emszS0lOT2tGMkI1MllxeApUa09OT2VkV2hDUExMZkUveVJqeGw1aFhPL1Z4REFaVC9HQ1Y1a0JZN0toNmRhendmUllOa21IQkhDMD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://lb.Super Kubenetes.local:6443</a></span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">cluster.local</span> 
              <span style="color:#f92672">contexts</span>: 
              &nbsp;- <span style="color:#f92672">context</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cluster</span>: <span style="color:#ae81ff">cluster.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;user</span>: <span style="color:#ae81ff">kubernetes-admin</span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">kubernetes-admin@cluster.local</span> 
              <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">kubernetes-admin@cluster.local</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
              <span style="color:#f92672">preferences</span>: {} 
              <span style="color:#f92672">users</span>: 
              &nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kubernetes-admin</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;user</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;client-certificate-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM4akNDQWRxZ0F3SUJBZ0lJRzd5REpscVdjdTh3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TURBNE1EZ3dPVEkzTXpkYUZ3MHlNVEE0TURnd09USTNNemhhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnsOTJBUkJDNTRSR3BsZ3VmCmw5a0hPd0lEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFEQ2FUTXNBR1Vhdnhrazg0NDZnOGNRQUJpSmk5RTZiREV5TwphRnJubC8reGRzRmgvOTFiMlNpM3ZwaHFkZ2k5bXRYWkhhaWI5dnQ3aXdtSEFwbGQxUkhBU25sMFoxWFh1dkhzCmMzcXVIU0puY3dmc3JKT0I4UG9NRjVnaG10a0dPV3g0M2RHTTNHQnpGTVJ4ZGcrNmttNjRNUGhneXl6NTJjYUoKbzhPajNja1Uzd1NWNkxvempRcFVaUnZHV25qQjEwUXFPWXBtQUk4VCtlZkxKZzhuY0drK3V3UUVTeXBYWExpYwoxWVQ2QkFJeFhEK2tUUU1hOFhjdUhHZzlWRkdsUm9yK1EvY3l0S3RDeHVncFlxQ2xvbHVpckFUUnpsemRXamxYCkVQaHVjRWs2UUdIZEpObjd0M2NwRGkzSUdYYXJFdGxQQmFwck9nSGpkOHZVOStpWXdoQT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=TJBUkJDNTRSR3BsZ3VmCmw5a0hPd0lEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFEQ2FUTXNBR1Vhdnhrazg0NDZnOGNRQUJpSmk5RTZiREV5TwphRnJubC8reGRzRmgvOTFiMlNpM3ZwaHFkZ2k5bXRYWkhhaWI5dnQ3aXdtSEFwbGQxUkhBU25sMFoxWFh1dkhzCmMzcXVIU0puY3dmc3JKT0I4UG9NRjVnaG10a0dPV3g0M2RHTTNHQnpGTVJ4ZGcrNmttNjRNUGhneXl6NTJjYUoKbzhPajNja1Uzd1NWNkxvempRcFVaUnZHV25qQjEwUXFPWXBtQUk4VCtlZkxKZzhuY0drK3V3UUVTeXBYWExpYwoxWVQ2QkFJeFhEK2tUUU1hOFhjdUhHZzlWRkdsUm9yK1EvY3l0S3RDeHVncFlxQ2xvbHVpckFUUnpsemRXamxYCkVQaHVjRWs2UUdIZEpObjd0M2NwRGkzSUdYYXJFdGxQQmFwck9nSGpkOHZVOStpWXdoQT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;client-key-data</span>: <span style="color:#ae81ff">LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBeXBLWkdtdmdiSHdNaU9pVU80UHZKZXB2MTJaaE1yRUIxK2xlVnM0dHIzMFNGQ0p1Ck8wc09jL2lUNmFuWEJzUU1XNDF6V3hwV1B5elkzWXlUWEJMTlIrM01pWTl2SFhUeWJ6eitTWnNlTzVENytHL3MKQnR5NkovNGpJb2pZZlRZNTFzUUxyRVJydStmVnNGeUU0U2dXbE1HYWdqV0RIMFltM0VJsOTJBUkJDNTRSR3BsZ3VmCmw5a0hPd0lEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFEQ2FUTXNBR1Vhdnhrazg0NDZnOGNRQUJpSmk5RTZiREV5TwphRnJubC8reGRzRmgvOTFiMlNpM3ZwaHFkZ2k5bXRYWkhhaWI5dnQ3aXdtSEFwbGQxUkhBU25sMFoxWFh1dkhzCmMzcXVIU0puY3dmc3JKT0I4UG9NRjVnaG10a0dPV3g0M2RHTTNHQnpGTVJ4ZGcrNmttNjRNUGhneXl6NTJjYUoKbzhPajNja1Uzd1NWNkxvempRcFVaUnZHV25qQjEwUXFPWXBtQUk4VCtlZkxKZzhuY0drK3V3UUVTeXBYWExpYwoxWVQ2QkFJeFhEK2tUUU1hOFhjdUhHZzlWRkdsUm9yK1EvY3l0S3RDeHVncFlxQ2xvbHVpckFUUnpsemRXamxYCkVQaHVjRWs2UUdIZEpObjd0M2NwRGkzSUdYYXJFdGxQQmFwck9nSGpkOHZVOStpWXdoQT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=Ygo3THE3a2tBMURKNTBld2pMUTNTd1Yxd2p6N2ZjeDYvbzUwRnJnK083dEJMVVdQNTNHaDQ1VjJpUEp2NkdPYk1uCjhIWElmem83cW5XRFQvU20ybW5HbitUdVY4THdLVWFXL2wya3FkRUNnWUVBcS9zRmR1RDk2Z3VoT2ZaRnczcWMKblZGekNGQ3JsMkUvVkdYQy92SmV1WnJLQnFtSUtNZFI3ajdLWS9WRFVlMnJocVd6MFh2Wm9Sa1FoMkdwWkdIawpDd3NzcENKTVl4L0hETTVaWlBvcittb1J6VE5HNHlDNGhTRGJ2VEFaTmV1VTZTK1hzL1JSTDJ6WnUwemNQQXk1CjJJRVgwelFpZ1JzK3VzS3Jkc1FVZXZrQ2dZQUUrQUNWeDJnMC94bmFsMVFJNmJsK3Y2TDJrZVJtVGppcHB4Wm0KS1JEd2xnaXpsWGxsTjhyQmZwSGNiK1ZnZ282anN2eHFrb0pkTEhBLzFDME5IMWVuS1NoUTlpZVFpeWNsZngwdQpKOE1oeW1JM0RBZUg1REJyOG1rZ0pwNnJwUXNBc1paYmVhOHlLTzV5eVdCYTN6VGxOVnQvNDRibGg5alpnTWNMCjNyUXFVUUtCZ1FETVlXdEt2S0hOQllXV0p5enFERnFPbS9qY3Z3andvcURibUZVMlU3UGs2aUdNVldBV3VYZ3cKSm5qQWtES01GN0JXSnJRUjR6RHVoQlhvQVMxWVhiQ2lGd2hTcXVjWGhFSGlwQ3Nib0haVVRtT1pXUUh4Vlp4bQowU1NiRXFZU2MvZHBDZ1BHRk9IaW1FdUVic05kc2JjRmRETDQyODZHb0psQUxCOGc3VWRUZUE9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=</span> 
            </p>
        </code>
      </div>
  </pre>
</article>
