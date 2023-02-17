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
import { get } from 'lodash'
import { renderRoutes, getIndexRoute } from 'utils/router.config'
import { Nav } from 'components/Layout'

class AccessLayout extends Component {
  render() {
    const { match, route, location } = this.props
    const navs = globals.app.getAccessNavs()
    const indexPath = get(navs, '[0].items[0].name')

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Nav
            className="ks-page-nav"
            navs={navs}
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
