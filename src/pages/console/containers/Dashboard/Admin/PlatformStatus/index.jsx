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

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'
import { Text } from 'components/Base'
import { getLocalTime } from 'utils'
import Grid from '@material-ui/core/Grid'
import Resource from './Resource'
import styles from './index.scss'

@inject('rootStore')
@observer
export default class PlatformStatus extends Component {
  get resources() {
    return [
      {
        icon: 'enterprise',
        name: 'WORKSPACE',
        link: '/access/workspaces',
        metric: 'kubesphere_workspace_count',
      },
      {
        icon: 'human',
        name: 'USER',
        link: '/access/accounts',
        metric: 'kubesphere_user_count',
      },
      {
        icon: 'appcenter',
        name: 'APP_TEMPLATE_SCAP',
        link: '/apps',
        hide: !globals.app.enableAppStore,
        metric: 'kubesphere_app_template_count',
      },
    ]
  }

  handleClick = link => {
    this.props.rootStore.routing.push(link)
  }

  render() {
    const { metrics } = this.props
    return (
      <div className={styles.wrapper}>
        <Grid container>
          <Grid item xs={12} lg={3} md={6} sm={6}>
            <div className={styles.title}>
              <Text
                icon="blockchain"
                title={getLocalTime(Date.now()).format('YYYY-MM-DD HH:mm:ss')}
                description={t('LAST_UPDATE_TIME')}
              />
            </div>
          </Grid>

          {this.resources.map((resource, resourseKey) => {
            if (resource.hide) {
              return null
            }
            return (
              <Grid key={resourseKey} item xs={12} lg={3} md={6} sm={6}>
                <Resource
                  key={resource.name}
                  data={resource}
                  count={get(
                    metrics,
                    `${resource.metric}.data.result[0].value[1]`
                  )}
                  onClick={this.handleClick}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}
