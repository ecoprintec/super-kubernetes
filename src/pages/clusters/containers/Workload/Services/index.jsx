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
import { Tooltip } from '@kube-design/components'
import { Avatar, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withClusterList, ListPage } from 'components/HOCs/withList'
// import ResourceTable from 'clusters/components/ResourceTable'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, SERVICE_TYPES } from 'utils/constants'

import ServiceStore from 'stores/service'
import moment from 'moment-mini'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { CircularProgress, Typography } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import SplitButton from '../Pods/ItemDropdown'
import styles from '../Pods/index.scss'

@withClusterList({
  store: new ServiceStore(),
  module: 'services',
  name: 'SERVICE',
  rowKey: 'uid',
})
export default class Services extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 10,
    isLoading: true,
    searchText: '',
    selectArr: [],
  }

  showAction = record => !record.isFedManaged

  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'editService',
        icon: 'network-router',
        text: t('EDIT_SERVICE'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('service.edit', {
            detail: item,
          }),
      },
      {
        key: 'editGateway',
        icon: 'ip',
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: record =>
          this.showAction(record) && record.type === SERVICE_TYPES.VirtualIP,
        onClick: item =>
          trigger('service.gateway.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
          }),
      },
    ]
  }

  getCheckboxProps = record => ({
    disabled: record.isFedManaged,
    name: record.name,
  })

  renderExternalService = data => {
    const text = {
      des: '-',
      title: '-',
    }

    if (data.specType === 'NodePort') {
      text.des = t('PORT_PL')
      text.title = data.ports
        .filter(port => port.nodePort)
        .map(port => `${port.nodePort}/${port.protocol}`)
        .join('; ')
    }

    if (data.specType === 'LoadBalancer') {
      text.des =
        data.loadBalancerIngress.length > 1
          ? t('LOAD_BALANCERS_SCAP')
          : t('LOAD_BALANCER_SCAP')
      text.title = data.loadBalancerIngress.join('; ')
    }

    if (data.externalName) {
      return (
        <Text
          description={text.des}
          title={() => (
            <Tooltip content={data.externalName}>
              <span>{text.title}</span>
            </Tooltip>
          )}
        />
      )
    }

    return <Text description={t(`${text.des}`)} title={text.title} />
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    const { cluster } = this.props.match.params
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        width: '24%',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            isMultiCluster={record.isFedManaged}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '18%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {namespace}
          </Link>
        ),
      },
      {
        title: t('INTERNAL_ACCESS'),
        dataIndex: 'annotations["kubesphere.io/serviceType"]',
        isHideable: true,
        width: '16%',
        render: (_, record) => {
          return (
            <Text
              title={record.clusterIP || ''}
              description={t(`${record.type}`)}
            />
          )
        },
      },
      {
        title: t('EXTERNAL_ACCESS'),
        dataIndex: 'specType',
        isHideable: true,
        width: '20%',
        render: (_, record) => this.renderExternalService(record),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { query, match, module, getData } = this.props
    return this.props.trigger('service.simple.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
      success: getData,
    })
  }

  render() {
    const { cluster } = this.props.match.params
    const { module } = this.props
    const { bannerProps } = this.props

    let list = []
    const { sortOrder } = this.state
    if (this.props.store.list.data.length) {
      this.state.isLoading = false
      list = this.props.store.list.data
    }
    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
          customBodyRender: (name, record) => (
            <Avatar
              icon={ICON_TYPES[module]}
              iconSize={40}
              title={name}
              desc={record.description || '-'}
              isMultiCluster={record.isFedManaged}
              to={`/clusters/${cluster}/projects/${record?.rowData[1]}/${module}/${name}`}
            />
          ),
          // customBodyRender: (name, namespace) => {
          //   return (
          //     <Link
          //       to={`/clusters/default/projects/${namespace?.rowData[5]}/pods/${name}/resource-status`}
          //     >
          //       <div className={styles.NamePod}>
          //         <div className={styles.IconName}></div>
          //         <div className={styles.NameContent}>
          //           <div>{name}</div>
          //         </div>
          //       </div>
          //     </Link>
          //   )
          // },
        },
      },
      {
        name: 'namespace',
        label: 'Project',
        options: {
          filter: true,
          customBodyRender: namespace => {
            return <Link to={``}>{namespace}</Link>
          },
        },
      },
      {
        name: 'clusterIP',
        label: 'Internal Access',
        options: {
          filter: true,
          customBodyRender: clusterIP => {
            return <Link to={``}>{clusterIP}</Link>
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

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: false,
      page: this.state.page,
      count: this.props.store.list.total,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      searchText: this.state.searchText,
      sortOrder,
      enableNestedDataAccess: '.',
      onTableChange: (action, tableState) => {
        switch (action) {
          // case 'changePage':
          //   this.getData(tableState.page, tableState.sortOrder)
          //   break
          // case 'sort':
          //   this.sort(tableState.sortOrder)
          //   break
          // case 'search':
          //   this.search(tableState.searchText)
          //   break
          // // eslint-disable-next-line no-fallthrough
          // case 'filterChange':
          //   this.filterChange(tableState.filterList)
          //   break
          // // eslint-disable-next-line no-fallthrough
          // case 'changeRowsPerPage':
          //   this.changeRowsPerPage(tableState.rowsPerPage)
          //   break
          // eslint-disable-next-line no-fallthrough
          case 'rowSelectionChange':
            // eslint-disable-next-line no-case-declarations
            const listDataIndexs = tableState.selectedRows.data.map(
              item => item.dataIndex
            )
            // eslint-disable-next-line no-case-declarations
            const list_arr = this.props.store.list.data.filter(
              (item, index) => {
                return listDataIndexs.includes(index)
              }
            )

            this.state.selectArr = list_arr
            break
          case 'rowDelete':
            this.handleDeleteMulti()
            break
          default:
        }
      },
      textLabels: {
        body: {
          noMatch: this.props.store.list.isLoading ? (
            <CircularProgress />
          ) : (
            'Sorry, there is no matching data to display'
          ),
        },
      },
    }

    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        {/* <ResourceTable */}
        {/*   {...tableProps} */}
        {/*   itemActions={this.itemActions} */}
        {/*   columns={this.getColumns()} */}
        {/*   onCreate={this.showCreate} */}
        {/*   cluster={match.params.cluster} */}
        {/*   getCheckboxProps={this.getCheckboxProps} */}
        {/* /> */}

        <MUIDataTable
          title={<Typography variant="h6">List Service</Typography>}
          data={list}
          columns={columns}
          options={options}
          className={styles.muitable}
        />
      </ListPage>
    )
  }
}
