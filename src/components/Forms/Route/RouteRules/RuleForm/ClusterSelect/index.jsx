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

import { Icon, Checkbox } from '@kube-design/components'
import { CLUSTER_PROVIDER_ICON } from 'utils/constants'
import CheckboxGroup from 'fedprojects/components/CheckboxGroup'

import styles from './index.scss'

export default class ClusterSelect extends Component {
  static propTypes = {
    value: PropTypes.array,
    options: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    options: [],
    onChange() {},
  }

  render() {
    const { value, defaultValue, onChange, options } = this.props

    return (
      <div className={styles.group}>
        <CheckboxGroup
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {options.map(option => (
            <Checkbox key={option.name} value={option.name}>
              <Icon
                name={CLUSTER_PROVIDER_ICON[option.provider] || 'kubernetes'}
              />
              <span>{option.name}</span>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    )
  }
}
