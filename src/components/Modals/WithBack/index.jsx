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

import { ReactComponent as BackIcon } from 'assets/back.svg'
import styles from './index.scss'

export default function withBack(WrappedComponent) {
  return class WithBack extends React.Component {
    render() {
      const {
        wrapperOnBack,
        wrapperClassName,
        wrapperTitle = '',
        hiddenBack = false,
        ...wrappedComponentProps
      } = this.props
      return (
        <div className={wrapperClassName}>
          <h3 className={styles.title}>
            {hiddenBack || <BackIcon onClick={wrapperOnBack} />}
            <strong>{wrapperTitle}</strong>
          </h3>
          <div className={styles.content}>
            <WrappedComponent {...wrappedComponentProps} />
          </div>
        </div>
      )
    }
  }
}
