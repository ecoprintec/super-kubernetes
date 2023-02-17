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
import { observer } from 'mobx-react'
import GraphMonitorOverview from './GraphMonitorOverview'

import ErrorContainer from '../components/ErrorContainer'
import GraphContainer from '../components/Cards/GraphContainer'

const COMPONENT_MAP = {
  graph: GraphMonitorOverview,
  table: () => {
    'table'
  },
}

@observer
export default class GraphList extends Component {
  render() {
    return (
      <div>
        {this.props.rows.map(row => (
          <React.Fragment key={row.config.id}>
            {row.monitors.map(monitor => {
              const { id, title, description, type } = monitor.config || {}
              const View = COMPONENT_MAP[type]
              const isComponent = Object.prototype.toString.call(View)

              return (
                <ErrorContainer key={id} errorMessage={monitor.errorMessage}>
                  <GraphContainer title={title} description={description}>
                    {isComponent !== '[object Function]' && View ? (
                      <View monitor={monitor} />
                    ) : null}
                  </GraphContainer>
                </ErrorContainer>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    )
  }
}
