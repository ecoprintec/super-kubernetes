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
import { get, set } from 'lodash'
import { renderRoutes, getIndexRoute } from 'utils/router.config'
import { Nav } from 'components/Layout'
import ClusterStore from 'stores/cluster'

@inject('rootStore')
@observer
class AccessLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
  }

  componentDidMount() {
    this.props.rootStore.getRules({ cluster: this.props.rootStore.clusterName })
    this.init({ cluster: this.props.rootStore.clusterName })
  }

  async init(params) {
    this.store.initializing = true

    if (params.cluster) {
      await Promise.all([
        this.store.fetchDetail({ name: params }),
        this.props.rootStore.getRules({ cluster: params }),
      ])
      await this.props.history.push(this.props.location)
      set(
        globals,
        `clusterConfig.${this.props.rootStore.clusterName}`,
        this.store.detail.configz
      )
    }
    this.store.initializing = false
  }

  getClusterNavsMenu() {
    const menu = globals.app.getClusterNavs(this.props.rootStore.clusterName)
    return menu
  }

  render() {
    const { match, route, location } = this.props
    const navs = globals.app.getAccessNavs()
    const indexPath = get(navs, '[0].items[0].name')

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Nav
            className="ks-page-nav"
            navsCluster={this.getClusterNavsMenu()}
            navsManageApp={globals.app.getManageAppNavs()}
            navsAccessControl={navs}
            navsPlatformSettings={globals.app.getPlatformSettingsNavs()}
            location={location}
            match={match}
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

export default AccessLayout
