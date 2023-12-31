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
import PropTypes from 'prop-types'
import { get, isEmpty } from 'lodash'

import { getAreaChartOps } from 'utils/monitoring'

import { Loading } from '@kube-design/components'
import { Empty } from 'components/Base'
import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

export default class Charts extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    config: PropTypes.object,
    data: PropTypes.array,
  }

  static defaultTypes = {
    loading: false,
    config: {},
    data: [],
  }

  getItemName = item => get(item, 'metric.pod', '-')

  render() {
    const { loading, config, data } = this.props

    return (
      <div className={styles.charts}>
        <Loading spinning={loading}>
          <div className={styles.list}>
            {isEmpty(data) ? (
              <Empty />
            ) : (
              data.map(item => {
                const name = this.getItemName(item)
                const chartConfig = getAreaChartOps({
                  ...config,
                  legend: [config.legend || '-'],
                  data: [item],
                })

                if (isEmpty(chartConfig.data)) return null

                return (
                  <div key={name} className={styles.item}>
                    <div className={styles.title}>{name}</div>
                    <SimpleArea width="100%" {...chartConfig} />
                  </div>
                )
              })
            )}
          </div>
        </Loading>
      </div>
    )
  }
}
