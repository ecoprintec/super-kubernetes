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
import { Text } from 'components/Base'

import styles from './index.scss'

export default class Resource extends Component {
  handleClick = () => {
    const { data, onClick } = this.props
    onClick(data.link)
  }

  render() {
    const { data, count } = this.props
    return (
      <div key={data.name} className={styles.resource}>
        <Text
          icon={data.icon}
          title={count || 0}
          description={count === '1' ? t(data.name) : t(`${data.name}_PL`)}
          onClick={data.link ? this.handleClick : null}
        />
      </div>
    )
  }
}
