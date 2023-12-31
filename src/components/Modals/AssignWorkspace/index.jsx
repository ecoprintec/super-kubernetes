/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { pick } from 'lodash'

import { Alert, Form, Select } from '@kube-design/components'
import { Modal } from 'components/Base'

import WorkspaceStore from 'stores/workspace'
import UserStore from 'stores/user'

@observer
export default class AssignWorkspaceModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      workspace: '',
    }

    this.formTemplate = {}

    this.workspaceStore = new WorkspaceStore()
    this.memberStore = new UserStore()
  }

  componentDidMount() {
    this.workspaceStore.fetchList()
  }

  getWorkspaces() {
    return this.workspaceStore.list.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  getUsers() {
    return this.memberStore.list.data.map(item => ({
      label: item.username,
      value: item.username,
    }))
  }

  handleWorkspaceChange = workspace => {
    this.setState({ workspace }, () => {
      this.fetchMembers()
    })
  }

  fetchWorkspaces = async params => this.workspaceStore.fetchList(params)

  fetchMembers = async params => {
    if (this.state.workspace) {
      return this.memberStore.fetchList({
        workspace: this.state.workspace,
        ...params,
      })
    }

    return Promise.resolve({})
  }

  render() {
    return (
      <Modal.Form
        title={t('ASSIGN_WORKSPACE')}
        icon="firewall"
        width={691}
        data={this.formTemplate}
        {...this.props}
      >
        <Alert
          className="margin-b12"
          type="info"
          message={t('PROJECT_ASSIGN_DESC')}
        />
        <Form.Item label={t('WORKSPACE')} desc={t('SELECT_WORKSPACE_DESC')}>
          <Select
            name="metadata.labels['kubesphere.io/workspace']"
            onChange={this.handleWorkspaceChange}
            options={this.getWorkspaces()}
            pagination={pick(this.workspaceStore.list, [
              'page',
              'total',
              'limit',
            ])}
            isLoading={this.workspaceStore.list.isLoading}
            onFetch={this.fetchWorkspaces}
            placeholder=" "
            searchable
            clearable
          />
        </Form.Item>
        <Form.Item
          label={t('PROJECT_ADMINISTRATOR')}
          desc={t('PROJECT_ADMINISTRATOR_DESC')}
        >
          <Select
            name="metadata.annotations['kubesphere.io/creator']"
            options={this.getUsers()}
            pagination={pick(this.memberStore.list, ['page', 'total', 'limit'])}
            isLoading={this.memberStore.list.isLoading}
            onFetch={this.fetchMembers}
            placeholder=" "
            searchable
            clearable
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
