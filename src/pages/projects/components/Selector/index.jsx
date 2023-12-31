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
import { Icon, Tooltip } from '@kube-design/components'
import SelectModal from 'components/Modals/ProjectSelect'

import styles from './index.scss'

export default class Selector extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    type: 'projects',
    detail: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      showSelect: false,
    }
  }

  showSelect = () => {
    this.setState({ showSelect: true })
  }

  hideSelect = () => {
    this.setState({ showSelect: false })
  }

  handleSelect = value => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(value)
  }

  render() {
    const { title, type, detail } = this.props
    const { name, description, cluster, workspace } = detail
    const { showSelect } = this.state

    return (
      <div>
        <div className={styles.titleWrapper} onClick={this.showSelect}>
          <div className={styles.icon}>
            <Icon
              name={type === 'devops' ? 'strategy-group' : 'project'}
              size={40}
              type="light"
            />
          </div>
          <div className={styles.text}>
            <Tooltip content={name}>
              <div className="h6">{name}</div>
            </Tooltip>
            <p>{description || title}</p>
          </div>
        </div>
        <SelectModal
          defaultType={type}
          cluster={cluster}
          workspace={workspace || this.props.workspace}
          visible={showSelect}
          onChange={this.handleSelect}
          onCancel={this.hideSelect}
        />
      </div>
    )
  }
}
