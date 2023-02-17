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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Columns, Column } from '@kube-design/components'

import Health from 'devops/components/Health'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import pathToRegexp from 'path-to-regexp'

import styles from './index.scss'

class Nav extends Component {
  static defaultProps = {
    module: '',
  }

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  get isMultibranch() {
    const { detailStore } = this.props
    return toJS(detailStore.detail.isMultiBranch)
  }

  renderBaseInfo() {
    const { detail } = this.props.detailStore

    return (
      <Columns className={styles.baseInfo}>
        <Column className={styles.baseInfo__item}>
          <div className={styles.dashboardValue}>
            <Health score={detail.weatherScore} />
          </div>
          <div className={styles.dashboardLable}>{t('HEALTH_STATUS_SCAP')}</div>
        </Column>
        {this.isMultibranch ? (
          <Column className={styles.baseInfo__item}>
            <div className={styles.dashboardValue}>
              <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
              {detail.totalNumberOfBranches || '-'}
            </div>
            <div className={styles.dashboardLable}>
              {detail.totalNumberOfBranches &&
              detail.totalNumberOfBranches === 1
                ? t('BRANCH_SI')
                : t('BRANCH_PL')}
            </div>
          </Column>
        ) : null}

        <Column className={styles.baseInfo__item} />
      </Columns>
    )
  }

  renderNav(item, index) {
    const { params } = this.props.match
    const { name, title } = item
    const { detailStore, sonarqubeStore } = this.props
    const showPipelineConfig = this.enabledActions.includes('edit')

    if (!name) return null
    if (detailStore && sonarqubeStore) {
      if ((!showPipelineConfig || this.isMultibranch) && name === 'pipeline') {
        return null
      }
      if (!sonarqubeStore.detail.totalStatus && name === 'code-quality') {
        return null
      }
      if (!this.isMultibranch && name === 'branch') {
        return null
      }
      if (
        !detailStore.detail.totalNumberOfPullRequests &&
        name === 'pull-request'
      ) {
        return null
      }
    }
    return (
      <Tab
        key={index}
        label={t(title)}
        value={pathToRegexp.compile(item?.path)(params)}
      />
    )
  }

  handleChange = newPath => {
    this.props.history.push(newPath)
  }

  render() {
    const { route } = this.props
    const { pathname } = this.props.location

    return (
      <React.Fragment>
        {this.renderBaseInfo()}
        <div className={styles.nav}>
          <Tabs
            value={pathname}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newPath) => this.handleChange(newPath)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {route.routes
              .filter(option => option.title)
              .map((item, index) => this.renderNav(item, index))}
          </Tabs>
        </div>
      </React.Fragment>
    )
  }
}

export default inject('rootStore')(observer(Nav))
