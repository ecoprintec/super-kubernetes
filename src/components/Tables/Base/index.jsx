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
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import { get, isEmpty, isFunction } from 'lodash'
import {
  Icon,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Button,
  InputSearch,
} from '@kube-design/components'
import { safeParseJSON, getLocalTime } from 'utils'

import { CircularProgress } from '@mui/material'
import MUIDataTable from 'mui-datatables'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import styles from './index.scss'
import Pagination from './Pagination'
import Empty from './Empty'
import FilterInput from './FilterInput'
import CustomColumns from './CustomColumns'

const ORDER_MAP = {
  ascend: false,
  descend: true,
}

export default class WorkloadTable extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    columns: PropTypes.array.isRequired,
    selectedRowKeys: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    filters: PropTypes.object,
    rowKey: PropTypes.any,
    onFetch: PropTypes.func,
    onSelectRowKeys: PropTypes.func,
    getCheckboxProps: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    hideSearch: PropTypes.bool,
    hideCustom: PropTypes.bool,
    actions: PropTypes.array,
    selectActions: PropTypes.array,
    extraProps: PropTypes.object,
    alwaysUpdate: PropTypes.bool,
    emptyText: PropTypes.any,
  }

  static defaultProps = {
    rowKey: 'name',
    selectedRowKeys: [],
    onFetch() {},
    hideHeader: false,
    hideFooter: false,
    hideSearch: false,
    hideCustom: false,
    extraProps: {},
    pagination: {},
    filters: {},
  }

  constructor(props) {
    super(props)
    const hideColumns = get(
      safeParseJSON(localStorage.getItem('hide-columns'), {}),
      props.tableId,
      []
    )

    this.state = {
      hideColumns,
      page: 0,
      count: 1,
      rowsPerPage: 10,
      isLoading: true,
      searchText: '',
      selectArr: [],
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.alwaysUpdate) {
      return true
    }

    if (
      nextProps.data !== this.props.data ||
      nextProps.columns.length !== this.props.columns.length ||
      !isEqual(nextProps.filters, this.props.filters) ||
      nextProps.isLoading !== this.props.isLoading ||
      !isEqual(nextProps.pagination, this.props.pagination)
    ) {
      return true
    }

    if (nextState.hideColumns.length !== this.state.hideColumns.length) {
      return true
    }

    if (
      nextProps.store.list.selectedRowKeys !==
      this.props.store.list.selectedRowKeys.length
    ) {
      return true
    }

    return false
  }

  get showEmpty() {
    const { filters, pagination, isLoading } = this.props

    if ('showEmpty' in this.props) {
      return this.props.showEmpty
    }

    return !isLoading && isEmpty(filters) && pagination.total === 0
  }

  getParamNames(func) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
    const ARGUMENT_NAMES = /([^\s,]+)/g
    const fnStr = func.toString().replace(STRIP_COMMENTS, '')
    let result = fnStr
      .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
      .match(ARGUMENT_NAMES)
    if (result === null) result = []
    return result
  }

  // eslint-disable-next-line getter-return
  get filteredColumns() {
    if (this.props.store.list.data.length) {
      const cl = []

      if (this.props.columns.length) {
        // eslint-disable-next-line array-callback-return
        this.props.columns.map(item => {
          // if (item.dataIndex) {
          cl.push({
            name: item.dataIndex ? item.dataIndex : 'Actions',
            label: item?.title,
            options: {
              display:
                item.display !== undefined && item.display === false
                  ? item?.display
                  : true,
              filter: true,
              sort: item.sorter ? item.sorter : false,
              filterType: 'dropdown',
              filterArrayFullMatch: false,

              setCellProps: () => ({
                style: { maxWidth: '600px' },
              }),
              customBodyRender: (value, tableMeta) => {
                const detail = this.props.data[tableMeta.rowIndex]
                let text = ''
                if (!detail) return text
                if (isFunction(item.render)) {
                  const arrNameParams = this.getParamNames(item.render)

                  if (arrNameParams.length === 1) {
                    if (arrNameParams[0] === 'record') {
                      text = item.render(detail)
                    } else {
                      text = item.render(value)
                    }
                  } else {
                    text = item.render(value, detail)
                  }
                } else {
                  text = value
                }
                return text
              },
            },
          })
          // }
        })
      }

      return cl
    }
  }

  handleChange = (filters, sorter) => {
    this.props.onFetch({
      sortBy: sorter.field || '',
      ascending: !(ORDER_MAP[sorter.order] || false),
      ...filters,
    })
  }

  handlePagination = ({ page, limit }) => {
    const { onFetch } = this.props
    onFetch({ page, limit })
  }

  handleRefresh = () => {
    const { pagination } = this.props
    this.props.onFetch({
      limit: pagination.limit,
      page: pagination.page,
    })
  }

  handleColumnsHide = columns => {
    this.setState(
      {
        hideColumns: columns,
      },
      () => {
        if (this.props.tableId) {
          const hideColumnsData = safeParseJSON(
            localStorage.getItem('hide-columns'),
            {}
          )
          hideColumnsData[this.props.tableId] = this.state.hideColumns
          localStorage.setItem('hide-columns', JSON.stringify(hideColumnsData))
        }
      }
    )
  }

  handleDeleteMulti = () => {
    this.props.trigger('resource.batch.delete', {
      store: this.props.store,
      success: this.props.getData,
      selectValues: this.state.selectArr,
    })
  }

  handleCancelSelect = () => {
    this.props.onSelectRowKeys([])
  }

  handleFilterInput = filters => {
    if (!isEqual(filters, this.props.filters)) {
      this.props.onFetch(filters, true)
    }
  }

  handleSearch = text => {
    const { searchType } = this.props
    this.props.onFetch({ [searchType]: text }, true)
  }

  clearFilter = () => {
    // you must update the filter in props.onFetch
    const { searchType } = this.props

    if (searchType) {
      this.handleSearch()
    }

    this.handleFilterInput([])
  }

  renderSelectActions() {
    const { onDelete, selectActions } = this.props

    if (selectActions) {
      return (
        <div>
          {selectActions.map(action => (
            <Button
              key={action.key}
              type={action.type}
              disabled={action.disabled || false}
              className={styles.button}
              onClick={() => {
                action.onClick()
                // this.setState({ selectArr: [] })
              }}
              data-test={`table-${action.key}`}
            >
              {action.text}
            </Button>
          ))}
        </div>
      )
    }

    return (
      <div>
        {onDelete && (
          <Button
            type="danger"
            className={styles.button}
            onClick={onDelete}
            data-test="table-delete"
          >
            {t('DELETE')}
          </Button>
        )}
      </div>
    )
  }

  renderSelectedTitle = () => (
    <Level>
      <LevelLeft>{this.renderSelectActions()}</LevelLeft>
      <LevelRight>
        <Button
          type="flat"
          className={styles.cancelSelect}
          onClick={this.handleCancelSelect}
          data-test="table-cancel-select"
        >
          {t('DESELECT')}
        </Button>
      </LevelRight>
    </Level>
  )

  renderSearch() {
    const { hideSearch, searchType, filters, columns } = this.props

    if (hideSearch) {
      return null
    }

    if (searchType) {
      const placeholder = this.props.placeholder || t('SEARCH_BY_NAME')

      return (
        <InputSearch
          className={styles.search}
          value={filters[searchType]}
          onSearch={this.handleSearch}
          placeholder={placeholder}
        />
      )
    }

    return (
      <FilterInput
        className={styles.search}
        columns={columns}
        filters={filters}
        onChange={this.handleFilterInput}
      />
    )
  }

  renderActions() {
    const { onCreate, createText, actions } = this.props
    if (actions) {
      return actions.map(item => (
        <Button
          key={item.key}
          type={item.type}
          className={styles.create}
          onClick={item.onClick}
          data-test={`table-${item.key}`}
        >
          {item.text}
        </Button>
      ))
    }

    if (!onCreate) {
      return null
    }

    return (
      <Button
        type="control"
        className={styles.create}
        onClick={onCreate}
        data-test="table-create"
      >
        {t(createText || 'CREATE')}
      </Button>
    )
  }

  renderNormalTitle() {
    const { hideCustom, customFilter, columns } = this.props
    const { hideColumns } = this.state

    return (
      <Level>
        {customFilter && <LevelLeft>{customFilter}</LevelLeft>}
        <LevelItem>{this.renderSearch()}</LevelItem>
        <LevelRight>
          <div>
            <Button
              type="flat"
              icon="refresh"
              onClick={this.handleRefresh}
              data-test="table-refresh"
            />
            {!hideCustom && (
              <CustomColumns
                className={styles.columnMenu}
                title={t('CUSTOM_COLUMNS')}
                columns={columns}
                value={hideColumns}
                onChange={this.handleColumnsHide}
              />
            )}
            {this.renderActions()}
          </div>
        </LevelRight>
      </Level>
    )
  }

  renderTableTitle = () => {
    if (this.props.selectedRowKeys && this.props.selectedRowKeys.length > 0) {
      return this.renderSelectedTitle()
    }

    return this.renderNormalTitle()
  }

  renderEmptyText() {
    return (
      this.props.emptyText || (
        <div className={styles.emptyText}>
          <span className={styles.emptyTipIcon}>
            <Icon name="exclamation" size={48} />
          </span>
          <div>{t('NO_MATCHING_RESULT_FOUND')}</div>
          <p>
            {t('YOU_CAN_TRY_TO')}
            <span
              className={styles.action}
              onClick={this.handleRefresh}
              data-test="table-empty-refresh"
            >
              {t('REFRESH_DATA')}
            </span>
            {t('OR')}
            <span
              className={styles.action}
              onClick={this.clearFilter}
              data-test="table-empty-clear-filter"
            >
              {t('CLEAR_SEARCH_CONDITIONS')}
            </span>
          </p>
        </div>
      )
    )
  }

  renderEmpty() {
    const { module, name, emptyProps = {} } = this.props
    return (
      <Empty
        action={this.renderActions()}
        name={name}
        module={module}
        {...emptyProps}
      />
    )
  }

  renderTableFooter = () => {
    if (!this.props.pagination) {
      return null
    }

    const { total, page, limit } = this.props.pagination

    return (
      <Pagination
        page={page}
        total={total}
        limit={limit}
        onChange={this.handlePagination}
      />
    )
  }

  updateSelectedRowIndexs = listDataIndexs => {
    const { tableProps, onSelectRowKeys } = this.props
    const selectedRowsData = this.props.data
      .filter((item, index) => {
        return listDataIndexs.includes(index)
      })
      .map(item => {
        return item?.name
      })
    tableProps.selectedRowKeys = selectedRowsData
    tableProps.listDataIndexs = listDataIndexs
    onSelectRowKeys(selectedRowsData)
    this.setState({ selectArr: listDataIndexs })
  }

  getSelectedRowIndexs = () => {
    const { selectedRowKeys, data } = this.props.store.list
    const selectedRowIndexs = []
    data.forEach((element, index) => {
      if (selectedRowKeys.includes(element.name)) selectedRowIndexs.push(index)
    })
    return selectedRowIndexs
  }

  getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              paddingRight: 0,
            },
            actions: {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'end',
            },
          },
        },
      },
    })

  render() {
    const {
      data,
      isLoading,
      selectedRowKeys,
      onSelectRowKeys,
      hideHeader,
      hideFooter,
      getCheckboxProps,
    } = this.props
    if (this.showEmpty) {
      return this.renderEmpty()
    }

    const props = {}

    if (!hideHeader) {
      props.title = this.renderTableTitle()
    }

    if (!hideFooter) {
      props.footer = this.renderTableFooter()
    }

    if (onSelectRowKeys) {
      props.rowSelection = {
        selectedRowKeys,
        getCheckboxProps,
        onSelect: (record, checked, rowKeys) => {
          onSelectRowKeys(rowKeys)
        },
        onSelectAll: (checked, rowKeys) => {
          onSelectRowKeys(rowKeys)
        },
      }
    }

    let list = []
    const { sortOrder } = this.state
    if (data.length) {
      this.state.isLoading = false
      list = data
    }

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: false,
      page: this.state.page,
      count: this.props.data.total,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      searchText: this.state.searchText,
      searchAlwaysOpen: true,
      download: false,
      sortOrder,
      enableNestedDataAccess: '.',
      rowsSelected: this.getSelectedRowIndexs(),
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'rowSelectionChange':
            // eslint-disable-next-line no-case-declarations
            const listDataIndexs = tableState.selectedRows.data.map(
              item => item.dataIndex
            )
            this.updateSelectedRowIndexs(listDataIndexs)
            break
          // case 'rowDelete':
          //   this.handleDeleteMulti()
          //   break
          default:
        }
      },
      textLabels: {
        body: {
          noMatch: isLoading ? (
            <CircularProgress />
          ) : (
            'Sorry, there is no matching data to display'
          ),
        },
      },
      customToolbarSelect: () => {
        return <div>{this.renderSelectActions()}</div>
      },
      customToolbar: () => this.renderActions(),
    }
    // eslint-disable-next-line array-callback-return
    const new_list = []
    // eslint-disable-next-line array-callback-return
    list.map(item => {
      new_list.push({
        ...item,
        ...{
          lastLoginTime: item?.lastLoginTime
            ? getLocalTime(item?.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
            : '',
          createTime: item?.createTime
            ? getLocalTime(item?.startTime).format('YYYY-MM-DD HH:mm:ss')
            : '',
          startTime: item?.startTime
            ? getLocalTime(item?.startTime).format('YYYY-MM-DD HH:mm:ss')
            : '',
        },
      })
    })

    return (
      <ThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          // title={<Typography variant="h6">{this.renderActions()}</Typography>}
          data={new_list}
          columns={this.filteredColumns}
          options={options}
          className={styles.muitable}
        />
      </ThemeProvider>
    )
  }
}
