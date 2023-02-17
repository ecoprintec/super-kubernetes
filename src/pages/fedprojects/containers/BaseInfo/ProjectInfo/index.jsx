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
import { get, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

import { Icon, Menu } from '@kube-design/components'
import { getLocalTime, getDisplayName } from 'utils'
import { Panel } from 'components/Base'
import ManageButton from 'pages/clusters/containers/BaseInfo/ManageButton'

import styles from './index.scss'

export default class ProjectInfo extends React.Component {
  renderMoreMenu() {
    const { actions, onMenuClick } = this.props

    return (
      <Menu onClick={onMenuClick}>
        {actions.map(action => (
          <Menu.MenuItem key={action.key}>
            <Icon name={action.icon} type="light" /> {action.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const { detail, workspace, actions } = this.props
    return (
      <Panel className={styles.wrapper} title={t('PROJECT_INFO')}>
        <div className={styles.header}>
          <Icon name="project" size={40} />
          <div className={styles.item}>
            <div>{getDisplayName(detail)}</div>
            <p>{t('PROJECT_NAME')}</p>
          </div>
          <div className={styles.item}>
            <div>
              <Link to={`/workspaces/${workspace}`}>{workspace}</Link>
            </div>
            <p>{t('WORKSPACE')}</p>
          </div>
          <div className={styles.item}>
            <div>{get(detail, 'creator') || '-'}</div>
            <p>{t('CREATOR')}</p>
          </div>
          <div className={styles.item}>
            <div>
              {getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`)}
            </div>
            <p>{t('CREATION_TIME')}</p>
          </div>
          {!isEmpty(actions) && (
            <ManageButton content={this.renderMoreMenu()}></ManageButton>
          )}
        </div>
      </Panel>
    )
  }
}
