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
import { Panel } from 'components/Base'
import { isEmpty } from 'lodash'

import styles from './index.scss'

export default class Annotations extends Component {
  render() {
    const { annotations } = this.props

    if (isEmpty(annotations)) {
      return null
    }

    return (
      <Panel title={t('ANNOTATION_PL')}>
        <ul className={styles.values}>
          {Object.entries(annotations).map(([key, value]) => (
            <li key={key}>
              <span className={styles.title}>{key}</span>
              <span>{String(value)}</span>
            </li>
          ))}
        </ul>
      </Panel>
    )
  }
}
