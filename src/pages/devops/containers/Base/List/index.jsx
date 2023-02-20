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
import { Loading } from '@kube-design/components'
import { get } from 'lodash'

import { renderRoutes, getIndexRoute } from 'utils/router.config'
import { Nav } from 'components/Layout'
// import Selector from 'projects/components/Selector'
// import { Slide } from '@material-ui/core'
import styles from './index.scss'

@inject('rootStore', 'devopsStore')
@observer
class DevOpsListLayout extends Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get devops() {
    return this.props.match.params.devops
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get isHostCluster() {
    return (
      !globals.app.isMultiCluster ||
      this.cluster === this.props.devopsStore.hostName
    )
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location, rootStore } = this.props
    const { initializing } = this.props.devopsStore

    const navs = globals.app.getDevOpsNavs({
      devops: this.devops,
      cluster: this.cluster,
      workspace: this.workspace,
    })

    const isDevopsNavs = {
      name: 'devops',
      title: 'Devops detail',
      icon: 'strategy-group',
      authKey: 'services',
      authAction: 'manage',
      cate: 'devop',
      children: navs[0].items,
    }

    const _navs = this.isHostCluster
      ? navs
      : navs.map(nav => {
          const navsItem = nav.items.filter(
            item => item.name !== 'cd' && item.name !== 'code-repo'
          )
          nav.items = navsItem
          return nav
        })

    const indexNav = get(_navs, '[0].items[0].name', 'management')
    const indexPath = indexNav === 'management' ? 'base-info' : indexNav

    if (initializing) {
      return <Loading className={styles.loading} />
    }

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          {/* <Slide
            timeout={{ enter: 300, exit: 400 }}
            in={rootStore.openMenu}
            direction={'right'}
          >
            <div
              style={{
                padding: '0px 0px 0px 15px',
                position: 'fixed',
                width: '315px',
              }}
              className={rootStore.openMenu === true ? 'title-in-delay' : ''}
            >
              <Selector
                type="devops"
                title={t('DEVOPS_PROJECT_LOW')}
                detail={detail}
                onChange={this.handleChange}
                workspace={this.workspace}
                cluster={this.cluster}
              />
            </div>
          </Slide> */}
          <Nav
            className="ks-page-nav"
            navsProjects={isDevopsNavs}
            navsCluster={globals.app.getClusterNavs(rootStore.clusterName)}
            navsManageApp={globals.app.getManageAppNavs()}
            navsAccessControl={globals.app.getAccessNavs()}
            navsPlatformSettings={globals.app.getPlatformSettingsNavs()}
            location={location}
            match={match}
            // haveNavTitle
          />
        </div>

        <div className="ks-page-main">
          {renderRoutes([
            ...route.routes,
            getIndexRoute({
              path: route.path,
              to: `${route.path}/${indexPath}`,
              exact: true,
            }),
          ])}
        </div>
      </div>
    )
  }
}

export default DevOpsListLayout
