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
import classnames from 'classnames'

import styles from './index.scss'

export default class Empty extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    desc: PropTypes.string,
  }

  static defaultProps = {
    img: '/assets/empty-card.svg',
    desc: 'NO_DATA',
  }

  render() {
    const { className, img, desc } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <img src={img} alt="No data" />
        <div className={styles.content}>{t(desc)}</div>
      </div>
    )
  }
}
