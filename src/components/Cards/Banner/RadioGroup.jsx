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
    let optionTabs = options
    let childrenProps = []
    if (this.props?.children) {
      childrenProps = this.props?.children.map(item => {
        return {
          value: item?.props?.value,
          label: item?.props?.value,
        }
      })
    }
    if (childrenProps.length > 0) optionTabs = childrenProps

    if (isEmpty(optionTabs)) {
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
        {optionTabs
          .filter(option => !option?.hidden)
          .map(option => (
            <Tab
              label={
                typeof option?.count !== 'undefined' ? (
                  <span>
                    {option?.label}{' '}
                    <span
                      style={{
                        backgroundColor: 'rgb(85, 188, 138)',
                        boxShadow: '0 2px 4px 0 rgb(85 188 138 / 36%)',
                        padding: '0 4px',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '12px',
                      }}
                    >
                      {option?.count}
                    </span>
                  </span>
                ) : (
                  <span> {option?.label}</span>
                )
              }
              value={option?.value}
              key={option?.value}
            />
          ))}
      </Tabs>
    )
  }
}
