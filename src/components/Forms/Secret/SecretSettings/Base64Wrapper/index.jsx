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

import { get } from 'lodash'
import React, { Component } from 'react'
import { safeAtob, safeBtoa } from 'utils/base64'

export default class Base64Wrapper extends Component {
  handleChange = e => {
    const value = get(e, 'target.value', e)
    const { onChange } = this.props
    return onChange(safeBtoa(value))
  }

  render() {
    const { name, children, value } = this.props
    const node = React.cloneElement(children, {
      name,
      value: safeAtob(value || ''),
      onChange: this.handleChange,
    })
    return node
  }
}
