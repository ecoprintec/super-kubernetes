import React from 'react'

import withList, { ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import { getDisplayName, getLocalTime } from 'utils'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'
import VolumeSnapshotClassesStore from 'stores/volumeSnapshotClasses'
import { toJS } from 'mobx'
import { Avatar } from 'components/Base'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { CircularProgress } from '@mui/material'
import styles from '../../../../../components/Tables/Base/index.scss'
import SplitButton from '../../Workload/Pods/ItemDropdown'

@withList({
  store: new VolumeSnapshotClassesStore(),
  module: 'volumesnapshotclasses',
  authKey: 'volumes',
  name: 'VOLUME_SNAPSHOT_CLASS',
  rowKey: 'uid',
})
export default class VolumeSnapshotClasses extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 10,
    isLoading: true,
    searchText: '',
    selectArr: [],
  }

  get itemActions() {
    const { trigger, store, match, name } = this.props
    const { cluster } = match.params
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: async item => {
          const data = await store.fetchDetail(item)
          trigger('resource.baseinfo.edit', {
            store,
            detail: data,
            cluster,
            success: this.props.getData,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'view',
        show: this.showAction,
        onClick: async item => {
          const data = await store.fetchDetail(item)
          trigger('volume.snapshot.yaml.edit', {
            store,
            detail: data,
            yaml: data._originData,
            success: this.props.getData,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        disabled: this.cantDelete,
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: this.props.getData,
          }),
      },
    ]
  }

  showCreate = () => {
    this.props.trigger('snapshotClasses.create', {
      name: 'VOLUME_SNAPSHOT_CLASS',
      module: 'volumesnapshotclass',
      cluster: this.props.match.params.cluster,
      success: this.props.routing.query,
    })
  }

  render() {
    const { sortOrder } = this.state
    const { prefix, bannerProps } = this.props
    const data = toJS(this.props.store.list.data)

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
    }

    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          sort: false,
          filter: true,
          customBodyRenderLite: dataIndex => {
            const record = data[dataIndex]
            return (
              <Avatar
                to={`${prefix}/${record.name}`}
                title={getDisplayName(record)}
                desc={record.description}
              />
            )
          },
        },
      },
      {
        name: 'count',
        label: 'Volume Snapshots',
      },
      {
        name: 'driver',
        label: 'Provisioner',
        options: {
          filter: true,
          customBodyRender: driver => {
            return <Link to={``}>{driver}</Link>
          },
        },
      },
      {
        name: 'deletionPolicy',
        label: 'Deletion Policy',
        options: {
          filter: true,
          customBodyRender: deletionPolicy => {
            return <Link to={``}>{deletionPolicy}</Link>
          },
        },
      },
      {
        name: 'createTime',
        label: 'Creation Time',
        options: {
          filter: true,
          customBodyRender: time => {
            return getLocalTime(time).format('YYYY-MM-DD HH:mm')
          },
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
                    icon: <EditIcon fontSize="small" />,
                    title: 'Edit Information',
                    action: async () => {
                      const store = this.props.store
                      const cluster = this.props.match.params
                      const dataDetail = await this.props.store.fetchDetail(
                        tableMeta.rowData
                      )
                      this.props.trigger('resource.baseinfo.edit', {
                        store,
                        detail: dataDetail,
                        cluster,
                        success: this.props.getData,
                      })
                    },
                  },
                  {
                    icon: <EditIcon fontSize="small" />,
                    title: 'Edit YAML',
                    action: () => {
                      const store = this.props.store
                      const detail = tableMeta.rowData
                      this.props.trigger('volume.snapshot.yaml.edit', {
                        store,
                        detail,
                        yaml: tableMeta.rowData._originData,
                        success: this.props.getData,
                      })
                    },
                  },
                  {
                    icon: <DeleteIcon fontSize="small" />,
                    title: 'Delete',
                    action: () => {
                      this.props.trigger('resource.delete', {
                        type: tableMeta.rowData.name,
                        detail: tableMeta.rowData,
                        success: this.props.getData,
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

    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps}></Banner>
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          className={styles.muitable}
        />
      </ListPage>
    )
  }
}
