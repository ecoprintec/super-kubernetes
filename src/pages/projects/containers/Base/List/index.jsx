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
// import { Slide } from '@material-ui/core'
import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'
// import Selector from 'projects/components/Selector'

@inject('rootStore', 'projectStore')
@observer
class ProjectLayout extends Component {
  getRoutes(navs) {
    const { routes, path } = this.props.route
    const nav = get(navs, '[0].items[0]', {})
    const name = get(nav.children, '[0].name') || nav.name

    if (!name) {
      return []
    }

    if (routes) {
      routes.forEach(route => {
        if (route.path === path && route.redirect) {
          route.redirect.to = `${path}/${name}`
        }
      })
    }
    return routes
  }

  handleChange = url => this.props.rootStore.routing.push(url)

  render() {
    const { match, location, rootStore } = this.props
    const { workspace, cluster, namespace } = match.params
    // const { detail } = this.props.projectStore

    const navs = globals.app.getProjectNavs({
      cluster,
      workspace,
      project: namespace,
    })

    const isProjectNavs = {
      name: 'projects',
      title: 'Project detail',
      icon: 'enterprise',
      authKey: 'services',
      authAction: 'manage',
      cate: 'project',
      children: navs[0].items,
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
                title={t('PROJECT')}
                detail={detail}
                onChange={this.handleChange}
              />
            </div>
          </Slide> */}
          <Nav
            className="ks-page-nav"
            navsProjects={isProjectNavs}
            navsCluster={globals.app.getClusterNavs(rootStore.clusterName)}
            navsManageApp={globals.app.getManageAppNavs()}
            navsAccessControl={globals.app.getAccessNavs()}
            navsPlatformSettings={globals.app.getPlatformSettingsNavs()}
            location={location}
            match={match}
            // haveNavTitle
          />
        </div>
        <div className="ks-page-main">{renderRoutes(this.getRoutes(navs))}</div>
      </div>
    )
  }
}

export default ProjectLayout
