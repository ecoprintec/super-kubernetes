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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Editor from 'for-editor'

import styles from './index.scss'

const toolbar = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  img: false,
  link: true,
  code: true,
  preview: true,
  expand: true,
  undo: true,
  redo: true,
  save: false,
  subfield: true,
}

@observer
export default class ReadmeEdit extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
    handleChange: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    store: {},
    handleChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      readme: props.detail.abstraction,
    }
  }

  handleChange = value => {
    this.setState({ readme: value })
    this.props.handleChange(value, 'abstraction')
  }

  render() {
    const { readme } = this.state

    return (
      <>
        <div className={styles.header}>{t('APP_INTRODUCTION')}</div>
        <div className={styles.readmeEdit}>
          <Editor
            value={readme}
            onChange={this.handleChange}
            placeholder={t('START_EDITING')}
            toolbar={toolbar}
          />
        </div>
      </>
    )
  }
}
