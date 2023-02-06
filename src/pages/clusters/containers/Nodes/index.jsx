/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { isEmpty, get } from 'lodash'
import { toJS } from 'mobx'
import { Tooltip, Icon } from '@kube-design/components'

import { cpuFormat, memoryFormat } from 'utils'
import { ICON_TYPES, NODE_STATUS } from 'utils/constants'
import { getNodeStatus } from 'utils/node'
import { getValueByUnit } from 'utils/monitoring'
import NodeStore from 'stores/node'
import NodeMonitoringStore from 'stores/monitoring/node'
import KubeCtlModal from 'components/Modals/KubeCtl'

import { withClusterList, ListPage } from 'components/HOCs/withList'

import { Avatar, Status, Panel, Text, Modal } from 'components/Base'

import Banner from 'components/Cards/Banner'

import MUIDataTable from 'mui-datatables'
import TerminalIcon from '@mui/icons-material/Terminal'
import DeleteIcon from '@mui/icons-material/Delete'
import StopCircle from '@mui/icons-material/StopCircle'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SplitButton from './ItemDropdown'
import CustomButton from './Button'

import styles from './index.scss'

const MetricTypes = {
  cpu_used: 'node_cpu_usage',
  cpu_total: 'node_cpu_total',
  cpu_utilisation: 'node_cpu_utilisation',
  memory_used: 'node_memory_usage_wo_cache',
  memory_total: 'node_memory_total',
  memory_utilisation: 'node_memory_utilisation',
  pod_used: 'node_pod_running_count',
  pod_total: 'node_pod_quota',
}

