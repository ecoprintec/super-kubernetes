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

import React from 'react'
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'
import Banner from 'components/Cards/Banner'
import { parse } from 'qs'

import ComponentStore from 'stores/component'

import Card from './Card'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ServiceComponents extends React.Component {
  constructor(props) {
    super(props)

    const { type } = parse(location.search.slice(1)) || {}

    this.state = {
      type: type || 'kubesphere',
    }
    this.configs = this.tabs
    this.store = new ComponentStore()
    this.store.fetchList({ cluster: this.cluster })
  }

  get prefix() {
    return this.props.match.url
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  // getColor = healthy => (healthy ? '#f5a623' : '#3f51b5')

  get tabs() {
    return {
      value: this.state.type,
      onChange: this.handleTypeChange,
      options: [
        {
          value: 'kubesphere',
          label: 'Super Kubenetes',
          icon: '/assets/kubesphere.svg',
          count: this.getCount('kubesphere'),
        },
        {
          value: 'kubernetes',
          label: 'Kubernetes',
          icon: '/assets/kubernetes.svg',
          count: this.getCount('kubernetes'),
        },
        {
          value: 'istio',
          label: t('APPLICATION_GOVERNANCE'),
          icon: '/assets/istio.svg',
          count: this.getCount('istio'),
          disabled: !globals.app.hasClusterModule(this.cluster, 'servicemesh'),
        },
        {
          value: 'monitoring',
          label: t('MONITORING'),
          icon: '/assets/monitoring.svg',
          count: this.getCount('monitoring'),
          disabled: !globals.app.hasClusterModule(this.cluster, 'monitoring'),
        },
        {
          value: 'logging',
          label: t('LOGGING'),
          icon: '/assets/logging.svg',
          count: this.getCount('logging'),
          disabled: !globals.app.hasClusterModule(this.cluster, 'logging'),
        },
        {
          value: 'devops',
          label: 'DevOps',
          icon: '/assets/dev-ops.svg',
          count: this.getCount('devops'),
          disabled: !globals.app.hasClusterModule(this.cluster, 'devops'),
        },
      ],
    }
  }

  getCount = type => {
    if (typeof this.store === 'undefined') {
      return
    }
    if (type !== 'istio') {
      const healthyCount = this.store.healthyCount
      return healthyCount[type] || 0
    }
    const exceptionCount = this.store.exceptionCount
    return exceptionCount[type] || 0
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderHeader() {
    return (
      <>
        <Banner
          icon="components"
          title={t('SYSTEM_COMPONENT_PL')}
          description={t('SERVICE_COMPONENTS_DESC')}
          tabs={this.tabs}
        />{' '}
      </>
    )
  }

  renderCards(data) {
    return (
      <div className={styles.cards}>
        {data.map(item => (
          <Card key={item.name} component={item} cluster={this.cluster} />
        ))}
      </div>
    )
  }

  renderComponents(type) {
    const { data } = this.store.list
    const config = this.configs.options.find(item => item.value === type) || {}
    const components = data[type]

    if (isEmpty(components)) {
      return null
    }

    return (
      <div className={styles.cardsWrapper}>
        <div className={styles.cardTitle}>
          <img src={config.icon} alt={config.title} />
        </div>
        {this.renderCards(components)}
      </div>
    )
  }

  renderList() {
    const { isLoading } = this.store.list
    const { type } = this.state

    if (isLoading) {
      return (
        <div className="loading">
          <Loading />
        </div>
      )
    }

    return this.renderComponents(type)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        {this.renderList()}
      </div>
    )
  }
}
