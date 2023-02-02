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
import { Link } from 'react-router-dom'

import Banner from 'components/Cards/Banner'
import { withClusterList, ListPage } from 'components/HOCs/withList'
import StatusReason from 'projects/components/StatusReason'
import { CircularProgress, Typography } from '@mui/material'

import { PODS_STATUS } from 'utils/constants'

import PodStore from 'stores/pod'

import MUIDataTable from 'mui-datatables'
import { toJS } from 'mobx'
import moment from 'moment-mini'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import SplitButton from './ItemDropdown'

@withClusterList({
  store: new PodStore(),
  module: 'pods',
  name: 'POD',
  rowKey: 'uid',
})
export default class Pods extends React.Component {
  state = {
    page: 1,
    count: 1,
    rowsPerPage: 10,
    isLoading: false,
  }

  async componentWillMount() {
    await this.props.store.fetchList({ page: 1, limit: this.state.rowsPerPage })
  }

  componentDidMount() {
    localStorage.setItem('pod-detail-referrer', location.pathname)
  }

  get itemActions() {
    const { getData, name, trigger } = this.props
    return [
      {
        key: 'viewYaml',
        icon: 'eye',
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            readOnly: true,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: getData,
          }),
      },
    ]
  }

  getItemDesc = record => {
    const { status, type } = record.podStatus
    const desc =
      type !== 'running' && type !== 'completed' ? (
        <StatusReason
          status={type}
          reason={t(status)}
          data={record}
          type="pod"
        />
      ) : (
        t(type.toUpperCase())
      )

    return desc
  }

  getPodsStatus() {
    return PODS_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  // getColumns = () => {
  //   const { getSortOrder } = this.props
  //   return [
  //     {
  //       title: t('NAME'),
  //       dataIndex: 'name',
  //       sorter: true,
  //       sortOrder: getSortOrder('name'),
  //       search: true,
  //       render: this.renderAvatar,
  //     },
  //     {
  //       title: t('STATUS'),
  //       dataIndex: 'status',
  //       filters: this.getPodsStatus(),
  //       isHideable: true,
  //       search: true,
  //       with: '5%',
  //       render: (_, { podStatus }) => (
  //         <span>{t(podStatus.type.toUpperCase())}</span>
  //       ),
  //     },
  //     {
  //       title: t('NODE_SI'),
  //       dataIndex: 'node',
  //       isHideable: true,
  //       width: '18%',
  //       render: this.renderNode,
  //     },
  //     {
  //       title: t('POD_IP_ADDRESS'),
  //       dataIndex: 'podIp',
  //       isHideable: true,
  //       width: '15%',
  //     },
  //     {
  //       title: t('UPDATE_TIME_TCAP'),
  //       dataIndex: 'startTime',
  //       sorter: true,
  //       sortOrder: getSortOrder('startTime'),
  //       isHideable: true,
  //       width: 150,
  //       render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
  //     },
  //   ]
  // }
  //
  // renderAvatar = (name, record) => {
  //   const { module } = this.props
  //   const { cluster } = this.props.match.params
  //   const { podStatus } = record
  //   return (
  //     <div className={styles.avatar}>
  //       <div className={styles.icon}>
  //         <Icon name={ICON_TYPES[module]} size={40} />
  //         <Indicator
  //           className={styles.indicator}
  //           type={podStatus.type}
  //           flicker
  //         />
  //       </div>
  //       <div>
  //         <Link
  //           className={styles.title}
  //           to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
  //         >
  //           {name}
  //         </Link>
  //         <div className={styles.desc}>{this.getItemDesc(record)}</div>
  //       </div>
  //     </div>
  //   )
  // }

  renderNode = (_, record) => {
    const { cluster } = this.props.match.params
    const { node, nodeIp } = record

    if (!node) return '-'

    const text = t('NODE_IP', { node, ip: nodeIp })

    return <Link to={`/clusters/${cluster}/nodes/${node}`}>{text}</Link>
  }

  renderStatus = podStatus => (
    <Status type={podStatus.type} name={t(podStatus.type)} flicker />
  )

  getData = async page => {
    this.setState({
      isLoading: true,
    })
    await this.props.store
      .fetchList({ page, limit: this.state.rowsPerPage })
      .then(() => {
        this.setState({
          isLoading: false,
          page,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          page,
        })
      })
  }

  render() {
    const { isLoading, sortOrder } = this.state
    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
          customBodyRender: name => {
            return (
              <Link
                to={`/clusters/default/projects/kubesphere-devops-system/pods/${name}/resource-status`}
              >
                {name}
              </Link>
            )
          },
        },
      },
      {
        name: 'status.phase',
        label: 'Status',
        options: {
          filter: true,
          customBodyRender: status => {
            return <Link to={``}>{status}</Link>
          },
        },
      },
      {
        name: 'node',
        label: 'Node',
        options: {
          filter: true,
          customBodyRender: node => {
            return <Link to={``}>{node}</Link>
          },
        },
      },
      {
        name: 'nodeIp',
        label: 'Pod IP Address',
        options: {
          filter: true,
          customBodyRender: nodeIp => {
            return <Link to={``}>{nodeIp}</Link>
          },
        },
      },
      {
        name: 'createTime',
        label: 'Update Time',
        options: {
          filter: true,
          customBodyRender: updateTime => {
            return (
              <Link to={``}>
                {moment(updateTime).format('YYYY-MM-DD h:mm:ss')}
              </Link>
            )
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
          customBodyRender: (value, tableMeta) => {
            // console.log('value',value)
            // console.log('tableMeta',tableMeta)
            return (
              <SplitButton
                options={[
                  {
                    icon: <VisibilityIcon fontSize="small" />,
                    title: 'View YAML',
                    action: () => {
                      this.props.trigger('resource.yaml.edit', {
                        detail: tableMeta.rowData,
                        readOnly: true,
                      })
                    },
                  },
                  {
                    icon: <DeleteIcon fontSize="small" />,
                    title: 'Delete pods',
                    action: () => {
                      // this.props.trigger('workloads.pods.delete', {
                      //   store: this.props.store,
                      //   item: tableMeta.rowData,
                      //   success: this.props.getData(),
                      // })
                      this.props.trigger('resource.delete', {
                        type: tableMeta.rowData.name,
                        detail: tableMeta.rowData,
                        success: this.props.getData(),
                      })
                    },
                  },
                ]}
              />
            )
          },
        },
      },
    ]

    const data = toJS(this.props.store.list.data)
    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: true,
      page: this.state.page,
      count: this.props.store.list.total,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [],
      sortOrder,
      enableNestedDataAccess: '.',
      onTableChange: (action, tableState) => {
        // console.log(action, tableState)
        switch (action) {
          case 'changePage':
            this.getData(tableState.page, tableState.sortOrder)
            break
          case 'sort':
            this.sort(tableState.page, tableState.sortOrder)
            break
          default:
          // console.log('action not handled.')
        }
      },
    }

    const { bannerProps } = this.props
    return (
      // <ListPage {...this.props}>
      //   <Banner {...bannerProps} />
      //   <ResourceTable
      //     {...tableProps}
      //     itemActions={this.itemActions}
      //     columns={this.getColumns()}
      //     hideColumn={['status']}
      //     onCreate={null}
      //     cluster={match.params.cluster}
      //   />
      // </ListPage>
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <MUIDataTable
          // title={''}
          title={
            <Typography variant="h6">
              ACME Employee list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: 'relative', top: 4 }}
                />
              )}
            </Typography>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </ListPage>
    )
  }
}
