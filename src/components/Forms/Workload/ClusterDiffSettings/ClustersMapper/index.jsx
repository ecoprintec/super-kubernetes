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
import classNames from 'classnames'
import { Icon } from '@kube-design/components'
import { CLUSTER_PROVIDER_ICON } from 'utils/constants'

import styles from './index.scss'

export default class ClustersMapper extends Component {
  state = {
    selectCluster: '',
  }

  handleClick = e => {
    this.setState({
      selectCluster: e.currentTarget.dataset.cluster,
    })
  }

  handleSelect = cluster => {
    this.setState({
      selectCluster: cluster,
    })
  }

  render() {
    const { clusters, clustersDetail, namespace, children } = this.props
    const { selectCluster } = this.state

    return (
      <div className={styles.wrapper}>
        {clusters.map(cluster => {
          const clusterDetail = clustersDetail[cluster.name] || cluster
          return (
            <div
              key={clusterDetail.name}
              className={classNames(styles.cluster, {
                [styles.selected]: clusterDetail.name === selectCluster,
              })}
              onClick={this.handleClick}
              data-cluster={clusterDetail.name}
            >
              <div className={styles.title}>
                <Icon
                  name={
                    CLUSTER_PROVIDER_ICON[
                      clusterDetail.provider || 'kubesphere'
                    ]
                  }
                  type="light"
                  size={20}
                />
                <span>{clusterDetail.name}</span>
              </div>
              <div>
                {children({
                  namespace,
                  clusters,
                  cluster: clusterDetail.name,
                  selected: clusterDetail.name === selectCluster,
                  onSelect: this.handleSelect,
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
