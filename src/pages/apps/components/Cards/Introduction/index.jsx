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

import Markdown from 'components/Base/Markdown'
import FileStore from 'stores/openpitrix/file'

import styles from './index.scss'

@observer
export default class Introduction extends React.Component {
  static propTypes = {
    versionId: PropTypes.string,
  }

  static defaultProps = {
    versionId: '',
  }

  constructor(props) {
    super(props)

    this.fileStore = new FileStore()
  }

  get files() {
    return this.fileStore.files
  }

  fetchFile() {
    this.fileStore.fetch({ version_id: this.props.versionId })
  }

  componentDidMount() {
    this.fetchFile()
  }

  render() {
    const files = this.fileStore.files

    const readme = files['README.md']
    if (readme || this.appFileStore.isLoading) {
      return (
        <Markdown source={files['README.md']} className={styles.markdown} />
      )
    }

    return <p>{t('NO_DOCUMENT_DESC')}</p>
  }
}
