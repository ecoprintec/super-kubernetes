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

import { renderRoutes, getIndexRoute } from 'utils/router.config'

import { Nav } from 'components/Layout'
import Selector from 'workspaces/components/Selector'
import { Slide } from '@material-ui/core'

@inject('rootStore', 'workspaceStore')
@observer
class WorkspaceLayout extends Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  enterWorkspace = async workspace =>
    this.routing.push(`/workspaces/${workspace}/`)

  render() {
    const {
      match,
      location,
      route: { routes = [], path },
      rootStore,
    } = this.props
    const { detail } = this.props.workspaceStore
    const navs = globals.app.getWorkspaceNavs(this.workspace)
    const indexPath = get(navs, '[0].items[0].name')

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Slide
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
                icon={detail.logo}
                detail={detail}
                onChange={this.enterWorkspace}
              />
            </div>
          </Slide>
          <Nav
            className="ks-page-nav"
            navs={navs}
            location={location}
            match={match}
            haveNavTitle
          />
        </div>
        <div className="ks-page-main">
          {indexPath &&
            renderRoutes([
              ...routes,
              getIndexRoute({
                path,
                to: `${path}/${indexPath}`,
                exact: true,
              }),
              getIndexRoute({ path: '*', to: '/404', exact: true }),
            ])}
        </div>
      </div>
    )
  }
}

export default WorkspaceLayout
