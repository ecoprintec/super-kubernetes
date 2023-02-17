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

import styles from './index.scss'

export default class Item extends Component {
  handleClick = () => {
    const { data, onSelect } = this.props
    onSelect(data)
  }

  render() {
    const { data, inputValue, isFocused } = this.props
    const start = data.split(inputValue)[0]

    return (
      <div
        className={classNames(styles.item, { 'is-focus': isFocused })}
        onClick={this.handleClick}
      >
        <span>{start}</span>
        {data.length > start.length && (
          <>
            <span className="highlight">{inputValue}</span>
            <span>{data.slice(start.length + inputValue.length)}</span>
          </>
        )}
      </div>
    )
  }
}
