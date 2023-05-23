---
title: "환경 요구사항"
keywords: 'Super Kubenetes, Kubernetes, docker, cluster, configuration'
description: 'Understand the environment requirements for Super Kubenetes.'
linkTitle: "Environment Requirements"
weight: 17500
---

이 페이지에는 Super Kubenetes를 설치하고 사용하기 위한 몇 가지 요구 사항이 요약되어 있습니다.

## 시스템 요구 사항


<table>
<thead>
<tr>
	<th>
		시스템
	</th>
	<th>
		최소 요구 사항 (각 노드)
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<strong>Ubuntu</strong><em>16.04, 18.04</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<strong>Debian</strong><em>Buster, Stretch</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<strong>CentOS</strong><em>7</em>.x
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<strong>Red Hat Enterprise Linux</strong><em>7</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<strong>SUSE Linux Enterprise Server</strong><em>15</em><strong>/openSUSE Leap</strong><em>15.2</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
</tbody>
</table>

## 종속개체 요구 사항

<table>
<thead>
<tr>
	<th>
		종속개체
	</th>
	<th>
		쿠버네티스 버전 ≥ 1.18
	</th>
	<th>
		쿠버네티스 버전 &lt; 1.18
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<code>socat</code>
	</td>
	<td>
		필수
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
</tr>
<tr>
	<td>
		<code>conntrack</code>
	</td>
	<td>
		필수
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
</tr>
<tr>
	<td>
		<code>ebtables</code>
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
</tr>
<tr>
	<td>
		<code>ipset</code>
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
	<td>
		선택 사항이지만 권장됨
	</td>
</tr>
</tbody>
</table>

## 컨테이너 런타임 요구 사항

<table>
<thead>
<tr>
	<th>
		지원하는 컨테이너 런타임
	</th>
	<th>
		버전
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		Docker
	</td>
	<td>
		19.3.8+
	</td>
</tr>
<tr>
	<td>
		containerd
	</td>
	<td>
		최신
	</td>
</tr>
<tr>
	<td>
		CRI-O (experimental, not fully tested)
	</td>
	<td>
		최신
	</td>
</tr>
<tr>
	<td>
		iSula (experimental, not fully tested)
	</td>
	<td>
		최신
	</td>
</tr>
</tbody>
</table>

## 네트워크 요구 사항

<ul>
<li><code>/etc/resolv.conf</code>의 DNS 주소를 사용할 수 있는지 반드시 확인하십시오. 그렇지 않으면 클러스터에서 DNS의 문제가 발생할 수 있습니다.</li>
<li>네트워크 구성이 방화벽 규칙 또는 보안 그룹을 사용하는 경우, 인프라 컴포넌트가 특정 포트를 통해 서로 통신할 수 있는지 반드시 확인해야 합니다. 방화벽을 해제하는 것을 권장합니다. 자세한 내용은 [포트 요구 사항](../../installing-on-linux/introduction/port-firewall/)을 참조하세요.</li>
<li>지원하는 CNI 플러그인: Calico와 플란넬.  다른 것들(Cilium과 Kube-OVN 같은)도 작동할 수 있지만 완전히 테스트되지는 않았음을 참고하세요.</li>
</ul>

## 지원하는 쿠버네티스 버전

<table>
<thead>
<tr>
	<th>
		설치 도구
	</th>
	<th>
		Super Kubenetes 버전
	</th>
	<th>
		지원하는 쿠버네티스 버전
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		KubeKey
	</td>
	<td>
		3.2.0
	</td>
	<td>
		v1.19.x, v1.20.x, v1.21.x, v1.22.x (experimental)
	</td>
</tr>
<tr>
	<td>
		ks-installer
	</td>
	<td>
		3.2.0
	</td>
	<td>
		v1.19.x, v1.20.x, v1.21.x, v1.22.x (experimental)
	</td>
</tr>
</tbody>
</table>

## 지원하는 CSI 플러그인

<p>
	쿠버네티스는 버전 1.21의 쿠버네티스에서 인-트리 볼륨 플러그인이 제거될 것이라고 발표했습니다. 자세한 내용은 <a href="https://kubernetes.io/blog/2019/12/09/kubernetes-1-17-feature-csi-migration-beta/" target="_blank" rel="noopener noreferrer">Kubernetes In-Tree to CSI Volume Migration Moves to Beta</a>를 참조하세요. 그러므로 CSI 플러그인을 대신 설치하는 것을 권장합니다.

	지원하는 CSI 플러그인:
</p>
<ul><li>[ceph-csi](../../installing-on-linux/persistent-storage-configurations/install-ceph-csi-rbd/)</li></ul>

## 콘솔 액세스를 위해 지원하는 웹 브라우저

![console-browser](/dist/assets/docs/v3.3/reference/environment-requirements/console-browser.png)