/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KuberixEnterprise Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KuberixEnterprise Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  "HIDE_HELP_INFORMATION": "도움말 정보 숨기기",
  "KUBECTL_TIP": "\n    <h2><a id=\"KubeCtl_Common_Instructions_0\"></a>명령 팁</h2>\n    <p>다음 kubestl 명령을 참조할 수 있습니다. <a href=\"https://kubernetes.io/docs/reference/kubectl/overview/\" target=\"_blank\">자세히 보기</a></p>\n    <h3><a id=\"kubectl_output_format_4\"></a>맞춤형 출력</h3>\n    <ul>\n    <li>파드에 대한 자세한 정보 보기</li>\n    </ul>\n    <p><code>kubectl get pod &lt;pod-name&gt; -o wide</code></p>\n    <ul>\n    <li>YAML 형식으로 파드(Pod) 세부사항 보기</li>\n    </ul>\n    <p><code>kubectl get pod &lt;pod-name&gt; -o yaml</code></p>\n    <h3><a id=\"kubectl_Operation_14\"></a>운영</h3>\n    <h4><a id=\"1_Create_a_resource_object_16\"></a>리소스 만들기</h4>\n    <ul>\n    <li>YAML 구성 파일을 사용하여 서비스 만들기</li>\n    </ul>\n    <p><code>kubectl create -f my-service.yaml</code></p>\n    <ul>\n    <li>디렉터리의 모든 YAML, YML 및 JSON 파일을 사용하여 리소스 생성</li>\n    </ul>\n    <p><code>kubectl create -f &lt;directory&gt;</code></p>\n    <h4><a id=\"2_View_resource_objects_26\"></a>리소스 보기</h4>\n    <ul>\n    <li>모든 파드 보기</li>\n    </ul>\n    <p><code>kubectl get pods</code></p>\n    <ul>\n    <li>모든 서비스 보기</li>\n    </ul>\n    <p><code>kubectl get services</code></p>\n    <h4><a id=\"3_View_resource_details_36\"></a>리소스 세부정보 보기</h4>\n    <ul>\n    <li>노드 세부정보 보기</li>\n    </ul>\n    <p><code>kubectl describe nodes &lt;node-name&gt;</code></p>\n    <ul>\n    <li>파드 세부정보 보기</li>\n    </ul>\n    <p><code>kubectl describe pods &lt;pod-name&gt;</code></p>\n  ",
  "OPEN_TERMINAL_DESC": "프록시 서버의 websocket 프록시 구성이 올바른지 확인하십시오."
}