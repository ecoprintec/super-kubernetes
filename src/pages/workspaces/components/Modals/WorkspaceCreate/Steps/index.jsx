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
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Steps extends Component {
  render() {
    const { steps, current } = this.props
    return (
      <div className={styles.wrapper}>
        {steps.map((step, index) => (
          <div key={step.title}>
            {current >= index ? (
              <Icon name="success" type="coloured" size={12} />
            ) : (
              <Icon name="dot" type="light" size={12} />
            )}
            <span>{t(step.title)}</span>
          </div>
        ))}
      </div>
    )
  }
}
