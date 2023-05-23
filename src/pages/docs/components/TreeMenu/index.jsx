import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../../containers/Introduction/index.scss'

export default class TreeMenu extends React.Component {
  handleClick(e) {
    e.preventDefault()
    e.currentTarget.children[0].classList.toggle(styles['arrow-open'])
    e.currentTarget.nextElementSibling.classList.toggle(styles['ul-active'])
  }

  render() {
    const activeStyle = {
      color: '#36a9ff',
    }
    return (
      <nav className={styles['nav-menu']}>
        <ul className={styles['ul-active']}>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('Introduction')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/what-is-SuperKubenetes/"
                  activeStyle={activeStyle}
                >
                  {t('what-is-SuperKubenetes')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/ecosystem/"
                  activeStyle={activeStyle}
                >
                  {t('ecosystem')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/features/"
                  activeStyle={activeStyle}
                >
                  {t('features')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/architecture/"
                  activeStyle={activeStyle}
                >
                  {t('architecture')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/advantages/"
                  activeStyle={activeStyle}
                >
                  {t('advantages')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/introduction/scenarios/"
                  activeStyle={activeStyle}
                >
                  {t('scenarios')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('quick-start')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/create-workspace-and-project/"
                  activeStyle={activeStyle}
                >
                  {t('create-workspace-and-project')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/deploy-bookinfo-to-k8s/"
                  activeStyle={activeStyle}
                >
                  {t('deploy-bookinfo-to-k8s')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/wordpress-deployment/"
                  activeStyle={activeStyle}
                >
                  {t('wordpress-deployment')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/enable-pluggable-components/"
                  activeStyle={activeStyle}
                >
                  {t('pluggable-components')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/all-in-one-on-linux/"
                  activeStyle={activeStyle}
                >
                  {t('all-in-one-on-linux')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/quick-start/minimal-SuperKubenetes-on-k8s/"
                  activeStyle={activeStyle}
                >
                  {t('minimal-SuperKubenetes-on-k8s')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('Installing on Linux')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Introduction')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/intro/"
                      activeStyle={activeStyle}
                    >
                      {t('intro')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/kubekey/"
                      activeStyle={activeStyle}
                    >
                      {t('kubekey')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/multioverview/"
                      activeStyle={activeStyle}
                    >
                      {t('multioverview')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/air-gapped-installation/"
                      activeStyle={activeStyle}
                    >
                      {t('air-gapped-installation')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/port-firewall/"
                      activeStyle={activeStyle}
                    >
                      {t('port-firewall')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/introduction/vars/"
                      activeStyle={activeStyle}
                    >
                      {t('vars')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('High Availability Configurations')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/high-availability-configurations/internal-ha-configuration/"
                      activeStyle={activeStyle}
                    >
                      {t('internal-ha-configuration')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/high-availability-configurations/ha-configuration/"
                      activeStyle={activeStyle}
                    >
                      {t('ha-configuration')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/high-availability-configurations/set-up-ha-cluster-using-keepalived-haproxy/"
                      activeStyle={activeStyle}
                    >
                      {t('set-up-ha-cluster-using-keepalived-haproxy')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Persistent Storage Configurations')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/persistent-storage-configurations/understand-persistent-storage/"
                      activeStyle={activeStyle}
                    >
                      {t('understand-persistent-storage')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/persistent-storage-configurations/install-nfs-client/"
                      activeStyle={activeStyle}
                    >
                      {t('install-nfs-client')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/persistent-storage-configurations/install-glusterfs/"
                      activeStyle={activeStyle}
                    >
                      {t('install-glusterfs')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/persistent-storage-configurations/install-ceph-csi-rbd/"
                      activeStyle={activeStyle}
                    >
                      {t('install-ceph-csi-rbd')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Installing in On-premises Environments')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/on-premises/install-SuperKubenetes-on-bare-metal/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-on-bare-metal')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/on-premises/install-SuperKubenetes-and-k3s/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-and-k3s')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Add and Delete Nodes')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/cluster-operation/add-new-nodes/"
                      activeStyle={activeStyle}
                    >
                      {t('add-new-nodes')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/cluster-operation/remove-nodes/"
                      activeStyle={activeStyle}
                    >
                      {t('remove-nodes')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-linux/cluster-operation/add-edge-nodes/"
                      activeStyle={activeStyle}
                    >
                      {t('add-edge-nodes')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/installing-on-linux/uninstall-SuperKubenetes-and-Kubernetes/"
                  activeStyle={activeStyle}
                >
                  {t('uninstall-SuperKubenetes-and-kubernetes')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('installing-on-kubernetes')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Introduction')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/introduction/overview/"
                      activeStyle={activeStyle}
                    >
                      {t('overview')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/introduction/prerequisites/"
                      activeStyle={activeStyle}
                    >
                      {t('prerequisites')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Installing on Hosted Kubernetes')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/hosted-kubernetes/install-SuperKubenetes-on-aks/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-on-aks')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/hosted-kubernetes/install-SuperKubenetes-on-eks/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-on-eks')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/hosted-kubernetes/install-SuperKubenetes-on-do/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-on-do')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/hosted-kubernetes/install-SuperKubenetes-on-gke/"
                      activeStyle={activeStyle}
                    >
                      {t('install-SuperKubenetes-on-gke')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Installing on On-premises Kubernetes')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/installing-on-kubernetes/on-prem-kubernetes/install-ks-on-linux-airgapped/"
                      activeStyle={activeStyle}
                    >
                      {t('install-ks-on-linux-airgapped')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/installing-on-kubernetes/uninstall-SuperKubenetes-from-k8s/"
                  activeStyle={activeStyle}
                >
                  {t('uninstall-SuperKubenetes-from-k8s')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('multicluster-management')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Introduction')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/introduction/overview/"
                      activeStyle={activeStyle}
                    >
                      {t('overview')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/introduction/kubefed-in-SuperKubenetes/"
                      activeStyle={activeStyle}
                    >
                      {t('kubefed-in-SuperKubenetes')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>
                    {t('Enable Multi-cluster Management in Super Kubenetes')}
                  </span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/enable-multicluster/direct-connection/"
                      activeStyle={activeStyle}
                    >
                      {t('direct-connection')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/enable-multicluster/agent-connection/"
                      activeStyle={activeStyle}
                    >
                      {t('agent-connection')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/enable-multicluster/retrieve-kubeconfig/"
                      activeStyle={activeStyle}
                    >
                      {t('retrieve-kubeconfig')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/enable-multicluster/update-kubeconfig/"
                      activeStyle={activeStyle}
                    >
                      {t('update-kubeconfig')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Import Cloud-hosted Kubernetes Clusters')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/import-cloud-hosted-k8s/import-aws-eks/"
                      activeStyle={activeStyle}
                    >
                      {t('import-aws-eks')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/multicluster-management/import-cloud-hosted-k8s/import-gke/"
                      activeStyle={activeStyle}
                    >
                      {t('import-gke')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/multicluster-management/unbind-cluster/"
                  activeStyle={activeStyle}
                >
                  {t('unbind-cluster')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('Enable Pluggable Components')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/overview/"
                  activeStyle={activeStyle}
                >
                  {t('overview')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/app-store/"
                  activeStyle={activeStyle}
                >
                  {t('app-store')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/devops/"
                  activeStyle={activeStyle}
                >
                  {t('Super Kubenetes DevOps System')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/logging/"
                  activeStyle={activeStyle}
                >
                  {t('Super Kubenetes Logging System')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/events/"
                  activeStyle={activeStyle}
                >
                  {t('Super Kubenetes Events')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/alerting/"
                  activeStyle={activeStyle}
                >
                  {t('Super Kubenetes Alerting')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/auditing-logs/"
                  activeStyle={activeStyle}
                >
                  {t('auditing-logs')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/service-mesh/"
                  activeStyle={activeStyle}
                >
                  {t('service-mesh')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/network-policy/"
                  activeStyle={activeStyle}
                >
                  {t('network-policy')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/metrics-server/"
                  activeStyle={activeStyle}
                >
                  {t('metrics-server')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/service-topology/"
                  activeStyle={activeStyle}
                >
                  {t('service-topology')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/pod-ip-pools/"
                  activeStyle={activeStyle}
                >
                  {t('pod-ip-pools')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/kubeedge/"
                  activeStyle={activeStyle}
                >
                  {t('kubeedge')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/pluggable-components/uninstall-pluggable-components/"
                  activeStyle={activeStyle}
                >
                  {t('uninstall-pluggable-components')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('upgrade')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink to="/docs/upgrade/overview/" activeStyle={activeStyle}>
                  {t('overview')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/upgrade/upgrade-with-kubekey/"
                  activeStyle={activeStyle}
                >
                  {t('upgrade-with-kubekey')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/upgrade/upgrade-with-ks-installer/"
                  activeStyle={activeStyle}
                >
                  {t('upgrade-with-ks-installer')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/upgrade/air-gapped-upgrade-with-kubekey/"
                  activeStyle={activeStyle}
                >
                  {t('air-gapped-upgrade-with-kubekey')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/upgrade/air-gapped-upgrade-with-ks-installer/"
                  activeStyle={activeStyle}
                >
                  {t('air-gapped-upgrade-with-ks-installer')}
                </NavLink>
              </li>
              {/* <li className={styles['list']}>
                <NavLink
                  to="/docs/upgrade/what-changed/"
                  activeStyle={activeStyle}
                >
                  {t('what-changed')}
                </NavLink>
              </li> */}
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('cluster-administration')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/nodes/"
                  activeStyle={activeStyle}
                >
                  {t('nodes')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/cluster-status-monitoring/"
                  activeStyle={activeStyle}
                >
                  {t('cluster-status-monitoring')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/application-resources-monitoring/"
                  activeStyle={activeStyle}
                >
                  {t('application-resources-monitoring')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Cluster-wide Alerting and Notification')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/cluster-wide-alerting-and-notification/alertmanager/"
                      activeStyle={activeStyle}
                    >
                      {t('alertmanager')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/cluster-wide-alerting-and-notification/alerting-policy/"
                      activeStyle={activeStyle}
                    >
                      {t('alerting-policy')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/cluster-wide-alerting-and-notification/alerting-message/"
                      activeStyle={activeStyle}
                    >
                      {t('alerting-message')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Cluster Settings')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/cluster-settings/cluster-visibility-and-authorization/"
                      activeStyle={activeStyle}
                    >
                      {t('cluster-visibility-and-authorization')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Log Receivers')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/cluster-settings/log-collections/introduction/"
                          activeStyle={activeStyle}
                        >
                          {t('introduction')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/cluster-settings/log-collections/add-es-as-receiver/"
                          activeStyle={activeStyle}
                        >
                          {t('add-es-as-receiver')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/cluster-settings/log-collections/add-kafka-as-receiver/"
                          activeStyle={activeStyle}
                        >
                          {t('add-kafka-as-receiver')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/cluster-settings/log-collections/add-fluentd-as-receiver/"
                          activeStyle={activeStyle}
                        >
                          {t('add-fluentd-as-receiver')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/cluster-settings/cluster-gateway/"
                      activeStyle={activeStyle}
                    >
                      {t('cluster-gateway')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Platform Settings')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/cluster-administration/platform-settings/customize-basic-information/"
                      activeStyle={activeStyle}
                    >
                      {t('customize-basic-information')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Notification Management')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/platform-settings/notification-management/customize-cluster-name/"
                          activeStyle={activeStyle}
                        >
                          {t('customize-cluster-name')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/platform-settings/notification-management/configure-email/"
                          activeStyle={activeStyle}
                        >
                          {t('configure-email')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/platform-settings/notification-management/configure-slack/"
                          activeStyle={activeStyle}
                        >
                          {t('configure-slack')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/cluster-administration/platform-settings/notification-management/configure-webhook/"
                          activeStyle={activeStyle}
                        >
                          {t('configure-webhook')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/shut-down-and-restart-cluster-gracefully/"
                  activeStyle={activeStyle}
                >
                  {t('shut-down-and-restart-cluster-gracefully')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/storageclass/"
                  activeStyle={activeStyle}
                >
                  {t('storageclass')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/cluster-administration/snapshotclass/"
                  activeStyle={activeStyle}
                >
                  {t('snapshotclass')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('workspace-administration')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/what-is-workspace/"
                  activeStyle={activeStyle}
                >
                  {t('what-is-workspace')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/upload-helm-based-application/"
                  activeStyle={activeStyle}
                >
                  {t('upload-helm-based-application')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('App Repositories')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/workspace-administration/app-repository/import-helm-repository/"
                      activeStyle={activeStyle}
                    >
                      {t('import-helm-repository')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/workspace-administration/app-repository/upload-app-to-public-repository/"
                      activeStyle={activeStyle}
                    >
                      {t('upload-app-to-public-repository')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/role-and-member-management/"
                  activeStyle={activeStyle}
                >
                  {t('workspace-role-and-member-management')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/workspace-network-isolation/"
                  activeStyle={activeStyle}
                >
                  {t('workspace-network-isolation')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/project-quotas/"
                  activeStyle={activeStyle}
                >
                  {t('project-quotas')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/workspace-quotas/"
                  activeStyle={activeStyle}
                >
                  {t('workspace-quotas')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/workspace-administration/department-management/"
                  activeStyle={activeStyle}
                >
                  {t('department-management')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('project-user-guide')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('application')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application/app-template/"
                      activeStyle={activeStyle}
                    >
                      {t('app-template')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application/deploy-app-from-template/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-app-from-template')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application/deploy-app-from-appstore/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-app-from-appstore')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application/compose-app/"
                      activeStyle={activeStyle}
                    >
                      {t('compose-app')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Application Workloads')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/deployments/"
                      activeStyle={activeStyle}
                    >
                      {t('deployments')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/statefulsets/"
                      activeStyle={activeStyle}
                    >
                      {t('statefulsets')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/daemonsets/"
                      activeStyle={activeStyle}
                    >
                      {t('daemonsets')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/services/"
                      activeStyle={activeStyle}
                    >
                      {t('services')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/jobs/"
                      activeStyle={activeStyle}
                    >
                      {t('jobs')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/cronjobs/"
                      activeStyle={activeStyle}
                    >
                      {t('cronjobs')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/routes/"
                      activeStyle={activeStyle}
                    >
                      {t('routes')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/container-image-settings/"
                      activeStyle={activeStyle}
                    >
                      {t('container-image-settings')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/application-workloads/horizontal-pod-autoscaling/"
                      activeStyle={activeStyle}
                    >
                      {t('horizontal-pod-autoscaling')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Volume Management')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/volume-management/persistent-volume-claims/"
                      activeStyle={activeStyle}
                    >
                      {t('Persistent Volume Claims')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/volume-management/volume-snapshots/"
                      activeStyle={activeStyle}
                    >
                      {t('volume-snapshots')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Configuration')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/configuration/secrets/"
                      activeStyle={activeStyle}
                    >
                      {t('secrets')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/configuration/configmaps/"
                      activeStyle={activeStyle}
                    >
                      {t('configmaps')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/configuration/image-registry/"
                      activeStyle={activeStyle}
                    >
                      {t('image-registry')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/configuration/serviceaccounts/"
                      activeStyle={activeStyle}
                    >
                      {t('serviceaccounts')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('grayscale-release')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/grayscale-release/overview/"
                      activeStyle={activeStyle}
                    >
                      {t('overview')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/grayscale-release/blue-green-deployment/"
                      activeStyle={activeStyle}
                    >
                      {t('blue-green-deployment')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink to="/docs/project-user-guide/grayscale-release/canary-release/">
                      {t('canary-release')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/grayscale-release/traffic-mirroring/"
                      activeStyle={activeStyle}
                    >
                      {t('traffic-mirroring')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Image Builder')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/image-builder/source-to-image/"
                      activeStyle={activeStyle}
                    >
                      {t('source-to-image')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/image-builder/binary-to-image/"
                      activeStyle={activeStyle}
                    >
                      {t('binary-to-image')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/image-builder/s2i-introduction/"
                      activeStyle={activeStyle}
                    >
                      {t('s2i-introduction')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/image-builder/s2i-templates/"
                      activeStyle={activeStyle}
                    >
                      {t('s2i-templates')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/image-builder/s2i-and-b2i-webhooks/"
                      activeStyle={activeStyle}
                    >
                      {t('s2i-and-b2i-webhooks')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Alerting')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/alerting/alerting-policy/"
                      activeStyle={activeStyle}
                    >
                      {t('alerting-policy')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/alerting/alerting-message/"
                      activeStyle={activeStyle}
                    >
                      {t('alerting-message')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Custom Application Monitoring')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/project-user-guide/custom-application-monitoring/introduction/"
                      activeStyle={activeStyle}
                    >
                      {t('Introduction')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Examples')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/project-user-guide/custom-application-monitoring/examples/monitor-mysql/"
                          activeStyle={activeStyle}
                        >
                          {t('monitor-mysql')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/project-user-guide/custom-application-monitoring/examples/monitor-sample-web/"
                          activeStyle={activeStyle}
                        >
                          {t('monitor-sample-web')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Visualization')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/project-user-guide/custom-application-monitoring/visualization/overview/"
                          activeStyle={activeStyle}
                        >
                          {t('overview')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/project-user-guide/custom-application-monitoring/visualization/panel/"
                          activeStyle={activeStyle}
                        >
                          {t('panel')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/project-user-guide/custom-application-monitoring/visualization/querying/"
                          activeStyle={activeStyle}
                        >
                          {t('querying')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('devops-user-guide')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Understand and Manage DevOps Projects')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/devops-overview/overview/"
                      activeStyle={activeStyle}
                    >
                      {t('overview')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/devops-overview/devops-project-management/"
                      activeStyle={activeStyle}
                    >
                      {t('devops-project-management')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Use DevOps')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Pipelines')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/create-a-pipeline-using-graphical-editing-panel/"
                          activeStyle={activeStyle}
                        >
                          {t('create-a-pipeline-using-graphical-editing-panel')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/create-a-pipeline-using-jenkinsfile/"
                          activeStyle={activeStyle}
                        >
                          {t('create-a-pipeline-using-jenkinsfile')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/use-pipeline-templates/"
                          activeStyle={activeStyle}
                        >
                          {t('use-pipeline-templates')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/pipeline-settings/"
                          activeStyle={activeStyle}
                        >
                          {t('pipeline-settings')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/gitlab-multibranch-pipeline/"
                          activeStyle={activeStyle}
                        >
                          {t('gitlab-multibranch-pipeline')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/jenkins-setting/"
                          activeStyle={activeStyle}
                        >
                          {t('jenkins-setting')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/jenkins-shared-library/"
                          activeStyle={activeStyle}
                        >
                          {t('jenkins-shared-library')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/jenkins-email/"
                          activeStyle={activeStyle}
                        >
                          {t('jenkins-email')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/pipeline-webhook/"
                          activeStyle={activeStyle}
                        >
                          {t('pipeline-webhook')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/choose-jenkins-agent/"
                          activeStyle={activeStyle}
                        >
                          {t('choose-jenkins-agent')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/pipelines/customize-jenkins-agent/"
                          activeStyle={activeStyle}
                        >
                          {t('customize-jenkins-agent')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('Continuous Deployments')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/continuous-deployments/use-gitops-for-continous-deployment/"
                          activeStyle={activeStyle}
                        >
                          {t('use-gitops-for-continous-deployment')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('code-repositories')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/code-repositories/import-code-repositories/"
                          activeStyle={activeStyle}
                        >
                          {t('import-code-repositories')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['list']}>
                    <p onClick={this.handleClick} className={['list-title']}>
                      <span className={styles['arrow']}></span>
                      <span>{t('devops-settings')}</span>
                    </p>
                    <ul>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/devops-settings/credential-management/"
                          activeStyle={activeStyle}
                        >
                          {t('credential-management')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/devops-settings/role-and-member-management/"
                          activeStyle={activeStyle}
                        >
                          {t('role-and-member-management')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/devops-settings/add-cd-allowlist/"
                          activeStyle={activeStyle}
                        >
                          {t('add-cd-allowlist')}
                        </NavLink>
                      </li>
                      <li className={styles['list']}>
                        <NavLink
                          to="/docs/devops-user-guide/how-to-use/devops-settings/set-ci-node/"
                          activeStyle={activeStyle}
                        >
                          {t('set-ci-node')}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Tool Integration')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/how-to-integrate/sonarqube/"
                      activeStyle={activeStyle}
                    >
                      {t('sonarqube')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/how-to-integrate/harbor/"
                      activeStyle={activeStyle}
                    >
                      {t('harbor')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Examples')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/examples/go-project-pipeline/"
                      activeStyle={activeStyle}
                    >
                      {t('go-project-pipeline')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/examples/multi-cluster-project-example/"
                      activeStyle={activeStyle}
                    >
                      {t('multi-cluster-project-example')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/examples/a-maven-project/"
                      activeStyle={activeStyle}
                    >
                      {t('a-maven-project')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/examples/create-multi-cluster-pipeline/"
                      activeStyle={activeStyle}
                    >
                      {t('create-multi-cluster-pipeline')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/devops-user-guide/examples/use-nexus-in-pipelines/"
                      activeStyle={activeStyle}
                    >
                      {t('use-nexus-in-pipelines')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('backup-guide')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/backup-guide/kasten-backup-restore/"
                  activeStyle={activeStyle}
                >
                  {t('kasten-backup-restore')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('Access Control and Account Management')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/access-control-and-account-management/multi-tenancy-in-/"
                  activeStyle={activeStyle}
                >
                  {t('multi-tenancy-in-')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('External Authentication')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/access-control-and-account-management/external-authentication/set-up-external-authentication/"
                      activeStyle={activeStyle}
                    >
                      {t('set-up-external-authentication')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/access-control-and-account-management/external-authentication/use-an-ldap-service/"
                      activeStyle={activeStyle}
                    >
                      {t('use-an-ldap-service')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/access-control-and-account-management/external-authentication/oidc-identity-provider/"
                      activeStyle={activeStyle}
                    >
                      {t('oidc-identity-provider')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/access-control-and-account-management/external-authentication/use-an-oauth2-identity-provider/"
                      activeStyle={activeStyle}
                    >
                      {t('use-an-oauth2-identity-provider')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('project-administration')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/project-and-multicluster-project/"
                  activeStyle={activeStyle}
                >
                  {t('project-and-multicluster-project')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/role-and-member-management/"
                  activeStyle={activeStyle}
                >
                  {t('project-role-and-member-management')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/project-network-isolation/"
                  activeStyle={activeStyle}
                >
                  {t('project-network-isolation')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/container-limit-ranges/"
                  activeStyle={activeStyle}
                >
                  {t('container-limit-ranges')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/project-gateway/"
                  activeStyle={activeStyle}
                >
                  {t('project-gateway')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/project-administration/disk-log-collection/"
                  activeStyle={activeStyle}
                >
                  {t('disk-log-collection')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('application-store')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/application-store/app-lifecycle-management/"
                  activeStyle={activeStyle}
                >
                  {t('app-lifecycle-management')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('built-in-apps')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/etcd-app/"
                      activeStyle={activeStyle}
                    >
                      {t('etcd-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/harbor-app/"
                      activeStyle={activeStyle}
                    >
                      {t('harbor-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/memcached-app/"
                      activeStyle={activeStyle}
                    >
                      {t('memcached-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/meshery-app/"
                      activeStyle={activeStyle}
                    >
                      {t('meshery-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/minio-app/"
                      activeStyle={activeStyle}
                    >
                      {t('minio-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/mongodb-app/"
                      activeStyle={activeStyle}
                    >
                      {t('mongodb-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/mysql-app/"
                      activeStyle={activeStyle}
                    >
                      {t('mysql-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/nginx-app/"
                      activeStyle={activeStyle}
                    >
                      {t('nginx-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/postgresql-app/"
                      activeStyle={activeStyle}
                    >
                      {t('postgresql-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/rabbitmq-app/"
                      activeStyle={activeStyle}
                    >
                      {t('rabbitmq-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/redis-app/"
                      activeStyle={activeStyle}
                    >
                      {t('redis-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/tomcat-app/"
                      activeStyle={activeStyle}
                    >
                      {t('tomcat-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/radondb-mysql-app/"
                      activeStyle={activeStyle}
                    >
                      {t('radondb-mysql-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/radondb-postgresql-app/"
                      activeStyle={activeStyle}
                    >
                      {t('radondb-postgresql-app')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/built-in-apps/deploy-chaos-mesh/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-chaos-mesh')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('external-apps')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/external-apps/deploy-gitlab/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-gitlab')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/external-apps/deploy-tidb/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-tidb')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/external-apps/deploy-metersphere/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-metersphere')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/external-apps/deploy-clickhouse/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-clickhouse')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/external-apps/deploy-radondb-mysql/"
                      activeStyle={activeStyle}
                    >
                      {t('deploy-radondb-mysql')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('app-developer-guide')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/app-developer-guide/helm-developer-guide/"
                      activeStyle={activeStyle}
                    >
                      {t('helm-developer-guide')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/application-store/app-developer-guide/helm-specification/"
                      activeStyle={activeStyle}
                    >
                      {t('helm-specification')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('toolbox')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/toolbox/log-query/"
                  activeStyle={activeStyle}
                >
                  {t('log-query')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/toolbox/events-query/"
                  activeStyle={activeStyle}
                >
                  {t('events-query')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Auditing')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/toolbox/auditing/auditing-receive-customize/"
                      activeStyle={activeStyle}
                    >
                      {t('auditing-receive-customize')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/toolbox/auditing/auditing-rule/"
                      activeStyle={activeStyle}
                    >
                      {t('auditing-rule')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/toolbox/auditing/auditing-query/"
                      activeStyle={activeStyle}
                    >
                      {t('auditing-query')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('metering-and-billing')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/toolbox/metering-and-billing/view-resource-consumption/"
                      activeStyle={activeStyle}
                    >
                      {t('view-resource-consumption')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/toolbox/metering-and-billing/enable-billing/"
                      activeStyle={activeStyle}
                    >
                      {t('enable-billing')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/toolbox/web-kubectl/"
                  activeStyle={activeStyle}
                >
                  {t('web-kubectl')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('FAQ')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('installation')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/installation/configure-booster/"
                      activeStyle={activeStyle}
                    >
                      {t('configure-booster')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/installation/telemetry/"
                      activeStyle={activeStyle}
                    >
                      {t('telemetry')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/installation/install-addon-through-yaml-using-kubekey/"
                      activeStyle={activeStyle}
                    >
                      {t('install-addon-through-yaml-using-kubekey')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/installation/ssh-connection-failure/"
                      activeStyle={activeStyle}
                    >
                      {t('ssh-connection-failure')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Observability FAQ')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/observability/logging/"
                      activeStyle={activeStyle}
                    >
                      {t('logging')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/observability/monitoring/"
                      activeStyle={activeStyle}
                    >
                      {t('monitoring')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/observability/byop/"
                      activeStyle={activeStyle}
                    >
                      {t('byop')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Access Control and Account Management FAQ')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/access-control/forgot-password/"
                      activeStyle={activeStyle}
                    >
                      {t('forgot-password')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/access-control/session-timeout/"
                      activeStyle={activeStyle}
                    >
                      {t('session-timeout')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/access-control/add-kubernetes-namespace-to--workspace/"
                      activeStyle={activeStyle}
                    >
                      {t('add-kubernetes-namespace-to--workspace')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/access-control/cannot-login/"
                      activeStyle={activeStyle}
                    >
                      {t('cannot-login')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t(' Web Console')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/console/console-web-browser/"
                      activeStyle={activeStyle}
                    >
                      {t('console-web-browser')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/console/edit-resources-in-system-workspace/"
                      activeStyle={activeStyle}
                    >
                      {t('edit-resources-in-system-workspace')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/console/change-console-language/"
                      activeStyle={activeStyle}
                    >
                      {t('change-console-language')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('multi-cluster-management')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/multi-cluster-management/manage-multi-cluster/"
                      activeStyle={activeStyle}
                    >
                      {t('manage-multi-cluster')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/multi-cluster-management/host-cluster-access-member-cluster/"
                      activeStyle={activeStyle}
                    >
                      {t('host-cluster-access-member-cluster')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('DevOps')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/devops/install-jenkins-plugins/"
                      activeStyle={activeStyle}
                    >
                      {t('install-jenkins-plugins')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/devops/create-devops-kubeconfig-on-aws/"
                      activeStyle={activeStyle}
                    >
                      {t('create-devops-kubeconfig-on-aws')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Applications')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/faq/applications/remove-built-in-apps/"
                      activeStyle={activeStyle}
                    >
                      {t('remove-built-in-apps')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={styles['list']}>
            <p onClick={this.handleClick} className={['list-title']}>
              <span className={styles['arrow']}></span>
              <span>{t('Reference')}</span>
            </p>
            <ul>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/reference/glossary/"
                  activeStyle={activeStyle}
                >
                  {t('glossary')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/reference/api-docs/"
                  activeStyle={activeStyle}
                >
                  {t('api-docs')}
                </NavLink>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('API Changes')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/reference/api-changes/logging/"
                      activeStyle={activeStyle}
                    >
                      {t('logging')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/reference/api-changes/monitoring/"
                      activeStyle={activeStyle}
                    >
                      {t('monitoring')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/reference/api-changes/notification/"
                      activeStyle={activeStyle}
                    >
                      {t('notification')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <p onClick={this.handleClick} className={['list-title']}>
                  <span className={styles['arrow']}></span>
                  <span>{t('Storage System Installation')}</span>
                </p>
                <ul>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/reference/storage-system-installation/nfs-server/"
                      activeStyle={activeStyle}
                    >
                      {t('nfs-server')}
                    </NavLink>
                  </li>
                  <li className={styles['list']}>
                    <NavLink
                      to="/docs/reference/storage-system-installation/glusterfs-server/"
                      activeStyle={activeStyle}
                    >
                      {t('glusterfs-server')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={styles['list']}>
                <NavLink
                  to="/docs/reference/environment-requirements/"
                  activeStyle={activeStyle}
                >
                  {t('environment-requirements')}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}
