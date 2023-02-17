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
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Add extends React.Component {
  render() {
    const { icon, image, title, description, onClick, type } = this.props

    return (
      <div
        className={classNames(
          styles.add,
          { [styles.withIcon]: icon || image },
          styles[type]
        )}
        onClick={onClick}
      >
        <div className={styles.icon}>
          {image ? (
            <img src={image} alt="" />
          ) : (
            icon && <Icon name={icon} size={40} />
          )}
        </div>
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    )
  }
}
