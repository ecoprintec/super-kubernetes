/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2022 The Super Kubenetes Console Authors.
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
import { Select, Icon } from '@kube-design/components'
import React from 'react'
import CodeStore from 'stores/codeRepo'
import { pick } from 'lodash'
import styles from './index.scss'

export default class CodeRepoSelect extends React.Component {
  codeStore = new CodeStore()

  state = {
    options: [],
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async params => {
    const { devops, cluster } = this.props
    await this.codeStore.fetchList({ devops, cluster, ...params })
    const _options = this.codeStore.list.data.map(item => {
      return {
        label: item.name,
        value: item.repoURL,
        icon:
          item.provider === 'bitbucket_server' ? 'bitbucket' : item.provider,
      }
    })

    const allItem = {
      label: t('ALL'),
      value: '*',
      icon: 'allowlist',
    }

    this.setState({ options: [allItem, ..._options] })
  }

  repoOptionRenderer = option => type => (
    <span className={styles.option}>
      <Icon name={option.icon} type={type === 'value' ? 'dark' : 'light'} />
      {option.label}
      {option.value === '*' ? '' : ` (${option.value})`}
    </span>
  )

  render() {
    const { value, index } = this.props
    return (
      <Select
        value={value}
        key={index}
        style={{ maxWidth: '100%' }}
        placeholder=" "
        options={this.state.options}
        pagination={pick(this.codeStore.list, ['page', 'limit', 'total'])}
        isLoading={this.codeStore.list.isLoading}
        onFetch={this.getRepoList}
        valueRenderer={option => this.repoOptionRenderer(option)('value')}
        optionRenderer={option => this.repoOptionRenderer(option)('option')}
        clearable
        searchable
        onChange={this.props.onChange}
      />
    )
  }
}
