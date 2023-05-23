---
 title: "GlusterFS 서버 설정"
keywords: 'Kubernetes, Super Kubenetes, GlusterFS'
description: 'How to set up a GlusterFS Server'
linkTitle: "Set up a GlusterFS Server"
weight: 17420
---

오픈 소스 분산 파일 시스템인 [GlusterFS](https://kubernetes.io/docs/concepts/storage/volumes/#glusterfs)를 사용하면 `glusterfs` 볼륨을 파드에 마운트할 수 있습니다. `glusterfs` 볼륨에 데이터를 미리 채운 경우, 쿠버네티스 클러스터의 파드 간에 공유할 수 있습니다.

이 튜토리얼에서는 세 대의 서버 시스템에서 GlusterFS를 설정하고 [Heketi](https://github.com/heketi/heketi)를 설치하여 GlusterFS 클러스터를 관리하는 방법을 시연합니다.

GlusterFS 및 Heketi가 설정되면, 클라이언트 시스템에 GlusterFS를 설치하고 KubeKey를 사용하여 GlusterFS를 스토리지 클래스로 사용하는 Super Kubenetes 클러스터를 생성할 수 있습니다.

## GlusterFS 노드 준비

이 예시에는 Ubuntu 16.04의 세 대의 서버 시스템이 있고, 각각 연결된 디스크가 하나씩 있습니다.

  <table>
  <thead>
  <tr>
    <th>
      호스트 이름
    </th>
    <th>
      IP 주소
    </th>
    <th>
      운영 체제
    </th>
    <th>
      장치
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      server1
    </td>
    <td>
      192.168.0.2
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  <tr>
    <td>
      server2
    </td>
    <td>
      192.168.0.3
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  <tr>
    <td>
      server3
    </td>
    <td>
      192.168.0.4
    </td>
    <td>
      Ubuntu 16.04, 4 Cores, 4 GB of Memory
    </td>
    <td>
      /dev/vdd 300 GB
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
   <p>Note</p>
   <div>
   - Heketi는 `server1`에 설치되며, 이것은 GlusterFS 볼륨의 라이프사이클을 관리하기 위한 RESTful 관리 인터페이스를 제공합니다. 물론 별도의 머신에도 설치할 수 있습니다.

   - 스토리지 공간이 더 필요하다면, 서버 시스템에 더 많은 블록 스토리지 디스크를 연결하세요.
   - 데이터는 `/dev/vdd`(블록 장치)에 저장되며, 파티션이나 포맷 없는 원본이어야 합니다.
   </div>
</div>

## 비밀번호 없는 SSH 로그인 설정

### 루트 로그인 설정

1. `server1`에 로그인하고 루트 사용자로 전환하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sudo -i
               </p>
            </code>
         </div>
      </pre>
   </article>
   
2. 루트 사용자 비밀번호를 변경하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  passwd
               </p>
            </code>
         </div>
      </pre>
   </article>
   
<div className="notices note">
  <p>Note</p>
  <div>
    `/etc/ssh/sshd_config` 파일에서 암호 인증이 활성화되어 있는지 꼭 확인하십시오. (`PasswordAuthentication`의 값은 `yes`여야 함)
  </div>
</div>

3. `server2`와 `server3`의 루트 사용자 비밀번호도 변경하십시오.

### 호스트 파일 항목 추가

1. 모든 서버에서 DNS를 설정하거나 또는 `/etc/hosts` 파일을 편집하여 호스트 이름과 IP 주소를 추가하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/hosts
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span>#</span><span>&nbsp;hostname loopback address</span> 
                  192.168.0.2  server1
                  192.168.0.3  server2
                  192.168.0.4  server3</p>
            </code>
         </div>
      </pre>
   </article>

2. 모든 서버의 `hosts` 파일에 위의 항목을 추가했는지 확인하십시오.

### 암호 없는 SSH 로그인 설정

1. `server1`에서 다음 명령을 실행하여 키를 생성합니다. 모든 프롬프트에 대해 직접 **Enter**를 누르십시오.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-keygen</p>
            </code>
         </div>
      </pre>
   </article>

2. 키를 모든 GlusterFS 노드에 복사하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-copy-id root@server1</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-copy-id root@server2</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh-copy-id root@server3</p>
            </code>
         </div>
      </pre>
   </article>

3. 비밀번호 없는 로그인을 통해 `server1`에서 모든 서버 시스템에 액세스할 수 있는지 확인하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh root@server1</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh root@server2</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ssh root@server3</p>
            </code>
         </div>
      </pre>
   </article>

## 모든 서버에 GlusterFS 설치

1. `server1`에서 다음 명령을 실행하여 `software-properties-common`을 설치합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get install software-properties-common</p>
            </code>
         </div>
      </pre>
   </article>

2. 커뮤니티 GlusterFS PPA를 추가하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  add-apt-repository ppa:gluster/glusterfs-7</p>
            </code>
         </div>
      </pre>
   </article>

3. 최신 패키지를 사용하고 있는지 확인하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get update</p>
            </code>
         </div>
      </pre>
   </article>

4. GlusterFS 서버를 설치하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get install glusterfs-server -y</p>
            </code>
         </div>
      </pre>
   </article>

5. `server2`와 `server3`에서도 위의 명령을 실행하고, 모든 머신에서 버전을 확인하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  glusterfs -V</p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices note">
  <p>Note</p>
  <div>
    Ubuntu에 GlusterFS를 설치하지 않은 경우, 위의 명령은 조금 달라질 수 있습니다. 자세한 내용은 [Gluster 설명서](https://docs.gluster.org/en/latest/Install-Guide/Install/#installing-gluster)를 참조하십시오.
  </div>
</div>

## 커널 모듈 로드

1. 다음 명령을 실행하여 `server1`에 필요한 3개의 커널 모듈을 로드합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  echo dm_thin_pool | sudo tee -a /etc/modules</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  echo dm_snapshot | sudo tee -a /etc/modules</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  echo dm_mirror | sudo tee -a /etc/modules</p>
            </code>
         </div>
      </pre>
   </article>

2. `thin-provisioning-tools`을 설치.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  apt-get -y install thin-provisioning-tools</p>
            </code>
         </div>
      </pre>
   </article>

3. `server2`와 `server3`에서도 위의 명령을 실행해야 합니다.

## GlusterFS 클러스터 생성

1. `server1`에서 다음 명령을 실행하여 다른 노드를 추가하고 클러스터를 생성합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  gluster peer probe server2</p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  gluster peer probe server3</p>
            </code>
         </div>
      </pre>
   </article>

2. 클러스터의 모든 노드가 성공적으로 연결되었는지 확인하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  gluster peer status</p>
            </code>
         </div>
      </pre>
   </article>

3. 예상 출력:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  Number of Peers: <span style="color:#ae81ff">2</span>

                  Hostname: server2
                  Uuid: e1192d6a-b65e-4ce8-804c-72d9425211a6
                  State: Peer in Cluster <span style="color:#f92672">(</span>Connected<span style="color:#f92672">)</span>
                     
                  Hostname: server3
                  Uuid: 9bd733e4-96d4-49d5-8958-6c947a2b4fa6
                  State: Peer in Cluster <span style="color:#f92672">(</span>Connected<span style="color:#f92672">)</span></p>
            </code>
         </div>
      </pre>
   </article>

## 헤케티 설치

GlusterFS 자체는 API 호출 방법을 제공하지 않으므로, [Heketi](https://github.com/heketi/heketi)를 설치하여 쿠버네티스 호출을 위한 RESTful API로 GlusterFS 볼륨의 라이프사이클을 관리할 수 있습니다. 이 방식으로 쿠버네티스 클러스터는 GlusterFS 볼륨을 동적으로 프로비저닝할 수 있습니다. 이 예제에서는 Heketi v7.0.0이 설치됩니다. 사용 가능한 Heketi 버전에 대한 자세한 내용은 [릴리스 페이지](https://github.com/heketi/heketi/releases/)를 참조하세요.

1. `server1`에서 헤케티를 다운로드하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  wget <a style="color:#ffffff; cursor:text;">https://github.com/heketi/heketi/releases/download/v7.0.0/heketi-v7.0.0.linux.amd64.tar.gz</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      별도의 머신에 Heketi를 설치할 수도 있습니다.
    </div>
  </div>

2. 파일의 압축을 해제하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  tar -xf heketi-v7.0.0.linux.amd64.tar.gz
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cp heketi /usr/bin
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cp heketi-cli /usr/bin
               </p>
            </code>
         </div>
      </pre>
   </article>
   
3. Heketi 서비스 파일을 생성하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /lib/systemd/system/heketi.service
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  [Unit]
                  Description=Heketi Server
                  [Service]
                  Type=simple
                  WorkingDirectory=/var/lib/heketi
                  ExecStart=/usr/bin/heketi --config=/etc/heketi/heketi.json
                  Restart=on-failure
                  StandardOutput=syslog
                  StandardError=syslog
                  [Install]
                  WantedBy=multi-user.target
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Heketi 폴더를 생성하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  mkdir -p /var/lib/heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  mkdir -p /etc/heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Heketi 설정을 위한 JSON 파일을 생성하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/heketi/heketi.json
               </p>
            </code>
         </div>
      </pre>
   </article>

   예제 파일:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  {
                  <span style="color:#f92672">&nbsp;&nbsp;"_port_comment"</span>: <span style="color:#e6db74">"Heketi Server Port Number"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"port"</span>: <span style="color:#e6db74">"8080"</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_use_auth"</span>: <span style="color:#e6db74">"Enable JWT authorization. Please enable for deployment"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"use_auth"</span>: <span style="color:#66d9ef">false</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_jwt"</span>: <span style="color:#e6db74">"Private keys for access"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"jwt"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_admin"</span>: <span style="color:#e6db74">"Admin has access to all APIs"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"admin"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key"</span>: <span style="color:#e6db74">"123456"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_user"</span>: <span style="color:#e6db74">"User only has access to /volumes endpoint"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key"</span>: <span style="color:#e6db74">"123456"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;"_glusterfs_comment"</span>: <span style="color:#e6db74">"GlusterFS Configuration"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;"glusterfs"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_executor_comment"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Execute plugin. Possible choices: mock, ssh"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mock: This setting is used for testing and development."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"      It will not send commands to any node."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ssh:  This setting will notify Heketi to ssh to the nodes."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"      It will need the values in sshexec to be configured."</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"kubernetes: Communicate with GlusterFS containers over"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"            Kubernetes exec api."</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"executor"</span>: <span style="color:#e6db74">"ssh"</span>,
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_sshexec_comment"</span>: <span style="color:#e6db74">"SSH username and private key file information"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"sshexec"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"keyfile"</span>: <span style="color:#e6db74">"/root/.ssh/id_rsa"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: <span style="color:#e6db74">"root"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_kubeexec_comment"</span>: <span style="color:#e6db74">"Kubernetes configuration"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"kubeexec"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"host"</span> :<span style="color:#e6db74">"<a style="color:#e6db74; cursor:text;">https://kubernetes.host:8443"</a></span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"cert"</span> : <span style="color:#e6db74">"/path/to/crt.file"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"insecure"</span>: <span style="color:#66d9ef">false</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user"</span>: <span style="color:#e6db74">"kubernetes username"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password"</span>: <span style="color:#e6db74">"password for kubernetes user"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"namespace"</span>: <span style="color:#e6db74">"Kubernetes namespace"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fstab"</span>: <span style="color:#e6db74">"Optional: Specify fstab file on node.  Default is /etc/fstab"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;},
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_db_comment"</span>: <span style="color:#e6db74">"Database file name"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"db"</span>: <span style="color:#e6db74">"/var/lib/heketi/heketi.db"</span>,
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"brick_max_size_gb"</span> : <span style="color:#ae81ff">1024</span>,
                  <span style="color:#f92672">&nbsp;"brick_min_size_gb"</span> : <span style="color:#ae81ff">1</span>,
                  <span style="color:#f92672">&nbsp;"max_bricks_per_volume"</span> : <span style="color:#ae81ff">33</span>,
                  
                  
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"_loglevel_comment"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Set log level. Choices are:"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  none, critical, error, warning, info, debug"</span>,
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Default is warning"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"loglevel"</span> : <span style="color:#e6db74">"debug"</span> 
                  &nbsp;&nbsp;}
                  }
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Super Kubenetes 클러스터의 스토리지 클래스로서 GlusterFS를 설치할 때 `admin` 계정과 그것의 `key` 값을 제공해야 합니다.
    </div>
  </div>

6. Heketi 시작.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl start heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

7. Heketi의 상태를 체크하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl status heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   `활성 (실행 중)`이 보이면 설치가 성공한 것입니다. 
   예상 출력:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ● heketi.service - Heketi Server
                  &nbsp;&nbsp;&nbsp;Loaded: loaded <span style="color:#f92672">(</span>/lib/systemd/system/heketi.service; disabled; vendor preset: enabled<span style="color:#f92672">)</span> 
                  &nbsp;&nbsp;&nbsp;Active: active <span style="color:#f92672">(</span>running<span style="color:#f92672">)</span> since Tue 2021-03-09 13:04:30 CST; 4s ago 
                  &nbsp;Main PID: <span style="color:#ae81ff">9282</span> <span style="color:#f92672">&nbsp;(</span>heketi<span style="color:#f92672">)</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;Tasks: <span style="color:#ae81ff">8</span> 
                  &nbsp;&nbsp;&nbsp;Memory: 6.5M 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CPU: 62ms 
                  &nbsp;&nbsp;&nbsp;CGroup: /system.slice/heketi.service 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─9282 /usr/bin/heketi --config<span style="color:#f92672">=</span>/etc/heketi/heketi.json 

                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 systemd<span style="color:#f92672">[</span>1<span style="color:#f92672">]</span>: Started Heketi Server. 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: Heketi v7.0.0 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Loaded ssh executor 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Max bricks per volume set to <span style="color:#ae81ff">33</span> 
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Max brick size <span style="color:#ae81ff">1024</span> GB
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Adv: Min brick size <span style="color:#ae81ff">1</span> GB
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 GlusterFS Application Loaded
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: <span style="color:#f92672">[</span>heketi<span style="color:#f92672">]</span> INFO 2021/03/09 13:04:30 Started Node Health Cache Monitor
                  Mar <span style="color:#ae81ff">09</span> 13:04:30 server1 heketi<span style="color:#f92672">[</span>9282<span style="color:#f92672">]</span>: Listening on port <span style="color:#ae81ff">8080</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

8. Heketi 활성화.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  systemctl enable heketi
               </p>
            </code>
         </div>
      </pre>
   </article>

   예상 출력:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  Created symlink from /etc/systemd/system/multi-user.target.wants/heketi.service to /lib/systemd/system/heketi.service.
               </p>
            </code>
         </div>
      </pre>
   </article>

9. Heketi에 대한 토폴로지 설정 파일을 생성하세요. 이것은 Heketi에 추가된 클러스터, 노드, 디스크의 정보를 담고 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi /etc/heketi/topology.json
               </p>
            </code>
         </div>
      </pre>
   </article>

   예시 파일:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;"clusters"</span>: [
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nodes"</span>: [
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.2"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.2"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.3"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.3"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostnames"</span>: {
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"manage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.4"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"storage"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"192.168.0.4"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"zone"</span>: <span style="color:#ae81ff">1</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"devices"</span>: [
                  <span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/dev/vdd"</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  &nbsp;&nbsp;&nbsp;&nbsp;]
                  &nbsp;&nbsp;}
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - 위의 IP 주소를 사용자의 IP 주소로 바꿉니다.
      - `devices`에 대한 사용자 고유의 디스크 이름을 추가합니다.
    </div>
  </div> 

10. Heketi JSON 파일을 로드하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  export HEKETI_CLI_SERVER<span style="color:#f92672">=</span><a style="color:#ffffff; cursor:text;">http://localhost:8080</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  heketi-cli topology load --json<span style="color:#f92672">=</span>/etc/heketi/topology.json
               </p>
            </code>
         </div>
      </pre>
   </article>

    예상 출력:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Creating cluster ... ID: 2d9e11adede04fe6d07cb81c5a1a7ea4
                     Allowing file volumes on cluster.
                     Allowing block volumes on cluster.
                     Creating node 192.168.0.2 ... ID: 0a9f240ab6fd96ea014948c5605be675
                        Adding device /dev/vdd ... OK
                     Creating node 192.168.0.3 ... ID: 2468086cadfee8ef9f48bc15db81c88a
                        Adding device /dev/vdd ... OK
                     Creating node 192.168.0.4 ... ID: 4c21b33d5c32029f5b7dc6406977ec34
                        Adding device /dev/vdd ... OK
            </p>
         </code>
      </div>
   </pre>
</article>

11. 위 출력에는 클러스터 ID와 노드 ID가 모두 표시됩니다. 클러스터 정보를 보려면 다음 명령을 실행하십시오.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
               heketi-cli cluster info 2d9e11adede04fe6d07cb81c5a1a7ea4 <span style="color:#75715e"># Use your own cluster ID.</span>
         </code>
      </div>
   </pre>
</article>

예상 출력:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               Cluster id: 2d9e11adede04fe6d07cb81c5a1a7ea4
               Nodes:
               0a9f240ab6fd96ea014948c5605be675
               2468086cadfee8ef9f48bc15db81c88a
               4c21b33d5c32029f5b7dc6406977ec34
               Volumes:

               Block: true

               File: true
            </p>
         </code>
      </div>
   </pre>
</article>
   