@withClusterList({
  store: new NodeStore(),
  name: 'CLUSTER_NODE',
  module: 'nodes',
})
export default class Nodes extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 10,
  }

  store = this.props.store

  monitoringStore = new NodeMonitoringStore({ cluster: this.cluster })

  componentDidMount() {
    this.store.fetchCount(this.props.match.params)
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get tips() {
    return [
      {
        title: t('NODE_TYPES_Q'),
        description: t('NODE_TYPES_A'),
      },
      {
        title: t('WHAT_IS_NODE_TAINTS_Q'),
        description: t('WHAT_IS_NODE_TAINTS_A'),
      },
    ]
  }

  getData = async params => {
    await this.store.fetchList({
      ...params,
      ...this.props.match.params,
      page: this.state.page + 1,
      limit: this.state.rowsPerPage,
    })

    await this.monitoringStore.fetchMetrics({
      ...this.props.match.params,
      resources: this.store.list.data.map(node => node.name),
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  getUnschedulable = record => {
    const taints = record.taints

    return taints.some(
      taint => taint.key === 'node.kubernetes.io/unschedulable'
    )
  }

  getReady = record => {
    const conditions = record.conditions

    return conditions.some(
      condition => condition.type === 'Ready' && condition.status === 'True'
    )
  }

  handleOpenTerminal = record => {
    const modal = Modal.open({
      onOk: () => {
        Modal.close(modal)
      },
      modal: KubeCtlModal,
      cluster: this.cluster,
      title: record.name,
      nodename: record.name,
      isEdgeNode: true,
    })
  }

  getLastValue = (node, type, unit) => {
    const metricsData = this.monitoringStore.data
    const result = get(metricsData[type], 'data.result') || []
    const metrics = result.find(item => get(item, 'metric.node') === node.name)
    return getValueByUnit(get(metrics, 'value[1]', 0), unit)
  }

  getRecordMetrics = (record, configs) => {
    const metrics = {}
    configs.forEach(cfg => {
      metrics[cfg.type] = parseFloat(
        this.getLastValue(record, MetricTypes[cfg.type], cfg.unit)
      )
    })
    return metrics
  }

  renderTaintsTip = data => (
    <div>
      <div>{t('TAINTS')}:</div>
      <div>
        {data.map(item => {
          const text = `${item.key}=${item.value || ''}:${item.effect}`
          return <div key={text}>{text}</div>
        })}
      </div>
    </div>
  )

  getStatus() {
    return NODE_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getRoles() {
    return [
      {
        text: t('CONTROL_PLANE'),
        value: 'master',
      },
      {
        text: t('WORKER'),
        value: 'worker',
      },
    ]
  }

  renderCPUTooltip = record => {
    const content = (
      <p>
        {cpuFormat(
          get(record, 'annotations["node.kubesphere.io/cpu-limits"]')
        ) === 1
          ? t('CPU_LIMIT_SI', {
              core: cpuFormat(
                get(record, 'annotations["node.kubesphere.io/cpu-limits"]')
              ),
              percent: get(
                record,
                'annotations["node.kubesphere.io/cpu-limits-fraction"]'
              ),
            })
          : t('CPU_LIMIT_PL', {
              core: cpuFormat(
                get(record, 'annotations["node.kubesphere.io/cpu-limits"]')
              ),
              percent: get(
                record,
                'annotations["node.kubesphere.io/cpu-limits-fraction"]'
              ),
            })}
      </p>
    )
    return (
      <Tooltip content={content} placement="top">
        <Text
          title={
            cpuFormat(
              get(record, 'annotations["node.kubesphere.io/cpu-requests"]')
            ) === 1
              ? t('CPU_REQUEST_SI', {
                  core: cpuFormat(
                    get(
                      record,
                      'annotations["node.kubesphere.io/cpu-requests"]'
                    )
                  ),
                  percent: get(
                    record,
                    'annotations["node.kubesphere.io/cpu-requests-fraction"]'
                  ),
                })
              : t('CPU_REQUEST_PL', {
                  core: cpuFormat(
                    get(
                      record,
                      'annotations["node.kubesphere.io/cpu-requests"]'
                    )
                  ),
                  percent: get(
                    record,
                    'annotations["node.kubesphere.io/cpu-requests-fraction"]'
                  ),
                })
          }
          description={t('RESOURCE_REQUEST')}
        />
      </Tooltip>
    )
  }

  renderMemoryTooltip = record => {
    const content = (
      <p>
        {t('MEMORY_LIMIT_VALUE', {
          gib: memoryFormat(
            get(record, 'annotations["node.kubesphere.io/memory-limits"]'),
            'Gi'
          ),
          percent: get(
            record,
            'annotations["node.kubesphere.io/memory-limits-fraction"]'
          ),
        })}
      </p>
    )
    return (
      <Tooltip content={content} placement="top">
        <Text
          title={t('MEMORY_REQUEST_VALUE', {
            gib: memoryFormat(
              get(record, 'annotations["node.kubesphere.io/memory-requests"]'),
              'Gi'
            ),
            percent: get(
              record,
              'annotations["node.kubesphere.io/memory-requests-fraction"]'
            ),
          })}
          description={t('RESOURCE_REQUEST')}
        />
      </Tooltip>
    )
  }

  renderOverview() {
    const { masterNum, list } = this.store
    const totalCount = list.total
    return (
      <Panel className="margin-b12">
        <div className={styles.overview}>
          <Text
            icon="nodes"
            title={totalCount}
            description={totalCount === 1 ? t(`NODE_SI`) : t(`NODE_PL`)}
          />
          <Text
            title={masterNum}
            description={
              masterNum === 1 ? t('MASTER_NODE_SI') : t('MASTER_NODE_PL')
            }
          />
        </div>
      </Panel>
    )
  }

  handleEditMultiTaints = selectedRows => {
    const { routing, trigger } = this.props
    trigger('node.taint.batch', {
      success: routing.query,
      selectedRows,
    })
  }

  render() {
    const {
      bannerProps,
      module,
      prefix,
      store,
      clusterStore,
      routing,
      trigger,
      name,
    } = this.props
    const { list } = this.store
    const data = toJS(list.data)
    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            return (
              <Avatar
                icon={ICON_TYPES[module]}
                iconSize={40}
                to={
                  record.importStatus !== 'success'
                    ? null
                    : `${prefix}/${record.name}`
                }
                title={record.name}
                desc={record.ip}
              />
            )
          },
        },
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            const status = getNodeStatus(record)
            const taints = record.taints

            return (
              <div className={styles.status}>
                <Status
                  type={status}
                  name={t(`NODE_STATUS_${status.toUpperCase()}`)}
                />
                {!isEmpty(taints) && record.importStatus === 'success' && (
                  <Tooltip content={this.renderTaintsTip(taints)}>
                    <span className={styles.taints}>{taints.length}</span>
                  </Tooltip>
                )}
              </div>
            )
          },
        },
      },
      {
        name: 'role',
        label: 'Role',
        options: {
          filter: true,
          sort: false,
          customBodyRender: roles =>
            roles.indexOf('master') === -1 ? t('WORKER') : t('CONTROL_PLANE'),
        },
      },
      {
        name: 'cpu_usage',
        label: 'CPU Usage',
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            const metrics = this.getRecordMetrics(record, [
              {
                type: 'cpu_used',
                unit: 'Core',
              },
              {
                type: 'cpu_total',
                unit: 'Core',
              },
              {
                type: 'cpu_utilisation',
              },
            ])

            return (
              <Text
                title={
                  <div className={styles.resource}>
                    <span>{`${Math.round(
                      metrics.cpu_utilisation * 100
                    )}%`}</span>
                    {metrics.cpu_utilisation >= 0.9 && (
                      <Icon name="exclamation" />
                    )}
                  </div>
                }
                description={`${metrics.cpu_used}/${metrics.cpu_total} ${t(
                  'CORE_PL'
                )}`}
              />
            )
          },
        },
      },
      {
        name: 'memory_usage',
        label: 'Memory Usage',
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            const metrics = this.getRecordMetrics(record, [
              {
                type: 'memory_used',
                unit: 'Gi',
              },
              {
                type: 'memory_total',
                unit: 'Gi',
              },
              {
                type: 'memory_utilisation',
              },
            ])

            return (
              <Text
                title={
                  <div className={styles.resource}>
                    <span>{`${Math.round(
                      metrics.memory_utilisation * 100
                    )}%`}</span>
                    {metrics.memory_utilisation >= 0.9 && (
                      <Icon name="exclamation" />
                    )}
                  </div>
                }
                description={`${metrics.memory_used}/${metrics.memory_total} GiB`}
              />
            )
          },
        },
      },
      {
        name: 'pods',
        label: 'Pods',
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            const metrics = this.getRecordMetrics(record, [
              {
                type: 'pod_used',
              },
              {
                type: 'pod_total',
              },
            ])
            const uitilisation = metrics.pod_total
              ? parseFloat(metrics.pod_used / metrics.pod_total)
              : 0

            return (
              <Text
                title={`${Math.round(uitilisation * 100)}%`}
                description={`${metrics.pod_used}/${metrics.pod_total}`}
              />
            )
          },
        },
      },
      {
        name: 'role',
        label: 'Allocated CPU',
        options: {
          filter: true,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            return this.renderCPUTooltip(record)
          },
        },
      },
      {
        name: 'role',
        label: 'Allocated Memory',
        options: {
          filter: true,
          sort: false,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            return this.renderMemoryTooltip(record)
          },
        },
      },
      {
        name: 'namespace',
        label: 'Actions',
        options: {
          filter: false,
          sort: false,
          download: false,
          customBodyRenderLite: dataIndex => {
            const tableMeta = data[dataIndex]
            return (
              <SplitButton
                options={[
                  {
                    icon: <PlayCircleFilledWhiteIcon fontSize="small" />,
                    title: t('UNCORDON'),
                    action: () => {
                      store.uncordon(tableMeta).then(routing.query)
                    },
                    show: () =>
                      tableMeta.importStatus === 'success' &&
                      this.getUnschedulable(tableMeta),
                  },
                  {
                    icon: <StopCircle fontSize="small" />,
                    title: t('CORDON'),
                    action: () => {
                      store.cordon(tableMeta).then(routing.query)
                    },
                    show: () =>
                      tableMeta.importStatus === 'success' &&
                      !this.getUnschedulable(tableMeta),
                  },
                  {
                    icon: <TerminalIcon fontSize="small" />,
                    title: t('OPEN_TERMINAL'),
                    action: () => {
                      this.handleOpenTerminal(tableMeta)
                    },
                    show: () =>
                      tableMeta.importStatus === 'success' &&
                      this.getReady(tableMeta),
                  },
                  {
                    icon: <VisibilityIcon fontSize="small" />,
                    title: t('VIEW_LOG'),
                    action: () => {
                      trigger('node.add.log', {
                        detail: toJS(clusterStore.detail),
                      })
                    },
                    show: () => tableMeta.importStatus !== 'success',
                  },
                  {
                    icon: <DeleteIcon fontSize="small" />,
                    title: t('DELETE'),
                    action: () => {
                      trigger('resource.delete', {
                        type: name,
                        detail: tableMeta,
                        success: routing.query,
                      })
                    },
                    show: () => tableMeta.importStatus === 'failed',
                  },
                ]}
              />
            )
          },
        },
      },
    ]
    const options = {
      filterType: 'dropdown',
      serverSide: true,
      page: this.state.page,
      count: this.props.store.list.total,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [],
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'changePage':
            this.setState({ page: tableState.page }, () => this.getData())
            break
          default:
        }
      },
      customToolbarSelect: selectedRows => (
        <div>
          <CustomButton
            onClick={() => this.handleEditMultiTaints(selectedRows)}
          />
        </div>
      ),
    }

    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          title={t('CLUSTER_NODE_PL')}
          tips={this.tips}
        />
        {this.renderOverview()}
        <MUIDataTable data={data} columns={columns} options={options} />
      </ListPage>
    )
  }
}
