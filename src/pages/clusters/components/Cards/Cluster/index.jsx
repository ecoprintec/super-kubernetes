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
import {
  Columns,
  Column,
  Dropdown,
  Menu,
  Icon,
  Button,
} from '@kube-design/components'
import { Text } from 'components/Base'
import { getLocalTime } from 'utils'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import classNames from 'classnames'
import styles from './index.scss'

export default class ClusterCard extends React.Component {
  handleClick = () => {
    const { data, onEnter } = this.props
    onEnter && onEnter(data.name)
  }

  renderMore = item => {
    if (!this.props.isOperation) {
      return null
    }

    const content = this.renderMoreMenu(item)

    return (
      <Dropdown content={content} trigger="click" placement="bottomRight">
        <Button icon="more" type="flat" />
      </Dropdown>
    )
  }

  renderMoreMenu = record => {
    const items = this.props.itemActions.map(action => {
      return (
        <Menu.MenuItem key={action.key}>
          <Icon name={action.icon} />{' '}
          <span data-test={`table-item-${action.key}`}>{action.text}</span>
        </Menu.MenuItem>
      )
    })

    if (items.every(item => item === null)) {
      return null
    }

    return <Menu onClick={this.handleMoreMenuClick(record)}>{items}</Menu>
  }

  handleMoreMenuClick = item => (e, key) => {
    const action = this.props.itemActions.find(_action => _action.key === key)
    if (action && action.onClick) {
      action.onClick(item)
    }
  }

  render() {
    const { data } = this.props
    const expiredDay = data.expiredDay
    const isExpired = expiredDay && expiredDay < 0
    const willExpired = expiredDay && expiredDay <= 10 && expiredDay >= 0

    return (
      <li className={styles.wrapper} data-test="cluster-item">
        <Columns>
          <Column className="is-3">
            <ClusterTitle
              cluster={data}
              onClick={this.handleClick}
              isExpired={isExpired}
            />
          </Column>
          <Column className="is-2">
            <Text title={data.nodeCount} description={t('NODE_COUNT')} />
          </Column>
          <Column className="is-2">
            <Text
              title={data.kubernetesVersion}
              description={t('KUBERNETES_VERSION')}
            />
          </Column>
          <Column className="is-2">
            <Text title={data.provider} description={t('PROVIDER')} />
          </Column>
          <Column className="is-2">
            {willExpired ? (
              <Text
                title={
                  <span>
                    {t.html('LAST_KUBE_CONFIG_EXPIRED', {
                      count: parseInt(expiredDay, 10),
                    })}
                  </span>
                }
                description={t('EXPIRE_DATE')}
              />
            ) : (
              <Text
                title={getLocalTime(data.createTime).format(
                  `YYYY-MM-DD HH:mm:ss`
                )}
                description={t('CREATION_TIME')}
              />
            )}
          </Column>
          <Column className={classNames('is-1', styles.options)}>
            {this.renderMore(data)}
          </Column>
        </Columns>
      </li>
    )
  }
}
