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
import { CircularProgress, Typography } from '@mui/material'
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
    page: 0,
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

  renderStatus = podStatus => (
    <Status type={podStatus.type} name={t(podStatus.type)} flicker />
  )

  getData = async page => {
    this.setState({
      isLoading: true,
    })
    await this.props.store
      .fetchList({ page: page + 1, limit: this.state.rowsPerPage })
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

  search = async keyword => {
    this.setState({
      isLoading: true,
    })
    await this.props.store
      .fetchList({ name: keyword })
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  filterChange = async filterList => {
    this.setState({
      isLoading: true,
    })
    const params = {}
    if (filterList[0].length) {
      params.name = filterList[0][0]
    }

    if (filterList[1].length) {
      params.status = filterList[1][0]
    }

    if (filterList[2].length) {
      params.node = filterList[2][0]
    }

    if (filterList[3].length) {
      params.nodeIp = filterList[3][0]
    }

    if (filterList[4].length) {
      params.createTime = filterList[4][0]
    }

    await this.props.store
      .fetchList(params)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  changeRowsPerPage = async limit => {
    this.setState({
      isLoading: true,
    })
    await this.props.store
      .fetchList({ page: this.state.page, limit })
      .then(() => {
        this.setState({
          isLoading: false,
          rowsPerPage: limit,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  sort = async sortOrder => {
    this.setState({
      isLoading: true,
    })
    const params = {}
    params.sortBy = sortOrder.name
    if (sortOrder?.direction === 'asc') {
      params.ascending = true
    }
    await this.props.store
      .fetchList(params)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
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

    const data = toJS(this.props.store.list.data)
    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: true,
      page: this.state.page,
      count: this.props.store.list.total,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      sortOrder,
      enableNestedDataAccess: '.',
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'changePage':
            this.getData(tableState.page, tableState.sortOrder)
            break
          case 'sort':
            this.sort(tableState.sortOrder)
            break
          case 'search':
            this.search(tableState.searchText)
          // eslint-disable-next-line no-fallthrough
          case 'filterChange':
            this.filterChange(tableState.filterList)
          // eslint-disable-next-line no-fallthrough
          case 'changeRowsPerPage':
            this.changeRowsPerPage(tableState.rowsPerPage)
          // eslint-disable-next-line no-fallthrough
          default:
        }
      },
    }

    const { bannerProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <MUIDataTable
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
