/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export default class RadioGroupWithOptions extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  handleChange = (event, newValue) => {
    const { onChange } = this.props
    onChange(newValue)
  }

  render() {
    const { value, options } = this.props

    if (isEmpty(options)) {
      return null
    }

    return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => this.handleChange(event, newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {options
          .filter(option => !option.hidden)
          .map((option, optionKey) => {
            return (
              <Tab key={optionKey} label={option.label} value={option.value} />
            )
          })}
      </Tabs>
    )
  }
}
