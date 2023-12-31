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
import { get, isEmpty } from 'lodash'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class BaseInfo extends Component {
  getValue(item) {
    if (item.type === 'datetime') {
      return getLocalTime(item.value).format(`YYYY-MM-DD HH:mm:ss`)
    }
    return item.value
  }

  render() {
    const metadata = get(this.props.detail, 'metadata', [])

    if (isEmpty(metadata)) {
      return null
    }
    metadata.forEach(item => {
      if (item.label === 'Created') {
        item.value = getLocalTime(item.value).format('YYYY-MM-DD HH:mm:ss')
      }

      if (item.id === 'pod') {
        item.label = item.label.replace(/#/g, '').trim()
      }
    })
    return (
      <div className={styles.info}>
        {metadata.map(item => (
          <dl key={item.id}>
            <dd>{item.label}:</dd>
            <dd>{this.getValue(item)}</dd>
          </dl>
        ))}
      </div>
    )
  }
}
