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
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class TrafficCard extends React.Component {
  static propTypes = {
    metrics: PropTypes.array,
  }

  static defaultProps = {
    metrics: [],
  }

  render() {
    const { metrics } = this.props
    return (
      <div className={styles.trafficCard}>
        {metrics.map(metric => (
          <div key={metric.title}>
            <div className="h5">
              {isNaN(metric.data)
                ? t('NO_DATA')
                : `${metric.data} ${metric.unit}`}
            </div>
            <p>
              <Icon name={metric.icon} />
              {t(metric.title)}
            </p>
          </div>
        ))}
      </div>
    )
  }
}
